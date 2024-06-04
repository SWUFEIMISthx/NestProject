<template>
	<view class="circle-item flex v-start">
		<image :src="src" class="thumb flex-item-keep-style"></image>
		<view class="detail flex-item-fill">
			<view class="name">{{ name }}</view>
			<view class="title">{{ title }}</view>
			<view class="content">{{ contentText }}</view>
			<view class="actions flex v-center h-s-b">
				<view class="date flex v-center">
					05-12 20:48
					<view class="del">删除</view>
				</view>
				<view class="reply">
					<u-icon name="chat-fill" size="22" color="#767676"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'CircleListItem',
	props:{
		name: String,
		title: String,
		src: String,
		contentText: String
	}
};
</script>
<style scoped lang="scss">
.circle-item{
	padding-bottom: 24rpx;
	margin-bottom: 24rpx;
	border-bottom: 2rpx solid #eee;
	.thumb{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background: #eee;
		margin-right: 24rpx;
	}
	.detail{
		padding-top: 8rpx;
		.name{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #1A1C2C;
			margin-bottom: 8rpx;
		}
		.title{
			font-size: 24rpx;
			color: #767676;
			margin-bottom: 28rpx;
		}
		.content{
			font-size: 28rpx;
			color: #1A1C2C;
			line-height: 40rpx;
			margin-bottom: 16rpx;
			text-align: justify;
		}
		.actions{
			font-size: 24rpx;
			color: #767676;
			.del{
				margin-left: 24rpx;
				color: #4399fc;
				opacity: .8;
			}
		}
	}
}
</style>
