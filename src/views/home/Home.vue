<template>
  <div class="home">
    <div>

      <van-nav-bar title="主页" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <scroll @scrollpos="scrollpos" class="scroll" ref="scrollcomp">
      <van-pull-refresh v-model="loading" @refresh="onRefresh" @change="change">
        <article-show :artinfo="artinfo" v-if="artinfo != []"></article-show>
      </van-pull-refresh>
    </scroll>
    <div class="text">
      <van-search v-model="article" show-action left-icon="chat-o" shape="round" placeholder="分享你的趣事">
        <template #action>
          <div @click="onClickButton">发送</div>
        </template>
      </van-search>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
import ArticleShow from '@/components/articleshow/ArticleShow.vue';
import { useStore } from '../../store/index'
import { addart } from '../../api/atr'
import { Toast } from 'vant';
import Scroll from '../../components/scroll/Scroll.vue' 
/* interface newvalue {
  comment_id: number,
  content: string,
  createtime: string,
  nickname: string,
  user_id: number,
  user_pic: string
  {
      comment_id: 0,
      content: '',
      createtime: '',
      nickname: '',
      user_id: 0,
      user_pic: ''
    }
} */
export default defineComponent({
  name: 'HomeVue',
  components: {
    ArticleShow,
    Scroll, 
  },
  setup () {
    const ins = getCurrentInstance()
    const bus = ins?.appContext.config.globalProperties.$bus
    const router = useRouter()
    const article = ref('')
    const store = useStore()
    const artinfo : any[] = reactive([])
    const scrollcomp: any = ref(null)
    const loading = ref(true) 
    const times : any = ref(null)
    const onClickLeft = function (): void {
      router.go(-1)
    }
    const onClickButton = async () => {
      if (article.value.trim() !== '') {
        if (localStorage.getItem('token')) {
         const result = await addart(article.value, localStorage.getItem('token') as string)
          if (result.data.status === 0) {
            Toast('发布成功')
            article.value = ''
            getdata()
            scrollcomp.value.refresh()
          } else {
            Toast(result.data.message)
          }
        } else {
          Toast('请先登入在发布文章')
          router.push('/login')
        }
      } else {
        Toast('发布文章不能为空')
      }
    }
    const getdata = async () => {
      store.getatr()
    }
    store.$subscribe(() => {
      artinfo.splice(0, artinfo.length)
      artinfo.push(...store.artinfo)
    })
    onMounted(() => {
      scrollcomp.value.refresh()
      getdata()
      bus.on('delcom',() => {
        getdata()
      })
    })
    const scrollpos = () => {
      console.log();
    }
    const change = () => {
      if (times.value !== null) {
        clearTimeout(times.value)
      }
      times.value = setTimeout(() => {
        getdata()
      }, 1000);
    }
    const onRefresh = () => {
      scrollcomp.value.refresh()
      store.$onAction(({after}) => {
        after((code) => {
          if (code === 200) {
            loading.value = false
          } 
        }) 
      })
    }
      return {
      onClickLeft,
      onClickButton,
      article,
      artinfo,
      scrollpos,
      scrollcomp,
      loading,
      onRefresh,
      change
    }
  }
})
</script>

<style scoped>

.text {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 50px;
}
.scroll{
  width: 100%;
  height: calc(100vh - 150px);
}
</style>