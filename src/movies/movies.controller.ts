import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decoretor';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../common/enums/role.enum';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@ApiTags('Movies')
@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('filters')
  async getMovies(
    @Query('title') title?: string,
    @Query('release_date') release_date?: string,
    @Query('gender') gender?: string,
  ): Promise<Movie[]> {
    return this.moviesService.getMovies({ title, release_date, gender });
  }

  @Get('/year/:year')
  async findMoviesByYear(@Param('year') year: string): Promise<{ movies: Movie[] }> {
    return this.moviesService.findMoviesByYear(year);
  }

  @Get(':id')
  findOneMovie(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateMovie(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  removeMovie(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
