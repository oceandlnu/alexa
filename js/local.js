// var defaultText = "Alexa, what time it is";
// document.getElementById("textArea").value = defaultText;

var textIndex = 0;  //call的flag
var nameIndex = 0;  //name的flag，防止越界
var textLength; //列表长度
var nameLength;  //vcf通讯录数量
var nameSleepTime = 0;
var valueText;  //选中的语句
var valueName;  //选中的人名

document.getElementById("textTime").value = 20; //设置等待时间为20s
document.getElementById("textNameTime").value = 10; //设置等待时间为10s

// speak函数
function speak(text) {
    if (radioState === "Web Speech API") {
        webSpeechAPI(text);
    } else if (radioState === "Baidu") {
        baiduTTS(text);
    } else if (radioState === "IBM") {
        IBMTTS(text);
    } else if (radioState === "Google") { //待开发
        googleTTS(text);
    }
}

//获取列表长度
function getLength(tag) {
    var ele = document.getElementsByTagName("dl")[tag].childNodes;
    if (tag === 0) {
        textLength = ele.length;
    } else if (tag === 1) {
        nameLength = ele.length;
        console.log(nameLength);
    }
}

//第一个为单曲循环
function singleLoop() {
    var textList = document.getElementsByTagName("dl")[0].childNodes;
    valueText = textList[textIndex].innerHTML;
    var nameList = document.getElementsByTagName("dl")[1].childNodes;
    var mode = document.getElementById("modeSwitch1");

    if (mode.name === "singleLoop") {
        valueName = nameList[nameIndex].innerHTML;
    } else if (mode.name === "listLoop") {
        nameIndex %= nameLength;
        valueName = nameList[nameIndex].innerHTML;
        if (nameIndex > 0) {
            nameList[nameIndex - 1].style.backgroundColor = "#FFF";
        } else if (nameIndex === 0) {
            nameList[nameLength - 1].style.backgroundColor = "#FFF";
        }
        nameList[nameIndex].style.backgroundColor = "#A3D2A3";
        nameIndex++;
    } else if (mode.name === "randomPlay") {
        valueName = nameList[nameIndex].innerHTML;
        for (var i = 0; i < nameList.length; i++) {
            nameList[i].style.backgroundColor = "#FFF";
        }
        nameList[nameIndex].style.backgroundColor = "#A3D2A3";
        nameIndex = Math.floor(Math.random() * (nameLength));
    }

    var value = valueText + " " + valueName;
    document.getElementById("textArea").value = value;
    speak(value);
    //speak名字
    setTimeout(function () {
        speak(valueName);
    }, nameSleepTime);
}

//第一个为列表循环
function listLoop() {
    var textList = document.getElementsByTagName("dl")[0].childNodes;
    textIndex %= textLength;
    valueText = textList[textIndex].innerHTML;
    if (textIndex > 0) {
        textList[textIndex - 1].style.backgroundColor = "#FFF";
    } else if (textIndex === 0) {
        textList[textLength - 1].style.backgroundColor = "#FFF";
    }
    textList[textIndex].style.backgroundColor = "#A3D2A3";
    textIndex++;
    var nameList = document.getElementsByTagName("dl")[1].childNodes;
    var mode = document.getElementById("modeSwitch1");

    if (mode.name === "singleLoop") {
        valueName = nameList[nameIndex].innerHTML;
    } else if (mode.name === "listLoop") {
        nameIndex %= nameLength;
        valueName = nameList[nameIndex].innerHTML;
        if (nameIndex > 0) {
            nameList[nameIndex - 1].style.backgroundColor = "#FFF";
        } else if (nameIndex === 0) {
            nameList[nameLength - 1].style.backgroundColor = "#FFF";
        }
        nameList[nameIndex].style.backgroundColor = "#A3D2A3";
        nameIndex++;
    } else if (mode.name === "randomPlay") {
        valueName = nameList[nameIndex].innerHTML;
        for (var i = 0; i < nameList.length; i++) {
            nameList[i].style.backgroundColor = "#FFF";
        }
        nameList[nameIndex].style.backgroundColor = "#A3D2A3";
        nameIndex = Math.floor(Math.random() * (nameLength));
    }

    var value = valueText + " " + valueName;
    document.getElementById("textArea").value = value;
    speak(value);
    //speak名字
    setTimeout(function () {
        speak(valueName);
    }, nameSleepTime);
}

//第一个为随机播放
function randomPlay() {
    var textList = document.getElementsByTagName("dl")[0].childNodes;
    valueText = textList[textIndex].innerHTML;
    for (var j = 0; j < textList.length; j++) {
        textList[j].style.backgroundColor = "#FFF";
    }
    textList[textIndex].style.backgroundColor = "#A3D2A3";
    textIndex = Math.floor(Math.random() * (textLength));
    var nameList = document.getElementsByTagName("dl")[1].childNodes;
    var mode = document.getElementById("modeSwitch1");

    if (mode.name === "singleLoop") {
        valueName = nameList[nameIndex].innerHTML;
    } else if (mode.name === "listLoop") {
        nameIndex %= nameLength;
        valueName = nameList[nameIndex].innerHTML;
        if (nameIndex > 0) {
            nameList[nameIndex - 1].style.backgroundColor = "#FFF";
        } else if (nameIndex === 0) {
            nameList[nameLength - 1].style.backgroundColor = "#FFF";
        }
        nameList[nameIndex].style.backgroundColor = "#A3D2A3";
        nameIndex++;
    } else if (mode.name === "randomPlay") {
        valueName = nameList[nameIndex].innerHTML;
        for (var i = 0; i < nameList.length; i++) {
            nameList[i].style.backgroundColor = "#FFF";
        }
        nameList[nameIndex].style.backgroundColor = "#A3D2A3";
        nameIndex = Math.floor(Math.random() * (nameLength));
    }

    var value = valueText + " " + valueName;
    document.getElementById("textArea").value = value;
    speak(value);
    //speak名字
    setTimeout(function () {
        speak(valueName);
    }, nameSleepTime);
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

//模式选择1
function modeSwitch1() {
    var elemPlay = document.getElementById("playState");
    if (elemPlay.name === "stopPlay") {
        alert("请先停止播放再切换模式");
    } else {
        var elem = document.getElementById("modeSwitch1");
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
    if (elemPlay.name === "startPlay") {
        //如果name值为开始播放，开启定时器，开始循环播放，播放状态置为停止播放
        var sleepTime = document.getElementById("textTime").value * 1000;
        nameSleepTime = document.getElementById("textNameTime").value * 1000;
        getLength(0);
        getLength(1);
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

            document.getElementById("textArea").value = oneText("selectText");
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

//初始化text列表
function onloadDefultList() {
    var xmlhttp;
    var defaultList = "Test.txt";
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

    textIndex = 0;
    getLength(0);
}

window.onload = onloadDefultList();

//初始化vcf列表
function onloadDefultLocal() {
    var xmlhttp;
    var localVcf = "contact.vcf";
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
    xmlhttp.open("POST", "server/load_vcf.php", false);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xmlhttp.send("file=" + localVcf);

    nameIndex = 0;
    getLength(1);
}

window.onload = onloadDefultLocal();

//初始化text
valueText = oneText("selectText");
valueName = oneText("selectTime");
textIndex = 0;
nameIndex = 0;
document.getElementById("textArea").value = valueText + " " + valueName;

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
    valueName = oneText("selectTime");
    textIndex = 0;
    nameIndex = 0;
    getLength(0);
    getLength(1);
    document.getElementById("textArea").value = valueText + " " + valueName;
}

//call语句选择
function selectText(value, index) {
    var ele = document.getElementsByTagName("dl")[0].childNodes;
    for (var i = 0; i < ele.length; i++) {
        ele[i].style.backgroundColor = "#FFF";
    }
    textIndex = index;
    ele[textIndex].style.backgroundColor = "#A3D2A3";
    valueText = value;
    document.getElementById("textArea").value = valueText + " " + valueName;
}

//name选择
function selectName(value, index) {
    var ele = document.getElementsByTagName("dl")[1].childNodes;
    for (var i = 0; i < ele.length; i++) {
        ele[i].style.backgroundColor = "#FFF";
    }
    nameIndex = index;
    ele[nameIndex].style.backgroundColor = "#A3D2A3";
    valueName = value;
    document.getElementById("textArea").value = valueText + " " + valueName;
}

//播放text
function toSpeak() {
    var value = document.getElementById("textArea").value;
    speak(value);
}

//播放Name
function toSpeakName() {
    speak(valueName);
}