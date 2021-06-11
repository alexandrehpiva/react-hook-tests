import React from 'react';
import {
  fireEvent,
  getByTestId,
  getByText,
  render,
  waitFor,
} from '@testing-library/react';
import RepoListHooks from './RepoListHooks';

describe('RepoListHooks', () => {
  it('should render RepoListHooks form', async () => {
    const { findByTestId } = render(<RepoListHooks />);

    expect(await findByTestId('repo-list-form')).toBeTruthy();
  });

  it('should be possible to add new repository', async () => {
    const { container, findByTestId, findByText } = render(<RepoListHooks />);

    const newRepoInput = await findByTestId('new-repo');
    const saveButton = await findByText('Salvar');
    const list = await findByTestId('repo-list');

    fireEvent.change(newRepoInput, { target: { value: 'ReactJs' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      const listItem = getByText(list, 'ReactJs');
      expect(listItem).toBeInTheDocument();
    });

    console.log(container.innerHTML);
  });
});
