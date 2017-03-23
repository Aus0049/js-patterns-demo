// 享元模式
// 可以理解为 共享原件模式
// 其核心是 当需要创建大量对象 并且每个对象都有很多相似点 少部分不同的时候 
// 对其相似点抽象成对象 
// 这样只需创建一次该对象 在创建都是其引用
// 这样节省了大量内存
// 关键在于js对象传递时 传递的是其引用 而不是拷贝 （创建快捷方式 而不是 复制）

// 官方定义
// 享元模式可以避免大量非常相似类的开销，在程序设计中，有时需要生产大量细粒度的类实例来表示数据，
// 如果能发现这些实例除了几个参数以外，开销基本相同的 话，就可以大幅度较少需要实例化的类的数量。
// 如果能把那些参数移动到类实例的外面，在方法调用的时候将他们传递进来，就可以通过共享大幅度第减少单个实例 的数目。

// 实例有两种 
// 数据层使用

// 比如苹果每年都要生成大量Mac电脑
// step 1 未使用享元模式
// Mac的关键属性如 大小 内存 CPU 均有不同
function Mac (size, CPU, memory, SN) {
    this.size = size;
    this.CPU = CPU;
    this.memory = memory;
    this.SN = SN;
} 

var MacList = [];

for (var i = 0; i < 1000000; i++) {
    var size = Math.radom() > 0.5 ? 15 : 13;
    var memory = i % 2 == 0 ? 8 : 16;
    MacList.push(new Mac(size, "AMD", memory, i));
}

// 这样创建的一百万个Mac 每个mac都是独立的内存地址 十分耗费性能

// step 2 使用享元模式
// 经过发现 同型号（完全相同）的mac 只有SN不同 
// 这样完全可以将同型号的mac指向同一个内存地址 这样得到的结果仍与现在相同 但是可以大大减少内存消耗
function MacFlyweight (size, CPU, memory) {
    this.size = size;
    this.CPU = CPU;
    this.memory = memory;
} 
// 将可以享元的部分 抽象成一个对象

// 在需要一个工厂 来保存创建的享元对象 当再次需要已创建的对象时 返回其引用
var flyweightFactory = (function () {
    var macs = {};
    return {
        create: function (size, CPU, memory) {
            var key = size + CPU + memory;
            if (!macs[key]) {
                macs[key] = new MacFlyweight(size, CPU, memory);
            }
            return macs[key];
        }
    };
})();

function Mac(size, CPU, memory, SN) {
    this.flyweight = flyweightFactory.create(model, screen, memory);
    this.SN = SN;
}

var MacList = [];

for (var i = 0; i < 1000000; i++) {
    var size = Math.radom() > 0.5 ? 15 : 13;
    var memory = i % 2 == 0 ? 8 : 16;
    MacList.push(new Mac(size, "AMD", memory, i));
}

// 这样结果依然与上述一样 但是减小了内存消耗
// 要注意的是 这样做有个后果 就是相同的 MacFlyweight 其实是同一个对象 改变一个享元对象 其他对象的享元都会跟着变