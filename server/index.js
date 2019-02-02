const express = require('express');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const saveRepo = require('../database/index.js').save;
const Repo = require('../database/index.js').Repo;
const parser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());

app.post('/repos', function (req, res) {
  console.log('request', req.body);
  getReposByUsername(req.body.username);
  // repos.forEach(repo => {
  //   var id = repo.id;
  //   var name = repo.name;
  //   var url = repo.html_url;
  //   var description = repo.description;
  //   var updated_at = repo.updated_at;
  //   var forks_count = repo.forks;
  //
  //   var currentRepo = { id, name, url, description, updated_at, forks_count };
  //   saveRepo(currentRepo);
  // });
  res.end('posted successfully')
});

app.get('/repos', function (req, res) {
  Repo.find().sort({forks_count:-1}).limit(25).exec((err, repos) => {
    if(err) {
      console.log('err', err)
    } else {
      // console.log('SUCCESS! POPULAR', typeof repos)
      res.json({repos});
    }
  });
  // var popular = finder();
  // console.log(popular);
  // res.send(JSON.stringify(popular));
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
