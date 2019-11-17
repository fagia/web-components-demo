import { Movie } from "../models/movie";

export class MovieService {
    async addMovie(movie: Movie): Promise<Movie> {
        const response = await fetch('/movie-database/api/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        });
        return await response.json();
    }
}