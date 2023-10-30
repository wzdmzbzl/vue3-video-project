<template>
  <div>
    <el-card shadow="hover">
      <div class="home-container">
        <el-avatar :size="60" :src="userStore.userInfo?.avatar" />
        <div class="home-container-content">
          <span class="content-title"
            >{{ timeFix() }} {{ userStore.userInfo?.name }},
            {{ welcome() }}</span
          >
          <span class="content-small">视频直播后台管理系统</span>
        </div>
      </div>
    </el-card>

    <div class="welcome">
      <SvgIcon name="welcome" size="400px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { timeFix, welcome } from "@/utils";

const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  .home-container-content {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 20px;
    .content-title {
      font-weight: 700;
      font-size: 24px;
    }
    .content-small {
      color: #aaa;
    }
  }

  .welcome {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
