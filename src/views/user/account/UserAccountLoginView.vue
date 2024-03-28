<template>
    <ContentField v-if = "show_content">
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
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
import { useStore } from 'vuex'
import { ref } from 'vue'
import router from '../../../router/index'

export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_message = ref('');
        let show_content = ref(false); //默认不让登录页面展示，否则刷新的时候会跳一下

        //这里是帮助判断，我们用户在访问的时候有没有将我们的token(令牌)存入我们的浏览器，如果有放行
        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) { //如果存在我们就把它存下来
            store.commit("updateToken", jwt_token); //将user.js更新token函数取出来，将token更新到我们的内存中

            store.dispatch("getinfo", { //从云端请求一下用户信息
                success() { //可以请求表示 token是有效的

                    router.push({ name: "home" });//成功直接跳转到首页
                    store.commit("updatePullingInfo", false);
                },
                error() {
                    store.commit("updatePullingInfo", false);// 从云端请求信息失败了或者(拉取结束了)，这时候展示登录页面
                    show_content.value = true; //请求token失败了，就把登录页面展示出来
                }
            })
        } else {
            store.commit("updatePullingInfo", false); //当前不在获取信息当中，垃取结束

            show_content.value = true;//就展示登录页面
        }

        const login = () => {
            error_message.value = "";
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    store.dispatch("getinfo", {
                        success() {
                            router.push({ name: 'home' });
                        }
                    })
                },
                error() {
                    error_message.value = "用户名或密码错误";
                }
            })
        }

        return {
            username,
            password,
            error_message,
            login,
            show_content,
        }
    }
}
</script>

<style scoped>
button {
    width: 100%;
}
div.error-message {
    color: red;
}
</style>
