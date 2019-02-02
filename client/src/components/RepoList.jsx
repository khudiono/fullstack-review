import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Popular Github Repos </h4>
    There are {props.repos.length} repos.
    <br></br><br></br>
    <div>
    {props.repos.map((repo) => {
      return (
        <div class="col-12 d-flex width-full py-4 border-bottom">
          <div class="col-9 d-inline-block">
            <h3><a id="name" href={repo.url}>{repo.name}</a></h3>
            <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>    {repo.forks_count}<br></br>
            Updated {repo.updated_at}<br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      )
    })}
    </div>
  </div>
)

export default RepoList;
