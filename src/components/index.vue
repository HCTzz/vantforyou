<template>
  <div >
   
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
   
  },
  computed: {
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
