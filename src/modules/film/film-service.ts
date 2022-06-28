import {FilmServiceInterface} from './film-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {FilmEntity} from './film.entity.js';
import CreateFilmDto from './dto/create-film.dto.js';
import {DocumentType} from '@typegoose/typegoose';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: ModelType<FilmEntity>
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film added: ${dto.name}`);

    return result;
  }

  public async findByName(filmName: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findOne({name: filmName}).exec();
  }

  public async find(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel.find();
  }
}
