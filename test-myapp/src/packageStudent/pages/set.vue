<template>
	<view class="set">
		<view
			class="list-cell b-b"
			:class="{ 'm-t': item.class === 'mT' }"
			v-for="item in setList"
			:key="item.title"
			@tap="navTo(item.url)"
			hover-class="cell-hover"
			:hover-stay-time="50"
		>
			<text class="cell-tit">{{ item.title }}</text>
			<text class="cell-tip">{{ item.content }}</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view
			class="list-cell log-out-btn"
			:class="'text-' + themeColor.name"
			@tap="toLogout"
		>
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>
<script>
import { logout } from '@/api/login';
export default {
	data() {
		return {
			isVersionUpgradeShow: false,
			user: {},
			setList: this.$mConstDataConfig.setList,
			isNewVersion: false
		};
	},
	onLoad() {
		this.initData();
	},
	methods: {
		// 初始化数据
		initData() {
			this.user = uni.getStorageSync('user');
			// 缓存大小
			this.setList[5].content = `${uni.getStorageInfoSync().currentSize} kb`;
		},
		// 通用跳转
		navTo(route) {
			if (!route) return;
			if (route === 'clearCache') {
				uni.showModal({
					content: '确定要清除缓存吗',
					success: e => {
						if (e.confirm) {
							uni.clearStorageSync();
							this.setList[5].content = '0 kb';
							this.$mStore.commit('login', this.user);
							this.$mHelper.toast('清除缓存成功');
						}
					}
				});
				return;
			} else if (route === 'versionUpgrade') {
				this.isVersionUpgradeShow = true;
				if (this.isNewVersion) {
					this.$mHelper.toast('已经是最新版本');
				}
				return;
			}
			this.$mRouter.push({ route });
		},
		// 退出登录
		toLogout() {
			uni.showModal({
				content: '确定要退出登录么',
				success: e => {
					if (e.confirm) {
						this.$http.post(`${logout}`).then(() => {
							this.$mStore.commit('logout');
							uni.reLaunch({
								url: '/pages/profile/profile'
							});
						});
					}
				}
			});
		},
	}
};
</script>
<style lang="scss">
page {
	background: $page-color-base;
}
.set {
	padding: $spacing-base 0;
}
.cu-list.card-menu {
	margin: $spacing-base 0;
	.title {
		margin-left: $spacing-base;
	}
}
</style>
