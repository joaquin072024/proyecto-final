import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Gender } from './entities/gender.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@ApiTags('Gender')
@ApiBearerAuth()
@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.genderService.create(createGenderDto);
  }

  @Get('/movies')
  async findAll(): Promise<{ gender: Gender; movies: Movie[] }[]> {
    return this.genderService.findAll();
  }

  @Get('filters')
  async getMovies(@Query('title') title?: string): Promise<Gender[]> {
    return this.genderService.getMovies({ title });
  }

  @Get('/:id/movies')
  async findMoviesByGender(@Param('id') id: string): Promise<{ movies: Movie[] }> {
    return this.genderService.findMoviesByGender(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.genderService.update(id, updateGenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genderService.remove(id);
  }
}
