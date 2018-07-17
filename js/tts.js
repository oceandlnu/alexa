var defaultText = "Alexa, what time it is";
// var defaultText = "Conscious of its spiritual and moral heritage, the Union is founded on the indivisible, universal values of human dignity, freedom, equality and solidarity; it is based on the principles of democracy and the rule of law. It places the individual at the heart of its activities, by establishing the citizenship of the Union and by creating an area of freedom, security and justice.";
// document.getElementById("textArea").value = defaultText;

function speak() {
    var text = document.getElementById("textArea").value;
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

//重置文本为默认内容
function resetText() {
    var textContent = document.getElementById("textArea");
    textContent.value = defaultText;
}

//下载音频文件
function downloadAudio() {
    //等待开发
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
function oneText() {
    var select = document.getElementById("selectText");
    var text = select.firstChild.innerHTML;
    select.firstChild.style.backgroundColor = "#A3D2A3";
    // console.log(text);
    document.getElementById("textArea").value = text;
}

//初始化列表
function onloadDefultList() {
    var xmlhttp;
    /*var select = document.getElementById("selectOrder");
    var sIndex = 0;
    var value = select.options[sIndex].value;
    var defaultList = value + ".txt";*/
    var defaultList = "AVS.txt";
    // console.log(defaultList);
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

    oneText();
}

window.onload = onloadDefultList();

//下拉框选择同步指令
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

    oneText();

}

//交互指令选择
function selectText(value, index) {
    var ele = document.getElementsByTagName("dl")[0].childNodes;
    // console.log(ele.length);
    for (var i = 0; i < ele.length; i++) {
        ele[i].style.backgroundColor = "#FFF";
    }
    ele[index].style.backgroundColor = "#A3D2A3";

    var text = document.getElementById("textArea");
    // console.log(text.value);
    text.value = value;
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

            oneText();
        };
    }

    // oneText();

}