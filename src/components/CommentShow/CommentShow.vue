<template>
  <div>
    <article-show-item :artitem="(artinfo)"></article-show-item>
    全部评论
    <comment-show-item v-for=" (item, index) in cominfo" :key="index" :artitem="(item)"></comment-show-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType} from 'vue'
import CommentShowItem from '../CommentShowItem/CommentShowItem.vue';
import ArticleShowItem  from '../ArticleShowItem/ArticleShowItem.vue'
import { Book } from '@/interface/Book'; 
export default defineComponent({
  components: {
    CommentShowItem,
    ArticleShowItem
  },
  props: {
    cominfo: {
      type: Array as PropType<Book[]>,
      default() {
        return []
      }
    },
    artinfo: {
      type: Object as PropType<Book>,
      default() {
        return {}
      }
    }
  },
  setup () {
    return {  
      
    }
  }
})
</script>

<style scoped>
</style>