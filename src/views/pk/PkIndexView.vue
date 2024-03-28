<template>
    <PlayGround v-if="$store.state.pk.status === 'playing'" />
    <MatchGround v-if="$store.state.pk.status === 'matching'" />
    <ResultBoard v-if="$store.state.pk.loser != 'none'" />
</template>

<script>
import PlayGround from '../../components/PlayGround.vue'
import MatchGround from '../../components/MatchGround.vue'
import ResultBoard from '../../components/ResultBoard.vue'
import { onMounted, onUnmounted } from 'vue' //当组件被挂载的时候执行的函数，当组件不被挂载的时候执行的函数
import { useStore } from 'vuex' //导入我们的全局变量

export default {
    components: {
        PlayGround,
        MatchGround,
        ResultBoard,
    },
    setup() {
        const store = useStore(); //把我们的全局变量取出来

        //这里传过去token 是要进行jwt验证，如果传id 那么前端玩家就会作弊 使用其它人的id进行对战
        const socketUrl = `ws://127.0.0.1:3000/websocket/${store.state.user.token}/`;

        store.commit("updateLoser", "none");
        store.commit("updateIsRecord", false);

        let socket = null;
        onMounted(() => { //当当前组件被挂载的时候我们需要建立一个链接， 也就是当前页面打开的时候执行
            store.commit("updateOpponent", {
                username: "我的对手",
                photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
            })
            socket = new WebSocket(socketUrl); //这里这个WebSocket是js自带的类

            socket.onopen = () => {
                console.log("connected!");
                store.commit("updateSocket", socket);
            }

            socket.onmessage = msg => { //传过来的数据放到data里面
                const data = JSON.parse(msg.data);
                if (data.event === "start-matching") {  // 匹配成功
                    store.commit("updateOpponent", {
                        username: data.opponent_username,
                        photo: data.opponent_photo,
                    });
                    setTimeout(() => {
                        store.commit("updateStatus", "playing");
                    }, 200); //匹配时间200毫秒
                    store.commit("updateGame", data.game);
                } else if (data.event === "move") {
                    console.log(data);
                    const game = store.state.pk.gameObject; //把我们的地图对局 取出来
                    const [snake0, snake1] = game.snakes; //蛇取出来，snake0为第0个元素， snake1为第1个元素

                    //这个时候就获取了两条蛇的移动方向
                    snake0.set_direction(data.a_direction);
                    snake1.set_direction(data.b_direction);
                } else if (data.event === "result") {
                    console.log(data);
                    const game = store.state.pk.gameObject;
                    const [snake0, snake1] = game.snakes;

                    if (data.loser === "all" || data.loser === "A") {
                        snake0.status = "die";
                    }
                    if (data.loser === "all" || data.loser === "B") {
                        snake1.status = "die";
                    }
                    store.commit("updateLoser", data.loser);
                }
            }

            socket.onclose = () => {
                console.log("disconnected!");
            }
        });

        onUnmounted(() => { //当当前页面关闭的时候 关闭链接
            socket.close(); //这边不关的话 每打开一次pk页面就会产生一次链接(旧链接不关闭)，会产生很多冗余链接
            store.commit("updateStatus", "matching");
        })
    }
}
</script>

<style scoped>
</style>
