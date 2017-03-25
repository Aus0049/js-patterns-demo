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

// 现在又想了一下 上面代码确实不妥 
// 新的验证方法如下

const validate = (dataArray) => {
    // 策略模式
    for(let i of dataArray){
        // 有自定义验证规则 则忽略其他规则
        if(i.customVerify){
            let customVerifyResult = i.customVerify(i.name, i.value);

            if(customVerifyResult != true){
                // 有报错
                return {status: false, name: i.name, error: customVerifyResult};
            }
        }

        let text;
        // 没有自定义规则 常规验证
        // required
        if(i.required === true){
            if(i.value == undefined || i.value == null || i.value == ""){
                text = i.name + "不能为空!";

                if(i.errorText){
                    text = i.errorText;
                }

                return {status: false, name: i.name, error: text};
            }
        }


        if(i.length === true){
            if(i.min != undefined && i.max == undefined && typeof i.min == "number"){
                if(i.value.length < i.min){
                    text = i.name + "不能少于" + i.min + "个字";

                    if(i.errorText){
                        text = i.errorText;
                    }

                    return {status: false, name: i.name, error: text};
                }
            }

            if(i.max != undefined && i.min == undefined && typeof i.max == "number"){
                if(i.value.length > i.max){
                    text = i.name + "不能超过" + i.max + "个字";

                    if(i.errorText){
                        text = i.errorText;
                    }

                    return {status: false, name: i.name, error: text};
                }
            }

            if(i.max != undefined && i.min != undefined && typeof i.max == "number" && i.min == "number"){
                if(i.value.length > i.max || i.value.length < i.min){
                    text = i.name + "长度应在" + i.min + "~" + i.max + "之间";
                }

                if(i.errorText){
                    text = i.errorText;
                }

                return {status: false, name: i.name, error: text};
            }
        }

        // 长度验证 最小
        if(i.min != undefined && i.max == undefined && typeof i.min == "number"){
            if(i.value < i.min){
                text = i.name + "不能小于" + i.min;

                if(i.errorText){
                    text = i.errorText;
                }

                return {status: false, name: i.name, error: text};
            }
        }

        // 最大
        if(i.max != undefined && i.min == undefined && typeof i.max == "number"){
            if(i.value > i.max){
                text = i.name + "不能超过" + i.max;

                if(i.errorText){
                    text = i.errorText;
                }

                return {status: false, name: i.name, error: text};
            }
        }

        // 区间
        if(i.max != undefined && i.min != undefined && typeof i.max == "number" && i.min == "number"){
            if(i.value > i.max || i.value < i.min){
                text = i.name + "应在" + i.min + "~" + i.max + "之间";
            }

            if(i.errorText){
                text = i.errorText;
            }

            return {status: false, name: i.name, error: text};
        }
    }

    return {status: true};
};

// 当然里面 还可以再继续优化下 不过思路就是现在这样 
// 验证种类暂时较少 支持require 长度require 最大最小区间 以及自定义验证规则
// 自定义验证规则优先级最高
// 上述验证的使用方法如下
let this_ = this;
let { reason, toast, approver} = this.state;

let validate = Validate([
    {name: "", value: approver, required: true, length: true, min: 1, errorText: "该项审批流尚未开启!"},
    {name: "销外出原因", value: reason, required: false, length: true, max: 200}
]);

if(validate.status == true){
    // ajax
    this.ajaxSubmit();
} else {
    Tools.toastError(toast, this_, validate.error);
}

// 这样相对于之前第一版的验证 使用起来就简单了很多 而且灵活了很多 

