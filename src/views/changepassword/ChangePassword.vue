<template>
  <div>
    <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="onClickLeft" scroll-to-error="true" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="oldPwd" type="password" name="oldPwd" label="旧密码" placeholder="旧密码"
          :rules="[{ required: true, message: '请填写旧密码' }]" />
        <van-field v-model="newPwd" type="password" name="newPwd" label="新密码" placeholder="新密码"
          :rules="[{ pattern: /^[0-9A-Za-z]{8,20}$/,required: true, message: '输入密码不合法' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-dialog />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { changepassword } from '../../api/user'
import { Toast,Dialog } from 'vant'
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  setup () {
    const router = useRouter()
    const oldPwd = ref('')
    const newPwd = ref('')
  
    const onClickLeft = function() {
      router.go(-1)
    }
    const onSubmit = function(values) {
      Dialog.confirm({
        message:
          '确定修改密码',
      })
        .then(async () => {
          const result = await changepassword(values, localStorage.getItem('token'))
          if (result.data.status === 0) {
            router.push('/login')
            localStorage.removeItem('token')
            Toast('修改成功')
          } else {
            Toast(result.data.message)
          }
        })
        .catch(() => {
          Toast('取消修改')
        });
      
     
    }
    return {
      onClickLeft,
      oldPwd,
      newPwd,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped>

</style>