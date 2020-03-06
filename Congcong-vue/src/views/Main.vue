<template>
  <!-- 在vue这种单页面的应用程序中，他只存在一个页面————app.vue，其他的都是组件 -->
  <div class="main">
    <keep-alive>
      <!-- 动态组件 -->
      <component :is="currentcomponentId"></component>
    </keep-alive>
    <tool-bar
      ref="toolBar"
      @onChangeFragment="onChangeFragment"
    ></tool-bar>
  </div>
</template>

<script>
import toolBar from '@c/currency/ToolBar.vue'
export default {
  name: 'imooc',
  components: {
    'tool-bar': toolBar,
    // 异步组件引入方式，异步组件：只有在需要去展示这个组件的时候才会把组件去进行渲染
    'home': () => import('@c/Home.vue'),
    'shopping': () => import('@c/Shopping.vue'),
    'my': () => import('@c/My.vue')
  },
  activated: function () {
    // 在keepAlive 被激活的时候，调用指定加载页面组件的方法
    this.pushFragment()
  },
  methods: {
    // 组件切换
    onChangeFragment: function (componentName) {
      this.currentcomponentId = componentName
    },
    // 指定加载的页面组件
    pushFragment: function () {
      // 获取到组件加载的下标
      var componentIndex = this.$route.params.componentIndex
      // 如果没有下标的话，直接让方法return
      if (componentIndex === undefined) return
      // 通过toolBar来切换对应的组件 直接调用子组件里的方法
      this.$refs.toolBar.pushFragment(componentIndex)
    }
  },
  data: function () {
    return {
      currentcomponentId: 'home'
    }
  }
}
</script>

<style class="scss" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
