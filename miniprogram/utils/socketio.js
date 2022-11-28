import io from './weapp.socket.io.js'

export const wxSocket = io('http://localhost:3000', {
  autoConnect: false
})


export function connectServer () {
  if (wx.getStorageSync('userinfo').id) {
    const userObj = {
      username: wx.getStorageSync('userinfo').username,
      userID: wx.getStorageSync('userinfo').id
    }
    wxSocket.close()
    wxSocket.open()
    wxSocket.emit('connectServer', userObj)
  }
}