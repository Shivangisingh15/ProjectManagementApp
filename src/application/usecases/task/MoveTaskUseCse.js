// src/application/usecases/task/MoveTaskUseCase.js
export class MoveTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }
  
  async execute(taskId, fromColumn, toColumn) {
    const task = await this.taskRepository.findById(taskId);
    
    if (!task.canMoveTo(toColumn)) {
      throw new Error('Task cannot be moved to this column');
    }
    
    // Move task logic here
    return await this.taskRepository.moveTask(taskId, fromColumn, toColumn);
  }
}