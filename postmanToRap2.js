// #!/usr/bin/env node

const path = process.argv[2];

const fs = require('fs');
const postMan = JSON.parse(fs.readFileSync(path, 'utf-8'));
console.log('加载postman配置文件成功');
// 获取模块名称数组
const moduleNameArr = postMan.item;
let count = 1000000;
// 属性数组
const proportyList = [];
// 接口数组
const interfaceList = [];
// 模块数组
const moduleList = [];
for (const un of moduleNameArr) {
  // 设置模块
  if (un.name) {
    setModule(un.name);
  }
  for (const me of un.item) {
    setMethod(me, un.name);
  }
}

fs.writeFileSync('rap-proportyList.js', 'module.exports =' + JSON.stringify(proportyList), 'utf-8');
fs.writeFileSync(
  'rap-interfaceList.js',
  'module.exports =' + JSON.stringify(interfaceList),
  'utf-8'
);
fs.writeFileSync('rap-moduleList.js', 'module.exports =' + JSON.stringify(moduleList), 'utf-8');
console.log('导出成功');


function setMethod(me, moduleName) {
  let url = me.request.url.raw || me.request.url;
  url = url.replace('{{url}}', '');
  url = url.match(/[^?]+(?=[?])/g) ? url.match(/[^?]+(?=[?])/g)[0] : url;
  setInterface(me.name, url, me.request.method, me.request.description, moduleName);
  if (me.request.header) {
    batchProporty(me.request.header, url, 1, me.request.method, moduleName);
  }
  if (me.request.url.query) {
    batchProporty(me.request.url.query, url, 2, me.request.method, moduleName);
  }
  if (me.request.body && me.request.body.raw) {
    const body = JSON.parse(me.request.body.raw);
    const names = Object.keys(body);
    for (const he of names) {
      setProporties(3, url, me.request.method, he, body[he], moduleName, -1);
    }
  }
}
// 设置属性层次
function setProporties(pos, url, method, name, value, moduleName, parentId) {
  if (value instanceof Array) {
    ++count;
    setProporty(pos, url, method, name, JSON.stringify(value), moduleName, parentId, 'array', -count);
    // for (const b of value) {
    //   setProporties(pos, url, method, null, b, moduleName, count);
    // }
  } else if (typeof value === 'object') {
    ++count;
    setProporty(pos, url, method, name, null, moduleName, parentId, 'object', -count);
    if (value && JSON.stringify(value) !== '{}') {
      const names = Object.keys(value);
      for (const n of names) {
        setProporties(pos, url, method, n, value[n], moduleName, count);
      }
    }
  } else {
    setProporty(pos, url, method, name, value, moduleName, parentId, typeof value);
  }
}


function batchProporty(query, url, pos, method, moduleName) {
  for (const he of query) {
    setProporty(pos, url, method, he.key, he.value, moduleName, -1, typeof he.value);
  }
}

// 设置属性
function setProporty(pos, url, method, name, value, moduleName, parentId = -1, type = 'string', rule = -1) {
  proportyList.push({
    interfaceUrl: url,
    interfaceMethod: method,
    // moduleName,
    name,
    parentId,
    pos,
    repositoryId: 18,
    required: false,
    scope: 'request',
    type: type ? type : 'object',
    value,
    rule,
  });
}

// 设置模块
function setInterface(name, url, method, description, moduleName) {
  interfaceList.push({
    description,
    lockerId: null,
    method,
    moduleName,
    name,
    url,
  });
}

// 设置模块
function setModule(name) {
  moduleList.push({
    name,
    description: name,
  });

}
