<template>
  <!-- 缺货标签 -->
  <div>
    <span class="goods-item-name-nohave">缺货</span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.goods-item-name-nohave {
  padding: 0 pa2rem(4);
  font-size: $minInfoSize;
  color: white;
  background-color: #999999;
  border-radius: px2rem(2);
  margin-top: px2rem(2);
}
</style>
