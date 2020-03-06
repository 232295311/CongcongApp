<template>
  <!-- 视差效果让多层背景以不同的速度去进行移动.
  1.至少拥有两层背景（缓慢移动区，正常移动区）
  2.将背景设置为相对布局（为缓慢移动区设置Top来缓冲掉scroll滚动
  3.监听parallax组件的滑动，根据滑动来计算 缓慢移动区top 的值 -->
  <div
    class="parallax"
    @scroll="onScrollChange"
  >
    <!-- 缓慢移动区 -->
    <div
      class="parallax-slow"
      :style="{top:slowTop}"
    >
      <slot name="parallax-slow"></slot>
    </div>
    <!-- 正常移动区 -->
    <div class="parallax-content z-index-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      // 固定的速度差(正常移动区移动100px,缓慢移动区100/2=50px)
      SPEED_DIFF: 2,
      // 页面滑动值
      parallaxScroll: 0
    }
  },
  methods: {
    // 监听组件滑动
    onScrollChange: function ($event) {
      this.parallaxScroll = $event.target.scrollTop
      console.log(this.parallaxScroll)
      this.$emit('onScrollChange', this.parallaxScroll)
    }
  },
  computed: {
    //   返回slow距离顶部的距离
    slowTop: function () {
      // 当前页面的滑动距离/固定的速度差=缓慢移动区应该滑动的距离
      // 当前页面滑动距离-缓慢移动区应该滑动的距离
      //   =缓慢移动区来缓冲掉scroll的值
      return (this.parallaxScroll - (this.parallaxScroll / this.SPEED_DIFF)) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.parallax {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;

  &-slow {
    width: 100%;
    position: relative;
  }

  &-content {
    width: 100%;
    position: relative;
  }
}
</style>
