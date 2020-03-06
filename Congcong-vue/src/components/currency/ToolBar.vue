<template>
  <div class="tool-bar">
    <!-- tab按钮，需要有一个数据源，通过这个数据源来去驱动视图 -->
    <div
      class='tool-bar-item'
      @click="onChangeFragment(item,index)"
      v-for="(item,index)
      in
      toolBarData"
      :key="index"
    >
      <!-- 当当前img标签的Index===选中tab的index的时候，就让img显示高亮图片 -->
      <img
        class='tool-bar-item-img'
        :src="[index===selectItemIndex? item.hIcon:item.nIcon]"
        alt=""
        srcset=""
      >
      <!-- 当当前img标签的Index===选中tab的index的时候，就让p显示高亮文字 -->
      <p
        class='tool-bar-item-name'
        :class="{'tool-bar-item-name-h': index==selectItemIndex}"
      >{{item.name}}</p>
    </div>

  </div>
</template>

<script>
// 永远位于页面的最底部
// 点击toolbar按钮的时候，页面发生对应的切换
// 按钮分为默认和选中两个状态
// -----------
// 能力和约束
// 1、不具备的能力（约束）
// 2、通过一个回调，告诉父组件，按钮的点击事件
// 3、当按钮被选中的时候，应该切换按钮的状态
export default {
  data: function () {
    return {
      // tab按钮数据源，vue、react、angular、等mvm框架，数据驱动视图
      toolBarData: [{
        // 默认状态下的图片
        nIcon: require('@imgs/home-n.svg'),
        // 高亮状态下的图片
        hIcon: require('@imgs/home-h.svg'),
        // 名称
        name: '首页',
        // 组件名称
        componentName: 'home'
      },
      {
        // 默认状态下的图片
        nIcon: require('@imgs/shopping-n.svg'),
        // 高亮状态下的图片
        hIcon: require('@imgs/shopping-h.svg'),
        // 名称
        name: '购物车',
        // 组件名称
        componentName: 'shopping'
      },
      {
        // 默认状态下的图片
        nIcon: require('@imgs/my-n.svg'),
        // 高亮状态下的图片
        hIcon: require('@imgs/my-h.svg'),
        // 名称
        name: '我的',
        // 组件名称
        componentName: 'my'
      }
      ],
      // 表示选中的tab按钮
      selectItemIndex: 0
    }
  },
  methods: {
    onChangeFragment: function (item, index) {
      this.selectItemIndex = index
      // 向父组件main.vue传参
      this.$emit('onChangeFragment', item.componentName)
    },
    // 指定切换的tab页
    pushFragment: function (index) {
      // 调用onChangeFragment切换对应的Tab
      this.onChangeFragment(this.toolBarData[index], index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.tool-bar {
  width: 100%;
  display: flex;
  height: px2rem(46);
  justify-content: space-around;
  background-color: white;
  box-shadow: 0 0 px2rem(16) 0 rgba(0, 0, 0, 0.2);
  border-top: 1px $lineColor;

  &-item {
    text-align: center;
    padding: px2rem(4) px2rem(12);
    display: flex;
    flex-direction: column;
    align-items: center;

    &-img {
      width: px2rem(22);
      height: px2rem(22);
    }

    &-name {
      font-size: $infoSize;
      margin-top: px2rem(2);

      &-h {
        color: $mainColor;
      }
    }
  }
}
</style>
