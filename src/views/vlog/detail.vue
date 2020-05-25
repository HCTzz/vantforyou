<template>
    <div class="detail">
      <div class="title">
        <span>
          {{vlog.title}}
        </span>
        <span>
          {{vlog.createTime | excludSec}}
        </span>
      </div>
      <div class="vlog-content" v-html='vlog.content'>
      </div>
    </div>
</template>

<script>
import {fetchArticle} from '@/api/article';
export default {
  name: 'detail',
  data(){
    return {
     vlog:{},
     id:this.$route.params.id
    }
  },
  components: {

  },
  mounted(){
    fetchArticle(this.id).then(res => {
      this.vlog = res.data;
    })

  },
  methods: {
   
  }
}
</script>
<style lang="scss" scoped>
*{
  box-sizing: border-box;
}

.detail{
  padding: 0px 10px;
  .title{
    display: block;
    height: 70px;
    line-height: 40px;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    span{
      color: #666;
      display: block;
      &:last-child{
        font-size: 12px;
        color: #ccc;
        line-height: 30px;
      }
    }
  }
  .vlog-content{
    width: 100%;
    padding: 10px;
  }
}
</style>
