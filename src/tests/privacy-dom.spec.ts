import { render, RenderResult } from '@testing-library/svelte';
import Privacy from '../routes/privacy.svelte';

/**
 * @jest-environment jsdom
 */

/**
 * Privacy displays privacy policy
 */

describe('privacy', () => {

  let renderedComponent: RenderResult;

  beforeEach(() => {
    renderedComponent = render(Privacy);
  });

  describe('test if privacy policy shows policy content', () => {
    test('contain vercel', () => {
      expect(renderedComponent.getByText('Vercel')).toBeInTheDocument();
    });
  });

});
