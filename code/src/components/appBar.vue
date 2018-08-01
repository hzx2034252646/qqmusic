<template>
  <header>
    <span class="back" @click="goBack"></span>
    <span class="title">{{ title }}</span>
  </header>
</template>

<script>
export default {
  props: ['title', 'back'],
  methods: {
    goBack () {
      if (this.back) {
        this.$router.back()
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    background: #31c27c;
    position: fixed;
    top: 0;
    z-index: 99;
    text-align: center;
    color: #fff;
    .back {
      width: .5rem;
      height: .5rem;
      display: block;
      background-image: url('../assets/img/back.svg');
      background-repeat: no-repeat;
      background-size: contain;
      position: absolute;
      left: .2rem;
      top: .19rem;
    }
    .title {
      font-size: 1.2em;
    }
  }
</style>
