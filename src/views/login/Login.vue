<template>
  <div class="login">
    <van-nav-bar title="登入" left-text="返回" left-arrow @click-left="onClickLeft" scroll-to-error="true" />
    <van-form @submit="onSubmit" class="login_from" v-if="isShowlogin">
      <van-cell-group inset>
        <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登入
        </van-button>
        <span class="register">还没有账号，立即<router-link to="/register">注册</router-link></span>
        
      </div>
    </van-form>
    <div v-else>
      <div class="login_ok">
        <van-image round width="6rem" class="pic" height="6rem" :src="userinfo.user_pic" />
      </div>
      <div class="text">
        手机号:{{userinfo.cell_phone}}
        <h2 @click="exitlogin">退出登入</h2>
        <div>
          <span @click="router.push('/password')">修改密码</span>
          <i class="zj"></i>
          <span @click="router.push('/detuser')">注销账号</span>
        </div>
      </div>
    </div>
    <van-dialog />
    <span class="forgetpwd" @click="router.push('/forgetpwd')"  v-show="isShowlogin">忘记密码</span>
    <span class="phonelogin">
      <svg t="1664157347960" v-show="isShowlogin" @click="router.push('/phonelogin')" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2932"
        width="48" height="48">
        <path d="M512.1 512.4m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#BF67E8" p-id="2933"></path>
        <path
          d="M619.9 796.8H404.2c-23.8 0-43.3-19.5-43.3-43.3V271.2c0-23.8 19.5-43.3 43.3-43.3h215.7c23.8 0 43.3 19.5 43.3 43.3v482.3c0 23.9-19.5 43.3-43.3 43.3z"
          fill="#FFFFFF" p-id="2934"></path>
        <path
          d="M623.2 734H401c-7.7 0-13.9-6.2-13.9-13.9V304.7c0-7.7 6.2-13.9 13.9-13.9h222.2c7.7 0 13.9 6.2 13.9 13.9v415.4c0 7.7-6.2 13.9-13.9 13.9z"
          fill="#BF67E8" p-id="2935"></path>
        <path d="M512.1 765.8m-15.8 0a15.8 15.8 0 1 0 31.6 0 15.8 15.8 0 1 0-31.6 0Z" fill="#BF67E8" p-id="2936"></path>
        <path
          d="M550.2 474.4c1-0.5 1.4-1.7 0.9-2.7-1.4-3.3-5.7-9.5-17.3-9.5-15.8 0-21.6 5.7-21.6 5.7s-4.1-5.7-21.6-5.7-25.1 23.5-21.3 42.3c4.1 20.2 17.5 39.6 25.9 39.6s10.9-4.6 18-4.6 12.3 4.6 18.3 4.6 13.1-5.2 18-13.4c3.4-5.7 5.3-11.5 6.1-14.6 0.3-1.1-0.3-2.2-1.4-2.6-4.1-1.3-13.1-5.6-13.1-19.2 0.1-13.1 6.2-18.2 9.1-19.9zM532.4 435.2c1.6-0.3 3.1 1 3 2.6-0.3 3.8-1.4 10.3-5.6 15.1-4.2 4.8-10.5 6.8-14.2 7.6-1.6 0.3-3.1-1-3-2.6 0.3-3.8 1.4-10.3 5.6-15.1 4.2-4.9 10.5-6.8 14.2-7.6z"
          fill="#BF67E8" p-id="2937"></path>
        <path d="M522.8 263.5H473c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h49.8c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5z" fill="#BF67E8"
          p-id="2938"></path>
        <path d="M548.1 259.5m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0Z" fill="#BF67E8" p-id="2939"></path>
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { loginuser } from '../../api/user'
import { Toast,Dialog } from 'vant'
import { useStore } from '../../store/index'

interface newvalue {
  user_pic: string,
  cell_phone: string
}

export default defineComponent({
  name: 'LoginVue',
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  setup () {
    const router = useRouter()
    const username = ref('');
    const password = ref('');
    const store = useStore()
    let isShowlogin = ref<boolean>(true)
    const userinfo: newvalue = reactive({
      user_pic: '',
      cell_phone: ''
    })
    store.$subscribe((args,state) => {
      for (var key in userinfo) {
        userinfo[key] = state.userinfo[key]
      }
    })
    const onSubmit =  (values: any) => {
      new Promise((resolve: any) => {
        Toast.loading('登入中...');
        setTimeout(() => {
          Toast.clear();
          resolve()
        }, 1000);
      }).then(async () =>{
        const result = await loginuser(values)
        if (result.data.status === 0) {
          router.push('/home')
          localStorage.setItem('token', result.data.token)
          if (localStorage.getItem('token')) {
            store.getuserinfo(localStorage.getItem('token') as string)
          }
        }
        Toast(result.data.message)
      })
      
    };
    const onClickLeft = function (): void {
      router.go(-1)
    }
    onMounted(() => {
      isShowlogin.value = localStorage.getItem('token') ? false : true
      for (var key in userinfo) {
        userinfo[key] = store.userinfo[key]
      }
    })
    const exitlogin = function() {
      Dialog.confirm({
        title: '退出登入',
        message:
          '确定退出登入',
      })
        .then(() => {
          localStorage.removeItem('token')
          Toast('退出登入')
          store.userinfo = {}
          isShowlogin.value = true
        })
        .catch(() => {
          Toast('取消退出登入')
        });
      
    }
    
    return {
      onClickLeft,
      username,
      password,
      onSubmit,
      userinfo,
      isShowlogin,
      exitlogin,
      router
    }
  }
})
</script>

<style scoped>
.login_from {
  margin:130px auto;
}
.login {
  position: relative;
  height: 100vh;
  width: 100vw;
}
.register{
  display: inline-block;
  margin: 10px 25%;
}
.login_ok {
  margin-top: 130px;
}
.pic {
  position: relative;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -50%);
}
.text {
  text-align: center;
}
.zj {
  display: inline-block;
  width: 110px;
  height: 1px;
}
.forgetpwd {
  padding: 0 40vw;
}
.phonelogin {
  padding: 0 42vw;
}
</style>