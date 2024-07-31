import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Review } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Rating } from 'src/rating/entities/rating.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Comment, Movie, Rating, User])],
  controllers: [ReviewController],
  providers: [ReviewService, RolesGuard, AuthGuard],
})
export class ReviewModule {}
