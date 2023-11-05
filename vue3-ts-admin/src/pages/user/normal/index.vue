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
        <el-button :icon="Delete" @click="refreshClick">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="m-t-20" shadow="hover">
    <div class="flex-between">
      <div>
        <el-button type="primary" :icon="Plus" @click="drawer = true"
          >新增</el-button
        >
        <el-button type="primary" plain :icon="Upload" @click="importClick"
          >导入</el-button
        >
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
        <template>
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

  <!-- 添加用户抽屉 -->
  <el-drawer v-model="drawer" :title="title" size="400px">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="100"
      :rules="rules"
      ref="formInlineRef"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="formInline.username"
          placeholder="请填写用户名"
          clearable
        />
      </el-form-item>
      <el-form-item label="用户头像" prop="userAvatar">
        <el-upload
          class="avatar-uploader"
          :action="url"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="formInline.userAvatar"
            :src="formInline.userAvatar"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机号" prop="usePhone">
        <el-input
          v-model="formInline.usePhone"
          placeholder="请填写手机号"
          clearable
        />
      </el-form-item>
      <el-form-item label="性别" prop="useSex">
        <el-select v-model="formInline.useSex" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
          <el-option label="全部" value="-0" />
        </el-select>
      </el-form-item>
      <el-form-item label="vip等级" prop="useLevel">
        <el-select v-model="formInline.useLevel" placeholder="请选择vip等级">
          <el-option label="全部" value="-1" />
          <el-option label="svip" value="SVIP" />
          <el-option label="vip" value="VIP" />
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left: 180px">
        <el-button @click="resetForm(formInlineRef)">取消</el-button>
        <el-button type="primary" @click="submitSave(formInlineRef)"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
  <importExcel ref="importDialog"></importExcel>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance, UploadProps, FormRules } from "element-plus";
import {
  Search,
  Delete,
  Plus,
  Upload,
  Download,
  Edit,
  View,
} from "@element-plus/icons-vue";
import { reqNormalList, reqSaveUser, downLoadExcelTemp, ImportUserInfo } from "@/api/user/normal";
import type { INormalListType } from "@/api/user/types";
import type { RuleForm } from "./types";
import importExcel from "./components/ImportExcel.vue";
// 上传头像地址
const url = `https://mock.apifox.cn/m1/2869156-0-default/admin/file/upload/img`;
// 上传组件实例
const importDialog = ref()
// 导入
const importClick = () => {
  let params = {
    title: '添加用户',
    normalList: normalList.value,
    tempApi: downLoadExcelTemp, // 导出请求
    importApi: ImportUserInfo, // 导入请求接口
  }
  importDialog.value.acceptParams(params)
};
// 表单实例
const ruleFormRef = ref<FormInstance>();
const formInlineRef = ref<FormInstance>();
// 表单参数
const ruleForm = ref<RuleForm>({});
// 控制抽屉
const drawer = ref(false);
// 抽屉标题
const title = ref<string>("添加用户");
// 抽屉表单参数
const formInline = ref({
  username: "",
  userAvatar: "",
  usePhone: "",
  useSex: "",
  useLevel: "",
});
// 表单校验
const rules = ref<FormRules<any>>({
  username: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
  usePhone: [{ required: true, message: "请输入用户手机号", trigger: "blur" }],
  userAvatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});

// 确认添加
const submitSave = async (formEl: FormInstance | undefined) => {
  try {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        await reqSaveUser(formInline.value);
        resetForm(formInlineRef.value);
      } else {
        console.log("error submit!", fields);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
// 取消添加
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  drawer.value = false;
};
// 上传头像
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  console.log(response);
  formInline.value.userAvatar = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
// 搜索
const searchClick = () => {
  getNormalList();
  ruleFormRef.value!.resetFields();
};

// 刷新
const refreshClick = () => {
  pageSize.value = 10;
  page.value = 1;
  ruleFormRef.value!.resetFields();
  getNormalList();
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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader {
  border: 1px dashed #aaa;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
