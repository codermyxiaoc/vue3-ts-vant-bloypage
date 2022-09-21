<template>
  <div class="profile">
    <van-nav-bar title="个人信息" left-text="返回" right-text="登入" left-arrow @click-left="onClickLeft"
      @click-right="onClickRight" />
    <van-image round width="6rem" height="6rem" class="pic" :src="userinfo.user_pic" />
    <div class="userinfo">
      <div>
        <span>签<i class="zj"></i>名</span>
        <span>{{ userinfo.per_sig }}</span>
      </div>
      <div>
        <span>昵<i class="zj"></i>称</span>
        <span>{{ userinfo.nickname }}</span>
      </div>
      <div>
        <span>手<i class="zj"></i>机</span>
        <span>{{ phone }}</span>
      </div>
      <div>
        <span>性<i class="zj"></i>别</span>
        <span>{{ userinfo.sex }}</span>
      </div>
      <div>
        <span>邮<i class="zj"></i>箱</span>
        <span>{{ userinfo.email }}</span>
      </div>
    </div>
    <span class="word" @click="router.push('/updata')">编辑信息</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted ,reactive ,computed} from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from '../../store/index'

interface newvalue {
  cell_phone: string,
  per_sig: string,
  nickname: string,
  sex: string,
  email: string,
  user_pic: string
}

export default defineComponent({
  name: 'ProfileVue',
  setup () {
    const store = useStore()
    const router = useRouter()
    const userinfo : newvalue = reactive({
      cell_phone: '',
      per_sig: '',
      nickname: '',
      sex: '',
      email: '',
      user_pic: ''
    })
    store.$subscribe((args, state) => {
      for (var key in state.userinfo) {
        userinfo[key] = state.userinfo[key]
      }
    })
    const onClickLeft = function ():void {
      router.go(-1)
    }
    const onClickRight = function ():void {
      router.push('/login')
    }
    onMounted(() => {
      /* if (localStorage.getItem('token')) {
        store.getuserinfo(localStorage.getItem('token') as string)
      } */
      for (var key in userinfo) {
        userinfo[key] = store.userinfo[key]
      }
    })
    const phone = computed((): string => {
      return userinfo.cell_phone ? userinfo.cell_phone.substring(0, 3) + '****' + userinfo.cell_phone.substr(userinfo.cell_phone.length - 3) : ''
    })
    return {
      onClickLeft,
      onClickRight,
      userinfo,
      phone,
      router
    }
  }
})
</script>

<style scoped>
.profile{
  width: 100%;
  height: 100vh;
}
.pic {
  position: relative;
  left: 50%;
  top: 10%;
  transform: translate(-50% , -50%);
}
.userinfo {
  position: absolute;
  top: 25%;
  left: 30px;
  right: 30px;
  height: 50px;
}
.userinfo div {
  display: flex;
  margin-top: 25px;
}
.userinfo div span {
  text-align: center;
  flex: 1;
}
.zj {
  display: inline-block;
  height: 1px;
  width: 20px;
}
.word {
  position: absolute;
  top: 70%;
  left: 50%;
  right: 50%;
  width: 64px;
  transform: translate(-50%,-50%);
}
</style>