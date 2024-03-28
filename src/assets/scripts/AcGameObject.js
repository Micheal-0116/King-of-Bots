//所有的游戏对象都继承的一个基类
const AC_GAME_OBJECTS = []; //所有的游戏对象存到一个数组里面

export class AcGameObject { //引入的基类，需要输出出去
    constructor() { //构造函数
        AC_GAME_OBJECTS.push(this); //加到这个数组里面
        //实现游戏对象每秒钟刷新60次
        this.timedelta = 0;
        this.has_called_start = false; //当前对象有没有执行过
    }

    //游戏对象需要执行这样几个函数

    start() {  // 只执行一次，开始的时候执行
    }

    update() {  // 每一帧执行一次，除了第一帧之外

    }

    on_destroy() {  // 删除之前执行 删除之前可能会执行一些回调函数

    }

    destroy() { //删除对象。 从数组里面删掉即可
        this.on_destroy();

        for (let i in AC_GAME_OBJECTS) {
            const obj = AC_GAME_OBJECTS[i]; //把当前对象取出来
            if (obj === this) {
                AC_GAME_OBJECTS.splice(i); //删除一个对象
                break;
            }
        }
    }
}

let last_timestamp;  // 上一次执行的时刻
const step = timestamp => { //传入的是当前函数执行的时刻, step这个函数传入 timestamp这个参数
    for (let obj of AC_GAME_OBJECTS) {
        if (!obj.has_called_start) {
            obj.has_called_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step) //第一帧的时候遍历一下step函数.... 之后 下一帧再次调用实现每一帧执行
}

//前端浏览器的函数， 一般浏览器默认每秒钟刷新60次
requestAnimationFrame(step) //传一个回掉函数，(下一帧执行后 下一帧又会执行)该函数就会在每一帧都执行一次
