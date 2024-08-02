import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

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
    const { movieId, rating, comment } = createReviewDto;

    try {
      const movie = await this.movieRepository.findOne({ where: { id: movieId } });
      if (!movie) {
        throw new NotFoundException('No existe la peli');
      }

      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('No existe ese usuario');
      }

      const ratingEntity = this.ratingRepository.create({ rating });
      await this.ratingRepository.save(ratingEntity);

      const commentEntity = this.commentRepository.create({ comment });
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
      throw new InternalServerErrorException('Paso algo');
    }
  }

  // async getReviewByMovie(id: string): Promise<Review[]> {
  //   return await this.reviewRepository.find({ where: { id }, relations: { movie: true } });
  // }

  async getReviewByMovie(movieId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { movie: { id: movieId } },
      relations: ['movie', 'user', 'rating', 'comment'],
    });
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.reviewRepository.update({ id: id }, updateReviewDto as unknown as Review);
  }

  async remove(id: string, userId: string) {
    const review = await this.reviewRepository.findOne({ where: { id }, relations: ['user'] });

    if (!review) {
      throw new NotFoundException('No se encontró la reseña');
    }

    if (review.user.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para eliminar esta reseña');
    }

    await this.reviewRepository.softDelete(id);
    return { message: 'Borraste la reseña' };
  }
}
