<template>
	<view class="page">
		<view class="banner-wrap">
			<swiper
				class="banner-swiper"
				:circular="true"
				:indicator-dots="false"
				:autoplay="true"
				:interval="5000"
				:duration="500"
				@change="onSwiperChange">
				<swiper-item
					class="banner-swiper-item"
					v-for="(banner, idx) in banners"
					:key="idx"
					@click="onBannerTap(banner)">
					<image :src="banner.pic" class="banner-image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="indicator-wrap flex v-center h-center" v-if="banners.length > 1">
				<view class="indicator-inner flex v-center h-center">
					<view v-for="(item, index) in banners" :key="index" class="indicator-dot" :class="{ act: bannerCurrent === index }"></view>
				</view>
			</view>
		</view>
		<view class="container-wrap">
			<view class="search-wrap flex v-center">
				<view class="scan" @click="onScanTap">
					<u-icon name="scan" size="28"></u-icon>
				</view>
				<view class="search flex-item-fill flex v-center">
					<u-icon name="search" size="28" color="#B0B3BF"></u-icon> 搜索班级、圈子...
				</view>
				<view class="notice">
					<u-icon name="email" size="28"></u-icon>
				</view>
			</view>

			<view class="content-wrap area-wrap">
				<view class="content-title flex v-center h-s-b">
					<view>区域创设</view>
					<view class="content-title-extra flex v-center" @click="onMoreAreaTap">
						<u-icon name="arrow-right" size="14px"></u-icon>
					</view>
				</view>
				<scroll-view :scroll-x="true" class="area-list">
					<view class="area-list-inner flex">
						<view
							v-for="(item, index) in motionList"
							:key="index"
							class="flex v-center h-center flex-item-keep-style area-item"
							@click="onImageClick(item)">
							<image class="area-item-background-image" mode="aspectFill" :src="item.pic"></image>
<!-- 							<view class="area-item-inner flex flex-column h-center v-center">
								{{ item.name }}
							</view> -->  <!-- 图片上方不显示文字 -->
						</view>
						<view class="area-item-last">0</view>
					</view>
				</scroll-view>
			</view>

			<view class="content-wrap circle-wrap">
				<view class="content-title flex v-center h-s-b">
					<view>班级圈</view>
					<view class="content-title-extra flex v-center" @click="onMoreCircleTap">
						<u-icon name="arrow-right" size="14px"></u-icon>
					</view>
				</view>
				<view class="circle-list">
					<circle-list-item v-for="item in circleItems" 
					:key="item.id"
					:name="item.name"
					:title="item.title"
					:src="item.src"
					:content-text="item.contentText"/>
				</view>
			</view>
		</view>

		<view class="footer flex v-center h-center flex-column">
			<view>到底啦！</view>
		</view>
		<myTabbar :current="0"></myTabbar>
	</view>
</template>
<script>
import mConstDataConfig from "@/config/constData.config";
import CircleListItem from '@/components/CircleListItem/index.vue';
export default {
	components: { CircleListItem },
	data() {
		return {
			scrollXPosition: 0,
			banners: [
				{ id: 0, pic: 'https://images-special.oss-cn-chengdu.aliyuncs.com/headimage.jpg', type: 'SELF' }
			],
			bannerCurrent: 0,

			motionList: [
				{ id: 1, pic: 'https://images-special.oss-cn-chengdu.aliyuncs.com/%E8%90%A5%E5%85%BB%E6%95%99%E8%82%B2.jpg' },
				{ id: 2, pic: 'https://images-special.oss-cn-chengdu.aliyuncs.com/%E5%BF%83%E7%90%86%E5%81%A5%E5%BA%B7.jpg' },
				{ id: 3, pic: 'https://images-special.oss-cn-chengdu.aliyuncs.com/%E5%A4%96%E8%AF%AD%E6%95%99%E8%82%B2.jpg' },
				{ id: 4, pic: '/static/images/orangefood.jpg' },
				{ id: 5, pic: '/static/images/redfood.jpg' },
				{ id: 6, pic: '/static/images/whitefood.jpg' },
			],
			circleItems:[
				{
					id: 1,
					name: '刘茜',
					title: '护巢计划创始人',
					src: 'https://images-special.oss-cn-chengdu.aliyuncs.com/girlface.jpg',
					contentText: '同学们好！我是你们的刘老师，新的一周又要开始啦！我知道大家都玩得很开心，不过记得下周一我们又要回到学校，一起开始新的学习旅程啦！下周一，我们要准时到校哦！到了学校，我们可以一起分享周末的趣事，也可以把你们在家里学到的新知识、新本领展示出来。在校园里，我们要互相帮助，一起学习，一起玩耍。上课时要认真听讲，积极发言，有问题要勇敢提问。期待在校园里见到每一位同学的笑脸。下周一见！爱你们的刘老师❥'
				},
				{
					id: 2,
					name: '李哲凡',
					title: '一年级一班',
					src: 'https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/breadboy.jpg',
					contentText: '第一层是身体活动和饮水。水是膳食的重要组成部分，是一切生命活动必需的物质，其需要量主要受年龄、身体活动、环境温度等因素的影响。低身体活动水平的成年人每天至少饮水1500~1700ml（7~8杯）。',
					time: '5月21日'
				},
				{
					id: 3,
					name: '林雨欣',
					title: '一年级一班',
					src: 'https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/dog.jpg',
					contentText: '第二层是谷薯类食物。谷薯类是膳食能量的主要来源（碳水化合物提供总能量的50%~65%），也是多种微量营养素和膳食纤维的良好来源。'
				},
				{
					id: 4,
					name: '吴祉行',
					title: '一年级三班',
					src: 'https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/flowerbrowndog.jpg',
					contentText: '建议成年人每人每天摄入谷类200~300g，其中包含全谷物和杂豆类50~150g；另外，薯类50~100g，从能量角度，相当于15~35g大米。'
				},
				{
					id: 5,
					name: '钟月',
					title: '一年级二班',
					src: 'https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/swingbrowdog.jpg',
					contentText: '第三层是蔬菜水果。蔬菜水果是膳食指南中鼓励多摄入的两类食物。在1600~2400kcal 能量需要量水平下，推荐成年人每天蔬菜摄入量至少达到300g~500g，水果200~350g。'
				},
				{
					id: 6,
					name: '马子金',
					title: '二年级一班',
					src: 'https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/xiaoxin.jpg',
					contentText: '第四层是鱼、禽、肉、蛋等动物性食物。鱼、禽、肉、蛋等动物性食物是膳食指南推荐适量食用的食物。'
				},
				{
					id: 7,
					name: '张雨桐',
					title: '一年级四班',
					src: 'https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/yellowman.jpg',
					contentText: '在1600~2400kcal能量需要量水平下，推荐每天鱼、禽、肉、蛋摄入量共计120~200g。推荐每天1个鸡蛋（相当于50g左右），吃鸡蛋不能丢弃蛋黄。'
				},
				{
					id: 8,
					name: '黄沐阳',
					title: '二年级二班',
					src: 'https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/xiaoxin3.jpg',
					contentText: '第五层是奶类、大豆和坚果。奶类和豆类是鼓励多摄入的食物。奶类、大豆和坚果是蛋白质和钙的良好来源，营养素密度高。'
				}
			]
		};
	},
	onShow() {
		console.log(mConstDataConfig)
	},
	// mounted() {
	// 	this.$nextTick(() =>{
	// 	this.scrollTimer = setInterval(() => {
	// 	    const maxPosition = 200; // 假定最大滚动长度
	// 	    this.scrollXPosition += 10;
	// 	    if (this.scrollXPosition > maxPosition) {
	// 	        this.scrollXPosition = 0;
	// 	    }
	// 	    if (this.$refs.scrollView && this.$refs.scrollView.scrollTo) {
	// 	        this.$refs.scrollView.scrollTo({ x: this.scrollXPosition });
	// 	    } else {
	// 	        console.log("Scroll view is not defined yet.");
	// 	    }
	// 	}, 100);	
	// 	});
	// },
	// beforeDestroy() {
	//         if (this.scrollTimer) {
	//             clearInterval(this.scrollTimer);
	//         }
	// },
	methods: {
		// updateScrollPosition() {
		//     const maxPosition = 2000; // 假定最大滚动长度
		//     this.scrollXPosition += 10;
		//     if (this.scrollXPosition > maxPosition) {
		//         this.scrollXPosition = 0;
		//     }
		//     if (this.$refs.scrollView && this.$refs.scrollView.scrollTo) {
		//         this.$refs.scrollView.scrollTo({ x: this.scrollXPosition });
		//     } else {
		//         console.log("Scroll view is not defined yet.");
		//     }
		// },
		onSwiperChange(event) {
			this.bannerCurrent = event.detail.current;
		},
		onBannerTap({url_id}) {
			if (!url_id) return false;
			if (url_id.indexOf('https://') > -1) {
				util.openWeb(url_id);
			} else {
				this.$wxrouter.push(url_id);
			}
		},
		onImageClick(item) {
		    console.log('Navigating to:', `/src/pages/ImageDisplay/ImageDisplay?imageUrl=${encodeURIComponent(item.pic)}`);
		    uni.navigateTo({
		        url: '/pages/ImageDisplay/ImageDisplay?imageUrl=' + encodeURIComponent(item.pic)
		    });
		},
		// onSportItemTap(item) {
		// 	console.log(('尝试加载图片', item.pic));
		// 	uni.previewImage({
		// 		urls: [item.pic],
		// 		current: item.pic
		// 	}).catch(e =>{
		// 		console.log('加载图片失败', e);
		// 	});
		// },
		onMoreAreaTap() {},
		onMoreCircleTap() {
			uni.navigateTo({
				url: '/packageStudent/pages/circle',
				error (res) {
					console.log(res);
				}
			});
		},
		onScanTap() {
			// 调起条码扫描
			uni.scanCode({
				scanType: ['barCode', 'qrCode'],
				success: function (res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});
		},
	}
};
</script>
<style lang="scss">
	.page {
		//background-color: $page-color-base;
		background: #FFFFFF;
		min-height: 100vh;
	}

	.banner-wrap{
		position: relative;
		.banner-swiper{
			height: 500rpx;
			.banner-swiper-item{
				height: 500rpx;
				.banner-image{
					display: block;
					height: 500rpx;
					width: 100%;
				}
			}
		}
		.indicator-wrap{
			width: 100%;
			position: absolute;
			bottom: 50rpx;
			.indicator-inner{
				background: rgba(0, 0, 0, .5);
				height: 28rpx;
				border-radius: 14rpx;
				padding: 0 12rpx;
				.indicator-dot{
					width: 20rpx;
					height: 8rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					opacity: 0.2;
					margin: 0 4rpx;
					&.act{
						opacity: 1;
					}
				}
			}
		}
	}

	.container-wrap {
		padding-top: 32rpx;
		position: relative;
		top: -40rpx;
		background: #fff;
		border-radius: 32rpx 32rpx 0rpx 0rpx;
		.search-wrap{
			padding: 0 24rpx;
			margin-bottom: 60rpx;
			.search{
				background: #f7f7f7;
				height: 64rpx;
				margin: 0 24rpx;
				border-radius: 32rpx;
				padding: 0 24rpx;
				font-size: 28rpx;
				color: #B0B3BF;
			}
		}
		.content-wrap {
			margin-bottom: 60rpx;

			.content-title {
				font-size: 36rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: $base-color;
				padding: 0 24rpx 0 36rpx;
				margin-bottom: 48rpx;
				position: relative;
				&:before{
					position: absolute;
					left: 24rpx;
					top: 6rpx;
					display: block;
					content: '';
					width: 6rpx;
					height: 28rpx;
					background: $base-color;
				}

				.content-title-extra {
					font-size: 24rpx;
					color: #767676;
				}
			}

		}
		.area-wrap {
			.area-list {
				width: 100%;
				box-sizing: border-box;
				margin-bottom: 24rpx;

				&::-webkit-scrollbar {
					width: 0;
					height: 0;
					color: #transparent;
				}

				.area-item {
					width: 248rpx;
					height: 148rpx;
					border-radius: 16rpx;
					color: #4A4A4A;
					font-size: 26rpx;
					margin-right: 22rpx;
					position: relative;
					overflow: hidden;

					&:first-child {
						margin-left: 24rpx;
					}

					.area-item-background-image {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						width: 100%;
						height: 100%;
					}

					.area-item-inner {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						font-size: 34rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						margin: auto;
					}
				}

				.area-item-last {
					height: 10rpx;
					width: 24rpx;
					color: #fff;
					margin-left: -18rpx;
				}
			}

			.product-container {
				margin-bottom: 24rpx;
			}
		}
		.circle-list{
			padding: 0 24rpx;
		}
	}

	.footer{
		font-size: 22rpx;
		color: #BBBBBB;
		line-height: 32rpx;
		margin-bottom: 100rpx;
	}
</style>
