<template>
  <div>
    <el-container>
      <SideMain></SideMain>
      <el-container direction="vertical">
        <TopHeader></TopHeader>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import TopHeader from "@/components/mainBox/TopHeader"
import SideMain from "@/components/mainBox/SideMain"
</script>