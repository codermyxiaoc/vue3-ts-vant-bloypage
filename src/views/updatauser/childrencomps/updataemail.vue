<template>
  <div>
    <van-nav-bar title="修改昵称" left-text="返回" right-text="保存" left-arrow @click-left="onClickLeft"
      @click-right="onClickright" />
    <div class="text">
      <van-cell-group inset>
        <van-field v-model="email" style="font-size: 20px;" :placeholder="email" />
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref , onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../../../store/index'
import { Toast } from 'vant'
import { updatauser } from '../../../api/user'

interface newvalue {
  email: string
}
export default defineComponent({
  name: 'updataemailVue',
  setup () {
    const router = useRouter()
    const userinfo : newvalue = {
      email: ''
    } 
    const email = ref('')
    const store = useStore()
    const onClickLeft = () => {
      router.go(-1)
    }
    onMounted(() =>{
      for (var key in userinfo) {
        userinfo[key] = store.userinfo[key]
      }
      email.value = userinfo.email
    })
    const onClickright = async () => {
      if (email.value.trim() === '') {
        Toast('邮箱不能为空')
      } else {
        const result = await updatauser({ email: email.value },localStorage.getItem('token') as string)
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
      email
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