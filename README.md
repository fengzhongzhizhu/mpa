## Build Setup

``` bash
# 安装依赖
npm install

# 开发的时候在本地启localhost:8080，并开始热加载
npm run dev

# production的发布时打包
npm run build

```
 
## 开发流程

如果增加新页面，只需两步，不需要改webpack等配置文件

1. 在pages中新增一个文件夹
2. 在page.config.js中添加这个页面的信息即可

比如
```
  {
    name: 'contact',
    html: 'contact/contact.html',
    jsEntry: 'contact/contact.js'
  }

```


 