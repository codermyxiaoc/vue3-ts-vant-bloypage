<template>
  <div class="wrapper" ref="wrapper" id="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import BScroll from 'better-scroll'; 
export default defineComponent({
  name: 'scrollVue',
  emits: ['scrollpos','pullingUp'],
  setup(props,{emit}) {
    /* const topshow = false  */
    let BSinstance : any = null
    onMounted(() => {
      BSinstance = new BScroll(document.querySelector('#wrapper') as HTMLElement, {
        click: true,
        observeDOM: true,
        probeType: 0,
        pullUpLoad: true
      })
      BSinstance.on('scroll', (position: any)=> {
        emit('scrollpos', position)
      })
      BSinstance.on('pullingUp', () => {
        emit('pullingUp')
      })
    })
    const refresh = () => {
      BSinstance && BSinstance.refresh()
    }
    return {
      refresh
    }
  }
})
</script>

<style scoped>

</style>