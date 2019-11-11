import { Component, Prop, EventEmitter, Event, h, State, Element } from '@stencil/core';

class Movie {
    title: string;
    year: number;
}

@Component({
    tag: 'add-movie-component',
    styleUrls: {
        default: 'stylesheets/add-movie-component.default.scss',
        green: 'stylesheets/add-movie-component.green.scss',
        blue: 'stylesheets/add-movie-component.blue.scss',
    },
    shadow: true
})
export class AddMovieComponent {

    @State() private movie: Movie = new Movie();
    @Element() private element: HTMLElement;

    @Prop() mode: string;
    @Prop({ attribute: 'allow-cancel' }) allowCancel: boolean = false;

    @Event() movieCreated: EventEmitter;
    @Event() movieCreationCanceled: EventEmitter;

    handleSubmit(event) {
        event.preventDefault();
        const component = this;
        const request = new XMLHttpRequest();
        request.open('POST', '/api/movie-database/movies', true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                const movie = JSON.parse(this.response);
                component.movieCreated.emit(movie);
                component.clear();
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
    handleCancel() {
        this.movieCreationCanceled.emit();
        this.clear();
    }
    handleChangeTitle(event) {
        this.movie.title = event.target.value;
    }
    handleChangeYear(event) {
        this.movie.year = event.target.value;
    }
    clear() {
        this.movie = new Movie();
        this.element.shadowRoot.querySelector('form').reset();
    }
    render() {
        console.log(`rendering component with: mode[${this.mode ? this.mode : 'default'}], allow-cancel[${this.allowCancel}]`);
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">Title</label>
                            <div class="control">
                                <input class="input" type="text" onInput={e => this.handleChangeTitle(e)} required placeholder="Movie title" name="title" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">Year</label>
                            <div class="control">
                                <input class="input" type="number" onInput={e => this.handleChangeYear(e)} required min="1888" max={new Date().getFullYear()} placeholder="Movie release year" name="year" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="control buttons-area">
                            {this.allowCancel
                                ? <input onClick={() => this.handleCancel()} type="button" value="Cancel" class="button cancel" />
                                : ''
                            }
                            <input type="submit" value="Submit" class="button is-primary" />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}