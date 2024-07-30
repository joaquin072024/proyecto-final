import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieGenderDto } from './create-movie_gender.dto';

export class UpdateMovieGenderDto extends PartialType(CreateMovieGenderDto) {}
