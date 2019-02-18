const ipc = require('electron').ipcRenderer
const kMaxBigAmountLength = 5;
const kMaxSmallAmountlength = 2;
var amountEdit = document.getElementById('amount');
let trayOn = false;
// maxbt = document.getElementById('maxbt')
// maxbt.addEventListener('click', () => {
//     console.log('hello vscode!')
//     ipc.send('window-max');
// })
// document.getElementById('minbt').addEventListener('click', () => {
//     console.log('hello vscode!')
//     ipc.send('window-min');

// });
function $(id) {
    return document.getElementById(id);
}

window.onload = () => {


    if (!trayOn) {
        ipc.send('put-in-tray');
        trayOn = true;
    }

    // Tray removed from context menu on icon
    ipc.on('tray-removed', function () {
        ipc.send('remove-tray');
        trayOn = false;
    });

    // 设置左侧tab
    var items = $('ltab').getElementsByTagName('li');
    for (var i = 0; i < items.length; ++i) {
        items[i].index = i;
    //     items[i].onmouseover = function () {
    //         this.bgc = this.style.background;
    //         this.style.background = "#ddd";
    //     }
    //     items[i].onmouseout = function () {
    //         this.style.background = this.bgc;
    //     }
    }

    var contents = $('content').children;
    SelectLTabItem(items, contents, $('shouYin'));
    amountEdit.focus();

    $('shouYin').onclick = function () {
        SelectLTabItem(items, contents, this);
        amountEdit.focus();
    }
    $('tuiKuan').onclick = function () {
        SelectLTabItem(items, contents, this);
    }
    $('mingXi').onclick = function () {
        SelectLTabItem(items, contents, this);
    }
    $('banJie').onclick = function () {
        SelectLTabItem(items, contents, this);
    }
    $('setting').onclick = function () {
        SelectLTabItem(items, contents, this);
    }
}

document.getElementById('closebt').addEventListener('click', () => {
    ipc.send('window-close');
});

function SelectLTabItem(items, contents, li) {

    for (var i = 0; i < items.length; ++i) {
        var className = items[i].className;
        items[i].className  = className.replace("select","");
    }
    li.className += " select";

    for(var i = 0; i < contents.length; ++i)
    {
        contents[i].style.display = "none";        
    }
    contents[li.index].style.display = "block";
}

function IputAmount(num) {

    var amount = amountEdit.value;

    switch (num) {
        case '0':
            {
                if (amount == '') {
                    amount = '0';
                } else if (amount == '0.') {
                    amount += num;
                } else if (amount != '0.0') { //金额为0.0时在输入0没意义不允许输入
                    var index = amount.indexOf('.');
                    if (index == -1) {
                        if (amount != 0 && amount.length < kMaxBigAmountLength) { //金额为0时在输入0没意义不允许输入
                            amount += '0';
                        }
                    } else {
                        var lingqian = amount.slice(index + 1);
                        if (lingqian.length < kMaxSmallAmountlength) { //小数点后面只允许输入两位小数
                            amount += num;
                        }
                    }
                }
            }
            break;
        case '.':
            {
                if (amount == '') {
                    amount = '0.';
                } else if (amount.indexOf(num) == -1) {
                    amount += num;
                }
            }
            break;
        default:
            {
                var index = amount.indexOf('.');
                if (index == -1) { //没有小数点的情况
                    if (amount.length < kMaxBigAmountLength) {
                        if (amount == 0) {
                            amount = num;
                        } else {
                            amount += num;
                        }
                    }
                } else {
                    if (amount == '0.') {
                        amount += num;
                    } else {
                        var lingqian = amount.slice(index + 1);
                        if (lingqian.length < kMaxSmallAmountlength) { //小数点后面只允许输入两位小数
                            amount += num;
                        }
                    }
                }
            }
            break;
            345
    }

    amountEdit.value = amount;
};

function filterKeyCode() {

    var regEx = /^\d{1,5}(\.\d{0,2})?$/;
    var value = amountEdit.value;

    if (!regEx.test(value)) {
        amountEdit.value = value.slice(0, value.length - 1);
    }

}

amountEdit.onkeyup = filterKeyCode;

document.getElementById('num0').onclick = () => {
    IputAmount('0');
};

document.getElementById('num1').onclick = (() => {
    IputAmount('1');
});
document.getElementById('num2').onclick = (() => {
    IputAmount('2');
});
document.getElementById('num3').onclick = (() => {
    IputAmount('3');
});
document.getElementById('num4').onclick = (() => {
    IputAmount('4');
});
document.getElementById('num5').onclick = (() => {
    IputAmount('5');
});
document.getElementById('num6').onclick = (() => {
    IputAmount('6');
});
document.getElementById('num7').onclick = (() => {
    IputAmount('7');
});
document.getElementById('num8').onclick = (() => {
    IputAmount('8');
});
document.getElementById('num9').onclick = (() => {
    IputAmount('9');
});
document.getElementById('numdot').onclick = (() => {
    IputAmount('.');
});

document.getElementById('delete').onclick = (() => {
    var amountEdit = document.getElementById('amount');
    var amount = amountEdit.value;
    amount = amount.slice(0, amount.length - 1);
    amountEdit.value = amount;
});