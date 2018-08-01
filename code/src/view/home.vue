<template>
  <div id="home">
    <Header />
    <Nav :data="nav" class="nav" />
    <div class="divider"></div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Header from '@/components/header'
import Nav from '@/components/nav'
export default {
  name: 'home',
  components: {
    Header,
    Nav
  },
  data () {
    return {
      nav: [
        { name: '推荐', path: '/' },
        { name: '排行', path: '/toplist' },
        { name: '歌手', path: '/artist' },
        { name: 'MV', path: '/mv' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    position: fixed;
    top: .88rem;
    z-index: 99;
  }
  .divider {
    margin-top: 1.68rem;
  }
</style>
