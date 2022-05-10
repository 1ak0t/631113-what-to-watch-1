import {FileReaderInterface} from './file-reader.interface';
import {readFileSync} from 'fs';
import {Film} from '../../types/films.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Film[] {
    if(!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([name, posterImage, previewImage, backgroundImage, backgroundColor, description, rating, scoresCount, director, starring, runTime, genre, released, id, isFavorite, videoLink, previewVideoLink]) => ({
        name,
        posterImage,
        previewImage,
        backgroundImage,
        backgroundColor,
        description,
        rating: Number(rating),
        scoresCount: Number(scoresCount),
        director,
        starring,
        runTime: Number(runTime),
        genre,
        released: Number(released),
        id: Number(id),
        isFavorite: Boolean(isFavorite),
        videoLink,
        previewVideoLink
      }));
  }
}
