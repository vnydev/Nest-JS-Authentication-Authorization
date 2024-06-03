import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose'
import { UserDto } from '../dto/users.dto'
import { User } from '../interfaces/users.interface'
import { USER_EXIST } from '../common/constants'

@Injectable()
export class UsersService {
    
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<UserDto>,
    ) {

    }

    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);     
    }

    async findOneUser(query: UserDto): Promise<User> {
        return await this.userModel.findOne(query).exec()
    }

    async createUser(data: UserDto): Promise<User> {
        const isUserExist = await this.findOneUser({email: data.email})
        if (isUserExist) {
            throw new HttpException(USER_EXIST, HttpStatus.UNPROCESSABLE_ENTITY, {cause: new Error(USER_EXIST)})
        }
        const hash = await this.hashPassword(data.password) 
        const user = {
            ...data,
            password: hash
        }
        const newUser = new this.userModel(user)
        return await newUser.save()
    }
}
