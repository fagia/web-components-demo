import { Component, h, EventEmitter, Event } from '@stencil/core';

class Movie {
    title: string;
    year: number;
}

@Component({
    tag: 'add-movie-component',
    styleUrl: 'add-movie-component.css',
    shadow: true
})
export class AddMovieComponent {

    private movie: Movie = new Movie();

    @Event() movieCreated: EventEmitter;

    handleSubmit(event) {
        event.preventDefault();
        const component = this;
        const request = new XMLHttpRequest();
        request.open('POST', '/api/movie-database/movies', true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                const movie = JSON.parse(this.response);
                component.movieCreated.emit(movie);
            } else {
                console.error('got error from server', this.status, this.response);
            }
        };
        request.onerror = function () {
            console.error('failed to send request');
        };
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        request.send(JSON.stringify(this.movie));
    }
    handleChangeTitle(event) {
        this.movie.title = event.target.value;
    }
    handleChangeYear(event) {
        this.movie.year = event.target.value;
    }
    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <fieldset>
                    <legend>Add new movie</legend>
                    <p>
                        <label>Title:
                            <input type="text" value={this.movie.title} onInput={(event) => this.handleChangeTitle(event)} />
                        </label>
                    </p>
                    <p>
                        <label>Year:
                            <input type="number" value={this.movie.year} onInput={(event) => this.handleChangeYear(event)} />
                        </label>
                    </p>
                    <input type="submit" value="Submit" />
                </fieldset>
            </form>
        );
    }
}