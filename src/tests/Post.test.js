import React from 'react';
import { render } from '@testing-library/react';
import Post from '../components/Post';

test('Post component renders correctly', () => {
  const postData = {
    username: 'TestUser',
    content: 'This is a test post.',
    comments: []
    // Add any other necessary fields according to your actual data structure
  };
  const reDisplay = jest.fn(); // Mock the reDisplay function

  const { container } = render(
    <Post postData={postData} reDisplay={reDisplay} post_id="123" />
  );

  expect(container.firstChild).toMatchSnapshot();
});
