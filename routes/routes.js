const express = require("express");
const router = express.Router();
const Pusher = require('pusher');
const mongoose = require("mongoose");

const Vote = require("../models/vote");

var channels_client = new Pusher({
    appId: '875321',
    key: '8d2f69dae3beb59bcf5f',
    secret: '1c605e6d7c55f70551ae',
    cluster: 'ap1',
    encrypted: true
  });

router.get("/",  (req, res) => {
    Vote.find().then(rest => {
        res.json({
            success: true,
            votes: rest
        });
    }).catch(err => console.log(err));
});

router.post("/", (req, res) => {

    const newVote = {
        os:req.body.os,
        points: 1
    }

    new Vote(newVote).save().then(e => {
        channels_client.trigger('os-poll', 'os-vote', {
            points: parseInt(e.points),
            os: e.os
        });
    
        return res.json({
            success: true,
            message: "Makasih gan udah voting"
        });
    }).catch(err => console.log(err));
});

module.exports = router;