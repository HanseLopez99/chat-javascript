// Chat JavaScript

var mainContainer = document.createElement("div");
mainContainer.id = "mainContainer";
document.body.appendChild(mainContainer);

var chatContainer = document.createElement("div");
chatContainer.id = "chatContainer";
mainContainer.appendChild(chatContainer);

var userControls = document.createElement("div");
userControls.id = "userControls";
chatContainer.appendChild(userControls);

var chatInput = document.createElement("input");
chatInput.id = "chatInput";
chatInput.type = "text";
chatInput.placeholder = "Type your message here...";
chatInput.maxLength = "140";    // Max length of the chat message
userControls.appendChild(chatInput);

var chatButton = document.createElement("button");
chatButton.id = "chatButton";
chatButton.innerHTML = "Send";
userControls.appendChild(chatButton);

var chatMessagesContainer = document.createElement("div");
chatMessagesContainer.id = "chatMessagesContainer";
chatContainer.appendChild(chatMessagesContainer);

var chatMessages = document.createElement("div");
chatMessages.id = "chatMessages";
chatMessagesContainer.appendChild(chatMessages);

getChatMessages();

// function getChatMessages from endpoint http://stw-uvg-22.site:3001/chats
// the format is an array of objects with the following properties: chatMessage, chatUser, chatDate
function getChatMessages() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://stw-uvg-22.site:3001/chats", requestOptions)
        .then(response => response.text())
        .then(result => {
            // convert result to JSON
            result = JSON.parse(result);
            // console.log(result.length);
            for (var i = 0; i < result.length; i++) {
                createChatMessage(result[i].chat, result[i].user, result[i].date.substring(0, 10));
            }
        })
        .catch(error => console.log('error', error));
}

// autorefresh chat from endpoint every 2 seconds (for now)
// setInterval(function () {
//     getChatMessages()
// }, 9000);

// function to create a new chat message
const createChatMessage = function (message, user, date) {
    if (message, user, date) {
        var chatMessageTextValue = message;
        var chatMessageUserValue = user;
        var chatMessageDateValue = date;
        console.log(date)
        // extract date from chatMessageDateValue
        chatMessageDateValue = chatMessageDateValue.split(",")[0];
        var chatMessage = document.createElement("div");
        chatMessage.id = "chatMessage";
        chatMessages.appendChild(chatMessage);
        var chatMessageInfoContainer = document.createElement("div");
        chatMessageInfoContainer.id = "chatMessageInfoContainer";
        chatMessage.appendChild(chatMessageInfoContainer);
        var chatMessageUser = document.createElement("div");
        chatMessageUser.id = "chatMessageUser";
        chatMessageInfoContainer.appendChild(chatMessageUser);
        var chatMessageDate = document.createElement("div");
        chatMessageDate.id = "chatMessageDate";
        chatMessageInfoContainer.appendChild(chatMessageDate);
        var chatMessageText = document.createElement("div");
        chatMessageText.id = "chatMessageText";
        chatMessage.appendChild(chatMessageText);
        chatMessageText.innerHTML = chatMessageTextValue;
        chatMessageUser.innerHTML = chatMessageUserValue;
        chatMessageDate.innerHTML = chatMessageDateValue;
        chatInput.value = "";

        var chatMessageInfoContainerStyle = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
        };

        var chatMessageStyle = {
            width: "96%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            borderRadius: "42px",
            overflow: "auto",
            'overflow-x': "hidden",
            'overflow-y': "hidden",
            'padding-left': "2%",
            'padding-top': "1%",
            'padding-bottom': "1%",
            'min-height': "11%",
            height: "fit-content",
        };

        var chatMessageTextStyle = {
            width: "85%",
            borderRadius: "16px",
            fontSize: "1.5em",
            'word-break': "break-all",
        };

        var chatMessageUserStyle = {
            width: "49%",
            borderRadius: "16px",
            borderRadius: "42px",
            fontSize: "1.5em",
            'font-weight': "bold",
        };

        var chatMessageDateStyle = {
            width: "15%",
            borderRadius: "16px",
            borderRadius: "42px",
            fontSize: "1.5em",
            'font-weight': "bold",
        };

        setStylesOnElement(chatMessageInfoContainerStyle, chatMessageInfoContainer);
        setStylesOnElement(chatMessageDateStyle, chatMessageDate);
        setStylesOnElement(chatMessageStyle, chatMessage);
        setStylesOnElement(chatMessageTextStyle, chatMessageText);
        setStylesOnElement(chatMessageUserStyle, chatMessageUser);

        // set the 'min-height' of the object chatMessageStyle to the chatMessageUser current div height + chatMessageText current div height
        chatMessageStyle["min-height"] = chatMessageUser.offsetHeight + chatMessageText.offsetHeight + "px";
        setStylesOnElement(chatMessageStyle, chatMessage);

        // scroll to bottom of chatMessages
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else {
        var chatMessageTextValue = chatInput.value;
        var chatMessageUserValue = "You";
        var chatMessageDateValue = new Date().toLocaleString();
        // extract date from chatMessageDateValue
        chatMessageDateValue = chatMessageDateValue.split(",")[0];
        var chatMessage = document.createElement("div");
        chatMessage.id = "chatMessage";
        chatMessages.appendChild(chatMessage);
        var chatMessageInfoContainer = document.createElement("div");
        chatMessageInfoContainer.id = "chatMessageInfoContainer";
        chatMessage.appendChild(chatMessageInfoContainer);
        var chatMessageUser = document.createElement("div");
        chatMessageUser.id = "chatMessageUser";
        chatMessageInfoContainer.appendChild(chatMessageUser);
        var chatMessageDate = document.createElement("div");
        chatMessageDate.id = "chatMessageDate";
        chatMessageInfoContainer.appendChild(chatMessageDate);
        var chatMessageText = document.createElement("div");
        chatMessageText.id = "chatMessageText";
        chatMessage.appendChild(chatMessageText);
        chatMessageText.innerHTML = chatMessageTextValue;
        chatMessageUser.innerHTML = chatMessageUserValue;
        chatMessageDate.innerHTML = chatMessageDateValue;
        chatInput.value = "";

        var chatMessageInfoContainerStyle = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
        };

        var chatMessageStyle = {
            width: "96%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            borderRadius: "42px",
            overflow: "auto",
            'overflow-x': "hidden",
            'overflow-y': "hidden",
            'padding-left': "2%",
            'padding-top': "1%",
            'padding-bottom': "1%",
            height: "fit-content",
        };

        var chatMessageTextStyle = {
            width: "85%",
            borderRadius: "16px",
            fontSize: "1.5em",
            'word-break': "break-all",
        };

        var chatMessageUserStyle = {
            width: "49%",
            borderRadius: "16px",
            borderRadius: "42px",
            fontSize: "1.5em",
            'font-weight': "bold",
        };

        var chatMessageDateStyle = {
            width: "15%",
            borderRadius: "16px",
            borderRadius: "42px",
            fontSize: "1.5em",
            'font-weight': "bold",
        };

        setStylesOnElement(chatMessageInfoContainerStyle, chatMessageInfoContainer);
        setStylesOnElement(chatMessageStyle, chatMessage);
        setStylesOnElement(chatMessageTextStyle, chatMessageText);
        setStylesOnElement(chatMessageUserStyle, chatMessageUser);
        setStylesOnElement(chatMessageDateStyle, chatMessageDate);

        // set the 'min-height' of the object chatMessageStyle to the chatMessageUser current div height + chatMessageText current div height
        chatMessageStyle["min-height"] = chatMessageUser.offsetHeight + chatMessageText.offsetHeight + "px";
        setStylesOnElement(chatMessageStyle, chatMessage);

        // scroll to bottom of chatMessages
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
}

chatButton.addEventListener("click", createChatMessage);

// When press enter, click the chat button
chatInput.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        chatButton.click();
    }
});

// Style the chat

const setStylesOnElement = function (styles, element) {
    Object.assign(element.style, styles);
}

document.body.style.backgroundColor = "black";

var mainContainerStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
};

setStylesOnElement(mainContainerStyle, mainContainer);

var chatContainerStyle = {
    position: "absolute",
    top: "7%",
    left: "6%",
    width: "87%",
    height: "86%",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "42px",
    padding: "1%",
};

setStylesOnElement(chatContainerStyle, chatContainer);

var userControlsStyle = {
    position: "absolute",
    top: "88%",
    left: "0%",
    width: "100%",
    height: "12%",
    backgroundColor: "darkgray",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "42px",
};

setStylesOnElement(userControlsStyle, userControls);

var chatInputStyle = {
    position: "absolute",
    top: "14%",
    left: "2%",
    width: "81%",
    height: "41%",
    backgroundColor: "white",
    border: "none",
    outline: "none",
    fontSize: "1.5em",
    color: "black",
    padding: "0.5em",
    borderRadius: "42px",
};

setStylesOnElement(chatInputStyle, chatInput);

var chatButtonStyle = {
    position: "absolute",
    top: "13%",
    left: "87%",
    width: "11%",
    height: "75%",
    backgroundColor: "springgreen",
    border: "none",
    outline: "none",
    fontSize: "1.5em",
    color: "black",
    padding: "0.5em",
    borderRadius: "42px",
};

setStylesOnElement(chatButtonStyle, chatButton);

var chatMessagesContainerStyle = {
    height: "85%",
    // backgroundColor: "red",
    width: "97%",
    padding: "1%",
}

setStylesOnElement(chatMessagesContainerStyle, chatMessagesContainer);

var chatMessagesStyle = {
    width: "59em",
    height: "35em",
    'max-height': "35em",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    'overflow-y': "auto",
    'overflow-x': "hidden",
    gap: "1em",
};

setStylesOnElement(chatMessagesStyle, chatMessages);