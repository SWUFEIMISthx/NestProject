<template>
	<u-tabbar
		:value="current"
		@change="change"
		:fixed="true"
		:placeholder="true"
		:safeAreaInsetBottom="true"
		active-color="green">
		<u-tabbar-item v-for="(item, index) in list" :key="index" :text="item.text" :icon="item.icon" @click="routerTo(item)" ></u-tabbar-item>
	</u-tabbar>
</template>
<script>
  import mConstDataConfig from "@/config/constData.config";
	export default {
    props: ['current'],
		data() {
			return {
				list: mConstDataConfig.tabbarList.student,
			};
		},
    created() {

    },
		onShow() {

		},
		methods: {
      change() {

      },
      routerTo(item) {
        uni.switchTab({
          url: item.pagePath
        })
      }
    }
	};
</script>
