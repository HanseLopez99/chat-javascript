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

var chatMessages = document.createElement("div");
chatMessages.id = "chatMessages";
chatContainer.appendChild(chatMessages);

chatButton.addEventListener("click", function () {
    var chatMessageTextValue = chatInput.value;
    var chatMessageUserValue = "You";
    var chatMessageDateValue = new Date().toLocaleString();
    // extract date from chatMessageDateValue
    var chatMessageDateValue = chatMessageDateValue.split(",")[0];
    var chatMessage = document.createElement("div");
    chatMessage.id = "chatMessage";
    chatMessages.appendChild(chatMessage);
    var chatMessageText = document.createElement("div");
    chatMessageText.id = "chatMessageText";
    chatMessage.appendChild(chatMessageText);
    var messageDataContainer = document.createElement("div");
    messageDataContainer.id = "messageDataContainer";
    chatMessage.appendChild(messageDataContainer);
    var chatMessageUser = document.createElement("div");
    chatMessageUser.id = "chatMessageUser";
    messageDataContainer.appendChild(chatMessageUser);
    var chatMessageDate = document.createElement("div");
    chatMessageDate.id = "chatMessageDate";
    messageDataContainer.appendChild(chatMessageDate);
    chatMessageText.innerHTML = chatMessageTextValue;
    chatMessageUser.innerHTML = chatMessageUserValue;
    chatMessageDate.innerHTML = chatMessageDateValue;
    chatInput.value = "";

    var chatMessageStyle = {
        position: "relative",
        top: "0%",
        left: "0%",
        width: "96%",
        height: "auto",
        'min-height': "67px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "16px",
        padding: "0.5em",
        borderRadius: "42px",
        margin: "0.5em",
    };

    setStylesOnElement(chatMessageStyle, chatMessage);

    var chatMessageTextStyle = {
        position: "absolute",
        top: "35%",
        left: "3%",
        width: "85%",
        height: "36%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "right",
        borderRadius: "16px",
        padding: "0.5em",
        borderRadius: "42px",
        fontSize: "1.5em",
    };

    setStylesOnElement(chatMessageTextStyle, chatMessageText);

    var chatMessageUserStyle = {
        position: "absolute",
        top: "6%",
        left: "3%",
        width: "49%",
        height: "10%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        borderRadius: "16px",
        padding: "0.2em",
        borderRadius: "42px",
        fontSize: "1.5em",
    };

    setStylesOnElement(chatMessageUserStyle, chatMessageUser);

    var chatMessageDateStyle = {
        position: "absolute",
        top: "6%",
        left: "71%",
        width: "15%",
        height: "10%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "right",
        borderRadius: "16px",
        padding: "0.5em",
        borderRadius: "42px",
        fontSize: "1.5em",
    };

    // scroll to bottom of chatMessages
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setStylesOnElement(chatMessageDateStyle, chatMessageDate);
    setStylesOnElement(chatMessageStyle, chatMessage);
    setStylesOnElement(chatMessageTextStyle, chatMessageText);
    setStylesOnElement(chatMessageUserStyle, chatMessageUser);
    setStylesOnElement(chatMessageDateStyle, chatMessageDate);
});

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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "42px",
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

var chatMessagesStyle = {
    position: "absolute",
    top: "3%",
    left: "3%",
    width: "94%",
    height: "82%",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    'overflow-y': "scroll",
};

setStylesOnElement(chatMessagesStyle, chatMessages);

var messageDataContainerStyle = {
    position: "absolute",
    top: "0%",
    left: "0%",
    width: "100%",
    height: "10%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "16px",
    padding: "0.5em",
    borderRadius: "42px",
};

setStylesOnElement(messageDataContainerStyleStyle, messageDataContainerStyle);
