<template>

  <!-- 如何在同一个组建中去展示不同的样式？
1.html表示整个布局的结构，具体的展示样式将由CSS决定
2.每种展示样式对应不同的css，也就是展示不同的类名class -->
  <!-- 垂直布局——goods-list
  网格布局--goods-grid
  瀑布流布局--goods-waterfall
3.实现不同的展示形式，实际上就是实现不同的css样式 -->

  <!-- 瀑布流布局 -->
  <!-- 创建商品列表的基本html和css，让item相对于goods（div）去进行排列 -->
  <!-- 2.生成不同高度的图片，撑起不同高度的item -->
  <!-- 3.计算item的位置，来达到从上到下，从左到右的一次排序 -->

  <!-- 商品排序：
  1.首先需要有排序之后的数据源。用来在html中展示，即替换掉this.datasource
  2.定义排序规则，（可以直接使用goodOptions中数据源的id来作为排序规则）
  3.定义排序的方法，根据排序规则来修改对应的排序。 -->
  <div
    class="goods"
    :class="layoutClass"
    :style="{height:goodsViewHeight}"
    ref="goods"
    @scroll="onScrollChange"
  >
    <div
      class="goods-item"
      :class="layoutItemClass"
      ref="goodsItem"
      v-for="(item,index) in sortGoodsData"
      :key="index"
      :style="goodsItemStyles[index]"
      @click="onItemClick(item)"
    >
      <!-- 图片 -->
      <img
        class="goods-item-img"
        :src="item.img"
        alt=""
        :style="imgStyles[index]"
      >
      <!-- 商品描述 -->
      <div class='goods-item-desc'>
        <!-- 是否是直营 -->
        <div
          class="text-line-2 goods-item-desc-name"
          :class="{'goods-item-desc-name-hint':!item.isHave}"
        >
          <p class='goods-item-desc-name-profile'>
            <Direct v-if="item.isDirect"></Direct>
            <!-- 是否有库存 -->
            <no-have v-if="!item.isHave"></no-have>
          </p>
          <!-- 商品名字 -->
          {{item.name}}
        </div>
        <!-- 其余描述 -->
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">￥{{item.price}}</p>
          <p class="goods-item-desc-data-volume">销量{{item.volume}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Direct from '@c/goods/Direct.vue'
import NoHave from '@c/goods/NoHave.vue'
export default {
  props: {
    // 父元素中制定的展示形式
    // 1--垂直布局，2--网格布局，3--瀑布布局
    layoutType: {
      type: String,
      default: '1'
    },
    // 是否允许goods单独滑动，默认允许它单独滑动
    isScroll: {
      type: Boolean,
      default: true
    },
    // 定义排序规则（依赖GoodsOpions数据源的id）
    // 1：默认
    // 1-2:价格由高到低
    // 1-3:销售由高到低
    // 2.有货优先
    // 3.直营优先
    sort: {
      type: String,
      default: '1'
    }
  },
  components: {
    Direct,
    NoHave
  },
  data: function () {
    return {
      // 数据源
      dataSource: [],
      // 排序数据源
      sortGoodsData: [],
      // 最大高度
      MAX_IMG_HEIGHT: 230,
      // 最小高度
      MIN_IMG_HEIGHT: 178,
      // 图片样式集合
      imgStyles: [],
      // item margin
      ITEM_MARGIN_SIZE: 8,
      // item 样式集合
      goodsItemStyles: [],
      // goods组件的高度
      goodsViewHeight: '100%',
      // 不同展示形式下的类名
      // 默认展示形式是垂直列表--goods-list &goods-list-item
      // 网格布局--goods-grid
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item',
      // 滑动距离
      scrollTopValue: 0
    }
  },
  created: function () {
    this.initData()
  },
  activated: function () {
    // 定位页面滑动位置
    this.$refs.goods.scrollTop = this.scrollTopValue
  },
  methods: {
    // 获取数据
    initData: function () {
      this.$http.get('/goods')
        .then(data => {
          this.dataSource = data.list
          // console.log(this.dataSource)
          // 数据排序
          this.setSortGoodsData()
          // 设置布局
          this.initLayout()
        })
    },
    // 商品排序
    setSortGoodsData: function () {
      switch (this.sort) {
        case '1':
          // 对整一个数组进行深拷贝，不改变原数组。默认情况
          this.sortGoodsData = this.dataSource.slice(0)
          break
        case '1-2':
          // 价格由高到低
          this.getSortGoodsDataFromKey('price')
          break
        case '1-3':
          // 销量从高到低
          this.getSortGoodsDataFromKey('volume')
          break
        case '2':
          // 有货优先排序
          this.getSortGoodsDataFromKey('isHave')
          break
        case '3':
          // 直营优先排序
          this.getSortGoodsDataFromKey('isDirect')
          break
      }
    },
    // 根据传入的key来进行排序
    getSortGoodsDataFromKey: function (key) {
      // sort可以完成数组的数据排序，当接收的值为负数的时候，表示good1排列在good2之前
      // 当接收的值为正数的时候，当接收的值为正数的时候，表示good1排列在good2之后。
      // 当接受的值为0的时候，表示排序不变。
      this.sortGoodsData.sort((good1, good2) => {
        // 根据传入的数据获取对应的value
        let v1 = good1[key]
        let v2 = good2[key]
        // 对value进行对比，
        // boolean类型的值（有货优先和直营优先），
        if (typeof v1 === 'boolean') {
          if (v1) {
            return -1
          }
          if (v2) {
            return 1
          }
          return 0
        }
        // float类型的值处理（价格、销量排序）
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1
        }
        return 1
      })
    },
    // 设置布局，为不同的 layoutType设定不同的展示形式
    // 1.初始化影响到布局的数据 goodsViewHeight goodsItemStyles imgStyles
    // 2.为不同的layoutType设置不同的展示类
    initLayout: function () {
      // 初始化
      this.goodsViewHeight = '100%'
      this.goodsItemStyles = []
      this.imgStyles = []

      switch (this.layoutType) {
        case '1':
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        case '2':
          this.layoutClass = 'goods-grid'
          this.layoutItemClass = 'goods-grid-item'
          break
        case '3':
          this.layoutClass = 'goods-waterfall'
          this.layoutItemClass = 'goods-waterfall-item'
          // 调用生成图片随机高度的方法
          this.initImgStyles()
          // 调用创建瀑布流的方法,等到dom创建完成之后才能调用
          this.$nextTick(() => {
            this.initWaterfall()
          })
          break
      }
    },
    // 返回随机的图片高度
    imgHeight: function () {
      //   Math.radom()->0-1随机数*高度区间+最低的图片高度
      let result = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT)
      return result
    },
    // 根据随机的图片高度，生成对应的图片样式数据
    initImgStyles: function () {
      this.dataSource.forEach(item => {
        // 随机生成的图片高度
        let imgHeight = this.imgHeight() + 'px'
        // 通过push，把图片高度Push到imgStyles集合里面
        this.imgStyles.push({
          height: imgHeight
        })
      })
    },
    // 瀑布流布局
    // 1.获取所有的Item元素
    // 2.遍历item元素，得到每一个item元素，加上一个margin高度
    // 3.创建两个变量 分别为leftHeightTotal，rightHeightTotal
    // 用他们来表示左右两侧目前距离顶部的距离
    // 通过对于左右两侧距离顶部的高度，来确定item的放置位置
    // 如果左侧小于等于右侧高度的话 leftHeightTotal<=rightHeightTotal
    // 那么item就应该放置到左侧，此时item距离左侧为0，距离顶部为当前的
    // leftHeightTotal的值 （用 css样式 top:)
    // 否则放到右侧，距离顶部为当前的rightHeightTotal的值
    // 4.保存计算出的item的所有样式，配置到item上
    // 5.item配置完成后，对比左右两侧最大的高度，把最大的高度放置到goods组件上
    initWaterfall: function () {
      // 1.获取所有的Item元素
      let $goodsItems = this.$refs.goodsItem
      if (!$goodsItems) return
      let leftHeightTotal = 0
      let rightHeightTotal = 0
      $goodsItems.forEach(($el, index) => {
        // item样式
        let goodsItemStyle = {}
        // 2.遍历item元素，得到每一个item元素，加上一个margin高度
        let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE
        // 对比左右两侧距离顶部的高度
        if (leftHeightTotal <= rightHeightTotal) {
          // 此时item距离左侧为0，距离顶部为当前的leftHeightTotal的值
          goodsItemStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          //   更新左侧距离顶部的高度
          leftHeightTotal += elHeight
        } else {
          // 否则放到右侧，距离顶部为当前的rightHeightTotal的值
          goodsItemStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }
          //   更新右侧距离顶部的高度
          rightHeightTotal += elHeight
        }
        //   4.保存计算出的item的所有样式，配置到item上
        this.goodsItemStyles.push(goodsItemStyle)
      })
      // 对比左右两侧最大的高度，把最大的高度放置到goods组件上
      if (!this.isScroll) {
        this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
      }
    },
    // 商品点击事件
    onItemClick: function (item) {
      // 商品无库存，不允许跳转
      if (!item.isHave) {
        alert('该商品无库存')
        return
      }
      this.$router.push({
        name: 'GoodsDetail',
        params: {
          routerType: 'push'
          // goods: item
        },
        query: {
          goodsId: item.id
        }
      })
    },
    onScrollChange: function ($event) {
      this.scrollTopValue = $event.target.scrollTop
    }
  },
  watch: {
    // 监听layoutType
    layoutType: function () {
      this.initLayout()
    },
    // 监听sort的改变
    sort: function () {
      this.setSortGoodsData()
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.goods {
  background-color: $bgColor;
  overflow: hidden;
  overflow-y: auto;
  &-item {
    background-color: white;
    padding: $marginSize;
    box-sizing: border-box;

    &-desc {
      width: 100%;

      &-name {
        font-size: $infoSize;
        line-height: px2rem(18);

        &-profile {
          display: flex;
          flex-direction: row;
        }

        &-hint {
          color: #999999;
        }
      }
      &-data {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: $marginSize;

        &-price {
          font-size: $titleSize;
          color: $priceColor;
          font-weight: 500;
        }
        &-volume {
          font-size: $infoSize;
          color: $hintColor;
        }
      }
    }
  }
}

//垂直列表
.goods-list {
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;

    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
    }

    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}

// 网格布局
.goods-grid {
  padding: $marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;

    .goods-item-img {
      width: 100%;
    }
  }
}
// 瀑布流样式
.goods-waterfall {
  position: relative;
  margin: $marginSize;

  &-item {
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;

    .goods-item-img {
      width: 100%;
    }
  }
}
</style>
