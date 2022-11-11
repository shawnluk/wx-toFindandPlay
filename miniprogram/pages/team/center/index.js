// pages/team/center/index.js
import { checkSession } from '../../../utils/wxCheckSession'
import { userAPI, activityAPI, teamAPI, wxRequest } from '../../../utils/wxRequest'
import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: '',
    teaminfo: {},
    userinfo: {},
    showPopup: false,
    quitTeamDialog: false,
    teamMemberList: [],
    captainSelect: '',
    hasTeam: false
  },

  /* 删除球队加入申请 */
  joinDelete () {
    if (wx.getStorageSync('teaminfo').joinStatus === 1) {
      wxRequest(teamAPI.deleteTeamJoin, 'post').then(result => {
        console.log(result)
        if (result.status === 200) {
          wx.setStorage({
            key: 'teaminfo',
            data: {},
            success: () => {
              wx.switchTab({
                url: '/pages/user/index'
              })
            }
          })
        }
      })
      return
    }
    Toast.fail('您还未申请加入任何球队')
  },

  /* 点击去往球队创建赛事页面 */
  toCreateTeam () {
    if (this.data.teaminfo.CaptainID !== this.data.userinfo.id) {
      Toast.fail('您不是球队队长')
      return
    }
    wx.navigateTo({
      url: '/pages/team/create/index',
    });
  },

  /* 队长退出球队前选择下一任队长 */
  captainSelect (e) {
    console.log(e.detail);
    this.setData({
      captainSelect: e.detail
    })
  },

  /* 队长退出球队前确认下一任队长 */
  captainConfirm (e) {
    if (!this.data.captainSelect) {
      Toast.fail('您的球队需要指定新队长')
      return
    }
    const username = this.data.teamMemberList.filter(item => { return item.value === this.data.captainSelect })
    Dialog.confirm({
      title: '您确定选择' + username[0].text + '为新队长',
    }).then(() => {
      // on confirm
      // 指定新队长后球队队长退出球队
      wxRequest(teamAPI.teamQuit, 'post', {
        teamID: this.data.teaminfo.id,
        newCaptain: {
          username: username[0].text,
          userID: username[0].value
        }
      }).then(result => {
        if (result.status === 200) {
          Toast.success('球队队长退出球队成功')
          wx.setStorage({
            key: 'teaminfo',
            data: '',
            success: () => {
              wx.switchTab({
                url: '/pages/user/index'
              })
            }
          })
        }
      })

    })
  },

  /* 点击退出球队 */
  quitTeam () {
    if (!this.data.teaminfo.id) {
      Toast.fail('您未加入任何球队')
      return
    }

    /* 球队队长点击退出球队 */
    if (this.data.teaminfo.CaptainID === this.data.userinfo.id) {
      // 获取球队成员
      wxRequest(teamAPI.getTeamMember, 'post', { teamID: this.data.teaminfo.id }).then(res => {
        if (res.status === 200) {
          const teamMember = res.memberList[0].filter(item => {
            return item.userID !== this.data.teaminfo.CaptainID
          })

          // 球队只有一人，队长退出并删除球队
          if (teamMember.length === 0) {
            Dialog.confirm({
              title: '球队队长退出球队',
              message: '您打算退出并删除这个球队吗？',
            }).then(() => {
              // on confirm
              wxRequest(teamAPI.teamDelete, 'post', { teamID: this.data.teaminfo.id, deleteTime: new Date().toJSON() }).then(result => {
                if (result.status === 200) {
                  Toast.success('球队队长删除球队成功')
                  wx.setStorage({
                    key: 'teaminfo',
                    data: '',
                    success: () => {
                      wx.switchTab({
                        url: '/pages/user/index'
                      })
                    }
                  })
                }
              })
            })
          }

          // 球队成员数大于1，需指定下一任队长
          if (teamMember.length > 0) {
            const arr = teamMember.map(item => {
              let member = { text: '', value: '' }
              member.text = item.username
              member.value = item.userID
              return member
            })
            this.setData({
              teamMemberList: arr,
              quitTeamDialog: true,
            })
          }
        }
      })
    }

    /*  球队队员退出球队 */
    if (this.data.teaminfo.CaptainID !== this.data.userinfo.id) {
      Dialog.confirm({
        title: '您确定退出球队吗？'
      }).then(() => {
        // on confirm
        wxRequest(teamAPI.teamQuit, 'post', { teamID: this.data.teaminfo.id, newCaptain: '' }).then(result => {
          if (result.status === 200) {
            Toast.success('球队队员退出球队成功')
            wx.setStorage({
              key: 'teaminfo',
              data: '',
              success: () => {
                wx.switchTab({
                  url: '/pages/user/index'
                })
              }
            })
          }
        })
      })
    }
  },

  /* 点击前往设置球队资料页面 */
  toSetTeam () {
    if (this.data.teaminfo.CaptainID !== this.data.userinfo.id) {
      Toast.fail('您不是球队队长，不能进行球队资料设置')
      return
    }
    wx.navigateTo({
      url: '/pages/team/setTeamData/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onChange (event) {
    // event.detail 的值为当前选中项的索引
    console.log(event.detail);
    this.setData({ active: event.detail });
    const map = {
      toHome: () => { wx.switchTab({ url: '/pages/home/index' }) },
      toActivity: () => { wx.switchTab({ url: '/pages/activity/index' }) },
      toUser: () => { wx.switchTab({ url: '/pages/user/index' }) }
    }
    if (map[event.detail]) {
      map[event.detail]()
    }
  },
  onLoad (options) {

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
    checkSession().then(res => {
      if (res === 1) {
        this.setData({
          userinfo: wx.getStorageSync('userinfo') !== {} ? wx.getStorageSync('userinfo') : {},
          teaminfo: wx.getStorageSync('teaminfo') !== {} ? wx.getStorageSync('teaminfo') : {},
          hasTeam: wx.getStorageSync('teaminfo') !== {} ? true : false
        })
        return
      }
      console.log('登陆过期');
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    this.setData({
      active: ''
    })
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