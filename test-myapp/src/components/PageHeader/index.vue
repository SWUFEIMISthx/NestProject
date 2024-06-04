<template>
	<u-sticky :offset-top="0" :z-index="1000">
		<view
			class="page-header flex"
			:style="{ height: (pageHeaderHeight + 12) + 'rpx', paddingTop: menuButtonInfo.top + 'px' }">
			<view class="header-inner flex h-start v-center" :style="{ height: menuButtonInfo.height + 'px' }">
				<slot></slot>
			</view>
		</view>
	</u-sticky>
</template>
<script>
export default {
	name: 'PageHeader',
	data () {
		return {
			menuButtonInfo: {},
			pageHeaderHeight: 0,
		};
	},
	created() {
		uni.getSystemInfo({
			success: (e)=>{
				this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				// #ifdef MP-WEIXIN
				this.pageHeaderHeight = this.menuButtonInfo.bottom * 2;
				// #endif
			},
		});
	}
};
</script>
<style scoped lang="scss">
.page-header{
	width: 100%;
	position: relative;
	z-index: 990;
	//background: rgb(66, 203, 137);
	background: #42CB89;
	.header-inner{
		width: 100%;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #191919;
		padding-left: 32rpx;
	}
}
</style>
