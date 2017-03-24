// 单例模式
// 无论多少次初始化 或者使用某个函数 始终只有一个实例
// 一般处理
function createMask() {
    if($(".mask")[0],length > 0){
        // 如果有mask 不作处理
        return ;
    } 

    $("body").appenChild($("<div class='mask'></div>"));

}

createMask();
// 这样优点是思路简单 但是缺点也很明显 每次调用的时候 都要检查dom

var mask;

function createMask1() {
    if (mask) return mask;

    mask = $("<div class='mask'></div>");

    return mask;
}

createMask1();

// 这样使用一个全局变量 来表示是否应该显示mask
// 这样基本可以是满足需求 但是有些人认为全局变量污染 希望不要使用全局变量 有了以下方法

var singleton = function( fn ){
    var result;
    return function(){
        return result || ( result = fn.apply( this, arguments ) );
    }
}
 
var createMask3 = singleton(function(){
 
    return document.body.appendChild($("<div class='mask'></div>"));
 
})

createMask3();

// 这次使用了闭包 之前的全局变量变成了函数内部变量 避免了全局污染
// 可以说上面这么做的模式是单例模式标准的形式 但是过于复杂

// ES6中的单例模式

let __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  }
}());

class Universe {
  constructor() {
    if (__instance()) return __instance();
    // 按自己需求实例化
    this.foo = 'bar';
    __instance(this);
  }
}

let u1 = new Universe();
let u2 = new Universe();


u1.foo; //'bar'
u1 === u2; //true

// ES6中的单例模式 是通过修改构造器实现每次new出来的对象始终是一个
