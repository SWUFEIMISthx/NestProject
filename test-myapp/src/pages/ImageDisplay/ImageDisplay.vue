<template>
    <view class="page">
        <page-header title="相册展示" @back="goBack"></page-header>
        <view class="images-list">
            <image v-for="image in images" :key="image" :src="image" class="image-item" mode="aspectFill"></image>
			<view v-if="images.length === 0" class="no-images">暂无图片</view>
        </view>
    </view>
</template>

<script>
import PageHeader from '@/components/PageHeader/index.vue';

export default {
    components: { PageHeader },
    data() {
        return {
            images: []
        };
    },
    onLoad(options) {
        const albumId = options.albumId;
		console.log('Received albumId:', albumId);
        // 模拟获取相册数据
        const albumData = {
            1: [
                "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%AB%A5%E7%85%A7%E7%89%87/1.jpg",
                "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%AB%A5%E7%85%A7%E7%89%87/10.jpg"
            ],
            2: [
                "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/12.jpg",
                "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/2.jpg",
                "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/5.jpg"
            ]
        };
        this.images = albumData[albumId] || [];
		console.log('Loaded images:', this.images);
    },
    methods: {
        goBack() {
            uni.navigateBack();
        }
    }
};
</script>

<style scoped>
.page {
    background: #fff;
    min-height: 100vh;
}

.images-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 24rpx;
}

.image-item {
    width: 48%;
    margin-bottom: 24rpx;
    border-radius: 12rpx;
    overflow: hidden;
}
</style>
