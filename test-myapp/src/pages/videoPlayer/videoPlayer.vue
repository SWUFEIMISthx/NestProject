<template>
  <view class="video-container">
    <video 
      class="video-player" 
      :src="videoUrl" 
      controls 
      autoplay 
      @error="handleError"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      videoUrl: ''
    };
  },
  onLoad(options) {
    // 接收页面参数并设置视频 URL
    this.videoUrl = decodeURIComponent(options.url);
  },
  methods: {
    handleError() {
      console.error('Failed to load the video');
    }
  }
}
</script>

<style scoped>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
}

.video-player {
  width: 100%;
  height: auto; /* Adjust height automatically based on aspect ratio */
}
</style>
