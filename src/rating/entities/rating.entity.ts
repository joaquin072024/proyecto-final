import { Movie } from 'src/movies/entities/movie.entity';
import { Review } from 'src/review/entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 2, scale: 1 })
  score: number;

  @ManyToOne(() => Movie, (movie) => movie.ratings)
  movie: Movie;

  @ManyToOne(() => Review, (review) => review.ratings)
  review: Review;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @DeleteDateColumn()
  delete_at: Date;
}
