const request = require('request');
const config = require('../config.js');
const githubAuthToken = process.env.TOKEN || config.TOKEN;

let getReposByUsername = (username, cb) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${githubAuthToken}`
    }
  };

  request.get(options, (err, res, body) => {
    if(err) {
      console.log(err);
    }else {
      repos = JSON.parse(body);
      cb(repos);
    }
  })

}

module.exports.getReposByUsername = getReposByUsername;
