import { Review } from 'src/review/entities/review.entity';
import { Column, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @OneToOne(() => Review, (review) => review.comment)
  review: Review;

  @DeleteDateColumn()
  delete_at: Date;
}
