import React from 'react';
import { render } from '@testing-library/react';
import { UserCredentials } from '../App';
import Header from '../components/Header';

const contextValue = {
  setCredentials: jest.fn(),
  setAuthToken: jest.fn(),
};

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    Link: ({ children }) => <div>{children}</div>, // Mock Link component
  };
});

test('Renders username if credentials prop is provided', () => {
  const credentials = { username: 'TestUser' };
  const { getByText } = render(
    <UserCredentials.Provider value={contextValue}>
      <Header credentials={credentials} />
    </UserCredentials.Provider>
  );
  const usernameElement = getByText(`Welcome ${credentials.username}`);
  expect(usernameElement).toBeInTheDocument();
});

