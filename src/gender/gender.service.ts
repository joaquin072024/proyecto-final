import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Repository } from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender) private readonly genderRepository: Repository<Gender>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  create(createGenderDto: CreateGenderDto) {
    return this.genderRepository.save(createGenderDto);
  }

  async findAll(): Promise<{ gender: Gender; movies: Movie[] }[]> {
    const genders = await this.genderRepository.find({
      order: { gender: 'ASC' },
      relations: ['movieGenders', 'movieGenders.movie'],
    });

    return genders.map((gender) => {
      const movies = gender.movieGenders ? gender.movieGenders.map((movieGender) => movieGender.movie) : [];
      return {
        gender,
        movies,
      };
    });
  }

  async findMoviesByGender(genderId: string): Promise<{ movies: Movie[] }> {
    const gender = await this.genderRepository.findOne({
      where: { id: genderId },
      relations: ['movieGenders', 'movieGenders.movie'],
    });

    const movies = gender.movieGenders.map((movieGender) => movieGender.movie);

    return { movies };
  }

  update(id: string, updateGenderDto: UpdateGenderDto) {
    return this.genderRepository.update({ id: id }, updateGenderDto);
  }

  remove(id: string) {
    return this.genderRepository.softDelete({ id: id });
  }
}
