import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import typegoose, {getModelForClass, Ref} from '@typegoose/typegoose';
import {GenreTypes} from '../../types/genre-types.emun.js';
import {UserEntity} from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface FilmEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'films'
  }
})

export class FilmEntity extends TimeStamps {

  @prop({required: true, minlength: 2, maxlength: 100})
  public name!: string;

  @prop({required: true, minlength: 20, maxlength: 1024})
  public description!: string;

  @prop({required: true, default: new Date()})
  public date!: string;

  @prop({required: true, enum: GenreTypes})
  public genre!: string;

  @prop({required: true})
  public released!: number;

  @prop({required: true})
  public rating!: number;

  @prop({required: true})
  public previewVideoLink!: string;

  @prop({required: true})
  public videoLink!: string;

  @prop({required: true})
  public starring!: string;

  @prop({required: true, minlength: 2, maxlength: 50})
  public director!: string;

  @prop({required: true})
  public runTime!: number;

  @prop()
  public comments!: number;

  @prop({required: true, ref: UserEntity})
  public user!: Ref<UserEntity>;

  @prop({required: true})
  public posterImage!: string;

  @prop({required: true})
  public backgroundImage!: string;

  @prop({required: true})
  public backgroundColor!: string;
}

export const FilmModel = getModelForClass(FilmEntity);
