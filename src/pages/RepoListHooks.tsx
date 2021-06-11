import React, { useState, useCallback } from 'react';

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

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newRepo}
        onChange={e => setNewRepo(e.target.value)}
      />
      <button type="submit">Salvar</button>

      <ul>
        {repositories.map(repo => (
          <li key={repo}>{repo}</li>
        ))}
      </ul>
    </form>
  );
};

export default RepoListHooks;
