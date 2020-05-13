<template>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text='我也是有底线的'
      loading-text='正在加载'
      @load="onLoad"
    >
      <div class='dyncDiv' v-for="(photo) in list" :key='photo.id'>
        <van-image
          height="270px"
          fit="cover"
          :src="getImgSrc(photo.fileId)"
        />  
        <van-tag class='tag' mark type="warning">{{photo.imgCount}}P</van-tag>
        <div class="descr">
          <span class="title">{{photo.name}}</span>
          <span class="date">{{photo.createTime | dateParse}}</span>
        </div>
      </div>    
    </van-list>
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
  mounted(){
    // this.getPhotoList();
  },
  methods: {
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
        if(this.pages < 2 && this.page > this.pages){
          this.finished = true;
        }
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

.dyncDiv{
  border: 1px solid #eee;
  margin: 5px 0px;
  padding: 10px;
  width: 100%;
  height: 340px;
  display: inline-block;
  vertical-align: top;
  position: relative;
  @media only screen and (min-width: 1200px) {
    width: 10% ;
  }
  @media only screen and (min-width: 992px)  {
    width: 15% ;
  }
  @media only screen and (min-width: 768px){
    width: 25% ;
  }
  @media only screen and (max-width: 768px){
    width: 50% ;
  }

  @media only screen and (max-width: 420px){
    width: 100% ;
  }
  .descr{
    border-top: 1px solid #eee;
    height: 48px;
    line-height: 48px;
    text-align: left;
    span{
      display: inline-block;
      font-size: .8rem;
    }
    span:nth-child(1){
      vertical-align: top;
      color: #666;
      width: calc(100% - 120px);
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span:nth-child(2){
      width: 120px;
      vertical-align: top;
      text-align: right;
      color: #999;
    }
  }
  .tag{
    position:absolute;
    right: 20px;
    top:20px;
    font-size: 1rem;
  }
}
 

</style>
