 // src/domain/entities/Task.js
export class Task {
  constructor({id, title, description, priority, assignee, tags, dueDate}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.assignee = assignee;
    this.tags = tags || [];
    this.dueDate = dueDate;
    this.estimatedHours = 0;
    this.comments = 0;
    this.attachments = 0;
  }
  
  canMoveTo(targetStatus) {
    // Business rule: Cool tasks can't be moved to done
    if (this.priority === 'cool' && targetStatus === 'done') {
      return false;
    }
    return true;
  }
}
