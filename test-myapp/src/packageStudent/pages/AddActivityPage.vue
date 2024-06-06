<template>
    <view class="page">
        <page-header title="新增活动" @back="goBack"></page-header>
        <view class="form">
            <view class="form-item">
                <text class="label">活动标题</text>
                <input class="input" type="text" v-model="activityTitle" placeholder="请输入活动标题" />
            </view>
            <view class="form-item">
                <text class="label">活动内容</text>
                <textarea class="textarea" v-model="activityContent" placeholder="请输入活动内容"></textarea>
            </view>
            <view class="form-item">
                <u-button type="success" @click="addActivity">添加活动</u-button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            activityTitle: '',
            activityContent: ''
        };
    },
    methods: {
        goBack() {
            uni.navigateBack();
        },
        addActivity() {
            if (this.activityTitle && this.activityContent) {
                const activity = {
                    id: Date.now(),
                    title: this.activityTitle,
                    content: this.activityContent
                };
                let activities = uni.getStorageSync('circleItems') || [];
                activities.push(activity);
                uni.setStorageSync('circleItems', activities);
                uni.navigateBack();
            } else {
                uni.showToast({
                    title: '请填写完整的活动信息',
                    icon: 'none'
                });
            }
        }
    }
};
</script>

<style scoped>
.page {
    background: #fff;
    padding: 24rpx;
}
.form {
    margin-top: 20rpx;
}
.form-item {
    margin-bottom: 20rpx;
}
.label {
    display: block;
    font-size: 32rpx;
    margin-bottom: 10rpx;
}
.input, .textarea {
    width: 100%;
    padding: 20rpx;
    border: 1px solid #ccc;
    border-radius: 8rpx;
}
.textarea {
    height: 200rpx;
}
</style>
