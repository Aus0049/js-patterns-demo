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

function drinkingFountainsFactory () {}

drinkingFountainsFactory.prototype.boilWater = function () {
    return new water("boilingWater");
}

drinkingFountainsFactory.prototype.giveMeFuckingWater = function(type) {
    
    if("hot" === type){
        return this.boilWater();
    }
    
    return new water("cold");
}

var drinkingFountains = new drinkingFountainsFactory();
var waterOfMine = drinkingFountains.giveMeFuckingWater("hot");

console.log(waterOfMine);// boilingWater