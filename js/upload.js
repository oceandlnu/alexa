//导入文件
$("#import").click(function () {//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
    $("#files").click();
});

function readText(){
    var selectedFile = document.getElementById("files").files;//获取读取的File对象
    var length = selectedFile.length;
    var name;//读取选中文件的文件名
    var size;
    for(var i=0;i<length;i++) {
        name = selectedFile[i].name;//读取选中文件的文件名
        size = (Math.round(selectedFile[i].size));//读取选中文件的大小
        type = selectedFile[i].type;//读取选中文件的类型
        // console.log("文件名:"+name+"大小："+size);
        document.getElementById("textArea").value += "文件名:"+name+"\n大小："+size+" Byte\n"+"类型："+type+"\n\n";

/*        var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
        reader.readAsText(selectedFile);//读取文件的内容

        reader.onload = function(){
            console.log(this.result);//当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
        };*/
    }
    document.getElementById("textArea").setAttribute("readonly","true");
}