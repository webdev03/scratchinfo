import { render, RenderResult } from '@testing-library/svelte';
import Login from '../routes/login.svelte';

/**
 * @jest-environment jsdom
 */

/**
 * Login page displays correct content
 */
describe('homepage', () => {

  let renderedComponent: RenderResult;

  beforeEach(() => {
    renderedComponent = render(Login);
  });

  describe('elements are displayed', () => {
    test('should show the proper heading', () => {
      expect(renderedComponent.getByText("Log in with ScratchLight Auth")).toBeInTheDocument()
    });
    test('should show button to log in', () => {
      expect(renderedComponent.getByText("Log in with ScratchLight")).toBeInTheDocument()
    });
  });
});
