import {CliCommandInterface} from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import {createFilm, getErrorMessage} from '../utils/common.js';
import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import {FilmServiceInterface} from '../modules/film/film-service.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import UserService from '../modules/user/user-service.js';
import {FilmModel} from '../modules/film/film.entity.js';
import {UserModel} from '../modules/user/user.entity.js';
import FilmService from '../modules/film/film-service.js';
import DatabaseService from '../common/database-client/database.service.js';
import {Film} from '../types/films.types.js';
import {getURI} from '../utils/db.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userServise!: UserServiceInterface;
  private filmService!: FilmServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.userServise = new UserService(this.logger, UserModel);
    this.filmService = new FilmService(this.logger, FilmModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveFilm(film: Film) {
    const user = await this.userServise.findOrCreate({
      ...film.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.filmService.create({
      ...film,
      user: user.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const film = createFilm(line);
    await this.saveFilm(film);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) {
        console.log(`Can't read the file: ${getErrorMessage(err)}`);
      }
    }
  }
}
