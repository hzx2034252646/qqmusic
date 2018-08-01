<template>
  <div class="artist-list">
    <div class="artist-list-item" v-for="(item,index) in data" :key="index" @click="$router.push('/artist/'+item.id)">
      <div class="avatar">
        <img v-lazy="{src: item.pic, error: require('../assets/img/person.png'), loading: require('../assets/img/person.png')}" alt="">
      </div>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="scss" scoped>
  .artist-list {
    overflow: hidden;
    .artist-list-item {
      display: flex;
      height: 1rem;
      line-height: 1rem;
      margin: .2rem 0;
      .avatar {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        overflow: hidden;
        margin: .1rem .2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        width: 5.5rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding-left: .1rem;
        border-bottom: 1px solid #ddd;
        font-size: 1.1em;
      }
    }
  }
</style>
