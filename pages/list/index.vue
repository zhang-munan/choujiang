<template>
  <view class="lottery-list-page">
    <z-paging
      ref="paging"
      v-model="dataList"
      @query="queryList"
      refresher-theme-style="white"
			safe-area-inset-bottom
			use-safe-area-placeholder
    >
      <template #top>
        <!-- 顶部导航栏 -->
        <view
          class="header"
          :style="{
            paddingTop: statusBarHeight + menuButtonInfo.height + 'px',
          }"
        >
          <view class=""></view>
        </view>
        <!-- 中奖提示条 -->
        <view class="winner-banner" v-if="winnerBannerShow">
          <view class="winner-banner__inner">
            <view class="winner-banner__icon">
              <image src="/static/zhong.png" mode="scaleToFill" />
            </view>
            <view class="winner-banner__text">恭喜你抽中了{{ "一等奖" }}!</view>
          </view>
        </view>
      </template>

      <!-- 抽奖列表 -->
      <view class="lottery-list">
        <view
          class="lottery-item"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <image class="product-img" :src="item.image" mode="scaleToFill" />
          <view class="item-content">
            <view>
              <view class="item-title">{{ item.title }}</view>
              <view class="date">{{ item.desc }}</view>
            </view>
            <view class="price-row">
              <text class="participants"
                >{{ this.userList.length || 0 }}人已参与</text
              >
              <template v-if="item.status === 2">
                <view
                  class="join-btn"
                  :class="{ grey: item.status === 2 }"
                  @tap="handleResult(item)"
                  >查看结果</view
                >
              </template>
              <template v-else>
                <view class="join-btn" @tap="handleJoin(item)">立即抽奖</view>
              </template>
            </view>
          </view>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script>
const db = uniCloud.database();
const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
export default {
  data() {
    return {
      statusBarHeight: 0,
      dataList: [],
      menuButtonInfo: {},
      winnerBannerShow: false,
      userList: [],
    };
  },
  mounted() {
    // 获取用户信息
    this.getUserInfo();
    // 获取状态栏高度
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    // 获取菜单按钮信息
    this.menuButtonInfo = menuButtonInfo;
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      db.collection("user")
        .limit(1000)
        .get()
        .then(({ result: { data } }) => {
          this.userList = data;
        });
    },
    login() {
      // uni.login({
      //   success: ({ code }) => {
      //     console.log("登录成功", code);
      //     uniCloud
      //       .callFunction({
      //         name: "login",
      //         data: {
      //           code: code,
      //         },
      //       })
      //       .then((res) => {
      //         console.log(res.result.openid);
      //         //这里就是拿到用户的openid啦
      //       });
      //   },
      // });
    },
    handleResult(item) {
      // 处理查看结果逻辑
      console.log("查看结果:", item);
    },
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
  background: linear-gradient(to bottom, #ff8009 0%, #fff9f0 40%, #fff9f2 100%);
  min-height: 100vh;
}
.header {
  padding: 40rpx 30rpx;
  position: relative;
}

.winner-banner {
  padding: 10rpx 20rpx;

  .winner-banner__inner {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
    border-radius: 12rpx;
    padding: 10rpx 20rpx;

    .winner-banner__icon {
      width: 150rpx;
      height: 70rpx;
      margin-right: 20rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .winner-banner__text {
      font-size: 28rpx;
      color: #333;
    }
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
    padding: 12rpx 35rpx;
    border-radius: 6rpx;

    &.grey {
      background: #b1b1b1 !important;
      color: #fff;
    }
  }

  .participants {
    font-size: 24rpx;
    color: #ff6b00;
    margin-top: 10rpx;
  }
}
</style>
