<template>
  <div class='goods-detail'>
    <!-- navBar -->
    <navigation-bar
      :isShowBack="false"
      :navBarStyle="navBarStyle"
    >
      <!-- 左侧插槽 -->
      <template v-slot:nav-left>
        <div
          class="goods-detail-nav-left"
          @click="onBackClick"
        >
          <!-- 默认状态下黑色后退按钮 -->
          <img
            src="@imgs/back-2.svg"
            :style="{opacity: leftImgOpacity}"
          >
          <!-- 完全展示之后的白色后退按钮 -->
          <img
            src="@imgs/back-white.svg"
            :style="{opacity: navBarSlotOpcity}"
          >
        </div>
      </template>
      <!-- 中间插槽 -->
      <template v-slot:nav-center>
        <P
          class="goods-detail-nav-title"
          :style="{opacity: navBarSlotOpcity}"
        >商品详情
        </p>
      </template>
    </navigation-bar>
    <!-- 商品内容 -->
    <div class="goods-detail-content">
      <!-- 视差组件  传给父组件一个滑动的值-->
      <parallax @onScrollChange="onScrollChange">
        <!-- 缓慢移动区 swiper -->
        <template v-slot:parallax-slow>
          <my-swiper
            :height="SWIPER_IMAGE_HEIGHT + 'px'"
            :swiperImgs="goodsData.swiperImgs"
            :paginationType="'2'"
          ></my-swiper>
        </template>
        <!-- 正常移动区 剩余的内容-->
        <template>
          <!-- 商品描述 -->
          <div class="goods-detail-content-desc">
            <div class="goods-detail-content-desc-item">
              <!-- 商品价格和名称 -->
              <p class="goods-detail-content-desc-item-price">￥{{goodsData.price
           |priceValue }}</p>
              <p class="goods-detail-content-desc-item-name">
                <!-- 直营 -->
                <direct v-if="goodsData.isDirect"></direct>
                {{goodsData.name}}
              </p>
            </div>
            <div class="goods-detail-content-desc-item">
              <!-- 已选商品 -->
              <p class="goods-detail-content-desc-item-select">已选
                <span class="single-row-text">{{goodsData.name}}</span>
              </p>
              <!-- 附加服务 -->
              <div class="goods-detail-content-desc-item-support">
                <ul class="goods-detail-content-desc-item-support-list">
                  <li
                    class="goods-detail-content-desc-item-support-list-item"
                    v-for="(item,index) in attachDatas"
                    :key="index"
                  >
                    <img
                      src="@imgs/support.svg"
                      alt=""
                    >
                    <span>{{item}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 商品详情图片 -->
            <div class="goods-detail-content-desc-detail">
              <img
                v-for="(item,index) in goodsData.detailImgs"
                :src="item"
                :key="index"
              >
            </div>

          </div>
        </template>
      </parallax>

    </div>
    <!-- 加入购物车 与 立即购买-->
    <div class="goods-detail-buy">
      <div
        class="goods-detail-buy-add"
        @click="onAddGoodsClick"
      >加入购物车</div>
      <div
        class="goods-detail-buy-now"
        @click="onBuyClick"
      >立即购买</div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import MySwiper from '@c/swiper/MySwiper.vue'
import Direct from '@c/goods/Direct.vue'
import Parallax from '@c/parallax/Parallax.vue'
export default {
  name: 'goodsDetail',
  created: function () {
    this.loadGoodsData()
  },
  components: {
    NavigationBar,
    MySwiper,
    Direct,
    Parallax
  },
  data: function () {
    return {
      SWIPER_IMAGE_HEIGHT: 364,
      // 页面滑动锚点值
      ANCHOR_SCROLL_TOP: 310,
      // navBarStyle: {
      //   backgroundColor: '',
      //   position: 'fixed'
      // },
      goodsData: [],
      // 附加服务
      attachDatas: [
        '可配送海外',
        '葱葱发货&售后',
        '精准达',
        '211限时达',
        '可自提',
        '不可使用优惠券'
      ],
      // 页面当前已经滑动的值
      scrollValue: 0
    }
  },
  methods: {
    //   后退当前页面
    onBackClick: function () {
      this.$router.go(-1)
    },
    // 监听页面活动
    onScrollChange: function (scrollValue) {
      // 当前页面的滑动值
      this.scrollValue = scrollValue
    },
    // 根据商品id，从接口获取网页数据
    loadGoodsData: function () {
      this.$http.get('/goodsDetail', {
        params: {
          goodsId: this.$route.query.goodsId
        }
      }).then(data => {
        this.goodsData = data.goodsData
      })
    },
    // 立即购买按钮点击事件
    onBuyClick: function () {
      this.$router.push({
        name: 'Buy',
        params: {
          routerType: 'push'
        },
        query: {
          goodsId: this.goodsData.id
        }
      })
    },
    // 加入购物车按钮点击事件
    onAddGoodsClick: function () {
      // 保存商品到购物车数据中
      // 调用store里的方法要用commit
      this.$store.commit('addShoppingData', this.goodsData)
      alert('添加成功')
      this.$router.push({
        name: 'imooc',
        params: {
          routerType: 'push',
          // 自定义标记，在toolbar中定义的tab数据源数据的下标
          componentIndex: 1,
          // 自定义指令，通过这个来让系统跳转到Main.vue后直接初始化虚拟人物栈
          clearTask: true
        }
      })
    }
  },
  computed: {
    // 默认状态下左侧后退按钮的透明度
    leftImgOpacity: function () {
      return 1 - this.scrollValue / this.ANCHOR_SCROLL_TOP
    },
    // navBar的样式
    navBarStyle: function () {
      return {
        backgroundColor: 'rgba(216,30,6,' + this.navBarSlotOpcity + ')',
        position: 'fixed',
        top: 0
      }
    },
    // navBar插槽的透明度
    navBarSlotOpcity: function () {
      return this.scrollValue / this.ANCHOR_SCROLL_TOP
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.goods-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;

  &-nav-left {
    width: 100%;
    display: flex;
    //两个图片重合
    position: relative;
    img {
      position: absolute;
      align-self: center;
    }
  }
  &-nav-title {
    width: 100%;
    height: 100%;
    font-size: $titleSize;
    font-weight: bold;
    text-align: center;
    color: white;
  }

  &-content {
    overflow: hidden;
    // overflow-y: auto;
    height: 100%;

    &-desc {
      width: 100%;
      background-color: $bgColor;
      box-shadow: 0 0 px2rem(16) rgba(0, 0, 0, 0.2);

      &-item {
        background-color: $bgColor;
        padding: $marginSize;
        margin-bottom: $marginSize;
        // 价格
        &-price {
          font-size: px2rem(20);
          color: $mainColor;
          font-weight: 500;
        }
        // 名称
        &-name {
          margin-top: $marginSize;
          font-size: $titleSize;
          font-weight: 500;
          line-height: px2rem(20);
        }
        // 已选商品
        &-select {
          font-size: $infoSize;
          color: $hintColor;
          height: px2rem(14);
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          border-bottom: px2rem(1) solid $lineColor;
          padding: 0 0 px2rem(10) 0;
          span {
            color: $textColor;
            font-size: $titleSize;
            margin-left: px2rem(4);
          }
        }
        // 附加服务
        &-support {
          margin-top: $marginSize;

          &-list {
            display: flex;
            flex-wrap: wrap;

            &-item {
              display: flex;
              align-items: center;
              padding: px2rem(6) 0;
              margin-right: $marginSize;

              img {
                width: px2rem(12);
                margin-right: px2rem(4);
              }
              span {
                font-size: $minInfoSize;
                color: $hintColor;
              }
            }
          }
        }
      }
      // 商品描述
      &-detail {
        img {
          width: 100%;
        }
      }
    }
  }
  &-buy {
    background-color: white;
    border-top: px2rem(4) solid $lineColor;
    height: px2rem(46);
    line-height: px2rem(46);
    text-align: right;

    div {
      display: inline-block;
      width: px2rem(100);
      text-align: center;
      font-size: $infoSize;
      color: white;
    }

    &-add {
      padding: px2rem(4) 0 0 0;
      background-color: $mainColor;
    }
    &-now {
      padding: px2rem(4) 0 0 0;
      background-color: darkgoldenrod;
    }
  }
}
</style>
