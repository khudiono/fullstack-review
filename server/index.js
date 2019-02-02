const express = require('express');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const saveRepo = require('../database/index.js').save;
const Repo = require('../database/index.js').Repo;
const getPopular = require('../database/index.js').getPopular;
const parser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());

app.post('/repos', function (req, res) {
  // console.log('request', req.body);
  getReposByUsername(req.body.username, (repos) => {
    repos.forEach(repo => {
      var id = repo.id;
      var name = repo.name;
      var url = repo.html_url;
      var updated_at = (repo.updated_at);
      var forks_count = repo.forks;

      var currentRepo = { id, name, url, updated_at, forks_count };
      saveRepo(currentRepo);
    });
  });
  res.status(201).send('POST success')
  res.end();
});

// app.get('/repos', function (req, res) {
//   Repo.find().sort({forks_count:-1}).limit(25).exec((err, repos) => {
//     if(err) {
//       console.log('err', err)
//     } else {
//       // console.log('SUCCESS! POPULAR', typeof repos)
//       res.json({repos});
//     }
//   });
// });
app.get('/repos', function (req, res) {
  getPopular((repos) => {
    res.json({repos});
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
