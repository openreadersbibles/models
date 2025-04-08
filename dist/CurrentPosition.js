import { getCanon } from "./Canons.js";
import { VerseReference } from "./VerseReference.js";
export class CurrentPosition {
    constructor(project_id, canon, positions = new Map()) {
        this._current_project_id = project_id;
        this._current_canon = canon;
        this._positions = positions;
    }
    copyOf() {
        return new CurrentPosition(this._current_project_id, this._current_canon, new Map(this._positions));
    }
    set ref(reference) {
        this._positions.set(this.currentKey(), reference);
    }
    get project_id() {
        return this._current_project_id;
    }
    changeProject(id, c) {
        this._current_project_id = id;
        this._current_canon = c;
    }
    get canonData() {
        return getCanon(this._current_canon);
    }
    get canon() {
        return this._current_canon;
    }
    set canon(c) {
        this._current_canon = c;
    }
    get ref() {
        const result = this._positions.get(this.currentKey());
        if (result) {
            return result;
        }
        else {
            return this.canonData.fallbackVerseReference();
        }
    }
    setCurrentReference(projectID, reference) {
        this._current_project_id = projectID;
        this._current_canon = reference.canon;
        this._positions.set(CurrentPosition.getKey(projectID, this._current_canon), reference);
    }
    currentKey() {
        return CurrentPosition.getKey(this._current_project_id, this._current_canon);
    }
    static getKey(p, c) {
        return p + "|" + c;
    }
    static fromJson(json) {
        if (json === undefined || json === null) {
            return undefined;
        }
        const obj = JSON.parse(json);
        if (obj.project_id === undefined || obj.canon === undefined || obj.positions === undefined
            || obj.project_id === null || obj.canon === null || obj.positions === null) {
            return undefined;
        }
        const positions = new Map();
        for (const projectId in obj.positions) {
            if (Object.prototype.hasOwnProperty.call(obj.positions, projectId)) {
                for (const canon in obj.positions[projectId]) {
                    if (Object.prototype.hasOwnProperty.call(obj.positions[projectId], canon)) {
                        const pid = projectId;
                        const c = canon;
                        const canonData = getCanon(c);
                        const reference = VerseReference.fromString(obj.positions[projectId][canon]) || canonData.fallbackVerseReference();
                        positions.set(CurrentPosition.getKey(pid, c), reference);
                    }
                }
            }
        }
        return new CurrentPosition(obj.project_id, obj.canon, positions);
    }
    toObject() {
        const positions = {};
        this._positions.forEach((ref, key) => {
            const [pid, c] = key.split("|");
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
    static createFromProjectList(projects) {
        if (projects.length === 0) {
            return undefined;
        }
        const firstProject = projects[0];
        const positions = new Map();
        projects.forEach(project => {
            project.canons.forEach(canon => {
                const ref = getCanon(canon).fallbackVerseReference();
                positions.set(CurrentPosition.getKey(project.id, canon), ref);
            });
        });
        return new CurrentPosition(firstProject.id, firstProject.canons[0], positions);
    }
}
//# sourceMappingURL=CurrentPosition.js.map