<template>
  <view>
    <button
      class="avatar-wrapper"
      open-type="chooseAvatar"
      bind:chooseavatar="onChooseAvatar"
    >
      <image class="avatar" :src="avatarUrl"></image>
    </button>
    <uni-forms>
      <uni-forms-item label="昵称">
        <uni-easyinput v-model="nickname" type="nickname" placeholder="请输入昵称" />
      </uni-forms-item>
    </uni-forms>
  </view>
</template>
<script>
export default {
  data() {
    return {
      avatarUrl:
        "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
      nickname: "",
    };
  },
};
</script>
<style scoped lang="scss">

</style>
