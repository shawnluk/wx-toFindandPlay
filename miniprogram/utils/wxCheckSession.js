
export function checkSession () {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success () {
        console.log('session_key 未过期，并且在本生命周期一直有效');
        resolve(1)
      },
      fail () {
        console.log('session_key 已经失效，需要重新执行登录流程');
        resolve(0)
        wx.clearStorage()
        // wx.switchTab({
        //   url: '../pages/user/index',
        // });
      }
    })
  })
}