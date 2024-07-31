import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: string): Promise<Review> {
    const { movieId, rating, commentText } = createReviewDto;

    try {
      const movie = await this.movieRepository.findOne({ where: { id: movieId } });
      if (!movie) {
        throw new NotFoundException(`Movie with ID ${movieId} not found`);
      }

      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const ratingEntity = this.ratingRepository.create({ rating });
      await this.ratingRepository.save(ratingEntity);

      const commentEntity = this.commentRepository.create({ text: commentText } as unknown as Comment);
      await this.commentRepository.save(commentEntity);

      const review = this.reviewRepository.create({
        user,
        movie,
        rating: ratingEntity,
        comment: commentEntity,
      } as unknown as Review);

      return await this.reviewRepository.save(review);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred while creating the review');
    }
  }

  async getReviewByMovie(id: string): Promise<Review[]> {
    return this.reviewRepository.find({ where: { id }, relations: { movie: true } });
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.reviewRepository.update({ id: id }, updateReviewDto as unknown as Review);
  }

  remove(id: string) {
    return this.reviewRepository.softDelete({ id: id });
  }
}
