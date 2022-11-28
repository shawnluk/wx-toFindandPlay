// app.js
import { checkSession } from './utils/wxCheckSession'
import { wxRequest, teamAPI, userAPI } from './utils/wxRequest'
import io from './utils/weapp.socket.io.js'

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }




    this.globalData = {};

    // const socket = io('http://localhost:3000', {
    //   autoConnect: false
    // })
    // socket.on('wx', socketID => {
    //   console.log(socketID)
    // })

    // wx.connectSocket({
    //   url: 'wss://localhost:3000',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: () => {
    //     console.log('connectSocket成功');
    //   },
    //   fail: () => {
    //     console.log('失败');
    //   }
    // })





    // checkSession().then(response => {
    //   if (response === 0) {
    //     wx.getUserInfo({
    //       success: (result) => {
    //         wx.login({
    //           success (res) {
    //             // console.log(res);
    //             if (res.code) {
    //               //发起网络请求
    //               const data = {
    //                 code: res.code,
    //                 name: 'wx-luk',
    //                 username: result.userInfo.nickName,
    //                 userPic: result.userInfo.avatarUrl
    //               }
    //               // 获取token
    //               wxRequest(userAPI.wxlogin, 'post', data).then(results => {
    //                 console.log(results);
    //                 if (results.status === 200) {
    //                   wx.setStorage({
    //                     key: 'token',
    //                     data: results.token
    //                   })
    //                   // 获取服务端返回的用户个人信息
    //                   wxRequest(userAPI.getUserInfo).then(userRes => {
    //                     console.log(userRes);
    //                     if (userRes.status === 200) {
    //                       wx.setStorage({
    //                         key: 'userinfo',
    //                         data: userRes.userData,
    //                       })
    //                       wxRequest(teamAPI.getTeamInfo).then(resTeam => {
    //                         console.log(resTeam);
    //                         if (resTeam.status === 200) {
    //                           wx.setStorage({
    //                             key: 'teaminfo',
    //                             data: resTeam.teamInfo[0]
    //                           })
    //                         }
    //                       })
    //                     }
    //                   })
    //                 }
    //               })
    //             } else {
    //               console.log('登录失败！' + res.errMsg)
    //             }
    //           }
    //         })
    //       },
    //       fail: () => { },
    //       complete: () => { }
    //     });
    //   }
    // })

  },
});
