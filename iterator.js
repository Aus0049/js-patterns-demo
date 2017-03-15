// 迭代器模式
// 提供一种方法顺序一个聚合对象中各个元素，而又不暴露该对象内部表示。
// 这种应该是我们最常见的一种设计模式
// 比如 jq中有 $.each方法 就是典型的迭代器模式的应用

function iterator (arr, fn) {
    var length = arr.length;
    for(var i = 0; i < length; i++){
        fn(i, arr[i]);
    }
}

function forEachFn(i, item) {
    console.log(i, item);
}


iterator(["赵大", "钱二", "张三", "李四", "王五"], forEachFn);

// iterator 提供了按顺序遍历数组的方法 但是又不暴露该对象的内部表示