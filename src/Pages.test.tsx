import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pages from './Pages';

describe('title', () => {
  it('title existed in the DOM', () => {
    render(<Pages />);
    const h4 = screen.getByRole('heading', {
      name: 'Pages',
    });
    expect(h4).toBeInTheDocument();
  });
});
