'use strict'
// https://api.slack.com/methods/groups.history

var slack = require('slack');
var latest = null;

slack.groups.history({
    token: 'Slack Legacy Token',
    channel: 'Channel ID(if it\'s private channel, use Group ID)'
}, (err, data) => {
    console.log(JSON.stringify(data));
    let length = data.messages.length;
    latest = data.messages[length - 1].ts;
});

var func = () => {
    slack.groups.history({
        token: 'same as above',
        channel: 'DRY',
        latest: latest
    }, (err, data) => {
        console.log(JSON.stringify(data));
        let length = data.messages.length;
        latest = data.messages[length - 1].ts;
        if (length < 100) {
            clearInterval(timer);
        }
    });
}

var timer = setInterval(() => {
    func();
}, 20000);
