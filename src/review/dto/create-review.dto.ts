import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  movieId: string;

  @IsUUID()
  userId: string;

  @IsNumber()
  rating: number;

  @IsString()
  comment: string;
}
