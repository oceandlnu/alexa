<?php
/**
 * Created by PhpStorm.
 * User: ocean
 * Date: 17-12-19
 * Time: 下午5:55
 */
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
get_token();