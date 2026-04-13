import { render, screen } from '@testing-library/react';
import App from './App';

test('displays the group number', () => {
  render(<App />);
  expect(screen.getByText(/Group Number: Group 12/i)).toBeInTheDocument();
});

test('displays the Team Members heading', () => {
  render(<App />);
  expect(screen.getByText(/Team Members/i)).toBeInTheDocument();
});

test('displays at least one team member name', () => {
  render(<App />);
  expect(screen.getByText(/Thiego Gomes Rechi/i)).toBeInTheDocument();
});

test('displays all team member names', () => {
  render(<App />);
  expect(screen.getByText(/Tyler Le/i)).toBeInTheDocument();
  expect(screen.getByText(/Imaekhai Imaekhai/i)).toBeInTheDocument();
});
