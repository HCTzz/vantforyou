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
      <div class='dyncDiv' v-for="(video) in list" :key='video.fileKey'>
        <div class="img-container">
          <img :key="getImgSrc(video.fileKey)" @click.stop="priviewVideo(video)" style="display: block; width: 100%; height: 100%;object-fit: cover;" class="img"  fit="cover" v-lazy="getImgSrc(video.fileKey)">
          <span class='tag' style="right:5px">{{video.fileSize | renderSize}}</span>
          <span class='tag' style="left:5px">{{video.createTime | dateParse}}</span>
          <van-icon name="play-circle-o" class="video-icon"/>
        </div>
        <div class="descr">
          <span class="van-ellipsis">{{ video.fileName }}</span>
          <span >{{video.fileDuration | resloveVideoDuration}}</span>
        </div>
      </div>    
    </van-list>
    <div class="videoDialog" v-show="playEleShow" >
      <video ref="videoElement" class="centeredVideo" controls>
          Your browser is too old which doesn't support HTML5 video.
      </video>
      <van-icon class="el-icon-circle-close" name="close" @click="destoryFlv"/>
    </div>
  </div>
</template>

<script>
import {getVideoList} from '@/api/video';
import flvjs from 'flv.js/dist/flv.js'
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
      playEleShow:false,
      player:null,
      height:0,
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
      this.getVideoDataList();
    }else{
      this.$route.meta.isBack = false;
      return ;
    }
  },
  methods: {
    priviewVideo(video){
      if(this.player){
        this.destoryFlv();
      }
      this.height = video.fileHeight + 'px';
      this.width = video.fileWidth + 'px';
      this.playEleShow = true;
      this.player = flvjs.createPlayer({
        type:video.fileExt,
        isLive:false,
        duration:video.fileDuration,
        filesize:video.fileSize,
        url:this.$store.state.settings.serverPath + 'video/priviewVideo?fileKey=' + video.fileKey
      });
      this.player.attachMediaElement(this.$refs.videoElement);
      this.player.load();
      this.player.play();
      this.player.on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
         
        },
      );
      let that = this;
      this.$refs.videoElement.addEventListener('error',function(e){
        that.$message({
          type:'error',
          message:'视频加载失败'
       });
      })
    } ,   
    destoryFlv(){
      this.playEleShow = false;
      this.player.destroy();
      this.player = null;
    },
    enterImg(id,title){
      this.$router.push(`/pdetail/${id}/${title}`);
    },
    getVideoDataList(){
      this.loading = true;
      getVideoList({page:this.page,limit:this.limit}).then(res => {
        this.loading = false;
        this.page += 1 ;
        this.pages = res.data.pages;
        let pList = res.data.data;
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
      this.getVideoDataList();
    },
  }
}
</script>
<style lang="scss">
.videoDialog{
    position: absolute;
    top: 60px;
    bottom: 60px;
    background-color: rgba(0, 0, 0, 0.18);
    text-align: center;
    .centeredVideo{
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      // margin-top: 20%;
    }
    .el-icon-circle-close{
      position: absolute;
      right: 1rem;
      top: 10px;
      font-size: 2rem;
      color: #fff;
      cursor: pointer;
    }
}
</style>
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
        .img-container{
          
        }
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
      .img-container{
        .video-icon{
          position:absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);  
          font-size: 2rem;
          color: #fff;       
        }
        .tag{
          position:absolute;
          font-size: .8rem;
          bottom: 10px;
          color: #ff976a;
          &:nth-child(1){
            left: 5px;
          }
          &:nth-child(2){
            right: 5px;
          }
        }
      }
    }
  }
}

</style>
