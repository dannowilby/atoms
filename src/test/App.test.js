import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { mockDB } from './mock_db';

/**
 * These are more integration tests than unit tests. These are the general features that should always be supported.
 * They will need to be updated if the database API ever gets revamped.
 */

let testDB = null;

beforeEach(() => {
  testDB = new mockDB();
})

afterEach(() => {
  testDB = null;
})

test('renders the main page', () => {
  render(<App db={testDB} />);
  const linkElement = screen.getByText('Atoms');
  expect(linkElement).toBeInTheDocument();
});

test('can log in', async () => {
  const result = render(<App db={testDB} />);
  
  const emailField = await screen.getByRole('textbox', { name: 'Email' })
  userEvent.type(emailField, process.env.test_email);
  await waitFor(() => expect(emailField).toHaveValue(process.env.test_email))

  const passwordField = screen.getByLabelText('Password')
  userEvent.type(passwordField, process.env.test_password);
  await waitFor(() => expect(passwordField).toHaveValue(process.env.passwordField))

  const signIn = screen.getByRole('button', { name: 'Sign in' })
  await userEvent.click(signIn);
  expect(screen.getByText("Start a task")).toBeInTheDocument()
});

test('can show errors', async () => {
  const result = render(<App db={testDB} />);

  const signIn = screen.getByRole('button', { name: 'Sign in' })
  userEvent.click(signIn);
  expect(screen.getByLabelText('Error')).toBeInTheDocument()
});

test('can create a new task', async () => {
  const result = render(<App db={testDB} />);
  
  // login
  const emailField = screen.getByRole('textbox', { name: 'Email' })
  userEvent.type(emailField, process.env.test_email);
  waitFor(() => expect(emailField).toHaveValue(process.env.test_email))

  const passwordField = screen.getByLabelText('Password')
  userEvent.type(passwordField, process.env.test_password);
  waitFor(() => expect(passwordField).toHaveValue(process.env.passwordField))

  const signIn = screen.getByRole('button', { name: 'Sign in' })
  userEvent.click(signIn);
  expect(screen.getByText("Start a task")).toBeInTheDocument()

  // create the new task
  const taskNameData = "Test task name!";

  const taskName = screen.getByRole('textbox', { name: 'New task name' });
  userEvent.type(taskName, taskNameData);

  const taskSubmit = screen.getByRole('button', { name: 'Create task' });
  userEvent.click(taskSubmit);

  // check it was created successfully
  expect(screen.getByText(taskNameData)).toBeInTheDocument();

});

test('can end tasks', () => {
  const result = render(<App db={testDB} />);
  
  // login
  const emailField = screen.getByRole('textbox', { name: 'Email' })
  userEvent.type(emailField, process.env.test_email);
  waitFor(() => expect(emailField).toHaveValue(process.env.test_email))

  const passwordField = screen.getByLabelText('Password')
  userEvent.type(passwordField, process.env.test_password);
  waitFor(() => expect(passwordField).toHaveValue(process.env.passwordField))

  const signIn = screen.getByRole('button', { name: 'Sign in' })
  userEvent.click(signIn);
  expect(screen.getByText("Start a task")).toBeInTheDocument()

  // create the new task
  const taskNameData = "Test task name!";

  const taskName = screen.getByRole('textbox', { name: 'New task name' });
  userEvent.type(taskName, taskNameData);

  const taskSubmit = screen.getByRole('button', { name: 'Create task' });
  userEvent.click(taskSubmit);

  // check it was created successfully
  expect(screen.getByText(taskNameData)).toBeInTheDocument();

  const endTask = screen.getByRole('button', { name: "End task" });
  userEvent.click(endTask);

  expect(screen.getByRole('button', { name: 'Create task'})).toBeInTheDocument()
})

test('can sign out', async () => {
  const result = render(<App db={testDB} />);
  
  const emailField = await screen.getByRole('textbox', { name: 'Email' })
  userEvent.type(emailField, process.env.test_email);
  await waitFor(() => expect(emailField).toHaveValue(process.env.test_email))

  const passwordField = screen.getByLabelText('Password')
  userEvent.type(passwordField, process.env.test_password);
  await waitFor(() => expect(passwordField).toHaveValue(process.env.passwordField))

  const signIn = screen.getByRole('button', { name: 'Sign in' })
  await userEvent.click(signIn);
  expect(screen.getByText("Start a task")).toBeInTheDocument()

  const signOut = screen.getByRole('button', { name: "Sign out" });
  await userEvent.click(signOut);

  expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
})

test('are a cool guy', () => {})