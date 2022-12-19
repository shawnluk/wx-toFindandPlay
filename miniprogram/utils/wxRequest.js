/* wx 发起 request */

// const baseurl = 'http://172.20.10.8:3030' /* 手机调试 */
const baseurl = 'http://127.0.0.1:3030'    /* 开发 */
// const baseurl = 'http://120.76.250.41:3030'  /* 服务器 接口带ip */
// const baseurl = 'https://ifangtu.com:3030'  /* 服务器 接口带域名*/


export function wxRequest (url, method = 'get', data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseurl + url,
      method,
      data,
      header: wx.getStorageSync('token') ? {
        'Authorization': wx.getStorageSync('token')
      } : {},
      success: function (res) {
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

export function wxUploadFile (url, filePath, name, formData) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: baseurl + url,
      filePath,
      name,
      formData,
      header: {
        'Authorization': wx.getStorageSync('token') ? wx.getStorageSync('token')
          : {},
        'content-type': "multipart/form-data"
      },

      success: function (res) {
        resolve(JSON.parse(res.data))
      },
      fail: function (err) {
        reject(err)
      },
    })
  })
}

export const userAPI = {
  register: '/user/register',
  login: '/user/login',
  wxlogin: '/user/wxlogin',
  getUserInfo: '/my/userinfo',
  setUserInfo: '/my/baseInfoSet',
  setPic: '/my/setPic',
  setPassword: '/my/setpassword',
}

export const activityAPI = {
  createAct: '/team/createActivity',
  getActivity: '/team/activity',
  deleteActivity: '/team/deleteActivity',
  getMyActivity: '/team/getMyActivity',
  setActivity: '/team/setActivity',
  joinActivity: '/team/joinActivity',
  getJoinActiMsg: '/team/getJoinActiMsg'
}

export const teamAPI = {
  createTeam: '/team/create',
  getTeamInfo: '/team/teaminfo',
  getTeamJoinStatus: '/team/joinstatus',
  getTeamMember: '/team/member',
  getTeamList: '/team/teamlist',
  setTeamInfo: '/team/setTeamInfo',
  setPic: '/team/setPic',
  teamJoin: '/team/join',
  teamQuit: '/team/quit',
  teamDelete: '/team/delete',
  deleteTeamJoin: '/team/deleteTeamJoin',
  captainAgreeJoin: '/team/captainAgreeJoin',
  teamInfoCheck: '/team/teamInfoCheck',
}