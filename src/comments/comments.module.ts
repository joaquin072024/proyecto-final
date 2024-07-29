import { Module } from '@nestjs/common';
import { ComentsService } from './comments.service';
import { ComentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [ComentsController],
  providers: [ComentsService],
})
export class ComentsModule {}
