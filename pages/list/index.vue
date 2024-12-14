<template>
  <view class="lottery-list-page">
    <z-paging
    ref="paging"
    v-model="dataList"
    @query="queryList"
    safe-area-inset-bottom
  >
    <template #top>
      <!-- 顶部导航栏 -->
      <view class="header">
        <view class="back-icon">
          <!-- <text class="iconfont">&#xe600;</text> -->
        </view>
        <text class="header-title">2元抽奖</text>
        <text class="header-subtitle">只要2元就能赢取各种大奖品!</text>
      </view>
      <!-- 中奖提示条 -->
      <view class="winner-banner">
        <text class="winner-text">中奖啦！恭喜用户xxx抽中了单票手机一部!</text>
      </view>
    </template>
    <!-- 抽奖列表 -->
    <view class="lottery-list">
      <view class="lottery-item" v-for="(item, index) in dataList" :key="index">
        <image class="product-img" :src="item.image" mode="scaleToFill" />
        <view class="item-content">
          <view>
            <view class="item-title">{{ item.title }}</view>
            <view class="date">{{ item.desc }}</view>
          </view>
          <view class="price-row">
            <text class="participants">{{ item.participants }}人已参与</text>
            <view class="join-btn" @tap="handleJoin(item)">立即开奖</view>
          </view>
        </view>
      </view>
    </view>
  </z-paging>
  </view>
</template>

<script>
const db = uniCloud.database();
export default {
  data() {
    return {
      dataList: [],
    };
  },
  methods: {
    handleJoin(item) {
      // 处理抢奖逻辑
      console.log("参与抽奖:", item);
    },
    queryList() {
      db.collection("lottery-list")
        .get()
        .then(({ result: { data } }) => {
          this.$refs.paging.complete(data);
        });
    },
  },
};
</script>

<style lang="scss">
.lottery-list-page {
  background: linear-gradient(to bottom, #FF8009 0%, #FFF9F0 40%, #FFF9F2 100%);
  min-height: 100vh;
}
.header {
  background: linear-gradient(to right, #ff6b00, #ff8c00);
  padding: 40rpx 30rpx;
  color: #fff;
  position: relative;

  .back-icon {
    position: absolute;
    left: 20rpx;
    top: 40rpx;
  }

  .header-title {
    font-size: 36rpx;
    font-weight: bold;
  }

  .header-subtitle {
    font-size: 24rpx;
    margin-top: 10rpx;
  }
}

.winner-banner {
  background-color: #fff8e7;
  padding: 20rpx;

  .winner-text {
    color: #ff6b00;
    font-size: 26rpx;
  }
}

.lottery-item {
  background-color: #fff;
  margin: 20rpx;
  border-radius: 16rpx;
  display: flex;
  padding: 20rpx;
  box-shadow: 0 0rpx 15rpx rgba(0, 0, 0, 0.08);

  .product-img {
    width: 200rpx;
    height: 200rpx;
    border-radius: 15rpx;
  }

  .item-content {
    flex: 1;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .item-title {
    font-size: 29rpx;
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .date {
    font-size: 24rpx;
    color: #999;
    margin: 10rpx 0;
    background-color: #f5f5f5;
    padding: 6rpx 12rpx;
    border-radius: 6rpx;
    display: inline-block;
  }

  .price-row {
    margin-top: 12rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
  }

  .current-price {
    color: #ff6b00;
    font-size: 32rpx;
    font-weight: bold;
  }

  .original-price {
    color: #999;
    font-size: 24rpx;
    text-decoration: line-through;
    margin-left: 10rpx;
  }

  .join-btn {
    background: linear-gradient(to right, #ff6b00, #ff8c00);
    color: #fff;
    font-size: 26rpx;
    padding: 10rpx 30rpx;
    border-radius: 8rpx;
  }

  .participants {
    font-size: 24rpx;
    color: #ff6b00;
    margin-top: 10rpx;
  }
}
</style>
