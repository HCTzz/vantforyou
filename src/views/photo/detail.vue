<template>
  <div class="photo">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text='我也是有底线的'
      loading-text='正在加载'
      class="listpane"
      @load="onLoad"
      offset=10
    >
      <div class='dyncDiv' v-for="(photo,index) in list" @click='preview(index)' :key='photo.id'>
        <div  style="width:100%;height:170px; position: relative; display: inline-block;">
          <img :key="getImgSrc(photo.fileId)"  style="display: block; width: 100%; height: 100%;object-fit: cover;" class="img"  fit="cover" v-lazy="getImgSrc(photo.fileId)">
        </div>
        <div class="descr">
          <span>HMC</span>
          <span class="date">{{photo.createTime | dateParse}}</span>
        </div>
      </div>    
    </van-list>
  </div>
</template>

<script>
import {getFileList} from '@/api/photo';
import { ImagePreview } from 'vant';
export default {
  name: 'pdetail',
  data(){
    return {
      loading:false,
      finished:false,
      page:1,
      limit:6,
      list:[],
      imgList:[],
      pages:0,
      pid:this.$route.params.id,
      defaultImgPath: require('@/assets/img/default.jpg')
    }
  },
  components: {

  },
  mounted(){
    this.$route.meta.title = this.$route.params.title;
  },
  methods: {
    preview(index){
      ImagePreview({
        closeable:true,
        closeOnPopstate:true,
        images:this.imgList,
        startPosition:index,
      });
    },
    getPhotoList(){
      this.loading = true;
      getFileList({pid:this.pid,page:this.page,limit:this.limit}).then(res => {
        this.loading = false;
        this.page += 1 ;
        this.pages = res.data.pages;
        let pList = res.data.list;
        pList.forEach((obj,index) => {
          this.imgList.push(this.getImgSrc(obj.fileId));
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
      this.getPhotoList();
    },
  }
}
</script>
<style lang="scss" scoped>
*{
  box-sizing: border-box;
}
.photo{
  .listpane{
    margin: 5px 5px;
    .dyncDiv{
      position: relative;
      border: 1px solid #eee;
      padding: 10px;
      margin: 5px;
      width: 47%;
      height: 190px;
      display: inline-block;
      vertical-align: top;
      position: relative;
      @media only screen and (min-width: 1200px) {
        width: 10% ;
        margin: 5px 10px;
      }
      @media only screen and (min-width: 992px)  {
        width: 15% ;
        margin: 5px;
      }
      @media only screen and (min-width: 768px){
        width: 25% ;
        margin: 5px;
      }
      @media only screen and (max-width: 768px){
        width: 47% ;
        margin: 5px;
      }
      .descr{
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: rgba(255, 151, 106, 0.5490196078431373);
        font-size: 12px;
        span{
          display: block;
        }
      }
    }
  }
}

</style>
