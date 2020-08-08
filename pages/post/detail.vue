<template>
  <div class="container">
    <postContent />
    <postAside />
  </div>
</template>

<script>
import postContent from "@/components/post/postContent.vue";
import postAside from "@/components/post/postAside.vue";
export default {
  components: {
    postContent,
    postAside,
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
}
</style>1