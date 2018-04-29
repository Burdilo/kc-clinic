
// _jquery.js

/*! jQuery v1.7 jquery.com | jquery.org/license */
(function(a,b){function cA(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cx(a){if(!cm[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cn||(cn=c.createElement("iframe"),cn.frameBorder=cn.width=cn.height=0),b.appendChild(cn);if(!co||!cn.createElement)co=(cn.contentWindow||cn.contentDocument).document,co.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),co.close();d=co.createElement(a),co.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cn)}cm[a]=e}return cm[a]}function cw(a,b){var c={};f.each(cs.concat.apply([],cs.slice(0,b)),function(){c[this]=a});return c}function cv(){ct=b}function cu(){setTimeout(cv,0);return ct=f.now()}function cl(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ck(){try{return new a.XMLHttpRequest}catch(b){}}function ce(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cd(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function cc(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bG.test(a)?d(a,e):cc(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)cc(a+"["+e+"]",b[e],c,d);else d(a,b)}function cb(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function ca(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bV,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=ca(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=ca(a,c,d,e,"*",g));return l}function b_(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bR),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bE(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bz:bA;if(d>0){c!=="border"&&f.each(e,function(){c||(d-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?d+=parseFloat(f.css(a,c+this))||0:d-=parseFloat(f.css(a,"border"+this+"Width"))||0});return d+"px"}d=bB(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0,c&&f.each(e,function(){d+=parseFloat(f.css(a,"padding"+this))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+this+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+this))||0)});return d+"px"}function br(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bi,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bq(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bp(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bp)}function bp(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bo(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bn(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bm(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bl(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function X(a){var b=Y.split(" "),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function W(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(R.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function V(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function N(){return!0}function M(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function K(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(K,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=/-([a-z]|[0-9])/ig,x=/^-ms-/,y=function(a,b){return(b+"").toUpperCase()},z=d.userAgent,A,B,C,D=Object.prototype.toString,E=Object.prototype.hasOwnProperty,F=Array.prototype.push,G=Array.prototype.slice,H=String.prototype.trim,I=Array.prototype.indexOf,J={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7",length:0,size:function(){return this.length},toArray:function(){return G.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?F.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),B.add(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(G.apply(this,arguments),"slice",G.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:F,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;B.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!B){B=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",C,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",C),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&K()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return a!=null&&m.test(a)&&!isNaN(a)},type:function(a){return a==null?String(a):J[D.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!E.call(a,"constructor")&&!E.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||E.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(x,"ms-").replace(w,y)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:H?function(a){return a==null?"":H.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?F.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(I)return I.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=G.call(arguments,2),g=function(){return a.apply(c,f.concat(G.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){J["[object "+b+"]"]=b.toLowerCase()}),A=e.uaMatch(z),A.browser&&(e.browser[A.browser]=!0,e.browser.version=A.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?C=function(){c.removeEventListener("DOMContentLoaded",C,!1),e.ready()}:c.attachEvent&&(C=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",C),e.ready())}),typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return e});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){return i.done.apply(i,arguments).fail.apply(i,arguments)},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/><nav></nav>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=a.getElementsByTagName("input")[0],k={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,unknownElems:!!a.getElementsByTagName("nav").length,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:a.className!=="t",enctype:!!c.createElement("form").enctype,submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,k.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,k.optDisabled=!h.disabled;try{delete a.test}catch(v){k.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function(){k.noCloneEvent=!1}),a.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),k.radioValue=i.value==="t",i.setAttribute("checked","checked"),a.appendChild(i),l=c.createDocumentFragment(),l.appendChild(a.lastChild),k.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",m=c.getElementsByTagName("body")[0],o=c.createElement(m?"div":"body"),p={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},m&&f.extend(p,{position:"absolute",left:"-999px",top:"-999px"});for(t in p)o.style[t]=p[t];o.appendChild(a),n=m||b,n.insertBefore(o,n.firstChild),k.appendChecked=i.checked,k.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,k.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",q=a.getElementsByTagName("td"),u=q[0].offsetHeight===0,q[0].style.display="",q[1].style.display="none",k.reliableHiddenOffsets=u&&q[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",a.appendChild(j),k.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(a.attachEvent)for(t in{submit:1,change:1,focusin:1})s="on"+t,u=s in a,u||(a.setAttribute(s,"return;"),u=typeof a[s]=="function"),k[t+"Bubbles"]=u;f(function(){var a,b,d,e,g,h,i=1,j="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",l="visibility:hidden;border:0;",n="style='"+j+"border:5px solid #000;padding:0;'",p="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>";m=c.getElementsByTagName("body")[0];!m||(a=c.createElement("div"),a.style.cssText=l+"width:0;height:0;position:static;top:0;margin-top:"+i+"px",m.insertBefore(a,m.firstChild),o=c.createElement("div"),o.style.cssText=j+l,o.innerHTML=p,a.appendChild(o),b=o.firstChild,d=b.firstChild,g=b.nextSibling.firstChild.firstChild,h={doesNotAddBorder:d.offsetTop!==5,doesAddBorderForTableAndCells:g.offsetTop===5},d.style.position="fixed",d.style.top="20px",h.fixedPosition=d.offsetTop===20||d.offsetTop===15,d.style.position=d.style.top="",b.style.overflow="hidden",b.style.position="relative",h.subtractsBorderForOverflowNotVisible=d.offsetTop===-5,h.doesNotIncludeMarginInBodyOffset=m.offsetTop!==i,m.removeChild(a),o=a=null,f.extend(k,h))}),o.innerHTML="",n.removeChild(o),o=l=g=h=m=j=a=i=null;return k}(),f.boxModel=f.support.boxModel;var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[f.expando]:a[f.expando]&&f.expando,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[f.expando]=n=++f.uuid:n=f.expando),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[f.expando]:f.expando;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)?b=b:b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" "));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[f.expando]:a.removeAttribute?a.removeAttribute(f.expando):a[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];if(!arguments.length){if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}return b}e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!a||j===3||j===8||j===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g},removeAttr:function(a,b){var c,d,e,g,h=0;if(a.nodeType===1){d=(b||"").split(p),g=d.length;for(;h<g;h++)e=d[h].toLowerCase(),c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1)}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return b;h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/\.(.*)$/,A=/^(?:textarea|input|select)$/i,B=/\./g,C=/ /g,D=/[^\w\s.|`]/g,E=/^([^\.]*)?(?:\.(.+))?$/,F=/\bhover(\.\S+)?/,G=/^key/,H=/^(?:mouse|contextmenu)|click/,I=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,J=function(a){var b=I.exec(a);b&&
(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},K=function(a,b){return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||a.id===b[2])&&(!b[3]||b[3].test(a.className))},L=function(a){return f.event.special.hover?a:a.replace(F,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=L(c).split(" ");for(k=0;k<c.length;k++){l=E.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,namespace:n.join(".")},p),g&&(o.quick=J(g),!o.quick&&f.expr.match.POS.test(g)&&(o.isPositional=!0)),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d){var e=f.hasData(a)&&f._data(a),g,h,i,j,k,l,m,n,o,p,q;if(!!e&&!!(m=e.events)){b=L(b||"").split(" ");for(g=0;g<b.length;g++){h=E.exec(b[g])||[],i=h[1],j=h[2];if(!i){j=j?"."+j:"";for(l in m)f.event.remove(a,l+j,c,d);return}n=f.event.special[i]||{},i=(d?n.delegateType:n.bindType)||i,p=m[i]||[],k=p.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;if(c||j||d||n.remove)for(l=0;l<p.length;l++){q=p[l];if(!c||c.guid===q.guid)if(!j||j.test(q.namespace))if(!d||d===q.selector||d==="**"&&q.selector)p.splice(l--,1),q.selector&&p.delegateCount--,n.remove&&n.remove.call(a,q)}else p.length=0;p.length===0&&k!==p.length&&((!n.teardown||n.teardown.call(a,j)===!1)&&f.removeEvent(a,i,e.handle),delete m[i])}f.isEmptyObject(m)&&(o=e.handle,o&&(o.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"",(g||!e)&&c.preventDefault();if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,n=null;for(m=e.parentNode;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length;l++){m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d);if(c.isPropagationStopped())break}c.type=h,c.isDefaultPrevented()||(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=(f.event.special[c.type]||{}).handle,j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click"))for(m=c.target;m!=this;m=m.parentNode||this){o={},q=[];for(k=0;k<e;k++)r=d[k],s=r.selector,t=o[s],r.isPositional?t=(t||(o[s]=f(s))).index(m)>=0:t===b&&(t=o[s]=r.quick?K(m,r.quick):f(m).is(s)),t&&q.push(r);q.length&&j.push({elem:m,matches:q})}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){p=j[k],c.currentTarget=p.elem;for(l=0;l<p.matches.length&&!c.isImmediatePropagationStopped();l++){r=p.matches[l];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=(i||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement wheelDelta".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},focus:{delegateType:"focusin",noBubble:!0},blur:{delegateType:"focusout",noBubble:!0},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?N:M):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=N;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=N;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=N,this.stopPropagation()},isDefaultPrevented:M,isPropagationStopped:M,isImmediatePropagationStopped:M},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]=f.event.special[b]={delegateType:b,bindType:b,handle:function(a){var b=this,c=a.relatedTarget,d=a.handleObj,e=d.selector,g,h;if(!c||d.origType===a.type||c!==b&&!f.contains(b,c))g=a.type,a.type=d.origType,h=d.handler.apply(this,arguments),a.type=g;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(A.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;A.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return A.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=M;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=M);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),G.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),H.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw"Syntax error, unrecognized expression: "+a};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var O=/Until$/,P=/^(?:parents|prevUntil|prevAll)/,Q=/,/,R=/^.[^:#\[\.,]*$/,S=Array.prototype.slice,T=f.expr.match.POS,U={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(W(this,a,!1),"not",a)},filter:function(a){return this.pushStack(W(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?T.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=T.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(V(c[0])||V(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=S.call(arguments);O.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!U[a]?f.unique(e):e,(this.length>1||Q.test(d))&&P.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var Y="abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",Z=/ jQuery\d+="(?:\d+|null)"/g,$=/^\s+/,_=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,ba=/<([\w:]+)/,bb=/<tbody/i,bc=/<|&#?\w+;/,bd=/<(?:script|style)/i,be=/<(?:script|object|embed|option|style)/i,bf=new RegExp("<(?:"+Y.replace(" ","|")+")","i"),bg=/checked\s*(?:[^=]|=\s*.checked.)/i,bh=/\/(java|ecma)script/i,bi=/^\s*<!(?:\[CDATA\[|\-\-)/,bj={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bk=X(c);bj.optgroup=bj.option,bj.tbody=bj.tfoot=bj.colgroup=bj.caption=bj.thead,bj.th=bj.td,f.support.htmlSerialize||(bj._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after"
,arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Z,""):null;if(typeof a=="string"&&!bd.test(a)&&(f.support.leadingWhitespace||!$.test(a))&&!bj[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(_,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bg.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bl(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,br)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!be.test(j)&&(f.support.checkClone||!bg.test(j))&&!f.support.unknownElems&&bf.test(j)&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bn(a,d),e=bo(a),g=bo(d);for(h=0;e[h];++h)g[h]&&bn(e[h],g[h])}if(b){bm(a,d);if(c){e=bo(a),g=bo(d);for(h=0;e[h];++h)bm(e[h],g[h])}}e=g=null;return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!bc.test(k))k=b.createTextNode(k);else{k=k.replace(_,"<$1></$2>");var l=(ba.exec(k)||["",""])[1].toLowerCase(),m=bj[l]||bj._default,n=m[0],o=b.createElement("div");b===c?bk.appendChild(o):X(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=bb.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&$.test(k)&&o.insertBefore(b.createTextNode($.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bq(k[i]);else bq(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||bh.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bs=/alpha\([^)]*\)/i,bt=/opacity=([^)]*)/,bu=/([A-Z]|^ms)/g,bv=/^-?\d+(?:px)?$/i,bw=/^-?\d/,bx=/^([\-+])=([\-+.\de]+)/,by={position:"absolute",visibility:"hidden",display:"block"},bz=["Left","Right"],bA=["Top","Bottom"],bB,bC,bD;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bB(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bx.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bB)return bB(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bE(a,b,d);f.swap(a,by,function(){e=bE(a,b,d)});return e}},set:function(a,b){if(!bv.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bt.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bs,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bs.test(g)?g.replace(bs,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bB(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bC=function(a,c){var d,e,g;c=c.replace(bu,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bD=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bv.test(f)&&bw.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bB=bC||bD,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bF=/%20/g,bG=/\[\]$/,bH=/\r?\n/g,bI=/#.*$/,bJ=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bK=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bL=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bM=/^(?:GET|HEAD)$/,bN=/^\/\//,bO=/\?/,bP=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bQ=/^(?:select|textarea)/i,bR=/\s+/,bS=/([?&])_=[^&]*/,bT=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bU=f.fn.load,bV={},bW={},bX,bY,bZ=["*/"]+["*"];try{bX=e.href}catch(b$){bX=c.createElement("a"),bX.href="",bX=bX.href}bY=bT.exec(bX.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bU)return bU.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bP,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bQ.test(this.nodeName)||bK.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bH,"\r\n")}}):{name:b.name,value:c.replace(bH,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?cb(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),cb(a,b);return a},ajaxSettings:{url:bX,isLocal:bL.test(bY[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bZ},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:b_(bV),ajaxTransport:b_(bW),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cd(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=ce(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bJ.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bI,"").replace(bN,bY[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bR),d.crossDomain==null&&(r=bT.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bY[1]&&r[2]==bY[2]&&(r[3]||(r[1]==="http:"?80:443))==(bY[3]||(bY[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),ca(bV,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bM.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bO.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bS,"$1_="+x);d.url=y+(y===d.url?(bO.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bZ+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=ca(bW,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){s<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)cc(g,a[g],c,e);return d.join("&").replace(bF,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cf=f.now(),cg=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cf++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cg.test(b.url)||e&&cg.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cg,l),b.url===j&&(e&&(k=k.replace(cg,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ch=a.ActiveXObject?function(){for(var a in cj)cj[a](0,1)}:!1,ci=0,cj;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ck()||cl()}:ck,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ch&&delete cj[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++ci,ch&&(cj||(cj={},f(a).unload(ch)),cj[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cm={},cn,co,cp=/^(?:toggle|show|hide)$/,cq=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cr,cs=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],ct;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cw("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cx(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cw("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cw("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cx(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cp.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=cq.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cw("show",1),slideUp:cw("hide",1),slideToggle:cw("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=ct||cu(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cr&&(cr=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=ct||cu(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cr),cr=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now))}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cy=/^t(?:able|d|h)$/i,cz=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cA(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cy.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cz.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cz.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cA(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cA(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);

// __app.js

;( function( $ ){
	"use strict";

	$.app = {
		
		initSandwich: function()
		{
			$('.menu-trigger').sandwich({
				wrapper: '.layout-wrapper',
				overlay: '#menu-overlay'
			});
		},

		initSelect: function()
		{
			$('select').selectbox();
		},

		initMask: function()
		{
			$(".watch-datemask").mask("99/99/9999");
			$(".watch-phonemask").mask("+ 7 (999) 999-99-99");
			$(".watch-cartnumber").mask("999-999-999");
		},

		initFastclick: function()
		{
			FastClick.attach(document.body);
		},

		initGallery: function()
		{
			$('.js-open-image').on('click', function(){
				
			});
		},

		initPopup: function()
		{
			$.popup.init('.js-open-popup', {
				cssPosition: true,
				wrapper: '.layout-wrapper'
			});
		},

		init: function()
		{

			this.initPopup();
			this.initMask();
			this.initSelect();
			this.initSandwich();
			this.initGallery();
			
			this.ajaxForm.init();
			this.cart.init();

			this.suggestions.init();

			$('[data-toggle]').click(function() {
				var toggle_el = $(this).data('toggle');
				$(toggle_el).toggleClass('open-sidebar');
			});

			$('#all_uslugi').click(function(){
				$('body').scrollTop(320);
			});

			$(".sidebar").swipe({
			    swipeStatus:function(event, phase, direction, distance, duration, fingers)
			        {
			            if (phase=="move" && direction =="right") {
			                 $(".layout-wrapper").addClass("open-sidebar");
			                 return false;
			            }
			            if (phase=="move" && direction =="left") {
			                 $(".layout-wrapper").removeClass("open-sidebar");
			                 return false;
			            }

			            if (phase=="move" && direction =="up") {
			            	$('.sidebar').scroll();			            	
			            	return false;
			            }
			            if (phase=="move" && direction =="down") {			            	
			            	return false;
			            }

			        }
			});

			$(window).scroll(function(event) {
				if($(this).scrollTop()>194){
	                $('#fmenu').addClass('show_fixedMenu');
	                $('.sidebar').css({
	                	'position': 'fixed',
	                	'top': '45px'
	                });	                
	            }
	            else if ($(this).scrollTop()<194){
	                $('#fmenu').removeClass('show_fixedMenu');
	                $('.sidebar').css({
	                	'position': 'absolute',
	                	'top': '0px'
	                });
	                $
	            }
			});

			$('.no-click').click(function(e){
				e.preventDefault();
			});

			$('.overview').on('click', function(){
				$('.layout-wrapper').removeClass('open-sidebar');
			});

			$('.submenu_isset').mouseenter(function(){
				$('.sidebar__submenu').addClass('show__submenu');
				$('.submenu_isset .sidebar__link').css({
					'background-color': '#ffffff',
  					'border': '1px solid #35c2d6',
  					'margin-right': '-15px'
				});
			});
			$('.submenu_isset').mouseleave(function(){
				$('.sidebar__submenu').removeClass('show__submenu');
				$('.submenu_isset .sidebar__link').css({
					'background-color': '#35c2d6',
  					'border': '1px solid #35c2d6',
  					'margin-right': '0px'
				});
			});

			$('#feedback__link').on('click', function(){
				$('.feedback__wrap').toggleClass('show');
				$('#overlay').toggleClass('show');
			});

			$('.close_success').on('click', function(){
				$('#overlay').toggleClass('show');
				$('.feedback_success').toggleClass('show');
			})

			$('.feedback_close').on('click', function(){
				$('.feedback__wrap').removeClass('show');
				$('#overlay').removeClass('show');
			});

			$('#overlay').on('click', function(){
				$('.feedback__wrap').removeClass('show');
				$('#overlay').removeClass('show');
			});

			$('#feedback').submit(function(e){
				e.preventDefault();
				var name = $('input[name="name"]').val();
				var phone = $('input[name="phone"]').val();
				var text = $('textarea[name="text"]').val();
				$.ajax({
					url: '/ajax/feedback',
					data: {
						'name': name,
						'phone': phone,
						'text': text
					},
					type: 'POST',
					dataType: 'JSON',
					success: function(cb){
						console.log(cb);
						if (cb.status){
							$('.feedback__wrap').removeClass('show');
							$('.feedback_success').addClass('show');
						}
						else{
							if (cb.errors.name == 'name'){
								$('input[name="name"]').addClass('error_input');
							}
							if (cb.errors.phone == 'phone'){
								$('input[name="phone"]').addClass('error_input');
							}
							if (cb.errors.text == 'text'){
								$('textarea[name="text"]').addClass('error_input');
							}
						}
					},
					error: function(err){
						console.log(err)
					}
				});
			});

			$('input[name="name"]').focus(function(){
				if($(this).hasClass('error_input')){
					$(this).removeClass('error_input');
				}
			});
			$('input[name="phone"]').focus(function(){
				if($(this).hasClass('error_input')){
					$(this).removeClass('error_input');
				}
			});
			$('textarea[name="text"]').focus(function(){
				if($(this).hasClass('error_input')){
					$(this).removeClass('error_input');
				}
			});
		}
	};

})( jQuery );


// _app.ajaxform.js

;( function( $ ) {
	"use strict";

	var body = $('body'), that;

	$.app.ajaxForm = {

		config: {
			error_class: "error",
			error_message: "form__error-message",
			form_label: ".form__wrapper",
			checkbox_label: "checkbox__label"
		},

		callback_stack: {},

		default_handler: function(form, response)
		{
			that = this;

		    if (response.status)
		    {
		        if (response.hasOwnProperty('redirect_url'))
		        {
		            window.location.href = response.redirect_url;
		        }
		    }
		    else if (response.errors)
		    {
		        that.validation(form, response.errors);
		    }
		    
		    if (response.hasOwnProperty('message'))
		    {
		        $.popup.message(response.title, response.message);
		    }

		},

		validation: function(form, errors)
		{
			that = this;

		    form.find('.' + that.config.error_class).removeClass(that.config.error_class);
		    form.find('.' + that.config.error_message).remove();
		    
		    var fieldName, field;

		    setTimeout(function() {
			    if (errors)
			    {
			       	for(fieldName in errors)
			        {
			        	if (form.find('input[name="'+fieldName+'"]').length > 0)
			            {
			                field = form.find('input[name="'+fieldName+'"]');
			            }

			            if (form.find('select[name="'+fieldName+'"]').length > 0)
			            {
			                field = form.find('select[name="'+fieldName+'"]');
			            }

			            if (form.find('textarea[name="'+fieldName+'"]').length > 0)
			            {
			                field = form.find('textarea[name="'+fieldName+'"]');
			            }

			            if (field.closest('.' + that.config.checkbox_label).length > 0)
			            {
			                field = field.closest('.' + that.config.checkbox_label);
			            }

			            if (typeof field !== 'undefined')
			            {
		                	field.addClass(that.config.error_class);
		                	field.closest(that.config.form_label).append('<div class="' + that.config.error_message + '">' + errors[fieldName] + '</div>');
		                }
			        }
			    }
		    }, 10);
		},

		upload: function()
		{
			that = this;

		    body.on('submit', '.form-file-upload', function(e) {
		        return AIM.submit(this, {
		            onStart: function()
		            {

		            },
		            onComplete: function(result)
		            {
		                if (typeof result === 'object' && result.status === true && result.hasOwnProperty('photo_url'))
		                {

		                }
		            }
		        });
		    });
		    
		    $(document).on('change', '.upload_button_onchange', function(){
		        if ($(this).closest('.upload_button').find('.upload_button_field').length > 0)
		        {
		            $(this).closest('.upload_button').find('.upload_button_field').html($(this).val());
		        }
		    });
		},

		send: function(action, method, data, cb, err)
		{

			if (typeof cb !== 'function')
			{
				cb = function() {};
			}

			if (typeof err !== 'function')
			{
				err = function() {};
			}

			try {
		   	
		   		$.ajax({
		            url: action,
		            type: method,
		            data: data,
		            contentType: false,
					processData: false,
		            success: cb,
		            error: err,
		            dataType: 'JSON'
				});

		    } catch(e){}

		},

		init: function()
		{
			that = this;

			body.on('submit', '.form-ajax', function(e) {
		        e.preventDefault ? e.preventDefault() : e.returnValue = false;

		        var form 	= $(this),
		        	action	= form.attr('action'),
	            	method	= (form.attr('method') || 'post'),
	            	data 	= new FormData(form[0]); //form.serialize();

				if (form.data('is-busy')) {
					return;
				}

				form.data('is-busy', true);

				if (form.data('precallback') && that.callback_stack.hasOwnProperty(form.data('precallback'))) {
					if(!that.callback_stack[form.data('precallback')](form))
					{
						return false;
					}
				}

		        that.send(
	        		action,
	        		method,
	        		data,
		        	function(response)
		        	{
		            	if (form.data('callback') && that.callback_stack.hasOwnProperty(form.data('callback')))
		                {
		                    that.callback_stack[form.data('callback')](form, response);
		                }
		                else
		                {
		                    that.default_handler(form, response);
		                }

		                if (response.status === true)
		                {
							
		                }

		            	form.data('is-busy', false);
		            },
		            function(response)
		            {
		                that.default_handler(form, response);
		                form.data('is-busy', false);
		            }
	            );
		    });

		}

	};

})( jQuery );


// _app.cart.js

;( function( $){
	"use strict";

	var body = $('body'), cart, message, message_timeout;

	$.fn.extend( {
		quantity: function(options)
		{
			this.defaults = {};
			var settings = $.extend( {}, this.defaults, options);

			return this.each(function() {
				var that = $(this);

				that.count = that.find('.watch-quantity-count');
				that.max = that.count.data('max');

				// Controls
				that.decrease = that.find('.js-quantity[data-method="decrease"]');
				that.increase = that.find('.js-quantity[data-method="increase"]');

				that.check = function() {
					var value = parseInt(that.count.val());
					
					if (value == 1)
					{
						that.decrease.addClass('disabled');
					}
					
					else if (that.decrease.hasClass('disabled'))
					{
						that.decrease.removeClass('disabled');
					}
				};

				that.clicks = function() {
					that.on('click', '.js-quantity', function(e){
						var method = $(this).data('method'),
							value = parseInt(that.count.val());
						
						if (method == 'decrease' && value > 1)
						{
							--value;
						}

						if (method == 'increase')
						{
							value++;
						}

						if (that.max !== 'undefined' && value > parseInt(that.max))
						{
							value = that.max;
						}

						that.count.val(value);

						that.check();
					});
				};

				that.tracking = function() {

					that.on('keydown', that.count, function (e) {
						if (e.which == 38 || e.which == 40)
						{
							e.preventDefault();
							
							var value = parseInt(that.count.val());
							
							if (e.which == 38)
							{
								value++;
							}
							else if (e.which == 40 && value > 1)
							{
								--value;
							}

							if (that.max !== 'undefined' && value > parseInt(that.max))
							{
								value = that.max;
							}

							that.count.val(value);
							that.check();
						}
					});

				};

				that.init = function() {
					that.clicks();
					that.tracking();
					that.check();
				}

				that.init();
			});
		}
	});

	$.app.cart = {

		element:
		{
			count: '.watch-cart-count',
			money: '.watch-cart-money, .watch-cart-total',
			discount: '.watch-cart-discount'
		},

	    events:
	    {
			/**
	         * Обработчик клика на добавление в корзину
	         */
	        'click | .js-cart-add': '_buy',

	        /**
			 * Обработчик клика на удаление из корзины
			 */
	        'click | .js-cart-remove': '_remove',

	        /**
			 * Обработчик клика на изменение количества товара в таблице
			 */
	        'paste keyup | .js-cart-recount': '_recount',
	        'click | .js-quantity.js-cart-recount': '_recount'
	    },

	    methods:
	    {

    		_money: function(n)
    		{
				var c = 0,
					d = '',
					t = ' ',
					s = n < 0 ? "-" : "",
					i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
					j = (j = i.length) > 3 ? j % 3 : 0;

				return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
			},

	    	_update: function(data)
			{
				if (typeof data.count !== 'undefined')
				{
					$(cart.element.count).html(data.count);
				}
				
				if (typeof data.money !== 'undefined')
				{	
					$(cart.element.money).html(data.money);
				}

			},

			_buy: function()
			{
				var id = $(this).attr('href').split('-')[1],
					size = 0,
					count = 1;

				if ($('#count-'+id).length > 0)
				{
					count = parseInt($('#count-'+id).val());
				}

				$.ajax({
		            // url: '/ajax/cart/add',
		            url: '/examples/shop/cart/add',
		            type: 'post',
		            data: {
		            	item: id,
		            	count: count
		            },
		            dataType: 'JSON',
		            success: function(response)
		            {
		            	cart.methods._update(response);

		                if (response.status === true)
		                {
							if ($('#catalog-product-' + id).find('.js-incart-holder').length)
							{
								$('#catalog-product-' + id).find('.js-incart-holder').html( '<a href="#item-' + id + '" class="product__remove-link js-cart-remove" title="Удалить из корзины">Удалить из корзины</a>');
							}
		                }

						if (response.hasOwnProperty('message') && response.message !== '')
						{
							cart.methods._message(response.message);
						}
		            }
				});

			},

			_remove: function()
			{
			  	var $item = $(this), id = $item.attr('href').split('-')[1];

			  	$.ajax({
		            // url: '/ajax/cart/remove',
		            url: '/examples/shop/cart/remove',
		            type: 'post',
		            data: {
		            	item: id,
		            },
		            dataType: 'JSON',
		            success: function(response)
		            {
		            	cart.methods._update(response);

		            	if (response.status === true)
		                {
							if ($('#count-' + id).length > 0)
							{
								$('#count-' + id).val(1);
							}

			            	if ($('#catalog-product-'+id).find('.incart').length > 0)
							{
								$('#catalog-product-'+id).find('.incart').remove();
							}

			            	if ($('#table-product-'+id).length > 0)
							{
								$('#table-product-'+id).remove();
							}

							if ($('#cart-table').find('tbody').is(':empty'))
							{
								$('#cart-table').find('tbody').append('<tr class="cart-table-empty"><td colspan="8">В корзине пусто.</td></tr>');
							}

							if ($item.hasClass('catalog-product-incart'))
							{
								$item.remove();
							}
							else if ($('#catalog-product-' + id).find('.js-incart-holder').length)
							{
								$('#catalog-product-' + id).find('.js-incart-holder').html( '<a href="#item-' + id + '" class="product__buy-link js-cart-add" title="Добавить в корзину">Добавить в корзину</a>');
							}
		                }

						if (response.hasOwnProperty('message') && response.message !== '')
						{
							cart.methods._message(response.message);
						}
		            }
				});

			},

			_recount: function()
			{
				var $item = $(this).closest('.js-change-holder').find('input'),
					id = $item.attr('id').split('-')[1],
					count = $item.val();

				console.log( $(this) );

				$.ajax({
		            // url: '/ajax/cart/recount',
		            url: '/examples/shop/cart/recount',
		            type: 'post',
		            data: {
		            	item: id,
		            	count: count
		            },
		            dataType: 'JSON',
		            success: function(response)
		            {
		            	cart.methods._update(response);

		                if (response.status === true && response.total !== 0)
		                {
							$('#cart-item-total-'+id).html(response.total);
						}

						if (response.hasOwnProperty('message') && response.message !== '')
						{
							cart.methods._message(response.message);
						}
		            }
				});

			},

			_message: function(text)
			{
				clearTimeout(message_timeout);
				
			    if (!body.find('.popup-addcart-message').length)
			    {
			    	message = $('<div class="alert-message popup-addcart-message">' + text + '</div>');

					// '<div id="item-added-to-cart" class="popup-addcart">',
					// 	'<div class="popup-addcart-header">' + text + '</div>',
					// 	'<div class="popup-addcart-content">',
					// 		'<div class="popup-addcart-content-photo"><img src="' + product.photo + '" width="250" alt=""></div>',
					// 		'<div class="popup-addcart-content-name">' + product.name + '</div>',
					// 	'</div>',
					// 	'<div class="popup-addcart-footer clearfix">',
					// 		'<a href="#" onclick="return $.cart.continue(event)" class="btn btn-continue">Продолжить покупки</a>',
					// 		'<a href="/basket" class="btn btn-checkout">Оформить заказ</a>',
					// 	'</div>',
					// '</div>'

			    	body.append(message);

			    	setTimeout(function(){
			    		message.addClass('animate');
			    	}, 10);
			    }

			    message_timeout = setTimeout(function(){
			    	
			    	message.removeClass('animate');

			    	setTimeout(function(){

			    		message.remove();
			    		
			    	}, 300);

		        }, 1500);
			},

			_changed: function() {

				var checked = 0;
				
				table.find('.js-change-row').each(function() {
					if ($(this).attr('checked'))
					{
						checked += 1;
					}
				});
				
				if (checked > 0 && checked == count) {
					$('.js-changeall').prop('checked', true);
				}
				else {
					$('.js-changeall').prop('checked', false);
				}

				if (checked > 0) {
					header.addClass('table-caption-active');
				}
				else {
					header.removeClass('table-caption-active');	
				}

			}

		},

		init: function()
		{
			cart = this;

			var ev, fns, tmp;

			for (ev in this.events)
			{
				tmp = ev.split('|');
				fns = this.events[ev];

				(function(tmp, fns){
					
					body.on($.trim(tmp[0]), $.trim(tmp[1]), function(e){
						e.preventDefault ? e.preventDefault() : e.returnValue = false;
						cart.methods[fns].call(this);
					});

				})(tmp, fns);

			}

			$('.js-quantity').quantity();

			// var table = $('#cart-table');
			// var header = $('#table-caption');
			// var count = table.find('.js-change-row').length;

			// cart.methods._changed();

			// body.on('click', '.js-remove-checked', function(e){
				
			// 	table.find('.js-change-row').each(function(){
			// 		if ($(this).attr('checked'))
			// 		{
			// 			$(this).closest('.table-cart-row').find('.js-remove-cart').trigger('click');
			// 		}
			// 	});

			// 	cart.methods._changed();
			// });

			// $('.js-click-row').on('click', function(e){
			// 	if ($(e.target).is('td'))
			// 	{
			// 		$(this).closest('.table-cart-row').find('.js-change-row').trigger('click');
			// 	}
			// });

			// body.on('change', '.js-change-row', function(e){
			// 	$(this).closest('tr').toggleClass('checked');
			// 	cart.methods._changed();
			// });

			// body.on('change', '.js-changeall', function(e){
			// 	var checked = $(this).attr('checked');
				
			// 	table.find('.js-change-row').each(function(){
			// 		if ((checked && !$(this).attr('checked')) || (!checked && $(this).attr('checked')))
			// 		{
			// 			$(this).trigger('click');
			// 		}
			// 	});
			// });

		}

	};

})( jQuery);

// $.define('сounter', {
//     events: {
//         'b-inited': 'oninit',
//         'click .js-inc': 'onClickPlus',
//         'click .js-dec': 'onClickMinus'
//     },
//     methods: {
//         oninit: function() {
//             this.$info = this.$node.find('.js-info');
//             this.count = 0;
//         },

//         /**
//          * Обработчик клика на плюс
//          */
//         onClickPlus: function() {
//             this.inc();
//             this.update();
//         },

//         /**
//          * Обработчик клика на минус
//          */
//         onClickMinus: function() {
//             this.dec();
//             this.update();
//         },

//         /**
//          * Увеличить счетчик
//          */
//         inc: function() {
//             this.count += this.params.step;
//         },

//         /**
//          * Уменьшить счетчик
//          */
//         dec: function() {
//             this.count -= this.params.step;
//         },

//         /**
//          * Нарисует новое значение
//          */
//         update: function() {
//             this.$info.text(this.count);
//         }
//     }
// });



// _app.suggestions.js

;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};


	$.app.suggestions = {

		token: '5ac2fbf1f640b75b78f5d4214ff005ff5303eac8',

		init: function()
		{
			var _this = this,
				$address = $('#address'),
				$address_fields = $('#address-fields'),
				fields = [
					'postal_code', 'country', 'region', 'area', 'city', 'settlement', 'street', 'house', 'block', 'fias_id', 'kladr_id', 'okato', 'oktmo', 'geo_lat', 'geo_lon'
				], x;

			$address.suggestions({
		        serviceUrl: "https://dadata.ru/api/v2",
		        token: _this.token,
		        type: "ADDRESS",
		        count: 5,
		        onSelect: function(suggestion) {

		        	if (typeof(suggestion.data) !== 'undefined')
		        	{
		        		for (x in suggestion.data)
		        		{
		        			if (fields.indexOf(x) >= 0)
		        			{
		        				if ($address_fields.find('input[name="' + x + '"]').length)
		        				{
		        					$address_fields.find('input[name="' + x + '"]').val(suggestion.data[x]);
		        				}
		        			}
		        		}
		        	}
		        	
		        }
		    });
			
			if ($('.js-suggestions').length)
			{
				var suggestions;

				$('.js-suggestions').each(function() {
					suggestions = $(this).data('suggestions')

					if (suggestions == 'email')
					{
					    $(this).suggestions({
							serviceUrl: "https://dadata.ru/api/v2",
							token: _this.token,
							type: "EMAIL",
							onSelect: function(suggestion) {
								console.log(suggestion);
							}
						});
					}

					if (suggestion == 'org')
					{
						// Подсказки по организациям (jQuery)
						$("#party").suggestions({
					        serviceUrl: "https://dadata.ru/api/v2",
					        token: "ВАШ API-КЛЮЧ",
					        type: "PARTY",
					        /* Вызывается, когда пользователь выбирает одну из подсказок */
					        onSelect: function(suggestion) {
					            console.log(suggestion);
					        }
					    });
					}

					// Подсказки по ФИО (jQuery)

					// $("#fullname").suggestions({
				 //        serviceUrl: "https://dadata.ru/api/v2",
				 //        token: "ВАШ API-КЛЮЧ",
				 //        type: "NAME",
				 //        onSelect: function(suggestion) {
				 //            console.log(suggestion);
				 //        }
				 //    });

					// $("#bank").suggestions({
					//     serviceUrl: "https://dadata.ru/api/v2",
					//     token: "ВАШ API-КЛЮЧ",
					//     type: "BANK",
					//     onSelect: function(suggestion) {
					//         console.log(suggestion);
					//     }
					// });
				});
			}

			// var serviceUrl="https://dadata.ru/api/v2",
			// 	token = "5ef98f5781a106962077fb18109095f9f11ebac1 ",
			// 	type  = "ADDRESS",
			// 	$region = $("#region"),
			// 	$city   = $("#city"),
			// 	$street = $("#street"),
			// 	$house  = $("#house");

			// // регион и район
			// $region.suggestions({
			// 	serviceUrl: serviceUrl,
			// 	token: token,
			// 	type: type,
			// 	hint: false,
			// 	bounds: "region-area"
			// });

			// // город и населенный пункт
			// $city.suggestions({
			// 	serviceUrl: serviceUrl,
			// 	token: token,
			// 	type: type,
			// 	hint: false,
			// 	bounds: "city-settlement",
			// 	constraints: $region
			// });

			// // улица
			// $street.suggestions({
			// 	serviceUrl: serviceUrl,
			// 	token: token,
			// 	type: type,
			// 	hint: false,
			// 	bounds: "street",
			// 	constraints: $city
			// });

			// // дом
			// $house.suggestions({
			// 	serviceUrl: serviceUrl,
			// 	token: token,
			// 	type: type,
			// 	hint: false,
			// 	bounds: "house",
			// 	constraints: $street
			// });

			// $("#address").suggestions({
		 //        serviceUrl: "https://dadata.ru/api/v2",
		 //        token: "5ac2fbf1f640b75b78f5d4214ff005ff5303eac8",
		 //        type: "ADDRESS",
		 //        count: 5,
		 //        /* Вызывается, когда пользователь выбирает одну из подсказок */
		 //        onSelect: function(suggestion) {
		 //            console.log(suggestion);
		 //        }
		 //    });
		}

	};

})(jQuery);

// (function($) {

//   var serviceUrl="https://dadata.ru/api/v2",
//       token = "5ef98f5781a106962077fb18109095f9f11ebac1 ",
//       type  = "ADDRESS",
//       $region = $("#region"),
//       $city   = $("#city"),
//       $street = $("#street"),
//       $house  = $("#house");



// })(jQuery);



// _fastclick.js

;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());


// _fns.js

function is_null(x)
{
	return x == null;
}

function is_undefined(x)
{
	return typeof(x) == 'undefined';
}

function is_touch_device()
{
    return ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || 'onmsgesturechange' in window);
}


// _mask.min.js

/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2014 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.0
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(a.length<o.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a)},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});


// _mustache.js

(function defineMustache(global,factory){if(typeof exports==="object"&&exports&&typeof exports.nodeName!=="string"){factory(exports)}else if(typeof define==="function"&&define.amd){define(["exports"],factory)}else{global.Mustache={};factory(Mustache)}})(this,function mustacheFactory(mustache){var objectToString=Object.prototype.toString;var isArray=Array.isArray||function isArrayPolyfill(object){return objectToString.call(object)==="[object Array]"};function isFunction(object){return typeof object==="function"}function typeStr(obj){return isArray(obj)?"array":typeof obj}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function hasProperty(obj,propName){return obj!=null&&typeof obj==="object"&&propName in obj}var regExpTest=RegExp.prototype.test;function testRegExp(re,string){return regExpTest.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};function escapeHtml(string){return String(string).replace(/[&<>"'\/]/g,function fromEntityMap(s){return entityMap[s]})}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tagsToCompile){if(typeof tagsToCompile==="string")tagsToCompile=tagsToCompile.split(spaceRe,2);if(!isArray(tagsToCompile)||tagsToCompile.length!==2)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*");closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1]));closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length)}else{nonSpace=true}tokens.push(["text",chr,start,start+1]);start+=1;if(chr==="\n")stripSpace()}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||"name";scanner.scan(whiteRe);if(type==="="){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==="{"){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type="&"}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);token=[type,value,start,scanner.pos];tokens.push(token);if(type==="#"||type==="^"){sections.push(token)}else if(type==="/"){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else if(type==="name"||type==="{"||type==="&"){nonSpace=true}else if(type==="="){compileTags(value)}}openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==="text"&&lastToken&&lastToken[0]==="text"){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case"#":case"^":collector.push(token);sections.push(token);collector=token[4]=[];break;case"/":section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function eos(){return this.tail===""};Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||match.index!==0)return"";var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function scanUntil(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view;this.cache={".":this.view};this.parent=parentContext}Context.prototype.push=function push(view){return new Context(view,this)};Context.prototype.lookup=function lookup(name){var cache=this.cache;var value;if(cache.hasOwnProperty(name)){value=cache[name]}else{var context=this,names,index,lookupHit=false;while(context){if(name.indexOf(".")>0){value=context.view;names=name.split(".");index=0;while(value!=null&&index<names.length){if(index===names.length-1)lookupHit=hasProperty(value,names[index]);value=value[names[index++]]}}else{value=context.view[name];lookupHit=hasProperty(context.view,name)}if(lookupHit)break;context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.cache={}}Writer.prototype.clearCache=function clearCache(){this.cache={}};Writer.prototype.parse=function parse(template,tags){var cache=this.cache;var tokens=cache[template];if(tokens==null)tokens=cache[template]=parseTemplate(template,tags);return tokens};Writer.prototype.render=function render(template,view,partials){var tokens=this.parse(template);var context=view instanceof Context?view:new Context(view);return this.renderTokens(tokens,context,partials,template)};Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate){var buffer="";var token,symbol,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){value=undefined;token=tokens[i];symbol=token[0];if(symbol==="#")value=this.renderSection(token,context,partials,originalTemplate);else if(symbol==="^")value=this.renderInverted(token,context,partials,originalTemplate);else if(symbol===">")value=this.renderPartial(token,context,partials,originalTemplate);else if(symbol==="&")value=this.unescapedValue(token,context);else if(symbol==="name")value=this.escapedValue(token,context);else if(symbol==="text")value=this.rawValue(token);if(value!==undefined)buffer+=value}return buffer};Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate){var self=this;var buffer="";var value=context.lookup(token[1]);function subRender(template){return self.render(template,context,partials)}if(!value)return;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate)}}else if(typeof value==="object"||typeof value==="string"||typeof value==="number"){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate)}else if(isFunction(value)){if(typeof originalTemplate!=="string")throw new Error("Cannot use higher-order sections without the original template");value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate)}return buffer};Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate){var value=context.lookup(token[1]);if(!value||isArray(value)&&value.length===0)return this.renderTokens(token[4],context,partials,originalTemplate)};Writer.prototype.renderPartial=function renderPartial(token,context,partials){if(!partials)return;var value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null)return this.renderTokens(this.parse(value),context,partials,value)};Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return value};Writer.prototype.escapedValue=function escapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return mustache.escape(value)};Writer.prototype.rawValue=function rawValue(token){return token[1]};mustache.name="mustache.js";mustache.version="2.1.3";mustache.tags=["{{","}}"];var defaultWriter=new Writer;mustache.clearCache=function clearCache(){return defaultWriter.clearCache()};mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function render(template,view,partials){if(typeof template!=="string"){throw new TypeError('Invalid template! Template should be a "string" '+'but "'+typeStr(template)+'" was given as the first '+"argument for mustache#render(template, view, partials)")}return defaultWriter.render(template,view,partials)};mustache.to_html=function to_html(template,view,partials,send){var result=mustache.render(template,view,partials);if(isFunction(send)){send(result)}else{return result}};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer});
(function(d) {
	function template(str, data) {
		if (d.getElementById(str) !== null)
		{
		    data = data || {};
		    return Mustache.render(d.getElementById(str).innerHTML, data);
		}
		return '';
	}
	window.template = template;
})(document);


// _popover.js

;( function( $ ){
	"use strict";

	$.fn.extend({
		popover: function(options)
		{
			this.defaults = {};
			var settings = $.extend( {}, this.defaults, options );

			return this.each(function() {
				var that = $(this), $dropdown, $target, isopen = false;

				function hideDropdown(ignore)
				{
					if (isopen)
					{
						if (typeof(ignore) !== 'undefined' && $('#dropdown-' + ignore).hasClass('open'))
						{
							$dropdown = $('.dropdown.open').not('#dropdown-' + ignore);
						}
						else
						{
							$dropdown = $('.dropdown.open');
						}

						$dropdown.removeClass('animate');
					
						setTimeout(function(){
				  			$dropdown.removeClass('open');
				  		}, 400);

				  		isopen = false;
				  	}
				}

				function getPosition(target) {
					var left = 0, ww = $(window).width(), top = 0;

					if ($(target).hasClass('trigger-dropdown'))
					{
						$target = $(target);
					}
					else {
						$target = $(target).closest('.trigger-dropdown');
					}

					left = $target.offset().left + $target.width();
					top = $target.offset().top + $target.height() + 17;
					
					return { 'left': left, 'top': top };
				}

				that.check = function() {
				
				};

				that.clicks = function() {
					that.on('click', function(e) {
						e.preventDefault();

						var block = $(this).data('dropdown'), $dropdown, onOpenScrollTop;

						if ($('#dropdown-' + block).length > 0 && $('#dropdown-' + block).hasClass('open'))
						{
							hideDropdown();
						}
						else {

							if ($('#dropdown-' + block).length == 0)
							{
								$dropdown = $(tmpl('tmpl_dropdown_' + block, {}));
								$('body').append($dropdown);
							}
							else
							{
								$dropdown = $('#dropdown-' + block);
							}
							
							if (!$('#dropdown-' + block).hasClass('open'))
							{
								onOpenScrollTop = $(window).scrollTop();
								
								$dropdown.css(getPosition(e.target));
								$dropdown.toggleClass('open').timeoutClass('animate');

								setTimeout(function(){
									isopen = true;
								}, 10);
							}
						}
					});

					$('body').on('click', function(e){
						if ((isopen === true || $('.dropdown.open').length) && $(e.target).closest('.dropdown').length == 0)
						{
							if ($(e.target).closest('.trigger-dropdown').length || $(e.target).hasClass('trigger-dropdown'))
							{
								var ignore = '';

								if ($(e.target).closest('.trigger-dropdown').length)
								{
									ignore = $(e.target).closest('.trigger-dropdown').data('dropdown');
								}
								else if ($(e.target).hasClass('trigger-dropdown'))
								{
									ignore = $(e.target).data('dropdown');
								}

								hideDropdown(ignore);
							}
							else
							{
								hideDropdown();
							}
						}
				    });

					$(window).scroll(function(){
						if (isopen === true && (((onOpenScrollTop + scrollShift) < $(window).scrollTop()) || ((onOpenScrollTop - scrollShift) > $(window).scrollTop())))
						{
							hideDropdown();
						}
					});
				};

				that.init = function() {
					that.clicks();
					that.check();
				}

				that.init();
			});
		}
	});
})( jQuery );


// _popup.js

/*
$.popup.init('.trigger-popup');
$.popup.open('popup-choose-photo-source');
*/

;(function($) {
	"use strict";

	var defaults = {
		wrapper: 'body',
		triggerClass: '.js-open-popup',
		speed: 550,
		overlay: {
			enable: true,
			element: '#overlay'
		},
		bodyclass: true,
		cssPosition: false,
		hashCheck: true,
		hashChange: true,
		keyHooks: true,
		template: {
			error: 'tmpl-popup-error',
			message: 'tmpl-popup-message',
			notification: 'tmpl-notification'
		}
	},
	popup = null,
	temp = null,
	nested = [],
	$trigger = '',
	$body = $('body'),
	$win = $(window), 
	$doc = $(document),
	notify_timeout,
	resizeTimeout;

	$.overlay = {
		close: function() {
			$(defaults.overlay.element).removeClass('animate');

			setTimeout(function(){
            	$(defaults.overlay.element).removeClass('visible is-open');
            	$(defaults.overlay.element).filter('.temp').remove();
            }, defaults.speed);
		}
	};
	
	$.popup = {
        _getPopup: function(selector)
        {
            var $popup;

            if(typeof(selector) == 'object') {
                return selector;
            }

            $popup = $('#'+selector);

            return $popup.length ? $popup : null;
        },
        
        _getPosition: function($popup) 
        {
        	popup = this;

			var prop = {},
				ww = $win.width(),
                wh = $win.height(),
                
                dw = $doc.width(),
                dh = $doc.height(),
                
                pw = $popup.outerWidth(),
                ph = $popup.outerHeight(),
                
                st = $win.scrollTop(),

                left = 0,
                top = 0,
                css = {},

                posType = $popup.attr('data-position'),

                $realWrapper = null;

            if(dw >= pw) {
                left = Math.round((dw - pw)/2);
            }
            
            if(wh >= ph) {
                css.position = 'fixed';
                top = '50%';
                css.marginTop = '-' + Math.floor( ph / 2 ) + 'px';
            }
            else {
            	css.position = 'absolute';
                top = st+Math.round((wh - ph)/2);
            }
            
            css.top = top;

            if(posType == 'right') {
                css.right = 0;
            }
            else {
                css.left = left;
            }

            return css;
		},
        
        _rePosition: function(selector)
        {
			var $popup = this._getPopup(selector);

			if (!defaults.cssPosition)
			{
				$popup.css(this._getPosition($popup));
			}
        },

		close: function(element, callback)
		{
			popup = this;

			var scroll = 0, cb = false, is_native = true, $popups;

			$popups = $body.find('.popup.is-open')

			if (typeof element !== 'undefined')
			{
				$popups = $(element);
				is_native = false;
			}

            if (typeof callback !== 'undefined') {
            	cb = true;
            }

            if (defaults.overlay && is_native) {
				$.overlay.close();
	        };

            $(defaults.wrapper).off('click.wrapClose');

            $popups.removeClass('animate');

            setTimeout(function(){
            	$popups.removeClass('visible is-open');
            	$popups.filter('.temp').remove();
            	$body.trigger('popup.after_close');

            	if (cb)
            	{
	            	setTimeout(function(){
		            	callback.apply();
		            }, 10);
	           	}
            }, defaults.speed);

			if (!cb && is_native)
        	{
	            $body.removeClass('popup-open');

		        if(defaults.hashChange) {
	            	scroll = $win.scrollTop();
	        		window.location.hash = '';
	            	$win.scrollTop(scroll);
	            }
	        }
	        
            $body.trigger('popup.close');
		
            return this;
        },

        initWrapClose: function()
    	{
    		popup = this;

    		$(defaults.wrapper).on('click.wrapClose', function(e) {
    			if (!$(this).closest('.popup').length && !$(e.target).hasClass(defaults.triggerClass.substr(1)) && !$(e.target).closest(defaults.triggerClass).length)
    			{
					popup.close();
	    		}
	        });

        },

        hooks: function()
        {
        	popup = this;

			$body.on('click', '.js-popup-close', function(e) {
	            e.preventDefault ? e.preventDefault() : e.returnValue = false;
	            popup.close();
	        });

			if (defaults.keyHooks) {
				$body.on('keydown', function(e) {
					if(e.keyCode == 27) {
		                popup.close();
		            }
		        });
			};

	        if (defaults.overlay) {
				$(defaults.overlay.element).on('click', function() {
	            	popup.close();
	            });
	        }

	        if (!defaults.cssPosition)
	        {
		        $win.on('resize.popup', function() {
		            clearTimeout(resizeTimeout);
	                
	                resizeTimeout = setTimeout(function() {
	                    
	                    $body.find('.popup.is-open').each(function() {
		                    popup._rePosition($(this));
		                });

	                }, 100);
		        });
	        }

	        return this;
		},
        
        show: function(selector, overlay, bodyclass)
        {
        	if (typeof selector !== 'undefined' && selector !== '')
			{
				var data = data || {}, prop = {}, $popup;
				
				if (bodyclass)
				{
					$body.addClass('popup-open');
				}
				
				if (typeof selector == 'object')
	        	{
	        		$popup = $(selector);
	        	}
	        	else
	        	{
	        		if ($('#'+selector).hasClass('popup'))
					{
						$popup = $('#'+selector);
					}
					else if ($('#'+selector).length && $('#'+selector).get(0).tagName == 'SCRIPT')
					{
						$popup = $(template(selector, data));
						$popup.addClass('temp');

						$body.append($popup);
					}
	        	}
				
				$popup.addClass('visible is-open');

				if (!defaults.cssPosition)
	        	{
					$popup.css(popup._getPosition($popup));
				}

				if (overlay) {
					$(defaults.overlay.element).addClass('visible');

					setTimeout(function(){
						$(defaults.overlay.element).addClass('animate');
					}, 10);
				}
				else {
					this.initWrapClose();
				}

				setTimeout(function(){
					$popup.addClass('animate');
					$body.trigger('popup.after_open', $popup);

					if (nested.length)
					{
						$body.trigger('popup.init_nested', { popup: $popup, nested: nested });
					}
	    		}, 10);

	            $body.trigger('popup.open', $popup);
			}

			return this;
        },

        clicks: function(trigger)
        {
        	popup = this;

        	$body.on('click', trigger, function(e) {
        		var overlay = defaults.overlay.enable, bodyclass = defaults.bodyclass, element;

				if (!defaults.hashChange)
				{
					e.preventDefault ? e.preventDefault() : e.returnValue = false;
				}

				if (typeof($(this).data('bodyclass')) !== 'undefined')
				{
					bodyclass = $(this).data('bodyclass');
				}

				if (typeof($(this).data('overlay')) !== 'undefined')
				{
					overlay = $(this).data('overlay');
				}

				if ($(this).attr('href'))
				{
					element = $(this).attr('href');
				}
				else if ($(this).data('popup'))
				{
					element = $(this).data('popup');
				}

				popup.open(element, overlay, bodyclass);

				if (typeof($(this).data('hashchange')) !== 'undefined')
				{
					return $(this).data('hashchange');
				}
			});

			return this;
		},
        
		open: function(selector, overlay, bodyclass)
		{
			popup = this;

			if ($('.popup.is-open').length)
			{
				popup.close($('.popup.is-open'));
			}
			
			if (typeof(selector) !== 'undefined' && selector.length > 1 && selector.substr(0, 1) !== '#')
			{
				selector = '#' + selector;
			}

			temp = null, nested = [];

			if (typeof selector == 'undefined' && defaults.hashChange && window.location.hash.length > 1)
			{
				temp = window.location.hash;
			}
			else if (typeof selector !== 'undefined')
			{
				if (selector.substr(0, 1) == '#')
				{
					temp = selector;
				}
			}

			if (temp !== null && temp.indexOf('/') >= 0)
			{
				nested = temp.split('/');
			}

			selector = temp;

			if (nested.length)
			{
				selector = nested[0];
				nested = nested.slice(1);
			}

			if (typeof selector !== 'undefined' && selector !== null)
			{
        		if (selector.substr(0, 1) == '#')
				{
					selector = selector.substr(1);
				}

				if ($('#tpl-' + selector).length)
				{
					selector = 'tpl-'+selector;
				}

				if (typeof overlay == 'undefined')
				{
					overlay = defaults.overlay.enable;
				}

				if (typeof bodyclass == 'undefined')
				{
					bodyclass = defaults.bodyclass;
				}

				if ($('#'+selector).hasClass('popup') || ($('#'+selector).length && $('#'+selector).get(0).tagName == 'SCRIPT'))
				{
					popup.show(selector, overlay, bodyclass);
				}
			}
	
	    	return this;
		},

	    notification: function(title, text)
	    {
	    	popup = this;

	    	clearTimeout(notify_timeout);

            if (!$body.find('#alert-popup-notification').length)
            {
            	temp = $(template(defaults.template.notification, { 'title': title, 'text': text } ));

            	temp.addClass('temp');
            	temp.attr('id', 'alert-popup-notification');

               	$body.append(temp);

                popup.show(temp, false, false);
            }

            notify_timeout = setTimeout(function(){
                
                temp.removeClass('animate');

                setTimeout(function(){

                    temp.remove();

                }, 300);

            }, 2500);
	    },
	    
	    message: function(title, text, btn)
	    {
	    	popup = this;

	       	temp = $(template(defaults.template.message, {'title': title, 'text': text, 'btn': btn || null }));

	        temp.addClass('temp');

	        $body.append(temp);

	       	temp.css(this._getPosition(temp));

	        popup.show(temp);
	    },
	    
	    error: function(title, text)
	    {
	    	popup = this;

	       	temp = $(template(defaults.template.error, { 'title': title, 'text': text }));

	        temp.addClass('temp');

	        $body.append(temp);

	        temp.css(this._getPosition(temp));

	        popup.show(temp);
	    },

        init: function(trigger, options)
        {
        	defaults.triggerClass = trigger;

        	if (typeof options !== 'undefined')
        	{
        		for (var x in options)
        		{
        			if (typeof defaults[x] !== 'undefined')
        			{
        				defaults[x] = options[x];
        			}
        		}
        	}
        	
        	this.open();
			this.clicks(trigger);
			this.hooks();
		}
	};
    
})(jQuery);


// _sandwich.js

(function($) {
	$.fn.sandwich = function(settings) {
		var settings = $.extend({
            wrapper: '.wrap',
            overlay: '.overlay'
        }, settings);

		var $trigger = $(this), $body = $('body');
		
		$trigger.on('click', function(e){
			e.preventDefault();
			
			if ($body.hasClass('page-visible'))
			{
				setTimeout(function(){
					$body.removeClass('page-visible');
				}, 10);
			}
			else
			{
				setTimeout(function(){
					$body.addClass('page-visible');
				}, 10);
			}
			
			$body.toggleClass('page-open');
			
	        var visibility = 'visible';

	        if (!$body.hasClass('page-open'))
	        {
	            visibility = 'hidden'
	        }
	        
	        $(settings.overlay).css({
	            'visibility': visibility
	        });
		});

		$body.on('click', settings.overlay, function(e){
			$body.removeClass('page-open');

	        setTimeout(function(){
				$body.removeClass('page-visible');
			}, 10);

	        $(settings.overlay).css({
	            'visibility': 'hidden'
	        });
	    });
	};
}(jQuery));


// _selectbox.js

;(function ($) {
    $.fn.selectbox = function () {
        $(this).each(function () {
            var select = $(this);
            if (select.prev('span.selectbox').length < 1) {
				function doSelect() {
					var option = select.find('option');
                    var optionSelected = option.filter(':selected');
                    var optionText = option.filter(':first').text();
                    if (optionSelected.length) optionText = optionSelected.text();
                    var ddlist = '';
                    for (i = 0; i < option.length; i++) {
                        var selected = '',
							last = '',
							disabled = ' class="disabled"';
                        if (option.eq(i).is(':selected')) selected = ' class="selected sel"';
                        if (option.eq(i).is(':disabled')) selected = disabled;
						if (i == (option.length-1)) {
							if ( selected == '' ) {
								selected = ' class="last-child"';
							}
							else {
								last = ' last-child';
							}
						}
                        ddlist += '<li' + selected + last + '>' + option.eq(i).text() + '</li>';
                    }
                    var selectbox = $('<span class="selectbox" style="display:inline-block;position:relative">' + '<div class="select" style="float:left;position:relative;z-index:10000"><div class="text">' + optionText + '</div>' + '<b class="trigger"><i class="arrow"></i></b>' + '</div>' + '<div class="dropdown" style="position:absolute;z-index:9999;overflow:auto;overflow-x:hidden;list-style:none">' + '<ul>' + ddlist + '</ul>' + '</div>' + '</span>');
                    select.before(selectbox).css({
                        position: 'absolute',
                        top: -9999
                    });
                    var divSelect = selectbox.find('div.select');
                    var divText = selectbox.find('div.text');
                    var dropdown = selectbox.find('div.dropdown');
                    var li = dropdown.find('li');
                    var selectHeight = selectbox.outerHeight();
                    if (dropdown.css('left') == 'auto') dropdown.css({
                        left: 0
                    });
                    if (dropdown.css('top') == 'auto') dropdown.css({
                        top: selectHeight
                    });
                    var liHeight = li.outerHeight();
                    var position = dropdown.css('top');
                    dropdown.hide();
					selectbox.removeClass('selectbox-active');
                    divSelect.click(function () {
                        var topOffset = selectbox.offset().top;
                        var bottomOffset = $(window).height() - selectHeight - (topOffset - $(window).scrollTop());
                        if (bottomOffset < 0 || bottomOffset < liHeight * 6) {
                            dropdown.height('auto').css({
                                top: 'auto',
                                bottom: position
                            });
                            if (dropdown.outerHeight() > topOffset - $(window).scrollTop() - 20) {
                                dropdown.height(Math.floor((topOffset - $(window).scrollTop() - 20) / liHeight) * liHeight);
                            }
                        } else if (bottomOffset > liHeight * 6) {
                            dropdown.height('auto').css({
                                bottom: 'auto',
                                top: position
                            });
                            if (dropdown.outerHeight() > bottomOffset - 20) {
                                dropdown.height(Math.floor((bottomOffset - 20) / liHeight) * liHeight);
                            }
                        }
                        $('span.selectbox').css({
                            zIndex: 1
                        }).removeClass('focused');
                        selectbox.css({
                            zIndex: 2
                        });
                        if (dropdown.is(':hidden')) {
                            $('div.dropdown:visible').hide();
                            dropdown.show();
							selectbox.addClass('selectbox-active');
                        } else {
                            dropdown.hide();
							selectbox.removeClass('selectbox-active');
                        }
                        return false;
                    });
                    li.hover(function () {
                        $(this).siblings().removeClass('selected');
                    });
                    var selectedText = li.filter('.selected').text();
                    li.filter(':not(.disabled)').click(function () {
                        var liText = $(this).text();
                        if (selectedText != liText) {
                            $(this).addClass('selected sel').siblings().removeClass('selected sel');
                            option.removeAttr('selected').eq($(this).index()).attr('selected', true);
                            selectedText = liText;
                            divText.text(liText);
                            select.change();
                        }
                        dropdown.hide();
						selectbox.removeClass('selectbox-active');
						return false;
                    });
                    dropdown.mouseout(function () {
                        dropdown.find('li.sel').addClass('selected');
                    });
                    select.focus(function () {
                        $('span.selectbox').removeClass('focused');
                        selectbox.addClass('focused');
                    }).keyup(function () {
                        divText.text(option.filter(':selected').text());
                        li.removeClass('selected sel').eq(option.filter(':selected').index()).addClass('selected sel');
                    });
                    $(document).on('click', function (e) {
                        if (!$(e.target).parents().hasClass('selectbox')) {
                            dropdown.hide().find('li.sel').addClass('selected');
							selectbox.removeClass('selectbox-active');
                            selectbox.removeClass('focused');
                        }
                    });
                }
                doSelect();
                select.on('refresh', function () {
                    select.prev().remove();
                    doSelect();
                })
            }
        });
    }
})(jQuery)


// _suggestions.min.js

/**
 * DaData.ru Suggestions jQuery plugin, version 15.12.0
 *
 * DaData.ru Suggestions jQuery plugin is freely distributable under the terms of MIT-style license
 * Built on DevBridge Autocomplete for jQuery (https://github.com/devbridge/jQuery-Autocomplete)
 * For details, see https://github.com/hflabs/suggestions-jquery
 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(b,c){var d=this;d.element=b,d.el=a(b),d.suggestions=[],d.badQueries=[],d.selectedIndex=-1,d.currentValue=d.element.value,d.intervalId=0,d.cachedResponse={},d.enrichmentCache={},d.currentRequest=null,d.inputPhase=a.Deferred(),d.fetchPhase=a.Deferred(),d.enrichPhase=a.Deferred(),d.onChangeTimeout=null,d.triggering={},d.$wrapper=null,d.options=a.extend({},k,c),d.classes={hint:"suggestions-hint",mobile:"suggestions-mobile",nowrap:"suggestions-nowrap",selected:"suggestions-selected",suggestion:"suggestions-suggestion",subtext:"suggestions-subtext",subtext_inline:"suggestions-subtext suggestions-subtext_inline",subtext_delimiter:"suggestions-subtext-delimiter",subtext_label:"suggestions-subtext suggestions-subtext_label",removeConstraint:"suggestions-remove",value:"suggestions-value"},d.disabled=!1,d.selection=null,d.$viewport=a(window),d.$body=a(document.body),d.type=null,d.status={},d.setupElement(),d.initializer=a.Deferred(),d.el.is(":visible")?d.initializer.resolve():d.deferInitialization(),d.initializer.done(a.proxy(d.initialize,d))}var c={ENTER:13,ESC:27,TAB:9,SPACE:32,UP:38,DOWN:40},d={},e=".suggestions",f="suggestions",g="\\s\"'~\\*\\.,:\\|\\[\\]\\(\\)\\{\\}<>№",h=new RegExp("["+g+"]+","g"),i="\\-\\+\\/\\\\\\?!@#$%^&",j=new RegExp("["+i+"]+","g"),k={autoSelectFirst:!1,serviceUrl:null,onSearchStart:a.noop,onSearchComplete:a.noop,onSearchError:a.noop,onSelect:null,onSelectNothing:null,onInvalidateSelection:null,minChars:1,deferRequestBy:100,params:{},paramName:"query",timeout:3e3,formatResult:null,formatSelected:null,noCache:!1,containerClass:"suggestions-suggestions",tabDisabled:!1,triggerSelectOnSpace:!1,triggerSelectOnEnter:!0,triggerSelectOnBlur:!0,preventBadQueries:!1,hint:"Выберите вариант или продолжите ввод",type:null,requestMode:"suggest",count:5,$helpers:null,headers:null,scrollOnFocus:!0,mobileWidth:980,initializeInterval:100},l={chains:{},on:function(a,b){return this.get(a).push(b),this},get:function(a){var b=this.chains;return b[a]||(b[a]=[])}},m=function(){var b=0;return{escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},escapeHtml:function(b){var c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"};return b&&a.each(c,function(a,c){b=b.replace(new RegExp(a,"g"),c)}),b},getDefaultType:function(){return a.support.cors?"POST":"GET"},getDefaultContentType:function(){return a.support.cors?"application/json":"application/x-www-form-urlencoded"},fixURLProtocol:function(b){return a.support.cors?b:b.replace(/^https?:/,location.protocol)},addUrlParams:function(b,c){return b+(/\?/.test(b)?"&":"?")+a.param(c)},serialize:function(b){return a.support.cors?JSON.stringify(b):a.param(b,!0)},compact:function(b){return a.grep(b,function(a){return!!a})},delay:function(a,b){return setTimeout(a,b||0)},uniqueId:function(a){return(a||"")+ ++b},slice:function(a,b){return Array.prototype.slice.call(a,b)},areSame:function c(b,d){var e=!0;return typeof b!=typeof d?!1:"object"==typeof b&&null!=b&&null!=d?(a.each(b,function(a,b){return e=c(b,d[a])}),e):b===d},arrayMinus:function(b,c){return c?a.grep(b,function(b,d){return-1===a.inArray(b,c)}):b},getWords:function(a,b){a=a.replace(/(\d+)([а-яА-ЯёЁ]{2,})/g,"$1 $2").replace(/([а-яА-ЯёЁ]+)(\d+)/g,"$1 $2");var c=this.compact(a.split(h)),d=c.pop(),e=this.arrayMinus(c,b);return e.push(d),e},normalize:function(a,b){var c=this;return c.getWords(a,b).join(" ")},stringEncloses:function(a,b){return a.length>b.length&&-1!==a.indexOf(b)},fieldsNotEmpty:function(b,c){if(!a.isPlainObject(b))return!1;var d=!0;return a.each(c,function(a,c){return d=!!b[c]}),d},getDeepValue:function d(a,b){var c=b.split("."),e=c.shift();return a&&(c.length?d(a[e],c.join(".")):a[e])},reWordExtractor:function(){return new RegExp("([^"+g+"]*)(["+g+"]*)","g")},formatToken:function(a){return a&&a.toLowerCase().replace(/[ёЁ]/g,"е")},withSubTokens:function(b){var c=[];return a.each(b,function(a,b){var d=b.split(j);c.push(b),d.length>1&&(c=c.concat(m.compact(d)))}),c}}}(),n=function(){function b(b){return function(c){if(0===c.length)return!1;if(1===c.length)return!0;var d=b(c[0].value),e=a.grep(c,function(a){return 0===b(a.value).indexOf(d)},!0);return 0===e.length}}var c=b(function(a){return a}),d=b(function(a){return a.replace(/, (?:д|вл|двлд|к) .+$/,"")});return{matchByNormalizedQuery:function(b,c){var d=b.toLowerCase(),e=this&&this.stopwords,f=m.normalize(d,e),g=[];return a.each(c,function(a,b){var c=b.value.toLowerCase();return m.stringEncloses(d,c)?!1:c.indexOf(f)>0?!1:void(f===m.normalize(c,e)&&g.push(a))}),1===g.length?g[0]:-1},matchByWords:function(b,d){var e,f=this&&this.stopwords,g=b.toLowerCase(),h=[];return c(d)&&(e=m.withSubTokens(m.getWords(g,f)),a.each(d,function(a,b){var c=b.value.toLowerCase();if(m.stringEncloses(g,c))return!1;var d=m.withSubTokens(m.getWords(c,f));0===m.arrayMinus(e,d).length&&h.push(a)})),1===h.length?h[0]:-1},matchByWordsAddress:function(b,c){var e,f=this&&this.stopwords,g=b.toLowerCase(),h=-1;return d(c)&&(e=m.withSubTokens(m.getWords(g,f)),a.each(c,function(a,b){var c=b.value.toLowerCase();if(m.stringEncloses(g,c))return!1;var d=m.withSubTokens(m.getWords(c,f));return 0===m.arrayMinus(e,d).length?(h=a,!1):void 0})),h},matchByFields:function(b,c){var d=this&&this.stopwords,e=this&&this.fieldsStopwords,f=m.withSubTokens(m.getWords(b.toLowerCase(),d)),g=[];return 1===c.length&&(e&&a.each(e,function(a,b){var d=m.getDeepValue(c[0],a),e=d&&m.withSubTokens(m.getWords(d.toLowerCase(),b));e&&e.length&&(g=g.concat(e))}),0===m.arrayMinus(f,g).length)?0:-1}}}();!function(){function b(a,b){var c=a.data&&a.data[b];return c&&new RegExp("^"+m.escapeRegExChars(c)+"(["+g+"]|$)","i").test(a.value)}function c(a,b){return h.test(b)&&!h.test(a)?b:a}function e(a,b,d,e,f){var g=this,h=g.highlightMatches(a,d,e,f),i=g.highlightMatches(b,d,e,f);return c(h,i)}var f=["ао","аобл","дом","респ","а/я","аал","автодорога","аллея","арбан","аул","б-р","берег","бугор","вал","вл","волость","въезд","высел","г","городок","гск","д","двлд","днп","дор","дп","ж/д_будка","ж/д_казарм","ж/д_оп","ж/д_платф","ж/д_пост","ж/д_рзд","ж/д_ст","жилзона","жилрайон","жт","заезд","заимка","зона","к","казарма","канал","кв","кв-л","км","кольцо","комн","кордон","коса","кп","край","линия","лпх","м","массив","местность","мкр","мост","н/п","наб","нп","обл","округ","остров","оф","п","п/о","п/р","п/ст","парк","пгт","пер","переезд","пл","пл-ка","платф","погост","полустанок","починок","пр-кт","проезд","промзона","просек","просека","проселок","проток","протока","проулок","р-н","рзд","россия","рп","ряды","с","с/а","с/мо","с/о","с/п","с/с","сад","сквер","сл","снт","спуск","ст","ст-ца","стр","тер","тракт","туп","у","ул","уч-к","ф/х","ферма","х","ш","бульвар","владение","выселки","гаражно-строительный","город","деревня","домовладение","дорога","квартал","километр","комната","корпус","литер","леспромхоз","местечко","микрорайон","набережная","область","переулок","платформа","площадка","площадь","поселение","поселок","проспект","разъезд","район","республика","село","сельсовет","слобода","сооружение","станица","станция","строение","территория","тупик","улица","улус","участок","хутор","шоссе"],h=/<strong>/,i={LEGAL:[2,2,5,1],INDIVIDUAL:[2,2,6,2]};d.NAME={urlSuffix:"fio",matchers:[n.matchByNormalizedQuery,n.matchByWords],fieldNames:{surname:"фамилия",name:"имя",patronymic:"отчество"},alwaysContinueSelecting:!0,isDataComplete:function(c){var d,e=this,f=e.options.params,g=c.data;return a.isFunction(f)&&(f=f.call(e.element,c.value)),f&&f.parts?d=a.map(f.parts,function(a){return a.toLowerCase()}):(d=["surname","name"],b(c,"surname")&&d.push("patronymic")),m.fieldsNotEmpty(g,d)},composeValue:function(a){return m.compact([a.surname,a.name,a.patronymic]).join(" ")}},d.ADDRESS={urlSuffix:"address",matchers:[a.proxy(n.matchByNormalizedQuery,{stopwords:f}),a.proxy(n.matchByWordsAddress,{stopwords:f})],boundsAvailable:["region","area","city","settlement","street","house"],boundsFields:{region:["region","region_type","region_type_full","region_with_type"],area:["area","area_type","area_type_full","area_with_type"],city:["city","city_type","city_type_full","city_with_type"],settlement:["settlement","settlement_type","settlement_type_full","settlement_with_type"],street:["street","street_type","street_type_full","street_with_type"],house:["house","house_type","house_type_full","block","block_type"]},unformattableTokens:f,enrichmentEnabled:!0,geoEnabled:!0,isDataComplete:function(b){var c=[this.bounds.to||"flat"],d=b.data;return!a.isPlainObject(d)||m.fieldsNotEmpty(d,c)},composeValue:function(a){return m.compact([a.region_with_type||m.compact([a.region,a.region_type]).join(" "),a.area_with_type||m.compact([a.area_type,a.area]).join(" "),a.city_with_type||m.compact([a.city_type,a.city]).join(" "),a.settlement_with_type||m.compact([a.settlement_type,a.settlement]).join(" "),a.street_with_type||m.compact([a.street_type,a.street]).join(" "),m.compact([a.house_type,a.house,a.block_type,a.block]).join(" "),m.compact([a.flat_type,a.flat]).join(" "),a.postal_box?"а/я "+a.postal_box:null]).join(", ")}},d.PARTY={urlSuffix:"party",matchers:[a.proxy(n.matchByFields,{fieldsStopwords:{value:null,"data.address.value":f,"data.inn":null}})],geoEnabled:!0,formatResult:function(a,b,d,h){var i=this,j=i.type.formatResultInn.call(i,d,b),k=i.highlightMatches(m.getDeepValue(d.data,"ogrn"),b,d),l=c(j,k),n=i.highlightMatches(m.getDeepValue(d.data,"management.name"),b,d),o=m.getDeepValue(d.data,"address.value")||"";return i.isMobile&&((h||(h={})).maxLength=50),a=e.call(i,a,m.getDeepValue(d.data,"name.latin"),b,d,h),a=i.wrapFormattedValue(a,d),o&&(o=o.replace(/^\d{6}( РОССИЯ)?, /i,""),o=i.isMobile?o.replace(new RegExp("^([^"+g+"]+["+g+"]+[^"+g+"]+).*"),"$1"):i.highlightMatches(o,b,d,{unformattableTokens:f})),(l||o||n)&&(a+='<div class="'+i.classes.subtext+'"><span class="'+i.classes.subtext_inline+'">'+(l||"")+"</span>"+(c(o,n)||"")+"</div>"),a},formatResultInn:function(b,c){var d,e,f=this,g=b.data&&b.data.inn,h=i[b.data&&b.data.type],j=/\d/;return g?(e=f.highlightMatches(g,c,b),h&&(e=e.split(""),d=a.map(h,function(a){for(var b,c="";a&&(b=e.shift());)c+=b,j.test(b)&&a--;return c}),e=d.join('<span class="'+f.classes.subtext_delimiter+'"></span>')+e.join("")),e):void 0}},d.EMAIL={urlSuffix:"email",matchers:[n.matchByNormalizedQuery],isQueryRequestable:function(a){return this.options.suggest_local||a.indexOf("@")>=0}},d.BANK={urlSuffix:"bank",matchers:[n.matchByWords],formatResult:function(a,b,c,d){var e=this,h=e.highlightMatches(m.getDeepValue(c.data,"bic"),b,c),i=m.getDeepValue(c.data,"address.value")||"";return a=e.highlightMatches(a,b,c,d),a=e.wrapFormattedValue(a,c),i&&(i=i.replace(/^\d{6}( РОССИЯ)?, /i,""),i=e.isMobile?i.replace(new RegExp("^([^"+g+"]+["+g+"]+[^"+g+"]+).*"),"$1"):e.highlightMatches(i,b,c,{unformattableTokens:f})),(h||i)&&(a+='<div class="'+e.classes.subtext+'"><span class="'+e.classes.subtext_inline+'">'+h+"</span>"+i+"</div>"),a},formatSelected:function(a){return m.getDeepValue(a,"data.name.payment")}},a.extend(k,{suggest_local:!0})}();var o={suggest:{defaultParams:{type:m.getDefaultType(),dataType:"json",contentType:m.getDefaultContentType()},addTypeInUrl:!0},detectAddressByIp:{defaultParams:{type:"GET",dataType:"json"},addTypeInUrl:!1},status:{defaultParams:{type:"GET",dataType:"json"},addTypeInUrl:!0},findById:{defaultParams:{type:m.getDefaultType(),dataType:"json",contentType:m.getDefaultContentType()},addTypeInUrl:!0}},p={suggest:{method:"suggest",userSelect:!0,updateValue:!0,enrichmentEnabled:!0},findById:{method:"findById",userSelect:!1,updateValue:!1,enrichmentEnabled:!1}};b.utils=m,b.defaultOptions=k,b.version="15.12.0",a.Suggestions=b,b.prototype={initialize:function(){var a=this;a.uniqueId=m.uniqueId("i"),a.createWrapper(),a.notify("initialize"),a.bindWindowEvents(),a.setOptions(),a.fixPosition()},deferInitialization:function(){var a,b=this,c="mouseover focus keydown",d=function(){b.initializer.resolve(),b.enable()};b.initializer.always(function(){b.el.off(c,d),clearInterval(a)}),b.disabled=!0,b.el.on(c,d),a=setInterval(function(){b.el.is(":visible")&&d()},b.options.initializeInterval)},isInitialized:function(){return"resolved"===this.initializer.state()},dispose:function(){var a=this;a.initializer.reject(),a.notify("dispose"),a.el.removeData(f).removeClass("suggestions-input"),a.unbindWindowEvents(),a.removeWrapper(),a.el.trigger("suggestions-dispose")},notify:function(b){var c=this,d=m.slice(arguments,1);return a.map(l.get(b),function(a){return a.apply(c,d)})},createWrapper:function(){var b=this;b.$wrapper=a('<div class="suggestions-wrapper"/>'),b.el.after(b.$wrapper),b.$wrapper.on("mousedown"+e,a.proxy(b.onMousedown,b))},removeWrapper:function(){var b=this;b.$wrapper&&b.$wrapper.remove(),a(b.options.$helpers).off(e)},onMousedown:function(b){var c=this;b.preventDefault(),c.cancelBlur=!0,m.delay(function(){delete c.cancelBlur}),0==a(b.target).closest(".ui-menu-item").length&&m.delay(function(){a(document).one("mousedown",function(b){var d=c.el.add(c.$wrapper).add(c.options.$helpers);c.options.floating&&(d=d.add(c.$container)),d=d.filter(function(){return this===b.target||a.contains(this,b.target)}),d.length||c.hide()})})},bindWindowEvents:function(){var b=this,c=a.proxy(b.fixPosition,b);b.$viewport.on("resize"+e+b.uniqueId,c).on("scroll"+e+b.uniqueId,c)},unbindWindowEvents:function(){this.$viewport.off("resize"+e+this.uniqueId).off("scroll"+e+this.uniqueId)},scrollToTop:function(){var b=this,c=b.options.scrollOnFocus;c===!0&&(c=b.el),c instanceof a&&c.length>0&&a("body,html").animate({scrollTop:c.offset().top},"fast")},setOptions:function(b){var c=this;a.extend(c.options,b),a.each({type:d,requestMode:p},function(b,d){if(c[b]=d[c.options[b]],!c[b])throw c.disable(),"`"+b+"` option is incorrect! Must be one of: "+a.map(d,function(a,b){return'"'+b+'"'}).join(", ")}),a(c.options.$helpers).off(e).on("mousedown"+e,a.proxy(c.onMousedown,c)),c.isInitialized()&&c.notify("setOptions")},fixPosition:function(b){var c,d,e=this,f={};!e.isInitialized()||b&&"scroll"==b.type&&!e.options.floating||(e.$container.appendTo(e.options.floating?e.$body:e.$wrapper),e.isMobile=e.$viewport.width()<=e.options.mobileWidth,e.notify("resetPosition"),e.el.css("paddingLeft",""),e.el.css("paddingRight",""),f.paddingLeft=parseFloat(e.el.css("paddingLeft")),f.paddingRight=parseFloat(e.el.css("paddingRight")),a.extend(f,e.el.offset()),f.borderTop="none"==e.el.css("border-top-style")?0:parseFloat(e.el.css("border-top-width")),f.borderLeft="none"==e.el.css("border-left-style")?0:parseFloat(e.el.css("border-left-width")),f.innerHeight=e.el.innerHeight(),f.innerWidth=e.el.innerWidth(),f.outerHeight=e.el.outerHeight(),f.componentsLeft=0,f.componentsRight=0,c=e.$wrapper.offset(),d={top:f.top-c.top,left:f.left-c.left},e.notify("fixPosition",d,f),f.componentsLeft>f.paddingLeft&&e.el.css("paddingLeft",f.componentsLeft+"px"),f.componentsRight>f.paddingRight&&e.el.css("paddingRight",f.componentsRight+"px"))},clearCache:function(){this.cachedResponse={},this.enrichmentCache={},this.badQueries=[]},clear:function(){var a=this;a.isInitialized()&&(a.clearCache(),a.currentValue="",a.selection=null,a.hide(),a.suggestions=[],a.el.val(""),a.el.trigger("suggestions-clear"),a.notify("clear"))},disable:function(){var a=this;a.disabled=!0,a.abortRequest(),a.visible&&a.hide()},enable:function(){this.disabled=!1},isUnavailable:function(){return this.disabled},update:function(){var a=this,b=a.el.val();a.isInitialized()&&(a.currentValue=b,a.isQueryRequestable(b)?a.updateSuggestions(b):a.hide())},setSuggestion:function(b){var c,d,e=this;a.isPlainObject(b)&&a.isPlainObject(b.data)&&(b=a.extend(!0,{},b),e.bounds.own.length&&(e.checkValueBounds(b),c=e.copyBoundedData(b.data,e.bounds.all),b.data.kladr_id&&(c.kladr_id=e.getBoundedKladrId(b.data.kladr_id,e.bounds.all)),b.data=c),d=e.getSuggestionValue(b)||"",e.currentValue=d,e.el.val(d),e.selection=b,e.suggestions=[b],e.abortRequest())},fixData:function(){var b=this,c=b.extendedCurrentValue(),d=b.el.val(),e=a.Deferred();e.done(function(a){b.selectSuggestion(a,0,d,{hasBeenEnriched:!0})}).fail(function(){b.selection=null,b.currentValue="",b.el.val(b.currentValue)}),b.isQueryRequestable(c)?(b.currentValue=c,b.getSuggestions(c,{count:1,from_bound:null,to_bound:null}).done(function(a){var b=a[0];b?e.resolve(b):e.reject()}).fail(function(){e.reject()})):e.reject()},extendedCurrentValue:function(){var b=this,c=b.getParentInstance(),d=c&&c.extendedCurrentValue(),e=a.trim(b.el.val());return m.compact([d,e]).join(" ")},getAjaxParams:function(c,d){var e=this,f=a.trim(e.options.token),g=e.options.serviceUrl,h=o[c],i=a.extend({timeout:e.options.timeout},h.defaultParams),j={};return/\/$/.test(g)||(g+="/"),g+=c,h.addTypeInUrl&&(g+="/"+e.type.urlSuffix),g=m.fixURLProtocol(g),a.support.cors?(f&&(j.Authorization="Token "+f),j["X-Version"]=b.version,i.headers||(i.headers={}),a.extend(i.headers,e.options.headers,j)):(f&&(j.token=f),j.version=b.version,g=m.addUrlParams(g,j)),i.url=g,a.extend(i,d)},isQueryRequestable:function(a){var b,c=this;return b=a.length>=c.options.minChars,b&&c.type.isQueryRequestable&&(b=c.type.isQueryRequestable.call(c,a)),b},constructRequestParams:function(b,c){var d=this,e=d.options,f=a.isFunction(e.params)?e.params.call(d.element,b):a.extend({},e.params);return d.type.constructRequestParams&&a.extend(f,d.type.constructRequestParams.call(d)),a.each(d.notify("requestParams"),function(b,c){a.extend(f,c)}),f[e.paramName]=b,a.isNumeric(e.count)&&e.count>0&&(f.count=e.count),a.extend(f,c)},updateSuggestions:function(a){var b=this;b.fetchPhase=b.getSuggestions(a).done(function(c){b.assignSuggestions(c,a)})},getSuggestions:function(b,c,d){var e,f=this,g=f.options,h=d&&d.noCallbacks,i=d&&d.useEnrichmentCache,j=f.constructRequestParams(b,c),k=a.param(j||{}),l=a.Deferred();return e=f.cachedResponse[k],e&&a.isArray(e.suggestions)?l.resolve(e.suggestions):f.isBadQuery(b)?l.reject():h||g.onSearchStart.call(f.element,j)!==!1?f.doGetSuggestions(j).done(function(a){f.processResponse(a)&&b==f.currentValue?(g.noCache||(i?f.enrichmentCache[b]=a.suggestions[0]:(f.enrichResponse(a,b),f.cachedResponse[k]=a,g.preventBadQueries&&0===a.suggestions.length&&f.badQueries.push(b))),l.resolve(a.suggestions)):l.reject(),h||g.onSearchComplete.call(f.element,b,a.suggestions)}).fail(function(a,c,d){l.reject(),h||"abort"===c||g.onSearchError.call(f.element,b,a,c,d)}):l.reject(),l},doGetSuggestions:function(b){var c=this,d=a.ajax(c.getAjaxParams(c.requestMode.method,{data:m.serialize(b)}));return c.abortRequest(),c.currentRequest=d,c.notify("request"),d.always(function(){c.currentRequest=null,c.notify("request")}),d},isBadQuery:function(b){if(!this.options.preventBadQueries)return!1;var c=!1;return a.each(this.badQueries,function(a,d){return!(c=0===b.indexOf(d))}),c},abortRequest:function(){var a=this;a.currentRequest&&a.currentRequest.abort()},processResponse:function(b){var c=this;return b&&a.isArray(b.suggestions)?(c.verifySuggestionsFormat(b.suggestions),c.setUnrestrictedValues(b.suggestions),!0):!1},verifySuggestionsFormat:function(b){"string"==typeof b[0]&&a.each(b,function(a,c){b[a]={value:c,data:null}})},getSuggestionValue:function(b){var c,d=this,e=d.options.formatSelected||d.type.formatSelected;return a.isFunction(e)&&(c=e.call(d,b)),("string"!=typeof c||0==c.length)&&(c=b.value),c},assignSuggestions:function(a,b){var c=this;c.suggestions=a,c.notify("assignSuggestions",b)},shouldRestrictValues:function(){var a=this;return a.options.restrict_value&&a.constraints&&1==Object.keys(a.constraints).length},setUnrestrictedValues:function(b){var c=this,d=c.shouldRestrictValues(),e=c.getFirstConstraintLabel();a.each(b,function(a,b){b.unrestricted_value=d?e+", "+b.value:b.value})},areSuggestionsSame:function(a,b){return a&&b&&a.value===b.value&&m.areSame(a.data,b.data)}},function(){var d={setupElement:function(){this.el.attr("autocomplete","off").addClass("suggestions-input").css("box-sizing","border-box")},bindElementEvents:function(){var b=this;b.el.on("keydown"+e,a.proxy(b.onElementKeyDown,b)),b.el.on(["keyup"+e,"cut"+e,"paste"+e,"input"+e].join(" "),a.proxy(b.onElementKeyUp,b)),b.el.on("blur"+e,a.proxy(b.onElementBlur,b)),b.el.on("focus"+e,a.proxy(b.onElementFocus,b))},unbindElementEvents:function(){this.el.off(e)},onElementBlur:function(){var a=this;return a.cancelBlur?void(a.cancelBlur=!1):(a.options.triggerSelectOnBlur?a.isUnavailable()||a.selectCurrentValue({noSpace:!0}).always(function(){a.hide()}):a.hide(),void(a.fetchPhase.abort&&a.fetchPhase.abort()))},onElementFocus:function(){var b=this;b.cancelFocus||m.delay(a.proxy(b.completeOnFocus,b)),b.cancelFocus=!1},onElementKeyDown:function(a){var b=this;if(!b.isUnavailable())if(b.visible){switch(a.which){case c.ESC:b.el.val(b.currentValue),b.hide(),b.abortRequest();break;case c.TAB:if(b.options.tabDisabled===!1)return;break;case c.ENTER:b.options.triggerSelectOnEnter&&b.selectCurrentValue();break;case c.SPACE:return void(b.options.triggerSelectOnSpace&&b.isCursorAtEnd()&&(a.preventDefault(),b.selectCurrentValue({continueSelecting:!0,dontEnrich:!0}).fail(function(){b.currentValue+=" ",b.el.val(b.currentValue),b.proceedChangedValue()})));case c.UP:b.moveUp();break;case c.DOWN:b.moveDown();break;default:return}a.stopImmediatePropagation(),a.preventDefault()}else switch(a.which){case c.DOWN:b.suggest();break;case c.ENTER:b.options.triggerSelectOnEnter&&b.triggerOnSelectNothing()}},onElementKeyUp:function(a){var b=this;if(!b.isUnavailable()){switch(a.which){case c.UP:case c.DOWN:case c.ENTER:return}clearTimeout(b.onChangeTimeout),b.inputPhase.reject(),b.currentValue!==b.el.val()&&b.proceedChangedValue()}},proceedChangedValue:function(){var b=this;b.abortRequest(),b.inputPhase=a.Deferred().done(a.proxy(b.onValueChange,b)),b.options.deferRequestBy>0?b.onChangeTimeout=m.delay(function(){b.inputPhase.resolve()},b.options.deferRequestBy):b.inputPhase.resolve()},onValueChange:function(){var a,b=this;b.selection&&(a=b.selection,b.selection=null,b.trigger("InvalidateSelection",a)),b.selectedIndex=-1,b.update(),b.notify("valueChange")},completeOnFocus:function(){var a=this;a.isUnavailable()||a.isElementFocused()&&(a.fixPosition(),a.update(),a.isMobile&&(a.setCursorAtEnd(),a.scrollToTop()))},isElementFocused:function(){return document.activeElement===this.element},isCursorAtEnd:function(){var a,b,c=this,d=c.el.val().length;try{if(a=c.element.selectionStart,"number"==typeof a)return a===d}catch(e){}return document.selection?(b=document.selection.createRange(),b.moveStart("character",-d),d===b.text.length):!0},setCursorAtEnd:function(){var a=this.element;try{a.selectionEnd=a.selectionStart=a.value.length,a.scrollLeft=a.scrollWidth}catch(b){a.value=a.value}}};a.extend(b.prototype,d),l.on("initialize",d.bindElementEvents).on("dispose",d.unbindElementEvents)}(),function(){function c(){a.each(d,function(){this.abort()}),d={}}var d={};c();var e={checkStatus:function(){function b(b){a.isFunction(c.options.onSearchError)&&c.options.onSearchError.call(c.element,null,g,"error",b)}var c=this,e=a.trim(c.options.token),f=c.options.type+e,g=d[f];g||(g=d[f]=a.ajax(c.getAjaxParams("status"))),g.done(function(d){d.search?a.extend(c.status,d):b("Service Unavailable")}).fail(function(){b(g.statusText)})}};b.resetTokens=c,a.extend(b.prototype,e),l.on("setOptions",e.checkStatus)}(),function(){function c(){d=null,b.defaultOptions.geoLocation=e}if("GET"!=m.getDefaultType()){var d,e=!0,f={checkLocation:function(){var b=this,c=b.options.geoLocation;b.type.geoEnabled&&c&&(b.geoLocation=a.Deferred(),a.isPlainObject(c)||a.isArray(c)?b.geoLocation.resolve(c):(d||(d=a.ajax(b.getAjaxParams("detectAddressByIp"))),d.done(function(a){var c=a&&a.location&&a.location.data;c&&c.kladr_id?b.geoLocation.resolve(c):b.geoLocation.reject()}).fail(function(){b.geoLocation.reject()})))},getGeoLocation:function(){return this.geoLocation},constructParams:function(){var b=this,c={};return b.geoLocation&&a.isFunction(b.geoLocation.promise)&&"resolved"==b.geoLocation.state()&&b.geoLocation.done(function(b){c.locations_boost=a.makeArray(b)}),c}};a.extend(k,{geoLocation:e}),a.extend(b,{resetLocation:c}),a.extend(b.prototype,{getGeoLocation:f.getGeoLocation}),l.on("setOptions",f.checkLocation).on("requestParams",f.constructParams)}}(),function(){var c={enrichSuggestion:function(b,c){var d=this,e=a.trim(d.options.token),f=a.Deferred();return!d.status.enrich||!d.type.enrichmentEnabled||!d.requestMode.enrichmentEnabled||!e||c&&c.dontEnrich?f.resolve(b):b.data&&null!=b.data.qc?f.resolve(b):(d.disableDropdown(),d.currentValue=b.value,d.enrichPhase=d.getSuggestions(b.value,{count:1},{noCallbacks:!0,useEnrichmentCache:!0}).always(function(){d.enableDropdown()}).done(function(a){var c=a&&a[0];f.resolve(c||b,!!c)}).fail(function(){f.resolve(b)}),f)},enrichResponse:function(b,c){var d=this,e=d.enrichmentCache[c];e&&a.each(b.suggestions,function(a,d){return d.value===c?(b.suggestions[a]=e,!1):void 0})}};a.extend(b.prototype,c)}(),function(){function c(b){return a.map(b,function(a){var b=m.escapeHtml(a.text);return b&&a.matched&&(b="<strong>"+b+"</strong>"),b}).join("")}function d(b,c){var d=b.split(", ");return 1===d.length?b:a.map(d,function(a){return'<span class="'+c+'">'+a+"</span>"}).join(", ")}function f(b,c){var d=!1;return a.each(b,function(a,b){return d=b.value==c.value&&b!=c,d?!1:void 0}),d}var g={width:"auto",floating:!1},j={createContainer:function(){var b=this,c="."+b.classes.suggestion,d=b.options,f=a("<div/>").addClass(d.containerClass).css({position:"absolute",display:"none"});b.$container=f,f.on("click"+e,c,a.proxy(b.onSuggestionClick,b))},removeContainer:function(){var a=this;a.options.floating&&a.$container.remove()},setContainerOptions:function(){var b=this,c="mousedown"+e;b.$container.off(c),b.options.floating&&b.$container.on(c,a.proxy(b.onMousedown,b))},onSuggestionClick:function(b){var c,d=this,e=a(b.target);if(!d.dropdownDisabled){for(;e.length&&!(c=e.attr("data-index"));)e=e.closest("."+d.classes.suggestion);c&&!isNaN(c)&&d.select(+c)}d.cancelFocus=!0,d.el.focus()},setDropdownPosition:function(a,b){var c,d=this;d.isMobile?c={left:a.left-b.left+"px",top:a.top+b.outerHeight+"px",width:d.$viewport.width()+"px"}:(c=d.options.floating?{left:b.left+"px",top:b.top+b.borderTop+b.innerHeight+"px"}:{left:a.left+"px",top:a.top+b.borderTop+b.innerHeight+"px"},m.delay(function(){var a=d.options.width;"auto"===a&&(a=d.el.outerWidth()),d.$container.outerWidth(a)})),d.$container.toggleClass(d.classes.mobile,d.isMobile).css(c),d.containerItemsPadding=b.left+b.borderLeft+b.paddingLeft},setItemsPositions:function(){var a=this,b=a.getSuggestionsItems();b.css("paddingLeft",a.isMobile?a.containerItemsPadding+"px":"")},getSuggestionsItems:function(){return this.$container.children("."+this.classes.suggestion)},toggleDropdownEnabling:function(a){this.dropdownDisabled=!a,this.$container.attr("disabled",!a)},disableDropdown:function(){this.toggleDropdownEnabling(!1)},enableDropdown:function(){this.toggleDropdownEnabling(!0)},hasSuggestionsToChoose:function(){var b=this;return b.suggestions.length>1||1===b.suggestions.length&&(!b.selection||a.trim(b.suggestions[0].value)!==a.trim(b.selection.value))},suggest:function(){var b,c,d=this,e=d.options;if(d.requestMode.userSelect){if(!d.hasSuggestionsToChoose())return void d.hide();b=e.formatResult||d.type.formatResult||d.formatResult,c=[],!d.isMobile&&e.hint&&d.suggestions.length&&c.push('<div class="'+d.classes.hint+'">'+e.hint+"</div>"),d.selectedIndex=-1,a.each(d.suggestions,function(a,e){var f=d.makeSuggestionLabel(d.suggestions,e);e==d.selection&&(d.selectedIndex=a),c.push('<div class="'+d.classes.suggestion+'" data-index="'+a+'">'),c.push(b.call(d,e.value,d.currentValue,e,{unformattableTokens:d.type.unformattableTokens})),f&&c.push('<span class="'+d.classes.subtext_label+'">'+m.escapeHtml(f)+"</span>"),c.push("</div>")}),d.$container.html(c.join("")),e.autoSelectFirst&&-1===d.selectedIndex&&(d.selectedIndex=0),-1!==d.selectedIndex&&d.getSuggestionsItems().eq(d.selectedIndex).addClass(d.classes.selected),a.isFunction(e.beforeRender)&&e.beforeRender.call(d.element,d.$container),d.$container.show(),d.visible=!0,d.fixPosition(),d.setItemsPositions()}},wrapFormattedValue:function(a,b){var c=this,d=m.getDeepValue(b.data,"state.status");return'<span class="'+c.classes.value+'"'+(d?' data-suggestion-status="'+d+'"':"")+">"+a+"</span>"},formatResult:function(a,b,c,d){var e=this;return a=e.highlightMatches(a,b,c,d),e.wrapFormattedValue(a,c)},highlightMatches:function(b,e,f,g){var j,k,l,n,o,p,q,r=this,s=[],t=g&&g.unformattableTokens,u=g&&g.maxLength,v=m.reWordExtractor();if(!b)return"";for(j=m.formatToken(e).split(h),j=m.withSubTokens(j),k=a.map(j,function(a){return new RegExp("^((.*)(["+i+"]+))?("+m.escapeRegExChars(a)+")([^"+i+"]*["+i+"]*)","i")});(l=v.exec(b))&&l[0];)n=l[1],s.push({text:n,inUpperCase:n.toLowerCase()!==n,formatted:m.formatToken(n),matchable:!0}),l[2]&&s.push({text:l[2]});for(o=0;o<s.length;o++)p=s[o],!p.matchable||p.matched||-1!==a.inArray(p.formatted,t)&&!p.inUpperCase||a.each(k,function(a,b){var c,d=b.exec(p.formatted),e=o+1;return d?(d={before:d[1]||"",beforeText:d[2]||"",beforeDelimiter:d[3]||"",text:d[4]||"",after:d[5]||""},d.before&&(s.splice(o,0,{text:p.text.substr(0,d.beforeText.length),formatted:d.beforeText,matchable:!0},{text:d.beforeDelimiter}),e+=2,c=d.before.length,p.text=p.text.substr(c),p.formatted=p.formatted.substr(c),o--),c=d.text.length+d.after.length,p.formatted.length>c&&(s.splice(e,0,{text:p.text.substr(c),formatted:p.formatted.substr(c),matchable:!0}),p.text=p.text.substr(0,c),p.formatted=p.formatted.substr(0,c)),d.after&&(c=d.text.length,s.splice(e,0,{text:p.text.substr(c),formatted:p.formatted.substr(c)}),p.text=p.text.substr(0,c),p.formatted=p.formatted.substr(0,c)),p.matched=!0,!1):void 0});if(u){for(o=0;o<s.length&&u>=0;o++)p=s[o],u-=p.text.length,0>u&&(p.text=p.text.substr(0,p.text.length+u)+"...");s.length=o}return q=c(s),d(q,r.classes.nowrap)},makeSuggestionLabel:function(b,c){var d,e,g=this,h=g.type.fieldNames,i={},j=m.reWordExtractor(),k=[];if(h&&f(b,c)&&c.data&&(a.each(h,function(a){var b=c.data[a];b&&(i[a]=m.formatToken(b))}),!a.isEmptyObject(i))){for(;(d=j.exec(m.formatToken(c.value)))&&(e=d[1]);)a.each(i,function(a,b){return b==e?(k.push(h[a]),delete i[a],!1):void 0});if(k.length)return k.join(", ")}},hide:function(){var a=this;a.visible=!1,a.selectedIndex=-1,a.$container.hide().empty()},activate:function(a){var b,c,d=this,e=d.classes.selected;return!d.dropdownDisabled&&(c=d.getSuggestionsItems(),c.removeClass(e),d.selectedIndex=a,-1!==d.selectedIndex&&c.length>d.selectedIndex)?(b=c.eq(d.selectedIndex),b.addClass(e),b):null},deactivate:function(a){var b=this;b.dropdownDisabled||(b.selectedIndex=-1,b.getSuggestionsItems().removeClass(b.classes.selected),a&&b.el.val(b.currentValue))},moveUp:function(){var a=this;if(!a.dropdownDisabled)return-1===a.selectedIndex?void(a.suggestions.length&&a.adjustScroll(a.suggestions.length-1)):0===a.selectedIndex?void a.deactivate(!0):void a.adjustScroll(a.selectedIndex-1)},moveDown:function(){var a=this;if(!a.dropdownDisabled)return a.selectedIndex===a.suggestions.length-1?void a.deactivate(!0):void a.adjustScroll(a.selectedIndex+1)},adjustScroll:function(a){var b,c,d,e=this,f=e.activate(a),g=e.$container.scrollTop();f&&f.length&&(b=f.position().top,0>b?e.$container.scrollTop(g+b):(c=b+f.outerHeight(),d=e.$container.innerHeight(),c>d&&e.$container.scrollTop(g-d+c)),e.el.val(e.suggestions[a].value))}};a.extend(k,g),a.extend(b.prototype,j),l.on("initialize",j.createContainer).on("dispose",j.removeContainer).on("setOptions",j.setContainerOptions).on("fixPosition",j.setDropdownPosition).on("fixPosition",j.setItemsPositions).on("assignSuggestions",j.suggest)}(),function(){var b="addon",c=50,d=1e3,e={addon:null},f={NONE:"none",SPINNER:"spinner",CLEAR:"clear"},g=function(b){var c=this,d=a('<span class="suggestions-addon"/>');
c.owner=b,c.$el=d,c.type=f.NONE,c.visible=!1,c.initialPadding=null,d.on("click",a.proxy(c,"onClick"))};g.prototype={checkType:function(){var b=this,c=b.owner.options.addon,d=!1;a.each(f,function(a,b){return d=b==c,d?!1:void 0}),d||(c=b.owner.isMobile?f.CLEAR:f.SPINNER),c!=b.type&&(b.type=c,b.$el.attr("data-addon-type",c),b.toggle(!0))},toggle:function(a){var b,c=this;switch(c.type){case f.CLEAR:b=!!c.owner.currentValue;break;case f.SPINNER:b=!!c.owner.currentRequest;break;default:b=!1}b!=c.visible&&(c.visible=b,b?c.show(a):c.hide(a))},show:function(a){var b=this,d={opacity:1};a?(b.$el.show().css(d),b.showBackground(!0)):b.$el.stop(!0,!0).delay(c).queue(function(){b.$el.show(),b.showBackground(),b.$el.dequeue()}).animate(d,"fast")},hide:function(a){var b=this,c={opacity:0};a&&b.$el.hide().css(c),b.$el.stop(!0).animate(c,{duration:"fast",complete:function(){b.$el.hide(),b.hideBackground()}})},fixPosition:function(a,b){var c=this,d=b.innerHeight;c.checkType(),c.$el.css({left:a.left+b.borderLeft+b.innerWidth-d+"px",top:a.top+b.borderTop+"px",height:d,width:d}),c.initialPadding=b.paddingRight,c.width=d,c.visible&&(b.componentsRight+=d)},showBackground:function(a){var c=this,d=c.owner.el,e={paddingRight:c.width};c.width>c.initialPadding&&(c.stopBackground(),a?d.css(e):d.animate(e,{duration:"fast",queue:b}).dequeue(b))},hideBackground:function(a){var c=this,e=c.owner.el,f={paddingRight:c.initialPadding};c.width>c.initialPadding&&(c.stopBackground(!0),a?e.css(f):e.delay(d,b).animate(f,{duration:"fast",queue:b}).dequeue(b))},stopBackground:function(a){this.owner.el.stop(b,!0,a)},onClick:function(a){var b=this;b.type==f.CLEAR&&b.owner.clear()}};var h={createAddon:function(){var a=this,b=new g(a);a.$wrapper.append(b.$el),a.addon=b},fixAddonPosition:function(a,b){this.addon.fixPosition(a,b)},checkAddonType:function(){this.addon.checkType()},checkAddonVisibility:function(){this.addon.toggle()},stopBackground:function(){this.addon.stopBackground()}};a.extend(k,e),l.on("initialize",h.createAddon).on("setOptions",h.checkAddonType).on("fixPosition",h.fixAddonPosition).on("clear",h.checkAddonVisibility).on("valueChange",h.checkAddonVisibility).on("request",h.checkAddonVisibility).on("resetPosition",h.stopBackground)}(),function(){function c(b){var c={};return a.isPlainObject(b)&&a.each(b,function(a,b){b&&f.indexOf(a)>=0&&(c[a]=b)}),a.isEmptyObject(c)?void 0:c.kladr_id?{kladr_id:c.kladr_id}:c}function d(b,c){var d=c.selection,e=d&&d.data&&c.bounds;return e&&a.each(c.bounds.all,function(a,c){return e=d.data[c]===b.data[c]}),e}var e={constraints:null,restrict_value:!1},f=["kladr_id","postal_code","country","region","area","city","settlement","street"],g={createConstraints:function(){var b=this;b.constraints={},b.$constraints=a('<ul class="suggestions-constraints"/>'),b.$wrapper.append(b.$constraints),b.$constraints.on("click","."+b.classes.removeConstraint,a.proxy(b.onConstraintRemoveClick,b))},setConstraintsPosition:function(a,b){var c=this;c.$constraints.css({left:a.left+b.borderLeft+b.paddingLeft+"px",top:a.top+b.borderTop+Math.round((b.innerHeight-c.$constraints.height())/2)+"px"}),b.componentsLeft+=c.$constraints.outerWidth(!0)+b.paddingLeft},onConstraintRemoveClick:function(b){var c=this,d=a(b.target).closest("li"),e=d.attr("data-constraint-id");delete c.constraints[e],c.update(),d.fadeOut("fast",function(){c.removeConstraint(e)})},setupConstraints:function(){var b,c=this,d=c.options.constraints;return d?void(d instanceof a||"string"==typeof d||"number"==typeof d.nodeType?(b=a(d),b.is(c.constraints)||(c.unbindFromParent(),b.is(c.el)||(c.constraints=b,c.bindToParent()))):(c._constraintsUpdating=!0,a.each(c.constraints,a.proxy(c.removeConstraint,c)),a.each(a.makeArray(d),function(a,b){c.addConstraint(b)}),c._constraintsUpdating=!1,c.fixPosition())):void c.unbindFromParent()},formatConstraint:function(b){var d,e=this;return b&&(b.locations||b.restrictions)?(d=a.makeArray(b.locations||b.restrictions),null==b.label&&e.type.composeValue&&(b.label=a.map(d,function(a){return e.type.composeValue(a)}).join(", ")),b.locations=[],a.each(d,function(a,d){var e=c(d);e&&b.locations.push(e)}),b.locations.length?b:null):void 0},addConstraint:function(b){var c,d,e=this;b=e.formatConstraint(b),b&&(d=m.uniqueId("c"),e.constraints[d]=b,b.label&&(c=a("<li/>").append(a("<span/>").text(b.label)).attr("data-constraint-id",d),b.deletable&&c.append(a('<span class="suggestions-remove"/>')),e.$constraints.append(c),e._constraintsUpdating||e.fixPosition()))},removeConstraint:function(a){var b=this;delete b.constraints[a],b.$constraints.children('[data-constraint-id="'+a+'"]').remove(),b._constraintsUpdating||b.fixPosition()},constructConstraintsParams:function(){for(var b,d,e=this,f=[],g=e.constraints,h={};g instanceof a&&(b=g.suggestions())&&!(d=m.getDeepValue(b,"selection.data"));)g=b.constraints;return g instanceof a?(d=c(d),d&&(h.locations=[d],h.restrict_value=!0)):g&&(a.each(g,function(a,b){f=f.concat(b.locations)}),f.length&&(h.locations=f,h.restrict_value=e.options.restrict_value)),h},getFirstConstraintLabel:function(){var b=this,c=a.isPlainObject(b.constraints)&&Object.keys(b.constraints)[0];return c?b.constraints[c].label:""},bindToParent:function(){var b=this;b.constraints.on(["suggestions-select."+b.uniqueId,"suggestions-invalidateselection."+b.uniqueId,"suggestions-clear."+b.uniqueId].join(" "),a.proxy(b.onParentSelectionChanged,b)).on("suggestions-dispose."+b.uniqueId,a.proxy(b.onParentDispose,b))},unbindFromParent:function(){var b=this,c=b.constraints;c instanceof a&&c.off("."+b.uniqueId)},onParentSelectionChanged:function(a,b,c){("suggestions-select"!==a.type||c)&&this.clear()},onParentDispose:function(a){this.unbindFromParent()},getParentInstance:function(){return this.constraints instanceof a&&this.constraints.suggestions()},shareWithParent:function(a){var b=this.getParentInstance();b&&b.type===this.type&&!d(a,b)&&(b.shareWithParent(a),b.setSuggestion(a))}};a.extend(k,e),a.extend(b.prototype,g),"GET"!=m.getDefaultType()&&l.on("initialize",g.createConstraints).on("setOptions",g.setupConstraints).on("fixPosition",g.setConstraintsPosition).on("requestParams",g.constructConstraintsParams).on("dispose",g.unbindFromParent)}(),function(){var c={proceedQuery:function(a){var b=this;a.length>=b.options.minChars?b.updateSuggestions(a):b.hide()},selectCurrentValue:function(b){var c=this,d=a.Deferred();return c.inputPhase.resolve(),c.fetchPhase.done(function(){var a;c.selection&&!c.visible?d.reject():(a=c.findSuggestionIndex(),c.select(a,b),-1===a?d.reject():d.resolve(a))}).fail(function(){d.reject()}),d},selectFoundSuggestion:function(){var a=this;a.requestMode.userSelect||a.select(0)},findSuggestionIndex:function(){var b,c=this,d=c.selectedIndex;return-1===d&&(b=a.trim(c.el.val()),b&&a.each(c.type.matchers,function(a,e){return d=e(b,c.suggestions),-1===d})),d},select:function(b,c){var d=this,e=d.suggestions[b],f=c&&c.continueSelecting,g=d.currentValue;if(!d.triggering.Select)return e?void d.enrichSuggestion(e,c).done(function(e,f){d.selectSuggestion(e,b,g,a.extend({hasBeenEnriched:f},c))}):(f||d.selection||d.triggerOnSelectNothing(),void d.onSelectComplete(f))},selectSuggestion:function(a,b,c,d){var e=this,f=d.continueSelecting,g=!e.type.isDataComplete||e.type.isDataComplete.call(e,a),h=e.selection;e.triggering.Select||(e.type.alwaysContinueSelecting&&(f=!0),g&&(f=!1),d.hasBeenEnriched&&(e.suggestions[b]=a),e.requestMode.updateValue&&(e.checkValueBounds(a),e.currentValue=e.getSuggestionValue(a),!e.currentValue||d.noSpace||g||(e.currentValue+=" "),e.el.val(e.currentValue)),e.currentValue?(e.selection=a,e.areSuggestionsSame(a,h)||e.trigger("Select",a,e.currentValue!=c),e.requestMode.userSelect&&e.onSelectComplete(f)):(e.selection=null,e.triggerOnSelectNothing()),e.shareWithParent(a))},onSelectComplete:function(a){var b=this;a?(b.selectedIndex=-1,b.updateSuggestions(b.currentValue)):b.hide()},triggerOnSelectNothing:function(){var a=this;a.triggering.SelectNothing||a.trigger("SelectNothing",a.currentValue)},trigger:function(b){var c=this,d=m.slice(arguments,1),e=c.options["on"+b];c.triggering[b]=!0,a.isFunction(e)&&e.apply(c.element,d),c.el.trigger.call(c.el,"suggestions-"+b.toLowerCase(),d),c.triggering[b]=!1}};a.extend(b.prototype,c),l.on("assignSuggestions",c.selectFoundSuggestion)}(),function(){var b={bounds:null},c={region:{digits:2,zeros:11},area:{digits:5,zeros:8},city:{digits:8,zeros:5},settlement:{digits:11,zeros:2},street:{digits:15,zeros:2},house:{digits:19}},d={setupBounds:function(){this.bounds={from:null,to:null}},setBoundsOptions:function(){var b,c,d=this,e=d.type.boundsAvailable,f=a.trim(d.options.bounds).split("-"),g=f[0],h=f[f.length-1],i=[],j=[];-1===a.inArray(g,e)&&(g=null),c=a.inArray(h,e),(-1===c||c===e.length-1)&&(h=null),(g||h)&&(b=!g,a.each(e,function(a,c){return c==g&&(b=!0),j.push(c),b&&i.push(c),c==h?!1:void 0})),d.bounds.from=g,d.bounds.to=h,d.bounds.all=j,d.bounds.own=i},constructBoundsParams:function(){var a=this,b={};return a.bounds.from&&(b.from_bound={value:a.bounds.from}),a.bounds.to&&(b.to_bound={value:a.bounds.to}),b},checkValueBounds:function(a){var b,c=this;c.bounds.own.length&&c.type.composeValue&&(b=c.copyBoundedData(a.data,c.bounds.own),a.value=c.type.composeValue(b))},copyBoundedData:function(b,c){var d={},e=this.type.boundsFields;return e&&a.each(c,function(c,f){var g=e[f];g&&a.each(g,function(a,c){null!=b[c]&&(d[c]=b[c])})}),d},getBoundedKladrId:function(a,b){var d=b[b.length-1],e=c[d],f=a.substr(0,e.digits);return e.zeros&&(f+=new Array(e.zeros+1).join("0")),f}};a.extend(k,b),a.extend(a.Suggestions.prototype,d),l.on("initialize",d.setupBounds).on("setOptions",d.setBoundsOptions).on("requestParams",d.constructBoundsParams)}(),a.fn.suggestions=function(c,d){return 0===arguments.length?this.first().data(f):this.each(function(){var e=a(this),g=e.data(f);"string"==typeof c?g&&"function"==typeof g[c]&&g[c](d):(g&&g.dispose&&g.dispose(),g=new b(this,c),e.data(f,g))})}});


// init.js

$(document).ready(function() {
	$.app.init();
});
