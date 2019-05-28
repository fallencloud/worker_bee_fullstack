const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load User model
const User = require('../../models/User');

// @route   GET api/
// @desc    Provides a list of all users
// @access  Public
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => console.error(err));
});

// @route   POST api/
// @desc    Creates  a new employee
// @access  Public
router.post('/', (req, res) => {
  const { name, email, phone } = req.body;

  const newUser = new User({
    name,
    email,
    phone
  });

  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => console.error(err));
});

// @route   GET api/users/:id
// @desc    Gets a specific user
// @access  Public
router.get('/:id', (req, res) => {
  const id = req.params.id.toString();
  User.findById(id)
    .then(user => res.json(user))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No user found with that ID' })
    );
});

// @route   UPDATE api/users/:id
// @desc    Updates a specific user
// @access  Public
router.put('/:id', (req, res) => {
  const id = req.params.id.toString();

  User.findById(id)
    .then(user => {
      //if new info was passed in
      //update it
      if (req.body.name) {
        user.name = req.body.name;
      }

      if (req.body.email) {
        user.email = req.body.email;
      }

      if (req.body.phone) {
        user.phone = req.body.phone;
      }

      //save any changes
      user
        .save()
        .then(user => res.json(user))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

// @route   DELETE api/users/:id
// @desc    Deletes a specific user
// @access  Public
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);

  User.findById(id).then(user => {
    user
      .remove()
      .then(() => {
        res.json({});
      })
      .catch(err =>
        res.status(404).json({
          usernotfound: 'User not found'
        })
      );
  });
});

module.exports = router;
