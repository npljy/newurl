class URL {
  constructor(url) {
    this._parseURL(url);
  }

  _parseURL(url) {
    // 基础正则匹配协议、主机、路径等
    const urlRegex = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    const match = url.match(urlRegex);
    
    if (!match) {
      throw new Error('Invalid URL');
    }

    // 解析各个部分
    this.protocol = match[2] || '';
    this.host = match[4] || '';
    this.pathname = match[5] || '/';
    this.search = match[6] || '';
    this.hash = match[8] || '';
    this.searchParams = new URLSearchParams(this.search.slice(1));

    // 进一步解析主机部分
    if (this.host) {
      const hostParts = this.host.split(':');
      this.hostname = hostParts[0];
      this.port = hostParts[1] || '';
    } else {
      this.hostname = '';
      this.port = '';
    }

    // 构建 origin
    this.origin = this.protocol && this.host ? 
      `${this.protocol}//${this.host}` : '';
  }

  toString() {
    let result = '';
    if (this.protocol) result += `${this.protocol}:`;
    if (this.host) result += `//${this.host}`;
    result += this.pathname;
    result += this.search;
    result += this.hash;
    return result;
  }

  toJSON() {
    return this.toString();
  }
}

// URLSearchParams 的简单实现
class URLSearchParams {
  constructor(init = '') {
    this._params = new Map();
    
    if (typeof init === 'string') {
      this._parseString(init);
    } else if (init instanceof URLSearchParams) {
      init.forEach((value, key) => {
        this.append(key, value);
      });
    } else if (init && typeof init === 'object') {
      Object.entries(init).forEach(([key, value]) => {
        this.append(key, value);
      });
    }
  }

  _parseString(search) {
    if (search.startsWith('?')) {
      search = search.slice(1);
    }
    
    const pairs = search.split('&');
    pairs.forEach(pair => {
      const [key, value = ''] = pair.split('=');
      if (key) {
        this.append(decodeURIComponent(key), decodeURIComponent(value));
      }
    });
  }

  append(key, value) {
    const current = this._params.get(key);
    if (current) {
      current.push(String(value));
    } else {
      this._params.set(key, [String(value)]);
    }
  }

  delete(key) {
    this._params.delete(key);
  }

  get(key) {
    const values = this._params.get(key);
    return values ? values[0] : null;
  }

  getAll(key) {
    return this._params.get(key) || [];
  }

  has(key) {
    return this._params.has(key);
  }

  set(key, value) {
    this._params.set(key, [String(value)]);
  }

  forEach(callback) {
    this._params.forEach((values, key) => {
      values.forEach(value => {
        callback(value, key, this);
      });
    });
  }

  toString() {
    const pairs = [];
    this._params.forEach((values, key) => {
      values.forEach(value => {
        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      });
    });
    return pairs.length > 0 ? `?${pairs.join('&')}` : '';
  }
}


export default URL;