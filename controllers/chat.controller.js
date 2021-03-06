const serverConfig = require('../config/server.config');
const chatCPM = require('../components/chat.component');
const userCpm = require('../components/user.component');
const appCpm = require('../components/app.component');

/**
 * Lấy tin nhắn với bạn bè
 */
function getFriendMessage(req, res) {
    const userEmail = req.session.User.email
    const friendEmail = req.body.email

    chatCPM.getFriendMessage(userEmail, friendEmail).then(data => {
        userCpm.getUserByEmail(friendEmail).then(user => {
            console.log(data);
            return res.json({
                status: true,
                data: getMsg(data, userEmail),
                user: user
            })
        }).catch(e => {
            console.log(e)
            return res.json({
                status: false,
                msg: 'Lấy thông tin người dùng thất bại'
            });
        })
    }).catch(e => {
        console.log(e);
        return res.json({
            status: false,
            msg: 'Lấy tin nhắn bạn bè thất bại'
        })
    })
}

/**
 * Lưu tin nhắn
 */

function saveMessage(req, res) {
    const userEmail = req.session.User.email
    const friendEmail = req.body.receiver
    const content = req.body.message

    const data = [{
        userEmail,
        friendEmail,
        content,
        type: 'text',
        created: serverConfig.getCurrenTime()
    }]

    appCpm.save('messages', data).then(resultInsert => {
        return res.json({
            status: true,
        });
    }).catch(e => {
        console.log(e)
        return res.json({
            status: false,
            msg: 'Lưu tin nhắn thất bại'
        });
    })
    //  console.log(req)

}

/**
 * Gửi tin nhắn hình ảnh
 */
function sendMsgImg(req, res) {
    const userEmail = req.session.User.email
    const newPath = (req.file.path).replace('/Users/lctiendat/Documents/ZolaApp', '')
    const friendEmail = req.body.email
    const content = newPath

    console.log(friendEmail);
    const data = [{
        userEmail,
        friendEmail,
        content,
        type: 'img',
        created: serverConfig.getCurrenTime()
    }]
    appCpm.save('messages', data).then(resultInsert => {
        return res.json({
            status: true,
            path: newPath
        });
    }).catch(e => {
        console.log(e)
        return res.json({
            status: false,
            msg: 'Lưu tin nhắn thất bại'
        });
    })
}

/**
 * Gửi tin nhắn kèm file
 */
function sendMsgFile(req, res) {
    const userEmail = req.session.User.email
    const newPath = (req.file.path).replace('/Users/lctiendat/Documents/ZolaApp', '')
    const friendEmail = req.body.email
    const content = newPath

    const data = [{
        userEmail,
        friendEmail,
        content,
        type: 'file',
        created: serverConfig.getCurrenTime()
    }]
    appCpm.save('messages', data).then(resultInsert => {
        return res.json({
            status: true,
            path: newPath
        });
    }).catch(e => {
        console.log(e)
        return res.json({
            status: false,
            msg: 'Lưu tin nhắn thất bại'
        });
    })
}

/**
 * Thu hồi tin nhắn
 */
function recallMsg(req, res) {
    const id = req.body.id
    chatCPM.recallMsg(id).then(data => {
        return res.json({
            status: true,
            msg: 'Thu hồi tin nhắn thành công'
        })
    })
}

/**
 * Lấy tin nhắn
 */
function getMsg(data, userEmail) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].userEmail === userEmail) {
            arr.push(data[i])
            data[i].isMe = true
        }
        else {
            arr.push(data[i])
            data[i].isMe = false
        }
    }
    return arr
}


module.exports = {
    getFriendMessage,
    saveMessage,
    sendMsgImg,
    sendMsgFile,
    recallMsg
}