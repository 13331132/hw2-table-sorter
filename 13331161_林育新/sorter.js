window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

var isAscend = true;

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var ths = tables[i].getElementsByTagName("th");
        for (var j = 0; j < ths.length; j++) {
            ths[j].addEventListener("click", tableSort, false);
        }
    }
}

function tableSort() {
    var tmpForRows = [];
    var trColIndex = this.cellIndex;
    //此为获得table下除了thead以外的所有行
    var trRows = this.parentNode.parentNode.parentNode.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    var thsSibiling = this.parentNode.getElementsByTagName("th");

    for (var i = 0; i < trRows.length; i++) {  //将表格每一行的内容存入一个二维数组
        tmpForRows[i] = [];
        for (var j = 0; j < trRows[i].cells.length; j++) { // 每一行有多少列
            tmpForRows[i][j] = trRows[i].cells[j].innerHTML;
        }
    }

    tmpForRows.sort(function (a, b) {
        return a[trColIndex] > b[trColIndex];
    })

    for (var i = 0; i < thsSibiling.length; i++) {
        if (thsSibiling[i].classList.contains('ascend')) thsSibiling[i].classList.remove('ascend');
        if (thsSibiling[i].classList.contains('descend')) thsSibiling[i].classList.remove('descend');

    }
    if (isAscend) {
        isAscend = false;
        this.classList.add('ascend');
    } else {
        isAscend = true;
        this.classList.add('descend');
        tmpForRows.reverse();
    }

    for (var i = 0; i < trRows.length; i++) {
        trRows[i].innerHTML = "<td>" + tmpForRows[i].join("</td><td>") + "</td>";
    }
}

