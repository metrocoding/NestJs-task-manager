import { Controller, Get, Post, Body, Param, Delete, Patch, Query,
         UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // ------------------------------------------------------------------------------------
  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  // ------------------------------------------------------------------------------------
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  // ------------------------------------------------------------------------------------
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  // ------------------------------------------------------------------------------------
  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<object> {
    return this.tasksService.deleteTaskById(id, user);
  }

  // ------------------------------------------------------------------------------------
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
