import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

describe('SummaryForm', () => {
  test('Initial conditions', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', { name: /confirm order/i });
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('Checkbox enable button on first click and disable on second click', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', { name: /confirm order/i });

    // clicking checkbox enable button
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
    // clicking checkbox again disable button
    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});
