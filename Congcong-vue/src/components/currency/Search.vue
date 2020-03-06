<template>
  <div
    :style="{backgroundColor:bgColor}"
    class="search"
  >
    <img
      class="search-icon"
      :src="icon"
    >
    <span
      :style="{color:hintColor}"
      class="search-hint"
    >blablablablabalbalabl</span>
  </div>
</template>

<script>
export default {
  props: {
    // 放大镜图片颜色 一开始为灰 后来白
    icon: {
      default: require('@imgs/search.svg'),
      type: String
    },
    // 文字颜色 一开始为灰 后来白
    hintColor: {
      default: '#999999',
      type: String
    },
    // 背景颜色 一开始为透明 后来灰
    bgColor: {
      default: '#ffffff',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.search {
  background-color: white;
  width: 100%;
  margin: px2rem(6);
  border-radius: px2rem(22);
  display: flex;
  align-items: center;

  &-icon {
    margin-left: $marginSize;
    width: px2rem(16);
  }

  &-hint {
    margin-left: $marginSize;
    font-size: $minInfoSize;
    color: $hintColor;
  }
}
</style>
