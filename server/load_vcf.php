<?php
/**
 * Created by PhpStorm.
 * User: ocean
 * Date: 17-12-7
 * Time: 下午5:47
 */
/**
 * 读取.vcf格式文件
 * @param $filename
 */
function readVcf($filename){
    if ($file = fopen($filename,"r")){
        $index=0;
        $userInfo = "";
        while(! feof($file))
        {
            $line=fgets($file);
            $encoding = mb_detect_encoding($line, array('GB2312','GBK','UTF-16','UCS-2','UTF-8','BIG5','ASCII'));
            $content = iconv($encoding, "utf-8", $line);
            $arr = explode(":",$content) ;
            if($arr[0]=="NOTE;ENCODING=QUOTED-PRINTABLE"){
                $temp= quoted_printable_decode($arr[1]);
                $encoding = mb_detect_encoding($temp, array('GB2312','GBK','UTF-16','UCS-2','UTF-8','BIG5','ASCII'));
                $arr[1] = iconv($encoding, "utf-8", $temp);
            }
            if($arr[0] == "FN" && count($arr) == 2){
                $userInfo = trim($arr[1]);
                echo "<dd value =\"${userInfo}\" onclick='selectName(\"${userInfo}\",\"${index}\")'>${userInfo}</dd>";
                $index++;
            }
        }
        fclose($file);
    }else{
        $userInfo="未识别到vcf文件，请确认目录下有contacts.vcf文件";
        $index=0;
        echo "<dd value =\"${userInfo}\" onclick='selectName(\"${userInfo}\",\"${index}\")'>${userInfo}</dd>";
    }
}

//$file=$_POST["file"];
readVcf("contacts.vcf");