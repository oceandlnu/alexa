<?php
/**
 * Created by PhpStorm.
 * User: Ocean
 * Date: 2017/11/2
 * Time: 16:40
 */
//declare(encoding='UTF-8');
header("Content-type:text/html;charset=utf-8");
date_default_timezone_set("Asia/Shanghai");

class Upload
{
    var $currentTime; //当前日期时间，精确到秒
    var $currentDate;   //当前日期，精确到天
    var $extension;     //文件后缀名
    var $fileExten;    //文件保存后缀名为.log
    var $filePath;     //文件存储根目录
    var $fileOption;   //当天文件存储的目录

    //构造函数
    public function __construct()
    {
        $this->currentTime = date("H:i:s",time());
        $this->currentDate = date("Y-m-d",time());
        $this->extension = "log";
        $this->fileExten = "." . $this->extension;
        $this->filePath = "log";
        $this->fileOption = $this->filePath . "/" . $this->currentDate . "/";
    }

    //上传内容
    private function uploadContent()
    {
        $text = $_POST["textarea"];
        if ($text) {
            $file = fopen($this->fileOption . $this->currentTime . $this->fileExten, "x") or die("<script type='text/javascript'>alert('上传失败');</script>");
            fwrite($file, $text);
            echo "<script type='text/javascript'>alert('上传成功');</script>";  //换行符
            fclose($file);
        } else {
            echo "<script type='text/javascript'>alert('内容为空');</script>";
        }
    }

    //上传文件
    private function file()
    {
        $allowedExts = array("txt", "log", "gif", "jpeg", "jpg", "png", "zip", "vcf");
        $maxSize = 1024 * 100000;//100M
        $length = count($_FILES["file"]["name"]);

        for ($i=0;$i<$length;$i++){
//            var_dump($_FILES["file"]["name"]);
//            exit;
            $temp = explode(".", $_FILES["file"]["name"][$i]);
//        var_dump($temp);
            $extension = strtolower(end($temp));
            $fileExten = "." . $extension;
            if (($_FILES["file"]["size"][$i] < $maxSize) && in_array($extension, $allowedExts)) {
                if ($_FILES["file"]["error"][$i] > 0) {
                    echo "<script type='text/javascript'>alert('上传文件过大');</script>";
                } else {
                    echo "<script type='text/javascript'>alert('上传成功');</script>";
                    // 过滤#和空格，替换为_
                    //#表示注释，必须替换，否则下载文件会出错
                    $_FILES["file"]["name"][$i] = str_replace(" ", "_", $_FILES["file"]["name"][$i]);
                    $_FILES["file"]["name"][$i] = str_replace("#", "_", $_FILES["file"]["name"][$i]);
                    if (file_exists($this->fileOption . $_FILES["file"]["name"][$i])) {
                        $filename = "";
                        for ($j = 0; $j < count($temp) - 1; $j++) {
                            if ($j < count($temp)-2) {
                                $filename .= $temp[$j] . ".";
                            }else {
                                $filename .= $temp[$j];
                            }

                        }
//                        var_dump($fileExten);
                        move_uploaded_file($_FILES["file"]["tmp_name"][$i], $this->fileOption . $filename."_".$this->currentTime.$fileExten);
                    } else {
                        move_uploaded_file($_FILES["file"]["tmp_name"][$i], $this->fileOption . $_FILES["file"]["name"][$i]);
//                echo "文件存储在: " . $fileOption . $_FILES["file"]["name"];
                    }
                }
            } else {
                echo "<script type='text/javascript'>alert('非法的文件格式：{$extension}');</script>";
            }
        }

    }

    public function isFile($flag)
    {
        if (file_exists($this->fileOption)) {
            //如果存在则不用创建
        } else {
            //创建目录
            var_dump(mkdir($this->fileOption,0777,true));
            // chmod($this->fileOption,0777);
        }
        if ($flag == 0)
            $this->uploadContent();
        else
            $this->file();
    }
}

$upload = new Upload();
$flag = $_POST['flag'];
$upload->isFile($flag);

echo '<meta http-equiv="refresh" content="0;url=../index.html"/>';
?>