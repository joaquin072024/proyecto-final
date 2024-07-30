import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private readonly reviewRepository: Repository<Review>) {}

  create(createReviewDto: CreateReviewDto) {
    return this.reviewRepository.save(createReviewDto);
  }

  findAll() {
    return this.reviewRepository.find();
  }

  findOne(id: string) {
    return this.reviewRepository.findOne({ where: { id: id } });
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.reviewRepository.update({ id: id }, updateReviewDto);
  }

  remove(id: string) {
    return this.reviewRepository.softDelete({ id: id });
  }
}
