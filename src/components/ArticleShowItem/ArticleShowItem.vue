<template>
  <div class="article">
    <van-row>
      <van-col span="4">
        <div>
          <van-image round width="3rem" height="3rem" :src="artitem.user_pic" />
        </div>
      </van-col>
      <van-col span="20">
        <div class="name">
          <span class="word">{{artitem.nickname}}</span>
          <br />
          <span style="font-size: 10px;">{{timefilt}}</span>
        </div>
        <div class="context">
          {{ content }}
        </div>
      </van-col>
    </van-row>
    <div class="function">
      <van-row>
        <van-col span="4"></van-col>
        <van-col span="20">
          <span @click="isallart" style="color:blue;" v-if="isshow">
            参看全部
            <van-icon name="arrow" v-if="show" />
            <van-icon name="arrow-down" v-else />
          </span>
          <span class="reply" @click="gocomment">
            {{ reqlength }}回复
            <van-icon name="arrow" />
          </span>
          <span class="allfunc">
            <van-icon name="ellipsis" size="20" @click="popupshow = true" />
          </span>
        </van-col>
      </van-row>
    </div>
    <teleport to="body">
      <van-popup v-model:show="popupshow" :round="true" class="popup" position="bottom"
        :style="isdelorwarn ? { height: '27.1%' } : { height: '33.3%' }">
        <div style="margin-top: 10px; line-height: none!important;" class="divnone">
          <span style="font-size: 12px">{{artitem.nickname}}</span> <br>
          <span style="font-size: 9px">{{ content }}</span>
        </div>
        <div style="font-size: 14px">
          <van-icon name="comment-o" color="#13b2ea" size="20" />
          <i class="zj"></i>
          复制
        </div>

        <div style="font-size: 14px" @click="isshare">
          <van-icon name="share-o" color="#13b2ea" size="20" />
          <i class="zj"></i>
          分享
        </div>
        <div style="font-size: 14px" @click="isshare" v-show="!isdelorwarn">
          <van-icon name="manager-o" color="#13b2ea" size="20" />
          <i class="zj"></i>
          关注
        </div>
        <div style="font-size: 14px" v-if="!isdelorwarn">
          <van-icon name="warn-o" color="#13b2ea" size="20" />
          <i class="zj"></i>
          举报
        </div>
        <div style="font-size: 14px" @click="deleteart" v-else>
          <van-icon name="delete-o" color="#13b2ea" size="20" />
          <i class="zj"></i>
          删除
        </div>
      </van-popup>
      <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" />
      <van-dialog />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent , ref , computed, PropType ,reactive,onMounted } from 'vue'
import { Dialog, Notify } from 'vant'
import { detart } from '../../api/atr'
import { useStore } from '../../store/index'
import { useRouter,useRoute } from 'vue-router'
import { Book } from '@/interface/Book'
/* interface Book {
  artitem: object,
  createtime: string,
  content: string,
  nickname: string,
  user_pic: string,
  comment_id: number,
  rep: any[],
  user_id: number
} */
interface newvalue {
  user_id: number
}
export default defineComponent({
  props: {
    artitem: {
      type: Object as PropType<Book>,
      required: true
    },
    components: {
      [Dialog.Component.name]: Dialog.Component
    },
  },
  setup (props) {
    const store = useStore()
    const show = ref(true)
    const isshow = ref(false)
    const popupshow = ref(false)
    const showShare = ref(false)
    const router = useRouter()
    const route = useRoute()
    const userinfo : newvalue = reactive({
      user_id: 0,
    })
    const options = reactive([
      [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
      ],
      [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
        { name: '小程序码', icon: 'weapp-qrcode' },
      ],
    ])
    store.$subscribe((args, state) => {
      for (var key in userinfo) {
        userinfo[key] = state.userinfo[key]
      }
    })
    const isallart = () => {
      show.value = !show.value
    }
    const timefilt = computed(() => {
      if (props.artitem.createtime !== undefined) {
        return props.artitem.createtime.substring(0, 10)
      }
      return ''
    })
    const content = computed(() => {
      if (props.artitem.content.length > 50) {
        chengeisshow()
        return show.value ? props.artitem.content.substring(0, 50) + '...' : props.artitem.content
      }
      return props.artitem.content
    })
    const chengeisshow =  () => {
      isshow.value = true
    }
    const isshare = () => {
      popupshow.value = false,
      showShare.value = true
    }
    const deleteart = () =>{
      Dialog.confirm({
        title: '删除文章',
        message: content.value,
      })
        .then(async () => {
          const result = await detart(props.artitem.comment_id,localStorage.getItem('token') as string)
          if(result.data.status === 0) {
            Notify({ type: 'success', message: '删除成功' });
            if (route.fullPath !== '/home') {
              router.push('/home')
            }
            store.getatr()
          }
          popupshow.value = false
        })
        .catch(() => {
          Notify({ type: 'primary', message: '取消删除' });
          popupshow.value = false
        });
    }
    const reqlength = computed(() => {
      return props.artitem.rep ? props.artitem.rep.length : 0
    })
    const isdelorwarn = computed(() => {
      return props.artitem.user_id ===userinfo.user_id
    })
    const gocomment = () => {
      router.push({
        path: '/comment',
        query: {
          comment_id: props.artitem.comment_id,
          current_art: JSON.stringify(props.artitem as any)
        }
      })
    }
    onMounted(() => {
      for (var key in userinfo) {
        userinfo[key] = store.userinfo[key]
      }
    })
    return {
      isallart,
      show,
      timefilt,
      content,
      isshow,
      popupshow,
      showShare,
      options,
      isshare,
      deleteart,
      reqlength,
      isdelorwarn,
      gocomment
    }
  }
})
</script>

<style>
.van-col--4 div {
  margin: 5px;
}
.van-col--20 {
  position: relative;
}
.van-col--20 .name {
  margin: 10px 5px 5px 0px;
  color: rgb(135, 135, 135);
}
.van-col--20 .word {

  font-size: 18px;
}
.van-col--20 .context {
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  width: 95%;
}
.function {
  border-bottom:1px solid #eee;
  margin-top: 5px;
  font-size: 10px;
  padding: 5px;
}
.reply {
  margin-left: 10px;
  padding: 3px 5px;
  background-color: #eee;
  border-radius: 20px;
}
.allfunc {
  position: absolute;
  right: 0px;
}
.zj{
  width: 20px;
  height: 1px;
  display: inline-block;
}
</style>

<style scoped>


.article {
  width: 100%;
  margin-bottom: 5px;
}
.popup div{
  line-height: 40px;
  width: 90%;
  position: relative;
  left: 20px;
  overflow: hidden;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  border-bottom:1px solid #eee;
}
.divnone {
  line-height: normal!important;
  padding-bottom: 10px!important;
}

</style>