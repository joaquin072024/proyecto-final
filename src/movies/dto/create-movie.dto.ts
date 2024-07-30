import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  tittle: string;
  @IsNumber()
  popularity: number;
  @IsNumber()
  runtime: number;
  @IsString()
  release_date: string;
  @IsString()
  overview: string;
}
