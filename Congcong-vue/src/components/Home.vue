<template>
  <div
    class="home"
    @scroll="onScrollChange"
    ref="home"
  >
    <navigation-bar
      :isShowBack='false'
      :navBarStyle="navBarStyle"
    >
      <!-- 左侧插槽 -->
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon">
      </template>
      <!-- 中间插槽 -->
      <template v-slot:nav-center>
        <search
          :bgColor="navBarCurrentSlotStyle.search.bgColor"
          :hintColor="navBarCurrentSlotStyle.search.hintColor"
          :icon="navBarCurrentSlotStyle.search.icon"
        ></search>
      </template>
      <!-- 右侧插槽 -->
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon">
      </template>
    </navigation-bar>
    <div class="home-content">
      <!-- swiper -->
      <my-swiper
        :swiperImgs="swiperData.map(item=>item.icon)"
        :height="swiperHeight"
      ></my-swiper>
      <!-- 520活动 -->
      <activity class="activity-520">
        <img
          v-for="(item,index) in activityDatas"
          :key=index
          :src="item.icon"
          alt=""
        >
      </activity>
      <!-- 功能选项 -->
      <mode-options>
      </mode-options>
      <!-- 秒杀模块 -->
      <Seconds :dataSource="secondsDatas"></Seconds>
      <!-- 拼购节 -->
      <activity class="activity-pin-gou-jie">
        <img src="@imgs/pinGouJie.gif" />
      </activity>
      <!-- 商品列表 -->
      <goods
        :layoutType="'3'"
        :isScroll="false"
      ></goods>
    </div>
  </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue'
import Activity from '@c/currency/Activity.vue'
import ModeOptions from '@c/currency/ModeOptions.vue'
import Seconds from '@c/seconds/Seconds.vue'
import Goods from '@c/goods/Goods.vue'
import NavigationBar from '@c/currency/NavigationBar.vue'
import Search from '@c/currency/Search.vue'
export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search
  },
  data: function () {
    return {
      swiperData: [
      ],
      swiperHeight: '184px',
      activityDatas: [],
      secondsDatas: [],
      // navBar插槽的样式数据源，包含页面未开始滑动的时候插槽的样式和
      // 页面滑动到某定点后插槽的样式（高亮样式）
      navBarSlotStyle: {
        normal: {
          // 左侧插槽
          leftIcon: require('@imgs/more-white.svg'),
          // 中间插槽
          search: {
            bgColor: '#ffffff',
            hintColor: '#999999',
            icon: require('@imgs/search.svg')
          },
          // 右侧插槽
          rightIcon: require('@imgs/message-white.svg')
        },
        // 高亮样式
        highlight: {
          // 左侧插槽
          leftIcon: require('@imgs/more.svg'),
          // 中间插槽
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#ffffff',
            icon: require('@imgs/search-white.svg')
          },
          // 右侧插槽
          rightIcon: require('@imgs/message.svg')
        }
      },
      // 上面是数据源，这个是navBar当前使用的插槽样式
      navBarCurrentSlotStyle: {

      },
      // navBar的定制样式,让他恒制定，backgroundColor是会在后面函数里改变的
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      // 记录页面滚动值
      scrollTopValue: -1,
      // 记录锚点值
      ANCHOR_SCROLL_TOP: 160
    }
  },
  created: function () {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
    this.initData()
  },
  // keep-alive被激活的时候调用
  // 去为滑动模块指定滑动距离
  activated: function () {
    this.$refs.home.scrollTop = this.scrollTopValue
    console.log(this.$refs.home)
  },
  methods: {
    initData: function () {
      // this.$http.get('/swiper')
      //   .then(data => {
      //     this.swiperData = data.list
      //     //   console.log(data)
      //   }).catch(
      //     err => {
      //       console.log(err)
      //     })

      // this.$http.get('/activitys')
      //   .then(data => {
      //     this.activityDatas = data.list
      //     console.log(data)
      //   }).catch(
      //     err => {
      //       console.log(err)
      //     })
      // axios同时发送多个请求()并行
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys'),
        this.$http.get('/seconds')
      ]).then(this.$http.spread((swiperData, activityDatas, secondsDatas) => {
        this.swiperData = swiperData.list
        this.activityDatas = activityDatas.list
        this.secondsDatas = secondsDatas.list
        // console.log(this.secondsDatas)
      }
      ))
    },
    // 监听页面滚动
    // 1.获取页面滚动距离
    // 2.计算navBar背景颜色（透明度）opacity
    // 透明度=当前滚动距离/锚点值
    // 3.opacity>=1,则变为highlight状态下的样式
    // 否则为默认样式
    onScrollChange: function ($event) {
      // 1.获取页面滚动距离
      this.scrollTopValue = $event.target.scrollTop
      // 2.计算透明度
      let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
      // 3.根据透明度设置背景颜色
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight
      } else { this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal }

      this.navBarStyle.backgroundColor = 'rgba(255,255,255,' + opacity + ')'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.home {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  overflow: hidden;
  overflow-y: auto;
  &-content {
    height: 100%;

    .activity-520 {
      margin-top: px2rem(-8);
      // 上左上右加圆角边框
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);

      img {
        // 将元素行排列，且可以设置长宽
        display: inline-block;
        width: 33.33%;
      }
    }

    .activity-pin-gou-jie {
      background-color: white;
      margin-top: $marginSize;

      img {
        width: 100%;
      }
    }
  }
}
</style>
