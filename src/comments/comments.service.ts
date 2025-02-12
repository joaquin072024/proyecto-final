import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(comment);
  }

  async getCommentsByMovie(movieId: string): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: { review: { movie: { id: movieId } } },
      relations: ['review', 'review.movie'],
    });
    return comments;
  }

  findOne(id: string) {
    return this.commentRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, userId: string) {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['review', 'review.user'] });

    if (!comment) {
      throw new NotFoundException('No hay comentario');
    }

    if (comment.review.user.id !== userId) {
      throw new UnauthorizedException('No podes actualizar el comentario');
    }

    Object.assign(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  async remove(id: string, userId: string) {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['review', 'review.user'] });

    if (!comment) {
      throw new NotFoundException('No hay comentario');
    }

    if (comment.review.user.id !== userId) {
      throw new UnauthorizedException('No podes borrar el comentario');
    }

    await this.commentRepository.softDelete(id);
    return { message: 'Borraste el comentario' };
  }
}
