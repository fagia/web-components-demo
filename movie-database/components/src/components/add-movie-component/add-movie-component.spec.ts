jest.mock('../../services/movie-service');
import { MovieService } from '../../services/movie-service';
const addMovieMock = jest.fn();
(MovieService as any).mockImplementation(() => {
  return {
    addMovie: addMovieMock,
  };
});

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AddMovieComponent } from './add-movie-component';

describe('add-movie-component', () => {

  let page: SpecPage;
  let component: HTMLElement;
  let componentContent: ShadowRoot;

  beforeEach(async () => {
    (MovieService as any).mockClear();
    page = await newSpecPage({
      components: [AddMovieComponent],
      html: '<add-movie-component></add-movie-component>',
    });
    await page.setContent('<add-movie-component></add-movie-component>');
    component = page.body.querySelector('add-movie-component');
    componentContent = component.shadowRoot;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
    expect(componentContent).toBeTruthy();
  });

  it('should submit a movie', async () => {
    const form = componentContent.querySelector('form');

    const titleInput = form.querySelector('input[name="title"]');
    titleInput['value'] = 'a title';
    titleInput.dispatchEvent(new Event('input'));

    const yearInput = form.querySelector('input[name="year"]');
    yearInput['value'] = 2019;
    yearInput.dispatchEvent(new Event('input'));

    form.dispatchEvent(new Event('submit'));

    expect(addMovieMock).toHaveBeenCalledTimes(1);
    expect(addMovieMock).toHaveBeenCalledWith({
      title: 'a title',
      year: 2019,
    });
  });

  it('should accept both strings and numbers as year inputs', () => {
    const component: AddMovieComponent = new AddMovieComponent();
    component.handleChangeYear({ target: { value: 1999 } });
    expect(component.state.year).toBe(1999);
    component.handleChangeYear({ target: { value: '2000' } });
    expect(component.state.year).toBe(2000);
  });

});
