import { Review } from 'src/review/entities/review.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieGender } from '../../movie_gender/entities/movie_gender.entity';
import { Photo } from 'src/photos/entities/photo.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('int')
  popularity: number;

  @Column('int')
  runtime: number;

  @Column('text')
  release_date: string;

  @Column('text')
  overview: string;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];

  @OneToMany(() => MovieGender, (movieGender) => movieGender.movie, { eager: true })
  movieGenders: MovieGender[];

  @OneToMany(() => Photo, (photo) => photo.movie, { eager: true })
  photo: Photo[];

  @DeleteDateColumn()
  delete_at: Date;
}
