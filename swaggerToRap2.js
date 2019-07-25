#!/usr/bin/env node

const path = process.argv[2];
console.log(path);

const fs = require('fs');
const postMan = JSON.parse(fs.readFileSync(path, 'utf-8'));
console.log('加载postman配置文件成功');
// 获取url数组
let urlNameArr = Object.keys(postMan.paths);
let count = 1000000;
// 属性数组
let proportyList = [];
// 接口数组
let interfaceList = [];
// 模块数组
let moduleList = [];
for (const un of urlNameArr) {
  const url = un;
  // 方法名字数组
  let methodNameArr = Object.keys(postMan.paths[un]);
  for (const me of methodNameArr) {
    const methodObj = postMan.paths[un][me]; // get{}
    // 设置模块
    const tags = methodObj.tags ? methodObj.tags : null;
    if (methodObj.tags) {
      setModule(methodObj.tags);
    }
    // 接口
    const method = me.toUpperCase(); // get
    const description = methodObj.description ? methodObj.description : null;
    setInterface(url, method, description, tags);
    // request
    if (methodObj.parameters) {
      setReqProporty(methodObj.parameters, url, method, tags);
    }
    // response
    if (methodObj.responses && methodObj.responses[200] && methodObj.responses['200'].schema) {
      setResProporty(methodObj.responses['200'].schema, url, method, 'response', 3, tags);
    }
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

function setPropeties(resString, url, method, scope, pos, tag, parentId) {
  const responArr = resString.split('/');
  let info = postMan;
  if (responArr.length > 1) {
    for (let k = 1; k < responArr.length; k++) {
      info = info[responArr[k]];
    }
    setResProporty(info, url, method, scope, pos, tag, parentId);
  }
}

// 设置response属性
function setResProporty(schema, url, method, scope, pos, tag, parentId = -1, res = false) {
  // allof
  if (schema.allOf && schema.allOf.length) {
    for (const all of schema.allOf) {
      if (all.$ref) {
        setPropeties(all.$ref, url, method, scope, pos, tag, parentId);
      }
    }
  }
  if (schema.required) {
    for (const re of schema.required) {
      if (schema.properties) {
        const prot = schema.properties[re];
        setProporty(
          pos,
          url,
          method,
          scope,
          re,
          prot && prot.required ? prot.required : false,
          prot && prot.description ? prot.description : null,
          tag,
          prot && prot.type ? prot.type : 'object',
          parentId
        );
      }
    }
  }
  // properties {}
  if (!res && schema.properties) {
    const propArr = Object.keys(schema.properties);
    for (const prop of propArr) {
      const p = schema.properties[prop]; // properties.purchasedList
      if (p.items) {
        ++count;
        setProporty(
          pos,
          url,
          method,
          scope,
          prop,
          p.required ? p.required : false,
          p.description ? p.description : null,
          tag,
          p.type ? p.type : 'array',
          parentId,
          -count
        );
        setResProporty(p.items, url, method, scope, pos, tag, count);
      } else if (p.$ref) {
        ++count;
        setProporty(
          pos,
          url,
          method,
          scope,
          prop,
          p.required ? p.required : false,
          p.description ? p.description : null,
          tag,
          p.type ? p.type : 'object',
          parentId,
          -count
        );
        setPropeties(p.$ref, url, method, scope, pos, tag, count);
      } else {
        if (p.type && p.type == 'object') {
          ++count;
          setProporty(
            pos,
            url,
            method,
            scope,
            prop,
            p.required ? p.required : false,
            p.description ? p.description : null,
            tag,
            p.type ? p.type : 'object',
            parentId,
            -count
          );
          setResProporty(p, url, method, scope, pos, tag, count);
        } else {
          setProporty(
            pos,
            url,
            method,
            scope,
            prop,
            p.required ? p.required : false,
            p.description ? p.description : null,
            tag,
            p.type ? p.type : 'object',
            parentId
          );
        }
      }
    }
  }
  // $ref
  if (schema.$ref) {
    setPropeties(schema.$ref, url, method, scope, pos, tag, parentId);
  }
  if (schema.items) {
    ++count;
    setProporty(
      pos,
      url,
      method,
      scope,
      'schema',
      schema.required ? schema.required : false,
      schema.description ? schema.description : null,
      tag,
      schema.type ? schema.type : 'array',
      parentId,
      -count
    );
    setResProporty(schema.items, url, method, scope, pos, tag, count);
  }
}
// 设置request属性
function setReqProporty(parameters, url, method, tag) {
  for (const pa of parameters) {
    let pos = 0;
    switch (pa.in) {
      case 'header':
        pos = 1;
        break;
      case 'query':
        pos = 2;
        break;
      case 'body':
        pos = 3;
        break;
    }
    if (pos != 3) {
      setProporty(
        pos,
        url,
        method,
        'request',
        pa.name ? pa.name : null,
        pa.required ? pa.required : false,
        pa.description ? pa.description : null,
        tag,
        pa.type ? pa.type : 'object',
        -1
      );
    } else {
      if (pa.schema) {
        setResProporty(pa.schema, url, method, 'request', pos, tag, -1, true);
        // 第二种 "type": "array",
      }
    }
  }
}

// 设置属性
function setProporty(
  pos,
  url,
  method,
  scope,
  name,
  required,
  description,
  tags,
  type,
  parentId = -1,
  rule = 1
) {
  proportyList.push({
    description: description ? description : null,
    interfaceUrl: url,
    interfaceMethod: method,
    // moduleName: tags ? tags[0] : null,
    name: name || description || '',
    parentId,
    pos,
    repositoryId: 18,
    required: required ? required : false,
    scope,
    type: type ? type : 'object',
    rule
  });
}

// 设置模块
function setInterface(url, method, description, tags) {
  interfaceList.push({
    description,
    lockerId: null,
    method,
    moduleName: tags ? tags[0] : null,
    name: description,
    url
  });
}
// 设置模块
function setModule(tags) {
  if (tags) {
    let index = -1;
    for (let j = 0; j < moduleList.length; j++) {
      if (moduleList[j].name === tags[0]) {
        break;
      } else {
        index = j;
      }
    }
    if (index == moduleList.length - 1) {
      moduleList.push({
        name: tags[0],
        description: tags[0]
      });
    }
  }
}
