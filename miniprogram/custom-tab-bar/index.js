Component({
	data: {
		selected: 0,
		list: [
			{
				icon: 'home-o',
				text: '首页',
				url: '/pages/home/index'
			},
			{
				icon: 'search',
				text: '活动',
				url: '/pages/activity/index'
			},
			{
				icon: 'friends-o',
				text: '球队',
				url: '/pages/team/index'
			},
			{
				icon: 'setting-o',
				text: '我的',
				url: '/pages/user/index'
			}
		]
	},

	methods: {
		onChange (event) {
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init () {
			const page = getCurrentPages().pop();
			this.setData({
				selected: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
