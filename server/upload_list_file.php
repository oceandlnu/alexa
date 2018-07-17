<?php
/**
 * Created by PhpStorm.
 * User: Ocean
 * Date: 2017/11/2
 * Time: 16:40
 */
//declare(encoding='UTF-8');
header("Content-type:text/add_list;charset=utf-8");
date_default_timezone_set("Asia/Shanghai");

class Upload
{
    var $extension;     //文件后缀名
    var $fileExten;    //文件保存后缀名为.log
    var $filePath;     //文件存储根目录
    var $fileOption;   //当天文件存储的目录

    //构造函数
    public function __construct()
    {
    	$this->extension = "txt";
    	$this->fileExten = "." . $this->extension;
    	$this->filePath = "../list";
    	$this->fileOption = $this->filePath . "/";
    }

    //上传文件
    private function file()
    {
    	$allowedExts = array("txt", "log", "vcf");
        $maxSize = 1024 * 100000;//100M
        $length = count($_FILES["file"]["name"]);
        // var_dump($length);

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
                    // 过滤#和空格，替换为_
        			$_FILES["file"]["name"][$i] = str_replace(" ", "_", $_FILES["file"]["name"][$i]);
        			$_FILES["file"]["name"][$i] = str_replace("#", "_", $_FILES["file"]["name"][$i]);
        			if (file_exists($this->fileOption . $_FILES["file"]["name"][$i])) {
        				echo "<script type='text/javascript'>alert('已存在相同名称文件，上传失败');</script>";
        			} else {
        				move_uploaded_file($_FILES["file"]["tmp_name"][$i], $this->fileOption . $_FILES["file"]["name"][$i]);
        				echo "<script type='text/javascript'>alert('上传成功，文件存储在：{$this->fileOption}{$_FILES['file']['name'][$i]}');</script>";
        			}
        		}
        	} else {
        		echo "<script type='text/javascript'>alert('非法的文件格式：{$extension}');</script>";
        	}
        }

    }

    public function isFile()
    {
    	if (file_exists($this->filePath)) {
            //如果存在则不用创建
    	} else {
            //create
    		mkdir($this->filePath);
    	}
    	$this->file();
    }
}

$upload = new Upload();
$upload->isFile();
echo '<meta http-equiv="refresh" content="1;url=../index.php"/>';
?>