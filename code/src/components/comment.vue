<template>
  <div class="comment-list" v-if="data && data.length > 0">
    <p class="title">
      {{ title }}
      <slot class="more"></slot>
    </p>
    <div class="comment-item" v-for="(item,index) in data" :key="index">
      <div class="avatar">
        <img v-lazy="{src: item.avatarurl, error: require('../assets/img/person.png'), loading: require('../assets/img/person.png')}" alt="">
      </div>
      <div class="content">
        <div class="user">
          <span>{{ item.nick }}</span>
          <span class="time">{{ item.time | time_filter }}</span>
        </div>
        <p v-html="item.rootcommentcontent && item.rootcommentcontent.replace(/\\n/g, '<br>')"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'title'],
  filters: {
    time_filter (value) {
      let date = new Date(value * 1000)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      let h = date.getHours()
      let m = date.getMinutes()
      Y = new Date().getFullYear() === Y ? '' : Y + '-'
      M = (M < 10 ? '0' + M : M) + '-'
      D = D < 10 ? '0' + D : D
      h = (h < 10 ? '0' + h : h) + ':'
      m = m < 10 ? '0' + m : m
      return Y + M + D + ' ' + h + m
    }
  }
}
</script>

<style lang="scss" scoped>
  .comment-list {
    overflow: hidden;
    background: #fff;
    .title {
      font-size: 1.1em;
      padding: .3rem .2rem;
      a {
        color: #31c27c;
        float: right;
      }
    }
    .comment-item {
      display: flex;
      padding: .3rem;
      border-bottom: 1px solid #eee;
      .avatar {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: .2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        flex: 1;
        .user {
          color: #999;
          font-size: .9em;
          .time {
            float: right;
          }
        }
        p {
          max-width: 5.9rem;
          margin-top: .2rem;
          line-height: 1.8em;
          text-align: justify;
          word-wrap: break-word;
        }
      }
    }
  }
</style>
