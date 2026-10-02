// Whop pixel for the Off-Grid Water Vault lane only.
// WATER_BIZ must be the Water Vault's own Whop business id (biz_...). Never a Mad EZ, MIL or EZ id.
// While it's empty, nothing loads and owvWhop() is a no-op, so pages can call it safely.
(function () {
  var WATER_BIZ = 'biz_QMumkXr0qSGd2L';
  window.owvWhop = function () {};
  if (!/^biz_[A-Za-z0-9]+$/.test(WATER_BIZ)) return;
  !function(w,d,s,u,n,a,b){if(w[n])return;a=w[n]={q:[],t:+new Date,s:[],o:u,track:function(){a.q.push([+new Date].concat([].slice.call(arguments)))},setScope:function(){a.s=[].slice.call(arguments).filter(function(x){return typeof x==="string"});a.q.push([+new Date,"setScope"].concat(a.s))},scope:function(){var c=[].slice.call(arguments);return{track:function(){a.q.push([+new Date].concat([].slice.call(arguments)).concat([{__scope:c}]))}}}};b=d.createElement(s);b.async=1;b.src=u+"/s.js";d.getElementsByTagName(s)[0].parentNode.insertBefore(b,d.getElementsByTagName(s)[0])}(window,document,"script","https://t.whop.tw","whop");
  window.whop.setScope(WATER_BIZ);
  window.whop.track('page');
  window.owvWhop = function (event) { try { window.whop.track(event); } catch (e) {} };
})();
