import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
    this.get = this.get.bind(this);
    this.get();
  }

  search (term) {
    console.log(`${term} was searched`);
    var data = JSON.stringify({username: term});
    console.log(typeof data)
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      contentType: 'application/json',
      data: data,
      success: (data) => {
        console.log('SUCCESS', data);
      },
      error: (data) => {
        console.log('ERROR', data)
      }
    })
  }

  get() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      success: (data) => {
        // console.log('SUCCESS GET', data);
        this.setState({repos: data.repos});
      },
      error: data => {
        console.log('ERROR ', data);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
