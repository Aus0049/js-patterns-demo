// 装饰者模式
// 其可用来透明的吧对象包装在具有同样接口的另一个对象中。
// 这样 你可以给一个方法添加一些行为 然后将方法调用传递给原始对象。
// 相比于继承 这是一个更好地选择

// 举个例子
// 买iPhone时，土豪们觉得标准配置不够，一定要让别人知道我的iphone比你的贵 这样才够装逼
// 这样的话 就要对标准的iphone加配置 生成新的iphone
// 但是如果把新的iphone看成一个子类的话 我们会有大量的子类需要维护 因为可选择的配置很多
// 这样我们可以使用修饰者模式 
// 通过把原始对象传给修饰器中 动态改变其属性 甚至重写方法 但是不变实现继承

function iPhone () {
    this.cost = function () {
        return 4999;
    }
}

// iPhone可以更改配置 更加狂拽酷炫叼咋天 但是要加钱
// 土豪金配色 改个颜色就要1000
function Golden (iphone) {
    this.cost = function () {
        return iphone.cost() + 1000;
    }
}

// plus屏幕
function PlusScreen (iphone) {
    this.cost = function () {
        return iphone.cost() + 1500;
    }
}

// 128G更大的内存 要这么大干什么用？
function Disk (iphone) {
    this.cost = function () {
        return iphone.cost() + 1200;
    }
}

// 先买一个iphone
var iphone = new iPhone();
// 加配置 如同煎饼果子加鸡蛋 加火腿那么简单了
iphone = new Disk(new PlusScreen(new Golden(iphone)));

iphone.cost(); // 8699 我的天( ⊙ o ⊙ )啊！

// 以上就是一个最简单的修饰者模式 
// 当我们要给某个类添加属性和方法时 不变实现继承
// 这样 3个修饰器 可以生成 3! + 1 = 7种类
// 按照继承的做法 我们需要定义6个子类 
// 但是现在我们只要3个修饰器 大大提高效率