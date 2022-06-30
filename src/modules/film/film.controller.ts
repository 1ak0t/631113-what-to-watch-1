import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {FilmServiceInterface} from './film-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import FilmDto from './dto/film.dto.js';
import CreateFilmDto from './dto/create-film.dto.js';
import HttpError from '../../common/errors/http-error.js';
import * as core from 'express-serve-static-core';
import {ValidateObjectMiddleware} from '../../common/middlewares/validate-object.middleware.js';

type ParamsGetFilm = {
  filmId: string;
}

type ParamsGetGenre = {
  genreName: string;
}

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:filmId', method: HttpMethod.Get, handler: this.get, middlewares: [new ValidateObjectMiddleware('filmId')]});
    this.addRoute({path: '/:filmId', method: HttpMethod.Delete, handler: this.delete, middlewares: [new ValidateObjectMiddleware('filmId')]});
    this.addRoute({path: '/:filmId', method: HttpMethod.Put, handler: this.update, middlewares: [new ValidateObjectMiddleware('filmId')]});
    this.addRoute({path: '/genre/:genreName', method: HttpMethod.Get, handler: this.getByGenre});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.filmService.find();
    const filmsDTO = fillDTO(FilmDto, films);
    this.ok(res, filmsDTO);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response): Promise<void> {

    const existFilm = await this.filmService.findByName(body.name);

    if (existFilm) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Film with name «${body.name}» exists.`,
        'FilmController'
      );
    }

    const result = await this.filmService.create(body);
    this.created(res, fillDTO(CreateFilmDto, result));
  }

  public async get(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {

    const {filmId} = params;
    const film = await this.filmService.findById(filmId);

    if (!film) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${filmId} not found.`,
        'FilmController'
      );
    }

    this.ok(res, fillDTO(FilmDto, film));
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>, CreateFilmDto>,
    res: Response
  ): Promise<void> {

    const {filmId} = params;
    const updatedFilm = await this.filmService.updateById(filmId, body);

    if (!updatedFilm) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${filmId} not found.`,
        'FilmController'
      );
    }

    this.ok(res, fillDTO(CreateFilmDto, updatedFilm));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {

    const {filmId} = params;

    const film = this.filmService.deleteById(filmId);

    if (!film) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${filmId} not found`,
        'FilmController'
      );
    }

    this.noContent(res, film);
  }

  public async getByGenre(
    {params}: Request<core.ParamsDictionary | ParamsGetGenre>,
    res: Response
  ): Promise<void> {

    const {genreName} = params;

    const filmByGenre = await this.filmService.findByGenre(genreName);

    if (!filmByGenre) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film in ${genreName} genre not found`,
        'FilmController'
      );
    }

    this.ok(res, fillDTO(FilmDto, filmByGenre));
  }
}
