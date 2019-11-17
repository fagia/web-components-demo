import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('add-movie-component', () => {

  it('should render the add movie form', async () => {
    const page = await newE2EPage();
    await page.setContent('<add-movie-component></add-movie-component>');
    const form = await page.find('add-movie-component >>> form');

    const titleInput = await form.find('input[name="title"]');
    await titleInput.focus();
    await page.keyboard.type('a title');
    expect(await titleInput.getProperty('value')).toBe('a title');

    const yearInput = await form.find('input[name="year"]');
    await yearInput.focus();
    await page.keyboard.type('2019');
    expect(await yearInput.getProperty('value')).toBe("2019");

    const submitBtn = await form.find('input[type="submit"]');
    expect(submitBtn).toBeTruthy();

    const cancelBtn = await form.find('input.cancel[type="button"]');
    expect(cancelBtn).toBeFalsy();
  });

  it('should render the cancel button', async () => {
    const page = await newE2EPage();
    await page.setContent('<add-movie-component allow-cancel="true"></add-movie-component>');
    const form = await page.find('add-movie-component >>> form');

    const cancelBtn = await form.find('input.cancel[type="button"]');
    expect(cancelBtn).toBeTruthy();
  });

});
