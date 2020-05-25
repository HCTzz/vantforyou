<template>
  <div class="main">
    <van-nav-bar
      :title="title"
      left-text="返回"
      :right-text="rightText"
      left-arrow
      @click-left="back"
       placeholder
       fixed
       @click-right="onClickRight"
    />
    <div class="content">
      <transition name="fade-transform" mode="out-in">
        <keep-alive >
          <router-view v-if="$route.meta.keepAlive" :key="key" />
        </keep-alive>
      </transition>
       <transition name="fade-transform" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive" :key="key" />
      </transition>
      <back-top ></back-top>
    </div>
    <van-tabbar v-model="active" v-show="tabbar" @change="onChange" :placeholder='true' >
      <van-tabbar-item icon="comment">笔记</van-tabbar-item>
      <van-tabbar-item icon="photograph">相册</van-tabbar-item>
      <van-tabbar-item icon="video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager">管理</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import backTop from '@/components/backTop'
export default {
  name: 'home',
  data(){
    return {
      loading:false,
      finished:false,
      active: 0,
      position:0,
      tabbar:true,
      title:'',
      path:['/vlog','/photo','/video','/manager'],
      growPath:['/logTimeLine','/photo','/video','/manager']
    }
  },
  components: {
    backTop
  },
  watch: {
    '$route.meta': {
      handler(newName, oldName) {
        this.title = newName.title;
      },
      deep: true
    }
  },
  computed: {
    rightText(){
      return this.active == 0 ? '成长轨迹' : '';
    },
    cachedViews() {
      return this.$store.state.routerviews.cachedViews
    },
    key(){
      let meta = this.$route.meta;
      this.tabbar = meta.tabbar;
      this.active = meta.active;
      this.title = meta.title;
      return this.$route.path;
    }
  },
  mounted(){
    this.$router.push(this.path[this.active]).catch(err => {err});
  },
  methods: {
    addView(){
      this.$store.dispatch('routerviews/addView', this.$route);
    },
    handleClickOutside() {
    },
    back(){
      if(this.active == 0){
        window.location = this.$store.state.settings.homePath;
        return ;
      }
      this.$router.back(-1);
    },
    onClickRight(){
      this.$router.push(this.growPath[this.active]);
    },
    onChange(index){
      if(index == 3){
        window.location = this.$store.state.settings.managePath;
        return false;
      }
      this.addView();
      this.$router.push(this.path[this.active]).catch(err => {err});
    }
  }
}
</script>
<style lang="scss" scoped>
*{
  box-sizing: border-box;
}
.main{
  height: 100%;
  .content{
    text-align: left;
  }
}

</style>
