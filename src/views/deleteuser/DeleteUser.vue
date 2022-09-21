<template>
  <div>
    <van-nav-bar title="注销用户" left-text="返回" left-arrow @click-left="onClickLeft" scroll-to-error="true" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { detuser } from '../../api/user'
import { Toast, Dialog } from 'vant'
import { useRouter } from 'vue-router'
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  setup () {
    const router = useRouter()
    const password = ref('')
    const onSubmit = function (values) {
      Dialog.confirm({
        message:
          '确认注销用户',
      })
        .then(async () => {
          const result = await detuser(values,localStorage.getItem('token'))
          if(result.data.status === 0) {
            Toast('注销成功')
          } else {
            Toast(result.data.message)
          }
          // on confirm
        })
        .catch(() => {
          Toast('取消注销')
        });
    }
    const onClickLeft = function () {
      router.go('-1')
    }
    return {
      password,
      onSubmit,
      onClickLeft
    }
  }
}
</script>

<style lang="scss" scoped>

</style>