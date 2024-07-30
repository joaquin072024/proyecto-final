import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingService {
  constructor(@InjectRepository(Rating) private readonly ratingRepository: Repository<Rating>) {}

  create(createRatingDto: CreateRatingDto) {
    return this.ratingRepository.save(createRatingDto);
  }

  async getRatingsByMovie(id: string): Promise<Rating[]> {
    return this.ratingRepository.find({ where: { id } });
  }

  async update(id: string, updateRatingDto: UpdateRatingDto, userId: string) {
    const rating = await this.ratingRepository.findOne({ where: { id }, relations: ['review'] });

    if (!rating) {
      throw new Error('Rating not found');
    }

    if (rating.user.id !== userId) {
      throw new UnauthorizedException('You are not allowed to update this rating');
    }

    Object.assign(rating, updateRatingDto);
    return this.ratingRepository.save(rating);
  }

  async remove(id: string, userId: string) {
    const rating = await this.ratingRepository.findOne({ where: { id }, relations: ['review'] });

    if (!rating) {
      throw new Error('Rating not found');
    }

    if (rating.user.id !== userId) {
      throw new UnauthorizedException('You are not allowed to delete this rating');
    }

    return this.ratingRepository.softDelete(id);
  }
}
