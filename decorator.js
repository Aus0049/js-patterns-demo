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

// 抽象修饰者模式
// 上面那个例子是最简单的修饰者模式 
// 抽象修饰者实际上就是对修饰器的一个再封装
// 比如上面例子中 将Golden PlusScreen 和Disk 封装成一个修饰器 
// 就是新的修饰器：终极无敌装逼 iphoneWith128GPlusGolden版

function iPhone () {
    this.cost = function () {
        // 调用一个自身不存在的方法
        this.product();
        return 4999;
    }
}

// 抽象修饰器
function AbstractDecorator (decorated) {
    this.cost = function () {
        return decorated.cost() + 1000 + 1200 + 1500;
    }
}

// 具体修饰器
function ConcreteDecorator (decorated) {
    this.original = AbstractDecorator;
    this.original(decorated);

    decorated.product = function () {
        console.log("原厂iphone 改装。。。");
    }
}

var iphone = new iPhone();
var iphoneWith128GPlusGolden = new ConcreteDecorator(iphone);
iphoneWith128GPlusGolden.cost();
// 上面例子可以看到 将3个修饰器组装成了一个抽象修饰者 在其中完成修饰功能
// 然后新建一个具体修饰者类 将抽象修饰器赋值成一个属性 然后在具体修饰者中 仍可以添加方法
// 也就是iPhone中的this 和 抽象修饰器中的this指向了具体修饰器 所以具体修饰器中的方法 可以被被修饰者调用
// 就好像iPhone被mixin进了具体修饰者中 
// 这个例子的关键点在于this指向对象的变化

var tree = {};
tree.decorate = function () {
    console.log("Make sure the tree won't fall");
};

tree.getDecorator = function (deco) {
    tree[deco].prototype = this;
    return new tree[deco];
};

tree.BlueApples = function () {
    this.decorate = function () {
        this.BlueApples.prototype.decorate(); // 第1步：先执行原型的decorate方法，也就是tree.decorate()
        console.log('Put on some blue apples'); // 第2步 再输出blue
        // 将这2步作为BlueApples的decorate方法
    }
};

tree.Angel = function () {
    this.decorate = function () {
        this.Angel.prototype.decorate(); // 第4步：先执行原型（这时候是BlueApples了）的decorate方法
        console.log('An angel on the top'); // 第5步 再输出angel
        // 将这2步作为Angel的decorate方法
    }
};

tree.RedApples = function () {
    this.decorate = function () {
        this.RedApples.prototype.decorate(); // 第7步：先执行原型（这时候是Angel了）的decorate方法
        console.log('Add some red apples'); // 第8步 再输出 red
        // 将这2步作为RedApples的decorate方法
    }
};

tree = tree.getDecorator('BlueApples'); // 第3步：将BlueApples对象赋给tree，这时候父原型里的getDecorator依然可用
tree = tree.getDecorator('Angel'); // 第6步：将Angel对象赋给tree，这时候父原型的父原型里的getDecorator依然可用
tree = tree.getDecorator('RedApples'); // 第9步：将RedApples对象赋给tree

tree.decorate(); // 第10步：执行RedApples对象的decorate方法
//Make sure the tree won't fall
//Add blue apples
//An angel on the top
//Put on some red apples

// 这个例子比较复杂 
// 首先定义一个tree 是个空对象 
// 然后给tree添加两个方法
// 之后给tree添加三个修饰器方法 先不管
// 这时候的tree有两个方法 和 三个修饰器方法 
// 看调用tree 按照上面提示的方法来看
// 首先调用 getDecorator 方法 该方法将 tree[deco]（tree.BlueApples） 的prototype指向自身（tree）
// 这时候 tree.BlueApples 的原型prototype上就有了 decorate 和 getDecorator 两个方法
// 然后 new tree.BlueApples 执行 也就先报出 Make sure the tree won't fall
// 之后报出 Add blue apples
// 然后 return new tree[deco]; 将new出来的对象 return 出去 又赋值给tree
// 这时候 tree 其实就是tree.BlueApples 
// 其有一个 decorate 方法 原型上又有两个方法
// 这样 通过改变prototype 在没有继承的情况下 实现了向tree方法 添加属性
// 之后的步骤 道理其实一样
// 最后调用 tree.decorate() 其实是调用自身的的 decorate 而不是原型链上的decorate
// 该例子 就是用改变prototype的方法 向对象添加属性