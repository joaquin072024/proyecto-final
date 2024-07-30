import { Review } from 'src/review/entities/review.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { Rating } from 'src/rating/entities/rating.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  passwordHash: string;

  @Column({ type: 'enum', default: Role.User, enum: Role })
  role?: Role;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
  comments: any;

  @DeleteDateColumn()
  delete_at: Date;
}
