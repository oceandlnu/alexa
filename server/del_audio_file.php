<?php
/**
 * Created by PhpStorm.
 * User: ocean
 * Date: 17-12-19
 * Time: 下午2:26
 */
function del_audio_file($type){
    $path="../audio/";
    $file="";
    if ($type == "baidu"){
        $file=$path."baidu_temp.mp3";
    }elseif ($type == "ibm"){
        $file=$path."ibm_temp.mp3";
    }
    if (!unlink($file))
    {
        echo ("删除失败：$file");
    }
    else
    {
        echo ("已删除：$file");
    }
}
$type=$_GET['type'];
del_audio_file($type);