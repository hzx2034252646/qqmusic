<template>
  <header>
    <div class="logo" @click="$router.push('/')"></div>
    <router-link class="search-icon" to="/search"></router-link>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    height: .88rem;
    background: #31c27c;
    position: fixed;
    top: 0;
    z-index: 99;
    .logo {
      width: 1.8rem;
      height: .5rem;
      float: left;
      background-image: url('../assets/img/logo.png');
      background-size: contain;
      margin-left: .2rem;
      margin-top: .18rem;
    }
    .search-icon {
      width: .45rem;
      height: .45rem;
      background: url('../assets/img/search.svg');
      float: right;
      margin-top: .21rem;
      margin-right: .3rem;
    }
  }
</style>
