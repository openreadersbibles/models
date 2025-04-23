import { CurrentPosition } from "./CurrentPosition.js";
import { ProjectConfiguration, ProjectId } from "./ProjectConfiguration.js";
import { UserProfileRow } from "./UserProfileRow.js";
import { UserUpdateObject } from "./UserUpdateObject.js";

export type UserId = string;

export class UserProfile {
    private _user_id: UserId;
    private _user_description: string;
    private _projects: Map<ProjectId, ProjectConfiguration> = new Map<ProjectId, ProjectConfiguration>();

    constructor(row: UserProfileRow) {
        this._user_id = row.user_id;
        this._user_description = row.user_description;
        row.projects.forEach((projectRow) => {
            try {
                const project = ProjectConfiguration.fromRow(projectRow);
                this._projects.set(projectRow.project_id, project);
            } catch (e) {
                console.error("Error parsing project row", projectRow, e);
                throw e
            }
        });
    }

    get user_id(): UserId {
        return this._user_id;
    }

    get description(): string {
        return this._user_description;
    }

    get projects(): IterableIterator<ProjectConfiguration> {
        return this._projects.values();
    }

    get numberOfProjects(): number {
        return this._projects.size;
    }

    project(pid: ProjectId): ProjectConfiguration | undefined {
        return this._projects.get(pid);
    }

    projectFromPosition(position: CurrentPosition | undefined): ProjectConfiguration | undefined {
        if (position === undefined) {
            return undefined;
        }
        return this._projects.get(position.project_id);
    }

    replaceProject(project: ProjectConfiguration): void {
        this._projects.set(project.project_id, project);
    }

    static fromUserId(user_id: string): UserProfile {
        return new UserProfile({
            user_id: user_id,
            projects: [],
            user_description: ""
        });
    }

    toObject(): UserUpdateObject {
        return {
            user_id: this._user_id,
            user_description: this._user_description,
        }
    }

}