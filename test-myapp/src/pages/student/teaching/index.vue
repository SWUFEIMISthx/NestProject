<template>
    <view class="page">
        <view class="calendar-bar flex v-center">
            <view
                class="calendar-date flex-item-fill flex-item-keep-style flex flex-column v-center h-center"
                v-for="(item, idx) in calendarBarList" :key="idx" :class="{ 'today': item.isToday }">
                <view class="week">{{ item.week }}</view>
                <view class="date flex v-end h-center">{{ item.date }}</view>
            </view>
        </view>

        <view class="page-body">
            <view v-if="plans.length === 0" class="empty">
                <u-empty text="还没有计划哦~" mode="list">
                    <u-button type="success" color="#42CB89" :customStyle="{ borderRadius: '12rpx', marginTop: '24rpx', borderColor: '#42CB89' }" icon="plus" @click="navigateToAddPlan">添加计划</u-button>
                </u-empty>
                <view class="flex v-center h-center"></view>
            </view>
            <view v-else class="plan-list">
                <view class="plan-item" v-for="(plan, index) in plans" :key="plan.id">
                    <view class="plan-header">
                        <text class="plan-name">{{ plan.name }}</text>
                        <u-icon name="trash" size="22" color="#ff0000" @click="removePlan(index)"></u-icon>
                    </view>
                    <text class="plan-details">{{ plan.details }}</text>
                </view>
                <view class="add-more">
                    <u-button type="success" color="#42CB89" :customStyle="{ borderRadius: '12rpx', marginTop: '24rpx', borderColor: '#42CB89' }" icon="plus" @click="navigateToAddPlan">添加计划</u-button>
                </view>
            </view>
        </view>

        <myTabbar :current="1"></myTabbar>
    </view>
</template>

<script>
import PageHeader from '@/components/PageHeader/index.vue';
export default {
    components: { PageHeader },
    data() {
        return {
            calendarBarList: this.generateCalendarBarList(),
            today: new Date().getDate(),
            plans: []
        };
    },
    methods: {
        generateCalendarBarList() {
            const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            const today = new Date();
            const result = [];

            for (let i = -3; i <= 3; i++) {
                const date = new Date();
                date.setDate(today.getDate() + i);
                result.push({
                    week: days[date.getDay()],
                    date: date.getDate(),
                    isToday: date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
                });
            }

            return result;
        },
        navigateToAddPlan() {
            uni.navigateTo({
                url: '/pages/AddPlan/AddPlan'
            });
        },
        loadPlans() {
            this.plans = uni.getStorageSync('plans') || [];
        },
        removePlan(index) {
            this.plans.splice(index, 1);
            uni.setStorageSync('plans', this.plans);
        }
    },
    onShow() {
        this.calendarBarList = this.generateCalendarBarList();
        this.loadPlans();
    }
};
</script>

<style scoped lang="scss">
page {
	background-color: $page-color-base;
}
.calendar-bar{
	width: 100%;
	background: #eeeeee;
	padding: 24rpx;
	.calendar-date{
		&:first-child, &:last-child{
			.week{
				color: #cccccc;
			}
		}
		.date{
			height: 80rpx;
			font-size: 32rpx;
		}
		&.today {
			background-color: #42CB89;
			border-radius: 12rpx;
			.week, .date {
				color: #fff;
			}
		}
	}
}
.page-body {
    padding: 24rpx;
}
.plan-list {
    margin-top: 20rpx;
}
.plan-item {
    background: #fff;
    padding: 24rpx;
    border-radius: 12rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}
.plan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
}
.plan-name {
    font-size: 32rpx;
    font-weight: bold;
}
.plan-details {
    font-size: 28rpx;
    color: #666;
}
.add-more {
    display: flex;
    justify-content: center;
    margin-top: 20rpx;
}
.empty{
	padding-top: 200rpx;
}
</style>
