<?php
/**
 * Created by PhpStorm.
 * User: ocean
 * Date: 17-11-11
 * Time: 下午12:19
 */

//以下代码是创建一个本目录下文件的列表（带有链接地址）
header("Content-type:text/html;charset=utf-8");
date_default_timezone_set("Asia/Shanghai");

function clearFiles($path,$flag=0){
    $item=scandir($path,0);
    $currentDateStamp=strtotime(date("Y-m-d",time()));//获取当前日期的时间戳
    foreach($item as $k=>$v){
        if($v=='.' || $v=='..') continue;
        $fileDir = $v;
        $v=$path.'/'.$v;
        if(is_dir($v)){
            $fileDirStamp=strtotime($fileDir);//得到目录的时间戳
            $dateDiffer=($currentDateStamp-$fileDirStamp)/3600/24;//得到日期差
//            var_dump($dateDiffer);
            if ($dateDiffer >= 5){//删除日期差大于等于5天的文件
                clearFiles($v,1);
                rmdir($v);
            }else{
                clearFiles($v);
            }
        }elseif ($flag == 1){
            unlink($v);
        }
    }
}

//declare(encoding='UTF-8');
//echo '<span class="filename">文件名</span>';
//echo '<span class="updatetime">上传时间</span>';
function fileList($path){
    $root="server/";
    $item=scandir($path,1);
    echo '<ol class="ol">';
    foreach($item as $k=>$v){
        if($v=='.' || $v=='..') continue;
        $fileDir = $v;
        $v=$path.'/'.$v;
        if(is_dir($v)){
                echo '<li class="li">'.$fileDir.'</li>';
            fileList($v);
        }else{
            //清除文件状态缓存
            clearstatcache();
            echo '<li class="li"><a href="'.$root.$v.'" download>'.$fileDir.'</a>';
            echo '<span>'.date("Y-m-d H:i:s",filectime($v)).'</span></li>';
        }
    }
    echo '</ol>';
}

$path = "log";  //路径
clearFiles($path);
fileList($path);
//$fileList = new Download();
//$fileList->fileList($path);
?>
