var clients = {},
    userCount = 1;

var addUser = function(sessionId) {
  clients[sessionId] = 'User ' + userCount;
  userCount++;
};

var changeNick = function(sessionId, nickMessage) {
  var originalNick = clients[sessionId];
  clients[sessionId] = nickMessage.replace('/nick ', '');
  return {
    nick: originalNick,
    text: 'changed nick to ' + clients[sessionId]
  };
};

var processMessage = function(sessionId, message) {
  if(message.indexOf('/nick') === 0) {
    return changeNick(sessionId, message);
  }
  return {
    nick: clients[sessionId],
    text: message
  };
};

var removeUser = function(sessionId) {
  var nick = clients[sessionId];
  delete clients[sessionId];
  return {
    nick: nick,
    text: 'was disconnected.'
  };
};


module.exports.addUser = addUser;
module.exports.processMessage = processMessage;
module.exports.removeUser = removeUser;
