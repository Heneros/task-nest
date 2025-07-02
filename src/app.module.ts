import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongodbModule } from './mongodb/mongodb.module';
import { AuthEntity } from './auth/entities/auth.entity';

@Module({
  imports: [
    AuthModule,
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: './.env',
    }),

    NotesModule,
    MongodbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
