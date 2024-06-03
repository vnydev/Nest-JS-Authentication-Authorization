import { Module, Logger } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service';
import { LocalStrategyService } from './local.strategy/local.strategy.service';
import { JWT_TOKEN_EXPIRE_TIME, JWT_TOKEN_SECRETE } from '../common/constants'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_TOKEN_SECRETE,
      signOptions: {expiresIn: JWT_TOKEN_EXPIRE_TIME},
    })
  ],
  providers: [AuthService, LocalStrategyService, Logger],
  exports: [AuthService]
})
export class AuthModule {}
