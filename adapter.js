// 适配器模式 

// 适配器模式 将一个对象或者类的接口翻译成某个指定的系统可以使用的另外一个接口。
// 适配器基本上允许本来由于接口不兼容而不能一起正常工作的对象或者类能够在一起工作.
// 适配器将对它接口的调用翻译成对原始接口的调用，而实现这样功能的代码通常是最简的。

// 举个例子 一个接口长成这样
orange.showInfo = function(name, color, weight) {
  console.log(name + ' is ' + color + ' and its weight is ' + weight);
};

// 我们现在有这样的一个数据
var o = {
  name: 'classicemi',
  color: 'orange',
  weight: '300g'
}

// 我们当然可以这样使用接口：

orange.showInfo(o.name, o.color, o.weight);

// 同样，我们也可以：

function adaptedShowInfo(o) {
  orange.showInfo(o.name, o.color, o.weight);
}

// 通过适配过的接口进行调用
adaptedShowInfo(o);

// 这样，简化了接口的调用过程，对接口进行了一定程度的改造。

// 我们可能已经用过的一个适配器的例子就是jQuery的jQuery.fn.css()方法，
// 这个方法帮助规范了不同浏览器之间样式的应用方式，使我们使用简单的语法，这些语法被适配成为浏览器背后真正支持的语法：

// Cross browser opacity:
// opacity: 0.9;  Chrome 4+, FF2+, Saf3.1+, Opera 9+, IE9, iOS 3.2+, Android 2.1+
// filter: alpha(opacity=90);  IE6-IE8

// Setting opacity
$( ".container" ).css( { opacity: .5 } );

// Getting opacity
var currentOpacity = $( ".container" ).css('opacity');

// 其核心代码如下：

jQuery.cssHooks.opacity = {
  get: function( elem, computed ) {
    // IE uses filters for opacity
    return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
      ( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
      computed ? "1" : "";
  },

  set: function( elem, value ) {
    var style = elem.style,
      currentStyle = elem.currentStyle,
      opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
      filter = currentStyle && currentStyle.filter || style.filter || "";

    // IE has trouble with opacity if it does not have layout
    // Force it by setting the zoom level
    style.zoom = 1;

    // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
    // if value === "", then remove inline opacity #12685
    if ( ( value >= 1 || value === "" ) &&
        jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
        style.removeAttribute ) {

      // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
      // if "filter:" is present at all, clearType is disabled, we want to avoid this
      // style.removeAttribute is IE Only, but so apparently is this code path...
      style.removeAttribute( "filter" );

      // if there is no filter style applied in a css rule or unset inline opacity, we are done
      if ( value === "" || currentStyle && !currentStyle.filter ) {
        return;
      }
    }

    // otherwise, set new filter values
    style.filter = ralpha.test( filter ) ?
      filter.replace( ralpha, opacity ) :
      filter + " " + opacity;
  }
};

// 适配器模式使用场景

// 适配器不会去改变实现层，那不属于它的职责范围，它干涉了抽象的过程。
// 外部接口的适配能够让同一个方法适用于多种系统。

// 如果内部的实现出现了问题，需要动手术解决的话，那就不应该使用适配器了，因为那只是治标不治本的方法，反而会增加代码的复杂度。
// 对实现进行全面优化的带来的是真正的改善。而如果实现层的问题不大，要解决一部分适配问题的话，适配器模式就是很好的选择了。