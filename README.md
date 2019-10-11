<!--
 * @description: 
 * @Date: 2019-07-02 18:49:08
 * @LastEditors: Pyw
 * @LastEditTime: 2019-07-02 18:49:08
 -->
## 本地开发
### swagger/postman.json input rap2，for reference only, swagger 'request body' may have some problem

- swagger input rap2 swagger.json (is swagger export file)

- postman input rap2 (postman.json is postman export file)

- if open http://localhost:7002/, 'input success!' means finished.

- rap2.json from http://yourRap2Address/repository/get?id=:repositoryId
- rap2 input swagger (rap2TopSwagger.json is rap2 export file)


```bash
$ npm i
$ change config/config.default.js
$ change config/setting.js
$ node swaggerToRap2.js swagger.json
$ node postmanToRap2.js postman.json
$ npm run service
$ open http://localhost:7002/

$ node rap2TopSwagger.js rap2.json
```


rap2TopSwagger.js copy from this link
https://blog.csdn.net/youyouwoxing1991/article/details/100916403
