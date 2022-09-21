<template>
  <div>
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit" class="login_from">
      <van-cell-group inset>
        <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
          :rules="[{ pattern: passwordrule, required: true, message: '请输密码不合法' }]" />
        <van-field v-model="phone" name="cell_phone" label="手机号" placeholder="手机号"
          :rules="[{ pattern: /^1[3456789]\d{9}$/, required: true, message: '输入手机号不合法' }]" />
        <van-field v-model="code" name="code" label="验证码" placeholder="请输入短信验证码" center clearable
          :rules="[{ pattern: /^[0-9]{4}$/, required: true, message: '请输验证码不合法' }]">
          <template #button>
            <van-button size="small" type="primary" v-if="istime" @click="getpagecode" >发送验证码</van-button>
            <van-count-down :time="time" format="ss" @finish="onfinish" v-else />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createuser, getcode } from '../../api/user'
import { Toast } from 'vant'
export default defineComponent({
  name: 'ReginsterVue',
  setup () {

    const router = useRouter()
    const onClickLeft = function (): void {
      router.go(-1)
    }
    const username = ref('');
    const password = ref('');
    const phone = ref('');
    const code = ref();
    const istime = ref(true)
    const time = ref(60 * 1000);
    const passwordrule = /^[0-9A-Za-z]{6,20}$/ 
    const  onSubmit =  (values: any) => {
      console.log(values);
      new Promise((resolve : any) => {
        Toast.loading('注册中')
        setTimeout(async () => {
          resolve()
          Toast.clear();
          const result = await createuser(values)
          if (result.data.status === 0) {
            router.push('/login')
          }
          Toast(result.data.message)
        }, 1000);
      })
    };
    const getpagecode = async () => {
      let reg = /^1[3456789]\d{9}$/;
      if (reg.exec(phone.value) != null) {
        istime.value = false
        const result = await getcode(phone.value)
        if (result.data.status === 0) {
          Toast('已发送验证码短信')
        } else {
          Toast(result.data.message)
        }
      } else {
        Toast('手机号不合法');
      }
    }
    const onfinish = () => {
      istime.value = true
    }
    
    return {
      onClickLeft,
      username,
      password,
      passwordrule,
      phone,
      code,
      onSubmit,
      time,
      istime,
      onfinish,
      getpagecode
    }
  }
})
</script>

<style scoped>
.login_from {
  margin: 130px auto;
}
</style>