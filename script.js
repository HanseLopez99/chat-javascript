// Chat JavaScript

// ask for username in alert and save to variable
var currentUser = prompt("Please enter your name");

if (!currentUser) {
    currentUser = "You";
}

var mainContainer = document.createElement("div");
mainContainer.id = "mainContainer";
document.body.appendChild(mainContainer);

var filterContainer = document.createElement("div");
filterContainer.id = "filterContainer";
mainContainer.appendChild(filterContainer);

var filterText = document.createElement("div");
filterText.id = "filterText";
filterText.innerHTML = "Filter chats by text: ";
filterContainer.appendChild(filterText);

var filterInput = document.createElement("input");
filterInput.id = "filterText";
filterInput.placeholder = "Username";
filterInput.className = "filterInput";
filterContainer.appendChild(filterInput);

var filterButton = document.createElement("button");
filterButton.id = "filterButton";
filterButton.innerHTML = "Filter";
filterButton.onclick = function () {
    // console.log(filterInput.value);
    filterChatMessages(filterInput.value);
};
filterContainer.appendChild(filterButton);

var autorefreshContainer = document.createElement("div");
autorefreshContainer.id = "autorefreshContainer";
mainContainer.appendChild(autorefreshContainer);

var autorefreshText = document.createElement("div");
autorefreshText.id = "autorefreshText";
autorefreshText.innerHTML = "Autorefresh every 10 seconds: ";
autorefreshContainer.appendChild(autorefreshText);

var autorefreshCheckbox = document.createElement("input");
autorefreshCheckbox.type = "checkbox";
autorefreshCheckbox.id = "autorefreshCheckbox";
autorefreshCheckbox.checked = false;
autorefreshCheckbox.onchange = function () {
    if (autorefreshCheckbox.checked) {
        autorefreshChatMessages();
    } else {
        clearInterval(autorefreshInterval);
    }
};
autorefreshContainer.appendChild(autorefreshCheckbox);

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
// chatContainer.appendChild(chatMessagesContainer);

var chatMessages = document.createElement("div");
chatMessages.id = "chatMessages";
chatContainer.appendChild(chatMessages);

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
            // for (var i = 0; i < result.length; i++) {
            //     createChatMessage(result[i].chat, result[i].user, result[i].date.substring(0, 10));
            // }
            // create chat message from the last element to the first
            for (var i = result.length - 1; i >= 0; i--) {
                createChatMessage(result[i].chat, result[i].user, result[i].date.substring(0, 10));
            }
        })
        .catch(error => console.log('error', error));
}

// function postChatMessages to endpoint http://stw-uvg-22.site:3001/chats
// the format is an array of objects with the following properties: user, chat
function postChatMessages(user, chat) {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user, chat: chat })
    };

    fetch("http://stw-uvg-22.site:3001/chat", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function autorefreshChatMessages() {
    autorefreshInterval = setInterval(function () {
        // alert("Autorefresh");
        deleteAllChildren(chatMessages);
        getChatMessages();
    }, 10000);
}

function deleteAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// autorefresh chat from endpoint every 2 seconds (for now)
// setInterval(function () {
//     getChatMessages()
// }, 9000);

// function to validate if the a text contains an image
function validateImage(text) {
    var regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi;
    var match = regex.exec(text);
    if (match) {
        return match[0];
    } else {
        return false;
    }
}

// function to validate if a text contains a url to another page
function validarURL(str) {
    var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/gi;
    var match = regex.exec(str);
    if (match) {
        return match[0];
    } else {
        return false;
    }
}

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

        // If the message contains an image, create a new div with the image inside
        var image = validateImage(chatMessageTextValue);
        if (image) {
            var chatMessageImage = document.createElement("img");
            chatMessageImage.id = "chatMessageImage";
            chatMessageImage.src = image;
            chatMessageImage.style.width = "400px";
            chatMessageImage.style.height = "200px";
            chatMessageImage.style.alignSelf = "center";
            chatMessageImage.style.borderRadius = "42px";
            chatMessage.appendChild(chatMessageImage);
        } else {
            chatMessageText.innerHTML = chatMessageTextValue;
        }

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

        if (image) {
            // set the 'min-height' of the object chatMessageStyle to the chatMessageUser current div height + chatMessageText current div height
            chatMessageStyle["min-height"] = chatMessageUser.offsetHeight + chatMessageText.offsetHeight + 200 + "px";
            setStylesOnElement(chatMessageStyle, chatMessage);
        } else {
            // set the 'min-height' of the object chatMessageStyle to the chatMessageUser current div height + chatMessageText current div height
            chatMessageStyle["min-height"] = chatMessageUser.offsetHeight + chatMessageText.offsetHeight + "px";
            setStylesOnElement(chatMessageStyle, chatMessage);
        }

        // scroll to bottom of chatMessages
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else {
        var chatMessageTextValue = chatInput.value;
        var chatMessageUserValue = currentUser;
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

        // If the message contains an image, create a new div with the image inside
        var image = validateImage(chatMessageTextValue);
        if (image && !link) {
            var chatMessageImage = document.createElement("img");
            chatMessageImage.id = "chatMessageImage";
            chatMessageImage.src = image;
            chatMessageImage.style.width = "400px";
            chatMessageImage.style.height = "200px";
            chatMessageImage.style.alignSelf = "center";
            chatMessageImage.style.borderRadius = "42px";
            chatMessage.appendChild(chatMessageImage);
        } else {
            chatMessageText.innerHTML = chatMessageTextValue;
        }

        // If the message contains a web page link, create iframe with the link inside
        var link = validarURL(chatMessageTextValue);
        if (link && !image) {
            var chatMessageLink = document.createElement("iframe");
            chatMessageLink.id = "chatMessageLink";
            chatMessageLink.src = link;
            chatMessageLink.style.width = "400px";
            chatMessageLink.style.height = "200px";
            chatMessageLink.style.alignSelf = "center";
            chatMessageLink.style.borderRadius = "42px";
            chatMessage.appendChild(chatMessageLink);
        } else {
            chatMessageText.innerHTML = chatMessageTextValue;
        }

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

        if (image || link) {
            // set the 'min-height' of the object chatMessageStyle to the chatMessageUser current div height + chatMessageText current div height
            chatMessageStyle["min-height"] = chatMessageUser.offsetHeight + chatMessageText.offsetHeight + 200 + "px";
            setStylesOnElement(chatMessageStyle, chatMessage);
        } else {
            // set the 'min-height' of the object chatMessageStyle to the chatMessageUser current div height + chatMessageText current div height
            chatMessageStyle["min-height"] = chatMessageUser.offsetHeight + chatMessageText.offsetHeight + "px";
            setStylesOnElement(chatMessageStyle, chatMessage);
        }

        // scroll to bottom of chatMessages
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // post message to endpoint using postChatMessages function
        postChatMessages(chatMessageUserValue, chatMessageTextValue);
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

// function to filter chatMessages divs by its text content
function filterChatMessages(filter) {
    var chatMessages = document.getElementById("chatMessages");
    var chatMessagesChildren = chatMessages.children;
    var chatMessageTexts = [];
    for (var i = 0; i < chatMessagesChildren.length; i++) {
        chatMessageTexts.push(chatMessagesChildren[i].children[1].innerHTML);
    }
    var filteredChatMessages = chatMessageTexts.filter(function (chatMessageText) {
        return chatMessageText.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
    for (var i = 0; i < chatMessagesChildren.length; i++) {
        if (filteredChatMessages.indexOf(chatMessagesChildren[i].children[1].innerHTML) > -1) {
            chatMessagesChildren[i].style.display = "flex";
        } else {
            chatMessagesChildren[i].style.display = "none";
        }
    }
}

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

var filterContainerStyle = {
    position: "absolute",
    width: "100%",
    top: "5%",
    left: "8%",
    display: "flex",
    flexDirection: "row",
    gap: "1%",
};

setStylesOnElement(filterContainerStyle, filterContainer);

var filterTextStyle = {
    color: "white",
    fontSize: "1.5em",
    'font-weight': "bold",
};

setStylesOnElement(filterTextStyle, filterText);

var autorefreshContainerStyle = {
    position: "absolute",
    width: "100%",
    top: "10%",
    left: "8%",
    display: "flex",
    flexDirection: "row",
    gap: "1%",
};

setStylesOnElement(autorefreshContainerStyle, autorefreshContainer);

var autorefreshTextStyle = {
    color: "white",
    fontSize: "1.5em",
    'font-weight': "bold",
};

setStylesOnElement(autorefreshTextStyle, autorefreshText);

var chatContainerStyle = {
    position: "absolute",
    top: "15%",
    left: "6%",
    width: "87%",
    height: "74%",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "42px",
    padding: "2%",
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
    top: "0%",
    left: "0%",
    width: "100%",
    height: "89%",
    // 'max-height': "35em",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    'overflow-y': "auto",
    'overflow-x': "hidden",
    gap: "1em",
};

setStylesOnElement(chatMessagesStyle, chatMessages);