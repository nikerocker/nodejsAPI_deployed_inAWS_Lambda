const data = {
    users: [
        {
            "username": "nekhilesh",
            "password": "nekh@123",
            "id": 1
        },
        {
            "username": "suraj",
            "password": "sur@321",
            "id": 2
        }
    ]
}

function getRow(id) {
    for (let item of data.users) {
        if (item.id == id) return item;
    }
    return false;
}

const findID = function(users, id){
    return users.indexOf(getRow(id));
}

exports.data = data;
exports.getRow = getRow
exports.findID = findID