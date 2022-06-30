import {Expose} from 'class-transformer';

export default class CreateFilmDto {

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
  public user!: string;

  @Expose()
  public posterImage!: string;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public backgroundColor!: string;
}
