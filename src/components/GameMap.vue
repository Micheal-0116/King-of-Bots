<template>
    <div ref="parent" class="gamemap">
        <canvas ref="canvas" tabindex="0"></canvas>
    </div>
</template>

<script>
import { GameMap } from "@/assets/scripts/GameMap";
import { ref, onMounted } from 'vue' //把画布引用进来， 
import { useStore } from "vuex";

//游戏画到canvas里面的 画布
export default {
    setup() {
        const store = useStore();
        let parent = ref(null); //一开始没有指向任何元素
        let canvas = ref(null);

        //当我们组件挂载完之后需要执行哪些函数
        onMounted(() => { //当组件被挂载的时候执行(页面打开的时候)
            store.commit(
                "updateGameObject",
                //需要创建 游戏地图对象
                new GameMap(canvas.value.getContext('2d'), parent.value, store)
            );
        });

        return { //这里返回之后，才能在上面 template里面用
            parent,
            canvas
        }
    }
}
</script>

<style scoped>
div.gamemap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
