// 工厂模式
// 工厂模式也是常用的设计模式之一
// 其还分为简单工厂模式和抽象工厂模式

// 简单工厂模式

// 简单工厂模式是由一个方法来决定到底要创建哪个类的实例, 而这些实例经常都拥有相同的接口. 这种模式主要用在所实例化的类型在编译期并不能确定， 而是在执行期决定的情况

// 举个例子
// 公司的饮水机在装上了桶装水（初始化）后 并不知道他会出什么样的水 具体是热水还是还是冷水 需要你按下按钮（调用）时才会返回结果

function water (description) {
    this.description = description || "cold";
}

function DrinkingFountains () {}

DrinkingFountains.prototype.boilWater = function () {
    return new water("boilingWater");
}

DrinkingFountains.prototype.frozenWater = function () {
    return new water("iceWater");
}

DrinkingFountains.prototype.giveMeFuckingWater = function(type) {
    
    if("hot" === type){
        return this.boilWater();
    } else if ("cold" === type) {
        return this.frozenWater();
    }
}

var drinkingFountains = new DrinkingFountains();
var waterOfMine = drinkingFountains.giveMeFuckingWater("hot");

console.log(waterOfMine);// boilingWater

// 简单工厂模式 如上所述 实际上就是根据不同指令 return不同的结果 核心就是包裹一段if else分支成方法
// 在实际中 用到很多工厂模式 比如react中 根据state不同 return不同的dom 这就属于工厂模式

// 抽象工厂模式
// 可以理解为定义一个抽象工厂 该工厂根据不同指令生产处不同的具体工厂 每个工厂生产处不同的产品

// 接上面的例子 公司现在需要咖啡机 咖啡机可以生产热咖啡和冷咖啡
function CoffeeMachine () {}

CoffeeMachine.prototype.mochaCoffceIsGood = function () {
    return new water("mochaCoffce");
}

CoffeeMachine.prototype.latteCoffeeIsCool = function () {
    return new water("latteCoffee");
}

CoffeeMachine.prototype.giveMeFuckingWater = function(type) {
    
    if("mocha" === type){
        return this.mochaCoffceIsGood();
    } else if ("latte" === type) {
        return this.latteCoffeeIsCool();
    }
}

// 定义一个抽象工厂 根据顾客需要生产咖啡机还是饮水机
var AbstractFactory = (function () {

    this.types = {};

    return {
        getFactory: function (type, customizations) {
            var Factory = types[type];

            if(!Factory){
                return undefined;
            }

            var factory = new Factory();

            return factory.giveMeFuckingWater(customizations);
        },
        registerFactory: function (type, Factory) {
            var proto = Factory.prototype;

            types[type] = Factory;

            return AbstractFactory;
        }
    };
})();

// 向工厂中添加可生产的种类
AbstractFactory.registerFactory("coffee", CoffeeMachine);
AbstractFactory.registerFactory("water", DrinkingFountains);

// 使用抽象工厂生产处产品
AbstractFactory.getFactory("coffee", "mocha");// water {description: "mochaCoffce"}
AbstractFactory.getFactory("water", "cold");// water {description: "iceWater"}

// 可以看到使用抽象工厂可以很方便得到想要的东西 
// 抽象工厂模式除了具有工厂方法模式的优点外，最主要的优点就是可以在类的内部对产品族进行约束。
// 所谓的产品族，一般或多或少的都存在一定的关联，抽象工厂模式就可以在类内部对产品族的关联关系进行定义和描述，
// 而不必专门引入一个新的类来进行管理。
// 抽象工厂的缺点：
// 产品族的扩展将是一件十分费力的事情，假如产品族中需要增加一个新的产品，
// 则几乎所有的工厂类都需要进行修改。所以使用抽象工厂模式时，对产品等级结构的划分是非常重要的。

// 工厂模式在一些框架开发中很常见 比如react源码中关于virtual dom中的一段就是使用了工厂模式
// 源码就不附了




