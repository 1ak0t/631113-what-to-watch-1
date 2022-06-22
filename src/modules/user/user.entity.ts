import {User} from '../../types/user.types.js';
import typegoose, {getModelForClass} from '@typegoose/typegoose';
import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import {createSHA256} from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends TimeStamps implements User {
  constructor(data: User) {
    super();

    this.email = data.email;
    this.userName = data.userName;
    this.avatar = data.avatar;
  }

  @prop({required: true, minlength: 1, maxlength: 15})
  public userName!: string;

  @prop({required: true, unique: true, match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect']})
  public email!: string;

  @prop()
  public avatar!: string;

  @prop()
  private password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
