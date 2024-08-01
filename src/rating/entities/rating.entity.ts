import { Review } from 'src/review/entities/review.entity';
import { Column, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  rating: number;

  @OneToOne(() => Review, (review) => review.rating)
  review: Review;

  @DeleteDateColumn()
  delete_at: Date;
}
