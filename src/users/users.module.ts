import { Module, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongodbModule } from '../config/mongodb/mongodb.module';
import { UserProviders } from '../providers/users.providers'
import { UsersController } from './users.controller';

@Module({
  imports: [MongodbModule],
  providers: [Logger, UsersService, ...UserProviders],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
