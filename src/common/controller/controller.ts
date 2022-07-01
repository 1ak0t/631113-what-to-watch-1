import {injectable} from 'inversify';
import {ControllerInterface} from './controller.interface.js';
import {Response, Router} from 'express';
import {LoggerInterface} from '../logger/logger.interface.js';
import {RouteInterface} from '../../types/route.interface.js';
import expressAsyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';

@injectable()
export abstract class Controller implements ControllerInterface {
  private readonly _router: Router;

  constructor(protected readonly logger: LoggerInterface) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: RouteInterface) {
    const routeHandler = expressAsyncHandler(route.handler.bind(this));
    const middlewares = route.middlewares?.map(
      (middleware) => expressAsyncHandler(middleware.execute.bind(middleware))
    );
    const chainHandlers = middlewares ? [...middlewares, routeHandler] : routeHandler;
    this._router[route.method](route.path, chainHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type('application/json')
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T) {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T) {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T) {
    this.send(res, StatusCodes.OK, data);
  }
}
