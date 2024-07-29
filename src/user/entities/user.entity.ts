import { Review } from 'src/review/entities/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'user' })
  role?: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
  comments: any;
}
