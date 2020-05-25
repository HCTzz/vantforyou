<template>
    <div class="timeline">
      <light-timeline :items='items'>
        <template slot='tag' slot-scope='{ item }'>
            {{item.createTime | dateParse}}
        </template>
        <template slot='symbol'>
            <van-icon style='font-size:1rem' name="like" color='#ff6c6c'/>
        </template>
        <template slot='content'  slot-scope='{ item }'>
           <div>
               <span class="van-ellipsis" style=";font-weight:600;">{{item.title}}</span>
               <div v-html=" item.content"></div>
           </div>
        </template>
      </light-timeline>
    </div>
</template>

<script>
import {fetchList} from '@/api/article';
export default {
  name: 'detail',
  data(){
    return {
     items:[]
    }
  },
  components: {

  },
  mounted(){

    this.$store.dispatch('settings/changeSetting',{key:'title',value:'成长轨迹'});
    fetchList().then(res => {
        this.items = res.data.list;
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

</style>
