const User = require('./models').User;
const shortid = require('shortid');

exports.createUser = function (req, res, next) {
  const new_user = req.body.username;
  
  if (new_user) {
    User.findOne({username: new_user}, function(err, data) {
      if (err) next(err);
      if (data) {
        next({status: 400, message: 'Username Already in Database'});
      } else {
        let user = new User({username: new_user, _id: shortid.generate()});
        user.save(function(err, data) {
          if (err) next(err);
          res.json({username: data.username, _id: data._id});
        });
      }
    });
  } else {
    next({status: 400, message: 'No Username Given'});
  }
}

exports.add = function(req, res, next) {
  let user_id = req.body.userId,
      description = req.body.description,
      duration = req.body.duration,
      date = req.body.date ? new Date(req.body.date) : new Date()
  
  if (req.body.userId) {
    User.findOne({_id: user_id}, function(err, data) {
      if (err) next(err);
        if (!data || data._id !== user_id) {
          next({status: 400, message: 'No Valid userID'});
        } else {
          User.findByIdAndUpdate({_id: user_id},
                                 {$push: {log: {description, duration, date}} },
                                 {upsert: true, new: true},
                                 function(err, data) {
            if (err) next(err);
            if (!data) {next({status: 400, message: 'No Valid userID'})}
            else {res.json({
              username: data.username,
              _id: data._id,
              description,
              duration, 
              date : date.toDateString()
            })}
          });
        }
    });
  } else {next({status: 400, message: 'No userID Given'})}
  if (!description) {next({status: 400, message: 'Missing Description'})}
  if (!duration) {next({status: 400, message: 'Missing Duration'})}
}

exports.users = function(req, res, next) {
  var projections = {log: false, __v: false};
  
  User.find({}, projections, function(err, data) {
    if (err) next(err);
    res.json(data);
  });
}

exports.log = function(req, res, next) {
  let user_id = req.params.userId;
  
  User.findOne({_id: user_id}, function(err, user) {
    if (err) return next(err);
    if (!user) {
      next({status: 400, message: 'Incorrect userID Given'});
    } else {
      let limit = req.query.limit,
          exercise = user.log,
          from = req.query.from ? new Date(req.query.from) : new Date('1970-01-01'),
          to = req.query.to ? new Date(req.query.to): new Date();
      
      exercise = exercise.filter(data => (data.date >= from && data.date <= to));

      exercise = exercise.sort((first, second) => first.date < second.date) 
                         .map(item => ({
                            description: item.description,
                            duration: item.duration,
                            date: item.date.toDateString()
                          }));
      
      if (!isNaN(limit) && exercise.length >= limit) {
        exercise = exercise.slice(0, limit);
      }     
      res.json({
        username: user.username,
        _id: user._id,
        from: req.query.from ? new Date(req.query.from).toDateString(): undefined,
        to: req.query.to ? new Date(req.query.to).toDateString(): undefined,
        count: exercise.length,
        log: exercise
      });
    }
  });
}