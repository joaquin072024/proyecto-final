import { Gender } from 'src/gender/entities/gender.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieGender {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.movie_genders)
  movie: Movie;

  @Column('text')
  @ManyToOne(() => Gender, (gender) => gender.movie_genders)
  gender: Gender;

  @DeleteDateColumn()
  delete_at: Date;
}
