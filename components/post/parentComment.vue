<template>
  <div class="parent">
    <parentComment v-if="toParent.parent" :toParent="toParent.parent" @parentReply="circleReply" />
    <div class="parentContent">
      <div class="parentInfo">
        {{toParent.account.nickname}}
        <i>2020-07-29 10:30</i>
        <span>1</span>
      </div>
      <p class="parentComment">{{toParent.content}}</p>
      <div class="replayBtn">
        <span @click="parentReply">回复</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "parentComment",
  props: ["toParent"],
  methods: {
    parentReply() {
      console.log("touchParent", this.toParent);

      this.$emit("parentReply", {
        parent_id: this.toParent.id,
        nickname: this.toParent.account.nickname,
      });
    },
    circleReply(parentInfo) {
      this.$emit("parentReply", parentInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.parent {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 2px;
  .parentContent {
    padding: 5px 10px 0;
    .parentInfo {
      font-size: 12px;
      color: #666;
    }
    .parentComment {
      margin-top: 10px;
    }
    .replayBtn {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #1e50a2;
      text-align: right;
    }
  }
}
</style>