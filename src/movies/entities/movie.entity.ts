import { Review } from 'src/review/entities/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  releaseYear: number;

  @Column()
  overview: string;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
  ratings: any;
}
