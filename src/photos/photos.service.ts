import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService {
  constructor(@InjectRepository(Photo) private readonly photoRepository: Repository<Photo>) {}

  create(createPhotoDto: CreatePhotoDto) {
    return this.photoRepository.save(createPhotoDto);
  }

  findAll() {
    return this.photoRepository.find();
  }

  findOne(id: string) {
    return this.photoRepository.findOne({ where: { id: id } });
  }

  update(id: string, updatePhotoDto: UpdatePhotoDto) {
    return this.photoRepository.update({ id: id }, updatePhotoDto);
  }

  remove(id: string) {
    return this.photoRepository.softDelete({ id: id });
  }
}
