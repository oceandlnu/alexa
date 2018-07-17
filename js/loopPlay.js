// var defaultText = "Alexa, what time it is";
// document.getElementById("textArea").value = defaultText;

var valueText;  //选中的语句
var valueTime;  //选中的时间
var indexText;  //用于列表循环和随机循环的flag，防止越界
var indexTime;  //当前时间列表index
var listLength; //文本列表长度
var timeLength; //时间列表长度

function speak(text) {
    if (radioState === "Web Speech API") {
        webSpeechAPI(text);
    } else if (radioState === "Baidu") {
        baiduTTS(text);
    } else if (radioState === "IBM") {
        IBMTTS(text);
    } else if (radioState === "Google") {
        googleTTS(text);
    }
}

//获取列表长度
function getLength(tag) {
    var ele = document.getElementsByTagName("dl")[tag].childNodes;
    if (tag === 0) {
        listLength = ele.length;
    } else if (tag === 1) {
        timeLength = ele.length;
    }
}

//单曲循环
function singleLoop() {
    var ele = document.getElementsByTagName("dl")[0].childNodes;
    valueText = ele[indexText].innerHTML;
    speak(valueText);
}

//列表循环
function listLoop() {
    var ele = document.getElementsByTagName("dl")[0].childNodes;
    indexText %= listLength;
    valueText = ele[indexText].innerHTML;
    if (indexText > 0) {
        ele[indexText - 1].style.backgroundColor = "#FFF";
    } else if (indexText === 0) {
        ele[listLength - 1].style.backgroundColor = "#FFF";
    }
    ele[indexText].style.backgroundColor = "#A3D2A3";
    indexText++;
    document.getElementById("textArea").value = valueText;
    speak(valueText);
}

//随机播放
function randomPlay() {
    var ele = document.getElementsByTagName("dl")[0].childNodes;
    valueText = ele[indexText].innerHTML;
    for (var i = 0; i < ele.length; i++) {
        ele[i].style.backgroundColor = "#FFF";
    }
    ele[indexText].style.backgroundColor = "#A3D2A3";
    indexText = Math.floor(Math.random() * (listLength));
    document.getElementById("textArea").value = valueText;
    speak(valueText);
}

//模式选择
function modeSwitch() {
    var elemPlay = document.getElementById("playState");
    if (elemPlay.name === "stopPlay") {
        alert("请先停止播放再切换模式");
    } else {
        var elem = document.getElementById("modeSwitch");
        if (elem.name === "singleLoop") {
            elem.value = "List Loop";
            elem.name = "listLoop";
        } else if (elem.name === "listLoop") {
            elem.value = "Random Play";
            elem.name = "randomPlay";
        } else {
            elem.value = "Single Loop";
            elem.name = "singleLoop";
        }
    }
}

//播放状态
function playState() {
    var elem = document.getElementById("modeSwitch");
    var elemPlay = document.getElementById("playState");
    // console.log(elemPlay);
    if (elemPlay.name === "startPlay") {
        //如果name值为开始播放，开启定时器，开始循环播放，播放状态置为停止播放
        getLength(0);//获取text列表长度
        sleepTime = valueTime * 1000;
        //console.log(sleepTime);
        if (elem.name === "singleLoop") {
            //单曲循环
            singleLoop();
            intervar = setInterval("singleLoop()", sleepTime);
        } else if (elem.name === "listLoop") {
            //列表循环
            listLoop();
            intervar = setInterval("listLoop()", sleepTime);
        } else {
            //随机播放
            randomPlay();
            intervar = setInterval("randomPlay()", sleepTime);
        }
        elemPlay.value = "Stop Play";
        elemPlay.name = "stopPlay";
    } else {
        //如果name值为停止播放，将定时器清楚，播放状态置为开始播放
        clearInterval(intervar);
        elemPlay.value = "Start Play";
        elemPlay.name = "startPlay";
    }
    //console.log(intervar);
}

//导入文件
$("#import").click(function () {//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
    $("#files").click();
});

//实时同步导入文件内容
function readText() {
    var selectedFile = document.getElementById("files").files;//获取读取的File对象
    var length = selectedFile.length;
    var content = "";
    for (var i = 0; i < length; i++) {
        var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
        reader.readAsText(selectedFile[i]);//读取文件的内容
        reader.onload = function () {
            content = this.result;//当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
            // console.log(content);
            var xmlhttp;
            if (window.XMLHttpRequest) {
                // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行的代码
                xmlhttp = new XMLHttpRequest();
            }
            else {
                //IE6, IE5 浏览器执行的代码
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    document.getElementById("selectText").innerHTML = xmlhttp.responseText;
                    // console.log(xmlhttp.responseText);
                }
            }
            xmlhttp.open("POST", "server/load_uploaded_list.php", false);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            xmlhttp.send("file=" + content);

            valueText = oneText("selectText");
            document.getElementById("textArea").value = valueText;
        };
    }
}

//初始化下拉框
function onloadList() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行的代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        //IE6, IE5 浏览器执行的代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById("selectOrder").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST", "server/load_command_file.php", true);
    xmlhttp.send();
}

window.onload = onloadList();

//选择列表第一条语句
function oneText(list) {
    var select = document.getElementById(list);
    // var text = select.firstChild.nodeValue;
    var text = select.firstChild.innerHTML;
    select.firstChild.style.backgroundColor = "#A3D2A3";
    // console.log(text);
    return text;
}

//初始化默认列表
function onloadDefultList() {
    var xmlhttp;
    var defaultList = "AVS.txt";
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行的代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        //IE6, IE5 浏览器执行的代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById("selectText").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "server/load_selected_list.php?list=" + defaultList, false);
    xmlhttp.send();

    valueText = oneText("selectText");
    indexText = 0;
    getLength(0);//获取text列表长度
    document.getElementById("textArea").value = valueText;
}

window.onload = onloadDefultList();

//初始化等待时间列表
function loadSleepTime() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行的代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        //IE6, IE5 浏览器执行的代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById("selectTime").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST", "server/load_wait_time.php", false);
    xmlhttp.send();

    var select = document.getElementById("selectTime");
    select.firstChild.style.backgroundColor = "#A3D2A3";
    valueTime = 5;
    indexTime = 0;
    document.getElementById("textTime").value = valueTime;
    getLength(0);//获取text列表长度
}

window.onload = loadSleepTime();

//改变下拉框选择内容同步列表显示内容
function selectList(value) {
    var xmlhttp;
    value += ".txt";
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行的代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        //IE6, IE5 浏览器执行的代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById("selectText").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "server/load_selected_list.php?list=" + value, false);
    xmlhttp.send();

    valueText = oneText("selectText");
    document.getElementById("textArea").value = valueText;

    indexText = 0;
    getLength(0);//获取text列表长度

}

//时间选择
function selectTime(value, index) {
    var ele = document.getElementsByTagName("dl")[1].childNodes;
    for (var i = 0; i < ele.length; i++) {
        ele[i].style.backgroundColor = "#FFF";
    }
    indexTime = index;
    ele[indexTime].style.backgroundColor = "#A3D2A3";

    valueTime = value;
    document.getElementById("textTime").value = valueTime;
}

//语句选择
function selectText(value, index) {
    var ele = document.getElementsByTagName("dl")[0].childNodes;
    for (var i = 0; i < ele.length; i++) {
        ele[i].style.backgroundColor = "#FFF";
    }
    indexText = index;
    ele[indexText].style.backgroundColor = "#A3D2A3";
    valueText = value;
    document.getElementById("textArea").value = valueText;
}

