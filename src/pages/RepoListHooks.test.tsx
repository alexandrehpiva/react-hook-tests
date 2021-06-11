import React from 'react';
import { render } from '@testing-library/react';
import RepoListHooks from './RepoListHooks';

describe('RepoList', () => {
  it('should be possible to add new repository', () => {
    const { container } = render(<RepoListHooks />);

    console.log(container.innerHTML);
  });
});
