import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieGenderService } from './movie_gender.service';
import { CreateMovieGenderDto } from './dto/create-movie_gender.dto';
import { UpdateMovieGenderDto } from './dto/update-movie_gender.dto';

@Controller('movie-gender')
export class MovieGenderController {
  constructor(private readonly movieGenderService: MovieGenderService) {}

  @Post()
  create(@Body() createMovieGenderDto: CreateMovieGenderDto) {
    return this.movieGenderService.create(createMovieGenderDto);
  }

  @Get()
  findAll() {
    return this.movieGenderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieGenderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieGenderDto: UpdateMovieGenderDto) {
    return this.movieGenderService.update(+id, updateMovieGenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieGenderService.remove(+id);
  }
}
