import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ComentsModule } from './comments/comments.module';
import { typeORM } from './config/typeORM';
import { GenderModule } from './gender/gender.module';
import { MovieGenderModule } from './movie_gender/movie_gender.module';
import { MoviesModule } from './movies/movies.module';
import { PhotosModule } from './photos/photos.module';
import { RatingModule } from './rating/rating.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';

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
    GenderModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
