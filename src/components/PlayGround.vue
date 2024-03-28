<template> 
   <div class = "playground">
       <GameMap />
   </div>
</template>

<script>
import GameMap  from './GameMap.vue'

export default {
    components: {
        GameMap,
    }
}
//vw百分之69的浏览器宽带, auto左右两边居中
</script>

<style scoped>
div.playground {
    width: 60vw;  
    height: 70vh;
    margin: 40px auto;
}
</style>