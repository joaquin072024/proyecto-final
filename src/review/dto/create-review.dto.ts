import { IsDecimal, IsString, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  movieId: string;

  @IsUUID()
  userId: string;

  @IsDecimal()
  rating: number;

  @IsString()
  commentText: string;
}
