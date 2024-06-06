<template>
    <view class="page">
        <view class="tabs flex v-center h-center">
            <view
                class="tab"
                v-for="tab in tabList"
                :class="{ active: tab.key === activeTab }"
                :key="tab.key"
                @click="switchTab(tab.key)">
                {{ tab.name }}
            </view>
        </view>
        <view class="content">
            <view v-if="activeTab === 'comprehensive'">
                <view class="comprehensive-container">
                    <view class="comprehensive-header flex v-center h-space-between">
                        <text class="comprehensive-title">综合指标</text>
                        <text class="comprehensive-grade">{{ overallGrade }}</text>
                    </view>
                    <view class="comprehensive-body">
                        <view class="comprehensive-item" v-for="(item, index) in comprehensiveList" :key="index">
                            <view class="bar-container">
                                <view class="bar" :style="{ height: item.value + '%' }"></view>
                            </view>
                            <view class="label">{{ item.label }}</view>
                        </view>
                    </view>
                    <view class="comprehensive-footer">
                        璞慧国蒙班共计23名幼儿，全部幼儿能力测评等级为：<text class="footer-grade">{{ overallGrade }}</text>
                    </view>
                </view>
            </view>
            <view v-else-if="activeTab === 'capability'">
                <!-- 能力测评的内容 -->
                <view>能力测评内容</view>
            </view>
            <view v-else-if="activeTab === 'status'">
                <view class="status-container">
                    <view class="status-item" v-for="child in childrenList" :key="child.id">
                        <image :src="child.avatar" class="status-avatar"></image>
                        <view class="status-name">{{ child.name }}</view>
                        <view class="status-score">综合评分</view>
                        <view class="status-grade">{{ child.grade }}</view>
                    </view>
                </view>
            </view>
            <view v-else-if="activeTab === 'myEvaluation'">
                <!-- 我的测评的内容 -->
                <view>我的测评内容</view>
            </view>
        </view>
        <myTabbar :current="2"></myTabbar>
    </view>
</template>

<script>
export default {
    data() {
        return {
            tabList: [
                { key: 'comprehensive', name: '综合指标' },
                { key: 'capability', name: '能力测评' },
                { key: 'status', name: '幼儿状态' },
                { key: 'myEvaluation', name: '我的测评' },
            ],
            activeTab: 'comprehensive',
            comprehensiveList: [
                { label: 'B1', value: 80 },
                { label: 'B1', value: 70 },
                { label: 'B1', value: 60 },
                { label: 'B1', value: 50 },
                { label: '未达标', value: 40 },
                { label: '未达标', value: 30 },
                { label: '未达标', value: 20 },
            ],
            overallGrade: 'A2',
            childrenList: [
                { id: 1, name: '赵子怡', avatar: 'https://example.com/avatar1.jpg', grade: '75分' },
                { id: 2, name: '赵子怡', avatar: 'https://example.com/avatar2.jpg', grade: '75分' },
                { id: 3, name: '赵子怡', avatar: 'https://example.com/avatar3.jpg', grade: '75分' },
            ]
        };
    },
    methods: {
        switchTab(key) {
            this.activeTab = key;
        }
    }
};
</script>

<style scoped lang="scss">
.page {
    background-color: #fff;
    min-height: 100vh;
}
.header {
    background-color: #42CB89;
    color: #fff;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 36rpx;
}
.tabs {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}
.tab {
    flex: 1;
    text-align: center;
    padding: 20rpx 0;
    font-size: 30rpx;
    color: #666;
}
.tab.active {
    color: #42CB89;
    font-weight: bold;
    border-bottom: 4rpx solid #42CB89;
}
.content {
    padding: 20rpx;
}
.comprehensive-container {
    background-color: #E0F7E4;
    padding: 20rpx;
    border-radius: 10rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}
.comprehensive-header {
    margin-bottom: 10rpx;
}
.comprehensive-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #42CB89;
}
.comprehensive-grade {
    font-size: 40rpx;
    font-weight: bold;
    color: #42CB89;
}
.comprehensive-body {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20rpx;
}
.comprehensive-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.bar-container {
    width: 60rpx;
    height: 200rpx;
    background-color: #fff;
    border-radius: 10rpx;
    border: 1rpx solid #ddd;
    display: flex;
    align-items: flex-end;
    margin-bottom: 10rpx;
}
.bar {
    width: 100%;
    background-color: #42CB89;
    border-radius: 10rpx;
}
.label {
    font-size: 28rpx;
    color: #666;
}
.comprehensive-footer {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    margin-top: 20rpx;
}
.footer-grade {
    color: #42CB89;
    font-weight: bold;
}
.status-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.status-item {
    width: 30%;
    background-color: #E8F5E9;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    text-align: center;
    padding: 20rpx 10rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}
.status-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-bottom: 10rpx;
}
.status-name {
    font-size: 30rpx;
    color: #333;
    margin-bottom: 10rpx;
}
.status-score {
    font-size: 24rpx;
    color: #666;
    margin-bottom: 5rpx;
}
.status-grade {
    font-size: 36rpx;
    color: #42CB89;
    font-weight: bold;
}
</style>
