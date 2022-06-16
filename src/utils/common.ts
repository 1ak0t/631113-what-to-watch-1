import {Film} from '../types/films.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [name, posterImage, previewImage, backgroundImage, backgroundColor, description, rating, scoresCount, director, starring, runTime, genre, released, id, isFavorite, videoLink, previewVideoLink] = tokens;

  return {
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
  } as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
