import {FilmGeneratorInterface} from './film-generator.interface.js';
import {MockData} from '../../types/mock-data.types.js';
import {getRandomItem, getRandomItems} from '../../utils/random.js';

export default class FilmGenerator implements FilmGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {

    const names = getRandomItem<string>(this.mockData.names);
    const posterImage = getRandomItem<string>(this.mockData.posterImages);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImages);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColors);
    const description = getRandomItem<string>(this.mockData.description);
    const rating = getRandomItem<number>(this.mockData.ratings);
    const comments = getRandomItem<number>(this.mockData.comments);
    const director = getRandomItem<string>(this.mockData.director);
    const starring = getRandomItems<string>(this.mockData.starring).join(',');
    const runTime = getRandomItem<number>(this.mockData.runTime);
    const genre = getRandomItem<string>(this.mockData.genres);
    const released = getRandomItem<number>(this.mockData.released);
    const videoLink = getRandomItem<string>(this.mockData.videoLink);
    const previewVideoLink = getRandomItem<string>(this.mockData.previewVideoLink);
    const date = getRandomItem<string>(this.mockData.date);
    const user = getRandomItem<string>(this.mockData.user);
    const avatar = getRandomItem<string>(this.mockData.avatar);
    const email = getRandomItem<string>(this.mockData.email);

    return [
      names,
      description,
      date,
      genre,
      released,
      rating,
      previewVideoLink,
      videoLink,
      starring,
      director,
      runTime,
      comments,
      user,
      email,
      avatar,
      posterImage,
      backgroundImage,
      backgroundColor
    ].join('\t');
  }
}
