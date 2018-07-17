//Common Model

//创建一个audio元素
var createAudio = document.createElement("audio");
//设置默认API为WebSpeechAPI
var radioState = "Web Speech API";

//获取当前选中的API语音接口
function platformTTS(value) {
    radioState = value;
    // console.log(radioState);
    var elem = document.getElementsByClassName("platform")[0].getElementsByTagName("input");
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].value === value) {
            elem[i].style.backgroundColor = "black";
            elem[i].style.color = "white";
        } else {
            elem[i].style.backgroundColor = "#a3d2a3";
            elem[i].style.color = "black";
        }
        // console.log(elem[i]);
    }
}

window.onload = platformTTS(radioState);

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
    msg.rate = 0.8; // 0.1 to 10	发音速度
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

/*
function googleTTS(textContent) {
	//获取Google tk值
	var b = function (a, b) {
	    for (var d = 0; d < b.length - 2; d += 3) {
	        var c = b.charAt(d + 2),
	            c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
	            c = "+" === b.charAt(d + 1) ? a >>> c : a << c;
	        a = "+" === b.charAt(d) ? a + c & 4294967295 : a ^ c
	    }
	    return a
	}

	var tk =  function (a,TKK) {
	    for (var e = TKK.split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
	        var c = a.charCodeAt(f);
	        128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 === (c & 64512) && f + 1 < a.length && 56320 === (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
	    }
	    a = h;
	    for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
	    a = b(a, "+-3^+b+-f");
	    a ^= Number(e[1]) || 0;
	    0 > a && (a = (a & 2147483647) + 2147483648);
	    a %= 1E6;
	    return a.toString() + "." + (a ^ h)
	}
	var audio = new Audio();
	var textContent = document.getElementById("textArea").value;
	audio.src ='http://translate.google.cn/translate_tts?ie=utf-8&tl=en&tk='+tk+'&q=' + encodeURI(textContent);
	audio.play();
}
*/

