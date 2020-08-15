import { TaskStatusValidationPipe } from './pipes/taskStatusValidation.pipe';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { CreateTaskDto } from './dto/createTask.dto';
import { Task, TaskStatus } from './interfaces/task.interface';
import { TasksService } from './tasks.service';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe) // checks if there is pipes inside the body dto
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id);
    }

    @Patch(":id/status")
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task {
        return this.tasksService.updateTaskStatus(id, status)
    }

}
