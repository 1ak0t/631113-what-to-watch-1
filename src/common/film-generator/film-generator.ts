import {FilmGeneratorInterface} from './film-generator.interface.js';
import {MockData} from '../../types/mock-data.types.js';
import {getRandomItem, getRandomItems} from '../../utils/random.js';

export default class FilmGenerator implements FilmGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {

    const names = getRandomItem<string>(this.mockData.names);
    const posterImage = getRandomItem<string>(this.mockData.posterImages);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImages);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColors);
    const description = getRandomItem<string>(this.mockData.description);
    const rating = getRandomItem<number>(this.mockData.ratings);
    const scoresCount = getRandomItem<number>(this.mockData.scoresCounts);
    const director = getRandomItem<string>(this.mockData.director);
    const starring = getRandomItems<string>(this.mockData.starring).join(',');
    const runTime = getRandomItem<number>(this.mockData.runTime);
    const genre = getRandomItem<string>(this.mockData.genres);
    const released = getRandomItem<number>(this.mockData.released);
    const id = getRandomItem<number>(this.mockData.id);
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite);
    const videoLink = getRandomItem<string>(this.mockData.videoLink);
    const previewVideoLink = getRandomItem<string>(this.mockData.previewVideoLink);

    return [
      names,
      posterImage,
      previewImage,
      backgroundImage,
      backgroundColor,
      description,
      rating,
      scoresCount,
      director,
      starring,
      runTime,
      genre,
      released,
      id,
      isFavorite,
      videoLink,
      previewVideoLink
    ].join('\t');
  }
}
