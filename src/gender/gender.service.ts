import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenderService {
  constructor(@InjectRepository(Gender) private readonly genderRepository: Repository<Gender>) {}

  create(createGenderDto: CreateGenderDto) {
    return this.genderRepository.save(createGenderDto);
  }

  findAll() {
    return this.genderRepository.find({ order: { gender: 'ASC' } });
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
