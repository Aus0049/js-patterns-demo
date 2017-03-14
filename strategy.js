// 策略模式
// 策略模式的意义是定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。
// 说简单点 就是将多个if else进行封装 使之可以相互替换
// 销售其实就是最常见的策略模式使用者 他会根据消费者的情况不同 整理手里的资源 推荐给消费者满足其需求的方案
// 策略模式也是一个很名副其实的模式

// 举个例子 表单验证
// 当年我实习的时候 写过一个表单验证的js 无意之间就采用了策略模式

// html中注明该input 需要验证的类型
// <input class="verify" name="phone" data-verify="require phone"/>

// 然后在js中 定义好每个类的验证规则 每个验证最后返回true/false 表面其是否通过该项验证 
// 这样实现一个个验证类型顺序验证
$(".verify").blur(function(){
    verify($(this));
});

function verify (obj){
    var verifyType = $(obj).data("verify");
    var objVal = $.trim($(obj).val());
    var parent = $(obj).parents(".input-box");
    var grandfather = $(obj).parents(".rows");

    if(verifyType == "require"){
        //必填项
        require();
    }else {
        var args = verifyType.split(" ");
        if(args[0] == "require"){
            //必填
            if(require() != false){
                eachCheck(args,true);
            }
        }else{
            //选填
            //执行之后的验证
            if(objVal){
                eachCheck(args,false);
            }else {
                clearError();
                return true;
            }
        }
    }
}

//循环验证填入项
function eachCheck(args, require){
    var i = 0;
    var len = args.length;
    if(require == true){
        i = 1;
    }

    for(; i < len; i++){
        if(args[i] == "phone"){
            if(!regularCheck(/^1[3-9][0-9]\d{4,8}$/,"请输入正确手机号！")){
                break;
            }
        }
        // .....
    }
}

//验证必填项 radio也要验证
function require(){
    if($(obj).attr("type") == "radio"){
        var radioName = $(obj).attr("name");
        if(!$("input[name="+radioName+"]:checked").val()){
            showError("请选择！");
            return false;
        }else {
            clearError();
            return true;
        }
    }else {
        if(objVal == ""){
            showError("必填项！");
            return false;
        }else {
            clearError();
            return true;
        }
    }
}

function regularCheck(rule, text){
    if(!rule.test(objVal)){
        showError(text);
        return false;
    }else {
        clearError();
        return true;
    }
}

// 这也算是策略模式的一种使用 
// 看着当年的代码 当时能找到个实习单位真不容易啊。。。。

