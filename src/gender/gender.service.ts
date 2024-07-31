import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Repository } from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class GenderService {
  constructor(@InjectRepository(Gender) private readonly genderRepository: Repository<Gender>) {}

  create(createGenderDto: CreateGenderDto) {
    return this.genderRepository.save(createGenderDto);
  }

  async findAll(): Promise<{gender: Gender, movies: Movie[]} []> {
    const gender = await this.genderRepository.find({ 
      order: { gender: 'ASC' }, 
      relations: ['movieGenders','movieGenders.movie'],
      // select: {
      //   id: true,
      //   gender: true,
      //   movieGenders: {
      //     movie: {
      //       id: true,
      //       title: true
      //     }
      //   }
      // }
    });
    console.log(gender);
    
    return gender.map((gender) => ({
      gender,
      movies: gender.movieGenders.map(movieGender => {
        console.log(movieGender);
        return movieGender.movie;
      })
    }))
  }

  findOne(id: string) {
    return `This action returns a #${id} gender`;
  }

  update(id: string, updateGenderDto: UpdateGenderDto) {
    return this.genderRepository.update({ id: id }, updateGenderDto);
  }

  remove(id: string) {
    return this.genderRepository.softDelete({ id: id });
  }
}
