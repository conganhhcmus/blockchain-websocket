///////////////////////////////////////////////////////////////////////////////////////////////
/*  -find index of socket | For example : search((socket.id).toString(), nodes);-  */
///////////////////////////////////////////////////////////////////////////////////////////////
function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].socketId === nameKey) {
            return i;
        }
    }
}

module.exports = {
    search: search,
};
