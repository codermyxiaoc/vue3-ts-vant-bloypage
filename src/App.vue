<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/profile">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from './store/index'
export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    const router = useRouter()
    const active = ref(0)
    const store = useStore()
    watch(() => router.currentRoute.value.path,(value) => {
      if (value === '/home') {
        active.value = 0
      } else if(value === '/profile') {
        active.value = 1
      }
    
    })
    onMounted(() => {
      if (localStorage.getItem('token')) {
        store.getuserinfo(localStorage.getItem('token') as string)
      }
    }) 
    return {
      active,
    }
  },
});
</script>

<style>
</style>
