import { Module } from '@nestjs/common';
import { databaseProviders } from './mongodb.providers';

@Module({
  providers: [
    ...databaseProviders,
  ],
  exports: [...databaseProviders]
})
export class MongodbModule {}
