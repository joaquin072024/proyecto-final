import { MovieGender } from 'src/movie_gender/entities/movie_gender.entity';
import { Review } from 'src/review/entities/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';

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

  @OneToMany(() => MovieGender, (movieGender) => movieGender.movie)
  movie_genders: MovieGender[];

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
  ratings: any;

  @DeleteDateColumn()
  delete_at: Date;
}
