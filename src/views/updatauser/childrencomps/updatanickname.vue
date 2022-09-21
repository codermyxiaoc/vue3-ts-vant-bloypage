<template>
  <div>
    <van-nav-bar title="修改昵称" left-text="返回" right-text="保存" left-arrow @click-left="onClickLeft"
      @click-right="onClickright" />
    <div class="text">
      <van-cell-group inset>
        <van-field v-model="nickname" style="font-size: 20px;" :placeholder="nickname" />
      </van-cell-group>
    </div>
    好听的名字会让别人更容易记住你
  </div>
</template>

<script lang="ts">
import { defineComponent, ref , onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../../../store/index'
import { Toast } from 'vant'
import { updatauser } from '../../../api/user'

interface newvalue {
  nickname: string
}
export default defineComponent({
  name: 'updatanicknameVue',
  setup () {
    const router = useRouter()
    const userinfo : newvalue = {
      nickname: ''
    } 
    const nickname = ref('')
    const store = useStore()
    const onClickLeft = () => {
      router.go(-1)
    }
    onMounted(() =>{
      for (var key in userinfo) {
        userinfo[key] = store.userinfo[key]
      }
      nickname.value = userinfo.nickname
    })
    const onClickright = async () => {
      if(nickname.value.trim() === '') {
        Toast('昵称不能为空')
      } else {
        const result = await updatauser({ nickname: nickname.value },localStorage.getItem('token') as string)
        if(result.data.status === 0) {
          if (localStorage.getItem('token')) {
            store.getuserinfo(localStorage.getItem('token') as string)
          }
          Toast('修改成功')
          router.push('/updata')
        } else {
          Toast(result.data.message)
        }
      }

    }
    return {
      onClickLeft,
      onClickright,
      nickname
    }
  }
})
</script>

<style scoped>
.text {
  margin-top: 30px;
  border-bottom:1px solid #eee ;
  
}
</style>