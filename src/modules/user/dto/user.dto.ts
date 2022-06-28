import {Expose} from 'class-transformer';

export default class UserDto {
  @Expose()
  public userName!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;
}
