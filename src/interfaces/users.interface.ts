import { Document } from 'mongoose';

export interface User extends Document {
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
}

export interface UserResponse {
  readonly status: number;
  readonly error?: string;
  readonly message?: string;
}