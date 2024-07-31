import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { RatingModule } from './rating/rating.module';
import { ComentsModule } from './comments/comments.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORM } from './config/typeORM';
import { MovieGenderModule } from './movie_gender/movie_gender.module';
import { GenderModule } from './gender/gender.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORM()),
    UserModule,
    ReviewModule,
    RatingModule,
    ComentsModule,
    MoviesModule,
    AuthModule,
    MovieGenderModule,
    GenderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
