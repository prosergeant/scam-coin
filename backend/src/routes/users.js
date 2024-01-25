const express = require('express');
const router = express.Router();
const db = require('../database');

router.get("/", function(req, res) {
    db.Person.findAll()
        .then( persons => {
            res.status(200).send(JSON.stringify(persons));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.get("/:id", function(req, res) {
    db.Person.findByPk(req.params.id)
        .then( person => {
            res.status(200).send(JSON.stringify(person));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.put("/", function(req, res) {
    db.Person.create({
        username: req.body.username,
        userid: req.body.userid,
        id: req.body.id
    })
        .then( person => {
            res.status(200).send(JSON.stringify(person));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.post("/", function(req, res) {
    db.Person.create({
        username: req.body.username,
        userid: req.body.userid,
        coins: req.body.coins
    })
      .then( person => {
          res.status(200).send(JSON.stringify(person));
      })
      .catch( err => {
          res.status(500).send(JSON.stringify(err));
      });
});

router.patch("/:id", function(req, res) {
    const data = {}
    const keys = ['username', 'userid', 'coins']
    for(const k of keys)
        if(req.body[k])
            data[k] = req.body[k]

    db.Person.findByPk(req.params.id)
        .then(person => {
            person.update(data)
            res.status(200).send(JSON.stringify(person));
        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        })
});

router.delete("/:id", function(req, res) {
    db.Person.destroy({
        where: {
            id: req.params.id
        }
    })
        .then( () => {
            res.status(200).send();
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;
