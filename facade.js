// 外观模式 
// 外观模式比较简单 
// 简单的说就是 用一个接口封装其他接口 
// 举个例子 麦当劳吃饭 麦当劳已经提供了几个套餐 套餐里面都是固定搭配 但是你也可以选择单点套餐里面的每一项
// 这里的套餐其实就是外观模式的应用 提供一套现成的固定的搭配 而不是现场一个个组合
// 代码实现

// 薯条
function FrenchFries () {
    this.name = "French fries";
}

// 可乐
function Cola () {
    this.name = "Cola";
}

// 鸡腿堡
function ChickenBurger () {
    this.name = "chicken burger";
}

// 牛肉堡
function BeefBurger () {
    this.name = "beef burger";
}

// 鸡堡套餐
function ChickenCombo () {
    return [new ChickenBurger(), new Cola(), new FrenchFries()];
}

// 牛堡套餐
function BeefCombo () {
    return [new BeefBurger(), new Cola(), new FrenchFries()];
}

// 当我们点一份套餐的时候 套餐对象自动new对应的对象 而不用我们一个个new
// 这就是外观模式 提供一套调用其他接口组合的接口
// 但是为啥叫外观模式？ 