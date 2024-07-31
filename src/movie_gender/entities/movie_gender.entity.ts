import { Gender } from 'src/gender/entities/gender.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieGender {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.movieGenders)
  movie: Movie;

  @ManyToOne(() => Gender, (gender) => gender.movieGenders, { eager: true })
  gender: Gender;

  @DeleteDateColumn()
  delete_at: Date;
}
