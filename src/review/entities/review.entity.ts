import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column('decimal', { precision: 2, scale: 1 })
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  movie: Movie;

  @OneToMany(() => Comment, (comment) => comment.review)
  comments: Comment[];
}
