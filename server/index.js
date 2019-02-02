const express = require('express');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const saveRepo = require('../database/index.js').save;
const getPopular = require('../database/index.js').getPopular;
const parser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());

app.post('/repos', function (req, res) {
  var repoArr =[];
  getReposByUsername(req.body.username, (repos) => {
    repos.forEach(repo => {
      var id = repo.id;
      var name = repo.full_name;
      var url = repo.html_url;
      var updated_at = repo.updated_at.slice(0,-10);
      var forks_count = repo.forks;

      var currentRepo = { id, name, url, updated_at, forks_count };
      repoArr.push(currentRepo);
      saveRepo(currentRepo);
    });
    res.status(201).send({repos: repoArr})
    res.end();
  });
});

app.get('/repos', function (req, res) {
  getPopular((repos) => {
    res.json({repos});
  })
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
