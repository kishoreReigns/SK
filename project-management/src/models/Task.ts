export class Task {
    id: string;
    title: string;
    status: 'pending' | 'in-progress' | 'completed';

    constructor(id: string, title: string, status: 'pending' | 'in-progress' | 'completed' = 'pending') {
        this.id = id;
        this.title = title;
        this.status = status;
    }

    markComplete() {
        this.status = 'completed';
    }

    updateTitle(newTitle: string) {
        this.title = newTitle;
    }
}