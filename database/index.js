const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fetcher');
let repoSchema = mongoose.Schema({
  id: {type: String, unique: true},
  name: {type: String, required: true}, // user/repo name
  url: {type: String, required: true}, //url to repo
  updated_at: String,
  forks_count: {type: Number, required: true}
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  var newRepo = new Repo (repo);
  newRepo.save((err,data) => {
    if(err) {
      console.log(err);
    } else {
      console.log(`SUCCESS! ${repo.name} has been saved as a repo!`)
    }
  });
}

let getPopular = function(cb){
  Repo.find().sort({forks_count:-1}).limit(25).exec((err, repos) => {
      if(err) {
        console.log('err', err)
      } else {
        cb(repos)
      }
    });
}

module.exports.save = save;
module.exports.Repo = Repo;
module.exports.getPopular = getPopular;
