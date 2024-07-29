import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { RatingModule } from './rating/rating.module';
import { ComentsModule } from './coments/coments.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [UserModule, ReviewModule, RatingModule, ComentsModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
