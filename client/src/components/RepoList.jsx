import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <br></br><br></br>
    <div>
    {props.repos.map((repo) => {
      return (
        <div>
          <a href={repo.url}>{repo.name}</a><br></br>
          {repo.description}<br></br>
          Forks Count: {repo.forks_count}<br></br>
          Updated {repo.updated_at}<br></br>
          <br></br>
          <br></br>
        </div>
      )
    })}
    </div>
  </div>
)

export default RepoList;
