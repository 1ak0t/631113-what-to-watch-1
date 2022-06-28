import CreateFilmDto from './dto/create-film.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';

export interface FilmServiceInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findByName(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  find(): Promise<DocumentType<FilmEntity>[]>;
}
