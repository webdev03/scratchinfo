import { render, RenderResult } from '@testing-library/svelte';
import About from '../routes/about.svelte';
/**
 * @jest-environment jsdom
 */

/**
 * About displays correct content
 */

describe('about page', () => {

  let renderedComponent: RenderResult;

  beforeEach(() => {
    renderedComponent = render(About);
  });

  describe('test if about page shows proper content', () => {
    test('should show a link to svelte', () => {
      expect(renderedComponent.getByText('Svelte')).toBeInTheDocument();
    });
    test('should show a link to sveltekit', () => {
      expect(renderedComponent.getByText('SvelteKit')).toBeInTheDocument();
    });
  });

});
