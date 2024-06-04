<template>
	<view class="user">
			<!--头部-->
			<view class="user-section" :class="'bg-' + themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--用户信息-->
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.head_portrait || headImg"></image>
					<text class="username">
						{{ userInfo.realname ||'登录/注册'}}
						{{ userInfo.mobile || '没有填写手机号'}}
					</text>
				</view>
			</view>
		</view>
		<!-- 个人中心 内容区-->
		<view class="cover-container" :style="[
			{
				transform: coverTransform,
				transition: coverTransition
			}
		]" @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
			<image class="arc" :src="arc"></image>
			<!-- 个人资料 -->
			<view class="set">
				<view class="list-cell b-b" :class="{ 'm-t': item.class === 'mT' }" v-for="item in setList"
					:key="item.title" @tap="navTo(item.url)" hover-class="cell-hover" :hover-stay-time="50">
					<text class="cell-tit">{{ item.title }}</text>
					<text class="cell-tip">{{ item.content }}</text>
					<text class="cell-more iconfont iconyou"></text>
				</view>

			</view>

			<view v-if="hasLogin" class="list-cell log-out-btn" :class="'text-' + themeColor.name" @tap="toLogout">
				<text class="cell-tit">退出登录</text>
			</view>
		</view>



		<myTabbar :current="3"></myTabbar>
	</view>
</template>
<script>
	export default {

		data() {
			return {
				themeColor: {
					name: 'green'
				},
				userInfo: {
					'realname': '张三',
					'mobile': '18986860001'
				},
				setList: this.$mConstDataConfig.setList,
				headImg: this.$mAssetsPath.headImg,
				userBg: this.$mAssetsPath.userBg,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				loading: true,
				hasLogin: true,
			};
		},
		onShow() {
		},
		methods: {
			// 退出登录
			toLogout() {
				uni.showModal({
					content: '确定要退出登录么',
					success: e => {
						if (e.confirm) {
							uni.reLaunch({
								url: '/pages/public/login'
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
		background-color: $page-color-base;
	}

	.user {
		.promotion-center {
			background: #fff;
			margin-bottom: 20upx;

			/*分类列表*/
			.category-list {
				width: 100%;
				padding: 0 0 30upx 0;
				border-bottom: solid 2upx #f6f6f6;
				display: flex;
				flex-wrap: wrap;

				.category {
					width: 33.3%;
					margin-top: 50upx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					.img {
						width: 100%;
						display: flex;
						justify-content: center;

						.iconfont {
							font-size: $font-lg + 24upx;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 24upx;
						color: #3c3c3c;
					}

					.share-btn {
						height: 142upx;
						text-align: left;
						background: none;
						padding: 0;
						margin: 0;
					}

					.share-btn:after {
						border: none;
						border-radius: none;
					}
				}
			}
		}

		.order-section {
			@extend %section;
			padding: 28upx 0;

			.order-item {
				@extend %flex-center;
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: $font-color-dark;
				position: relative;
			}

			.badge {
				position: absolute;
				top: 0;
				right: 4upx;
			}

			.iconfont {
				font-size: 48upx;
			}

			.icon-shouhoutuikuan {
				font-size: 44upx;
			}
		}

		.no-foot-print {
			text-align: center;
			padding: 48upx 0;

			.no-foot-print-icon {
				font-size: $font-lg + 2upx;
				margin-right: 10upx;
			}
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

		.user-section {
			height: 520upx;
			padding: 0 30upx 0;
			position: relative;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100vw;
				height: 60vw;
				opacity: 0.84;
			}

			.user-info-box {
				height: 180upx;
				display: flex;
				align-items: center;
				position: relative;
				z-index: 1;
				justify-content: space-between;

				.portrait-box {
					display: flex;
					align-items: center;

					.portrait {
						width: 130upx;
						height: 130upx;
						border: 5upx solid #fff;
						border-radius: 50%;
					}

					.username {
						font-size: $font-lg + 6upx;
						color: $color-white;
						margin-left: 20upx;
					}

					button {
						background-color: transparent;
						font-size: $font-lg + 6upx;
						color: $font-color-dark;
						border: none;
					}

					button::after {
						border: none;
					}
				}
			}

		}

		.cover-container {
			margin-top: -150upx;
			padding: 0 30upx 20upx;
			position: relative;
			background-color: $page-color-base;

			.arc {
				position: absolute;
				left: 0;
				top: -34upx;
				width: 100%;
				height: 36upx;
			}

			.promotion-center {
				background: #fff;
				margin-bottom: 20upx;

				/*分类列表*/
				.category-list {
					width: 100%;
					padding: 0 0 30upx 0;
					border-bottom: solid 2upx #f6f6f6;
					display: flex;
					flex-wrap: wrap;

					.category {
						width: 33.3%;
						margin-top: 50upx;
						display: flex;
						justify-content: center;
						flex-wrap: wrap;

						.img {
							width: 100%;
							display: flex;
							justify-content: center;

							.iconfont {
								font-size: $font-lg + 24upx;
							}
						}

						.text {
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 24upx;
							color: #3c3c3c;
						}

						.share-btn {
							height: 142upx;
							text-align: left;
							background: none;
							padding: 0;
							margin: 0;
						}

						.share-btn:after {
							border: none;
							border-radius: none;
						}
					}
				}
			}

			.tj-sction {
				@extend %section;
				display: flex;

				.tj-item {
					@extend %flex-center;
					flex: 1;
					flex-direction: column;
					margin: 30upx 0;
					font-size: $font-sm;
					color: #75787d;
					/*border-right: 2upx solid rgba(0, 0, 0, 0.2);*/
				}

				/*.tj-item:last-child {*/
				/*border-right: none;*/
				/*}*/
				.num {
					font-size: $font-base;
				}

				.red {
					color: $base-color;
				}
			}

		}
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		justify-content: space-around;
		display: flex;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}
</style>
