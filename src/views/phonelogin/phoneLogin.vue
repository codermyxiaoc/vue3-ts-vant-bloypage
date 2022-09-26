<template>
  <div>
    <van-nav-bar
      title="手机号登入"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      scroll-to-error="true"
    />
    <van-form @submit="onSubmit" class="phonelogin_from">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="cell_phone"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true,pattern: /^1[3456789]\d{9}$/ , message: '手机号不合法' }]"
        />
        <van-field
          v-model="code"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
          name="code"
          :rules="[{ pattern: /^[0-9]{4}$/, required: true, message: '请输入4位数验证码' }]"
        >
          <template #button>
            <van-button size="small" type="primary" @click="getcode" v-if="istime">发送验证码</van-button>
            <van-count-down v-else format="ss" @finish="onfinish" :time="time" />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 登入 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { Toast } from 'vant'
import { useStore } from '../../store/index'
import { getPhoneLoginCode, getPhoneLogin} from '../../api/user'
export default defineComponent({
  name: "phoneloginVue",
  setup() {
    const router = useRouter();
    const store = useStore()
    const phone = ref<string>("");
    const code = ref<number>()
    const time = ref( 60 * 1000);
    const istime = ref<Boolean>(true)
    const onClickLeft = () => {
      router.go(-1);
    };
    const onSubmit = async (info: any) => {
      const result = await getPhoneLogin(info)
      if(result.data.status === 0) {
        Toast(result.data.message)
        localStorage.setItem('token', result.data.token)
        if (localStorage.getItem('token')) {
          store.getuserinfo(localStorage.getItem('token') as string)
        }
        router.push('/home')
      } else {
        Toast(result.data.message)
      }
      
      
    };
    const getcode = async () => {
      let reg = /^1[3456789]\d{9}$/
      let execresult = reg.exec(phone.value)
      if (execresult !== null) {
        istime.value = false
        const result:any = await getPhoneLoginCode(phone.value)
        if(result.data.message == 'OK'  ) {
          Toast('已发送验证码短信')
        } else {
          Toast(result.data.message)
        }
      } else {
        Toast('手机号不合法')
      }
    }
    const onfinish =() => {
      istime.value = true
    }
    return {
      onClickLeft,
      onSubmit,
      phone,
      code,
      time,
      istime,
      getcode,
      onfinish
    };
  },
});
</script>

<style scoped>
.phonelogin_from {
  margin: 130px auto;
}
</style>
