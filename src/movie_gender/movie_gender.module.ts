import { Module } from '@nestjs/common';
import { MovieGenderService } from './movie_gender.service';
import { MovieGenderController } from './movie_gender.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieGender } from './entities/movie_gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieGender])],
  controllers: [MovieGenderController],
  providers: [MovieGenderService],
})
export class MovieGenderModule {}
