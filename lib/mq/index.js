const MQ = require('./mq');
const ChannelAssertions = require('./channel-assertions');

const factory = function(opts) {
    return new MQ(opts);
};

factory.ChannelAssertions = ChannelAssertions;

module.exports = factory;
