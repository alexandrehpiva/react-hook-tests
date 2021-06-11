import React, { useState, useCallback, useEffect } from 'react';

const RepoListHooks: React.FC = () => {
  const [repositories, setRepositories] = useState<string[]>([]);
  const [newRepo, setNewRepo] = useState<string>('');

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setRepositories([...repositories, newRepo]);
      setNewRepo('');
    },
    [newRepo, repositories]
  );

  const handleRemoveItem = (repoIdx: number) => () => {
    setRepositories(repositories.filter((_, idx) => idx !== repoIdx));
  };

  // useEffect(() => {
  //   console.log('list changed: ', { repositories });
  // }, [repositories]);

  return (
    <form data-testid="repo-list-form" onSubmit={handleSubmit}>
      <input
        data-testid="new-repo"
        type="text"
        value={newRepo}
        onChange={e => setNewRepo(e.target.value)}
      />
      <button data-testid="submit-button" type="submit">
        Salvar
      </button>

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
