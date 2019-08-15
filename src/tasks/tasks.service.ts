import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // ------------------------------------------------------------------------------------
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasks(filterDto);
    if (tasks.length === 0) {
      throw new NotFoundException('No task found');
    }
    return tasks;
  }

  // ------------------------------------------------------------------------------------
  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`No task found with ID:${id}`);
    }
    return task;
  }

  // ------------------------------------------------------------------------------------
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }

  // ------------------------------------------------------------------------------------
  async deleteTaskById(id: number): Promise<object> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`No task found with ID:${id}`);
    }
    return {
      statusCode: 200,
      success: true,
      message: `Task with ID: ${id} deleted`,
    };
  }

  // ------------------------------------------------------------------------------------
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`No task found with ID:${id}`);
    }
    task.status = status;
    await task.save();
    return task;
  }
}
