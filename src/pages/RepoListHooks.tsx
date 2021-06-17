import React, { useState, useCallback } from 'react';

// type BtnTId<T extends string, I extends string | number> = `btn-${T}(${I})`;

// type RepoListHooksTIds =
//   | 'repo-list-form'
//   | 'new-repo'
//   | 'submit-button'
//   | 'repo-list'
//   | BtnTId<'remove', number>;

const RepoListHooks: React.FC = () => {
  const [repositories, setRepositories] = useState<string[]>([]);
  const [newRepo, setNewRepo] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError('');

      // Validate if is empty
      if (newRepo.trim() === '') {
        setError('The repo name cannot be empty!');
        return;
      }

      setRepositories([...repositories, newRepo]);
      setNewRepo('');
    },
    [newRepo, repositories]
  );

  const handleRemoveItem = (repoIdx: number) => () => {
    setRepositories(repositories.filter((_, idx) => idx !== repoIdx));
  };

  return (
    <form data-testid="repo-list-form" onSubmit={handleSubmit}>
      <input
        data-testid="new-repo"
        type="text"
        value={newRepo}
        onChange={e => setNewRepo(e.target.value)}
      />
      <button data-testid="submit-button" type="submit">
        Save
      </button>
      {error && <div data-testid="error-message">{error}</div>}

      <ul data-testid="repo-list">
        {repositories.map((repo, idx) => (
          <li key={idx}>
            <span>{repo}</span>
            <button
              type="button"
              data-testid={`btn-remove(${repo})`}
              onClick={handleRemoveItem(idx)}
            >
              Apagar
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default RepoListHooks;
