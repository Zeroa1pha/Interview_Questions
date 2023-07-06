<template>
    <div class="container">
        <el-card class="box-card">
            <el-text class="mx-1 loginRemind" type="success">用户名和密码随便填，不为空就行</el-text>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon label-width="80px" class="loginBox">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)" class="loginBtn">登录</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script lang='ts' setup>
import { ref, reactive, toRefs } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
    password: '',
    userName: '',
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            router.push('/service')
        } else {
            console.log('error submit!')
            return false
        }
    })
}



const validateUserName = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else {
        if (ruleForm.userName !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePassWord = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
const rules = reactive<FormRules<typeof ruleForm>>({
    userName: [{ validator: validateUserName, trigger: 'blur' }],
    password: [{ validator: validatePassWord, trigger: 'blur' }],
})
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box-card {
    margin-top: 25vh;
    width: 400px;
    height: 300px;
}

.loginBox {
    margin-top: 50px;
}

.loginBtn {
    margin-top: 30px;
    margin-left: 150px;
}

.loginRemind{
    position: relative;
    left: 70px;
    top: 20px;
}
</style>