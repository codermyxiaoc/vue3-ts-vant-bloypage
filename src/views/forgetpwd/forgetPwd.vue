<template>
  <div>
    <van-nav-bar title="忘记密码" left-text="返回" left-arrow @click-left="onClickLeft" scroll-to-error="true" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="Pwdone" type="password" name="Pwdone" label="新密码" placeholder="新密码"
          :rules="[{ pattern: passwordrule, required: true, message: '请填写密码' }]" />
        <van-field v-model="Pwdtow" type="password" name="Pwdtow" label="确认密码" placeholder="确认密码"
          :rules="[{ required: true, validator, message: '请填写确认密码' }]" />
        <van-field v-model="phone"  name="cell_phone" label="手机号" placeholder="输入手机号"
          :rules="[{ pattern: /^1[3456789]\d{9}$/, required: true, message: '输入手机号不合法' }]" />
        <van-field v-model="code" center clearable label="短信验证码" name="code" placeholder="请输入短信验证码"
          :rules="[{ pattern: /^[0-9]{4}$/, required: true, message: '请输入4位数验证码' }]">
          <template #button>
            <van-button size="small" type="primary" v-if="isshowtime" @click="changetime">发送验证码</van-button>
            <van-count-down :time="time" format="ss" @finish="onfinish" v-else/>
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
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { getforgetpowcode, getforgetpow } from '../../api/user'
export default defineComponent({
  setup () {
    const router = useRouter()
    const Pwdone = ref<string>()
    const Pwdtow = ref<string>()
    const phone = ref<string>()
    const code = ref<number>()
    const time = ref(60 * 1000)
    const isshowtime = ref<Boolean>(true)
    const passwordrule = /^[0-9A-Za-z]{6,20}$/ 
    const validator = () => Pwdone.value == Pwdtow.value
    const onClickLeft  = () => {
      router.go(-1)
    }
    const onSubmit = async (info:any) => {
      const result =  await getforgetpow(info)
      if(result.data.status === 0) {
        Toast(result.data.message)
        router.push('/login')
      } else {
        Toast(result.data.message)
      }     
    }
    const changetime = async () => {
      let reg = /^1[3456789]\d{9}$/;
      if (reg.exec(phone.value!) != null) { 
        isshowtime.value = false
        const result: any = await getforgetpowcode(phone.value!)
        if (result.data.status === 0) {
          Toast('已发送验证码短信')
        } else {
          Toast(result.data.message)
        }
      } else {
        Toast('输入的手机号不合法')
      }
   
    }
    const onfinish = () => {
      isshowtime.value = true
    }
    return {
      onClickLeft,
      onSubmit,
      Pwdone,
      Pwdtow,
      phone,
      code,
      passwordrule,
      validator,
      time,
      isshowtime,
      changetime,
      onfinish
    }
  }
})
</script>

<style scoped>

</style>