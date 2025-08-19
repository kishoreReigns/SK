class Project {
    id: string;
    name: string;
    description: string;

    constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    addTask(task: Task): void {
        // Implementation for adding a task
    }

    removeTask(taskId: string): void {
        // Implementation for removing a task
    }
}

export default Project;