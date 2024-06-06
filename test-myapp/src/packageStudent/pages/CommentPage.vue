<template>
    <view class="page">
        <page-header title="评论" @back="goBack"></page-header>
        <view class="form">
            <view class="form-item">
                <text class="label">评论内容</text>
                <textarea class="textarea" v-model="commentContent" placeholder="请输入评论内容"></textarea>
            </view>
            <view class="form-item">
                <u-button type="success" @click="submitComment">提交评论</u-button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            commentContent: '',
            itemId: null
        };
    },
    onLoad(options) {
        this.itemId = options.itemId;
    },
    methods: {
        goBack() {
            uni.navigateBack();
        },
        submitComment() {
            if (this.commentContent) {
                const comment = {
                    content: this.commentContent,
                    itemId: this.itemId,
                    id: Date.now()
                };
                let comments = uni.getStorageSync('comments') || [];
                comments.push(comment);
                uni.setStorageSync('comments', comments);
                uni.navigateBack();
            } else {
                uni.showToast({
                    title: '请填写评论内容',
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
.textarea {
    width: 100%;
    padding: 20rpx;
    height: 200rpx;
    border: 1px solid #ccc;
    border-radius: 8rpx;
}
</style>
