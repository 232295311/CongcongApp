<template>
  <!-- 1.需要一个swiper组件
2.swiper里面的滑动模块——swiperSlide
3.分页器配置：插槽slot来配置分页器 -->
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide
        v-for="(item,index) in swiperImgs"
        :key="index"
      >
        <img
          class="swiper-slide-img"
          :style="{height:height}"
          :src="item"
          alt=""
          srcset=""
        >
      </swiper-slide>
      <template v-slot:pagination>
        <div class="swiper-pagination">

        </div>
      </template>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    // slide高度
    height: {
      type: String,
      default: 'auto'
    },
    // 数据源
    swiperImgs: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    // 1.原点切换 分页器
    // 2.数字类型 分页器
    paginationType: {
      type: String,
      default: '1'
    }
  },
  components: {
    'swiper': swiper,
    'swiper-slide': swiperSlide
  },
  data: function () {
    return {
      swiperOptions: {
        // 我们希望是自动滚动的
        autoplay: true,
        // 希望swiper高度跟随slide高度变化
        autoHeight: true,
        // 分页器设置效果
        pagination: {
          // 分页器对应的html元素
          el: '.swiper-pagination',
          // 分页器的样式
          type: 'bullets',
          // 分页器内元素，添加类名
          bulletClass: 'custom-bullet-class'
        }
      }
    }
  },
  methods: {
    // 根据分页器类型配置对应的分页器
    initPaginationLayout: function () {
      switch (this.paginationType) {
        // 原点分页器
        case '1':
          this.swiperOptions.pagination = {
            // 分页器对应的html元素
            el: '.swiper-pagination',
            // 分页器的样式
            type: 'bullets',
            // 分页器内元素，添加类名
            bulletClass: 'custom-bullet-class'
          }
          break
        case '2':
          this.swiperOptions.pagination = {
            // 分页器对应的html元素
            el: '.swiper-pagination',
            // 分页器的样式
            type: 'fraction',
            // 分页器内元素，添加类名
            bulletClass: 'custom-fraction-class'
          }
          break
      }
    }
  },
  created: function () {
    this.initPaginationLayout()
  }
}
</script>

<style lang="scss">
@import "@css/style.scss";
//圆点分页器
.swiper-pagination {
  //   bottom: px2rem(80);
  .custom-bullet-class {
    box-sizing: border-box;
    border-radius: 100%;
    height: px2rem(6);
    width: px2rem(6);
    border: px2rem(1) solid #fff;
    margin: 0 px2rem(4);
    display: inline-block;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: white;
  }
}

.swiper-slide-img {
  width: 100%;
}
//数字分页器
.swiper-pagination-fraction {
  left: auto;
  right: 0;
  width: auto;
  font-size: $infoSize;
  background-color: rgba(0, 0, 0, 0.3);
  padding: px2rem(6) px2rem(18);
  border-top-left-radius: px2rem(16);
  border-bottom-left-radius: px2rem(16);
  bottom: px2rem(32);
  color: white;

  .swper-pagination-current {
    font-size: $titleSize;
    font-weight: bold;
  }
}
</style>
