import {Film} from '../types/films.types.js';
import crypto from 'crypto';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [name, description, date, genre, released, rating, previewVideoLink, videoLink, starring, director, runTime, comments, userName, email, avatar, posterImage, backgroundImage, backgroundColor] = tokens;

  return {
    name,
    description,
    date: new Date(date),
    genre,
    released: Number(released),
    rating: Number(rating),
    previewVideoLink,
    videoLink,
    starring,
    director,
    runTime: Number(runTime),
    comments: Number(comments),
    user: {
      userName: userName,
      email: email,
      avatar: avatar},
    posterImage,
    backgroundImage,
    backgroundColor
  } as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string) => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
