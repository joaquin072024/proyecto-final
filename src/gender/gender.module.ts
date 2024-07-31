import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  controllers: [GenderController],
  providers: [GenderService],
})
export class GenderModule {}
