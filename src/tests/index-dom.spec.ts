import { render, RenderResult } from '@testing-library/svelte';
import Index from '../routes/index.svelte';

/**
 * @jest-environment jsdom
 */

/**
 * Index displays correct content
 */

describe('homepage', () => {

  let renderedComponent: RenderResult;

  beforeEach(() => {
    renderedComponent = render(Index);
  });

  describe('test if homepage shows proper content', () => {
    test('should show the proper heading', () => {
      expect(renderedComponent.getByText('Welcome to ScratchInfo!')).toBeInTheDocument();
    });
    test('contain link to privacy policy', () => {
      expect(renderedComponent.getByText('Privacy Policy')).toBeInTheDocument();
    });
    test('contain link to privacy policy', () => {
      expect(renderedComponent.getByText('Privacy Policy')).toBeInTheDocument();
    });
  });

});
