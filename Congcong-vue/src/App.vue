<template>
  <div id="app">

    <!-- 适配沉浸式app问题
    沉浸式布局会使navBar与顶部菜单栏互相重叠 -->

    <!-- web与原生交互
    1.自动登录的部分
      1.注册
      2.登录
      3.退出登录
    2.支付宝、微信支付 -->

    <!-- 在进入新页面的时候，原页面（首页）执行一个从屏幕中展示的位置，从右到左移动出屏幕的动画。
    同时新页面（商品列表）执行一个从屏幕右侧，从右到左移动到屏幕中的动画 -->
    <!-- 在后退页面的时候，原页面（商品列表）执行一个从屏幕中展示位置从左到右移动出屏幕的动画
    而新页面执行一个从左到右移动到屏幕中的动画 -->

    <!-- 页面过度效果实现逻辑:
    1.创建动画的Css
    2.判断当前是需要执行 跳转动画 还是 后退动画
      ①通过监听路由route的对象$route
      ②让页面在跳转的时候，携带包含跳转标记的params，通过对params中的跳转标记
      的判断来判断是否为跳转动画
      ③如果params包含跳转标记，那么表示为跳转动画 否则为 后退动画
    3. 通过transition的方式来为router-view对应的动画效果-->

    <!-- 页面跳转的滑动状态保存：
1.所有的组件中数据都会被保存下来
2.需要在组件中创建一个变量（会被 keep-alive 保存起来），通过这个页面来记录当前页面
  的保存距离。
3.当后退回该页面的时候，使用这个变量来改变当前页面的一个滑动距离
  ①应该在什么时机去改变当前页面的滑动距离？
  ②可以在组件的activated方法中（kepp-alive组件被激活时才会调用的）
   去指定页面滑动模块的滑动距离。
-->
    <transition :name="transitionName">
      <!-- 表示所有通过route-view加载的页面组件都会被缓存 -->
      <keep-alive :include="virtualTaskStack">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  // vue监听路由对象，决定使用哪种过渡效果
  watch: {
    '$route' (to, from) {
      // 获取携带的标记
      const routerType = to.params.routerType
      if (routerType === 'push') {
        // 当进入新页面的时候，保存新页面名称到虚拟机任务栈
        this.virtualTaskStack.push(to.name)
        // 跳转页面
        this.transitionName = 'fold-left'
      } else {
        // 当执行后退操作的时候，把最后一个页面从任务栈中弹出。
        this.virtualTaskStack.pop()
        // 后退页面
        this.transitionName = 'fold-right'
      }
      // if (to.params.clearTask) {
      //   // 初始化虚拟任务栈
      //   this.virtualTaskStack = '[immoc]'
      // }
    }
  },
  data: function () {
    return {
      transitionName: 'fold-left',
      // 虚拟任务栈
      virtualTaskStack: [
        'imooc'
      ]
    }
  },
  created: function () {
    // this.$store.commit('setIsIphoneX', window.isIphoneX)
    // 指定 Native主动调用的方法
    window.nativeFunctionUserLogin = this.nativeFunctionUserLogin
  },
  methods: {
    // 提供给native调用的方法，这个方法可接受当前自动登录的用户名。
    // 保存当前自动登录的用户名到vuex
    nativeFunctionUserLogin: function (username) {
      this.$store.commit('setUsername', username)
    }
  }
}
</script>

<style lang="scss">
@import "@css/style.scss";
#app {
  width: 100%;
  height: 100%;

  // push页面时，新页面的进入动画,向左进入屏幕
  .fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: 0.6s;
  }
  @keyframes fold-left-in {
    0% {
      transform: translate(100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  // push页面时，原页面的退出动画,向左退出屏幕
  .fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: 0.6s;
  }
  @keyframes fold-left-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }

  // 后退页面时，即将展示的页面动画,向右进入屏幕
  .fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: 0.6s;
  }
  @keyframes fold-right-in {
    0% {
      transform: translate(-100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  // 后退页面时，当前页面的页面动画,向右完全退出屏幕
  .fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: 0.6s;
  }
  @keyframes fold-right-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(100%, 0);
    }
  }
}
</style>
