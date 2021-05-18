/*
 * Title: Blockchain Project
 * Description: sockets methods for the blockchain (pending transactions, chat, etc..)
 * Author: Mor Cohen
 * Date: 15/10/18
 */

var socket = io();

socket.on("connect", () => {
    //console.log(socket);
    document.getElementById("noMemberID").innerHTML = socket.id;
});

function sendMessage(message) {
    if (!message.replace(/\s/g, "").length) {
        alert("An empty message could not be sent");
    } else {
        message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        socket.emit("getNewMessage", {
            message: message,
            id: socket.id,
        });
    }
}

socket.on("newMessage", (message) => {
    document.getElementById("btn-input").value = null;
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear();
    var hour = d.getHours();
    var minutes = d.getMinutes();
    $("#chat").append(
        '<li class="right clearfix">' +
            '<div class="chat-body clearfix">' +
            '<div class="header">' +
            '<div class="row">' +
            '<strong class="col-6 pull-right primary-font">' +
            '<span style="color: gold">' +
            "User number: " +
            "</span>" +
            (message.id === socket.id
                ? '<span style="color: #1d82ff;">'
                : "<span>") +
            message.id +
            "</span>" +
            "</strong>" +
            '<small class="col-6 text-muted text-left">' +
            hour +
            ":" +
            minutes +
            " " +
            (("" + day).length < 2 ? "0" : "") +
            day +
            "/" +
            (("" + month).length < 2 ? "0" : "") +
            month +
            "/" +
            output +
            "</small>" +
            "</div >" +
            "</div >" +
            "<p>" +
            message.message +
            "</p>" +
            "</div >" +
            "</li >"
    );
    var s = $("#chat > li:last-child").position();
    $("div").scrollTop(s.top);
});

socket.on("PT", (pt) => {
    var row = document.getElementById("mineButton");
    console.log(pt)
    if (pt.length === 1 && pt[pt.length - 1].sender === "system-reward") {
        row.setAttribute("disabled", true);
    } else {
        row.removeAttribute("disabled");
    }
    let html = "";
    for (let i = 0; i < pt.length; i++) {
        html =
            html +
            "<tr>" +
            '<td style="font-size:x-small; max-width: 100px;">' +
            pt[i].transactionId +
            "</td>" +
            '<td style="font-size:x-small; max-width: 220px;">' +
            pt[i].sender +
            "</td>" +
            '<td style="font-size:x-small; max-width: 220px;">' +
            pt[i].recipient +
            "</td>" +
            "<td>" +
            pt[i].amount +
            "</td>" +
            "</tr >";
    }
    // console.log(html);
    $("#lastTransactionsTable > tbody:last-child").html(html);
});
socket.on("mineSuccess", (trueOrFalse) => {
    //after mining success - display a message to all users
    function removePopUp() {
        $("#alert").remove();
    }
    if (trueOrFalse === true) {
        //i could use JQuery

        var alert = document.createElement("div");
        alert.setAttribute("class", "alert alert-success");
        alert.setAttribute("id", "alert");
        alert.setAttribute(
            "style",
            "position: fixed; bottom: 0; width: 100 %; z-index:1000;"
        );
        alert.innerHTML =
            "<strong>" +
            "Global message - " +
            "</strong>" +
            "One user successfully mined!";
        document.getElementsByTagName("body")[0].appendChild(alert);
        setTimeout(removePopUp, 5000);
    }
});
