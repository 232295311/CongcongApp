<template>
  <div class="register-page">
    <navigation-bar
      :pageName="'注册'"
      @onLeftClick="onBackClick"
    ></navigation-bar>
    <!-- 内容区 -->
    <div class="register-page-content">
      <!-- 用户名 -->
      <div class="input-container">
        <input
          v-model="username"
          type="text"
          placeholder="用户名"
        >
      </div>
      <!-- 密码 -->
      <div class="input-container">
        <input
          v-model="password"
          type="password"
          placeholder="密码"
        >
      </div>
      <!-- 确认密码 -->
      <div class="input-container">
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="确认密码"
        >
      </div>
      <div
        class="register-page-content-register page-commit"
        @click="onRegisterClick"
      >注册</div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar'
// import md5 from '@js/md5.min.js'
export default {
  name: 'register',
  components: {
    NavigationBar
  },
  data: function () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      md5Password: ''
    }
  },
  methods: {
    // 后退事件
    onBackClick: function () {
      this.$router.go(-1)
    },
    // 注册按钮点击事件
    onRegisterClick: function () {
      // 验证用户输入的合法性
      // 用户没有输入用户名或密码，或用户输入的密码与确认密码不同
      if (this.username.length === 0) {
        alert('请完善用户名')
        return
      }
      if (this.password.length === 0 || this.password !== this.confirmPassword) {
        alert('确认密码与原密码不一致')
        return
      }

      // 与原生交互，保存用户输入的用户名和密码
      // 对用户输入密码进行md5加密
      // this.md5Password = md5(this.password)

      // 判断当前项目是运行在Android设备还是ios设备？
      if (window.androidJSBridge) {
        // window下存在android诸如的对象 表示当前项目在安卓设备中运行
        this.onRegisterToAndroid()
      } else if (window.webkit) {
      }
    },
    // 调用android注册接口
    onRegisterToAndroid: function () {
      // json字符串
      let userJson = JSON.stringify({
        'username': this.username,
        'password': this.password
      })
      // 调用安卓的注册方法 接受它的bool返回值
      let result = window.androidJSBridge.register(userJson)
      // 对返回值进行处理
      this.onRegisterCallback(result)
    },
    // 调用IOS注册接口
    // onRegisterToIOS: function () {
    // },

    // 用来处理Native注册接口的返回值
    onRegisterCallback: function (result) {
      if (result) {
        alert('注册成功')
        this.onBackClick()
      } else {
        alert('注册失败，请重试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.register-page {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;

  &-content {
    width: 100%;
    height: 100%;

    &-register {
      margin-top: 32%;
    }
  }
}
</style>
