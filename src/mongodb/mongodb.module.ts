import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const entities = getMetadataArgsStorage()
          .tables.map((tbl) => tbl.target as Function)
          .filter((entity) =>
            entity.toString().toLowerCase().includes('entity'),
          );

        return {
          type: 'mongodb',
          url: configService.get('MONGO_URL'),
          database: configService.get('DATABASE_NAME'),
          entities,
          logging: true,
          authSource: 'admin',
          //   synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongodbModule {}
