const { attachment } = require("express/lib/response");

$(function()
{
    var FADE_TIME = 150;
    var TYPING_TIMER_LENGTH = 400;
    var COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];

    var $window = $(window);
    var $usernameInput = $('.usernameInput');
    var $roomInput = $('.roomInput');
    var $messages = $('.messages');
    var $inputMessage = $('.inputMessage');

    var $loginPage = $('.login.page');
    var $chatPage = $('.chat.page');

    var username;
    var room;
    var connected = false;
    var typing = false;
    var lastTypingTime;
    var $currentInput = $usernameInput.focus();

    var socket = io();

    function addParticipantsMessage(data) {
        var message = '';
        message += "there are " + data.numUsers + " participants";
        log(message);
    }

    function setUsername() {
        username = cleanInput($usernameInput.val().trim());
        room = $roomInput.val().trim();

        if(username && room)
        {
            $loginPage.fadeOut();
            $chatPage.show();
            $loginPage.off('click');
            $currentInput = $inputMessage.focus();

            socket.emit('join room', room);
            socket.emit('add user', username);
        }
    }

    function sendMessage()
    {
        var message = $inputMessage.val();

        message - cleanInput(message);

        if(message && connected) {
            $inputMessage.val('');
            addChatMessage({
                username: username,
                message: message
            });
            socket.emit('new message', message);
        }
    }

    function log(message, options) {
        var $el = $('<li>').addClass('log').text(message);
        addMessageElement($el, options);
    }

    function addChatMessage(data, options)
    {
        var $typingMessages = getTypingMessages(data);
        options = options || {};
        if($typingMessages.length !== 0) {
            options.fade = false;
            $typingMessages.remove();
        }
        var $usernameDiv = $('<span class="username"/>')
            .text(data.username)
            .css('color', getUsernameColor(data.username));
        var $messageBodyDiv = $('<span class="messageBody">')
            .text(data.message);

        var typingclass = data.typing ? 'typing' : '';
        var $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .addClass(typingclass)
            .append($usernameDiv, $messageBodyDiv);

        addMessageElement($messageDiv, options);
    }

    function addMessageElement(el, options)
    {
        var $el = $(el);

        if(!options) {
            options = {};
        }
        if(typeof options.fade==='undefined') {
            options.fade = true;
        }
        if(typeof options.prepend === 'undefined') {
            options = prepend = false;
        }

        if(options.fade) {
            $el.hide().fadeIn(FADE_TIME);
        }
        if(options.prepend) {
            $messages.prepend($el);
        }
        else{
            $messages.append($el);
        }
        $messages[0].scrollTop = $messages[0].scrollHeight;
    }
    
    function addChatTyping(data)
    {
        data.typing = true;
        data.message = 'is typing';
        addChatMessage(data);
    }

    function removeChatTyping(data) 
    {
        getTypingMessages(data).fadeOut(function() {
            $(this).remove();
        });
    }

    function cleanInput(input) {
        return $('<div/>').text(input).html();
    }
    function updateTyping(){
        if(connected) {
            if(!typing){
                typing = true;
                socket.emit('typing');
            }
            lastTypingTime = (new Date()).getTime();

            setTimeout(function () {
                var typingTimer = (new Date()).getTime();
                var timeDiff = typingTimer - lastTypingTime;
                if(timeDiff >= Typing_TIMER_LENGTH && typing) {
                    socket.emit('stop typing');
                    typing = false;
                }
            }, TYPING_TIMER_LENGTH);
        }
    }

    $window.keydown(function (event){
        if(event.which === 13) {
            if(username) {
                sendMessage();
                socket.emit('stop typing');
                typing = false;
            }
            else
            {
                setUsername();
            }
        }
    });
    $inputMessage.on('input', function() {
        updateTyping();
    });

    function getTypingMessages(data) {
        return $('.typing message').filter(function (i)
        {
            return $(this).data('username') === data.username;
        });
    }

    function getUsernameColor(username) {
        var hash = 7;
        for(var i = 0; i < username.length; i++)
        {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }
    $indexMessage.on('input', function() {
        updateTyping();
    });

    socket.on('login', function(data){
        connected = true;

        var message = "Welcome to Socket.10 Chat - ";
        log(message, {
            prepend: true
        });
        addParticipantsMessage(data);
    });

    socket.on('new message', function(data) {
        addChatMessage(data);
    });

    socket.on('user joined', function (data) {
        log(data.username + ' joined');
        addParticipantsMessage(data);
    });
    socket.on('user left', function(data) {
        log(data.username + ' left');
        addParticipantsMessage(data);
        removeChatTyping(data);
    });
    socket.on('typing', function(data) {
        addChatTyping(data);
    });

    socket.on('stop typing', function(data) {
        removeChatTyping(data);
    });
    socket.on('disconnect', function() {
        log('you have been disconnected');
    });

    socket.on('reconnect', function() {
        log('you have been reconnected');
        if(username) {
            socket.emit('add user', username);
        }
    });
    socket.on('reconnect_error', function() {
        log('attempt to reconnect has failed');
    });
});