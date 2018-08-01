<template>
  <div id="toplist">
    <div class="list" v-if="data.length > 0">
      <div class="list-item" v-for="(item,index) in data" :key="index"
      @click="$router.push('/toplist/' + item.topID)">
        <div class="cover">
          <img v-lazy="item.pic_v12" alt="">
        </div>
        <div class="content">
          <div class="title">{{ item.ListName }}</div>
          <p v-for="(value,index) in item.songlist.slice(0,3)" :key="index">
            {{ index + 1 }}<span>{{ value.songname }}</span> - {{ value.singername }}
          </p>
        </div>
      </div>
    </div>
    <loading v-else />
  </div>
</template>

<script>
import API from '@/api'
import loading from '@/components/loading'

export default {
  components: {
    loading
  },
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.$jsonp(API.GET_TOPLIST, {
      callbackName: 'jsonCallback'
    }).then(data => {
      this.data = [...data[0].List, ...data[1].List]
    })
  }
}
</script>

<style lang="scss" scoped>
  .list {
    overflow: hidden;
    background: #f4f4f4;
    .list-item {
      height: 2rem;
      display: flex;
      margin: .2rem;
      background: #fff;
      .cover {
        width: 2rem;
        height: 2rem;
        padding-right: .3rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        .title {
          font-size: 1.15em;
          margin: .15rem 0;
        }
        p {
          width: 4rem;
          color: #999;
          font-size: .9em;
          margin-bottom: .15rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            color: #333;
            margin-left: .2rem;
          }
        }
      }
    }
  }
</style>
