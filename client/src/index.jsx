import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.server = 'http://localhost:1128/'
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    this.get();
  }

  search (term) {
    console.log(`${term} was searched`);
    var data = JSON.stringify({username: term});
    $.ajax({
      url: `${this.server}/repos`,
      method: 'POST',
      contentType: 'application/json',
      data: data,
      success: (repos) => {
      console.log('SUCCESS POST', repos);
      this.get();
      },
      error: (data) => {
        console.log('ERROR', data)
      }
    })
  }

  get() {
    $.ajax({
      url: `${this.server}/repos`,
      method: 'GET',
      success: (data) => {
        console.log('SUCCESS GET', data);
        this.setState({repos: data.repos});
      },
      error: data => {
        this.server = 'https://github-fetcher-201802.herokuapp.com/';
        console.log('ERROR ', data);
        $.ajax({
          url: `${this.server}/repos`,
          method: 'GET',
          success: (data) => {
            console.log('SUCCESS GET', data);
            this.setState({repos: data.repos});
          },
          error: data => {
            console.log('ERROR ', data);
          }
        })
      }
    })
  }

  render () {
    return (<div>
      <div className = "custom">
      <h1> Github Fetcher </h1>
      </div>
      <RepoList repos={this.state.repos}/>
      <br></br><br></br>
      <Search onSearch={this.search.bind(this)}/>
      <br></br><br></br>
    </div>
  )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
