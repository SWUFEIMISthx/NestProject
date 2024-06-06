<template>
    <view class="page">
        <page-header title="添加计划" @back="goBack"></page-header>
        <view class="form">
            <view class="form-item">
                <text class="label">计划名称</text>
                <input class="input" type="text" v-model="planName" placeholder="请输入计划名称" />
            </view>
            <view class="form-item">
                <text class="label">计划详情</text>
                <textarea class="textarea" v-model="planDetails" placeholder="请输入计划详情"></textarea>
            </view>
            <view class="form-item">
                <u-button type="success" @click="addPlan">添加计划</u-button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            planName: '',
            planDetails: '',
            selectedDate: new Date(),
        };
    },
    onLoad(options) {
        if (options.date) {
            this.selectedDate = new Date(options.date);
        }
    },
    methods: {
        goBack() {
            uni.navigateBack();
        },
        addPlan() {
            if (this.planName && this.planDetails) {
                const plan = {
                    name: this.planName,
                    details: this.planDetails,
                    date: this.selectedDate.toISOString(),
                    id: Date.now()
                };
                let plans = uni.getStorageSync('plans') || [];
                plans.push(plan);
                uni.setStorageSync('plans', plans);
                uni.navigateBack();
            } else {
                uni.showToast({
                    title: '请填写完整的计划信息',
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
