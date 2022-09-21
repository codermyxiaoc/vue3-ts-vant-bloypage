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
          提交
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
</style>