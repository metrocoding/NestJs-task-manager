import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // ------------------------------------------------------------------------------------
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasks(filterDto, user);
    if (tasks.length === 0) {
      throw new NotFoundException(`No task found for user ${user.username}`);
    }
    return tasks;
  }

  // ------------------------------------------------------------------------------------
  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ id, userId: user.id });
    if (!task) {
      throw new NotFoundException(`No task found with ID:${id} for user ${user.username}`);
    }
    return task;
  }

  // ------------------------------------------------------------------------------------
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user);
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
  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    if (!task) {
      throw new NotFoundException(`No task found with ID:${id} for user ${user.username}`);
    }
    task.status = status;
    await task.save();
    return task;
  }
}
