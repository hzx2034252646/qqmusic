<template>
  <div class="mv-detail">
    <p class="title">{{ data.mvname }}</p>
    <p class="singer" @click="$event.target.id && $router.push('/artist/'+ $event.target.id)"
    v-html="data.singers.map(item => `<span id='${item.mid}'>${item.name}</span>`).join(' / ')">
    </p>
    <p class="count">
      <span class="rank" v-if="data.toplist.topnum > 0" @click="$router.push('/toplist/201')">
        {{ data.toplist.istop ? ('MV排行第' + data.toplist.topnum +
        '名(第' + data.toplist.weekno + '期)') : '暂未上榜' }}</span>
      <span>{{ data.listennum | count_filter }}次播放</span>
      <span>{{ data.pubdate }}</span>
    </p>
    <p class="desc" v-html="data.desc.replace(/\n/g, '<br>')"></p>
    <p class="score" v-if="data.toplist.score > 0">
      <span>本期得分</span>
      <span>{{ data.toplist.score }}</span>
      <span>（本期数据综合评分）</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['data'],
  filters: {
    count_filter (value) {
      return value >= 10000 ? (value / 10000).toFixed(1) + '万' : value
    }
  }
}
</script>

<style lang="scss" scoped>
  .mv-detail {
    padding: 0 .3rem;
    margin: .3rem 0;
    p {
      padding: .1rem 0;
      color: gray;
      font-size: .9em;
    }
    .title {
      font-size: 1.2em;
      color: #000;
    }
    .count {
      span {
        margin-right: .3rem;
      }
      .rank {
        color: #31c27c;
      }
    }
    .desc {
      line-height: 1.6em;
      word-wrap: break-word;
      text-align: justify;
    }
    .score {
      span {
        margin-right: .2rem;
        vertical-align: middle;
        &:nth-child(1) {
          color: #000;
          font-size: 1.2em;
        }
        &:nth-child(2) {
          font-size: 2em;
          color: #31c27c;
        }
      }
    }
  }
</style>
