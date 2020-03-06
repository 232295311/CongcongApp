本项目未上线，需要在本地局域网内运行。需要运行电脑装有node.js 

#####`Network` 地址获取
1.按下 【WINDOWS + R 快捷键】，打开运行窗口
2.输入 【cmd】，按下 回车键，进入命令提示行
3.在命令行内cd到Congcong-vue文件夹所处位置
4.npm install
5.npm run serve
6.记录出现的形如（http://172.21.82.114:8080/）网络地址，且【不要关闭】npm窗口
7.进行第二项 运行项目。

#### 运行项目
 1. 使用 `AndroidStudio` 运行 `Congcong_android` 项目
 2. 首次运行会自动下载项目配置和依赖
 3. 依赖下载完成之后，因本项目未上线，所以需要在本地局域网内运行
 4. 修改'app/src/main/java/cn/sunday/imoochybridandroidnative/constants/UrlConstants.java` 下的 `BASE_WEB_URL` 为需要访问项目的 `Network` 地址。（如http://172.21.82.114:8080/）
 5. 如果在 Android 9.0 以上设备中运行，还需修改 `/app/src/main/res/xml/network_security_config.xml` 文件中的 `domain` 标签中的内容为`Network`地址（不包含 `http://` 和 端口号）(如172.21.82.114）
 6. 注意：`domain` 中必须保存 `lgdsunday.club` 以应对接口中图片资源的访问

点击 `run app` 运行项目