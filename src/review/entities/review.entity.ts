import { Comment } from 'src/comments/entities/comment.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column('decimal', { precision: 2, scale: 1 })
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  movie: Movie;

  @OneToMany(() => Comment, (comment) => comment.review, { onDelete: 'CASCADE' })
  comments: Comment[];

  @OneToMany(() => Rating, (rating) => rating.review, { onDelete: 'CASCADE' })
  ratings: Rating[];

  @DeleteDateColumn()
  deleted_at: Date;
}
