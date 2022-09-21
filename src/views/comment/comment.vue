<template>
  <van-nav-bar title="全部评论" left-text="返回" left-arrow @click-left="onClickLeft" />
  <scroll @scrollpos="scrollpos" class="scroll" ref="scrollcomp">
    <van-pull-refresh v-model="loading" @refresh="onRefresh" @change="change">
      <comment-show :artinfo="current_art" :cominfo="comment" v-if="comment !== []"></comment-show>
    </van-pull-refresh>
  </scroll>

  <div class="text">
    <van-search v-model="content" show-action left-icon="chat-o" shape="round" placeholder="分享你的趣事">
      <template #action>
        <div @click="onClickButton">发送</div>
      </template>
    </van-search>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getinpcom , addcom} from '../../api/atr'
import { Toast } from 'vant'
import CommentShow from '@/components/CommentShow/CommentShow.vue'
import Scroll from '../../components/scroll/Scroll.vue'
export default defineComponent({
  name: "commentVue",
  components: {
    CommentShow,
    Scroll
  },
  setup () {
    const ins = getCurrentInstance()
    const bus = ins?.appContext.config.globalProperties.$bus
    const route = useRoute ()
    const router = useRouter()
    const content = ref('')
    const loading = ref(true)
    const times: any = ref(null)
    const scrollcomp: any = ref(null)
    const current_art = reactive(JSON.parse(route.query.current_art as any))
    const comment: any[] = reactive([])
    const onClickLeft = () => {
      router.go(-1)
    }
    
    const getdata = async () => {
      const result = await getinpcom(route.query.comment_id as any)
      if (result.data.status === 0) {
        loading.value = false
        comment.splice(0,comment.length)
        comment.push(...result.data.message)
      }
    }
    const onClickButton = async () => {
      if (content.value.trim() !== '') {
        if (localStorage.getItem('token')) {
          const result = await addcom(content.value, current_art.comment_id, localStorage.getItem('token') as string)
          if (result.data.status === 0) {
            Toast('发布成功')
            content.value = ''
            getdata()
            scrollcomp.value.refresh()
          } else {
            Toast(result.data.message)
          }
        } else {
          Toast('请先登入在发布评论')
          router.push('/login')
        }
      } else {
        Toast('发布评论不能为空')
      }
    }
    const scrollpos = () => {

    }
    getdata()
    onMounted(() => {
      bus.on('delcom',() => {
        getdata()
      })
    }) 
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
    }
    return {
      onClickLeft,
      comment,
      content,
      onClickButton,
      current_art,
      scrollpos,
      loading,
      onRefresh,
      change,
      scrollcomp
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
.scroll {
  width: 100%;
  height: calc(100vh - 150px);
}
</style>