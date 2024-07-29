import { Movie } from 'src/movies/entities/movie.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('rating')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 2, scale: 1 })
  score: number;

  @ManyToOne(() => Movie, (movie) => movie.ratings)
  movie: Movie;
}
