import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { RepoList as RepoListType } from '../types/RepoList';

const RepoListHooks: React.FC = () => {
  const [repositories, setRepositories] = useState<RepoListType>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getRepositories = async () => {
    setLoading(true);
    const { data } = await axios.get<RepoListType>(
      'http://api.github.com/users/alexandrehpiva/repos'
    );

    if (data.length) {
      setRepositories(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRepositories();
  }, []);

  if (loading) {
    return <span>Carregando...</span>;
  }

  return (
    <div>
      <ul>
        {repositories.map(repo => (
          <li key={repo!.id}>{repo?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RepoListHooks;
