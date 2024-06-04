<template>
  <view class="image-container">
    <image :src="imageUrl" mode="aspectFit" class="full-image"></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ''
    };
  },
  onLoad(options) {
    if (options.imageUrl) {
      this.imageUrl = decodeURIComponent(options.imageUrl);
    }
  }
}
</script>

<style>
.image-container {
  width: 100%;
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
}
.full-image {
  width: 100%; 
  height: auto; 
}
</style>
