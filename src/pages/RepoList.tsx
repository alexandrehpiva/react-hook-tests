import axios from 'axios';
import React, { Component } from 'react';
import { RepoList as RepoListType } from '../types/RepoList';

type RepoListState = {
  repositories: RepoListType;
};

class RepoList extends Component {
  state: RepoListState = {
    repositories: [],
  };

  async componentDidMount() {
    const { data } = await axios.get<RepoListType>(
      'https://api.github.com/users/alexandrehpiva/repos'
    );

    this.setState({
      repositories: data,
    });
  }

  render() {
    return (
      <ul>
        {this.state.repositories.map(repo => (
          <li key={repo!.id}>{repo?.name}</li>
        ))}
      </ul>
    );
  }
}

export default RepoList;
