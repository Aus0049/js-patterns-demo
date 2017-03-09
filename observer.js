// 观察者模式/发布者订阅者模式

// 这个算是js中常见的设计模式了 react中的state数据存储和使用 就是这种模式
// 还有监听事件 监听某个事件 当事件发生时 执行回调函数

// 在生活中 好莱坞有句台词可以来形容这个模式 --不要给我打电话 我会给你打电话 、
// 现在手机app的推送消息也可以理解为这种模式

// 这种模式实现也很简单
// 发布者维护一个数组 用以保存订阅者对象的回调函数
// 发布者有一个注册订阅者和取消订阅的方法 最后再有一个发布消息的方法即可

// 代码实现

// 发布者维护一个对象 对象的key是事件名称 value是{}, 每个订阅者的回调函数
function EventEmitter (){
    this.events = {};
}

// 发布者的订阅方法
EventEmitter.prototype.subscribe = function(event, key, callBack){
    if(!this.events[event]){
        // 还没有人订阅过这个事件 初始化存放回调函数的数据
        this.events[event] = {};
    }
    // 添加回调函数
    this.events[event][key] = callBack;
}

// 取消订阅方法
EventEmitter.prototype.unSubscribe = function(event, key){
    if(this.events[event] && this.events[event][key]){
        delete this.events[event][key];
    }
}

// 发布者发布事件的方法
EventEmitter.prototype.dispatch = function(event, data){
    // 没人订阅你发个毛线
    if(!this.events) return;
    for(var key in this.events[event]){
        // console.log("-------------");
        // console.log(key);
        // console.log(this.events[event][key]);
        this.events[event][key](data);
    }
}

// 上面就是一个简单的发布者订阅者模式
// 下面举例使用例子
// 我们去餐馆吃饭 坐在位子上跟服务员点菜
// 服务员在单子上写下几号座点了什么菜 
// 做好了菜服务员会端菜上来 并在菜单上划掉上的菜
// 这里服务员就是发布者 顾客就是订阅者

// 创建个服务员
var waiter = new EventEmitter();

// 一号桌点了一份宫保鸡丁。。
waiter.subscribe("宫保鸡丁", "1号桌", function(data){
    console.log("1号桌的" + data + "上完了");
    // 在菜单上划掉这一项
    waiter.unSubscribe("宫保鸡丁", "1号桌");
});

// 二号桌点了猪肉炖粉条
waiter.subscribe("猪肉炖粉条", "2号桌", function(data){
    console.log("2号桌的" + data + "上完了");
    waiter.unSubscribe("猪肉炖粉条", "2号桌");
});

// 上菜了 
console.log("宫保鸡丁上菜了");
waiter.dispatch("宫保鸡丁" , "大盘宫保鸡丁");

// 二号桌又点了宫保鸡丁
waiter.subscribe("宫保鸡丁", "2号桌", function(data){
    console.log("2号桌的" + data + "上完了");
    waiter.unSubscribe("宫保鸡丁", "2号桌");
});

// 猪肉炖粉条上了
console.log("猪肉炖粉条上菜了");
waiter.dispatch("猪肉炖粉条" , "猪肉炖粉条");

// 宫保鸡丁上菜
console.log("宫保鸡丁上菜了");
waiter.dispatch("宫保鸡丁" , "小盘宫保鸡丁");
 

