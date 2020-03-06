<template>
  <!-- 只是提供了一个空间，用来存放活动的一个内容，至于活动是什么样子的
  有几个gif，我不管。 -->
  <div class="activity">
    <!-- 插槽 展示活动内容 -->
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.activity {
  max-height: px2rem(160);
  position: relative;
}
</style>
