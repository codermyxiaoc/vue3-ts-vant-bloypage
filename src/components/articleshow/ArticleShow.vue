<template>
  <div>
    <article-show-item v-for="(item, index) in artinfo" :key="index" :artitem="(item)"></article-show-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType} from 'vue'
import ArticleShowItem from '../ArticleShowItem/ArticleShowItem.vue';
import { Book } from '@/interface/Book';
export default defineComponent({
  components: {
    ArticleShowItem
  },
  props: {
    artinfo: {
      type: Array as PropType<Book[]>,
      default() {
        return []
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