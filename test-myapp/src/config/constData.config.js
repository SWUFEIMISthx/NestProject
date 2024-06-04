export default {
	// app应用名称
	appName: '',

	// 验证码发送间隔
	sendCodeTime: 60,

	// 设置-设置中心
	setList: [
		{
			title: '个人资料',
			url: '/pages/user/userinfo/userinfo',
			content: ''
		},
		{
			title: '修改密码',
			url: '/pages/public/password?type=1',
			content: ''
		},
	],

	// 主题列表
	themeList: [
		{
			title: '森绿',
			name: 'green',
			color: '#39b54a',
			tabList: [
				'/static/tab-home-green.png',
				'/static/tab-cate-green.png',
				'/static/tab-notify-green.png',
				'/static/tab-my-green.png'
			]
		},
	],

	tabbarList: {
		student: [{
			"pagePath": "/pages/student/index/index",
			"iconPath": "static/tab-home.png",
			"icon": "home",
			"selectedIconPath": "static/tab-home-green.png",
			"text": "首页"
		},
		{
			"pagePath": "/pages/student/teaching/index",
			"iconPath": "static/tab-cate.png",
			"icon": "photo",
			"selectedIconPath": "static/tab-cate-green.png",
			"text": "教学"
		},
		{
			"pagePath": "/pages/student/evaluation/index",
			"iconPath": "static/tab-notify.png",
			"icon": "play-right",
			"selectedIconPath": "static/tab-notify-green.png",
			"text": "测评"
		},
		{
			"pagePath": "/pages/student/profile/profile",
			"iconPath": "static/tab-my.png",
			"icon": "account",
			"selectedIconPath": "static/tab-my-green.png",
			"text": "我的"
		}]
	}
};
