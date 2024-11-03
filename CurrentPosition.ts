import { CanonData, getCanon } from "./Canons";
import { ProjectConfiguration, ProjectId } from "./ProjectConfiguration";
import { Canon, VerseReference } from "./VerseReference";

type CompositeKey = string;

export class CurrentPosition {
    private _current_project_id: ProjectId;
    private _current_canon: Canon;
    private _positions: Map<CompositeKey, VerseReference>;

    constructor(project_id: ProjectId, canon: Canon, positions: Map<CompositeKey, VerseReference> = new Map<CompositeKey, VerseReference>()) {
        this._current_project_id = project_id;
        this._current_canon = canon;
        this._positions = positions;
    }

    copyOf(): CurrentPosition {
        return new CurrentPosition(this._current_project_id, this._current_canon, new Map(this._positions));
    }

    set ref(reference: VerseReference) {
        this._positions.set(this.currentKey(), reference);
    }

    get project_id(): string {
        return this._current_project_id;
    }

    changeProject(id: ProjectId, c: Canon) {
        this._current_project_id = id;
        this._current_canon = c;
    }

    get canonData(): CanonData {
        return getCanon(this._current_canon);
    }

    get canon(): Canon {
        return this._current_canon;
    }
    set canon(c: Canon) {
        this._current_canon = c;
    }

    get ref(): VerseReference {
        let result = this._positions.get(this.currentKey());
        if (result) {
            return result;
        } else {
            return this.canonData.fallbackVerseReference();
        }
    }

    setCurrentReference(projectID: ProjectId, reference: VerseReference) {
        this._current_project_id = projectID;
        this._current_canon = reference.canon;
        this._positions.set(CurrentPosition.getKey(projectID, this._current_canon), reference);
    }

    private currentKey(): CompositeKey {
        return CurrentPosition.getKey(this._current_project_id, this._current_canon);
    }

    static getKey(p: ProjectId, c: Canon): CompositeKey {
        return p + "|" + c;
    }

    static fromJson(json: string): CurrentPosition | undefined {
        if (json === undefined || json === null) {
            return undefined;
        }
        let obj = JSON.parse(json);
        if (obj.project_id === undefined || obj.canon === undefined || obj.positions === undefined
            || obj.project_id === null || obj.canon === null || obj.positions === null) {
            return undefined;
        }
        let positions = new Map<CompositeKey, VerseReference>();
        for (let projectId in obj.positions) {
            if (obj.positions.hasOwnProperty(projectId)) {
                for (let canon in obj.positions[projectId]) {
                    if (obj.positions[projectId].hasOwnProperty(canon)) {
                        let pid = projectId as ProjectId;
                        let c = canon as Canon;
                        let canonData = getCanon(c);
                        let reference = VerseReference.fromString(obj.positions[projectId][canon]) || canonData.fallbackVerseReference();
                        positions.set(CurrentPosition.getKey(pid, c), reference);
                    }
                }
            }
        }
        return new CurrentPosition(obj.project_id, obj.canon, positions);
    }

    toObject(): any {
        let positions: any = {};
        this._positions.forEach((ref, key) => {
            let [pid, c] = key.split("|");
            if (!positions[pid]) {
                positions[pid] = {};
            }
            positions[pid][c] = ref.toString();
        });
        return {
            project_id: this._current_project_id,
            canon: this._current_canon,
            positions: positions
        };
    }

    static createFromProjectList(projects: ProjectConfiguration[]): CurrentPosition | undefined {
        if (projects.length === 0) {
            return undefined;
        }
        let firstProject = projects[0];
        let positions = new Map<CompositeKey, VerseReference>();
        projects.forEach(project => {
            project.canons.forEach(canon => {
                let ref = getCanon(canon).fallbackVerseReference();
                positions.set(CurrentPosition.getKey(project.id, canon), ref);
            });
        });
        return new CurrentPosition(firstProject.id, firstProject.canons[0], positions);
    }
}