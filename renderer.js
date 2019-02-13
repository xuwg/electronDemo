const ipc = require('electron').ipcRenderer

// maxbt = document.getElementById('maxbt')
// maxbt.addEventListener('click', () => {
//     console.log('hello vscode!')
//     ipc.send('window-max');
// })
// document.getElementById('minbt').addEventListener('click', () => {
//     console.log('hello vscode!')
//     ipc.send('window-min');

// });
document.getElementById('closebt').addEventListener('click', () => {
    ipc.send('window-close');
});

function IputAmount(num) {

    var amountEdit = document.getElementById('amount');
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
                        if (amount != 0 && amount.length < 7) { //金额为0时在输入0没意义不允许输入
                            amount += '0';
                        }
                    } else {
                        var lingqian = amount.slice(index + 1);
                        if (lingqian.length < 2) { //小数点后面只允许输入两位小数
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
                    if (amount.length < 7) {
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
                        if (lingqian.length < 2) { //小数点后面只允许输入两位小数
                            amount += num;
                        }
                    }
                }
            }
            break;
    }

    amountEdit.value = amount;
};

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


// const trayBtn = document.getElementById('put-in-tray')
// let trayOn = false

// trayBtn.addEventListener('click', function (event) {
//   if (trayOn) {
//     trayOn = false
//     //document.getElementById('tray-countdown').innerHTML = ''
//     ipc.send('remove-tray')
//   } else {
//     trayOn = true
//     const message = 'Click demo again to remove.'
//     //document.getElementById('tray-countdown').innerHTML = message
//     ipc.send('put-in-tray')
//   }
// })
// // Tray removed from context menu on icon
// ipc.on('tray-removed', function () {
//   ipc.send('remove-tray')
//   trayOn = false
//   //document.getElementById('tray-countdown').innerHTML = ''
// })