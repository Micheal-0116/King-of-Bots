//这里用来存储所有和pk相关的全局变量
export default {
    state: {
        status: "matching",  // matching表示匹配界面，playing表示对战界面
        socket: null, //链接
        opponent_username: "", //对手是谁
        opponent_photo: "",
        gamemap: null,
        a_id: 0,
        a_sx: 0,
        a_sy: 0,
        b_id: 0,
        b_sx: 0,
        b_sy: 0,
        gameObject: null, //当前这句游戏信息
        loser: "none",  // none、all、A、B
    },
    getters: {
    },
    mutations: {
        updateSocket(state, socket) { //当成功建立链接的时候 我们需要把这个链接的信息存到我们的全局变量里面
            state.socket = socket;
        },
        updateOpponent(state, opponent) {
            state.opponent_username = opponent.username;
            state.opponent_photo = opponent.photo;
        },
        updateStatus(state, status) {
            state.status = status;
        },
        updateGame(state, game) {
            state.gamemap = game.map;
            state.a_id = game.a_id;
            state.a_sx = game.a_sx;
            state.a_sy = game.a_sy;
            state.b_id = game.b_id;
            state.b_sx = game.b_sx;
            state.b_sy = game.b_sy;
        },
        updateGameObject(state, gameObject) {
            state.gameObject = gameObject;
        },
        updateLoser(state, loser) {
            state.loser = loser;
        }
    },
    actions: {
    },
    modules: {
    }
}
