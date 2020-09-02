import { prop } from '@typegoose/typegoose';

export class Register {
  @prop()
  userName: string
  @prop()
  password: string
  @prop()
  email: string
}