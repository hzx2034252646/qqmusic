<template>
  <ul class="cat-list">
    <li class="cat-list-item" v-for="(item,index) in data" :key="index"
    :class="{'cat-active': item.id == active}" @click="setActive(item.id)">
      {{ item.name || item.title }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ['data', 'active', 'setActive']
}
</script>

<style lang="scss" scoped>
  .cat-list {
    height: .8rem;
    white-space: nowrap;
    overflow-x: auto;
    background: #f4f4f4;
    color: #999;
    &::-webkit-scrollbar {
      display: none;
    }
    .cat-list-item {
      padding: 0 .3rem;
      height: 100%;
      display: inline-block;
      text-align: center;
      line-height: .8rem;
      &.cat-active {
        color: #31c27c;
      }
    }
  }
</style>
