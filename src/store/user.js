import $ from 'jquery'

export default { //内存的话一刷新就消失了
    state: {
        id: "",
        username: "",
        photo: "",
        token: "",
        is_login: false,
        pulling_info: true,  // 当前是否正在从云端拉取信息(获取信息)
    },
    getters: {
    },
    mutations: { //用这里面的函数用 commit。 同步操作放mutations里面
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.is_login = user.is_login;
        },
        updateToken(state, token) { //更新token(令牌)函数
            state.token = token;
        },
        logout(state) { //登出就把它清空
            state.id = "";
            state.username = "";
            state.photo = "";
            state.token = "";
            state.is_login = false;
        },
        updatePullingInfo(state, pulling_info) {
            state.pulling_info = pulling_info;
        },
    },
    actions: {  //用这里面的函数 用dispatch。 异步操作只能放在actions里面
        login(context, data) {
            $.ajax({ 
                url: "http://127.0.0.1:3000/user/account/token/",
                type: "post",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        localStorage.setItem("jwt_token", resp.token); //它也是一个字典

                        //将我们的token令牌存到浏览器的一小块硬盘(localStorage)，登录状态可持久化
                        context.commit("updateToken", resp.token);
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                },
            });
        },
        //从云端获取信息
        getinfo(context, data) { //获取令牌
            $.ajax({
                url: "http://127.0.0.1:3000/user/account/info/",
                type: "get",
                //需要授权
                headers: {
                    Authorization: "Bearer " + context.state.token, //Authorization授权的意思
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        context.commit("updateUser", {
                            ...resp,
                            is_login: true,
                        });
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                },
            })
        },
        logout(context) {
            localStorage.removeItem("jwt_token"); //登出的时候将我们的内容删除即可
            context.commit("logout");
        }
    },
    modules: {
    }
}
