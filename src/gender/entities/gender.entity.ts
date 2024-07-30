import { MovieGender } from 'src/movie_gender/entities/movie_gender.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  gender: string;

  @OneToMany(() => MovieGender, (movieGender) => movieGender.gender)
  movie_genders: MovieGender[];

  @DeleteDateColumn()
  delete_at: Date;
}
