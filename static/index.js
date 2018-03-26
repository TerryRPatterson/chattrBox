console.log("Make me do things!");

let ws =  new WebSocket("ws://192.168.1.91:3001");

let $messageContainer = $(".chat-message-list");

let $chatForm = $(".chat-form");

let $textField = $(".message-input");

let settings = {
    name:"Me"
}


let drawMessage = ({
    "name": u = "server",
    "timestamp": t,
    "text": m,
    "pictue":pic="https://avatars3.githubusercontent.com/u/794113?s=64&v=4"
}) => {
    let $messageRow = $("<li>", {
        "class": "message-row"
    });
    // if (this is me?) {
    //   $messageRow.addClass('me');
    // }
    let $message = $("<p>");
    $message.append($("<span>", {
        "class": "message-username",
        text: u
    }));
    $message.append($("<span>", {
        "class": "timestamp",
        "data-time": t,
        text: t
    }));
    $message.append($("<span>", {
        "class": "message-message",
        text: m
    }));
    let $img = $("<img>", {
        src: pic,
        title: u
    });
    $messageRow.append($img);
    $messageRow.append($message);
    return $messageRow;
};


$chatForm.on("submit", (event) => {
    event.preventDefault();
    ws.send($textField.val());
    $messageContainer.append(drawMessage({name:settings["name"],
        text:$textField.val(),timestamp:new Date().toString()}));
    $textField.val("");
});

ws.onmessage = (event) => {
    let data = JSON.parse(event.data);
    console.log(data);
    if (data["type"] === "setting"){
        settings[data["key"]] = data["value"];
    }
    else{
        let row = drawMessage(data);
        $messageContainer.append(row);
    }
};
