<template>
  <el-card shadow="hover">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
      inline
    >
      <el-form-item label="用户名" prop="name">
        <el-input
          v-model="ruleForm.name"
          style="width: 300px"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="ruleForm.phone"
          style="width: 300px"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
          <el-option label="全部" value="-0" />
        </el-select>
      </el-form-item>
      <el-form-item label="vip等级" prop="level">
        <el-select v-model="ruleForm.level" placeholder="请选择vip等级">
          <el-option label="全部" value="-1" />
          <el-option label="svip" value="SVIP" />
          <el-option label="vip" value="VIP" />
        </el-select>
      </el-form-item>
      <el-form-item label="注册时间" prop="timeInterval">
        <el-date-picker
          v-model="ruleForm.timeInterval"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD+HH:mm:ss"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" type="primary" @click="searchClick"
          >搜索</el-button
        >
        <el-button :icon="Delete">刷新</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="m-t-20" shadow="hover">
    <div class="flex-between">
      <div>
        <el-button type="primary" :icon="Plus">新增</el-button>
        <el-button type="primary" plain :icon="Upload">导入</el-button>
        <el-button type="primary" plain :icon="Download">导出</el-button>
        <el-button type="danger" plain :icon="Delete" disabled
          >批量删除</el-button
        >
      </div>
      <el-space>
        <el-icon title="刷新表格" size="20px"><Refresh /></el-icon>
        <el-icon title="列设置" size="20px"><Setting /></el-icon>
      </el-space>
    </div>
    <el-table :data="normalList" border class="m-t-20">
      <el-table-column type="selection" width="80" align="center" />
      <el-table-column prop="id" label="UserId" align="center" />
      <el-table-column prop="name" label="用户名" fixed="left" align="center" />
      <el-table-column label="头像" align="center">
        <template #default="{ row }">
          <el-avatar
            :src="row.avatar"
            :preview-src-list="[row.avatar]"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
        width="120px"
      />
      <el-table-column prop="sex" label="性别" align="center">
        <template #default="{ row }">
          <div>{{ row.sex ? "男" : "女" }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="VIP等级" align="center" />
      <el-table-column prop="account" label="账户余额" align="center" />
      <el-table-column label="在线状态" align="center">
        <template #default="{ row }">
          <div>
            <el-tag type="info" v-if="row.onlineStatus === 0">离线</el-tag>
            <el-tag type="success" v-else>在线</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="主播认证" align="center">
        <template #default="{ row }">
          <el-tag type="success" v-if="row.authStatus === 1">已认证</el-tag>
          <el-tag type="info" v-else>未认证</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="注册时间"
        align="center"
        width="160px"
      />
      <el-table-column prop="status" label="状态" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.status" />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="240px" align="center">
        <template #default="{ row, index }">
          <el-space>
            <el-button :icon="Edit" plain type="primary" text>编辑</el-button>
            <el-button :icon="Delete" plain type="primary" text>删除</el-button>
            <el-button :icon="View" plain type="primary" text>详情</el-button>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15]"
      layout="->, total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="getNormalList"
      @current-change="getNormalList"
      class="m-t-20"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance } from "element-plus";
import {
  Search,
  Delete,
  Plus,
  Upload,
  Download,
  Edit,
  View,
} from "@element-plus/icons-vue";
import { reqNormalList } from "@/api/user/normal";
import type { INormalListType } from "@/api/user/types";

interface RuleForm {
  name?: string;
  phone?: string;
  sex?: string;
  level?: string;
  timeInterval?: any;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = ref<RuleForm>({});

// 搜索
const searchClick = () => {
  console.log(ruleForm.value);
  getNormalList();
  ruleFormRef.value!.resetFields()
};

const pageSize = ref(10);
const page = ref(1);
// 普通用户列表
const normalList = ref<INormalListType[]>([]);
// 总条数
const total = ref<number>();
// 获取普通用户列表
const getNormalList = async () => {
  try {
    let res = await reqNormalList(page.value, pageSize.value, ruleForm.value);
    if (res.code === 200) {
      normalList.value = res.data.list;
      total.value = res.data.total;
    }
  } catch (error) {
    console.log(error);
  }
};

// 初始化获取列表
onMounted(() => {
  getNormalList();
});
</script>

<style scoped>
.el-button.is-text {
  padding: 5px;
}
</style>
