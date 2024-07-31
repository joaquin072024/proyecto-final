import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('movie/:movieId')
  findAll(@Param('movieId') movieId: string) {
    return this.commentsService.getCommentsByMovie(movieId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards()
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Req() req: Request) {
    const userId = req.user.userId;
    return this.commentsService.update(id, updateCommentDto, userId);
  }

  @Delete(':id')
  @UseGuards()
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.userId;
    return this.commentsService.remove(id, userId);
  }
}
