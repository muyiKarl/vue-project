<template>
    <div class="login-page">
        <div class="login-box">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
                <el-form-item prop="username">
                    <el-input placeholder="请输入账号" v-model="loginForm.username" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" v-model="loginForm.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login('loginForm')">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        login(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('user/login', this.loginForm)
                        .then(() => {
                            this.$router.push({ path: '/home' })
                            this.loading = false
                            })
                        .catch(() => {
                            this.loading = false
                        })
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.login-page {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box {
        width: 100px;
        .el-form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>