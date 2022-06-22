import {User} from './user.types';

export type Film = {
  name: string;
  description: string;
  date: Date;
  genre: string;
  released: number;
  rating: number;
  previewVideoLink: string;
  videoLink: string;
  starring: string;
  director: string;
  runTime: number;
  comments: number;
  user: User;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
}
