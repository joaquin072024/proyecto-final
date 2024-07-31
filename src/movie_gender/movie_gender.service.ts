import { Injectable } from '@nestjs/common';
import { CreateMovieGenderDto } from './dto/create-movie_gender.dto';
import { UpdateMovieGenderDto } from './dto/update-movie_gender.dto';
import { MovieGender } from './entities/movie_gender.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieGenderService {
  constructor(@InjectRepository(MovieGender) private readonly movieGenderRepository: Repository<MovieGender>) {}

  create(createMovieGenderDto: CreateMovieGenderDto) {
    return 'This action adds a new movieGender';
  }

  findAll() {
    return this.movieGenderRepository.find({ relations: { movie: true} })
  }

  findOne(id: number) {
    return `This action returns a #${id} movieGender`;
  }

  update(id: number, updateMovieGenderDto: UpdateMovieGenderDto) {
    return `This action updates a #${id} movieGender`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieGender`;
  }
}
