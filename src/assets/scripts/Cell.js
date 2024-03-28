//我们画布的坐标是 x y 直角坐标系
//但是传过来的是行数 列数 因此需要一个变换
export class Cell { //蛇里的一个格子元素,由圆圈构成
    constructor (r, c) {
        this.r = r;
        this.c = c;
        this.x = c + 0.5; //格子左上角坐标(x, y) 格子中心坐标即位(x + 0.5, y + 0.5)
        this.y = r + 0.5; //这里是相对距离，用的时候要换成绝对距离
    }
}