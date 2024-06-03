import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service'
import { User } from '../../interfaces/users.interface'

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {
      try {
        const user = await this.authService.validateUser(username, password);
      
        return user;
      } catch(error) {
        throw new HttpException(
          error.message,
          error.status,
          {cause: new Error(error)}
        )
      }
    }
}
