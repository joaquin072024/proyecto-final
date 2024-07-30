import { Injectable } from '@nestjs/common';
import { CreateMovieGenderDto } from './dto/create-movie_gender.dto';
import { UpdateMovieGenderDto } from './dto/update-movie_gender.dto';

@Injectable()
export class MovieGenderService {
  create(createMovieGenderDto: CreateMovieGenderDto) {
    return 'This action adds a new movieGender';
  }

  findAll() {
    return `This action returns all movieGender`;
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
