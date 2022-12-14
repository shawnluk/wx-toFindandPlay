// pages/user/index.js
// const wxRequest = require('../../utils/wxRequest')
// const app = getApp()
import { userAPI, teamAPI, wxRequest, activityAPI } from '../../utils/wxRequest'
import { checkSession } from '../../utils/wxCheckSession.js'
import { connectServer, wxSocket } from '../../utils/socketio'
import Dialog from '@vant/weapp/dialog/dialog'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginShow: true,
    logoutShow: false,
    userinfo: {},
    teaminfo: {},
    joinTeamCount: 0,
    joinActiCount: 0
  },
  logout () {
    wx.clearStorageSync()
    this.onLoad()
  },
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
    const that = this
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          const data = {
            code: res.code,
            name: 'wx-luk',
            username: e.detail.userInfo.nickName,
            userPic: e.detail.userInfo.avatarUrl
          }

          /* 获取用户自定义登陆态 */
          wxRequest(userAPI.wxlogin, 'post', data).then(results => {
            console.log(results);
            if (results.status === 200) {
              wx.setStorage({
                key: 'token',
                data: results.token
              })

              /* 获取用户信息 */
              wxRequest(userAPI.getUserInfo).then(userRes => {
                // 连接socket io

                if (userRes.status === 200) {
                  // wxSocket.on('wx', socketID => {
                  //   console.log(socketID);
                  // })
                  Dialog.alert({
                    message: '获取用户信息成功',
                  }).then(() => {
                    // on close
                    wx.setStorage({
                      key: 'userinfo',
                      data: userRes.userData,
                      success: () => {
                        connectServer()
                        wxSocket.on('getJoinMsg', (data) => {
                          if (data) {
                            that.setData({
                              newsCount: data.msg.length,
                              newsMsg: data.msg
                            })
                            console.log(data.msg);
                          }
                        })
                      }
                    })

                    that.setData({
                      loginShow: false,
                      logoutShow: true,
                      userinfo: userRes.userData
                    })

                    /* 获取用户所在球队信息 */
                    wxRequest(teamAPI.getTeamInfo).then(teamRes => {

                      // 已加入球队
                      if (teamRes.status === 200) {
                        Dialog.alert({
                          message: '获取已加入球队信息成功',
                        }).then(() => {
                          // on close
                          wx.setStorage({
                            key: 'teaminfo',
                            data: teamRes.teamInfo[0],
                          })
                          that.setData({
                            teaminfo: teamRes.teamInfo[0]
                          })
                        })

                      }

                      // 加入球队申请中
                      if (teamRes.status === 201) {
                        wxRequest(teamAPI.getTeamJoinStatus, 'post').then(joinRes => {
                          // console.log(joinRes);

                          if (joinRes.status === 200) {
                            Dialog.alert({
                              message: '获取申请加入球队的信息成功',
                            }).then(() => {
                              // on close
                              wx.setStorage({
                                key: 'teaminfo',
                                data: joinRes.joinData
                              })
                              that.setData({
                                teaminfo: joinRes.joinData
                              })
                            })
                          }
                        })
                      }
                    })
                  })
                }
              })
            }
          })
        } else {
          // console.log('登录失败！' + res.errMsg)
          wx.showToast({
            title: '登陆失败',
            icon: 'failed',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      loginShow: true,
      logoutShow: false,
      userinfo: {},
      teamInfo: {}
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.getTabBar().init();
    checkSession().then(res => {
      if (res === 1) {
        if (!wx.getStorageSync('userinfo').id) {
          this.setData({
            loginShow: true,
            logoutShow: false
          })
        } else {
          this.setData({
            loginShow: false,
            logoutShow: true,
            userinfo: wx.getStorageSync('userinfo'),
            teaminfo: wx.getStorageSync('teaminfo')
          })


          connectServer()
          wxSocket.on('getJoinMsg', (data) => {
            if (data) {
              this.setData({
                joinTeamCount: data.msg.length,
                newsMsg: data.msg
              })
              console.log(data.msg);
            }
          })

          const userinfo = wx.getStorageSync('userinfo');
          // console.log(userinfo.id);
          wxRequest(activityAPI.getMyActivity, 'post', userinfo).then(res => {
            console.log(res);
            if (res.status === 200) {
              wx.setStorage({
                key: 'myActi',
                data: res.ActiData.sort(this.compareItem),
                success: (result) => {
                  const myActi = wx.getStorageSync('myActi')
                  const myActiID = myActi.map(item => { return item.id })
                  // console.log(myActiID);
                  wxRequest(activityAPI.getJoinActiMsg, 'post', { myActiID }).then(results => {
                    console.log(results);
                    if (results.status === 200) {
                      wx.setStorage({
                        key: 'actiJoinUser',
                        data: results.actiUserData,
                      })
                      // console.log(results.actiUserData.length);
                      this.setData({
                        joinActiCount: results.actiUserData.length
                      })
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

  }
})