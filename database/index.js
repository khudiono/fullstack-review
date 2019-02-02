const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
let repoSchema = mongoose.Schema({
  id: {type: String, unique: true},
  name: {type: String, required: true}, //repo name
  url: {type: String, required: true}, //url to repo
  description: String,
  updated_at: Date,
  forks_count: {type: Number, required: true}
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  var newRepo = new Repo (repo);
  newRepo.save(err => {
    if(err) {
      console.log(err);
    } else {
      console.log(`SUCCESS! ${repo.name} has been saved as a repo!`)
    }
  });
}

module.exports.save = save;
module.exports.Repo = Repo;
