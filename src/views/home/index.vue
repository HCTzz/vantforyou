<template>
  <div class="main">
    <van-nav-bar
      title="Hmc baby"
      left-text="返回"
      left-arrow
      @click-left="back"
       placeholder
    />
    <div class="content">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>
    <van-tabbar v-model="active" v-show="tabbar"  :placeholder='true' >
      <van-tabbar-item icon="comment">文字</van-tabbar-item>
      <van-tabbar-item icon="photograph">相册</van-tabbar-item>
      <van-tabbar-item icon="video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager">管理</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {
      tabbar:true,
      loading:false,
      finished:false,
      active: 1,
      position:0,
      cachedViews:[],
      path:['/vlog','/photo','/video','/manager']
    }
  },
  components: {
  },
  computed: {
    key(){
        return this.$route.path;
    }
  },
  mounted(){
    this.$router.push(this.path[this.active]).catch(err => {err});
  },
  methods: {
    handleClickOutside() {
    },
    back(){

    }
  }
}
</script>
<style lang="scss" scoped>
*{
  box-sizing: border-box;
}

.main{
  .content{
    margin: 0px 10px;
    padding-bottom: 20px;
    text-align: left;
  }
}

</style>
