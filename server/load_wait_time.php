<?php
/**
 * Created by PhpStorm.
 * User: ocean
 * Date: 17-12-13
 * Time: 下午11:28
 */
header("Content-type:text/add_list;charset=utf-8");
date_default_timezone_set("Asia/Shanghai");

function load_sleep_time($sleepTime){
    $i=0;
    foreach ($sleepTime as $key => $value)
    {
        echo "<dd value=\"${value}\" onclick='selectTime(\"${value}\",\"$i\")'>${key}</dd>";
        $i++;
    }
}
$arrSleepTime = array(
    "5s"=>5,
    "10s"=>10,
    "15s"=>15,
    "20s"=>20,
    "30s"=>30,
    "1min"=>60,
    "3min"=>180,
    "5min"=>300,
    "10min"=>600,
    "15min"=>900,
    "30min"=>1800,
    "1h"=>3600
);

load_sleep_time($arrSleepTime);