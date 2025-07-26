<template>
  <div class="user-management-container">
    <h1 class="page-title">用户管理</h1>
    <div class="actions">
      <el-button type="primary" @click="openAddDialog">添加用户</el-button>
    </div>
    <el-table :data="users" style="width: 100%" border>
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="employeeId" label="工号" width="120" />
      <el-table-column prop="phone" label="手机" width="150" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="openEditDialog(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteUser(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Add/Edit Dialog -->
    <el-dialog
      :title="isEdit ? '编辑用户' : '添加用户'"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleDialogClose"
    >
      <el-form :model="form" :rules="rules" ref="userForm" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="工号" prop="employeeId">
          <el-input v-model="form.employeeId" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// Mock data and random value generation
const users = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({
  id: null,
  name: '',
  employeeId: '',
  phone: '',
  address: '',
})
const userForm = ref(null)

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  employeeId: [{ required: true, message: '请输入工号', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^\d{11}$/, message: '请输入11位手机号码', trigger: 'blur' },
  ],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
}

// Generate random user data
function generateRandomUsers() {
  const names = ['张伟', '李娜', '王磊', '赵敏', '陈浩', '杨静', '刘洋']
  const addresses = ['北京市朝阳区', '上海市浦东新区', '广州市天河区', '深圳市南山区', '杭州市西湖区']
  users.value = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: names[Math.floor(Math.random() * names.length)],
    employeeId: `E${1000 + Math.floor(Math.random() * 9000)}`,
    phone: `13${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
    address: addresses[Math.floor(Math.random() * addresses.length)],
  }))
}

// Initialize data on mount
onMounted(() => {
  generateRandomUsers()
})

function openAddDialog() {
  isEdit.value = false
  form.value = { id: null, name: '', employeeId: '', phone: '', address: '' }
  dialogVisible.value = true
}

function openEditDialog(user) {
  isEdit.value = true
  form.value = { ...user }
  dialogVisible.value = true
}

function submitForm() {
  userForm.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        // Update user
        const index = users.value.findIndex((u) => u.id === form.value.id)
        if (index !== -1) {
          users.value[index] = { ...form.value }
          ElMessage.success('用户更新成功')
        }
      } else {
        // Add user
        users.value.push({
          ...form.value,
          id: users.value.length ? Math.max(...users.value.map((u) => u.id)) + 1 : 1,
        })
        ElMessage.success('用户添加成功')
      }
      dialogVisible.value = false
    }
  })
}

function deleteUser(id) {
  users.value = users.value.filter((u) => u.id !== id)
  ElMessage.success('用户删除成功')
}

function handleDialogClose(done) {
  userForm.value.resetFields()
  done()
}
</script>

<style lang="scss" scoped>
@use 'sass:color';

$primary-color: #3b82f6;
$secondary-color: #1e293b;
$background-color: #f1f5f9;

.user-management-container {
  padding: 20px;
  background-color: $background-color;
  min-height: 100%;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: $secondary-color;
  margin-bottom: 20px;
  text-align: center;
}

.actions {
  margin-bottom: 20px;
  text-align: right;
}

.el-table {
  border-radius: 8px;
  background: linear-gradient(135deg, #ffffff, color.adjust($background-color, $lightness: -2%));
}

.el-button--primary {
  background-color: $primary-color;
  border-color: $primary-color;
  &:hover {
    background-color: color.adjust($primary-color, $lightness: -10%);
    border-color: color.adjust($primary-color, $lightness: -10%);
  }
}

.el-button--danger {
  background-color: #ef4444;
  border-color: #ef4444;
  &:hover {
    background-color: color.adjust(#ef4444, $lightness: -10%);
    border-color: color.adjust(#ef4444, $lightness: -10%);
  }
}
</style>