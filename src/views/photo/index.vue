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
      <div class='dyncDiv' v-for="(photo) in list" :key='photo.id'>
        <div class="img-container">
          <img :key="getImgSrc(photo.fileId)" @click.stop="enterImg(photo.id,photo.name)" style="display: block; width: 100%; height: 100%;object-fit: cover;" class="img"  fit="cover" v-lazy="getImgSrc(photo.fileId)">
        </div>
        <van-tag class='tag' plain type="warning">{{photo.imgCount}}P</van-tag>
        <div class="descr">
          <span class="title van-ellipsis">{{photo.name}}</span>
          <span class="date">{{photo.createTime | dateParse}}</span>
        </div>
      </div>    
    </van-list>
  </div>
</template>

<script>
import {getFileList} from '@/api/photo';
export default {
  name: 'photo',
  data(){
    return {
      loading:false,
      finished:false,
      page:1,
      limit:6,
      list:[],
      pages:0,
      defaultImgPath: require('@/assets/img/default.jpg')
    }
  },
  components: {

  },
  activated(){
    if (!this.$route.meta.isBack) {
      this.list = [];
      this.page = 1;
      this.finished = false;
      this.getPhotoList();
    }else{
      this.$route.meta.isBack = false;
      return ;
    }
  },
  methods: {
    enterImg(id,title){
      this.$router.push(`/pdetail/${id}/${title}`);
    },
    getPhotoList(){
      this.loading = true;
      getFileList({pid:0,page:this.page,limit:this.limit}).then(res => {
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
      border: 1px solid #eee;
      padding: 10px;
      margin: 5px;
      width: 47% ;
      height: 230px;
      display: inline-block;
      vertical-align: top;
      position: relative;
      .img-container{
        width:100%;
        height:160px; 
        position: relative; 
        display: inline-block;
      }
      @media only screen and (min-width: 1200px) {
        width: 10% ;
        margin: 5px 10px;
      }
      @media only screen and (min-width: 992px)  {
        width: 15% ;
        margin: 5px;
      }
      @media only screen and (min-width: 768px){
        width: 24% ;
        margin: 5px;
        height: 252px;
        .img-container{
          height:190px; 
        }
      }
      @media only screen and (max-width: 768px){
        width: 47% ;
        margin: 5px;
      }
      .descr{
        border-top: 1px solid #eee;
        height: 10px;
        line-height: 10px;
        text-align: left;
        span{
          display: block;
          font-size: .8rem;
        }
        span:nth-child(1){
          height: 36px;
          line-height: 36px;
        }
        span:nth-child(2){
          color: #ccc;
        }
      }
      .tag{
        position:absolute;
        right: 18px;
        top:20px;
        font-size: .8rem;
      }
    }
  }
}

</style>
