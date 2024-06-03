import { Controller, Post, Request, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponse } from '../interfaces/users.interface';
import { UserDto } from '../dto/users.dto'
import { SERVICE_UNAVAILABLE, USER_REGISTER } from '../common/constants'

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
        private readonly logger: Logger
    ) {}

    @Post('/signup')
    async registerUser(
        @Body() user: UserDto
    ): Promise<UserResponse> {
        try {
            await this.usersService.createUser(user)
            return {
                status: HttpStatus.CREATED,
                message: USER_REGISTER
            }
        } catch(error) {
            this.logger.error(error.message, error, 'register-user')
            throw new HttpException({
                status: error.status || HttpStatus.SERVICE_UNAVAILABLE,
                error: error.message || SERVICE_UNAVAILABLE
            }, error.status || HttpStatus.SERVICE_UNAVAILABLE , {
                cause: error
            })
        }
    }

}
