const express = require("express");
const router = express.Router();
const Pusher = require('pusher');
const mongoose = require("mongoose");

var channels_client = new Pusher({
    appId: '875321',
    key: '8d2f69dae3beb59bcf5f',
    secret: '1c605e6d7c55f70551ae',
    cluster: 'ap1',
    encrypted: true
  });

router.get("/",  (req, res) => {
    res.send("AWEEE");
});

router.post("/", (req, res) => {
    channels_client.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
    });

    return res.json({
        success: true,
        message: "Makasih gan udah voting"
    });
});

module.exports = router;