
function responsiveChat(element) {
    $(element).html(
        '<form class="chat"><section id="conversation"><aside class="info"><p>To:<span class="name">Navjeet Kaur <i class="far fa-angle-down"></i></span> <a id="details">Details</a></p></aside></section><div class="messages"></div><input type="text" placeholder="Your message"></input><input type="submit" value="Send"></input></form>');
    function showLatestMessage() {
        $(element).find('.messages').scrollTop($(element).find('.messages').height());
    }
    showLatestMessage();


    $(element + ' input[type="text"]').keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            $(element + ' input[type="submit"]').click();
        }
    });
    $(element + ' input[type="submit"]').click(function (event) {
        event.preventDefault();
        var message = $(element + ' input[type="text"]').val();
        if ($(element + ' input[type="text"]').val()) {
            var d = new Date();
            var clock = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var currentDate =
                (("" + day).length < 2 ? "0" : "") +
                day +
                "." +
                (("" + month).length < 2 ? "0" : "") +
                month +
                "." +
                d.getFullYear() +
                "&nbsp;&nbsp;" +
                clock;
            $(element + ' div.messages').append(
                '<div class="message"><div class="myMessage"><p>' +
                message +
                "</p><date>" +
                currentDate +
                "</date></div></div>"
            );
            setTimeout(function () {
                $(element + ' > span').addClass("spinner");
            }, 100);
            setTimeout(function () {
                $(element + ' > span').removeClass("spinner");
            }, 2000);
        }
        $(element + ' input[type="text"]').val("");
        showLatestMessage();
    });
}

function responsiveChatPush(element, sender, origin, date, message) {
    var originClass;
    if (origin == 'me') {
        originClass = 'myMessage';
    } else {
        originClass = 'fromThem';
    }
    $(element + ' .messages').append('<div class="message"><div class="' + originClass + '"><p>' + message + '</p><date><b>' + sender + '</b> ' + date + '</date></div></div>');
}

/* Activating chatbox on element */
responsiveChat('.responsive-html5-chat');

/* Let's push some dummy data */
responsiveChatPush('.chat', 'Chhavi', 'me', '08.05.2021 14:30:7', 'Good Morning Mam. ');
responsiveChatPush('.chat', 'Navjeet Kaur', 'you', '14:31:22', 'Good Morning');
responsiveChatPush('.chat', 'Chhavi', 'me', '08.05.2021 14:33:32', 'We are presenting to you our AWD FA-4 Project.');
responsiveChatPush('.chat', 'Chhavi', 'me', '08.05.2021 14:33:32', 'Ayushi, Ekta and I hope you like this project.');
responsiveChatPush('.chat', 'Chhavi', 'me', '08.05.2021 14:36:4', 'Waiting for you to evaluate');
responsiveChatPush('.chat', 'Navjeet Kaur', 'you', '14:37:22', 'Great work done!');


