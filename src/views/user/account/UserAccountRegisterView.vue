<template>
    <ContentField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <div class="mb-3">
                        <label for="confirmedPassword" class="form-label">确认密码</label>
                        <input v-model="confirmedPassword" type="password" class="form-control" id="confirmedPassword" placeholder="请再次输入密码">
                    </div>
                    <div class="error-message">{{ error_message }}</div>
                    <button type="submit" class="btn btn-primary">提交</button>
                </form>
            </div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from '../../../components/ContentField.vue'
import { ref } from 'vue'
import router from '../../../router/index' //这里export default 就不需要加括号
import $ from 'jquery'

export default { //如果export的是defaul我们就可以任意取名 不加括号，如果不是default就得加上大括号名称不能变
    components: {
        ContentField
    },

    setup() {
        let username = ref('');
        let password = ref('');
        let confirmedPassword = ref[''];
        let error_message = ref('');

        const register= () => { //变量不会重新赋值就用const，可能赋值就用let
            $.ajax({ //访问一下我们的后端api
                url: "http://127.0.0.1:3000/user/account/register/", //访问一下我们的后端api
                type: "post", //post请求，一般会修改数据库用post，不会修改用get
                data: {
                    username: username.value,
                    password: password.value,
                    confirmedPassword: confirmedPassword.value,
                },
                success(resp) {
                    if (resp.error_message === "success") { //登录成功，直接跳转到登录页面
                        router.push({name: "user_account_login"});//user_account_login 是我们自己写的在router里面
                    }
                    else {
                        error_message.value = resp.error_message; //将错误的信息显示出来
                    }
                },
            });
        }
        return {
            username,
            password,
            confirmedPassword,
            error_message,
            register,
        }
    }
}
</script>

<style scoped>
button {
    width: 100%;
}
error-message {
    color: red;
}
</style>
