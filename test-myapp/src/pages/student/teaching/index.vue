<template>
	<view class="page">
		<view class="calendar-bar flex v-center">
			<view
				class="calendar-date flex-item-fill flex-item-keep-style flex flex-column v-center h-center"
				v-for="(item, idx) in calendarBarList" :key="idx">
				<view class="week">{{ item.week }}</view>
				<view class="date flex v-end h-center">{{ item.date }}</view>
			</view>
		</view>

		<view class="page-body">
			<view class="empty">
				<u-empty text="还没有计划哦~" mode="list">
					<u-button type="success" color="#42CB89" :customStyle="{ borderRadius: '12rpx', marginTop: '24rpx', borderColor: '#42CB89' }" icon="plus">添加计划</u-button>
				</u-empty>
				<view class="flex v-center h-center">
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
			calendarBarList: [
				{ week: '周日', date: '27' },
				{ week: '周一', date: '28' },
				{ week: '周二', date: '29' },
				{ week: '周三', date: '30' },
				{ week: '周四', date: '31' },
				{ week: '周五', date: '01' },
				{ week: '周六', date: '02' },
			]
		};
	},
	onShow() {
	},
	methods: {}
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
	}
}

.empty{
	padding-top: 200rpx;
}
</style>
