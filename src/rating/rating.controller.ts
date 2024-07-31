import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decoretor';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  createRating(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }

  @Get('movie/:movieId')
  async getRatingsByMovie(@Param('movieId') id: string): Promise<Rating[]> {
    return this.ratingService.getRatingsByMovie(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  updateRating(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto, @Req() req: Request) {
    const userId = req.user.userId;
    return this.ratingService.update(id, updateRatingDto, userId);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  removeRating(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.userId;
    return this.ratingService.remove(id, userId);
  }
}
