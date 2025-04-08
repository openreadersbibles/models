import { ProjectConfiguration } from "./ProjectConfiguration.js";
export class UserProfile {
    constructor(row) {
        this._projects = new Map();
        this._user_id = row.user_id;
        this._user_description = row.user_description;
        const projects = JSON.parse(row.projects);
        for (const row in projects) {
            const projectRow = projects[row];
            if (projectRow) {
                try {
                    const project = ProjectConfiguration.fromRow(projectRow);
                    this._projects.set(projectRow.project_id, project);
                }
                catch (e) {
                    console.error("Error parsing project row", projectRow, e);
                    throw e;
                }
            }
        }
    }
    get user_id() {
        return this._user_id;
    }
    get description() {
        return this._user_description;
    }
    get projects() {
        return this._projects.values();
    }
    get numberOfProjects() {
        return this._projects.size;
    }
    project(pid) {
        return this._projects.get(pid);
    }
    projectFromPosition(position) {
        if (position === undefined) {
            return undefined;
        }
        return this._projects.get(position.project_id);
    }
    replaceProject(project) {
        this._projects.set(project.project_id, project);
    }
    static fromUserId(user_id) {
        return new UserProfile({
            user_id: user_id,
            projects: "[]",
            user_description: ""
        });
    }
    toObject() {
        return {
            user_id: this._user_id,
            user_description: this._user_description,
        };
    }
}
//# sourceMappingURL=UserProfile.js.map