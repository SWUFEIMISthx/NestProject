<template>
    <view class="page">
        <view class="calendar-bar flex v-center">
            <view
                class="calendar-date flex-item-fill flex-item-keep-style flex flex-column v-center h-center"
                v-for="(item, idx) in calendarBarList" :key="idx" @click="selectDate(item)">
                <view class="week" :class="{ active: item.date === selectedDate.getDate() }">{{ item.week }}</view>
                <view class="date flex v-end h-center" :class="{ active: item.date === selectedDate.getDate() }">{{ item.date }}</view>
            </view>
        </view>

        <view class="page-body">
            <view v-if="filteredPlans.length === 0" class="empty">
                <u-empty text="还没有计划哦~" mode="list">
                    <u-button type="success" color="#42CB89" :customStyle="{ borderRadius: '12rpx', marginTop: '24rpx', borderColor: '#42CB89' }" icon="plus" @click="addPlan">添加计划</u-button>
                </u-empty>
            </view>
            <view v-else class="plans-list">
                <view v-for="(plan, idx) in filteredPlans" :key="idx" class="plan-item">
                    <view class="plan-title">{{ plan.name }}</view>
                    <view class="plan-details">{{ plan.details }}</view>
                    <u-icon name="trash" size="20" color="#ff0000" @click="deletePlan(idx)"></u-icon>
                </view>
                <view class="add-button">
                    <u-button type="success" @click="addPlan">添加计划</u-button>
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
            calendarBarList: [],
            plans: [],
            selectedDate: new Date(),
        };
    },
    computed: {
        filteredPlans() {
            return this.plans.filter(plan => {
                const planDate = new Date(plan.date);
                return planDate.toDateString() === this.selectedDate.toDateString();
            });
        }
    },
    created() {
        this.generateCalendar();
        this.loadPlans();
    },
    methods: {
        generateCalendar() {
            const today = new Date();
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const calendar = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(startOfWeek);
                date.setDate(date.getDate() + i);
                calendar.push({
                    week: this.getWeekDay(i),
                    date: date.getDate()
                });
            }
            this.calendarBarList = calendar;
        },
        getWeekDay(day) {
            const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            return weeks[day];
        },
        selectDate(item) {
            const today = new Date();
            const selected = new Date(today.getFullYear(), today.getMonth(), item.date);
            this.selectedDate = selected;
        },
        loadPlans() {
            this.plans = uni.getStorageSync('plans') || [];
        },
        addPlan() {
            uni.navigateTo({
                url: `/pages/AddPlan/AddPlan?date=${this.selectedDate.toISOString()}`
            });
        },
        deletePlan(index) {
            this.plans.splice(index, 1);
            uni.setStorageSync('plans', this.plans);
        }
    },
    onShow() {
        this.loadPlans();
    }
};
</script>

<style scoped lang="scss">
.page {
    background-color: $page-color-base;
}
.calendar-bar {
    width: 100%;
    background: #eeeeee;
    padding: 24rpx;
    .calendar-date {
        &:first-child, &:last-child {
            .week {
                color: #cccccc;
            }
        }
        .date {
            height: 80rpx;
            font-size: 32rpx;
        }
        .week.active, .date.active {
            color: #42CB89;
            font-weight: bold;
        }
    }
}
.page-body {
    padding: 20rpx;
}
.empty {
    padding-top: 200rpx;
}
.plans-list {
    margin-top: 20rpx;
}
.plan-item {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
    margin-bottom: 10rpx;
    background: #f5f5f5;
    border-radius: 8rpx;
    position: relative;
}
.plan-title {
    font-size: 36rpx;
    font-weight: bold;
}
.plan-details {
    font-size: 28rpx;
    color: #999;
    margin-top: 10rpx;
}
u-icon {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
}
.add-button {
    margin-top: 20rpx;
    text-align: center;
}
</style>
