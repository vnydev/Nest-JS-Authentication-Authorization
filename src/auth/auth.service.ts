import { Injectable, HttpException, HttpStatus, Logger} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { USER_NOT_FOUND, UNAUTHORIZED_USER, INTERNAL_SERVER_ERROR } from '../common/constants'
import { User } from '../interfaces/users.interface'

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        private logger: Logger
    ) {
    }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findOneUser({email: username})

        if(!user) {
            this.logger.error(USER_NOT_FOUND, new Error(USER_NOT_FOUND), 'validateUser')
            throw new HttpException(
                USER_NOT_FOUND,
                HttpStatus.NOT_FOUND,
                {cause: new Error(USER_NOT_FOUND)}
            )
        }

        const isValidPassword = await this.usersService.comparePassword(password, user.password)

        if(!isValidPassword) {
            this.logger.error(UNAUTHORIZED_USER, new Error(UNAUTHORIZED_USER), 'validateUser')
            throw new HttpException(
                UNAUTHORIZED_USER,
                HttpStatus.UNAUTHORIZED,
                {cause: new Error(UNAUTHORIZED_USER)}
            )
        }
        
        return user
    }

    async login(user: User) {
        try {
            const payload = {
                name: user.name,
                email: user.email,
                id: user._id
            }
            const { accessToken } = await this.createToken(payload as User)
    
            return { accessToken }
        } catch(error) {
            this.logger.error(INTERNAL_SERVER_ERROR, error, 'login')
            throw new HttpException(
                INTERNAL_SERVER_ERROR,
                HttpStatus.INTERNAL_SERVER_ERROR,
                {cause: new Error(INTERNAL_SERVER_ERROR)}
            )
        }
        
    }

    async createToken(payload: User) {
        const accessToken = this.jwtService.sign(
            payload
            // {
            //     secret: process.env.JWT_TOKEN_SECRETE,
            //     expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME
            // }
        )

        return { accessToken }
    }

    verifyToken(password: string) {
        
    }
    refreshToken(password: string) {
        
    }
}
