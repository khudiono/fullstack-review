const request = require('request');
const config = require('../config.js');
const saveRepo = require('../database/index.js').save;

let getReposByUsername = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, (err, res, body) => {
    if(err) {
      console.log(err);
    }else {
      repos = JSON.parse(body);
      console.log('body:', body[0]);
      repos.forEach(repo => {
        var id = repo.id;
        var name = repo.name;
        var url = repo.html_url;
        var description = repo.description;
        var updated_at = repo.updated_at;
        var forks_count = repo.forks;

        var currentRepo = { id, name, url, description, updated_at, forks_count };
        saveRepo(currentRepo);
      });
      return body;
    }
  })

}

module.exports.getReposByUsername = getReposByUsername;
