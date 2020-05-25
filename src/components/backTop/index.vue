<template>
  <div class="backtop" v-show="visible" @click="backTop" :style="styles">
    <!-- <van-icon name="play-circle-o" /> -->
    <van-icon name="play" class="backtop-icon"/>
  </div>
</template>

<script>
export default {
  name: 'backTop',
  data () {
    return {
      'visible': false,
      'ret': 0,
      'obj': null,
      'speed': 0,
      'times': 0,
      'time': 0,
      'x': 0,
      'y': 0,
      'translateY': 0,
      'angle': 0
    }
  },
  props: {
    defaultProps: {
      type: Number,
      default: 400
    },
    date: {
      type: Number,
      default: 500
    },
    color: {
      type: String,
      default: '#6495ED'
    },
    styles: {
        type: Object,
        default:function(){
            return {
                'right': '30px',
                'bottom': '80px',
                'cursor': 'pointer'
            }
        }
      },
  },
  mounted () {
    window.addEventListener('scroll',this.hanScroll)
  },
  methods: {
    hanScroll(){
      const scrollTop = this.getScroll(window)
      this.visible = scrollTop > this.defaultProps
    },
    getScroll(w){
      this.ret = w.pageYOffset
      const method = 'scrollTop'
      if(typeof this.ret !== 'number'){
        let d= w.document;
        this.ret = d.documentElemelnt[method]
        if(typeof this.ret !== 'number'){
          this.ret = d.body[method]
        }
      }
      return this.ret
    },
    backTop(){
      const initerval = 30
      let num = this.date/initerval
      this.time = 0
      this.times = num;
      this.speed = this.ret / num
      this.obj = setInterval(this.setScroll,initerval)
    },
    setScroll(){
      if(this.time > this.times || this.ret<=0){
        clearInterval(this.obj)
        return
      }
      this.time++
      this.ret -= this.speed
      document.documentElement.scrollTop = document.body.scrollTop = this.ret
    }
  }
}
</script>
<style lang="scss" scoped>
.backtop{
    position: fixed;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    cursor: pointer;
    z-index: 5;
    .backtop-icon{
        position: absolute;
        color: #409eff;
        font-size: 22px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%) rotate(-90deg);
    }
}
</style>