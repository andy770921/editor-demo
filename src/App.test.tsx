import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('counter', () => {
  it('counter existed in the DOM', () => {
    render(<App />);
    const button = screen.getByRole('button', {
      name: /count is 0/i,
    });
    expect(button).toBeInTheDocument();
  });
});
