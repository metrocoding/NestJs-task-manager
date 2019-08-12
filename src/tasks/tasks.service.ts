import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     return (tasks = tasks.filter(task => task.status === status));
  //   }

  //   if (search) {
  //     return (tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     ));
  //   }
  // }

  // getTaskById(id: string): Task {
  //   const taskData = this.tasks.find(task => task.id === id);
  //   if (!taskData) {
  //     throw new NotFoundException(`Task with ID:"${id}" is not found`);
  //   }
  //   return taskData;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteTaskById(id: string): void {
  //   const taksData = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== taksData.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
