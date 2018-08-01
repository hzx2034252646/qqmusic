<template>
  <nav>
    <router-link class="nav-item"
    :class="{'nav-active': decodeURIComponent($route.fullPath) == item.path}"
    v-for="(item,index) in data" :key="index" :to="item.path">
      {{ item.name }}
    </router-link>
  </nav>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="scss" scoped>
  nav {
    width: 100%;
    height: .8rem;
    display: flex;
    background: #fff;
    .nav-item {
      flex: 1;
      text-align: center;
      line-height: .8rem;
      color: #777;
      font-size: 1.15em;
      position: relative;
      &.nav-active {
        color: #31c27c;
        &:after {
          content: '';
          width: 100%;
          height: .04rem;
          background: #31c27c;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
</style>
