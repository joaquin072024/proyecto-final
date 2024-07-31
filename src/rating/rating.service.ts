import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(@InjectRepository(Rating) private readonly ratingRepository: Repository<Rating>) {}

  async create(createRatingDto: CreateRatingDto) {
    const rating = this.ratingRepository.create(createRatingDto);
    return this.ratingRepository.save(rating);
  }

  async getRatingsByMovie(movieId: string): Promise<Rating[]> {
    const ratings = await this.ratingRepository.find({
      where: { review: { movie: { id: movieId } } },
      relations: ['review', 'review.movie'],
    });
    return ratings;
  }

  async update(id: string, updateRatingDto: UpdateRatingDto, userId: string) {
    const rating = await this.ratingRepository.findOne({ where: { id }, relations: ['review', 'review.user'] });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    if (rating.review.user.id !== userId) {
      throw new UnauthorizedException('You are not allowed to update this rating');
    }

    Object.assign(rating, updateRatingDto);
    return this.ratingRepository.save(rating);
  }

  async remove(id: string, userId: string) {
    const rating = await this.ratingRepository.findOne({ where: { id }, relations: ['review', 'review.user'] });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    if (rating.review.user.id !== userId) {
      throw new UnauthorizedException('You are not allowed to delete this rating');
    }

    await this.ratingRepository.softDelete(id);
    return { message: 'Rating deleted successfully' };
  }
}
