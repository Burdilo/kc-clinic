!function(){"use strict";function e(t,i){function o(e,t){return function(){return e.apply(t,arguments)}}var r;if(i=i||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=i.touchBoundary||10,this.layer=t,this.tapDelay=i.tapDelay||200,this.tapTimeout=i.tapTimeout||700,!e.notNeeded(t)){for(var s=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,u=0,l=s.length;l>u;u++)a[s[u]]=o(a[s[u]],a);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,i){var o=Node.prototype.removeEventListener;"click"===e?o.call(t,e,n.hijacked||n,i):o.call(t,e,n,i)},t.addEventListener=function(e,n,i){var o=Node.prototype.addEventListener;"click"===e?o.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),i):o.call(t,e,n,i)}),"function"==typeof t.onclick&&(r=t.onclick,t.addEventListener("click",function(e){r(e)},!1),t.onclick=null)}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,i=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,o=i&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=i&&/OS [6-7]_\d/.test(navigator.userAgent),s=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(i&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,i;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),i=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&"select"===e.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(e){var t;i&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,r;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],i){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!o){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n},e.prototype.onTouchMove=function(e){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},e.prototype.findControl=function(e){return void 0!==e.control?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,s,a,u,l,c=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,s=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(l=e.changedTouches[0],c=document.elementFromPoint(l.pageX-window.pageXOffset,l.pageY-window.pageYOffset)||c,c.fastClickScrollParent=this.targetElement.fastClickScrollParent),a=c.tagName.toLowerCase(),"label"===a){if(t=this.findControl(c)){if(this.focus(c),n)return!1;c=t}}else if(this.needsFocus(c))return e.timeStamp-s>100||i&&window.top!==window&&"input"===a?(this.targetElement=null,!1):(this.focus(c),this.sendClick(c,e),i&&"select"===a||(this.targetElement=null,e.preventDefault()),!1);return i&&!o&&(u=c.fastClickScrollParent,u&&u.fastClickLastScrollTop!==u.scrollTop)?!0:(this.needsClick(c)||(e.preventDefault(),this.sendClick(c,e)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,i,o,r;if("undefined"==typeof window.ontouchstart)return!0;if(i=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(i>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(s&&(o=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),o[1]>=10&&o[2]>=3&&(t=document.querySelector("meta[name=viewport]")))){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===e.style.msTouchAction||"manipulation"===e.style.touchAction?!0:(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],r>=27&&(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===e.style.touchAction||"manipulation"===e.style.touchAction)},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}(),!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t=!!e&&"length"in e&&e.length,n=pe.type(e);return"function"===n||pe.isWindow(e)?!1:"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e}function i(e,t,n){if(pe.isFunction(t))return pe.grep(e,function(e,i){return!!t.call(e,i,e)!==n});if(t.nodeType)return pe.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(Te.test(t))return pe.filter(t,e,n);t=pe.filter(t,e)}return pe.grep(e,function(e){return pe.inArray(e,t)>-1!==n})}function o(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}function r(e){var t={};return pe.each(e.match(Le)||[],function(e,n){t[n]=!0}),t}function s(){ie.addEventListener?(ie.removeEventListener("DOMContentLoaded",a),e.removeEventListener("load",a)):(ie.detachEvent("onreadystatechange",a),e.detachEvent("onload",a))}function a(){(ie.addEventListener||"load"===e.event.type||"complete"===ie.readyState)&&(s(),pe.ready())}function u(e,t,n){if(void 0===n&&1===e.nodeType){var i="data-"+t.replace(qe,"-$1").toLowerCase();if(n=e.getAttribute(i),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:_e.test(n)?pe.parseJSON(n):n}catch(o){}pe.data(e,t,n)}else n=void 0}return n}function l(e){var t;for(t in e)if(("data"!==t||!pe.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function c(e,t,n,i){if(Pe(e)){var o,r,s=pe.expando,a=e.nodeType,u=a?pe.cache:e,l=a?e[s]:e[s]&&s;if(l&&u[l]&&(i||u[l].data)||void 0!==n||"string"!=typeof t)return l||(l=a?e[s]=ne.pop()||pe.guid++:s),u[l]||(u[l]=a?{}:{toJSON:pe.noop}),("object"==typeof t||"function"==typeof t)&&(i?u[l]=pe.extend(u[l],t):u[l].data=pe.extend(u[l].data,t)),r=u[l],i||(r.data||(r.data={}),r=r.data),void 0!==n&&(r[pe.camelCase(t)]=n),"string"==typeof t?(o=r[t],null==o&&(o=r[pe.camelCase(t)])):o=r,o}}function d(e,t,n){if(Pe(e)){var i,o,r=e.nodeType,s=r?pe.cache:e,a=r?e[pe.expando]:pe.expando;if(s[a]){if(t&&(i=n?s[a]:s[a].data)){pe.isArray(t)?t=t.concat(pe.map(t,pe.camelCase)):t in i?t=[t]:(t=pe.camelCase(t),t=t in i?[t]:t.split(" ")),o=t.length;for(;o--;)delete i[t[o]];if(n?!l(i):!pe.isEmptyObject(i))return}(n||(delete s[a].data,l(s[a])))&&(r?pe.cleanData([e],!0):de.deleteExpando||s!=s.window?delete s[a]:s[a]=void 0)}}}function f(e,t,n,i){var o,r=1,s=20,a=i?function(){return i.cur()}:function(){return pe.css(e,t,"")},u=a(),l=n&&n[3]||(pe.cssNumber[t]?"":"px"),c=(pe.cssNumber[t]||"px"!==l&&+u)&&Me.exec(pe.css(e,t));if(c&&c[3]!==l){l=l||c[3],n=n||[],c=+u||1;do r=r||".5",c/=r,pe.style(e,t,c+l);while(r!==(r=a()/u)&&1!==r&&--s)}return n&&(c=+c||+u||0,o=n[1]?c+(n[1]+1)*n[2]:+n[2],i&&(i.unit=l,i.start=c,i.end=o)),o}function p(e){var t=Ve.split("|"),n=e.createDocumentFragment();if(n.createElement)for(;t.length;)n.createElement(t.pop());return n}function h(e,t){var n,i,o=0,r="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):void 0;if(!r)for(r=[],n=e.childNodes||e;null!=(i=n[o]);o++)!t||pe.nodeName(i,t)?r.push(i):pe.merge(r,h(i,t));return void 0===t||t&&pe.nodeName(e,t)?pe.merge([e],r):r}function g(e,t){for(var n,i=0;null!=(n=e[i]);i++)pe._data(n,"globalEval",!t||pe._data(t[i],"globalEval"))}function m(e){Fe.test(e.type)&&(e.defaultChecked=e.checked)}function v(e,t,n,i,o){for(var r,s,a,u,l,c,d,f=e.length,v=p(t),y=[],b=0;f>b;b++)if(s=e[b],s||0===s)if("object"===pe.type(s))pe.merge(y,s.nodeType?[s]:s);else if(Ue.test(s)){for(u=u||v.appendChild(t.createElement("div")),l=(Be.exec(s)||["",""])[1].toLowerCase(),d=ze[l]||ze._default,u.innerHTML=d[1]+pe.htmlPrefilter(s)+d[2],r=d[0];r--;)u=u.lastChild;if(!de.leadingWhitespace&&We.test(s)&&y.push(t.createTextNode(We.exec(s)[0])),!de.tbody)for(s="table"!==l||Xe.test(s)?"<table>"!==d[1]||Xe.test(s)?0:u:u.firstChild,r=s&&s.childNodes.length;r--;)pe.nodeName(c=s.childNodes[r],"tbody")&&!c.childNodes.length&&s.removeChild(c);for(pe.merge(y,u.childNodes),u.textContent="";u.firstChild;)u.removeChild(u.firstChild);u=v.lastChild}else y.push(t.createTextNode(s));for(u&&v.removeChild(u),de.appendChecked||pe.grep(h(y,"input"),m),b=0;s=y[b++];)if(i&&pe.inArray(s,i)>-1)o&&o.push(s);else if(a=pe.contains(s.ownerDocument,s),u=h(v.appendChild(s),"script"),a&&g(u),n)for(r=0;s=u[r++];)$e.test(s.type||"")&&n.push(s);return u=null,v}function y(){return!0}function b(){return!1}function x(){try{return ie.activeElement}catch(e){}}function w(e,t,n,i,o,r){var s,a;if("object"==typeof t){"string"!=typeof n&&(i=i||n,n=void 0);for(a in t)w(e,a,n,i,t[a],r);return e}if(null==i&&null==o?(o=n,i=n=void 0):null==o&&("string"==typeof n?(o=i,i=void 0):(o=i,i=n,n=void 0)),o===!1)o=b;else if(!o)return e;return 1===r&&(s=o,o=function(e){return pe().off(e),s.apply(this,arguments)},o.guid=s.guid||(s.guid=pe.guid++)),e.each(function(){pe.event.add(this,t,o,i,n)})}function C(e,t){return pe.nodeName(e,"table")&&pe.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function T(e){return e.type=(null!==pe.find.attr(e,"type"))+"/"+e.type,e}function k(e){var t=ot.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function E(e,t){if(1===t.nodeType&&pe.hasData(e)){var n,i,o,r=pe._data(e),s=pe._data(t,r),a=r.events;if(a){delete s.handle,s.events={};for(n in a)for(i=0,o=a[n].length;o>i;i++)pe.event.add(t,n,a[n][i])}s.data&&(s.data=pe.extend({},s.data))}}function S(e,t){var n,i,o;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!de.noCloneEvent&&t[pe.expando]){o=pe._data(t);for(i in o.events)pe.removeEvent(t,i,o.handle);t.removeAttribute(pe.expando)}"script"===n&&t.text!==e.text?(T(t).text=e.text,k(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),de.html5Clone&&e.innerHTML&&!pe.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Fe.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}function N(e,t,n,i){t=re.apply([],t);var o,r,s,a,u,l,c=0,d=e.length,f=d-1,p=t[0],g=pe.isFunction(p);if(g||d>1&&"string"==typeof p&&!de.checkClone&&it.test(p))return e.each(function(o){var r=e.eq(o);g&&(t[0]=p.call(this,o,r.html())),N(r,t,n,i)});if(d&&(l=v(t,e[0].ownerDocument,!1,e,i),o=l.firstChild,1===l.childNodes.length&&(l=o),o||i)){for(a=pe.map(h(l,"script"),T),s=a.length;d>c;c++)r=l,c!==f&&(r=pe.clone(r,!0,!0),s&&pe.merge(a,h(r,"script"))),n.call(e[c],r,c);if(s)for(u=a[a.length-1].ownerDocument,pe.map(a,k),c=0;s>c;c++)r=a[c],$e.test(r.type||"")&&!pe._data(r,"globalEval")&&pe.contains(u,r)&&(r.src?pe._evalUrl&&pe._evalUrl(r.src):pe.globalEval((r.text||r.textContent||r.innerHTML||"").replace(rt,"")));l=o=null}return e}function D(e,t,n){for(var i,o=t?pe.filter(t,e):e,r=0;null!=(i=o[r]);r++)n||1!==i.nodeType||pe.cleanData(h(i)),i.parentNode&&(n&&pe.contains(i.ownerDocument,i)&&g(h(i,"script")),i.parentNode.removeChild(i));return e}function L(e,t){var n=pe(t.createElement(e)).appendTo(t.body),i=pe.css(n[0],"display");return n.detach(),i}function j(e){var t=ie,n=lt[e];return n||(n=L(e,t),"none"!==n&&n||(ut=(ut||pe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),t=(ut[0].contentWindow||ut[0].contentDocument).document,t.write(),t.close(),n=L(e,t),ut.detach()),lt[e]=n),n}function A(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function P(e){if(e in kt)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=Tt.length;n--;)if(e=Tt[n]+t,e in kt)return e}function _(e,t){for(var n,i,o,r=[],s=0,a=e.length;a>s;s++)i=e[s],i.style&&(r[s]=pe._data(i,"olddisplay"),n=i.style.display,t?(r[s]||"none"!==n||(i.style.display=""),""===i.style.display&&Oe(i)&&(r[s]=pe._data(i,"olddisplay",j(i.nodeName)))):(o=Oe(i),(n&&"none"!==n||!o)&&pe._data(i,"olddisplay",o?n:pe.css(i,"display"))));for(s=0;a>s;s++)i=e[s],i.style&&(t&&"none"!==i.style.display&&""!==i.style.display||(i.style.display=t?r[s]||"":"none"));return e}function q(e,t,n){var i=xt.exec(t);return i?Math.max(0,i[1]-(n||0))+(i[2]||"px"):t}function R(e,t,n,i,o){for(var r=n===(i?"border":"content")?4:"width"===t?1:0,s=0;4>r;r+=2)"margin"===n&&(s+=pe.css(e,n+Ie[r],!0,o)),i?("content"===n&&(s-=pe.css(e,"padding"+Ie[r],!0,o)),"margin"!==n&&(s-=pe.css(e,"border"+Ie[r]+"Width",!0,o))):(s+=pe.css(e,"padding"+Ie[r],!0,o),"padding"!==n&&(s+=pe.css(e,"border"+Ie[r]+"Width",!0,o)));return s}function M(t,n,i){var o=!0,r="width"===n?t.offsetWidth:t.offsetHeight,s=ht(t),a=de.boxSizing&&"border-box"===pe.css(t,"boxSizing",!1,s);if(ie.msFullscreenElement&&e.top!==e&&t.getClientRects().length&&(r=Math.round(100*t.getBoundingClientRect()[n])),0>=r||null==r){if(r=gt(t,n,s),(0>r||null==r)&&(r=t.style[n]),dt.test(r))return r;o=a&&(de.boxSizingReliable()||r===t.style[n]),r=parseFloat(r)||0}return r+R(t,n,i||(a?"border":"content"),o,s)+"px"}function I(e,t,n,i,o){return new I.prototype.init(e,t,n,i,o)}function O(){return e.setTimeout(function(){Et=void 0}),Et=pe.now()}function H(e,t){var n,i={height:e},o=0;for(t=t?1:0;4>o;o+=2-t)n=Ie[o],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function F(e,t,n){for(var i,o=(W.tweeners[t]||[]).concat(W.tweeners["*"]),r=0,s=o.length;s>r;r++)if(i=o[r].call(n,t,e))return i}function B(e,t,n){var i,o,r,s,a,u,l,c,d=this,f={},p=e.style,h=e.nodeType&&Oe(e),g=pe._data(e,"fxshow");n.queue||(a=pe._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,d.always(function(){d.always(function(){a.unqueued--,pe.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],l=pe.css(e,"display"),c="none"===l?pe._data(e,"olddisplay")||j(e.nodeName):l,"inline"===c&&"none"===pe.css(e,"float")&&(de.inlineBlockNeedsLayout&&"inline"!==j(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",de.shrinkWrapBlocks()||d.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(i in t)if(o=t[i],Nt.exec(o)){if(delete t[i],r=r||"toggle"===o,o===(h?"hide":"show")){if("show"!==o||!g||void 0===g[i])continue;h=!0}f[i]=g&&g[i]||pe.style(e,i)}else l=void 0;if(pe.isEmptyObject(f))"inline"===("none"===l?j(e.nodeName):l)&&(p.display=l);else{g?"hidden"in g&&(h=g.hidden):g=pe._data(e,"fxshow",{}),r&&(g.hidden=!h),h?pe(e).show():d.done(function(){pe(e).hide()}),d.done(function(){var t;pe._removeData(e,"fxshow");for(t in f)pe.style(e,t,f[t])});for(i in f)s=F(h?g[i]:0,i,d),i in g||(g[i]=s.start,h&&(s.end=s.start,s.start="width"===i||"height"===i?1:0))}}function $(e,t){var n,i,o,r,s;for(n in e)if(i=pe.camelCase(n),o=t[i],r=e[n],pe.isArray(r)&&(o=r[1],r=e[n]=r[0]),n!==i&&(e[i]=r,delete e[n]),s=pe.cssHooks[i],s&&"expand"in s){r=s.expand(r),delete e[i];for(n in r)n in e||(e[n]=r[n],t[n]=o)}else t[i]=o}function W(e,t,n){var i,o,r=0,s=W.prefilters.length,a=pe.Deferred().always(function(){delete u.elem}),u=function(){if(o)return!1;for(var t=Et||O(),n=Math.max(0,l.startTime+l.duration-t),i=n/l.duration||0,r=1-i,s=0,u=l.tweens.length;u>s;s++)l.tweens[s].run(r);return a.notifyWith(e,[l,r,n]),1>r&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:pe.extend({},t),opts:pe.extend(!0,{specialEasing:{},easing:pe.easing._default},n),originalProperties:t,originalOptions:n,startTime:Et||O(),duration:n.duration,tweens:[],createTween:function(t,n){var i=pe.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(i),i},stop:function(t){var n=0,i=t?l.tweens.length:0;if(o)return this;for(o=!0;i>n;n++)l.tweens[n].run(1);return t?(a.notifyWith(e,[l,1,0]),a.resolveWith(e,[l,t])):a.rejectWith(e,[l,t]),this}}),c=l.props;for($(c,l.opts.specialEasing);s>r;r++)if(i=W.prefilters[r].call(l,e,c,l.opts))return pe.isFunction(i.stop)&&(pe._queueHooks(l.elem,l.opts.queue).stop=pe.proxy(i.stop,i)),i;return pe.map(c,F,l),pe.isFunction(l.opts.start)&&l.opts.start.call(e,l),pe.fx.timer(pe.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function V(e){return pe.attr(e,"class")||""}function z(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var i,o=0,r=t.toLowerCase().match(Le)||[];if(pe.isFunction(n))for(;i=r[o++];)"+"===i.charAt(0)?(i=i.slice(1)||"*",(e[i]=e[i]||[]).unshift(n)):(e[i]=e[i]||[]).push(n)}}function U(e,t,n,i){function o(a){var u;return r[a]=!0,pe.each(e[a]||[],function(e,a){var l=a(t,n,i);return"string"!=typeof l||s||r[l]?s?!(u=l):void 0:(t.dataTypes.unshift(l),o(l),!1)}),u}var r={},s=e===Kt;return o(t.dataTypes[0])||!r["*"]&&o("*")}function X(e,t){var n,i,o=pe.ajaxSettings.flatOptions||{};for(i in t)void 0!==t[i]&&((o[i]?e:n||(n={}))[i]=t[i]);return n&&pe.extend(!0,e,n),e}function Q(e,t,n){for(var i,o,r,s,a=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===o&&(o=e.mimeType||t.getResponseHeader("Content-Type"));if(o)for(s in a)if(a[s]&&a[s].test(o)){u.unshift(s);break}if(u[0]in n)r=u[0];else{for(s in n){if(!u[0]||e.converters[s+" "+u[0]]){r=s;break}i||(i=s)}r=r||i}return r?(r!==u[0]&&u.unshift(r),n[r]):void 0}function Y(e,t,n,i){var o,r,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];for(r=c.shift();r;)if(e.responseFields[r]&&(n[e.responseFields[r]]=t),!u&&i&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=r,r=c.shift())if("*"===r)r=u;else if("*"!==u&&u!==r){if(s=l[u+" "+r]||l["* "+r],!s)for(o in l)if(a=o.split(" "),a[1]===r&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[o]:l[o]!==!0&&(r=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(d){return{state:"parsererror",error:s?d:"No conversion from "+u+" to "+r}}}return{state:"success",data:t}}function G(e){return e.style&&e.style.display||pe.css(e,"display")}function K(e){for(;e&&1===e.nodeType;){if("none"===G(e)||"hidden"===e.type)return!0;e=e.parentNode}return!1}function J(e,t,n,i){var o;if(pe.isArray(t))pe.each(t,function(t,o){n||nn.test(e)?i(e,o):J(e+"["+("object"==typeof o&&null!=o?t:"")+"]",o,n,i)});else if(n||"object"!==pe.type(t))i(e,t);else for(o in t)J(e+"["+o+"]",t[o],n,i)}function Z(){try{return new e.XMLHttpRequest}catch(t){}}function ee(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function te(e){return pe.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}var ne=[],ie=e.document,oe=ne.slice,re=ne.concat,se=ne.push,ae=ne.indexOf,ue={},le=ue.toString,ce=ue.hasOwnProperty,de={},fe="1.12.0",pe=function(e,t){return new pe.fn.init(e,t)},he=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ge=/^-ms-/,me=/-([\da-z])/gi,ve=function(e,t){return t.toUpperCase()};pe.fn=pe.prototype={jquery:fe,constructor:pe,selector:"",length:0,toArray:function(){return oe.call(this)},get:function(e){return null!=e?0>e?this[e+this.length]:this[e]:oe.call(this)},pushStack:function(e){var t=pe.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e){return pe.each(this,e)},map:function(e){return this.pushStack(pe.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(oe.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:se,sort:ne.sort,splice:ne.splice},pe.extend=pe.fn.extend=function(){var e,t,n,i,o,r,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[a]||{},a++),"object"==typeof s||pe.isFunction(s)||(s={}),a===u&&(s=this,a--);u>a;a++)if(null!=(o=arguments[a]))for(i in o)e=s[i],n=o[i],s!==n&&(l&&n&&(pe.isPlainObject(n)||(t=pe.isArray(n)))?(t?(t=!1,r=e&&pe.isArray(e)?e:[]):r=e&&pe.isPlainObject(e)?e:{},s[i]=pe.extend(l,r,n)):void 0!==n&&(s[i]=n));return s},pe.extend({expando:"jQuery"+(fe+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===pe.type(e)},isArray:Array.isArray||function(e){return"array"===pe.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){var t=e&&e.toString();return!pe.isArray(e)&&t-parseFloat(t)+1>=0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},isPlainObject:function(e){var t;if(!e||"object"!==pe.type(e)||e.nodeType||pe.isWindow(e))return!1;try{if(e.constructor&&!ce.call(e,"constructor")&&!ce.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}if(!de.ownFirst)for(t in e)return ce.call(e,t);for(t in e);return void 0===t||ce.call(e,t)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?ue[le.call(e)]||"object":typeof e},globalEval:function(t){t&&pe.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(ge,"ms-").replace(me,ve)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t){var i,o=0;if(n(e))for(i=e.length;i>o&&t.call(e[o],o,e[o])!==!1;o++);else for(o in e)if(t.call(e[o],o,e[o])===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(he,"")},makeArray:function(e,t){var i=t||[];return null!=e&&(n(Object(e))?pe.merge(i,"string"==typeof e?[e]:e):se.call(i,e)),i},inArray:function(e,t,n){var i;if(t){if(ae)return ae.call(t,e,n);for(i=t.length,n=n?0>n?Math.max(0,i+n):n:0;i>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,t){for(var n=+t.length,i=0,o=e.length;n>i;)e[o++]=t[i++];if(n!==n)for(;void 0!==t[i];)e[o++]=t[i++];return e.length=o,e},grep:function(e,t,n){for(var i,o=[],r=0,s=e.length,a=!n;s>r;r++)i=!t(e[r],r),i!==a&&o.push(e[r]);return o},map:function(e,t,i){var o,r,s=0,a=[];if(n(e))for(o=e.length;o>s;s++)r=t(e[s],s,i),null!=r&&a.push(r);else for(s in e)r=t(e[s],s,i),null!=r&&a.push(r);return re.apply([],a)},guid:1,proxy:function(e,t){var n,i,o;return"string"==typeof t&&(o=e[t],t=e,e=o),pe.isFunction(e)?(n=oe.call(arguments,2),i=function(){return e.apply(t||this,n.concat(oe.call(arguments)))},i.guid=e.guid=e.guid||pe.guid++,i):void 0},now:function(){return+new Date},support:de}),"function"==typeof Symbol&&(pe.fn[Symbol.iterator]=ne[Symbol.iterator]),pe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){ue["[object "+t+"]"]=t.toLowerCase()});var ye=function(e){function t(e,t,n,i){var o,r,s,a,u,l,d,p,h=t&&t.ownerDocument,g=t?t.nodeType:9;if(n=n||[],"string"!=typeof e||!e||1!==g&&9!==g&&11!==g)return n;if(!i&&((t?t.ownerDocument||t:F)!==P&&A(t),t=t||P,q)){if(11!==g&&(l=ve.exec(e)))if(o=l[1]){if(9===g){if(!(s=t.getElementById(o)))return n;if(s.id===o)return n.push(s),n}else if(h&&(s=h.getElementById(o))&&O(t,s)&&s.id===o)return n.push(s),n}else{if(l[2])return J.apply(n,t.getElementsByTagName(e)),n;if((o=l[3])&&w.getElementsByClassName&&t.getElementsByClassName)return J.apply(n,t.getElementsByClassName(o)),n}if(w.qsa&&!z[e+" "]&&(!R||!R.test(e))){if(1!==g)h=t,p=e;else if("object"!==t.nodeName.toLowerCase()){for((a=t.getAttribute("id"))?a=a.replace(be,"\\$&"):t.setAttribute("id",a=H),d=E(e),r=d.length,u=fe.test(a)?"#"+a:"[id='"+a+"']";r--;)d[r]=u+" "+f(d[r]);p=d.join(","),h=ye.test(e)&&c(t.parentNode)||t}if(p)try{return J.apply(n,h.querySelectorAll(p)),n}catch(m){}finally{a===H&&t.removeAttribute("id")}}}return N(e.replace(ae,"$1"),t,n,i)}function n(){function e(n,i){return t.push(n+" ")>C.cacheLength&&delete e[t.shift()],e[n+" "]=i}var t=[];return e}function i(e){return e[H]=!0,e}function o(e){var t=P.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function r(e,t){for(var n=e.split("|"),i=n.length;i--;)C.attrHandle[n[i]]=t}function s(e,t){var n=t&&e,i=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||X)-(~e.sourceIndex||X);if(i)return i;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function a(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function u(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function l(e){return i(function(t){return t=+t,i(function(n,i){for(var o,r=e([],n.length,t),s=r.length;s--;)n[o=r[s]]&&(n[o]=!(i[o]=n[o]))})})}function c(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function d(){}function f(e){for(var t=0,n=e.length,i="";n>t;t++)i+=e[t].value;return i}function p(e,t,n){var i=t.dir,o=n&&"parentNode"===i,r=$++;return t.first?function(t,n,r){for(;t=t[i];)if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var a,u,l,c=[B,r];if(s){for(;t=t[i];)if((1===t.nodeType||o)&&e(t,n,s))return!0}else for(;t=t[i];)if(1===t.nodeType||o){if(l=t[H]||(t[H]={}),u=l[t.uniqueID]||(l[t.uniqueID]={}),(a=u[i])&&a[0]===B&&a[1]===r)return c[2]=a[2];if(u[i]=c,c[2]=e(t,n,s))return!0}}}function h(e){return e.length>1?function(t,n,i){for(var o=e.length;o--;)if(!e[o](t,n,i))return!1;return!0}:e[0]}function g(e,n,i){for(var o=0,r=n.length;r>o;o++)t(e,n[o],i);return i}function m(e,t,n,i,o){for(var r,s=[],a=0,u=e.length,l=null!=t;u>a;a++)(r=e[a])&&(!n||n(r,i,o))&&(s.push(r),l&&t.push(a));return s}function v(e,t,n,o,r,s){return o&&!o[H]&&(o=v(o)),r&&!r[H]&&(r=v(r,s)),i(function(i,s,a,u){var l,c,d,f=[],p=[],h=s.length,v=i||g(t||"*",a.nodeType?[a]:a,[]),y=!e||!i&&t?v:m(v,f,e,a,u),b=n?r||(i?e:h||o)?[]:s:y;if(n&&n(y,b,a,u),o)for(l=m(b,p),o(l,[],a,u),c=l.length;c--;)(d=l[c])&&(b[p[c]]=!(y[p[c]]=d));if(i){if(r||e){if(r){for(l=[],c=b.length;c--;)(d=b[c])&&l.push(y[c]=d);r(null,b=[],l,u)}for(c=b.length;c--;)(d=b[c])&&(l=r?ee(i,d):f[c])>-1&&(i[l]=!(s[l]=d))}}else b=m(b===s?b.splice(h,b.length):b),r?r(null,s,b,u):J.apply(s,b)})}function y(e){for(var t,n,i,o=e.length,r=C.relative[e[0].type],s=r||C.relative[" "],a=r?1:0,u=p(function(e){return e===t},s,!0),l=p(function(e){return ee(t,e)>-1},s,!0),c=[function(e,n,i){var o=!r&&(i||n!==D)||((t=n).nodeType?u(e,n,i):l(e,n,i));return t=null,o}];o>a;a++)if(n=C.relative[e[a].type])c=[p(h(c),n)];else{if(n=C.filter[e[a].type].apply(null,e[a].matches),n[H]){for(i=++a;o>i&&!C.relative[e[i].type];i++);return v(a>1&&h(c),a>1&&f(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(ae,"$1"),n,i>a&&y(e.slice(a,i)),o>i&&y(e=e.slice(i)),o>i&&f(e))}c.push(n)}return h(c)}function b(e,n){var o=n.length>0,r=e.length>0,s=function(i,s,a,u,l){var c,d,f,p=0,h="0",g=i&&[],v=[],y=D,b=i||r&&C.find.TAG("*",l),x=B+=null==y?1:Math.random()||.1,w=b.length;for(l&&(D=s===P||s||l);h!==w&&null!=(c=b[h]);h++){if(r&&c){for(d=0,s||c.ownerDocument===P||(A(c),a=!q);f=e[d++];)if(f(c,s||P,a)){u.push(c);break}l&&(B=x)}o&&((c=!f&&c)&&p--,i&&g.push(c))}if(p+=h,o&&h!==p){for(d=0;f=n[d++];)f(g,v,s,a);if(i){if(p>0)for(;h--;)g[h]||v[h]||(v[h]=G.call(u));v=m(v)}J.apply(u,v),l&&!i&&v.length>0&&p+n.length>1&&t.uniqueSort(u)}return l&&(B=x,D=y),g};return o?i(s):s}var x,w,C,T,k,E,S,N,D,L,j,A,P,_,q,R,M,I,O,H="sizzle"+1*new Date,F=e.document,B=0,$=0,W=n(),V=n(),z=n(),U=function(e,t){return e===t&&(j=!0),0},X=1<<31,Q={}.hasOwnProperty,Y=[],G=Y.pop,K=Y.push,J=Y.push,Z=Y.slice,ee=function(e,t){for(var n=0,i=e.length;i>n;n++)if(e[n]===t)return n;return-1},te="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",ie="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",oe="\\["+ne+"*("+ie+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+ie+"))|)"+ne+"*\\]",re=":("+ie+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+oe+")*)|.*)\\)|)",se=new RegExp(ne+"+","g"),ae=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),ue=new RegExp("^"+ne+"*,"+ne+"*"),le=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),ce=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),de=new RegExp(re),fe=new RegExp("^"+ie+"$"),pe={ID:new RegExp("^#("+ie+")"),CLASS:new RegExp("^\\.("+ie+")"),TAG:new RegExp("^("+ie+"|[*])"),ATTR:new RegExp("^"+oe),PSEUDO:new RegExp("^"+re),
CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+te+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},he=/^(?:input|select|textarea|button)$/i,ge=/^h\d$/i,me=/^[^{]+\{\s*\[native \w/,ve=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ye=/[+~]/,be=/'|\\/g,xe=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),we=function(e,t,n){var i="0x"+t-65536;return i!==i||n?t:0>i?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,1023&i|56320)},Ce=function(){A()};try{J.apply(Y=Z.call(F.childNodes),F.childNodes),Y[F.childNodes.length].nodeType}catch(Te){J={apply:Y.length?function(e,t){K.apply(e,Z.call(t))}:function(e,t){for(var n=e.length,i=0;e[n++]=t[i++];);e.length=n-1}}}w=t.support={},k=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},A=t.setDocument=function(e){var t,n,i=e?e.ownerDocument||e:F;return i!==P&&9===i.nodeType&&i.documentElement?(P=i,_=P.documentElement,q=!k(P),(n=P.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",Ce,!1):n.attachEvent&&n.attachEvent("onunload",Ce)),w.attributes=o(function(e){return e.className="i",!e.getAttribute("className")}),w.getElementsByTagName=o(function(e){return e.appendChild(P.createComment("")),!e.getElementsByTagName("*").length}),w.getElementsByClassName=me.test(P.getElementsByClassName),w.getById=o(function(e){return _.appendChild(e).id=H,!P.getElementsByName||!P.getElementsByName(H).length}),w.getById?(C.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&q){var n=t.getElementById(e);return n?[n]:[]}},C.filter.ID=function(e){var t=e.replace(xe,we);return function(e){return e.getAttribute("id")===t}}):(delete C.find.ID,C.filter.ID=function(e){var t=e.replace(xe,we);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}}),C.find.TAG=w.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):w.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,i=[],o=0,r=t.getElementsByTagName(e);if("*"===e){for(;n=r[o++];)1===n.nodeType&&i.push(n);return i}return r},C.find.CLASS=w.getElementsByClassName&&function(e,t){return"undefined"!=typeof t.getElementsByClassName&&q?t.getElementsByClassName(e):void 0},M=[],R=[],(w.qsa=me.test(P.querySelectorAll))&&(o(function(e){_.appendChild(e).innerHTML="<a id='"+H+"'></a><select id='"+H+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&R.push("[*^$]="+ne+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||R.push("\\["+ne+"*(?:value|"+te+")"),e.querySelectorAll("[id~="+H+"-]").length||R.push("~="),e.querySelectorAll(":checked").length||R.push(":checked"),e.querySelectorAll("a#"+H+"+*").length||R.push(".#.+[+~]")}),o(function(e){var t=P.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&R.push("name"+ne+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||R.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),R.push(",.*:")})),(w.matchesSelector=me.test(I=_.matches||_.webkitMatchesSelector||_.mozMatchesSelector||_.oMatchesSelector||_.msMatchesSelector))&&o(function(e){w.disconnectedMatch=I.call(e,"div"),I.call(e,"[s!='']:x"),M.push("!=",re)}),R=R.length&&new RegExp(R.join("|")),M=M.length&&new RegExp(M.join("|")),t=me.test(_.compareDocumentPosition),O=t||me.test(_.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,i=t&&t.parentNode;return e===i||!(!i||1!==i.nodeType||!(n.contains?n.contains(i):e.compareDocumentPosition&&16&e.compareDocumentPosition(i)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},U=t?function(e,t){if(e===t)return j=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!w.sortDetached&&t.compareDocumentPosition(e)===n?e===P||e.ownerDocument===F&&O(F,e)?-1:t===P||t.ownerDocument===F&&O(F,t)?1:L?ee(L,e)-ee(L,t):0:4&n?-1:1)}:function(e,t){if(e===t)return j=!0,0;var n,i=0,o=e.parentNode,r=t.parentNode,a=[e],u=[t];if(!o||!r)return e===P?-1:t===P?1:o?-1:r?1:L?ee(L,e)-ee(L,t):0;if(o===r)return s(e,t);for(n=e;n=n.parentNode;)a.unshift(n);for(n=t;n=n.parentNode;)u.unshift(n);for(;a[i]===u[i];)i++;return i?s(a[i],u[i]):a[i]===F?-1:u[i]===F?1:0},P):P},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==P&&A(e),n=n.replace(ce,"='$1']"),w.matchesSelector&&q&&!z[n+" "]&&(!M||!M.test(n))&&(!R||!R.test(n)))try{var i=I.call(e,n);if(i||w.disconnectedMatch||e.document&&11!==e.document.nodeType)return i}catch(o){}return t(n,P,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==P&&A(e),O(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==P&&A(e);var n=C.attrHandle[t.toLowerCase()],i=n&&Q.call(C.attrHandle,t.toLowerCase())?n(e,t,!q):void 0;return void 0!==i?i:w.attributes||!q?e.getAttribute(t):(i=e.getAttributeNode(t))&&i.specified?i.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],i=0,o=0;if(j=!w.detectDuplicates,L=!w.sortStable&&e.slice(0),e.sort(U),j){for(;t=e[o++];)t===e[o]&&(i=n.push(o));for(;i--;)e.splice(n[i],1)}return L=null,e},T=t.getText=function(e){var t,n="",i=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=T(e)}else if(3===o||4===o)return e.nodeValue}else for(;t=e[i++];)n+=T(t);return n},C=t.selectors={cacheLength:50,createPseudo:i,match:pe,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(xe,we),e[3]=(e[3]||e[4]||e[5]||"").replace(xe,we),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return pe.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&de.test(n)&&(t=E(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(xe,we).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=W[e+" "];return t||(t=new RegExp("(^|"+ne+")"+e+"("+ne+"|$)"))&&W(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,i){return function(o){var r=t.attr(o,e);return null==r?"!="===n:n?(r+="","="===n?r===i:"!="===n?r!==i:"^="===n?i&&0===r.indexOf(i):"*="===n?i&&r.indexOf(i)>-1:"$="===n?i&&r.slice(-i.length)===i:"~="===n?(" "+r.replace(se," ")+" ").indexOf(i)>-1:"|="===n?r===i||r.slice(0,i.length+1)===i+"-":!1):!0}},CHILD:function(e,t,n,i,o){var r="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===i&&0===o?function(e){return!!e.parentNode}:function(t,n,u){var l,c,d,f,p,h,g=r!==s?"nextSibling":"previousSibling",m=t.parentNode,v=a&&t.nodeName.toLowerCase(),y=!u&&!a,b=!1;if(m){if(r){for(;g;){for(f=t;f=f[g];)if(a?f.nodeName.toLowerCase()===v:1===f.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[s?m.firstChild:m.lastChild],s&&y){for(f=m,d=f[H]||(f[H]={}),c=d[f.uniqueID]||(d[f.uniqueID]={}),l=c[e]||[],p=l[0]===B&&l[1],b=p&&l[2],f=p&&m.childNodes[p];f=++p&&f&&f[g]||(b=p=0)||h.pop();)if(1===f.nodeType&&++b&&f===t){c[e]=[B,p,b];break}}else if(y&&(f=t,d=f[H]||(f[H]={}),c=d[f.uniqueID]||(d[f.uniqueID]={}),l=c[e]||[],p=l[0]===B&&l[1],b=p),b===!1)for(;(f=++p&&f&&f[g]||(b=p=0)||h.pop())&&((a?f.nodeName.toLowerCase()!==v:1!==f.nodeType)||!++b||(y&&(d=f[H]||(f[H]={}),c=d[f.uniqueID]||(d[f.uniqueID]={}),c[e]=[B,b]),f!==t)););return b-=o,b===i||b%i===0&&b/i>=0}}},PSEUDO:function(e,n){var o,r=C.pseudos[e]||C.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return r[H]?r(n):r.length>1?(o=[e,e,"",n],C.setFilters.hasOwnProperty(e.toLowerCase())?i(function(e,t){for(var i,o=r(e,n),s=o.length;s--;)i=ee(e,o[s]),e[i]=!(t[i]=o[s])}):function(e){return r(e,0,o)}):r}},pseudos:{not:i(function(e){var t=[],n=[],o=S(e.replace(ae,"$1"));return o[H]?i(function(e,t,n,i){for(var r,s=o(e,null,i,[]),a=e.length;a--;)(r=s[a])&&(e[a]=!(t[a]=r))}):function(e,i,r){return t[0]=e,o(t,null,r,n),t[0]=null,!n.pop()}}),has:i(function(e){return function(n){return t(e,n).length>0}}),contains:i(function(e){return e=e.replace(xe,we),function(t){return(t.textContent||t.innerText||T(t)).indexOf(e)>-1}}),lang:i(function(e){return fe.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(xe,we).toLowerCase(),function(t){var n;do if(n=q?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===_},focus:function(e){return e===P.activeElement&&(!P.hasFocus||P.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!C.pseudos.empty(e)},header:function(e){return ge.test(e.nodeName)},input:function(e){return he.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:l(function(){return[0]}),last:l(function(e,t){return[t-1]}),eq:l(function(e,t,n){return[0>n?n+t:n]}),even:l(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:l(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:l(function(e,t,n){for(var i=0>n?n+t:n;--i>=0;)e.push(i);return e}),gt:l(function(e,t,n){for(var i=0>n?n+t:n;++i<t;)e.push(i);return e})}},C.pseudos.nth=C.pseudos.eq;for(x in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[x]=a(x);for(x in{submit:!0,reset:!0})C.pseudos[x]=u(x);return d.prototype=C.filters=C.pseudos,C.setFilters=new d,E=t.tokenize=function(e,n){var i,o,r,s,a,u,l,c=V[e+" "];if(c)return n?0:c.slice(0);for(a=e,u=[],l=C.preFilter;a;){(!i||(o=ue.exec(a)))&&(o&&(a=a.slice(o[0].length)||a),u.push(r=[])),i=!1,(o=le.exec(a))&&(i=o.shift(),r.push({value:i,type:o[0].replace(ae," ")}),a=a.slice(i.length));for(s in C.filter)!(o=pe[s].exec(a))||l[s]&&!(o=l[s](o))||(i=o.shift(),r.push({value:i,type:s,matches:o}),a=a.slice(i.length));if(!i)break}return n?a.length:a?t.error(e):V(e,u).slice(0)},S=t.compile=function(e,t){var n,i=[],o=[],r=z[e+" "];if(!r){for(t||(t=E(e)),n=t.length;n--;)r=y(t[n]),r[H]?i.push(r):o.push(r);r=z(e,b(o,i)),r.selector=e}return r},N=t.select=function(e,t,n,i){var o,r,s,a,u,l="function"==typeof e&&e,d=!i&&E(e=l.selector||e);if(n=n||[],1===d.length){if(r=d[0]=d[0].slice(0),r.length>2&&"ID"===(s=r[0]).type&&w.getById&&9===t.nodeType&&q&&C.relative[r[1].type]){if(t=(C.find.ID(s.matches[0].replace(xe,we),t)||[])[0],!t)return n;l&&(t=t.parentNode),e=e.slice(r.shift().value.length)}for(o=pe.needsContext.test(e)?0:r.length;o--&&(s=r[o],!C.relative[a=s.type]);)if((u=C.find[a])&&(i=u(s.matches[0].replace(xe,we),ye.test(r[0].type)&&c(t.parentNode)||t))){if(r.splice(o,1),e=i.length&&f(r),!e)return J.apply(n,i),n;break}}return(l||S(e,d))(i,t,!q,n,!t||ye.test(e)&&c(t.parentNode)||t),n},w.sortStable=H.split("").sort(U).join("")===H,w.detectDuplicates=!!j,A(),w.sortDetached=o(function(e){return 1&e.compareDocumentPosition(P.createElement("div"))}),o(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||r("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),w.attributes&&o(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||r("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),o(function(e){return null==e.getAttribute("disabled")})||r(te,function(e,t,n){var i;return n?void 0:e[t]===!0?t.toLowerCase():(i=e.getAttributeNode(t))&&i.specified?i.value:null}),t}(e);pe.find=ye,pe.expr=ye.selectors,pe.expr[":"]=pe.expr.pseudos,pe.uniqueSort=pe.unique=ye.uniqueSort,pe.text=ye.getText,pe.isXMLDoc=ye.isXML,pe.contains=ye.contains;var be=function(e,t,n){for(var i=[],o=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(o&&pe(e).is(n))break;i.push(e)}return i},xe=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},we=pe.expr.match.needsContext,Ce=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,Te=/^.[^:#\[\.,]*$/;pe.filter=function(e,t,n){var i=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===i.nodeType?pe.find.matchesSelector(i,e)?[i]:[]:pe.find.matches(e,pe.grep(t,function(e){return 1===e.nodeType}))},pe.fn.extend({find:function(e){var t,n=[],i=this,o=i.length;if("string"!=typeof e)return this.pushStack(pe(e).filter(function(){for(t=0;o>t;t++)if(pe.contains(i[t],this))return!0}));for(t=0;o>t;t++)pe.find(e,i[t],n);return n=this.pushStack(o>1?pe.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},filter:function(e){return this.pushStack(i(this,e||[],!1))},not:function(e){return this.pushStack(i(this,e||[],!0))},is:function(e){return!!i(this,"string"==typeof e&&we.test(e)?pe(e):e||[],!1).length}});var ke,Ee=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,Se=pe.fn.init=function(e,t,n){var i,o;if(!e)return this;if(n=n||ke,"string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:Ee.exec(e),!i||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(i[1]){if(t=t instanceof pe?t[0]:t,pe.merge(this,pe.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:ie,!0)),Ce.test(i[1])&&pe.isPlainObject(t))for(i in t)pe.isFunction(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}if(o=ie.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return ke.find(e);this.length=1,this[0]=o}return this.context=ie,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):pe.isFunction(e)?"undefined"!=typeof n.ready?n.ready(e):e(pe):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),pe.makeArray(e,this))};Se.prototype=pe.fn,ke=pe(ie);var Ne=/^(?:parents|prev(?:Until|All))/,De={children:!0,contents:!0,next:!0,prev:!0};pe.fn.extend({has:function(e){var t,n=pe(e,this),i=n.length;return this.filter(function(){for(t=0;i>t;t++)if(pe.contains(this,n[t]))return!0})},closest:function(e,t){for(var n,i=0,o=this.length,r=[],s=we.test(e)||"string"!=typeof e?pe(e,t||this.context):0;o>i;i++)for(n=this[i];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&pe.find.matchesSelector(n,e))){r.push(n);break}return this.pushStack(r.length>1?pe.uniqueSort(r):r)},index:function(e){return e?"string"==typeof e?pe.inArray(this[0],pe(e)):pe.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(pe.uniqueSort(pe.merge(this.get(),pe(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),pe.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return be(e,"parentNode")},parentsUntil:function(e,t,n){return be(e,"parentNode",n)},next:function(e){return o(e,"nextSibling")},prev:function(e){return o(e,"previousSibling")},nextAll:function(e){return be(e,"nextSibling")},prevAll:function(e){return be(e,"previousSibling")},nextUntil:function(e,t,n){return be(e,"nextSibling",n)},prevUntil:function(e,t,n){return be(e,"previousSibling",n)},siblings:function(e){return xe((e.parentNode||{}).firstChild,e)},children:function(e){return xe(e.firstChild)},contents:function(e){return pe.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:pe.merge([],e.childNodes)}},function(e,t){pe.fn[e]=function(n,i){var o=pe.map(this,t,n);return"Until"!==e.slice(-5)&&(i=n),i&&"string"==typeof i&&(o=pe.filter(i,o)),this.length>1&&(De[e]||(o=pe.uniqueSort(o)),Ne.test(e)&&(o=o.reverse())),this.pushStack(o)}});var Le=/\S+/g;pe.Callbacks=function(e){e="string"==typeof e?r(e):pe.extend({},e);var t,n,i,o,s=[],a=[],u=-1,l=function(){for(o=e.once,i=t=!0;a.length;u=-1)for(n=a.shift();++u<s.length;)s[u].apply(n[0],n[1])===!1&&e.stopOnFalse&&(u=s.length,n=!1);e.memory||(n=!1),t=!1,o&&(s=n?[]:"")},c={add:function(){return s&&(n&&!t&&(u=s.length-1,a.push(n)),function i(t){pe.each(t,function(t,n){pe.isFunction(n)?e.unique&&c.has(n)||s.push(n):n&&n.length&&"string"!==pe.type(n)&&i(n)})}(arguments),n&&!t&&l()),this},remove:function(){return pe.each(arguments,function(e,t){for(var n;(n=pe.inArray(t,s,n))>-1;)s.splice(n,1),u>=n&&u--}),this},has:function(e){return e?pe.inArray(e,s)>-1:s.length>0},empty:function(){return s&&(s=[]),this},disable:function(){return o=a=[],s=n="",this},disabled:function(){return!s},lock:function(){return o=!0,n||c.disable(),this},locked:function(){return!!o},fireWith:function(e,n){return o||(n=n||[],n=[e,n.slice?n.slice():n],a.push(n),t||l()),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!i}};return c},pe.extend({Deferred:function(e){var t=[["resolve","done",pe.Callbacks("once memory"),"resolved"],["reject","fail",pe.Callbacks("once memory"),"rejected"],["notify","progress",pe.Callbacks("memory")]],n="pending",i={state:function(){return n},always:function(){return o.done(arguments).fail(arguments),this},then:function(){var e=arguments;return pe.Deferred(function(n){pe.each(t,function(t,r){var s=pe.isFunction(e[t])&&e[t];o[r[1]](function(){var e=s&&s.apply(this,arguments);e&&pe.isFunction(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[r[0]+"With"](this===i?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?pe.extend(e,i):i}},o={};return i.pipe=i.then,pe.each(t,function(e,r){var s=r[2],a=r[3];i[r[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),o[r[0]]=function(){return o[r[0]+"With"](this===o?i:this,arguments),this},o[r[0]+"With"]=s.fireWith}),i.promise(o),e&&e.call(o,o),o},when:function(e){var t,n,i,o=0,r=oe.call(arguments),s=r.length,a=1!==s||e&&pe.isFunction(e.promise)?s:0,u=1===a?e:pe.Deferred(),l=function(e,n,i){return function(o){n[e]=this,i[e]=arguments.length>1?oe.call(arguments):o,i===t?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(s>1)for(t=new Array(s),n=new Array(s),i=new Array(s);s>o;o++)r[o]&&pe.isFunction(r[o].promise)?r[o].promise().progress(l(o,n,t)).done(l(o,i,r)).fail(u.reject):--a;return a||u.resolveWith(i,r),u.promise()}});var je;pe.fn.ready=function(e){return pe.ready.promise().done(e),this},pe.extend({isReady:!1,readyWait:1,holdReady:function(e){e?pe.readyWait++:pe.ready(!0)},ready:function(e){(e===!0?--pe.readyWait:pe.isReady)||(pe.isReady=!0,e!==!0&&--pe.readyWait>0||(je.resolveWith(ie,[pe]),pe.fn.triggerHandler&&(pe(ie).triggerHandler("ready"),pe(ie).off("ready"))))}}),pe.ready.promise=function(t){if(!je)if(je=pe.Deferred(),"complete"===ie.readyState)e.setTimeout(pe.ready);else if(ie.addEventListener)ie.addEventListener("DOMContentLoaded",a),e.addEventListener("load",a);else{ie.attachEvent("onreadystatechange",a),e.attachEvent("onload",a);var n=!1;try{n=null==e.frameElement&&ie.documentElement}catch(i){}n&&n.doScroll&&!function o(){if(!pe.isReady){try{n.doScroll("left")}catch(t){return e.setTimeout(o,50)}s(),pe.ready()}}()}return je.promise(t)},pe.ready.promise();var Ae;for(Ae in pe(de))break;de.ownFirst="0"===Ae,de.inlineBlockNeedsLayout=!1,pe(function(){var e,t,n,i;n=ie.getElementsByTagName("body")[0],n&&n.style&&(t=ie.createElement("div"),i=ie.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(i).appendChild(t),"undefined"!=typeof t.style.zoom&&(t.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",de.inlineBlockNeedsLayout=e=3===t.offsetWidth,e&&(n.style.zoom=1)),n.removeChild(i))}),function(){var e=ie.createElement("div");de.deleteExpando=!0;try{delete e.test}catch(t){de.deleteExpando=!1}e=null}();var Pe=function(e){var t=pe.noData[(e.nodeName+" ").toLowerCase()],n=+e.nodeType||1;return 1!==n&&9!==n?!1:!t||t!==!0&&e.getAttribute("classid")===t},_e=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,qe=/([A-Z])/g;pe.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?pe.cache[e[pe.expando]]:e[pe.expando],!!e&&!l(e)},data:function(e,t,n){return c(e,t,n)},removeData:function(e,t){return d(e,t)},_data:function(e,t,n){return c(e,t,n,!0)},_removeData:function(e,t){return d(e,t,!0)}}),pe.fn.extend({data:function(e,t){var n,i,o,r=this[0],s=r&&r.attributes;if(void 0===e){if(this.length&&(o=pe.data(r),1===r.nodeType&&!pe._data(r,"parsedAttrs"))){for(n=s.length;n--;)s[n]&&(i=s[n].name,0===i.indexOf("data-")&&(i=pe.camelCase(i.slice(5)),u(r,i,o[i])));pe._data(r,"parsedAttrs",!0)}return o}return"object"==typeof e?this.each(function(){pe.data(this,e)}):arguments.length>1?this.each(function(){pe.data(this,e,t)}):r?u(r,e,pe.data(r,e)):void 0},removeData:function(e){return this.each(function(){pe.removeData(this,e)})}}),pe.extend({queue:function(e,t,n){var i;return e?(t=(t||"fx")+"queue",i=pe._data(e,t),n&&(!i||pe.isArray(n)?i=pe._data(e,t,pe.makeArray(n)):i.push(n)),i||[]):void 0},dequeue:function(e,t){t=t||"fx";var n=pe.queue(e,t),i=n.length,o=n.shift(),r=pe._queueHooks(e,t),s=function(){pe.dequeue(e,t)};"inprogress"===o&&(o=n.shift(),i--),o&&("fx"===t&&n.unshift("inprogress"),delete r.stop,o.call(e,s,r)),!i&&r&&r.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return pe._data(e,n)||pe._data(e,n,{empty:pe.Callbacks("once memory").add(function(){pe._removeData(e,t+"queue"),pe._removeData(e,n)})})}}),pe.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?pe.queue(this[0],e):void 0===t?this:this.each(function(){var n=pe.queue(this,e,t);pe._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&pe.dequeue(this,e)})},dequeue:function(e){return this.each(function(){pe.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,i=1,o=pe.Deferred(),r=this,s=this.length,a=function(){--i||o.resolveWith(r,[r])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)n=pe._data(r[s],e+"queueHooks"),n&&n.empty&&(i++,n.empty.add(a));return a(),o.promise(t)}}),function(){var e;de.shrinkWrapBlocks=function(){if(null!=e)return e;e=!1;var t,n,i;return n=ie.getElementsByTagName("body")[0],n&&n.style?(t=ie.createElement("div"),i=ie.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(i).appendChild(t),"undefined"!=typeof t.style.zoom&&(t.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",t.appendChild(ie.createElement("div")).style.width="5px",e=3!==t.offsetWidth),n.removeChild(i),e):void 0}}();var Re=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Me=new RegExp("^(?:([+-])=|)("+Re+")([a-z%]*)$","i"),Ie=["Top","Right","Bottom","Left"],Oe=function(e,t){return e=t||e,"none"===pe.css(e,"display")||!pe.contains(e.ownerDocument,e)},He=function(e,t,n,i,o,r,s){var a=0,u=e.length,l=null==n;if("object"===pe.type(n)){o=!0;for(a in n)He(e,t,a,n[a],!0,r,s)}else if(void 0!==i&&(o=!0,pe.isFunction(i)||(s=!0),l&&(s?(t.call(e,i),t=null):(l=t,t=function(e,t,n){return l.call(pe(e),n)})),t))for(;u>a;a++)t(e[a],n,s?i:i.call(e[a],a,t(e[a],n)));return o?e:l?t.call(e):u?t(e[0],n):r},Fe=/^(?:checkbox|radio)$/i,Be=/<([\w:-]+)/,$e=/^$|\/(?:java|ecma)script/i,We=/^\s+/,Ve="abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";!function(){var e=ie.createElement("div"),t=ie.createDocumentFragment(),n=ie.createElement("input");e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",de.leadingWhitespace=3===e.firstChild.nodeType,de.tbody=!e.getElementsByTagName("tbody").length,de.htmlSerialize=!!e.getElementsByTagName("link").length,de.html5Clone="<:nav></:nav>"!==ie.createElement("nav").cloneNode(!0).outerHTML,n.type="checkbox",n.checked=!0,t.appendChild(n),de.appendChecked=n.checked,e.innerHTML="<textarea>x</textarea>",de.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue,t.appendChild(e),n=ie.createElement("input"),n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),e.appendChild(n),de.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,de.noCloneEvent=!!e.addEventListener,e[pe.expando]=1,de.attributes=!e.getAttribute(pe.expando)}();var ze={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:de.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]};ze.optgroup=ze.option,ze.tbody=ze.tfoot=ze.colgroup=ze.caption=ze.thead,ze.th=ze.td;var Ue=/<|&#?\w+;/,Xe=/<tbody/i;!function(){var t,n,i=ie.createElement("div");for(t in{submit:!0,change:!0,focusin:!0})n="on"+t,(de[t]=n in e)||(i.setAttribute(n,"t"),de[t]=i.attributes[n].expando===!1);i=null}();var Qe=/^(?:input|select|textarea)$/i,Ye=/^key/,Ge=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ke=/^(?:focusinfocus|focusoutblur)$/,Je=/^([^.]*)(?:\.(.+)|)/;pe.event={global:{},add:function(e,t,n,i,o){var r,s,a,u,l,c,d,f,p,h,g,m=pe._data(e);if(m){for(n.handler&&(u=n,n=u.handler,o=u.selector),n.guid||(n.guid=pe.guid++),(s=m.events)||(s=m.events={}),(c=m.handle)||(c=m.handle=function(e){return"undefined"==typeof pe||e&&pe.event.triggered===e.type?void 0:pe.event.dispatch.apply(c.elem,arguments)},c.elem=e),t=(t||"").match(Le)||[""],a=t.length;a--;)r=Je.exec(t[a])||[],p=g=r[1],h=(r[2]||"").split(".").sort(),p&&(l=pe.event.special[p]||{},p=(o?l.delegateType:l.bindType)||p,l=pe.event.special[p]||{},d=pe.extend({type:p,origType:g,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&pe.expr.match.needsContext.test(o),namespace:h.join(".")},u),(f=s[p])||(f=s[p]=[],f.delegateCount=0,l.setup&&l.setup.call(e,i,h,c)!==!1||(e.addEventListener?e.addEventListener(p,c,!1):e.attachEvent&&e.attachEvent("on"+p,c))),l.add&&(l.add.call(e,d),d.handler.guid||(d.handler.guid=n.guid)),o?f.splice(f.delegateCount++,0,d):f.push(d),pe.event.global[p]=!0);e=null}},remove:function(e,t,n,i,o){var r,s,a,u,l,c,d,f,p,h,g,m=pe.hasData(e)&&pe._data(e);if(m&&(c=m.events)){for(t=(t||"").match(Le)||[""],l=t.length;l--;)if(a=Je.exec(t[l])||[],p=g=a[1],h=(a[2]||"").split(".").sort(),p){for(d=pe.event.special[p]||{},p=(i?d.delegateType:d.bindType)||p,f=c[p]||[],a=a[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=r=f.length;r--;)s=f[r],!o&&g!==s.origType||n&&n.guid!==s.guid||a&&!a.test(s.namespace)||i&&i!==s.selector&&("**"!==i||!s.selector)||(f.splice(r,1),s.selector&&f.delegateCount--,d.remove&&d.remove.call(e,s));u&&!f.length&&(d.teardown&&d.teardown.call(e,h,m.handle)!==!1||pe.removeEvent(e,p,m.handle),delete c[p])}else for(p in c)pe.event.remove(e,p+t[l],n,i,!0);pe.isEmptyObject(c)&&(delete m.handle,pe._removeData(e,"events"))}},trigger:function(t,n,i,o){var r,s,a,u,l,c,d,f=[i||ie],p=ce.call(t,"type")?t.type:t,h=ce.call(t,"namespace")?t.namespace.split("."):[];if(a=c=i=i||ie,3!==i.nodeType&&8!==i.nodeType&&!Ke.test(p+pe.event.triggered)&&(p.indexOf(".")>-1&&(h=p.split("."),p=h.shift(),h.sort()),s=p.indexOf(":")<0&&"on"+p,t=t[pe.expando]?t:new pe.Event(p,"object"==typeof t&&t),t.isTrigger=o?2:3,t.namespace=h.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=i),n=null==n?[t]:pe.makeArray(n,[t]),l=pe.event.special[p]||{},o||!l.trigger||l.trigger.apply(i,n)!==!1)){if(!o&&!l.noBubble&&!pe.isWindow(i)){for(u=l.delegateType||p,Ke.test(u+p)||(a=a.parentNode);a;a=a.parentNode)f.push(a),c=a;c===(i.ownerDocument||ie)&&f.push(c.defaultView||c.parentWindow||e)}for(d=0;(a=f[d++])&&!t.isPropagationStopped();)t.type=d>1?u:l.bindType||p,r=(pe._data(a,"events")||{})[t.type]&&pe._data(a,"handle"),r&&r.apply(a,n),r=s&&a[s],r&&r.apply&&Pe(a)&&(t.result=r.apply(a,n),t.result===!1&&t.preventDefault());if(t.type=p,!o&&!t.isDefaultPrevented()&&(!l._default||l._default.apply(f.pop(),n)===!1)&&Pe(i)&&s&&i[p]&&!pe.isWindow(i)){c=i[s],c&&(i[s]=null),pe.event.triggered=p;try{i[p]()}catch(g){}pe.event.triggered=void 0,c&&(i[s]=c)}return t.result}},dispatch:function(e){e=pe.event.fix(e);var t,n,i,o,r,s=[],a=oe.call(arguments),u=(pe._data(this,"events")||{})[e.type]||[],l=pe.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){for(s=pe.event.handlers.call(this,e,u),t=0;(o=s[t++])&&!e.isPropagationStopped();)for(e.currentTarget=o.elem,n=0;(r=o.handlers[n++])&&!e.isImmediatePropagationStopped();)(!e.rnamespace||e.rnamespace.test(r.namespace))&&(e.handleObj=r,e.data=r.data,i=((pe.event.special[r.origType]||{}).handle||r.handler).apply(o.elem,a),void 0!==i&&(e.result=i)===!1&&(e.preventDefault(),e.stopPropagation()));return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,i,o,r,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&("click"!==e.type||isNaN(e.button)||e.button<1))for(;u!=this;u=u.parentNode||this)if(1===u.nodeType&&(u.disabled!==!0||"click"!==e.type)){for(i=[],n=0;a>n;n++)r=t[n],o=r.selector+" ",void 0===i[o]&&(i[o]=r.needsContext?pe(o,this).index(u)>-1:pe.find(o,this,null,[u]).length),i[o]&&i.push(r);i.length&&s.push({elem:u,handlers:i})}return a<t.length&&s.push({elem:this,handlers:t.slice(a)}),s},fix:function(e){if(e[pe.expando])return e;var t,n,i,o=e.type,r=e,s=this.fixHooks[o];for(s||(this.fixHooks[o]=s=Ge.test(o)?this.mouseHooks:Ye.test(o)?this.keyHooks:{}),i=s.props?this.props.concat(s.props):this.props,e=new pe.Event(r),t=i.length;t--;)n=i[t],e[n]=r[n];return e.target||(e.target=r.srcElement||ie),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,i,o,r=t.button,s=t.fromElement;return null==e.pageX&&null!=t.clientX&&(i=e.target.ownerDocument||ie,o=i.documentElement,n=i.body,e.pageX=t.clientX+(o&&o.scrollLeft||n&&n.scrollLeft||0)-(o&&o.clientLeft||n&&n.clientLeft||0),e.pageY=t.clientY+(o&&o.scrollTop||n&&n.scrollTop||0)-(o&&o.clientTop||n&&n.clientTop||0)),!e.relatedTarget&&s&&(e.relatedTarget=s===e.target?t.toElement:s),
e.which||void 0===r||(e.which=1&r?1:2&r?3:4&r?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==x()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===x()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return pe.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(e){return pe.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n){var i=pe.extend(new pe.Event,n,{type:e,isSimulated:!0});pe.event.trigger(i,null,t),i.isDefaultPrevented()&&n.preventDefault()}},pe.removeEvent=ie.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)}:function(e,t,n){var i="on"+t;e.detachEvent&&("undefined"==typeof e[i]&&(e[i]=null),e.detachEvent(i,n))},pe.Event=function(e,t){return this instanceof pe.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?y:b):this.type=e,t&&pe.extend(this,t),this.timeStamp=e&&e.timeStamp||pe.now(),void(this[pe.expando]=!0)):new pe.Event(e,t)},pe.Event.prototype={constructor:pe.Event,isDefaultPrevented:b,isPropagationStopped:b,isImmediatePropagationStopped:b,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=y,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=y,e&&!this.isSimulated&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=y,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},pe.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){pe.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,i=this,o=e.relatedTarget,r=e.handleObj;return(!o||o!==i&&!pe.contains(i,o))&&(e.type=r.origType,n=r.handler.apply(this,arguments),e.type=t),n}}}),de.submit||(pe.event.special.submit={setup:function(){return pe.nodeName(this,"form")?!1:void pe.event.add(this,"click._submit keypress._submit",function(e){var t=e.target,n=pe.nodeName(t,"input")||pe.nodeName(t,"button")?pe.prop(t,"form"):void 0;n&&!pe._data(n,"submit")&&(pe.event.add(n,"submit._submit",function(e){e._submitBubble=!0}),pe._data(n,"submit",!0))})},postDispatch:function(e){e._submitBubble&&(delete e._submitBubble,this.parentNode&&!e.isTrigger&&pe.event.simulate("submit",this.parentNode,e))},teardown:function(){return pe.nodeName(this,"form")?!1:void pe.event.remove(this,"._submit")}}),de.change||(pe.event.special.change={setup:function(){return Qe.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(pe.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._justChanged=!0)}),pe.event.add(this,"click._change",function(e){this._justChanged&&!e.isTrigger&&(this._justChanged=!1),pe.event.simulate("change",this,e)})),!1):void pe.event.add(this,"beforeactivate._change",function(e){var t=e.target;Qe.test(t.nodeName)&&!pe._data(t,"change")&&(pe.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||pe.event.simulate("change",this.parentNode,e)}),pe._data(t,"change",!0))})},handle:function(e){var t=e.target;return this!==t||e.isSimulated||e.isTrigger||"radio"!==t.type&&"checkbox"!==t.type?e.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return pe.event.remove(this,"._change"),!Qe.test(this.nodeName)}}),de.focusin||pe.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){pe.event.simulate(t,e.target,pe.event.fix(e))};pe.event.special[t]={setup:function(){var i=this.ownerDocument||this,o=pe._data(i,t);o||i.addEventListener(e,n,!0),pe._data(i,t,(o||0)+1)},teardown:function(){var i=this.ownerDocument||this,o=pe._data(i,t)-1;o?pe._data(i,t,o):(i.removeEventListener(e,n,!0),pe._removeData(i,t))}}}),pe.fn.extend({on:function(e,t,n,i){return w(this,e,t,n,i)},one:function(e,t,n,i){return w(this,e,t,n,i,1)},off:function(e,t,n){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,pe(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,t,e[o]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=void 0),n===!1&&(n=b),this.each(function(){pe.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){pe.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?pe.event.trigger(e,t,n,!0):void 0}});var Ze=/ jQuery\d+="(?:null|\d+)"/g,et=new RegExp("<(?:"+Ve+")[\\s/>]","i"),tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,nt=/<script|<style|<link/i,it=/checked\s*(?:[^=]|=\s*.checked.)/i,ot=/^true\/(.*)/,rt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,st=p(ie),at=st.appendChild(ie.createElement("div"));pe.extend({htmlPrefilter:function(e){return e.replace(tt,"<$1></$2>")},clone:function(e,t,n){var i,o,r,s,a,u=pe.contains(e.ownerDocument,e);if(de.html5Clone||pe.isXMLDoc(e)||!et.test("<"+e.nodeName+">")?r=e.cloneNode(!0):(at.innerHTML=e.outerHTML,at.removeChild(r=at.firstChild)),!(de.noCloneEvent&&de.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||pe.isXMLDoc(e)))for(i=h(r),a=h(e),s=0;null!=(o=a[s]);++s)i[s]&&S(o,i[s]);if(t)if(n)for(a=a||h(e),i=i||h(r),s=0;null!=(o=a[s]);s++)E(o,i[s]);else E(e,r);return i=h(r,"script"),i.length>0&&g(i,!u&&h(e,"script")),i=a=o=null,r},cleanData:function(e,t){for(var n,i,o,r,s=0,a=pe.expando,u=pe.cache,l=de.attributes,c=pe.event.special;null!=(n=e[s]);s++)if((t||Pe(n))&&(o=n[a],r=o&&u[o])){if(r.events)for(i in r.events)c[i]?pe.event.remove(n,i):pe.removeEvent(n,i,r.handle);u[o]&&(delete u[o],l||"undefined"==typeof n.removeAttribute?n[a]=void 0:n.removeAttribute(a),ne.push(o))}}}),pe.fn.extend({domManip:N,detach:function(e){return D(this,e,!0)},remove:function(e){return D(this,e)},text:function(e){return He(this,function(e){return void 0===e?pe.text(this):this.empty().append((this[0]&&this[0].ownerDocument||ie).createTextNode(e))},null,e,arguments.length)},append:function(){return N(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=C(this,e);t.appendChild(e)}})},prepend:function(){return N(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=C(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return N(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return N(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++){for(1===e.nodeType&&pe.cleanData(h(e,!1));e.firstChild;)e.removeChild(e.firstChild);e.options&&pe.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return pe.clone(this,e,t)})},html:function(e){return He(this,function(e){var t=this[0]||{},n=0,i=this.length;if(void 0===e)return 1===t.nodeType?t.innerHTML.replace(Ze,""):void 0;if("string"==typeof e&&!nt.test(e)&&(de.htmlSerialize||!et.test(e))&&(de.leadingWhitespace||!We.test(e))&&!ze[(Be.exec(e)||["",""])[1].toLowerCase()]){e=pe.htmlPrefilter(e);try{for(;i>n;n++)t=this[n]||{},1===t.nodeType&&(pe.cleanData(h(t,!1)),t.innerHTML=e);t=0}catch(o){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return N(this,arguments,function(t){var n=this.parentNode;pe.inArray(this,e)<0&&(pe.cleanData(h(this)),n&&n.replaceChild(t,this))},e)}}),pe.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){pe.fn[e]=function(e){for(var n,i=0,o=[],r=pe(e),s=r.length-1;s>=i;i++)n=i===s?this:this.clone(!0),pe(r[i])[t](n),se.apply(o,n.get());return this.pushStack(o)}});var ut,lt={HTML:"block",BODY:"block"},ct=/^margin/,dt=new RegExp("^("+Re+")(?!px)[a-z%]+$","i"),ft=function(e,t,n,i){var o,r,s={};for(r in t)s[r]=e.style[r],e.style[r]=t[r];o=n.apply(e,i||[]);for(r in t)e.style[r]=s[r];return o},pt=ie.documentElement;!function(){function t(){var t,c,d=ie.documentElement;d.appendChild(u),l.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",n=o=a=!1,i=s=!0,e.getComputedStyle&&(c=e.getComputedStyle(l),n="1%"!==(c||{}).top,a="2px"===(c||{}).marginLeft,o="4px"===(c||{width:"4px"}).width,l.style.marginRight="50%",i="4px"===(c||{marginRight:"4px"}).marginRight,t=l.appendChild(ie.createElement("div")),t.style.cssText=l.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",t.style.marginRight=t.style.width="0",l.style.width="1px",s=!parseFloat((e.getComputedStyle(t)||{}).marginRight),l.removeChild(t)),l.style.display="none",r=0===l.getClientRects().length,r&&(l.style.display="",l.innerHTML="<table><tr><td></td><td>t</td></tr></table>",t=l.getElementsByTagName("td"),t[0].style.cssText="margin:0;border:0;padding:0;display:none",r=0===t[0].offsetHeight,r&&(t[0].style.display="",t[1].style.display="none",r=0===t[0].offsetHeight)),d.removeChild(u)}var n,i,o,r,s,a,u=ie.createElement("div"),l=ie.createElement("div");l.style&&(l.style.cssText="float:left;opacity:.5",de.opacity="0.5"===l.style.opacity,de.cssFloat=!!l.style.cssFloat,l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",de.clearCloneStyle="content-box"===l.style.backgroundClip,u=ie.createElement("div"),u.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",l.innerHTML="",u.appendChild(l),de.boxSizing=""===l.style.boxSizing||""===l.style.MozBoxSizing||""===l.style.WebkitBoxSizing,pe.extend(de,{reliableHiddenOffsets:function(){return null==n&&t(),r},boxSizingReliable:function(){return null==n&&t(),o},pixelMarginRight:function(){return null==n&&t(),i},pixelPosition:function(){return null==n&&t(),n},reliableMarginRight:function(){return null==n&&t(),s},reliableMarginLeft:function(){return null==n&&t(),a}}))}();var ht,gt,mt=/^(top|right|bottom|left)$/;e.getComputedStyle?(ht=function(t){var n=t.ownerDocument.defaultView;return n.opener||(n=e),n.getComputedStyle(t)},gt=function(e,t,n){var i,o,r,s,a=e.style;return n=n||ht(e),s=n?n.getPropertyValue(t)||n[t]:void 0,n&&(""!==s||pe.contains(e.ownerDocument,e)||(s=pe.style(e,t)),!de.pixelMarginRight()&&dt.test(s)&&ct.test(t)&&(i=a.width,o=a.minWidth,r=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=i,a.minWidth=o,a.maxWidth=r)),void 0===s?s:s+""}):pt.currentStyle&&(ht=function(e){return e.currentStyle},gt=function(e,t,n){var i,o,r,s,a=e.style;return n=n||ht(e),s=n?n[t]:void 0,null==s&&a&&a[t]&&(s=a[t]),dt.test(s)&&!mt.test(t)&&(i=a.left,o=e.runtimeStyle,r=o&&o.left,r&&(o.left=e.currentStyle.left),a.left="fontSize"===t?"1em":s,s=a.pixelLeft+"px",a.left=i,r&&(o.left=r)),void 0===s?s:s+""||"auto"});var vt=/alpha\([^)]*\)/i,yt=/opacity\s*=\s*([^)]*)/i,bt=/^(none|table(?!-c[ea]).+)/,xt=new RegExp("^("+Re+")(.*)$","i"),wt={position:"absolute",visibility:"hidden",display:"block"},Ct={letterSpacing:"0",fontWeight:"400"},Tt=["Webkit","O","Moz","ms"],kt=ie.createElement("div").style;pe.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=gt(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":de.cssFloat?"cssFloat":"styleFloat"},style:function(e,t,n,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,r,s,a=pe.camelCase(t),u=e.style;if(t=pe.cssProps[a]||(pe.cssProps[a]=P(a)||a),s=pe.cssHooks[t]||pe.cssHooks[a],void 0===n)return s&&"get"in s&&void 0!==(o=s.get(e,!1,i))?o:u[t];if(r=typeof n,"string"===r&&(o=Me.exec(n))&&o[1]&&(n=f(e,t,o),r="number"),null!=n&&n===n&&("number"===r&&(n+=o&&o[3]||(pe.cssNumber[a]?"":"px")),de.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),!(s&&"set"in s&&void 0===(n=s.set(e,n,i)))))try{u[t]=n}catch(l){}}},css:function(e,t,n,i){var o,r,s,a=pe.camelCase(t);return t=pe.cssProps[a]||(pe.cssProps[a]=P(a)||a),s=pe.cssHooks[t]||pe.cssHooks[a],s&&"get"in s&&(r=s.get(e,!0,n)),void 0===r&&(r=gt(e,t,i)),"normal"===r&&t in Ct&&(r=Ct[t]),""===n||n?(o=parseFloat(r),n===!0||isFinite(o)?o||0:r):r}}),pe.each(["height","width"],function(e,t){pe.cssHooks[t]={get:function(e,n,i){return n?bt.test(pe.css(e,"display"))&&0===e.offsetWidth?ft(e,wt,function(){return M(e,t,i)}):M(e,t,i):void 0},set:function(e,n,i){var o=i&&ht(e);return q(e,n,i?R(e,t,i,de.boxSizing&&"border-box"===pe.css(e,"boxSizing",!1,o),o):0)}}}),de.opacity||(pe.cssHooks.opacity={get:function(e,t){return yt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,i=e.currentStyle,o=pe.isNumeric(t)?"alpha(opacity="+100*t+")":"",r=i&&i.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===pe.trim(r.replace(vt,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||i&&!i.filter)||(n.filter=vt.test(r)?r.replace(vt,o):r+" "+o)}}),pe.cssHooks.marginRight=A(de.reliableMarginRight,function(e,t){return t?ft(e,{display:"inline-block"},gt,[e,"marginRight"]):void 0}),pe.cssHooks.marginLeft=A(de.reliableMarginLeft,function(e,t){return t?(parseFloat(gt(e,"marginLeft"))||(pe.contains(e.ownerDocument,e)?e.getBoundingClientRect().left-ft(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}):0))+"px":void 0}),pe.each({margin:"",padding:"",border:"Width"},function(e,t){pe.cssHooks[e+t]={expand:function(n){for(var i=0,o={},r="string"==typeof n?n.split(" "):[n];4>i;i++)o[e+Ie[i]+t]=r[i]||r[i-2]||r[0];return o}},ct.test(e)||(pe.cssHooks[e+t].set=q)}),pe.fn.extend({css:function(e,t){return He(this,function(e,t,n){var i,o,r={},s=0;if(pe.isArray(t)){for(i=ht(e),o=t.length;o>s;s++)r[t[s]]=pe.css(e,t[s],!1,i);return r}return void 0!==n?pe.style(e,t,n):pe.css(e,t)},e,t,arguments.length>1)},show:function(){return _(this,!0)},hide:function(){return _(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Oe(this)?pe(this).show():pe(this).hide()})}}),pe.Tween=I,I.prototype={constructor:I,init:function(e,t,n,i,o,r){this.elem=e,this.prop=n,this.easing=o||pe.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=i,this.unit=r||(pe.cssNumber[n]?"":"px")},cur:function(){var e=I.propHooks[this.prop];return e&&e.get?e.get(this):I.propHooks._default.get(this)},run:function(e){var t,n=I.propHooks[this.prop];return this.options.duration?this.pos=t=pe.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):I.propHooks._default.set(this),this}},I.prototype.init.prototype=I.prototype,I.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=pe.css(e.elem,e.prop,""),t&&"auto"!==t?t:0)},set:function(e){pe.fx.step[e.prop]?pe.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[pe.cssProps[e.prop]]&&!pe.cssHooks[e.prop]?e.elem[e.prop]=e.now:pe.style(e.elem,e.prop,e.now+e.unit)}}},I.propHooks.scrollTop=I.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},pe.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},pe.fx=I.prototype.init,pe.fx.step={};var Et,St,Nt=/^(?:toggle|show|hide)$/,Dt=/queueHooks$/;pe.Animation=pe.extend(W,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return f(n.elem,e,Me.exec(t),n),n}]},tweener:function(e,t){pe.isFunction(e)?(t=e,e=["*"]):e=e.match(Le);for(var n,i=0,o=e.length;o>i;i++)n=e[i],W.tweeners[n]=W.tweeners[n]||[],W.tweeners[n].unshift(t)},prefilters:[B],prefilter:function(e,t){t?W.prefilters.unshift(e):W.prefilters.push(e)}}),pe.speed=function(e,t,n){var i=e&&"object"==typeof e?pe.extend({},e):{complete:n||!n&&t||pe.isFunction(e)&&e,duration:e,easing:n&&t||t&&!pe.isFunction(t)&&t};return i.duration=pe.fx.off?0:"number"==typeof i.duration?i.duration:i.duration in pe.fx.speeds?pe.fx.speeds[i.duration]:pe.fx.speeds._default,(null==i.queue||i.queue===!0)&&(i.queue="fx"),i.old=i.complete,i.complete=function(){pe.isFunction(i.old)&&i.old.call(this),i.queue&&pe.dequeue(this,i.queue)},i},pe.fn.extend({fadeTo:function(e,t,n,i){return this.filter(Oe).css("opacity",0).show().end().animate({opacity:t},e,n,i)},animate:function(e,t,n,i){var o=pe.isEmptyObject(e),r=pe.speed(t,n,i),s=function(){var t=W(this,pe.extend({},e),r);(o||pe._data(this,"finish"))&&t.stop(!0)};return s.finish=s,o||r.queue===!1?this.each(s):this.queue(r.queue,s)},stop:function(e,t,n){var i=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,o=null!=e&&e+"queueHooks",r=pe.timers,s=pe._data(this);if(o)s[o]&&s[o].stop&&i(s[o]);else for(o in s)s[o]&&s[o].stop&&Dt.test(o)&&i(s[o]);for(o=r.length;o--;)r[o].elem!==this||null!=e&&r[o].queue!==e||(r[o].anim.stop(n),t=!1,r.splice(o,1));(t||!n)&&pe.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=pe._data(this),i=n[e+"queue"],o=n[e+"queueHooks"],r=pe.timers,s=i?i.length:0;for(n.finish=!0,pe.queue(this,e,[]),o&&o.stop&&o.stop.call(this,!0),t=r.length;t--;)r[t].elem===this&&r[t].queue===e&&(r[t].anim.stop(!0),r.splice(t,1));for(t=0;s>t;t++)i[t]&&i[t].finish&&i[t].finish.call(this);delete n.finish})}}),pe.each(["toggle","show","hide"],function(e,t){var n=pe.fn[t];pe.fn[t]=function(e,i,o){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(H(t,!0),e,i,o)}}),pe.each({slideDown:H("show"),slideUp:H("hide"),slideToggle:H("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){pe.fn[e]=function(e,n,i){return this.animate(t,e,n,i)}}),pe.timers=[],pe.fx.tick=function(){var e,t=pe.timers,n=0;for(Et=pe.now();n<t.length;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||pe.fx.stop(),Et=void 0},pe.fx.timer=function(e){pe.timers.push(e),e()?pe.fx.start():pe.timers.pop()},pe.fx.interval=13,pe.fx.start=function(){St||(St=e.setInterval(pe.fx.tick,pe.fx.interval))},pe.fx.stop=function(){e.clearInterval(St),St=null},pe.fx.speeds={slow:600,fast:200,_default:400},pe.fn.delay=function(t,n){return t=pe.fx?pe.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,i){var o=e.setTimeout(n,t);i.stop=function(){e.clearTimeout(o)}})},function(){var e,t=ie.createElement("input"),n=ie.createElement("div"),i=ie.createElement("select"),o=i.appendChild(ie.createElement("option"));n=ie.createElement("div"),n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",e=n.getElementsByTagName("a")[0],t.setAttribute("type","checkbox"),n.appendChild(t),e=n.getElementsByTagName("a")[0],e.style.cssText="top:1px",de.getSetAttribute="t"!==n.className,de.style=/top/.test(e.getAttribute("style")),de.hrefNormalized="/a"===e.getAttribute("href"),de.checkOn=!!t.value,de.optSelected=o.selected,de.enctype=!!ie.createElement("form").enctype,i.disabled=!0,de.optDisabled=!o.disabled,t=ie.createElement("input"),t.setAttribute("value",""),de.input=""===t.getAttribute("value"),t.value="t",t.setAttribute("type","radio"),de.radioValue="t"===t.value}();var Lt=/\r/g;pe.fn.extend({val:function(e){var t,n,i,o=this[0];return arguments.length?(i=pe.isFunction(e),this.each(function(n){var o;1===this.nodeType&&(o=i?e.call(this,n,pe(this).val()):e,null==o?o="":"number"==typeof o?o+="":pe.isArray(o)&&(o=pe.map(o,function(e){return null==e?"":e+""})),t=pe.valHooks[this.type]||pe.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,o,"value")||(this.value=o))})):o?(t=pe.valHooks[o.type]||pe.valHooks[o.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(o,"value"))?n:(n=o.value,"string"==typeof n?n.replace(Lt,""):null==n?"":n)):void 0}}),pe.extend({valHooks:{option:{get:function(e){var t=pe.find.attr(e,"value");return null!=t?t:pe.trim(pe.text(e))}},select:{get:function(e){for(var t,n,i=e.options,o=e.selectedIndex,r="select-one"===e.type||0>o,s=r?null:[],a=r?o+1:i.length,u=0>o?a:r?o:0;a>u;u++)if(n=i[u],(n.selected||u===o)&&(de.optDisabled?!n.disabled:null===n.getAttribute("disabled"))&&(!n.parentNode.disabled||!pe.nodeName(n.parentNode,"optgroup"))){if(t=pe(n).val(),r)return t;s.push(t)}return s},set:function(e,t){for(var n,i,o=e.options,r=pe.makeArray(t),s=o.length;s--;)if(i=o[s],pe.inArray(pe.valHooks.option.get(i),r)>=0)try{i.selected=n=!0}catch(a){i.scrollHeight}else i.selected=!1;return n||(e.selectedIndex=-1),o}}}}),pe.each(["radio","checkbox"],function(){pe.valHooks[this]={set:function(e,t){return pe.isArray(t)?e.checked=pe.inArray(pe(e).val(),t)>-1:void 0}},de.checkOn||(pe.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var jt,At,Pt=pe.expr.attrHandle,_t=/^(?:checked|selected)$/i,qt=de.getSetAttribute,Rt=de.input;pe.fn.extend({attr:function(e,t){return He(this,pe.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){pe.removeAttr(this,e)})}}),pe.extend({attr:function(e,t,n){var i,o,r=e.nodeType;return 3!==r&&8!==r&&2!==r?"undefined"==typeof e.getAttribute?pe.prop(e,t,n):(1===r&&pe.isXMLDoc(e)||(t=t.toLowerCase(),o=pe.attrHooks[t]||(pe.expr.match.bool.test(t)?At:jt)),void 0!==n?null===n?void pe.removeAttr(e,t):o&&"set"in o&&void 0!==(i=o.set(e,n,t))?i:(e.setAttribute(t,n+""),n):o&&"get"in o&&null!==(i=o.get(e,t))?i:(i=pe.find.attr(e,t),null==i?void 0:i)):void 0},attrHooks:{type:{set:function(e,t){if(!de.radioValue&&"radio"===t&&pe.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,i,o=0,r=t&&t.match(Le);if(r&&1===e.nodeType)for(;n=r[o++];)i=pe.propFix[n]||n,pe.expr.match.bool.test(n)?Rt&&qt||!_t.test(n)?e[i]=!1:e[pe.camelCase("default-"+n)]=e[i]=!1:pe.attr(e,n,""),e.removeAttribute(qt?n:i)}}),At={set:function(e,t,n){return t===!1?pe.removeAttr(e,n):Rt&&qt||!_t.test(n)?e.setAttribute(!qt&&pe.propFix[n]||n,n):e[pe.camelCase("default-"+n)]=e[n]=!0,n}},pe.each(pe.expr.match.bool.source.match(/\w+/g),function(e,t){var n=Pt[t]||pe.find.attr;Rt&&qt||!_t.test(t)?Pt[t]=function(e,t,i){var o,r;return i||(r=Pt[t],Pt[t]=o,o=null!=n(e,t,i)?t.toLowerCase():null,Pt[t]=r),o}:Pt[t]=function(e,t,n){return n?void 0:e[pe.camelCase("default-"+t)]?t.toLowerCase():null}}),Rt&&qt||(pe.attrHooks.value={set:function(e,t,n){return pe.nodeName(e,"input")?void(e.defaultValue=t):jt&&jt.set(e,t,n)}}),qt||(jt={set:function(e,t,n){var i=e.getAttributeNode(n);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(n)),i.value=t+="","value"===n||t===e.getAttribute(n)?t:void 0}},Pt.id=Pt.name=Pt.coords=function(e,t,n){var i;return n?void 0:(i=e.getAttributeNode(t))&&""!==i.value?i.value:null},pe.valHooks.button={get:function(e,t){var n=e.getAttributeNode(t);return n&&n.specified?n.value:void 0},set:jt.set},pe.attrHooks.contenteditable={set:function(e,t,n){jt.set(e,""===t?!1:t,n)}},pe.each(["width","height"],function(e,t){pe.attrHooks[t]={set:function(e,n){return""===n?(e.setAttribute(t,"auto"),n):void 0}}})),de.style||(pe.attrHooks.style={get:function(e){return e.style.cssText||void 0},set:function(e,t){return e.style.cssText=t+""}});var Mt=/^(?:input|select|textarea|button|object)$/i,It=/^(?:a|area)$/i;pe.fn.extend({prop:function(e,t){return He(this,pe.prop,e,t,arguments.length>1)},removeProp:function(e){return e=pe.propFix[e]||e,this.each(function(){try{this[e]=void 0,delete this[e]}catch(t){}})}}),pe.extend({prop:function(e,t,n){var i,o,r=e.nodeType;return 3!==r&&8!==r&&2!==r?(1===r&&pe.isXMLDoc(e)||(t=pe.propFix[t]||t,o=pe.propHooks[t]),void 0!==n?o&&"set"in o&&void 0!==(i=o.set(e,n,t))?i:e[t]=n:o&&"get"in o&&null!==(i=o.get(e,t))?i:e[t]):void 0},propHooks:{tabIndex:{get:function(e){var t=pe.find.attr(e,"tabindex");return t?parseInt(t,10):Mt.test(e.nodeName)||It.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),de.hrefNormalized||pe.each(["href","src"],function(e,t){pe.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),de.optSelected||(pe.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),pe.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){pe.propFix[this.toLowerCase()]=this}),de.enctype||(pe.propFix.enctype="encoding");var Ot=/[\t\r\n\f]/g;pe.fn.extend({addClass:function(e){var t,n,i,o,r,s,a,u=0;if(pe.isFunction(e))return this.each(function(t){pe(this).addClass(e.call(this,t,V(this)))});if("string"==typeof e&&e)for(t=e.match(Le)||[];n=this[u++];)if(o=V(n),i=1===n.nodeType&&(" "+o+" ").replace(Ot," ")){for(s=0;r=t[s++];)i.indexOf(" "+r+" ")<0&&(i+=r+" ");a=pe.trim(i),o!==a&&pe.attr(n,"class",a)}return this},removeClass:function(e){var t,n,i,o,r,s,a,u=0;if(pe.isFunction(e))return this.each(function(t){pe(this).removeClass(e.call(this,t,V(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof e&&e)for(t=e.match(Le)||[];n=this[u++];)if(o=V(n),i=1===n.nodeType&&(" "+o+" ").replace(Ot," ")){for(s=0;r=t[s++];)for(;i.indexOf(" "+r+" ")>-1;)i=i.replace(" "+r+" "," ");a=pe.trim(i),o!==a&&pe.attr(n,"class",a)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):pe.isFunction(e)?this.each(function(n){pe(this).toggleClass(e.call(this,n,V(this),t),t)}):this.each(function(){var t,i,o,r;if("string"===n)for(i=0,o=pe(this),r=e.match(Le)||[];t=r[i++];)o.hasClass(t)?o.removeClass(t):o.addClass(t);else(void 0===e||"boolean"===n)&&(t=V(this),t&&pe._data(this,"__className__",t),pe.attr(this,"class",t||e===!1?"":pe._data(this,"__className__")||""))})},hasClass:function(e){var t,n,i=0;for(t=" "+e+" ";n=this[i++];)if(1===n.nodeType&&(" "+V(n)+" ").replace(Ot," ").indexOf(t)>-1)return!0;return!1}}),pe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){pe.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),pe.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}});var Ht=e.location,Ft=pe.now(),Bt=/\?/,$t=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;pe.parseJSON=function(t){if(e.JSON&&e.JSON.parse)return e.JSON.parse(t+"");var n,i=null,o=pe.trim(t+"");return o&&!pe.trim(o.replace($t,function(e,t,o,r){return n&&t&&(i=0),0===i?e:(n=o||t,i+=!r-!o,"")}))?Function("return "+o)():pe.error("Invalid JSON: "+t)},pe.parseXML=function(t){var n,i;if(!t||"string"!=typeof t)return null;try{e.DOMParser?(i=new e.DOMParser,n=i.parseFromString(t,"text/xml")):(n=new e.ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(t))}catch(o){n=void 0}return n&&n.documentElement&&!n.getElementsByTagName("parsererror").length||pe.error("Invalid XML: "+t),n};var Wt=/#.*$/,Vt=/([?&])_=[^&]*/,zt=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ut=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Xt=/^(?:GET|HEAD)$/,Qt=/^\/\//,Yt=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Gt={},Kt={},Jt="*/".concat("*"),Zt=Ht.href,en=Yt.exec(Zt.toLowerCase())||[];pe.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Zt,type:"GET",isLocal:Ut.test(en[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":pe.parseJSON,"text xml":pe.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?X(X(e,pe.ajaxSettings),t):X(pe.ajaxSettings,e)},ajaxPrefilter:z(Gt),ajaxTransport:z(Kt),ajax:function(t,n){function i(t,n,i,o){var r,d,y,b,w,T=n;2!==x&&(x=2,u&&e.clearTimeout(u),c=void 0,a=o||"",C.readyState=t>0?4:0,r=t>=200&&300>t||304===t,i&&(b=Q(f,C,i)),b=Y(f,b,C,r),r?(f.ifModified&&(w=C.getResponseHeader("Last-Modified"),w&&(pe.lastModified[s]=w),w=C.getResponseHeader("etag"),w&&(pe.etag[s]=w)),204===t||"HEAD"===f.type?T="nocontent":304===t?T="notmodified":(T=b.state,d=b.data,y=b.error,r=!y)):(y=T,(t||!T)&&(T="error",0>t&&(t=0))),C.status=t,C.statusText=(n||T)+"",r?g.resolveWith(p,[d,T,C]):g.rejectWith(p,[C,T,y]),C.statusCode(v),v=void 0,l&&h.trigger(r?"ajaxSuccess":"ajaxError",[C,f,r?d:y]),m.fireWith(p,[C,T]),l&&(h.trigger("ajaxComplete",[C,f]),--pe.active||pe.event.trigger("ajaxStop")))}"object"==typeof t&&(n=t,t=void 0),n=n||{};var o,r,s,a,u,l,c,d,f=pe.ajaxSetup({},n),p=f.context||f,h=f.context&&(p.nodeType||p.jquery)?pe(p):pe.event,g=pe.Deferred(),m=pe.Callbacks("once memory"),v=f.statusCode||{},y={},b={},x=0,w="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!d)for(d={};t=zt.exec(a);)d[t[1].toLowerCase()]=t[2];t=d[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=b[n]=b[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(f.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)v[t]=[v[t],e[t]];else C.always(e[C.status]);return this},abort:function(e){var t=e||w;return c&&c.abort(t),i(0,t),this}};if(g.promise(C).complete=m.add,C.success=C.done,C.error=C.fail,f.url=((t||f.url||Zt)+"").replace(Wt,"").replace(Qt,en[1]+"//"),f.type=n.method||n.type||f.method||f.type,f.dataTypes=pe.trim(f.dataType||"*").toLowerCase().match(Le)||[""],null==f.crossDomain&&(o=Yt.exec(f.url.toLowerCase()),f.crossDomain=!(!o||o[1]===en[1]&&o[2]===en[2]&&(o[3]||("http:"===o[1]?"80":"443"))===(en[3]||("http:"===en[1]?"80":"443")))),f.data&&f.processData&&"string"!=typeof f.data&&(f.data=pe.param(f.data,f.traditional)),U(Gt,f,n,C),2===x)return C;l=pe.event&&f.global,l&&0===pe.active++&&pe.event.trigger("ajaxStart"),f.type=f.type.toUpperCase(),f.hasContent=!Xt.test(f.type),s=f.url,f.hasContent||(f.data&&(s=f.url+=(Bt.test(s)?"&":"?")+f.data,delete f.data),f.cache===!1&&(f.url=Vt.test(s)?s.replace(Vt,"$1_="+Ft++):s+(Bt.test(s)?"&":"?")+"_="+Ft++)),f.ifModified&&(pe.lastModified[s]&&C.setRequestHeader("If-Modified-Since",pe.lastModified[s]),pe.etag[s]&&C.setRequestHeader("If-None-Match",pe.etag[s])),(f.data&&f.hasContent&&f.contentType!==!1||n.contentType)&&C.setRequestHeader("Content-Type",f.contentType),C.setRequestHeader("Accept",f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+("*"!==f.dataTypes[0]?", "+Jt+"; q=0.01":""):f.accepts["*"]);for(r in f.headers)C.setRequestHeader(r,f.headers[r]);if(f.beforeSend&&(f.beforeSend.call(p,C,f)===!1||2===x))return C.abort();w="abort";for(r in{success:1,error:1,complete:1})C[r](f[r]);if(c=U(Kt,f,n,C)){if(C.readyState=1,l&&h.trigger("ajaxSend",[C,f]),2===x)return C;f.async&&f.timeout>0&&(u=e.setTimeout(function(){C.abort("timeout")},f.timeout));try{x=1,c.send(y,i)}catch(T){if(!(2>x))throw T;i(-1,T)}}else i(-1,"No Transport");return C},getJSON:function(e,t,n){return pe.get(e,t,n,"json")},getScript:function(e,t){
return pe.get(e,void 0,t,"script")}}),pe.each(["get","post"],function(e,t){pe[t]=function(e,n,i,o){return pe.isFunction(n)&&(o=o||i,i=n,n=void 0),pe.ajax(pe.extend({url:e,type:t,dataType:o,data:n,success:i},pe.isPlainObject(e)&&e))}}),pe._evalUrl=function(e){return pe.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},pe.fn.extend({wrapAll:function(e){if(pe.isFunction(e))return this.each(function(t){pe(this).wrapAll(e.call(this,t))});if(this[0]){var t=pe(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstChild&&1===e.firstChild.nodeType;)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return pe.isFunction(e)?this.each(function(t){pe(this).wrapInner(e.call(this,t))}):this.each(function(){var t=pe(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=pe.isFunction(e);return this.each(function(n){pe(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){pe.nodeName(this,"body")||pe(this).replaceWith(this.childNodes)}).end()}}),pe.expr.filters.hidden=function(e){return de.reliableHiddenOffsets()?e.offsetWidth<=0&&e.offsetHeight<=0&&!e.getClientRects().length:K(e)},pe.expr.filters.visible=function(e){return!pe.expr.filters.hidden(e)};var tn=/%20/g,nn=/\[\]$/,on=/\r?\n/g,rn=/^(?:submit|button|image|reset|file)$/i,sn=/^(?:input|select|textarea|keygen)/i;pe.param=function(e,t){var n,i=[],o=function(e,t){t=pe.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=pe.ajaxSettings&&pe.ajaxSettings.traditional),pe.isArray(e)||e.jquery&&!pe.isPlainObject(e))pe.each(e,function(){o(this.name,this.value)});else for(n in e)J(n,e[n],t,o);return i.join("&").replace(tn,"+")},pe.fn.extend({serialize:function(){return pe.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=pe.prop(this,"elements");return e?pe.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!pe(this).is(":disabled")&&sn.test(this.nodeName)&&!rn.test(e)&&(this.checked||!Fe.test(e))}).map(function(e,t){var n=pe(this).val();return null==n?null:pe.isArray(n)?pe.map(n,function(e){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),pe.ajaxSettings.xhr=void 0!==e.ActiveXObject?function(){return this.isLocal?ee():ie.documentMode>8?Z():/^(get|post|head|put|delete|options)$/i.test(this.type)&&Z()||ee()}:Z;var an=0,un={},ln=pe.ajaxSettings.xhr();e.attachEvent&&e.attachEvent("onunload",function(){for(var e in un)un[e](void 0,!0)}),de.cors=!!ln&&"withCredentials"in ln,ln=de.ajax=!!ln,ln&&pe.ajaxTransport(function(t){if(!t.crossDomain||de.cors){var n;return{send:function(i,o){var r,s=t.xhr(),a=++an;if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(r in t.xhrFields)s[r]=t.xhrFields[r];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(r in i)void 0!==i[r]&&s.setRequestHeader(r,i[r]+"");s.send(t.hasContent&&t.data||null),n=function(e,i){var r,u,l;if(n&&(i||4===s.readyState))if(delete un[a],n=void 0,s.onreadystatechange=pe.noop,i)4!==s.readyState&&s.abort();else{l={},r=s.status,"string"==typeof s.responseText&&(l.text=s.responseText);try{u=s.statusText}catch(c){u=""}r||!t.isLocal||t.crossDomain?1223===r&&(r=204):r=l.text?200:404}l&&o(r,u,l,s.getAllResponseHeaders())},t.async?4===s.readyState?e.setTimeout(n):s.onreadystatechange=un[a]=n:n()},abort:function(){n&&n(void 0,!0)}}}}),pe.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),pe.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return pe.globalEval(e),e}}}),pe.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),pe.ajaxTransport("script",function(e){if(e.crossDomain){var t,n=ie.head||pe("head")[0]||ie.documentElement;return{send:function(i,o){t=ie.createElement("script"),t.async=!0,e.scriptCharset&&(t.charset=e.scriptCharset),t.src=e.url,t.onload=t.onreadystatechange=function(e,n){(n||!t.readyState||/loaded|complete/.test(t.readyState))&&(t.onload=t.onreadystatechange=null,t.parentNode&&t.parentNode.removeChild(t),t=null,n||o(200,"success"))},n.insertBefore(t,n.firstChild)},abort:function(){t&&t.onload(void 0,!0)}}}});var cn=[],dn=/(=)\?(?=&|$)|\?\?/;pe.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=cn.pop()||pe.expando+"_"+Ft++;return this[e]=!0,e}}),pe.ajaxPrefilter("json jsonp",function(t,n,i){var o,r,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(o=t.jsonpCallback=pe.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+o):t.jsonp!==!1&&(t.url+=(Bt.test(t.url)?"&":"?")+t.jsonp+"="+o),t.converters["script json"]=function(){return s||pe.error(o+" was not called"),s[0]},t.dataTypes[0]="json",r=e[o],e[o]=function(){s=arguments},i.always(function(){void 0===r?pe(e).removeProp(o):e[o]=r,t[o]&&(t.jsonpCallback=n.jsonpCallback,cn.push(o)),s&&pe.isFunction(r)&&r(s[0]),s=r=void 0}),"script"):void 0}),de.createHTMLDocument=function(){if(!ie.implementation.createHTMLDocument)return!1;var e=ie.implementation.createHTMLDocument("");return e.body.innerHTML="<form></form><form></form>",2===e.body.childNodes.length}(),pe.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||(de.createHTMLDocument?ie.implementation.createHTMLDocument(""):ie);var i=Ce.exec(e),o=!n&&[];return i?[t.createElement(i[1])]:(i=v([e],t,o),o&&o.length&&pe(o).remove(),pe.merge([],i.childNodes))};var fn=pe.fn.load;pe.fn.load=function(e,t,n){if("string"!=typeof e&&fn)return fn.apply(this,arguments);var i,o,r,s=this,a=e.indexOf(" ");return a>-1&&(i=pe.trim(e.slice(a,e.length)),e=e.slice(0,a)),pe.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(o="POST"),s.length>0&&pe.ajax({url:e,type:o||"GET",dataType:"html",data:t}).done(function(e){r=arguments,s.html(i?pe("<div>").append(pe.parseHTML(e)).find(i):e)}).always(n&&function(e,t){s.each(function(){n.apply(s,r||[e.responseText,t,e])})}),this},pe.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){pe.fn[t]=function(e){return this.on(t,e)}}),pe.expr.filters.animated=function(e){return pe.grep(pe.timers,function(t){return e===t.elem}).length},pe.offset={setOffset:function(e,t,n){var i,o,r,s,a,u,l,c=pe.css(e,"position"),d=pe(e),f={};"static"===c&&(e.style.position="relative"),a=d.offset(),r=pe.css(e,"top"),u=pe.css(e,"left"),l=("absolute"===c||"fixed"===c)&&pe.inArray("auto",[r,u])>-1,l?(i=d.position(),s=i.top,o=i.left):(s=parseFloat(r)||0,o=parseFloat(u)||0),pe.isFunction(t)&&(t=t.call(e,n,pe.extend({},a))),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+o),"using"in t?t.using.call(e,f):d.css(f)}},pe.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){pe.offset.setOffset(this,e,t)});var t,n,i={top:0,left:0},o=this[0],r=o&&o.ownerDocument;return r?(t=r.documentElement,pe.contains(t,o)?("undefined"!=typeof o.getBoundingClientRect&&(i=o.getBoundingClientRect()),n=te(r),{top:i.top+(n.pageYOffset||t.scrollTop)-(t.clientTop||0),left:i.left+(n.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}):i):void 0},position:function(){if(this[0]){var e,t,n={top:0,left:0},i=this[0];return"fixed"===pe.css(i,"position")?t=i.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),pe.nodeName(e[0],"html")||(n=e.offset()),n.top+=pe.css(e[0],"borderTopWidth",!0)-e.scrollTop(),n.left+=pe.css(e[0],"borderLeftWidth",!0)-e.scrollLeft()),{top:t.top-n.top-pe.css(i,"marginTop",!0),left:t.left-n.left-pe.css(i,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent;e&&!pe.nodeName(e,"html")&&"static"===pe.css(e,"position");)e=e.offsetParent;return e||pt})}}),pe.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n=/Y/.test(t);pe.fn[e]=function(i){return He(this,function(e,i,o){var r=te(e);return void 0===o?r?t in r?r[t]:r.document.documentElement[i]:e[i]:void(r?r.scrollTo(n?pe(r).scrollLeft():o,n?o:pe(r).scrollTop()):e[i]=o)},e,i,arguments.length,null)}}),pe.each(["top","left"],function(e,t){pe.cssHooks[t]=A(de.pixelPosition,function(e,n){return n?(n=gt(e,t),dt.test(n)?pe(e).position()[t]+"px":n):void 0})}),pe.each({Height:"height",Width:"width"},function(e,t){pe.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,i){pe.fn[i]=function(i,o){var r=arguments.length&&(n||"boolean"!=typeof i),s=n||(i===!0||o===!0?"margin":"border");return He(this,function(t,n,i){var o;return pe.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?pe.css(t,n,s):pe.style(t,n,i,s)},t,r?i:void 0,r,null)}})}),pe.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,i){return this.on(t,e,n,i)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),pe.fn.size=function(){return this.length},pe.fn.andSelf=pe.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return pe});var pn=e.jQuery,hn=e.$;return pe.noConflict=function(t){return e.$===pe&&(e.$=hn),t&&e.jQuery===pe&&(e.jQuery=pn),pe},t||(e.jQuery=e.$=pe),pe}),!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){var t,n=navigator.userAgent,i=/iphone/i.test(n),o=/chrome/i.test(n),r=/android/i.test(n);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;return 0===this.length||this.is(":hidden")?void 0:"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(n,s){var a,u,l,c,d,f,p,h;if(!n&&this.length>0){a=e(this[0]);var g=a.data(e.mask.dataName);return g?g():void 0}return s=e.extend({autoclear:e.mask.autoclear,placeholder:e.mask.placeholder,completed:null},s),u=e.mask.definitions,l=[],c=p=n.length,d=null,e.each(n.split(""),function(e,t){"?"==t?(p--,c=e):u[t]?(l.push(new RegExp(u[t])),null===d&&(d=l.length-1),c>e&&(f=l.length-1)):l.push(null)}),this.trigger("unmask").each(function(){function a(){if(s.completed){for(var e=d;f>=e;e++)if(l[e]&&D[e]===g(e))return;s.completed.call(N)}}function g(e){return s.placeholder.charAt(e<s.placeholder.length?e:0)}function m(e){for(;++e<p&&!l[e];);return e}function v(e){for(;--e>=0&&!l[e];);return e}function y(e,t){var n,i;if(!(0>e)){for(n=e,i=m(t);p>n;n++)if(l[n]){if(!(p>i&&l[n].test(D[i])))break;D[n]=D[i],D[i]=g(i),i=m(i)}E(),N.caret(Math.max(d,e))}}function b(e){var t,n,i,o;for(t=e,n=g(e);p>t;t++)if(l[t]){if(i=m(t),o=D[t],D[t]=n,!(p>i&&l[i].test(o)))break;n=o}}function x(){var e=N.val(),t=N.caret();if(e.length<h.length){for(S(!0);t.begin>0&&!l[t.begin-1];)t.begin--;if(0===t.begin)for(;t.begin<d&&!l[t.begin];)t.begin++;N.caret(t.begin,t.begin)}else{for(S(!0);t.begin<p&&!l[t.begin];)t.begin++;N.caret(t.begin,t.begin)}a()}function w(){S(),N.val()!=j&&N.change()}function C(e){if(!N.prop("readonly")){var t,n,o,r=e.which||e.keyCode;h=N.val(),8===r||46===r||i&&127===r?(t=N.caret(),n=t.begin,o=t.end,o-n===0&&(n=46!==r?v(n):o=m(n-1),o=46===r?m(o):o),k(n,o),y(n,o-1),e.preventDefault()):13===r?w.call(this,e):27===r&&(N.val(j),N.caret(0,S()),e.preventDefault())}}function T(t){if(!N.prop("readonly")){var n,i,o,s=t.which||t.keyCode,u=N.caret();if(!(t.ctrlKey||t.altKey||t.metaKey||32>s)&&s&&13!==s){if(u.end-u.begin!==0&&(k(u.begin,u.end),y(u.begin,u.end-1)),n=m(u.begin-1),p>n&&(i=String.fromCharCode(s),l[n].test(i))){if(b(n),D[n]=i,E(),o=m(n),r){var c=function(){e.proxy(e.fn.caret,N,o)()};setTimeout(c,0)}else N.caret(o);u.begin<=f&&a()}t.preventDefault()}}}function k(e,t){var n;for(n=e;t>n&&p>n;n++)l[n]&&(D[n]=g(n))}function E(){N.val(D.join(""))}function S(e){var t,n,i,o=N.val(),r=-1;for(t=0,i=0;p>t;t++)if(l[t]){for(D[t]=g(t);i++<o.length;)if(n=o.charAt(i-1),l[t].test(n)){D[t]=n,r=t;break}if(i>o.length){k(t+1,p);break}}else D[t]===o.charAt(i)&&i++,c>t&&(r=t);return e?E():c>r+1?s.autoclear||D.join("")===L?(N.val()&&N.val(""),k(0,p)):E():(E(),N.val(N.val().substring(0,r+1))),c?t:d}var N=e(this),D=e.map(n.split(""),function(e,t){return"?"!=e?u[e]?g(t):e:void 0}),L=D.join(""),j=N.val();N.data(e.mask.dataName,function(){return e.map(D,function(e,t){return l[t]&&e!=g(t)?e:null}).join("")}),N.one("unmask",function(){N.off(".mask").removeData(e.mask.dataName)}).on("focus.mask",function(){if(!N.prop("readonly")){clearTimeout(t);var e;j=N.val(),e=S(),t=setTimeout(function(){E(),e==n.replace("?","").length?N.caret(0,e):N.caret(e)},10)}}).on("blur.mask",w).on("keydown.mask",C).on("keypress.mask",T).on("input.mask paste.mask",function(){N.prop("readonly")||setTimeout(function(){var e=S(!0);N.caret(e),a()},0)}),o&&r&&N.off("input.mask").on("input.mask",x),S()})}})}),function(e,t){"object"==typeof exports&&exports&&"string"!=typeof exports.nodeName?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):(e.Mustache={},t(Mustache))}(this,function(e){function t(e){return"function"==typeof e}function n(e){return g(e)?"array":typeof e}function i(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function o(e,t){return null!=e&&"object"==typeof e&&t in e}function r(e,t){return m.call(e,t)}function s(e){return!r(v,e)}function a(e){return String(e).replace(/[&<>"'\/]/g,function(e){return y[e]})}function u(t,n){function o(){if(v&&!y)for(;m.length;)delete h[m.pop()];else m=[];v=!1,y=!1}function r(e){if("string"==typeof e&&(e=e.split(x,2)),!g(e)||2!==e.length)throw new Error("Invalid tags: "+e);a=new RegExp(i(e[0])+"\\s*"),u=new RegExp("\\s*"+i(e[1])),f=new RegExp("\\s*"+i("}"+e[1]))}if(!t)return[];var a,u,f,p=[],h=[],m=[],v=!1,y=!1;r(n||e.tags);for(var k,E,S,N,D,L,j=new d(t);!j.eos();){if(k=j.pos,S=j.scanUntil(a))for(var A=0,P=S.length;P>A;++A)N=S.charAt(A),s(N)?m.push(h.length):y=!0,h.push(["text",N,k,k+1]),k+=1,"\n"===N&&o();if(!j.scan(a))break;if(v=!0,E=j.scan(T)||"name",j.scan(b),"="===E?(S=j.scanUntil(w),j.scan(w),j.scanUntil(u)):"{"===E?(S=j.scanUntil(f),j.scan(C),j.scanUntil(u),E="&"):S=j.scanUntil(u),!j.scan(u))throw new Error("Unclosed tag at "+j.pos);if(D=[E,S,k,j.pos],h.push(D),"#"===E||"^"===E)p.push(D);else if("/"===E){if(L=p.pop(),!L)throw new Error('Unopened section "'+S+'" at '+k);if(L[1]!==S)throw new Error('Unclosed section "'+L[1]+'" at '+k)}else"name"===E||"{"===E||"&"===E?y=!0:"="===E&&r(S)}if(L=p.pop())throw new Error('Unclosed section "'+L[1]+'" at '+j.pos);return c(l(h))}function l(e){for(var t,n,i=[],o=0,r=e.length;r>o;++o)t=e[o],t&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(i.push(t),n=t));return i}function c(e){for(var t,n,i=[],o=i,r=[],s=0,a=e.length;a>s;++s)switch(t=e[s],t[0]){case"#":case"^":o.push(t),r.push(t),o=t[4]=[];break;case"/":n=r.pop(),n[5]=t[2],o=r.length>0?r[r.length-1][4]:i;break;default:o.push(t)}return i}function d(e){this.string=e,this.tail=e,this.pos=0}function f(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function p(){this.cache={}}var h=Object.prototype.toString,g=Array.isArray||function(e){return"[object Array]"===h.call(e)},m=RegExp.prototype.test,v=/\S/,y={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},b=/\s*/,x=/\s+/,w=/\s*=/,C=/\s*\}/,T=/#|\^|\/|>|\{|&|=|!/;d.prototype.eos=function(){return""===this.tail},d.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},d.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},f.prototype.push=function(e){return new f(e,this)},f.prototype.lookup=function(e){var n,i=this.cache;if(i.hasOwnProperty(e))n=i[e];else{for(var r,s,a=this,u=!1;a;){if(e.indexOf(".")>0)for(n=a.view,r=e.split("."),s=0;null!=n&&s<r.length;)s===r.length-1&&(u=o(n,r[s])),n=n[r[s++]];else n=a.view[e],u=o(a.view,e);if(u)break;a=a.parent}i[e]=n}return t(n)&&(n=n.call(this.view)),n},p.prototype.clearCache=function(){this.cache={}},p.prototype.parse=function(e,t){var n=this.cache,i=n[e];return null==i&&(i=n[e]=u(e,t)),i},p.prototype.render=function(e,t,n){var i=this.parse(e),o=t instanceof f?t:new f(t);return this.renderTokens(i,o,n,e)},p.prototype.renderTokens=function(e,t,n,i){for(var o,r,s,a="",u=0,l=e.length;l>u;++u)s=void 0,o=e[u],r=o[0],"#"===r?s=this.renderSection(o,t,n,i):"^"===r?s=this.renderInverted(o,t,n,i):">"===r?s=this.renderPartial(o,t,n,i):"&"===r?s=this.unescapedValue(o,t):"name"===r?s=this.escapedValue(o,t):"text"===r&&(s=this.rawValue(o)),void 0!==s&&(a+=s);return a},p.prototype.renderSection=function(e,n,i,o){function r(e){return s.render(e,n,i)}var s=this,a="",u=n.lookup(e[1]);if(u){if(g(u))for(var l=0,c=u.length;c>l;++l)a+=this.renderTokens(e[4],n.push(u[l]),i,o);else if("object"==typeof u||"string"==typeof u||"number"==typeof u)a+=this.renderTokens(e[4],n.push(u),i,o);else if(t(u)){if("string"!=typeof o)throw new Error("Cannot use higher-order sections without the original template");u=u.call(n.view,o.slice(e[3],e[5]),r),null!=u&&(a+=u)}else a+=this.renderTokens(e[4],n,i,o);return a}},p.prototype.renderInverted=function(e,t,n,i){var o=t.lookup(e[1]);return!o||g(o)&&0===o.length?this.renderTokens(e[4],t,n,i):void 0},p.prototype.renderPartial=function(e,n,i){if(i){var o=t(i)?i(e[1]):i[e[1]];return null!=o?this.renderTokens(this.parse(o),n,i,o):void 0}},p.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);return null!=n?n:void 0},p.prototype.escapedValue=function(t,n){var i=n.lookup(t[1]);return null!=i?e.escape(i):void 0},p.prototype.rawValue=function(e){return e[1]},e.name="mustache.js",e.version="2.1.3",e.tags=["{{","}}"];var k=new p;e.clearCache=function(){return k.clearCache()},e.parse=function(e,t){return k.parse(e,t)},e.render=function(e,t,i){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+n(e)+'" was given as the first argument for mustache#render(template, view, partials)');return k.render(e,t,i)},e.to_html=function(n,i,o,r){var s=e.render(n,i,o);return t(r)?void r(s):s},e.escape=a,e.Scanner=d,e.Context=f,e.Writer=p}),function(e){function t(t,n){return null!==e.getElementById(t)?(n=n||{},Mustache.render(e.getElementById(t).innerHTML,n)):""}window.template=t}(document),function(e){"use strict";var t,n,i={wrapper:"body",triggerClass:".js-open-popup",speed:550,overlay:{enable:!0,element:"#overlay"},bodyclass:!0,cssPosition:!1,hashCheck:!0,hashChange:!0,keyHooks:!0,template:{error:"tmpl-popup-error",message:"tmpl-popup-message",notification:"tmpl-notification"}},o=null,r=null,s=[],a=e("body"),u=e(window),l=e(document);e.overlay={close:function(){e(i.overlay.element).removeClass("animate"),setTimeout(function(){e(i.overlay.element).removeClass("visible is-open"),e(i.overlay.element).filter(".temp").remove()},i.speed)}},e.popup={_getPopup:function(t){var n;return"object"==typeof t?t:(n=e("#"+t),n.length?n:null)},_getPosition:function(e){o=this;var t=(u.width(),u.height()),n=l.width(),i=(l.height(),e.outerWidth()),r=e.outerHeight(),s=u.scrollTop(),a=0,c=0,d={},f=e.attr("data-position");return n>=i&&(a=Math.round((n-i)/2)),t>=r?(d.position="fixed",c="50%",d.marginTop="-"+Math.floor(r/2)+"px"):(d.position="absolute",c=s+Math.round((t-r)/2)),d.top=c,"right"==f?d.right=0:d.left=a,d},_rePosition:function(e){var t=this._getPopup(e);i.cssPosition||t.css(this._getPosition(t))},close:function(t,n){o=this;var r,s=0,l=!1,c=!0;return r=a.find(".popup.is-open"),"undefined"!=typeof t&&(r=e(t),c=!1),"undefined"!=typeof n&&(l=!0),i.overlay&&c&&e.overlay.close(),e(i.wrapper).off("click.wrapClose"),r.removeClass("animate"),setTimeout(function(){r.removeClass("visible is-open"),r.filter(".temp").remove(),a.trigger("popup.after_close"),l&&setTimeout(function(){n.apply()},10)},i.speed),!l&&c&&(a.removeClass("popup-open"),i.hashChange&&(s=u.scrollTop(),window.location.hash="",u.scrollTop(s))),a.trigger("popup.close"),this},initWrapClose:function(){o=this,e(i.wrapper).on("click.wrapClose",function(t){e(this).closest(".popup").length||e(t.target).hasClass(i.triggerClass.substr(1))||e(t.target).closest(i.triggerClass).length||o.close()})},hooks:function(){return o=this,a.on("click",".js-popup-close",function(e){e.preventDefault?e.preventDefault():e.returnValue=!1,o.close()}),i.keyHooks&&a.on("keydown",function(e){27==e.keyCode&&o.close()}),i.overlay&&e(i.overlay.element).on("click",function(){o.close()}),i.cssPosition||u.on("resize.popup",function(){clearTimeout(n),n=setTimeout(function(){a.find(".popup.is-open").each(function(){o._rePosition(e(this))})},100)}),this},show:function(t,n,r){if("undefined"!=typeof t&&""!==t){var u,l=l||{};r&&a.addClass("popup-open"),"object"==typeof t?u=e(t):e("#"+t).hasClass("popup")?u=e("#"+t):e("#"+t).length&&"SCRIPT"==e("#"+t).get(0).tagName&&(u=e(template(t,l)),u.addClass("temp"),a.append(u)),u.addClass("visible is-open"),i.cssPosition||u.css(o._getPosition(u)),n?(e(i.overlay.element).addClass("visible"),setTimeout(function(){e(i.overlay.element).addClass("animate")},10)):this.initWrapClose(),setTimeout(function(){u.addClass("animate"),a.trigger("popup.after_open",u),s.length&&a.trigger("popup.init_nested",{popup:u,nested:s})},10),a.trigger("popup.open",u)}return this},clicks:function(t){return o=this,a.on("click",t,function(t){var n,r=i.overlay.enable,s=i.bodyclass;return i.hashChange||(t.preventDefault?t.preventDefault():t.returnValue=!1),"undefined"!=typeof e(this).data("bodyclass")&&(s=e(this).data("bodyclass")),"undefined"!=typeof e(this).data("overlay")&&(r=e(this).data("overlay")),e(this).attr("href")?n=e(this).attr("href"):e(this).data("popup")&&(n=e(this).data("popup")),o.open(n,r,s),"undefined"!=typeof e(this).data("hashchange")?e(this).data("hashchange"):void 0}),this},open:function(t,n,a){return o=this,e(".popup.is-open").length&&o.close(e(".popup.is-open")),"undefined"!=typeof t&&t.length>1&&"#"!==t.substr(0,1)&&(t="#"+t),r=null,s=[],"undefined"==typeof t&&i.hashChange&&window.location.hash.length>1?r=window.location.hash:"undefined"!=typeof t&&"#"==t.substr(0,1)&&(r=t),null!==r&&r.indexOf("/")>=0&&(s=r.split("/")),t=r,s.length&&(t=s[0],s=s.slice(1)),"undefined"!=typeof t&&null!==t&&("#"==t.substr(0,1)&&(t=t.substr(1)),e("#tpl-"+t).length&&(t="tpl-"+t),"undefined"==typeof n&&(n=i.overlay.enable),"undefined"==typeof a&&(a=i.bodyclass),(e("#"+t).hasClass("popup")||e("#"+t).length&&"SCRIPT"==e("#"+t).get(0).tagName)&&o.show(t,n,a)),this},notification:function(n,s){o=this,clearTimeout(t),a.find("#alert-popup-notification").length||(r=e(template(i.template.notification,{title:n,text:s})),r.addClass("temp"),r.attr("id","alert-popup-notification"),a.append(r),o.show(r,!1,!1)),t=setTimeout(function(){r.removeClass("animate"),setTimeout(function(){r.remove()},300)},2500)},message:function(t,n,s){o=this,r=e(template(i.template.message,{title:t,text:n,btn:s||null})),r.addClass("temp"),a.append(r),r.css(this._getPosition(r)),o.show(r)},error:function(t,n){o=this,r=e(template(i.template.error,{title:t,text:n})),r.addClass("temp"),a.append(r),r.css(this._getPosition(r)),o.show(r)},init:function(e,t){if(i.triggerClass=e,"undefined"!=typeof t)for(var n in t)"undefined"!=typeof i[n]&&(i[n]=t[n]);this.open(),this.clicks(e),this.hooks()}}}(jQuery),function(e){e.fn.selectbox=function(){e(this).each(function(){function t(){var t=n.find("option"),o=t.filter(":selected"),r=t.filter(":first").text();o.length&&(r=o.text());var s="";for(i=0;i<t.length;i++){var a="",u="",l=' class="disabled"';t.eq(i).is(":selected")&&(a=' class="selected sel"'),t.eq(i).is(":disabled")&&(a=l),i==t.length-1&&(""==a?a=' class="last-child"':u=" last-child"),s+="<li"+a+u+">"+t.eq(i).text()+"</li>"}var c=e('<span class="selectbox" style="display:inline-block;position:relative"><div class="select" style="float:left;position:relative;z-index:10000"><div class="text">'+r+'</div><b class="trigger"><i class="arrow"></i></b></div><div class="dropdown" style="position:absolute;z-index:9999;overflow:auto;overflow-x:hidden;list-style:none"><ul>'+s+"</ul></div></span>");n.before(c).css({position:"absolute",top:-9999});var d=c.find("div.select"),f=c.find("div.text"),p=c.find("div.dropdown"),h=p.find("li"),g=c.outerHeight();"auto"==p.css("left")&&p.css({left:0}),"auto"==p.css("top")&&p.css({top:g});var m=h.outerHeight(),v=p.css("top");p.hide(),c.removeClass("selectbox-active"),d.click(function(){var t=c.offset().top,n=e(window).height()-g-(t-e(window).scrollTop());return 0>n||6*m>n?(p.height("auto").css({top:"auto",bottom:v}),p.outerHeight()>t-e(window).scrollTop()-20&&p.height(Math.floor((t-e(window).scrollTop()-20)/m)*m)):n>6*m&&(p.height("auto").css({bottom:"auto",top:v}),p.outerHeight()>n-20&&p.height(Math.floor((n-20)/m)*m)),e("span.selectbox").css({zIndex:1}).removeClass("focused"),c.css({zIndex:2}),p.is(":hidden")?(e("div.dropdown:visible").hide(),p.show(),c.addClass("selectbox-active")):(p.hide(),c.removeClass("selectbox-active")),!1}),h.hover(function(){e(this).siblings().removeClass("selected")});var y=h.filter(".selected").text();h.filter(":not(.disabled)").click(function(){var i=e(this).text();return y!=i&&(e(this).addClass("selected sel").siblings().removeClass("selected sel"),t.removeAttr("selected").eq(e(this).index()).attr("selected",!0),y=i,f.text(i),n.change()),p.hide(),c.removeClass("selectbox-active"),!1}),p.mouseout(function(){p.find("li.sel").addClass("selected")}),n.focus(function(){e("span.selectbox").removeClass("focused"),c.addClass("focused")}).keyup(function(){f.text(t.filter(":selected").text()),h.removeClass("selected sel").eq(t.filter(":selected").index()).addClass("selected sel")}),e(document).on("click",function(t){e(t.target).parents().hasClass("selectbox")||(p.hide().find("li.sel").addClass("selected"),c.removeClass("selectbox-active"),c.removeClass("focused"))})}var n=e(this);n.prev("span.selectbox").length<1&&(t(),n.on("refresh",function(){n.prev().remove(),t()}))})}}(jQuery),!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){"use strict";function t(t,n){var i=this;i.element=t,i.el=e(t),i.suggestions=[],i.badQueries=[],i.selectedIndex=-1,i.currentValue=i.element.value,i.intervalId=0,i.cachedResponse={},i.enrichmentCache={},i.currentRequest=null,i.inputPhase=e.Deferred(),i.fetchPhase=e.Deferred(),i.enrichPhase=e.Deferred(),i.onChangeTimeout=null,i.triggering={},i.$wrapper=null,i.options=e.extend({},c,n),i.classes={hint:"suggestions-hint",mobile:"suggestions-mobile",nowrap:"suggestions-nowrap",selected:"suggestions-selected",suggestion:"suggestions-suggestion",subtext:"suggestions-subtext",subtext_inline:"suggestions-subtext suggestions-subtext_inline",subtext_delimiter:"suggestions-subtext-delimiter",subtext_label:"suggestions-subtext suggestions-subtext_label",removeConstraint:"suggestions-remove",value:"suggestions-value"},i.disabled=!1,i.selection=null,i.$viewport=e(window),i.$body=e(document.body),i.type=null,i.status={},i.setupElement(),i.initializer=e.Deferred(),i.el.is(":visible")?i.initializer.resolve():i.deferInitialization(),i.initializer.done(e.proxy(i.initialize,i))}var n={ENTER:13,ESC:27,TAB:9,SPACE:32,UP:38,DOWN:40},i={},o=".suggestions",r="suggestions",s="\\s\"'~\\*\\.,:\\|\\[\\]\\(\\)\\{\\}<>№",a=new RegExp("["+s+"]+","g"),u="\\-\\+\\/\\\\\\?!@#$%^&",l=new RegExp("["+u+"]+","g"),c={autoSelectFirst:!1,serviceUrl:null,onSearchStart:e.noop,onSearchComplete:e.noop,onSearchError:e.noop,onSelect:null,onSelectNothing:null,onInvalidateSelection:null,minChars:1,deferRequestBy:100,params:{},paramName:"query",timeout:3e3,formatResult:null,formatSelected:null,noCache:!1,containerClass:"suggestions-suggestions",tabDisabled:!1,triggerSelectOnSpace:!1,triggerSelectOnEnter:!0,triggerSelectOnBlur:!0,preventBadQueries:!1,hint:"Выберите вариант или продолжите ввод",type:null,requestMode:"suggest",count:5,$helpers:null,headers:null,scrollOnFocus:!0,mobileWidth:980,initializeInterval:100},d={chains:{},on:function(e,t){return this.get(e).push(t),this},get:function(e){var t=this.chains;return t[e]||(t[e]=[])}},f=function(){var t=0;return{escapeRegExChars:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},escapeHtml:function(t){var n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"};return t&&e.each(n,function(e,n){t=t.replace(new RegExp(e,"g"),n)}),t},getDefaultType:function(){return e.support.cors?"POST":"GET"},getDefaultContentType:function(){return e.support.cors?"application/json":"application/x-www-form-urlencoded"},fixURLProtocol:function(t){return e.support.cors?t:t.replace(/^https?:/,location.protocol)},addUrlParams:function(t,n){return t+(/\?/.test(t)?"&":"?")+e.param(n)},serialize:function(t){return e.support.cors?JSON.stringify(t):e.param(t,!0)},compact:function(t){return e.grep(t,function(e){return!!e})},delay:function(e,t){return setTimeout(e,t||0)},uniqueId:function(e){return(e||"")+ ++t},slice:function(e,t){return Array.prototype.slice.call(e,t)},areSame:function n(t,i){var o=!0;return typeof t!=typeof i?!1:"object"==typeof t&&null!=t&&null!=i?(e.each(t,function(e,t){return o=n(t,i[e])}),o):t===i},arrayMinus:function(t,n){return n?e.grep(t,function(t,i){return-1===e.inArray(t,n)}):t},getWords:function(e,t){e=e.replace(/(\d+)([а-яА-ЯёЁ]{2,})/g,"$1 $2").replace(/([а-яА-ЯёЁ]+)(\d+)/g,"$1 $2");var n=this.compact(e.split(a)),i=n.pop(),o=this.arrayMinus(n,t);return o.push(i),o},normalize:function(e,t){var n=this;return n.getWords(e,t).join(" ")},stringEncloses:function(e,t){return e.length>t.length&&-1!==e.indexOf(t)},fieldsNotEmpty:function(t,n){if(!e.isPlainObject(t))return!1;var i=!0;return e.each(n,function(e,n){return i=!!t[n]}),i},getDeepValue:function i(e,t){var n=t.split("."),o=n.shift();return e&&(n.length?i(e[o],n.join(".")):e[o])},reWordExtractor:function(){return new RegExp("([^"+s+"]*)(["+s+"]*)","g")},formatToken:function(e){return e&&e.toLowerCase().replace(/[ёЁ]/g,"е")},withSubTokens:function(t){var n=[];return e.each(t,function(e,t){var i=t.split(l);n.push(t),i.length>1&&(n=n.concat(f.compact(i)))}),n}}}(),p=function(){function t(t){return function(n){if(0===n.length)return!1;if(1===n.length)return!0;var i=t(n[0].value),o=e.grep(n,function(e){return 0===t(e.value).indexOf(i)},!0);return 0===o.length}}var n=t(function(e){return e}),i=t(function(e){return e.replace(/, (?:д|вл|двлд|к) .+$/,"")});return{matchByNormalizedQuery:function(t,n){var i=t.toLowerCase(),o=this&&this.stopwords,r=f.normalize(i,o),s=[];return e.each(n,function(e,t){var n=t.value.toLowerCase();return f.stringEncloses(i,n)?!1:n.indexOf(r)>0?!1:void(r===f.normalize(n,o)&&s.push(e))}),1===s.length?s[0]:-1},matchByWords:function(t,i){var o,r=this&&this.stopwords,s=t.toLowerCase(),a=[];return n(i)&&(o=f.withSubTokens(f.getWords(s,r)),e.each(i,function(e,t){var n=t.value.toLowerCase();if(f.stringEncloses(s,n))return!1;
var i=f.withSubTokens(f.getWords(n,r));0===f.arrayMinus(o,i).length&&a.push(e)})),1===a.length?a[0]:-1},matchByWordsAddress:function(t,n){var o,r=this&&this.stopwords,s=t.toLowerCase(),a=-1;return i(n)&&(o=f.withSubTokens(f.getWords(s,r)),e.each(n,function(e,t){var n=t.value.toLowerCase();if(f.stringEncloses(s,n))return!1;var i=f.withSubTokens(f.getWords(n,r));return 0===f.arrayMinus(o,i).length?(a=e,!1):void 0})),a},matchByFields:function(t,n){var i=this&&this.stopwords,o=this&&this.fieldsStopwords,r=f.withSubTokens(f.getWords(t.toLowerCase(),i)),s=[];return 1===n.length&&(o&&e.each(o,function(e,t){var i=f.getDeepValue(n[0],e),o=i&&f.withSubTokens(f.getWords(i.toLowerCase(),t));o&&o.length&&(s=s.concat(o))}),0===f.arrayMinus(r,s).length)?0:-1}}}();!function(){function t(e,t){var n=e.data&&e.data[t];return n&&new RegExp("^"+f.escapeRegExChars(n)+"(["+s+"]|$)","i").test(e.value)}function n(e,t){return a.test(t)&&!a.test(e)?t:e}function o(e,t,i,o,r){var s=this,a=s.highlightMatches(e,i,o,r),u=s.highlightMatches(t,i,o,r);return n(a,u)}var r=["ао","аобл","дом","респ","а/я","аал","автодорога","аллея","арбан","аул","б-р","берег","бугор","вал","вл","волость","въезд","высел","г","городок","гск","д","двлд","днп","дор","дп","ж/д_будка","ж/д_казарм","ж/д_оп","ж/д_платф","ж/д_пост","ж/д_рзд","ж/д_ст","жилзона","жилрайон","жт","заезд","заимка","зона","к","казарма","канал","кв","кв-л","км","кольцо","комн","кордон","коса","кп","край","линия","лпх","м","массив","местность","мкр","мост","н/п","наб","нп","обл","округ","остров","оф","п","п/о","п/р","п/ст","парк","пгт","пер","переезд","пл","пл-ка","платф","погост","полустанок","починок","пр-кт","проезд","промзона","просек","просека","проселок","проток","протока","проулок","р-н","рзд","россия","рп","ряды","с","с/а","с/мо","с/о","с/п","с/с","сад","сквер","сл","снт","спуск","ст","ст-ца","стр","тер","тракт","туп","у","ул","уч-к","ф/х","ферма","х","ш","бульвар","владение","выселки","гаражно-строительный","город","деревня","домовладение","дорога","квартал","километр","комната","корпус","литер","леспромхоз","местечко","микрорайон","набережная","область","переулок","платформа","площадка","площадь","поселение","поселок","проспект","разъезд","район","республика","село","сельсовет","слобода","сооружение","станица","станция","строение","территория","тупик","улица","улус","участок","хутор","шоссе"],a=/<strong>/,u={LEGAL:[2,2,5,1],INDIVIDUAL:[2,2,6,2]};i.NAME={urlSuffix:"fio",matchers:[p.matchByNormalizedQuery,p.matchByWords],fieldNames:{surname:"фамилия",name:"имя",patronymic:"отчество"},alwaysContinueSelecting:!0,isDataComplete:function(n){var i,o=this,r=o.options.params,s=n.data;return e.isFunction(r)&&(r=r.call(o.element,n.value)),r&&r.parts?i=e.map(r.parts,function(e){return e.toLowerCase()}):(i=["surname","name"],t(n,"surname")&&i.push("patronymic")),f.fieldsNotEmpty(s,i)},composeValue:function(e){return f.compact([e.surname,e.name,e.patronymic]).join(" ")}},i.ADDRESS={urlSuffix:"address",matchers:[e.proxy(p.matchByNormalizedQuery,{stopwords:r}),e.proxy(p.matchByWordsAddress,{stopwords:r})],boundsAvailable:["region","area","city","settlement","street","house"],boundsFields:{region:["region","region_type","region_type_full","region_with_type"],area:["area","area_type","area_type_full","area_with_type"],city:["city","city_type","city_type_full","city_with_type"],settlement:["settlement","settlement_type","settlement_type_full","settlement_with_type"],street:["street","street_type","street_type_full","street_with_type"],house:["house","house_type","house_type_full","block","block_type"]},unformattableTokens:r,enrichmentEnabled:!0,geoEnabled:!0,isDataComplete:function(t){var n=[this.bounds.to||"flat"],i=t.data;return!e.isPlainObject(i)||f.fieldsNotEmpty(i,n)},composeValue:function(e){return f.compact([e.region_with_type||f.compact([e.region,e.region_type]).join(" "),e.area_with_type||f.compact([e.area_type,e.area]).join(" "),e.city_with_type||f.compact([e.city_type,e.city]).join(" "),e.settlement_with_type||f.compact([e.settlement_type,e.settlement]).join(" "),e.street_with_type||f.compact([e.street_type,e.street]).join(" "),f.compact([e.house_type,e.house,e.block_type,e.block]).join(" "),f.compact([e.flat_type,e.flat]).join(" "),e.postal_box?"а/я "+e.postal_box:null]).join(", ")}},i.PARTY={urlSuffix:"party",matchers:[e.proxy(p.matchByFields,{fieldsStopwords:{value:null,"data.address.value":r,"data.inn":null}})],geoEnabled:!0,formatResult:function(e,t,i,a){var u=this,l=u.type.formatResultInn.call(u,i,t),c=u.highlightMatches(f.getDeepValue(i.data,"ogrn"),t,i),d=n(l,c),p=u.highlightMatches(f.getDeepValue(i.data,"management.name"),t,i),h=f.getDeepValue(i.data,"address.value")||"";return u.isMobile&&((a||(a={})).maxLength=50),e=o.call(u,e,f.getDeepValue(i.data,"name.latin"),t,i,a),e=u.wrapFormattedValue(e,i),h&&(h=h.replace(/^\d{6}( РОССИЯ)?, /i,""),h=u.isMobile?h.replace(new RegExp("^([^"+s+"]+["+s+"]+[^"+s+"]+).*"),"$1"):u.highlightMatches(h,t,i,{unformattableTokens:r})),(d||h||p)&&(e+='<div class="'+u.classes.subtext+'"><span class="'+u.classes.subtext_inline+'">'+(d||"")+"</span>"+(n(h,p)||"")+"</div>"),e},formatResultInn:function(t,n){var i,o,r=this,s=t.data&&t.data.inn,a=u[t.data&&t.data.type],l=/\d/;return s?(o=r.highlightMatches(s,n,t),a&&(o=o.split(""),i=e.map(a,function(e){for(var t,n="";e&&(t=o.shift());)n+=t,l.test(t)&&e--;return n}),o=i.join('<span class="'+r.classes.subtext_delimiter+'"></span>')+o.join("")),o):void 0}},i.EMAIL={urlSuffix:"email",matchers:[p.matchByNormalizedQuery],isQueryRequestable:function(e){return this.options.suggest_local||e.indexOf("@")>=0}},i.BANK={urlSuffix:"bank",matchers:[p.matchByWords],formatResult:function(e,t,n,i){var o=this,a=o.highlightMatches(f.getDeepValue(n.data,"bic"),t,n),u=f.getDeepValue(n.data,"address.value")||"";return e=o.highlightMatches(e,t,n,i),e=o.wrapFormattedValue(e,n),u&&(u=u.replace(/^\d{6}( РОССИЯ)?, /i,""),u=o.isMobile?u.replace(new RegExp("^([^"+s+"]+["+s+"]+[^"+s+"]+).*"),"$1"):o.highlightMatches(u,t,n,{unformattableTokens:r})),(a||u)&&(e+='<div class="'+o.classes.subtext+'"><span class="'+o.classes.subtext_inline+'">'+a+"</span>"+u+"</div>"),e},formatSelected:function(e){return f.getDeepValue(e,"data.name.payment")}},e.extend(c,{suggest_local:!0})}();var h={suggest:{defaultParams:{type:f.getDefaultType(),dataType:"json",contentType:f.getDefaultContentType()},addTypeInUrl:!0},detectAddressByIp:{defaultParams:{type:"GET",dataType:"json"},addTypeInUrl:!1},status:{defaultParams:{type:"GET",dataType:"json"},addTypeInUrl:!0},findById:{defaultParams:{type:f.getDefaultType(),dataType:"json",contentType:f.getDefaultContentType()},addTypeInUrl:!0}},g={suggest:{method:"suggest",userSelect:!0,updateValue:!0,enrichmentEnabled:!0},findById:{method:"findById",userSelect:!1,updateValue:!1,enrichmentEnabled:!1}};t.utils=f,t.defaultOptions=c,t.version="15.12.0",e.Suggestions=t,t.prototype={initialize:function(){var e=this;e.uniqueId=f.uniqueId("i"),e.createWrapper(),e.notify("initialize"),e.bindWindowEvents(),e.setOptions(),e.fixPosition()},deferInitialization:function(){var e,t=this,n="mouseover focus keydown",i=function(){t.initializer.resolve(),t.enable()};t.initializer.always(function(){t.el.off(n,i),clearInterval(e)}),t.disabled=!0,t.el.on(n,i),e=setInterval(function(){t.el.is(":visible")&&i()},t.options.initializeInterval)},isInitialized:function(){return"resolved"===this.initializer.state()},dispose:function(){var e=this;e.initializer.reject(),e.notify("dispose"),e.el.removeData(r).removeClass("suggestions-input"),e.unbindWindowEvents(),e.removeWrapper(),e.el.trigger("suggestions-dispose")},notify:function(t){var n=this,i=f.slice(arguments,1);return e.map(d.get(t),function(e){return e.apply(n,i)})},createWrapper:function(){var t=this;t.$wrapper=e('<div class="suggestions-wrapper"/>'),t.el.after(t.$wrapper),t.$wrapper.on("mousedown"+o,e.proxy(t.onMousedown,t))},removeWrapper:function(){var t=this;t.$wrapper&&t.$wrapper.remove(),e(t.options.$helpers).off(o)},onMousedown:function(t){var n=this;t.preventDefault(),n.cancelBlur=!0,f.delay(function(){delete n.cancelBlur}),0==e(t.target).closest(".ui-menu-item").length&&f.delay(function(){e(document).one("mousedown",function(t){var i=n.el.add(n.$wrapper).add(n.options.$helpers);n.options.floating&&(i=i.add(n.$container)),i=i.filter(function(){return this===t.target||e.contains(this,t.target)}),i.length||n.hide()})})},bindWindowEvents:function(){var t=this,n=e.proxy(t.fixPosition,t);t.$viewport.on("resize"+o+t.uniqueId,n).on("scroll"+o+t.uniqueId,n)},unbindWindowEvents:function(){this.$viewport.off("resize"+o+this.uniqueId).off("scroll"+o+this.uniqueId)},scrollToTop:function(){var t=this,n=t.options.scrollOnFocus;n===!0&&(n=t.el),n instanceof e&&n.length>0&&e("body,html").animate({scrollTop:n.offset().top},"fast")},setOptions:function(t){var n=this;e.extend(n.options,t),e.each({type:i,requestMode:g},function(t,i){if(n[t]=i[n.options[t]],!n[t])throw n.disable(),"`"+t+"` option is incorrect! Must be one of: "+e.map(i,function(e,t){return'"'+t+'"'}).join(", ")}),e(n.options.$helpers).off(o).on("mousedown"+o,e.proxy(n.onMousedown,n)),n.isInitialized()&&n.notify("setOptions")},fixPosition:function(t){var n,i,o=this,r={};!o.isInitialized()||t&&"scroll"==t.type&&!o.options.floating||(o.$container.appendTo(o.options.floating?o.$body:o.$wrapper),o.isMobile=o.$viewport.width()<=o.options.mobileWidth,o.notify("resetPosition"),o.el.css("paddingLeft",""),o.el.css("paddingRight",""),r.paddingLeft=parseFloat(o.el.css("paddingLeft")),r.paddingRight=parseFloat(o.el.css("paddingRight")),e.extend(r,o.el.offset()),r.borderTop="none"==o.el.css("border-top-style")?0:parseFloat(o.el.css("border-top-width")),r.borderLeft="none"==o.el.css("border-left-style")?0:parseFloat(o.el.css("border-left-width")),r.innerHeight=o.el.innerHeight(),r.innerWidth=o.el.innerWidth(),r.outerHeight=o.el.outerHeight(),r.componentsLeft=0,r.componentsRight=0,n=o.$wrapper.offset(),i={top:r.top-n.top,left:r.left-n.left},o.notify("fixPosition",i,r),r.componentsLeft>r.paddingLeft&&o.el.css("paddingLeft",r.componentsLeft+"px"),r.componentsRight>r.paddingRight&&o.el.css("paddingRight",r.componentsRight+"px"))},clearCache:function(){this.cachedResponse={},this.enrichmentCache={},this.badQueries=[]},clear:function(){var e=this;e.isInitialized()&&(e.clearCache(),e.currentValue="",e.selection=null,e.hide(),e.suggestions=[],e.el.val(""),e.el.trigger("suggestions-clear"),e.notify("clear"))},disable:function(){var e=this;e.disabled=!0,e.abortRequest(),e.visible&&e.hide()},enable:function(){this.disabled=!1},isUnavailable:function(){return this.disabled},update:function(){var e=this,t=e.el.val();e.isInitialized()&&(e.currentValue=t,e.isQueryRequestable(t)?e.updateSuggestions(t):e.hide())},setSuggestion:function(t){var n,i,o=this;e.isPlainObject(t)&&e.isPlainObject(t.data)&&(t=e.extend(!0,{},t),o.bounds.own.length&&(o.checkValueBounds(t),n=o.copyBoundedData(t.data,o.bounds.all),t.data.kladr_id&&(n.kladr_id=o.getBoundedKladrId(t.data.kladr_id,o.bounds.all)),t.data=n),i=o.getSuggestionValue(t)||"",o.currentValue=i,o.el.val(i),o.selection=t,o.suggestions=[t],o.abortRequest())},fixData:function(){var t=this,n=t.extendedCurrentValue(),i=t.el.val(),o=e.Deferred();o.done(function(e){t.selectSuggestion(e,0,i,{hasBeenEnriched:!0})}).fail(function(){t.selection=null,t.currentValue="",t.el.val(t.currentValue)}),t.isQueryRequestable(n)?(t.currentValue=n,t.getSuggestions(n,{count:1,from_bound:null,to_bound:null}).done(function(e){var t=e[0];t?o.resolve(t):o.reject()}).fail(function(){o.reject()})):o.reject()},extendedCurrentValue:function(){var t=this,n=t.getParentInstance(),i=n&&n.extendedCurrentValue(),o=e.trim(t.el.val());return f.compact([i,o]).join(" ")},getAjaxParams:function(n,i){var o=this,r=e.trim(o.options.token),s=o.options.serviceUrl,a=h[n],u=e.extend({timeout:o.options.timeout},a.defaultParams),l={};return/\/$/.test(s)||(s+="/"),s+=n,a.addTypeInUrl&&(s+="/"+o.type.urlSuffix),s=f.fixURLProtocol(s),e.support.cors?(r&&(l.Authorization="Token "+r),l["X-Version"]=t.version,u.headers||(u.headers={}),e.extend(u.headers,o.options.headers,l)):(r&&(l.token=r),l.version=t.version,s=f.addUrlParams(s,l)),u.url=s,e.extend(u,i)},isQueryRequestable:function(e){var t,n=this;return t=e.length>=n.options.minChars,t&&n.type.isQueryRequestable&&(t=n.type.isQueryRequestable.call(n,e)),t},constructRequestParams:function(t,n){var i=this,o=i.options,r=e.isFunction(o.params)?o.params.call(i.element,t):e.extend({},o.params);return i.type.constructRequestParams&&e.extend(r,i.type.constructRequestParams.call(i)),e.each(i.notify("requestParams"),function(t,n){e.extend(r,n)}),r[o.paramName]=t,e.isNumeric(o.count)&&o.count>0&&(r.count=o.count),e.extend(r,n)},updateSuggestions:function(e){var t=this;t.fetchPhase=t.getSuggestions(e).done(function(n){t.assignSuggestions(n,e)})},getSuggestions:function(t,n,i){var o,r=this,s=r.options,a=i&&i.noCallbacks,u=i&&i.useEnrichmentCache,l=r.constructRequestParams(t,n),c=e.param(l||{}),d=e.Deferred();return o=r.cachedResponse[c],o&&e.isArray(o.suggestions)?d.resolve(o.suggestions):r.isBadQuery(t)?d.reject():a||s.onSearchStart.call(r.element,l)!==!1?r.doGetSuggestions(l).done(function(e){r.processResponse(e)&&t==r.currentValue?(s.noCache||(u?r.enrichmentCache[t]=e.suggestions[0]:(r.enrichResponse(e,t),r.cachedResponse[c]=e,s.preventBadQueries&&0===e.suggestions.length&&r.badQueries.push(t))),d.resolve(e.suggestions)):d.reject(),a||s.onSearchComplete.call(r.element,t,e.suggestions)}).fail(function(e,n,i){d.reject(),a||"abort"===n||s.onSearchError.call(r.element,t,e,n,i)}):d.reject(),d},doGetSuggestions:function(t){var n=this,i=e.ajax(n.getAjaxParams(n.requestMode.method,{data:f.serialize(t)}));return n.abortRequest(),n.currentRequest=i,n.notify("request"),i.always(function(){n.currentRequest=null,n.notify("request")}),i},isBadQuery:function(t){if(!this.options.preventBadQueries)return!1;var n=!1;return e.each(this.badQueries,function(e,i){return!(n=0===t.indexOf(i))}),n},abortRequest:function(){var e=this;e.currentRequest&&e.currentRequest.abort()},processResponse:function(t){var n=this;return t&&e.isArray(t.suggestions)?(n.verifySuggestionsFormat(t.suggestions),n.setUnrestrictedValues(t.suggestions),!0):!1},verifySuggestionsFormat:function(t){"string"==typeof t[0]&&e.each(t,function(e,n){t[e]={value:n,data:null}})},getSuggestionValue:function(t){var n,i=this,o=i.options.formatSelected||i.type.formatSelected;return e.isFunction(o)&&(n=o.call(i,t)),("string"!=typeof n||0==n.length)&&(n=t.value),n},assignSuggestions:function(e,t){var n=this;n.suggestions=e,n.notify("assignSuggestions",t)},shouldRestrictValues:function(){var e=this;return e.options.restrict_value&&e.constraints&&1==Object.keys(e.constraints).length},setUnrestrictedValues:function(t){var n=this,i=n.shouldRestrictValues(),o=n.getFirstConstraintLabel();e.each(t,function(e,t){t.unrestricted_value=i?o+", "+t.value:t.value})},areSuggestionsSame:function(e,t){return e&&t&&e.value===t.value&&f.areSame(e.data,t.data)}},function(){var i={setupElement:function(){this.el.attr("autocomplete","off").addClass("suggestions-input").css("box-sizing","border-box")},bindElementEvents:function(){var t=this;t.el.on("keydown"+o,e.proxy(t.onElementKeyDown,t)),t.el.on(["keyup"+o,"cut"+o,"paste"+o,"input"+o].join(" "),e.proxy(t.onElementKeyUp,t)),t.el.on("blur"+o,e.proxy(t.onElementBlur,t)),t.el.on("focus"+o,e.proxy(t.onElementFocus,t))},unbindElementEvents:function(){this.el.off(o)},onElementBlur:function(){var e=this;return e.cancelBlur?void(e.cancelBlur=!1):(e.options.triggerSelectOnBlur?e.isUnavailable()||e.selectCurrentValue({noSpace:!0}).always(function(){e.hide()}):e.hide(),void(e.fetchPhase.abort&&e.fetchPhase.abort()))},onElementFocus:function(){var t=this;t.cancelFocus||f.delay(e.proxy(t.completeOnFocus,t)),t.cancelFocus=!1},onElementKeyDown:function(e){var t=this;if(!t.isUnavailable())if(t.visible){switch(e.which){case n.ESC:t.el.val(t.currentValue),t.hide(),t.abortRequest();break;case n.TAB:if(t.options.tabDisabled===!1)return;break;case n.ENTER:t.options.triggerSelectOnEnter&&t.selectCurrentValue();break;case n.SPACE:return void(t.options.triggerSelectOnSpace&&t.isCursorAtEnd()&&(e.preventDefault(),t.selectCurrentValue({continueSelecting:!0,dontEnrich:!0}).fail(function(){t.currentValue+=" ",t.el.val(t.currentValue),t.proceedChangedValue()})));case n.UP:t.moveUp();break;case n.DOWN:t.moveDown();break;default:return}e.stopImmediatePropagation(),e.preventDefault()}else switch(e.which){case n.DOWN:t.suggest();break;case n.ENTER:t.options.triggerSelectOnEnter&&t.triggerOnSelectNothing()}},onElementKeyUp:function(e){var t=this;if(!t.isUnavailable()){switch(e.which){case n.UP:case n.DOWN:case n.ENTER:return}clearTimeout(t.onChangeTimeout),t.inputPhase.reject(),t.currentValue!==t.el.val()&&t.proceedChangedValue()}},proceedChangedValue:function(){var t=this;t.abortRequest(),t.inputPhase=e.Deferred().done(e.proxy(t.onValueChange,t)),t.options.deferRequestBy>0?t.onChangeTimeout=f.delay(function(){t.inputPhase.resolve()},t.options.deferRequestBy):t.inputPhase.resolve()},onValueChange:function(){var e,t=this;t.selection&&(e=t.selection,t.selection=null,t.trigger("InvalidateSelection",e)),t.selectedIndex=-1,t.update(),t.notify("valueChange")},completeOnFocus:function(){var e=this;e.isUnavailable()||e.isElementFocused()&&(e.fixPosition(),e.update(),e.isMobile&&(e.setCursorAtEnd(),e.scrollToTop()))},isElementFocused:function(){return document.activeElement===this.element},isCursorAtEnd:function(){var e,t,n=this,i=n.el.val().length;try{if(e=n.element.selectionStart,"number"==typeof e)return e===i}catch(o){}return document.selection?(t=document.selection.createRange(),t.moveStart("character",-i),i===t.text.length):!0},setCursorAtEnd:function(){var e=this.element;try{e.selectionEnd=e.selectionStart=e.value.length,e.scrollLeft=e.scrollWidth}catch(t){e.value=e.value}}};e.extend(t.prototype,i),d.on("initialize",i.bindElementEvents).on("dispose",i.unbindElementEvents)}(),function(){function n(){e.each(i,function(){this.abort()}),i={}}var i={};n();var o={checkStatus:function(){function t(t){e.isFunction(n.options.onSearchError)&&n.options.onSearchError.call(n.element,null,s,"error",t)}var n=this,o=e.trim(n.options.token),r=n.options.type+o,s=i[r];s||(s=i[r]=e.ajax(n.getAjaxParams("status"))),s.done(function(i){i.search?e.extend(n.status,i):t("Service Unavailable")}).fail(function(){t(s.statusText)})}};t.resetTokens=n,e.extend(t.prototype,o),d.on("setOptions",o.checkStatus)}(),function(){function n(){i=null,t.defaultOptions.geoLocation=o}if("GET"!=f.getDefaultType()){var i,o=!0,r={checkLocation:function(){var t=this,n=t.options.geoLocation;t.type.geoEnabled&&n&&(t.geoLocation=e.Deferred(),e.isPlainObject(n)||e.isArray(n)?t.geoLocation.resolve(n):(i||(i=e.ajax(t.getAjaxParams("detectAddressByIp"))),i.done(function(e){var n=e&&e.location&&e.location.data;n&&n.kladr_id?t.geoLocation.resolve(n):t.geoLocation.reject()}).fail(function(){t.geoLocation.reject()})))},getGeoLocation:function(){return this.geoLocation},constructParams:function(){var t=this,n={};return t.geoLocation&&e.isFunction(t.geoLocation.promise)&&"resolved"==t.geoLocation.state()&&t.geoLocation.done(function(t){n.locations_boost=e.makeArray(t)}),n}};e.extend(c,{geoLocation:o}),e.extend(t,{resetLocation:n}),e.extend(t.prototype,{getGeoLocation:r.getGeoLocation}),d.on("setOptions",r.checkLocation).on("requestParams",r.constructParams)}}(),function(){var n={enrichSuggestion:function(t,n){var i=this,o=e.trim(i.options.token),r=e.Deferred();return!i.status.enrich||!i.type.enrichmentEnabled||!i.requestMode.enrichmentEnabled||!o||n&&n.dontEnrich?r.resolve(t):t.data&&null!=t.data.qc?r.resolve(t):(i.disableDropdown(),i.currentValue=t.value,i.enrichPhase=i.getSuggestions(t.value,{count:1},{noCallbacks:!0,useEnrichmentCache:!0}).always(function(){i.enableDropdown()}).done(function(e){var n=e&&e[0];r.resolve(n||t,!!n)}).fail(function(){r.resolve(t)}),r)},enrichResponse:function(t,n){var i=this,o=i.enrichmentCache[n];o&&e.each(t.suggestions,function(e,i){return i.value===n?(t.suggestions[e]=o,!1):void 0})}};e.extend(t.prototype,n)}(),function(){function n(t){return e.map(t,function(e){var t=f.escapeHtml(e.text);return t&&e.matched&&(t="<strong>"+t+"</strong>"),t}).join("")}function i(t,n){var i=t.split(", ");return 1===i.length?t:e.map(i,function(e){return'<span class="'+n+'">'+e+"</span>"}).join(", ")}function r(t,n){var i=!1;return e.each(t,function(e,t){return i=t.value==n.value&&t!=n,i?!1:void 0}),i}var s={width:"auto",floating:!1},l={createContainer:function(){var t=this,n="."+t.classes.suggestion,i=t.options,r=e("<div/>").addClass(i.containerClass).css({position:"absolute",display:"none"});t.$container=r,r.on("click"+o,n,e.proxy(t.onSuggestionClick,t))},removeContainer:function(){var e=this;e.options.floating&&e.$container.remove()},setContainerOptions:function(){var t=this,n="mousedown"+o;t.$container.off(n),t.options.floating&&t.$container.on(n,e.proxy(t.onMousedown,t))},onSuggestionClick:function(t){var n,i=this,o=e(t.target);if(!i.dropdownDisabled){for(;o.length&&!(n=o.attr("data-index"));)o=o.closest("."+i.classes.suggestion);n&&!isNaN(n)&&i.select(+n)}i.cancelFocus=!0,i.el.focus()},setDropdownPosition:function(e,t){var n,i=this;i.isMobile?n={left:e.left-t.left+"px",top:e.top+t.outerHeight+"px",width:i.$viewport.width()+"px"}:(n=i.options.floating?{left:t.left+"px",top:t.top+t.borderTop+t.innerHeight+"px"}:{left:e.left+"px",top:e.top+t.borderTop+t.innerHeight+"px"},f.delay(function(){var e=i.options.width;"auto"===e&&(e=i.el.outerWidth()),i.$container.outerWidth(e)})),i.$container.toggleClass(i.classes.mobile,i.isMobile).css(n),i.containerItemsPadding=t.left+t.borderLeft+t.paddingLeft},setItemsPositions:function(){var e=this,t=e.getSuggestionsItems();t.css("paddingLeft",e.isMobile?e.containerItemsPadding+"px":"")},getSuggestionsItems:function(){return this.$container.children("."+this.classes.suggestion)},toggleDropdownEnabling:function(e){this.dropdownDisabled=!e,this.$container.attr("disabled",!e)},disableDropdown:function(){this.toggleDropdownEnabling(!1)},enableDropdown:function(){this.toggleDropdownEnabling(!0)},hasSuggestionsToChoose:function(){var t=this;return t.suggestions.length>1||1===t.suggestions.length&&(!t.selection||e.trim(t.suggestions[0].value)!==e.trim(t.selection.value))},suggest:function(){var t,n,i=this,o=i.options;if(i.requestMode.userSelect){if(!i.hasSuggestionsToChoose())return void i.hide();t=o.formatResult||i.type.formatResult||i.formatResult,n=[],!i.isMobile&&o.hint&&i.suggestions.length&&n.push('<div class="'+i.classes.hint+'">'+o.hint+"</div>"),i.selectedIndex=-1,e.each(i.suggestions,function(e,o){var r=i.makeSuggestionLabel(i.suggestions,o);o==i.selection&&(i.selectedIndex=e),n.push('<div class="'+i.classes.suggestion+'" data-index="'+e+'">'),n.push(t.call(i,o.value,i.currentValue,o,{unformattableTokens:i.type.unformattableTokens})),r&&n.push('<span class="'+i.classes.subtext_label+'">'+f.escapeHtml(r)+"</span>"),n.push("</div>")}),i.$container.html(n.join("")),o.autoSelectFirst&&-1===i.selectedIndex&&(i.selectedIndex=0),-1!==i.selectedIndex&&i.getSuggestionsItems().eq(i.selectedIndex).addClass(i.classes.selected),e.isFunction(o.beforeRender)&&o.beforeRender.call(i.element,i.$container),i.$container.show(),i.visible=!0,i.fixPosition(),i.setItemsPositions()}},wrapFormattedValue:function(e,t){var n=this,i=f.getDeepValue(t.data,"state.status");return'<span class="'+n.classes.value+'"'+(i?' data-suggestion-status="'+i+'"':"")+">"+e+"</span>"},formatResult:function(e,t,n,i){var o=this;return e=o.highlightMatches(e,t,n,i),o.wrapFormattedValue(e,n)},highlightMatches:function(t,o,r,s){var l,c,d,p,h,g,m,v=this,y=[],b=s&&s.unformattableTokens,x=s&&s.maxLength,w=f.reWordExtractor();if(!t)return"";for(l=f.formatToken(o).split(a),l=f.withSubTokens(l),c=e.map(l,function(e){return new RegExp("^((.*)(["+u+"]+))?("+f.escapeRegExChars(e)+")([^"+u+"]*["+u+"]*)","i")});(d=w.exec(t))&&d[0];)p=d[1],y.push({text:p,inUpperCase:p.toLowerCase()!==p,formatted:f.formatToken(p),matchable:!0}),d[2]&&y.push({text:d[2]});for(h=0;h<y.length;h++)g=y[h],!g.matchable||g.matched||-1!==e.inArray(g.formatted,b)&&!g.inUpperCase||e.each(c,function(e,t){var n,i=t.exec(g.formatted),o=h+1;return i?(i={before:i[1]||"",beforeText:i[2]||"",beforeDelimiter:i[3]||"",text:i[4]||"",after:i[5]||""},i.before&&(y.splice(h,0,{text:g.text.substr(0,i.beforeText.length),formatted:i.beforeText,matchable:!0},{text:i.beforeDelimiter}),o+=2,n=i.before.length,g.text=g.text.substr(n),g.formatted=g.formatted.substr(n),h--),n=i.text.length+i.after.length,g.formatted.length>n&&(y.splice(o,0,{text:g.text.substr(n),formatted:g.formatted.substr(n),matchable:!0}),g.text=g.text.substr(0,n),g.formatted=g.formatted.substr(0,n)),i.after&&(n=i.text.length,y.splice(o,0,{text:g.text.substr(n),formatted:g.formatted.substr(n)}),g.text=g.text.substr(0,n),g.formatted=g.formatted.substr(0,n)),g.matched=!0,!1):void 0});if(x){for(h=0;h<y.length&&x>=0;h++)g=y[h],x-=g.text.length,0>x&&(g.text=g.text.substr(0,g.text.length+x)+"...");y.length=h}return m=n(y),i(m,v.classes.nowrap)},makeSuggestionLabel:function(t,n){var i,o,s=this,a=s.type.fieldNames,u={},l=f.reWordExtractor(),c=[];if(a&&r(t,n)&&n.data&&(e.each(a,function(e){var t=n.data[e];t&&(u[e]=f.formatToken(t))}),!e.isEmptyObject(u))){for(;(i=l.exec(f.formatToken(n.value)))&&(o=i[1]);)e.each(u,function(e,t){return t==o?(c.push(a[e]),delete u[e],!1):void 0});if(c.length)return c.join(", ")}},hide:function(){var e=this;e.visible=!1,e.selectedIndex=-1,e.$container.hide().empty()},activate:function(e){var t,n,i=this,o=i.classes.selected;return!i.dropdownDisabled&&(n=i.getSuggestionsItems(),n.removeClass(o),i.selectedIndex=e,-1!==i.selectedIndex&&n.length>i.selectedIndex)?(t=n.eq(i.selectedIndex),t.addClass(o),t):null},deactivate:function(e){var t=this;t.dropdownDisabled||(t.selectedIndex=-1,t.getSuggestionsItems().removeClass(t.classes.selected),e&&t.el.val(t.currentValue))},moveUp:function(){var e=this;return e.dropdownDisabled?void 0:-1===e.selectedIndex?void(e.suggestions.length&&e.adjustScroll(e.suggestions.length-1)):0===e.selectedIndex?void e.deactivate(!0):void e.adjustScroll(e.selectedIndex-1)},moveDown:function(){var e=this;return e.dropdownDisabled?void 0:e.selectedIndex===e.suggestions.length-1?void e.deactivate(!0):void e.adjustScroll(e.selectedIndex+1)},adjustScroll:function(e){var t,n,i,o=this,r=o.activate(e),s=o.$container.scrollTop();r&&r.length&&(t=r.position().top,0>t?o.$container.scrollTop(s+t):(n=t+r.outerHeight(),i=o.$container.innerHeight(),n>i&&o.$container.scrollTop(s-i+n)),o.el.val(o.suggestions[e].value))}};e.extend(c,s),e.extend(t.prototype,l),d.on("initialize",l.createContainer).on("dispose",l.removeContainer).on("setOptions",l.setContainerOptions).on("fixPosition",l.setDropdownPosition).on("fixPosition",l.setItemsPositions).on("assignSuggestions",l.suggest)}(),function(){var t="addon",n=50,i=1e3,o={addon:null},r={NONE:"none",SPINNER:"spinner",CLEAR:"clear"},s=function(t){var n=this,i=e('<span class="suggestions-addon"/>');n.owner=t,n.$el=i,n.type=r.NONE,n.visible=!1,n.initialPadding=null,i.on("click",e.proxy(n,"onClick"))};s.prototype={checkType:function(){var t=this,n=t.owner.options.addon,i=!1;e.each(r,function(e,t){return i=t==n,i?!1:void 0}),i||(n=t.owner.isMobile?r.CLEAR:r.SPINNER),n!=t.type&&(t.type=n,t.$el.attr("data-addon-type",n),t.toggle(!0))},toggle:function(e){var t,n=this;switch(n.type){case r.CLEAR:t=!!n.owner.currentValue;break;case r.SPINNER:t=!!n.owner.currentRequest;break;default:t=!1}t!=n.visible&&(n.visible=t,t?n.show(e):n.hide(e))},show:function(e){var t=this,i={opacity:1};e?(t.$el.show().css(i),t.showBackground(!0)):t.$el.stop(!0,!0).delay(n).queue(function(){t.$el.show(),t.showBackground(),t.$el.dequeue()}).animate(i,"fast")},hide:function(e){var t=this,n={opacity:0};e&&t.$el.hide().css(n),t.$el.stop(!0).animate(n,{duration:"fast",complete:function(){t.$el.hide(),t.hideBackground()}})},fixPosition:function(e,t){var n=this,i=t.innerHeight;n.checkType(),n.$el.css({left:e.left+t.borderLeft+t.innerWidth-i+"px",top:e.top+t.borderTop+"px",height:i,width:i}),n.initialPadding=t.paddingRight,n.width=i,n.visible&&(t.componentsRight+=i)},showBackground:function(e){var n=this,i=n.owner.el,o={paddingRight:n.width};n.width>n.initialPadding&&(n.stopBackground(),e?i.css(o):i.animate(o,{duration:"fast",queue:t}).dequeue(t))},hideBackground:function(e){var n=this,o=n.owner.el,r={paddingRight:n.initialPadding};n.width>n.initialPadding&&(n.stopBackground(!0),e?o.css(r):o.delay(i,t).animate(r,{duration:"fast",queue:t}).dequeue(t))},stopBackground:function(e){this.owner.el.stop(t,!0,e)},onClick:function(e){var t=this;t.type==r.CLEAR&&t.owner.clear()}};var a={createAddon:function(){var e=this,t=new s(e);e.$wrapper.append(t.$el),e.addon=t},fixAddonPosition:function(e,t){this.addon.fixPosition(e,t)},checkAddonType:function(){this.addon.checkType()},checkAddonVisibility:function(){this.addon.toggle()},stopBackground:function(){this.addon.stopBackground()}};e.extend(c,o),d.on("initialize",a.createAddon).on("setOptions",a.checkAddonType).on("fixPosition",a.fixAddonPosition).on("clear",a.checkAddonVisibility).on("valueChange",a.checkAddonVisibility).on("request",a.checkAddonVisibility).on("resetPosition",a.stopBackground)}(),function(){function n(t){var n={};return e.isPlainObject(t)&&e.each(t,function(e,t){t&&r.indexOf(e)>=0&&(n[e]=t)}),e.isEmptyObject(n)?void 0:n.kladr_id?{kladr_id:n.kladr_id}:n}function i(t,n){var i=n.selection,o=i&&i.data&&n.bounds;return o&&e.each(n.bounds.all,function(e,n){return o=i.data[n]===t.data[n]}),o}var o={constraints:null,restrict_value:!1},r=["kladr_id","postal_code","country","region","area","city","settlement","street"],s={createConstraints:function(){var t=this;t.constraints={},t.$constraints=e('<ul class="suggestions-constraints"/>'),t.$wrapper.append(t.$constraints),t.$constraints.on("click","."+t.classes.removeConstraint,e.proxy(t.onConstraintRemoveClick,t))},setConstraintsPosition:function(e,t){var n=this;n.$constraints.css({left:e.left+t.borderLeft+t.paddingLeft+"px",top:e.top+t.borderTop+Math.round((t.innerHeight-n.$constraints.height())/2)+"px"}),t.componentsLeft+=n.$constraints.outerWidth(!0)+t.paddingLeft},onConstraintRemoveClick:function(t){var n=this,i=e(t.target).closest("li"),o=i.attr("data-constraint-id");delete n.constraints[o],n.update(),i.fadeOut("fast",function(){n.removeConstraint(o)})},setupConstraints:function(){var t,n=this,i=n.options.constraints;return i?void(i instanceof e||"string"==typeof i||"number"==typeof i.nodeType?(t=e(i),t.is(n.constraints)||(n.unbindFromParent(),t.is(n.el)||(n.constraints=t,n.bindToParent()))):(n._constraintsUpdating=!0,e.each(n.constraints,e.proxy(n.removeConstraint,n)),e.each(e.makeArray(i),function(e,t){n.addConstraint(t)}),n._constraintsUpdating=!1,n.fixPosition())):void n.unbindFromParent()},formatConstraint:function(t){var i,o=this;return t&&(t.locations||t.restrictions)?(i=e.makeArray(t.locations||t.restrictions),null==t.label&&o.type.composeValue&&(t.label=e.map(i,function(e){return o.type.composeValue(e)}).join(", ")),t.locations=[],e.each(i,function(e,i){var o=n(i);o&&t.locations.push(o)}),t.locations.length?t:null):void 0},addConstraint:function(t){var n,i,o=this;t=o.formatConstraint(t),t&&(i=f.uniqueId("c"),o.constraints[i]=t,t.label&&(n=e("<li/>").append(e("<span/>").text(t.label)).attr("data-constraint-id",i),t.deletable&&n.append(e('<span class="suggestions-remove"/>')),o.$constraints.append(n),o._constraintsUpdating||o.fixPosition()))},removeConstraint:function(e){var t=this;delete t.constraints[e],t.$constraints.children('[data-constraint-id="'+e+'"]').remove(),t._constraintsUpdating||t.fixPosition()},constructConstraintsParams:function(){for(var t,i,o=this,r=[],s=o.constraints,a={};s instanceof e&&(t=s.suggestions())&&!(i=f.getDeepValue(t,"selection.data"));)s=t.constraints;return s instanceof e?(i=n(i),i&&(a.locations=[i],
a.restrict_value=!0)):s&&(e.each(s,function(e,t){r=r.concat(t.locations)}),r.length&&(a.locations=r,a.restrict_value=o.options.restrict_value)),a},getFirstConstraintLabel:function(){var t=this,n=e.isPlainObject(t.constraints)&&Object.keys(t.constraints)[0];return n?t.constraints[n].label:""},bindToParent:function(){var t=this;t.constraints.on(["suggestions-select."+t.uniqueId,"suggestions-invalidateselection."+t.uniqueId,"suggestions-clear."+t.uniqueId].join(" "),e.proxy(t.onParentSelectionChanged,t)).on("suggestions-dispose."+t.uniqueId,e.proxy(t.onParentDispose,t))},unbindFromParent:function(){var t=this,n=t.constraints;n instanceof e&&n.off("."+t.uniqueId)},onParentSelectionChanged:function(e,t,n){("suggestions-select"!==e.type||n)&&this.clear()},onParentDispose:function(e){this.unbindFromParent()},getParentInstance:function(){return this.constraints instanceof e&&this.constraints.suggestions()},shareWithParent:function(e){var t=this.getParentInstance();t&&t.type===this.type&&!i(e,t)&&(t.shareWithParent(e),t.setSuggestion(e))}};e.extend(c,o),e.extend(t.prototype,s),"GET"!=f.getDefaultType()&&d.on("initialize",s.createConstraints).on("setOptions",s.setupConstraints).on("fixPosition",s.setConstraintsPosition).on("requestParams",s.constructConstraintsParams).on("dispose",s.unbindFromParent)}(),function(){var n={proceedQuery:function(e){var t=this;e.length>=t.options.minChars?t.updateSuggestions(e):t.hide()},selectCurrentValue:function(t){var n=this,i=e.Deferred();return n.inputPhase.resolve(),n.fetchPhase.done(function(){var e;n.selection&&!n.visible?i.reject():(e=n.findSuggestionIndex(),n.select(e,t),-1===e?i.reject():i.resolve(e))}).fail(function(){i.reject()}),i},selectFoundSuggestion:function(){var e=this;e.requestMode.userSelect||e.select(0)},findSuggestionIndex:function(){var t,n=this,i=n.selectedIndex;return-1===i&&(t=e.trim(n.el.val()),t&&e.each(n.type.matchers,function(e,o){return i=o(t,n.suggestions),-1===i})),i},select:function(t,n){var i=this,o=i.suggestions[t],r=n&&n.continueSelecting,s=i.currentValue;return i.triggering.Select?void 0:o?void i.enrichSuggestion(o,n).done(function(o,r){i.selectSuggestion(o,t,s,e.extend({hasBeenEnriched:r},n))}):(r||i.selection||i.triggerOnSelectNothing(),void i.onSelectComplete(r))},selectSuggestion:function(e,t,n,i){var o=this,r=i.continueSelecting,s=!o.type.isDataComplete||o.type.isDataComplete.call(o,e),a=o.selection;o.triggering.Select||(o.type.alwaysContinueSelecting&&(r=!0),s&&(r=!1),i.hasBeenEnriched&&(o.suggestions[t]=e),o.requestMode.updateValue&&(o.checkValueBounds(e),o.currentValue=o.getSuggestionValue(e),!o.currentValue||i.noSpace||s||(o.currentValue+=" "),o.el.val(o.currentValue)),o.currentValue?(o.selection=e,o.areSuggestionsSame(e,a)||o.trigger("Select",e,o.currentValue!=n),o.requestMode.userSelect&&o.onSelectComplete(r)):(o.selection=null,o.triggerOnSelectNothing()),o.shareWithParent(e))},onSelectComplete:function(e){var t=this;e?(t.selectedIndex=-1,t.updateSuggestions(t.currentValue)):t.hide()},triggerOnSelectNothing:function(){var e=this;e.triggering.SelectNothing||e.trigger("SelectNothing",e.currentValue)},trigger:function(t){var n=this,i=f.slice(arguments,1),o=n.options["on"+t];n.triggering[t]=!0,e.isFunction(o)&&o.apply(n.element,i),n.el.trigger.call(n.el,"suggestions-"+t.toLowerCase(),i),n.triggering[t]=!1}};e.extend(t.prototype,n),d.on("assignSuggestions",n.selectFoundSuggestion)}(),function(){var t={bounds:null},n={region:{digits:2,zeros:11},area:{digits:5,zeros:8},city:{digits:8,zeros:5},settlement:{digits:11,zeros:2},street:{digits:15,zeros:2},house:{digits:19}},i={setupBounds:function(){this.bounds={from:null,to:null}},setBoundsOptions:function(){var t,n,i=this,o=i.type.boundsAvailable,r=e.trim(i.options.bounds).split("-"),s=r[0],a=r[r.length-1],u=[],l=[];-1===e.inArray(s,o)&&(s=null),n=e.inArray(a,o),(-1===n||n===o.length-1)&&(a=null),(s||a)&&(t=!s,e.each(o,function(e,n){return n==s&&(t=!0),l.push(n),t&&u.push(n),n==a?!1:void 0})),i.bounds.from=s,i.bounds.to=a,i.bounds.all=l,i.bounds.own=u},constructBoundsParams:function(){var e=this,t={};return e.bounds.from&&(t.from_bound={value:e.bounds.from}),e.bounds.to&&(t.to_bound={value:e.bounds.to}),t},checkValueBounds:function(e){var t,n=this;n.bounds.own.length&&n.type.composeValue&&(t=n.copyBoundedData(e.data,n.bounds.own),e.value=n.type.composeValue(t))},copyBoundedData:function(t,n){var i={},o=this.type.boundsFields;return o&&e.each(n,function(n,r){var s=o[r];s&&e.each(s,function(e,n){null!=t[n]&&(i[n]=t[n])})}),i},getBoundedKladrId:function(e,t){var i=t[t.length-1],o=n[i],r=e.substr(0,o.digits);return o.zeros&&(r+=new Array(o.zeros+1).join("0")),r}};e.extend(c,t),e.extend(e.Suggestions.prototype,i),d.on("initialize",i.setupBounds).on("setOptions",i.setBoundsOptions).on("requestParams",i.constructBoundsParams)}(),e.fn.suggestions=function(n,i){return 0===arguments.length?this.first().data(r):this.each(function(){var o=e(this),s=o.data(r);"string"==typeof n?s&&"function"==typeof s[n]&&s[n](i):(s&&s.dispose&&s.dispose(),s=new t(this,n),o.data(r,s))})}});;
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
;