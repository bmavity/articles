(function() {
  var socket = new io.Socket('localhost'),
      $chatMessages = $('#chatMessages'),
      $form = $('form'),
      $messageText = $('#messageText'),
      $messageTemplate = $('<p class="message"><span class="nick"></span></p>');

  var createMessageDisplay = function(msg) {
    var $messageDisplay = $messageTemplate.clone().append(msg.text);
    $messageDisplay.find('.nick').text(msg.nick + ':');
    return $messageDisplay;
  };

  socket.on('message', function(msg) {
    $chatMessages.append(createMessageDisplay(msg));
  });

  $form.submit(function() {
    var msg = $messageText.val();
    $messageText.val('');
    $chatMessages.append(createMessageDisplay({
      nick: 'me',
      text: msg
    }));
    socket.send(msg);
    return false;
  });

  socket.connect();
})();
