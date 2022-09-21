<template>
  <div>
    <van-nav-bar title="编辑信息" left-text="返回" left-arrow @click-left="onClickLeft" scroll-to-error="true" />
    <div class="list">
      <span style="position:relative; top: 5px">头像</span>
      <span>
        <van-uploader :after-read="afterRead">
          <van-image class="img" round width="2.5rem" height="2.5rem" :src="userinfo.user_pic" />
          <van-icon name="arrow" />
        </van-uploader>
      </span>
    </div>
    <div class="list" @click="router.push('/nickname')">
      <span>昵称</span>
      <span>{{userinfo.nickname}}
        <van-icon name="arrow" />
      </span>
    </div>
    <div class="list" @click="router.push('/email')">
      <span>邮箱</span>
      <span>
        {{userinfo.email}}
        <van-icon name="arrow" />
      </span>
    </div>
    <div class="list" @click="showPopup">
      <span>性别</span>
      <span>
        {{userinfo.sex}}
        <van-icon name="arrow" />
      </span>
    </div>
    <div class="list" @click="router.push('/persig')">
      <span>签名</span>
      <span>
        {{userinfo.per_sig}}
        <van-icon name="arrow" />
      </span>
    </div>
    <van-popup class="popup" v-model:show="show" position="bottom" :style="{ height: '15.5%' }">
      <div @click="updatasex('男')">男</div>
      <div @click="updatasex('女')">女</div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Toast } from 'vant';
import { reactive , onMounted ,ref} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store/index';
import { updatauser, updatepic } from '../../api/user'

interface newvalue {
  per_sig: string,
  nickname: string,
  sex: string,
  email: string,
  user_pic: string
}
export default {
  setup () {
    const store = useStore()
    const router  = useRouter()
    const show = ref(false);
    const userinfo : newvalue = reactive({
      per_sig: '',
      nickname: '',
      sex: '',
      email: '',
      user_pic: ''
    })
    const onClickLeft = function () {
      router.go(-1)
    }
    store.$subscribe((args, state) => {
      for (var key in userinfo) {
        userinfo[key] = state.userinfo[key]
      }
    })
    const showPopup = () => {
      show.value = true;
    }
    const updatasex = async (sex: string) => {
      const result = await updatauser({ sex },localStorage.getItem('token') as string)
      if(result.data.status === 0) {
        Toast("修改成功")
        if (localStorage.getItem('token')) {
          store.getuserinfo(localStorage.getItem('token') as string)
        }
      } else {
        Toast(result.data.message)
      }
      show.value = false;
    }
    const afterRead = async (file: any) => {
      const fromdata = new FormData()
      fromdata.append('avatar', file.file)
      const result = await updatepic(localStorage.getItem('token') as string, fromdata) 
      if(result.data.status === 0) {
        Toast('修改成功')
        if (localStorage.getItem('token')) {
          store.getuserinfo(localStorage.getItem('token') as string)
        } else {
          Toast(result.data.message)
        }
      }
    };
    onMounted(() => {
      for (var key in userinfo) {
        userinfo[key] = store.userinfo[key]
      }
    })
    return {
      onClickLeft,
      userinfo,
      show,
      showPopup,
      updatasex,
      router,
      afterRead
    }

  }
}
</script>

<style lang="css" scoped>

.list{ 
  text-align: center;
  width: 90%;
  line-height: 50px;
  position: relative;
  border-bottom:1px solid #eee;
  top: 30px;
  left: 50%;
  right: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.list .img {
  position: relative;
  top: 10px;
  right: 15px;
}
.popup div {
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
</style>