// 代理模式
// 可以理解为有两个角色 代理和本体 
// 本体是你实际要执行的函数 代理则是一个对象 有他直接调用本体 任何请求都必须先经过代理 不能直接调用本体
// 这种可以理解为是一种保护代理 
// 举个例子 child是未成年人 其受其父母parents保护 
// child没有手机 任何人想联系child只能给他家里打电话 
// 而他家里的电话 则受parents管理
// 所以任何想联系child的电话 都会被parents过滤

// child 变量标记他是否在写作业 还可以跟小伙伴玩耍
var Ming = {
    doingHomework: true,
    play: function(partner) {
        console.log("我可以跟 " + partner + " 玩耍了");
    }
};

// parents 父母就相当于是child的代理 当孩子在写作业时不能跟找他的人玩
var parents = (function() {
    this.child = Ming;

    return function (call) {
        if(this.child.doingHomework){
            return "小明正写作业呢 不能出去玩";
        }

        // 小明写完作业了 可以跟你玩耍了 
        this.child.play(call);
    }
})();


// 小红想找小明玩
parents("小红");

// 小芳
parents("小芳");

// 小萌
parents("小萌");

// 小明很受女孩子欢迎啊！！！！

// 小明终于写完作业了
Ming.doingHomework = false;

// 小刚
parents("小刚");

// 上面是一种保护代理模式 其核心是拒绝请求 
// 下面介绍一种 虚拟代理 其核心是收集请求 其目的和保护代理模式一样 都是为了节约资源
// 生活中的虚拟代理模式也很常见 
// 比如长途客车 乘客并不是很多 
// 所以常常是人满发车 或者到达一定时间 人不满也发车
// React和Vue中也是用该种模式 比如你频繁更改state 他会将你的更改全部记录下来 到达一定条件 计算出最终的state应该是什么 在修改state
// 这样做 减少消耗 节约资源

// 长途客车的例子
function Bus () {
    this.passengers = [];
}
// 上车 要去秋名山的快上车
Bus.prototype.abord = function (passenger) {
    if(typeof passenger == "string"){
        this.passengers.push(passenger);
        return;
    }

    this.passengers = this.passengers.concat(passenger);
}
// 发车 秋名山上行人稀 老司机在此飙车
Bus.prototype.start = function(){
    console.log(this.passengers);
    console.log("走你┏ (゜ω゜)=☞");
    this.passengers = [];
}
// bus代理 帮助bus避开交警 选择合适的发车时机 
var BusProxy = function () {
    var bus = new Bus();
    var passengerQueue = [];
    var firstPassengerAbordTime;
    var timer;

    return function (passenger) {
        if(passengerQueue.length == 0){
            // 车上没人 快上车
            passengerQueue.push(passenger);
            firstPassengerAbordTime = new Date().getTime();
            timer = setTimeout(function(){
                // 第一个上车的人等不及了 人不满也发车
                bus.abord(passengerQueue);
                passengerQueue = [];
                bus.start();
                firstPassengerAbordTime = "";
                clearTimeout(timer);
            }, 2000);
        } else if(passengerQueue.length > 0 && passengerQueue.length < 3){
            // 人没满 先不发车
            passengerQueue.push(passenger);
            return;
        } else if ( passengerQueue.length == 3) {
            // 人满了 发车
            passengerQueue.push(passenger);
            bus.abord(passengerQueue);
            passengerQueue = [];
            bus.start();
            firstPassengerAbordTime = "";
            if (timer) clearTimeout(timer); timer = "";
        }
    }
}

var proxy = BusProxy();
proxy("小明");
proxy("小红");
proxy("小芳");
proxy("小刚");


proxy("静静");
proxy("明明");
setTimeout(function(){
    proxy("刚刚");
}, 2300);

// 还有一种 缓存代理 
// 就是当 本体是一纯函数 十分消耗性能 无论何时调用 输入相同的值 总有相同的返回结果 为了不浪性能 
// 将计算过的返回值和输入值保存起来 当下次直接调用相同值时 不需计算 直接返回结果
// 举个别人的例子

function fb(num){  //斐波那契函数,超级耗内存
    if(num<=1){
        return 1;
    }
    return num*fb(--num)
}
//缓存代理出场了
var cProxy = (function(){
    var cache = {};
    return function(num){
        if(cache[num]){
          console.log(`this is cache ${cache[num]}`);
            return cache[num];
        }
        return cache[num] = fb(num);
    }
})();

//测试
console.log(cProxy(4));  //24
cProxy(4);  //"this is cache 24"

// 上面例子 只要计算过 就无需在计算 直接返回缓存中的结果
