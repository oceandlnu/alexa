<?php
function request_post($url = '', $param = '')
{
    if (empty($url) || empty($param)) {
        return false;
    }

    $postUrl = $url;
    $curlPost = $param;
    $curl = curl_init();//初始化curl
    curl_setopt($curl, CURLOPT_URL, $postUrl);//抓取指定网页
    curl_setopt($curl, CURLOPT_HEADER, 0);//设置header
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
    curl_setopt($curl, CURLOPT_POST, 1);//post提交方式
    curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
    $data = curl_exec($curl);//运行curl
    curl_close($curl);

    return $data;
}

function get_token()
{
    $url = 'https://aip.baidubce.com/oauth/2.0/token';
    $post_data['grant_type'] = 'client_credentials';
    $post_data['client_id'] = 'WwzKUh1P0l31MCaZDZ90B0Bh';  //API Key
    $post_data['client_secret'] = 'iB1GUA7WG6dv2z9FpjlwTmgEng8olRHC';  //Secret Key
    $o = "";
    foreach ($post_data as $k => $v) {
        $o .= "$k=" . urlencode($v) . "&";
    }
    $post_data = substr($o, 0, -1);

    $res = request_post($url, $post_data);
    $res = json_decode($res, true);
    $result = $res['access_token'];
    $file_path = "../token/baidu_token";
    $file = fopen($file_path, "w");
    fwrite($file, $result);
    fclose($file);
}

function play_tts($ext_name)
{
    //百度语音开发者API
    $url = 'http://tsn.baidu.com/text2audio?';
    $get_data = array(
        "lan" => "zh",//语言选择,目前只有中英文混合模式，填写固定值zh
        "tok" => file_get_contents("../token/baidu_token"),//开放平台获取到的开发者access_token
        "ie" => "UTF-8",//编码
        "ctp" => "1",//客户端类型选择，web端填写固定值1
        "cuid" => "74-DF-BF-0B-0A-03",//用户唯一标识，用来区分用户，计算UV值。建议填写能区分用户的机器 MAC 地址或 IMEI 码，长度为60字符以内
        "spd" => "5",//语速，取值0-9，默认为5中语速
        "pit" => "5",//音调，取值0-9，默认为5中语调
        "vol" => "15",//音量，取值0-15，默认为5中音量
        "per" => "3",//发音人选择, 0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女
    );
    foreach ($get_data as $k => $v) {
        $url .= "$k=" . urlencode($v) . "&";
    }
    $text = $_GET['text'];
    $url .= "tex=" . urlencode($text);

    //百度语音免费接口
    //var ttsBaidu="http://tts.baidu.com/text2audio?lan="+lan+"&ie="+ie+"&spd="+spd+"&pit="+pit+"&vol="+vol+"&per="+per+"&text=";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($ch);
    $res = json_decode($result, true);
//    var_dump($res["err_no"]);
    if ($res["err_no"] == 502) {
        curl_close($ch);
        get_token();
        play_tts($text);
    } else {
        curl_close($ch);
        $file_path = "../audio/baidu_temp." . $ext_name[0];
        $file = fopen($file_path, "w");
        fwrite($file, $result);
        fclose($file);
        $info = array(
            'path' => 'audio/baidu_temp.' . $ext_name[0],
            'type' => $ext_name[1]
        );
        echo json_encode($info);
    }
}

$ext_name = [
    0 => ['ogg', 'ogg'],
    1 => ['mp3', 'mpeg']
];
play_tts($ext_name[0]);
?>