<template>
  <div class="count-down">
    <span class="count-down-end-time">{{endHours}}点场</span>
    <span class="count-down-surplus"> {{surplus | filterTime}}</span>
  </div>
</template>

<script>
// 能力：传递给组件一个活动开始时间，组件根据这个时间去进行计算。
// 1、当前时间未到开始时间：展示倒计时
// 2、当前时间到了开始时间：展示活动进行中
// 3、当前时间超过了结束时间的时候，展示活动已结束
export default {
  props: {
    // 活动开始时间
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data: function () {
    return {
      // 展示活动状态
      surplus: '',
      // 距离活动开始时间的秒数
      diffSeconds: 0,
      interval: undefined
    }
  },
  created: function () {
    this.computedSurplusTime()
  },
  methods: {
    // 计算展示内容
    // 1、当前时间未到开始时间：展示倒计时
    // 2、当前时间到了开始时间：展示活动进行中
    // 3、当前时间超过了开始时间的时候，展示活动已结束

    computedSurplusTime: function () {
      // 如果当前的interval存在的话,把他清除。
      if (this.interval) {
        clearInterval(this.interval)
      }
      // 获取本地当前时间
      const date = new Date()
      // 3、当前时间超过了结束时间的时候，展示活动已结束
      if (date.getHours() > this.endHours) {
        this.surplus = '活动已结束'
        return
      }
      // 2、当前时间到了开始时间：展示活动进行中
      if (date.getHours() === this.endHours) {
        this.surplus = '活动进行中'
        return
      }
      // 1、当前时间未到开始时间：展示倒计时
      // 获取秒数差距，再根据秒数转化为对应的时分秒格式
      const diffHours = this.endHours - date.getHours() - 1
      const diffMinutes = 60 - date.getMinutes() - 1
      const diffSeconds = 60 - date.getSeconds()

      // 转化为对应的秒数
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds
      // 当前时间每过一秒，差距秒数-1
      this.interval = setInterval(() => {
        this.diffSeconds -= 1
      }, 1000)
    }
  },
  watch: {
    //   当diffSeconds值发生变化的时候，就会回调当前的方法
    // 根据秒数转化为对应的时：分：秒格式
    diffSeconds: function (newV) {
      // 差距秒数/3600，向下取整
      const hours = Math.floor(newV / 3600)
      // 差距秒数/60，向下取整，再取模
      const minutes = Math.floor(newV / 60) % 60
      // 差距秒数直接取模
      const seconds = newV % 60
      // 拼装数据
      this.surplus = hours + ':' + minutes + ':' + seconds
      // 如果差距秒数变为0，需要修改展示数据
      if (newV === 0) {
        this.computedSurplusTime()
      }
    },
    // 监听活动开始时间的变化
    endHours: function () {
      this.computedSurplusTime()
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.count-down {
  display: inline-block;
  font-size: $infoSize;
  margin-left: $marginSize;

  span {
    display: inline-block;
    padding: px2rem(2) px2rem(4);
  }
  &-end-time {
    background-color: $mainColor;
    border-top-left-radius: px2rem(4);
    border-bottom-left-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: white;
  }

  &-surplus {
    background-color: white;
    border-top-right-radius: px2rem(4);
    border-bottom-right-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: $mainColor;
  }
}
</style>
