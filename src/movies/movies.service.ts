import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private readonly movieRepository: Repository<Movie>) {}

  create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.save(createMovieDto);
  }

  async getMovies(filters: { title?: string; release_date?: string; gender?: string }): Promise<Movie[]> {
    const query = this.movieRepository.createQueryBuilder('movie').leftJoinAndSelect('movie.photo', 'photo');
    if (filters.title) {
      query.andWhere('movie.title ILIKE :title', { title: `%${filters.title}%` });
    }

    if (filters.release_date) {
      const date = filters.release_date.slice(0, 4);
      query.andWhere('movie.release_date LIKE :release_date', { release_date: `${date}%` });
    }

    if (filters.gender) {
      const gender = parseInt(filters.gender, 10);
      if (isNaN(gender)) {
        throw new BadRequestException('Invalid gender filter');
      }
      query.andWhere('movie.gender = :gender', { gender });
    }

    return query.getMany();
  }

  async findMoviesByYear(year: string): Promise<{ movies: Movie[] }> {
    const yearNumber = parseInt(year, 10);
    if (isNaN(yearNumber)) {
      throw new Error('Invalid year format');
    }

    const movies = await this.movieRepository.find({
      where: {
        release_date: Between(
          new Date(`${yearNumber}-01-01`).toISOString(),
          new Date(`${yearNumber}-12-31`).toISOString(),
        ),
      },
    });

    return { movies };
  }

  findOne(id: string) {
    return this.movieRepository.findOne({ where: { id: id } });
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update({ id: id }, updateMovieDto);
  }

  remove(id: string) {
    return this.movieRepository.softDelete({ id: id });
  }
}
