# Alexa Auto Test

### 功能概述

+ 采用HTML5、CSS3、JavaScript(jQuery)、PHP，实现Alexa语音自动化测试脚本，响应式布局，移动端&PC端布局兼容性优化
+ 依赖扩展库mbstring、curl、fileinfo
+ text to speech实现
+ 循环播报实现(单曲，列表，随机三种模式)
+ local command语音测试实现(单曲，列表，随机三种模式)
+ 自定义增加语音列表
+ 语音接口：webSpeechAPI、IBM、百度
+ 百度语音token失效，自动更新代码实现

### 开发目的

+ 降低Alexa F4项目功能测试人工负载，实现自动化/半自动化语音测试

### 循环播放指令主要实现代码

+ 选中当前的语句（也可以import导入本地文件），睡眠时间(可自定义)，选择模式（单曲，循环，随机）

参数选好后，点击开始播放即可

```
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
```

### Text-to-Speech 文字转语音功能

+ 选择相应API接口（Web Speech API、百度、IBM），样本text，点击Speak按钮即可

```
//初始化WebSpeechAPI
// 创建一个SpeechSynthesisUtterance实例
var msg = new SpeechSynthesisUtterance();
var synth = window.speechSynthesis;
var voices = [];

function onloadWebSpeechAPI() {
    // var voices = window.speechSynthesis.getVoices();
    // msg.voice = voices[0]; // 表达话语声音
    // var voices = [];
    voices = synth.getVoices();
    // console.log(voices.length);
    for (i = 0; i < voices.length; i++) {
        // console.log(i+":"+voices[i].name+"("+voices[i].lang+")")
        if (voices[i].name === "Google US English" || voices[i].name === "English United States") {
            msg.voice = voices[i];
            console.log(msg.voice);
            break;
        }
    }
    // msg.voice=voices[2];
    // console.log("切换语言：msg.voice=voices[i]")
    // msg.voiceURI = 'native';
    // msg.lang = 'en-US'; //语言zh-CN,en-US
    msg.volume = 1; // 0 to 1	音量
    msg.rate = 0.7; // 0.1 to 10	发音速度
    msg.pitch = 1; //0 to 2	音调
    //msg.text = document.getElementById("textArea").value;	//待合成的文本
}

//加载声音voices
window.onload = onloadWebSpeechAPI();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = onloadWebSpeechAPI;
}

//WebSpeechAPI TTS
function webSpeechAPI(textContent) {
    if ('speechSynthesis' in window) {
        // 设置要发音的内容
        msg.text = textContent;
        // 添加在发音队列中
        // window.speechSynthesis.speak(msg);
        synth.speak(msg);
    } else {
        alert("Your browser does not support it, support list: \nDesktop: Chrome, Edge, Firefox, Safari 7 \nMobile: Android, Chrome, Edge, Firefox 2.0, Safari 7.1");
    }
}

//BaiduTTS
function baiduTTS(textContent) {
    // textContent = encodeURI(textContent);
    $.get("server/get_baidu_token.php", {text: textContent}, function (data) {
        var info = JSON.parse(data);
        createAudio.setAttribute("src", info.path + "?" + Math.random() * 10);
        createAudio.setAttribute("type", "audio/" + info.type);
        createAudio.setAttribute("autoplay", "autoplay");
        console.log(info);
    });
    /*$.get("server/del_audio_file.php", {type: "baidu"}, function (data) {
        console.log(data);
    });*/
}

//IBMTTS
function IBMTTS(textContent) {
    // textContent = encodeURI(textContent);
    $.get("server/get_ibm_token.php", {text: textContent}, function (data) {
        var info = JSON.parse(data);
        createAudio.setAttribute("src", info.path + "?" + Math.random() * 10);
        createAudio.setAttribute("type", "audio/" + info.type);
        createAudio.setAttribute("autoplay", "autoplay");
        console.log(info);
    });
    /*$.get("server/del_audio_file.php", {type: "ibm"}, function (data) {
        console.log(data);
    });*/
}
```

### 版权信息

作者：Ocean

Github：https://github.com/oceandlnu
Gitee：https://gitee.com/oceandlnu

版权所有Copyright © 2016-2018 by Ocean's Blog (https://oceandlnu.github.io/)

All rights reserved。