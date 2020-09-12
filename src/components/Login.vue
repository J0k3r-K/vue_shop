<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 这是登录表单的数据绑定对象 */
      loginForm: {
        username: '',
        password: '',
      },
      /* 这是表单的验证规则对象 */
      loginFormRules: {
        /* 验证用户名是否合法 */
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 10,
            message: '用户名长度在3到10个字符之间',
            trigger: 'blur',
          },
        ],
        /* 验证密码是否合法  */
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 15,
            message: '密码长度在6到15个字符之间',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    /* 点击重置按钮，重置登录表单 */
    resetLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    /* 登录验证 */
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) {
          return this.$message.error('登录失败')
        } else {
          this.$message.success('登录成功！')
          console.log(res)
          /* 登录成功之后保持用户token信息（保存到客户端的sessionStorage中）
        项目中除了登陆之外的其他API接口，必须在登录之后才能访问
        token只在当前网站打开期间生效，所以将token保存再sessionStorage中 */
          window.sessionStorage.setItem('token', res.data.token)
          /* 通过编程式导航跳转到home页面 */
          this.$router.push('/home')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b3b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_box .avatar_box {
  height: 100px;
  width: 100px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login_box .avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
