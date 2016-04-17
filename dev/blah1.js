var dataScript = document.body.dataset.dataScript;

__includeScr(dataScript +
             (window.__rlah ? window.__rlah() || '0' : '0') +
             '/' +
             window.Math.random().toString().substr(2) +
             '/');
