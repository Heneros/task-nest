import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/auth.repository';
import * as Handlers from './handlers/Registration.handler';
import { AuthEntity } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthEntity,

    AuthRepository,
    ...Object.values(Handlers),
  ],
})
export class AuthModule {}
