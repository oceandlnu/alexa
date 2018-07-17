<?php
/**
 * Created by PhpStorm.
 * User: ocean
 * Date: 17-11-17
 * Time: 下午6:52
 */

header("Content-type:text/add_list;charset=utf-8");
date_default_timezone_set("Asia/Shanghai");

function fileList($path){
    $item=scandir($path);
//    echo '<ol class="ol">';
    foreach($item as $k=>$v){
        if($v=='.' || $v=='..') continue;
        $temp = explode(".", $v);
        $extension = $temp[0];
        echo "<option value={$extension}>{$extension}</option>";
    }
//    echo '</ol>';
}
$path = "../list";
fileList($path);