import { Comment } from 'src/comments/entities/comment.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { User } from 'src/user/entities/user.entity';
import { DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.reviews, { cascade: true })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.reviews, { cascade: true })
  movie: Movie;

  @OneToOne(() => Rating, (rating) => rating.review, { cascade: true })
  @JoinColumn()
  rating: Rating;

  @OneToOne(() => Comment, (comment) => comment.review, { cascade: true })
  @JoinColumn()
  comment: Comment;

  @DeleteDateColumn()
  deleted_at: Date;
}
