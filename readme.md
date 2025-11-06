# cainiao-url

### 在使用的页面直接引用

#### npm 方式

```js
npm i url-new --save

import URL from 'url-new'

```

#### uniapp 方式

```js
// 从自己所放到路径引入，检查下面路径是否正确
import URL from '@/js_sdk/cainiao-url/cainiao-url.js'

```

#### 使用示例

```js
const url1 = new MyURL('https://www.example.com:8080/path/to/page?name=john&age=25#section');
console.log(url1.protocol);    // https:
console.log(url1.hostname);    // www.example.com
console.log(url1.port);        // 8080
console.log(url1.pathname);    // /path/to/page
console.log(url1.search);      // ?name=john&age=25
console.log(url1.hash);        // #section
console.log(url1.toString());  // https://www.example.com:8080/path/to/page?name=john&age=25#section

// 测试 URLSearchParams
const params = new URLSearchParams('?name=john&age=25');
params.append('city', 'newyork');
console.log(params.toString()); // ?name=john&age=25&city=newyork
console.log(params.get('name')); // john
```