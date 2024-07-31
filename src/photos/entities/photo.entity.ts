import { Movie } from 'src/movies/entities/movie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  or_backdrop_path: string;

  @Column('varchar')
  w500_backdrop_path: string;

  @Column('varchar')
  or_poster_path: string;

  @ManyToOne(() => Movie, (movie) => movie.photo)
  movie: Movie;
}
