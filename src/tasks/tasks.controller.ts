import { Controller, Get, Post, Body, Param, Delete, Patch, Query,
         UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './task.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // ------------------------------------------------------------------------------------
  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  // ------------------------------------------------------------------------------------
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // ------------------------------------------------------------------------------------
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // ------------------------------------------------------------------------------------
  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.tasksService.deleteTaskById(id);
  }

  // ------------------------------------------------------------------------------------
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
