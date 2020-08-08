<template>
  <div>
    <div class="comment">
      <parentComment
        v-if="commentData.parent"
        :toParent="commentData.parent"
        @parentReply="TomainReply"
      />
      <p class="commentMsg">{{commentData.content}}</p>
      <div class="replayBtn">
        <span @click="toReplay">回复</span>
      </div>
    </div>
  </div>
</template>

<script>
import parentComment from "@/components/post/parentComment.vue";
export default {
  components: {
    parentComment,
  },
  props: ["commentData"],
  methods: {
    //主评论的回复
    toReplay() {
      console.log(this.commentData);
      const userInfo = {
        parent_id: this.commentData.id,
        content: this.commentData.content,
        nickname: this.commentData.account.nickname,
      };
      this.$emit("ToReplay", userInfo);
    },
    //从父评论传回来的父id和content
    TomainReply(userInfo) {
      this.$emit("ToReplay", userInfo);
      // console.log(userInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  .replayBtn {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #1e50a2;
    text-align: right;
  }
}
</style>