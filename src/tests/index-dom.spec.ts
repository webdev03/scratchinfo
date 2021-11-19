import { render, RenderResult } from '@testing-library/svelte';
import Index from '../routes/index.svelte';

/**
 * @jest-environment jsdom
 */

/**
 * Index displays correct content
 *
 * @see https://jestjs.io/docs/getting-started
 * @see https://github.com/testing-library/jest-dom
 */

describe('Index', () => {

  let renderedComponent: RenderResult;

  beforeEach(() => {
    renderedComponent = render(Index);
  });

  describe('test if index shows proper content', () => {

    test('should show the proper heading', () => {
      expect(renderedComponent.getByText('Welcome to ScratchInfo!')).toBeInTheDocument();
    });

  });

});
