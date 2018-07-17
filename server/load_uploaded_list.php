<?php
/**
 * Created by PhpStorm.
 * User: ocean
 * Date: 17-11-17
 * Time: 下午1:59
 */
header("Content-type:text/add_list;charset=utf-8");
date_default_timezone_set("Asia/Shanghai");

function onloadFile()
{
//    var_dump($_POST["file"]);
    $windows_sepa = "\r\n";
    $linux_sepa = "\n";
    $mac_sepa = "\r";
    $line_sepa = "";
    //判断换行方式
    //window 用 \r\n
    //linux 和 unix 用 \n
    //mac 用 \r
    if (strpos($_POST["file"],$windows_sepa)){
        $line_sepa = $windows_sepa;
    }
    elseif (strpos($_POST["file"],$linux_sepa)) {
        $line_sepa = $linux_sepa;
    }elseif (strpos($_POST["file"],$mac_sepa)){
        $line_sepa = $mac_sepa;
    }
    //得到文件的换行方式，进行过滤
    $file = explode($line_sepa, $_POST["file"]);
//    $file = explode("\n", $_POST["file"]);
    $length = count($file);
//    var_dump($arr);
    for ($i = 0; $i < $length; $i++) {
//        echo "<span id='listLength' style='display: none;'>" . $length . "</span>";
        $file[$i] = str_replace("'", "&apos;", $file[$i]);
        $file[$i] = str_replace("<", "[", $file[$i]);
        $file[$i] = str_replace(">", "]", $file[$i]);
        $file[$i] = str_replace('"', "", $file[$i]);
//        echo "<option value =\"${file[$i]}\" onclick='selectText(\"${file[$i]}\")'>${file[$i]}</option>";
        echo "<dd value =\"${file[$i]}\" onclick='selectText(\"${file[$i]}\",\"${i}\")'>${file[$i]}</dd>";
    }
}

onloadFile();
//var_dump($_POST['file']);