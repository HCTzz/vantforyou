<template>
  <div class="vlog">
    <van-list
      v-model="loading"
      :finished="finished"
      loading-text='正在加载'
      @load="onLoad"
      :finished-text="pages == 0 ? '' : '我也是有底线的哟'"
      :class="{'listpane':true,'empty':pages == 0}"
      offset=10
    >
      <div class='dyncDiv' v-for="(vlog) in list" :key='vlog.id' @click.stop="viewDetail(vlog.id)">
        <div class="descr">
          <span class="title">{{vlog.title}}</span>
          <span>
            <van-icon style='margin-right:5px;vertical-align: top;font-size:.8rem' name="like" color='#ff6c6c'/>
            <span class="date">{{vlog.createTime | dateParse}}</span>
          </span>
        </div>
      </div>   
      <van-empty v-show="pages == 0"
        class="custom-image"
        :image="emptyimg"
        description="快催主人写一篇吧"
      /> 
    </van-list>
  </div>
</template>

<script>
import {fetchList} from '@/api/article';
export default {
  name: 'vlog',
  data(){
    return {
      loading:false,
      finished:false,
      page:1,
      limit:10,
      list:[],
      pages:1,
      emptyimg:require('@/assets/img/empty.png')
    }
  },
  components: {

  },
  activated(){
    if (!this.$route.meta.isBack) {
      this.list = [];
      this.page = 1;
      this.finished = false;
      this.getVlogList();
    }else{
      this.$route.meta.isBack = false;
    }
  },
  methods: {
    viewDetail(id){
      this.$store.dispatch('settings/changeSetting',{key:'tabbar',value:false});
      this.$router.push(`/vdetail/${id}`);
    },
    getVlogList(){
      this.loading = true;
      fetchList({page:this.page,limit:this.limit}).then(res => {
        this.loading = false;
        this.page += 1 ;
        this.pages = res.data.pages;
        let pList = res.data.list;
        pList.forEach((obj,index) => {
          this.list.push(obj);
        })
        if(this.pages < 2 || this.page > this.pages){
          this.finished = true;
        }
      }).catch(e => {
        this.finished = true;
        this.loading = false;
      })
    },
    getImgSrc(fileId){
      if (!fileId) {
        return this.defaultImgPath;
      }
      return this.$store.state.settings.serverPath + '/sysFile/priviewImg?fileKey=' + fileId;

    },
    onLoad(){
      this.getVlogList();
    },
  }
}
</script>
<style lang="scss" scoped>
*{
  
  box-sizing: border-box;
}
.vlog{
  .listpane{
    background-color: #f2f3f5;
    padding: 0px 10px;
    .dyncDiv{
      margin: 10px 0px 5px 0px;
      padding: 10px;
      width: 100%;
      height: 60px;
      display: inline-block;
      vertical-align: top;
      position: relative;
      background-color: #fff;
      border-radius: 8px;
      // &::before{
      //   position: absolute;
      //   right: 0;
      //   bottom: 0;
      //   left: 0;
      //   height: 2px;
      //   background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      //   background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      //   background-size: 80px;
      //   content: '';
      // }
      .descr{
        text-align: left;
        span{
          display: block;
          font-size: .9rem;
        }
        span:nth-child(1){
          color: #ff6c6c;
          white-space:nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          height: 30px;
        }
        span:nth-child(2){
          color: #999;
          font-size: .7rem;
          display: inline-block;
          vertical-align: top;
        }
      }
      .tag{
        position:absolute;
        right: 20px;
        top:20px;
        font-size: 1rem;
      }
    }
  }
  .empty{
    background-color: #fff;
  }
}

</style>
