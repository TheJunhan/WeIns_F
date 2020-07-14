<template>
  <div id="app">
    <router-view  v-if="isRouterAlive"></router-view>
  </div>


</template>

<script>

  export default {
    name: 'App',
    provide(){
      return{
        reload:this.reload
      }
    },
    data() {
      return {
        isRouterAlive:true
      };
    },
    methods:{
      reload(){
        this.isRouterAlive=false;
        this.$nextTick(()=>{
          this.isRouterAlive=true
        })
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log(to);
        console.log(from)
        this.reload()
      },
    }
  }
</script>

