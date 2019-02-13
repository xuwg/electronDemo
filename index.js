window.onload = function() {
    var tabs = document.getElementsByClassName('tab-head')[0].getElementsByTagName('h2'),
        contents = document.getElementsByClassName('tab-content')[0].getElementsByTagName('div');

    (function changeTab(tab) {
        for (var i = 0, len = tabs.length; i < len; i++) {
            tabs[i].onmouseover = showTab;
        }
    })();

    function showTab() {
        for (var i = 0, len = tabs.length; i < len; i++) {
            if (tabs[i] === this) {
                tabs[i].className = 'selected';
                contents[i].className = 'show';
            } else {
                tabs[i].className = '';
                contents[i].className = '';
            }
        }
    }
}

function maxbtClicked() {
    maxbt = document.getElementById("maxbt");
    if (maxbt.innerHTML != "<font face=\"webdings\">2</font>") {
        maxbt.innerHTML = "<font face=\"webdings\">2</font>";
    } else {
        maxbt.innerHTML = "<font face=\"webdings\">1</font>";
    }
}