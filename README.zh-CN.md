<!--
 * @description: 
 * @Date: 2019-07-02 18:49:08
 * @LastEditors: Pyw
 * @LastEditTime: 2019-07-02 18:49:08
 -->
## 本地开发
### swagger/postman文件导入到rap2中, 仅供参考，swagger request body 可能有问题
- swagger 转 rap2 swagger为swagger导出的文件

- postman 转 rap2 postman.json 为postman导出的文件

- 如果打开http://localhost:7002/ 显示'input success!'表示完成

- rap2.json 来自 http://你的rap2地址/repository/get?id=仓库id
- 可以在rap2的接口里找到 http://rap2.taobao.org/api
- rap2 转 swagger rap2ToSwagger.json 为rap2导出的文件


```bash
$ npm i
$ node swaggerToRap2.js swagger.json
$ node postmanToRap2.js postman.json
$ npm run service
$ open http://localhost:7002/

$ node rap2TopSwagger.js rap2.json
```

###  rap2 转 swagger 代码来自此链接
https://blog.csdn.net/youyouwoxing1991/article/details/100916403
