// 命令模式 
// 这个很形象 我们每天都在使用的命令行 就是一个命令模式的典型应用
// 其定义是

// 命名模式的目标是将方法的调用,请求或者操作封装到一个单独的对象中,给我们酌情执行同时参数化和传递方法调用的能力.
// 另外,它使得我们能将对象从实现了行为的对象对这些行为的调用进行解耦,为我们带来了换出具体的对象这一更深程度的整体灵活性。

// 主要目的还是解耦 
// 比如说 我们经常用的命令行 git命令
// git commit
// git commit -a
// git commit -s
// git add
// 等等命令 你会发现 所有命令都是git开头 后面都是操作git的指令 
// 这些指令个数的多少 每次不一定 顺序也可以换 
// 但是他都能准确识别出正确的命令来执行 
// 这就是命令模式
// 比如我创建一个对象 他有很多方法 
// 我想使用这个对象 使其能接受包含任何对其操作的相关命令 无论命令多少和顺序

var CarManager = {

    // 请求信息
    requestInfo: function (model, id) {
        return 'The information for ' + model +
    ' with ID ' + id + ' is foobar';
    },

    // 购买汽车
    buyVehicle: function (model, id) {
        return 'You have successfully purchased Item '
    + id + ', a ' + model;
    },

    // 组织view
    arrangeViewing: function (model, id) {
        return 'You have successfully booked a viewing of '
    + model + ' ( ' + id + ' ) ';
    }
};

// 使用命令模式 给出关键字 就可以使其能正确执行
// 形如
CarManager.execute( "buyVehicle", "Ford Escort", "453543" );
// 是不是很像git 命令 而且命令参数多少不限 但是一定要包含该条命令需要的所有参数

CarManager.execute = function ( name ) {
    return CarManager[name] && CarManager[name].apply( CarManager, [].slice.call(arguments, 1) );
};

// 这样完成命令模式 每个参数都是一个命令 但是第一个参数的顺序是固定的 就是类型
// 这样调用
CarManager.execute( "arrangeViewing", "Ferrari", "14523" );
CarManager.execute( "requestInfo", "Ford Mondeo", "54323" );
CarManager.execute( "requestInfo", "Ford Escort", "34232" );
CarManager.execute( "buyVehicle", "Ford Escort", "34232" );