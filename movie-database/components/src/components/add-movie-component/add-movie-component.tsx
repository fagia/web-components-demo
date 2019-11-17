import { Component, Prop, EventEmitter, Event, h, State, Element } from '@stencil/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie-service';

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
    private movieService: MovieService = new MovieService();

    /**
     * Optional property that allows to define the styling of the component.
     * Possible values: `blue`, `green`.
    */
    @Prop() mode: string = 'default';

    /** Optional property that allows to control whether the form's cancel button has to be rendered or not. */
    @Prop({ attribute: 'allow-cancel' }) allowCancel: boolean = false;

    /** Events emitted at every successful movie creation. */
    @Event() movieCreated: EventEmitter<Movie>;

    /** Event emitted everytime the user clicks on the cancel button. */
    @Event() movieCreationCanceled: EventEmitter<never>;

    async handleSubmit(event) {
        event.preventDefault();
        const addedMovie = await this.movieService.addMovie(this.movie);
        this.movieCreated.emit(addedMovie);
        this.clear();
    }

    handleCancel() {
        this.movieCreationCanceled.emit();
        this.clear();
    }

    handleChangeTitle(event) {
        this.movie.title = event.target.value;
    }

    handleChangeYear(event) {
        this.movie.year = parseInt(event.target.value, 10);
    }

    clear() {
        this.movie = new Movie();
        const form = this.element.shadowRoot.querySelector('form');
        if (form.reset) {
            form.reset();
        }
    }

    get state(): Movie {
        return this.movie;
    }

    render() {
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