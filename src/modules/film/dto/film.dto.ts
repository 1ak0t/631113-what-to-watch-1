import {Expose, Type} from 'class-transformer';
import UserDto from '../../user/dto/user.dto.js';

export default class FilmDto {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public genre!: string;

  @Expose()
  public released!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public previewVideoLink!: string;

  @Expose()
  public videoLink!: string;

  @Expose()
  public starring!: string;

  @Expose()
  public director!: string;

  @Expose()
  public runTime!: number;

  @Expose()
  public comments!: number;

  @Expose()
  @Type(() => UserDto)
  public user!: UserDto;

  @Expose()
  public posterImage!: string;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public backgroundColor!: string;
}
