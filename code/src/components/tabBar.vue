<template>
  <nav>
    <span class="nav-item"
    :class="{'nav-active': active == item.active}"
    v-for="(item,index) in data" :key="index" @click="active = item.active">
      {{ item.name }}
    </span>
  </nav>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      active: this.data[0].active
    }
  },
  watch: {
    active (value) {
      this.$emit('setActive', value)
    }
  }
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
