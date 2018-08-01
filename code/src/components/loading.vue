<template>
  <div class="loading"></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .loading {
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('../assets/img/loading.gif');
    background-size: contain;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
