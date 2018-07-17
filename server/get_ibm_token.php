<?php
function curl_auth($url, $user, $passwd)
{
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_USERPWD => $user . ':' . $passwd,
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true
    ]);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

function play_tts($ext_name)
{
    $temp = $_GET['text'];//获取的文本
    $text = urlencode($temp);//转换为url编码
    $voice = array("en-US_AllisonVoice", "en-US_LisaVoice", "en-US_MichaelVoice");//发音人
    $curl = 'https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?voice=' . $voice[0] . '&text=' . $text;
    $username = "2c4c7235-45e7-45ca-8670-ba0d426f5d46";//帐号
    $password = "DGLoyxufPz86";//密码
    $file_path = "../audio/ibm_temp." . $ext_name[0];//文件路径
    $res = curl_auth($curl, $username, $password);
    $file = fopen($file_path, "w");
    fwrite($file, $res);
    fclose($file);
    $info = array(
        'path' => 'audio/ibm_temp.' . $ext_name[0],
        'type' => $ext_name[1]
    );
    echo json_encode($info);
}

$ext_name = [
    0 => ['ogg', 'ogg'],
    1 => ['mp3', 'mpeg']
];
play_tts($ext_name[0]);
?>