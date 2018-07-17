<?php
/**
 * Created by PhpStorm.
 * User: ocean
 * Date: 17-11-17
 * Time: 下午1:59
 */
header("Content-type:text/add_list;charset=utf-8");
date_default_timezone_set("Asia/Shanghai");

function fileList($list,$path){
    $item=scandir($path);
    foreach($item as $k=>$v){
        if($v=='.' || $v=='..') continue;
        $filename = $v;
        $v=$path.'/'.$v;
        if($list === $filename) {
            $file = file($v);
            for ($i=0;$i<count($file);$i++){

                $windows_sepa = "\r\n";
                $linux_sepa = "\n";
                $mac_sepa = "\r";
                $line_sepa = "";
                //判断换行方式
                //window 用 \r\n
                //linux 和 unix 用 \n
                //mac 用 \r
                if (strpos($file[$i],$windows_sepa)){
                    $line_sepa = $windows_sepa;
                }
                elseif (strpos($file[$i],$linux_sepa)) {
                    $line_sepa = $linux_sepa;
                }elseif (strpos($file[$i],$mac_sepa)){
                    $line_sepa = $mac_sepa;
                }

                $file[$i] = str_replace("'","&apos;",$file[$i]);
                $file[$i] = str_replace('"', "", $file[$i]);
                $file[$i] = str_replace($line_sepa,"",$file[$i]);//去掉换行符
                $file[$i] = trim($file[$i]);
//                echo "<option value =\"${file[$i]}\" onclick='selectText(\"${file[$i]}\")'>${file[$i]}</option>";
                echo "<dd value=\"${file[$i]}\" onclick='selectText(\"${file[$i]}\",\"$i\")'>${file[$i]}</dd>";
            }
//            echo "<span id='listLength' style='visibility: hidden'>".count($file)."</span>";
            /*$file = fopen($v,"r");
            while (!feof($file)){
                $content = fgets($file);
//                var_dump($content);
                echo '<option value ="'.$content.'" onclick="selectText('.$content.')">'.$content.'</option>';
            }
            fclose($file);*/
        }
    }
}

$list = $_GET['list'];
$path = "../list";
// $list = "Test.txt";
fileList($list,$path);