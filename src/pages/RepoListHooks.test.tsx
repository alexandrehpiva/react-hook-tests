import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RepoListHooks from './RepoListHooks';

// TODO: Testar se ao preencher o input com um texto e enviar, vai existir um registro na lista

describe('RepoListHooks', () => {
  it('should render RepoListHooks form', async () => {
    const { findByTestId } = render(<RepoListHooks />);
    const form = await findByTestId('repo-list-form');

    expect(form).toBeInTheDocument();
  });

  it('should add an item to repository list', async () => {
    const { findByTestId, findByText } = render(<RepoListHooks />);

    const newRepoInput = await findByTestId('new-repo');
    const submitButton = await findByTestId('submit-button');

    fireEvent.change(newRepoInput, { target: { value: 'New Repo' } });
    fireEvent.click(submitButton);

    await waitFor(async () => {
      const listItem = await findByText('New Repo');

      // Inserted list item
      expect(listItem).toBeInTheDocument();

      // Input reset
      expect(newRepoInput.innerHTML).toBe('');
    });
  });

  it('should remove an item from repository list', async () => {
    const { findByTestId, queryByText } = render(<RepoListHooks />);
    // console.log(container.innerHTML);

    const newRepoInput = await findByTestId('new-repo');
    const submitButton = await findByTestId('submit-button');

    // Add an item to list
    fireEvent.change(newRepoInput, { target: { value: 'New Repo' } });
    fireEvent.click(submitButton);

    // Find the list item, get the delete button in it and click
    const listItem = queryByText('New Repo')?.closest('li');

    await waitFor(async () => {
      expect(listItem).toBeTruthy();
    });

    const deleteBtn = await findByTestId('btn-remove(New Repo)');
    expect(deleteBtn).toBeInTheDocument();

    const itemDeleteBtn = await screen.findByText('Apagar');
    itemDeleteBtn.click();

    expect(listItem).not.toBeInTheDocument();
  });

  it('should not insert any item if the input is empty', async () => {
    const { findByTestId, queryByTestId } = render(<RepoListHooks />);

    // Find the input and make sure it is empty
    const input = (await findByTestId('new-repo')) as HTMLInputElement;
    expect(input.value).toBe('');

    // Find the ul repo-list and make sure it doesn't contain any li inside
    const repoList = (await findByTestId('repo-list')) as HTMLUListElement;
    expect(repoList.querySelector('li')).toBeFalsy();
    // expect(repoList.innerHTML).toBe('');

    // Find the submit button and click on it
    const submitBtn = (await findByTestId(
      'submit-button'
    )) as HTMLButtonElement;
    submitBtn.click();

    await waitFor(async () => {
      // Expect to NOT find any li inside of the ul repo-list
      expect(repoList.querySelector('li')).toBeFalsy();
      // expect(repoList.innerHTML).toBe('');

      // TODO: Expect to find a span error-message
      expect(queryByTestId('error-message')).toBeInTheDocument();
    });

    // TODO: Fill the input with some text and click on submit button
    // TODO: Expect to not find the error-message element
  });
});
