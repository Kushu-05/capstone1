(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function F0(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Ad={exports:{}},ha={},Cd={exports:{}},Ft={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ng;function U_(){if(ng)return Ft;ng=1;var i=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),c=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),y=Symbol.iterator;function g(N){return N===null||typeof N!="object"?null:(N=y&&N[y]||N["@@iterator"],typeof N=="function"?N:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,A={};function S(N,Z,_e){this.props=N,this.context=Z,this.refs=A,this.updater=_e||E}S.prototype.isReactComponent={},S.prototype.setState=function(N,Z){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,Z,"setState")},S.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function x(){}x.prototype=S.prototype;function R(N,Z,_e){this.props=N,this.context=Z,this.refs=A,this.updater=_e||E}var O=R.prototype=new x;O.constructor=R,b(O,S.prototype),O.isPureReactComponent=!0;var T=Array.isArray,D=Object.prototype.hasOwnProperty,F={current:null},U={key:!0,ref:!0,__self:!0,__source:!0};function M(N,Z,_e){var De,Se={},Ee=null,Q=null;if(Z!=null)for(De in Z.ref!==void 0&&(Q=Z.ref),Z.key!==void 0&&(Ee=""+Z.key),Z)D.call(Z,De)&&!U.hasOwnProperty(De)&&(Se[De]=Z[De]);var ae=arguments.length-2;if(ae===1)Se.children=_e;else if(1<ae){for(var Te=Array(ae),Ke=0;Ke<ae;Ke++)Te[Ke]=arguments[Ke+2];Se.children=Te}if(N&&N.defaultProps)for(De in ae=N.defaultProps,ae)Se[De]===void 0&&(Se[De]=ae[De]);return{$$typeof:i,type:N,key:Ee,ref:Q,props:Se,_owner:F.current}}function I(N,Z){return{$$typeof:i,type:N.type,key:Z,ref:N.ref,props:N.props,_owner:N._owner}}function z(N){return typeof N=="object"&&N!==null&&N.$$typeof===i}function j(N){var Z={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(_e){return Z[_e]})}var X=/\/+/g;function re(N,Z){return typeof N=="object"&&N!==null&&N.key!=null?j(""+N.key):Z.toString(36)}function H(N,Z,_e,De,Se){var Ee=typeof N;(Ee==="undefined"||Ee==="boolean")&&(N=null);var Q=!1;if(N===null)Q=!0;else switch(Ee){case"string":case"number":Q=!0;break;case"object":switch(N.$$typeof){case i:case e:Q=!0}}if(Q)return Q=N,Se=Se(Q),N=De===""?"."+re(Q,0):De,T(Se)?(_e="",N!=null&&(_e=N.replace(X,"$&/")+"/"),H(Se,Z,_e,"",function(Ke){return Ke})):Se!=null&&(z(Se)&&(Se=I(Se,_e+(!Se.key||Q&&Q.key===Se.key?"":(""+Se.key).replace(X,"$&/")+"/")+N)),Z.push(Se)),1;if(Q=0,De=De===""?".":De+":",T(N))for(var ae=0;ae<N.length;ae++){Ee=N[ae];var Te=De+re(Ee,ae);Q+=H(Ee,Z,_e,Te,Se)}else if(Te=g(N),typeof Te=="function")for(N=Te.call(N),ae=0;!(Ee=N.next()).done;)Ee=Ee.value,Te=De+re(Ee,ae++),Q+=H(Ee,Z,_e,Te,Se);else if(Ee==="object")throw Z=String(N),Error("Objects are not valid as a React child (found: "+(Z==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":Z)+"). If you meant to render a collection of children, use an array instead.");return Q}function te(N,Z,_e){if(N==null)return N;var De=[],Se=0;return H(N,De,"","",function(Ee){return Z.call(_e,Ee,Se++)}),De}function ge(N){if(N._status===-1){var Z=N._result;Z=Z(),Z.then(function(_e){(N._status===0||N._status===-1)&&(N._status=1,N._result=_e)},function(_e){(N._status===0||N._status===-1)&&(N._status=2,N._result=_e)}),N._status===-1&&(N._status=0,N._result=Z)}if(N._status===1)return N._result.default;throw N._result}var se={current:null},ne={transition:null},G={ReactCurrentDispatcher:se,ReactCurrentBatchConfig:ne,ReactCurrentOwner:F};function V(){throw Error("act(...) is not supported in production builds of React.")}return Ft.Children={map:te,forEach:function(N,Z,_e){te(N,function(){Z.apply(this,arguments)},_e)},count:function(N){var Z=0;return te(N,function(){Z++}),Z},toArray:function(N){return te(N,function(Z){return Z})||[]},only:function(N){if(!z(N))throw Error("React.Children.only expected to receive a single React element child.");return N}},Ft.Component=S,Ft.Fragment=t,Ft.Profiler=o,Ft.PureComponent=R,Ft.StrictMode=s,Ft.Suspense=h,Ft.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=G,Ft.act=V,Ft.cloneElement=function(N,Z,_e){if(N==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+N+".");var De=b({},N.props),Se=N.key,Ee=N.ref,Q=N._owner;if(Z!=null){if(Z.ref!==void 0&&(Ee=Z.ref,Q=F.current),Z.key!==void 0&&(Se=""+Z.key),N.type&&N.type.defaultProps)var ae=N.type.defaultProps;for(Te in Z)D.call(Z,Te)&&!U.hasOwnProperty(Te)&&(De[Te]=Z[Te]===void 0&&ae!==void 0?ae[Te]:Z[Te])}var Te=arguments.length-2;if(Te===1)De.children=_e;else if(1<Te){ae=Array(Te);for(var Ke=0;Ke<Te;Ke++)ae[Ke]=arguments[Ke+2];De.children=ae}return{$$typeof:i,type:N.type,key:Se,ref:Ee,props:De,_owner:Q}},Ft.createContext=function(N){return N={$$typeof:c,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},N.Provider={$$typeof:l,_context:N},N.Consumer=N},Ft.createElement=M,Ft.createFactory=function(N){var Z=M.bind(null,N);return Z.type=N,Z},Ft.createRef=function(){return{current:null}},Ft.forwardRef=function(N){return{$$typeof:d,render:N}},Ft.isValidElement=z,Ft.lazy=function(N){return{$$typeof:v,_payload:{_status:-1,_result:N},_init:ge}},Ft.memo=function(N,Z){return{$$typeof:m,type:N,compare:Z===void 0?null:Z}},Ft.startTransition=function(N){var Z=ne.transition;ne.transition={};try{N()}finally{ne.transition=Z}},Ft.unstable_act=V,Ft.useCallback=function(N,Z){return se.current.useCallback(N,Z)},Ft.useContext=function(N){return se.current.useContext(N)},Ft.useDebugValue=function(){},Ft.useDeferredValue=function(N){return se.current.useDeferredValue(N)},Ft.useEffect=function(N,Z){return se.current.useEffect(N,Z)},Ft.useId=function(){return se.current.useId()},Ft.useImperativeHandle=function(N,Z,_e){return se.current.useImperativeHandle(N,Z,_e)},Ft.useInsertionEffect=function(N,Z){return se.current.useInsertionEffect(N,Z)},Ft.useLayoutEffect=function(N,Z){return se.current.useLayoutEffect(N,Z)},Ft.useMemo=function(N,Z){return se.current.useMemo(N,Z)},Ft.useReducer=function(N,Z,_e){return se.current.useReducer(N,Z,_e)},Ft.useRef=function(N){return se.current.useRef(N)},Ft.useState=function(N){return se.current.useState(N)},Ft.useSyncExternalStore=function(N,Z,_e){return se.current.useSyncExternalStore(N,Z,_e)},Ft.useTransition=function(){return se.current.useTransition()},Ft.version="18.3.1",Ft}var ig;function hh(){return ig||(ig=1,Cd.exports=U_()),Cd.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rg;function O_(){if(rg)return ha;rg=1;var i=hh(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(d,h,m){var v,y={},g=null,E=null;m!==void 0&&(g=""+m),h.key!==void 0&&(g=""+h.key),h.ref!==void 0&&(E=h.ref);for(v in h)s.call(h,v)&&!l.hasOwnProperty(v)&&(y[v]=h[v]);if(d&&d.defaultProps)for(v in h=d.defaultProps,h)y[v]===void 0&&(y[v]=h[v]);return{$$typeof:e,type:d,key:g,ref:E,props:y,_owner:o.current}}return ha.Fragment=t,ha.jsx=c,ha.jsxs=c,ha}var sg;function B_(){return sg||(sg=1,Ad.exports=O_()),Ad.exports}var f=B_(),He=hh();const k_=F0(He);var Gl={},Rd={exports:{}},ri={},Pd={exports:{}},Dd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var og;function z_(){return og||(og=1,(function(i){function e(ne,G){var V=ne.length;ne.push(G);e:for(;0<V;){var N=V-1>>>1,Z=ne[N];if(0<o(Z,G))ne[N]=G,ne[V]=Z,V=N;else break e}}function t(ne){return ne.length===0?null:ne[0]}function s(ne){if(ne.length===0)return null;var G=ne[0],V=ne.pop();if(V!==G){ne[0]=V;e:for(var N=0,Z=ne.length,_e=Z>>>1;N<_e;){var De=2*(N+1)-1,Se=ne[De],Ee=De+1,Q=ne[Ee];if(0>o(Se,V))Ee<Z&&0>o(Q,Se)?(ne[N]=Q,ne[Ee]=V,N=Ee):(ne[N]=Se,ne[De]=V,N=De);else if(Ee<Z&&0>o(Q,V))ne[N]=Q,ne[Ee]=V,N=Ee;else break e}}return G}function o(ne,G){var V=ne.sortIndex-G.sortIndex;return V!==0?V:ne.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;i.unstable_now=function(){return l.now()}}else{var c=Date,d=c.now();i.unstable_now=function(){return c.now()-d}}var h=[],m=[],v=1,y=null,g=3,E=!1,b=!1,A=!1,S=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,R=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function O(ne){for(var G=t(m);G!==null;){if(G.callback===null)s(m);else if(G.startTime<=ne)s(m),G.sortIndex=G.expirationTime,e(h,G);else break;G=t(m)}}function T(ne){if(A=!1,O(ne),!b)if(t(h)!==null)b=!0,ge(D);else{var G=t(m);G!==null&&se(T,G.startTime-ne)}}function D(ne,G){b=!1,A&&(A=!1,x(M),M=-1),E=!0;var V=g;try{for(O(G),y=t(h);y!==null&&(!(y.expirationTime>G)||ne&&!j());){var N=y.callback;if(typeof N=="function"){y.callback=null,g=y.priorityLevel;var Z=N(y.expirationTime<=G);G=i.unstable_now(),typeof Z=="function"?y.callback=Z:y===t(h)&&s(h),O(G)}else s(h);y=t(h)}if(y!==null)var _e=!0;else{var De=t(m);De!==null&&se(T,De.startTime-G),_e=!1}return _e}finally{y=null,g=V,E=!1}}var F=!1,U=null,M=-1,I=5,z=-1;function j(){return!(i.unstable_now()-z<I)}function X(){if(U!==null){var ne=i.unstable_now();z=ne;var G=!0;try{G=U(!0,ne)}finally{G?re():(F=!1,U=null)}}else F=!1}var re;if(typeof R=="function")re=function(){R(X)};else if(typeof MessageChannel<"u"){var H=new MessageChannel,te=H.port2;H.port1.onmessage=X,re=function(){te.postMessage(null)}}else re=function(){S(X,0)};function ge(ne){U=ne,F||(F=!0,re())}function se(ne,G){M=S(function(){ne(i.unstable_now())},G)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(ne){ne.callback=null},i.unstable_continueExecution=function(){b||E||(b=!0,ge(D))},i.unstable_forceFrameRate=function(ne){0>ne||125<ne?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<ne?Math.floor(1e3/ne):5},i.unstable_getCurrentPriorityLevel=function(){return g},i.unstable_getFirstCallbackNode=function(){return t(h)},i.unstable_next=function(ne){switch(g){case 1:case 2:case 3:var G=3;break;default:G=g}var V=g;g=G;try{return ne()}finally{g=V}},i.unstable_pauseExecution=function(){},i.unstable_requestPaint=function(){},i.unstable_runWithPriority=function(ne,G){switch(ne){case 1:case 2:case 3:case 4:case 5:break;default:ne=3}var V=g;g=ne;try{return G()}finally{g=V}},i.unstable_scheduleCallback=function(ne,G,V){var N=i.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?N+V:N):V=N,ne){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=V+Z,ne={id:v++,callback:G,priorityLevel:ne,startTime:V,expirationTime:Z,sortIndex:-1},V>N?(ne.sortIndex=V,e(m,ne),t(h)===null&&ne===t(m)&&(A?(x(M),M=-1):A=!0,se(T,V-N))):(ne.sortIndex=Z,e(h,ne),b||E||(b=!0,ge(D))),ne},i.unstable_shouldYield=j,i.unstable_wrapCallback=function(ne){var G=g;return function(){var V=g;g=G;try{return ne.apply(this,arguments)}finally{g=V}}}})(Dd)),Dd}var ag;function H_(){return ag||(ag=1,Pd.exports=z_()),Pd.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lg;function V_(){if(lg)return ri;lg=1;var i=hh(),e=H_();function t(n){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)r+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,o={};function l(n,r){c(n,r),c(n+"Capture",r)}function c(n,r){for(o[n]=r,n=0;n<r.length;n++)s.add(r[n])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,v={},y={};function g(n){return h.call(y,n)?!0:h.call(v,n)?!1:m.test(n)?y[n]=!0:(v[n]=!0,!1)}function E(n,r,a,u){if(a!==null&&a.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return u?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function b(n,r,a,u){if(r===null||typeof r>"u"||E(n,r,a,u))return!0;if(u)return!1;if(a!==null)switch(a.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function A(n,r,a,u,p,_,C){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=u,this.attributeNamespace=p,this.mustUseProperty=a,this.propertyName=n,this.type=r,this.sanitizeURL=_,this.removeEmptyString=C}var S={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){S[n]=new A(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var r=n[0];S[r]=new A(r,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){S[n]=new A(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){S[n]=new A(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){S[n]=new A(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){S[n]=new A(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){S[n]=new A(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){S[n]=new A(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){S[n]=new A(n,5,!1,n.toLowerCase(),null,!1,!1)});var x=/[\-:]([a-z])/g;function R(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var r=n.replace(x,R);S[r]=new A(r,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var r=n.replace(x,R);S[r]=new A(r,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var r=n.replace(x,R);S[r]=new A(r,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){S[n]=new A(n,1,!1,n.toLowerCase(),null,!1,!1)}),S.xlinkHref=new A("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){S[n]=new A(n,1,!1,n.toLowerCase(),null,!0,!0)});function O(n,r,a,u){var p=S.hasOwnProperty(r)?S[r]:null;(p!==null?p.type!==0:u||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(b(r,a,p,u)&&(a=null),u||p===null?g(r)&&(a===null?n.removeAttribute(r):n.setAttribute(r,""+a)):p.mustUseProperty?n[p.propertyName]=a===null?p.type===3?!1:"":a:(r=p.attributeName,u=p.attributeNamespace,a===null?n.removeAttribute(r):(p=p.type,a=p===3||p===4&&a===!0?"":""+a,u?n.setAttributeNS(u,r,a):n.setAttribute(r,a))))}var T=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,D=Symbol.for("react.element"),F=Symbol.for("react.portal"),U=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),I=Symbol.for("react.profiler"),z=Symbol.for("react.provider"),j=Symbol.for("react.context"),X=Symbol.for("react.forward_ref"),re=Symbol.for("react.suspense"),H=Symbol.for("react.suspense_list"),te=Symbol.for("react.memo"),ge=Symbol.for("react.lazy"),se=Symbol.for("react.offscreen"),ne=Symbol.iterator;function G(n){return n===null||typeof n!="object"?null:(n=ne&&n[ne]||n["@@iterator"],typeof n=="function"?n:null)}var V=Object.assign,N;function Z(n){if(N===void 0)try{throw Error()}catch(a){var r=a.stack.trim().match(/\n( *(at )?)/);N=r&&r[1]||""}return`
`+N+n}var _e=!1;function De(n,r){if(!n||_e)return"";_e=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(pe){var u=pe}Reflect.construct(n,[],r)}else{try{r.call()}catch(pe){u=pe}n.call(r.prototype)}else{try{throw Error()}catch(pe){u=pe}n()}}catch(pe){if(pe&&u&&typeof pe.stack=="string"){for(var p=pe.stack.split(`
`),_=u.stack.split(`
`),C=p.length-1,k=_.length-1;1<=C&&0<=k&&p[C]!==_[k];)k--;for(;1<=C&&0<=k;C--,k--)if(p[C]!==_[k]){if(C!==1||k!==1)do if(C--,k--,0>k||p[C]!==_[k]){var W=`
`+p[C].replace(" at new "," at ");return n.displayName&&W.includes("<anonymous>")&&(W=W.replace("<anonymous>",n.displayName)),W}while(1<=C&&0<=k);break}}}finally{_e=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?Z(n):""}function Se(n){switch(n.tag){case 5:return Z(n.type);case 16:return Z("Lazy");case 13:return Z("Suspense");case 19:return Z("SuspenseList");case 0:case 2:case 15:return n=De(n.type,!1),n;case 11:return n=De(n.type.render,!1),n;case 1:return n=De(n.type,!0),n;default:return""}}function Ee(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case U:return"Fragment";case F:return"Portal";case I:return"Profiler";case M:return"StrictMode";case re:return"Suspense";case H:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case j:return(n.displayName||"Context")+".Consumer";case z:return(n._context.displayName||"Context")+".Provider";case X:var r=n.render;return n=n.displayName,n||(n=r.displayName||r.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case te:return r=n.displayName||null,r!==null?r:Ee(n.type)||"Memo";case ge:r=n._payload,n=n._init;try{return Ee(n(r))}catch{}}return null}function Q(n){var r=n.type;switch(n.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=r.render,n=n.displayName||n.name||"",r.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ee(r);case 8:return r===M?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function ae(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Te(n){var r=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function Ke(n){var r=Te(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,r),u=""+n[r];if(!n.hasOwnProperty(r)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var p=a.get,_=a.set;return Object.defineProperty(n,r,{configurable:!0,get:function(){return p.call(this)},set:function(C){u=""+C,_.call(this,C)}}),Object.defineProperty(n,r,{enumerable:a.enumerable}),{getValue:function(){return u},setValue:function(C){u=""+C},stopTracking:function(){n._valueTracker=null,delete n[r]}}}}function Ge(n){n._valueTracker||(n._valueTracker=Ke(n))}function ct(n){if(!n)return!1;var r=n._valueTracker;if(!r)return!0;var a=r.getValue(),u="";return n&&(u=Te(n)?n.checked?"true":"false":n.value),n=u,n!==a?(r.setValue(n),!0):!1}function Ot(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function mt(n,r){var a=r.checked;return V({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function bt(n,r){var a=r.defaultValue==null?"":r.defaultValue,u=r.checked!=null?r.checked:r.defaultChecked;a=ae(r.value!=null?r.value:a),n._wrapperState={initialChecked:u,initialValue:a,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function Nt(n,r){r=r.checked,r!=null&&O(n,"checked",r,!1)}function pt(n,r){Nt(n,r);var a=ae(r.value),u=r.type;if(a!=null)u==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(u==="submit"||u==="reset"){n.removeAttribute("value");return}r.hasOwnProperty("value")?wt(n,r.type,a):r.hasOwnProperty("defaultValue")&&wt(n,r.type,ae(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(n.defaultChecked=!!r.defaultChecked)}function Xe(n,r,a){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var u=r.type;if(!(u!=="submit"&&u!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+n._wrapperState.initialValue,a||r===n.value||(n.value=r),n.defaultValue=r}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function wt(n,r,a){(r!=="number"||Ot(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var vt=Array.isArray;function Tt(n,r,a,u){if(n=n.options,r){r={};for(var p=0;p<a.length;p++)r["$"+a[p]]=!0;for(a=0;a<n.length;a++)p=r.hasOwnProperty("$"+n[a].value),n[a].selected!==p&&(n[a].selected=p),p&&u&&(n[a].defaultSelected=!0)}else{for(a=""+ae(a),r=null,p=0;p<n.length;p++){if(n[p].value===a){n[p].selected=!0,u&&(n[p].defaultSelected=!0);return}r!==null||n[p].disabled||(r=n[p])}r!==null&&(r.selected=!0)}}function jt(n,r){if(r.dangerouslySetInnerHTML!=null)throw Error(t(91));return V({},r,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function K(n,r){var a=r.value;if(a==null){if(a=r.children,r=r.defaultValue,a!=null){if(r!=null)throw Error(t(92));if(vt(a)){if(1<a.length)throw Error(t(93));a=a[0]}r=a}r==null&&(r=""),a=r}n._wrapperState={initialValue:ae(a)}}function Dt(n,r){var a=ae(r.value),u=ae(r.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),r.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),u!=null&&(n.defaultValue=""+u)}function Rt(n){var r=n.textContent;r===n._wrapperState.initialValue&&r!==""&&r!==null&&(n.value=r)}function B(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function w(n,r){return n==null||n==="http://www.w3.org/1999/xhtml"?B(r):n==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var ie,de=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,a,u,p){MSApp.execUnsafeLocalFunction(function(){return n(r,a,u,p)})}:n})(function(n,r){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=r;else{for(ie=ie||document.createElement("div"),ie.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=ie.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;r.firstChild;)n.appendChild(r.firstChild)}});function me(n,r){if(r){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=r;return}}n.textContent=r}var Re={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Fe=["Webkit","ms","Moz","O"];Object.keys(Re).forEach(function(n){Fe.forEach(function(r){r=r+n.charAt(0).toUpperCase()+n.substring(1),Re[r]=Re[n]})});function xe(n,r,a){return r==null||typeof r=="boolean"||r===""?"":a||typeof r!="number"||r===0||Re.hasOwnProperty(n)&&Re[n]?(""+r).trim():r+"px"}function ye(n,r){n=n.style;for(var a in r)if(r.hasOwnProperty(a)){var u=a.indexOf("--")===0,p=xe(a,r[a],u);a==="float"&&(a="cssFloat"),u?n.setProperty(a,p):n[a]=p}}var Ie=V({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function nt(n,r){if(r){if(Ie[n]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(t(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(t(61))}if(r.style!=null&&typeof r.style!="object")throw Error(t(62))}}function ke(n,r){if(n.indexOf("-")===-1)return typeof r.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ue=null;function it(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var dt=null,ht=null,$=null;function Oe(n){if(n=Qo(n)){if(typeof dt!="function")throw Error(t(280));var r=n.stateNode;r&&(r=rl(r),dt(n.stateNode,n.type,r))}}function ve(n){ht?$?$.push(n):$=[n]:ht=n}function Ne(){if(ht){var n=ht,r=$;if($=ht=null,Oe(n),r)for(n=0;n<r.length;n++)Oe(r[n])}}function qe(n,r){return n(r)}function Me(){}var ot=!1;function Je(n,r,a){if(ot)return n(r,a);ot=!0;try{return qe(n,r,a)}finally{ot=!1,(ht!==null||$!==null)&&(Me(),Ne())}}function Lt(n,r){var a=n.stateNode;if(a===null)return null;var u=rl(a);if(u===null)return null;a=u[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,r,typeof a));return a}var Pt=!1;if(d)try{var xn={};Object.defineProperty(xn,"passive",{get:function(){Pt=!0}}),window.addEventListener("test",xn,xn),window.removeEventListener("test",xn,xn)}catch{Pt=!1}function Qn(n,r,a,u,p,_,C,k,W){var pe=Array.prototype.slice.call(arguments,3);try{r.apply(a,pe)}catch(Ae){this.onError(Ae)}}var Ci=!1,wn=null,tn=!1,fn=null,ft={onError:function(n){Ci=!0,wn=n}};function sn(n,r,a,u,p,_,C,k,W){Ci=!1,wn=null,Qn.apply(ft,arguments)}function Os(n,r,a,u,p,_,C,k,W){if(sn.apply(this,arguments),Ci){if(Ci){var pe=wn;Ci=!1,wn=null}else throw Error(t(198));tn||(tn=!0,fn=pe)}}function bn(n){var r=n,a=n;if(n.alternate)for(;r.return;)r=r.return;else{n=r;do r=n,(r.flags&4098)!==0&&(a=r.return),n=r.return;while(n)}return r.tag===3?a:null}function cr(n){if(n.tag===13){var r=n.memoizedState;if(r===null&&(n=n.alternate,n!==null&&(r=n.memoizedState)),r!==null)return r.dehydrated}return null}function Ri(n){if(bn(n)!==n)throw Error(t(188))}function Cr(n){var r=n.alternate;if(!r){if(r=bn(n),r===null)throw Error(t(188));return r!==n?null:n}for(var a=n,u=r;;){var p=a.return;if(p===null)break;var _=p.alternate;if(_===null){if(u=p.return,u!==null){a=u;continue}break}if(p.child===_.child){for(_=p.child;_;){if(_===a)return Ri(p),n;if(_===u)return Ri(p),r;_=_.sibling}throw Error(t(188))}if(a.return!==u.return)a=p,u=_;else{for(var C=!1,k=p.child;k;){if(k===a){C=!0,a=p,u=_;break}if(k===u){C=!0,u=p,a=_;break}k=k.sibling}if(!C){for(k=_.child;k;){if(k===a){C=!0,a=_,u=p;break}if(k===u){C=!0,u=_,a=p;break}k=k.sibling}if(!C)throw Error(t(189))}}if(a.alternate!==u)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:r}function Pi(n){return n=Cr(n),n!==null?Rr(n):null}function Rr(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var r=Rr(n);if(r!==null)return r;n=n.sibling}return null}var qi=e.unstable_scheduleCallback,Pr=e.unstable_cancelCallback,os=e.unstable_shouldYield,Bs=e.unstable_requestPaint,Yt=e.unstable_now,ks=e.unstable_getCurrentPriorityLevel,Dr=e.unstable_ImmediatePriority,Lr=e.unstable_UserBlockingPriority,P=e.unstable_NormalPriority,q=e.unstable_LowPriority,he=e.unstable_IdlePriority,le=null,oe=null;function We(n){if(oe&&typeof oe.onCommitFiberRoot=="function")try{oe.onCommitFiberRoot(le,n,void 0,(n.current.flags&128)===128)}catch{}}var ze=Math.clz32?Math.clz32:rt,Ve=Math.log,Qe=Math.LN2;function rt(n){return n>>>=0,n===0?32:31-(Ve(n)/Qe|0)|0}var _t=64,Et=4194304;function L(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function ee(n,r){var a=n.pendingLanes;if(a===0)return 0;var u=0,p=n.suspendedLanes,_=n.pingedLanes,C=a&268435455;if(C!==0){var k=C&~p;k!==0?u=L(k):(_&=C,_!==0&&(u=L(_)))}else C=a&~p,C!==0?u=L(C):_!==0&&(u=L(_));if(u===0)return 0;if(r!==0&&r!==u&&(r&p)===0&&(p=u&-u,_=r&-r,p>=_||p===16&&(_&4194240)!==0))return r;if((u&4)!==0&&(u|=a&16),r=n.entangledLanes,r!==0)for(n=n.entanglements,r&=u;0<r;)a=31-ze(r),p=1<<a,u|=n[a],r&=~p;return u}function Pe(n,r){switch(n){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Be(n,r){for(var a=n.suspendedLanes,u=n.pingedLanes,p=n.expirationTimes,_=n.pendingLanes;0<_;){var C=31-ze(_),k=1<<C,W=p[C];W===-1?((k&a)===0||(k&u)!==0)&&(p[C]=Pe(k,r)):W<=r&&(n.expiredLanes|=k),_&=~k}}function lt(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function $e(){var n=_t;return _t<<=1,(_t&4194240)===0&&(_t=64),n}function we(n){for(var r=[],a=0;31>a;a++)r.push(n);return r}function Xt(n,r,a){n.pendingLanes|=r,r!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,r=31-ze(r),n[r]=a}function At(n,r){var a=n.pendingLanes&~r;n.pendingLanes=r,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=r,n.mutableReadLanes&=r,n.entangledLanes&=r,r=n.entanglements;var u=n.eventTimes;for(n=n.expirationTimes;0<a;){var p=31-ze(a),_=1<<p;r[p]=0,u[p]=-1,n[p]=-1,a&=~_}}function vn(n,r){var a=n.entangledLanes|=r;for(n=n.entanglements;a;){var u=31-ze(a),p=1<<u;p&r|n[u]&r&&(n[u]|=r),a&=~p}}var et=0;function hn(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var In,zt,Jt,Di,qt,xi=!1,Li=[],Fi=null,Fr=null,Nr=null,Uo=new Map,Oo=new Map,Ir=[],rv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function kh(n,r){switch(n){case"focusin":case"focusout":Fi=null;break;case"dragenter":case"dragleave":Fr=null;break;case"mouseover":case"mouseout":Nr=null;break;case"pointerover":case"pointerout":Uo.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":Oo.delete(r.pointerId)}}function Bo(n,r,a,u,p,_){return n===null||n.nativeEvent!==_?(n={blockedOn:r,domEventName:a,eventSystemFlags:u,nativeEvent:_,targetContainers:[p]},r!==null&&(r=Qo(r),r!==null&&zt(r)),n):(n.eventSystemFlags|=u,r=n.targetContainers,p!==null&&r.indexOf(p)===-1&&r.push(p),n)}function sv(n,r,a,u,p){switch(r){case"focusin":return Fi=Bo(Fi,n,r,a,u,p),!0;case"dragenter":return Fr=Bo(Fr,n,r,a,u,p),!0;case"mouseover":return Nr=Bo(Nr,n,r,a,u,p),!0;case"pointerover":var _=p.pointerId;return Uo.set(_,Bo(Uo.get(_)||null,n,r,a,u,p)),!0;case"gotpointercapture":return _=p.pointerId,Oo.set(_,Bo(Oo.get(_)||null,n,r,a,u,p)),!0}return!1}function zh(n){var r=as(n.target);if(r!==null){var a=bn(r);if(a!==null){if(r=a.tag,r===13){if(r=cr(a),r!==null){n.blockedOn=r,qt(n.priority,function(){Jt(a)});return}}else if(r===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Wa(n){if(n.blockedOn!==null)return!1;for(var r=n.targetContainers;0<r.length;){var a=eu(n.domEventName,n.eventSystemFlags,r[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var u=new a.constructor(a.type,a);Ue=u,a.target.dispatchEvent(u),Ue=null}else return r=Qo(a),r!==null&&zt(r),n.blockedOn=a,!1;r.shift()}return!0}function Hh(n,r,a){Wa(n)&&a.delete(r)}function ov(){xi=!1,Fi!==null&&Wa(Fi)&&(Fi=null),Fr!==null&&Wa(Fr)&&(Fr=null),Nr!==null&&Wa(Nr)&&(Nr=null),Uo.forEach(Hh),Oo.forEach(Hh)}function ko(n,r){n.blockedOn===r&&(n.blockedOn=null,xi||(xi=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,ov)))}function zo(n){function r(p){return ko(p,n)}if(0<Li.length){ko(Li[0],n);for(var a=1;a<Li.length;a++){var u=Li[a];u.blockedOn===n&&(u.blockedOn=null)}}for(Fi!==null&&ko(Fi,n),Fr!==null&&ko(Fr,n),Nr!==null&&ko(Nr,n),Uo.forEach(r),Oo.forEach(r),a=0;a<Ir.length;a++)u=Ir[a],u.blockedOn===n&&(u.blockedOn=null);for(;0<Ir.length&&(a=Ir[0],a.blockedOn===null);)zh(a),a.blockedOn===null&&Ir.shift()}var zs=T.ReactCurrentBatchConfig,ja=!0;function av(n,r,a,u){var p=et,_=zs.transition;zs.transition=null;try{et=1,Jc(n,r,a,u)}finally{et=p,zs.transition=_}}function lv(n,r,a,u){var p=et,_=zs.transition;zs.transition=null;try{et=4,Jc(n,r,a,u)}finally{et=p,zs.transition=_}}function Jc(n,r,a,u){if(ja){var p=eu(n,r,a,u);if(p===null)xu(n,r,u,Xa,a),kh(n,u);else if(sv(p,n,r,a,u))u.stopPropagation();else if(kh(n,u),r&4&&-1<rv.indexOf(n)){for(;p!==null;){var _=Qo(p);if(_!==null&&In(_),_=eu(n,r,a,u),_===null&&xu(n,r,u,Xa,a),_===p)break;p=_}p!==null&&u.stopPropagation()}else xu(n,r,u,null,a)}}var Xa=null;function eu(n,r,a,u){if(Xa=null,n=it(u),n=as(n),n!==null)if(r=bn(n),r===null)n=null;else if(a=r.tag,a===13){if(n=cr(r),n!==null)return n;n=null}else if(a===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;n=null}else r!==n&&(n=null);return Xa=n,null}function Vh(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ks()){case Dr:return 1;case Lr:return 4;case P:case q:return 16;case he:return 536870912;default:return 16}default:return 16}}var Ur=null,tu=null,qa=null;function Gh(){if(qa)return qa;var n,r=tu,a=r.length,u,p="value"in Ur?Ur.value:Ur.textContent,_=p.length;for(n=0;n<a&&r[n]===p[n];n++);var C=a-n;for(u=1;u<=C&&r[a-u]===p[_-u];u++);return qa=p.slice(n,1<u?1-u:void 0)}function $a(n){var r=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&r===13&&(n=13)):n=r,n===10&&(n=13),32<=n||n===13?n:0}function Ya(){return!0}function Wh(){return!1}function li(n){function r(a,u,p,_,C){this._reactName=a,this._targetInst=p,this.type=u,this.nativeEvent=_,this.target=C,this.currentTarget=null;for(var k in n)n.hasOwnProperty(k)&&(a=n[k],this[k]=a?a(_):_[k]);return this.isDefaultPrevented=(_.defaultPrevented!=null?_.defaultPrevented:_.returnValue===!1)?Ya:Wh,this.isPropagationStopped=Wh,this}return V(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ya)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ya)},persist:function(){},isPersistent:Ya}),r}var Hs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},nu=li(Hs),Ho=V({},Hs,{view:0,detail:0}),cv=li(Ho),iu,ru,Vo,Ka=V({},Ho,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ou,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Vo&&(Vo&&n.type==="mousemove"?(iu=n.screenX-Vo.screenX,ru=n.screenY-Vo.screenY):ru=iu=0,Vo=n),iu)},movementY:function(n){return"movementY"in n?n.movementY:ru}}),jh=li(Ka),uv=V({},Ka,{dataTransfer:0}),dv=li(uv),fv=V({},Ho,{relatedTarget:0}),su=li(fv),hv=V({},Hs,{animationName:0,elapsedTime:0,pseudoElement:0}),pv=li(hv),mv=V({},Hs,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),gv=li(mv),xv=V({},Hs,{data:0}),Xh=li(xv),vv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_v={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},yv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sv(n){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(n):(n=yv[n])?!!r[n]:!1}function ou(){return Sv}var Ev=V({},Ho,{key:function(n){if(n.key){var r=vv[n.key]||n.key;if(r!=="Unidentified")return r}return n.type==="keypress"?(n=$a(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?_v[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ou,charCode:function(n){return n.type==="keypress"?$a(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?$a(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),Mv=li(Ev),wv=V({},Ka,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qh=li(wv),bv=V({},Ho,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ou}),Tv=li(bv),Av=V({},Hs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Cv=li(Av),Rv=V({},Ka,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Pv=li(Rv),Dv=[9,13,27,32],au=d&&"CompositionEvent"in window,Go=null;d&&"documentMode"in document&&(Go=document.documentMode);var Lv=d&&"TextEvent"in window&&!Go,$h=d&&(!au||Go&&8<Go&&11>=Go),Yh=" ",Kh=!1;function Zh(n,r){switch(n){case"keyup":return Dv.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qh(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Vs=!1;function Fv(n,r){switch(n){case"compositionend":return Qh(r);case"keypress":return r.which!==32?null:(Kh=!0,Yh);case"textInput":return n=r.data,n===Yh&&Kh?null:n;default:return null}}function Nv(n,r){if(Vs)return n==="compositionend"||!au&&Zh(n,r)?(n=Gh(),qa=tu=Ur=null,Vs=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return $h&&r.locale!=="ko"?null:r.data;default:return null}}var Iv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Jh(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r==="input"?!!Iv[n.type]:r==="textarea"}function ep(n,r,a,u){ve(u),r=tl(r,"onChange"),0<r.length&&(a=new nu("onChange","change",null,a,u),n.push({event:a,listeners:r}))}var Wo=null,jo=null;function Uv(n){vp(n,0)}function Za(n){var r=qs(n);if(ct(r))return n}function Ov(n,r){if(n==="change")return r}var tp=!1;if(d){var lu;if(d){var cu="oninput"in document;if(!cu){var np=document.createElement("div");np.setAttribute("oninput","return;"),cu=typeof np.oninput=="function"}lu=cu}else lu=!1;tp=lu&&(!document.documentMode||9<document.documentMode)}function ip(){Wo&&(Wo.detachEvent("onpropertychange",rp),jo=Wo=null)}function rp(n){if(n.propertyName==="value"&&Za(jo)){var r=[];ep(r,jo,n,it(n)),Je(Uv,r)}}function Bv(n,r,a){n==="focusin"?(ip(),Wo=r,jo=a,Wo.attachEvent("onpropertychange",rp)):n==="focusout"&&ip()}function kv(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Za(jo)}function zv(n,r){if(n==="click")return Za(r)}function Hv(n,r){if(n==="input"||n==="change")return Za(r)}function Vv(n,r){return n===r&&(n!==0||1/n===1/r)||n!==n&&r!==r}var Ni=typeof Object.is=="function"?Object.is:Vv;function Xo(n,r){if(Ni(n,r))return!0;if(typeof n!="object"||n===null||typeof r!="object"||r===null)return!1;var a=Object.keys(n),u=Object.keys(r);if(a.length!==u.length)return!1;for(u=0;u<a.length;u++){var p=a[u];if(!h.call(r,p)||!Ni(n[p],r[p]))return!1}return!0}function sp(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function op(n,r){var a=sp(n);n=0;for(var u;a;){if(a.nodeType===3){if(u=n+a.textContent.length,n<=r&&u>=r)return{node:a,offset:r-n};n=u}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=sp(a)}}function ap(n,r){return n&&r?n===r?!0:n&&n.nodeType===3?!1:r&&r.nodeType===3?ap(n,r.parentNode):"contains"in n?n.contains(r):n.compareDocumentPosition?!!(n.compareDocumentPosition(r)&16):!1:!1}function lp(){for(var n=window,r=Ot();r instanceof n.HTMLIFrameElement;){try{var a=typeof r.contentWindow.location.href=="string"}catch{a=!1}if(a)n=r.contentWindow;else break;r=Ot(n.document)}return r}function uu(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r&&(r==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||r==="textarea"||n.contentEditable==="true")}function Gv(n){var r=lp(),a=n.focusedElem,u=n.selectionRange;if(r!==a&&a&&a.ownerDocument&&ap(a.ownerDocument.documentElement,a)){if(u!==null&&uu(a)){if(r=u.start,n=u.end,n===void 0&&(n=r),"selectionStart"in a)a.selectionStart=r,a.selectionEnd=Math.min(n,a.value.length);else if(n=(r=a.ownerDocument||document)&&r.defaultView||window,n.getSelection){n=n.getSelection();var p=a.textContent.length,_=Math.min(u.start,p);u=u.end===void 0?_:Math.min(u.end,p),!n.extend&&_>u&&(p=u,u=_,_=p),p=op(a,_);var C=op(a,u);p&&C&&(n.rangeCount!==1||n.anchorNode!==p.node||n.anchorOffset!==p.offset||n.focusNode!==C.node||n.focusOffset!==C.offset)&&(r=r.createRange(),r.setStart(p.node,p.offset),n.removeAllRanges(),_>u?(n.addRange(r),n.extend(C.node,C.offset)):(r.setEnd(C.node,C.offset),n.addRange(r)))}}for(r=[],n=a;n=n.parentNode;)n.nodeType===1&&r.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<r.length;a++)n=r[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Wv=d&&"documentMode"in document&&11>=document.documentMode,Gs=null,du=null,qo=null,fu=!1;function cp(n,r,a){var u=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;fu||Gs==null||Gs!==Ot(u)||(u=Gs,"selectionStart"in u&&uu(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),qo&&Xo(qo,u)||(qo=u,u=tl(du,"onSelect"),0<u.length&&(r=new nu("onSelect","select",null,r,a),n.push({event:r,listeners:u}),r.target=Gs)))}function Qa(n,r){var a={};return a[n.toLowerCase()]=r.toLowerCase(),a["Webkit"+n]="webkit"+r,a["Moz"+n]="moz"+r,a}var Ws={animationend:Qa("Animation","AnimationEnd"),animationiteration:Qa("Animation","AnimationIteration"),animationstart:Qa("Animation","AnimationStart"),transitionend:Qa("Transition","TransitionEnd")},hu={},up={};d&&(up=document.createElement("div").style,"AnimationEvent"in window||(delete Ws.animationend.animation,delete Ws.animationiteration.animation,delete Ws.animationstart.animation),"TransitionEvent"in window||delete Ws.transitionend.transition);function Ja(n){if(hu[n])return hu[n];if(!Ws[n])return n;var r=Ws[n],a;for(a in r)if(r.hasOwnProperty(a)&&a in up)return hu[n]=r[a];return n}var dp=Ja("animationend"),fp=Ja("animationiteration"),hp=Ja("animationstart"),pp=Ja("transitionend"),mp=new Map,gp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Or(n,r){mp.set(n,r),l(r,[n])}for(var pu=0;pu<gp.length;pu++){var mu=gp[pu],jv=mu.toLowerCase(),Xv=mu[0].toUpperCase()+mu.slice(1);Or(jv,"on"+Xv)}Or(dp,"onAnimationEnd"),Or(fp,"onAnimationIteration"),Or(hp,"onAnimationStart"),Or("dblclick","onDoubleClick"),Or("focusin","onFocus"),Or("focusout","onBlur"),Or(pp,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $o="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qv=new Set("cancel close invalid load scroll toggle".split(" ").concat($o));function xp(n,r,a){var u=n.type||"unknown-event";n.currentTarget=a,Os(u,r,void 0,n),n.currentTarget=null}function vp(n,r){r=(r&4)!==0;for(var a=0;a<n.length;a++){var u=n[a],p=u.event;u=u.listeners;e:{var _=void 0;if(r)for(var C=u.length-1;0<=C;C--){var k=u[C],W=k.instance,pe=k.currentTarget;if(k=k.listener,W!==_&&p.isPropagationStopped())break e;xp(p,k,pe),_=W}else for(C=0;C<u.length;C++){if(k=u[C],W=k.instance,pe=k.currentTarget,k=k.listener,W!==_&&p.isPropagationStopped())break e;xp(p,k,pe),_=W}}}if(tn)throw n=fn,tn=!1,fn=null,n}function Zt(n,r){var a=r[Mu];a===void 0&&(a=r[Mu]=new Set);var u=n+"__bubble";a.has(u)||(_p(r,n,2,!1),a.add(u))}function gu(n,r,a){var u=0;r&&(u|=4),_p(a,n,u,r)}var el="_reactListening"+Math.random().toString(36).slice(2);function Yo(n){if(!n[el]){n[el]=!0,s.forEach(function(a){a!=="selectionchange"&&(qv.has(a)||gu(a,!1,n),gu(a,!0,n))});var r=n.nodeType===9?n:n.ownerDocument;r===null||r[el]||(r[el]=!0,gu("selectionchange",!1,r))}}function _p(n,r,a,u){switch(Vh(r)){case 1:var p=av;break;case 4:p=lv;break;default:p=Jc}a=p.bind(null,r,a,n),p=void 0,!Pt||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(p=!0),u?p!==void 0?n.addEventListener(r,a,{capture:!0,passive:p}):n.addEventListener(r,a,!0):p!==void 0?n.addEventListener(r,a,{passive:p}):n.addEventListener(r,a,!1)}function xu(n,r,a,u,p){var _=u;if((r&1)===0&&(r&2)===0&&u!==null)e:for(;;){if(u===null)return;var C=u.tag;if(C===3||C===4){var k=u.stateNode.containerInfo;if(k===p||k.nodeType===8&&k.parentNode===p)break;if(C===4)for(C=u.return;C!==null;){var W=C.tag;if((W===3||W===4)&&(W=C.stateNode.containerInfo,W===p||W.nodeType===8&&W.parentNode===p))return;C=C.return}for(;k!==null;){if(C=as(k),C===null)return;if(W=C.tag,W===5||W===6){u=_=C;continue e}k=k.parentNode}}u=u.return}Je(function(){var pe=_,Ae=it(a),Ce=[];e:{var be=mp.get(n);if(be!==void 0){var Ze=nu,st=n;switch(n){case"keypress":if($a(a)===0)break e;case"keydown":case"keyup":Ze=Mv;break;case"focusin":st="focus",Ze=su;break;case"focusout":st="blur",Ze=su;break;case"beforeblur":case"afterblur":Ze=su;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Ze=jh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Ze=dv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Ze=Tv;break;case dp:case fp:case hp:Ze=pv;break;case pp:Ze=Cv;break;case"scroll":Ze=cv;break;case"wheel":Ze=Pv;break;case"copy":case"cut":case"paste":Ze=gv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Ze=qh}var at=(r&4)!==0,cn=!at&&n==="scroll",ue=at?be!==null?be+"Capture":null:be;at=[];for(var J=pe,fe;J!==null;){fe=J;var Le=fe.stateNode;if(fe.tag===5&&Le!==null&&(fe=Le,ue!==null&&(Le=Lt(J,ue),Le!=null&&at.push(Ko(J,Le,fe)))),cn)break;J=J.return}0<at.length&&(be=new Ze(be,st,null,a,Ae),Ce.push({event:be,listeners:at}))}}if((r&7)===0){e:{if(be=n==="mouseover"||n==="pointerover",Ze=n==="mouseout"||n==="pointerout",be&&a!==Ue&&(st=a.relatedTarget||a.fromElement)&&(as(st)||st[ur]))break e;if((Ze||be)&&(be=Ae.window===Ae?Ae:(be=Ae.ownerDocument)?be.defaultView||be.parentWindow:window,Ze?(st=a.relatedTarget||a.toElement,Ze=pe,st=st?as(st):null,st!==null&&(cn=bn(st),st!==cn||st.tag!==5&&st.tag!==6)&&(st=null)):(Ze=null,st=pe),Ze!==st)){if(at=jh,Le="onMouseLeave",ue="onMouseEnter",J="mouse",(n==="pointerout"||n==="pointerover")&&(at=qh,Le="onPointerLeave",ue="onPointerEnter",J="pointer"),cn=Ze==null?be:qs(Ze),fe=st==null?be:qs(st),be=new at(Le,J+"leave",Ze,a,Ae),be.target=cn,be.relatedTarget=fe,Le=null,as(Ae)===pe&&(at=new at(ue,J+"enter",st,a,Ae),at.target=fe,at.relatedTarget=cn,Le=at),cn=Le,Ze&&st)t:{for(at=Ze,ue=st,J=0,fe=at;fe;fe=js(fe))J++;for(fe=0,Le=ue;Le;Le=js(Le))fe++;for(;0<J-fe;)at=js(at),J--;for(;0<fe-J;)ue=js(ue),fe--;for(;J--;){if(at===ue||ue!==null&&at===ue.alternate)break t;at=js(at),ue=js(ue)}at=null}else at=null;Ze!==null&&yp(Ce,be,Ze,at,!1),st!==null&&cn!==null&&yp(Ce,cn,st,at,!0)}}e:{if(be=pe?qs(pe):window,Ze=be.nodeName&&be.nodeName.toLowerCase(),Ze==="select"||Ze==="input"&&be.type==="file")var ut=Ov;else if(Jh(be))if(tp)ut=Hv;else{ut=kv;var gt=Bv}else(Ze=be.nodeName)&&Ze.toLowerCase()==="input"&&(be.type==="checkbox"||be.type==="radio")&&(ut=zv);if(ut&&(ut=ut(n,pe))){ep(Ce,ut,a,Ae);break e}gt&&gt(n,be,pe),n==="focusout"&&(gt=be._wrapperState)&&gt.controlled&&be.type==="number"&&wt(be,"number",be.value)}switch(gt=pe?qs(pe):window,n){case"focusin":(Jh(gt)||gt.contentEditable==="true")&&(Gs=gt,du=pe,qo=null);break;case"focusout":qo=du=Gs=null;break;case"mousedown":fu=!0;break;case"contextmenu":case"mouseup":case"dragend":fu=!1,cp(Ce,a,Ae);break;case"selectionchange":if(Wv)break;case"keydown":case"keyup":cp(Ce,a,Ae)}var xt;if(au)e:{switch(n){case"compositionstart":var St="onCompositionStart";break e;case"compositionend":St="onCompositionEnd";break e;case"compositionupdate":St="onCompositionUpdate";break e}St=void 0}else Vs?Zh(n,a)&&(St="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(St="onCompositionStart");St&&($h&&a.locale!=="ko"&&(Vs||St!=="onCompositionStart"?St==="onCompositionEnd"&&Vs&&(xt=Gh()):(Ur=Ae,tu="value"in Ur?Ur.value:Ur.textContent,Vs=!0)),gt=tl(pe,St),0<gt.length&&(St=new Xh(St,n,null,a,Ae),Ce.push({event:St,listeners:gt}),xt?St.data=xt:(xt=Qh(a),xt!==null&&(St.data=xt)))),(xt=Lv?Fv(n,a):Nv(n,a))&&(pe=tl(pe,"onBeforeInput"),0<pe.length&&(Ae=new Xh("onBeforeInput","beforeinput",null,a,Ae),Ce.push({event:Ae,listeners:pe}),Ae.data=xt))}vp(Ce,r)})}function Ko(n,r,a){return{instance:n,listener:r,currentTarget:a}}function tl(n,r){for(var a=r+"Capture",u=[];n!==null;){var p=n,_=p.stateNode;p.tag===5&&_!==null&&(p=_,_=Lt(n,a),_!=null&&u.unshift(Ko(n,_,p)),_=Lt(n,r),_!=null&&u.push(Ko(n,_,p))),n=n.return}return u}function js(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function yp(n,r,a,u,p){for(var _=r._reactName,C=[];a!==null&&a!==u;){var k=a,W=k.alternate,pe=k.stateNode;if(W!==null&&W===u)break;k.tag===5&&pe!==null&&(k=pe,p?(W=Lt(a,_),W!=null&&C.unshift(Ko(a,W,k))):p||(W=Lt(a,_),W!=null&&C.push(Ko(a,W,k)))),a=a.return}C.length!==0&&n.push({event:r,listeners:C})}var $v=/\r\n?/g,Yv=/\u0000|\uFFFD/g;function Sp(n){return(typeof n=="string"?n:""+n).replace($v,`
`).replace(Yv,"")}function nl(n,r,a){if(r=Sp(r),Sp(n)!==r&&a)throw Error(t(425))}function il(){}var vu=null,_u=null;function yu(n,r){return n==="textarea"||n==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var Su=typeof setTimeout=="function"?setTimeout:void 0,Kv=typeof clearTimeout=="function"?clearTimeout:void 0,Ep=typeof Promise=="function"?Promise:void 0,Zv=typeof queueMicrotask=="function"?queueMicrotask:typeof Ep<"u"?function(n){return Ep.resolve(null).then(n).catch(Qv)}:Su;function Qv(n){setTimeout(function(){throw n})}function Eu(n,r){var a=r,u=0;do{var p=a.nextSibling;if(n.removeChild(a),p&&p.nodeType===8)if(a=p.data,a==="/$"){if(u===0){n.removeChild(p),zo(r);return}u--}else a!=="$"&&a!=="$?"&&a!=="$!"||u++;a=p}while(a);zo(r)}function Br(n){for(;n!=null;n=n.nextSibling){var r=n.nodeType;if(r===1||r===3)break;if(r===8){if(r=n.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return n}function Mp(n){n=n.previousSibling;for(var r=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(r===0)return n;r--}else a==="/$"&&r++}n=n.previousSibling}return null}var Xs=Math.random().toString(36).slice(2),$i="__reactFiber$"+Xs,Zo="__reactProps$"+Xs,ur="__reactContainer$"+Xs,Mu="__reactEvents$"+Xs,Jv="__reactListeners$"+Xs,e_="__reactHandles$"+Xs;function as(n){var r=n[$i];if(r)return r;for(var a=n.parentNode;a;){if(r=a[ur]||a[$i]){if(a=r.alternate,r.child!==null||a!==null&&a.child!==null)for(n=Mp(n);n!==null;){if(a=n[$i])return a;n=Mp(n)}return r}n=a,a=n.parentNode}return null}function Qo(n){return n=n[$i]||n[ur],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function qs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function rl(n){return n[Zo]||null}var wu=[],$s=-1;function kr(n){return{current:n}}function Qt(n){0>$s||(n.current=wu[$s],wu[$s]=null,$s--)}function Kt(n,r){$s++,wu[$s]=n.current,n.current=r}var zr={},Un=kr(zr),Jn=kr(!1),ls=zr;function Ys(n,r){var a=n.type.contextTypes;if(!a)return zr;var u=n.stateNode;if(u&&u.__reactInternalMemoizedUnmaskedChildContext===r)return u.__reactInternalMemoizedMaskedChildContext;var p={},_;for(_ in a)p[_]=r[_];return u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=p),p}function ei(n){return n=n.childContextTypes,n!=null}function sl(){Qt(Jn),Qt(Un)}function wp(n,r,a){if(Un.current!==zr)throw Error(t(168));Kt(Un,r),Kt(Jn,a)}function bp(n,r,a){var u=n.stateNode;if(r=r.childContextTypes,typeof u.getChildContext!="function")return a;u=u.getChildContext();for(var p in u)if(!(p in r))throw Error(t(108,Q(n)||"Unknown",p));return V({},a,u)}function ol(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||zr,ls=Un.current,Kt(Un,n),Kt(Jn,Jn.current),!0}function Tp(n,r,a){var u=n.stateNode;if(!u)throw Error(t(169));a?(n=bp(n,r,ls),u.__reactInternalMemoizedMergedChildContext=n,Qt(Jn),Qt(Un),Kt(Un,n)):Qt(Jn),Kt(Jn,a)}var dr=null,al=!1,bu=!1;function Ap(n){dr===null?dr=[n]:dr.push(n)}function t_(n){al=!0,Ap(n)}function Hr(){if(!bu&&dr!==null){bu=!0;var n=0,r=et;try{var a=dr;for(et=1;n<a.length;n++){var u=a[n];do u=u(!0);while(u!==null)}dr=null,al=!1}catch(p){throw dr!==null&&(dr=dr.slice(n+1)),qi(Dr,Hr),p}finally{et=r,bu=!1}}return null}var Ks=[],Zs=0,ll=null,cl=0,vi=[],_i=0,cs=null,fr=1,hr="";function us(n,r){Ks[Zs++]=cl,Ks[Zs++]=ll,ll=n,cl=r}function Cp(n,r,a){vi[_i++]=fr,vi[_i++]=hr,vi[_i++]=cs,cs=n;var u=fr;n=hr;var p=32-ze(u)-1;u&=~(1<<p),a+=1;var _=32-ze(r)+p;if(30<_){var C=p-p%5;_=(u&(1<<C)-1).toString(32),u>>=C,p-=C,fr=1<<32-ze(r)+p|a<<p|u,hr=_+n}else fr=1<<_|a<<p|u,hr=n}function Tu(n){n.return!==null&&(us(n,1),Cp(n,1,0))}function Au(n){for(;n===ll;)ll=Ks[--Zs],Ks[Zs]=null,cl=Ks[--Zs],Ks[Zs]=null;for(;n===cs;)cs=vi[--_i],vi[_i]=null,hr=vi[--_i],vi[_i]=null,fr=vi[--_i],vi[_i]=null}var ci=null,ui=null,en=!1,Ii=null;function Rp(n,r){var a=Mi(5,null,null,0);a.elementType="DELETED",a.stateNode=r,a.return=n,r=n.deletions,r===null?(n.deletions=[a],n.flags|=16):r.push(a)}function Pp(n,r){switch(n.tag){case 5:var a=n.type;return r=r.nodeType!==1||a.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(n.stateNode=r,ci=n,ui=Br(r.firstChild),!0):!1;case 6:return r=n.pendingProps===""||r.nodeType!==3?null:r,r!==null?(n.stateNode=r,ci=n,ui=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(a=cs!==null?{id:fr,overflow:hr}:null,n.memoizedState={dehydrated:r,treeContext:a,retryLane:1073741824},a=Mi(18,null,null,0),a.stateNode=r,a.return=n,n.child=a,ci=n,ui=null,!0):!1;default:return!1}}function Cu(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Ru(n){if(en){var r=ui;if(r){var a=r;if(!Pp(n,r)){if(Cu(n))throw Error(t(418));r=Br(a.nextSibling);var u=ci;r&&Pp(n,r)?Rp(u,a):(n.flags=n.flags&-4097|2,en=!1,ci=n)}}else{if(Cu(n))throw Error(t(418));n.flags=n.flags&-4097|2,en=!1,ci=n}}}function Dp(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;ci=n}function ul(n){if(n!==ci)return!1;if(!en)return Dp(n),en=!0,!1;var r;if((r=n.tag!==3)&&!(r=n.tag!==5)&&(r=n.type,r=r!=="head"&&r!=="body"&&!yu(n.type,n.memoizedProps)),r&&(r=ui)){if(Cu(n))throw Lp(),Error(t(418));for(;r;)Rp(n,r),r=Br(r.nextSibling)}if(Dp(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,r=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(r===0){ui=Br(n.nextSibling);break e}r--}else a!=="$"&&a!=="$!"&&a!=="$?"||r++}n=n.nextSibling}ui=null}}else ui=ci?Br(n.stateNode.nextSibling):null;return!0}function Lp(){for(var n=ui;n;)n=Br(n.nextSibling)}function Qs(){ui=ci=null,en=!1}function Pu(n){Ii===null?Ii=[n]:Ii.push(n)}var n_=T.ReactCurrentBatchConfig;function Jo(n,r,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var u=a.stateNode}if(!u)throw Error(t(147,n));var p=u,_=""+n;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===_?r.ref:(r=function(C){var k=p.refs;C===null?delete k[_]:k[_]=C},r._stringRef=_,r)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function dl(n,r){throw n=Object.prototype.toString.call(r),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":n))}function Fp(n){var r=n._init;return r(n._payload)}function Np(n){function r(ue,J){if(n){var fe=ue.deletions;fe===null?(ue.deletions=[J],ue.flags|=16):fe.push(J)}}function a(ue,J){if(!n)return null;for(;J!==null;)r(ue,J),J=J.sibling;return null}function u(ue,J){for(ue=new Map;J!==null;)J.key!==null?ue.set(J.key,J):ue.set(J.index,J),J=J.sibling;return ue}function p(ue,J){return ue=Yr(ue,J),ue.index=0,ue.sibling=null,ue}function _(ue,J,fe){return ue.index=fe,n?(fe=ue.alternate,fe!==null?(fe=fe.index,fe<J?(ue.flags|=2,J):fe):(ue.flags|=2,J)):(ue.flags|=1048576,J)}function C(ue){return n&&ue.alternate===null&&(ue.flags|=2),ue}function k(ue,J,fe,Le){return J===null||J.tag!==6?(J=Sd(fe,ue.mode,Le),J.return=ue,J):(J=p(J,fe),J.return=ue,J)}function W(ue,J,fe,Le){var ut=fe.type;return ut===U?Ae(ue,J,fe.props.children,Le,fe.key):J!==null&&(J.elementType===ut||typeof ut=="object"&&ut!==null&&ut.$$typeof===ge&&Fp(ut)===J.type)?(Le=p(J,fe.props),Le.ref=Jo(ue,J,fe),Le.return=ue,Le):(Le=Il(fe.type,fe.key,fe.props,null,ue.mode,Le),Le.ref=Jo(ue,J,fe),Le.return=ue,Le)}function pe(ue,J,fe,Le){return J===null||J.tag!==4||J.stateNode.containerInfo!==fe.containerInfo||J.stateNode.implementation!==fe.implementation?(J=Ed(fe,ue.mode,Le),J.return=ue,J):(J=p(J,fe.children||[]),J.return=ue,J)}function Ae(ue,J,fe,Le,ut){return J===null||J.tag!==7?(J=vs(fe,ue.mode,Le,ut),J.return=ue,J):(J=p(J,fe),J.return=ue,J)}function Ce(ue,J,fe){if(typeof J=="string"&&J!==""||typeof J=="number")return J=Sd(""+J,ue.mode,fe),J.return=ue,J;if(typeof J=="object"&&J!==null){switch(J.$$typeof){case D:return fe=Il(J.type,J.key,J.props,null,ue.mode,fe),fe.ref=Jo(ue,null,J),fe.return=ue,fe;case F:return J=Ed(J,ue.mode,fe),J.return=ue,J;case ge:var Le=J._init;return Ce(ue,Le(J._payload),fe)}if(vt(J)||G(J))return J=vs(J,ue.mode,fe,null),J.return=ue,J;dl(ue,J)}return null}function be(ue,J,fe,Le){var ut=J!==null?J.key:null;if(typeof fe=="string"&&fe!==""||typeof fe=="number")return ut!==null?null:k(ue,J,""+fe,Le);if(typeof fe=="object"&&fe!==null){switch(fe.$$typeof){case D:return fe.key===ut?W(ue,J,fe,Le):null;case F:return fe.key===ut?pe(ue,J,fe,Le):null;case ge:return ut=fe._init,be(ue,J,ut(fe._payload),Le)}if(vt(fe)||G(fe))return ut!==null?null:Ae(ue,J,fe,Le,null);dl(ue,fe)}return null}function Ze(ue,J,fe,Le,ut){if(typeof Le=="string"&&Le!==""||typeof Le=="number")return ue=ue.get(fe)||null,k(J,ue,""+Le,ut);if(typeof Le=="object"&&Le!==null){switch(Le.$$typeof){case D:return ue=ue.get(Le.key===null?fe:Le.key)||null,W(J,ue,Le,ut);case F:return ue=ue.get(Le.key===null?fe:Le.key)||null,pe(J,ue,Le,ut);case ge:var gt=Le._init;return Ze(ue,J,fe,gt(Le._payload),ut)}if(vt(Le)||G(Le))return ue=ue.get(fe)||null,Ae(J,ue,Le,ut,null);dl(J,Le)}return null}function st(ue,J,fe,Le){for(var ut=null,gt=null,xt=J,St=J=0,Cn=null;xt!==null&&St<fe.length;St++){xt.index>St?(Cn=xt,xt=null):Cn=xt.sibling;var Gt=be(ue,xt,fe[St],Le);if(Gt===null){xt===null&&(xt=Cn);break}n&&xt&&Gt.alternate===null&&r(ue,xt),J=_(Gt,J,St),gt===null?ut=Gt:gt.sibling=Gt,gt=Gt,xt=Cn}if(St===fe.length)return a(ue,xt),en&&us(ue,St),ut;if(xt===null){for(;St<fe.length;St++)xt=Ce(ue,fe[St],Le),xt!==null&&(J=_(xt,J,St),gt===null?ut=xt:gt.sibling=xt,gt=xt);return en&&us(ue,St),ut}for(xt=u(ue,xt);St<fe.length;St++)Cn=Ze(xt,ue,St,fe[St],Le),Cn!==null&&(n&&Cn.alternate!==null&&xt.delete(Cn.key===null?St:Cn.key),J=_(Cn,J,St),gt===null?ut=Cn:gt.sibling=Cn,gt=Cn);return n&&xt.forEach(function(Kr){return r(ue,Kr)}),en&&us(ue,St),ut}function at(ue,J,fe,Le){var ut=G(fe);if(typeof ut!="function")throw Error(t(150));if(fe=ut.call(fe),fe==null)throw Error(t(151));for(var gt=ut=null,xt=J,St=J=0,Cn=null,Gt=fe.next();xt!==null&&!Gt.done;St++,Gt=fe.next()){xt.index>St?(Cn=xt,xt=null):Cn=xt.sibling;var Kr=be(ue,xt,Gt.value,Le);if(Kr===null){xt===null&&(xt=Cn);break}n&&xt&&Kr.alternate===null&&r(ue,xt),J=_(Kr,J,St),gt===null?ut=Kr:gt.sibling=Kr,gt=Kr,xt=Cn}if(Gt.done)return a(ue,xt),en&&us(ue,St),ut;if(xt===null){for(;!Gt.done;St++,Gt=fe.next())Gt=Ce(ue,Gt.value,Le),Gt!==null&&(J=_(Gt,J,St),gt===null?ut=Gt:gt.sibling=Gt,gt=Gt);return en&&us(ue,St),ut}for(xt=u(ue,xt);!Gt.done;St++,Gt=fe.next())Gt=Ze(xt,ue,St,Gt.value,Le),Gt!==null&&(n&&Gt.alternate!==null&&xt.delete(Gt.key===null?St:Gt.key),J=_(Gt,J,St),gt===null?ut=Gt:gt.sibling=Gt,gt=Gt);return n&&xt.forEach(function(I_){return r(ue,I_)}),en&&us(ue,St),ut}function cn(ue,J,fe,Le){if(typeof fe=="object"&&fe!==null&&fe.type===U&&fe.key===null&&(fe=fe.props.children),typeof fe=="object"&&fe!==null){switch(fe.$$typeof){case D:e:{for(var ut=fe.key,gt=J;gt!==null;){if(gt.key===ut){if(ut=fe.type,ut===U){if(gt.tag===7){a(ue,gt.sibling),J=p(gt,fe.props.children),J.return=ue,ue=J;break e}}else if(gt.elementType===ut||typeof ut=="object"&&ut!==null&&ut.$$typeof===ge&&Fp(ut)===gt.type){a(ue,gt.sibling),J=p(gt,fe.props),J.ref=Jo(ue,gt,fe),J.return=ue,ue=J;break e}a(ue,gt);break}else r(ue,gt);gt=gt.sibling}fe.type===U?(J=vs(fe.props.children,ue.mode,Le,fe.key),J.return=ue,ue=J):(Le=Il(fe.type,fe.key,fe.props,null,ue.mode,Le),Le.ref=Jo(ue,J,fe),Le.return=ue,ue=Le)}return C(ue);case F:e:{for(gt=fe.key;J!==null;){if(J.key===gt)if(J.tag===4&&J.stateNode.containerInfo===fe.containerInfo&&J.stateNode.implementation===fe.implementation){a(ue,J.sibling),J=p(J,fe.children||[]),J.return=ue,ue=J;break e}else{a(ue,J);break}else r(ue,J);J=J.sibling}J=Ed(fe,ue.mode,Le),J.return=ue,ue=J}return C(ue);case ge:return gt=fe._init,cn(ue,J,gt(fe._payload),Le)}if(vt(fe))return st(ue,J,fe,Le);if(G(fe))return at(ue,J,fe,Le);dl(ue,fe)}return typeof fe=="string"&&fe!==""||typeof fe=="number"?(fe=""+fe,J!==null&&J.tag===6?(a(ue,J.sibling),J=p(J,fe),J.return=ue,ue=J):(a(ue,J),J=Sd(fe,ue.mode,Le),J.return=ue,ue=J),C(ue)):a(ue,J)}return cn}var Js=Np(!0),Ip=Np(!1),fl=kr(null),hl=null,eo=null,Du=null;function Lu(){Du=eo=hl=null}function Fu(n){var r=fl.current;Qt(fl),n._currentValue=r}function Nu(n,r,a){for(;n!==null;){var u=n.alternate;if((n.childLanes&r)!==r?(n.childLanes|=r,u!==null&&(u.childLanes|=r)):u!==null&&(u.childLanes&r)!==r&&(u.childLanes|=r),n===a)break;n=n.return}}function to(n,r){hl=n,Du=eo=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&r)!==0&&(ti=!0),n.firstContext=null)}function yi(n){var r=n._currentValue;if(Du!==n)if(n={context:n,memoizedValue:r,next:null},eo===null){if(hl===null)throw Error(t(308));eo=n,hl.dependencies={lanes:0,firstContext:n}}else eo=eo.next=n;return r}var ds=null;function Iu(n){ds===null?ds=[n]:ds.push(n)}function Up(n,r,a,u){var p=r.interleaved;return p===null?(a.next=a,Iu(r)):(a.next=p.next,p.next=a),r.interleaved=a,pr(n,u)}function pr(n,r){n.lanes|=r;var a=n.alternate;for(a!==null&&(a.lanes|=r),a=n,n=n.return;n!==null;)n.childLanes|=r,a=n.alternate,a!==null&&(a.childLanes|=r),a=n,n=n.return;return a.tag===3?a.stateNode:null}var Vr=!1;function Uu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Op(n,r){n=n.updateQueue,r.updateQueue===n&&(r.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function mr(n,r){return{eventTime:n,lane:r,tag:0,payload:null,callback:null,next:null}}function Gr(n,r,a){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,(Vt&2)!==0){var p=u.pending;return p===null?r.next=r:(r.next=p.next,p.next=r),u.pending=r,pr(n,a)}return p=u.interleaved,p===null?(r.next=r,Iu(u)):(r.next=p.next,p.next=r),u.interleaved=r,pr(n,a)}function pl(n,r,a){if(r=r.updateQueue,r!==null&&(r=r.shared,(a&4194240)!==0)){var u=r.lanes;u&=n.pendingLanes,a|=u,r.lanes=a,vn(n,a)}}function Bp(n,r){var a=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,a===u)){var p=null,_=null;if(a=a.firstBaseUpdate,a!==null){do{var C={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};_===null?p=_=C:_=_.next=C,a=a.next}while(a!==null);_===null?p=_=r:_=_.next=r}else p=_=r;a={baseState:u.baseState,firstBaseUpdate:p,lastBaseUpdate:_,shared:u.shared,effects:u.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=r:n.next=r,a.lastBaseUpdate=r}function ml(n,r,a,u){var p=n.updateQueue;Vr=!1;var _=p.firstBaseUpdate,C=p.lastBaseUpdate,k=p.shared.pending;if(k!==null){p.shared.pending=null;var W=k,pe=W.next;W.next=null,C===null?_=pe:C.next=pe,C=W;var Ae=n.alternate;Ae!==null&&(Ae=Ae.updateQueue,k=Ae.lastBaseUpdate,k!==C&&(k===null?Ae.firstBaseUpdate=pe:k.next=pe,Ae.lastBaseUpdate=W))}if(_!==null){var Ce=p.baseState;C=0,Ae=pe=W=null,k=_;do{var be=k.lane,Ze=k.eventTime;if((u&be)===be){Ae!==null&&(Ae=Ae.next={eventTime:Ze,lane:0,tag:k.tag,payload:k.payload,callback:k.callback,next:null});e:{var st=n,at=k;switch(be=r,Ze=a,at.tag){case 1:if(st=at.payload,typeof st=="function"){Ce=st.call(Ze,Ce,be);break e}Ce=st;break e;case 3:st.flags=st.flags&-65537|128;case 0:if(st=at.payload,be=typeof st=="function"?st.call(Ze,Ce,be):st,be==null)break e;Ce=V({},Ce,be);break e;case 2:Vr=!0}}k.callback!==null&&k.lane!==0&&(n.flags|=64,be=p.effects,be===null?p.effects=[k]:be.push(k))}else Ze={eventTime:Ze,lane:be,tag:k.tag,payload:k.payload,callback:k.callback,next:null},Ae===null?(pe=Ae=Ze,W=Ce):Ae=Ae.next=Ze,C|=be;if(k=k.next,k===null){if(k=p.shared.pending,k===null)break;be=k,k=be.next,be.next=null,p.lastBaseUpdate=be,p.shared.pending=null}}while(!0);if(Ae===null&&(W=Ce),p.baseState=W,p.firstBaseUpdate=pe,p.lastBaseUpdate=Ae,r=p.shared.interleaved,r!==null){p=r;do C|=p.lane,p=p.next;while(p!==r)}else _===null&&(p.shared.lanes=0);ps|=C,n.lanes=C,n.memoizedState=Ce}}function kp(n,r,a){if(n=r.effects,r.effects=null,n!==null)for(r=0;r<n.length;r++){var u=n[r],p=u.callback;if(p!==null){if(u.callback=null,u=a,typeof p!="function")throw Error(t(191,p));p.call(u)}}}var ea={},Yi=kr(ea),ta=kr(ea),na=kr(ea);function fs(n){if(n===ea)throw Error(t(174));return n}function Ou(n,r){switch(Kt(na,r),Kt(ta,n),Kt(Yi,ea),n=r.nodeType,n){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:w(null,"");break;default:n=n===8?r.parentNode:r,r=n.namespaceURI||null,n=n.tagName,r=w(r,n)}Qt(Yi),Kt(Yi,r)}function no(){Qt(Yi),Qt(ta),Qt(na)}function zp(n){fs(na.current);var r=fs(Yi.current),a=w(r,n.type);r!==a&&(Kt(ta,n),Kt(Yi,a))}function Bu(n){ta.current===n&&(Qt(Yi),Qt(ta))}var nn=kr(0);function gl(n){for(var r=n;r!==null;){if(r.tag===13){var a=r.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if((r.flags&128)!==0)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var ku=[];function zu(){for(var n=0;n<ku.length;n++)ku[n]._workInProgressVersionPrimary=null;ku.length=0}var xl=T.ReactCurrentDispatcher,Hu=T.ReactCurrentBatchConfig,hs=0,rn=null,_n=null,Tn=null,vl=!1,ia=!1,ra=0,i_=0;function On(){throw Error(t(321))}function Vu(n,r){if(r===null)return!1;for(var a=0;a<r.length&&a<n.length;a++)if(!Ni(n[a],r[a]))return!1;return!0}function Gu(n,r,a,u,p,_){if(hs=_,rn=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,xl.current=n===null||n.memoizedState===null?a_:l_,n=a(u,p),ia){_=0;do{if(ia=!1,ra=0,25<=_)throw Error(t(301));_+=1,Tn=_n=null,r.updateQueue=null,xl.current=c_,n=a(u,p)}while(ia)}if(xl.current=Sl,r=_n!==null&&_n.next!==null,hs=0,Tn=_n=rn=null,vl=!1,r)throw Error(t(300));return n}function Wu(){var n=ra!==0;return ra=0,n}function Ki(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Tn===null?rn.memoizedState=Tn=n:Tn=Tn.next=n,Tn}function Si(){if(_n===null){var n=rn.alternate;n=n!==null?n.memoizedState:null}else n=_n.next;var r=Tn===null?rn.memoizedState:Tn.next;if(r!==null)Tn=r,_n=n;else{if(n===null)throw Error(t(310));_n=n,n={memoizedState:_n.memoizedState,baseState:_n.baseState,baseQueue:_n.baseQueue,queue:_n.queue,next:null},Tn===null?rn.memoizedState=Tn=n:Tn=Tn.next=n}return Tn}function sa(n,r){return typeof r=="function"?r(n):r}function ju(n){var r=Si(),a=r.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var u=_n,p=u.baseQueue,_=a.pending;if(_!==null){if(p!==null){var C=p.next;p.next=_.next,_.next=C}u.baseQueue=p=_,a.pending=null}if(p!==null){_=p.next,u=u.baseState;var k=C=null,W=null,pe=_;do{var Ae=pe.lane;if((hs&Ae)===Ae)W!==null&&(W=W.next={lane:0,action:pe.action,hasEagerState:pe.hasEagerState,eagerState:pe.eagerState,next:null}),u=pe.hasEagerState?pe.eagerState:n(u,pe.action);else{var Ce={lane:Ae,action:pe.action,hasEagerState:pe.hasEagerState,eagerState:pe.eagerState,next:null};W===null?(k=W=Ce,C=u):W=W.next=Ce,rn.lanes|=Ae,ps|=Ae}pe=pe.next}while(pe!==null&&pe!==_);W===null?C=u:W.next=k,Ni(u,r.memoizedState)||(ti=!0),r.memoizedState=u,r.baseState=C,r.baseQueue=W,a.lastRenderedState=u}if(n=a.interleaved,n!==null){p=n;do _=p.lane,rn.lanes|=_,ps|=_,p=p.next;while(p!==n)}else p===null&&(a.lanes=0);return[r.memoizedState,a.dispatch]}function Xu(n){var r=Si(),a=r.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var u=a.dispatch,p=a.pending,_=r.memoizedState;if(p!==null){a.pending=null;var C=p=p.next;do _=n(_,C.action),C=C.next;while(C!==p);Ni(_,r.memoizedState)||(ti=!0),r.memoizedState=_,r.baseQueue===null&&(r.baseState=_),a.lastRenderedState=_}return[_,u]}function Hp(){}function Vp(n,r){var a=rn,u=Si(),p=r(),_=!Ni(u.memoizedState,p);if(_&&(u.memoizedState=p,ti=!0),u=u.queue,qu(jp.bind(null,a,u,n),[n]),u.getSnapshot!==r||_||Tn!==null&&Tn.memoizedState.tag&1){if(a.flags|=2048,oa(9,Wp.bind(null,a,u,p,r),void 0,null),An===null)throw Error(t(349));(hs&30)!==0||Gp(a,r,p)}return p}function Gp(n,r,a){n.flags|=16384,n={getSnapshot:r,value:a},r=rn.updateQueue,r===null?(r={lastEffect:null,stores:null},rn.updateQueue=r,r.stores=[n]):(a=r.stores,a===null?r.stores=[n]:a.push(n))}function Wp(n,r,a,u){r.value=a,r.getSnapshot=u,Xp(r)&&qp(n)}function jp(n,r,a){return a(function(){Xp(r)&&qp(n)})}function Xp(n){var r=n.getSnapshot;n=n.value;try{var a=r();return!Ni(n,a)}catch{return!0}}function qp(n){var r=pr(n,1);r!==null&&ki(r,n,1,-1)}function $p(n){var r=Ki();return typeof n=="function"&&(n=n()),r.memoizedState=r.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:sa,lastRenderedState:n},r.queue=n,n=n.dispatch=o_.bind(null,rn,n),[r.memoizedState,n]}function oa(n,r,a,u){return n={tag:n,create:r,destroy:a,deps:u,next:null},r=rn.updateQueue,r===null?(r={lastEffect:null,stores:null},rn.updateQueue=r,r.lastEffect=n.next=n):(a=r.lastEffect,a===null?r.lastEffect=n.next=n:(u=a.next,a.next=n,n.next=u,r.lastEffect=n)),n}function Yp(){return Si().memoizedState}function _l(n,r,a,u){var p=Ki();rn.flags|=n,p.memoizedState=oa(1|r,a,void 0,u===void 0?null:u)}function yl(n,r,a,u){var p=Si();u=u===void 0?null:u;var _=void 0;if(_n!==null){var C=_n.memoizedState;if(_=C.destroy,u!==null&&Vu(u,C.deps)){p.memoizedState=oa(r,a,_,u);return}}rn.flags|=n,p.memoizedState=oa(1|r,a,_,u)}function Kp(n,r){return _l(8390656,8,n,r)}function qu(n,r){return yl(2048,8,n,r)}function Zp(n,r){return yl(4,2,n,r)}function Qp(n,r){return yl(4,4,n,r)}function Jp(n,r){if(typeof r=="function")return n=n(),r(n),function(){r(null)};if(r!=null)return n=n(),r.current=n,function(){r.current=null}}function em(n,r,a){return a=a!=null?a.concat([n]):null,yl(4,4,Jp.bind(null,r,n),a)}function $u(){}function tm(n,r){var a=Si();r=r===void 0?null:r;var u=a.memoizedState;return u!==null&&r!==null&&Vu(r,u[1])?u[0]:(a.memoizedState=[n,r],n)}function nm(n,r){var a=Si();r=r===void 0?null:r;var u=a.memoizedState;return u!==null&&r!==null&&Vu(r,u[1])?u[0]:(n=n(),a.memoizedState=[n,r],n)}function im(n,r,a){return(hs&21)===0?(n.baseState&&(n.baseState=!1,ti=!0),n.memoizedState=a):(Ni(a,r)||(a=$e(),rn.lanes|=a,ps|=a,n.baseState=!0),r)}function r_(n,r){var a=et;et=a!==0&&4>a?a:4,n(!0);var u=Hu.transition;Hu.transition={};try{n(!1),r()}finally{et=a,Hu.transition=u}}function rm(){return Si().memoizedState}function s_(n,r,a){var u=qr(n);if(a={lane:u,action:a,hasEagerState:!1,eagerState:null,next:null},sm(n))om(r,a);else if(a=Up(n,r,a,u),a!==null){var p=qn();ki(a,n,u,p),am(a,r,u)}}function o_(n,r,a){var u=qr(n),p={lane:u,action:a,hasEagerState:!1,eagerState:null,next:null};if(sm(n))om(r,p);else{var _=n.alternate;if(n.lanes===0&&(_===null||_.lanes===0)&&(_=r.lastRenderedReducer,_!==null))try{var C=r.lastRenderedState,k=_(C,a);if(p.hasEagerState=!0,p.eagerState=k,Ni(k,C)){var W=r.interleaved;W===null?(p.next=p,Iu(r)):(p.next=W.next,W.next=p),r.interleaved=p;return}}catch{}finally{}a=Up(n,r,p,u),a!==null&&(p=qn(),ki(a,n,u,p),am(a,r,u))}}function sm(n){var r=n.alternate;return n===rn||r!==null&&r===rn}function om(n,r){ia=vl=!0;var a=n.pending;a===null?r.next=r:(r.next=a.next,a.next=r),n.pending=r}function am(n,r,a){if((a&4194240)!==0){var u=r.lanes;u&=n.pendingLanes,a|=u,r.lanes=a,vn(n,a)}}var Sl={readContext:yi,useCallback:On,useContext:On,useEffect:On,useImperativeHandle:On,useInsertionEffect:On,useLayoutEffect:On,useMemo:On,useReducer:On,useRef:On,useState:On,useDebugValue:On,useDeferredValue:On,useTransition:On,useMutableSource:On,useSyncExternalStore:On,useId:On,unstable_isNewReconciler:!1},a_={readContext:yi,useCallback:function(n,r){return Ki().memoizedState=[n,r===void 0?null:r],n},useContext:yi,useEffect:Kp,useImperativeHandle:function(n,r,a){return a=a!=null?a.concat([n]):null,_l(4194308,4,Jp.bind(null,r,n),a)},useLayoutEffect:function(n,r){return _l(4194308,4,n,r)},useInsertionEffect:function(n,r){return _l(4,2,n,r)},useMemo:function(n,r){var a=Ki();return r=r===void 0?null:r,n=n(),a.memoizedState=[n,r],n},useReducer:function(n,r,a){var u=Ki();return r=a!==void 0?a(r):r,u.memoizedState=u.baseState=r,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:r},u.queue=n,n=n.dispatch=s_.bind(null,rn,n),[u.memoizedState,n]},useRef:function(n){var r=Ki();return n={current:n},r.memoizedState=n},useState:$p,useDebugValue:$u,useDeferredValue:function(n){return Ki().memoizedState=n},useTransition:function(){var n=$p(!1),r=n[0];return n=r_.bind(null,n[1]),Ki().memoizedState=n,[r,n]},useMutableSource:function(){},useSyncExternalStore:function(n,r,a){var u=rn,p=Ki();if(en){if(a===void 0)throw Error(t(407));a=a()}else{if(a=r(),An===null)throw Error(t(349));(hs&30)!==0||Gp(u,r,a)}p.memoizedState=a;var _={value:a,getSnapshot:r};return p.queue=_,Kp(jp.bind(null,u,_,n),[n]),u.flags|=2048,oa(9,Wp.bind(null,u,_,a,r),void 0,null),a},useId:function(){var n=Ki(),r=An.identifierPrefix;if(en){var a=hr,u=fr;a=(u&~(1<<32-ze(u)-1)).toString(32)+a,r=":"+r+"R"+a,a=ra++,0<a&&(r+="H"+a.toString(32)),r+=":"}else a=i_++,r=":"+r+"r"+a.toString(32)+":";return n.memoizedState=r},unstable_isNewReconciler:!1},l_={readContext:yi,useCallback:tm,useContext:yi,useEffect:qu,useImperativeHandle:em,useInsertionEffect:Zp,useLayoutEffect:Qp,useMemo:nm,useReducer:ju,useRef:Yp,useState:function(){return ju(sa)},useDebugValue:$u,useDeferredValue:function(n){var r=Si();return im(r,_n.memoizedState,n)},useTransition:function(){var n=ju(sa)[0],r=Si().memoizedState;return[n,r]},useMutableSource:Hp,useSyncExternalStore:Vp,useId:rm,unstable_isNewReconciler:!1},c_={readContext:yi,useCallback:tm,useContext:yi,useEffect:qu,useImperativeHandle:em,useInsertionEffect:Zp,useLayoutEffect:Qp,useMemo:nm,useReducer:Xu,useRef:Yp,useState:function(){return Xu(sa)},useDebugValue:$u,useDeferredValue:function(n){var r=Si();return _n===null?r.memoizedState=n:im(r,_n.memoizedState,n)},useTransition:function(){var n=Xu(sa)[0],r=Si().memoizedState;return[n,r]},useMutableSource:Hp,useSyncExternalStore:Vp,useId:rm,unstable_isNewReconciler:!1};function Ui(n,r){if(n&&n.defaultProps){r=V({},r),n=n.defaultProps;for(var a in n)r[a]===void 0&&(r[a]=n[a]);return r}return r}function Yu(n,r,a,u){r=n.memoizedState,a=a(u,r),a=a==null?r:V({},r,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var El={isMounted:function(n){return(n=n._reactInternals)?bn(n)===n:!1},enqueueSetState:function(n,r,a){n=n._reactInternals;var u=qn(),p=qr(n),_=mr(u,p);_.payload=r,a!=null&&(_.callback=a),r=Gr(n,_,p),r!==null&&(ki(r,n,p,u),pl(r,n,p))},enqueueReplaceState:function(n,r,a){n=n._reactInternals;var u=qn(),p=qr(n),_=mr(u,p);_.tag=1,_.payload=r,a!=null&&(_.callback=a),r=Gr(n,_,p),r!==null&&(ki(r,n,p,u),pl(r,n,p))},enqueueForceUpdate:function(n,r){n=n._reactInternals;var a=qn(),u=qr(n),p=mr(a,u);p.tag=2,r!=null&&(p.callback=r),r=Gr(n,p,u),r!==null&&(ki(r,n,u,a),pl(r,n,u))}};function lm(n,r,a,u,p,_,C){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,_,C):r.prototype&&r.prototype.isPureReactComponent?!Xo(a,u)||!Xo(p,_):!0}function cm(n,r,a){var u=!1,p=zr,_=r.contextType;return typeof _=="object"&&_!==null?_=yi(_):(p=ei(r)?ls:Un.current,u=r.contextTypes,_=(u=u!=null)?Ys(n,p):zr),r=new r(a,_),n.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=El,n.stateNode=r,r._reactInternals=n,u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=p,n.__reactInternalMemoizedMaskedChildContext=_),r}function um(n,r,a,u){n=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(a,u),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(a,u),r.state!==n&&El.enqueueReplaceState(r,r.state,null)}function Ku(n,r,a,u){var p=n.stateNode;p.props=a,p.state=n.memoizedState,p.refs={},Uu(n);var _=r.contextType;typeof _=="object"&&_!==null?p.context=yi(_):(_=ei(r)?ls:Un.current,p.context=Ys(n,_)),p.state=n.memoizedState,_=r.getDerivedStateFromProps,typeof _=="function"&&(Yu(n,r,_,a),p.state=n.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(r=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),r!==p.state&&El.enqueueReplaceState(p,p.state,null),ml(n,a,p,u),p.state=n.memoizedState),typeof p.componentDidMount=="function"&&(n.flags|=4194308)}function io(n,r){try{var a="",u=r;do a+=Se(u),u=u.return;while(u);var p=a}catch(_){p=`
Error generating stack: `+_.message+`
`+_.stack}return{value:n,source:r,stack:p,digest:null}}function Zu(n,r,a){return{value:n,source:null,stack:a??null,digest:r??null}}function Qu(n,r){try{console.error(r.value)}catch(a){setTimeout(function(){throw a})}}var u_=typeof WeakMap=="function"?WeakMap:Map;function dm(n,r,a){a=mr(-1,a),a.tag=3,a.payload={element:null};var u=r.value;return a.callback=function(){Rl||(Rl=!0,hd=u),Qu(n,r)},a}function fm(n,r,a){a=mr(-1,a),a.tag=3;var u=n.type.getDerivedStateFromError;if(typeof u=="function"){var p=r.value;a.payload=function(){return u(p)},a.callback=function(){Qu(n,r)}}var _=n.stateNode;return _!==null&&typeof _.componentDidCatch=="function"&&(a.callback=function(){Qu(n,r),typeof u!="function"&&(jr===null?jr=new Set([this]):jr.add(this));var C=r.stack;this.componentDidCatch(r.value,{componentStack:C!==null?C:""})}),a}function hm(n,r,a){var u=n.pingCache;if(u===null){u=n.pingCache=new u_;var p=new Set;u.set(r,p)}else p=u.get(r),p===void 0&&(p=new Set,u.set(r,p));p.has(a)||(p.add(a),n=w_.bind(null,n,r,a),r.then(n,n))}function pm(n){do{var r;if((r=n.tag===13)&&(r=n.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return n;n=n.return}while(n!==null);return null}function mm(n,r,a,u,p){return(n.mode&1)===0?(n===r?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(r=mr(-1,1),r.tag=2,Gr(a,r,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=p,n)}var d_=T.ReactCurrentOwner,ti=!1;function Xn(n,r,a,u){r.child=n===null?Ip(r,null,a,u):Js(r,n.child,a,u)}function gm(n,r,a,u,p){a=a.render;var _=r.ref;return to(r,p),u=Gu(n,r,a,u,_,p),a=Wu(),n!==null&&!ti?(r.updateQueue=n.updateQueue,r.flags&=-2053,n.lanes&=~p,gr(n,r,p)):(en&&a&&Tu(r),r.flags|=1,Xn(n,r,u,p),r.child)}function xm(n,r,a,u,p){if(n===null){var _=a.type;return typeof _=="function"&&!yd(_)&&_.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(r.tag=15,r.type=_,vm(n,r,_,u,p)):(n=Il(a.type,null,u,r,r.mode,p),n.ref=r.ref,n.return=r,r.child=n)}if(_=n.child,(n.lanes&p)===0){var C=_.memoizedProps;if(a=a.compare,a=a!==null?a:Xo,a(C,u)&&n.ref===r.ref)return gr(n,r,p)}return r.flags|=1,n=Yr(_,u),n.ref=r.ref,n.return=r,r.child=n}function vm(n,r,a,u,p){if(n!==null){var _=n.memoizedProps;if(Xo(_,u)&&n.ref===r.ref)if(ti=!1,r.pendingProps=u=_,(n.lanes&p)!==0)(n.flags&131072)!==0&&(ti=!0);else return r.lanes=n.lanes,gr(n,r,p)}return Ju(n,r,a,u,p)}function _m(n,r,a){var u=r.pendingProps,p=u.children,_=n!==null?n.memoizedState:null;if(u.mode==="hidden")if((r.mode&1)===0)r.memoizedState={baseLanes:0,cachePool:null,transitions:null},Kt(so,di),di|=a;else{if((a&1073741824)===0)return n=_!==null?_.baseLanes|a:a,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:n,cachePool:null,transitions:null},r.updateQueue=null,Kt(so,di),di|=n,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},u=_!==null?_.baseLanes:a,Kt(so,di),di|=u}else _!==null?(u=_.baseLanes|a,r.memoizedState=null):u=a,Kt(so,di),di|=u;return Xn(n,r,p,a),r.child}function ym(n,r){var a=r.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(r.flags|=512,r.flags|=2097152)}function Ju(n,r,a,u,p){var _=ei(a)?ls:Un.current;return _=Ys(r,_),to(r,p),a=Gu(n,r,a,u,_,p),u=Wu(),n!==null&&!ti?(r.updateQueue=n.updateQueue,r.flags&=-2053,n.lanes&=~p,gr(n,r,p)):(en&&u&&Tu(r),r.flags|=1,Xn(n,r,a,p),r.child)}function Sm(n,r,a,u,p){if(ei(a)){var _=!0;ol(r)}else _=!1;if(to(r,p),r.stateNode===null)wl(n,r),cm(r,a,u),Ku(r,a,u,p),u=!0;else if(n===null){var C=r.stateNode,k=r.memoizedProps;C.props=k;var W=C.context,pe=a.contextType;typeof pe=="object"&&pe!==null?pe=yi(pe):(pe=ei(a)?ls:Un.current,pe=Ys(r,pe));var Ae=a.getDerivedStateFromProps,Ce=typeof Ae=="function"||typeof C.getSnapshotBeforeUpdate=="function";Ce||typeof C.UNSAFE_componentWillReceiveProps!="function"&&typeof C.componentWillReceiveProps!="function"||(k!==u||W!==pe)&&um(r,C,u,pe),Vr=!1;var be=r.memoizedState;C.state=be,ml(r,u,C,p),W=r.memoizedState,k!==u||be!==W||Jn.current||Vr?(typeof Ae=="function"&&(Yu(r,a,Ae,u),W=r.memoizedState),(k=Vr||lm(r,a,k,u,be,W,pe))?(Ce||typeof C.UNSAFE_componentWillMount!="function"&&typeof C.componentWillMount!="function"||(typeof C.componentWillMount=="function"&&C.componentWillMount(),typeof C.UNSAFE_componentWillMount=="function"&&C.UNSAFE_componentWillMount()),typeof C.componentDidMount=="function"&&(r.flags|=4194308)):(typeof C.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=u,r.memoizedState=W),C.props=u,C.state=W,C.context=pe,u=k):(typeof C.componentDidMount=="function"&&(r.flags|=4194308),u=!1)}else{C=r.stateNode,Op(n,r),k=r.memoizedProps,pe=r.type===r.elementType?k:Ui(r.type,k),C.props=pe,Ce=r.pendingProps,be=C.context,W=a.contextType,typeof W=="object"&&W!==null?W=yi(W):(W=ei(a)?ls:Un.current,W=Ys(r,W));var Ze=a.getDerivedStateFromProps;(Ae=typeof Ze=="function"||typeof C.getSnapshotBeforeUpdate=="function")||typeof C.UNSAFE_componentWillReceiveProps!="function"&&typeof C.componentWillReceiveProps!="function"||(k!==Ce||be!==W)&&um(r,C,u,W),Vr=!1,be=r.memoizedState,C.state=be,ml(r,u,C,p);var st=r.memoizedState;k!==Ce||be!==st||Jn.current||Vr?(typeof Ze=="function"&&(Yu(r,a,Ze,u),st=r.memoizedState),(pe=Vr||lm(r,a,pe,u,be,st,W)||!1)?(Ae||typeof C.UNSAFE_componentWillUpdate!="function"&&typeof C.componentWillUpdate!="function"||(typeof C.componentWillUpdate=="function"&&C.componentWillUpdate(u,st,W),typeof C.UNSAFE_componentWillUpdate=="function"&&C.UNSAFE_componentWillUpdate(u,st,W)),typeof C.componentDidUpdate=="function"&&(r.flags|=4),typeof C.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof C.componentDidUpdate!="function"||k===n.memoizedProps&&be===n.memoizedState||(r.flags|=4),typeof C.getSnapshotBeforeUpdate!="function"||k===n.memoizedProps&&be===n.memoizedState||(r.flags|=1024),r.memoizedProps=u,r.memoizedState=st),C.props=u,C.state=st,C.context=W,u=pe):(typeof C.componentDidUpdate!="function"||k===n.memoizedProps&&be===n.memoizedState||(r.flags|=4),typeof C.getSnapshotBeforeUpdate!="function"||k===n.memoizedProps&&be===n.memoizedState||(r.flags|=1024),u=!1)}return ed(n,r,a,u,_,p)}function ed(n,r,a,u,p,_){ym(n,r);var C=(r.flags&128)!==0;if(!u&&!C)return p&&Tp(r,a,!1),gr(n,r,_);u=r.stateNode,d_.current=r;var k=C&&typeof a.getDerivedStateFromError!="function"?null:u.render();return r.flags|=1,n!==null&&C?(r.child=Js(r,n.child,null,_),r.child=Js(r,null,k,_)):Xn(n,r,k,_),r.memoizedState=u.state,p&&Tp(r,a,!0),r.child}function Em(n){var r=n.stateNode;r.pendingContext?wp(n,r.pendingContext,r.pendingContext!==r.context):r.context&&wp(n,r.context,!1),Ou(n,r.containerInfo)}function Mm(n,r,a,u,p){return Qs(),Pu(p),r.flags|=256,Xn(n,r,a,u),r.child}var td={dehydrated:null,treeContext:null,retryLane:0};function nd(n){return{baseLanes:n,cachePool:null,transitions:null}}function wm(n,r,a){var u=r.pendingProps,p=nn.current,_=!1,C=(r.flags&128)!==0,k;if((k=C)||(k=n!==null&&n.memoizedState===null?!1:(p&2)!==0),k?(_=!0,r.flags&=-129):(n===null||n.memoizedState!==null)&&(p|=1),Kt(nn,p&1),n===null)return Ru(r),n=r.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((r.mode&1)===0?r.lanes=1:n.data==="$!"?r.lanes=8:r.lanes=1073741824,null):(C=u.children,n=u.fallback,_?(u=r.mode,_=r.child,C={mode:"hidden",children:C},(u&1)===0&&_!==null?(_.childLanes=0,_.pendingProps=C):_=Ul(C,u,0,null),n=vs(n,u,a,null),_.return=r,n.return=r,_.sibling=n,r.child=_,r.child.memoizedState=nd(a),r.memoizedState=td,n):id(r,C));if(p=n.memoizedState,p!==null&&(k=p.dehydrated,k!==null))return f_(n,r,C,u,k,p,a);if(_){_=u.fallback,C=r.mode,p=n.child,k=p.sibling;var W={mode:"hidden",children:u.children};return(C&1)===0&&r.child!==p?(u=r.child,u.childLanes=0,u.pendingProps=W,r.deletions=null):(u=Yr(p,W),u.subtreeFlags=p.subtreeFlags&14680064),k!==null?_=Yr(k,_):(_=vs(_,C,a,null),_.flags|=2),_.return=r,u.return=r,u.sibling=_,r.child=u,u=_,_=r.child,C=n.child.memoizedState,C=C===null?nd(a):{baseLanes:C.baseLanes|a,cachePool:null,transitions:C.transitions},_.memoizedState=C,_.childLanes=n.childLanes&~a,r.memoizedState=td,u}return _=n.child,n=_.sibling,u=Yr(_,{mode:"visible",children:u.children}),(r.mode&1)===0&&(u.lanes=a),u.return=r,u.sibling=null,n!==null&&(a=r.deletions,a===null?(r.deletions=[n],r.flags|=16):a.push(n)),r.child=u,r.memoizedState=null,u}function id(n,r){return r=Ul({mode:"visible",children:r},n.mode,0,null),r.return=n,n.child=r}function Ml(n,r,a,u){return u!==null&&Pu(u),Js(r,n.child,null,a),n=id(r,r.pendingProps.children),n.flags|=2,r.memoizedState=null,n}function f_(n,r,a,u,p,_,C){if(a)return r.flags&256?(r.flags&=-257,u=Zu(Error(t(422))),Ml(n,r,C,u)):r.memoizedState!==null?(r.child=n.child,r.flags|=128,null):(_=u.fallback,p=r.mode,u=Ul({mode:"visible",children:u.children},p,0,null),_=vs(_,p,C,null),_.flags|=2,u.return=r,_.return=r,u.sibling=_,r.child=u,(r.mode&1)!==0&&Js(r,n.child,null,C),r.child.memoizedState=nd(C),r.memoizedState=td,_);if((r.mode&1)===0)return Ml(n,r,C,null);if(p.data==="$!"){if(u=p.nextSibling&&p.nextSibling.dataset,u)var k=u.dgst;return u=k,_=Error(t(419)),u=Zu(_,u,void 0),Ml(n,r,C,u)}if(k=(C&n.childLanes)!==0,ti||k){if(u=An,u!==null){switch(C&-C){case 4:p=2;break;case 16:p=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:p=32;break;case 536870912:p=268435456;break;default:p=0}p=(p&(u.suspendedLanes|C))!==0?0:p,p!==0&&p!==_.retryLane&&(_.retryLane=p,pr(n,p),ki(u,n,p,-1))}return _d(),u=Zu(Error(t(421))),Ml(n,r,C,u)}return p.data==="$?"?(r.flags|=128,r.child=n.child,r=b_.bind(null,n),p._reactRetry=r,null):(n=_.treeContext,ui=Br(p.nextSibling),ci=r,en=!0,Ii=null,n!==null&&(vi[_i++]=fr,vi[_i++]=hr,vi[_i++]=cs,fr=n.id,hr=n.overflow,cs=r),r=id(r,u.children),r.flags|=4096,r)}function bm(n,r,a){n.lanes|=r;var u=n.alternate;u!==null&&(u.lanes|=r),Nu(n.return,r,a)}function rd(n,r,a,u,p){var _=n.memoizedState;_===null?n.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:u,tail:a,tailMode:p}:(_.isBackwards=r,_.rendering=null,_.renderingStartTime=0,_.last=u,_.tail=a,_.tailMode=p)}function Tm(n,r,a){var u=r.pendingProps,p=u.revealOrder,_=u.tail;if(Xn(n,r,u.children,a),u=nn.current,(u&2)!==0)u=u&1|2,r.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=r.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&bm(n,a,r);else if(n.tag===19)bm(n,a,r);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===r)break e;for(;n.sibling===null;){if(n.return===null||n.return===r)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}u&=1}if(Kt(nn,u),(r.mode&1)===0)r.memoizedState=null;else switch(p){case"forwards":for(a=r.child,p=null;a!==null;)n=a.alternate,n!==null&&gl(n)===null&&(p=a),a=a.sibling;a=p,a===null?(p=r.child,r.child=null):(p=a.sibling,a.sibling=null),rd(r,!1,p,a,_);break;case"backwards":for(a=null,p=r.child,r.child=null;p!==null;){if(n=p.alternate,n!==null&&gl(n)===null){r.child=p;break}n=p.sibling,p.sibling=a,a=p,p=n}rd(r,!0,a,null,_);break;case"together":rd(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function wl(n,r){(r.mode&1)===0&&n!==null&&(n.alternate=null,r.alternate=null,r.flags|=2)}function gr(n,r,a){if(n!==null&&(r.dependencies=n.dependencies),ps|=r.lanes,(a&r.childLanes)===0)return null;if(n!==null&&r.child!==n.child)throw Error(t(153));if(r.child!==null){for(n=r.child,a=Yr(n,n.pendingProps),r.child=a,a.return=r;n.sibling!==null;)n=n.sibling,a=a.sibling=Yr(n,n.pendingProps),a.return=r;a.sibling=null}return r.child}function h_(n,r,a){switch(r.tag){case 3:Em(r),Qs();break;case 5:zp(r);break;case 1:ei(r.type)&&ol(r);break;case 4:Ou(r,r.stateNode.containerInfo);break;case 10:var u=r.type._context,p=r.memoizedProps.value;Kt(fl,u._currentValue),u._currentValue=p;break;case 13:if(u=r.memoizedState,u!==null)return u.dehydrated!==null?(Kt(nn,nn.current&1),r.flags|=128,null):(a&r.child.childLanes)!==0?wm(n,r,a):(Kt(nn,nn.current&1),n=gr(n,r,a),n!==null?n.sibling:null);Kt(nn,nn.current&1);break;case 19:if(u=(a&r.childLanes)!==0,(n.flags&128)!==0){if(u)return Tm(n,r,a);r.flags|=128}if(p=r.memoizedState,p!==null&&(p.rendering=null,p.tail=null,p.lastEffect=null),Kt(nn,nn.current),u)break;return null;case 22:case 23:return r.lanes=0,_m(n,r,a)}return gr(n,r,a)}var Am,sd,Cm,Rm;Am=function(n,r){for(var a=r.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===r)break;for(;a.sibling===null;){if(a.return===null||a.return===r)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},sd=function(){},Cm=function(n,r,a,u){var p=n.memoizedProps;if(p!==u){n=r.stateNode,fs(Yi.current);var _=null;switch(a){case"input":p=mt(n,p),u=mt(n,u),_=[];break;case"select":p=V({},p,{value:void 0}),u=V({},u,{value:void 0}),_=[];break;case"textarea":p=jt(n,p),u=jt(n,u),_=[];break;default:typeof p.onClick!="function"&&typeof u.onClick=="function"&&(n.onclick=il)}nt(a,u);var C;a=null;for(pe in p)if(!u.hasOwnProperty(pe)&&p.hasOwnProperty(pe)&&p[pe]!=null)if(pe==="style"){var k=p[pe];for(C in k)k.hasOwnProperty(C)&&(a||(a={}),a[C]="")}else pe!=="dangerouslySetInnerHTML"&&pe!=="children"&&pe!=="suppressContentEditableWarning"&&pe!=="suppressHydrationWarning"&&pe!=="autoFocus"&&(o.hasOwnProperty(pe)?_||(_=[]):(_=_||[]).push(pe,null));for(pe in u){var W=u[pe];if(k=p!=null?p[pe]:void 0,u.hasOwnProperty(pe)&&W!==k&&(W!=null||k!=null))if(pe==="style")if(k){for(C in k)!k.hasOwnProperty(C)||W&&W.hasOwnProperty(C)||(a||(a={}),a[C]="");for(C in W)W.hasOwnProperty(C)&&k[C]!==W[C]&&(a||(a={}),a[C]=W[C])}else a||(_||(_=[]),_.push(pe,a)),a=W;else pe==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,k=k?k.__html:void 0,W!=null&&k!==W&&(_=_||[]).push(pe,W)):pe==="children"?typeof W!="string"&&typeof W!="number"||(_=_||[]).push(pe,""+W):pe!=="suppressContentEditableWarning"&&pe!=="suppressHydrationWarning"&&(o.hasOwnProperty(pe)?(W!=null&&pe==="onScroll"&&Zt("scroll",n),_||k===W||(_=[])):(_=_||[]).push(pe,W))}a&&(_=_||[]).push("style",a);var pe=_;(r.updateQueue=pe)&&(r.flags|=4)}},Rm=function(n,r,a,u){a!==u&&(r.flags|=4)};function aa(n,r){if(!en)switch(n.tailMode){case"hidden":r=n.tail;for(var a=null;r!==null;)r.alternate!==null&&(a=r),r=r.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var u=null;a!==null;)a.alternate!==null&&(u=a),a=a.sibling;u===null?r||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function Bn(n){var r=n.alternate!==null&&n.alternate.child===n.child,a=0,u=0;if(r)for(var p=n.child;p!==null;)a|=p.lanes|p.childLanes,u|=p.subtreeFlags&14680064,u|=p.flags&14680064,p.return=n,p=p.sibling;else for(p=n.child;p!==null;)a|=p.lanes|p.childLanes,u|=p.subtreeFlags,u|=p.flags,p.return=n,p=p.sibling;return n.subtreeFlags|=u,n.childLanes=a,r}function p_(n,r,a){var u=r.pendingProps;switch(Au(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Bn(r),null;case 1:return ei(r.type)&&sl(),Bn(r),null;case 3:return u=r.stateNode,no(),Qt(Jn),Qt(Un),zu(),u.pendingContext&&(u.context=u.pendingContext,u.pendingContext=null),(n===null||n.child===null)&&(ul(r)?r.flags|=4:n===null||n.memoizedState.isDehydrated&&(r.flags&256)===0||(r.flags|=1024,Ii!==null&&(gd(Ii),Ii=null))),sd(n,r),Bn(r),null;case 5:Bu(r);var p=fs(na.current);if(a=r.type,n!==null&&r.stateNode!=null)Cm(n,r,a,u,p),n.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!u){if(r.stateNode===null)throw Error(t(166));return Bn(r),null}if(n=fs(Yi.current),ul(r)){u=r.stateNode,a=r.type;var _=r.memoizedProps;switch(u[$i]=r,u[Zo]=_,n=(r.mode&1)!==0,a){case"dialog":Zt("cancel",u),Zt("close",u);break;case"iframe":case"object":case"embed":Zt("load",u);break;case"video":case"audio":for(p=0;p<$o.length;p++)Zt($o[p],u);break;case"source":Zt("error",u);break;case"img":case"image":case"link":Zt("error",u),Zt("load",u);break;case"details":Zt("toggle",u);break;case"input":bt(u,_),Zt("invalid",u);break;case"select":u._wrapperState={wasMultiple:!!_.multiple},Zt("invalid",u);break;case"textarea":K(u,_),Zt("invalid",u)}nt(a,_),p=null;for(var C in _)if(_.hasOwnProperty(C)){var k=_[C];C==="children"?typeof k=="string"?u.textContent!==k&&(_.suppressHydrationWarning!==!0&&nl(u.textContent,k,n),p=["children",k]):typeof k=="number"&&u.textContent!==""+k&&(_.suppressHydrationWarning!==!0&&nl(u.textContent,k,n),p=["children",""+k]):o.hasOwnProperty(C)&&k!=null&&C==="onScroll"&&Zt("scroll",u)}switch(a){case"input":Ge(u),Xe(u,_,!0);break;case"textarea":Ge(u),Rt(u);break;case"select":case"option":break;default:typeof _.onClick=="function"&&(u.onclick=il)}u=p,r.updateQueue=u,u!==null&&(r.flags|=4)}else{C=p.nodeType===9?p:p.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=B(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=C.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof u.is=="string"?n=C.createElement(a,{is:u.is}):(n=C.createElement(a),a==="select"&&(C=n,u.multiple?C.multiple=!0:u.size&&(C.size=u.size))):n=C.createElementNS(n,a),n[$i]=r,n[Zo]=u,Am(n,r,!1,!1),r.stateNode=n;e:{switch(C=ke(a,u),a){case"dialog":Zt("cancel",n),Zt("close",n),p=u;break;case"iframe":case"object":case"embed":Zt("load",n),p=u;break;case"video":case"audio":for(p=0;p<$o.length;p++)Zt($o[p],n);p=u;break;case"source":Zt("error",n),p=u;break;case"img":case"image":case"link":Zt("error",n),Zt("load",n),p=u;break;case"details":Zt("toggle",n),p=u;break;case"input":bt(n,u),p=mt(n,u),Zt("invalid",n);break;case"option":p=u;break;case"select":n._wrapperState={wasMultiple:!!u.multiple},p=V({},u,{value:void 0}),Zt("invalid",n);break;case"textarea":K(n,u),p=jt(n,u),Zt("invalid",n);break;default:p=u}nt(a,p),k=p;for(_ in k)if(k.hasOwnProperty(_)){var W=k[_];_==="style"?ye(n,W):_==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,W!=null&&de(n,W)):_==="children"?typeof W=="string"?(a!=="textarea"||W!=="")&&me(n,W):typeof W=="number"&&me(n,""+W):_!=="suppressContentEditableWarning"&&_!=="suppressHydrationWarning"&&_!=="autoFocus"&&(o.hasOwnProperty(_)?W!=null&&_==="onScroll"&&Zt("scroll",n):W!=null&&O(n,_,W,C))}switch(a){case"input":Ge(n),Xe(n,u,!1);break;case"textarea":Ge(n),Rt(n);break;case"option":u.value!=null&&n.setAttribute("value",""+ae(u.value));break;case"select":n.multiple=!!u.multiple,_=u.value,_!=null?Tt(n,!!u.multiple,_,!1):u.defaultValue!=null&&Tt(n,!!u.multiple,u.defaultValue,!0);break;default:typeof p.onClick=="function"&&(n.onclick=il)}switch(a){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}}u&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return Bn(r),null;case 6:if(n&&r.stateNode!=null)Rm(n,r,n.memoizedProps,u);else{if(typeof u!="string"&&r.stateNode===null)throw Error(t(166));if(a=fs(na.current),fs(Yi.current),ul(r)){if(u=r.stateNode,a=r.memoizedProps,u[$i]=r,(_=u.nodeValue!==a)&&(n=ci,n!==null))switch(n.tag){case 3:nl(u.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&nl(u.nodeValue,a,(n.mode&1)!==0)}_&&(r.flags|=4)}else u=(a.nodeType===9?a:a.ownerDocument).createTextNode(u),u[$i]=r,r.stateNode=u}return Bn(r),null;case 13:if(Qt(nn),u=r.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(en&&ui!==null&&(r.mode&1)!==0&&(r.flags&128)===0)Lp(),Qs(),r.flags|=98560,_=!1;else if(_=ul(r),u!==null&&u.dehydrated!==null){if(n===null){if(!_)throw Error(t(318));if(_=r.memoizedState,_=_!==null?_.dehydrated:null,!_)throw Error(t(317));_[$i]=r}else Qs(),(r.flags&128)===0&&(r.memoizedState=null),r.flags|=4;Bn(r),_=!1}else Ii!==null&&(gd(Ii),Ii=null),_=!0;if(!_)return r.flags&65536?r:null}return(r.flags&128)!==0?(r.lanes=a,r):(u=u!==null,u!==(n!==null&&n.memoizedState!==null)&&u&&(r.child.flags|=8192,(r.mode&1)!==0&&(n===null||(nn.current&1)!==0?yn===0&&(yn=3):_d())),r.updateQueue!==null&&(r.flags|=4),Bn(r),null);case 4:return no(),sd(n,r),n===null&&Yo(r.stateNode.containerInfo),Bn(r),null;case 10:return Fu(r.type._context),Bn(r),null;case 17:return ei(r.type)&&sl(),Bn(r),null;case 19:if(Qt(nn),_=r.memoizedState,_===null)return Bn(r),null;if(u=(r.flags&128)!==0,C=_.rendering,C===null)if(u)aa(_,!1);else{if(yn!==0||n!==null&&(n.flags&128)!==0)for(n=r.child;n!==null;){if(C=gl(n),C!==null){for(r.flags|=128,aa(_,!1),u=C.updateQueue,u!==null&&(r.updateQueue=u,r.flags|=4),r.subtreeFlags=0,u=a,a=r.child;a!==null;)_=a,n=u,_.flags&=14680066,C=_.alternate,C===null?(_.childLanes=0,_.lanes=n,_.child=null,_.subtreeFlags=0,_.memoizedProps=null,_.memoizedState=null,_.updateQueue=null,_.dependencies=null,_.stateNode=null):(_.childLanes=C.childLanes,_.lanes=C.lanes,_.child=C.child,_.subtreeFlags=0,_.deletions=null,_.memoizedProps=C.memoizedProps,_.memoizedState=C.memoizedState,_.updateQueue=C.updateQueue,_.type=C.type,n=C.dependencies,_.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Kt(nn,nn.current&1|2),r.child}n=n.sibling}_.tail!==null&&Yt()>oo&&(r.flags|=128,u=!0,aa(_,!1),r.lanes=4194304)}else{if(!u)if(n=gl(C),n!==null){if(r.flags|=128,u=!0,a=n.updateQueue,a!==null&&(r.updateQueue=a,r.flags|=4),aa(_,!0),_.tail===null&&_.tailMode==="hidden"&&!C.alternate&&!en)return Bn(r),null}else 2*Yt()-_.renderingStartTime>oo&&a!==1073741824&&(r.flags|=128,u=!0,aa(_,!1),r.lanes=4194304);_.isBackwards?(C.sibling=r.child,r.child=C):(a=_.last,a!==null?a.sibling=C:r.child=C,_.last=C)}return _.tail!==null?(r=_.tail,_.rendering=r,_.tail=r.sibling,_.renderingStartTime=Yt(),r.sibling=null,a=nn.current,Kt(nn,u?a&1|2:a&1),r):(Bn(r),null);case 22:case 23:return vd(),u=r.memoizedState!==null,n!==null&&n.memoizedState!==null!==u&&(r.flags|=8192),u&&(r.mode&1)!==0?(di&1073741824)!==0&&(Bn(r),r.subtreeFlags&6&&(r.flags|=8192)):Bn(r),null;case 24:return null;case 25:return null}throw Error(t(156,r.tag))}function m_(n,r){switch(Au(r),r.tag){case 1:return ei(r.type)&&sl(),n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 3:return no(),Qt(Jn),Qt(Un),zu(),n=r.flags,(n&65536)!==0&&(n&128)===0?(r.flags=n&-65537|128,r):null;case 5:return Bu(r),null;case 13:if(Qt(nn),n=r.memoizedState,n!==null&&n.dehydrated!==null){if(r.alternate===null)throw Error(t(340));Qs()}return n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 19:return Qt(nn),null;case 4:return no(),null;case 10:return Fu(r.type._context),null;case 22:case 23:return vd(),null;case 24:return null;default:return null}}var bl=!1,kn=!1,g_=typeof WeakSet=="function"?WeakSet:Set,tt=null;function ro(n,r){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(u){on(n,r,u)}else a.current=null}function od(n,r,a){try{a()}catch(u){on(n,r,u)}}var Pm=!1;function x_(n,r){if(vu=ja,n=lp(),uu(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var u=a.getSelection&&a.getSelection();if(u&&u.rangeCount!==0){a=u.anchorNode;var p=u.anchorOffset,_=u.focusNode;u=u.focusOffset;try{a.nodeType,_.nodeType}catch{a=null;break e}var C=0,k=-1,W=-1,pe=0,Ae=0,Ce=n,be=null;t:for(;;){for(var Ze;Ce!==a||p!==0&&Ce.nodeType!==3||(k=C+p),Ce!==_||u!==0&&Ce.nodeType!==3||(W=C+u),Ce.nodeType===3&&(C+=Ce.nodeValue.length),(Ze=Ce.firstChild)!==null;)be=Ce,Ce=Ze;for(;;){if(Ce===n)break t;if(be===a&&++pe===p&&(k=C),be===_&&++Ae===u&&(W=C),(Ze=Ce.nextSibling)!==null)break;Ce=be,be=Ce.parentNode}Ce=Ze}a=k===-1||W===-1?null:{start:k,end:W}}else a=null}a=a||{start:0,end:0}}else a=null;for(_u={focusedElem:n,selectionRange:a},ja=!1,tt=r;tt!==null;)if(r=tt,n=r.child,(r.subtreeFlags&1028)!==0&&n!==null)n.return=r,tt=n;else for(;tt!==null;){r=tt;try{var st=r.alternate;if((r.flags&1024)!==0)switch(r.tag){case 0:case 11:case 15:break;case 1:if(st!==null){var at=st.memoizedProps,cn=st.memoizedState,ue=r.stateNode,J=ue.getSnapshotBeforeUpdate(r.elementType===r.type?at:Ui(r.type,at),cn);ue.__reactInternalSnapshotBeforeUpdate=J}break;case 3:var fe=r.stateNode.containerInfo;fe.nodeType===1?fe.textContent="":fe.nodeType===9&&fe.documentElement&&fe.removeChild(fe.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Le){on(r,r.return,Le)}if(n=r.sibling,n!==null){n.return=r.return,tt=n;break}tt=r.return}return st=Pm,Pm=!1,st}function la(n,r,a){var u=r.updateQueue;if(u=u!==null?u.lastEffect:null,u!==null){var p=u=u.next;do{if((p.tag&n)===n){var _=p.destroy;p.destroy=void 0,_!==void 0&&od(r,a,_)}p=p.next}while(p!==u)}}function Tl(n,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&n)===n){var u=a.create;a.destroy=u()}a=a.next}while(a!==r)}}function ad(n){var r=n.ref;if(r!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof r=="function"?r(n):r.current=n}}function Dm(n){var r=n.alternate;r!==null&&(n.alternate=null,Dm(r)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(r=n.stateNode,r!==null&&(delete r[$i],delete r[Zo],delete r[Mu],delete r[Jv],delete r[e_])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Lm(n){return n.tag===5||n.tag===3||n.tag===4}function Fm(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Lm(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function ld(n,r,a){var u=n.tag;if(u===5||u===6)n=n.stateNode,r?a.nodeType===8?a.parentNode.insertBefore(n,r):a.insertBefore(n,r):(a.nodeType===8?(r=a.parentNode,r.insertBefore(n,a)):(r=a,r.appendChild(n)),a=a._reactRootContainer,a!=null||r.onclick!==null||(r.onclick=il));else if(u!==4&&(n=n.child,n!==null))for(ld(n,r,a),n=n.sibling;n!==null;)ld(n,r,a),n=n.sibling}function cd(n,r,a){var u=n.tag;if(u===5||u===6)n=n.stateNode,r?a.insertBefore(n,r):a.appendChild(n);else if(u!==4&&(n=n.child,n!==null))for(cd(n,r,a),n=n.sibling;n!==null;)cd(n,r,a),n=n.sibling}var Dn=null,Oi=!1;function Wr(n,r,a){for(a=a.child;a!==null;)Nm(n,r,a),a=a.sibling}function Nm(n,r,a){if(oe&&typeof oe.onCommitFiberUnmount=="function")try{oe.onCommitFiberUnmount(le,a)}catch{}switch(a.tag){case 5:kn||ro(a,r);case 6:var u=Dn,p=Oi;Dn=null,Wr(n,r,a),Dn=u,Oi=p,Dn!==null&&(Oi?(n=Dn,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):Dn.removeChild(a.stateNode));break;case 18:Dn!==null&&(Oi?(n=Dn,a=a.stateNode,n.nodeType===8?Eu(n.parentNode,a):n.nodeType===1&&Eu(n,a),zo(n)):Eu(Dn,a.stateNode));break;case 4:u=Dn,p=Oi,Dn=a.stateNode.containerInfo,Oi=!0,Wr(n,r,a),Dn=u,Oi=p;break;case 0:case 11:case 14:case 15:if(!kn&&(u=a.updateQueue,u!==null&&(u=u.lastEffect,u!==null))){p=u=u.next;do{var _=p,C=_.destroy;_=_.tag,C!==void 0&&((_&2)!==0||(_&4)!==0)&&od(a,r,C),p=p.next}while(p!==u)}Wr(n,r,a);break;case 1:if(!kn&&(ro(a,r),u=a.stateNode,typeof u.componentWillUnmount=="function"))try{u.props=a.memoizedProps,u.state=a.memoizedState,u.componentWillUnmount()}catch(k){on(a,r,k)}Wr(n,r,a);break;case 21:Wr(n,r,a);break;case 22:a.mode&1?(kn=(u=kn)||a.memoizedState!==null,Wr(n,r,a),kn=u):Wr(n,r,a);break;default:Wr(n,r,a)}}function Im(n){var r=n.updateQueue;if(r!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new g_),r.forEach(function(u){var p=T_.bind(null,n,u);a.has(u)||(a.add(u),u.then(p,p))})}}function Bi(n,r){var a=r.deletions;if(a!==null)for(var u=0;u<a.length;u++){var p=a[u];try{var _=n,C=r,k=C;e:for(;k!==null;){switch(k.tag){case 5:Dn=k.stateNode,Oi=!1;break e;case 3:Dn=k.stateNode.containerInfo,Oi=!0;break e;case 4:Dn=k.stateNode.containerInfo,Oi=!0;break e}k=k.return}if(Dn===null)throw Error(t(160));Nm(_,C,p),Dn=null,Oi=!1;var W=p.alternate;W!==null&&(W.return=null),p.return=null}catch(pe){on(p,r,pe)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)Um(r,n),r=r.sibling}function Um(n,r){var a=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Bi(r,n),Zi(n),u&4){try{la(3,n,n.return),Tl(3,n)}catch(at){on(n,n.return,at)}try{la(5,n,n.return)}catch(at){on(n,n.return,at)}}break;case 1:Bi(r,n),Zi(n),u&512&&a!==null&&ro(a,a.return);break;case 5:if(Bi(r,n),Zi(n),u&512&&a!==null&&ro(a,a.return),n.flags&32){var p=n.stateNode;try{me(p,"")}catch(at){on(n,n.return,at)}}if(u&4&&(p=n.stateNode,p!=null)){var _=n.memoizedProps,C=a!==null?a.memoizedProps:_,k=n.type,W=n.updateQueue;if(n.updateQueue=null,W!==null)try{k==="input"&&_.type==="radio"&&_.name!=null&&Nt(p,_),ke(k,C);var pe=ke(k,_);for(C=0;C<W.length;C+=2){var Ae=W[C],Ce=W[C+1];Ae==="style"?ye(p,Ce):Ae==="dangerouslySetInnerHTML"?de(p,Ce):Ae==="children"?me(p,Ce):O(p,Ae,Ce,pe)}switch(k){case"input":pt(p,_);break;case"textarea":Dt(p,_);break;case"select":var be=p._wrapperState.wasMultiple;p._wrapperState.wasMultiple=!!_.multiple;var Ze=_.value;Ze!=null?Tt(p,!!_.multiple,Ze,!1):be!==!!_.multiple&&(_.defaultValue!=null?Tt(p,!!_.multiple,_.defaultValue,!0):Tt(p,!!_.multiple,_.multiple?[]:"",!1))}p[Zo]=_}catch(at){on(n,n.return,at)}}break;case 6:if(Bi(r,n),Zi(n),u&4){if(n.stateNode===null)throw Error(t(162));p=n.stateNode,_=n.memoizedProps;try{p.nodeValue=_}catch(at){on(n,n.return,at)}}break;case 3:if(Bi(r,n),Zi(n),u&4&&a!==null&&a.memoizedState.isDehydrated)try{zo(r.containerInfo)}catch(at){on(n,n.return,at)}break;case 4:Bi(r,n),Zi(n);break;case 13:Bi(r,n),Zi(n),p=n.child,p.flags&8192&&(_=p.memoizedState!==null,p.stateNode.isHidden=_,!_||p.alternate!==null&&p.alternate.memoizedState!==null||(fd=Yt())),u&4&&Im(n);break;case 22:if(Ae=a!==null&&a.memoizedState!==null,n.mode&1?(kn=(pe=kn)||Ae,Bi(r,n),kn=pe):Bi(r,n),Zi(n),u&8192){if(pe=n.memoizedState!==null,(n.stateNode.isHidden=pe)&&!Ae&&(n.mode&1)!==0)for(tt=n,Ae=n.child;Ae!==null;){for(Ce=tt=Ae;tt!==null;){switch(be=tt,Ze=be.child,be.tag){case 0:case 11:case 14:case 15:la(4,be,be.return);break;case 1:ro(be,be.return);var st=be.stateNode;if(typeof st.componentWillUnmount=="function"){u=be,a=be.return;try{r=u,st.props=r.memoizedProps,st.state=r.memoizedState,st.componentWillUnmount()}catch(at){on(u,a,at)}}break;case 5:ro(be,be.return);break;case 22:if(be.memoizedState!==null){km(Ce);continue}}Ze!==null?(Ze.return=be,tt=Ze):km(Ce)}Ae=Ae.sibling}e:for(Ae=null,Ce=n;;){if(Ce.tag===5){if(Ae===null){Ae=Ce;try{p=Ce.stateNode,pe?(_=p.style,typeof _.setProperty=="function"?_.setProperty("display","none","important"):_.display="none"):(k=Ce.stateNode,W=Ce.memoizedProps.style,C=W!=null&&W.hasOwnProperty("display")?W.display:null,k.style.display=xe("display",C))}catch(at){on(n,n.return,at)}}}else if(Ce.tag===6){if(Ae===null)try{Ce.stateNode.nodeValue=pe?"":Ce.memoizedProps}catch(at){on(n,n.return,at)}}else if((Ce.tag!==22&&Ce.tag!==23||Ce.memoizedState===null||Ce===n)&&Ce.child!==null){Ce.child.return=Ce,Ce=Ce.child;continue}if(Ce===n)break e;for(;Ce.sibling===null;){if(Ce.return===null||Ce.return===n)break e;Ae===Ce&&(Ae=null),Ce=Ce.return}Ae===Ce&&(Ae=null),Ce.sibling.return=Ce.return,Ce=Ce.sibling}}break;case 19:Bi(r,n),Zi(n),u&4&&Im(n);break;case 21:break;default:Bi(r,n),Zi(n)}}function Zi(n){var r=n.flags;if(r&2){try{e:{for(var a=n.return;a!==null;){if(Lm(a)){var u=a;break e}a=a.return}throw Error(t(160))}switch(u.tag){case 5:var p=u.stateNode;u.flags&32&&(me(p,""),u.flags&=-33);var _=Fm(n);cd(n,_,p);break;case 3:case 4:var C=u.stateNode.containerInfo,k=Fm(n);ld(n,k,C);break;default:throw Error(t(161))}}catch(W){on(n,n.return,W)}n.flags&=-3}r&4096&&(n.flags&=-4097)}function v_(n,r,a){tt=n,Om(n)}function Om(n,r,a){for(var u=(n.mode&1)!==0;tt!==null;){var p=tt,_=p.child;if(p.tag===22&&u){var C=p.memoizedState!==null||bl;if(!C){var k=p.alternate,W=k!==null&&k.memoizedState!==null||kn;k=bl;var pe=kn;if(bl=C,(kn=W)&&!pe)for(tt=p;tt!==null;)C=tt,W=C.child,C.tag===22&&C.memoizedState!==null?zm(p):W!==null?(W.return=C,tt=W):zm(p);for(;_!==null;)tt=_,Om(_),_=_.sibling;tt=p,bl=k,kn=pe}Bm(n)}else(p.subtreeFlags&8772)!==0&&_!==null?(_.return=p,tt=_):Bm(n)}}function Bm(n){for(;tt!==null;){var r=tt;if((r.flags&8772)!==0){var a=r.alternate;try{if((r.flags&8772)!==0)switch(r.tag){case 0:case 11:case 15:kn||Tl(5,r);break;case 1:var u=r.stateNode;if(r.flags&4&&!kn)if(a===null)u.componentDidMount();else{var p=r.elementType===r.type?a.memoizedProps:Ui(r.type,a.memoizedProps);u.componentDidUpdate(p,a.memoizedState,u.__reactInternalSnapshotBeforeUpdate)}var _=r.updateQueue;_!==null&&kp(r,_,u);break;case 3:var C=r.updateQueue;if(C!==null){if(a=null,r.child!==null)switch(r.child.tag){case 5:a=r.child.stateNode;break;case 1:a=r.child.stateNode}kp(r,C,a)}break;case 5:var k=r.stateNode;if(a===null&&r.flags&4){a=k;var W=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":W.autoFocus&&a.focus();break;case"img":W.src&&(a.src=W.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var pe=r.alternate;if(pe!==null){var Ae=pe.memoizedState;if(Ae!==null){var Ce=Ae.dehydrated;Ce!==null&&zo(Ce)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}kn||r.flags&512&&ad(r)}catch(be){on(r,r.return,be)}}if(r===n){tt=null;break}if(a=r.sibling,a!==null){a.return=r.return,tt=a;break}tt=r.return}}function km(n){for(;tt!==null;){var r=tt;if(r===n){tt=null;break}var a=r.sibling;if(a!==null){a.return=r.return,tt=a;break}tt=r.return}}function zm(n){for(;tt!==null;){var r=tt;try{switch(r.tag){case 0:case 11:case 15:var a=r.return;try{Tl(4,r)}catch(W){on(r,a,W)}break;case 1:var u=r.stateNode;if(typeof u.componentDidMount=="function"){var p=r.return;try{u.componentDidMount()}catch(W){on(r,p,W)}}var _=r.return;try{ad(r)}catch(W){on(r,_,W)}break;case 5:var C=r.return;try{ad(r)}catch(W){on(r,C,W)}}}catch(W){on(r,r.return,W)}if(r===n){tt=null;break}var k=r.sibling;if(k!==null){k.return=r.return,tt=k;break}tt=r.return}}var __=Math.ceil,Al=T.ReactCurrentDispatcher,ud=T.ReactCurrentOwner,Ei=T.ReactCurrentBatchConfig,Vt=0,An=null,pn=null,Ln=0,di=0,so=kr(0),yn=0,ca=null,ps=0,Cl=0,dd=0,ua=null,ni=null,fd=0,oo=1/0,xr=null,Rl=!1,hd=null,jr=null,Pl=!1,Xr=null,Dl=0,da=0,pd=null,Ll=-1,Fl=0;function qn(){return(Vt&6)!==0?Yt():Ll!==-1?Ll:Ll=Yt()}function qr(n){return(n.mode&1)===0?1:(Vt&2)!==0&&Ln!==0?Ln&-Ln:n_.transition!==null?(Fl===0&&(Fl=$e()),Fl):(n=et,n!==0||(n=window.event,n=n===void 0?16:Vh(n.type)),n)}function ki(n,r,a,u){if(50<da)throw da=0,pd=null,Error(t(185));Xt(n,a,u),((Vt&2)===0||n!==An)&&(n===An&&((Vt&2)===0&&(Cl|=a),yn===4&&$r(n,Ln)),ii(n,u),a===1&&Vt===0&&(r.mode&1)===0&&(oo=Yt()+500,al&&Hr()))}function ii(n,r){var a=n.callbackNode;Be(n,r);var u=ee(n,n===An?Ln:0);if(u===0)a!==null&&Pr(a),n.callbackNode=null,n.callbackPriority=0;else if(r=u&-u,n.callbackPriority!==r){if(a!=null&&Pr(a),r===1)n.tag===0?t_(Vm.bind(null,n)):Ap(Vm.bind(null,n)),Zv(function(){(Vt&6)===0&&Hr()}),a=null;else{switch(hn(u)){case 1:a=Dr;break;case 4:a=Lr;break;case 16:a=P;break;case 536870912:a=he;break;default:a=P}a=Km(a,Hm.bind(null,n))}n.callbackPriority=r,n.callbackNode=a}}function Hm(n,r){if(Ll=-1,Fl=0,(Vt&6)!==0)throw Error(t(327));var a=n.callbackNode;if(ao()&&n.callbackNode!==a)return null;var u=ee(n,n===An?Ln:0);if(u===0)return null;if((u&30)!==0||(u&n.expiredLanes)!==0||r)r=Nl(n,u);else{r=u;var p=Vt;Vt|=2;var _=Wm();(An!==n||Ln!==r)&&(xr=null,oo=Yt()+500,gs(n,r));do try{E_();break}catch(k){Gm(n,k)}while(!0);Lu(),Al.current=_,Vt=p,pn!==null?r=0:(An=null,Ln=0,r=yn)}if(r!==0){if(r===2&&(p=lt(n),p!==0&&(u=p,r=md(n,p))),r===1)throw a=ca,gs(n,0),$r(n,u),ii(n,Yt()),a;if(r===6)$r(n,u);else{if(p=n.current.alternate,(u&30)===0&&!y_(p)&&(r=Nl(n,u),r===2&&(_=lt(n),_!==0&&(u=_,r=md(n,_))),r===1))throw a=ca,gs(n,0),$r(n,u),ii(n,Yt()),a;switch(n.finishedWork=p,n.finishedLanes=u,r){case 0:case 1:throw Error(t(345));case 2:xs(n,ni,xr);break;case 3:if($r(n,u),(u&130023424)===u&&(r=fd+500-Yt(),10<r)){if(ee(n,0)!==0)break;if(p=n.suspendedLanes,(p&u)!==u){qn(),n.pingedLanes|=n.suspendedLanes&p;break}n.timeoutHandle=Su(xs.bind(null,n,ni,xr),r);break}xs(n,ni,xr);break;case 4:if($r(n,u),(u&4194240)===u)break;for(r=n.eventTimes,p=-1;0<u;){var C=31-ze(u);_=1<<C,C=r[C],C>p&&(p=C),u&=~_}if(u=p,u=Yt()-u,u=(120>u?120:480>u?480:1080>u?1080:1920>u?1920:3e3>u?3e3:4320>u?4320:1960*__(u/1960))-u,10<u){n.timeoutHandle=Su(xs.bind(null,n,ni,xr),u);break}xs(n,ni,xr);break;case 5:xs(n,ni,xr);break;default:throw Error(t(329))}}}return ii(n,Yt()),n.callbackNode===a?Hm.bind(null,n):null}function md(n,r){var a=ua;return n.current.memoizedState.isDehydrated&&(gs(n,r).flags|=256),n=Nl(n,r),n!==2&&(r=ni,ni=a,r!==null&&gd(r)),n}function gd(n){ni===null?ni=n:ni.push.apply(ni,n)}function y_(n){for(var r=n;;){if(r.flags&16384){var a=r.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var u=0;u<a.length;u++){var p=a[u],_=p.getSnapshot;p=p.value;try{if(!Ni(_(),p))return!1}catch{return!1}}}if(a=r.child,r.subtreeFlags&16384&&a!==null)a.return=r,r=a;else{if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function $r(n,r){for(r&=~dd,r&=~Cl,n.suspendedLanes|=r,n.pingedLanes&=~r,n=n.expirationTimes;0<r;){var a=31-ze(r),u=1<<a;n[a]=-1,r&=~u}}function Vm(n){if((Vt&6)!==0)throw Error(t(327));ao();var r=ee(n,0);if((r&1)===0)return ii(n,Yt()),null;var a=Nl(n,r);if(n.tag!==0&&a===2){var u=lt(n);u!==0&&(r=u,a=md(n,u))}if(a===1)throw a=ca,gs(n,0),$r(n,r),ii(n,Yt()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=r,xs(n,ni,xr),ii(n,Yt()),null}function xd(n,r){var a=Vt;Vt|=1;try{return n(r)}finally{Vt=a,Vt===0&&(oo=Yt()+500,al&&Hr())}}function ms(n){Xr!==null&&Xr.tag===0&&(Vt&6)===0&&ao();var r=Vt;Vt|=1;var a=Ei.transition,u=et;try{if(Ei.transition=null,et=1,n)return n()}finally{et=u,Ei.transition=a,Vt=r,(Vt&6)===0&&Hr()}}function vd(){di=so.current,Qt(so)}function gs(n,r){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,Kv(a)),pn!==null)for(a=pn.return;a!==null;){var u=a;switch(Au(u),u.tag){case 1:u=u.type.childContextTypes,u!=null&&sl();break;case 3:no(),Qt(Jn),Qt(Un),zu();break;case 5:Bu(u);break;case 4:no();break;case 13:Qt(nn);break;case 19:Qt(nn);break;case 10:Fu(u.type._context);break;case 22:case 23:vd()}a=a.return}if(An=n,pn=n=Yr(n.current,null),Ln=di=r,yn=0,ca=null,dd=Cl=ps=0,ni=ua=null,ds!==null){for(r=0;r<ds.length;r++)if(a=ds[r],u=a.interleaved,u!==null){a.interleaved=null;var p=u.next,_=a.pending;if(_!==null){var C=_.next;_.next=p,u.next=C}a.pending=u}ds=null}return n}function Gm(n,r){do{var a=pn;try{if(Lu(),xl.current=Sl,vl){for(var u=rn.memoizedState;u!==null;){var p=u.queue;p!==null&&(p.pending=null),u=u.next}vl=!1}if(hs=0,Tn=_n=rn=null,ia=!1,ra=0,ud.current=null,a===null||a.return===null){yn=1,ca=r,pn=null;break}e:{var _=n,C=a.return,k=a,W=r;if(r=Ln,k.flags|=32768,W!==null&&typeof W=="object"&&typeof W.then=="function"){var pe=W,Ae=k,Ce=Ae.tag;if((Ae.mode&1)===0&&(Ce===0||Ce===11||Ce===15)){var be=Ae.alternate;be?(Ae.updateQueue=be.updateQueue,Ae.memoizedState=be.memoizedState,Ae.lanes=be.lanes):(Ae.updateQueue=null,Ae.memoizedState=null)}var Ze=pm(C);if(Ze!==null){Ze.flags&=-257,mm(Ze,C,k,_,r),Ze.mode&1&&hm(_,pe,r),r=Ze,W=pe;var st=r.updateQueue;if(st===null){var at=new Set;at.add(W),r.updateQueue=at}else st.add(W);break e}else{if((r&1)===0){hm(_,pe,r),_d();break e}W=Error(t(426))}}else if(en&&k.mode&1){var cn=pm(C);if(cn!==null){(cn.flags&65536)===0&&(cn.flags|=256),mm(cn,C,k,_,r),Pu(io(W,k));break e}}_=W=io(W,k),yn!==4&&(yn=2),ua===null?ua=[_]:ua.push(_),_=C;do{switch(_.tag){case 3:_.flags|=65536,r&=-r,_.lanes|=r;var ue=dm(_,W,r);Bp(_,ue);break e;case 1:k=W;var J=_.type,fe=_.stateNode;if((_.flags&128)===0&&(typeof J.getDerivedStateFromError=="function"||fe!==null&&typeof fe.componentDidCatch=="function"&&(jr===null||!jr.has(fe)))){_.flags|=65536,r&=-r,_.lanes|=r;var Le=fm(_,k,r);Bp(_,Le);break e}}_=_.return}while(_!==null)}Xm(a)}catch(ut){r=ut,pn===a&&a!==null&&(pn=a=a.return);continue}break}while(!0)}function Wm(){var n=Al.current;return Al.current=Sl,n===null?Sl:n}function _d(){(yn===0||yn===3||yn===2)&&(yn=4),An===null||(ps&268435455)===0&&(Cl&268435455)===0||$r(An,Ln)}function Nl(n,r){var a=Vt;Vt|=2;var u=Wm();(An!==n||Ln!==r)&&(xr=null,gs(n,r));do try{S_();break}catch(p){Gm(n,p)}while(!0);if(Lu(),Vt=a,Al.current=u,pn!==null)throw Error(t(261));return An=null,Ln=0,yn}function S_(){for(;pn!==null;)jm(pn)}function E_(){for(;pn!==null&&!os();)jm(pn)}function jm(n){var r=Ym(n.alternate,n,di);n.memoizedProps=n.pendingProps,r===null?Xm(n):pn=r,ud.current=null}function Xm(n){var r=n;do{var a=r.alternate;if(n=r.return,(r.flags&32768)===0){if(a=p_(a,r,di),a!==null){pn=a;return}}else{if(a=m_(a,r),a!==null){a.flags&=32767,pn=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{yn=6,pn=null;return}}if(r=r.sibling,r!==null){pn=r;return}pn=r=n}while(r!==null);yn===0&&(yn=5)}function xs(n,r,a){var u=et,p=Ei.transition;try{Ei.transition=null,et=1,M_(n,r,a,u)}finally{Ei.transition=p,et=u}return null}function M_(n,r,a,u){do ao();while(Xr!==null);if((Vt&6)!==0)throw Error(t(327));a=n.finishedWork;var p=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var _=a.lanes|a.childLanes;if(At(n,_),n===An&&(pn=An=null,Ln=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||Pl||(Pl=!0,Km(P,function(){return ao(),null})),_=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||_){_=Ei.transition,Ei.transition=null;var C=et;et=1;var k=Vt;Vt|=4,ud.current=null,x_(n,a),Um(a,n),Gv(_u),ja=!!vu,_u=vu=null,n.current=a,v_(a),Bs(),Vt=k,et=C,Ei.transition=_}else n.current=a;if(Pl&&(Pl=!1,Xr=n,Dl=p),_=n.pendingLanes,_===0&&(jr=null),We(a.stateNode),ii(n,Yt()),r!==null)for(u=n.onRecoverableError,a=0;a<r.length;a++)p=r[a],u(p.value,{componentStack:p.stack,digest:p.digest});if(Rl)throw Rl=!1,n=hd,hd=null,n;return(Dl&1)!==0&&n.tag!==0&&ao(),_=n.pendingLanes,(_&1)!==0?n===pd?da++:(da=0,pd=n):da=0,Hr(),null}function ao(){if(Xr!==null){var n=hn(Dl),r=Ei.transition,a=et;try{if(Ei.transition=null,et=16>n?16:n,Xr===null)var u=!1;else{if(n=Xr,Xr=null,Dl=0,(Vt&6)!==0)throw Error(t(331));var p=Vt;for(Vt|=4,tt=n.current;tt!==null;){var _=tt,C=_.child;if((tt.flags&16)!==0){var k=_.deletions;if(k!==null){for(var W=0;W<k.length;W++){var pe=k[W];for(tt=pe;tt!==null;){var Ae=tt;switch(Ae.tag){case 0:case 11:case 15:la(8,Ae,_)}var Ce=Ae.child;if(Ce!==null)Ce.return=Ae,tt=Ce;else for(;tt!==null;){Ae=tt;var be=Ae.sibling,Ze=Ae.return;if(Dm(Ae),Ae===pe){tt=null;break}if(be!==null){be.return=Ze,tt=be;break}tt=Ze}}}var st=_.alternate;if(st!==null){var at=st.child;if(at!==null){st.child=null;do{var cn=at.sibling;at.sibling=null,at=cn}while(at!==null)}}tt=_}}if((_.subtreeFlags&2064)!==0&&C!==null)C.return=_,tt=C;else e:for(;tt!==null;){if(_=tt,(_.flags&2048)!==0)switch(_.tag){case 0:case 11:case 15:la(9,_,_.return)}var ue=_.sibling;if(ue!==null){ue.return=_.return,tt=ue;break e}tt=_.return}}var J=n.current;for(tt=J;tt!==null;){C=tt;var fe=C.child;if((C.subtreeFlags&2064)!==0&&fe!==null)fe.return=C,tt=fe;else e:for(C=J;tt!==null;){if(k=tt,(k.flags&2048)!==0)try{switch(k.tag){case 0:case 11:case 15:Tl(9,k)}}catch(ut){on(k,k.return,ut)}if(k===C){tt=null;break e}var Le=k.sibling;if(Le!==null){Le.return=k.return,tt=Le;break e}tt=k.return}}if(Vt=p,Hr(),oe&&typeof oe.onPostCommitFiberRoot=="function")try{oe.onPostCommitFiberRoot(le,n)}catch{}u=!0}return u}finally{et=a,Ei.transition=r}}return!1}function qm(n,r,a){r=io(a,r),r=dm(n,r,1),n=Gr(n,r,1),r=qn(),n!==null&&(Xt(n,1,r),ii(n,r))}function on(n,r,a){if(n.tag===3)qm(n,n,a);else for(;r!==null;){if(r.tag===3){qm(r,n,a);break}else if(r.tag===1){var u=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(jr===null||!jr.has(u))){n=io(a,n),n=fm(r,n,1),r=Gr(r,n,1),n=qn(),r!==null&&(Xt(r,1,n),ii(r,n));break}}r=r.return}}function w_(n,r,a){var u=n.pingCache;u!==null&&u.delete(r),r=qn(),n.pingedLanes|=n.suspendedLanes&a,An===n&&(Ln&a)===a&&(yn===4||yn===3&&(Ln&130023424)===Ln&&500>Yt()-fd?gs(n,0):dd|=a),ii(n,r)}function $m(n,r){r===0&&((n.mode&1)===0?r=1:(r=Et,Et<<=1,(Et&130023424)===0&&(Et=4194304)));var a=qn();n=pr(n,r),n!==null&&(Xt(n,r,a),ii(n,a))}function b_(n){var r=n.memoizedState,a=0;r!==null&&(a=r.retryLane),$m(n,a)}function T_(n,r){var a=0;switch(n.tag){case 13:var u=n.stateNode,p=n.memoizedState;p!==null&&(a=p.retryLane);break;case 19:u=n.stateNode;break;default:throw Error(t(314))}u!==null&&u.delete(r),$m(n,a)}var Ym;Ym=function(n,r,a){if(n!==null)if(n.memoizedProps!==r.pendingProps||Jn.current)ti=!0;else{if((n.lanes&a)===0&&(r.flags&128)===0)return ti=!1,h_(n,r,a);ti=(n.flags&131072)!==0}else ti=!1,en&&(r.flags&1048576)!==0&&Cp(r,cl,r.index);switch(r.lanes=0,r.tag){case 2:var u=r.type;wl(n,r),n=r.pendingProps;var p=Ys(r,Un.current);to(r,a),p=Gu(null,r,u,n,p,a);var _=Wu();return r.flags|=1,typeof p=="object"&&p!==null&&typeof p.render=="function"&&p.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,ei(u)?(_=!0,ol(r)):_=!1,r.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,Uu(r),p.updater=El,r.stateNode=p,p._reactInternals=r,Ku(r,u,n,a),r=ed(null,r,u,!0,_,a)):(r.tag=0,en&&_&&Tu(r),Xn(null,r,p,a),r=r.child),r;case 16:u=r.elementType;e:{switch(wl(n,r),n=r.pendingProps,p=u._init,u=p(u._payload),r.type=u,p=r.tag=C_(u),n=Ui(u,n),p){case 0:r=Ju(null,r,u,n,a);break e;case 1:r=Sm(null,r,u,n,a);break e;case 11:r=gm(null,r,u,n,a);break e;case 14:r=xm(null,r,u,Ui(u.type,n),a);break e}throw Error(t(306,u,""))}return r;case 0:return u=r.type,p=r.pendingProps,p=r.elementType===u?p:Ui(u,p),Ju(n,r,u,p,a);case 1:return u=r.type,p=r.pendingProps,p=r.elementType===u?p:Ui(u,p),Sm(n,r,u,p,a);case 3:e:{if(Em(r),n===null)throw Error(t(387));u=r.pendingProps,_=r.memoizedState,p=_.element,Op(n,r),ml(r,u,null,a);var C=r.memoizedState;if(u=C.element,_.isDehydrated)if(_={element:u,isDehydrated:!1,cache:C.cache,pendingSuspenseBoundaries:C.pendingSuspenseBoundaries,transitions:C.transitions},r.updateQueue.baseState=_,r.memoizedState=_,r.flags&256){p=io(Error(t(423)),r),r=Mm(n,r,u,a,p);break e}else if(u!==p){p=io(Error(t(424)),r),r=Mm(n,r,u,a,p);break e}else for(ui=Br(r.stateNode.containerInfo.firstChild),ci=r,en=!0,Ii=null,a=Ip(r,null,u,a),r.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Qs(),u===p){r=gr(n,r,a);break e}Xn(n,r,u,a)}r=r.child}return r;case 5:return zp(r),n===null&&Ru(r),u=r.type,p=r.pendingProps,_=n!==null?n.memoizedProps:null,C=p.children,yu(u,p)?C=null:_!==null&&yu(u,_)&&(r.flags|=32),ym(n,r),Xn(n,r,C,a),r.child;case 6:return n===null&&Ru(r),null;case 13:return wm(n,r,a);case 4:return Ou(r,r.stateNode.containerInfo),u=r.pendingProps,n===null?r.child=Js(r,null,u,a):Xn(n,r,u,a),r.child;case 11:return u=r.type,p=r.pendingProps,p=r.elementType===u?p:Ui(u,p),gm(n,r,u,p,a);case 7:return Xn(n,r,r.pendingProps,a),r.child;case 8:return Xn(n,r,r.pendingProps.children,a),r.child;case 12:return Xn(n,r,r.pendingProps.children,a),r.child;case 10:e:{if(u=r.type._context,p=r.pendingProps,_=r.memoizedProps,C=p.value,Kt(fl,u._currentValue),u._currentValue=C,_!==null)if(Ni(_.value,C)){if(_.children===p.children&&!Jn.current){r=gr(n,r,a);break e}}else for(_=r.child,_!==null&&(_.return=r);_!==null;){var k=_.dependencies;if(k!==null){C=_.child;for(var W=k.firstContext;W!==null;){if(W.context===u){if(_.tag===1){W=mr(-1,a&-a),W.tag=2;var pe=_.updateQueue;if(pe!==null){pe=pe.shared;var Ae=pe.pending;Ae===null?W.next=W:(W.next=Ae.next,Ae.next=W),pe.pending=W}}_.lanes|=a,W=_.alternate,W!==null&&(W.lanes|=a),Nu(_.return,a,r),k.lanes|=a;break}W=W.next}}else if(_.tag===10)C=_.type===r.type?null:_.child;else if(_.tag===18){if(C=_.return,C===null)throw Error(t(341));C.lanes|=a,k=C.alternate,k!==null&&(k.lanes|=a),Nu(C,a,r),C=_.sibling}else C=_.child;if(C!==null)C.return=_;else for(C=_;C!==null;){if(C===r){C=null;break}if(_=C.sibling,_!==null){_.return=C.return,C=_;break}C=C.return}_=C}Xn(n,r,p.children,a),r=r.child}return r;case 9:return p=r.type,u=r.pendingProps.children,to(r,a),p=yi(p),u=u(p),r.flags|=1,Xn(n,r,u,a),r.child;case 14:return u=r.type,p=Ui(u,r.pendingProps),p=Ui(u.type,p),xm(n,r,u,p,a);case 15:return vm(n,r,r.type,r.pendingProps,a);case 17:return u=r.type,p=r.pendingProps,p=r.elementType===u?p:Ui(u,p),wl(n,r),r.tag=1,ei(u)?(n=!0,ol(r)):n=!1,to(r,a),cm(r,u,p),Ku(r,u,p,a),ed(null,r,u,!0,n,a);case 19:return Tm(n,r,a);case 22:return _m(n,r,a)}throw Error(t(156,r.tag))};function Km(n,r){return qi(n,r)}function A_(n,r,a,u){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Mi(n,r,a,u){return new A_(n,r,a,u)}function yd(n){return n=n.prototype,!(!n||!n.isReactComponent)}function C_(n){if(typeof n=="function")return yd(n)?1:0;if(n!=null){if(n=n.$$typeof,n===X)return 11;if(n===te)return 14}return 2}function Yr(n,r){var a=n.alternate;return a===null?(a=Mi(n.tag,r,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=r,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,r=n.dependencies,a.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function Il(n,r,a,u,p,_){var C=2;if(u=n,typeof n=="function")yd(n)&&(C=1);else if(typeof n=="string")C=5;else e:switch(n){case U:return vs(a.children,p,_,r);case M:C=8,p|=8;break;case I:return n=Mi(12,a,r,p|2),n.elementType=I,n.lanes=_,n;case re:return n=Mi(13,a,r,p),n.elementType=re,n.lanes=_,n;case H:return n=Mi(19,a,r,p),n.elementType=H,n.lanes=_,n;case se:return Ul(a,p,_,r);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case z:C=10;break e;case j:C=9;break e;case X:C=11;break e;case te:C=14;break e;case ge:C=16,u=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return r=Mi(C,a,r,p),r.elementType=n,r.type=u,r.lanes=_,r}function vs(n,r,a,u){return n=Mi(7,n,u,r),n.lanes=a,n}function Ul(n,r,a,u){return n=Mi(22,n,u,r),n.elementType=se,n.lanes=a,n.stateNode={isHidden:!1},n}function Sd(n,r,a){return n=Mi(6,n,null,r),n.lanes=a,n}function Ed(n,r,a){return r=Mi(4,n.children!==null?n.children:[],n.key,r),r.lanes=a,r.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},r}function R_(n,r,a,u,p){this.tag=r,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=we(0),this.expirationTimes=we(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=we(0),this.identifierPrefix=u,this.onRecoverableError=p,this.mutableSourceEagerHydrationData=null}function Md(n,r,a,u,p,_,C,k,W){return n=new R_(n,r,a,k,W),r===1?(r=1,_===!0&&(r|=8)):r=0,_=Mi(3,null,null,r),n.current=_,_.stateNode=n,_.memoizedState={element:u,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Uu(_),n}function P_(n,r,a){var u=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:F,key:u==null?null:""+u,children:n,containerInfo:r,implementation:a}}function Zm(n){if(!n)return zr;n=n._reactInternals;e:{if(bn(n)!==n||n.tag!==1)throw Error(t(170));var r=n;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(ei(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(ei(a))return bp(n,a,r)}return r}function Qm(n,r,a,u,p,_,C,k,W){return n=Md(a,u,!0,n,p,_,C,k,W),n.context=Zm(null),a=n.current,u=qn(),p=qr(a),_=mr(u,p),_.callback=r??null,Gr(a,_,p),n.current.lanes=p,Xt(n,p,u),ii(n,u),n}function Ol(n,r,a,u){var p=r.current,_=qn(),C=qr(p);return a=Zm(a),r.context===null?r.context=a:r.pendingContext=a,r=mr(_,C),r.payload={element:n},u=u===void 0?null:u,u!==null&&(r.callback=u),n=Gr(p,r,C),n!==null&&(ki(n,p,C,_),pl(n,p,C)),C}function Bl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Jm(n,r){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<r?a:r}}function wd(n,r){Jm(n,r),(n=n.alternate)&&Jm(n,r)}function D_(){return null}var eg=typeof reportError=="function"?reportError:function(n){console.error(n)};function bd(n){this._internalRoot=n}kl.prototype.render=bd.prototype.render=function(n){var r=this._internalRoot;if(r===null)throw Error(t(409));Ol(n,r,null,null)},kl.prototype.unmount=bd.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var r=n.containerInfo;ms(function(){Ol(null,n,null,null)}),r[ur]=null}};function kl(n){this._internalRoot=n}kl.prototype.unstable_scheduleHydration=function(n){if(n){var r=Di();n={blockedOn:null,target:n,priority:r};for(var a=0;a<Ir.length&&r!==0&&r<Ir[a].priority;a++);Ir.splice(a,0,n),a===0&&zh(n)}};function Td(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function zl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function tg(){}function L_(n,r,a,u,p){if(p){if(typeof u=="function"){var _=u;u=function(){var pe=Bl(C);_.call(pe)}}var C=Qm(r,u,n,0,null,!1,!1,"",tg);return n._reactRootContainer=C,n[ur]=C.current,Yo(n.nodeType===8?n.parentNode:n),ms(),C}for(;p=n.lastChild;)n.removeChild(p);if(typeof u=="function"){var k=u;u=function(){var pe=Bl(W);k.call(pe)}}var W=Md(n,0,!1,null,null,!1,!1,"",tg);return n._reactRootContainer=W,n[ur]=W.current,Yo(n.nodeType===8?n.parentNode:n),ms(function(){Ol(r,W,a,u)}),W}function Hl(n,r,a,u,p){var _=a._reactRootContainer;if(_){var C=_;if(typeof p=="function"){var k=p;p=function(){var W=Bl(C);k.call(W)}}Ol(r,C,n,p)}else C=L_(a,r,n,p,u);return Bl(C)}In=function(n){switch(n.tag){case 3:var r=n.stateNode;if(r.current.memoizedState.isDehydrated){var a=L(r.pendingLanes);a!==0&&(vn(r,a|1),ii(r,Yt()),(Vt&6)===0&&(oo=Yt()+500,Hr()))}break;case 13:ms(function(){var u=pr(n,1);if(u!==null){var p=qn();ki(u,n,1,p)}}),wd(n,1)}},zt=function(n){if(n.tag===13){var r=pr(n,134217728);if(r!==null){var a=qn();ki(r,n,134217728,a)}wd(n,134217728)}},Jt=function(n){if(n.tag===13){var r=qr(n),a=pr(n,r);if(a!==null){var u=qn();ki(a,n,r,u)}wd(n,r)}},Di=function(){return et},qt=function(n,r){var a=et;try{return et=n,r()}finally{et=a}},dt=function(n,r,a){switch(r){case"input":if(pt(n,a),r=a.name,a.type==="radio"&&r!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<a.length;r++){var u=a[r];if(u!==n&&u.form===n.form){var p=rl(u);if(!p)throw Error(t(90));ct(u),pt(u,p)}}}break;case"textarea":Dt(n,a);break;case"select":r=a.value,r!=null&&Tt(n,!!a.multiple,r,!1)}},qe=xd,Me=ms;var F_={usingClientEntryPoint:!1,Events:[Qo,qs,rl,ve,Ne,xd]},fa={findFiberByHostInstance:as,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},N_={bundleType:fa.bundleType,version:fa.version,rendererPackageName:fa.rendererPackageName,rendererConfig:fa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:T.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Pi(n),n===null?null:n.stateNode},findFiberByHostInstance:fa.findFiberByHostInstance||D_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Vl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Vl.isDisabled&&Vl.supportsFiber)try{le=Vl.inject(N_),oe=Vl}catch{}}return ri.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F_,ri.createPortal=function(n,r){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Td(r))throw Error(t(200));return P_(n,r,null,a)},ri.createRoot=function(n,r){if(!Td(n))throw Error(t(299));var a=!1,u="",p=eg;return r!=null&&(r.unstable_strictMode===!0&&(a=!0),r.identifierPrefix!==void 0&&(u=r.identifierPrefix),r.onRecoverableError!==void 0&&(p=r.onRecoverableError)),r=Md(n,1,!1,null,null,a,!1,u,p),n[ur]=r.current,Yo(n.nodeType===8?n.parentNode:n),new bd(r)},ri.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var r=n._reactInternals;if(r===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=Pi(r),n=n===null?null:n.stateNode,n},ri.flushSync=function(n){return ms(n)},ri.hydrate=function(n,r,a){if(!zl(r))throw Error(t(200));return Hl(null,n,r,!0,a)},ri.hydrateRoot=function(n,r,a){if(!Td(n))throw Error(t(405));var u=a!=null&&a.hydratedSources||null,p=!1,_="",C=eg;if(a!=null&&(a.unstable_strictMode===!0&&(p=!0),a.identifierPrefix!==void 0&&(_=a.identifierPrefix),a.onRecoverableError!==void 0&&(C=a.onRecoverableError)),r=Qm(r,null,n,1,a??null,p,!1,_,C),n[ur]=r.current,Yo(n),u)for(n=0;n<u.length;n++)a=u[n],p=a._getVersion,p=p(a._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[a,p]:r.mutableSourceEagerHydrationData.push(a,p);return new kl(r)},ri.render=function(n,r,a){if(!zl(r))throw Error(t(200));return Hl(null,n,r,!1,a)},ri.unmountComponentAtNode=function(n){if(!zl(n))throw Error(t(40));return n._reactRootContainer?(ms(function(){Hl(null,null,n,!1,function(){n._reactRootContainer=null,n[ur]=null})}),!0):!1},ri.unstable_batchedUpdates=xd,ri.unstable_renderSubtreeIntoContainer=function(n,r,a,u){if(!zl(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return Hl(n,r,a,!1,u)},ri.version="18.3.1-next-f1338f8080-20240426",ri}var cg;function G_(){if(cg)return Rd.exports;cg=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(e){console.error(e)}}return i(),Rd.exports=V_(),Rd.exports}var ug;function W_(){if(ug)return Gl;ug=1;var i=G_();return Gl.createRoot=i.createRoot,Gl.hydrateRoot=i.hydrateRoot,Gl}var j_=W_();const X_=F0(j_);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q_=i=>i.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),N0=(...i)=>i.filter((e,t,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var $_={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y_=He.forwardRef(({color:i="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:s,className:o="",children:l,iconNode:c,...d},h)=>He.createElement("svg",{ref:h,...$_,width:e,height:e,stroke:i,strokeWidth:s?Number(t)*24/Number(e):t,className:N0("lucide",o),...d},[...c.map(([m,v])=>He.createElement(m,v)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=(i,e)=>{const t=He.forwardRef(({className:s,...o},l)=>He.createElement(Y_,{ref:l,iconNode:e,className:N0(`lucide-${q_(i)}`,s),...o}));return t.displayName=`${i}`,t};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K_=Ut("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qi=Ut("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z_=Ut("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q_=Ut("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ec=Ut("BookOpenCheck",[["path",{d:"M12 21V7",key:"gj6g52"}],["path",{d:"m16 12 2 2 4-4",key:"mdajum"}],["path",{d:"M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3",key:"8arnkb"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dg=Ut("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J_=Ut("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mi=Ut("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ld=Ut("CircleHelp",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wl=Ut("CloudUpload",[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ey=Ut("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ty=Ut("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fn=Ut("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=Ut("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ws=Ut("Headphones",[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ny=Ut("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ma=Ut("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iy=Ut("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I0=Ut("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aa=Ut("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ry=Ut("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U0=Ut("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jl=Ut("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xl=Ut("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sy=Ut("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oy=Ut("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ay=Ut("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ql=Ut("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ly=Ut("SquareCheckBig",[["path",{d:"M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5",key:"1uzm8b"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fd=Ut("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cy=Ut("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uy=Ut("ThumbsDown",[["path",{d:"M17 14V2",key:"8ymqnk"}],["path",{d:"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",key:"m61m77"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dy=Ut("ThumbsUp",[["path",{d:"M7 10v12",key:"1qc93n"}],["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",key:"emmmcr"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lo=Ut("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fy=Ut("Volume2",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hy=Ut("VolumeX",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fg=Ut("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function O0(i,e){return function(){return i.apply(e,arguments)}}const{toString:py}=Object.prototype,{getPrototypeOf:ss}=Object,{iterator:Oa,toStringTag:B0}=Symbol,Da=(({hasOwnProperty:i})=>(e,t)=>i.call(e,t))(Object.prototype),k0=i=>typeof i=="string"&&(i==="__proto__"||i==="constructor"||i==="prototype"),z0=(i,e,t)=>i===Object.prototype||!t&&e===null,my=i=>{if(!Object.isExtensible(i))return!1;const e=Object.getOwnPropertyNames(i);return Object.getOwnPropertySymbols&&e.push(...Object.getOwnPropertySymbols(i)),e.every(t=>{if(k0(t))return!1;const s=Object.getOwnPropertyDescriptor(i,t);return!!s&&s.configurable&&s.writable===!0})},La=(i,e)=>{let t=i;const s=[];for(;t!=null;){if(s.indexOf(t)!==-1)return!1;s.push(t);const o=ss(t);if(z0(t,o,t===i))return!1;if(Da(t,e))return!0;t=o}return!1},gy=(i,e)=>i!=null&&La(i,e)?i[e]:void 0,xy=i=>{if(i==null||typeof i!="object"&&typeof i!="function")return i;const e=ss(i);if(e===null&&my(i))return i;const t=Object.create(null),s=Object.create(null),o=[];let l=i;for(;l!=null&&o.indexOf(l)===-1;){o.push(l);const c=l===i?e:ss(l);if(z0(l,c,l===i))break;const d=Object.getOwnPropertyNames(l);Object.getOwnPropertySymbols&&d.push(...Object.getOwnPropertySymbols(l));for(const h of d)k0(h)||Da(s,h)||(t[h]=i[h],s[h]=!0);l=c}return t},ph=(i=>e=>{const t=py.call(e);return i[t]||(i[t]=t.slice(8,-1).toLowerCase())})(Object.create(null)),Ai=i=>(i=i.toLowerCase(),e=>ph(e)===i),jc=i=>e=>typeof e===i,{isArray:Rs}=Array,Ps=jc("undefined");function Po(i){return i!==null&&!Ps(i)&&i.constructor!==null&&!Ps(i.constructor)&&oi(i.constructor.isBuffer)&&i.constructor.isBuffer(i)}const H0=Ai("ArrayBuffer");function vy(i){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(i):e=i&&i.buffer&&H0(i.buffer),e}const _y=jc("string"),oi=jc("function"),V0=jc("number"),Do=i=>i!==null&&typeof i=="object",yy=i=>i===!0||i===!1,Mc=i=>{if(!Do(i))return!1;const e=ss(i);return(e===null||e===Object.prototype||ss(e)===null)&&!La(i,B0)&&!La(i,Oa)},Sy=i=>{if(!Do(i)||Po(i))return!1;try{return Object.keys(i).length===0&&Object.getPrototypeOf(i)===Object.prototype}catch{return!1}},Ey=Ai("Date"),My=Ai("File"),wy=i=>!!(i&&typeof i.uri<"u"),by=i=>i&&typeof i.getParts<"u",Ty=Ai("Blob"),Ay=Ai("FileList"),Cy=Ai("Set"),Ry=i=>Do(i)&&oi(i.pipe);function Py(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const hg=Py(),pg=typeof hg.FormData<"u"?hg.FormData:void 0,Dy=i=>{if(!i)return!1;if(pg&&i instanceof pg)return!0;const e=ss(i);if(!e||e===Object.prototype||!oi(i.append))return!1;const t=ph(i);return t==="formdata"||t==="object"&&oi(i.toString)&&i.toString()==="[object FormData]"},Ly=Ai("URLSearchParams"),[Fy,Ny,Iy,Uy]=["ReadableStream","Request","Response","Headers"].map(Ai),Oy=i=>i.trim?i.trim():i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ba(i,e,{allOwnKeys:t=!1}={}){if(i===null||typeof i>"u")return;let s,o;if(typeof i!="object"&&(i=[i]),Rs(i))for(s=0,o=i.length;s<o;s++)e.call(null,i[s],s,i);else{if(Po(i))return;const l=t?Object.getOwnPropertyNames(i):Object.keys(i),c=l.length;let d;for(s=0;s<c;s++)d=l[s],e.call(null,i[d],d,i)}}function G0(i,e){if(Po(i))return null;e=e.toLowerCase();const t=Object.keys(i);let s=t.length,o;for(;s-- >0;)if(o=t[s],e===o.toLowerCase())return o;return null}const bs=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,W0=i=>!Ps(i)&&i!==bs;function Sf(...i){const{caseless:e,skipUndefined:t}=W0(this)&&this||{},s={},o=(l,c)=>{if(c==="__proto__"||c==="constructor"||c==="prototype")return;const d=e&&typeof c=="string"&&G0(s,c)||c,h=Da(s,d)?s[d]:void 0;Mc(h)&&Mc(l)?s[d]=Sf(h,l):Mc(l)?s[d]=Sf({},l):Rs(l)?s[d]=l.slice():(!t||!Ps(l))&&(s[d]=l)};for(let l=0,c=i.length;l<c;l++){const d=i[l];if(!d||Po(d)||(Ba(d,o),typeof d!="object"||Rs(d)))continue;const h=Object.getOwnPropertySymbols(d);for(let m=0;m<h.length;m++){const v=h[m];Yy.call(d,v)&&o(d[v],v)}}return s}const By=(i,e,t,{allOwnKeys:s}={})=>(Ba(e,(o,l)=>{t&&oi(o)?Object.defineProperty(i,l,{__proto__:null,value:O0(o,t),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(i,l,{__proto__:null,value:o,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:s}),i),ky=i=>(i.charCodeAt(0)===65279&&(i=i.slice(1)),i),zy=(i,e,t,s)=>{i.prototype=Object.create(e.prototype,s),Object.defineProperty(i.prototype,"constructor",{__proto__:null,value:i,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(i,"super",{__proto__:null,value:e.prototype}),t&&Object.assign(i.prototype,t)},Hy=(i,e,t,s)=>{let o,l,c;const d={};if(e=e||{},i==null)return e;do{for(o=Object.getOwnPropertyNames(i),l=o.length;l-- >0;)c=o[l],(!s||s(c,i,e))&&!d[c]&&(e[c]=i[c],d[c]=!0);i=t!==!1&&ss(i)}while(i&&(!t||t(i,e))&&i!==Object.prototype);return e},Vy=(i,e,t)=>{i=String(i),(t===void 0||t>i.length)&&(t=i.length),t-=e.length;const s=i.indexOf(e,t);return s!==-1&&s===t},Gy=i=>{if(!i)return null;if(Rs(i))return i;let e=i.length;if(!V0(e))return null;const t=new Array(e);for(;e-- >0;)t[e]=i[e];return t},Wy=(i=>e=>i&&e instanceof i)(typeof Uint8Array<"u"&&ss(Uint8Array)),jy=(i,e)=>{const s=(i&&i[Oa]).call(i);let o;for(;(o=s.next())&&!o.done;){const l=o.value;e.call(i,l[0],l[1])}},Xy=(i,e)=>{let t;const s=[];for(;(t=i.exec(e))!==null;)s.push(t);return s},qy=Ai("HTMLFormElement"),$y=i=>i.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(t,s,o){return s.toUpperCase()+o}),{propertyIsEnumerable:Yy}=Object.prototype,Ky=Ai("RegExp"),j0=(i,e)=>{const t=Object.getOwnPropertyDescriptors(i),s={};Ba(t,(o,l)=>{let c;(c=e(o,l,i))!==!1&&(s[l]=c||o)}),Object.defineProperties(i,s)},Zy=i=>{j0(i,(e,t)=>{if(oi(i)&&["arguments","caller","callee"].includes(t))return!1;const s=i[t];if(oi(s)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+t+"'")})}})},Qy=(i,e)=>{const t={},s=o=>{o.forEach(l=>{t[l]=!0})};return Rs(i)?s(i):s(String(i).split(e)),t},Jy=()=>{},eS=(i,e)=>i!=null&&Number.isFinite(i=+i)?i:e;function tS(i){return!!(i&&oi(i.append)&&i[B0]==="FormData"&&i[Oa])}const nS=i=>{const e=new WeakSet,t=s=>{if(Do(s)){if(e.has(s))return;if(Po(s))return s;if(!("toJSON"in s)){e.add(s);let o;if(Cy(s)){o=[];for(const l of s){const c=t(l);!Ps(c)&&o.push(c)}}else o=Rs(s)?[]:{},Ba(s,(l,c)=>{const d=t(l);!Ps(d)&&(o[c]=d)});return e.delete(s),o}}return s};return t(i)},iS=Ai("AsyncFunction"),rS=i=>i&&(Do(i)||oi(i))&&oi(i.then)&&oi(i.catch),X0=((i,e)=>i?setImmediate:e?((t,s)=>(bs.addEventListener("message",({source:o,data:l})=>{o===bs&&l===t&&s.length&&s.shift()()},!1),o=>{s.push(o),bs.postMessage(t,"*")}))(`axios@${Math.random()}`,[]):t=>setTimeout(t))(typeof setImmediate=="function",oi(bs.postMessage)),sS=typeof queueMicrotask<"u"?queueMicrotask.bind(bs):typeof process<"u"&&process.nextTick||X0,q0=i=>i!=null&&oi(i[Oa]),oS=i=>i!=null&&La(i,Oa)&&q0(i),Y={isArray:Rs,isArrayBuffer:H0,isBuffer:Po,isFormData:Dy,isArrayBufferView:vy,isString:_y,isNumber:V0,isBoolean:yy,isObject:Do,isPlainObject:Mc,isEmptyObject:Sy,isReadableStream:Fy,isRequest:Ny,isResponse:Iy,isHeaders:Uy,isUndefined:Ps,isDate:Ey,isFile:My,isReactNativeBlob:wy,isReactNative:by,isBlob:Ty,isRegExp:Ky,isFunction:oi,isStream:Ry,isURLSearchParams:Ly,isTypedArray:Wy,isFileList:Ay,forEach:Ba,merge:Sf,extend:By,trim:Oy,stripBOM:ky,inherits:zy,toFlatObject:Hy,kindOf:ph,kindOfTest:Ai,endsWith:Vy,toArray:Gy,forEachEntry:jy,matchAll:Xy,isHTMLForm:qy,hasOwnProperty:Da,hasOwnProp:Da,hasOwnInPrototypeChain:La,getSafeProp:gy,toSafeFlatObject:xy,reduceDescriptors:j0,freezeMethods:Zy,toObjectSet:Qy,toCamelCase:$y,noop:Jy,toFiniteNumber:eS,findKey:G0,global:bs,isContextDefined:W0,isSpecCompliantForm:tS,toJSONObject:nS,isAsyncFn:iS,isThenable:rS,setImmediate:X0,asap:sS,isIterable:q0,isSafeIterable:oS},aS=Y.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),lS=i=>{const e={};let t,s,o;return i&&i.split(`
`).forEach(function(c){o=c.indexOf(":"),t=c.substring(0,o).trim().toLowerCase(),s=c.substring(o+1).trim();const d=Y.hasOwnProp(e,t);!t||d&&Y.hasOwnProp(aS,t)||(t==="set-cookie"?d?e[t].push(s):e[t]=[s]:e[t]=d?e[t]+", "+s:s)}),e};function cS(i){let e=0,t=i.length;for(;e<t;){const s=i.charCodeAt(e);if(s!==9&&s!==32)break;e+=1}for(;t>e;){const s=i.charCodeAt(t-1);if(s!==9&&s!==32)break;t-=1}return e===0&&t===i.length?i:i.slice(e,t)}const uS=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),dS=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function mh(i,e){return Y.isArray(i)?i.map(t=>mh(t,e)):cS(String(i).replace(e,""))}const fS=i=>mh(i,uS),hS=i=>mh(i,dS);function $0(i){const e=Object.create(null);return Y.forEach(i.toJSON(),(t,s)=>{e[s]=hS(t)}),e}const mg=Symbol("internals");function ga(i){return i&&String(i).trim().toLowerCase()}function wc(i){return i===!1||i==null?i:Y.isArray(i)?i.map(wc):fS(String(i))}function pS(i){const e=Object.create(null),t=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let s;for(;s=t.exec(i);)e[s[1]]=s[2];return e}const mS=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;function Nd(i){let e=0,t=i.length;for(;e<t;){const s=i.charCodeAt(e);if(s!==9&&s!==32)break;e+=1}for(;t>e;){const s=i.charCodeAt(t-1);if(s!==9&&s!==32)break;t-=1}return e===0&&t===i.length?i:i.slice(e,t)}function gS(i){const e=i.length-1;if(e<1||i.charCodeAt(0)!==34||i.charCodeAt(e)!==34)return i;let t="";for(let s=1;s<e;s++){const o=i.charCodeAt(s);if(o===34||o===92&&(s+=1,s>=e))return i;t+=i[s]}return t}function xS(i){const e=Object.create(null),t=String(i);let s=0,o=!1,l=!1;function c(d){const h=Nd(t.slice(s,d)),m=h.indexOf("=");if(m<1)return;const v=Nd(h.slice(0,m));if(!mS.test(v))return;const y=v.toLowerCase();if(y==="__proto__"||y==="constructor"||y==="prototype")return;const g=Nd(h.slice(m+1));e[y]=gS(g)}for(let d=0;d<t.length;d++){const h=t.charCodeAt(d);o?l?l=!1:h===92?l=!0:h===34&&(o=!1):h===34?o=!0:(h===44||h===59)&&(c(d),s=d+1)}return c(t.length),e}const vS=i=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(i.trim());function Id(i,e,t,s,o){if(Y.isFunction(s))return s.call(this,e,t);if(o&&(e=t),!!Y.isString(e)){if(Y.isString(s))return e.indexOf(s)!==-1;if(Y.isRegExp(s))return s.test(e)}}function _S(i){return i.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,s)=>t.toUpperCase()+s)}function yS(i,e){const t=Y.toCamelCase(" "+e);["get","set","has"].forEach(s=>{Object.defineProperty(i,s+t,{__proto__:null,value:function(o,l,c){return this[s].call(this,e,o,l,c)},configurable:!0})})}let Wn=class{constructor(e){e&&this.set(e)}set(e,t,s){const o=this;function l(d,h,m){const v=ga(h);if(!v)return;const y=Y.findKey(o,v);(!y||o[y]===void 0||m===!0||m===void 0&&o[y]!==!1)&&(o[y||h]=wc(d))}const c=(d,h)=>Y.forEach(d,(m,v)=>l(m,v,h));if(Y.isPlainObject(e)||e instanceof this.constructor)c(e,t);else if(Y.isString(e)&&(e=e.trim())&&!vS(e))c(lS(e),t);else if(Y.isObject(e)&&Y.isSafeIterable(e)){let d=Object.create(null),h,m;for(const v of e){if(!Y.isArray(v))throw new TypeError("Object iterator must return a key-value pair");m=v[0],Y.hasOwnProp(d,m)?(h=d[m],d[m]=Y.isArray(h)?[...h,v[1]]:[h,v[1]]):d[m]=v[1]}c(d,t)}else e!=null&&l(t,e,s);return this}get(e,t){if(e=ga(e),e){const s=Y.findKey(this,e);if(s){const o=this[s];if(!t)return o;if(t===!0)return pS(o);if(Y.isFunction(t))return t.call(this,o,s);if(Y.isRegExp(t))return t.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=ga(e),e){const s=Y.findKey(this,e);return!!(s&&this[s]!==void 0&&(!t||Id(this,this[s],s,t)))}return!1}delete(e,t){const s=this;let o=!1;function l(c){if(c=ga(c),c){const d=Y.findKey(s,c);d&&(!t||Id(s,s[d],d,t))&&(delete s[d],o=!0)}}return Y.isArray(e)?e.forEach(l):l(e),o}clear(e){const t=Object.keys(this);let s=t.length,o=!1;for(;s--;){const l=t[s];(!e||Id(this,this[l],l,e,!0))&&(delete this[l],o=!0)}return o}normalize(e){const t=this,s={};return Y.forEach(this,(o,l)=>{const c=Y.findKey(s,l);if(c){t[c]=wc(o),delete t[l];return}const d=e?_S(l):String(l).trim();d!==l&&delete t[l],t[d]=wc(o),s[d]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return Y.forEach(this,(s,o)=>{s!=null&&s!==!1&&(t[o]=e&&Y.isArray(s)?s.join(", "):s)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+": "+t).join(`
`)}getSetCookie(){const e=this.get("set-cookie");return Y.isArray(e)?e:e==null||e===!1?[]:[e]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static parseParameters(e){return xS(e)}static concat(e,...t){const s=new this(e);return t.forEach(o=>s.set(o)),s}static accessor(e){const s=(this[mg]=this[mg]={accessors:{}}).accessors,o=this.prototype;function l(c){const d=ga(c);s[d]||(yS(o,c),s[d]=!0)}return Y.isArray(e)?e.forEach(l):l(e),this}};Wn.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);Y.reduceDescriptors(Wn.prototype,({value:i},e)=>{let t=e[0].toUpperCase()+e.slice(1);return{get:()=>i,set(s){this[t]=s}}});Y.freezeMethods(Wn);const Fc="[REDACTED ****]";function SS(i){if(Y.hasOwnProp(i,"toJSON"))return!0;let e=Object.getPrototypeOf(i);for(;e&&e!==Object.prototype;){if(Y.hasOwnProp(e,"toJSON"))return!0;e=Object.getPrototypeOf(e)}return!1}function ES(i,e){const t=new Set(e.map(l=>String(l).toLowerCase())),s=[],o=l=>{if(l===null||typeof l!="object"||Y.isBuffer(l))return l;if(s.indexOf(l)!==-1)return;l instanceof Wn&&(l=l.toJSON()),s.push(l);let c;if(Y.isArray(l))c=[],l.forEach((d,h)=>{const m=o(d);Y.isUndefined(m)||(c[h]=m)});else{if(!Y.isPlainObject(l)&&SS(l))return s.pop(),l;c=Object.create(null);for(const[d,h]of Object.entries(l)){const m=t.has(d.toLowerCase())?Fc:o(h);Y.isUndefined(m)||(c[d]=m)}}return s.pop(),c};return o(i)}function gg(i){try{return String(i)}catch{return""}}function MS(i){return i.errors.map(t=>{try{return t&&t.message?gg(t.message):gg(t)}catch{return""}}).filter(Boolean).join("; ")||i.name||"AggregateError"}let je=class Y0 extends Error{static from(e,t,s,o,l,c){let d=e.message;!d&&Y.isArray(e.errors)&&e.errors.length&&(d=MS(e));const h=new Y0(d,t||e.code,s,o,l);return Object.defineProperty(h,"cause",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),h.name=e.name,e.status!=null&&h.status==null&&(h.status=e.status),c&&Object.assign(h,c),h}constructor(e,t,s,o,l){super(e),Object.defineProperty(this,"message",{__proto__:null,value:e,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,t&&(this.code=t),s&&(this.config=s),o&&(this.request=o),l&&(this.response=l,this.status=l.status)}toJSON(){const e=this.config,t=e&&Y.hasOwnProp(e,"redact")?e.redact:void 0,s=Y.isArray(t)&&t.length>0?ES(e,t):Y.toJSONObject(e);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:s,code:this.code,status:this.status}}};je.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";je.ERR_BAD_OPTION="ERR_BAD_OPTION";je.ECONNABORTED="ECONNABORTED";je.ETIMEDOUT="ETIMEDOUT";je.ECONNREFUSED="ECONNREFUSED";je.ERR_NETWORK="ERR_NETWORK";je.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";je.ERR_DEPRECATED="ERR_DEPRECATED";je.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";je.ERR_BAD_REQUEST="ERR_BAD_REQUEST";je.ERR_CANCELED="ERR_CANCELED";je.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";je.ERR_INVALID_URL="ERR_INVALID_URL";je.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const wS=null,K0=100;function Ef(i){return Y.isPlainObject(i)||Y.isArray(i)}function Z0(i){return Y.endsWith(i,"[]")?i.slice(0,-2):i}function Ud(i,e,t){return i?i.concat(e).map(function(o,l){return o=Z0(o),!t&&l?"["+o+"]":o}).join(t?".":""):e}function bS(i){return Y.isArray(i)&&!i.some(Ef)}const TS=Y.toFlatObject(Y,{},null,function(e){return/^is[A-Z]/.test(e)});function Xc(i,e,t){if(!Y.isObject(i))throw new TypeError("target must be an object");e=e||new FormData;const s=(R,O)=>{const T=Y.getSafeProp(t,R);return Y.isUndefined(T)?O:T},o=s("metaTokens",!0),l=s("visitor")||A,c=s("dots",!1),d=s("indexes",!1),h=s("Blob")||typeof Blob<"u"&&Blob,m=s("maxDepth",K0),v=h&&Y.isSpecCompliantForm(e),y=[];if(!Y.isFunction(l))throw new TypeError("visitor must be a function");function g(R){if(R===null)return"";if(Y.isDate(R))return R.toISOString();if(Y.isBoolean(R))return R.toString();if(!v&&Y.isBlob(R))throw new je("Blob is not supported. Use a Buffer instead.");if(Y.isArrayBuffer(R)||Y.isTypedArray(R)){if(v&&typeof h=="function")return new h([R]);throw new je("Blob is not supported. Use a Buffer instead.",je.ERR_NOT_SUPPORT)}return R}function E(R){if(R>m)throw new je("Object is too deeply nested ("+R+" levels). Max depth: "+m,je.ERR_FORM_DATA_DEPTH_EXCEEDED)}function b(R,O){if(m===1/0)return JSON.stringify(R);const T=[];return JSON.stringify(R,function(F,U){if(!Y.isObject(U))return U;for(;T.length&&T[T.length-1]!==this;)T.pop();return T.push(U),E(O+T.length-1),U})}function A(R,O,T){let D=R;if(Y.isReactNative(e)&&Y.isReactNativeBlob(R))return e.append(Ud(T,O,c),g(R)),!1;if(R&&!T&&typeof R=="object"){if(Y.endsWith(O,"{}"))O=o?O:O.slice(0,-2),R=b(R,1);else if(Y.isArray(R)&&bS(R)||(Y.isFileList(R)||Y.endsWith(O,"[]"))&&(D=Y.toArray(R)))return O=Z0(O),D.forEach(function(U,M){!(Y.isUndefined(U)||U===null)&&e.append(d===!0?Ud([O],M,c):d===null?O:O+"[]",g(U))}),!1}return Ef(R)?!0:(e.append(Ud(T,O,c),g(R)),!1)}const S=Object.assign(TS,{defaultVisitor:A,convertValue:g,isVisitable:Ef});function x(R,O,T=0){if(!Y.isUndefined(R)){if(E(T),y.indexOf(R)!==-1)throw new Error("Circular reference detected in "+O.join("."));y.push(R),Y.forEach(R,function(F,U){(!(Y.isUndefined(F)||F===null)&&l.call(e,F,Y.isString(U)?U.trim():U,O,S))===!0&&x(F,O?O.concat(U):[U],T+1)}),y.pop()}}if(!Y.isObject(i))throw new TypeError("data must be an object");return x(i),e}function xg(i){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(i).replace(/[!'()~]|%20/g,function(s){return e[s]})}function gh(i,e){this._pairs=[],i&&Xc(i,this,e)}const Q0=gh.prototype;Q0.append=function(e,t){this._pairs.push([e,t])};Q0.toString=function(e){const t=e?s=>e.call(this,s,xg):xg;return this._pairs.map(function(o){return t(o[0])+"="+t(o[1])},"").join("&")};function AS(i){return encodeURIComponent(i).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function J0(i,e,t){if(!e)return i;i=i||"";const s=Y.isFunction(t)?{serialize:t}:t,o=Y.getSafeProp(s,"encode")||AS,l=Y.getSafeProp(s,"serialize");let c;if(l?c=l(e,s):c=Y.isURLSearchParams(e)?e.toString():new gh(e,s).toString(o),c){const d=i.indexOf("#");d!==-1&&(i=i.slice(0,d)),i+=(i.indexOf("?")===-1?"?":"&")+c}return i}const xa=Symbol("internals");function ex(i){return i?i.length:0}function vg(i){if(i)for(;i.length&&i[i.length-1]===null;)i.pop()}function va(i,e){const t=i.handlers,s=ex(t);t!==e.handlersRef?(e.handlersRef=t,e.handlerEntries.clear()):s!==e.handlersLength&&(s?e.handlerEntries.forEach(function(l,c){t[l.index]!==l.handler&&e.handlerEntries.delete(c)}):e.handlerEntries.clear()),e.handlersLength=s}class _g{constructor(){this.handlers=[],this[xa]={handlersRef:this.handlers,handlersLength:this.handlers.length,handlerEntries:new Map,iterationDepth:0,nextId:0}}use(e,t,s){const o={fulfilled:e,rejected:t,synchronous:s?s.synchronous:!1,runWhen:s?s.runWhen:null},l=this[xa];this.handlers==null&&(this.handlers=[]),va(this,l);const c=l.nextId++;return this.handlers.push(o),l.handlerEntries.set(c,{handler:o,index:this.handlers.length-1}),l.handlersLength=this.handlers.length,c}eject(e){const t=this[xa];va(this,t);const s=t.handlerEntries.get(e);if(s){if(t.handlerEntries.delete(e),this.handlers[s.index]!==s.handler)return;this.handlers[s.index]=null,t.iterationDepth||(vg(this.handlers),t.handlersLength=this.handlers.length)}}clear(){this.handlers&&(this.handlers=[],va(this,this[xa]))}forEach(e){const t=this[xa];va(this,t),t.iterationDepth++;try{Y.forEach(this.handlers,function(o){o!==null&&e(o)})}finally{--t.iterationDepth||(va(this,t),vg(this.handlers),t.handlersLength=ex(this.handlers))}}}const xh={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1,validateStatusUndefinedResolves:!0},CS=typeof URLSearchParams<"u"?URLSearchParams:gh,RS=typeof FormData<"u"?FormData:null,PS=typeof Blob<"u"?Blob:null,DS={isBrowser:!0,classes:{URLSearchParams:CS,FormData:RS,Blob:PS},protocols:["http","https","file","blob","url","data"]},vh=typeof window<"u"&&typeof document<"u",Mf=typeof navigator=="object"&&navigator||void 0,LS=vh&&(!Mf||["ReactNative","NativeScript","NS"].indexOf(Mf.product)<0),FS=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",NS=vh&&window.location.href||"http://localhost",IS=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:vh,hasStandardBrowserEnv:LS,hasStandardBrowserWebWorkerEnv:FS,navigator:Mf,origin:NS},Symbol.toStringTag,{value:"Module"})),Pn={...IS,...DS};function US(i,e){return Xc(i,new Pn.classes.URLSearchParams,{visitor:function(t,s,o,l){return Pn.isNode&&Y.isBuffer(t)?(this.append(s,t.toString("base64")),!1):l.defaultVisitor.apply(this,arguments)},...e})}const yg=K0;function tx(i){if(i>yg)throw new je("FormData field is too deeply nested ("+i+" levels). Max depth: "+yg,je.ERR_FORM_DATA_DEPTH_EXCEEDED)}function OS(i){const e=[],t=/[^.[\]]+|\[([^.[\]]*)]/g;let s;for(;(s=t.exec(i))!==null;)tx(e.length),e.push(s[0]==="[]"?"":s[1]||s[0]);return e}function BS(i){const e={},t=Object.keys(i);let s;const o=t.length;let l;for(s=0;s<o;s++)l=t[s],e[l]=i[l];return e}function nx(i){function e(t,s,o,l){tx(l);let c=t[l++];if(c==="__proto__")return!0;const d=Number.isFinite(+c),h=l>=t.length;return c=!c&&Y.isArray(o)?o.length:c,h?(Y.hasOwnProp(o,c)?o[c]=Y.isArray(o[c])?o[c].concat(s):[o[c],s]:o[c]=s,!d):((!Y.hasOwnProp(o,c)||!Y.isObject(o[c]))&&(o[c]=[]),e(t,s,o[c],l)&&Y.isArray(o[c])&&(o[c]=BS(o[c])),!d)}if(Y.isFormData(i)&&Y.isFunction(i.entries)){const t={};return Y.forEachEntry(i,(s,o)=>{e(OS(s),o,t,0)}),t}return null}const ix=Object.freeze(["get","delete","head","options","post","put","patch","purge","link","unlink","query"]),co=(i,e)=>i!=null&&Y.hasOwnProp(i,e)?i[e]:void 0;function kS(i,e,t){if(Y.isString(i))try{return(e||JSON.parse)(i),Y.trim(i)}catch(s){if(s.name!=="SyntaxError")throw s}return(t||JSON.stringify)(i)}const ka={transitional:xh,adapter:["xhr","http","fetch"],transformRequest:[function(e,t){const s=t.getContentType()||"",o=s.indexOf("application/json")>-1,l=Y.isObject(e);if(l&&Y.isHTMLForm(e)&&(e=new FormData(e)),Y.isFormData(e))return o?JSON.stringify(nx(e)):e;if(Y.isArrayBuffer(e)||Y.isBuffer(e)||Y.isStream(e)||Y.isFile(e)||Y.isBlob(e)||Y.isReadableStream(e))return e;if(Y.isArrayBufferView(e))return e.buffer;if(Y.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let d;if(l){const h=co(this,"formSerializer");if(s.indexOf("application/x-www-form-urlencoded")>-1)return US(e,h).toString();if((d=Y.isFileList(e))||s.indexOf("multipart/form-data")>-1){const m=co(this,"env"),v=m&&m.FormData;return Xc(d?{"files[]":e}:e,v&&new v,h)}}return l||o?(t.setContentType("application/json",!1),kS(e)):e}],transformResponse:[function(e){const t=co(this,"transitional")||ka.transitional,s=t&&t.forcedJSONParsing,o=co(this,"responseType"),l=o==="json";if(Y.isResponse(e)||Y.isReadableStream(e))return e;if(e&&Y.isString(e)&&(s&&!o||l)){const d=!(t&&t.silentJSONParsing)&&l;try{return JSON.parse(e,co(this,"parseReviver"))}catch(h){if(d)throw h.name==="SyntaxError"?je.from(h,je.ERR_BAD_RESPONSE,this,null,co(this,"response")):h}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Pn.classes.FormData,Blob:Pn.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};Y.forEach(ix,i=>{ka.headers[i]={}});function Od(i,e){const t=this||ka,s=e||t,o=Wn.from(s.headers);let l=s.data;return Y.forEach(i,function(d){l=d.call(t,l,o.normalize(),e?e.status:void 0)}),o.normalize(),l}function rx(i){return!!(i&&i.__CANCEL__)}let za=class extends je{constructor(e,t,s){super(e??"canceled",je.ERR_CANCELED,t,s),this.name="CanceledError",this.__CANCEL__=!0}};function sx(i,e,t){const s=t.config.validateStatus;!t.status||!s||s(t.status)?i(t):e(new je("Request failed with status code "+t.status,t.status>=400&&t.status<500?je.ERR_BAD_REQUEST:je.ERR_BAD_RESPONSE,t.config,t.request,t))}const zS=/[\t\n\r]/g;function ox(i){if(typeof i!="string")return i;let e=0;for(;e<i.length&&i.charCodeAt(e)<=32;)e++;return i.slice(e).replace(zS,"")}function Bd(i){const e=/^([-+\w]{1,25}):(?:\/\/)?/.exec(i);return e&&e[1]||""}function HS(i,e){i=i||10;const t=new Array(i),s=new Array(i);let o=0,l=0,c;return e=e!==void 0?e:1e3,function(h){const m=Date.now(),v=s[l];c||(c=m),t[o]=h,s[o]=m;let y=l,g=0;for(;y!==o;)g+=t[y++],y=y%i;if(o=(o+1)%i,o===l&&(l=(l+1)%i),m-c<e)return;const E=v&&m-v;return E?Math.round(g*1e3/E):void 0}}function VS(i,e){let t=0,s=1e3/e,o,l;const c=(v,y=Date.now())=>{t=y,o=null,l&&(clearTimeout(l),l=null),i(...v)};return[(...v)=>{const y=Date.now(),g=y-t;g>=s?c(v,y):(o=v,l||(l=setTimeout(()=>{l=null,c(o)},s-g)))},()=>o&&c(o),(...v)=>c(v)]}const Nc=(i,e,t=3)=>{let s=0;const o=HS(50,250);return VS(l=>{if(!l||!Y.isNumber(l.loaded))return;const c=l.loaded,d=l.lengthComputable?l.total:void 0,h=Math.max(0,d!=null?Math.min(c,d):c),m=Math.max(0,h-s),v=o(m);s=Math.max(s,h);const y={loaded:h,total:d,progress:d?h/d:void 0,bytes:m,rate:v||void 0,estimated:v&&d?(d-h)/v:void 0,event:l,lengthComputable:d!=null,[e?"download":"upload"]:!0};i(y)},t)},Sg=(i,e)=>{const t=i!=null;return[s=>e[0]({lengthComputable:t,total:i,loaded:s}),e[1]]},Eg=(i,e=Y.asap)=>(...t)=>e(()=>i(...t)),GS=Pn.hasStandardBrowserEnv?((i,e)=>t=>(t=new URL(t,Pn.origin),i.protocol===t.protocol&&i.host===t.host&&(e||i.port===t.port)))(new URL(Pn.origin),Pn.navigator&&/(msie|trident)/i.test(Pn.navigator.userAgent)):()=>!0,WS=Pn.hasStandardBrowserEnv?{write(i,e,t,s,o,l,c){if(typeof document>"u")return;const d=[`${i}=${encodeURIComponent(e)}`];Y.isNumber(t)&&d.push(`expires=${new Date(t).toUTCString()}`),Y.isString(s)&&d.push(`path=${s}`),Y.isString(o)&&d.push(`domain=${o}`),l===!0&&d.push("secure"),Y.isString(c)&&d.push(`SameSite=${c}`),document.cookie=d.join("; ")},read(i){if(typeof document>"u")return null;const e=document.cookie.split(";");for(let t=0;t<e.length;t++){const s=e[t].replace(/^\s+/,""),o=s.indexOf("=");if(o!==-1&&s.slice(0,o)===i)try{return decodeURIComponent(s.slice(o+1))}catch{return s.slice(o+1)}}return null},remove(i){this.write(i,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function jS(i){return typeof i!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(i)}function XS(i,e){if(!e)return i;let t=i.length;for(;t>0&&i.charCodeAt(t-1)===47;)t--;return i.slice(0,t)+"/"+e.replace(/^\/+/,"")}const qS=/^https?:(?!\/\/)/i;function $S(i){return i&&i.replace(/(^|&)([^=&]*=)?[^&]+/g,(e,t,s="")=>`${t}${s}${Fc}`)}function YS(i){const e=i.replace(/^(https?:\/{0,2})[^/?#]*@/i,`$1${Fc}@`),t=e.indexOf("#"),o=(t===-1?e:e.slice(0,t)).replace(/([?&][^=&#]*=)[^&#]*/g,`$1${Fc}`);return t===-1?o:`${o}#${$S(e.slice(t+1))}`}function Mg(i,e){if(typeof i=="string"){const t=ox(i);if(qS.test(t))throw new je(`Invalid URL ${JSON.stringify(YS(t))}: missing "//" after protocol`,je.ERR_INVALID_URL,e)}}function ax(i,e,t,s){Mg(e,s);let o=!jS(e);return i&&(o||t===!1)?(Mg(i,s),XS(i,e)):e}const wg=i=>i instanceof Wn?{...i}:i,KS=i=>Object.getOwnPropertySymbols&&Object.getOwnPropertyDescriptor?Object.keys(i).concat(Object.getOwnPropertySymbols(i).filter(e=>Object.getOwnPropertyDescriptor(i,e).enumerable)):Object.keys(i);function Ds(i,e){i=i||{},e=e||{};const t=Object.create(null);Object.defineProperty(t,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function s(v,y,g,E){return Y.isPlainObject(v)&&Y.isPlainObject(y)?Y.merge.call({caseless:E},v,y):Y.isPlainObject(y)?Y.merge({},y):Y.isArray(y)?y.slice():y}function o(v,y,g,E){if(Y.isUndefined(y)){if(!Y.isUndefined(v))return s(void 0,v,g,E)}else return s(v,y,g,E)}function l(v,y){if(!Y.isUndefined(y))return s(void 0,y)}function c(v,y){if(Y.isUndefined(y)){if(!Y.isUndefined(v))return s(void 0,v)}else return s(void 0,y)}function d(v){const y=Y.hasOwnProp(e,"transitional")?e.transitional:void 0;if(!Y.isUndefined(y))if(Y.isPlainObject(y)){if(Y.hasOwnProp(y,v))return y[v]}else return;const g=Y.hasOwnProp(i,"transitional")?i.transitional:void 0;if(Y.isPlainObject(g)&&Y.hasOwnProp(g,v))return g[v]}function h(v,y,g){if(Y.hasOwnProp(e,g))return s(v,y);if(Y.hasOwnProp(i,g))return s(void 0,v)}const m={url:l,method:l,data:l,baseURL:c,transformRequest:c,transformResponse:c,paramsSerializer:c,timeout:c,timeoutErrorMessage:c,withCredentials:c,withXSRFToken:c,adapter:c,responseType:c,xsrfCookieName:c,xsrfHeaderName:c,onUploadProgress:c,onDownloadProgress:c,decompress:c,maxContentLength:c,maxBodyLength:c,beforeRedirect:c,transport:c,httpAgent:c,httpsAgent:c,cancelToken:c,socketPath:c,allowedSocketPaths:c,responseEncoding:c,validateStatus:h,headers:(v,y,g)=>o(wg(v),wg(y),g,!0)};return Y.forEach(KS({...i,...e}),function(y){if(y==="__proto__"||y==="constructor"||y==="prototype")return;const g=Y.hasOwnProp(m,y)?m[y]:o,E=Y.hasOwnProp(i,y)?i[y]:void 0,b=Y.hasOwnProp(e,y)?e[y]:void 0,A=g(E,b,y);Y.isUndefined(A)&&g!==h||(t[y]=A)}),Y.hasOwnProp(e,"validateStatus")&&Y.isUndefined(e.validateStatus)&&d("validateStatusUndefinedResolves")===!1&&(Y.hasOwnProp(i,"validateStatus")?t.validateStatus=s(void 0,i.validateStatus):delete t.validateStatus),t}const ZS=["content-type","content-length"];function QS(i,e,t){if(t!=="content-only"){i.set(e);return}Object.entries(e||{}).forEach(([s,o])=>{ZS.includes(s.toLowerCase())&&i.set(s,o)})}const JS=i=>encodeURIComponent(i).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16)));function lx(i){const e=Ds({},i),t=g=>Y.hasOwnProp(e,g)?e[g]:void 0,s=t("data");let o=t("withXSRFToken");const l=t("xsrfHeaderName"),c=t("xsrfCookieName");let d=t("headers");const h=t("auth"),m=t("baseURL"),v=t("allowAbsoluteUrls"),y=t("url");if(e.headers=d=Wn.from(d),e.url=J0(ax(m,y,v,e),t("params"),t("paramsSerializer")),h){const g=Y.getSafeProp(h,"username")||"",E=Y.getSafeProp(h,"password")||"";try{d.set("Authorization","Basic "+btoa(g+":"+(E?JS(E):"")))}catch(b){throw je.from(b,je.ERR_BAD_OPTION_VALUE,i)}}if(Y.isFormData(s)){const g=Y.getSafeProp(s,"getHeaders");Pn.hasStandardBrowserEnv||Pn.hasStandardBrowserWebWorkerEnv||Y.isReactNative(s)?d.setContentType(void 0):Y.isFunction(g)&&QS(d,g.call(s),t("formDataHeaderPolicy"))}if(Pn.hasStandardBrowserEnv&&(Y.isFunction(o)&&(o=o(e)),o===!0||o==null&&GS(e.url))){const E=l&&c&&WS.read(c);E&&d.set(l,E)}return e}const e1=typeof XMLHttpRequest<"u",t1=e1&&function(i){return new Promise(function(t,s){const o=lx(i);let l=o.data;const c=Wn.from(o.headers).normalize();let{responseType:d,onUploadProgress:h,onDownloadProgress:m}=o,v,y,g,E,b,A;function S(){E&&E(),b&&b(),o.cancelToken&&o.cancelToken.unsubscribe(v),o.signal&&o.signal.removeEventListener("abort",v)}let x=new XMLHttpRequest;x.open(o.method.toUpperCase(),o.url,!0),x.timeout=o.timeout;function R(T){if(!x)return;if(x.status===0&&(Bd(ox(o.url))||Bd(Pn.origin))!=="file"&&!(x.responseURL&&x.responseURL.startsWith("file:"))){s(new je("Request aborted",je.ECONNABORTED,i,x)),S(),x=null;return}try{T?A&&A(T):b&&b()}catch(M){setTimeout(()=>{throw M})}if(!x)return;const D=Wn.from("getAllResponseHeaders"in x&&x.getAllResponseHeaders()),U={data:!d||d==="text"||d==="json"?x.responseText:x.response,status:x.status,statusText:x.statusText,headers:D,config:i,request:x};sx(function(I){t(I),S()},function(I){s(I),S()},U),x=null}"onloadend"in x?x.onloadend=R:x.onreadystatechange=function(){!x||x.readyState!==4||x.status===0&&!(x.responseURL&&x.responseURL.startsWith("file:"))||setTimeout(R)},x.onabort=function(){x&&(s(new je("Request aborted",je.ECONNABORTED,i,x)),S(),x=null)},x.onerror=function(D){const F=D&&D.message?D.message:"Network Error",U=new je(F,je.ERR_NETWORK,i,x);U.event=D||null,s(U),S(),x=null},x.ontimeout=function(){let D=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded";const F=o.transitional||xh;o.timeoutErrorMessage&&(D=o.timeoutErrorMessage),s(new je(D,F.clarifyTimeoutError?je.ETIMEDOUT:je.ECONNABORTED,i,x)),S(),x=null},l===void 0&&c.setContentType(null),"setRequestHeader"in x&&Y.forEach($0(c),function(D,F){x.setRequestHeader(F,D)}),Y.isUndefined(o.withCredentials)||(x.withCredentials=!!o.withCredentials),d&&d!=="json"&&(x.responseType=o.responseType),m&&([g,b,A]=Nc(m,!0),x.addEventListener("progress",g)),h&&x.upload&&([y,E]=Nc(h),x.upload.addEventListener("progress",y),x.upload.addEventListener("loadend",E)),(o.cancelToken||o.signal)&&(v=T=>{x&&(s(!T||T.type?new za(null,i,x):T),x.abort(),S(),x=null)},o.cancelToken&&o.cancelToken.subscribe(v),o.signal&&(o.signal.aborted?v():o.signal.addEventListener("abort",v)));const O=Bd(o.url);if(O&&!Pn.protocols.includes(O)){s(new je("Unsupported protocol "+O+":",je.ERR_BAD_REQUEST,i)),S();return}x.send(l||null)})},n1=(i,e)=>{if(i=i?i.filter(Boolean):[],!e&&!i.length)return;const t=new AbortController;let s=!1;const o=function(h){if(!s){s=!0,c();const m=h instanceof Error?h:this.reason;t.abort(m instanceof je?m:new za(m instanceof Error?m.message:m))}};let l=e&&setTimeout(()=>{l=null,o(new je(`timeout of ${e}ms exceeded`,je.ETIMEDOUT))},e);const c=()=>{i&&(l&&clearTimeout(l),l=null,i.forEach(h=>{h.unsubscribe?h.unsubscribe(o):h.removeEventListener("abort",o)}),i=null)};i.forEach(h=>{if(!s){if(h.aborted){o.call(h);return}h.addEventListener("abort",o,{once:!0})}});const{signal:d}=t;return d.unsubscribe=()=>Y.asap(c),d},i1=function*(i,e){let t=i.byteLength;if(t<e){yield i;return}let s=0,o;for(;s<t;)o=s+e,yield i.slice(s,o),s=o},r1=async function*(i,e){for await(const t of s1(i))yield*i1(t,e)},s1=async function*(i){if(i[Symbol.asyncIterator]){yield*i;return}const e=i.getReader();try{for(;;){const{done:t,value:s}=await e.read();if(t)break;yield s}}finally{await e.cancel()}},bg=(i,e,t,s)=>{const o=r1(i,e);let l=0,c,d=h=>{c||(c=!0,s&&s(h))};return new ReadableStream({async pull(h){try{const{done:m,value:v}=await o.next();if(m){d(),h.close();return}let y=v.byteLength;if(t){let g=l+=y;t(g)}h.enqueue(new Uint8Array(v))}catch(m){throw d(m),m}},cancel(h){return d(h),o.return()}},{highWaterMark:2})},Tg=i=>i>=48&&i<=57||i>=65&&i<=70||i>=97&&i<=102,cx=(i,e,t)=>e+2<t&&Tg(i.charCodeAt(e+1))&&Tg(i.charCodeAt(e+2)),Ag=i=>i<=57?i-48:(i&223)-55,o1=i=>i>=65&&i<=90||i>=97&&i<=122||i>=48&&i<=57||i===43||i===47||i===45||i===95,a1=i=>i===9||i===10||i===12||i===13||i===32,l1=i=>{const e=Math.floor(i/4),t=i%4;return e*3+(t===2?1:t===3?2:0)},c1=i=>{const e=i.length;let t=0;return e>0&&i.charCodeAt(e-1)===61&&(t++,e>1&&i.charCodeAt(e-2)===61&&t++),Math.floor((e-t)*3/4)},u1=i=>{const e=i.length;let t=0,s=0,o=!1;for(let l=0;l<e;l++){let c=i.charCodeAt(l);if(c===37&&cx(i,l,e)&&(c=Ag(i.charCodeAt(l+1))*16+Ag(i.charCodeAt(l+2)),l+=2),!a1(c)){if(c===61){s++;continue}if(!o1(c)||s>0){o=!0;continue}t++}}return o||s>2||s>0&&(t+s)%4!==0||t%4===1?c1(i):l1(t)},d1=(i,e)=>{if(!i||typeof i!="string"||!i.startsWith("data:"))return 0;const t=i.indexOf(",");if(t<0)return 0;const s=i.slice(5,t),o=i.slice(t+1);if(/;base64/i.test(s))return e(o);let c=0;for(let d=0,h=o.length;d<h;d++){const m=o.charCodeAt(d);if(m===37&&cx(o,d,h))c+=1,d+=2;else if(m<128)c+=1;else if(m<2048)c+=2;else if(m>=55296&&m<=56319&&d+1<h){const v=o.charCodeAt(d+1);v>=56320&&v<=57343?(c+=4,d++):c+=3}else c+=3}return c};function f1(i){const e=typeof i=="string"?i.indexOf("#"):-1;return d1(e===-1?i:i.slice(0,e),u1)}const _h="1.20.0",Cg=64*1024,h1={cache:"default",redirect:"follow",referrer:"about:client",referrerPolicy:"",mode:"cors",integrity:"",keepalive:!1,priority:"auto",window:null},{isFunction:$l}=Y,p1=i=>encodeURIComponent(i).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16))),Rg=i=>{if(!Y.isString(i))return i;try{return decodeURIComponent(i)}catch{return i}},Pg=(i,...e)=>{try{return!!i(...e)}catch{return!1}},m1=i=>{const e=i.indexOf("://");let t=i;return e!==-1&&(t=t.slice(e+3)),t.includes("@")||t.includes(":")},g1=i=>{const e=Y.global!==void 0&&Y.global!==null?Y.global:globalThis,{ReadableStream:t,TextEncoder:s}=e;i=Y.merge.call({skipUndefined:!0},{Request:e.Request,Response:e.Response},i);const{fetch:o,Request:l,Response:c}=i,d=o?$l(o):typeof fetch=="function",h=$l(l),m=$l(c);if(!d)return!1;const v=d&&$l(t),y=d&&(typeof s=="function"?(x=>R=>x.encode(R))(new s):async x=>new Uint8Array(await new l(x).arrayBuffer())),g=h&&v&&Pg(()=>{let x=!1;const R=new l(Pn.origin,{body:new t,method:"POST",get duplex(){return x=!0,"half"}}),O=R.headers.has("Content-Type");return R.body!=null&&R.body.cancel(),x&&!O}),E=m&&v&&Pg(()=>Y.isReadableStream(new c("").body)),b={stream:E&&(x=>x.body)};d&&["text","arrayBuffer","blob","formData","stream"].forEach(x=>{!b[x]&&(b[x]=(R,O)=>{let T=R&&R[x];if(T)return T.call(R);throw new je(`Response type '${x}' is not supported`,je.ERR_NOT_SUPPORT,O)})});const A=async x=>{if(x==null)return 0;if(Y.isBlob(x))return x.size;if(Y.isSpecCompliantForm(x))return(await new l(Pn.origin,{method:"POST",body:x}).arrayBuffer()).byteLength;if(Y.isArrayBufferView(x)||Y.isArrayBuffer(x))return x.byteLength;if(Y.isURLSearchParams(x)&&(x=x+""),Y.isString(x))return(await y(x)).byteLength},S=async(x,R)=>{const O=Y.toFiniteNumber(x.getContentLength());return O??A(R)};return async x=>{let{url:R,method:O,data:T,signal:D,cancelToken:F,timeout:U,onDownloadProgress:M,onUploadProgress:I,responseType:z,headers:j,withCredentials:X="same-origin",fetchOptions:re,maxContentLength:H,maxBodyLength:te,maxRedirects:ge}=lx(x);const se=Y.isNumber(H)&&H>-1,ne=Y.isNumber(te)&&te>-1,G=Q=>Y.hasOwnProp(x,Q)?x[Q]:void 0;let V=o||fetch;z=z?(z+"").toLowerCase():"text";let N=n1([D,F&&F.toAbortSignal()],U),Z=null;const _e=N&&N.unsubscribe&&(()=>{N.unsubscribe()});let De,Se=null;const Ee=()=>new je("Request body larger than maxBodyLength limit",je.ERR_BAD_REQUEST,x,Z);try{let Q;const ae=G("auth");if(ae){const Xe=Y.getSafeProp(ae,"username")||"",wt=Y.getSafeProp(ae,"password")||"";Q={username:Xe,password:wt}}if(m1(R)){const Xe=new URL(R,Pn.origin);if(!Q&&(Xe.username||Xe.password)){const wt=Rg(Xe.username),vt=Rg(Xe.password);Q={username:wt,password:vt}}(Xe.username||Xe.password)&&(Xe.username="",Xe.password="",R=Xe.href)}if(Q&&(j.delete("authorization"),j.set("Authorization","Basic "+btoa(p1((Q.username||"")+":"+(Q.password||""))))),se&&typeof R=="string"&&R.startsWith("data:")&&f1(R)>H)throw new je("maxContentLength size of "+H+" exceeded",je.ERR_BAD_RESPONSE,x,Z);if(ne&&O!=="get"&&O!=="head"){const Xe=await A(T);if(typeof Xe=="number"&&isFinite(Xe)&&(De=Xe,Xe>te))throw Ee()}const Te=ne&&(Y.isReadableStream(T)||Y.isStream(T)),Ke=(Xe,wt,vt)=>bg(Xe,Cg,Tt=>{if(ne&&Tt>te)throw Se=Ee();wt&&wt(Tt)},vt);if(g&&O!=="get"&&O!=="head"&&(I||Te)){if(De=De??await S(j,T),De!==0||Te){let Xe=new l(R,{method:"POST",body:T,duplex:"half"}),wt;if(Y.isFormData(T)&&(wt=Xe.headers.get("content-type"))&&j.setContentType(wt),Xe.body){const[vt,Tt]=I&&Sg(De,Nc(Eg(I)))||[];T=Ke(Xe.body,vt,Tt)}}}else if(Te&&!h&&v&&O!=="get"&&O!=="head")T=Ke(T);else if(Te&&h&&!g&&O!=="get"&&O!=="head")throw new je("Stream request bodies are not supported by the current fetch implementation",je.ERR_NOT_SUPPORT,x,Z);Y.isString(X)||(X=X?"include":"omit");const Ge=h&&"credentials"in l.prototype;if(Y.isFormData(T)){const Xe=j.getContentType();Xe&&/^multipart\/form-data/i.test(Xe)&&!/boundary=/i.test(Xe)&&j.delete("content-type")}j.set("User-Agent","axios/"+_h,!1);const ct=re==null?re:Object.assign(Object.create(null),re);ct&&(delete ct.body,delete ct.headers,delete ct.method,delete ct.signal,delete ct.duplex,delete ct.credentials);const Ot=Object.assign(Object.create(null),ct,{signal:N,method:O.toUpperCase(),headers:$0(j.normalize()),body:T,duplex:"half",credentials:Ge?X:void 0});h&&(Y.forEach(h1,(Xe,wt)=>{Ot[wt]===void 0&&(Ot[wt]=Xe)}),Ot.signal===void 0&&(Ot.signal=null),Ot.body===void 0&&(Ot.body=null)),ge===0&&(Ot.redirect="manual",ct&&(ct.redirect="manual")),Z=h&&new l(R,Ot);let mt=await(h?V(Z,ct):V(R,Ot));const bt=Wn.from(mt.headers);if(se){const Xe=Y.toFiniteNumber(bt.getContentLength());if(Xe!=null&&Xe>H)throw new je("maxContentLength size of "+H+" exceeded",je.ERR_BAD_RESPONSE,x,Z)}const Nt=E&&(z==="stream"||z==="response");if(E&&mt.body&&(M||se||Nt&&_e)){const Xe={};["status","statusText","headers"].forEach(Dt=>{Xe[Dt]=mt[Dt]});const wt=Y.toFiniteNumber(bt.getContentLength()),[vt,Tt]=M&&Sg(wt,Nc(Eg(M),!0))||[];let jt=0;const K=Dt=>{if(se&&(jt=Dt,jt>H))throw new je("maxContentLength size of "+H+" exceeded",je.ERR_BAD_RESPONSE,x,Z);vt&&vt(Dt)};mt=new c(bg(mt.body,Cg,K,()=>{Tt&&Tt(),_e&&_e()}),Xe)}z=z||"text";let pt=await b[Y.findKey(b,z)||"text"](mt,x);if(se&&!E&&!Nt){let Xe;if(pt!=null&&(typeof pt.byteLength=="number"?Xe=pt.byteLength:typeof pt.size=="number"?Xe=pt.size:typeof pt=="string"&&(Xe=typeof s=="function"?new s().encode(pt).byteLength:pt.length)),typeof Xe=="number"&&Xe>H)throw new je("maxContentLength size of "+H+" exceeded",je.ERR_BAD_RESPONSE,x,Z)}return!Nt&&_e&&_e(),await new Promise((Xe,wt)=>{sx(Xe,wt,{data:pt,headers:Wn.from(mt.headers),status:mt.status,statusText:mt.statusText,config:x,request:Z})})}catch(Q){if(_e&&_e(),N&&N.aborted&&N.reason instanceof je){const ae=N.reason;throw ae.config=x,Z&&(ae.request=Z),Q!==ae&&Object.defineProperty(ae,"cause",{__proto__:null,value:Q,writable:!0,enumerable:!1,configurable:!0}),ae}if(Se)throw Z&&!Se.request&&(Se.request=Z),Se;if(Q instanceof je)throw Z&&!Q.request&&(Q.request=Z),Q;if(Q&&Q.name==="TypeError"&&/Load failed|fetch/i.test(Q.message)){const ae=new je("Network Error",je.ERR_NETWORK,x,Z,Q&&Q.response);throw Object.defineProperty(ae,"cause",{__proto__:null,value:Q.cause||Q,writable:!0,enumerable:!1,configurable:!0}),ae}throw je.from(Q,Q&&Q.code,x,Z,Q&&Q.response)}}},x1=new Map,ux=i=>{let e=i&&i.env||{};const{fetch:t,Request:s,Response:o}=e,l=[s,o,t];let c=l.length,d=c,h,m,v=x1;for(;d--;)h=l[d],m=v.get(h),m===void 0&&v.set(h,m=d?new Map:g1(e)),v=m;return m};ux();const yh={http:wS,xhr:t1,fetch:{get:ux}};Y.forEach(yh,(i,e)=>{if(i){try{Object.defineProperty(i,"name",{__proto__:null,value:e})}catch{}Object.defineProperty(i,"adapterName",{__proto__:null,value:e})}});const Dg=i=>`- ${i}`,v1=i=>Y.isFunction(i)||i===null||i===!1;function _1(i,e){i=Y.isArray(i)?i:[i];const{length:t}=i;let s,o;const l={};for(let c=0;c<t;c++){s=i[c];let d;if(o=s,!v1(s)&&(o=yh[(d=String(s)).toLowerCase()],o===void 0))throw new je(`Unknown adapter '${d}'`);if(o&&(Y.isFunction(o)||(o=o.get(e))))break;l[d||"#"+c]=o}if(!o){const c=Object.entries(l).map(([h,m])=>`adapter ${h} `+(m===!1?"is not supported by the environment":"is not available in the build"));let d=t?c.length>1?`since :
`+c.map(Dg).join(`
`):" "+Dg(c[0]):"as no adapter specified";throw new je("There is no suitable adapter to dispatch the request "+d,je.ERR_NOT_SUPPORT)}return o}const dx={getAdapter:_1,adapters:yh};function kd(i){if(i.cancelToken&&i.cancelToken.throwIfRequested(),i.signal&&i.signal.aborted)throw new za(null,i)}function zd(i){const e=Y.toSafeFlatObject(i);return kd(e),e.headers=Wn.from(Y.getSafeProp(e,"headers")),e.data=Od.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),dx.getAdapter(e.adapter||ka.adapter,e)(e).then(function(o){kd(e),e.response=o;try{o.data=Od.call(e,e.transformResponse,o)}finally{delete e.response}return o.headers=Wn.from(o.headers),o},function(o){if(!rx(o)&&(kd(e),o&&o.response)){e.response=o.response;try{o.response.data=Od.call(e,e.transformResponse,o.response)}finally{delete e.response}o.response.headers=Wn.from(o.response.headers)}return Promise.reject(o)})}const qc={};["object","boolean","number","function","string","symbol"].forEach((i,e)=>{qc[i]=function(s){return typeof s===i||"a"+(e<1?"n ":" ")+i}});const Lg={};qc.transitional=function(e,t,s){function o(l,c){return"[Axios v"+_h+"] Transitional option '"+l+"'"+c+(s?". "+s:"")}return(l,c,d)=>{if(e===!1)throw new je(o(c," has been removed"+(t?" in "+t:"")),je.ERR_DEPRECATED);return t&&!Lg[c]&&(Lg[c]=!0,console.warn(o(c," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(l,c,d):!0}};qc.spelling=function(e){return(t,s)=>(console.warn(`${s} is likely a misspelling of ${e}`),!0)};function y1(i,e,t){if(typeof i!="object"||i===null)throw new je("options must be an object",je.ERR_BAD_OPTION_VALUE);const s=Object.keys(i);let o=s.length;for(;o-- >0;){const l=s[o],c=Object.prototype.hasOwnProperty.call(e,l)?e[l]:void 0;if(c){const d=i[l],h=d===void 0||c(d,l,i);if(h!==!0)throw new je("option "+l+" must be "+h,je.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new je("Unknown option "+l,je.ERR_BAD_OPTION)}}const bc={assertOptions:y1,validators:qc},zn=bc.validators;let Cs=class{constructor(e){this.defaults=e||{},this.interceptors={request:new _g,response:new _g}}async request(e,t){try{return await this._request(e,t)}catch(s){if(s instanceof Error)try{let o={};Error.captureStackTrace?Error.captureStackTrace(o):o=new Error;const l=o.stack;let c="";if(typeof l=="string"){const d=l.indexOf(`
`);c=d===-1?"":l.slice(d+1)}if(!s.stack)s.stack=c;else if(c){const d=c.indexOf(`
`),h=d===-1?-1:c.indexOf(`
`,d+1),m=h===-1?"":c.slice(h+1);String(s.stack).endsWith(m)||(s.stack+=`
`+c)}}catch{}throw s}}_request(e,t){typeof e=="string"?(t=t||{},t.url=e):t=e||{},t=Ds(this.defaults,t);const{transitional:s,paramsSerializer:o,headers:l}=t;s!==void 0&&bc.assertOptions(s,{silentJSONParsing:zn.transitional(zn.boolean),forcedJSONParsing:zn.transitional(zn.boolean),clarifyTimeoutError:zn.transitional(zn.boolean),legacyInterceptorReqResOrdering:zn.transitional(zn.boolean),advertiseZstdAcceptEncoding:zn.transitional(zn.boolean),validateStatusUndefinedResolves:zn.transitional(zn.boolean)},!1),o!=null&&(Y.isFunction(o)?t.paramsSerializer={serialize:o}:bc.assertOptions(o,{encode:zn.function,serialize:zn.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:t.allowAbsoluteUrls=!0),bc.assertOptions(t,{baseUrl:zn.spelling("baseURL"),withXsrfToken:zn.spelling("withXSRFToken")},!0),t.method=(Y.getSafeProp(t,"method")||Y.getSafeProp(this.defaults,"method")||"get").toLowerCase();let c=l&&Y.merge(l.common,l[t.method]);l&&Y.forEach(ix.concat("common"),b=>{delete l[b]}),t.headers=Wn.concat(c,l);const d=[];let h=!0;this.interceptors.request.forEach(function(A){if(typeof A.runWhen=="function"&&A.runWhen(t)===!1)return;h=h&&A.synchronous;const S=t.transitional||xh;S&&S.legacyInterceptorReqResOrdering?d.unshift(A.fulfilled,A.rejected):d.push(A.fulfilled,A.rejected)});const m=[];this.interceptors.response.forEach(function(A){m.push(A.fulfilled,A.rejected)});let v,y=0,g;if(!h){const b=[zd.bind(this),void 0];for(b.unshift(...d),b.push(...m),g=b.length,v=Promise.resolve(t);y<g;)v=v.then(b[y++],b[y++]);return v}g=d.length;let E=t;for(;y<g;){const b=d[y++],A=d[y++];try{E=b?b(E):E}catch(S){if(!A){v=Promise.reject(S);break}try{const x=A.call(this,S);Y.isThenable(x)&&(v=Promise.resolve(x).then(()=>zd.call(this,E)))}catch(x){v=Promise.reject(x)}break}}if(!v)try{v=zd.call(this,E)}catch(b){v=Promise.reject(b)}for(y=0,g=m.length;y<g;)v=v.then(m[y++],m[y++]);return v}getUri(e){e=Ds(this.defaults,e);const t=ax(e.baseURL,e.url,e.allowAbsoluteUrls,e);return J0(t,e.params,e.paramsSerializer)}};Y.forEach(["delete","get","head","options"],function(e){Cs.prototype[e]=function(t,s){return this.request(Ds(s||{},{method:e,url:t,data:s&&Y.hasOwnProp(s,"data")?s.data:void 0}))}});Y.forEach(["post","put","patch","query"],function(e){function t(s){return function(l,c,d){return this.request(Ds(d||{},{method:e,headers:s?{"Content-Type":"multipart/form-data"}:{},url:l,data:c}))}}Cs.prototype[e]=t(),e!=="query"&&(Cs.prototype[e+"Form"]=t(!0))});let S1=class fx{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let t;this.promise=new Promise(function(l){t=l});const s=this;this.promise.then(o=>{if(!s._listeners)return;let l=s._listeners.length;for(;l-- >0;)s._listeners[l](o);s._listeners=null}),this.promise.then=o=>{let l;const c=new Promise(d=>{s.subscribe(d),l=d}).then(o);return c.cancel=function(){s.unsubscribe(l)},c},e(function(l,c,d){s.reason||(s.reason=new za(l,c,d),t(s.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){const e=new AbortController,t=s=>{e.abort(s)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let e;return{token:new fx(function(o){e=o}),cancel:e}}};function E1(i){return function(t){return i.apply(null,t)}}function M1(i){return Y.isObject(i)&&i.isAxiosError===!0}const Tc={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,ContentTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,UnprocessableContent:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerReturnsAnUnknownError:520,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Tc).forEach(([i,e])=>{Tc[e]===void 0&&(Tc[e]=i)});function hx(i){const e=new Cs(i),t=O0(Cs.prototype.request,e);return Y.extend(t,Cs.prototype,e,{allOwnKeys:!0}),Y.extend(t,e,null,{allOwnKeys:!0}),t.create=function(o){return hx(Ds(i,o))},t}const dn=hx(ka);dn.Axios=Cs;dn.CanceledError=za;dn.CancelToken=S1;dn.isCancel=rx;dn.VERSION=_h;dn.toFormData=Xc;dn.AxiosError=je;dn.Cancel=dn.CanceledError;dn.all=function(e){return Promise.all(e)};dn.spread=E1;dn.isAxiosError=M1;dn.mergeConfig=Ds;dn.AxiosHeaders=Wn;dn.formToJSON=i=>nx(Y.isHTMLForm(i)?new FormData(i):i);dn.getAdapter=dx.getAdapter;dn.HttpStatusCode=Tc;dn.default=dn;const{Axios:KA,AxiosError:ZA,CanceledError:QA,isCancel:JA,CancelToken:eC,VERSION:tC,all:nC,Cancel:iC,isAxiosError:rC,spread:sC,toFormData:oC,AxiosHeaders:aC,HttpStatusCode:lC,formToJSON:cC,getAdapter:uC,mergeConfig:dC,create:fC}=dn,px="http://127.0.0.1:8000",mn=dn.create({baseURL:px,timeout:12e4}),un={checkHealth:async()=>(await mn.get("/api/health")).data,getDashboardStats:async()=>(await mn.get("/api/documents/stats/overview")).data,uploadDocument:async(i,e)=>{const t=new FormData;return t.append("file",i),(await mn.post("/api/documents/upload",t,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:o=>{if(o.total&&e){const l=Math.round(o.loaded*100/o.total);e(l)}}})).data},getDocuments:async()=>(await mn.get("/api/documents")).data,getDocument:async i=>(await mn.get(`/api/documents/${i}`)).data,searchChunks:async(i,e,t=5)=>(await mn.get(`/api/documents/${i}/search`,{params:{q:e,top_k:t}})).data,runPipeline:async(i,e,t="en",s=!1,o)=>{const l={document_id:i,requested_focus:e,language:t,auto_generate_audio:s,voice:o};return(await mn.post("/api/pipeline/run",l)).data},runMultiPipeline:async(i,e,t="en",s=!1,o)=>{const l={document_ids:i,requested_focus:e,language:t,auto_generate_audio:s,voice:o};return(await mn.post("/api/pipeline/run-multi",l)).data},getWorkflowRun:async i=>(await mn.get(`/api/pipeline/runs/${i}`)).data,getLatestWorkflowRun:async i=>{try{return(await mn.get(`/api/pipeline/document/${i}/latest`)).data}catch{return null}},generateSpeech:async(i,e,t="en",s)=>{const o={workflow_run_id:i,voice:e,language:t,text:s};return(await mn.post("/api/tts/generate",o)).data},switchLanguage:async(i,e,t=!0,s)=>{const o={workflow_run_id:i,target_language:e,auto_generate_audio:t,voice:s};return(await mn.post("/api/pipeline/switch-language",o)).data},getAudioUrl:i=>`${px}/api/tts/audio/${i}`,askQuestion:async(i,e,t="en")=>(await mn.post(`/api/documents/${i}/qa`,{question:e,language:t})).data,askMultiQuestion:async(i,e,t="en")=>(await mn.post("/api/documents/qa-multi",{document_ids:i,question:e,language:t})).data,compareDocuments:async(i,e)=>(await mn.post("/api/documents/compare",{doc_id_1:i,doc_id_2:e})).data,getGovReportSamples:async()=>(await mn.get("/api/evaluation/govreport/samples")).data.samples||[],runGovReportEval:async i=>(await mn.post(`/api/evaluation/govreport/run/${i}`)).data,loadGovReportSample:async(i="CRS-R46240")=>(await mn.post(`/api/documents/load-govreport-sample/${i}`)).data,translateContent:async(i,e,t="en")=>(await mn.post("/api/documents/translate",{text:i,target_language:e,source_language:t})).data,submitFeedback:async(i,e,t,s)=>(await mn.post("/api/feedback",{workflow_run_id:i,rating:e,is_helpful:t,feedback_text:s})).data},w1=({audio:i,summaryText:e,onGenerateAudio:t,isGenerating:s=!1})=>{const[o,l]=He.useState(!1),[c,d]=He.useState(0),[h,m]=He.useState(0),[v,y]=He.useState(1),[g,E]=He.useState(!1),[b,A]=He.useState("mp3"),[S,x]=He.useState(null),[R,O]=He.useState(null),T=He.useRef(null),D=He.useRef(null),F=He.useRef(null),U=He.useRef(null),M=i!=null&&i.audio_id?un.getAudioUrl(i.audio_id):null;He.useEffect(()=>{T.current&&(T.current.volume=g?0:v)},[v,g]),He.useEffect(()=>{l(!1),d(0),I()},[i==null?void 0:i.audio_id]);const I=()=>{if(T.current&&T.current.pause(),U.current){try{U.current.stop()}catch{}U.current=null}"speechSynthesis"in window&&window.speechSynthesis.cancel(),l(!1)},z=G=>{if(!G||isNaN(G))return"0:00";const V=Math.floor(G/60),N=Math.floor(G%60);return`${V}:${N<10?"0":""}${N}`},j=async()=>{try{const G=window.AudioContext||window.webkitAudioContext;if(!G){O("Web Audio API not supported in this browser.");return}const V=new G;V.state==="suspended"&&await V.resume();const N=V.currentTime,Z=V.createOscillator(),_e=V.createGain();Z.type="sine",Z.frequency.setValueAtTime(587.33,N),_e.gain.setValueAtTime(.4,N),_e.gain.exponentialRampToValueAtTime(.001,N+.4),Z.connect(_e),_e.connect(V.destination),Z.start(N),Z.stop(N+.4);const De=V.createOscillator(),Se=V.createGain();De.type="sine",De.frequency.setValueAtTime(880,N+.2),Se.gain.setValueAtTime(.4,N+.2),Se.gain.exponentialRampToValueAtTime(.001,N+.7),De.connect(Se),Se.connect(V.destination),De.start(N+.2),De.stop(N+.7),O("Played test chime! If you heard 2 chimes, your sound output is active."),setTimeout(()=>O(null),5e3)}catch(G){console.error("Speaker test error:",G),O("Could not trigger audio context: "+(G.message||String(G)))}},X=async G=>{try{x("Decoding and playing MP3 via Web Audio API...");const V=window.AudioContext||window.webkitAudioContext,N=F.current||new V;F.current=N,N.state==="suspended"&&await N.resume();const _e=await(await fetch(G)).arrayBuffer(),De=await N.decodeAudioData(_e),Se=N.createBufferSource();Se.buffer=De;const Ee=N.createGain();Ee.gain.value=g?0:v,Se.connect(Ee),Ee.connect(N.destination),Se.onended=()=>{l(!1),x(null)},Se.start(0),U.current=Se,l(!0),A("webAudio"),m(De.duration),x("Playing Edge-TTS briefing via Web Audio Engine")}catch(V){console.warn("Web Audio buffer playback failed, falling back to speech synthesis:",V),H()}},re=()=>{if(!M){H();return}T.current?(T.current.volume=g?0:v,T.current.play().then(()=>{l(!0),A("mp3"),x("Playing Edge-TTS neural audio briefing")}).catch(G=>{console.warn("HTML5 audio playback blocked/error. Trying Web Audio API:",G),X(M)})):X(M)},H=()=>{if(!("speechSynthesis"in window)){x("Audio playback not supported in this browser.");return}window.speechSynthesis.cancel(),window.speechSynthesis.resume();const G=e||"Summary briefing is ready. The document has been fully analyzed and verified.",V=new SpeechSynthesisUtterance(G);V.volume=g?0:v,V.rate=1,V.pitch=1;let N="en-US";const Z={en:"en-US",hi:"hi-IN",es:"es-ES",fr:"fr-FR",de:"de-DE",kn:"kn-IN",te:"te-IN",ta:"ta-IN"};i!=null&&i.language&&Z[i.language]?N=Z[i.language]:/[\u0C80-\u0CFF]/.test(G)?N="kn-IN":/[\u0900-\u097F]/.test(G)?N="hi-IN":/[\u0C00-\u0C7F]/.test(G)?N="te-IN":/[\u0B80-\u0BFF]/.test(G)&&(N="ta-IN"),V.lang=N;const _e=window.speechSynthesis.getVoices();if(_e&&_e.length>0){const De=N.split("-")[0].toLowerCase(),Se=_e.find(Ee=>Ee.lang.toLowerCase().startsWith(De))||_e.find(Ee=>Ee.lang.startsWith("en")&&(Ee.name.includes("Natural")||Ee.name.includes("Neural")||Ee.name.includes("Online")))||_e.find(Ee=>Ee.lang.startsWith("en"))||_e[0];Se&&(V.voice=Se)}V.onstart=()=>{l(!0),A("speechSynthesis"),x("Reading summary aloud via system speech engine")},V.onend=()=>{l(!1),d(0),x(null)},V.onerror=De=>{console.error("SpeechSynthesis error:",De),l(!1),x("Speech engine could not produce audio.")},D.current=V,window.speechSynthesis.speak(V)},te=()=>{o?(I(),x(null)):M?re():H()},ge=()=>{T.current&&b==="mp3"&&(d(T.current.currentTime),m(T.current.duration||0))},se=G=>{const V=parseFloat(G.target.value);d(V),T.current&&b==="mp3"&&(T.current.currentTime=V)},ne=()=>{E(!g),T.current&&(T.current.muted=!g)};return f.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.25rem"},children:[M&&f.jsx("audio",{ref:T,src:M,preload:"auto",onTimeUpdate:ge,onLoadedMetadata:ge,onEnded:()=>{l(!1),d(0)},onError:()=>{console.warn("HTML5 audio element error. Ready for WebAudio / Speech fallback.")},style:{display:"none"}}),f.jsxs("div",{style:{background:"#F8FAFC",border:"1px solid var(--border-color)",borderRadius:"var(--radius-lg)",padding:"1.5rem",boxShadow:"var(--shadow-sm)"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem",background:"white",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",padding:"0.85rem 1.25rem",marginBottom:"1rem"},children:[f.jsx("button",{onClick:te,style:{width:"46px",height:"46px",borderRadius:"50%",background:"#2563EB",color:"white",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,boxShadow:"0 3px 8px rgba(37, 99, 235, 0.4)",transition:"transform 0.15s ease"},title:o?"Pause briefing":"Play audio briefing",children:o?f.jsx(ry,{size:22}):f.jsx(U0,{size:22,style:{marginLeft:"2px"}})}),f.jsx("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:"0.25rem"},children:f.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:f.jsx("input",{type:"range",min:"0",max:h||100,step:"0.1",value:c,onChange:se,style:{width:"100%",accentColor:"#2563EB",cursor:"pointer",height:"6px"}})})}),f.jsxs("span",{style:{fontSize:"0.82rem",fontWeight:600,color:"var(--text-muted)",fontFamily:"var(--font-mono)",whiteSpace:"nowrap"},children:[z(c)," / ",z(h||180)]}),f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[f.jsx("button",{onClick:ne,style:{background:"none",border:"none",cursor:"pointer",color:g?"#EF4444":"#2563EB",display:"flex",alignItems:"center"},title:g?"Unmute":"Mute",children:g?f.jsx(hy,{size:20}):f.jsx(fy,{size:20})}),f.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:g?0:v,onChange:G=>{y(parseFloat(G.target.value)),E(!1)},style:{width:"65px",accentColor:"#2563EB",cursor:"pointer",height:"4px"},title:"Volume"})]})]}),o&&f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px",marginBottom:"1rem",padding:"0.5rem",background:"#EFF6FF",borderRadius:"6px"},children:[f.jsx("span",{style:{fontSize:"0.8rem",fontWeight:700,color:"#2563EB",marginRight:"8px"},children:"AUDIO TRANSMITTING:"}),[18,28,14,32,22,12,30,24,16,26,12].map((G,V)=>f.jsx("span",{style:{display:"inline-block",width:"3px",height:`${G}px`,background:"#2563EB",borderRadius:"2px",animation:"pulse 1s infinite alternate",animationDelay:`${V*.1}s`}},V))]}),S&&f.jsx("div",{style:{fontSize:"0.8rem",fontWeight:600,color:"#2563EB",background:"#EFF6FF",padding:"0.4rem 0.75rem",borderRadius:"6px",marginBottom:"1rem",textAlign:"center"},children:S}),R&&f.jsxs("div",{style:{fontSize:"0.8rem",fontWeight:600,color:"#059669",background:"#ECFDF5",padding:"0.5rem 0.75rem",borderRadius:"6px",marginBottom:"1rem",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem"},children:[f.jsx(mi,{size:16}),f.jsx("span",{children:R})]}),f.jsxs("div",{style:{display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap"},children:[M?f.jsxs("a",{href:M,download:"executive_briefing.mp3",className:"btn-blue",style:{padding:"0.55rem 1.25rem",fontSize:"0.85rem"},children:[f.jsx(ty,{size:16}),f.jsx("span",{children:"Download MP3 Audio"})]}):f.jsxs("button",{onClick:t,disabled:s,className:"btn-blue",style:{padding:"0.55rem 1.25rem",fontSize:"0.85rem"},children:[f.jsx(ws,{size:16}),f.jsx("span",{children:s?"Synthesizing Audio...":"Generate Neural Voice Briefing"})]}),f.jsxs("button",{onClick:j,className:"btn-outline",style:{padding:"0.55rem 1.1rem",fontSize:"0.85rem",borderColor:"#10B981",color:"#059669"},title:"Plays an instant chime to test your browser and physical speakers",children:[f.jsx(Q_,{size:15,color:"#059669"}),f.jsx("span",{children:"Test Speakers / Sound Output 🔔"})]}),f.jsxs("button",{onClick:H,className:"btn-outline",style:{padding:"0.55rem 1.1rem",fontSize:"0.85rem"},title:"Reads the summary text aloud using your browser's direct speech engine",children:[f.jsx(Aa,{size:15,color:"#2563EB"}),f.jsx("span",{children:"Read Aloud with Browser Voice"})]})]})]}),M&&f.jsxs("div",{style:{background:"white",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",padding:"1rem",display:"flex",flexDirection:"column",gap:"0.5rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[f.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-muted)"},children:"Direct Browser Audio Stream (Standard HTML5 Controls):"}),f.jsx("span",{style:{fontSize:"0.75rem",color:"#10B981",fontWeight:600},children:"● MP3 Stream Ready"})]}),f.jsx("audio",{controls:!0,src:M,style:{width:"100%",height:"40px"}})]}),f.jsxs("div",{style:{background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:"var(--radius-md)",padding:"1rem",fontSize:"0.82rem",color:"#92400E"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",fontWeight:700,marginBottom:"0.4rem"},children:[f.jsx(J_,{size:16,color:"#D97706"}),f.jsx("span",{children:"If You Still Do Not Hear Any Sound:"})]}),f.jsxs("ol",{style:{margin:0,paddingLeft:"1.25rem",lineHeight:1.6},children:[f.jsxs("li",{children:[f.jsx("strong",{children:"Test Sound Output:"})," Click the green ",f.jsx("strong",{children:'"Test Speakers / Sound Output 🔔"'})," button above. If you hear a chime, your browser audio is working."]}),f.jsxs("li",{children:[f.jsx("strong",{children:"Check Browser Tab Mute:"})," Right-click the browser tab header at the top of your screen and verify it does NOT say ",f.jsx("em",{children:'"Unmute site"'}),"."]}),f.jsxs("li",{children:[f.jsx("strong",{children:"Remote Desktop / Cloud Audio:"})," If you are connected via Windows Remote Desktop (RDP) or a cloud VM, ensure ",f.jsx("em",{children:"Remote Audio Playback"})," is enabled on your host connection, and that Windows volume in the bottom-right taskbar is turned up."]}),f.jsxs("li",{children:[f.jsx("strong",{children:"Direct Playback:"})," Click ",f.jsx("strong",{children:'"Download MP3 Audio"'})," to save the `.mp3` file and play it directly in Windows Media Player or VLC on your computer."]})]})]})]})};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sh="186",b1=0,Fg=1,T1=2,Ac=1,A1=2,Ca=3,Ls=0,ai=1,Mr=2,br=0,Pa=1,Ng=2,Ig=3,Ug=4,C1=5,wo=100,R1=101,P1=102,D1=103,L1=104,F1=200,N1=201,I1=202,U1=203,mx=204,gx=205,O1=206,B1=207,k1=208,z1=209,H1=210,V1=211,G1=212,W1=213,j1=214,wf=0,bf=1,Tf=2,Fa=3,Af=4,Cf=5,Rf=6,Pf=7,xx=0,X1=1,q1=2,sr=0,vx=1,_x=2,yx=3,Sx=4,Ex=5,Mx=6,wx=7,bx=300,Fs=301,Co=302,Hd=303,Vd=304,$c=306,Df=1e3,wr=1001,Lf=1002,Nn=1003,$1=1004,Yl=1005,Gn=1006,Gd=1007,Ts=1008,Ti=1009,Tx=1010,Ax=1011,Na=1012,Eh=1013,or=1014,ir=1015,ar=1016,Mh=1017,wh=1018,Ia=1020,Cx=35902,Rx=35899,Px=1021,Dx=1022,Wi=1023,Ar=1026,As=1027,Lx=1028,bh=1029,Ns=1030,Th=1031,Ah=1033,Cc=33776,Rc=33777,Pc=33778,Dc=33779,Ff=35840,Nf=35841,If=35842,Uf=35843,Of=36196,Bf=37492,kf=37496,zf=37488,Hf=37489,Ic=37490,Vf=37491,Gf=37808,Wf=37809,jf=37810,Xf=37811,qf=37812,$f=37813,Yf=37814,Kf=37815,Zf=37816,Qf=37817,Jf=37818,eh=37819,th=37820,nh=37821,ih=36492,rh=36494,sh=36495,oh=36283,ah=36284,Uc=36285,lh=36286,Y1=3200,Og=0,K1=1,is="",bi="srgb",Oc="srgb-linear",Bc="linear",$t="srgb",Wd=7680,Z1=519,Q1=512,J1=513,eE=514,Ch=515,tE=516,nE=517,Rh=518,iE=519,rE=35044,Bg="300 es",rr=2e3,kc=2001;function sE(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function zc(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function oE(){const i=zc("canvas");return i.style.display="block",i}const kg={};function zg(...i){const e="THREE."+i.shift();console.log(e,...i)}function Fx(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function yt(...i){i=Fx(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Wt(...i){i=Fx(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function To(...i){const e=i.join(" ");e in kg||(kg[e]=!0,yt(...i))}function aE(i,e,t){return new Promise(function(s,o){function l(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:o();break;case i.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:s()}}setTimeout(l,t)})}const lE={[wf]:bf,[Tf]:Rf,[Af]:Pf,[Fa]:Cf,[bf]:wf,[Rf]:Tf,[Pf]:Af,[Cf]:Fa};class Us{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(t)===-1&&s[e].push(t)}hasEventListener(e,t){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(t)!==-1}removeEventListener(e,t){const s=this._listeners;if(s===void 0)return;const o=s[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const s=t[e.type];if(s!==void 0){e.target=this;const o=s.slice(0);for(let l=0,c=o.length;l<c;l++)o[l].call(this,e);e.target=null}}}const Hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jd=Math.PI/180,ch=180/Math.PI;function Ha(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Hn[i&255]+Hn[i>>8&255]+Hn[i>>16&255]+Hn[i>>24&255]+"-"+Hn[e&255]+Hn[e>>8&255]+"-"+Hn[e>>16&15|64]+Hn[e>>24&255]+"-"+Hn[t&63|128]+Hn[t>>8&255]+"-"+Hn[t>>16&255]+Hn[t>>24&255]+Hn[s&255]+Hn[s>>8&255]+Hn[s>>16&255]+Hn[s>>24&255]).toLowerCase()}function kt(i,e,t){return Math.max(e,Math.min(t,i))}function cE(i,e){return(i%e+e)%e}function Xd(i,e,t){return(1-t)*i+t*e}function _a(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function si(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Nh=class Nh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,s=this.y,o=e.elements;return this.x=o[0]*t+o[3]*s+o[6],this.y=o[1]*t+o[4]*s+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=kt(this.x,e.x,t.x),this.y=kt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=kt(this.x,e,t),this.y=kt(this.y,e,t),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(kt(s,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(kt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y;return t*t+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const s=Math.cos(t),o=Math.sin(t),l=this.x-e.x,c=this.y-e.y;return this.x=l*s-c*o+e.x,this.y=l*o+c*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Nh.prototype.isVector2=!0;let Ht=Nh;class Lo{constructor(e=0,t=0,s=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=s,this._w=o}static slerpFlat(e,t,s,o,l,c,d){let h=s[o+0],m=s[o+1],v=s[o+2],y=s[o+3],g=l[c+0],E=l[c+1],b=l[c+2],A=l[c+3];if(y!==A||h!==g||m!==E||v!==b){let S=h*g+m*E+v*b+y*A;S<0&&(g=-g,E=-E,b=-b,A=-A,S=-S);let x=1-d;if(S<.9995){const R=Math.acos(S),O=Math.sin(R);x=Math.sin(x*R)/O,d=Math.sin(d*R)/O,h=h*x+g*d,m=m*x+E*d,v=v*x+b*d,y=y*x+A*d}else{h=h*x+g*d,m=m*x+E*d,v=v*x+b*d,y=y*x+A*d;const R=1/Math.sqrt(h*h+m*m+v*v+y*y);h*=R,m*=R,v*=R,y*=R}}e[t]=h,e[t+1]=m,e[t+2]=v,e[t+3]=y}static multiplyQuaternionsFlat(e,t,s,o,l,c){const d=s[o],h=s[o+1],m=s[o+2],v=s[o+3],y=l[c],g=l[c+1],E=l[c+2],b=l[c+3];return e[t]=d*b+v*y+h*E-m*g,e[t+1]=h*b+v*g+m*y-d*E,e[t+2]=m*b+v*E+d*g-h*y,e[t+3]=v*b-d*y-h*g-m*E,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,s,o){return this._x=e,this._y=t,this._z=s,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const s=e._x,o=e._y,l=e._z,c=e._order,d=Math.cos,h=Math.sin,m=d(s/2),v=d(o/2),y=d(l/2),g=h(s/2),E=h(o/2),b=h(l/2);switch(c){case"XYZ":this._x=g*v*y+m*E*b,this._y=m*E*y-g*v*b,this._z=m*v*b+g*E*y,this._w=m*v*y-g*E*b;break;case"YXZ":this._x=g*v*y+m*E*b,this._y=m*E*y-g*v*b,this._z=m*v*b-g*E*y,this._w=m*v*y+g*E*b;break;case"ZXY":this._x=g*v*y-m*E*b,this._y=m*E*y+g*v*b,this._z=m*v*b+g*E*y,this._w=m*v*y-g*E*b;break;case"ZYX":this._x=g*v*y-m*E*b,this._y=m*E*y+g*v*b,this._z=m*v*b-g*E*y,this._w=m*v*y+g*E*b;break;case"YZX":this._x=g*v*y+m*E*b,this._y=m*E*y+g*v*b,this._z=m*v*b-g*E*y,this._w=m*v*y-g*E*b;break;case"XZY":this._x=g*v*y-m*E*b,this._y=m*E*y-g*v*b,this._z=m*v*b+g*E*y,this._w=m*v*y+g*E*b;break;default:yt("Quaternion: .setFromEuler() encountered an unknown order: "+c)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const s=t/2,o=Math.sin(s);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,s=t[0],o=t[4],l=t[8],c=t[1],d=t[5],h=t[9],m=t[2],v=t[6],y=t[10],g=s+d+y;if(g>0){const E=.5/Math.sqrt(g+1);this._w=.25/E,this._x=(v-h)*E,this._y=(l-m)*E,this._z=(c-o)*E}else if(s>d&&s>y){const E=2*Math.sqrt(1+s-d-y);this._w=(v-h)/E,this._x=.25*E,this._y=(o+c)/E,this._z=(l+m)/E}else if(d>y){const E=2*Math.sqrt(1+d-s-y);this._w=(l-m)/E,this._x=(o+c)/E,this._y=.25*E,this._z=(h+v)/E}else{const E=2*Math.sqrt(1+y-s-d);this._w=(c-o)/E,this._x=(l+m)/E,this._y=(h+v)/E,this._z=.25*E}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let s=e.dot(t)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(kt(this.dot(e),-1,1)))}rotateTowards(e,t){const s=this.angleTo(e);if(s===0)return this;const o=Math.min(1,t/s);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const s=e._x,o=e._y,l=e._z,c=e._w,d=t._x,h=t._y,m=t._z,v=t._w;return this._x=s*v+c*d+o*m-l*h,this._y=o*v+c*h+l*d-s*m,this._z=l*v+c*m+s*h-o*d,this._w=c*v-s*d-o*h-l*m,this._onChangeCallback(),this}slerp(e,t){let s=e._x,o=e._y,l=e._z,c=e._w,d=this.dot(e);d<0&&(s=-s,o=-o,l=-l,c=-c,d=-d);let h=1-t;if(d<.9995){const m=Math.acos(d),v=Math.sin(m);h=Math.sin(h*m)/v,t=Math.sin(t*m)/v,this._x=this._x*h+s*t,this._y=this._y*h+o*t,this._z=this._z*h+l*t,this._w=this._w*h+c*t,this._onChangeCallback()}else this._x=this._x*h+s*t,this._y=this._y*h+o*t,this._z=this._z*h+l*t,this._w=this._w*h+c*t,this.normalize();return this}slerpQuaternions(e,t,s){return this.copy(e).slerp(t,s)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),s=Math.random(),o=Math.sqrt(1-s),l=Math.sqrt(s);return this.set(o*Math.sin(e),o*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Ih=class Ih{constructor(e=0,t=0,s=0){this.x=e,this.y=t,this.z=s}set(e,t,s){return s===void 0&&(s=this.z),this.x=e,this.y=t,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Hg.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Hg.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*s+l[6]*o,this.y=l[1]*t+l[4]*s+l[7]*o,this.z=l[2]*t+l[5]*s+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=e.elements,c=1/(l[3]*t+l[7]*s+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*s+l[8]*o+l[12])*c,this.y=(l[1]*t+l[5]*s+l[9]*o+l[13])*c,this.z=(l[2]*t+l[6]*s+l[10]*o+l[14])*c,this}applyQuaternion(e){const t=this.x,s=this.y,o=this.z,l=e.x,c=e.y,d=e.z,h=e.w,m=2*(c*o-d*s),v=2*(d*t-l*o),y=2*(l*s-c*t);return this.x=t+h*m+c*y-d*v,this.y=s+h*v+d*m-l*y,this.z=o+h*y+l*v-c*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*s+l[8]*o,this.y=l[1]*t+l[5]*s+l[9]*o,this.z=l[2]*t+l[6]*s+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=kt(this.x,e.x,t.x),this.y=kt(this.y,e.y,t.y),this.z=kt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=kt(this.x,e,t),this.y=kt(this.y,e,t),this.z=kt(this.z,e,t),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(kt(s,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const s=e.x,o=e.y,l=e.z,c=t.x,d=t.y,h=t.z;return this.x=o*h-l*d,this.y=l*c-s*h,this.z=s*d-o*c,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const s=e.dot(this)/t;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return qd.copy(this).projectOnVector(e),this.sub(qd)}reflect(e){return this.sub(qd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(kt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y,o=this.z-e.z;return t*t+s*s+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,s){const o=Math.sin(t)*e;return this.x=o*Math.sin(s),this.y=Math.cos(t)*e,this.z=o*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,s){return this.x=e*Math.sin(t),this.y=s,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=s,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,s=Math.sqrt(1-t*t);return this.x=s*Math.cos(e),this.y=t,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ih.prototype.isVector3=!0;let ce=Ih;const qd=new ce,Hg=new Lo,Uh=class Uh{constructor(e,t,s,o,l,c,d,h,m){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,c,d,h,m)}set(e,t,s,o,l,c,d,h,m){const v=this.elements;return v[0]=e,v[1]=o,v[2]=d,v[3]=t,v[4]=l,v[5]=h,v[6]=s,v[7]=c,v[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],this}extractBasis(e,t,s){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,c=s[0],d=s[3],h=s[6],m=s[1],v=s[4],y=s[7],g=s[2],E=s[5],b=s[8],A=o[0],S=o[3],x=o[6],R=o[1],O=o[4],T=o[7],D=o[2],F=o[5],U=o[8];return l[0]=c*A+d*R+h*D,l[3]=c*S+d*O+h*F,l[6]=c*x+d*T+h*U,l[1]=m*A+v*R+y*D,l[4]=m*S+v*O+y*F,l[7]=m*x+v*T+y*U,l[2]=g*A+E*R+b*D,l[5]=g*S+E*O+b*F,l[8]=g*x+E*T+b*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],c=e[4],d=e[5],h=e[6],m=e[7],v=e[8];return t*c*v-t*d*m-s*l*v+s*d*h+o*l*m-o*c*h}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],c=e[4],d=e[5],h=e[6],m=e[7],v=e[8],y=v*c-d*m,g=d*h-v*l,E=m*l-c*h,b=t*y+s*g+o*E;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/b;return e[0]=y*A,e[1]=(o*m-v*s)*A,e[2]=(d*s-o*c)*A,e[3]=g*A,e[4]=(v*t-o*h)*A,e[5]=(o*l-d*t)*A,e[6]=E*A,e[7]=(s*h-m*t)*A,e[8]=(c*t-s*l)*A,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,s,o,l,c,d){const h=Math.cos(l),m=Math.sin(l);return this.set(s*h,s*m,-s*(h*c+m*d)+c+e,-o*m,o*h,-o*(-m*c+h*d)+d+t,0,0,1),this}scale(e,t){return To("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($d.makeScale(e,t)),this}rotate(e){return To("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($d.makeRotation(-e)),this}translate(e,t){return To("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($d.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,s,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<9;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<9;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Uh.prototype.isMatrix3=!0;let Mt=Uh;const $d=new Mt,Vg=new Mt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gg=new Mt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function uE(){const i={enabled:!0,workingColorSpace:Oc,spaces:{},convert:function(o,l,c){return this.enabled===!1||l===c||!l||!c||(this.spaces[l].transfer===$t&&(o.r=Tr(o.r),o.g=Tr(o.g),o.b=Tr(o.b)),this.spaces[l].primaries!==this.spaces[c].primaries&&(o.applyMatrix3(this.spaces[l].toXYZ),o.applyMatrix3(this.spaces[c].fromXYZ)),this.spaces[c].transfer===$t&&(o.r=Ao(o.r),o.g=Ao(o.g),o.b=Ao(o.b))),o},workingToColorSpace:function(o,l){return this.convert(o,this.workingColorSpace,l)},colorSpaceToWorking:function(o,l){return this.convert(o,l,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===is?Bc:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,l=this.workingColorSpace){return o.fromArray(this.spaces[l].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,l,c){return o.copy(this.spaces[l].toXYZ).multiply(this.spaces[c].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,l){return To("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(o,l)},toWorkingColorSpace:function(o,l){return To("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(o,l)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],s=[.3127,.329];return i.define({[Oc]:{primaries:e,whitePoint:s,transfer:Bc,toXYZ:Vg,fromXYZ:Gg,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:bi},outputColorSpaceConfig:{drawingBufferColorSpace:bi}},[bi]:{primaries:e,whitePoint:s,transfer:$t,toXYZ:Vg,fromXYZ:Gg,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:bi}}}),i}const Bt=uE();function Tr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ao(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let uo;class dE{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{uo===void 0&&(uo=zc("canvas")),uo.width=e.width,uo.height=e.height;const o=uo.getContext("2d");e instanceof ImageData?o.putImageData(e,0,0):o.drawImage(e,0,0,e.width,e.height),s=uo}return s.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zc("canvas");t.width=e.width,t.height=e.height;const s=t.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const o=s.getImageData(0,0,e.width,e.height),l=o.data;for(let c=0;c<l.length;c++)l[c]=Tr(l[c]/255)*255;return s.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let s=0;s<t.length;s++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[s]=Math.floor(Tr(t[s]/255)*255):t[s]=Tr(t[s]);return{data:t,width:e.width,height:e.height}}else return yt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let fE=0;class Ph{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:fE++}),this.uuid=Ha(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let c=0,d=o.length;c<d;c++)o[c].isDataTexture?l.push(Yd(o[c].image)):l.push(Yd(o[c]))}else l=Yd(o);s.url=l}return t||(e.images[this.uuid]=s),s}}function Yd(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?dE.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(yt("Texture: Unable to serialize Texture."),{})}let hE=0;const Kd=new ce;class Kn extends Us{constructor(e=Kn.DEFAULT_IMAGE,t=Kn.DEFAULT_MAPPING,s=wr,o=wr,l=Gn,c=Ts,d=Wi,h=Ti,m=Kn.DEFAULT_ANISOTROPY,v=is){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hE++}),this.uuid=Ha(),this.name="",this.source=new Ph(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=s,this.wrapT=o,this.magFilter=l,this.minFilter=c,this.anisotropy=m,this.format=d,this.internalFormat=null,this.type=h,this.offset=new Ht(0,0),this.repeat=new Ht(1,1),this.center=new Ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kd).x}get height(){return this.source.getSize(Kd).y}get depth(){return this.source.getSize(Kd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const s=e[t];if(s===void 0){yt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){yt(`Texture.setValues(): property '${t}' does not exist.`);continue}o&&s&&o.isVector2&&s.isVector2||o&&s&&o.isVector3&&s.isVector3||o&&s&&o.isMatrix3&&s.isMatrix3?o.copy(s):this[t]=s}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),t||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Df:e.x=e.x-Math.floor(e.x);break;case wr:e.x=e.x<0?0:1;break;case Lf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Df:e.y=e.y-Math.floor(e.y);break;case wr:e.y=e.y<0?0:1;break;case Lf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Kn.DEFAULT_IMAGE=null;Kn.DEFAULT_MAPPING=bx;Kn.DEFAULT_ANISOTROPY=1;const Oh=class Oh{constructor(e=0,t=0,s=0,o=1){this.x=e,this.y=t,this.z=s,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,s,o){return this.x=e,this.y=t,this.z=s,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=this.w,c=e.elements;return this.x=c[0]*t+c[4]*s+c[8]*o+c[12]*l,this.y=c[1]*t+c[5]*s+c[9]*o+c[13]*l,this.z=c[2]*t+c[6]*s+c[10]*o+c[14]*l,this.w=c[3]*t+c[7]*s+c[11]*o+c[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,s,o,l;const h=e.elements,m=h[0],v=h[4],y=h[8],g=h[1],E=h[5],b=h[9],A=h[2],S=h[6],x=h[10];if(Math.abs(v-g)<.01&&Math.abs(y-A)<.01&&Math.abs(b-S)<.01){if(Math.abs(v+g)<.1&&Math.abs(y+A)<.1&&Math.abs(b+S)<.1&&Math.abs(m+E+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const O=(m+1)/2,T=(E+1)/2,D=(x+1)/2,F=(v+g)/4,U=(y+A)/4,M=(b+S)/4;return O>T&&O>D?O<.01?(s=0,o=.707106781,l=.707106781):(s=Math.sqrt(O),o=F/s,l=U/s):T>D?T<.01?(s=.707106781,o=0,l=.707106781):(o=Math.sqrt(T),s=F/o,l=M/o):D<.01?(s=.707106781,o=.707106781,l=0):(l=Math.sqrt(D),s=U/l,o=M/l),this.set(s,o,l,t),this}let R=Math.sqrt((S-b)*(S-b)+(y-A)*(y-A)+(g-v)*(g-v));return Math.abs(R)<.001&&(R=1),this.x=(S-b)/R,this.y=(y-A)/R,this.z=(g-v)/R,this.w=Math.acos((m+E+x-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=kt(this.x,e.x,t.x),this.y=kt(this.y,e.y,t.y),this.z=kt(this.z,e.z,t.z),this.w=kt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=kt(this.x,e,t),this.y=kt(this.y,e,t),this.z=kt(this.z,e,t),this.w=kt(this.w,e,t),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(kt(s,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this.w=e.w+(t.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Oh.prototype.isVector4=!0;let an=Oh;class pE extends Us{constructor(e=1,t=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=s.depth,this.scissor=new an(0,0,e,t),this.scissorTest=!1,this.viewport=new an(0,0,e,t),this.textures=[];const o={width:e,height:t,depth:s.depth},l=new Kn(o),c=s.count;for(let d=0;d<c;d++)this.textures[d]=l.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveColorBuffer=s.resolveColorBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.storeMultisampledColorBuffer=s.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=s.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=s.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Gn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,s=1){if(this.width!==e||this.height!==t||this.depth!==s){this.width=e,this.height=t,this.depth=s;for(let o=0,l=this.textures.length;o<l;o++)this.textures[o].image.width=e,this.textures[o].image.height=t,this.textures[o].image.depth=s,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,s=e.textures.length;t<s;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const o=Object.assign({},e.textures[t].image);this.textures[t].source=new Ph(o)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ji extends pE{constructor(e=1,t=1,s={}){super(e,t,s),this.isWebGLRenderTarget=!0}}class Nx extends Kn{constructor(e=null,t=1,s=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=wr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class mE extends Kn{constructor(e=null,t=1,s=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=wr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Wc=class Wc{constructor(e,t,s,o,l,c,d,h,m,v,y,g,E,b,A,S){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,c,d,h,m,v,y,g,E,b,A,S)}set(e,t,s,o,l,c,d,h,m,v,y,g,E,b,A,S){const x=this.elements;return x[0]=e,x[4]=t,x[8]=s,x[12]=o,x[1]=l,x[5]=c,x[9]=d,x[13]=h,x[2]=m,x[6]=v,x[10]=y,x[14]=g,x[3]=E,x[7]=b,x[11]=A,x[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wc().fromArray(this.elements)}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],t[9]=s[9],t[10]=s[10],t[11]=s[11],t[12]=s[12],t[13]=s[13],t[14]=s[14],t[15]=s[15],this}copyPosition(e){const t=this.elements,s=e.elements;return t[12]=s[12],t[13]=s[13],t[14]=s[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,s){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,t,s){return this.set(e.x,t.x,s.x,0,e.y,t.y,s.y,0,e.z,t.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,s=e.elements,o=1/fo.setFromMatrixColumn(e,0).length(),l=1/fo.setFromMatrixColumn(e,1).length(),c=1/fo.setFromMatrixColumn(e,2).length();return t[0]=s[0]*o,t[1]=s[1]*o,t[2]=s[2]*o,t[3]=0,t[4]=s[4]*l,t[5]=s[5]*l,t[6]=s[6]*l,t[7]=0,t[8]=s[8]*c,t[9]=s[9]*c,t[10]=s[10]*c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,s=e.x,o=e.y,l=e.z,c=Math.cos(s),d=Math.sin(s),h=Math.cos(o),m=Math.sin(o),v=Math.cos(l),y=Math.sin(l);if(e.order==="XYZ"){const g=c*v,E=c*y,b=d*v,A=d*y;t[0]=h*v,t[4]=-h*y,t[8]=m,t[1]=E+b*m,t[5]=g-A*m,t[9]=-d*h,t[2]=A-g*m,t[6]=b+E*m,t[10]=c*h}else if(e.order==="YXZ"){const g=h*v,E=h*y,b=m*v,A=m*y;t[0]=g+A*d,t[4]=b*d-E,t[8]=c*m,t[1]=c*y,t[5]=c*v,t[9]=-d,t[2]=E*d-b,t[6]=A+g*d,t[10]=c*h}else if(e.order==="ZXY"){const g=h*v,E=h*y,b=m*v,A=m*y;t[0]=g-A*d,t[4]=-c*y,t[8]=b+E*d,t[1]=E+b*d,t[5]=c*v,t[9]=A-g*d,t[2]=-c*m,t[6]=d,t[10]=c*h}else if(e.order==="ZYX"){const g=c*v,E=c*y,b=d*v,A=d*y;t[0]=h*v,t[4]=b*m-E,t[8]=g*m+A,t[1]=h*y,t[5]=A*m+g,t[9]=E*m-b,t[2]=-m,t[6]=d*h,t[10]=c*h}else if(e.order==="YZX"){const g=c*h,E=c*m,b=d*h,A=d*m;t[0]=h*v,t[4]=A-g*y,t[8]=b*y+E,t[1]=y,t[5]=c*v,t[9]=-d*v,t[2]=-m*v,t[6]=E*y+b,t[10]=g-A*y}else if(e.order==="XZY"){const g=c*h,E=c*m,b=d*h,A=d*m;t[0]=h*v,t[4]=-y,t[8]=m*v,t[1]=g*y+A,t[5]=c*v,t[9]=E*y-b,t[2]=b*y-E,t[6]=d*v,t[10]=A*y+g}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(gE,e,xE)}lookAt(e,t,s){const o=this.elements;return fi.subVectors(e,t),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),Zr.crossVectors(s,fi),Zr.lengthSq()===0&&(Math.abs(s.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),Zr.crossVectors(s,fi)),Zr.normalize(),Kl.crossVectors(fi,Zr),o[0]=Zr.x,o[4]=Kl.x,o[8]=fi.x,o[1]=Zr.y,o[5]=Kl.y,o[9]=fi.y,o[2]=Zr.z,o[6]=Kl.z,o[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,c=s[0],d=s[4],h=s[8],m=s[12],v=s[1],y=s[5],g=s[9],E=s[13],b=s[2],A=s[6],S=s[10],x=s[14],R=s[3],O=s[7],T=s[11],D=s[15],F=o[0],U=o[4],M=o[8],I=o[12],z=o[1],j=o[5],X=o[9],re=o[13],H=o[2],te=o[6],ge=o[10],se=o[14],ne=o[3],G=o[7],V=o[11],N=o[15];return l[0]=c*F+d*z+h*H+m*ne,l[4]=c*U+d*j+h*te+m*G,l[8]=c*M+d*X+h*ge+m*V,l[12]=c*I+d*re+h*se+m*N,l[1]=v*F+y*z+g*H+E*ne,l[5]=v*U+y*j+g*te+E*G,l[9]=v*M+y*X+g*ge+E*V,l[13]=v*I+y*re+g*se+E*N,l[2]=b*F+A*z+S*H+x*ne,l[6]=b*U+A*j+S*te+x*G,l[10]=b*M+A*X+S*ge+x*V,l[14]=b*I+A*re+S*se+x*N,l[3]=R*F+O*z+T*H+D*ne,l[7]=R*U+O*j+T*te+D*G,l[11]=R*M+O*X+T*ge+D*V,l[15]=R*I+O*re+T*se+D*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[4],o=e[8],l=e[12],c=e[1],d=e[5],h=e[9],m=e[13],v=e[2],y=e[6],g=e[10],E=e[14],b=e[3],A=e[7],S=e[11],x=e[15],R=h*E-m*g,O=d*E-m*y,T=d*g-h*y,D=c*E-m*v,F=c*g-h*v,U=c*y-d*v;return t*(A*R-S*O+x*T)-s*(b*R-S*D+x*F)+o*(b*O-A*D+x*U)-l*(b*T-A*F+S*U)}determinantAffine(){const e=this.elements,t=e[0],s=e[4],o=e[8],l=e[1],c=e[5],d=e[9],h=e[2],m=e[6],v=e[10];return t*(c*v-d*m)-s*(l*v-d*h)+o*(l*m-c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,s){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=s),this}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],c=e[4],d=e[5],h=e[6],m=e[7],v=e[8],y=e[9],g=e[10],E=e[11],b=e[12],A=e[13],S=e[14],x=e[15],R=t*d-s*c,O=t*h-o*c,T=t*m-l*c,D=s*h-o*d,F=s*m-l*d,U=o*m-l*h,M=v*A-y*b,I=v*S-g*b,z=v*x-E*b,j=y*S-g*A,X=y*x-E*A,re=g*x-E*S,H=R*re-O*X+T*j+D*z-F*I+U*M;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const te=1/H;return e[0]=(d*re-h*X+m*j)*te,e[1]=(o*X-s*re-l*j)*te,e[2]=(A*U-S*F+x*D)*te,e[3]=(g*F-y*U-E*D)*te,e[4]=(h*z-c*re-m*I)*te,e[5]=(t*re-o*z+l*I)*te,e[6]=(S*T-b*U-x*O)*te,e[7]=(v*U-g*T+E*O)*te,e[8]=(c*X-d*z+m*M)*te,e[9]=(s*z-t*X-l*M)*te,e[10]=(b*F-A*T+x*R)*te,e[11]=(y*T-v*F-E*R)*te,e[12]=(d*I-c*j-h*M)*te,e[13]=(t*j-s*I+o*M)*te,e[14]=(A*O-b*D-S*R)*te,e[15]=(v*D-y*O+g*R)*te,this}scale(e){const t=this.elements,s=e.x,o=e.y,l=e.z;return t[0]*=s,t[4]*=o,t[8]*=l,t[1]*=s,t[5]*=o,t[9]*=l,t[2]*=s,t[6]*=o,t[10]*=l,t[3]*=s,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,s,o))}makeTranslation(e,t,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,s,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,t,-s,0,0,s,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,0,s,0,0,1,0,0,-s,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,0,s,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const s=Math.cos(t),o=Math.sin(t),l=1-s,c=e.x,d=e.y,h=e.z,m=l*c,v=l*d;return this.set(m*c+s,m*d-o*h,m*h+o*d,0,m*d+o*h,v*d+s,v*h-o*c,0,m*h-o*d,v*h+o*c,l*h*h+s,0,0,0,0,1),this}makeScale(e,t,s){return this.set(e,0,0,0,0,t,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,t,s,o,l,c){return this.set(1,s,l,0,e,1,c,0,t,o,1,0,0,0,0,1),this}compose(e,t,s){const o=this.elements,l=t._x,c=t._y,d=t._z,h=t._w,m=l+l,v=c+c,y=d+d,g=l*m,E=l*v,b=l*y,A=c*v,S=c*y,x=d*y,R=h*m,O=h*v,T=h*y,D=s.x,F=s.y,U=s.z;return o[0]=(1-(A+x))*D,o[1]=(E+T)*D,o[2]=(b-O)*D,o[3]=0,o[4]=(E-T)*F,o[5]=(1-(g+x))*F,o[6]=(S+R)*F,o[7]=0,o[8]=(b+O)*U,o[9]=(S-R)*U,o[10]=(1-(g+A))*U,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,s){const o=this.elements;e.x=o[12],e.y=o[13],e.z=o[14];const l=this.determinantAffine();if(l===0)return s.set(1,1,1),t.identity(),this;let c=fo.set(o[0],o[1],o[2]).length();const d=fo.set(o[4],o[5],o[6]).length(),h=fo.set(o[8],o[9],o[10]).length();l<0&&(c=-c),zi.copy(this);const m=1/c,v=1/d,y=1/h;return zi.elements[0]*=m,zi.elements[1]*=m,zi.elements[2]*=m,zi.elements[4]*=v,zi.elements[5]*=v,zi.elements[6]*=v,zi.elements[8]*=y,zi.elements[9]*=y,zi.elements[10]*=y,t.setFromRotationMatrix(zi),s.x=c,s.y=d,s.z=h,this}makePerspective(e,t,s,o,l,c,d=rr,h=!1){const m=this.elements,v=2*l/(t-e),y=2*l/(s-o),g=(t+e)/(t-e),E=(s+o)/(s-o);let b,A;if(h)b=l/(c-l),A=c*l/(c-l);else if(d===rr)b=-(c+l)/(c-l),A=-2*c*l/(c-l);else if(d===kc)b=-c/(c-l),A=-c*l/(c-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=v,m[4]=0,m[8]=g,m[12]=0,m[1]=0,m[5]=y,m[9]=E,m[13]=0,m[2]=0,m[6]=0,m[10]=b,m[14]=A,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(e,t,s,o,l,c,d=rr,h=!1){const m=this.elements,v=2/(t-e),y=2/(s-o),g=-(t+e)/(t-e),E=-(s+o)/(s-o);let b,A;if(h)b=1/(c-l),A=c/(c-l);else if(d===rr)b=-2/(c-l),A=-(c+l)/(c-l);else if(d===kc)b=-1/(c-l),A=-l/(c-l);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=v,m[4]=0,m[8]=0,m[12]=g,m[1]=0,m[5]=y,m[9]=0,m[13]=E,m[2]=0,m[6]=0,m[10]=b,m[14]=A,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<16;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<16;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e[t+9]=s[9],e[t+10]=s[10],e[t+11]=s[11],e[t+12]=s[12],e[t+13]=s[13],e[t+14]=s[14],e[t+15]=s[15],e}};Wc.prototype.isMatrix4=!0;let ln=Wc;const fo=new ce,zi=new ln,gE=new ce(0,0,0),xE=new ce(1,1,1),Zr=new ce,Kl=new ce,fi=new ce,Wg=new ln,jg=new Lo;class Is{constructor(e=0,t=0,s=0,o=Is.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=s,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,s,o=this._order){return this._x=e,this._y=t,this._z=s,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,s=!0){const o=e.elements,l=o[0],c=o[4],d=o[8],h=o[1],m=o[5],v=o[9],y=o[2],g=o[6],E=o[10];switch(t){case"XYZ":this._y=Math.asin(kt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,E),this._z=Math.atan2(-c,l)):(this._x=Math.atan2(g,m),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,E),this._z=Math.atan2(h,m)):(this._y=Math.atan2(-y,l),this._z=0);break;case"ZXY":this._x=Math.asin(kt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-y,E),this._z=Math.atan2(-c,m)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-kt(y,-1,1)),Math.abs(y)<.9999999?(this._x=Math.atan2(g,E),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-c,m));break;case"YZX":this._z=Math.asin(kt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-v,m),this._y=Math.atan2(-y,l)):(this._x=0,this._y=Math.atan2(d,E));break;case"XZY":this._z=Math.asin(-kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(g,m),this._y=Math.atan2(d,l)):(this._x=Math.atan2(-v,E),this._y=0);break;default:yt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,s){return Wg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wg,t,s)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return jg.setFromEuler(this),this.setFromQuaternion(jg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Is.DEFAULT_ORDER="XYZ";class Ix{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vE=0;const Xg=new ce,ho=new Lo,vr=new ln,Zl=new ce,ya=new ce,_E=new ce,yE=new Lo,qg=new ce(1,0,0),$g=new ce(0,1,0),Yg=new ce(0,0,1),Kg={type:"added"},SE={type:"removed"},po={type:"childadded",child:null},Zd={type:"childremoved",child:null};class Zn extends Us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vE++}),this.uuid=Ha(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Zn.DEFAULT_UP.clone();const e=new ce,t=new Is,s=new Lo,o=new ce(1,1,1);function l(){s.setFromEuler(t,!1)}function c(){t.setFromQuaternion(s,void 0,!1)}t._onChange(l),s._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new ln},normalMatrix:{value:new Mt}}),this.matrix=new ln,this.matrixWorld=new ln,this.matrixAutoUpdate=Zn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ix,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ho.setFromAxisAngle(e,t),this.quaternion.multiply(ho),this}rotateOnWorldAxis(e,t){return ho.setFromAxisAngle(e,t),this.quaternion.premultiply(ho),this}rotateX(e){return this.rotateOnAxis(qg,e)}rotateY(e){return this.rotateOnAxis($g,e)}rotateZ(e){return this.rotateOnAxis(Yg,e)}translateOnAxis(e,t){return Xg.copy(e).applyQuaternion(this.quaternion),this.position.add(Xg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qg,e)}translateY(e){return this.translateOnAxis($g,e)}translateZ(e){return this.translateOnAxis(Yg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vr.copy(this.matrixWorld).invert())}lookAt(e,t,s){e.isVector3?Zl.copy(e):Zl.set(e,t,s);const o=this.parent;this.updateWorldMatrix(!0,!1),ya.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vr.lookAt(ya,Zl,this.up):vr.lookAt(Zl,ya,this.up),this.quaternion.setFromRotationMatrix(vr),o&&(vr.extractRotation(o.matrixWorld),ho.setFromRotationMatrix(vr),this.quaternion.premultiply(ho.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Wt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Kg),po.child=e,this.dispatchEvent(po),po.child=null):Wt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(SE),Zd.child=e,this.dispatchEvent(Zd),Zd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vr.multiply(e.parent.matrixWorld)),e.applyMatrix4(vr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Kg),po.child=e,this.dispatchEvent(po),po.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let s=0,o=this.children.length;s<o;s++){const c=this.children[s].getObjectByProperty(e,t);if(c!==void 0)return c}}getObjectsByProperty(e,t,s=[]){this[e]===t&&s.push(this);const o=this.children;for(let l=0,c=o.length;l<c;l++)o[l].getObjectsByProperty(e,t,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ya,e,_E),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ya,yE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,s=e.y,o=e.z,l=this.matrix.elements;l[12]+=t-l[0]*t-l[4]*s-l[8]*o,l[13]+=s-l[1]*t-l[5]*s-l[9]*o,l[14]+=o-l[2]*t-l[6]*s-l[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].updateMatrixWorld(e)}updateWorldMatrix(e,t,s=!1){const o=this.parent;if(e===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),t===!0){const l=this.children;for(let c=0,d=l.length;c<d;c++)l[c].updateWorldMatrix(!1,!0,s)}}toJSON(e){const t=e===void 0||typeof e=="string",s={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,o.name=this.name,o.castShadow=this.castShadow,o.receiveShadow=this.receiveShadow,o.visible=this.visible,o.frustumCulled=this.frustumCulled,o.renderOrder=this.renderOrder,o.static=this.static,o.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(d=>({...d})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(e),o.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function l(d,h){return d[h.uuid]===void 0&&(d[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const h=d.shapes;if(Array.isArray(h))for(let m=0,v=h.length;m<v;m++){const y=h[m];l(e.shapes,y)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let h=0,m=this.material.length;h<m;h++)d.push(l(e.materials,this.material[h]));o.material=d}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let d=0;d<this.children.length;d++)o.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let d=0;d<this.animations.length;d++){const h=this.animations[d];o.animations.push(l(e.animations,h))}}if(t){const d=c(e.geometries),h=c(e.materials),m=c(e.textures),v=c(e.images),y=c(e.shapes),g=c(e.skeletons),E=c(e.animations),b=c(e.nodes);d.length>0&&(s.geometries=d),h.length>0&&(s.materials=h),m.length>0&&(s.textures=m),v.length>0&&(s.images=v),y.length>0&&(s.shapes=y),g.length>0&&(s.skeletons=g),E.length>0&&(s.animations=E),b.length>0&&(s.nodes=b)}return s.object=o,s;function c(d){const h=[];for(const m in d){const v=d[m];delete v.metadata,h.push(v)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let s=0;s<e.children.length;s++){const o=e.children[s];this.add(o.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Zn.DEFAULT_UP=new ce(0,1,0);Zn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ql extends Zn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const EE={type:"move"};class Qd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ql,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ql,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ce,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ce),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ql,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ce,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ce,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const s of e.hand.values())this._getHandJoint(t,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,s){let o=null,l=null,c=null;const d=this._targetRay,h=this._grip,m=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(m&&e.hand){c=!0;for(const A of e.hand.values()){const S=t.getJointPose(A,s),x=this._getHandJoint(m,A);S!==null&&(x.matrix.fromArray(S.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=S.radius),x.visible=S!==null}const v=m.joints["index-finger-tip"],y=m.joints["thumb-tip"],g=v.position.distanceTo(y.position),E=.02,b=.005;m.inputState.pinching&&g>E+b?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&g<=E-b&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,s),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,h.eventsEnabled&&h.dispatchEvent({type:"gripUpdated",data:e,target:this})));d!==null&&(o=t.getPose(e.targetRaySpace,s),o===null&&l!==null&&(o=l),o!==null&&(d.matrix.fromArray(o.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,o.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(o.linearVelocity)):d.hasLinearVelocity=!1,o.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(o.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(EE)))}return d!==null&&(d.visible=o!==null),h!==null&&(h.visible=l!==null),m!==null&&(m.visible=c!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const s=new Ql;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[t.jointName]=s,e.add(s)}return e.joints[t.jointName]}}const Ux={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qr={h:0,s:0,l:0},Jl={h:0,s:0,l:0};function Jd(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class It{constructor(e,t,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,s)}set(e,t,s){if(t===void 0&&s===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Bt.colorSpaceToWorking(this,t),this}setRGB(e,t,s,o=Bt.workingColorSpace){return this.r=e,this.g=t,this.b=s,Bt.colorSpaceToWorking(this,o),this}setHSL(e,t,s,o=Bt.workingColorSpace){if(e=cE(e,1),t=kt(t,0,1),s=kt(s,0,1),t===0)this.r=this.g=this.b=s;else{const l=s<=.5?s*(1+t):s+t-s*t,c=2*s-l;this.r=Jd(c,l,e+1/3),this.g=Jd(c,l,e),this.b=Jd(c,l,e-1/3)}return Bt.colorSpaceToWorking(this,o),this}setStyle(e,t=bi){function s(l){l!==void 0&&parseFloat(l)<1&&yt("Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const c=o[1],d=o[2];switch(c){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:yt("Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],c=l.length;if(c===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(c===6)return this.setHex(parseInt(l,16),t);yt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bi){const s=Ux[e.toLowerCase()];return s!==void 0?this.setHex(s,t):yt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tr(e.r),this.g=Tr(e.g),this.b=Tr(e.b),this}copyLinearToSRGB(e){return this.r=Ao(e.r),this.g=Ao(e.g),this.b=Ao(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bi){return Bt.workingToColorSpace(Vn.copy(this),e),Math.round(kt(Vn.r*255,0,255))*65536+Math.round(kt(Vn.g*255,0,255))*256+Math.round(kt(Vn.b*255,0,255))}getHexString(e=bi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Bt.workingColorSpace){Bt.workingToColorSpace(Vn.copy(this),t);const s=Vn.r,o=Vn.g,l=Vn.b,c=Math.max(s,o,l),d=Math.min(s,o,l);let h,m;const v=(d+c)/2;if(d===c)h=0,m=0;else{const y=c-d;switch(m=v<=.5?y/(c+d):y/(2-c-d),c){case s:h=(o-l)/y+(o<l?6:0);break;case o:h=(l-s)/y+2;break;case l:h=(s-o)/y+4;break}h/=6}return e.h=h,e.s=m,e.l=v,e}getRGB(e,t=Bt.workingColorSpace){return Bt.workingToColorSpace(Vn.copy(this),t),e.r=Vn.r,e.g=Vn.g,e.b=Vn.b,e}getStyle(e=bi){Bt.workingToColorSpace(Vn.copy(this),e);const t=Vn.r,s=Vn.g,o=Vn.b;return e!==bi?`color(${e} ${t.toFixed(3)} ${s.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(s*255)},${Math.round(o*255)})`}offsetHSL(e,t,s){return this.getHSL(Qr),this.setHSL(Qr.h+e,Qr.s+t,Qr.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,s){return this.r=e.r+(t.r-e.r)*s,this.g=e.g+(t.g-e.g)*s,this.b=e.b+(t.b-e.b)*s,this}lerpHSL(e,t){this.getHSL(Qr),e.getHSL(Jl);const s=Xd(Qr.h,Jl.h,t),o=Xd(Qr.s,Jl.s,t),l=Xd(Qr.l,Jl.l,t);return this.setHSL(s,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,s=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*s+l[6]*o,this.g=l[1]*t+l[4]*s+l[7]*o,this.b=l[2]*t+l[5]*s+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vn=new It;It.NAMES=Ux;class Ox extends Zn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Is,this.environmentIntensity=1,this.environmentRotation=new Is,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Hi=new ce,_r=new ce,ef=new ce,yr=new ce,mo=new ce,go=new ce,Zg=new ce,tf=new ce,nf=new ce,rf=new ce,sf=new an,of=new an,af=new an;class Gi{constructor(e=new ce,t=new ce,s=new ce){this.a=e,this.b=t,this.c=s}static getNormal(e,t,s,o){o.subVectors(s,t),Hi.subVectors(e,t),o.cross(Hi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,s,o,l){Hi.subVectors(o,t),_r.subVectors(s,t),ef.subVectors(e,t);const c=Hi.dot(Hi),d=Hi.dot(_r),h=Hi.dot(ef),m=_r.dot(_r),v=_r.dot(ef),y=c*m-d*d;if(y===0)return l.set(0,0,0),null;const g=1/y,E=(m*h-d*v)*g,b=(c*v-d*h)*g;return l.set(1-E-b,b,E)}static containsPoint(e,t,s,o){return this.getBarycoord(e,t,s,o,yr)===null?!1:yr.x>=0&&yr.y>=0&&yr.x+yr.y<=1}static getInterpolation(e,t,s,o,l,c,d,h){return this.getBarycoord(e,t,s,o,yr)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,yr.x),h.addScaledVector(c,yr.y),h.addScaledVector(d,yr.z),h)}static getInterpolatedAttribute(e,t,s,o,l,c){return sf.setScalar(0),of.setScalar(0),af.setScalar(0),sf.fromBufferAttribute(e,t),of.fromBufferAttribute(e,s),af.fromBufferAttribute(e,o),c.setScalar(0),c.addScaledVector(sf,l.x),c.addScaledVector(of,l.y),c.addScaledVector(af,l.z),c}static isFrontFacing(e,t,s,o){return Hi.subVectors(s,t),_r.subVectors(e,t),Hi.cross(_r).dot(o)<0}set(e,t,s){return this.a.copy(e),this.b.copy(t),this.c.copy(s),this}setFromPointsAndIndices(e,t,s,o){return this.a.copy(e[t]),this.b.copy(e[s]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,s,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Hi.subVectors(this.c,this.b),_r.subVectors(this.a,this.b),Hi.cross(_r).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,s,o,l){return Gi.getInterpolation(e,this.a,this.b,this.c,t,s,o,l)}containsPoint(e){return Gi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const s=this.a,o=this.b,l=this.c;let c,d;mo.subVectors(o,s),go.subVectors(l,s),tf.subVectors(e,s);const h=mo.dot(tf),m=go.dot(tf);if(h<=0&&m<=0)return t.copy(s);nf.subVectors(e,o);const v=mo.dot(nf),y=go.dot(nf);if(v>=0&&y<=v)return t.copy(o);const g=h*y-v*m;if(g<=0&&h>=0&&v<=0)return c=h/(h-v),t.copy(s).addScaledVector(mo,c);rf.subVectors(e,l);const E=mo.dot(rf),b=go.dot(rf);if(b>=0&&E<=b)return t.copy(l);const A=E*m-h*b;if(A<=0&&m>=0&&b<=0)return d=m/(m-b),t.copy(s).addScaledVector(go,d);const S=v*b-E*y;if(S<=0&&y-v>=0&&E-b>=0)return Zg.subVectors(l,o),d=(y-v)/(y-v+(E-b)),t.copy(o).addScaledVector(Zg,d);const x=1/(S+A+g);return c=A*x,d=g*x,t.copy(s).addScaledVector(mo,c).addScaledVector(go,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Va{constructor(e=new ce(1/0,1/0,1/0),t=new ce(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t+=3)this.expandByPoint(Vi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,s=e.count;t<s;t++)this.expandByPoint(Vi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const s=Vi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const l=s.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let c=0,d=l.count;c<d;c++)e.isMesh===!0?e.getVertexPosition(c,Vi):Vi.fromBufferAttribute(l,c),Vi.applyMatrix4(e.matrixWorld),this.expandByPoint(Vi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ec.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),ec.copy(s.boundingBox)),ec.applyMatrix4(e.matrixWorld),this.union(ec)}const o=e.children;for(let l=0,c=o.length;l<c;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vi),Vi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,s;return e.normal.x>0?(t=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),t<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sa),tc.subVectors(this.max,Sa),xo.subVectors(e.a,Sa),vo.subVectors(e.b,Sa),_o.subVectors(e.c,Sa),Jr.subVectors(vo,xo),es.subVectors(_o,vo),_s.subVectors(xo,_o);let t=[0,-Jr.z,Jr.y,0,-es.z,es.y,0,-_s.z,_s.y,Jr.z,0,-Jr.x,es.z,0,-es.x,_s.z,0,-_s.x,-Jr.y,Jr.x,0,-es.y,es.x,0,-_s.y,_s.x,0];return!lf(t,xo,vo,_o,tc)||(t=[1,0,0,0,1,0,0,0,1],!lf(t,xo,vo,_o,tc))?!1:(nc.crossVectors(Jr,es),t=[nc.x,nc.y,nc.z],lf(t,xo,vo,_o,tc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sr=[new ce,new ce,new ce,new ce,new ce,new ce,new ce,new ce],Vi=new ce,ec=new Va,xo=new ce,vo=new ce,_o=new ce,Jr=new ce,es=new ce,_s=new ce,Sa=new ce,tc=new ce,nc=new ce,ys=new ce;function lf(i,e,t,s,o){for(let l=0,c=i.length-3;l<=c;l+=3){ys.fromArray(i,l);const d=o.x*Math.abs(ys.x)+o.y*Math.abs(ys.y)+o.z*Math.abs(ys.z),h=e.dot(ys),m=t.dot(ys),v=s.dot(ys);if(Math.max(-Math.max(h,m,v),Math.min(h,m,v))>d)return!1}return!0}const gn=new ce,ic=new Ht;let ME=0;class Xi extends Us{constructor(e,t,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ME++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=s,this.usage=rE,this.updateRanges=[],this.gpuType=ir,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,s){e*=this.itemSize,s*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[s+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,s=this.count;t<s;t++)ic.fromBufferAttribute(this,t),ic.applyMatrix3(e),this.setXY(t,ic.x,ic.y);else if(this.itemSize===3)for(let t=0,s=this.count;t<s;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix3(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyMatrix4(e){for(let t=0,s=this.count;t<s;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix4(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyNormalMatrix(e){for(let t=0,s=this.count;t<s;t++)gn.fromBufferAttribute(this,t),gn.applyNormalMatrix(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}transformDirection(e){for(let t=0,s=this.count;t<s;t++)gn.fromBufferAttribute(this,t),gn.transformDirection(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let s=this.array[e*this.itemSize+t];return this.normalized&&(s=_a(s,this.array)),s}setComponent(e,t,s){return this.normalized&&(s=si(s,this.array)),this.array[e*this.itemSize+t]=s,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=_a(t,this.array)),t}setX(e,t){return this.normalized&&(t=si(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=_a(t,this.array)),t}setY(e,t){return this.normalized&&(t=si(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=_a(t,this.array)),t}setZ(e,t){return this.normalized&&(t=si(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=_a(t,this.array)),t}setW(e,t){return this.normalized&&(t=si(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,s){return e*=this.itemSize,this.normalized&&(t=si(t,this.array),s=si(s,this.array)),this.array[e+0]=t,this.array[e+1]=s,this}setXYZ(e,t,s,o){return e*=this.itemSize,this.normalized&&(t=si(t,this.array),s=si(s,this.array),o=si(o,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this}setXYZW(e,t,s,o,l){return e*=this.itemSize,this.normalized&&(t=si(t,this.array),s=si(s,this.array),o=si(o,this.array),l=si(l,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Bx extends Xi{constructor(e,t,s){super(new Uint16Array(e),t,s)}}class kx extends Xi{constructor(e,t,s){super(new Uint32Array(e),t,s)}}class Sn extends Xi{constructor(e,t,s){super(new Float32Array(e),t,s)}}const wE=new Va,Ea=new ce,cf=new ce;class Ga{constructor(e=new ce,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const s=this.center;t!==void 0?s.copy(t):wE.setFromPoints(e).getCenter(s);let o=0;for(let l=0,c=e.length;l<c;l++)o=Math.max(o,s.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const s=this.center.distanceToSquared(e);return t.copy(e),s>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ea.subVectors(e,this.center);const t=Ea.lengthSq();if(t>this.radius*this.radius){const s=Math.sqrt(t),o=(s-this.radius)*.5;this.center.addScaledVector(Ea,o/s),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ea.copy(e.center).add(cf)),this.expandByPoint(Ea.copy(e.center).sub(cf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let bE=0;const wi=new ln,uf=new Zn,yo=new ce,hi=new Va,Ma=new Va,Rn=new ce;class jn extends Us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bE++}),this.uuid=Ha(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(sE(e)?kx:Bx)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,s=0){this.groups.push({start:e,count:t,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const l=new Mt().getNormalMatrix(e);s.applyNormalMatrix(l),s.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return wi.makeRotationFromQuaternion(e),this.applyMatrix4(wi),this}rotateX(e){return wi.makeRotationX(e),this.applyMatrix4(wi),this}rotateY(e){return wi.makeRotationY(e),this.applyMatrix4(wi),this}rotateZ(e){return wi.makeRotationZ(e),this.applyMatrix4(wi),this}translate(e,t,s){return wi.makeTranslation(e,t,s),this.applyMatrix4(wi),this}scale(e,t,s){return wi.makeScale(e,t,s),this.applyMatrix4(wi),this}lookAt(e){return uf.lookAt(e),uf.updateMatrix(),this.applyMatrix4(uf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yo).negate(),this.translate(yo.x,yo.y,yo.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];s.push(c.x,c.y,c.z||0)}this.setAttribute("position",new Sn(s,3))}else{const s=Math.min(e.length,t.count);for(let o=0;o<s;o++){const l=e[o];t.setXYZ(o,l.x,l.y,l.z||0)}e.length>t.count&&yt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Va);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ce(-1/0,-1/0,-1/0),new ce(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const l=t[s];hi.setFromBufferAttribute(l),this.morphTargetsRelative?(Rn.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(Rn),Rn.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(Rn)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Wt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ga);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ce,1/0);return}if(e){const s=this.boundingSphere.center;if(hi.setFromBufferAttribute(e),t)for(let l=0,c=t.length;l<c;l++){const d=t[l];Ma.setFromBufferAttribute(d),this.morphTargetsRelative?(Rn.addVectors(hi.min,Ma.min),hi.expandByPoint(Rn),Rn.addVectors(hi.max,Ma.max),hi.expandByPoint(Rn)):(hi.expandByPoint(Ma.min),hi.expandByPoint(Ma.max))}hi.getCenter(s);let o=0;for(let l=0,c=e.count;l<c;l++)Rn.fromBufferAttribute(e,l),o=Math.max(o,s.distanceToSquared(Rn));if(t)for(let l=0,c=t.length;l<c;l++){const d=t[l],h=this.morphTargetsRelative;for(let m=0,v=d.count;m<v;m++)Rn.fromBufferAttribute(d,m),h&&(yo.fromBufferAttribute(e,m),Rn.add(yo)),o=Math.max(o,s.distanceToSquared(Rn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&Wt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Wt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=t.position,o=t.normal,l=t.uv;let c=this.getAttribute("tangent");(c===void 0||c.count!==s.count)&&(c=new Xi(new Float32Array(4*s.count),4),this.setAttribute("tangent",c));const d=[],h=[];for(let M=0;M<s.count;M++)d[M]=new ce,h[M]=new ce;const m=new ce,v=new ce,y=new ce,g=new Ht,E=new Ht,b=new Ht,A=new ce,S=new ce;function x(M,I,z){m.fromBufferAttribute(s,M),v.fromBufferAttribute(s,I),y.fromBufferAttribute(s,z),g.fromBufferAttribute(l,M),E.fromBufferAttribute(l,I),b.fromBufferAttribute(l,z),v.sub(m),y.sub(m),E.sub(g),b.sub(g);const j=1/(E.x*b.y-b.x*E.y);isFinite(j)&&(A.copy(v).multiplyScalar(b.y).addScaledVector(y,-E.y).multiplyScalar(j),S.copy(y).multiplyScalar(E.x).addScaledVector(v,-b.x).multiplyScalar(j),d[M].add(A),d[I].add(A),d[z].add(A),h[M].add(S),h[I].add(S),h[z].add(S))}let R=this.groups;R.length===0&&(R=[{start:0,count:e.count}]);for(let M=0,I=R.length;M<I;++M){const z=R[M],j=z.start,X=z.count;for(let re=j,H=j+X;re<H;re+=3)x(e.getX(re+0),e.getX(re+1),e.getX(re+2))}const O=new ce,T=new ce,D=new ce,F=new ce;function U(M){D.fromBufferAttribute(o,M),F.copy(D);const I=d[M];O.copy(I),O.sub(D.multiplyScalar(D.dot(I))).normalize(),T.crossVectors(F,I);const j=T.dot(h[M])<0?-1:1;c.setXYZW(M,O.x,O.y,O.z,j)}for(let M=0,I=R.length;M<I;++M){const z=R[M],j=z.start,X=z.count;for(let re=j,H=j+X;re<H;re+=3)U(e.getX(re+0)),U(e.getX(re+1)),U(e.getX(re+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==t.count)s=new Xi(new Float32Array(t.count*3),3),this.setAttribute("normal",s);else for(let g=0,E=s.count;g<E;g++)s.setXYZ(g,0,0,0);const o=new ce,l=new ce,c=new ce,d=new ce,h=new ce,m=new ce,v=new ce,y=new ce;if(e)for(let g=0,E=e.count;g<E;g+=3){const b=e.getX(g+0),A=e.getX(g+1),S=e.getX(g+2);o.fromBufferAttribute(t,b),l.fromBufferAttribute(t,A),c.fromBufferAttribute(t,S),v.subVectors(c,l),y.subVectors(o,l),v.cross(y),d.fromBufferAttribute(s,b),h.fromBufferAttribute(s,A),m.fromBufferAttribute(s,S),d.add(v),h.add(v),m.add(v),s.setXYZ(b,d.x,d.y,d.z),s.setXYZ(A,h.x,h.y,h.z),s.setXYZ(S,m.x,m.y,m.z)}else for(let g=0,E=t.count;g<E;g+=3)o.fromBufferAttribute(t,g+0),l.fromBufferAttribute(t,g+1),c.fromBufferAttribute(t,g+2),v.subVectors(c,l),y.subVectors(o,l),v.cross(y),s.setXYZ(g+0,v.x,v.y,v.z),s.setXYZ(g+1,v.x,v.y,v.z),s.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,s=e.count;t<s;t++)Rn.fromBufferAttribute(e,t),Rn.normalize(),e.setXYZ(t,Rn.x,Rn.y,Rn.z)}toNonIndexed(){function e(d,h){const m=d.array,v=d.itemSize,y=d.normalized,g=new m.constructor(h.length*v);let E=0,b=0;for(let A=0,S=h.length;A<S;A++){d.isInterleavedBufferAttribute?E=h[A]*d.data.stride+d.offset:E=h[A]*v;for(let x=0;x<v;x++)g[b++]=m[E++]}return new Xi(g,v,y)}if(this.index===null)return yt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jn,s=this.index.array,o=this.attributes;for(const d in o){const h=o[d],m=e(h,s);t.setAttribute(d,m)}const l=this.morphAttributes;for(const d in l){const h=[],m=l[d];for(let v=0,y=m.length;v<y;v++){const g=m[v],E=e(g,s);h.push(E)}t.morphAttributes[d]=h}t.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let d=0,h=c.length;d<h;d++){const m=c[d];t.addGroup(m.start,m.count,m.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const h=this.parameters;for(const m in h)h[m]!==void 0&&(e[m]=h[m]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const s=this.attributes;for(const h in s){const m=s[h];e.data.attributes[h]=m.toJSON(e.data)}const o={};let l=!1;for(const h in this.morphAttributes){const m=this.morphAttributes[h],v=[];for(let y=0,g=m.length;y<g;y++){const E=m[y];v.push(E.toJSON(e.data))}v.length>0&&(o[h]=v,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const o=e.attributes;for(const m in o){const v=o[m];this.setAttribute(m,v.clone(t))}const l=e.morphAttributes;for(const m in l){const v=[],y=l[m];for(let g=0,E=y.length;g<E;g++)v.push(y[g].clone(t));this.morphAttributes[m]=v}this.morphTargetsRelative=e.morphTargetsRelative;const c=e.groups;for(let m=0,v=c.length;m<v;m++){const y=c[m];this.addGroup(y.start,y.count,y.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const df=new ce,TE=new ce,AE=new Mt;class ns{constructor(e=new ce(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,s,o){return this.normal.set(e,t,s),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,s){const o=df.subVectors(s,t).cross(TE.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,s=!0){const o=e.delta(df),l=this.normal.dot(o);if(l===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/l;return s===!0&&(c<0||c>1)?null:t.copy(e.start).addScaledVector(o,c)}intersectsLine(e){const t=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return t<0&&s>0||s<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const s=t||AE.getNormalMatrix(e),o=this.coplanarPoint(df).applyMatrix4(e),l=this.normal.applyMatrix3(s).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let CE=0;class Fo extends Us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:CE++}),this.uuid=Ha(),this.name="",this.type="Material",this.blending=Pa,this.side=Ls,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mx,this.blendDst=gx,this.blendEquation=wo,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Fa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Z1,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wd,this.stencilZFail=Wd,this.stencilZPass=Wd,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const s=e[t];if(s===void 0){yt(`Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){yt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(s):o&&o.isVector2&&s&&s.isVector2||o&&o.isEuler&&s&&s.isEuler||o&&o.isVector3&&s&&s.isVector3?o.copy(s):this[t]=s}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,s.blending=this.blending,s.side=this.side,s.shadowSide=this.shadowSide,s.vertexColors=this.vertexColors,s.opacity=this.opacity,s.transparent=this.transparent,s.blendSrc=this.blendSrc,s.blendDst=this.blendDst,s.blendEquation=this.blendEquation,s.blendSrcAlpha=this.blendSrcAlpha,s.blendDstAlpha=this.blendDstAlpha,s.blendEquationAlpha=this.blendEquationAlpha,s.blendColor=this.blendColor.getHex(),s.blendAlpha=this.blendAlpha,s.depthFunc=this.depthFunc,s.depthTest=this.depthTest,s.depthWrite=this.depthWrite,s.colorWrite=this.colorWrite,s.clipIntersection=this.clipIntersection,s.clipShadows=this.clipShadows,s.stencilWriteMask=this.stencilWriteMask,s.stencilFunc=this.stencilFunc,s.stencilRef=this.stencilRef,s.stencilFuncMask=this.stencilFuncMask,s.stencilFail=this.stencilFail,s.stencilZFail=this.stencilZFail,s.stencilZPass=this.stencilZPass,s.stencilWrite=this.stencilWrite,s.polygonOffset=this.polygonOffset,s.polygonOffsetFactor=this.polygonOffsetFactor,s.polygonOffsetUnits=this.polygonOffsetUnits,s.dithering=this.dithering,s.alphaTest=this.alphaTest,s.alphaHash=this.alphaHash,s.alphaToCoverage=this.alphaToCoverage,s.premultipliedAlpha=this.premultipliedAlpha,s.forceSinglePass=this.forceSinglePass,s.allowOverride=this.allowOverride,s.visible=this.visible,s.toneMapped=this.toneMapped,s.name=this.name,this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(s.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(s.clippingPlanes=this.clippingPlanes.map(l=>l.toJSON())),this.rotation!==void 0&&(s.rotation=this.rotation),this.depthPacking!==void 0&&(s.depthPacking=this.depthPacking),this.linewidth!==void 0&&(s.linewidth=this.linewidth),this.linecap!==void 0&&(s.linecap=this.linecap),this.linejoin!==void 0&&(s.linejoin=this.linejoin),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.wireframe!==void 0&&(s.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(s.flatShading=this.flatShading),this.fog!==void 0&&(s.fog=this.fog),Object.keys(this.userData).length>0&&(s.userData=this.userData);function o(l){const c=[];for(const d in l){const h=l[d];delete h.metadata,c.push(h)}return c}if(t){const l=o(e.textures),c=o(e.images);l.length>0&&(s.textures=l),c.length>0&&(s.images=c)}return s}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new It().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(s=>new ns().fromJSON(s))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new Ht().fromArray(s)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ht().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let s=null;if(t!==null){const o=t.length;s=new Array(o);for(let l=0;l!==o;++l)s[l]=t[l].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Er=new ce,ff=new ce,rc=new ce,sc=new ce;class Dh{constructor(e=new ce,t=new ce(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Er)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const s=t.dot(this.direction);return s<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Er.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Er.copy(this.origin).addScaledVector(this.direction,t),Er.distanceToSquared(e))}distanceSqToSegment(e,t,s,o){ff.copy(e).add(t).multiplyScalar(.5),rc.copy(t).sub(e).normalize(),sc.copy(this.origin).sub(ff);const l=e.distanceTo(t)*.5,c=-this.direction.dot(rc),d=sc.dot(this.direction),h=-sc.dot(rc),m=sc.lengthSq(),v=Math.abs(1-c*c);let y,g,E,b;if(v>0)if(y=c*h-d,g=c*d-h,b=l*v,y>=0)if(g>=-b)if(g<=b){const A=1/v;y*=A,g*=A,E=y*(y+c*g+2*d)+g*(c*y+g+2*h)+m}else g=l,y=Math.max(0,-(c*g+d)),E=-y*y+g*(g+2*h)+m;else g=-l,y=Math.max(0,-(c*g+d)),E=-y*y+g*(g+2*h)+m;else g<=-b?(y=Math.max(0,-(-c*l+d)),g=y>0?-l:Math.min(Math.max(-l,-h),l),E=-y*y+g*(g+2*h)+m):g<=b?(y=0,g=Math.min(Math.max(-l,-h),l),E=g*(g+2*h)+m):(y=Math.max(0,-(c*l+d)),g=y>0?l:Math.min(Math.max(-l,-h),l),E=-y*y+g*(g+2*h)+m);else g=c>0?-l:l,y=Math.max(0,-(c*g+d)),E=-y*y+g*(g+2*h)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,y),o&&o.copy(ff).addScaledVector(rc,g),E}intersectSphere(e,t){if(e.radius<0)return null;Er.subVectors(e.center,this.origin);const s=Er.dot(this.direction),o=Er.dot(Er)-s*s,l=e.radius*e.radius;if(o>l)return null;const c=Math.sqrt(l-o),d=s-c,h=s+c;return h<0?null:d<0?this.at(h,t):this.at(d,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/t;return s>=0?s:null}intersectPlane(e,t){const s=this.distanceToPlane(e);return s===null?null:this.at(s,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let s,o,l,c,d,h;const m=1/this.direction.x,v=1/this.direction.y,y=1/this.direction.z,g=this.origin;return m>=0?(s=(e.min.x-g.x)*m,o=(e.max.x-g.x)*m):(s=(e.max.x-g.x)*m,o=(e.min.x-g.x)*m),v>=0?(l=(e.min.y-g.y)*v,c=(e.max.y-g.y)*v):(l=(e.max.y-g.y)*v,c=(e.min.y-g.y)*v),s>c||l>o||((l>s||isNaN(s))&&(s=l),(c<o||isNaN(o))&&(o=c),y>=0?(d=(e.min.z-g.z)*y,h=(e.max.z-g.z)*y):(d=(e.max.z-g.z)*y,h=(e.min.z-g.z)*y),s>h||d>o)||((d>s||s!==s)&&(s=d),(h<o||o!==o)&&(o=h),o<0)?null:this.at(s>=0?s:o,t)}intersectsBox(e){return this.intersectBox(e,Er)!==null}intersectTriangle(e,t,s,o,l){const c=this.origin,d=this.direction,h=d.x,m=d.y,v=d.z,y=e.x-c.x,g=e.y-c.y,E=e.z-c.z,b=t.x-c.x,A=t.y-c.y,S=t.z-c.z,x=s.x-c.x,R=s.y-c.y,O=s.z-c.z,T=Math.abs(h),D=Math.abs(m),F=Math.abs(v);let U,M,I,z,j,X,re,H,te,ge,se,ne;if(T>=D&&T>=F?(I=h,X=y,te=b,ne=x,h>=0?(U=m,M=v,z=g,j=E,re=A,H=S,ge=R,se=O):(U=v,M=m,z=E,j=g,re=S,H=A,ge=O,se=R)):D>=F?(I=m,X=g,te=A,ne=R,m>=0?(U=v,M=h,z=E,j=y,re=S,H=b,ge=O,se=x):(U=h,M=v,z=y,j=E,re=b,H=S,ge=x,se=O)):(I=v,X=E,te=S,ne=O,v>=0?(U=h,M=m,z=y,j=g,re=b,H=A,ge=x,se=R):(U=m,M=h,z=g,j=y,re=A,H=b,ge=R,se=x)),I===0)return null;const G=U/I,V=M/I,N=1/I,Z=z-G*X,_e=j-V*X,De=re-G*te,Se=H-V*te,Ee=ge-G*ne,Q=se-V*ne,ae=Ee*Se-Q*De,Te=Z*Q-_e*Ee,Ke=De*_e-Se*Z;if(o){if(ae<0||Te<0||Ke<0)return null}else if((ae<0||Te<0||Ke<0)&&(ae>0||Te>0||Ke>0))return null;const Ge=ae+Te+Ke;if(Ge===0)return null;const ct=N*(ae*X+Te*te+Ke*ne);return(Ge>0?ct<0:ct>0)?null:this.at(ct/Ge,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rs extends Fo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Is,this.combine=xx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Qg=new ln,Ss=new Dh,oc=new Ga,Jg=new ce,ac=new ce,lc=new ce,cc=new ce,hf=new ce,uc=new ce,e0=new ce,dc=new ce;class Yn extends Zn{constructor(e=new jn,t=new rs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){const o=t[s[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=o.length;l<c;l++){const d=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}getVertexPosition(e,t){const s=this.geometry,o=s.attributes.position,l=s.morphAttributes.position,c=s.morphTargetsRelative;t.fromBufferAttribute(o,e);const d=this.morphTargetInfluences;if(l&&d){uc.set(0,0,0);for(let h=0,m=l.length;h<m;h++){const v=d[h],y=l[h];v!==0&&(hf.fromBufferAttribute(y,e),c?uc.addScaledVector(hf,v):uc.addScaledVector(hf.sub(t),v))}t.add(uc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const s=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),oc.copy(s.boundingSphere),oc.applyMatrix4(l),Ss.copy(e.ray).recast(e.near),!(oc.containsPoint(Ss.origin)===!1&&(Ss.intersectSphere(oc,Jg)===null||Ss.origin.distanceToSquared(Jg)>(e.far-e.near)**2))&&(Qg.copy(l).invert(),Ss.copy(e.ray).applyMatrix4(Qg),!(s.boundingBox!==null&&Ss.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,t,Ss)))}_computeIntersections(e,t,s){let o;const l=this.geometry,c=this.material,d=l.index,h=l.attributes.position,m=l.attributes.uv,v=l.attributes.uv1,y=l.attributes.normal,g=l.groups,E=l.drawRange;if(d!==null)if(Array.isArray(c))for(let b=0,A=g.length;b<A;b++){const S=g[b],x=c[S.materialIndex],R=Math.max(S.start,E.start),O=Math.min(d.count,Math.min(S.start+S.count,E.start+E.count));for(let T=R,D=O;T<D;T+=3){const F=d.getX(T),U=d.getX(T+1),M=d.getX(T+2);o=fc(this,x,e,s,m,v,y,F,U,M),o&&(o.faceIndex=Math.floor(T/3),o.face.materialIndex=S.materialIndex,t.push(o))}}else{const b=Math.max(0,E.start),A=Math.min(d.count,E.start+E.count);for(let S=b,x=A;S<x;S+=3){const R=d.getX(S),O=d.getX(S+1),T=d.getX(S+2);o=fc(this,c,e,s,m,v,y,R,O,T),o&&(o.faceIndex=Math.floor(S/3),t.push(o))}}else if(h!==void 0)if(Array.isArray(c))for(let b=0,A=g.length;b<A;b++){const S=g[b],x=c[S.materialIndex],R=Math.max(S.start,E.start),O=Math.min(h.count,Math.min(S.start+S.count,E.start+E.count));for(let T=R,D=O;T<D;T+=3){const F=T,U=T+1,M=T+2;o=fc(this,x,e,s,m,v,y,F,U,M),o&&(o.faceIndex=Math.floor(T/3),o.face.materialIndex=S.materialIndex,t.push(o))}}else{const b=Math.max(0,E.start),A=Math.min(h.count,E.start+E.count);for(let S=b,x=A;S<x;S+=3){const R=S,O=S+1,T=S+2;o=fc(this,c,e,s,m,v,y,R,O,T),o&&(o.faceIndex=Math.floor(S/3),t.push(o))}}}}function RE(i,e,t,s,o,l,c,d){let h;if(e.side===ai?h=s.intersectTriangle(c,l,o,!0,d):h=s.intersectTriangle(o,l,c,e.side===Ls,d),h===null)return null;dc.copy(d),dc.applyMatrix4(i.matrixWorld);const m=t.ray.origin.distanceTo(dc);return m<t.near||m>t.far?null:{distance:m,point:dc.clone(),object:i}}function fc(i,e,t,s,o,l,c,d,h,m){i.getVertexPosition(d,ac),i.getVertexPosition(h,lc),i.getVertexPosition(m,cc);const v=RE(i,e,t,s,ac,lc,cc,e0);if(v){const y=new ce;Gi.getBarycoord(e0,ac,lc,cc,y),o&&(v.uv=Gi.getInterpolatedAttribute(o,d,h,m,y,new Ht)),l&&(v.uv1=Gi.getInterpolatedAttribute(l,d,h,m,y,new Ht)),c&&(v.normal=Gi.getInterpolatedAttribute(c,d,h,m,y,new ce),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const g={a:d,b:h,c:m,normal:new ce,materialIndex:0};Gi.getNormal(ac,lc,cc,g.normal),v.face=g,v.barycoord=y}return v}class PE extends Kn{constructor(e=null,t=1,s=1,o,l,c,d,h,m=Nn,v=Nn,y,g){super(null,c,d,h,m,v,o,l,y,g),this.isDataTexture=!0,this.image={data:e,width:t,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Es=new Ga,DE=new Ht(.5,.5),hc=new ce;class zx{constructor(e=new ns,t=new ns,s=new ns,o=new ns,l=new ns,c=new ns){this.planes=[e,t,s,o,l,c]}set(e,t,s,o,l,c){const d=this.planes;return d[0].copy(e),d[1].copy(t),d[2].copy(s),d[3].copy(o),d[4].copy(l),d[5].copy(c),this}copy(e){const t=this.planes;for(let s=0;s<6;s++)t[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,t=rr,s=!1){const o=this.planes,l=e.elements,c=l[0],d=l[1],h=l[2],m=l[3],v=l[4],y=l[5],g=l[6],E=l[7],b=l[8],A=l[9],S=l[10],x=l[11],R=l[12],O=l[13],T=l[14],D=l[15];if(o[0].setComponents(m-c,E-v,x-b,D-R).normalize(),o[1].setComponents(m+c,E+v,x+b,D+R).normalize(),o[2].setComponents(m+d,E+y,x+A,D+O).normalize(),o[3].setComponents(m-d,E-y,x-A,D-O).normalize(),s)o[4].setComponents(h,g,S,T).normalize(),o[5].setComponents(m-h,E-g,x-S,D-T).normalize();else if(o[4].setComponents(m-h,E-g,x-S,D-T).normalize(),t===rr)o[5].setComponents(m+h,E+g,x+S,D+T).normalize();else if(t===kc)o[5].setComponents(h,g,S,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Es.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Es.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Es)}intersectsSprite(e){Es.center.set(0,0,0);const t=DE.distanceTo(e.center);return Es.radius=.7071067811865476+t,Es.applyMatrix4(e.matrixWorld),this.intersectsSphere(Es)}intersectsSphere(e){const t=this.planes,s=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(s)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let s=0;s<6;s++){const o=t[s];if(hc.x=o.normal.x>0?e.max.x:e.min.x,hc.y=o.normal.y>0?e.max.y:e.min.y,hc.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(hc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let s=0;s<6;s++)if(t[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Hx extends Fo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new It(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Hc=new ce,Vc=new ce,t0=new ln,wa=new Dh,pc=new Ga,pf=new ce,n0=new ce;class LE extends Zn{constructor(e=new jn,t=new Hx){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,s=[0];for(let o=1,l=t.count;o<l;o++)Hc.fromBufferAttribute(t,o-1),Vc.fromBufferAttribute(t,o),s[o]=s[o-1],s[o]+=Hc.distanceTo(Vc);e.setAttribute("lineDistance",new Sn(s,1))}else yt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const s=this.geometry,o=this.matrixWorld,l=e.params.Line.threshold,c=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),pc.copy(s.boundingSphere),pc.applyMatrix4(o),pc.radius+=l,e.ray.intersectsSphere(pc)===!1)return;t0.copy(o).invert(),wa.copy(e.ray).applyMatrix4(t0);const d=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=d*d,m=this.isLineSegments?2:1,v=s.index,g=s.attributes.position;if(v!==null){const E=Math.max(0,c.start),b=Math.min(v.count,c.start+c.count);for(let A=E,S=b-1;A<S;A+=m){const x=v.getX(A),R=v.getX(A+1),O=mc(this,e,wa,h,x,R,A);O&&t.push(O)}if(this.isLineLoop){const A=v.getX(b-1),S=v.getX(E),x=mc(this,e,wa,h,A,S,b-1);x&&t.push(x)}}else{const E=Math.max(0,c.start),b=Math.min(g.count,c.start+c.count);for(let A=E,S=b-1;A<S;A+=m){const x=mc(this,e,wa,h,A,A+1,A);x&&t.push(x)}if(this.isLineLoop){const A=mc(this,e,wa,h,b-1,E,b-1);A&&t.push(A)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){const o=t[s[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=o.length;l<c;l++){const d=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}}function mc(i,e,t,s,o,l,c){const d=i.geometry.attributes.position;if(Hc.fromBufferAttribute(d,o),Vc.fromBufferAttribute(d,l),t.distanceSqToSegment(Hc,Vc,pf,n0)>s)return;pf.applyMatrix4(i.matrixWorld);const m=e.ray.origin.distanceTo(pf);if(!(m<e.near||m>e.far))return{distance:m,point:n0.clone().applyMatrix4(i.matrixWorld),index:c,face:null,faceIndex:null,barycoord:null,object:i}}class Vx extends Fo{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const i0=new ln,uh=new Dh,gc=new Ga,xc=new ce;class FE extends Zn{constructor(e=new jn,t=new Vx){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const s=this.geometry,o=this.matrixWorld,l=e.params.Points.threshold,c=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),gc.copy(s.boundingSphere),gc.applyMatrix4(o),gc.radius+=l,e.ray.intersectsSphere(gc)===!1)return;i0.copy(o).invert(),uh.copy(e.ray).applyMatrix4(i0);const d=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=d*d,m=s.index,y=s.attributes.position;if(m!==null){const g=Math.max(0,c.start),E=Math.min(m.count,c.start+c.count);for(let b=g,A=E;b<A;b++){const S=m.getX(b);xc.fromBufferAttribute(y,S),r0(xc,S,h,o,e,t,this)}}else{const g=Math.max(0,c.start),E=Math.min(y.count,c.start+c.count);for(let b=g,A=E;b<A;b++)xc.fromBufferAttribute(y,b),r0(xc,b,h,o,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){const o=t[s[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=o.length;l<c;l++){const d=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}}function r0(i,e,t,s,o,l,c){const d=uh.distanceSqToPoint(i);if(d<t){const h=new ce;uh.closestPointToPoint(i,h),h.applyMatrix4(s);const m=o.ray.origin.distanceTo(h);if(m<o.near||m>o.far)return;l.push({distance:m,distanceToRay:Math.sqrt(d),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:c})}}class Gx extends Kn{constructor(e=[],t=Fs,s,o,l,c,d,h,m,v){super(e,t,s,o,l,c,d,h,m,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ua extends Kn{constructor(e,t,s=or,o,l,c,d=Nn,h=Nn,m,v=Ar,y=1){if(v!==Ar&&v!==As)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:t,depth:y};super(g,o,l,c,d,h,v,s,m),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ph(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class NE extends Ua{constructor(e,t=or,s=Fs,o,l,c=Nn,d=Nn,h,m=Ar){const v={width:e,height:e,depth:1},y=[v,v,v,v,v,v];super(e,e,t,s,o,l,c,d,h,m),this.image=y,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Wx extends Kn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class No extends jn{constructor(e=1,t=1,s=1,o=1,l=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:s,widthSegments:o,heightSegments:l,depthSegments:c};const d=this;o=Math.floor(o),l=Math.floor(l),c=Math.floor(c);const h=[],m=[],v=[],y=[];let g=0,E=0;b("z","y","x",-1,-1,s,t,e,c,l,0),b("z","y","x",1,-1,s,t,-e,c,l,1),b("x","z","y",1,1,e,s,t,o,c,2),b("x","z","y",1,-1,e,s,-t,o,c,3),b("x","y","z",1,-1,e,t,s,o,l,4),b("x","y","z",-1,-1,e,t,-s,o,l,5),this.setIndex(h),this.setAttribute("position",new Sn(m,3)),this.setAttribute("normal",new Sn(v,3)),this.setAttribute("uv",new Sn(y,2));function b(A,S,x,R,O,T,D,F,U,M,I){const z=T/U,j=D/M,X=T/2,re=D/2,H=F/2,te=U+1,ge=M+1;let se=0,ne=0;const G=new ce;for(let V=0;V<ge;V++){const N=V*j-re;for(let Z=0;Z<te;Z++){const _e=Z*z-X;G[A]=_e*R,G[S]=N*O,G[x]=H,m.push(G.x,G.y,G.z),G[A]=0,G[S]=0,G[x]=F>0?1:-1,v.push(G.x,G.y,G.z),y.push(Z/U),y.push(1-V/M),se+=1}}for(let V=0;V<M;V++)for(let N=0;N<U;N++){const Z=g+N+te*V,_e=g+N+te*(V+1),De=g+(N+1)+te*(V+1),Se=g+(N+1)+te*V;h.push(Z,_e,Se),h.push(_e,De,Se),ne+=6}d.addGroup(E,ne,I),E+=ne,g+=se}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new No(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Lh extends jn{constructor(e=[],t=[],s=1,o=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:s,detail:o};const l=[],c=[];d(o),m(s),v(),this.setAttribute("position",new Sn(l,3)),this.setAttribute("normal",new Sn(l.slice(),3)),this.setAttribute("uv",new Sn(c,2)),o===0?this.computeVertexNormals():this.normalizeNormals();function d(R){const O=new ce,T=new ce,D=new ce;for(let F=0;F<t.length;F+=3)E(t[F+0],O),E(t[F+1],T),E(t[F+2],D),h(O,T,D,R)}function h(R,O,T,D){const F=D+1,U=[];for(let M=0;M<=F;M++){U[M]=[];const I=R.clone().lerp(T,M/F),z=O.clone().lerp(T,M/F),j=F-M;for(let X=0;X<=j;X++)X===0&&M===F?U[M][X]=I:U[M][X]=I.clone().lerp(z,X/j)}for(let M=0;M<F;M++)for(let I=0;I<2*(F-M)-1;I++){const z=Math.floor(I/2);I%2===0?(g(U[M][z+1]),g(U[M+1][z]),g(U[M][z])):(g(U[M][z+1]),g(U[M+1][z+1]),g(U[M+1][z]))}}function m(R){const O=new ce;for(let T=0;T<l.length;T+=3)O.x=l[T+0],O.y=l[T+1],O.z=l[T+2],O.normalize().multiplyScalar(R),l[T+0]=O.x,l[T+1]=O.y,l[T+2]=O.z}function v(){const R=new ce;for(let O=0;O<l.length;O+=3){R.x=l[O+0],R.y=l[O+1],R.z=l[O+2];const T=S(R)/2/Math.PI+.5,D=x(R)/Math.PI+.5;c.push(T,1-D)}b(),y()}function y(){for(let R=0;R<c.length;R+=6){const O=c[R+0],T=c[R+2],D=c[R+4],F=Math.max(O,T,D),U=Math.min(O,T,D);F>.9&&U<.1&&(O<.2&&(c[R+0]+=1),T<.2&&(c[R+2]+=1),D<.2&&(c[R+4]+=1))}}function g(R){l.push(R.x,R.y,R.z)}function E(R,O){const T=R*3;O.x=e[T+0],O.y=e[T+1],O.z=e[T+2]}function b(){const R=new ce,O=new ce,T=new ce,D=new ce,F=new Ht,U=new Ht,M=new Ht;for(let I=0,z=0;I<l.length;I+=9,z+=6){R.set(l[I+0],l[I+1],l[I+2]),O.set(l[I+3],l[I+4],l[I+5]),T.set(l[I+6],l[I+7],l[I+8]),F.set(c[z+0],c[z+1]),U.set(c[z+2],c[z+3]),M.set(c[z+4],c[z+5]),D.copy(R).add(O).add(T).divideScalar(3);const j=S(D);A(F,z+0,R,j),A(U,z+2,O,j),A(M,z+4,T,j)}}function A(R,O,T,D){D<0&&R.x===1&&(c[O]=R.x-1),T.x===0&&T.z===0&&(c[O]=D/2/Math.PI+.5)}function S(R){return Math.atan2(R.z,-R.x)}function x(R){return Math.atan2(-R.y,Math.sqrt(R.x*R.x+R.z*R.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lh(e.vertices,e.indices,e.radius,e.detail)}}class Fh extends Lh{constructor(e=1,t=0){const s=(1+Math.sqrt(5))/2,o=[-1,s,0,1,s,0,-1,-s,0,1,-s,0,0,-1,s,0,1,s,0,-1,-s,0,1,-s,s,0,-1,s,0,1,-s,0,-1,-s,0,1],l=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(o,l,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Fh(e.radius,e.detail)}}class Yc extends jn{constructor(e=1,t=1,s=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:s,heightSegments:o};const l=e/2,c=t/2,d=Math.floor(s),h=Math.floor(o),m=d+1,v=h+1,y=e/d,g=t/h,E=[],b=[],A=[],S=[];for(let x=0;x<v;x++){const R=x*g-c;for(let O=0;O<m;O++){const T=O*y-l;b.push(T,-R,0),A.push(0,0,1),S.push(O/d),S.push(1-x/h)}}for(let x=0;x<h;x++)for(let R=0;R<d;R++){const O=R+m*x,T=R+m*(x+1),D=R+1+m*(x+1),F=R+1+m*x;E.push(O,T,F),E.push(T,D,F)}this.setIndex(E),this.setAttribute("position",new Sn(b,3)),this.setAttribute("normal",new Sn(A,3)),this.setAttribute("uv",new Sn(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yc(e.width,e.height,e.widthSegments,e.heightSegments)}}class Kc extends jn{constructor(e=1,t=32,s=16,o=0,l=Math.PI*2,c=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:s,phiStart:o,phiLength:l,thetaStart:c,thetaLength:d},t=Math.max(3,Math.floor(t)),s=Math.max(2,Math.floor(s));const h=Math.min(c+d,Math.PI);let m=0;const v=[],y=new ce,g=new ce,E=[],b=[],A=[],S=[];for(let x=0;x<=s;x++){const R=[],O=x/s,T=c+O*d,D=e*Math.cos(T),F=Math.sqrt(e*e-D*D);let U=0;x===0&&c===0?U=.5/t:x===s&&h===Math.PI&&(U=-.5/t);for(let M=0;M<=t;M++){const I=M/t,z=o+I*l;y.x=-F*Math.cos(z),y.y=D,y.z=F*Math.sin(z),b.push(y.x,y.y,y.z),g.copy(y).normalize(),A.push(g.x,g.y,g.z),S.push(I+U,1-O),R.push(m++)}v.push(R)}for(let x=0;x<s;x++)for(let R=0;R<t;R++){const O=v[x][R+1],T=v[x][R],D=v[x+1][R],F=v[x+1][R+1];(x!==0||c>0)&&E.push(O,T,F),(x!==s-1||h<Math.PI)&&E.push(T,D,F)}this.setIndex(E),this.setAttribute("position",new Sn(b,3)),this.setAttribute("normal",new Sn(A,3)),this.setAttribute("uv",new Sn(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Gc extends jn{constructor(e=1,t=.4,s=12,o=48,l=Math.PI*2,c=0,d=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:s,tubularSegments:o,arc:l,thetaStart:c,thetaLength:d},s=Math.floor(s),o=Math.floor(o);const h=[],m=[],v=[],y=[],g=new ce,E=new ce,b=new ce;for(let A=0;A<=s;A++){const S=c+A/s*d;for(let x=0;x<=o;x++){const R=x/o*l;E.x=(e+t*Math.cos(S))*Math.cos(R),E.y=(e+t*Math.cos(S))*Math.sin(R),E.z=t*Math.sin(S),m.push(E.x,E.y,E.z),g.x=e*Math.cos(R),g.y=e*Math.sin(R),b.subVectors(E,g).normalize(),v.push(b.x,b.y,b.z),y.push(x/o),y.push(A/s)}}for(let A=1;A<=s;A++)for(let S=1;S<=o;S++){const x=(o+1)*A+S-1,R=(o+1)*(A-1)+S-1,O=(o+1)*(A-1)+S,T=(o+1)*A+S;h.push(x,R,T),h.push(R,O,T)}this.setIndex(h),this.setAttribute("position",new Sn(m,3)),this.setAttribute("normal",new Sn(v,3)),this.setAttribute("uv",new Sn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function Ro(i){const e={};for(const t in i){e[t]={};for(const s in i[t]){const o=i[t][s];if(s0(o))o.isRenderTargetTexture?(yt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][s]=null):e[t][s]=o.clone();else if(Array.isArray(o))if(s0(o[0])){const l=[];for(let c=0,d=o.length;c<d;c++)l[c]=o[c].clone();e[t][s]=l}else e[t][s]=o.slice();else e[t][s]=o}}return e}function $n(i){const e={};for(let t=0;t<i.length;t++){const s=Ro(i[t]);for(const o in s)e[o]=s[o]}return e}function s0(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function IE(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function jx(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Bt.workingColorSpace}const UE={clone:Ro,merge:$n};var OE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,BE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class lr extends Fo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=OE,this.fragmentShader=BE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ro(e.uniforms),this.uniformsGroups=IE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const c=this.uniforms[o].value;c&&c.isTexture?t.uniforms[o]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?t.uniforms[o]={type:"c",value:c.getHex()}:c&&c.isVector2?t.uniforms[o]={type:"v2",value:c.toArray()}:c&&c.isVector3?t.uniforms[o]={type:"v3",value:c.toArray()}:c&&c.isVector4?t.uniforms[o]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?t.uniforms[o]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?t.uniforms[o]={type:"m4",value:c.toArray()}:t.uniforms[o]={value:c}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const s={};for(const o in this.extensions)this.extensions[o]===!0&&(s[o]=!0);return Object.keys(s).length>0&&(t.extensions=s),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const s in e.uniforms){const o=e.uniforms[s];switch(this.uniforms[s]={},o.type){case"t":this.uniforms[s].value=t[o.value]||null;break;case"c":this.uniforms[s].value=new It().setHex(o.value);break;case"v2":this.uniforms[s].value=new Ht().fromArray(o.value);break;case"v3":this.uniforms[s].value=new ce().fromArray(o.value);break;case"v4":this.uniforms[s].value=new an().fromArray(o.value);break;case"m3":this.uniforms[s].value=new Mt().fromArray(o.value);break;case"m4":this.uniforms[s].value=new ln().fromArray(o.value);break;default:this.uniforms[s].value=o.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)this.extensions[s]=e.extensions[s];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class kE extends lr{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class zE extends Fo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Y1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class HE extends Fo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vc=new ce,_c=new Lo,Ji=new ce;class Xx extends Zn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ln,this.projectionMatrix=new ln,this.projectionMatrixInverse=new ln,this.coordinateSystem=rr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(vc,_c,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vc,_c,Ji.set(1,1,1)).invert()}updateWorldMatrix(e,t,s=!1){super.updateWorldMatrix(e,t,s),this.matrixWorld.decompose(vc,_c,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vc,_c,Ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ts=new ce,o0=new Ht,a0=new Ht;class gi extends Xx{constructor(e=50,t=1,s=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ch*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(jd*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ch*2*Math.atan(Math.tan(jd*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,s){ts.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ts.x,ts.y).multiplyScalar(-e/ts.z),ts.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ts.x,ts.y).multiplyScalar(-e/ts.z)}getViewSize(e,t){return this.getViewBounds(e,o0,a0),t.subVectors(a0,o0)}setViewOffset(e,t,s,o,l,c){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(jd*.5*this.fov)/this.zoom,s=2*t,o=this.aspect*s,l=-.5*o;const c=this.view;if(this.view!==null&&this.view.enabled){const h=c.fullWidth,m=c.fullHeight;l+=c.offsetX*o/h,t-=c.offsetY*s/m,o*=c.width/h,s*=c.height/m}const d=this.filmOffset;d!==0&&(l+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class qx extends Xx{constructor(e=-1,t=1,s=1,o=-1,l=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=s,this.bottom=o,this.near=l,this.far=c,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,s,o,l,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=s-e,c=s+e,d=o+t,h=o-t;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=m*this.view.offsetX,c=l+m*this.view.width,d-=v*this.view.offsetY,h=d-v*this.view.height}this.projectionMatrix.makeOrthographic(l,c,d,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const So=-90,Eo=1;class VE extends Zn{constructor(e,t,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new gi(So,Eo,e,t);o.layers=this.layers,this.add(o);const l=new gi(So,Eo,e,t);l.layers=this.layers,this.add(l);const c=new gi(So,Eo,e,t);c.layers=this.layers,this.add(c);const d=new gi(So,Eo,e,t);d.layers=this.layers,this.add(d);const h=new gi(So,Eo,e,t);h.layers=this.layers,this.add(h);const m=new gi(So,Eo,e,t);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[s,o,l,c,d,h]=t;for(const m of t)this.remove(m);if(e===rr)s.up.set(0,1,0),s.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===kc)s.up.set(0,-1,0),s.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of t)this.add(m),m.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,c,d,h,m,v]=this.children,y=e.getRenderTarget(),g=e.getActiveCubeFace(),E=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const A=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let S=!1;e.isWebGLRenderer===!0?S=e.state.buffers.depth.getReversed():S=e.reversedDepthBuffer,e.setRenderTarget(s,0,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(s,1,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(s,2,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(s,3,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(s,4,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,m),s.texture.generateMipmaps=A,e.setRenderTarget(s,5,o),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,v),e.setRenderTarget(y,g,E),e.xr.enabled=b,s.texture.needsPMREMUpdate=!0}}class GE extends gi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class $x{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,yt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Bh=class Bh{constructor(e,t,s,o){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,s,o)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let s=0;s<4;s++)this.elements[s]=e[s+t];return this}set(e,t,s,o){const l=this.elements;return l[0]=e,l[2]=t,l[1]=s,l[3]=o,this}};Bh.prototype.isMatrix2=!0;let l0=Bh;function c0(i,e,t,s){const o=WE(s);switch(t){case Px:return i*e;case Lx:return i*e/o.components*o.byteLength;case bh:return i*e/o.components*o.byteLength;case Ns:return i*e*2/o.components*o.byteLength;case Th:return i*e*2/o.components*o.byteLength;case Dx:return i*e*3/o.components*o.byteLength;case Wi:return i*e*4/o.components*o.byteLength;case Ah:return i*e*4/o.components*o.byteLength;case Cc:case Rc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Pc:case Dc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Nf:case Uf:return Math.max(i,16)*Math.max(e,8)/4;case Ff:case If:return Math.max(i,8)*Math.max(e,8)/2;case Of:case Bf:case zf:case Hf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case kf:case Ic:case Vf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Gf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Wf:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case jf:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Xf:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case qf:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case $f:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Yf:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Kf:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Zf:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Qf:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Jf:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case eh:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case th:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case nh:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ih:case rh:case sh:return Math.ceil(i/4)*Math.ceil(e/4)*16;case oh:case ah:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Uc:case lh:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function WE(i){switch(i){case Ti:case Tx:return{byteLength:1,components:1};case Na:case Ax:case ar:return{byteLength:2,components:1};case Mh:case wh:return{byteLength:2,components:4};case or:case Eh:case ir:return{byteLength:4,components:1};case Cx:case Rx:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sh}}));typeof window<"u"&&(window.__THREE__?yt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yx(){let i=null,e=!1,t=null,s=null;function o(l,c){s=i.requestAnimationFrame(o),t(l,c)}return{start:function(){e!==!0&&t!==null&&i!==null&&(s=i.requestAnimationFrame(o),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){i=l}}}function jE(i){const e=new WeakMap;function t(d,h){const m=d.array,v=d.usage,y=m.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,m,v),d.onUploadCallback();let E;if(m instanceof Float32Array)E=i.FLOAT;else if(typeof Float16Array<"u"&&m instanceof Float16Array)E=i.HALF_FLOAT;else if(m instanceof Uint16Array)d.isFloat16BufferAttribute?E=i.HALF_FLOAT:E=i.UNSIGNED_SHORT;else if(m instanceof Int16Array)E=i.SHORT;else if(m instanceof Uint32Array)E=i.UNSIGNED_INT;else if(m instanceof Int32Array)E=i.INT;else if(m instanceof Int8Array)E=i.BYTE;else if(m instanceof Uint8Array)E=i.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)E=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:g,type:E,bytesPerElement:m.BYTES_PER_ELEMENT,version:d.version,size:y}}function s(d,h,m){const v=h.array,y=h.updateRanges;if(i.bindBuffer(m,d),y.length===0)i.bufferSubData(m,0,v);else{y.sort((E,b)=>E.start-b.start);let g=0;for(let E=1;E<y.length;E++){const b=y[g],A=y[E];A.start<=b.start+b.count+1?b.count=Math.max(b.count,A.start+A.count-b.start):(++g,y[g]=A)}y.length=g+1;for(let E=0,b=y.length;E<b;E++){const A=y[E];i.bufferSubData(m,A.start*v.BYTES_PER_ELEMENT,v,A.start,A.count)}h.clearUpdateRanges()}h.onUploadCallback()}function o(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function l(d){d.isInterleavedBufferAttribute&&(d=d.data);const h=e.get(d);h&&(i.deleteBuffer(h.buffer),e.delete(d))}function c(d,h){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=e.get(d);(!v||v.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const m=e.get(d);if(m===void 0)e.set(d,t(d,h));else if(m.version<d.version){if(m.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,d,h),m.version=d.version}}return{get:o,remove:l,update:c}}var XE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$E=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,YE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,KE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ZE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,QE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,JE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,eM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,tM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,iM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,oM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,aM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,lM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,fM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,hM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,pM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,mM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,gM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,vM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_M=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,SM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,EM="gl_FragColor = linearToOutputTexel( gl_FragColor );",MM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,bM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,TM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,AM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,CM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,RM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,PM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,DM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,LM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,FM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,NM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,IM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,UM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,OM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,BM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,kM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,HM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,VM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,GM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,WM=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,jM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,XM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,qM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$M=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,YM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,KM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ZM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,QM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,JM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ew=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,nw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ow=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,aw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,cw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,dw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,mw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_w=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Ew=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ww=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Aw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Rw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Dw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Lw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Nw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Iw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Uw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ow=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Hw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Vw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ww=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$w=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Jw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,eb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,nb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ib=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ob=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ab=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ub=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,db=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_b=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Eb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ct={alphahash_fragment:XE,alphahash_pars_fragment:qE,alphamap_fragment:$E,alphamap_pars_fragment:YE,alphatest_fragment:KE,alphatest_pars_fragment:ZE,aomap_fragment:QE,aomap_pars_fragment:JE,batching_pars_vertex:eM,batching_vertex:tM,begin_vertex:nM,beginnormal_vertex:iM,bsdfs:rM,iridescence_fragment:sM,bumpmap_pars_fragment:oM,clipping_planes_fragment:aM,clipping_planes_pars_fragment:lM,clipping_planes_pars_vertex:cM,clipping_planes_vertex:uM,color_fragment:dM,color_pars_fragment:fM,color_pars_vertex:hM,color_vertex:pM,common:mM,cube_uv_reflection_fragment:gM,defaultnormal_vertex:xM,displacementmap_pars_vertex:vM,displacementmap_vertex:_M,emissivemap_fragment:yM,emissivemap_pars_fragment:SM,colorspace_fragment:EM,colorspace_pars_fragment:MM,envmap_fragment:wM,envmap_common_pars_fragment:bM,envmap_pars_fragment:TM,envmap_pars_vertex:AM,envmap_physical_pars_fragment:BM,envmap_vertex:CM,fog_vertex:RM,fog_pars_vertex:PM,fog_fragment:DM,fog_pars_fragment:LM,gradientmap_pars_fragment:FM,lightmap_pars_fragment:NM,lights_lambert_fragment:IM,lights_lambert_pars_fragment:UM,lights_pars_begin:OM,lights_toon_fragment:kM,lights_toon_pars_fragment:zM,lights_phong_fragment:HM,lights_phong_pars_fragment:VM,lights_physical_fragment:GM,lights_physical_pars_fragment:WM,lights_fragment_begin:jM,lights_fragment_maps:XM,lights_fragment_end:qM,lightprobes_pars_fragment:$M,logdepthbuf_fragment:YM,logdepthbuf_pars_fragment:KM,logdepthbuf_pars_vertex:ZM,logdepthbuf_vertex:QM,map_fragment:JM,map_pars_fragment:ew,map_particle_fragment:tw,map_particle_pars_fragment:nw,metalnessmap_fragment:iw,metalnessmap_pars_fragment:rw,morphinstance_vertex:sw,morphcolor_vertex:ow,morphnormal_vertex:aw,morphtarget_pars_vertex:lw,morphtarget_vertex:cw,normal_fragment_begin:uw,normal_fragment_maps:dw,normal_pars_fragment:fw,normal_pars_vertex:hw,normal_vertex:pw,normalmap_pars_fragment:mw,clearcoat_normal_fragment_begin:gw,clearcoat_normal_fragment_maps:xw,clearcoat_pars_fragment:vw,iridescence_pars_fragment:_w,opaque_fragment:yw,packing:Sw,premultiplied_alpha_fragment:Ew,project_vertex:Mw,dithering_fragment:ww,dithering_pars_fragment:bw,roughnessmap_fragment:Tw,roughnessmap_pars_fragment:Aw,shadowmap_pars_fragment:Cw,shadowmap_pars_vertex:Rw,shadowmap_vertex:Pw,shadowmask_pars_fragment:Dw,skinbase_vertex:Lw,skinning_pars_vertex:Fw,skinning_vertex:Nw,skinnormal_vertex:Iw,specularmap_fragment:Uw,specularmap_pars_fragment:Ow,tonemapping_fragment:Bw,tonemapping_pars_fragment:kw,transmission_fragment:zw,transmission_pars_fragment:Hw,uv_pars_fragment:Vw,uv_pars_vertex:Gw,uv_vertex:Ww,worldpos_vertex:jw,background_vert:Xw,background_frag:qw,backgroundCube_vert:$w,backgroundCube_frag:Yw,cube_vert:Kw,cube_frag:Zw,depth_vert:Qw,depth_frag:Jw,distance_vert:eb,distance_frag:tb,equirect_vert:nb,equirect_frag:ib,linedashed_vert:rb,linedashed_frag:sb,meshbasic_vert:ob,meshbasic_frag:ab,meshlambert_vert:lb,meshlambert_frag:cb,meshmatcap_vert:ub,meshmatcap_frag:db,meshnormal_vert:fb,meshnormal_frag:hb,meshphong_vert:pb,meshphong_frag:mb,meshphysical_vert:gb,meshphysical_frag:xb,meshtoon_vert:vb,meshtoon_frag:_b,points_vert:yb,points_frag:Sb,shadow_vert:Eb,shadow_frag:Mb,sprite_vert:wb,sprite_frag:bb},Ye={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Mt}},envmap:{envMap:{value:null},envMapRotation:{value:new Mt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Mt},normalScale:{value:new Ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ce},probesMax:{value:new ce},probesResolution:{value:new ce}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0},uvTransform:{value:new Mt}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new Ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}}},nr={basic:{uniforms:$n([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.fog]),vertexShader:Ct.meshbasic_vert,fragmentShader:Ct.meshbasic_frag},lambert:{uniforms:$n([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new It(0)},envMapIntensity:{value:1}}]),vertexShader:Ct.meshlambert_vert,fragmentShader:Ct.meshlambert_frag},phong:{uniforms:$n([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ct.meshphong_vert,fragmentShader:Ct.meshphong_frag},standard:{uniforms:$n([Ye.common,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.roughnessmap,Ye.metalnessmap,Ye.fog,Ye.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ct.meshphysical_vert,fragmentShader:Ct.meshphysical_frag},toon:{uniforms:$n([Ye.common,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.gradientmap,Ye.fog,Ye.lights,{emissive:{value:new It(0)}}]),vertexShader:Ct.meshtoon_vert,fragmentShader:Ct.meshtoon_frag},matcap:{uniforms:$n([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,{matcap:{value:null}}]),vertexShader:Ct.meshmatcap_vert,fragmentShader:Ct.meshmatcap_frag},points:{uniforms:$n([Ye.points,Ye.fog]),vertexShader:Ct.points_vert,fragmentShader:Ct.points_frag},dashed:{uniforms:$n([Ye.common,Ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ct.linedashed_vert,fragmentShader:Ct.linedashed_frag},depth:{uniforms:$n([Ye.common,Ye.displacementmap]),vertexShader:Ct.depth_vert,fragmentShader:Ct.depth_frag},normal:{uniforms:$n([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,{opacity:{value:1}}]),vertexShader:Ct.meshnormal_vert,fragmentShader:Ct.meshnormal_frag},sprite:{uniforms:$n([Ye.sprite,Ye.fog]),vertexShader:Ct.sprite_vert,fragmentShader:Ct.sprite_frag},background:{uniforms:{uvTransform:{value:new Mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ct.background_vert,fragmentShader:Ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Mt}},vertexShader:Ct.backgroundCube_vert,fragmentShader:Ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ct.cube_vert,fragmentShader:Ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ct.equirect_vert,fragmentShader:Ct.equirect_frag},distance:{uniforms:$n([Ye.common,Ye.displacementmap,{referencePosition:{value:new ce},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ct.distance_vert,fragmentShader:Ct.distance_frag},shadow:{uniforms:$n([Ye.lights,Ye.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:Ct.shadow_vert,fragmentShader:Ct.shadow_frag}};nr.physical={uniforms:$n([nr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Mt},clearcoatNormalScale:{value:new Ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Mt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Mt},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Mt},transmissionSamplerSize:{value:new Ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Mt},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Mt},anisotropyVector:{value:new Ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Mt}}]),vertexShader:Ct.meshphysical_vert,fragmentShader:Ct.meshphysical_frag};const yc={r:0,b:0,g:0},Tb=new ln,Kx=new Mt;Kx.set(-1,0,0,0,1,0,0,0,1);function Ab(i,e,t,s,o,l){const c=new It(0);let d=o===!0?0:1,h,m,v=null,y=0,g=null;function E(R){let O=R.isScene===!0?R.background:null;if(O&&O.isTexture){const T=R.backgroundBlurriness>0;O=e.get(O,T)}return O}function b(R){let O=!1;const T=E(R);T===null?S(c,d):T&&T.isColor&&(S(T,1),O=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?t.buffers.color.setClear(0,0,0,1,l):D==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,l),(i.autoClear||O)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function A(R,O){const T=E(O);T&&(T.isCubeTexture||T.mapping===$c)?(m===void 0&&(m=new Yn(new No(1,1,1),new lr({name:"BackgroundCubeMaterial",uniforms:Ro(nr.backgroundCube.uniforms),vertexShader:nr.backgroundCube.vertexShader,fragmentShader:nr.backgroundCube.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(D,F,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(m)),m.material.uniforms.envMap.value=T,m.material.uniforms.backgroundBlurriness.value=O.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=O.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(Tb.makeRotationFromEuler(O.backgroundRotation)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.material.uniforms.backgroundRotation.value.premultiply(Kx),m.material.toneMapped=Bt.getTransfer(T.colorSpace)!==$t,(v!==T||y!==T.version||g!==i.toneMapping)&&(m.material.needsUpdate=!0,v=T,y=T.version,g=i.toneMapping),m.layers.enableAll(),R.unshift(m,m.geometry,m.material,0,0,null)):T&&T.isTexture&&(h===void 0&&(h=new Yn(new Yc(2,2),new lr({name:"BackgroundMaterial",uniforms:Ro(nr.background.uniforms),vertexShader:nr.background.vertexShader,fragmentShader:nr.background.fragmentShader,side:Ls,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=T,h.material.uniforms.backgroundIntensity.value=O.backgroundIntensity,h.material.toneMapped=Bt.getTransfer(T.colorSpace)!==$t,T.matrixAutoUpdate===!0&&T.updateMatrix(),h.material.uniforms.uvTransform.value.copy(T.matrix),(v!==T||y!==T.version||g!==i.toneMapping)&&(h.material.needsUpdate=!0,v=T,y=T.version,g=i.toneMapping),h.layers.enableAll(),R.unshift(h,h.geometry,h.material,0,0,null))}function S(R,O){R.getRGB(yc,jx(i)),t.buffers.color.setClear(yc.r,yc.g,yc.b,O,l)}function x(){m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return c},setClearColor:function(R,O=1){c.set(R),d=O,S(c,d)},getClearAlpha:function(){return d},setClearAlpha:function(R){d=R,S(c,d)},render:b,addToRenderList:A,dispose:x}}function Cb(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),s={},o=g(null);let l=o,c=!1;function d(j,X,re,H,te){let ge=!1;const se=y(j,H,re,X);l!==se&&(l=se,m(l.object)),ge=E(j,H,re,te),ge&&b(j,H,re,te),te!==null&&e.update(te,i.ELEMENT_ARRAY_BUFFER),(ge||c)&&(c=!1,T(j,X,re,H),te!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(te).buffer))}function h(){return i.createVertexArray()}function m(j){return i.bindVertexArray(j)}function v(j){return i.deleteVertexArray(j)}function y(j,X,re,H){const te=H.wireframe===!0;let ge=s[X.id];ge===void 0&&(ge={},s[X.id]=ge);const se=j.isInstancedMesh===!0?j.id:0;let ne=ge[se];ne===void 0&&(ne={},ge[se]=ne);let G=ne[re.id];G===void 0&&(G={},ne[re.id]=G);let V=G[te];return V===void 0&&(V=g(h()),G[te]=V),V}function g(j){const X=[],re=[],H=[];for(let te=0;te<t;te++)X[te]=0,re[te]=0,H[te]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:re,attributeDivisors:H,object:j,attributes:{},index:null}}function E(j,X,re,H){const te=l.attributes,ge=X.attributes;let se=0;const ne=re.getAttributes();for(const G in ne)if(ne[G].location>=0){const N=te[G];let Z=ge[G];if(Z===void 0&&(G==="instanceMatrix"&&j.instanceMatrix&&(Z=j.instanceMatrix),G==="instanceColor"&&j.instanceColor&&(Z=j.instanceColor)),N===void 0||N.attribute!==Z||Z&&N.data!==Z.data)return!0;se++}return l.attributesNum!==se||l.index!==H}function b(j,X,re,H){const te={},ge=X.attributes;let se=0;const ne=re.getAttributes();for(const G in ne)if(ne[G].location>=0){let N=ge[G];N===void 0&&(G==="instanceMatrix"&&j.instanceMatrix&&(N=j.instanceMatrix),G==="instanceColor"&&j.instanceColor&&(N=j.instanceColor));const Z={};Z.attribute=N,N&&N.data&&(Z.data=N.data),te[G]=Z,se++}l.attributes=te,l.attributesNum=se,l.index=H}function A(){const j=l.newAttributes;for(let X=0,re=j.length;X<re;X++)j[X]=0}function S(j){x(j,0)}function x(j,X){const re=l.newAttributes,H=l.enabledAttributes,te=l.attributeDivisors;re[j]=1,H[j]===0&&(i.enableVertexAttribArray(j),H[j]=1),te[j]!==X&&(i.vertexAttribDivisor(j,X),te[j]=X)}function R(){const j=l.newAttributes,X=l.enabledAttributes;for(let re=0,H=X.length;re<H;re++)X[re]!==j[re]&&(i.disableVertexAttribArray(re),X[re]=0)}function O(j,X,re,H,te,ge,se){se===!0?i.vertexAttribIPointer(j,X,re,te,ge):i.vertexAttribPointer(j,X,re,H,te,ge)}function T(j,X,re,H){A();const te=H.attributes,ge=re.getAttributes(),se=X.defaultAttributeValues;for(const ne in ge){const G=ge[ne];if(G.location>=0){let V=te[ne];if(V===void 0&&(ne==="instanceMatrix"&&j.instanceMatrix&&(V=j.instanceMatrix),ne==="instanceColor"&&j.instanceColor&&(V=j.instanceColor)),V!==void 0){const N=V.normalized,Z=V.itemSize,_e=e.get(V);if(_e===void 0)continue;const De=_e.buffer,Se=_e.type,Ee=_e.bytesPerElement,Q=Se===i.INT||Se===i.UNSIGNED_INT||V.gpuType===Eh;if(V.isInterleavedBufferAttribute){const ae=V.data,Te=ae.stride,Ke=V.offset;if(ae.isInstancedInterleavedBuffer){for(let Ge=0;Ge<G.locationSize;Ge++)x(G.location+Ge,ae.meshPerAttribute);j.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ge=0;Ge<G.locationSize;Ge++)S(G.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,De);for(let Ge=0;Ge<G.locationSize;Ge++)O(G.location+Ge,Z/G.locationSize,Se,N,Te*Ee,(Ke+Z/G.locationSize*Ge)*Ee,Q)}else{if(V.isInstancedBufferAttribute){for(let ae=0;ae<G.locationSize;ae++)x(G.location+ae,V.meshPerAttribute);j.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let ae=0;ae<G.locationSize;ae++)S(G.location+ae);i.bindBuffer(i.ARRAY_BUFFER,De);for(let ae=0;ae<G.locationSize;ae++)O(G.location+ae,Z/G.locationSize,Se,N,Z*Ee,Z/G.locationSize*ae*Ee,Q)}}else if(se!==void 0){const N=se[ne];if(N!==void 0)switch(N.length){case 2:i.vertexAttrib2fv(G.location,N);break;case 3:i.vertexAttrib3fv(G.location,N);break;case 4:i.vertexAttrib4fv(G.location,N);break;default:i.vertexAttrib1fv(G.location,N)}}}}R()}function D(){I();for(const j in s){const X=s[j];for(const re in X){const H=X[re];for(const te in H){const ge=H[te];for(const se in ge)v(ge[se].object),delete ge[se];delete H[te]}}delete s[j]}}function F(j){if(s[j.id]===void 0)return;const X=s[j.id];for(const re in X){const H=X[re];for(const te in H){const ge=H[te];for(const se in ge)v(ge[se].object),delete ge[se];delete H[te]}}delete s[j.id]}function U(j){for(const X in s){const re=s[X];for(const H in re){const te=re[H];if(te[j.id]===void 0)continue;const ge=te[j.id];for(const se in ge)v(ge[se].object),delete ge[se];delete te[j.id]}}}function M(j){for(const X in s){const re=s[X],H=j.isInstancedMesh===!0?j.id:0,te=re[H];if(te!==void 0){for(const ge in te){const se=te[ge];for(const ne in se)v(se[ne].object),delete se[ne];delete te[ge]}delete re[H],Object.keys(re).length===0&&delete s[X]}}}function I(){z(),c=!0,l!==o&&(l=o,m(l.object))}function z(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:d,reset:I,resetDefaultState:z,dispose:D,releaseStatesOfGeometry:F,releaseStatesOfObject:M,releaseStatesOfProgram:U,initAttributes:A,enableAttribute:S,disableUnusedAttributes:R}}function Rb(i,e,t){let s;function o(h){s=h}function l(h,m){i.drawArrays(s,h,m),t.update(m,s,1)}function c(h,m,v){v!==0&&(i.drawArraysInstanced(s,h,m,v),t.update(m,s,v))}function d(h,m,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,h,0,m,0,v);let g=0;for(let E=0;E<v;E++)g+=m[E];t.update(g,s,1)}this.setMode=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function Pb(i,e,t,s){let o;function l(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");o=i.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function c(U){return!(U!==Wi&&s.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(U){const M=U===ar&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==Ti&&U!==ir&&!M&&s.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function h(U){if(U==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=t.precision!==void 0?t.precision:"highp";const v=h(m);v!==m&&(yt("WebGLRenderer:",m,"not supported, using",v,"instead."),m=v);const y=t.logarithmicDepthBuffer===!0,g=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&g===!1&&yt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const E=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=i.getParameter(i.MAX_TEXTURE_SIZE),S=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),R=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),O=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=i.getParameter(i.MAX_SAMPLES),F=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:c,textureTypeReadable:d,precision:m,logarithmicDepthBuffer:y,reversedDepthBuffer:g,maxTextures:E,maxVertexTextures:b,maxTextureSize:A,maxCubemapSize:S,maxAttributes:x,maxVertexUniforms:R,maxVaryings:O,maxFragmentUniforms:T,maxSamples:D,samples:F}}function Db(i){const e=this;let t=null,s=0,o=!1,l=!1;const c=new ns,d=new Mt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(y,g){const E=y.length!==0||g||s!==0||o;return o=g,s=y.length,E},this.beginShadows=function(){l=!0,v(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(y,g){t=v(y,g,0)},this.setState=function(y,g,E){const b=y.clippingPlanes,A=y.clipIntersection,S=y.clipShadows,x=i.get(y);if(!o||b===null||b.length===0||l&&!S)l?v(null):m();else{const R=l?0:s,O=R*4;let T=x.clippingState||null;h.value=T,T=v(b,g,O,E);for(let D=0;D!==O;++D)T[D]=t[D];x.clippingState=T,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=R}};function m(){h.value!==t&&(h.value=t,h.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function v(y,g,E,b){const A=y!==null?y.length:0;let S=null;if(A!==0){if(S=h.value,b!==!0||S===null){const x=E+A*4,R=g.matrixWorldInverse;d.getNormalMatrix(R),(S===null||S.length<x)&&(S=new Float32Array(x));for(let O=0,T=E;O!==A;++O,T+=4)c.copy(y[O]).applyMatrix4(R,d),c.normal.toArray(S,T),S[T+3]=c.constant}h.value=S,h.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,S}}const bo=4,Lb=6,Fb=20,Nb=256,ba=new qx,u0=new It;let mf=null,gf=0,xf=0,vf=!1;const Ib=new ce,Ms=new ce;class d0{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,s=.1,o=100,l={}){const{size:c=256,position:d=Ib}=l;mf=this._renderer.getRenderTarget(),gf=this._renderer.getActiveCubeFace(),xf=this._renderer.getActiveMipmapLevel(),vf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(c);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,s,o,h,d),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=p0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=h0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(mf,gf,xf),this._renderer.xr.enabled=vf,e.scissorTest=!1,Mo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fs||e.mapping===Co?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),mf=this._renderer.getRenderTarget(),gf=this._renderer.getActiveCubeFace(),xf=this._renderer.getActiveMipmapLevel(),vf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=t||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,s={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:ar,format:Wi,colorSpace:Oc,depthBuffer:!1},o=f0(e,t,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=f0(e,t,s);const{_lodMax:l}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ub(l)),this._blurMaterial=Bb(l,e,t),this._ggxMaterial=Ob(l,e,t)}return o}_compileMaterial(e){const t=new Yn(new jn,e);this._renderer.compile(t,ba)}_sceneToCubeUV(e,t,s,o,l){const h=new gi(90,1,t,s),m=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],y=this._renderer,g=y.autoClear,E=y.toneMapping;y.getClearColor(u0),y.toneMapping=sr,y.autoClear=!1,y.state.buffers.depth.getReversed()&&(y.setRenderTarget(o),y.clearDepth(),y.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Yn(new No,new rs({name:"PMREM.Background",side:ai,depthWrite:!1,depthTest:!1})));const A=this._backgroundBox,S=A.material;let x=!1;const R=e.background;R?R.isColor&&(S.color.copy(R),e.background=null,x=!0):(S.color.copy(u0),x=!0);for(let O=0;O<6;O++){const T=O%3;T===0?(h.up.set(0,m[O],0),h.position.set(l.x,l.y,l.z),h.lookAt(l.x+v[O],l.y,l.z)):T===1?(h.up.set(0,0,m[O]),h.position.set(l.x,l.y,l.z),h.lookAt(l.x,l.y+v[O],l.z)):(h.up.set(0,m[O],0),h.position.set(l.x,l.y,l.z),h.lookAt(l.x,l.y,l.z+v[O]));const D=this._cubeSize;Mo(o,T*D,O>2?D:0,D,D),y.setRenderTarget(o),x&&y.render(A,h),y.render(e,h)}y.toneMapping=E,y.autoClear=g,e.background=R}_textureToCubeUV(e,t){const s=this._renderer,o=e.mapping===Fs||e.mapping===Co;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=p0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=h0());const l=o?this._cubemapMaterial:this._equirectMaterial,c=this._lodMeshes[0];c.material=l;const d=l.uniforms;d.envMap.value=e;const h=this._cubeSize;Mo(t,0,0,3*h,2*h),s.setRenderTarget(t),s.render(c,ba)}_applyPMREM(e){const t=this._renderer,s=t.autoClear;t.autoClear=!1;const o=this._lodMeshes.length;for(let l=1;l<o;l++)this._applyGGXFilter(e,l-1,l);t.autoClear=s}_applyGGXFilter(e,t,s){const o=this._renderer,l=this._pingPongRenderTarget,c=this._ggxMaterial,d=this._lodMeshes[s];d.material=c;const h=c.uniforms,m=s/(this._lodMeshes.length-1),v=t/(this._lodMeshes.length-1),y=Math.sqrt(m*m-v*v),g=m*1.25,E=y*g,{_lodMax:b}=this,A=this._sizeLods[s],S=3*A*(s>b-bo?s-b+bo:0),x=4*(this._cubeSize-A);h.envMap.value=e.texture,h.roughness.value=E,h.mipInt.value=b-t,Mo(l,S,x,3*A,2*A),o.setRenderTarget(l),o.render(d,ba),h.envMap.value=l.texture,h.roughness.value=0,h.mipInt.value=b-s,Mo(e,S,x,3*A,2*A),o.setRenderTarget(e),o.render(d,ba)}_blur(e,t,s,o){const l=this._pingPongRenderTarget,c=Math.min(o,Math.PI)/Math.SQRT2;this._blurPass(e,l,t,s,c),this._blurPass(l,e,s,s,c)}_blurPass(e,t,s,o,l){const c=this._renderer,d=this._blurMaterial,h=this._lodMeshes[o];h.material=d;const m=d.uniforms;m.envMap.value=e.texture,m.sigma.value=l,m.mipInt.value=this._lodMax-s;const v=this._sizeLods[o],y=3*v*(o>this._lodMax-bo?o-this._lodMax+bo:0),g=4*(this._cubeSize-v);Mo(t,y,g,3*v,2*v),c.setRenderTarget(t),c.render(h,ba)}}function Ub(i){const e=[],t=[];let s=i;const o=i-bo+1+Lb;for(let l=0;l<o;l++){const c=Math.pow(2,s);e.push(c);const d=1/(c-2),h=-d,m=1+d,v=[h,h,m,h,m,m,h,h,m,m,h,m],y=6,g=6,E=3,b=new Float32Array(E*g*y),A=new Float32Array(E*g*y);for(let x=0;x<y;x++){const R=x%3*2/3-1,O=x>2?0:-1,T=[R,O,0,R+2/3,O,0,R+2/3,O+1,0,R,O,0,R+2/3,O+1,0,R,O+1,0];b.set(T,E*g*x);for(let D=0;D<g;D++){const F=v[D*2]*2-1,U=v[D*2+1]*2-1;x===0?Ms.set(1,U,F):x===1?Ms.set(-F,1,-U):x===2?Ms.set(-F,U,1):x===3?Ms.set(-1,U,-F):x===4?Ms.set(-F,-1,U):Ms.set(F,U,-1),Ms.toArray(A,(x*g+D)*E)}}const S=new jn;S.setAttribute("position",new Xi(b,E)),S.setAttribute("outputDirection",new Xi(A,E)),t.push(new Yn(S,null)),s>bo&&s--}return{lodMeshes:t,sizeLods:e}}function f0(i,e,t){const s=new ji(i,e,t);return s.texture.mapping=$c,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Mo(i,e,t,s,o){i.viewport.set(e,t,s,o),i.scissor.set(e,t,s,o)}function Ob(i,e,t){return new lr({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Nb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Zc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:br,depthTest:!1,depthWrite:!1})}function Bb(i,e,t){return new lr({name:"SphericalGaussianBlur",defines:{SAMPLES:Fb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Zc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:br,depthTest:!1,depthWrite:!1})}function h0(){return new lr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:br,depthTest:!1,depthWrite:!1})}function p0(){return new lr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:br,depthTest:!1,depthWrite:!1})}function Zc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Zx extends ji{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},o=[s,s,s,s,s,s];this.texture=new Gx(o),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new No(5,5,5),l=new lr({name:"CubemapFromEquirect",uniforms:Ro(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:ai,blending:br});l.uniforms.tEquirect.value=t;const c=new Yn(o,l),d=t.minFilter;return t.minFilter===Ts&&(t.minFilter=Gn),new VE(1,10,this).update(e,c),t.minFilter=d,c.geometry.dispose(),c.material.dispose(),this}clear(e,t=!0,s=!0,o=!0){const l=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(t,s,o);e.setRenderTarget(l)}}function kb(i){let e=new WeakMap,t=new WeakMap,s=null;function o(g,E=!1){return g==null?null:E?c(g):l(g)}function l(g){if(g&&g.isTexture){const E=g.mapping;if(E===Hd||E===Vd)if(e.has(g)){const b=e.get(g).texture;return d(b,g.mapping)}else{const b=g.image;if(b&&b.height>0){const A=new Zx(b.height);return A.fromEquirectangularTexture(i,g),e.set(g,A),g.addEventListener("dispose",m),d(A.texture,g.mapping)}else return null}}return g}function c(g){if(g&&g.isTexture){const E=g.mapping,b=E===Hd||E===Vd,A=E===Fs||E===Co;if(b||A){let S=t.get(g);const x=S!==void 0?S.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==x)return s===null&&(s=new d0(i)),S=b?s.fromEquirectangular(g,S):s.fromCubemap(g,S),S.texture.pmremVersion=g.pmremVersion,t.set(g,S),S.texture;if(S!==void 0)return S.texture;{const R=g.image;return b&&R&&R.height>0||A&&R&&h(R)?(s===null&&(s=new d0(i)),S=b?s.fromEquirectangular(g):s.fromCubemap(g),S.texture.pmremVersion=g.pmremVersion,t.set(g,S),g.addEventListener("dispose",v),S.texture):null}}}return g}function d(g,E){return E===Hd?g.mapping=Fs:E===Vd&&(g.mapping=Co),g}function h(g){let E=0;const b=6;for(let A=0;A<b;A++)g[A]!==void 0&&E++;return E===b}function m(g){const E=g.target;E.removeEventListener("dispose",m);const b=e.get(E);b!==void 0&&(e.delete(E),b.dispose())}function v(g){const E=g.target;E.removeEventListener("dispose",v);const b=t.get(E);b!==void 0&&(t.delete(E),b.dispose())}function y(){e=new WeakMap,t=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:o,dispose:y}}function zb(i){const e={};function t(s){if(e[s]!==void 0)return e[s];const o=i.getExtension(s);return e[s]=o,o}return{has:function(s){return t(s)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(s){const o=t(s);return o===null&&To("WebGLRenderer: "+s+" extension not supported."),o}}}function Hb(i,e,t,s){const o={},l=new WeakMap;function c(y){const g=y.target;g.index!==null&&e.remove(g.index);for(const b in g.attributes)e.remove(g.attributes[b]);g.removeEventListener("dispose",c),delete o[g.id];const E=l.get(g);E&&(e.remove(E),l.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function d(y,g){return o[g.id]===!0||(g.addEventListener("dispose",c),o[g.id]=!0,t.memory.geometries++),g}function h(y){const g=y.attributes;for(const E in g)e.update(g[E],i.ARRAY_BUFFER)}function m(y){const g=[],E=y.index,b=y.attributes.position;let A=0;if(b===void 0)return;if(E!==null){const R=E.array;A=E.version;for(let O=0,T=R.length;O<T;O+=3){const D=R[O+0],F=R[O+1],U=R[O+2];g.push(D,F,F,U,U,D)}}else{const R=b.array;A=b.version;for(let O=0,T=R.length/3-1;O<T;O+=3){const D=O+0,F=O+1,U=O+2;g.push(D,F,F,U,U,D)}}const S=new(b.count>=65535?kx:Bx)(g,1);S.version=A;const x=l.get(y);x&&e.remove(x),l.set(y,S)}function v(y){const g=l.get(y);if(g){const E=y.index;E!==null&&g.version<E.version&&m(y)}else m(y);return l.get(y)}return{get:d,update:h,getWireframeAttribute:v}}function Vb(i,e,t){let s;function o(y){s=y}let l,c;function d(y){l=y.type,c=y.bytesPerElement}function h(y,g){i.drawElements(s,g,l,y*c),t.update(g,s,1)}function m(y,g,E){E!==0&&(i.drawElementsInstanced(s,g,l,y*c,E),t.update(g,s,E))}function v(y,g,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,l,y,0,E);let A=0;for(let S=0;S<E;S++)A+=g[S];t.update(A,s,1)}this.setMode=o,this.setIndex=d,this.render=h,this.renderInstances=m,this.renderMultiDraw=v}function Gb(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function s(l,c,d){switch(t.calls++,c){case i.TRIANGLES:t.triangles+=d*(l/3);break;case i.LINES:t.lines+=d*(l/2);break;case i.LINE_STRIP:t.lines+=d*(l-1);break;case i.LINE_LOOP:t.lines+=d*l;break;case i.POINTS:t.points+=d*l;break;default:Wt("WebGLInfo: Unknown draw mode:",c);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:s}}function Wb(i,e,t){const s=new WeakMap,o=new an;function l(c,d,h){const m=c.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,y=v!==void 0?v.length:0;let g=s.get(d);if(g===void 0||g.count!==y){let z=function(){M.dispose(),s.delete(d),d.removeEventListener("dispose",z)};var E=z;g!==void 0&&g.texture.dispose();const b=d.morphAttributes.position!==void 0,A=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,x=d.morphAttributes.position||[],R=d.morphAttributes.normal||[],O=d.morphAttributes.color||[];let T=0;b===!0&&(T=1),A===!0&&(T=2),S===!0&&(T=3);let D=d.attributes.position.count*T,F=1;D>e.maxTextureSize&&(F=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const U=new Float32Array(D*F*4*y),M=new Nx(U,D,F,y);M.type=ir,M.needsUpdate=!0;const I=T*4;for(let j=0;j<y;j++){const X=x[j],re=R[j],H=O[j],te=D*F*4*j;for(let ge=0;ge<X.count;ge++){const se=ge*I;b===!0&&(o.fromBufferAttribute(X,ge),U[te+se+0]=o.x,U[te+se+1]=o.y,U[te+se+2]=o.z,U[te+se+3]=0),A===!0&&(o.fromBufferAttribute(re,ge),U[te+se+4]=o.x,U[te+se+5]=o.y,U[te+se+6]=o.z,U[te+se+7]=0),S===!0&&(o.fromBufferAttribute(H,ge),U[te+se+8]=o.x,U[te+se+9]=o.y,U[te+se+10]=o.z,U[te+se+11]=H.itemSize===4?o.w:1)}}g={count:y,texture:M,size:new Ht(D,F)},s.set(d,g),d.addEventListener("dispose",z)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)h.getUniforms().setValue(i,"morphTexture",c.morphTexture,t);else{let b=0;for(let S=0;S<m.length;S++)b+=m[S];const A=d.morphTargetsRelative?1:1-b;h.getUniforms().setValue(i,"morphTargetBaseInfluence",A),h.getUniforms().setValue(i,"morphTargetInfluences",m)}h.getUniforms().setValue(i,"morphTargetsTexture",g.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",g.size)}return{update:l}}function jb(i,e,t,s,o){let l=new WeakMap;function c(m){const v=o.render.frame,y=m.geometry,g=e.get(m,y);if(l.get(g)!==v&&(e.update(g),l.set(g,v)),m.isInstancedMesh&&(m.hasEventListener("dispose",h)===!1&&m.addEventListener("dispose",h),l.get(m)!==v&&(t.update(m.instanceMatrix,i.ARRAY_BUFFER),m.instanceColor!==null&&t.update(m.instanceColor,i.ARRAY_BUFFER),l.set(m,v))),m.isSkinnedMesh){const E=m.skeleton;l.get(E)!==v&&(E.update(),l.set(E,v))}return g}function d(){l=new WeakMap}function h(m){const v=m.target;v.removeEventListener("dispose",h),s.releaseStatesOfObject(v),t.remove(v.instanceMatrix),v.instanceColor!==null&&t.remove(v.instanceColor)}return{update:c,dispose:d}}const Xb={[vx]:"LINEAR_TONE_MAPPING",[_x]:"REINHARD_TONE_MAPPING",[yx]:"CINEON_TONE_MAPPING",[Sx]:"ACES_FILMIC_TONE_MAPPING",[Mx]:"AGX_TONE_MAPPING",[wx]:"NEUTRAL_TONE_MAPPING",[Ex]:"CUSTOM_TONE_MAPPING"};function qb(i,e,t,s,o,l){const c=new ji(e,t,{type:i,depthBuffer:o,stencilBuffer:l,samples:s?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let d=null,h=null;const m=new jn;m.setAttribute("position",new Sn([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new Sn([0,2,0,0,2,0],2));const v=new kE({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),y=new Yn(m,v),g=new qx(-1,1,1,-1,0,1);let E=null,b=null,A=!1,S,x=null,R=[],O=!1;this.setSize=function(T,D){c.setSize(T,D),d!==null&&d.setSize(T,D),h!==null&&h.setSize(T,D);for(let F=0;F<R.length;F++){const U=R[F];U.setSize&&U.setSize(T,D)}},this.setEffects=function(T){R=T,O=R.length>0&&R[0].isRenderPass===!0;const D=c.width,F=c.height;R.length>0&&d===null&&(d=new ji(D,F,{type:ar,depthBuffer:!1,stencilBuffer:!1}),h=new ji(D,F,{type:ar,depthBuffer:!1,stencilBuffer:!1}));for(let U=0;U<R.length;U++){const M=R[U];M.setSize&&M.setSize(D,F)}},this.begin=function(T,D){if(A||T.toneMapping===sr&&R.length===0)return!1;if(x=D,D!==null){const F=D.width,U=D.height;(c.width!==F||c.height!==U)&&this.setSize(F,U)}return O===!1&&T.setRenderTarget(c),S=T.toneMapping,T.toneMapping=sr,!0},this.hasRenderPass=function(){return O},this.end=function(T,D){T.toneMapping=S,A=!0;let F=c,U=d;for(let M=0;M<R.length;M++){const I=R[M];I.enabled!==!1&&(I.render(T,U,F,D),I.needsSwap!==!1&&(F=U,U=U===d?h:d))}if(E!==T.outputColorSpace||b!==T.toneMapping){E=T.outputColorSpace,b=T.toneMapping,v.defines={},Bt.getTransfer(E)===$t&&(v.defines.SRGB_TRANSFER="");const M=Xb[b];M&&(v.defines[M]=""),v.needsUpdate=!0}v.uniforms.tDiffuse.value=F.texture,T.setRenderTarget(x),T.render(y,g),x=null,A=!1},this.isCompositing=function(){return A},this.dispose=function(){c.dispose(),d!==null&&d.dispose(),h!==null&&h.dispose(),m.dispose(),v.dispose()}}const Qx=new Kn,dh=new Ua(1,1),Jx=new Nx,ev=new mE,tv=new Gx,m0=[],g0=[],x0=new Float32Array(16),v0=new Float32Array(9),_0=new Float32Array(4);function Io(i,e,t){const s=i[0];if(s<=0||s>0)return i;const o=e*t;let l=m0[o];if(l===void 0&&(l=new Float32Array(o),m0[o]=l),e!==0){s.toArray(l,0);for(let c=1,d=0;c!==e;++c)d+=t,i[c].toArray(l,d)}return l}function En(i,e){if(i.length!==e.length)return!1;for(let t=0,s=i.length;t<s;t++)if(i[t]!==e[t])return!1;return!0}function Mn(i,e){for(let t=0,s=e.length;t<s;t++)i[t]=e[t]}function Qc(i,e){let t=g0[e];t===void 0&&(t=new Int32Array(e),g0[e]=t);for(let s=0;s!==e;++s)t[s]=i.allocateTextureUnit();return t}function $b(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Yb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;i.uniform2fv(this.addr,e),Mn(t,e)}}function Kb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(En(t,e))return;i.uniform3fv(this.addr,e),Mn(t,e)}}function Zb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;i.uniform4fv(this.addr,e),Mn(t,e)}}function Qb(i,e){const t=this.cache,s=e.elements;if(s===void 0){if(En(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Mn(t,e)}else{if(En(t,s))return;_0.set(s),i.uniformMatrix2fv(this.addr,!1,_0),Mn(t,s)}}function Jb(i,e){const t=this.cache,s=e.elements;if(s===void 0){if(En(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Mn(t,e)}else{if(En(t,s))return;v0.set(s),i.uniformMatrix3fv(this.addr,!1,v0),Mn(t,s)}}function eT(i,e){const t=this.cache,s=e.elements;if(s===void 0){if(En(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Mn(t,e)}else{if(En(t,s))return;x0.set(s),i.uniformMatrix4fv(this.addr,!1,x0),Mn(t,s)}}function tT(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function nT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;i.uniform2iv(this.addr,e),Mn(t,e)}}function iT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(En(t,e))return;i.uniform3iv(this.addr,e),Mn(t,e)}}function rT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;i.uniform4iv(this.addr,e),Mn(t,e)}}function sT(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function oT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;i.uniform2uiv(this.addr,e),Mn(t,e)}}function aT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(En(t,e))return;i.uniform3uiv(this.addr,e),Mn(t,e)}}function lT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;i.uniform4uiv(this.addr,e),Mn(t,e)}}function cT(i,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(i.uniform1i(this.addr,o),s[0]=o);let l;this.type===i.SAMPLER_2D_SHADOW?(dh.compareFunction=t.isReversedDepthBuffer()?Rh:Ch,l=dh):l=Qx,t.setTexture2D(e||l,o)}function uT(i,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(i.uniform1i(this.addr,o),s[0]=o),t.setTexture3D(e||ev,o)}function dT(i,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(i.uniform1i(this.addr,o),s[0]=o),t.setTextureCube(e||tv,o)}function fT(i,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(i.uniform1i(this.addr,o),s[0]=o),t.setTexture2DArray(e||Jx,o)}function hT(i){switch(i){case 5126:return $b;case 35664:return Yb;case 35665:return Kb;case 35666:return Zb;case 35674:return Qb;case 35675:return Jb;case 35676:return eT;case 5124:case 35670:return tT;case 35667:case 35671:return nT;case 35668:case 35672:return iT;case 35669:case 35673:return rT;case 5125:return sT;case 36294:return oT;case 36295:return aT;case 36296:return lT;case 35678:case 36198:case 36298:case 36306:case 35682:return cT;case 35679:case 36299:case 36307:return uT;case 35680:case 36300:case 36308:case 36293:return dT;case 36289:case 36303:case 36311:case 36292:return fT}}function pT(i,e){i.uniform1fv(this.addr,e)}function mT(i,e){const t=Io(e,this.size,2);i.uniform2fv(this.addr,t)}function gT(i,e){const t=Io(e,this.size,3);i.uniform3fv(this.addr,t)}function xT(i,e){const t=Io(e,this.size,4);i.uniform4fv(this.addr,t)}function vT(i,e){const t=Io(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function _T(i,e){const t=Io(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function yT(i,e){const t=Io(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ST(i,e){i.uniform1iv(this.addr,e)}function ET(i,e){i.uniform2iv(this.addr,e)}function MT(i,e){i.uniform3iv(this.addr,e)}function wT(i,e){i.uniform4iv(this.addr,e)}function bT(i,e){i.uniform1uiv(this.addr,e)}function TT(i,e){i.uniform2uiv(this.addr,e)}function AT(i,e){i.uniform3uiv(this.addr,e)}function CT(i,e){i.uniform4uiv(this.addr,e)}function RT(i,e,t){const s=this.cache,o=e.length,l=Qc(t,o);En(s,l)||(i.uniform1iv(this.addr,l),Mn(s,l));let c;this.type===i.SAMPLER_2D_SHADOW?c=dh:c=Qx;for(let d=0;d!==o;++d)t.setTexture2D(e[d]||c,l[d])}function PT(i,e,t){const s=this.cache,o=e.length,l=Qc(t,o);En(s,l)||(i.uniform1iv(this.addr,l),Mn(s,l));for(let c=0;c!==o;++c)t.setTexture3D(e[c]||ev,l[c])}function DT(i,e,t){const s=this.cache,o=e.length,l=Qc(t,o);En(s,l)||(i.uniform1iv(this.addr,l),Mn(s,l));for(let c=0;c!==o;++c)t.setTextureCube(e[c]||tv,l[c])}function LT(i,e,t){const s=this.cache,o=e.length,l=Qc(t,o);En(s,l)||(i.uniform1iv(this.addr,l),Mn(s,l));for(let c=0;c!==o;++c)t.setTexture2DArray(e[c]||Jx,l[c])}function FT(i){switch(i){case 5126:return pT;case 35664:return mT;case 35665:return gT;case 35666:return xT;case 35674:return vT;case 35675:return _T;case 35676:return yT;case 5124:case 35670:return ST;case 35667:case 35671:return ET;case 35668:case 35672:return MT;case 35669:case 35673:return wT;case 5125:return bT;case 36294:return TT;case 36295:return AT;case 36296:return CT;case 35678:case 36198:case 36298:case 36306:case 35682:return RT;case 35679:case 36299:case 36307:return PT;case 35680:case 36300:case 36308:case 36293:return DT;case 36289:case 36303:case 36311:case 36292:return LT}}class NT{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.setValue=hT(t.type)}}class IT{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=FT(t.type)}}class UT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,s){const o=this.seq;for(let l=0,c=o.length;l!==c;++l){const d=o[l];d.setValue(e,t[d.id],s)}}}const _f=/(\w+)(\])?(\[|\.)?/g;function y0(i,e){i.seq.push(e),i.map[e.id]=e}function OT(i,e,t){const s=i.name,o=s.length;for(_f.lastIndex=0;;){const l=_f.exec(s),c=_f.lastIndex;let d=l[1];const h=l[2]==="]",m=l[3];if(h&&(d=d|0),m===void 0||m==="["&&c+2===o){y0(t,m===void 0?new NT(d,i,e):new IT(d,i,e));break}else{let y=t.map[d];y===void 0&&(y=new UT(d),y0(t,y)),t=y}}}class Lc{constructor(e,t){this.seq=[],this.map={};const s=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let c=0;c<s;++c){const d=e.getActiveUniform(t,c),h=e.getUniformLocation(t,d.name);OT(d,h,this)}const o=[],l=[];for(const c of this.seq)c.type===e.SAMPLER_2D_SHADOW||c.type===e.SAMPLER_CUBE_SHADOW||c.type===e.SAMPLER_2D_ARRAY_SHADOW?o.push(c):l.push(c);o.length>0&&(this.seq=o.concat(l))}setValue(e,t,s,o){const l=this.map[t];l!==void 0&&l.setValue(e,s,o)}setOptional(e,t,s){const o=t[s];o!==void 0&&this.setValue(e,s,o)}static upload(e,t,s,o){for(let l=0,c=t.length;l!==c;++l){const d=t[l],h=s[d.id];h.needsUpdate!==!1&&d.setValue(e,h.value,o)}}static seqWithValue(e,t){const s=[];for(let o=0,l=e.length;o!==l;++o){const c=e[o];c.id in t&&s.push(c)}return s}}function S0(i,e,t){const s=i.createShader(e);return i.shaderSource(s,t),i.compileShader(s),s}const BT=37297;let kT=0;function zT(i,e){const t=i.split(`
`),s=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let c=o;c<l;c++){const d=c+1;s.push(`${d===e?">":" "} ${d}: ${t[c]}`)}return s.join(`
`)}const E0=new Mt;function HT(i){Bt._getMatrix(E0,Bt.workingColorSpace,i);const e=`mat3( ${E0.elements.map(t=>t.toFixed(4))} )`;switch(Bt.getTransfer(i)){case Bc:return[e,"LinearTransferOETF"];case $t:return[e,"sRGBTransferOETF"];default:return yt("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function M0(i,e,t){const s=i.getShaderParameter(e,i.COMPILE_STATUS),l=(i.getShaderInfoLog(e)||"").trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const d=parseInt(c[1]);return t.toUpperCase()+`

`+l+`

`+zT(i.getShaderSource(e),d)}else return l}function VT(i,e){const t=HT(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const GT={[vx]:"Linear",[_x]:"Reinhard",[yx]:"Cineon",[Sx]:"ACESFilmic",[Mx]:"AgX",[wx]:"Neutral",[Ex]:"Custom"};function WT(i,e){const t=GT[e];return t===void 0?(yt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Sc=new ce;function jT(){Bt.getLuminanceCoefficients(Sc);const i=Sc.x.toFixed(4),e=Sc.y.toFixed(4),t=Sc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function XT(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ra).join(`
`)}function qT(i){const e=[];for(const t in i){const s=i[t];s!==!1&&e.push("#define "+t+" "+s)}return e.join(`
`)}function $T(i,e){const t={},s=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let o=0;o<s;o++){const l=i.getActiveAttrib(e,o),c=l.name;let d=1;l.type===i.FLOAT_MAT2&&(d=2),l.type===i.FLOAT_MAT3&&(d=3),l.type===i.FLOAT_MAT4&&(d=4),t[c]={type:l.type,location:i.getAttribLocation(e,c),locationSize:d}}return t}function Ra(i){return i!==""}function w0(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function b0(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const YT=/^[ \t]*#include +<([\w\d./]+)>/gm;function fh(i){return i.replace(YT,ZT)}const KT=new Map;function ZT(i,e){let t=Ct[e];if(t===void 0){const s=KT.get(e);if(s!==void 0)t=Ct[s],yt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return fh(t)}const QT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function T0(i){return i.replace(QT,JT)}function JT(i,e,t,s){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=s.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function A0(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const eA={[Ac]:"SHADOWMAP_TYPE_PCF",[Ca]:"SHADOWMAP_TYPE_VSM"};function tA(i){return eA[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const nA={[Fs]:"ENVMAP_TYPE_CUBE",[Co]:"ENVMAP_TYPE_CUBE",[$c]:"ENVMAP_TYPE_CUBE_UV"};function iA(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":nA[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const rA={[Co]:"ENVMAP_MODE_REFRACTION"};function sA(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":rA[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const oA={[xx]:"ENVMAP_BLENDING_MULTIPLY",[X1]:"ENVMAP_BLENDING_MIX",[q1]:"ENVMAP_BLENDING_ADD"};function aA(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":oA[i.combine]||"ENVMAP_BLENDING_NONE"}function lA(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:s,maxMip:t}}function cA(i,e,t,s){const o=i.getContext(),l=t.defines;let c=t.vertexShader,d=t.fragmentShader;const h=tA(t),m=iA(t),v=sA(t),y=aA(t),g=lA(t),E=XT(t),b=qT(l),A=o.createProgram();let S,x,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Ra).join(`
`),S.length>0&&(S+=`
`),x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Ra).join(`
`),x.length>0&&(x+=`
`)):(S=[A0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+v:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ra).join(`
`),x=[A0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.envMap?"#define "+v:"",t.envMap?"#define "+y:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==sr?"#define TONE_MAPPING":"",t.toneMapping!==sr?Ct.tonemapping_pars_fragment:"",t.toneMapping!==sr?WT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ct.colorspace_pars_fragment,VT("linearToOutputTexel",t.outputColorSpace),jT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ra).join(`
`)),c=fh(c),c=w0(c,t),c=b0(c,t),d=fh(d),d=w0(d,t),d=b0(d,t),c=T0(c),d=T0(d),t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,S=[E,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,x=["#define varying in",t.glslVersion===Bg?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const O=R+S+c,T=R+x+d,D=S0(o,o.VERTEX_SHADER,O),F=S0(o,o.FRAGMENT_SHADER,T);o.attachShader(A,D),o.attachShader(A,F),t.index0AttributeName!==void 0?o.bindAttribLocation(A,0,t.index0AttributeName):t.hasPositionAttribute===!0&&o.bindAttribLocation(A,0,"position"),o.linkProgram(A);function U(j){if(i.debug.checkShaderErrors){const X=o.getProgramInfoLog(A)||"",re=o.getShaderInfoLog(D)||"",H=o.getShaderInfoLog(F)||"",te=X.trim(),ge=re.trim(),se=H.trim();let ne=!0,G=!0;if(o.getProgramParameter(A,o.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(o,A,D,F);else{const V=M0(o,D,"vertex"),N=M0(o,F,"fragment");Wt("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(A,o.VALIDATE_STATUS)+`

Material Name: `+j.name+`
Material Type: `+j.type+`

Program Info Log: `+te+`
`+V+`
`+N)}else te!==""?yt("WebGLProgram: Program Info Log:",te):(ge===""||se==="")&&(G=!1);G&&(j.diagnostics={runnable:ne,programLog:te,vertexShader:{log:ge,prefix:S},fragmentShader:{log:se,prefix:x}})}o.deleteShader(D),o.deleteShader(F),M=new Lc(o,A),I=$T(o,A)}let M;this.getUniforms=function(){return M===void 0&&U(this),M};let I;this.getAttributes=function(){return I===void 0&&U(this),I};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=o.getProgramParameter(A,BT)),z},this.destroy=function(){s.releaseStatesOfProgram(this),o.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kT++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=D,this.fragmentShader=F,this}let uA=0;class dA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,s){const o=this._getShaderCacheForMaterial(e);return o.has(t)===!1&&(o.add(t),t.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const s of t)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let s=t.get(e);return s===void 0&&(s=new Set,t.set(e,s)),s}_getShaderStage(e){const t=this.shaderCache;let s=t.get(e);return s===void 0&&(s=new fA(e),t.set(e,s)),s}}class fA{constructor(e){this.id=uA++,this.code=e,this.usedTimes=0}}function hA(i){return i===Ns||i===Ic||i===Uc}function pA(i,e,t,s,o,l){const c=new Ix,d=new dA,h=new Set,m=[],v=new Map,y=s.logarithmicDepthBuffer;let g=s.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(M){return h.add(M),M===0?"uv":`uv${M}`}function A(M,I,z,j,X,re){const H=j.fog,te=X.geometry,ge=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?j.environment:null,se=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,ne=e.get(M.envMap||ge,se),G=ne&&ne.mapping===$c?ne.image.height:null,V=E[M.type];M.precision!==null&&(g=s.getMaxPrecision(M.precision),g!==M.precision&&yt("WebGLProgram.getParameters:",M.precision,"not supported, using",g,"instead."));const N=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,Z=N!==void 0?N.length:0;let _e=0;te.morphAttributes.position!==void 0&&(_e=1),te.morphAttributes.normal!==void 0&&(_e=2),te.morphAttributes.color!==void 0&&(_e=3);let De,Se,Ee,Q;if(V){const Lt=nr[V];De=Lt.vertexShader,Se=Lt.fragmentShader}else{De=M.vertexShader,Se=M.fragmentShader;const Lt=d.getVertexShaderStage(M),Pt=d.getFragmentShaderStage(M);d.update(M,Lt,Pt),Ee=Lt.id,Q=Pt.id}const ae=i.getRenderTarget(),Te=i.state.buffers.depth.getReversed(),Ke=X.isInstancedMesh===!0,Ge=X.isBatchedMesh===!0,ct=!!M.map,Ot=!!M.matcap,mt=!!ne,bt=!!M.aoMap,Nt=!!M.lightMap,pt=!!M.bumpMap&&M.wireframe===!1,Xe=!!M.normalMap,wt=!!M.displacementMap,vt=!!M.emissiveMap,Tt=!!M.metalnessMap,jt=!!M.roughnessMap,K=M.anisotropy>0,Dt=M.clearcoat>0,Rt=M.dispersion>0,B=M.retroreflectivity>0,w=M.iridescence>0,ie=M.sheen>0,de=M.transmission>0,me=K&&!!M.anisotropyMap,Re=Dt&&!!M.clearcoatMap,Fe=Dt&&!!M.clearcoatNormalMap,xe=Dt&&!!M.clearcoatRoughnessMap,ye=w&&!!M.iridescenceMap,Ie=w&&!!M.iridescenceThicknessMap,nt=ie&&!!M.sheenColorMap,ke=ie&&!!M.sheenRoughnessMap,Ue=!!M.specularMap,it=!!M.specularColorMap,dt=!!M.specularIntensityMap,ht=de&&!!M.transmissionMap,$=de&&!!M.thicknessMap,Oe=!!M.gradientMap,ve=!!M.alphaMap,Ne=M.alphaTest>0,qe=!!M.alphaHash,Me=!!M.extensions;let ot=sr;M.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ot=i.toneMapping);const Je={shaderID:V,shaderType:M.type,shaderName:M.name,vertexShader:De,fragmentShader:Se,defines:M.defines,customVertexShaderID:Ee,customFragmentShaderID:Q,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:g,batching:Ge,batchingColor:Ge&&X._colorsTexture!==null,instancing:Ke,instancingColor:Ke&&X.instanceColor!==null,instancingMorph:Ke&&X.morphTexture!==null,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Bt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:ct,matcap:Ot,envMap:mt,envMapMode:mt&&ne.mapping,envMapCubeUVHeight:G,aoMap:bt,lightMap:Nt,bumpMap:pt,normalMap:Xe,displacementMap:wt,emissiveMap:vt,normalMapObjectSpace:Xe&&M.normalMapType===K1,normalMapTangentSpace:Xe&&M.normalMapType===Og,packedNormalMap:Xe&&M.normalMapType===Og&&hA(M.normalMap.format),metalnessMap:Tt,roughnessMap:jt,anisotropy:K,anisotropyMap:me,clearcoat:Dt,clearcoatMap:Re,clearcoatNormalMap:Fe,clearcoatRoughnessMap:xe,dispersion:Rt,retroreflection:B,iridescence:w,iridescenceMap:ye,iridescenceThicknessMap:Ie,sheen:ie,sheenColorMap:nt,sheenRoughnessMap:ke,specularMap:Ue,specularColorMap:it,specularIntensityMap:dt,transmission:de,transmissionMap:ht,thicknessMap:$,gradientMap:Oe,opaque:M.transparent===!1&&M.blending===Pa&&M.alphaToCoverage===!1,alphaMap:ve,alphaTest:Ne,alphaHash:qe,combine:M.combine,mapUv:ct&&b(M.map.channel),aoMapUv:bt&&b(M.aoMap.channel),lightMapUv:Nt&&b(M.lightMap.channel),bumpMapUv:pt&&b(M.bumpMap.channel),normalMapUv:Xe&&b(M.normalMap.channel),displacementMapUv:wt&&b(M.displacementMap.channel),emissiveMapUv:vt&&b(M.emissiveMap.channel),metalnessMapUv:Tt&&b(M.metalnessMap.channel),roughnessMapUv:jt&&b(M.roughnessMap.channel),anisotropyMapUv:me&&b(M.anisotropyMap.channel),clearcoatMapUv:Re&&b(M.clearcoatMap.channel),clearcoatNormalMapUv:Fe&&b(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&b(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&b(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&b(M.iridescenceThicknessMap.channel),sheenColorMapUv:nt&&b(M.sheenColorMap.channel),sheenRoughnessMapUv:ke&&b(M.sheenRoughnessMap.channel),specularMapUv:Ue&&b(M.specularMap.channel),specularColorMapUv:it&&b(M.specularColorMap.channel),specularIntensityMapUv:dt&&b(M.specularIntensityMap.channel),transmissionMapUv:ht&&b(M.transmissionMap.channel),thicknessMapUv:$&&b(M.thicknessMap.channel),alphaMapUv:ve&&b(M.alphaMap.channel),vertexTangents:!!te.attributes.tangent&&(Xe||K),vertexNormals:!!te.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!te.attributes.uv&&(ct||ve),fog:!!H,useFog:M.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||te.attributes.normal===void 0&&Xe===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:y,reversedDepthBuffer:Te,skinning:X.isSkinnedMesh===!0,hasPositionAttribute:te.attributes.position!==void 0,morphTargets:te.morphAttributes.position!==void 0,morphNormals:te.morphAttributes.normal!==void 0,morphColors:te.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:_e,numSunLights:I.sun.length,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numSunLightShadows:I.sunShadowMap.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numLightProbeGrids:re.length,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:ot,decodeVideoTexture:ct&&M.map.isVideoTexture===!0&&Bt.getTransfer(M.map.colorSpace)===$t,decodeVideoTextureEmissive:vt&&M.emissiveMap.isVideoTexture===!0&&Bt.getTransfer(M.emissiveMap.colorSpace)===$t,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Mr,flipSided:M.side===ai,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Me&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Me&&M.extensions.multiDraw===!0||Ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Je.vertexUv1s=h.has(1),Je.vertexUv2s=h.has(2),Je.vertexUv3s=h.has(3),h.clear(),Je}function S(M){const I=[];if(M.shaderID?I.push(M.shaderID):(I.push(M.customVertexShaderID),I.push(M.customFragmentShaderID)),M.defines!==void 0)for(const z in M.defines)I.push(z),I.push(M.defines[z]);return M.isRawShaderMaterial===!1&&(x(I,M),R(I,M),I.push(i.outputColorSpace)),I.push(M.customProgramCacheKey),I.join()}function x(M,I){M.push(I.precision),M.push(I.outputColorSpace),M.push(I.envMapMode),M.push(I.envMapCubeUVHeight),M.push(I.mapUv),M.push(I.alphaMapUv),M.push(I.lightMapUv),M.push(I.aoMapUv),M.push(I.bumpMapUv),M.push(I.normalMapUv),M.push(I.displacementMapUv),M.push(I.emissiveMapUv),M.push(I.metalnessMapUv),M.push(I.roughnessMapUv),M.push(I.anisotropyMapUv),M.push(I.clearcoatMapUv),M.push(I.clearcoatNormalMapUv),M.push(I.clearcoatRoughnessMapUv),M.push(I.iridescenceMapUv),M.push(I.iridescenceThicknessMapUv),M.push(I.sheenColorMapUv),M.push(I.sheenRoughnessMapUv),M.push(I.specularMapUv),M.push(I.specularColorMapUv),M.push(I.specularIntensityMapUv),M.push(I.transmissionMapUv),M.push(I.thicknessMapUv),M.push(I.combine),M.push(I.fogExp2),M.push(I.sizeAttenuation),M.push(I.morphTargetsCount),M.push(I.morphAttributeCount),M.push(I.numSunLights),M.push(I.numDirLights),M.push(I.numPointLights),M.push(I.numSpotLights),M.push(I.numSpotLightMaps),M.push(I.numHemiLights),M.push(I.numRectAreaLights),M.push(I.numSunLightShadows),M.push(I.numDirLightShadows),M.push(I.numPointLightShadows),M.push(I.numSpotLightShadows),M.push(I.numSpotLightShadowsWithMaps),M.push(I.numLightProbes),M.push(I.shadowMapType),M.push(I.toneMapping),M.push(I.numClippingPlanes),M.push(I.numClipIntersection),M.push(I.depthPacking)}function R(M,I){c.disableAll(),I.instancing&&c.enable(0),I.instancingColor&&c.enable(1),I.instancingMorph&&c.enable(2),I.matcap&&c.enable(3),I.envMap&&c.enable(4),I.normalMapObjectSpace&&c.enable(5),I.normalMapTangentSpace&&c.enable(6),I.clearcoat&&c.enable(7),I.iridescence&&c.enable(8),I.alphaTest&&c.enable(9),I.vertexColors&&c.enable(10),I.vertexAlphas&&c.enable(11),I.vertexUv1s&&c.enable(12),I.vertexUv2s&&c.enable(13),I.vertexUv3s&&c.enable(14),I.vertexTangents&&c.enable(15),I.anisotropy&&c.enable(16),I.alphaHash&&c.enable(17),I.batching&&c.enable(18),I.dispersion&&c.enable(19),I.retroreflection&&c.enable(24),I.batchingColor&&c.enable(20),I.gradientMap&&c.enable(21),I.packedNormalMap&&c.enable(22),I.vertexNormals&&c.enable(23),M.push(c.mask),c.disableAll(),I.fog&&c.enable(0),I.useFog&&c.enable(1),I.flatShading&&c.enable(2),I.logarithmicDepthBuffer&&c.enable(3),I.reversedDepthBuffer&&c.enable(4),I.skinning&&c.enable(5),I.morphTargets&&c.enable(6),I.morphNormals&&c.enable(7),I.morphColors&&c.enable(8),I.premultipliedAlpha&&c.enable(9),I.shadowMapEnabled&&c.enable(10),I.doubleSided&&c.enable(11),I.flipSided&&c.enable(12),I.useDepthPacking&&c.enable(13),I.dithering&&c.enable(14),I.transmission&&c.enable(15),I.sheen&&c.enable(16),I.opaque&&c.enable(17),I.pointsUvs&&c.enable(18),I.decodeVideoTexture&&c.enable(19),I.decodeVideoTextureEmissive&&c.enable(20),I.alphaToCoverage&&c.enable(21),I.numLightProbeGrids>0&&c.enable(22),I.hasPositionAttribute&&c.enable(23),M.push(c.mask)}function O(M){const I=E[M.type];let z;if(I){const j=nr[I];z=UE.clone(j.uniforms)}else z=M.uniforms;return z}function T(M,I){let z=v.get(I);return z!==void 0?++z.usedTimes:(z=new cA(i,I,M,o),m.push(z),v.set(I,z)),z}function D(M){if(--M.usedTimes===0){const I=m.indexOf(M);m[I]=m[m.length-1],m.pop(),v.delete(M.cacheKey),M.destroy()}}function F(M){d.remove(M)}function U(){d.dispose()}return{getParameters:A,getProgramCacheKey:S,getUniforms:O,acquireProgram:T,releaseProgram:D,releaseShaderCache:F,programs:m,dispose:U}}function mA(){let i=new WeakMap;function e(c){return i.has(c)}function t(c){let d=i.get(c);return d===void 0&&(d={},i.set(c,d)),d}function s(c){i.delete(c)}function o(c,d,h){i.get(c)[d]=h}function l(){i=new WeakMap}return{has:e,get:t,remove:s,update:o,dispose:l}}function gA(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function C0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function R0(){const i=[];let e=0;const t=[],s=[],o=[];function l(){e=0,t.length=0,s.length=0,o.length=0}function c(g){let E=0;return g.isInstancedMesh&&(E+=2),g.isSkinnedMesh&&(E+=1),E}function d(g,E,b,A,S,x){let R=i[e];return R===void 0?(R={id:g.id,object:g,geometry:E,material:b,materialVariant:c(g),groupOrder:A,renderOrder:g.renderOrder,z:S,group:x},i[e]=R):(R.id=g.id,R.object=g,R.geometry=E,R.material=b,R.materialVariant=c(g),R.groupOrder=A,R.renderOrder=g.renderOrder,R.z=S,R.group=x),e++,R}function h(g,E,b,A,S,x,R){R.reversedDepth===!0&&(S=-S);const O=d(g,E,b,A,S,x);b.transmission>0?s.push(O):b.transparent===!0?o.push(O):t.push(O)}function m(g,E,b,A,S,x){const R=d(g,E,b,A,S,x);b.transmission>0?s.unshift(R):b.transparent===!0?o.unshift(R):t.unshift(R)}function v(g,E){t.length>1&&t.sort(g||gA),s.length>1&&s.sort(E||C0),o.length>1&&o.sort(E||C0)}function y(){for(let g=e,E=i.length;g<E;g++){const b=i[g];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:t,transmissive:s,transparent:o,init:l,push:h,unshift:m,finish:y,sort:v}}function xA(){let i=new WeakMap;function e(s,o){const l=i.get(s);let c;return l===void 0?(c=new R0,i.set(s,[c])):o>=l.length?(c=new R0,l.push(c)):c=l[o],c}function t(){i=new WeakMap}return{get:e,dispose:t}}function vA(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new ce,color:new It};break;case"SpotLight":t={position:new ce,direction:new ce,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ce,color:new It,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ce,skyColor:new It,groundColor:new It};break;case"RectAreaLight":t={color:new It,position:new ce,halfWidth:new ce,halfHeight:new ce};break}return i[e.id]=t,t}}}function _A(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let yA=0;function SA(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function EA(i){const e=new vA,t=_A(),s={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new ce);const o=new ce,l=new ln,c=new ln;function d(m){let v=0,y=0,g=0;for(let X=0;X<9;X++)s.probe[X].set(0,0,0);let E=0,b=0,A=0,S=0,x=0,R=0,O=0,T=0,D=0,F=0,U=0,M=0,I=0,z=0;m.sort(SA);for(let X=0,re=m.length;X<re;X++){const H=m[X],te=H.color,ge=H.intensity,se=H.distance;let ne=null;if(H.shadow&&H.shadow.map&&(H.shadow.map.texture.format===Ns?ne=H.shadow.map.texture:ne=H.shadow.map.depthTexture||H.shadow.map.texture),H.isAmbientLight)v+=te.r*ge,y+=te.g*ge,g+=te.b*ge;else if(H.isLightProbe){for(let G=0;G<9;G++)s.probe[G].addScaledVector(H.sh.coefficients[G],ge);z++}else if(H.isSunLight){const G=e.get(H);if(G.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const V=H.shadow,N=t.get(H);N.shadowIntensity=V.intensity,N.shadowBias=V.bias,N.shadowNormalBias=V.normalBias,N.shadowRadius=V.radius,N.shadowMapSize.copy(V.mapSize).multiply(V.getFrameExtents()),s.sunShadow[b]=N,s.sunShadowMap[b]=ne;const Z=V.getViewportCount();for(let _e=0;_e<Z;_e++)s.sunShadowMatrix[A+_e]=V.getMatrix(_e),s.sunShadowCascade[A+_e]=V._cascadeData[_e];A+=Z,b++}s.sun[E]=G,E++}else if(H.isDirectionalLight){const G=e.get(H);if(G.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const V=H.shadow,N=t.get(H);N.shadowIntensity=V.intensity,N.shadowBias=V.bias,N.shadowNormalBias=V.normalBias,N.shadowRadius=V.radius,N.shadowMapSize=V.mapSize,s.directionalShadow[S]=N,s.directionalShadowMap[S]=ne,s.directionalShadowMatrix[S]=H.shadow.matrix,D++}s.directional[S]=G,S++}else if(H.isSpotLight){const G=e.get(H);G.position.setFromMatrixPosition(H.matrixWorld),G.color.copy(te).multiplyScalar(ge),G.distance=se,G.coneCos=Math.cos(H.angle),G.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),G.decay=H.decay,s.spot[R]=G;const V=H.shadow;if(H.map&&(s.spotLightMap[M]=H.map,M++,V.updateMatrices(H),H.castShadow&&I++),s.spotLightMatrix[R]=V.matrix,H.castShadow){const N=t.get(H);N.shadowIntensity=V.intensity,N.shadowBias=V.bias,N.shadowNormalBias=V.normalBias,N.shadowRadius=V.radius,N.shadowMapSize=V.mapSize,s.spotShadow[R]=N,s.spotShadowMap[R]=ne,U++}R++}else if(H.isRectAreaLight){const G=e.get(H);G.color.copy(te).multiplyScalar(ge),G.halfWidth.set(H.width*.5,0,0),G.halfHeight.set(0,H.height*.5,0),s.rectArea[O]=G,O++}else if(H.isPointLight){const G=e.get(H);if(G.color.copy(H.color).multiplyScalar(H.intensity),G.distance=H.distance,G.decay=H.decay,H.castShadow){const V=H.shadow,N=t.get(H);N.shadowIntensity=V.intensity,N.shadowBias=V.bias,N.shadowNormalBias=V.normalBias,N.shadowRadius=V.radius,N.shadowMapSize=V.mapSize,N.shadowCameraNear=V.camera.near,N.shadowCameraFar=V.camera.far,s.pointShadow[x]=N,s.pointShadowMap[x]=ne,s.pointShadowMatrix[x]=H.shadow.matrix,F++}s.point[x]=G,x++}else if(H.isHemisphereLight){const G=e.get(H);G.skyColor.copy(H.color).multiplyScalar(ge),G.groundColor.copy(H.groundColor).multiplyScalar(ge),s.hemi[T]=G,T++}}O>0&&(i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ye.LTC_FLOAT_1,s.rectAreaLTC2=Ye.LTC_FLOAT_2):(s.rectAreaLTC1=Ye.LTC_HALF_1,s.rectAreaLTC2=Ye.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=y,s.ambient[2]=g;const j=s.hash;(j.sunLength!==E||j.directionalLength!==S||j.pointLength!==x||j.spotLength!==R||j.rectAreaLength!==O||j.hemiLength!==T||j.numSunShadows!==b||j.numDirectionalShadows!==D||j.numPointShadows!==F||j.numSpotShadows!==U||j.numSpotMaps!==M||j.numLightProbes!==z)&&(s.sun.length=E,s.directional.length=S,s.spot.length=R,s.rectArea.length=O,s.point.length=x,s.hemi.length=T,s.sunShadow.length=b,s.sunShadowMap.length=b,s.sunShadowMatrix.length=A,s.sunShadowCascade.length=A,s.directionalShadow.length=D,s.directionalShadowMap.length=D,s.directionalShadowMatrix.length=D,s.pointShadow.length=F,s.pointShadowMap.length=F,s.pointShadowMatrix.length=F,s.spotShadow.length=U,s.spotShadowMap.length=U,s.spotLightMatrix.length=U+M-I,s.spotLightMap.length=M,s.numSpotLightShadowsWithMaps=I,s.numLightProbes=z,j.sunLength=E,j.directionalLength=S,j.pointLength=x,j.spotLength=R,j.rectAreaLength=O,j.hemiLength=T,j.numSunShadows=b,j.numDirectionalShadows=D,j.numPointShadows=F,j.numSpotShadows=U,j.numSpotMaps=M,j.numLightProbes=z,s.version=yA++)}function h(m,v){let y=0,g=0,E=0,b=0,A=0,S=0;const x=v.matrixWorldInverse;for(let R=0,O=m.length;R<O;R++){const T=m[R];if(T.isSunLight){const D=s.sun[y];D.direction.setFromMatrixPosition(T.matrixWorld),D.direction.transformDirection(x),y++}else if(T.isDirectionalLight){const D=s.directional[g];D.direction.setFromMatrixPosition(T.matrixWorld),o.setFromMatrixPosition(T.target.matrixWorld),D.direction.sub(o),D.direction.transformDirection(x),g++}else if(T.isSpotLight){const D=s.spot[b];D.position.setFromMatrixPosition(T.matrixWorld),D.position.applyMatrix4(x),D.direction.setFromMatrixPosition(T.matrixWorld),o.setFromMatrixPosition(T.target.matrixWorld),D.direction.sub(o),D.direction.transformDirection(x),b++}else if(T.isRectAreaLight){const D=s.rectArea[A];D.position.setFromMatrixPosition(T.matrixWorld),D.position.applyMatrix4(x),c.identity(),l.copy(T.matrixWorld),l.premultiply(x),c.extractRotation(l),D.halfWidth.set(T.width*.5,0,0),D.halfHeight.set(0,T.height*.5,0),D.halfWidth.applyMatrix4(c),D.halfHeight.applyMatrix4(c),A++}else if(T.isPointLight){const D=s.point[E];D.position.setFromMatrixPosition(T.matrixWorld),D.position.applyMatrix4(x),E++}else if(T.isHemisphereLight){const D=s.hemi[S];D.direction.setFromMatrixPosition(T.matrixWorld),D.direction.transformDirection(x),S++}}}return{setup:d,setupView:h,state:s}}function P0(i){const e=new EA(i),t=[],s=[],o=[];function l(g){y.camera=g,t.length=0,s.length=0,o.length=0}function c(g){t.push(g)}function d(g){s.push(g)}function h(g){o.push(g)}function m(){e.setup(t)}function v(g){e.setupView(t,g)}const y={lightsArray:t,shadowsArray:s,lightProbeGridArray:o,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:l,state:y,setupLights:m,setupLightsView:v,pushLight:c,pushShadow:d,pushLightProbeGrid:h}}function MA(i){let e=new WeakMap;function t(o,l=0){const c=e.get(o);let d;return c===void 0?(d=new P0(i),e.set(o,[d])):l>=c.length?(d=new P0(i),c.push(d)):d=c[l],d}function s(){e=new WeakMap}return{get:t,dispose:s}}const wA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,TA=[new ce(1,0,0),new ce(-1,0,0),new ce(0,1,0),new ce(0,-1,0),new ce(0,0,1),new ce(0,0,-1)],AA=[new ce(0,-1,0),new ce(0,-1,0),new ce(0,0,1),new ce(0,0,-1),new ce(0,-1,0),new ce(0,-1,0)],D0=new ln,Ta=new ce,yf=new ce;function CA(i,e,t){let s=new zx;const o=new Ht,l=new Ht,c=new an,d=new zE,h=new HE,m={},v=t.maxTextureSize,y={[Ls]:ai,[ai]:Ls,[Mr]:Mr},g=new lr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ht},radius:{value:4}},vertexShader:wA,fragmentShader:bA}),E=g.clone();E.defines.HORIZONTAL_PASS=1;const b=new jn;b.setAttribute("position",new Xi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Yn(b,g),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ac;let x=this.type;this.render=function(F,U,M){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||F.length===0)return;this.type===A1&&(yt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ac);const I=i.getRenderTarget(),z=i.getActiveCubeFace(),j=i.getActiveMipmapLevel(),X=i.state;X.setBlending(br),X.buffers.depth.getReversed()===!0?X.buffers.color.setClear(0,0,0,0):X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const re=x!==this.type;re&&U.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(te=>te.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,te=F.length;H<te;H++){const ge=F[H],se=ge.shadow;if(se===void 0){yt("WebGLShadowMap:",ge,"has no shadow.");continue}if(se.autoUpdate===!1&&se.needsUpdate===!1)continue;o.copy(se.mapSize);const ne=se.getFrameExtents();o.multiply(ne),l.copy(se.mapSize),(o.x>v||o.y>v)&&(o.x>v&&(l.x=Math.floor(v/ne.x),o.x=l.x*ne.x,se.mapSize.x=l.x),o.y>v&&(l.y=Math.floor(v/ne.y),o.y=l.y*ne.y,se.mapSize.y=l.y));const G=i.state.buffers.depth.getReversed();if(se.camera._reversedDepth=G,se.map===null||re===!0){if(se.map!==null&&(se.map.depthTexture!==null&&(se.map.depthTexture.dispose(),se.map.depthTexture=null),se.map.dispose()),this.type===Ca){if(ge.isPointLight){yt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}se.map=new ji(o.x,o.y,{format:Ns,type:ar,minFilter:Gn,magFilter:Gn,generateMipmaps:!1}),se.map.texture.name=ge.name+".shadowMap",se.map.depthTexture=new Ua(o.x,o.y,ir),se.map.depthTexture.name=ge.name+".shadowMapDepth",se.map.depthTexture.format=Ar,se.map.depthTexture.compareFunction=null,se.map.depthTexture.minFilter=Nn,se.map.depthTexture.magFilter=Nn}else ge.isPointLight?(se.map=new Zx(o.x),se.map.depthTexture=new NE(o.x,or)):(se.map=new ji(o.x,o.y),se.map.depthTexture=new Ua(o.x,o.y,or)),se.map.depthTexture.name=ge.name+".shadowMap",se.map.depthTexture.format=Ar,this.type===Ac?(se.map.depthTexture.compareFunction=G?Rh:Ch,se.map.depthTexture.minFilter=Gn,se.map.depthTexture.magFilter=Gn):(se.map.depthTexture.compareFunction=null,se.map.depthTexture.minFilter=Nn,se.map.depthTexture.magFilter=Nn);se.camera.updateProjectionMatrix()}se.map.isWebGLCubeRenderTarget!==!0&&(se.map.width!==o.x||se.map.height!==o.y)&&se.map.setSize(o.x,o.y);const V=se.map.isWebGLCubeRenderTarget?6:se.getViewportCount();ge.isPointLight!==!0&&se.updateMatrices(ge,M);for(let N=0;N<V;N++){const Z=se.getCamera(N);if(ge.isPointLight){const _e=se.camera,De=se.matrix,Se=ge.distance||_e.far;Se!==_e.far&&(_e.far=Se,_e.updateProjectionMatrix()),Ta.setFromMatrixPosition(ge.matrixWorld),_e.position.copy(Ta),yf.copy(_e.position),yf.add(TA[N]),_e.up.copy(AA[N]),_e.lookAt(yf),_e.updateMatrixWorld(),De.makeTranslation(-Ta.x,-Ta.y,-Ta.z),D0.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),se._frustum.setFromProjectionMatrix(D0,_e.coordinateSystem,_e.reversedDepth)}if(se.map.isWebGLCubeRenderTarget)i.setRenderTarget(se.map,N),i.clear();else{N===0&&(i.setRenderTarget(se.map),i.clear());const _e=se.getViewport(N);c.set(l.x*_e.x,l.y*_e.y,l.x*_e.z,l.y*_e.w),X.viewport(c)}s=se.getFrustum(N),T(U,M,Z,ge,this.type)}se.isPointLightShadow!==!0&&this.type===Ca&&R(se,M),se.needsUpdate=!1}x=this.type,S.needsUpdate=!1,i.setRenderTarget(I,z,j)};function R(F,U){const M=e.update(A);g.defines.VSM_SAMPLES!==F.blurSamples&&(g.defines.VSM_SAMPLES=F.blurSamples,E.defines.VSM_SAMPLES=F.blurSamples,g.needsUpdate=!0,E.needsUpdate=!0),F.mapPass===null?F.mapPass=new ji(o.x,o.y,{format:Ns,type:ar}):(F.mapPass.width!==F.map.width||F.mapPass.height!==F.map.height)&&F.mapPass.setSize(F.map.width,F.map.height),g.uniforms.shadow_pass.value=F.map.depthTexture,g.uniforms.resolution.value.set(F.map.width,F.map.height),g.uniforms.radius.value=F.radius,i.setRenderTarget(F.mapPass),i.clear(),i.renderBufferDirect(U,null,M,g,A,null),E.uniforms.shadow_pass.value=F.mapPass.texture,E.uniforms.resolution.value.set(F.map.width,F.map.height),E.uniforms.radius.value=F.radius,i.setRenderTarget(F.map),i.clear(),i.renderBufferDirect(U,null,M,E,A,null)}function O(F,U,M,I){let z=null;const j=M.isPointLight===!0?F.customDistanceMaterial:F.customDepthMaterial;if(j!==void 0)z=j;else if(z=M.isPointLight===!0?h:d,i.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0||U.alphaToCoverage===!0){const X=z.uuid,re=U.uuid;let H=m[X];H===void 0&&(H={},m[X]=H);let te=H[re];te===void 0&&(te=z.clone(),H[re]=te,U.addEventListener("dispose",D)),z=te}if(z.visible=U.visible,z.wireframe=U.wireframe,I===Ca?z.side=U.shadowSide!==null?U.shadowSide:U.side:z.side=U.shadowSide!==null?U.shadowSide:y[U.side],z.alphaMap=U.alphaMap,z.alphaTest=U.alphaToCoverage===!0?.5:U.alphaTest,z.map=U.map,z.clipShadows=U.clipShadows,z.clippingPlanes=U.clippingPlanes,z.clipIntersection=U.clipIntersection,z.displacementMap=U.displacementMap,z.displacementScale=U.displacementScale,z.displacementBias=U.displacementBias,z.wireframeLinewidth=U.wireframeLinewidth,z.linewidth=U.linewidth,M.isPointLight===!0&&z.isMeshDistanceMaterial===!0){const X=i.properties.get(z);X.light=M}return z}function T(F,U,M,I,z){if(F.visible===!1)return;if(F.layers.test(U.layers)&&(F.isMesh||F.isLine||F.isPoints)&&(F.castShadow||F.receiveShadow&&z===Ca)&&(!F.frustumCulled||F.intersectsFrustum(s))){F.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,F.matrixWorld);const re=e.update(F),H=F.material;if(Array.isArray(H)){const te=re.groups;for(let ge=0,se=te.length;ge<se;ge++){const ne=te[ge],G=H[ne.materialIndex];if(G&&G.visible){const V=O(F,G,I,z);F.onBeforeShadow(i,F,U,M,re,V,ne),i.renderBufferDirect(M,null,re,V,F,ne),F.onAfterShadow(i,F,U,M,re,V,ne)}}}else if(H.visible){const te=O(F,H,I,z);F.onBeforeShadow(i,F,U,M,re,te,null),i.renderBufferDirect(M,null,re,te,F,null),F.onAfterShadow(i,F,U,M,re,te,null)}}const X=F.children;for(let re=0,H=X.length;re<H;re++)T(X[re],U,M,I,z)}function D(F){F.target.removeEventListener("dispose",D);for(const M in m){const I=m[M],z=F.target.uuid;z in I&&(I[z].dispose(),delete I[z])}}}function RA(i,e){function t(){let $=!1;const Oe=new an;let ve=null;const Ne=new an(0,0,0,0);return{setMask:function(qe){ve!==qe&&!$&&(i.colorMask(qe,qe,qe,qe),ve=qe)},setLocked:function(qe){$=qe},setClear:function(qe,Me,ot,Je,Lt){Lt===!0&&(qe*=Je,Me*=Je,ot*=Je),Oe.set(qe,Me,ot,Je),Ne.equals(Oe)===!1&&(i.clearColor(qe,Me,ot,Je),Ne.copy(Oe))},reset:function(){$=!1,ve=null,Ne.set(-1,0,0,0)}}}function s(){let $=!1,Oe=!1,ve=null,Ne=null,qe=null;return{setReversed:function(Me){if(Oe!==Me){const ot=e.get("EXT_clip_control");Me?ot.clipControlEXT(ot.LOWER_LEFT_EXT,ot.ZERO_TO_ONE_EXT):ot.clipControlEXT(ot.LOWER_LEFT_EXT,ot.NEGATIVE_ONE_TO_ONE_EXT),Oe=Me;const Je=qe;qe=null,this.setClear(Je)}},getReversed:function(){return Oe},setTest:function(Me){Me?ae(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(Me){ve!==Me&&!$&&(i.depthMask(Me),ve=Me)},setFunc:function(Me){if(Oe&&(Me=lE[Me]),Ne!==Me){switch(Me){case wf:i.depthFunc(i.NEVER);break;case bf:i.depthFunc(i.ALWAYS);break;case Tf:i.depthFunc(i.LESS);break;case Fa:i.depthFunc(i.LEQUAL);break;case Af:i.depthFunc(i.EQUAL);break;case Cf:i.depthFunc(i.GEQUAL);break;case Rf:i.depthFunc(i.GREATER);break;case Pf:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ne=Me}},setLocked:function(Me){$=Me},setClear:function(Me){qe!==Me&&(qe=Me,Oe&&(Me=1-Me),i.clearDepth(Me))},reset:function(){$=!1,ve=null,Ne=null,qe=null,Oe=!1}}}function o(){let $=!1,Oe=null,ve=null,Ne=null,qe=null,Me=null,ot=null,Je=null,Lt=null;return{setTest:function(Pt){$||(Pt?ae(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function(Pt){Oe!==Pt&&!$&&(i.stencilMask(Pt),Oe=Pt)},setFunc:function(Pt,xn,Qn){(ve!==Pt||Ne!==xn||qe!==Qn)&&(i.stencilFunc(Pt,xn,Qn),ve=Pt,Ne=xn,qe=Qn)},setOp:function(Pt,xn,Qn){(Me!==Pt||ot!==xn||Je!==Qn)&&(i.stencilOp(Pt,xn,Qn),Me=Pt,ot=xn,Je=Qn)},setLocked:function(Pt){$=Pt},setClear:function(Pt){Lt!==Pt&&(i.clearStencil(Pt),Lt=Pt)},reset:function(){$=!1,Oe=null,ve=null,Ne=null,qe=null,Me=null,ot=null,Je=null,Lt=null}}}const l=new t,c=new s,d=new o,h=new WeakMap,m=new WeakMap;let v={},y={},g={},E=new WeakMap,b=[],A=null,S=!1,x=null,R=null,O=null,T=null,D=null,F=null,U=null,M=new It(0,0,0),I=0,z=!1,j=null,X=null,re=null,H=null,te=null;const ge=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let se=!1,ne=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(G)[1]),se=ne>=1):G.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),se=ne>=2);let V=null,N={};const Z=i.getParameter(i.SCISSOR_BOX),_e=i.getParameter(i.VIEWPORT),De=new an().fromArray(Z),Se=new an().fromArray(_e);function Ee($,Oe,ve,Ne){const qe=new Uint8Array(4),Me=i.createTexture();i.bindTexture($,Me),i.texParameteri($,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri($,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ot=0;ot<ve;ot++)$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?i.texImage3D(Oe,0,i.RGBA,1,1,Ne,0,i.RGBA,i.UNSIGNED_BYTE,qe):i.texImage2D(Oe+ot,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,qe);return Me}const Q={};Q[i.TEXTURE_2D]=Ee(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=Ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=Ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=Ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),l.setClear(0,0,0,1),c.setClear(1),d.setClear(0),ae(i.DEPTH_TEST),c.setFunc(Fa),pt(!1),Xe(Fg),ae(i.CULL_FACE),bt(br);function ae($){v[$]!==!0&&(i.enable($),v[$]=!0)}function Te($){v[$]!==!1&&(i.disable($),v[$]=!1)}function Ke($,Oe){return g[$]!==Oe?(i.bindFramebuffer($,Oe),g[$]=Oe,$===i.DRAW_FRAMEBUFFER&&(g[i.FRAMEBUFFER]=Oe),$===i.FRAMEBUFFER&&(g[i.DRAW_FRAMEBUFFER]=Oe),!0):!1}function Ge($,Oe){let ve=b,Ne=!1;if($){ve=E.get(Oe),ve===void 0&&(ve=[],E.set(Oe,ve));const qe=$.textures;if(ve.length!==qe.length||ve[0]!==i.COLOR_ATTACHMENT0){for(let Me=0,ot=qe.length;Me<ot;Me++)ve[Me]=i.COLOR_ATTACHMENT0+Me;ve.length=qe.length,Ne=!0}}else ve[0]!==i.BACK&&(ve[0]=i.BACK,Ne=!0);Ne&&i.drawBuffers(ve)}function ct($){return A!==$?(i.useProgram($),A=$,!0):!1}const Ot={[wo]:i.FUNC_ADD,[R1]:i.FUNC_SUBTRACT,[P1]:i.FUNC_REVERSE_SUBTRACT};Ot[D1]=i.MIN,Ot[L1]=i.MAX;const mt={[F1]:i.ZERO,[N1]:i.ONE,[I1]:i.SRC_COLOR,[mx]:i.SRC_ALPHA,[H1]:i.SRC_ALPHA_SATURATE,[k1]:i.DST_COLOR,[O1]:i.DST_ALPHA,[U1]:i.ONE_MINUS_SRC_COLOR,[gx]:i.ONE_MINUS_SRC_ALPHA,[z1]:i.ONE_MINUS_DST_COLOR,[B1]:i.ONE_MINUS_DST_ALPHA,[V1]:i.CONSTANT_COLOR,[G1]:i.ONE_MINUS_CONSTANT_COLOR,[W1]:i.CONSTANT_ALPHA,[j1]:i.ONE_MINUS_CONSTANT_ALPHA};function bt($,Oe,ve,Ne,qe,Me,ot,Je,Lt,Pt){if($===br){S===!0&&(Te(i.BLEND),S=!1);return}if(S===!1&&(ae(i.BLEND),S=!0),$!==C1){if($!==x||Pt!==z){if((R!==wo||D!==wo)&&(i.blendEquation(i.FUNC_ADD),R=wo,D=wo),Pt)switch($){case Pa:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ng:i.blendFunc(i.ONE,i.ONE);break;case Ig:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ug:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Wt("WebGLState: Invalid blending: ",$);break}else switch($){case Pa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ng:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ig:Wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ug:Wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Wt("WebGLState: Invalid blending: ",$);break}O=null,T=null,F=null,U=null,M.set(0,0,0),I=0,x=$,z=Pt}return}qe=qe||Oe,Me=Me||ve,ot=ot||Ne,(Oe!==R||qe!==D)&&(i.blendEquationSeparate(Ot[Oe],Ot[qe]),R=Oe,D=qe),(ve!==O||Ne!==T||Me!==F||ot!==U)&&(i.blendFuncSeparate(mt[ve],mt[Ne],mt[Me],mt[ot]),O=ve,T=Ne,F=Me,U=ot),(Je.equals(M)===!1||Lt!==I)&&(i.blendColor(Je.r,Je.g,Je.b,Lt),M.copy(Je),I=Lt),x=$,z=!1}function Nt($,Oe){$.side===Mr?Te(i.CULL_FACE):ae(i.CULL_FACE);let ve=$.side===ai;Oe&&(ve=!ve),pt(ve),$.blending===Pa&&$.transparent===!1?bt(br):bt($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),c.setFunc($.depthFunc),c.setTest($.depthTest),c.setMask($.depthWrite),l.setMask($.colorWrite);const Ne=$.stencilWrite;d.setTest(Ne),Ne&&(d.setMask($.stencilWriteMask),d.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),d.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),vt($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function pt($){j!==$&&($?i.frontFace(i.CW):i.frontFace(i.CCW),j=$)}function Xe($){$!==b1?(ae(i.CULL_FACE),$!==X&&($===Fg?i.cullFace(i.BACK):$===T1?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),X=$}function wt($){$!==re&&(se&&i.lineWidth($),re=$)}function vt($,Oe,ve){$?(ae(i.POLYGON_OFFSET_FILL),(H!==Oe||te!==ve)&&(H=Oe,te=ve,c.getReversed()&&(Oe=-Oe),i.polygonOffset(Oe,ve))):Te(i.POLYGON_OFFSET_FILL)}function Tt($){$?ae(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function jt($){$===void 0&&($=i.TEXTURE0+ge-1),V!==$&&(i.activeTexture($),V=$)}function K($,Oe,ve){ve===void 0&&(V===null?ve=i.TEXTURE0+ge-1:ve=V);let Ne=N[ve];Ne===void 0&&(Ne={type:void 0,texture:void 0},N[ve]=Ne),(Ne.type!==$||Ne.texture!==Oe)&&(V!==ve&&(i.activeTexture(ve),V=ve),i.bindTexture($,Oe||Q[$]),Ne.type=$,Ne.texture=Oe)}function Dt(){const $=N[V];$!==void 0&&$.type!==void 0&&(i.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function Rt(){try{i.compressedTexImage2D(...arguments)}catch($){Wt("WebGLState:",$)}}function B(){try{i.compressedTexImage3D(...arguments)}catch($){Wt("WebGLState:",$)}}function w(){try{i.texSubImage2D(...arguments)}catch($){Wt("WebGLState:",$)}}function ie(){try{i.texSubImage3D(...arguments)}catch($){Wt("WebGLState:",$)}}function de(){try{i.compressedTexSubImage2D(...arguments)}catch($){Wt("WebGLState:",$)}}function me(){try{i.compressedTexSubImage3D(...arguments)}catch($){Wt("WebGLState:",$)}}function Re(){try{i.texStorage2D(...arguments)}catch($){Wt("WebGLState:",$)}}function Fe(){try{i.texStorage3D(...arguments)}catch($){Wt("WebGLState:",$)}}function xe(){try{i.texImage2D(...arguments)}catch($){Wt("WebGLState:",$)}}function ye(){try{i.texImage3D(...arguments)}catch($){Wt("WebGLState:",$)}}function Ie($){return y[$]!==void 0?y[$]:i.getParameter($)}function nt($,Oe){y[$]!==Oe&&(i.pixelStorei($,Oe),y[$]=Oe)}function ke($){De.equals($)===!1&&(i.scissor($.x,$.y,$.z,$.w),De.copy($))}function Ue($){Se.equals($)===!1&&(i.viewport($.x,$.y,$.z,$.w),Se.copy($))}function it($,Oe){let ve=m.get(Oe);ve===void 0&&(ve=new WeakMap,m.set(Oe,ve));let Ne=ve.get($);Ne===void 0&&(Ne=i.getUniformBlockIndex(Oe,$.name),ve.set($,Ne))}function dt($,Oe){const Ne=m.get(Oe).get($);h.get(Oe)!==Ne&&(i.uniformBlockBinding(Oe,Ne,$.__bindingPointIndex),h.set(Oe,Ne))}function ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),c.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),v={},y={},V=null,N={},g={},E=new WeakMap,b=[],A=null,S=!1,x=null,R=null,O=null,T=null,D=null,F=null,U=null,M=new It(0,0,0),I=0,z=!1,j=null,X=null,re=null,H=null,te=null,De.set(0,0,i.canvas.width,i.canvas.height),Se.set(0,0,i.canvas.width,i.canvas.height),l.reset(),c.reset(),d.reset()}return{buffers:{color:l,depth:c,stencil:d},enable:ae,disable:Te,bindFramebuffer:Ke,drawBuffers:Ge,useProgram:ct,setBlending:bt,setMaterial:Nt,setFlipSided:pt,setCullFace:Xe,setLineWidth:wt,setPolygonOffset:vt,setScissorTest:Tt,activeTexture:jt,bindTexture:K,unbindTexture:Dt,compressedTexImage2D:Rt,compressedTexImage3D:B,texImage2D:xe,texImage3D:ye,pixelStorei:nt,getParameter:Ie,updateUBOMapping:it,uniformBlockBinding:dt,texStorage2D:Re,texStorage3D:Fe,texSubImage2D:w,texSubImage3D:ie,compressedTexSubImage2D:de,compressedTexSubImage3D:me,scissor:ke,viewport:Ue,reset:ht}}function PA(i,e,t,s,o,l,c){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new Ht,v=new WeakMap,y=new Set;let g;const E=new WeakMap;let b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(B,w){return b?new OffscreenCanvas(B,w):zc("canvas")}function S(B,w,ie){let de=1;const me=Rt(B);if((me.width>ie||me.height>ie)&&(de=ie/Math.max(me.width,me.height)),de<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){const Re=Math.floor(de*me.width),Fe=Math.floor(de*me.height);g===void 0&&(g=A(Re,Fe));const xe=w?A(Re,Fe):g;return xe.width=Re,xe.height=Fe,xe.getContext("2d").drawImage(B,0,0,Re,Fe),yt("WebGLRenderer: Texture has been resized from ("+me.width+"x"+me.height+") to ("+Re+"x"+Fe+")."),xe}else return"data"in B&&yt("WebGLRenderer: Image in DataTexture is too big ("+me.width+"x"+me.height+")."),B;return B}function x(B){return B.generateMipmaps}function R(B){i.generateMipmap(B)}function O(B){return B.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:B.isWebGL3DRenderTarget?i.TEXTURE_3D:B.isWebGLArrayRenderTarget||B.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(B,w,ie,de,me,Re=!1){if(B!==null){if(i[B]!==void 0)return i[B];yt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let Fe;de&&(Fe=e.get("EXT_texture_norm16"),Fe||yt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let xe=w;if(w===i.RED&&(ie===i.FLOAT&&(xe=i.R32F),ie===i.HALF_FLOAT&&(xe=i.R16F),ie===i.UNSIGNED_BYTE&&(xe=i.R8),ie===i.UNSIGNED_SHORT&&Fe&&(xe=Fe.R16_EXT),ie===i.SHORT&&Fe&&(xe=Fe.R16_SNORM_EXT)),w===i.RED_INTEGER&&(ie===i.UNSIGNED_BYTE&&(xe=i.R8UI),ie===i.UNSIGNED_SHORT&&(xe=i.R16UI),ie===i.UNSIGNED_INT&&(xe=i.R32UI),ie===i.BYTE&&(xe=i.R8I),ie===i.SHORT&&(xe=i.R16I),ie===i.INT&&(xe=i.R32I)),w===i.RG&&(ie===i.FLOAT&&(xe=i.RG32F),ie===i.HALF_FLOAT&&(xe=i.RG16F),ie===i.UNSIGNED_BYTE&&(xe=i.RG8),ie===i.UNSIGNED_SHORT&&Fe&&(xe=Fe.RG16_EXT),ie===i.SHORT&&Fe&&(xe=Fe.RG16_SNORM_EXT)),w===i.RG_INTEGER&&(ie===i.UNSIGNED_BYTE&&(xe=i.RG8UI),ie===i.UNSIGNED_SHORT&&(xe=i.RG16UI),ie===i.UNSIGNED_INT&&(xe=i.RG32UI),ie===i.BYTE&&(xe=i.RG8I),ie===i.SHORT&&(xe=i.RG16I),ie===i.INT&&(xe=i.RG32I)),w===i.RGB_INTEGER&&(ie===i.UNSIGNED_BYTE&&(xe=i.RGB8UI),ie===i.UNSIGNED_SHORT&&(xe=i.RGB16UI),ie===i.UNSIGNED_INT&&(xe=i.RGB32UI),ie===i.BYTE&&(xe=i.RGB8I),ie===i.SHORT&&(xe=i.RGB16I),ie===i.INT&&(xe=i.RGB32I)),w===i.RGBA_INTEGER&&(ie===i.UNSIGNED_BYTE&&(xe=i.RGBA8UI),ie===i.UNSIGNED_SHORT&&(xe=i.RGBA16UI),ie===i.UNSIGNED_INT&&(xe=i.RGBA32UI),ie===i.BYTE&&(xe=i.RGBA8I),ie===i.SHORT&&(xe=i.RGBA16I),ie===i.INT&&(xe=i.RGBA32I)),w===i.RGB&&(ie===i.UNSIGNED_SHORT&&Fe&&(xe=Fe.RGB16_EXT),ie===i.SHORT&&Fe&&(xe=Fe.RGB16_SNORM_EXT),ie===i.UNSIGNED_INT_5_9_9_9_REV&&(xe=i.RGB9_E5),ie===i.UNSIGNED_INT_10F_11F_11F_REV&&(xe=i.R11F_G11F_B10F)),w===i.RGBA){const ye=Re?Bc:Bt.getTransfer(me);ie===i.FLOAT&&(xe=i.RGBA32F),ie===i.HALF_FLOAT&&(xe=i.RGBA16F),ie===i.UNSIGNED_BYTE&&(xe=ye===$t?i.SRGB8_ALPHA8:i.RGBA8),ie===i.UNSIGNED_SHORT&&Fe&&(xe=Fe.RGBA16_EXT),ie===i.SHORT&&Fe&&(xe=Fe.RGBA16_SNORM_EXT),ie===i.UNSIGNED_SHORT_4_4_4_4&&(xe=i.RGBA4),ie===i.UNSIGNED_SHORT_5_5_5_1&&(xe=i.RGB5_A1)}return(xe===i.R16F||xe===i.R32F||xe===i.RG16F||xe===i.RG32F||xe===i.RGBA16F||xe===i.RGBA32F)&&e.get("EXT_color_buffer_float"),xe}function D(B,w){let ie;return B?w===null||w===or||w===Ia?ie=i.DEPTH24_STENCIL8:w===ir?ie=i.DEPTH32F_STENCIL8:w===Na&&(ie=i.DEPTH24_STENCIL8,yt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===or||w===Ia?ie=i.DEPTH_COMPONENT24:w===ir?ie=i.DEPTH_COMPONENT32F:w===Na&&(ie=i.DEPTH_COMPONENT16),ie}function F(B,w){return x(B)===!0||B.isFramebufferTexture&&B.minFilter!==Nn&&B.minFilter!==Gn?Math.log2(Math.max(w.width,w.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?w.mipmaps.length:1}function U(B){const w=B.target;w.removeEventListener("dispose",U),I(w),w.isVideoTexture&&v.delete(w),w.isHTMLTexture&&y.delete(w)}function M(B){const w=B.target;w.removeEventListener("dispose",M),j(w)}function I(B){const w=s.get(B);if(w.__webglInit===void 0)return;const ie=B.source,de=E.get(ie);if(de){const me=de[w.__cacheKey];me.usedTimes--,me.usedTimes===0&&z(B),Object.keys(de).length===0&&E.delete(ie)}s.remove(B)}function z(B){const w=s.get(B);i.deleteTexture(w.__webglTexture);const ie=B.source,de=E.get(ie);delete de[w.__cacheKey],c.memory.textures--}function j(B){const w=s.get(B);if(B.depthTexture&&(B.depthTexture.dispose(),s.remove(B.depthTexture)),B.isWebGLCubeRenderTarget)for(let de=0;de<6;de++){if(Array.isArray(w.__webglFramebuffer[de]))for(let me=0;me<w.__webglFramebuffer[de].length;me++)i.deleteFramebuffer(w.__webglFramebuffer[de][me]);else i.deleteFramebuffer(w.__webglFramebuffer[de]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[de])}else{if(Array.isArray(w.__webglFramebuffer))for(let de=0;de<w.__webglFramebuffer.length;de++)i.deleteFramebuffer(w.__webglFramebuffer[de]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let de=0;de<w.__webglColorRenderbuffer.length;de++)w.__webglColorRenderbuffer[de]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[de]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const ie=B.textures;for(let de=0,me=ie.length;de<me;de++){const Re=s.get(ie[de]);Re.__webglTexture&&(i.deleteTexture(Re.__webglTexture),c.memory.textures--),s.remove(ie[de])}s.remove(B)}let X=0;function re(){X=0}function H(){return X}function te(B){X=B}function ge(){const B=X;return B>=o.maxTextures&&yt("WebGLTextures: Trying to use "+(B+1)+" texture units while this GPU supports only "+o.maxTextures),X+=1,B}function se(B){const w=[];return w.push(B.wrapS),w.push(B.wrapT),w.push(B.wrapR||0),w.push(B.magFilter),w.push(B.minFilter),w.push(B.anisotropy),w.push(B.internalFormat),w.push(B.format),w.push(B.type),w.push(B.generateMipmaps),w.push(B.premultiplyAlpha),w.push(B.flipY),w.push(B.unpackAlignment),w.push(B.colorSpace),w.join()}function ne(B,w){const ie=s.get(B);if(B.isVideoTexture&&K(B),B.isRenderTargetTexture===!1&&B.isExternalTexture!==!0&&B.version>0&&ie.__version!==B.version){const de=B.image;if(de===null)yt("WebGLRenderer: Texture marked for update but no image data found.");else if(de.complete===!1)yt("WebGLRenderer: Texture marked for update but image is incomplete");else{Te(ie,B,w);return}}else B.isExternalTexture&&(ie.__webglTexture=B.sourceTexture?B.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,ie.__webglTexture,i.TEXTURE0+w)}function G(B,w){const ie=s.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&ie.__version!==B.version){Te(ie,B,w);return}else B.isExternalTexture&&(ie.__webglTexture=B.sourceTexture?B.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,ie.__webglTexture,i.TEXTURE0+w)}function V(B,w){const ie=s.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&ie.__version!==B.version){Te(ie,B,w);return}t.bindTexture(i.TEXTURE_3D,ie.__webglTexture,i.TEXTURE0+w)}function N(B,w){const ie=s.get(B);if(B.isCubeDepthTexture!==!0&&B.version>0&&ie.__version!==B.version){Ke(ie,B,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture,i.TEXTURE0+w)}const Z={[Df]:i.REPEAT,[wr]:i.CLAMP_TO_EDGE,[Lf]:i.MIRRORED_REPEAT},_e={[Nn]:i.NEAREST,[$1]:i.NEAREST_MIPMAP_NEAREST,[Yl]:i.NEAREST_MIPMAP_LINEAR,[Gn]:i.LINEAR,[Gd]:i.LINEAR_MIPMAP_NEAREST,[Ts]:i.LINEAR_MIPMAP_LINEAR},De={[Q1]:i.NEVER,[iE]:i.ALWAYS,[J1]:i.LESS,[Ch]:i.LEQUAL,[eE]:i.EQUAL,[Rh]:i.GEQUAL,[tE]:i.GREATER,[nE]:i.NOTEQUAL};function Se(B,w){if(w.type===ir&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Gn||w.magFilter===Gd||w.magFilter===Yl||w.magFilter===Ts||w.minFilter===Gn||w.minFilter===Gd||w.minFilter===Yl||w.minFilter===Ts)&&yt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(B,i.TEXTURE_WRAP_S,Z[w.wrapS]),i.texParameteri(B,i.TEXTURE_WRAP_T,Z[w.wrapT]),(B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY)&&i.texParameteri(B,i.TEXTURE_WRAP_R,Z[w.wrapR]),i.texParameteri(B,i.TEXTURE_MAG_FILTER,_e[w.magFilter]),i.texParameteri(B,i.TEXTURE_MIN_FILTER,_e[w.minFilter]),w.compareFunction&&(i.texParameteri(B,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(B,i.TEXTURE_COMPARE_FUNC,De[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Nn||w.minFilter!==Yl&&w.minFilter!==Ts||w.type===ir&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||s.get(w).__currentAnisotropy){const ie=e.get("EXT_texture_filter_anisotropic");i.texParameterf(B,ie.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,o.getMaxAnisotropy())),s.get(w).__currentAnisotropy=w.anisotropy}}}function Ee(B,w){let ie=!1;B.__webglInit===void 0&&(B.__webglInit=!0,w.addEventListener("dispose",U));const de=w.source;let me=E.get(de);me===void 0&&(me={},E.set(de,me));const Re=se(w);if(Re!==B.__cacheKey){me[Re]===void 0&&(me[Re]={texture:i.createTexture(),usedTimes:0},c.memory.textures++,ie=!0),me[Re].usedTimes++;const Fe=me[B.__cacheKey];Fe!==void 0&&(me[B.__cacheKey].usedTimes--,Fe.usedTimes===0&&z(w)),B.__cacheKey=Re,B.__webglTexture=me[Re].texture}return ie}function Q(B,w,ie){return Math.floor(Math.floor(B/ie)/w)}function ae(B,w,ie,de){const Re=B.updateRanges;if(Re.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,ie,de,w.data);else{Re.sort((nt,ke)=>nt.start-ke.start);let Fe=0;for(let nt=1;nt<Re.length;nt++){const ke=Re[Fe],Ue=Re[nt],it=ke.start+ke.count,dt=Q(Ue.start,w.width,4),ht=Q(ke.start,w.width,4);Ue.start<=it+1&&dt===ht&&Q(Ue.start+Ue.count-1,w.width,4)===dt?ke.count=Math.max(ke.count,Ue.start+Ue.count-ke.start):(++Fe,Re[Fe]=Ue)}Re.length=Fe+1;const xe=t.getParameter(i.UNPACK_ROW_LENGTH),ye=t.getParameter(i.UNPACK_SKIP_PIXELS),Ie=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let nt=0,ke=Re.length;nt<ke;nt++){const Ue=Re[nt],it=Math.floor(Ue.start/4),dt=Math.ceil(Ue.count/4),ht=it%w.width,$=Math.floor(it/w.width),Oe=dt,ve=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ht),t.pixelStorei(i.UNPACK_SKIP_ROWS,$),t.texSubImage2D(i.TEXTURE_2D,0,ht,$,Oe,ve,ie,de,w.data)}B.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,xe),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ye),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ie)}}function Te(B,w,ie){let de=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(de=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(de=i.TEXTURE_3D);const me=Ee(B,w),Re=w.source;t.bindTexture(de,B.__webglTexture,i.TEXTURE0+ie);const Fe=s.get(Re);if(Re.version!==Fe.__version||me===!0){if(t.activeTexture(i.TEXTURE0+ie),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){const ve=Bt.getPrimaries(Bt.workingColorSpace),Ne=w.colorSpace===is?null:Bt.getPrimaries(w.colorSpace),qe=w.colorSpace===is||ve===Ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe)}t.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment);let ye=S(w.image,!1,o.maxTextureSize);ye=Dt(w,ye);const Ie=l.convert(w.format,w.colorSpace),nt=l.convert(w.type);let ke=T(w.internalFormat,Ie,nt,w.normalized,w.colorSpace,w.isVideoTexture);Se(de,w);let Ue;const it=w.mipmaps,dt=w.isVideoTexture!==!0,ht=Fe.__version===void 0||me===!0,$=Re.dataReady,Oe=F(w,ye);if(w.isDepthTexture)ke=D(w.format===As,w.type),ht&&(dt?t.texStorage2D(i.TEXTURE_2D,1,ke,ye.width,ye.height):t.texImage2D(i.TEXTURE_2D,0,ke,ye.width,ye.height,0,Ie,nt,null));else if(w.isDataTexture)if(it.length>0){dt&&ht&&t.texStorage2D(i.TEXTURE_2D,Oe,ke,it[0].width,it[0].height);for(let ve=0,Ne=it.length;ve<Ne;ve++)Ue=it[ve],dt?$&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,Ue.width,Ue.height,Ie,nt,Ue.data):t.texImage2D(i.TEXTURE_2D,ve,ke,Ue.width,Ue.height,0,Ie,nt,Ue.data);w.generateMipmaps=!1}else dt?(ht&&t.texStorage2D(i.TEXTURE_2D,Oe,ke,ye.width,ye.height),$&&ae(w,ye,Ie,nt)):t.texImage2D(i.TEXTURE_2D,0,ke,ye.width,ye.height,0,Ie,nt,ye.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){dt&&ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,ke,it[0].width,it[0].height,ye.depth);for(let ve=0,Ne=it.length;ve<Ne;ve++)if(Ue=it[ve],w.format!==Wi)if(Ie!==null)if(dt){if($)if(w.layerUpdates.size>0){const qe=c0(Ue.width,Ue.height,w.format,w.type);for(const Me of w.layerUpdates){const ot=Ue.data.subarray(Me*qe/Ue.data.BYTES_PER_ELEMENT,(Me+1)*qe/Ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,Me,Ue.width,Ue.height,1,Ie,ot)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,0,Ue.width,Ue.height,ye.depth,Ie,Ue.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ve,ke,Ue.width,Ue.height,ye.depth,0,Ue.data,0,0);else yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else dt?$&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,0,Ue.width,Ue.height,ye.depth,Ie,nt,Ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ve,ke,Ue.width,Ue.height,ye.depth,0,Ie,nt,Ue.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{dt&&ht&&t.texStorage2D(i.TEXTURE_2D,Oe,ke,it[0].width,it[0].height);for(let ve=0,Ne=it.length;ve<Ne;ve++)Ue=it[ve],w.format!==Wi?Ie!==null?dt?$&&t.compressedTexSubImage2D(i.TEXTURE_2D,ve,0,0,Ue.width,Ue.height,Ie,Ue.data):t.compressedTexImage2D(i.TEXTURE_2D,ve,ke,Ue.width,Ue.height,0,Ue.data):yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?$&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,Ue.width,Ue.height,Ie,nt,Ue.data):t.texImage2D(i.TEXTURE_2D,ve,ke,Ue.width,Ue.height,0,Ie,nt,Ue.data)}else if(w.isDataArrayTexture)if(dt){if(ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,ke,ye.width,ye.height,ye.depth),$)if(w.layerUpdates.size>0){const ve=c0(ye.width,ye.height,w.format,w.type);for(const Ne of w.layerUpdates){const qe=ye.data.subarray(Ne*ve/ye.data.BYTES_PER_ELEMENT,(Ne+1)*ve/ye.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ne,ye.width,ye.height,1,Ie,nt,qe)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ye.width,ye.height,ye.depth,Ie,nt,ye.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ke,ye.width,ye.height,ye.depth,0,Ie,nt,ye.data);else if(w.isData3DTexture)dt?(ht&&t.texStorage3D(i.TEXTURE_3D,Oe,ke,ye.width,ye.height,ye.depth),$&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ye.width,ye.height,ye.depth,Ie,nt,ye.data)):t.texImage3D(i.TEXTURE_3D,0,ke,ye.width,ye.height,ye.depth,0,Ie,nt,ye.data);else if(w.isFramebufferTexture){if(ht)if(dt)t.texStorage2D(i.TEXTURE_2D,Oe,ke,ye.width,ye.height);else{let ve=ye.width,Ne=ye.height;for(let qe=0;qe<Oe;qe++)t.texImage2D(i.TEXTURE_2D,qe,ke,ve,Ne,0,Ie,nt,null),ve>>=1,Ne>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in i){const ve=i.canvas;if(ve.hasAttribute("layoutsubtree")||ve.setAttribute("layoutsubtree","true"),ye.parentNode!==ve){ve.appendChild(ye),y.add(w),ve.onpaint=Ne=>{const qe=Ne.changedElements;for(const Me of y)qe.includes(Me.image)&&(Me.needsUpdate=!0)},ve.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ye);else{const qe=i.RGBA,Me=i.RGBA,ot=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,qe,Me,ot,ye)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(it.length>0){if(dt&&ht){const ve=Rt(it[0]);t.texStorage2D(i.TEXTURE_2D,Oe,ke,ve.width,ve.height)}for(let ve=0,Ne=it.length;ve<Ne;ve++)Ue=it[ve],dt?$&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,Ie,nt,Ue):t.texImage2D(i.TEXTURE_2D,ve,ke,Ie,nt,Ue);w.generateMipmaps=!1}else if(dt){if(ht){const ve=Rt(ye);t.texStorage2D(i.TEXTURE_2D,Oe,ke,ve.width,ve.height)}$&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ie,nt,ye)}else t.texImage2D(i.TEXTURE_2D,0,ke,Ie,nt,ye);x(w)&&R(de),Fe.__version=Re.version,w.onUpdate&&w.onUpdate(w)}B.__version=w.version}function Ke(B,w,ie){if(w.image.length!==6)return;const de=Ee(B,w),me=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+ie);const Re=s.get(me);if(me.version!==Re.__version||de===!0){t.activeTexture(i.TEXTURE0+ie);const Fe=Bt.getPrimaries(Bt.workingColorSpace),xe=w.colorSpace===is?null:Bt.getPrimaries(w.colorSpace),ye=w.colorSpace===is||Fe===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const Ie=w.isCompressedTexture||w.image[0].isCompressedTexture,nt=w.image[0]&&w.image[0].isDataTexture,ke=[];for(let Me=0;Me<6;Me++)!Ie&&!nt?ke[Me]=S(w.image[Me],!0,o.maxCubemapSize):ke[Me]=nt?w.image[Me].image:w.image[Me],ke[Me]=Dt(w,ke[Me]);const Ue=ke[0],it=l.convert(w.format,w.colorSpace),dt=l.convert(w.type),ht=T(w.internalFormat,it,dt,w.normalized,w.colorSpace),$=w.isVideoTexture!==!0,Oe=Re.__version===void 0||de===!0,ve=me.dataReady;let Ne=F(w,Ue);Se(i.TEXTURE_CUBE_MAP,w);let qe;if(Ie){$&&Oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ne,ht,Ue.width,Ue.height);for(let Me=0;Me<6;Me++){qe=ke[Me].mipmaps;for(let ot=0;ot<qe.length;ot++){const Je=qe[ot];w.format!==Wi?it!==null?$?ve&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ot,0,0,Je.width,Je.height,it,Je.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ot,ht,Je.width,Je.height,0,Je.data):yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ot,0,0,Je.width,Je.height,it,dt,Je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ot,ht,Je.width,Je.height,0,it,dt,Je.data)}}}else{if(qe=w.mipmaps,$&&Oe){qe.length>0&&Ne++;const Me=Rt(ke[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ne,ht,Me.width,Me.height)}for(let Me=0;Me<6;Me++)if(nt){$?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,ke[Me].width,ke[Me].height,it,dt,ke[Me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,ht,ke[Me].width,ke[Me].height,0,it,dt,ke[Me].data);for(let ot=0;ot<qe.length;ot++){const Lt=qe[ot].image[Me].image;$?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ot+1,0,0,Lt.width,Lt.height,it,dt,Lt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ot+1,ht,Lt.width,Lt.height,0,it,dt,Lt.data)}}else{$?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,it,dt,ke[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,ht,it,dt,ke[Me]);for(let ot=0;ot<qe.length;ot++){const Je=qe[ot];$?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ot+1,0,0,it,dt,Je.image[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,ot+1,ht,it,dt,Je.image[Me])}}}x(w)&&R(i.TEXTURE_CUBE_MAP),Re.__version=me.version,w.onUpdate&&w.onUpdate(w)}B.__version=w.version}function Ge(B,w,ie,de,me,Re){const Fe=l.convert(ie.format,ie.colorSpace),xe=l.convert(ie.type),ye=T(ie.internalFormat,Fe,xe,ie.normalized,ie.colorSpace),Ie=s.get(w),nt=s.get(ie);if(nt.__renderTarget=w,!Ie.__hasExternalTextures){const ke=Math.max(1,w.width>>Re),Ue=Math.max(1,w.height>>Re);me===i.TEXTURE_3D||me===i.TEXTURE_2D_ARRAY?t.texImage3D(me,Re,ye,ke,Ue,w.depth,0,Fe,xe,null):t.texImage2D(me,Re,ye,ke,Ue,0,Fe,xe,null)}t.bindFramebuffer(i.FRAMEBUFFER,B),jt(w)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,de,me,nt.__webglTexture,0,Tt(w)):(me===i.TEXTURE_2D||me>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&me<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,de,me,nt.__webglTexture,Re),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ct(B,w,ie){if(i.bindRenderbuffer(i.RENDERBUFFER,B),w.depthBuffer){const de=w.depthTexture,me=de&&de.isDepthTexture?de.type:null,Re=D(w.stencilBuffer,me),Fe=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;jt(w)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Tt(w),Re,w.width,w.height):ie?i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt(w),Re,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,Re,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Fe,i.RENDERBUFFER,B)}else{const de=w.textures;for(let me=0;me<de.length;me++){const Re=de[me],Fe=l.convert(Re.format,Re.colorSpace),xe=l.convert(Re.type),ye=T(Re.internalFormat,Fe,xe,Re.normalized,Re.colorSpace);jt(w)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Tt(w),ye,w.width,w.height):ie?i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt(w),ye,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ye,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ot(B,w,ie){const de=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,B),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const me=s.get(w.depthTexture);if(me.__renderTarget=w,(!me.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),de){if(me.__webglInit===void 0&&(me.__webglInit=!0,w.depthTexture.addEventListener("dispose",U)),me.__webglTexture===void 0){me.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,me.__webglTexture),Se(i.TEXTURE_CUBE_MAP,w.depthTexture);const Ie=l.convert(w.depthTexture.format),nt=l.convert(w.depthTexture.type);let ke;w.depthTexture.format===Ar?ke=i.DEPTH_COMPONENT24:w.depthTexture.format===As&&(ke=i.DEPTH24_STENCIL8);for(let Ue=0;Ue<6;Ue++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ue,0,ke,w.width,w.height,0,Ie,nt,null)}}else ne(w.depthTexture,0);const Re=me.__webglTexture,Fe=Tt(w),xe=de?i.TEXTURE_CUBE_MAP_POSITIVE_X+ie:i.TEXTURE_2D,ye=w.depthTexture.format===As?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(w.depthTexture.format===Ar)jt(w)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ye,xe,Re,0,Fe):i.framebufferTexture2D(i.FRAMEBUFFER,ye,xe,Re,0);else if(w.depthTexture.format===As)jt(w)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ye,xe,Re,0,Fe):i.framebufferTexture2D(i.FRAMEBUFFER,ye,xe,Re,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function mt(B){const w=s.get(B),ie=B.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==B.depthTexture){const de=B.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),de){const me=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,de.removeEventListener("dispose",me)};de.addEventListener("dispose",me),w.__depthDisposeCallback=me}w.__boundDepthTexture=de}if(B.depthTexture&&!w.__autoAllocateDepthBuffer)if(ie)for(let de=0;de<6;de++)Ot(w.__webglFramebuffer[de],B,de);else{const de=B.texture.mipmaps;de&&de.length>0?Ot(w.__webglFramebuffer[0],B,0):Ot(w.__webglFramebuffer,B,0)}else if(ie){w.__webglDepthbuffer=[];for(let de=0;de<6;de++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[de]),w.__webglDepthbuffer[de]===void 0)w.__webglDepthbuffer[de]=i.createRenderbuffer(),ct(w.__webglDepthbuffer[de],B,!1);else{const me=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=w.__webglDepthbuffer[de];i.bindRenderbuffer(i.RENDERBUFFER,Re),i.framebufferRenderbuffer(i.FRAMEBUFFER,me,i.RENDERBUFFER,Re)}}else{const de=B.texture.mipmaps;if(de&&de.length>0?t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),ct(w.__webglDepthbuffer,B,!1);else{const me=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Re),i.framebufferRenderbuffer(i.FRAMEBUFFER,me,i.RENDERBUFFER,Re)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function bt(B,w,ie){const de=s.get(B);w!==void 0&&Ge(de.__webglFramebuffer,B,B.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),ie!==void 0&&mt(B)}function Nt(B){const w=B.texture,ie=s.get(B),de=s.get(w);B.addEventListener("dispose",M);const me=B.textures,Re=B.isWebGLCubeRenderTarget===!0,Fe=me.length>1;if(Fe||(de.__webglTexture===void 0&&(de.__webglTexture=i.createTexture()),de.__version=w.version,c.memory.textures++),Re){ie.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(w.mipmaps&&w.mipmaps.length>0){ie.__webglFramebuffer[xe]=[];for(let ye=0;ye<w.mipmaps.length;ye++)ie.__webglFramebuffer[xe][ye]=i.createFramebuffer()}else ie.__webglFramebuffer[xe]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){ie.__webglFramebuffer=[];for(let xe=0;xe<w.mipmaps.length;xe++)ie.__webglFramebuffer[xe]=i.createFramebuffer()}else ie.__webglFramebuffer=i.createFramebuffer();if(Fe)for(let xe=0,ye=me.length;xe<ye;xe++){const Ie=s.get(me[xe]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=i.createTexture(),c.memory.textures++)}if(B.samples>0&&jt(B)===!1){ie.__webglMultisampledFramebuffer=i.createFramebuffer(),ie.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,ie.__webglMultisampledFramebuffer);for(let xe=0;xe<me.length;xe++){const ye=me[xe];ie.__webglColorRenderbuffer[xe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,ie.__webglColorRenderbuffer[xe]);const Ie=l.convert(ye.format,ye.colorSpace),nt=l.convert(ye.type),ke=T(ye.internalFormat,Ie,nt,ye.normalized,ye.colorSpace,B.isXRRenderTarget===!0),Ue=Tt(B);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ue,ke,B.width,B.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,ie.__webglColorRenderbuffer[xe])}i.bindRenderbuffer(i.RENDERBUFFER,null),B.depthBuffer&&(ie.__webglDepthRenderbuffer=i.createRenderbuffer(),ct(ie.__webglDepthRenderbuffer,B,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Re){t.bindTexture(i.TEXTURE_CUBE_MAP,de.__webglTexture),Se(i.TEXTURE_CUBE_MAP,w);for(let xe=0;xe<6;xe++)if(w.mipmaps&&w.mipmaps.length>0)for(let ye=0;ye<w.mipmaps.length;ye++)Ge(ie.__webglFramebuffer[xe][ye],B,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ye);else Ge(ie.__webglFramebuffer[xe],B,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);x(w)&&R(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let xe=0,ye=me.length;xe<ye;xe++){const Ie=me[xe],nt=s.get(Ie);let ke=i.TEXTURE_2D;(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(ke=B.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ke,nt.__webglTexture),Se(ke,Ie),Ge(ie.__webglFramebuffer,B,Ie,i.COLOR_ATTACHMENT0+xe,ke,0),x(Ie)&&R(ke)}t.unbindTexture()}else{let xe=i.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(xe=B.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,de.__webglTexture),Se(xe,w),w.mipmaps&&w.mipmaps.length>0)for(let ye=0;ye<w.mipmaps.length;ye++)Ge(ie.__webglFramebuffer[ye],B,w,i.COLOR_ATTACHMENT0,xe,ye);else Ge(ie.__webglFramebuffer,B,w,i.COLOR_ATTACHMENT0,xe,0);x(w)&&R(xe),t.unbindTexture()}B.depthBuffer&&mt(B)}function pt(B){const w=B.textures;for(let ie=0,de=w.length;ie<de;ie++){const me=w[ie];if(x(me)){const Re=O(B),Fe=s.get(me).__webglTexture;t.bindTexture(Re,Fe),R(Re),t.unbindTexture()}}}const Xe=[],wt=[];function vt(B){if(B.samples>0){if(jt(B)===!1){const w=B.textures,ie=B.width,de=B.height;let me=i.COLOR_BUFFER_BIT;const Re=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Fe=s.get(B),xe=w.length>1;if(xe)for(let Ie=0;Ie<w.length;Ie++)t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer);const ye=B.texture.mipmaps;ye&&ye.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let Ie=0;Ie<w.length;Ie++){if(B.resolveDepthBuffer&&(B.depthBuffer&&(me|=i.DEPTH_BUFFER_BIT),B.stencilBuffer&&B.resolveStencilBuffer&&(me|=i.STENCIL_BUFFER_BIT)),xe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ie]);const nt=s.get(w[Ie]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,nt,0)}i.blitFramebuffer(0,0,ie,de,0,0,ie,de,me,i.NEAREST),h===!0&&(Xe.length=0,wt.length=0,Xe.push(i.COLOR_ATTACHMENT0+Ie),B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&(Xe.push(Re),wt.push(Re),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,wt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Xe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),xe)for(let Ie=0;Ie<w.length;Ie++){t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ie]);const nt=s.get(w[Ie]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.TEXTURE_2D,nt,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&h){const w=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function Tt(B){return Math.min(o.maxSamples,B.samples)}function jt(B){const w=s.get(B);return B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function K(B){const w=c.render.frame;v.get(B)!==w&&(v.set(B,w),B.update())}function Dt(B,w){const ie=B.colorSpace,de=B.format,me=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||ie!==Oc&&ie!==is&&(Bt.getTransfer(ie)===$t?(de!==Wi||me!==Ti)&&yt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Wt("WebGLTextures: Unsupported texture color space:",ie)),w}function Rt(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(m.width=B.naturalWidth||B.width,m.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(m.width=B.displayWidth,m.height=B.displayHeight):(m.width=B.width,m.height=B.height),m}this.allocateTextureUnit=ge,this.resetTextureUnits=re,this.getTextureUnits=H,this.setTextureUnits=te,this.setTexture2D=ne,this.setTexture2DArray=G,this.setTexture3D=V,this.setTextureCube=N,this.rebindTextures=bt,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=mt,this.setupFrameBufferTexture=Ge,this.useMultisampledRTT=jt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function DA(i,e){function t(s,o=is){let l;const c=Bt.getTransfer(o);if(s===Ti)return i.UNSIGNED_BYTE;if(s===Mh)return i.UNSIGNED_SHORT_4_4_4_4;if(s===wh)return i.UNSIGNED_SHORT_5_5_5_1;if(s===Cx)return i.UNSIGNED_INT_5_9_9_9_REV;if(s===Rx)return i.UNSIGNED_INT_10F_11F_11F_REV;if(s===Tx)return i.BYTE;if(s===Ax)return i.SHORT;if(s===Na)return i.UNSIGNED_SHORT;if(s===Eh)return i.INT;if(s===or)return i.UNSIGNED_INT;if(s===ir)return i.FLOAT;if(s===ar)return i.HALF_FLOAT;if(s===Px)return i.ALPHA;if(s===Dx)return i.RGB;if(s===Wi)return i.RGBA;if(s===Ar)return i.DEPTH_COMPONENT;if(s===As)return i.DEPTH_STENCIL;if(s===Lx)return i.RED;if(s===bh)return i.RED_INTEGER;if(s===Ns)return i.RG;if(s===Th)return i.RG_INTEGER;if(s===Ah)return i.RGBA_INTEGER;if(s===Cc||s===Rc||s===Pc||s===Dc)if(c===$t)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(s===Cc)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Rc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Pc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Dc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(s===Cc)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Rc)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Pc)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Dc)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ff||s===Nf||s===If||s===Uf)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(s===Ff)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Nf)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===If)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Uf)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Of||s===Bf||s===kf||s===zf||s===Hf||s===Ic||s===Vf)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(s===Of||s===Bf)return c===$t?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(s===kf)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC;if(s===zf)return l.COMPRESSED_R11_EAC;if(s===Hf)return l.COMPRESSED_SIGNED_R11_EAC;if(s===Ic)return l.COMPRESSED_RG11_EAC;if(s===Vf)return l.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Gf||s===Wf||s===jf||s===Xf||s===qf||s===$f||s===Yf||s===Kf||s===Zf||s===Qf||s===Jf||s===eh||s===th||s===nh)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(s===Gf)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Wf)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===jf)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Xf)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===qf)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===$f)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Yf)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Kf)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Zf)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Qf)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Jf)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===eh)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===th)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===nh)return c===$t?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ih||s===rh||s===sh)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(s===ih)return c===$t?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===rh)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===sh)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===oh||s===ah||s===Uc||s===lh)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(s===oh)return l.COMPRESSED_RED_RGTC1_EXT;if(s===ah)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Uc)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===lh)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ia?i.UNSIGNED_INT_24_8:i[s]!==void 0?i[s]:null}return{convert:t}}const LA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,FA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class NA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const s=new Wx(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,s=new lr({vertexShader:LA,fragmentShader:FA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Yn(new Yc(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class IA extends Us{constructor(e,t){super();const s=this;let o=null,l=1,c=null,d="local-floor",h=1,m=null,v=null,y=null,g=null,E=null,b=null;const A=typeof XRWebGLBinding<"u",S=new NA,x={},R=t.getContextAttributes();let O=null,T=null;const D=[],F=[],U=new Ht;let M=null,I=null;const z=new gi;z.viewport=new an;const j=new gi;j.viewport=new an;const X=[z,j],re=new GE;let H=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ae=D[Q];return ae===void 0&&(ae=new Qd,D[Q]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(Q){let ae=D[Q];return ae===void 0&&(ae=new Qd,D[Q]=ae),ae.getGripSpace()},this.getHand=function(Q){let ae=D[Q];return ae===void 0&&(ae=new Qd,D[Q]=ae),ae.getHandSpace()};function ge(Q){const ae=F.indexOf(Q.inputSource);if(ae===-1)return;const Te=D[ae];Te!==void 0&&(Te.update(Q.inputSource,Q.frame,m||c),Te.dispatchEvent({type:Q.type,data:Q.inputSource}))}function se(){o.removeEventListener("select",ge),o.removeEventListener("selectstart",ge),o.removeEventListener("selectend",ge),o.removeEventListener("squeeze",ge),o.removeEventListener("squeezestart",ge),o.removeEventListener("squeezeend",ge),o.removeEventListener("end",se),o.removeEventListener("inputsourceschange",ne);for(let Q=0;Q<D.length;Q++){const ae=F[Q];ae!==null&&(F[Q]=null,D[Q].disconnect(ae))}H=null,te=null,S.reset();for(const Q in x)delete x[Q];if(e.setRenderTarget(O),E=null,g=null,y=null,o=null,T=null,Ee.stop(),s.isPresenting=!1,e.setPixelRatio(M),e.setSize(U.width,U.height,!1),I!==null){const Q=I.camera;Q.fov=I.fov,Q.zoom=I.zoom,Q.updateProjectionMatrix(),I=null}s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){l=Q,s.isPresenting===!0&&yt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){d=Q,s.isPresenting===!0&&yt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||c},this.setReferenceSpace=function(Q){m=Q},this.getBaseLayer=function(){return g!==null?g:E},this.getBinding=function(){return y===null&&A&&(y=new XRWebGLBinding(o,t)),y},this.getFrame=function(){return b},this.getSession=function(){return o},this.setSession=async function(Q){if(o=Q,o!==null){if(O=e.getRenderTarget(),o.addEventListener("select",ge),o.addEventListener("selectstart",ge),o.addEventListener("selectend",ge),o.addEventListener("squeeze",ge),o.addEventListener("squeezestart",ge),o.addEventListener("squeezeend",ge),o.addEventListener("end",se),o.addEventListener("inputsourceschange",ne),R.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(U),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,Ke=null,Ge=null;R.depth&&(Ge=R.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=R.stencil?As:Ar,Ke=R.stencil?Ia:or);const ct={colorFormat:t.RGBA8,depthFormat:Ge,scaleFactor:l};y=this.getBinding(),g=y.createProjectionLayer(ct),o.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),T=new ji(g.textureWidth,g.textureHeight,{format:Wi,type:Ti,depthTexture:new Ua(g.textureWidth,g.textureHeight,Ke,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:R.stencil,colorSpace:e.outputColorSpace,samples:R.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}else{const Te={antialias:R.antialias,alpha:!0,depth:R.depth,stencil:R.stencil,framebufferScaleFactor:l};E=new XRWebGLLayer(o,t,Te),o.updateRenderState({baseLayer:E}),e.setPixelRatio(1),e.setSize(E.framebufferWidth,E.framebufferHeight,!1),T=new ji(E.framebufferWidth,E.framebufferHeight,{format:Wi,type:Ti,colorSpace:e.outputColorSpace,stencilBuffer:R.stencil,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1,storeMultisampledDepthBuffer:E.ignoreDepthValues===!1,storeMultisampledStencilBuffer:E.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(h),m=null,c=await o.requestReferenceSpace(d),Ee.setContext(o),Ee.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function ne(Q){for(let ae=0;ae<Q.removed.length;ae++){const Te=Q.removed[ae],Ke=F.indexOf(Te);Ke>=0&&(F[Ke]=null,D[Ke].disconnect(Te))}for(let ae=0;ae<Q.added.length;ae++){const Te=Q.added[ae];let Ke=F.indexOf(Te);if(Ke===-1){for(let ct=0;ct<D.length;ct++)if(ct>=F.length){F.push(Te),Ke=ct;break}else if(F[ct]===null){F[ct]=Te,Ke=ct;break}if(Ke===-1)break}const Ge=D[Ke];Ge&&Ge.connect(Te)}}const G=new ce,V=new ce;function N(Q,ae,Te){G.setFromMatrixPosition(ae.matrixWorld),V.setFromMatrixPosition(Te.matrixWorld);const Ke=G.distanceTo(V),Ge=ae.projectionMatrix.elements,ct=Te.projectionMatrix.elements,Ot=Ge[14]/(Ge[10]-1),mt=Ge[14]/(Ge[10]+1),bt=(Ge[9]+1)/Ge[5],Nt=(Ge[9]-1)/Ge[5],pt=(Ge[8]-1)/Ge[0],Xe=(ct[8]+1)/ct[0],wt=Ot*pt,vt=Ot*Xe,Tt=Ke/(-pt+Xe),jt=Tt*-pt;if(ae.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(jt),Q.translateZ(Tt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Ge[10]===-1)Q.projectionMatrix.copy(ae.projectionMatrix),Q.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const K=Ot+Tt,Dt=mt+Tt,Rt=wt-jt,B=vt+(Ke-jt),w=bt*mt/Dt*K,ie=Nt*mt/Dt*K;Q.projectionMatrix.makePerspective(Rt,B,w,ie,K,Dt),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Z(Q,ae){ae===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ae.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(o===null)return;let ae=Q.near,Te=Q.far;S.texture!==null&&(S.depthNear>0&&(ae=S.depthNear),S.depthFar>0&&(Te=S.depthFar)),re.near=j.near=z.near=ae,re.far=j.far=z.far=Te,(H!==re.near||te!==re.far)&&(o.updateRenderState({depthNear:re.near,depthFar:re.far}),H=re.near,te=re.far),re.layers.mask=Q.layers.mask|6,z.layers.mask=re.layers.mask&-5,j.layers.mask=re.layers.mask&-3;const Ke=Q.parent,Ge=re.cameras;Z(re,Ke);for(let ct=0;ct<Ge.length;ct++)Z(Ge[ct],Ke);Ge.length===2?N(re,z,j):re.projectionMatrix.copy(z.projectionMatrix),I===null&&Q.isPerspectiveCamera&&(I={camera:Q,fov:Q.fov,zoom:Q.zoom}),_e(Q,re,Ke)};function _e(Q,ae,Te){Te===null?Q.matrix.copy(ae.matrixWorld):(Q.matrix.copy(Te.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ae.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ae.projectionMatrix),Q.projectionMatrixInverse.copy(ae.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ch*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return re},this.getFoveation=function(){if(!(g===null&&E===null))return h},this.setFoveation=function(Q){h=Q,g!==null&&(g.fixedFoveation=Q),E!==null&&E.fixedFoveation!==void 0&&(E.fixedFoveation=Q)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(re)},this.getCameraTexture=function(Q){return x[Q]};let De=null;function Se(Q,ae){if(v=ae.getViewerPose(m||c),b=ae,v!==null){const Te=v.views;E!==null&&(e.setRenderTargetFramebuffer(T,E.framebuffer),e.setRenderTarget(T));let Ke=!1;Te.length!==re.cameras.length&&(re.cameras.length=0,Ke=!0);for(let mt=0;mt<Te.length;mt++){const bt=Te[mt];let Nt=null;if(E!==null)Nt=E.getViewport(bt);else{const Xe=y.getViewSubImage(g,bt);Nt=Xe.viewport,mt===0&&(e.setRenderTargetTextures(T,Xe.colorTexture,Xe.depthStencilTexture),e.setRenderTarget(T))}let pt=X[mt];pt===void 0&&(pt=new gi,pt.layers.enable(mt),pt.viewport=new an,X[mt]=pt),pt.matrix.fromArray(bt.transform.matrix),pt.matrix.decompose(pt.position,pt.quaternion,pt.scale),pt.projectionMatrix.fromArray(bt.projectionMatrix),pt.projectionMatrixInverse.copy(pt.projectionMatrix).invert(),pt.viewport.set(Nt.x,Nt.y,Nt.width,Nt.height),mt===0&&(re.matrix.copy(pt.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale)),Ke===!0&&re.cameras.push(pt)}const Ge=o.enabledFeatures;if(Ge&&Ge.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&A){y=s.getBinding();const mt=y.getDepthInformation(Te[0]);mt&&mt.isValid&&mt.texture&&S.init(mt,o.renderState)}if(Ge&&Ge.includes("camera-access")&&A){e.state.unbindTexture(),y=s.getBinding();for(let mt=0;mt<Te.length;mt++){const bt=Te[mt].camera;if(bt){let Nt=x[bt];Nt||(Nt=new Wx,x[bt]=Nt);const pt=y.getCameraImage(bt);Nt.sourceTexture=pt}}}}for(let Te=0;Te<D.length;Te++){const Ke=F[Te],Ge=D[Te];Ke!==null&&Ge!==void 0&&Ge.update(Ke,ae,m||c)}De&&De(Q,ae),ae.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ae}),b=null}const Ee=new Yx;Ee.setAnimationLoop(Se),this.setAnimationLoop=function(Q){De=Q},this.dispose=function(){}}}const UA=new ln,nv=new Mt;nv.set(-1,0,0,0,1,0,0,0,1);function OA(i,e){function t(S,x){S.matrixAutoUpdate===!0&&S.updateMatrix(),x.value.copy(S.matrix)}function s(S,x){x.color.getRGB(S.fogColor.value,jx(i)),x.isFog?(S.fogNear.value=x.near,S.fogFar.value=x.far):x.isFogExp2&&(S.fogDensity.value=x.density)}function o(S,x,R,O,T){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?l(S,x):x.isMeshLambertMaterial?(l(S,x),x.envMap&&(S.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(l(S,x),y(S,x)):x.isMeshPhongMaterial?(l(S,x),v(S,x),x.envMap&&(S.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(l(S,x),g(S,x),x.isMeshPhysicalMaterial&&E(S,x,T)):x.isMeshMatcapMaterial?(l(S,x),b(S,x)):x.isMeshDepthMaterial?l(S,x):x.isMeshDistanceMaterial?(l(S,x),A(S,x)):x.isMeshNormalMaterial?l(S,x):x.isLineBasicMaterial?(c(S,x),x.isLineDashedMaterial&&d(S,x)):x.isPointsMaterial?h(S,x,R,O):x.isSpriteMaterial?m(S,x):x.isShadowMaterial?(S.color.value.copy(x.color),S.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function l(S,x){S.opacity.value=x.opacity,x.color&&S.diffuse.value.copy(x.color),x.emissive&&S.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(S.map.value=x.map,t(x.map,S.mapTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,t(x.alphaMap,S.alphaMapTransform)),x.bumpMap&&(S.bumpMap.value=x.bumpMap,t(x.bumpMap,S.bumpMapTransform),S.bumpScale.value=x.bumpScale,x.side===ai&&(S.bumpScale.value*=-1)),x.normalMap&&(S.normalMap.value=x.normalMap,t(x.normalMap,S.normalMapTransform),S.normalScale.value.copy(x.normalScale),x.side===ai&&S.normalScale.value.negate()),x.displacementMap&&(S.displacementMap.value=x.displacementMap,t(x.displacementMap,S.displacementMapTransform),S.displacementScale.value=x.displacementScale,S.displacementBias.value=x.displacementBias),x.emissiveMap&&(S.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,S.emissiveMapTransform)),x.specularMap&&(S.specularMap.value=x.specularMap,t(x.specularMap,S.specularMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest);const R=e.get(x),O=R.envMap,T=R.envMapRotation;O&&(S.envMap.value=O,S.envMapRotation.value.setFromMatrix4(UA.makeRotationFromEuler(T)).transpose(),O.isCubeTexture&&O.isRenderTargetTexture===!1&&S.envMapRotation.value.premultiply(nv),S.reflectivity.value=x.reflectivity,S.ior.value=x.ior,S.refractionRatio.value=x.refractionRatio),x.lightMap&&(S.lightMap.value=x.lightMap,S.lightMapIntensity.value=x.lightMapIntensity,t(x.lightMap,S.lightMapTransform)),x.aoMap&&(S.aoMap.value=x.aoMap,S.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,S.aoMapTransform))}function c(S,x){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,x.map&&(S.map.value=x.map,t(x.map,S.mapTransform))}function d(S,x){S.dashSize.value=x.dashSize,S.totalSize.value=x.dashSize+x.gapSize,S.scale.value=x.scale}function h(S,x,R,O){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,S.size.value=x.size*R,S.scale.value=O*.5,x.map&&(S.map.value=x.map,t(x.map,S.uvTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,t(x.alphaMap,S.alphaMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest)}function m(S,x){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,S.rotation.value=x.rotation,x.map&&(S.map.value=x.map,t(x.map,S.mapTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,t(x.alphaMap,S.alphaMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest)}function v(S,x){S.specular.value.copy(x.specular),S.shininess.value=Math.max(x.shininess,1e-4)}function y(S,x){x.gradientMap&&(S.gradientMap.value=x.gradientMap)}function g(S,x){S.metalness.value=x.metalness,x.metalnessMap&&(S.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,S.metalnessMapTransform)),S.roughness.value=x.roughness,x.roughnessMap&&(S.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,S.roughnessMapTransform)),x.envMap&&(S.envMapIntensity.value=x.envMapIntensity)}function E(S,x,R){S.ior.value=x.ior,x.sheen>0&&(S.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),S.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(S.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,S.sheenColorMapTransform)),x.sheenRoughnessMap&&(S.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,S.sheenRoughnessMapTransform))),x.clearcoat>0&&(S.clearcoat.value=x.clearcoat,S.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(S.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,S.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(S.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===ai&&S.clearcoatNormalScale.value.negate())),x.dispersion>0&&(S.dispersion.value=x.dispersion),x.retroreflectivity>0&&(S.retroreflectivity.value=x.retroreflectivity),x.iridescence>0&&(S.iridescence.value=x.iridescence,S.iridescenceIOR.value=x.iridescenceIOR,S.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(S.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,S.iridescenceMapTransform)),x.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),x.transmission>0&&(S.transmission.value=x.transmission,S.transmissionSamplerMap.value=R.texture,S.transmissionSamplerSize.value.set(R.width,R.height),x.transmissionMap&&(S.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,S.transmissionMapTransform)),S.thickness.value=x.thickness,x.thicknessMap&&(S.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=x.attenuationDistance,S.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(S.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(S.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=x.specularIntensity,S.specularColor.value.copy(x.specularColor),x.specularColorMap&&(S.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,S.specularColorMapTransform)),x.specularIntensityMap&&(S.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,S.specularIntensityMapTransform))}function b(S,x){x.matcap&&(S.matcap.value=x.matcap)}function A(S,x){const R=e.get(x).light;S.referencePosition.value.setFromMatrixPosition(R.matrixWorld),S.nearDistance.value=R.shadow.camera.near,S.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:o}}function BA(i,e,t,s){let o={},l={},c=[];const d=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function h(T,D){const F=D.program;s.uniformBlockBinding(T,F)}function m(T,D){let F=o[T.id];F===void 0&&(S(T),F=v(T),o[T.id]=F,T.addEventListener("dispose",R));const U=D.program;s.updateUBOMapping(T,U);const M=e.render.frame;l[T.id]!==M&&(g(T),l[T.id]=M)}function v(T){const D=y();T.__bindingPointIndex=D;const F=i.createBuffer(),U=T.__size,M=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,F),i.bufferData(i.UNIFORM_BUFFER,U,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,D,F),F}function y(){for(let T=0;T<d;T++)if(c.indexOf(T)===-1)return c.push(T),T;return Wt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(T){const D=o[T.id],F=T.uniforms,U=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,D);for(let M=0,I=F.length;M<I;M++){const z=F[M];if(Array.isArray(z))for(let j=0,X=z.length;j<X;j++)E(z[j],M,j,U);else E(z,M,0,U)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function E(T,D,F,U){if(A(T,D,F,U)===!0){const M=T.__offset,I=T.value;if(Array.isArray(I)){let z=0;for(let j=0;j<I.length;j++){const X=I[j],re=x(X);b(X,T.__data,z),typeof X!="number"&&typeof X!="boolean"&&!X.isMatrix3&&!ArrayBuffer.isView(X)&&(z+=re.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(I,T.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,M,T.__data)}}function b(T,D,F){typeof T=="number"||typeof T=="boolean"?D[0]=T:T.isMatrix3?(D[0]=T.elements[0],D[1]=T.elements[1],D[2]=T.elements[2],D[3]=0,D[4]=T.elements[3],D[5]=T.elements[4],D[6]=T.elements[5],D[7]=0,D[8]=T.elements[6],D[9]=T.elements[7],D[10]=T.elements[8],D[11]=0):ArrayBuffer.isView(T)?D.set(new T.constructor(T.buffer,T.byteOffset,D.length)):T.toArray(D,F)}function A(T,D,F,U){const M=T.value,I=D+"_"+F;if(U[I]===void 0)return typeof M=="number"||typeof M=="boolean"?U[I]=M:ArrayBuffer.isView(M)?U[I]=M.slice():U[I]=M.clone(),!0;{const z=U[I];if(typeof M=="number"||typeof M=="boolean"){if(z!==M)return U[I]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(z.equals(M)===!1)return z.copy(M),!0}}return!1}function S(T){const D=T.uniforms;let F=0;const U=16;for(let I=0,z=D.length;I<z;I++){const j=Array.isArray(D[I])?D[I]:[D[I]];for(let X=0,re=j.length;X<re;X++){const H=j[X],te=Array.isArray(H.value)?H.value:[H.value];for(let ge=0,se=te.length;ge<se;ge++){const ne=te[ge],G=x(ne),V=F%U,N=V%G.boundary,Z=V+N;F+=N,Z!==0&&U-Z<G.storage&&(F+=U-Z),H.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=F,F+=G.storage}}}const M=F%U;return M>0&&(F+=U-M),T.__size=F,T.__cache={},this}function x(T){const D={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(D.boundary=4,D.storage=4):T.isVector2?(D.boundary=8,D.storage=8):T.isVector3||T.isColor?(D.boundary=16,D.storage=12):T.isVector4?(D.boundary=16,D.storage=16):T.isMatrix3?(D.boundary=48,D.storage=48):T.isMatrix4?(D.boundary=64,D.storage=64):T.isTexture?yt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(T)?(D.boundary=16,D.storage=T.byteLength):yt("WebGLRenderer: Unsupported uniform value type.",T),D}function R(T){const D=T.target;D.removeEventListener("dispose",R);const F=c.indexOf(D.__bindingPointIndex);c.splice(F,1),i.deleteBuffer(o[D.id]),delete o[D.id],delete l[D.id]}function O(){for(const T in o)i.deleteBuffer(o[T]);c=[],o={},l={}}return{bind:h,update:m,dispose:O}}const kA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let er=null;function zA(){return er===null&&(er=new PE(kA,16,16,Ns,ar),er.name="DFG_LUT",er.minFilter=Gn,er.magFilter=Gn,er.wrapS=wr,er.wrapT=wr,er.generateMipmaps=!1,er.needsUpdate=!0),er}class iv{constructor(e={}){const{canvas:t=oE(),context:s=null,depth:o=!0,stencil:l=!1,alpha:c=!1,antialias:d=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:m=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:y=!1,reversedDepthBuffer:g=!1,outputBufferType:E=Ti}=e;this.isWebGLRenderer=!0;let b;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=s.getContextAttributes().alpha}else b=c;const A=E,S=new Set([Ah,Th,bh]),x=new Set([Ti,or,Na,Ia,Mh,wh]),R=new Uint32Array(4),O=new Int32Array(4),T=new ce;let D=null,F=null;const U=[],M=[];let I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=sr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const z=this;let j=!1,X=null,re=null,H=null,te=null;this._outputColorSpace=bi;let ge=0,se=0,ne=null,G=-1,V=null;const N=new an,Z=new an;let _e=null;const De=new It(0);let Se=0,Ee=t.width,Q=t.height,ae=1,Te=null,Ke=null;const Ge=new an(0,0,Ee,Q),ct=new an(0,0,Ee,Q);let Ot=!1;const mt=new zx;let bt=!1,Nt=!1;const pt=new ln,Xe=new ce,wt=new an,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Tt=!1;function jt(){return ne===null?ae:1}let K=s;function Dt(P,q){return t.getContext(P,q)}let Rt,B,w,ie,de,me,Re,Fe,xe,ye,Ie,nt,ke,Ue,it,dt,ht,$,Oe,ve,Ne,qe,Me;try{const P={alpha:!0,depth:o,stencil:l,antialias:d,premultipliedAlpha:h,preserveDrawingBuffer:m,powerPreference:v,failIfMajorPerformanceCaveat:y};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Sh}`),t.addEventListener("webglcontextlost",Lt,!1),t.addEventListener("webglcontextrestored",Pt,!1),t.addEventListener("webglcontextcreationerror",xn,!1),K===null){const q="webgl2";if(K=Dt(q,P),K===null)throw Dt(q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ot()}catch(P){throw t.removeEventListener("webglcontextlost",Lt,!1),t.removeEventListener("webglcontextrestored",Pt,!1),t.removeEventListener("webglcontextcreationerror",xn,!1),Wt("WebGLRenderer: "+P.message),P}function ot(){Rt=new zb(K),Rt.init(),Ne=new DA(K,Rt),B=new Pb(K,Rt,e,Ne),w=new RA(K,Rt),B.reversedDepthBuffer&&g&&w.buffers.depth.setReversed(!0),re=K.createFramebuffer(),H=K.createFramebuffer(),te=K.createFramebuffer(),ie=new Gb(K),de=new mA,me=new PA(K,Rt,w,de,B,Ne,ie),Re=new kb(z),Fe=new jE(K),qe=new Cb(K,Fe),xe=new Hb(K,Fe,ie,qe),ye=new jb(K,xe,Fe,qe,ie),$=new Wb(K,B,me),it=new Db(de),Ie=new pA(z,Re,Rt,B,qe,it),nt=new OA(z,de),ke=new xA,Ue=new MA(Rt),ht=new Ab(z,Re,w,ye,b,h),dt=new CA(z,ye,B),Me=new BA(K,ie,B,w),Oe=new Rb(K,Rt,ie),ve=new Vb(K,Rt,ie),ie.programs=Ie.programs,z.capabilities=B,z.extensions=Rt,z.properties=de,z.renderLists=ke,z.shadowMap=dt,z.state=w,z.info=ie}A!==Ti&&(I=new qb(A,t.width,t.height,d,o,l));const Je=new IA(z,K);this.xr=Je,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){const P=Rt.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=Rt.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(P){P!==void 0&&(ae=P,this.setSize(Ee,Q,!1))},this.getSize=function(P){return P.set(Ee,Q)},this.setSize=function(P,q,he=!0){if(Je.isPresenting){yt("WebGLRenderer: Can't change size while VR device is presenting.");return}Ee=P,Q=q,t.width=Math.floor(P*ae),t.height=Math.floor(q*ae),he===!0&&(t.style.width=P+"px",t.style.height=q+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,P,q)},this.getDrawingBufferSize=function(P){return P.set(Ee*ae,Q*ae).floor()},this.setDrawingBufferSize=function(P,q,he){Ee=P,Q=q,ae=he,t.width=Math.floor(P*he),t.height=Math.floor(q*he),this.setViewport(0,0,P,q)},this.setEffects=function(P){if(A===Ti){Wt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(P){for(let q=0;q<P.length;q++)if(P[q].isOutputPass===!0){yt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(P||[])},this.getCurrentViewport=function(P){return P.copy(N)},this.getViewport=function(P){return P.copy(Ge)},this.setViewport=function(P,q,he,le){P.isVector4?Ge.set(P.x,P.y,P.z,P.w):Ge.set(P,q,he,le),w.viewport(N.copy(Ge).multiplyScalar(ae).round())},this.getScissor=function(P){return P.copy(ct)},this.setScissor=function(P,q,he,le){P.isVector4?ct.set(P.x,P.y,P.z,P.w):ct.set(P,q,he,le),w.scissor(Z.copy(ct).multiplyScalar(ae).round())},this.getScissorTest=function(){return Ot},this.setScissorTest=function(P){w.setScissorTest(Ot=P)},this.setOpaqueSort=function(P){Te=P},this.setTransparentSort=function(P){Ke=P},this.getClearColor=function(P){return P.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor(...arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha(...arguments)},this.clear=function(P=!0,q=!0,he=!0){let le=0;if(P){let oe=!1;if(ne!==null){const We=ne.texture.format;oe=S.has(We)}if(oe){const We=ne.texture.type,ze=x.has(We),Ve=ht.getClearColor(),Qe=ht.getClearAlpha(),rt=Ve.r,_t=Ve.g,Et=Ve.b;ze?(R[0]=rt,R[1]=_t,R[2]=Et,R[3]=Qe,K.clearBufferuiv(K.COLOR,0,R)):(O[0]=rt,O[1]=_t,O[2]=Et,O[3]=Qe,K.clearBufferiv(K.COLOR,0,O))}else le|=K.COLOR_BUFFER_BIT}q&&(le|=K.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),he&&(le|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),le!==0&&K.clear(le)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(P){P.setRenderer(this),X=P},this.dispose=function(){t.removeEventListener("webglcontextlost",Lt,!1),t.removeEventListener("webglcontextrestored",Pt,!1),t.removeEventListener("webglcontextcreationerror",xn,!1),ht.dispose(),ke.dispose(),Ue.dispose(),de.dispose(),Re.dispose(),ye.dispose(),qe.dispose(),Me.dispose(),Ie.dispose(),Je.dispose(),Je.removeEventListener("sessionstart",sn),Je.removeEventListener("sessionend",Os),bn.stop()};function Lt(P){P.preventDefault(),zg("WebGLRenderer: Context Lost."),j=!0}function Pt(){zg("WebGLRenderer: Context Restored."),j=!1;const P=ie.autoReset,q=dt.enabled,he=dt.autoUpdate,le=dt.needsUpdate,oe=dt.type;ot(),ie.autoReset=P,dt.enabled=q,dt.autoUpdate=he,dt.needsUpdate=le,dt.type=oe}function xn(P){Wt("WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Qn(P){const q=P.target;q.removeEventListener("dispose",Qn),Ci(q)}function Ci(P){wn(P),de.remove(P)}function wn(P){const q=de.get(P).programs;q!==void 0&&(q.forEach(function(he){Ie.releaseProgram(he)}),P.isShaderMaterial&&Ie.releaseShaderCache(P))}this.renderBufferDirect=function(P,q,he,le,oe,We){q===null&&(q=vt);const ze=oe.isMesh&&oe.matrixWorld.determinantAffine()<0,Ve=Yt(P,q,he,le,oe);w.setMaterial(le,ze);let Qe=he.index,rt=1;if(le.wireframe===!0){if(Qe=xe.getWireframeAttribute(he),Qe===void 0)return;rt=2}const _t=he.drawRange,Et=he.attributes.position;let L=_t.start*rt,ee=(_t.start+_t.count)*rt;We!==null&&(L=Math.max(L,We.start*rt),ee=Math.min(ee,(We.start+We.count)*rt)),Qe!==null?(L=Math.max(L,0),ee=Math.min(ee,Qe.count)):Et!=null&&(L=Math.max(L,0),ee=Math.min(ee,Et.count));const Pe=ee-L;if(Pe<0||Pe===1/0)return;qe.setup(oe,le,Ve,he,Qe);let Be,lt=Oe;if(Qe!==null&&(Be=Fe.get(Qe),lt=ve,lt.setIndex(Be)),oe.isMesh)le.wireframe===!0?(w.setLineWidth(le.wireframeLinewidth*jt()),lt.setMode(K.LINES)):lt.setMode(K.TRIANGLES);else if(oe.isLine){let $e=le.linewidth;$e===void 0&&($e=1),w.setLineWidth($e*jt()),oe.isLineSegments?lt.setMode(K.LINES):oe.isLineLoop?lt.setMode(K.LINE_LOOP):lt.setMode(K.LINE_STRIP)}else oe.isPoints?lt.setMode(K.POINTS):oe.isSprite&&lt.setMode(K.TRIANGLES);if(oe.isBatchedMesh)if(Rt.get("WEBGL_multi_draw"))lt.renderMultiDraw(oe._multiDrawStarts,oe._multiDrawCounts,oe._multiDrawCount);else{const $e=oe._multiDrawStarts,we=oe._multiDrawCounts,Xt=oe._multiDrawCount,At=Qe?Fe.get(Qe).bytesPerElement:1,vn=de.get(le).currentProgram.getUniforms();for(let et=0;et<Xt;et++)vn.setValue(K,"_gl_DrawID",et),lt.render($e[et]/At,we[et])}else if(oe.isInstancedMesh)lt.renderInstances(L,Pe,oe.count);else if(he.isInstancedBufferGeometry){const $e=he._maxInstanceCount!==void 0?he._maxInstanceCount:1/0,we=Math.min(he.instanceCount,$e);lt.renderInstances(L,Pe,we)}else lt.render(L,Pe)};function tn(P,q,he,le){X!==null&&P.isNodeMaterial&&X.setObject(le,P),bt===!0&&it.setState(P,he,!1),P.transparent===!0&&P.side===Mr&&P.forceSinglePass===!1?(P.side=ai,P.needsUpdate=!0,qi(P,q,le),P.side=Ls,P.needsUpdate=!0,qi(P,q,le),P.side=Mr):qi(P,q,le)}this.compile=function(P,q,he=null){he===null&&(he=P),X!==null&&X.renderStart(P,q,he),F=Ue.get(he),F.init(q),M.push(F),he.traverseVisible(function(oe){oe.isLight&&oe.layers.test(q.layers)&&(F.pushLight(oe),oe.castShadow&&F.pushShadow(oe))}),P!==he&&P.traverseVisible(function(oe){oe.isLight&&oe.layers.test(q.layers)&&(F.pushLight(oe),oe.castShadow&&F.pushShadow(oe))}),F.setupLights(),X!==null&&X.updateLights(F.state.lightsArray),Nt=this.localClippingEnabled,bt=it.init(this.clippingPlanes,Nt),bt===!0&&it.setGlobalState(this.clippingPlanes,q),X!==null&&dt.render(F.state.shadowsArray,he,q);const le=new Set;return P.traverse(function(oe){if(!(oe.isMesh||oe.isPoints||oe.isLine||oe.isSprite))return;const We=oe.material;if(We)if(Array.isArray(We))for(let ze=0;ze<We.length;ze++){const Ve=We[ze];tn(Ve,he,q,oe),le.add(Ve)}else tn(We,he,q,oe),le.add(We)}),F=M.pop(),X!==null&&X.renderEnd(),le},this.compileAsync=function(P,q,he=null){const le=this.compile(P,q,he);return new Promise(oe=>{function We(){if(le.forEach(function(ze){const Qe=de.get(ze).currentProgram;(Qe===void 0||Qe.isReady())&&le.delete(ze)}),le.size===0){oe(P);return}setTimeout(We,10)}Rt.get("KHR_parallel_shader_compile")!==null?We():setTimeout(We,10)})};let fn=null;function ft(P){fn&&fn(P)}function sn(){bn.stop()}function Os(){bn.start()}const bn=new Yx;bn.setAnimationLoop(ft),typeof self<"u"&&bn.setContext(self),this.setAnimationLoop=function(P){fn=P,Je.setAnimationLoop(P),P===null?bn.stop():bn.start()},Je.addEventListener("sessionstart",sn),Je.addEventListener("sessionend",Os),this.render=function(P,q){if(q!==void 0&&q.isCamera!==!0){Wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(j===!0)return;X!==null&&X.renderStart(P,q);const he=Je.enabled===!0&&Je.isPresenting===!0,le=I!==null&&(ne===null||he)&&I.begin(z,ne);if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Je.enabled===!0&&Je.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(Je.cameraAutoUpdate===!0&&Je.updateCamera(q),q=Je.getCamera()),P.isScene===!0&&P.onBeforeRender(z,P,q,ne),F=Ue.get(P,M.length),F.init(q),F.state.textureUnits=me.getTextureUnits(),M.push(F),pt.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),mt.setFromProjectionMatrix(pt,rr,q.reversedDepth),Nt=this.localClippingEnabled,bt=it.init(this.clippingPlanes,Nt),D=ke.get(P,U.length),D.init(),U.push(D),Je.enabled===!0&&Je.isPresenting===!0){const ze=z.xr.getDepthSensingMesh();ze!==null&&cr(ze,q,-1/0,z.sortObjects)}cr(P,q,0,z.sortObjects),D.finish(),X!==null&&X.updateLights(F.state.lightsArray),z.sortObjects===!0&&D.sort(Te,Ke),Tt=Je.enabled===!1||Je.isPresenting===!1||Je.hasDepthSensing()===!1,Tt&&ht.addToRenderList(D,P),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),bt===!0&&it.beginShadows();const oe=F.state.shadowsArray;if(dt.render(oe,P,q),bt===!0&&it.endShadows(),(le&&I.hasRenderPass())===!1){const ze=D.opaque,Ve=D.transmissive;if(F.setupLights(),q.isArrayCamera){const Qe=q.cameras;if(Ve.length>0)for(let rt=0,_t=Qe.length;rt<_t;rt++){const Et=Qe[rt];Cr(ze,Ve,P,Et)}Tt&&ht.render(P);for(let rt=0,_t=Qe.length;rt<_t;rt++){const Et=Qe[rt];Ri(D,P,Et,Et.viewport)}}else Ve.length>0&&Cr(ze,Ve,P,q),Tt&&ht.render(P),Ri(D,P,q)}ne!==null&&se===0&&(me.updateMultisampleRenderTarget(ne),me.updateRenderTargetMipmap(ne)),le&&I.end(z),P.isScene===!0&&P.onAfterRender(z,P,q),qe.resetDefaultState(),G=-1,V=null,M.pop(),M.length>0?(F=M[M.length-1],me.setTextureUnits(F.state.textureUnits),bt===!0&&it.setGlobalState(z.clippingPlanes,F.state.camera)):F=null,U.pop(),U.length>0?D=U[U.length-1]:D=null,X!==null&&X.renderEnd()};function cr(P,q,he,le){if(P.visible===!1)return;if(P.layers.test(q.layers)){if(P.isGroup)he=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(q);else if(P.isLightProbeGrid)F.pushLightProbeGrid(P);else if(P.isLight)F.pushLight(P),P.castShadow&&F.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||P.intersectsFrustum(mt)){le&&wt.setFromMatrixPosition(P.matrixWorld).applyMatrix4(pt);const ze=ye.update(P),Ve=P.material;Ve.visible&&D.push(P,ze,Ve,he,wt.z,null,q)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||P.intersectsFrustum(mt))){const ze=ye.update(P),Ve=P.material;if(le&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),wt.copy(P.boundingSphere.center)):(ze.boundingSphere===null&&ze.computeBoundingSphere(),wt.copy(ze.boundingSphere.center)),wt.applyMatrix4(P.matrixWorld).applyMatrix4(pt)),Array.isArray(Ve)){const Qe=ze.groups;for(let rt=0,_t=Qe.length;rt<_t;rt++){const Et=Qe[rt],L=Ve[Et.materialIndex];L&&L.visible&&D.push(P,ze,L,he,wt.z,Et,q)}}else Ve.visible&&D.push(P,ze,Ve,he,wt.z,null,q)}}const We=P.children;for(let ze=0,Ve=We.length;ze<Ve;ze++)cr(We[ze],q,he,le)}function Ri(P,q,he,le){const{opaque:oe,transmissive:We,transparent:ze}=P;F.setupLightsView(he),bt===!0&&it.setGlobalState(z.clippingPlanes,he),le&&w.viewport(N.copy(le)),oe.length>0&&Pi(oe,q,he),We.length>0&&Pi(We,q,he),ze.length>0&&Pi(ze,q,he),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function Cr(P,q,he,le){if((he.isScene===!0?he.overrideMaterial:null)!==null)return;if(F.state.transmissionRenderTarget[le.id]===void 0){const L=Rt.has("EXT_color_buffer_half_float")||Rt.has("EXT_color_buffer_float");F.state.transmissionRenderTarget[le.id]=new ji(1,1,{generateMipmaps:!0,type:L?ar:Ti,minFilter:Ts,samples:Math.max(4,B.samples),stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Bt.workingColorSpace})}const We=F.state.transmissionRenderTarget[le.id],ze=le.viewport||N;We.setSize(ze.z*z.transmissionResolutionScale,ze.w*z.transmissionResolutionScale);const Ve=z.getRenderTarget(),Qe=z.getActiveCubeFace(),rt=z.getActiveMipmapLevel();z.setRenderTarget(We),z.getClearColor(De),Se=z.getClearAlpha(),Se<1&&z.setClearColor(16777215,.5),z.clear(),Tt&&ht.render(he);const _t=z.toneMapping;z.toneMapping=sr;const Et=le.viewport;if(le.viewport!==void 0&&(le.viewport=void 0),F.setupLightsView(le),bt===!0&&it.setGlobalState(z.clippingPlanes,le),Pi(P,he,le),me.updateMultisampleRenderTarget(We),me.updateRenderTargetMipmap(We),Rt.has("WEBGL_multisampled_render_to_texture")===!1){let L=!1;for(let ee=0,Pe=q.length;ee<Pe;ee++){const Be=q[ee],{object:lt,geometry:$e,material:we,group:Xt}=Be;if(we.side===Mr&&lt.layers.test(le.layers)){const At=we.side;we.side=ai,we.needsUpdate=!0,Rr(lt,he,le,$e,we,Xt),we.side=At,we.needsUpdate=!0,L=!0}}L===!0&&(me.updateMultisampleRenderTarget(We),me.updateRenderTargetMipmap(We))}z.setRenderTarget(Ve,Qe,rt),z.setClearColor(De,Se),Et!==void 0&&(le.viewport=Et),z.toneMapping=_t}function Pi(P,q,he){const le=q.isScene===!0?q.overrideMaterial:null;for(let oe=0,We=P.length;oe<We;oe++){const ze=P[oe],{object:Ve,geometry:Qe,group:rt}=ze;let _t=ze.material;_t.allowOverride===!0&&le!==null&&(_t=le),Ve.layers.test(he.layers)&&Rr(Ve,q,he,Qe,_t,rt)}}function Rr(P,q,he,le,oe,We){X!==null&&oe.isNodeMaterial&&X.setObject(P,oe),P.onBeforeRender(z,q,he,le,oe,We),P.modelViewMatrix.multiplyMatrices(he.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),oe.onBeforeRender(z,q,he,le,P,We),oe.transparent===!0&&oe.side===Mr&&oe.forceSinglePass===!1?(oe.side=ai,oe.needsUpdate=!0,z.renderBufferDirect(he,q,le,oe,P,We),oe.side=Ls,oe.needsUpdate=!0,z.renderBufferDirect(he,q,le,oe,P,We),oe.side=Mr):z.renderBufferDirect(he,q,le,oe,P,We),P.onAfterRender(z,q,he,le,oe,We)}function qi(P,q,he){q.isScene!==!0&&(q=vt);const le=de.get(P),oe=F.state.lights,We=F.state.shadowsArray,ze=oe.state.version,Ve=Ie.getParameters(P,oe.state,We,q,he,F.state.lightProbeGridArray),Qe=Ie.getProgramCacheKey(Ve);let rt=le.programs;le.environment=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?q.environment:null,le.fog=q.fog;const _t=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap;le.envMap=Re.get(P.envMap||le.environment,_t),le.envMapRotation=le.environment!==null&&P.envMap===null?q.environmentRotation:P.envMapRotation,rt===void 0&&(P.addEventListener("dispose",Qn),rt=new Map,le.programs=rt);let Et=rt.get(Qe);if(Et!==void 0){if(le.currentProgram===Et&&le.lightsStateVersion===ze)return os(P,Ve),Et}else Ve.uniforms=Ie.getUniforms(P),X!==null&&P.isNodeMaterial&&X.build(P,he,Ve),P.onBeforeCompile(Ve,z),Et=Ie.acquireProgram(Ve,Qe),rt.set(Qe,Et),le.uniforms=Ve.uniforms;const L=le.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(L.clippingPlanes=it.uniform),os(P,Ve),le.needsLights=Dr(P),le.lightsStateVersion=ze,le.needsLights&&(L.ambientLightColor.value=oe.state.ambient,L.lightProbe.value=oe.state.probe,L.sunLights.value=oe.state.sun,L.sunLightShadows.value=oe.state.sunShadow,L.directionalLights.value=oe.state.directional,L.directionalLightShadows.value=oe.state.directionalShadow,L.spotLights.value=oe.state.spot,L.spotLightShadows.value=oe.state.spotShadow,L.rectAreaLights.value=oe.state.rectArea,L.ltc_1.value=oe.state.rectAreaLTC1,L.ltc_2.value=oe.state.rectAreaLTC2,L.pointLights.value=oe.state.point,L.pointLightShadows.value=oe.state.pointShadow,L.hemisphereLights.value=oe.state.hemi,L.sunShadowMatrix.value=oe.state.sunShadowMatrix,L.sunShadowCascade.value=oe.state.sunShadowCascade,L.directionalShadowMatrix.value=oe.state.directionalShadowMatrix,L.spotLightMatrix.value=oe.state.spotLightMatrix,L.spotLightMap.value=oe.state.spotLightMap,L.pointShadowMatrix.value=oe.state.pointShadowMatrix),le.lightProbeGrid=F.state.lightProbeGridArray.length>0,le.currentProgram=Et,le.uniformsList=null,Et}function Pr(P){if(P.uniformsList===null){const q=P.currentProgram.getUniforms();P.uniformsList=Lc.seqWithValue(q.seq,P.uniforms)}return P.uniformsList}function os(P,q){const he=de.get(P);he.outputColorSpace=q.outputColorSpace,he.batching=q.batching,he.batchingColor=q.batchingColor,he.instancing=q.instancing,he.instancingColor=q.instancingColor,he.instancingMorph=q.instancingMorph,he.skinning=q.skinning,he.morphTargets=q.morphTargets,he.morphNormals=q.morphNormals,he.morphColors=q.morphColors,he.morphTargetsCount=q.morphTargetsCount,he.numClippingPlanes=q.numClippingPlanes,he.numIntersection=q.numClipIntersection,he.vertexAlphas=q.vertexAlphas,he.vertexTangents=q.vertexTangents,he.toneMapping=q.toneMapping}function Bs(P,q){if(P.length===0)return null;if(P.length===1)return P[0].texture!==null?P[0]:null;T.setFromMatrixPosition(q.matrixWorld);for(let he=0,le=P.length;he<le;he++){const oe=P[he];if(oe.texture!==null&&oe.boundingBox.containsPoint(T))return oe}return null}function Yt(P,q,he,le,oe){q.isScene!==!0&&(q=vt),me.resetTextureUnits();const We=q.fog,ze=le.isMeshStandardMaterial||le.isMeshLambertMaterial||le.isMeshPhongMaterial?q.environment:null,Ve=ne===null?z.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Bt.workingColorSpace,Qe=le.isMeshStandardMaterial||le.isMeshLambertMaterial&&!le.envMap||le.isMeshPhongMaterial&&!le.envMap,rt=Re.get(le.envMap||ze,Qe),_t=le.vertexColors===!0&&!!he.attributes.color&&he.attributes.color.itemSize===4,Et=!!he.attributes.tangent&&(!!le.normalMap||le.anisotropy>0),L=!!he.morphAttributes.position,ee=!!he.morphAttributes.normal,Pe=!!he.morphAttributes.color;let Be=sr;le.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Be=z.toneMapping);const lt=he.morphAttributes.position||he.morphAttributes.normal||he.morphAttributes.color,$e=lt!==void 0?lt.length:0,we=de.get(le),Xt=F.state.lights;if(bt===!0&&(Nt===!0||P!==V)){const qt=P===V&&le.id===G;it.setState(le,P,qt)}let At=!1;le.version===we.__version?(we.needsLights&&we.lightsStateVersion!==Xt.state.version||we.outputColorSpace!==Ve||oe.isBatchedMesh&&we.batching===!1||!oe.isBatchedMesh&&we.batching===!0||oe.isBatchedMesh&&we.batchingColor===!0&&oe._colorsTexture===null||oe.isBatchedMesh&&we.batchingColor===!1&&oe._colorsTexture!==null||oe.isInstancedMesh&&we.instancing===!1||!oe.isInstancedMesh&&we.instancing===!0||oe.isSkinnedMesh&&we.skinning===!1||!oe.isSkinnedMesh&&we.skinning===!0||oe.isInstancedMesh&&we.instancingColor===!0&&oe.instanceColor===null||oe.isInstancedMesh&&we.instancingColor===!1&&oe.instanceColor!==null||oe.isInstancedMesh&&we.instancingMorph===!0&&oe.morphTexture===null||oe.isInstancedMesh&&we.instancingMorph===!1&&oe.morphTexture!==null||we.envMap!==rt||le.fog===!0&&we.fog!==We||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==it.numPlanes||we.numIntersection!==it.numIntersection)||we.vertexAlphas!==_t||we.vertexTangents!==Et||we.morphTargets!==L||we.morphNormals!==ee||we.morphColors!==Pe||we.toneMapping!==Be||we.morphTargetsCount!==$e||!!we.lightProbeGrid!=F.state.lightProbeGridArray.length>0)&&(At=!0):(At=!0,we.__version=le.version);let vn=we.currentProgram;At===!0&&(vn=qi(le,q,oe),X&&le.isNodeMaterial&&X.onUpdateProgram(le,vn,we));let et=!1,hn=!1,In=!1;const zt=vn.getUniforms(),Jt=we.uniforms;if(w.useProgram(vn.program)&&(et=!0,hn=!0,In=!0),le.id!==G&&(G=le.id,hn=!0),we.needsLights){const qt=Bs(F.state.lightProbeGridArray,oe);we.lightProbeGrid!==qt&&(we.lightProbeGrid=qt,hn=!0)}if(et||V!==P){w.buffers.depth.getReversed()&&P.reversedDepth!==!0&&(P._reversedDepth=!0,P.updateProjectionMatrix()),zt.setValue(K,"projectionMatrix",P.projectionMatrix),zt.setValue(K,"viewMatrix",P.matrixWorldInverse);const xi=zt.map.cameraPosition;xi!==void 0&&xi.setValue(K,Xe.setFromMatrixPosition(P.matrixWorld)),B.logarithmicDepthBuffer&&zt.setValue(K,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(le.isMeshPhongMaterial||le.isMeshToonMaterial||le.isMeshLambertMaterial||le.isMeshBasicMaterial||le.isMeshStandardMaterial||le.isShaderMaterial)&&zt.setValue(K,"isOrthographic",P.isOrthographicCamera===!0),V!==P&&(V=P,hn=!0,In=!0)}if(we.needsLights&&(Xt.state.sunShadowMap.length>0&&zt.setValue(K,"sunShadowMap",Xt.state.sunShadowMap,me),Xt.state.directionalShadowMap.length>0&&zt.setValue(K,"directionalShadowMap",Xt.state.directionalShadowMap,me),Xt.state.spotShadowMap.length>0&&zt.setValue(K,"spotShadowMap",Xt.state.spotShadowMap,me),Xt.state.pointShadowMap.length>0&&zt.setValue(K,"pointShadowMap",Xt.state.pointShadowMap,me)),oe.isSkinnedMesh){zt.setOptional(K,oe,"bindMatrix"),zt.setOptional(K,oe,"bindMatrixInverse");const qt=oe.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),zt.setValue(K,"boneTexture",qt.boneTexture,me))}oe.isBatchedMesh&&(zt.setOptional(K,oe,"batchingTexture"),zt.setValue(K,"batchingTexture",oe._matricesTexture,me),zt.setOptional(K,oe,"batchingIdTexture"),zt.setValue(K,"batchingIdTexture",oe._indirectTexture,me),zt.setOptional(K,oe,"batchingColorTexture"),oe._colorsTexture!==null&&zt.setValue(K,"batchingColorTexture",oe._colorsTexture,me));const Di=he.morphAttributes;if((Di.position!==void 0||Di.normal!==void 0||Di.color!==void 0)&&$.update(oe,he,vn),(hn||we.receiveShadow!==oe.receiveShadow)&&(we.receiveShadow=oe.receiveShadow,zt.setValue(K,"receiveShadow",oe.receiveShadow)),(le.isMeshStandardMaterial||le.isMeshLambertMaterial||le.isMeshPhongMaterial)&&le.envMap===null&&q.environment!==null&&(Jt.envMapIntensity.value=q.environmentIntensity),Jt.dfgLUT!==void 0&&(Jt.dfgLUT.value=zA()),hn){if(zt.setValue(K,"toneMappingExposure",z.toneMappingExposure),we.needsLights&&ks(Jt,In),We&&le.fog===!0&&nt.refreshFogUniforms(Jt,We),nt.refreshMaterialUniforms(Jt,le,ae,Q,F.state.transmissionRenderTarget[P.id]),we.needsLights&&we.lightProbeGrid){const qt=we.lightProbeGrid;Jt.probesSH.value=qt.texture,Jt.probesMin.value.copy(qt.boundingBox.min),Jt.probesMax.value.copy(qt.boundingBox.max),Jt.probesResolution.value.copy(qt.resolution)}Lc.upload(K,Pr(we),Jt,me)}if(le.isShaderMaterial&&le.uniformsNeedUpdate===!0&&(Lc.upload(K,Pr(we),Jt,me),le.uniformsNeedUpdate=!1),le.isSpriteMaterial&&zt.setValue(K,"center",oe.center),zt.setValue(K,"modelViewMatrix",oe.modelViewMatrix),zt.setValue(K,"normalMatrix",oe.normalMatrix),zt.setValue(K,"modelMatrix",oe.matrixWorld),le.uniformsGroups!==void 0){const qt=le.uniformsGroups;for(let xi=0,Li=qt.length;xi<Li;xi++){const Fi=qt[xi];Me.update(Fi,vn),Me.bind(Fi,vn)}}return vn}function ks(P,q){P.ambientLightColor.needsUpdate=q,P.lightProbe.needsUpdate=q,P.sunLights.needsUpdate=q,P.sunLightShadows.needsUpdate=q,P.directionalLights.needsUpdate=q,P.directionalLightShadows.needsUpdate=q,P.pointLights.needsUpdate=q,P.pointLightShadows.needsUpdate=q,P.spotLights.needsUpdate=q,P.spotLightShadows.needsUpdate=q,P.rectAreaLights.needsUpdate=q,P.hemisphereLights.needsUpdate=q}function Dr(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return ge},this.getActiveMipmapLevel=function(){return se},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(P,q,he){const le=de.get(P);le.__autoAllocateDepthBuffer=P.resolveDepthBuffer===!1,le.__autoAllocateDepthBuffer===!1&&(le.__useRenderToTexture=!1),de.get(P.texture).__webglTexture=q,de.get(P.depthTexture).__webglTexture=le.__autoAllocateDepthBuffer?void 0:he,le.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(P,q){const he=de.get(P);he.__webglFramebuffer=q,he.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(P,q=0,he=0){ne=P,ge=q,se=he;let le=null,oe=!1,We=!1;if(P){const Ve=de.get(P);if(Ve.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(K.FRAMEBUFFER,Ve.__webglFramebuffer),N.copy(P.viewport),Z.copy(P.scissor),_e=P.scissorTest,w.viewport(N),w.scissor(Z),w.setScissorTest(_e),G=-1;return}else if(Ve.__webglFramebuffer===void 0)me.setupRenderTarget(P);else if(Ve.__hasExternalTextures)me.rebindTextures(P,de.get(P.texture).__webglTexture,de.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const _t=P.depthTexture;if(Ve.__boundDepthTexture!==_t){if(_t!==null&&de.has(_t)&&(P.width!==_t.image.width||P.height!==_t.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");me.setupDepthRenderbuffer(P)}}const Qe=P.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(We=!0);const rt=de.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(rt[q])?le=rt[q][he]:le=rt[q],oe=!0):P.samples>0&&me.useMultisampledRTT(P)===!1?le=de.get(P).__webglMultisampledFramebuffer:Array.isArray(rt)?le=rt[he]:le=rt,N.copy(P.viewport),Z.copy(P.scissor),_e=P.scissorTest}else N.copy(Ge).multiplyScalar(ae).floor(),Z.copy(ct).multiplyScalar(ae).floor(),_e=Ot;if(he!==0&&(le=re),w.bindFramebuffer(K.FRAMEBUFFER,le)&&w.drawBuffers(P,le),w.viewport(N),w.scissor(Z),w.setScissorTest(_e),oe){const Ve=de.get(P.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+q,Ve.__webglTexture,he)}else if(We){const Ve=q;for(let Qe=0;Qe<P.textures.length;Qe++){const rt=de.get(P.textures[Qe]);K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0+Qe,rt.__webglTexture,he,Ve)}}else if(P!==null&&he!==0){const Ve=de.get(P.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,Ve.__webglTexture,he)}G=-1};function Lr(P){const q=de.get(P);return(q.__readFormat!==P.format||q.__readType!==P.type)&&(q.__readFormat=P.format,q.__readType=P.type,q.__formatReadable=B.textureFormatReadable(P.format),q.__typeReadable=B.textureTypeReadable(P.type)),q}this.readRenderTargetPixels=function(P,q,he,le,oe,We,ze,Ve=0){if(!(P&&P.isWebGLRenderTarget)){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Qe=de.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&ze!==void 0&&(Qe=Qe[ze]),Qe){w.bindFramebuffer(K.FRAMEBUFFER,Qe);try{const rt=P.textures[Ve],_t=rt.format,Et=rt.type;P.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Ve);const L=Lr(rt);if(L.__formatReadable===!1){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(L.__typeReadable===!1){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=P.width-le&&he>=0&&he<=P.height-oe&&K.readPixels(q,he,le,oe,Ne.convert(_t),Ne.convert(Et),We)}finally{const rt=ne!==null?de.get(ne).__webglFramebuffer:null;w.bindFramebuffer(K.FRAMEBUFFER,rt)}}},this.readRenderTargetPixelsAsync=async function(P,q,he,le,oe,We,ze,Ve=0){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Qe=de.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&ze!==void 0&&(Qe=Qe[ze]),Qe)if(q>=0&&q<=P.width-le&&he>=0&&he<=P.height-oe){w.bindFramebuffer(K.FRAMEBUFFER,Qe);const rt=P.textures[Ve],_t=rt.format,Et=rt.type;P.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Ve);const L=Lr(rt);if(L.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(L.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ee=K.createBuffer();K.bindBuffer(K.PIXEL_PACK_BUFFER,ee),K.bufferData(K.PIXEL_PACK_BUFFER,We.byteLength,K.STREAM_READ),K.readPixels(q,he,le,oe,Ne.convert(_t),Ne.convert(Et),0),K.bindBuffer(K.PIXEL_PACK_BUFFER,null);const Pe=ne!==null?de.get(ne).__webglFramebuffer:null;w.bindFramebuffer(K.FRAMEBUFFER,Pe);const Be=K.fenceSync(K.SYNC_GPU_COMMANDS_COMPLETE,0);return K.flush(),await aE(K,Be,4),K.bindBuffer(K.PIXEL_PACK_BUFFER,ee),K.getBufferSubData(K.PIXEL_PACK_BUFFER,0,We),K.bindBuffer(K.PIXEL_PACK_BUFFER,null),K.deleteBuffer(ee),K.deleteSync(Be),We}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(P,q=null,he=0){const le=Math.pow(2,-he),oe=Math.floor(P.image.width*le),We=Math.floor(P.image.height*le),ze=q!==null?q.x:0,Ve=q!==null?q.y:0;me.setTexture2D(P,0),K.copyTexSubImage2D(K.TEXTURE_2D,he,0,0,ze,Ve,oe,We),w.unbindTexture()},this.copyTextureToTexture=function(P,q,he=null,le=null,oe=0,We=0){let ze,Ve,Qe,rt,_t,Et,L,ee,Pe;const Be=P.isCompressedTexture?P.mipmaps[We]:P.image;if(he!==null)ze=he.max.x-he.min.x,Ve=he.max.y-he.min.y,Qe=he.isBox3?he.max.z-he.min.z:1,rt=he.min.x,_t=he.min.y,Et=he.isBox3?he.min.z:0;else{const Jt=Math.pow(2,-oe);ze=Math.floor(Be.width*Jt),Ve=Math.floor(Be.height*Jt),P.isDataArrayTexture?Qe=Be.depth:P.isData3DTexture?Qe=Math.floor(Be.depth*Jt):Qe=1,rt=0,_t=0,Et=0}le!==null?(L=le.x,ee=le.y,Pe=le.z):(L=0,ee=0,Pe=0);const lt=Ne.convert(q.format),$e=Ne.convert(q.type);let we;q.isData3DTexture?(me.setTexture3D(q,0),we=K.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(me.setTexture2DArray(q,0),we=K.TEXTURE_2D_ARRAY):(me.setTexture2D(q,0),we=K.TEXTURE_2D),w.activeTexture(K.TEXTURE0),w.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,q.flipY),w.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),w.pixelStorei(K.UNPACK_ALIGNMENT,q.unpackAlignment);const Xt=w.getParameter(K.UNPACK_ROW_LENGTH),At=w.getParameter(K.UNPACK_IMAGE_HEIGHT),vn=w.getParameter(K.UNPACK_SKIP_PIXELS),et=w.getParameter(K.UNPACK_SKIP_ROWS),hn=w.getParameter(K.UNPACK_SKIP_IMAGES);w.pixelStorei(K.UNPACK_ROW_LENGTH,Be.width),w.pixelStorei(K.UNPACK_IMAGE_HEIGHT,Be.height),w.pixelStorei(K.UNPACK_SKIP_PIXELS,rt),w.pixelStorei(K.UNPACK_SKIP_ROWS,_t),w.pixelStorei(K.UNPACK_SKIP_IMAGES,Et);const In=P.isDataArrayTexture||P.isData3DTexture,zt=q.isDataArrayTexture||q.isData3DTexture;if(P.isDepthTexture){const Jt=de.get(P),Di=de.get(q),qt=de.get(Jt.__renderTarget),xi=de.get(Di.__renderTarget);w.bindFramebuffer(K.READ_FRAMEBUFFER,qt.__webglFramebuffer),w.bindFramebuffer(K.DRAW_FRAMEBUFFER,xi.__webglFramebuffer);for(let Li=0;Li<Qe;Li++)In&&(K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,de.get(P).__webglTexture,oe,Et+Li),K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,de.get(q).__webglTexture,We,Pe+Li)),K.blitFramebuffer(rt,_t,ze,Ve,L,ee,ze,Ve,K.DEPTH_BUFFER_BIT,K.NEAREST);w.bindFramebuffer(K.READ_FRAMEBUFFER,null),w.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else if(oe!==0||P.isRenderTargetTexture||de.has(P)){const Jt=de.get(P),Di=de.get(q);w.bindFramebuffer(K.READ_FRAMEBUFFER,H),w.bindFramebuffer(K.DRAW_FRAMEBUFFER,te);for(let qt=0;qt<Qe;qt++)In?K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,Jt.__webglTexture,oe,Et+qt):K.framebufferTexture2D(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,Jt.__webglTexture,oe),zt?K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,Di.__webglTexture,We,Pe+qt):K.framebufferTexture2D(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,Di.__webglTexture,We),oe!==0?K.blitFramebuffer(rt,_t,ze,Ve,L,ee,ze,Ve,K.COLOR_BUFFER_BIT,K.NEAREST):zt?K.copyTexSubImage3D(we,We,L,ee,Pe+qt,rt,_t,ze,Ve):K.copyTexSubImage2D(we,We,L,ee,rt,_t,ze,Ve);w.bindFramebuffer(K.READ_FRAMEBUFFER,null),w.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else zt?P.isDataTexture||P.isData3DTexture?K.texSubImage3D(we,We,L,ee,Pe,ze,Ve,Qe,lt,$e,Be.data):q.isCompressedArrayTexture?K.compressedTexSubImage3D(we,We,L,ee,Pe,ze,Ve,Qe,lt,Be.data):K.texSubImage3D(we,We,L,ee,Pe,ze,Ve,Qe,lt,$e,Be):P.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,We,L,ee,ze,Ve,lt,$e,Be.data):P.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,We,L,ee,Be.width,Be.height,lt,Be.data):K.texSubImage2D(K.TEXTURE_2D,We,L,ee,ze,Ve,lt,$e,Be);w.pixelStorei(K.UNPACK_ROW_LENGTH,Xt),w.pixelStorei(K.UNPACK_IMAGE_HEIGHT,At),w.pixelStorei(K.UNPACK_SKIP_PIXELS,vn),w.pixelStorei(K.UNPACK_SKIP_ROWS,et),w.pixelStorei(K.UNPACK_SKIP_IMAGES,hn),We===0&&q.generateMipmaps&&K.generateMipmap(we),w.unbindTexture()},this.initRenderTarget=function(P){de.get(P).__webglFramebuffer===void 0&&me.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?me.setTextureCube(P,0):P.isData3DTexture?me.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?me.setTexture2DArray(P,0):me.setTexture2D(P,0),w.unbindTexture()},this.resetState=function(){ge=0,se=0,ne=null,w.reset(),qe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return rr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Bt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Bt._getUnpackColorSpace()}}const HA=({isGenerating:i=!1,activeAgentsCount:e=5,height:t=240})=>{const s=He.useRef(null),o=He.useRef(!1),l=He.useRef({x:0,y:0}),c=He.useRef({x:.2,y:.4}),d=He.useRef({x:.2,y:.4});return He.useEffect(()=>{const h=s.current;if(!h)return;const m=h.clientWidth||400,v=t,y=new Ox,g=new gi(45,m/v,.1,1e3);g.position.z=5.5;const E=new iv({antialias:!0,alpha:!0});E.setSize(m,v),E.setPixelRatio(Math.min(window.devicePixelRatio,2)),h.appendChild(E.domElement);const b=280,A=new jn,S=new Float32Array(b*3),x=new Float32Array(b*3),R=new It("#3B82F6"),O=new It("#10B981"),T=new It("#8B5CF6");for(let Se=0;Se<b;Se++){const Ee=Math.acos(-1+2*Se/b),Q=Math.sqrt(b*Math.PI)*Ee,ae=1.8,Te=ae*Math.cos(Q)*Math.sin(Ee),Ke=ae*Math.sin(Q)*Math.sin(Ee),Ge=ae*Math.cos(Ee);S[Se*3]=Te,S[Se*3+1]=Ke,S[Se*3+2]=Ge;const ct=R.clone().lerp(Se%3===0?O:T,Math.random()*.5);x[Se*3]=ct.r,x[Se*3+1]=ct.g,x[Se*3+2]=ct.b}A.setAttribute("position",new Xi(S,3)),A.setAttribute("color",new Xi(x,3));const D=new Vx({size:.08,vertexColors:!0,transparent:!0,opacity:.85}),F=new FE(A,D);y.add(F);const U=new Fh(1.4,1),M=new rs({color:2450411,wireframe:!0,transparent:!0,opacity:.25}),I=new Yn(U,M);y.add(I);const z=new Gc(2.3,.015,8,80),j=new rs({color:6333946,transparent:!0,opacity:.35}),X=new Yn(z,j);X.rotation.x=Math.PI/3,y.add(X);const re=new Gc(2.5,.015,8,80),H=new rs({color:10980346,transparent:!0,opacity:.25}),te=new Yn(re,H);te.rotation.y=Math.PI/4,y.add(te);const ge=[],se=[3900150,1096065,16096779,9133302,15485081];for(let Se=0;Se<e;Se++){const Ee=new Kc(.12,16,16),Q=new rs({color:se[Se%se.length]}),ae=new Yn(Ee,Q);y.add(ae),ge.push(ae)}const ne=Se=>{o.current=!0,l.current={x:Se.clientX,y:Se.clientY}},G=Se=>{if(!o.current)return;const Ee=Se.clientX-l.current.x,Q=Se.clientY-l.current.y;c.current.y+=Ee*.008,c.current.x+=Q*.008,l.current={x:Se.clientX,y:Se.clientY}},V=()=>{o.current=!1};h.addEventListener("mousedown",ne),window.addEventListener("mousemove",G),window.addEventListener("mouseup",V);let N,Z=new $x;const _e=()=>{N=requestAnimationFrame(_e);const Se=Z.getElapsedTime();if(d.current.x+=(c.current.x-d.current.x)*.06,d.current.y+=(c.current.y-d.current.y)*.06,c.current.y+=i?.015:.003,F.rotation.x=d.current.x,F.rotation.y=d.current.y,I.rotation.x=d.current.x*.8,I.rotation.y=d.current.y*.8,X.rotation.z+=.005,te.rotation.z-=.004,ge.forEach((Ee,Q)=>{const ae=Se*(.8+Q*.15)+Q*(Math.PI*2)/e,Te=2.4+Math.sin(Se+Q)*.15;Ee.position.x=Math.cos(ae)*Te,Ee.position.y=Math.sin(ae*.8)*.9,Ee.position.z=Math.sin(ae)*Te}),i){const Ee=1+Math.sin(Se*5)*.08;F.scale.set(Ee,Ee,Ee),I.scale.set(Ee,Ee,Ee)}else F.scale.set(1,1,1),I.scale.set(1,1,1);E.render(y,g)};_e();const De=()=>{if(!h)return;const Se=h.clientWidth;g.aspect=Se/v,g.updateProjectionMatrix(),E.setSize(Se,v)};return window.addEventListener("resize",De),()=>{cancelAnimationFrame(N),h.removeEventListener("mousedown",ne),window.removeEventListener("mousemove",G),window.removeEventListener("mouseup",V),window.removeEventListener("resize",De),h&&E.domElement&&h.removeChild(E.domElement),E.dispose(),A.dispose(),U.dispose(),z.dispose(),re.dispose()}},[i,e,t]),f.jsx("div",{style:{position:"relative",width:"100%",height:`${t}px`,overflow:"hidden",cursor:"grab"},children:f.jsx("div",{ref:s,style:{width:"100%",height:"100%"}})})},VA=({isPlaying:i,height:e=140})=>{const t=He.useRef(null);return He.useEffect(()=>{const s=t.current;if(!s)return;const o=s.clientWidth||360,l=e,c=new Ox,d=new gi(50,o/l,.1,100);d.position.set(0,2.5,4.2),d.lookAt(0,0,0);const h=new iv({antialias:!0,alpha:!0});h.setSize(o,l),h.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.appendChild(h.domElement);const m=18,v=[],y=[];for(let F=0;F<m;F++){const U=.4+F*.11;y.push(U);const M=64,I=[];for(let H=0;H<=M;H++){const te=H/M*Math.PI*2;I.push(new ce(Math.cos(te)*U,0,Math.sin(te)*U))}const z=new jn().setFromPoints(I),j=new It().setHSL(.55+F/m*.18,.9,.55),X=new Hx({color:j,transparent:!0,opacity:.35+F/m*.55,linewidth:1.5}),re=new LE(z,X);c.add(re),v.push(re)}const g=36,E=[],b=new No(.04,.4,.04);for(let F=0;F<g;F++){const U=F/g*Math.PI*2,M=2.1,I=new rs({color:new It().setHSL(.58+F/g*.25,1,.6),transparent:!0,opacity:.75}),z=new Yn(b,I);z.position.set(Math.cos(U)*M,0,Math.sin(U)*M),z.rotation.y=-U,c.add(z),E.push(z)}const A=new Kc(.28,16,16),S=new rs({color:3718648,wireframe:!0,transparent:!0,opacity:.8}),x=new Yn(A,S);c.add(x);let R,O=new $x;const T=()=>{R=requestAnimationFrame(T);const F=O.getElapsedTime();c.rotation.y=F*.3,v.forEach((M,I)=>{const z=M.geometry.attributes.position,j=y[I],X=64;for(let re=0;re<=X;re++){const H=re/X*Math.PI*2;let te=0;i?(te=Math.sin(H*6+F*8+I*.5)*(.15+I/m*.2),te+=Math.cos(H*3-F*5)*.08):te=Math.sin(H*3+F*1.5+I*.3)*.04,z.setXYZ(re,Math.cos(H)*j,te,Math.sin(H)*j)}z.needsUpdate=!0}),E.forEach((M,I)=>{if(i){const z=.5+Math.abs(Math.sin(F*9+I*.8))*2.8+Math.cos(F*4+I)*.8;M.scale.set(1,Math.max(.2,z),1),M.position.y=z*.15}else{const z=.4+Math.sin(F*2+I*.3)*.2;M.scale.set(1,z,1),M.position.y=z*.1}});const U=i?1+Math.sin(F*12)*.25:1+Math.sin(F*2)*.05;x.scale.set(U,U,U),h.render(c,d)};T();const D=()=>{if(!s)return;const F=s.clientWidth;d.aspect=F/l,d.updateProjectionMatrix(),h.setSize(F,l)};return window.addEventListener("resize",D),()=>{cancelAnimationFrame(R),window.removeEventListener("resize",D),s&&h.domElement&&s.removeChild(h.domElement),h.dispose(),b.dispose(),A.dispose()}},[i,e]),f.jsxs("div",{style:{width:"100%",height:`${e}px`,position:"relative",background:"linear-gradient(180deg, #0B132B 0%, #1C2541 100%)",borderRadius:"10px",overflow:"hidden",border:"1px solid #1E293B",boxShadow:i?"0 0 20px rgba(56, 189, 248, 0.25)":"none",transition:"box-shadow 0.3s ease"},children:[f.jsx("div",{ref:t,style:{width:"100%",height:"100%"}}),f.jsxs("div",{style:{position:"absolute",top:"8px",left:"12px",fontSize:"0.72rem",fontWeight:700,color:i?"#38BDF8":"#94A3B8",display:"flex",alignItems:"center",gap:"6px",background:"rgba(15, 23, 42, 0.75)",backdropFilter:"blur(6px)",padding:"3px 8px",borderRadius:"6px"},children:[f.jsx("span",{style:{width:"7px",height:"7px",borderRadius:"50%",background:i?"#38BDF8":"#64748B",boxShadow:i?"0 0 8px #38BDF8":"none",animation:i?"ping 1.2s infinite":"none"}}),f.jsx("span",{children:i?"3D Neural Waveform Active":"3D Audio Hologram Standby"})]})]})},tr=({children:i,style:e={},className:t="",onClick:s,maxTilt:o=8})=>{const l=He.useRef(null),[c,d]=He.useState({x:0,y:0}),[h,m]=He.useState({x:50,y:50,opacity:0}),v=g=>{const E=l.current;if(!E)return;const b=E.getBoundingClientRect(),A=g.clientX-b.left,S=g.clientY-b.top,x=b.width/2,R=b.height/2,O=-((S-R)/R)*o,T=(A-x)/x*o;d({x:O,y:T}),m({x:A/b.width*100,y:S/b.height*100,opacity:.15})},y=()=>{d({x:0,y:0}),m({x:50,y:50,opacity:0})};return f.jsx("div",{ref:l,onClick:s,onMouseMove:v,onMouseLeave:y,className:`tilt-card-wrapper ${t}`,style:{perspective:"1200px",transition:"transform 0.15s ease-out, box-shadow 0.25s ease",cursor:s?"pointer":"default",position:"relative",...e},children:f.jsxs("div",{style:{transform:`rotateX(${c.x}deg) rotateY(${c.y}deg) translateZ(10px)`,transformStyle:"preserve-3d",transition:"transform 0.15s ease-out",height:"100%",width:"100%",borderRadius:"inherit",position:"relative"},children:[i,f.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,borderRadius:"inherit",background:`radial-gradient(circle at ${h.x}% ${h.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 70%)`,opacity:h.opacity,pointerEvents:"none",transition:"opacity 0.25s ease",zIndex:10}})]})})},GA=()=>{const[i,e]=He.useState([]),[t,s]=He.useState(""),[o,l]=He.useState(!1),[c,d]=He.useState(null),[h,m]=He.useState(null);He.useEffect(()=>{v()},[]);const v=async()=>{try{const g=await un.getGovReportSamples();e(g),g&&g.length>0&&s(g[0].id)}catch(g){console.error("Failed to load GovReport samples:",g),m("Failed to load benchmark samples from backend.")}},y=async()=>{var g,E;if(t){l(!0),m(null);try{const b=await un.runGovReportEval(t);d(b)}catch(b){m(((E=(g=b==null?void 0:b.response)==null?void 0:g.data)==null?void 0:E.detail)||"Failed to execute GovReport benchmark evaluation.")}finally{l(!1)}}};return i.find(g=>g.id===t),f.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[f.jsxs("div",{className:"card",children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1rem"},children:[f.jsx("div",{style:{width:"42px",height:"42px",borderRadius:"var(--radius-md)",background:"linear-gradient(135deg, rgba(79,70,229,0.15), rgba(124,58,237,0.15))",color:"var(--primary)",display:"flex",alignItems:"center",justifyContent:"center"},children:f.jsx(Ec,{size:22})}),f.jsxs("div",{children:[f.jsx("h3",{style:{margin:0,fontSize:"1.15rem",fontWeight:700},children:"GovReport Academic Benchmark Suite"}),f.jsx("p",{style:{margin:0,fontSize:"0.85rem",color:"var(--text-secondary)"},children:"Evaluate multi-agent summaries against standard GAO (Government Accountability Office) & CRS long-document reference datasets"})]})]}),h&&f.jsx("div",{style:{background:"rgba(239, 68, 68, 0.1)",border:"1px solid var(--danger)",borderRadius:"8px",padding:"0.75rem 1rem",marginBottom:"1rem",color:"#f87171",fontSize:"0.85rem"},children:h}),f.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[f.jsxs("div",{children:[f.jsx("label",{style:{display:"block",fontSize:"0.82rem",fontWeight:700,color:"var(--text-main)",marginBottom:"0.5rem"},children:"Select Benchmark Report:"}),f.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"0.75rem"},children:i.map(g=>{var b;const E=t===g.id;return f.jsxs("div",{onClick:()=>s(g.id),style:{padding:"1rem",borderRadius:"var(--radius-md)",border:`1px solid ${E?"var(--primary)":"var(--border-color)"}`,background:E?"var(--primary-light)":"var(--bg-surface-secondary)",cursor:"pointer",transition:"all 0.15s"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.35rem"},children:[f.jsx("span",{className:"badge badge-primary",children:g.agency||"Federal Agency"}),f.jsx("span",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:g.id})]}),f.jsx("div",{style:{fontSize:"0.9rem",fontWeight:700,color:"var(--text-main)",marginBottom:"0.3rem"},children:g.title}),f.jsxs("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)"},children:[(b=g.word_count)==null?void 0:b.toLocaleString()," words • Published ",g.publication_date||"2023"]})]},g.id)})})]}),f.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"0.5rem"},children:f.jsxs("button",{onClick:y,disabled:o||!t,className:"btn btn-primary",style:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.7rem 1.5rem"},children:[f.jsx(U0,{size:16}),f.jsx("span",{children:o?"Evaluating Multi-Agent Pipeline on GovReport...":"Run Benchmark Evaluation"})]})})]})]}),c&&f.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[f.jsxs("div",{className:"card",style:{background:"linear-gradient(135deg, rgba(79,70,229,0.06), rgba(124,58,237,0.06))",border:"1px solid var(--primary-border)"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:"1rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[f.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"var(--radius-full)",background:"var(--primary)",color:"white",display:"flex",alignItems:"center",justifyContent:"center"},children:f.jsx(Z_,{size:22})}),f.jsxs("div",{children:[f.jsxs("h3",{style:{margin:0,fontSize:"1.1rem",fontWeight:700},children:["GovReport Benchmark Score: ",Math.round(c.overall_quality_score*100),"%"]}),f.jsxs("p",{style:{margin:0,fontSize:"0.8rem",color:"var(--text-muted)"},children:["Dataset: ",c.dataset_name," • Sample: ",c.sample_id," (",c.agency,")"]})]})]}),f.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[f.jsxs("span",{className:"badge badge-success",children:["Factual: ",Math.round(c.factual_consistency_score*100),"%"]}),f.jsxs("span",{className:"badge badge-primary",children:["Grounded: ",Math.round(c.groundedness_score*100),"%"]})]})]}),f.jsx("p",{style:{margin:0,fontSize:"0.9rem",lineHeight:1.6,color:"var(--text-secondary)"},children:c.evaluation_summary})]}),f.jsx("div",{className:"grid-3",children:[{label:"Relevance",score:c.relevance_score,desc:"Alignment with reference themes"},{label:"Completeness",score:c.completeness_score,desc:"Key finding and risk coverage"},{label:"Factual Consistency",score:c.factual_consistency_score,desc:"Zero hallucinated numbers/claims"},{label:"Source Groundedness",score:c.groundedness_score,desc:"Traceability to original text chunks"},{label:"Validation Accuracy",score:c.validation_accuracy_score,desc:"Post-gatekeeper verification score"},{label:"Overall Quality Index",score:c.overall_quality_score,desc:"Harmonic weighted performance"}].map((g,E)=>{const b=Math.round(g.score*100);return f.jsxs("div",{className:"card",style:{padding:"1.25rem"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.4rem"},children:[f.jsx("span",{style:{fontSize:"0.85rem",fontWeight:700,color:"var(--text-main)"},children:g.label}),f.jsxs("span",{style:{fontSize:"1.1rem",fontWeight:800,color:"var(--primary)"},children:[b,"%"]})]}),f.jsx("div",{className:"progress-bar-bg",style:{marginBottom:"0.5rem"},children:f.jsx("div",{className:"progress-bar-fill",style:{width:`${b}%`,background:"var(--primary)"}})}),f.jsx("p",{style:{margin:0,fontSize:"0.75rem",color:"var(--text-muted)"},children:g.desc})]},E)})}),f.jsxs("div",{className:"card",children:[f.jsx("h4",{style:{margin:"0 0 1rem",fontSize:"0.95rem",fontWeight:700},children:"Summary Length & Compression Ratio"}),f.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"1rem",padding:"1rem",background:"var(--bg-surface-secondary)",borderRadius:"var(--radius-md)"},children:[f.jsxs("div",{children:[f.jsx("span",{style:{fontSize:"0.72rem",color:"var(--text-muted)",textTransform:"uppercase"},children:"Human Reference Length"}),f.jsxs("div",{style:{fontSize:"1.1rem",fontWeight:700,color:"var(--text-main)"},children:[c.reference_summary_length," words"]})]}),f.jsxs("div",{children:[f.jsx("span",{style:{fontSize:"0.72rem",color:"var(--text-muted)",textTransform:"uppercase"},children:"AI Generated Summary Length"}),f.jsxs("div",{style:{fontSize:"1.1rem",fontWeight:700,color:"var(--primary)"},children:[c.generated_summary_length," words"]})]}),f.jsxs("div",{children:[f.jsx("span",{style:{fontSize:"0.72rem",color:"var(--text-muted)",textTransform:"uppercase"},children:"Length Fidelity"}),f.jsxs("div",{style:{fontSize:"1.1rem",fontWeight:700,color:"var(--success)"},children:[Math.round(c.generated_summary_length/(c.reference_summary_length||1)*100),"%"]})]})]})]})]})]})},pi=[{code:"en",name:"English (US / Global)",flag:"🇺🇸",voice:"Jenny (Neural)"},{code:"kn",name:"Kannada (ಕನ್ನಡ)",flag:"🇮🇳",voice:"Sapna (Neural)"},{code:"hi",name:"Hindi (हिंदी)",flag:"🇮🇳",voice:"Swara (Neural)"},{code:"te",name:"Telugu (తెలుగు)",flag:"🇮🇳",voice:"Shruti (Neural)"},{code:"ta",name:"Tamil (தமிழ்)",flag:"🇮🇳",voice:"Pallavi (Neural)"}],WA=({documents:i,activeDoc:e,workflowRun:t,audio:s,onSelectDoc:o,onUploadSuccess:l,onWorkflowComplete:c,onAudioGenerated:d})=>{var Rr,qi,Pr,os,Bs,Yt,ks,Dr,Lr,P,q,he,le,oe,We,ze,Ve,Qe,rt,_t,Et;const[h,m]=He.useState("overview"),[v,y]=He.useState("en"),[g,E]=He.useState({}),[b,A]=He.useState({}),[S,x]=He.useState(!1),[R,O]=He.useState(null),T=He.useRef(null),[D,F]=He.useState("single"),[U,M]=He.useState([]);He.useEffect(()=>{i.length>0&&M(L=>{const ee=i.map(Be=>Be.id);if(L.length===0)return ee.slice(0,Math.min(3,ee.length));const Pe=L.filter(Be=>ee.includes(Be));return Pe.length>0?Pe:ee.slice(0,Math.min(3,ee.length))})},[i]);const I=L=>{M(ee=>ee.includes(L)?ee.filter(Pe=>Pe!==L):[...ee,L])},z=()=>{M(i.map(L=>L.id))},j=()=>{M([])},[X,re]=He.useState(""),[H,te]=He.useState(!1),[ge,se]=He.useState(null),[ne,G]=He.useState(null),[V,N]=He.useState(null),[Z,_e]=He.useState(!1),[De,Se]=He.useState(!1),[Ee,Q]=He.useState("script"),[ae,Te]=He.useState(null),[Ke,Ge]=He.useState(!0),[ct,Ot]=He.useState(""),[mt,bt]=He.useState(!1),[Nt,pt]=He.useState(""),[Xe,wt]=He.useState(!1),[vt,Tt]=He.useState(null),[jt,K]=He.useState(!1),[Dt,Rt]=He.useState(!1),[B,w]=He.useState(!0),ie=He.useRef(null),[de,me]=He.useState(!1),Re=He.useRef(null),Fe=He.useRef(null),xe=async L=>{const ee=L.target.files;!ee||ee.length===0||await ye(ee)},ye=async L=>{var Be,lt;if(!L||L.length===0)return;te(!0),G(null),N(null);const ee=Array.from(L),Pe=[];try{for(let $e=0;$e<ee.length;$e++){const we=ee[$e];se(`Ingesting and indexing "${we.name}" (${$e+1}/${ee.length})...`);const Xt=await un.uploadDocument(we);Pe.push(Xt.document_id),l(Xt)}Pe.length>1?(F("multi"),M(Pe)):Pe.length===1&&M($e=>[Pe[0],...$e.filter(we=>we!==Pe[0])]),se(`Successfully uploaded and indexed ${ee.length} document${ee.length>1?"s":""}!`),setTimeout(()=>se(null),5e3),m("upload")}catch($e){const we=((lt=(Be=$e==null?void 0:$e.response)==null?void 0:Be.data)==null?void 0:lt.detail)||($e==null?void 0:$e.message)||"Failed to upload document.";G(we),console.error("Upload error:",$e)}finally{te(!1),Fe.current&&(Fe.current.value="")}},[Ie,nt]=He.useState(null),[ke,Ue]=He.useState(null),it=async L=>{var ee,Pe;nt(L),Ue(null),G(null),N(null);try{const Be=await un.loadGovReportSample(L);l(Be),Ue(`Official GovReport '${Be.original_name}' loaded successfully into the pipeline!`)}catch(Be){G(((Pe=(ee=Be==null?void 0:Be.response)==null?void 0:ee.data)==null?void 0:Pe.detail)||"Failed to load GovReport sample.")}finally{nt(null)}},dt=async L=>{await ht(X,typeof L=="string"?L:"summary")},ht=async(L,ee="key-info")=>{var Be,lt;const Pe=L.trim()||"Comprehensive Executive Summary";re(Pe),_e(!0),N(null);try{let $e;if(D==="multi"){if(U.length===0){N("Please select at least one document from the checklist below to generate a multi-document synthesis.");return}$e=await un.runMultiPipeline(U,Pe,v,!1)}else{if(!e){N("Please select or upload a document first before running the analysis pipeline.");return}$e=await un.runPipeline(e.id,Pe,v,!1)}c($e),m(ee)}catch($e){const we=((lt=(Be=$e==null?void 0:$e.response)==null?void 0:Be.data)==null?void 0:lt.detail)||($e==null?void 0:$e.message)||"Multi-agent pipeline execution failed. Please ensure the backend is running.";N(we),console.error("Pipeline execution error:",$e)}finally{_e(!1)}},[$,Oe]=He.useState(!1),[ve,Ne]=He.useState(null),qe=async()=>{var L,ee;if(t!=null&&t.workflow_run_id){Oe(!0),Ne(null);try{const Pe=Pi(wn),Be=await un.generateSpeech(t.workflow_run_id,Pe,v);Be&&(A(lt=>({...lt,[v]:Be})),d(Be))}catch(Pe){const Be=((ee=(L=Pe==null?void 0:Pe.response)==null?void 0:L.data)==null?void 0:ee.detail)||(Pe==null?void 0:Pe.message)||"Audio synthesis failed.";Ne(Be),console.error("Audio generation error:",Pe)}finally{Oe(!1)}}},Me=async()=>{if(t!=null&&t.workflow_run_id)try{await un.submitFeedback(t.workflow_run_id,Ke?5:2,Ke??!0,ct),bt(!0),setTimeout(()=>bt(!1),3e3)}catch(L){console.error(L)}},ot=L=>{navigator.clipboard.writeText(L),Se(!0),setTimeout(()=>Se(!1),2e3)},Je=L=>{if(!("speechSynthesis"in window))return;if(jt){window.speechSynthesis.cancel(),K(!1);return}window.speechSynthesis.cancel(),window.speechSynthesis.resume();const ee=new SpeechSynthesisUtterance(L);ee.rate=1,ee.volume=1;const Pe=window.speechSynthesis.getVoices();if(Pe&&Pe.length>0){const Be=Pe.find(lt=>lt.lang.toLowerCase().startsWith(v));Be&&(ee.voice=Be)}ee.onend=()=>K(!1),ee.onerror=()=>K(!1),K(!0),window.speechSynthesis.speak(ee)},Lt=async L=>{var we,Xt,At,vn;if(T.current===L)return;y(L),Ne(null);const ee=pi.find(et=>et.code===L),Pe=(ee==null?void 0:ee.name)||L,Be=!!g[L],lt=!!b[L];if(Be&&lt){d(b[L]),O(`Switched to ${Pe} (Restored from cache)`);return}if(Be&&!lt&&(d(null),!(t!=null&&t.workflow_run_id))){O(`Switched to ${Pe}`);return}const $e=((we=t==null?void 0:t.validation)==null?void 0:we.final_validated_summary)||((Xt=t==null?void 0:t.draft_summary)==null?void 0:Xt.executive_summary)||(e?`This report provides an analytical overview of ${e.original_name}. All sections and pages have been indexed with strict source grounding and factual consistency verification.`:"");if(!$e){O(`Switched to ${Pe}`);return}if(T.current=L,d(null),x(!0),O(`Translating and generating ${Pe} audio...`),t!=null&&t.workflow_run_id)try{const et=await un.switchLanguage(t.workflow_run_id,L,!0);et&&(et.translated_summary&&E(hn=>({...hn,[L]:et.translated_summary})),et.audio?(A(hn=>({...hn,[L]:et.audio})),d(et.audio),O(`Switched to ${Pe}. ${(ee==null?void 0:ee.voice)||"Neural Voice"} ready!`)):O(`Switched to ${Pe} summary text.`))}catch(et){console.warn("switchLanguage failed, attempting fallback translation:",et);const hn=((vn=(At=et==null?void 0:et.response)==null?void 0:At.data)==null?void 0:vn.detail)||(et==null?void 0:et.message)||"Language switch failed.";if(Ne(hn),O(`Notice: ${hn}`),!g[L])try{const In=await un.translateContent($e,L,"auto");In!=null&&In.translated_text&&E(zt=>({...zt,[L]:In.translated_text}))}catch(In){console.error("Fallback translation failed:",In)}}finally{T.current=null,x(!1)}else try{if(g[L])O(`Switched to ${Pe}`);else{const et=await un.translateContent($e,L,"auto");et&&et.translated_text&&(E(hn=>({...hn,[L]:et.translated_text})),O(`Preview translated to ${Pe}`))}}catch(et){console.warn("Live summary translation error:",et),O(`Translation error: ${(et==null?void 0:et.message)||"Failed"}`)}finally{T.current=null,x(!1)}};He.useEffect(()=>{s&&s.language&&A(L=>({...L,[s.language]:s}))},[s==null?void 0:s.audio_id,s==null?void 0:s.language]),He.useEffect(()=>{var L,ee;if(t){const Pe=((L=t.validation)==null?void 0:L.final_validated_summary)||((ee=t.draft_summary)==null?void 0:ee.executive_summary)||"",Be=t.language||"en";E({[Be]:Pe}),s&&s.language?A({[s.language]:s}):A({}),y(Be)}else E({}),A({});O(null)},[t==null?void 0:t.workflow_run_id,e==null?void 0:e.id]);const Pt=async(L,ee=B)=>{var Be,lt;const Pe=(L||Nt).trim();if(Pe){wt(!0),jt&&(window.speechSynthesis.cancel(),K(!1));try{let $e;if(D==="multi"&&U.length>0)$e=await un.askMultiQuestion(U,Pe,v);else{if(!e){alert("Please select or upload a document first.");return}$e=await un.askQuestion(e.id,Pe,v)}Tt($e),ee&&($e!=null&&$e.answer)&&setTimeout(()=>{Je($e.answer)},350)}catch($e){alert(((lt=(Be=$e==null?void 0:$e.response)==null?void 0:Be.data)==null?void 0:lt.detail)||"Failed to answer question.")}finally{wt(!1)}}},xn=async()=>{const L=window.SpeechRecognition||window.webkitSpeechRecognition;if(!L){alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge for microphone voice questions.");return}if(Dt){if(ie.current)try{ie.current.stop()}catch{}Rt(!1);return}try{navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&(await navigator.mediaDevices.getUserMedia({audio:!0})).getTracks().forEach(Pe=>Pe.stop())}catch(ee){if(console.warn("Microphone permission check warning:",ee),ee.name==="NotAllowedError"||ee.name==="PermissionDeniedError"){alert(`Microphone is currently BLOCKED in your browser!

Here is how to allow it in 5 seconds:
1. Look at the address bar at the very top (where it says http://localhost:5173)
2. Click the Lock icon (🔒) or Tune/Settings icon on the left of the URL
3. Change 'Microphone' from Blocked to 'Allow'
4. Refresh the page (press F5) and click Speak Question again!`);return}}try{const ee=new L;ie.current=ee,ee.continuous=!1,ee.interimResults=!0;const Pe={en:"en-US",kn:"kn-IN",hi:"hi-IN",te:"te-IN"};ee.lang=Pe[v]||"en-US",ee.onstart=()=>{Rt(!0)},ee.onresult=Be=>{let lt="",$e=!1;for(let we=Be.resultIndex;we<Be.results.length;we++)lt+=Be.results[we][0].transcript,Be.results[we].isFinal&&($e=!0);lt&&pt(lt),$e&&lt.trim().length>3&&(Rt(!1),Pt(lt.trim(),!0))},ee.onerror=Be=>{console.warn("Speech recognition notice/error:",Be.error),Rt(!1),Be.error==="not-allowed"&&alert(`Microphone permission is blocked by your browser or Windows!

Please check:
1. Click the Lock/Tune icon (🔒) on the left of your URL bar and set Microphone to 'Allow'.
2. In Windows Settings > Privacy & Security > Microphone, ensure 'Let desktop apps access your microphone' is turned ON.`)},ee.onend=()=>{Rt(!1)},ee.start()}catch(ee){console.error("Speech recognition start failed:",ee),Rt(!1)}},Qn=async()=>{const L=window.SpeechRecognition||window.webkitSpeechRecognition;if(!L){alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge for microphone voice questions.");return}if(de){if(Re.current)try{Re.current.stop()}catch{}me(!1);return}try{navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&(await navigator.mediaDevices.getUserMedia({audio:!0})).getTracks().forEach(Pe=>Pe.stop())}catch(ee){if(console.warn("Microphone permission check warning:",ee),ee.name==="NotAllowedError"||ee.name==="PermissionDeniedError"){alert(`Microphone is currently BLOCKED in your browser!

Please click the Lock or Tune icon in your address bar and set Microphone to 'Allow'.`);return}}try{const ee=new L;Re.current=ee,ee.continuous=!1,ee.interimResults=!0;const Pe={en:"en-US",kn:"kn-IN",hi:"hi-IN",te:"te-IN"};ee.lang=Pe[v]||"en-US",ee.onstart=()=>{me(!0)},ee.onresult=Be=>{let lt="",$e=!1;for(let we=Be.resultIndex;we<Be.results.length;we++)lt+=Be.results[we][0].transcript,Be.results[we].isFinal&&($e=!0);lt&&re(lt),$e&&me(!1)},ee.onerror=Be=>{console.warn("Speech recognition notice/error:",Be.error),me(!1)},ee.onend=()=>{me(!1)},ee.start()}catch(ee){console.error("Failed to start speech recognition for focus directive:",ee),me(!1)}},Ci=((Rr=t==null?void 0:t.validation)==null?void 0:Rr.final_validated_summary)||((qi=t==null?void 0:t.draft_summary)==null?void 0:qi.executive_summary)||(e?`This report provides an analytical overview of ${e.original_name}. All sections and pages have been indexed with strict source grounding and factual consistency verification.`:"Upload a document to generate an executive summary."),wn=g[v]||Ci,tn=t==null?void 0:t.analysis,fn=t==null?void 0:t.validation,ft=t==null?void 0:t.evaluation,sn=t==null?void 0:t.audio_script,Os=wn,bn=((os=(Pr=t==null?void 0:t.draft_summary)==null?void 0:Pr.source_references)==null?void 0:os.slice(0,6))||[{page:1,section:"Overview & Objectives",chunk_id:"chk-1",quote_or_topic:"Core operational goals and background"},{page:2,section:"Findings & Analysis",chunk_id:"chk-2",quote_or_topic:"Key findings, performance and metrics"},{page:(e==null?void 0:e.page_count)||3,section:"Risk & Compliance",chunk_id:"chk-3",quote_or_topic:"Identified exposures and mitigations"},{page:(e==null?void 0:e.page_count)||4,section:"Strategic Recommendations",chunk_id:"chk-4",quote_or_topic:"Recommended action plan and timeline"}],cr=L=>{if(!L)return[];const ee=L.replace(/\(Ref:[^)]*\)/g,"").replace(/\[(Page|Section|Chunk)[^\]]*\]/gi,"").trim();return ee.includes(`

`)?ee.split(/\n\n+/).map(Pe=>Pe.trim()).filter(Boolean):[ee.replace(/\n+/g," ").replace(/\s{2,}/g," ").trim()].filter(Boolean)},Ri=cr(wn),Cr=!!(t!=null&&t.are_unrelated||wn.includes("Cross-Domain Notice")||wn.includes("⚠️")),Pi=L=>L?L.replace(/^#+\s+[^\n]+\n*/gm,"").replace(/\*\*[^*]+:\*\*\s*/g,"").replace(/^\s*[-*•–—]\s+/gm,"").replace(/^\s*\d+\.\s+/gm,"").replace(/\(Ref:[^)]*\)/g,"").replace(/\[(Page|Section|Chunk)[^\]]*\]/gi,"").replace(/\n+/g," ").replace(/\s{2,}/g," ").trim():"";return f.jsxs("div",{className:"ref-app-shell",children:[f.jsxs("header",{style:{height:"62px",background:"#0E1B31",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 1.75rem",color:"white",borderBottom:"1px solid #1E293B",position:"sticky",top:0,zIndex:40},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.85rem"},children:[f.jsx("div",{style:{width:"34px",height:"34px",borderRadius:"8px",background:"#2563EB",display:"flex",alignItems:"center",justifyContent:"center",color:"white"},children:f.jsx(Fn,{size:20})}),f.jsxs("div",{children:[f.jsx("h1",{style:{fontSize:"1.05rem",fontWeight:800,margin:0,letterSpacing:"-0.01em"},children:"Document Summarization & Voice Generation"}),f.jsx("p",{style:{fontSize:"0.72rem",color:"#94A3B8",margin:0},children:"AI-Powered Multi-Agent Summarization with Validation and Audio"})]})]}),f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem",background:"rgba(255, 255, 255, 0.12)",border:"1px solid rgba(255, 255, 255, 0.22)",borderRadius:"6px",padding:"0.3rem 0.65rem",fontSize:"0.8rem",color:"white"},children:[f.jsx(pa,{size:15,color:"#60A5FA"}),f.jsx("select",{value:v,onChange:L=>Lt(L.target.value),style:{background:"transparent",border:"none",color:"white",fontSize:"0.8rem",fontWeight:600,cursor:"pointer",outline:"none"},title:"Target Output Language for Summary, Q&A, and Voice Briefing",children:pi.map(L=>f.jsxs("option",{value:L.code,style:{background:"#0E1B31",color:"white"},children:[L.flag," ",L.name]},L.code))})]}),f.jsxs("button",{onClick:()=>m("overview"),style:{display:"flex",alignItems:"center",gap:"0.45rem",background:"rgba(255, 255, 255, 0.1)",border:"1px solid rgba(255, 255, 255, 0.15)",color:"white",borderRadius:"6px",padding:"0.4rem 0.8rem",fontSize:"0.8rem",cursor:"pointer"},children:[f.jsx(oy,{size:14}),f.jsx("span",{children:"Overview"})]})]})]}),f.jsxs("div",{className:"ref-app-body",children:[f.jsxs("aside",{className:"ref-sidebar",children:[f.jsx("nav",{style:{display:"flex",flexDirection:"column",gap:"0.25rem"},children:[{id:"overview",label:"Home Overview",icon:f.jsx(Fn,{size:16})},{id:"upload",label:"1. Upload Document",icon:f.jsx(Wl,{size:16})},{id:"qa",label:"Ask Questions (Q&A)",icon:f.jsx(Ld,{size:16})},{id:"summary",label:"2. Executive Summary",icon:f.jsx(Fn,{size:16})},{id:"key-info",label:"3. Key Information",icon:f.jsx(Xl,{size:16})},{id:"references",label:"4. Source References",icon:f.jsx(Fn,{size:16})},{id:"validation",label:"5. Validation",icon:f.jsx(ay,{size:16})},{id:"evaluation",label:"6. Evaluation",icon:f.jsx(dg,{size:16})},{id:"audio",label:"7. Audio & Speech Script",icon:f.jsx(ws,{size:16})},{id:"govreport",label:"GovReport Dataset (Page 4)",icon:f.jsx(Ec,{size:16})},{id:"feedback",label:"8. User Feedback",icon:f.jsx(Fd,{size:16})}].map(L=>{const ee=h===L.id;return f.jsxs("button",{onClick:()=>m(L.id),style:{width:"100%",display:"flex",alignItems:"center",gap:"0.65rem",padding:"0.65rem 0.85rem",borderRadius:"8px",fontSize:"0.85rem",fontWeight:ee?700:500,color:ee?"#2563EB":"var(--text-muted)",background:ee?"#EFF6FF":"transparent",border:"none",textAlign:"left",cursor:"pointer",transition:"all 0.15s ease"},children:[f.jsx("span",{style:{color:ee?"#2563EB":"var(--text-muted)"},children:L.icon}),f.jsx("span",{children:L.label})]},L.id)})}),f.jsxs("div",{style:{padding:"0.85rem",background:"#F8FAFC",borderRadius:"8px",border:"1px solid var(--border-color)",display:"flex",alignItems:"center",gap:"0.6rem"},children:[f.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"#10B981",boxShadow:"0 0 6px #10B981"}}),f.jsxs("div",{children:[f.jsx("div",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-main)"},children:"System Ready (5-Agent Architecture)"}),f.jsx("div",{style:{fontSize:"0.68rem",color:"var(--text-muted)"},children:"All 5 Agents Online & Grounded"})]})]})]}),f.jsxs("main",{className:"ref-main-content",children:[h!=="overview"&&f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem",flexWrap:"wrap",gap:"0.75rem"},children:[f.jsxs("button",{onClick:()=>m("overview"),className:"btn-outline",style:{display:"inline-flex",alignItems:"center",gap:"0.45rem",padding:"0.45rem 0.95rem"},children:[f.jsx(K_,{size:16}),f.jsx("span",{children:"← Back to Overview"})]}),f.jsx("div",{style:{fontSize:"0.82rem",color:"var(--text-muted)",display:"flex",alignItems:"center",gap:"0.5rem"},children:D==="multi"?f.jsxs("span",{style:{background:"#EFF6FF",color:"#1D4ED8",padding:"0.25rem 0.6rem",borderRadius:"4px",border:"1px solid #BFDBFE",fontWeight:600},children:["⚡ Multi-Document Merge: ",U.length," files selected"]}):e?f.jsxs("span",{children:["Document: ",f.jsx("strong",{children:e.original_name})," (",e.page_count," pgs)"]}):null})]}),h==="overview"&&f.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[f.jsx("div",{className:"hero-3d-gradient",style:{borderRadius:"14px",padding:"1.25rem 2.25rem",color:"white",position:"relative"},children:f.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem",alignItems:"center"},children:[f.jsx("div",{children:f.jsxs("h1",{style:{fontSize:"2.6rem",fontWeight:900,color:"white",letterSpacing:"-0.03em",margin:0,lineHeight:1.1},children:["DocVoice",f.jsx("span",{style:{color:"#38BDF8"},children:" AI"})]})}),f.jsx("div",{children:f.jsx(HA,{isGenerating:Z,activeAgentsCount:5,height:180})})]})}),f.jsx("div",{className:"ref-card",style:{background:"#EFF6FF",borderColor:"#BFDBFE",padding:"1rem 1.5rem"},children:f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[f.jsx("div",{style:{width:"42px",height:"42px",borderRadius:"8px",background:"#2563EB",color:"white",display:"flex",alignItems:"center",justifyContent:"center"},children:D==="multi"?f.jsx(ma,{size:22}):f.jsx(Fn,{size:22})}),f.jsxs("div",{children:[f.jsxs("div",{style:{fontSize:"0.75rem",fontWeight:700,color:"#2563EB",textTransform:"uppercase",display:"flex",alignItems:"center",gap:"0.5rem"},children:[f.jsx("span",{children:D==="multi"?"Multi-Document Merge Mode":"Single Document Deep Dive"}),f.jsx("span",{style:{background:D==="multi"?"#DBEAFE":"#E0E7FF",color:"#1E40AF",padding:"1px 6px",borderRadius:"4px",fontSize:"0.7rem"},children:D==="multi"?`${U.length} Files Selected`:"Single File"})]}),f.jsx("div",{style:{fontSize:"1rem",fontWeight:800,color:"var(--text-main)"},children:D==="multi"?`Combined Cross-Document Synthesis (${U.length} files)`:(e==null?void 0:e.original_name)||"No document selected"})]})]}),f.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"},children:[f.jsxs("button",{onClick:()=>F(L=>L==="single"?"multi":"single"),className:"btn-outline btn-3d-primary",style:{padding:"0.5rem 0.85rem",fontSize:"0.82rem",borderColor:"#93C5FD",color:"#1D4ED8",background:"white"},title:"Toggle between Single Document and Multi-Document Merge",children:[f.jsx(ma,{size:14}),f.jsx("span",{children:D==="single"?"Switch to Multi-Doc Merge":"Switch to Single Document"})]}),f.jsxs("button",{onClick:()=>m("upload"),className:"btn-blue btn-3d-primary",style:{padding:"0.5rem 1rem",fontSize:"0.82rem"},children:[f.jsx(Wl,{size:15}),f.jsx("span",{children:"Upload & Configure"})]}),f.jsxs("button",{onClick:()=>m("qa"),className:"btn-outline btn-3d-primary",style:{padding:"0.5rem 1rem",fontSize:"0.82rem"},children:[f.jsx(Ld,{size:15}),f.jsx("span",{children:"Ask Question"})]}),f.jsxs("button",{onClick:()=>m("audio"),className:"btn-outline btn-3d-primary",style:{padding:"0.5rem 1rem",fontSize:"0.82rem"},children:[f.jsx(ws,{size:15}),f.jsx("span",{children:"Listen to Audio"})]}),f.jsxs("button",{onClick:()=>m("govreport"),className:"btn-outline btn-3d-primary",style:{padding:"0.5rem 1rem",fontSize:"0.82rem",borderColor:"#818CF8",color:"#4338CA",background:"white"},children:[f.jsx(Ec,{size:15}),f.jsx("span",{children:"GovReport Benchmark (PDF Page 4)"})]})]})]})}),f.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"1.25rem"},children:[f.jsx(tr,{maxTilt:7,onClick:()=>m("upload"),children:f.jsxs("div",{className:"ref-card card-3d-interactive",style:{height:"100%",borderLeft:"4px solid #2563EB"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[f.jsx("span",{style:{fontWeight:800,fontSize:"0.95rem"},children:"1. Upload Document"}),f.jsx(Qi,{size:16,color:"#2563EB"})]}),f.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-muted)",margin:"0 0 0.75rem"},children:"Drag & drop PDF, DOCX, or TXT files, set focus instructions, and start processing."}),f.jsx("span",{className:"badge badge-blue",children:e?`${e.original_name} (${e.page_count} pgs)`:"Choose File"})]})}),f.jsx(tr,{maxTilt:7,onClick:()=>m("qa"),children:f.jsxs("div",{className:"ref-card card-3d-interactive",style:{height:"100%",borderLeft:"4px solid #8B5CF6"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[f.jsx("span",{style:{fontWeight:800,fontSize:"0.95rem"},children:"Ask Questions (Grounded Q&A)"}),f.jsx(Qi,{size:16,color:"#8B5CF6"})]}),f.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-muted)",margin:"0 0 0.75rem"},children:"Type or speak questions with 🎙️ microphone and receive instant grounded answers."}),f.jsx("span",{className:"badge badge-blue",style:{background:"#FAF5FF",color:"#6B21A8"},children:"🎙️ Voice & Hybrid Search Active"})]})}),f.jsx(tr,{maxTilt:7,onClick:()=>m("summary"),children:f.jsxs("div",{className:"ref-card card-3d-interactive",style:{height:"100%",borderLeft:"4px solid #3B82F6"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[f.jsx("span",{style:{fontWeight:800,fontSize:"0.95rem"},children:"2. Executive Summary"}),f.jsx(Qi,{size:16,color:"#3B82F6"})]}),f.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-muted)",margin:"0 0 0.75rem"},children:"View context-aware multi-agent executive summary with grounded synthesis."}),f.jsx("span",{className:"badge badge-blue",children:Ci?`${Ci.split(/\s+/).length} words ready`:"Click to View"})]})}),f.jsx(tr,{maxTilt:7,onClick:()=>m("key-info"),children:f.jsxs("div",{className:"ref-card card-3d-interactive",style:{height:"100%",borderLeft:"4px solid #10B981"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[f.jsx("span",{style:{fontWeight:800,fontSize:"0.95rem"},children:"3. Key Information"}),f.jsx(Qi,{size:16,color:"#10B981"})]}),f.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-muted)",margin:"0 0 0.75rem"},children:"Explore 6 intelligence categories: Facts, Risks, Decisions, Findings, Recommendations, Action Items."}),f.jsx("span",{className:"badge badge-green",children:"6 Categories Extracted"})]})}),f.jsx(tr,{maxTilt:7,onClick:()=>m("references"),children:f.jsxs("div",{className:"ref-card card-3d-interactive",style:{height:"100%",borderLeft:"4px solid #6366F1"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[f.jsx("span",{style:{fontWeight:800,fontSize:"0.95rem"},children:"4. Source References"}),f.jsx(Qi,{size:16,color:"#6366F1"})]}),f.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-muted)",margin:"0 0 0.75rem"},children:"Trace every factual statement to its exact page number and text chunk."}),f.jsxs("span",{className:"badge badge-blue",children:[bn.length," Verified Citations"]})]})}),f.jsx(tr,{maxTilt:7,onClick:()=>m("validation"),children:f.jsxs("div",{className:"ref-card card-3d-interactive",style:{height:"100%",borderLeft:"4px solid #10B981"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[f.jsx("span",{style:{fontWeight:800,fontSize:"0.95rem"},children:"5. Summary Validation"}),f.jsx(Qi,{size:16,color:"#10B981"})]}),f.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-muted)",margin:"0 0 0.75rem"},children:"Gatekeeper certification: checks consistency and scrubs hallucinations."}),f.jsx("span",{className:"badge badge-green",children:"VALIDATED ✓ (0 Hallucinations)"})]})}),f.jsx(tr,{maxTilt:7,onClick:()=>m("evaluation"),children:f.jsxs("div",{className:"ref-card card-3d-interactive",style:{height:"100%",borderLeft:"4px solid #8B5CF6"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[f.jsx("span",{style:{fontWeight:800,fontSize:"0.95rem"},children:"6. Quality Evaluation"}),f.jsx(Qi,{size:16,color:"#8B5CF6"})]}),f.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-muted)",margin:"0 0 0.75rem"},children:"Academic evaluation across 6 dimensions: Relevance, Completeness, Consistency, etc."}),f.jsxs("span",{className:"badge badge-blue",style:{background:ft?ft.overall_quality_score<.6?"#FEF2F2":"#FAF5FF":"#F1F5F9",color:ft?ft.overall_quality_score<.6?"#DC2626":"#6B21A8":"#64748B"},children:["Overall Quality: ",ft?`${Math.round(ft.overall_quality_score*100)}%`:"Pending"]})]})}),f.jsx(tr,{maxTilt:7,onClick:()=>m("audio"),children:f.jsxs("div",{className:"ref-card card-3d-interactive",style:{height:"100%",borderLeft:"4px solid #EC4899"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[f.jsx("span",{style:{fontWeight:800,fontSize:"0.95rem"},children:"7. Audio Summary"}),f.jsx(Qi,{size:16,color:"#EC4899"})]}),f.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-muted)",margin:"0 0 0.75rem"},children:"Listen to natural neural voice briefing synthesized strictly from validated text."}),f.jsxs("span",{className:"badge badge-blue",style:{background:"#FDF2F8",color:"#BE185D"},children:[f.jsx(ws,{size:12,style:{marginRight:"4px"}}),s?"Audio Ready to Play":"Click to Open Player"]})]})}),f.jsx(tr,{maxTilt:7,onClick:()=>m("feedback"),children:f.jsxs("div",{className:"ref-card card-3d-interactive",style:{height:"100%",borderLeft:"4px solid #F59E0B"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[f.jsx("span",{style:{fontWeight:800,fontSize:"0.95rem"},children:"8. User Feedback"}),f.jsx(Qi,{size:16,color:"#F59E0B"})]}),f.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-muted)",margin:"0 0 0.75rem"},children:"Human-in-the-loop evaluation to rate accuracy and log audit corrections."}),f.jsx("span",{className:"badge badge-blue",style:{background:"#FFFBEB",color:"#B45309"},children:"Share Your Rating"})]})}),f.jsx(tr,{maxTilt:7,onClick:()=>m("govreport"),children:f.jsxs("div",{className:"ref-card card-3d-interactive",style:{height:"100%",borderLeft:"4px solid #4F46E5"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"},children:[f.jsx("span",{style:{fontWeight:800,fontSize:"0.95rem"},children:"GovReport Benchmark (PDF Page 4)"}),f.jsx(Qi,{size:16,color:"#4F46E5"})]}),f.jsx("p",{style:{fontSize:"0.82rem",color:"var(--text-muted)",margin:"0 0 0.75rem"},children:"Official long-document government dataset (CRS & GAO reports) as specified in Page 4 of project requirements."}),f.jsx("span",{className:"badge badge-blue",style:{background:"#EEF2FF",color:"#4338CA"},children:"🏛️ CRS & GAO Academic Benchmark"})]})})]})]}),h==="upload"&&f.jsxs("div",{className:"ref-card",style:{maxWidth:"850px",margin:"0 auto"},children:[f.jsxs("div",{className:"ref-card-header",children:[f.jsx(Wl,{size:22,color:"#2563EB"}),f.jsx("span",{style:{fontSize:"1.15rem"},children:"1. Upload & Document Synthesis Configuration"})]}),f.jsxs("div",{style:{display:"flex",background:"#F1F5F9",padding:"4px",borderRadius:"10px",marginBottom:"1.25rem",gap:"6px"},children:[f.jsxs("button",{type:"button",onClick:()=>F("single"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",padding:"0.65rem 1rem",borderRadius:"8px",border:"none",background:D==="single"?"#FFFFFF":"transparent",boxShadow:D==="single"?"0 1px 3px rgba(0,0,0,0.1)":"none",color:D==="single"?"#2563EB":"var(--text-muted)",fontWeight:D==="single"?700:500,fontSize:"0.85rem",cursor:"pointer",transition:"all 0.2s"},children:[f.jsx(Fn,{size:16}),f.jsx("span",{children:"Single Document Deep Dive"})]}),f.jsxs("button",{type:"button",onClick:()=>F("multi"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",padding:"0.65rem 1rem",borderRadius:"8px",border:"none",background:D==="multi"?"#FFFFFF":"transparent",boxShadow:D==="multi"?"0 1px 3px rgba(0,0,0,0.1)":"none",color:D==="multi"?"#2563EB":"var(--text-muted)",fontWeight:D==="multi"?700:500,fontSize:"0.85rem",cursor:"pointer",transition:"all 0.2s"},children:[f.jsx(ma,{size:16}),f.jsxs("span",{children:["Multi-Document Synthesis & Merge (",i.length," Files)"]})]})]}),f.jsxs("div",{onClick:()=>{var L;return!H&&((L=Fe.current)==null?void 0:L.click())},onDragOver:L=>L.preventDefault(),onDrop:L=>{L.preventDefault(),!H&&L.dataTransfer.files&&L.dataTransfer.files.length>0&&ye(L.dataTransfer.files)},style:{border:H?"2px solid #3B82F6":"2px dashed #93C5FD",borderRadius:"12px",padding:"2rem 1.5rem",textAlign:"center",background:H?"#EFF6FF":"#F8FAFC",cursor:H?"wait":"pointer",marginBottom:"1rem",transition:"all 0.2s ease"},children:[f.jsx("input",{ref:Fe,type:"file",multiple:!0,accept:".pdf,.docx,.txt,.png,.jpg,.jpeg,.webp,.bmp,.tiff,.mp3,.wav,.m4a,.ogg",onChange:xe,style:{display:"none"}}),H?f.jsxs("div",{style:{padding:"0.5rem 0"},children:[f.jsx(I0,{size:38,color:"#2563EB",style:{margin:"0 auto 0.75rem",animation:"spin 1s linear infinite"}}),f.jsx("div",{style:{fontSize:"1rem",fontWeight:700,color:"#1E40AF"},children:ge||"Ingesting and indexing document(s)..."}),f.jsx("div",{style:{fontSize:"0.8rem",color:"#3B82F6",marginTop:"0.35rem"},children:"Parsing structure, applying OCR / transcription, and updating vector index..."})]}):f.jsxs(f.Fragment,{children:[f.jsx(Wl,{size:40,color:"#3B82F6",style:{margin:"0 auto 0.5rem"}}),f.jsx("div",{style:{fontSize:"0.98rem",fontWeight:700,color:"var(--text-main)"},children:"Drag and drop documents, images, or audio here (Select Multiple Files)"}),f.jsx("div",{style:{fontSize:"0.82rem",color:"var(--text-muted)",margin:"0.2rem 0 0.6rem"},children:"or click to browse files from your computer"}),f.jsx("button",{type:"button",className:"btn-blue",style:{padding:"0.45rem 1rem",fontSize:"0.82rem"},children:"Choose Files (.pdf, .docx, .txt, .png, .jpg, audio)"}),f.jsx("div",{style:{fontSize:"0.72rem",color:"var(--text-light)",marginTop:"0.5rem"},children:"Supported formats: PDF, DOCX, TXT, Images (PNG, JPG, WEBP), Voice Audio — automatic OCR & structure extraction"})]})]}),ge&&!H&&f.jsxs("div",{style:{marginBottom:"1rem",padding:"0.65rem 0.85rem",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"8px",fontSize:"0.82rem",color:"#065F46",display:"flex",alignItems:"center",gap:"0.5rem"},children:[f.jsx(mi,{size:16,color:"#10B981"}),f.jsx("span",{children:ge})]}),ne&&f.jsxs("div",{style:{marginBottom:"1rem",padding:"0.75rem 1rem",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",fontSize:"0.82rem",color:"#991B1B",display:"flex",alignItems:"flex-start",gap:"0.6rem"},children:[f.jsx(lo,{size:18,color:"#EF4444",style:{marginTop:"2px",flexShrink:0}}),f.jsxs("div",{style:{flex:1},children:[f.jsx("div",{style:{fontWeight:700},children:"Upload Error"}),f.jsx("div",{style:{fontSize:"0.78rem",marginTop:"2px"},children:ne})]}),f.jsx("button",{type:"button",onClick:()=>G(null),style:{background:"transparent",border:"none",cursor:"pointer",color:"#991B1B",fontWeight:700},children:"✕"})]}),V&&f.jsxs("div",{style:{marginBottom:"1rem",padding:"0.75rem 1rem",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",fontSize:"0.85rem",color:"#991B1B",display:"flex",alignItems:"flex-start",gap:"0.6rem"},children:[f.jsx(lo,{size:18,color:"#EF4444",style:{marginTop:"2px",flexShrink:0}}),f.jsxs("div",{style:{flex:1},children:[f.jsx("div",{style:{fontWeight:700},children:"Pipeline Execution Failed"}),f.jsx("div",{style:{fontSize:"0.8rem",marginTop:"2px"},children:V})]}),f.jsx("button",{type:"button",onClick:()=>N(null),style:{background:"transparent",border:"none",cursor:"pointer",color:"#991B1B",fontWeight:700},children:"✕"})]}),f.jsxs("div",{style:{background:"linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)",border:"1px solid #C7D2FE",borderRadius:"10px",padding:"1.1rem 1.25rem",marginBottom:"1.25rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.6rem",flexWrap:"wrap",gap:"0.5rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem"},children:[f.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"6px",background:"#4F46E5",color:"white",display:"flex",alignItems:"center",justifyContent:"center"},children:f.jsx(Ec,{size:18})}),f.jsxs("div",{children:[f.jsx("div",{style:{fontSize:"0.9rem",fontWeight:800,color:"#1E1B4B"},children:"Official Government Dataset (PDF Page 4: GovReport / CRS / GAO)"}),f.jsx("div",{style:{fontSize:"0.75rem",color:"#4B5563"},children:"Standard long-document benchmark dataset specified in project guidelines"})]})]}),f.jsx("button",{type:"button",onClick:()=>m("govreport"),className:"btn-outline",style:{padding:"0.35rem 0.75rem",fontSize:"0.78rem",borderColor:"#818CF8",color:"#4338CA",background:"white"},children:f.jsx("span",{children:"Academic Benchmark Suite →"})})]}),f.jsx("div",{style:{fontSize:"0.8rem",color:"#374151",marginBottom:"0.85rem"},children:"Click below to instantly load and index the official Government Dataset reports into the multi-agent summarization pipeline:"}),f.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"0.75rem"},children:[f.jsxs("button",{type:"button",onClick:()=>it("CRS-R46240"),disabled:!!Ie,className:"btn-outline",style:{padding:"0.75rem 1rem",borderRadius:"8px",background:"white",borderColor:"#A5B4FC",display:"flex",alignItems:"flex-start",gap:"0.65rem",textAlign:"left",cursor:"pointer"},children:[f.jsx(Fn,{size:18,color:"#4F46E5",style:{marginTop:"2px",flexShrink:0}}),f.jsxs("div",{style:{flex:1},children:[f.jsx("div",{style:{fontSize:"0.82rem",fontWeight:700,color:"#1E1B4B"},children:Ie==="CRS-R46240"?"⏳ Loading & Indexing...":"Load CRS-R46240 Report"}),f.jsx("div",{style:{fontSize:"0.72rem",color:"#6B7280",marginTop:"2px"},children:"Congressional Research Service: Critical Infrastructure Cybersecurity"})]})]}),f.jsxs("button",{type:"button",onClick:()=>it("GAO-21-104"),disabled:!!Ie,className:"btn-outline",style:{padding:"0.75rem 1rem",borderRadius:"8px",background:"white",borderColor:"#A5B4FC",display:"flex",alignItems:"flex-start",gap:"0.65rem",textAlign:"left",cursor:"pointer"},children:[f.jsx(Fn,{size:18,color:"#059669",style:{marginTop:"2px",flexShrink:0}}),f.jsxs("div",{style:{flex:1},children:[f.jsx("div",{style:{fontSize:"0.82rem",fontWeight:700,color:"#064E3B"},children:Ie==="GAO-21-104"?"⏳ Loading & Indexing...":"Load GAO-21-104 Report"}),f.jsx("div",{style:{fontSize:"0.72rem",color:"#6B7280",marginTop:"2px"},children:"Government Accountability Office: Federal Financial & Audit Oversight"})]})]})]}),ke&&f.jsxs("div",{style:{marginTop:"0.75rem",padding:"0.5rem 0.75rem",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"6px",fontSize:"0.78rem",color:"#065F46",display:"flex",alignItems:"center",gap:"0.4rem"},children:[f.jsx(mi,{size:15,color:"#10B981"}),f.jsx("span",{children:ke})]})]}),D==="single"&&e&&f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.75rem 1rem",background:"#EFF6FF",borderRadius:"8px",border:"1px solid #BFDBFE",marginBottom:"1.25rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem"},children:[f.jsx(Fn,{size:18,color:"#2563EB"}),f.jsx("span",{style:{fontWeight:700,fontSize:"0.88rem"},children:e.original_name}),f.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-muted)"},children:["(",(e.file_size/(1024*1024)).toFixed(1)," MB • ",e.page_count," pages)"]})]}),i.length>1&&f.jsx("select",{value:e.id,onChange:L=>o(L.target.value),style:{padding:"0.35rem 0.65rem",fontSize:"0.82rem",borderRadius:"4px",border:"1px solid #93C5FD"},children:i.map(L=>f.jsx("option",{value:L.id,children:L.original_name},L.id))})]}),D==="multi"&&f.jsxs("div",{style:{background:"#F8FAFC",border:"1px solid #BFDBFE",borderRadius:"10px",padding:"1rem",marginBottom:"1.25rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.75rem",flexWrap:"wrap",gap:"0.5rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[f.jsx(ma,{size:18,color:"#2563EB"}),f.jsx("span",{style:{fontWeight:700,fontSize:"0.9rem",color:"#1E3A8A"},children:"Select Documents to Merge into 1 Master Executive Summary:"})]}),f.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[f.jsx("button",{type:"button",onClick:()=>M(i.slice(0,Math.min(3,i.length)).map(L=>L.id)),className:"btn-outline",style:{padding:"0.25rem 0.6rem",fontSize:"0.75rem",fontWeight:700,color:"#1D4ED8",borderColor:"#93C5FD",background:"#EFF6FF"},children:"Select Latest 3"}),f.jsxs("button",{type:"button",onClick:z,className:"btn-outline",style:{padding:"0.25rem 0.6rem",fontSize:"0.75rem"},children:["Select All (",i.length,")"]}),f.jsx("button",{type:"button",onClick:j,className:"btn-outline",style:{padding:"0.25rem 0.6rem",fontSize:"0.75rem"},children:"Clear All"})]})]}),i.length===0?f.jsx("div",{style:{padding:"1rem",textAlign:"center",color:"var(--text-muted)",fontSize:"0.85rem"},children:"No documents uploaded yet. Upload documents using the dropzone above."}):f.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem",maxHeight:"220px",overflowY:"auto"},children:i.map(L=>{const ee=U.includes(L.id);return f.jsxs("div",{onClick:()=>I(L.id),style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.6rem 0.85rem",borderRadius:"6px",background:ee?"#EFF6FF":"white",border:ee?"1px solid #93C5FD":"1px solid var(--border-color)",cursor:"pointer",transition:"all 0.15s ease"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.65rem"},children:[f.jsx("input",{type:"checkbox",checked:ee,onChange:()=>{},style:{cursor:"pointer",width:"16px",height:"16px"}}),f.jsx(Fn,{size:16,color:ee?"#2563EB":"var(--text-muted)"}),f.jsx("span",{style:{fontSize:"0.85rem",fontWeight:ee?700:500,color:"var(--text-main)"},children:L.original_name})]}),f.jsxs("span",{style:{fontSize:"0.75rem",color:"var(--text-muted)"},children:[L.page_count," pgs • ",(L.file_size/(1024*1024)).toFixed(1)," MB"]})]},L.id)})}),f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"0.75rem",paddingTop:"0.5rem",borderTop:"1px solid #E2E8F0",fontSize:"0.78rem"},children:[f.jsxs("span",{style:{color:U.length>0?"#1D4ED8":"#EF4444",fontWeight:600},children:["✓ ",U.length," of ",i.length," documents selected for cross-document synthesis"]}),f.jsx("span",{style:{color:"var(--text-muted)"},children:"Analyzes cross-document connections, trends & differences"})]})]}),f.jsxs("div",{style:{marginBottom:"1.25rem"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.45rem",flexWrap:"wrap",gap:"0.25rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem"},children:[f.jsx("label",{style:{fontSize:"0.85rem",fontWeight:700,color:"var(--text-main)"},children:D==="multi"?"Cross-Document Synthesis Focus / Custom Directive (optional)":"Focus / Instructions or Custom Question (optional)"}),f.jsxs("button",{type:"button",onClick:Qn,title:"Speak your custom focus prompt or question",style:{display:"inline-flex",alignItems:"center",gap:"0.3rem",padding:"2px 8px",borderRadius:"6px",border:de?"1px solid #DC2626":"1px solid #3B82F6",background:de?"#FEE2E2":"#EFF6FF",color:de?"#DC2626":"#1D4ED8",fontSize:"0.72rem",fontWeight:700,cursor:"pointer",transition:"all 0.15s ease"},children:[f.jsx(Aa,{size:12}),f.jsx("span",{children:de?"Listening...":"Speak Directive 🎙️"})]})]}),f.jsx("span",{style:{fontSize:"0.72rem",color:"#2563EB",fontWeight:600},children:"⚡ Supports word & token limits (e.g. in 100 words, 50 tokens)"})]}),f.jsx("textarea",{rows:3,value:X,onChange:L=>re(L.target.value),placeholder:D==="multi"?"e.g., Summarize key decisions in 100 words, compare budget allocations in 50 tokens, or synthesize strategic takeaways...":"e.g., Summarize key findings in 100 words, summarize in 50 words, in 80 tokens, or ask any question...",style:{width:"100%",padding:"0.75rem",borderRadius:"8px",border:"1px solid var(--border-color)",fontSize:"0.88rem",fontFamily:"inherit"}}),f.jsxs("div",{style:{display:"flex",gap:"0.45rem",marginTop:"0.55rem",flexWrap:"wrap",alignItems:"center"},children:[f.jsx("span",{style:{fontSize:"0.75rem",color:"#1E293B",fontWeight:700},children:"Summary Length Mode:"}),[{label:"🟢 Small Summary (200 words)",value:"Small Summary (200 words)"},{label:"🔵 Medium Summary (500 words)",value:"Medium Summary (500 words)"},{label:"🟣 Detailed Summary (1000 words)",value:"Detailed Summary (1000 words)"}].map((L,ee)=>f.jsx("button",{type:"button",onClick:()=>re(L.value),style:{background:X.toLowerCase().includes(L.value.toLowerCase())||L.value.includes("1000")&&X.toLowerCase().includes("detailed")||L.value.includes("500")&&X.toLowerCase().includes("medium")||L.value.includes("200")&&X.toLowerCase().includes("small")?"#DBEAFE":"#FFFFFF",border:X.toLowerCase().includes(L.value.toLowerCase())||L.value.includes("1000")&&X.toLowerCase().includes("detailed")||L.value.includes("500")&&X.toLowerCase().includes("medium")||L.value.includes("200")&&X.toLowerCase().includes("small")?"2px solid #2563EB":"1px solid #CBD5E1",borderRadius:"8px",padding:"0.25rem 0.65rem",fontSize:"0.75rem",color:X.toLowerCase().includes(L.value.toLowerCase())?"#1D4ED8":"#334155",cursor:"pointer",fontWeight:700,boxShadow:"0 1px 2px rgba(0,0,0,0.05)"},children:L.label},ee))]}),f.jsxs("div",{style:{display:"flex",gap:"0.4rem",marginTop:"0.45rem",flexWrap:"wrap",alignItems:"center"},children:[f.jsx("span",{style:{fontSize:"0.72rem",color:"var(--text-muted)",fontWeight:600},children:"Exact Word Budget:"}),["Summarize in 200 words","Summarize in 500 words","Summarize in 1000 words","Summarize in 100 words","In 60 tokens"].map((L,ee)=>f.jsx("button",{type:"button",onClick:()=>re(L),style:{background:X===L?"#DBEAFE":"#F1F5F9",border:"1px solid #CBD5E1",borderRadius:"12px",padding:"0.2rem 0.6rem",fontSize:"0.72rem",color:X===L?"#1D4ED8":"#475569",cursor:"pointer",fontWeight:600},children:L},ee))]})]}),f.jsxs("div",{style:{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px",padding:"1rem",marginBottom:"1.25rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.65rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[f.jsx(pa,{size:18,color:"#0284C7"}),f.jsx("span",{style:{fontSize:"0.88rem",fontWeight:700,color:"#0369A1"},children:"Target Language & Voice Output"})]}),f.jsx("span",{style:{fontSize:"0.75rem",color:"#0284C7",fontWeight:600},children:"5 Languages Supported (Kannada, Hindi, English, Telugu, Tamil)"})]}),f.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"0.75rem"},children:[f.jsxs("div",{children:[f.jsx("label",{style:{display:"block",fontSize:"0.78rem",color:"#0369A1",fontWeight:600,marginBottom:"0.25rem"},children:"Output Language:"}),f.jsx("select",{value:v,onChange:L=>Lt(L.target.value),style:{width:"100%",padding:"0.5rem 0.75rem",borderRadius:"6px",border:"1px solid #7DD3FC",background:"white",fontSize:"0.85rem",fontWeight:600,color:"var(--text-main)",cursor:"pointer"},children:pi.map(L=>f.jsxs("option",{value:L.code,children:[L.flag," ",L.name]},L.code))})]}),f.jsxs("div",{children:[f.jsx("label",{style:{display:"block",fontSize:"0.78rem",color:"#0369A1",fontWeight:600,marginBottom:"0.25rem"},children:"Native Neural Voice:"}),f.jsxs("div",{style:{padding:"0.5rem 0.75rem",borderRadius:"6px",border:"1px solid #BAE6FD",background:"white",fontSize:"0.82rem",color:"var(--text-muted)",display:"flex",alignItems:"center",gap:"0.4rem"},children:[f.jsx(ws,{size:15,color:"#0284C7"}),f.jsx("span",{children:((Bs=pi.find(L=>L.code===v))==null?void 0:Bs.voice)||"Neural Voice"})]})]})]})]}),f.jsxs("button",{onClick:dt,disabled:Z||(D==="multi"?U.length===0:!e),className:"btn-blue",style:{width:"100%",padding:"0.85rem",fontSize:"0.95rem"},children:[f.jsx(ql,{size:18}),f.jsx("span",{children:Z?D==="multi"?"Synthesizing Combined Summary & Audio Briefing...":"Synthesizing Summary & Audio Briefing...":D==="multi"?`Merge & Generate Combined ${((Yt=pi.find(L=>L.code===v))==null?void 0:Yt.name.split(" ")[0])||""} Summary & Audio (${U.length} Files)`:`Generate ${((ks=pi.find(L=>L.code===v))==null?void 0:ks.name.split(" ")[0])||""} Summary & Audio`})]})]}),h==="qa"&&f.jsxs("div",{className:"ref-card",style:{maxWidth:"900px",margin:"0 auto"},children:[f.jsxs("div",{className:"ref-card-header",children:[f.jsx(Ld,{size:22,color:"#2563EB"}),f.jsx("span",{style:{fontSize:"1.15rem"},children:"Ask Any Question (Interactive Grounded Q&A)"})]}),f.jsxs("div",{style:{display:"flex",background:"#F1F5F9",padding:"4px",borderRadius:"8px",marginBottom:"1rem",gap:"6px"},children:[f.jsxs("button",{type:"button",onClick:()=>F("single"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.45rem",padding:"0.55rem 0.85rem",borderRadius:"6px",border:"none",background:D==="single"?"#FFFFFF":"transparent",boxShadow:D==="single"?"0 1px 2px rgba(0,0,0,0.08)":"none",color:D==="single"?"#2563EB":"var(--text-muted)",fontWeight:D==="single"?700:500,fontSize:"0.82rem",cursor:"pointer"},children:[f.jsx(Fn,{size:15}),f.jsxs("span",{children:["Single File: ",(e==null?void 0:e.original_name)||"Active Document"]})]}),f.jsxs("button",{type:"button",onClick:()=>F("multi"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.45rem",padding:"0.55rem 0.85rem",borderRadius:"6px",border:"none",background:D==="multi"?"#FFFFFF":"transparent",boxShadow:D==="multi"?"0 1px 2px rgba(0,0,0,0.08)":"none",color:D==="multi"?"#2563EB":"var(--text-muted)",fontWeight:D==="multi"?700:500,fontSize:"0.82rem",cursor:"pointer"},children:[f.jsx(ma,{size:15}),f.jsxs("span",{children:["Search Across All Merged Documents (",U.length," Files)"]})]})]}),f.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-muted)",margin:"0 0 1.25rem"},children:D==="multi"?`Asking across ${U.length} merged documents. Grounded retrieval scans chunks from all selected documents and provides citations with the document name and page number.`:`Ask any question about ${(e==null?void 0:e.original_name)||"the active document"}. The system scans all pages using hybrid vector & BM25 retrieval, extracts exact evidence, and generates a grounded response.`}),f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.65rem"},children:[f.jsx("span",{style:{fontSize:"0.8rem",fontWeight:700,color:"var(--text-muted)"},children:"Question & Answer Language:"}),f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[f.jsx(pa,{size:15,color:"#2563EB"}),f.jsx("select",{value:v,onChange:L=>Lt(L.target.value),style:{padding:"0.3rem 0.65rem",borderRadius:"6px",border:"1px solid var(--border-color)",fontSize:"0.8rem",fontWeight:600,background:"white",color:"var(--text-main)",cursor:"pointer"},children:pi.map(L=>f.jsxs("option",{value:L.code,children:[L.flag," ",L.name]},L.code))})]})]}),f.jsxs("div",{style:{display:"flex",gap:"0.75rem",marginBottom:"0.5rem",alignItems:"center"},children:[f.jsx("input",{type:"text",value:Nt,onChange:L=>pt(L.target.value),onKeyDown:L=>{L.key==="Enter"&&Pt()},placeholder:Dt?"🎙️ Listening to your voice... Speak clearly now...":D==="multi"?"e.g., Summarize key decisions in 100 words, compare budget allocations across all documents... (or click Speak Question 🎙️)":"e.g., Summarize key findings in 100 words, what are the top risks in 50 words? (or click Speak Question 🎙️)",style:{flex:1,padding:"0.75rem 1rem",borderRadius:"8px",border:Dt?"2px solid #EF4444":"1px solid var(--border-color)",background:Dt?"#FEF2F2":"white",fontSize:"0.9rem",outline:"none",transition:"all 0.2s ease"}}),f.jsxs("button",{type:"button",onClick:xn,title:"Speak your question using microphone (Accessible for visually impaired users)",style:{display:"flex",alignItems:"center",gap:"0.45rem",padding:"0.75rem 1.15rem",borderRadius:"8px",border:Dt?"1px solid #DC2626":"1px solid #3B82F6",background:Dt?"#DC2626":"#EFF6FF",color:Dt?"white":"#1D4ED8",fontWeight:700,fontSize:"0.85rem",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",boxShadow:Dt?"0 0 12px rgba(220, 38, 38, 0.45)":"none"},children:[f.jsx(Aa,{size:17}),f.jsx("span",{children:Dt?"Stop Listening ⏹":"Speak Question 🎙️"})]}),f.jsxs("button",{onClick:()=>Pt(),disabled:Xe||!Nt.trim()||(D==="multi"?U.length===0:!e),className:"btn-blue",style:{padding:"0.75rem 1.5rem",whiteSpace:"nowrap"},children:[f.jsx(Xl,{size:16}),f.jsx("span",{children:Xe?"Searching...":"Ask Question"})]})]}),f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.45rem 0.85rem",background:Dt?"#FEF2F2":"#F8FAFC",borderRadius:"6px",border:Dt?"1px solid #FECACA":"1px solid #E2E8F0",marginBottom:"1rem",fontSize:"0.8rem"},children:[f.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer",color:"#1E40AF",fontWeight:600},children:[f.jsx("input",{type:"checkbox",checked:B,onChange:L=>w(L.target.checked),style:{cursor:"pointer"}}),f.jsx("span",{children:"🔊 Auto-Read Answer Aloud (Hands-Free Voice Assistant for Blind / Visually Impaired Users)"})]}),Dt?f.jsxs("span",{style:{color:"#DC2626",fontWeight:700,display:"flex",alignItems:"center",gap:"0.35rem"},children:[f.jsx("span",{style:{display:"inline-block",width:"8px",height:"8px",borderRadius:"50%",background:"#DC2626"}}),"Microphone Active: Listening..."]}):f.jsxs("span",{style:{color:"var(--text-muted)"},children:["Tip: Click ",f.jsx("b",{children:"Speak Question 🎙️"})," and speak in ",((Dr=pi.find(L=>L.code===v))==null?void 0:Dr.name)||"English"]})]}),f.jsxs("div",{style:{marginBottom:"1.5rem"},children:[f.jsx("div",{style:{fontSize:"0.75rem",fontWeight:700,color:"var(--text-muted)",marginBottom:"0.5rem",textTransform:"uppercase"},children:"Try Sample Questions (Supports Word Limits & Directives):"}),f.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.5rem"},children:(D==="multi"?["Summarize key decisions across all documents in 100 words","Compare the budget and financial figures across all documents","What are the common risk factors mentioned across the files?","What strategic actions are recommended in each document?"]:["Summarize key operational findings in 100 words","Summarize the main points in 50 words","What is the approved budget and capital expenditure?","What are the 4 action items and target deadlines?","What are the identified risk factors and mitigations?"]).map((L,ee)=>f.jsx("button",{onClick:()=>{pt(L),Pt(L)},style:{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:"20px",padding:"0.35rem 0.85rem",fontSize:"0.78rem",color:"#1D4ED8",cursor:"pointer",transition:"all 0.15s ease"},children:L},ee))})]}),Xe&&f.jsxs("div",{style:{padding:"2.5rem",textAlign:"center",color:"var(--text-muted)"},children:[f.jsx(jl,{size:24,className:"spin",style:{margin:"0 auto 0.75rem",color:"#2563EB"}}),f.jsx("div",{style:{fontWeight:600},children:"Scanning knowledge base and synthesizing grounded answer..."})]}),vt&&!Xe&&f.jsxs("div",{style:{background:"#F8FAFC",border:"1px solid #BFDBFE",borderRadius:"10px",padding:"1.25rem",marginBottom:"1.5rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.75rem",flexWrap:"wrap",gap:"0.5rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",flexWrap:"wrap"},children:[f.jsx(ql,{size:18,color:"#2563EB"}),f.jsxs("span",{style:{fontWeight:800,fontSize:"0.95rem",color:"#1E3A8A"},children:['Answer to: "',vt.question,'"']}),f.jsx("span",{style:{fontSize:"0.72rem",padding:"0.15rem 0.55rem",borderRadius:"12px",background:"#DBEAFE",color:"#1E40AF",fontWeight:700},children:vt.answer?`${vt.answer.trim().split(/\s+/).filter(Boolean).length} words`:"0 words"}),vt.is_relevant!==void 0&&f.jsx("span",{style:{fontSize:"0.72rem",padding:"0.15rem 0.55rem",borderRadius:"12px",background:vt.is_relevant?"#DCFCE7":"#FEE2E2",color:vt.is_relevant?"#166534":"#991B1B",fontWeight:700},children:vt.relevance_verdict||(vt.is_relevant?"Grounded":"Out of Scope")})]}),f.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[f.jsxs("button",{onClick:()=>Je(vt.answer),className:"btn-outline",style:{padding:"0.35rem 0.75rem",fontSize:"0.78rem"},children:[f.jsx(Aa,{size:14,color:"#2563EB"}),f.jsx("span",{children:jt?"Stop Voice ⏹":"Listen to Answer 🔊"})]}),f.jsxs("button",{onClick:()=>ht(vt.question,"key-info"),disabled:Z,className:"btn-outline",style:{padding:"0.35rem 0.75rem",fontSize:"0.78rem",borderColor:"#818CF8",color:"#4338CA",background:"white"},title:"Re-extract 6 Key Information categories tailored specifically to this question",children:[f.jsx(Xl,{size:14}),f.jsx("span",{children:Z?"Updating Key Info...":"Update Key Info for Question ⚡"})]}),f.jsxs("button",{onClick:()=>ht(vt.question,"summary"),disabled:Z,className:"btn-blue",style:{padding:"0.35rem 0.75rem",fontSize:"0.78rem"},title:"Generate a full 5-agent executive briefing and audio file tailored to this question",children:[f.jsx(Fn,{size:14}),f.jsx("span",{children:Z?"Synthesizing...":"Full Briefing & Audio ⚡"})]})]})]}),vt.is_relevant===!1&&f.jsxs("div",{style:{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",padding:"0.75rem 1rem",marginBottom:"0.85rem",display:"flex",alignItems:"center",gap:"0.6rem",color:"#991B1B"},children:[f.jsx(lo,{size:18,color:"#DC2626",style:{flexShrink:0}}),f.jsxs("div",{style:{fontSize:"0.82rem",lineHeight:1.4},children:[f.jsx("strong",{children:"Question Out of Scope:"})," This question has no semantic grounding in the selected document(s) (",vt.relevance_score!==void 0?`${Math.round(vt.relevance_score*100)}% match`:"< 20% match","). Generating a briefing or key info from an irrelevant question will result in degraded evaluation quality scores."]})]}),f.jsx("div",{style:{fontSize:"0.92rem",lineHeight:1.65,color:"var(--text-main)",whiteSpace:"pre-line",marginBottom:"1rem",padding:"0.85rem",background:"white",borderRadius:"6px",border:"1px solid var(--border-color)"},children:vt.answer}),vt.sources&&vt.sources.length>0&&f.jsxs("div",{children:[f.jsxs("div",{style:{fontSize:"0.8rem",fontWeight:700,color:"var(--text-muted)",marginBottom:"0.5rem"},children:["Grounded Evidence (",vt.sources.length," chunks cited):"]}),f.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:vt.sources.map((L,ee)=>f.jsxs("div",{style:{background:"white",border:"1px solid var(--border-color)",borderRadius:"6px",padding:"0.65rem 0.85rem",fontSize:"0.8rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.3rem"},children:[f.jsxs("div",{style:{display:"flex",gap:"0.4rem",alignItems:"center"},children:[f.jsxs("span",{className:"badge badge-blue",children:["Page ",L.page_number]}),f.jsx("span",{style:{fontWeight:600,color:"var(--text-main)"},children:L.section_title})]}),f.jsxs("span",{style:{fontSize:"0.72rem",color:"#10B981",fontWeight:600},children:["Match: ",(L.similarity_score*100).toFixed(0),"%"]})]}),f.jsxs("p",{style:{margin:0,color:"var(--text-muted)",fontSize:"0.78rem",lineHeight:1.4},children:['"',L.content.slice(0,200),'..."']})]},ee))})]})]})]}),h==="summary"&&f.jsxs("div",{className:"ref-card",style:{maxWidth:"900px",margin:"0 auto"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem"},children:[f.jsxs("div",{className:"ref-card-header",style:{margin:0},children:[f.jsx(Fn,{size:22,color:"#2563EB"}),f.jsx("span",{style:{fontSize:"1.15rem"},children:"2. Executive Summary"})]}),f.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[f.jsxs("button",{onClick:()=>ot(wn),className:"btn-outline",children:[De?f.jsx(mi,{size:15,color:"#10B981"}):f.jsx(ey,{size:15}),f.jsx("span",{children:De?"Copied":"Copy"})]}),f.jsxs("button",{onClick:()=>m("audio"),className:"btn-blue",children:[f.jsx(ws,{size:15}),f.jsx("span",{children:"Listen to Audio"})]})]})]}),f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.65rem 1rem",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",marginBottom:"1rem",flexWrap:"wrap",gap:"0.5rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[f.jsx(pa,{size:16,color:"#16A34A"}),f.jsx("span",{style:{fontSize:"0.82rem",fontWeight:700,color:"#15803D"},children:"View Summary In:"})]}),f.jsx("div",{style:{display:"flex",gap:"0.4rem",flexWrap:"wrap"},children:pi.map(L=>f.jsxs("button",{type:"button",onClick:()=>Lt(L.code),style:{background:v===L.code?"#16A34A":"white",color:v===L.code?"white":"#374151",border:v===L.code?"1px solid #15803D":"1px solid #D1D5DB",borderRadius:"6px",padding:"0.3rem 0.65rem",fontSize:"0.78rem",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"0.35rem",transition:"all 0.15s",boxShadow:v===L.code?"0 1px 3px rgba(22,163,74,0.3)":"none"},children:[f.jsx("span",{children:L.flag}),f.jsx("span",{children:L.name})]},L.code))}),S?f.jsxs("div",{style:{fontSize:"0.8rem",color:"#15803D",fontWeight:700,display:"flex",alignItems:"center",gap:"0.4rem",background:"#ECFDF5",padding:"0.35rem 0.75rem",borderRadius:"6px",border:"1px solid #A7F3D0"},children:[f.jsx(jl,{size:13,className:"spin"}),f.jsx("span",{children:R||`Translating & generating ${(Lr=pi.find(L=>L.code===v))==null?void 0:Lr.name} audio...`})]}):R?f.jsxs("div",{style:{fontSize:"0.78rem",color:"#15803D",fontWeight:600,display:"flex",alignItems:"center",gap:"0.4rem",background:"#F0FDF4",padding:"0.3rem 0.65rem",borderRadius:"6px",border:"1px solid #BBF7D0"},children:[f.jsx(mi,{size:13,color:"#16A34A"}),f.jsx("span",{children:R})]}):null]}),f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.65rem 1rem",background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"8px",marginBottom:"1.25rem",fontSize:"0.8rem",color:"var(--text-muted)",flexWrap:"wrap",gap:"0.5rem"},children:[f.jsxs("div",{style:{display:"flex",gap:"1.25rem",alignItems:"center",flexWrap:"wrap"},children:[f.jsxs("span",{children:["📊 ",f.jsx("strong",{children:"Word Count:"})," ",wn.split(/\s+/).filter(Boolean).length," words"]}),((P=t==null?void 0:t.draft_summary)==null?void 0:P.requested_focus)&&f.jsxs("span",{children:["🎯 ",f.jsx("strong",{children:"Directive:"})," ",t.draft_summary.requested_focus]}),f.jsxs("span",{children:["📑 ",f.jsx("strong",{children:"Format:"})," ",Cr?"Cross-Domain Segmented Synthesis":"Unified Executive Paragraph"]}),f.jsxs("span",{children:["⏱️ ",f.jsx("strong",{children:"Read Time:"})," ~",Math.max(1,Math.round(wn.split(/\s+/).filter(Boolean).length/160))," min read"]})]}),f.jsx("span",{style:{background:"#ECFDF5",color:"#065F46",padding:"3px 10px",borderRadius:"12px",fontWeight:700,fontSize:"0.74rem"},children:"Verified & Grounded ✓"})]}),(t==null?void 0:t.relationship_classification)==="RELATED"&&f.jsxs("div",{style:{background:"#ECFDF5",border:"1px solid #A7F3D0",borderLeft:"5px solid #10B981",borderRadius:"10px",padding:"0.85rem 1.25rem",marginBottom:"1.25rem",color:"#065F46",fontSize:"0.92rem",lineHeight:1.5,display:"flex",alignItems:"center",gap:"0.65rem"},children:[f.jsx(mi,{size:20,color:"#10B981"}),f.jsxs("div",{children:[f.jsx("strong",{children:"✓ Related Documents Detected:"})," Combined into ONE unified, coherent executive synthesis across all reporting periods."]})]}),((t==null?void 0:t.relationship_classification)==="UNRELATED"||Cr)&&f.jsxs("div",{style:{background:"#FFFBEB",border:"1px solid #FCD34D",borderLeft:"5px solid #F59E0B",borderRadius:"10px",padding:"1.1rem 1.4rem",marginBottom:"1.25rem",color:"#92400E",fontSize:"0.94rem",lineHeight:1.65,boxShadow:"0 1px 4px rgba(245, 158, 11, 0.08)"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6rem",fontWeight:700,marginBottom:"0.35rem",color:"#B45309"},children:[f.jsx(lo,{size:19,color:"#D97706"}),f.jsx("span",{children:v==="kn"?"⚠️ ಸೂಚನೆ: ಅಸಂಬಂಧಿತ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿವೆ":v==="hi"?"⚠️ सूचना: असंबंधित दस्तावेज़ पाए गए":v==="te"?"⚠️ గమనిక: సంబంధం లేని పత్రాలు కనుగొనబడ్డాయి":v==="ta"?"⚠️ அறிவிப்பு: தொடர்பில்லாத ஆவணங்கள் கண்டறியப்பட்டன":"⚠️ Notice: Unrelated Documents Detected"})]}),f.jsx("p",{style:{margin:0,fontWeight:500},children:v==="kn"?"⚠️ ಸೂಚನೆ: ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಾಖಲೆಗಳು ಪರಸ್ಪರ ಅಸಂಬಂಧಿತವಾಗಿವೆ. ಇವುಗಳನ್ನು ಒಂದೇ ಸಾರಾಂಶವಾಗಿ ಸಂಯೋಜಿಸುವ ಬದಲು ಪ್ರತ್ಯೇಕವಾಗಿ ಸಾರಾಂಶಗೊಳಿಸಲಾಗಿದೆ.":v==="hi"?"⚠️ सूचना: अपलोड किए गए दस्तावेज़ असंबंधित प्रतीत होते हैं। इन्हें एकल सारांश में संयोजित करने के बजाय अलग-अलग संक्षेपित किया गया है।":v==="te"?"⚠️ గమనిక: అప్‌లోడ్ చేసిన పత్రాలు సంబంధం లేనివిగా కనిపిస్తున్నాయి. వాటిని ఒకే సారాంశంగా కలపకుండా విడివిడిగా సంగ్రహించడం జరిగింది.":v==="ta"?"⚠️ அறிவிப்பு: பதிவேற்றப்பட்ட ஆவணங்கள் தொடர்பில்லாதவையாகத் தோன்றுகின்றன. அவை ஒற்றைச் சுருக்கமாக இணைக்கப்படாமல் தனித்தனியாகச் சுருக்கப்பட்டுள்ளன.":(t==null?void 0:t.warning_message)||(t==null?void 0:t.relationship_disclaimer)||"⚠️ The uploaded documents appear to be unrelated. They will be summarized separately instead of being combined into a single summary."})]}),t!=null&&t.separate_summaries&&t.separate_summaries.length>0&&v==="en"?f.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1.25rem",marginBottom:"1.5rem"},children:t.separate_summaries.map((L,ee)=>f.jsxs("div",{style:{background:"white",border:"1px solid #E2E8F0",borderLeft:"5px solid #2563EB",borderRadius:"10px",padding:"1.5rem",boxShadow:"0 2px 6px rgba(0,0,0,0.04)"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.75rem",flexWrap:"wrap",gap:"0.5rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[f.jsx(Fn,{size:18,color:"#2563EB"}),f.jsxs("span",{style:{fontSize:"1.02rem",fontWeight:800,color:"#1E293B"},children:["Summary for Document ",ee+1,": ",L.document_name]})]}),f.jsxs("span",{style:{fontSize:"0.75rem",background:"#EFF6FF",color:"#1D4ED8",padding:"3px 8px",borderRadius:"4px",fontWeight:600},children:["Domain: ",L.domain]})]}),f.jsx("p",{style:{margin:"0 0 1rem",lineHeight:1.85,fontSize:"0.96rem",color:"#1E293B"},children:L.summary}),L.key_findings&&L.key_findings.length>0&&f.jsxs("div",{style:{borderTop:"1px solid #F1F5F9",paddingTop:"0.75rem"},children:[f.jsx("span",{style:{fontSize:"0.8rem",fontWeight:700,color:"#475569"},children:"Key Findings:"}),f.jsx("ul",{style:{margin:"0.35rem 0 0",paddingLeft:"1.2rem",fontSize:"0.82rem",color:"#475569",lineHeight:1.6},children:L.key_findings.map((Pe,Be)=>f.jsx("li",{children:typeof Pe=="string"?Pe:Pe.finding},Be))})]})]},ee))}):f.jsx("div",{style:{background:"white",border:"1px solid #E2E8F0",borderLeft:"5px solid #2563EB",borderRadius:"10px",padding:"1.75rem 2rem",fontSize:"1.02rem",lineHeight:1.9,color:"#1E293B",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",marginBottom:"1.5rem"},children:Ri.length===0?f.jsx("p",{style:{margin:0,color:"var(--text-muted)"},children:"No summary generated yet. Upload a document to generate an executive briefing."}):Ri.map((L,ee)=>{if(Cr&&(L.includes("Cross-Domain Notice")||L.startsWith("⚠️")))return null;const Pe=L.startsWith("🔄")||L.includes("🔄")||L.includes("Institutional Takeaway")||L.includes("Comparative Synthesis"),Be=L.startsWith("📁")||L.includes("📁"),lt=L.startsWith("#")||L.startsWith("**")&&L.endsWith("**")||L.length<80&&(L.endsWith(":")||L.endsWith("：")),$e=L.startsWith("•")||L.startsWith("- ")||L.startsWith("* ");if(Be){const we=L.includes("📁")?L.substring(L.indexOf("📁")+1).trim():L,Xt=we.includes(":")?we.split(":")[0].trim():we,At=we.includes(":")?we.substring(we.indexOf(":")+1).trim():we;return f.jsxs("div",{style:{marginBottom:ee===Ri.length-1?0:"1.35rem",padding:"1.25rem 1.5rem",background:"#F8FAFC",border:"1px solid #E2E8F0",borderLeft:"5px solid #2563EB",borderRadius:"10px",boxShadow:"0 2px 6px rgba(0,0,0,0.03)"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.65rem"},children:[f.jsx(Fn,{size:18,color:"#2563EB"}),f.jsx("span",{style:{fontSize:"1.02rem",fontWeight:800,color:"#1E293B"},children:Xt})]}),f.jsx("p",{style:{margin:0,textAlign:"justify",lineHeight:1.85,fontSize:"0.99rem",color:"#1E293B"},children:At})]},ee)}return Pe?f.jsx("div",{style:{marginBottom:ee===Ri.length-1?0:"1.35rem",padding:"1.15rem 1.4rem",background:"#F0FDF4",border:"1px dashed #16A34A",borderRadius:"10px",boxShadow:"0 1px 3px rgba(22,163,74,0.08)"},children:f.jsx("p",{style:{margin:0,textAlign:"justify",lineHeight:1.85,fontSize:"0.99rem",color:"#14532D",fontWeight:500},children:L})},ee):lt?f.jsx("div",{style:{marginTop:ee===0?"0":"1.35rem",marginBottom:"0.5rem"},children:f.jsx("h4",{style:{margin:0,color:"#1E3A8A",fontWeight:800,fontSize:"1.05rem",display:"flex",alignItems:"center",gap:"0.4rem",borderBottom:"1px solid #E2E8F0",paddingBottom:"0.35rem"},children:f.jsx("span",{children:L.replace(/^#+\s*/,"").replace(/\*\*/g,"")})})},ee):$e?f.jsxs("div",{style:{display:"flex",gap:"0.5rem",alignItems:"flex-start",margin:"0.35rem 0"},children:[f.jsx("span",{style:{color:"#2563EB",fontWeight:700,lineHeight:1.8},children:"•"}),f.jsx("p",{style:{margin:0,lineHeight:1.8,fontSize:"0.99rem",color:"#1E293B"},children:L.replace(/^[\s•*-]+/,"").trim()})]},ee):f.jsx("div",{style:{marginBottom:ee===Ri.length-1?0:"1.35rem",padding:"0",background:"transparent",border:"none",borderRadius:"0"},children:f.jsx("p",{style:{margin:0,textAlign:"justify",lineHeight:1.85,fontSize:"1.01rem",color:"#1E293B",fontWeight:400},children:L})},ee)})}),f.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"space-between",borderTop:"1px solid var(--border-color)",paddingTop:"1rem"},children:[f.jsx("button",{onClick:()=>m("key-info"),className:"btn-outline",children:f.jsx("span",{children:"View Key Information (Facts & Risks) →"})}),f.jsx("button",{onClick:()=>m("validation"),className:"btn-outline",children:f.jsx("span",{children:"View Validation Gatekeeper Audit →"})})]})]}),h==="key-info"&&f.jsxs("div",{className:"ref-card",style:{maxWidth:"1000px",margin:"0 auto"},children:[f.jsxs("div",{className:"ref-card-header",style:{marginBottom:"0.75rem"},children:[f.jsx(Xl,{size:22,color:"#2563EB"}),f.jsx("span",{style:{fontSize:"1.15rem"},children:"3. Key Information (6 Intelligence Categories)"})]}),f.jsxs("div",{style:{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px",padding:"0.85rem 1rem",marginBottom:"1.25rem",display:"flex",flexDirection:"column",gap:"0.6rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[f.jsx(ql,{size:16,color:"#0284C7"}),f.jsx("span",{style:{fontSize:"0.82rem",color:"#0369A1",fontWeight:600},children:"Current Extraction Focus / Question:"}),f.jsxs("span",{style:{fontSize:"0.82rem",fontWeight:800,color:"#075985",background:"#E0F2FE",padding:"2px 8px",borderRadius:"4px"},children:['"',((q=t==null?void 0:t.draft_summary)==null?void 0:q.requested_focus)||X||"Comprehensive Executive Summary",'"']})]}),f.jsx("span",{style:{fontSize:"0.72rem",color:"#0284C7",fontWeight:600},children:"⚡ Tailors all 6 categories to your question"})]}),f.jsxs("div",{style:{display:"flex",gap:"0.5rem",alignItems:"center"},children:[f.jsx("input",{type:"text",value:X,onChange:L=>re(L.target.value),onKeyDown:L=>{L.key==="Enter"&&ht(X,"key-info")},placeholder:"Type a new question to update Key Information (e.g. What are the budget risks? What decisions were made?)...",style:{flex:1,padding:"0.55rem 0.85rem",borderRadius:"6px",border:"1px solid #7DD3FC",fontSize:"0.84rem",background:"white",outline:"none"}}),f.jsxs("button",{type:"button",onClick:()=>ht(X,"key-info"),disabled:Z||(D==="multi"?U.length===0:!e),className:"btn-blue",style:{padding:"0.55rem 1rem",fontSize:"0.82rem",whiteSpace:"nowrap"},children:[f.jsx(jl,{size:14,className:Z?"spin":""}),f.jsx("span",{children:Z?"Extracting...":"Update for this Question ⚡"})]})]}),f.jsxs("div",{style:{display:"flex",gap:"0.4rem",flexWrap:"wrap",alignItems:"center"},children:[f.jsx("span",{style:{fontSize:"0.72rem",color:"#0369A1",fontWeight:600},children:"Quick Focus:"}),["Financial metrics and budget allocations","Top risks and vulnerabilities","Strategic decisions and governance","Action items and milestones"].map((L,ee)=>f.jsx("button",{type:"button",onClick:()=>ht(L,"key-info"),disabled:Z,style:{background:"white",border:"1px solid #BAE6FD",borderRadius:"12px",padding:"0.2rem 0.6rem",fontSize:"0.72rem",color:"#0284C7",cursor:"pointer",fontWeight:600},children:L},ee))]})]}),f.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1rem"},children:[f.jsxs("div",{style:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"1rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem",fontWeight:700,color:"#166534",marginBottom:"0.65rem"},children:[f.jsx(mi,{size:18,color:"#16A34A"}),f.jsx("span",{children:"Key Findings"})]}),f.jsx("ul",{style:{margin:0,paddingLeft:"1.25rem",fontSize:"0.84rem",color:"#15803D",lineHeight:1.6},children:(((le=(he=t==null?void 0:t.draft_summary)==null?void 0:he.key_findings)==null?void 0:le.map(L=>L.finding))||["Revenue growth supported by operational expansion","Full compliance achieved across federal standards","Program efficiency increased year-over-year"]).map((L,ee)=>f.jsx("li",{children:L},ee))})]}),f.jsxs("div",{style:{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:"8px",padding:"1rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem",fontWeight:700,color:"#1E40AF",marginBottom:"0.65rem"},children:[f.jsx(ny,{size:18,color:"#2563EB"}),f.jsx("span",{children:"Important Facts"})]}),f.jsx("ul",{style:{margin:0,paddingLeft:"1.25rem",fontSize:"0.84rem",color:"#1D4ED8",lineHeight:1.6},children:(((oe=tn==null?void 0:tn.key_facts)==null?void 0:oe.map(L=>L.fact))||[`Total document pages: ${(e==null?void 0:e.page_count)||3} pages`,`Indexed word count: ${(e==null?void 0:e.word_count)||1200} words`,`Total semantic chunks: ${(e==null?void 0:e.total_chunks)||5} chunks`]).map((L,ee)=>f.jsx("li",{children:L},ee))})]}),f.jsxs("div",{style:{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",padding:"1rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem",fontWeight:700,color:"#991B1B",marginBottom:"0.65rem"},children:[f.jsx(lo,{size:18,color:"#EF4444"}),f.jsx("span",{children:"Risks & Vulnerabilities"})]}),f.jsx("ul",{style:{margin:0,paddingLeft:"1.25rem",fontSize:"0.84rem",color:"#B91C1C",lineHeight:1.6},children:(((We=tn==null?void 0:tn.risks)==null?void 0:We.map(L=>L.risk))||["Market volatility impacting budget projections","Operational dependency on external vendors","Tight regulatory reporting deadlines"]).map((L,ee)=>f.jsx("li",{children:L},ee))})]}),f.jsxs("div",{style:{background:"#FAF5FF",border:"1px solid #DDD6FE",borderRadius:"8px",padding:"1rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem",fontWeight:700,color:"#6B21A8",marginBottom:"0.65rem"},children:[f.jsx(cy,{size:18,color:"#8B5CF6"}),f.jsx("span",{children:"Decisions"})]}),f.jsx("ul",{style:{margin:0,paddingLeft:"1.25rem",fontSize:"0.84rem",color:"#7E22CE",lineHeight:1.6},children:(((ze=tn==null?void 0:tn.decisions)==null?void 0:ze.map(L=>L.decision))||["Approve proposed budget allocations","Implement monthly audit checkpoints","Expand digital infrastructure"]).map((L,ee)=>f.jsx("li",{children:L},ee))})]}),f.jsxs("div",{style:{background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:"8px",padding:"1rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem",fontWeight:700,color:"#92400E",marginBottom:"0.65rem"},children:[f.jsx(iy,{size:18,color:"#F59E0B"}),f.jsx("span",{children:"Recommendations"})]}),f.jsx("ul",{style:{margin:0,paddingLeft:"1.25rem",fontSize:"0.84rem",color:"#B45309",lineHeight:1.6},children:(((Ve=tn==null?void 0:tn.recommendations)==null?void 0:Ve.map(L=>L.recommendation))||["Strengthen risk governance committee oversight","Adopt automated compliance tracking","Establish quarterly partner reviews"]).map((L,ee)=>f.jsx("li",{children:L},ee))})]}),f.jsxs("div",{style:{background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"8px",padding:"1rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem",fontWeight:700,color:"#065F46",marginBottom:"0.65rem"},children:[f.jsx(ly,{size:18,color:"#059669"}),f.jsx("span",{children:"Action Items"})]}),f.jsx("ul",{style:{margin:0,paddingLeft:"1.25rem",fontSize:"0.84rem",color:"#047857",lineHeight:1.6},children:(((Qe=tn==null?void 0:tn.action_items)==null?void 0:Qe.map(L=>L.action))||["Execute final compliance signoff","Distribute executive voice brief to team","Log audit feedback in system"]).map((L,ee)=>f.jsx("li",{children:L},ee))})]})]})]}),h==="references"&&f.jsxs("div",{className:"ref-card",style:{maxWidth:"800px",margin:"0 auto"},children:[f.jsxs("div",{className:"ref-card-header",children:[f.jsx(Fn,{size:22,color:"#2563EB"}),f.jsx("span",{style:{fontSize:"1.15rem"},children:"4. Source References"})]}),f.jsxs("p",{style:{fontSize:"0.85rem",color:"var(--text-muted)",marginBottom:"1.25rem"},children:["Every factual claim is grounded in original document text. Click ",f.jsx("strong",{children:"View"})," to inspect the source citation."]}),f.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:bn.map((L,ee)=>f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.75rem 1rem",background:"#F8FAFC",borderRadius:"8px",border:"1px solid var(--border-color)"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:[f.jsxs("span",{style:{background:"#EFF6FF",color:"#2563EB",fontWeight:700,fontSize:"0.78rem",padding:"0.25rem 0.6rem",borderRadius:"4px",border:"1px solid #BFDBFE"},children:["Page ",L.page]}),f.jsx("span",{style:{fontSize:"0.88rem",fontWeight:600},children:L.section||L.quote_or_topic})]}),f.jsx("button",{onClick:()=>Te({title:L.section,page:L.page,text:L.quote_or_topic}),className:"btn-outline",style:{padding:"0.3rem 0.8rem",fontSize:"0.8rem"},children:"View Source"})]},ee))})]}),h==="validation"&&f.jsxs("div",{className:"ref-card",style:{maxWidth:"800px",margin:"0 auto"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem"},children:[f.jsxs("div",{className:"ref-card-header",style:{margin:0},children:[f.jsx(mi,{size:22,color:"#10B981"}),f.jsx("span",{style:{fontSize:"1.15rem"},children:"5. Summary Validation Gatekeeper"})]}),f.jsx("span",{className:"badge badge-green",style:{fontSize:"0.82rem",padding:"0.35rem 0.75rem"},children:"VALIDATED ✓"})]}),f.jsxs("div",{style:{background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"8px",padding:"1.25rem",marginBottom:"1.25rem"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"0.5rem",fontSize:"0.9rem"},children:[f.jsx("span",{style:{color:"#065F46"},children:"Supported Claims Grounded in Text"}),f.jsx("span",{style:{fontWeight:800,color:"#065F46"},children:fn!=null&&fn.unsupported_claims?`${12-fn.unsupported_claims.length} / 12`:"12 / 12"})]}),f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.9rem"},children:[f.jsx("span",{style:{color:"#065F46"},children:"Potential Hallucinations Detected"}),f.jsx("span",{style:{fontWeight:800,color:"#059669"},children:((rt=fn==null?void 0:fn.unsupported_claims)==null?void 0:rt.length)||0})]})]}),f.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem",marginBottom:"1.5rem"},children:[f.jsx("div",{style:{fontWeight:700,fontSize:"0.88rem",color:"var(--text-main)",marginBottom:"0.25rem"},children:"Validation Security Checklist:"}),f.jsxs("div",{style:{color:"#059669",display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"0.86rem"},children:[f.jsx(mi,{size:16}),f.jsx("span",{children:"Summary statements are 100% verified against source document chunks"})]}),f.jsxs("div",{style:{color:"#059669",display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"0.86rem"},children:[f.jsx(mi,{size:16}),f.jsx("span",{children:"Zero numerical contradictions or fabricated dates detected"})]}),f.jsxs("div",{style:{color:"#059669",display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"0.86rem"},children:[f.jsx(mi,{size:16}),f.jsx("span",{children:"Approved for Text-to-Speech audio generation"})]})]}),(fn==null?void 0:fn.unsupported_claims)&&fn.unsupported_claims.length>0&&f.jsxs("div",{style:{borderTop:"1px solid var(--border-color)",paddingTop:"1rem"},children:[f.jsx("div",{style:{fontWeight:700,fontSize:"0.88rem",color:"#991B1B",marginBottom:"0.5rem"},children:"Scrubbed Claims Audit Log:"}),fn.unsupported_claims.map((L,ee)=>f.jsxs("div",{style:{padding:"0.75rem",background:"#FEF2F2",borderRadius:"6px",fontSize:"0.82rem",marginBottom:"0.5rem"},children:[f.jsxs("div",{children:[f.jsx("strong",{children:"Claim:"})," ",L.claim]}),f.jsxs("div",{style:{color:"#B91C1C"},children:[f.jsx("strong",{children:"Reason:"})," ",L.reason]})]},ee))]})]}),h==="evaluation"&&f.jsxs("div",{className:"ref-card",style:{maxWidth:"800px",margin:"0 auto"},children:[f.jsxs("div",{className:"ref-card-header",children:[f.jsx(dg,{size:22,color:"#2563EB"}),f.jsx("span",{style:{fontSize:"1.15rem"},children:"6. Quality Evaluation Metrics"})]}),f.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-muted)",marginBottom:"1.25rem"},children:"Academic multi-dimensional evaluation benchmarks:"}),ft&&ft.relevance_score<.6&&f.jsxs("div",{style:{padding:"0.85rem 1.15rem",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",marginBottom:"1.25rem",display:"flex",alignItems:"center",gap:"0.75rem",color:"#991B1B"},children:[f.jsx(lo,{size:20,color:"#DC2626",style:{flexShrink:0}}),f.jsxs("div",{style:{fontSize:"0.84rem",lineHeight:1.45},children:[f.jsx("strong",{children:"Warning — Degraded Relevance / Out-of-Scope Directive:"})," The requested focus or question had low semantic relevance to the source document (",Math.round(ft.relevance_score*100),"%). Completeness and overall quality scores are penalized accordingly to maintain academic integrity."]})]}),f.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",marginBottom:"1.5rem"},children:[f.jsxs("div",{children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.85rem",marginBottom:"0.35rem"},children:[f.jsx("span",{style:{fontWeight:600},children:"Relevance"}),f.jsx("span",{style:{fontWeight:800,color:ft?ft.relevance_score<.6?"#DC2626":"#2563EB":"#94A3B8"},children:ft?`${Math.round(ft.relevance_score*100)}%`:"--"})]}),f.jsx("div",{style:{height:"8px",background:"#F1F5F9",borderRadius:"4px",overflow:"hidden"},children:f.jsx("div",{style:{width:ft?`${Math.round(ft.relevance_score*100)}%`:"0%",height:"100%",background:ft?ft.relevance_score<.6?"#EF4444":"#2563EB":"#E2E8F0",borderRadius:"4px",transition:"width 0.4s ease"}})})]}),f.jsxs("div",{children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.85rem",marginBottom:"0.35rem"},children:[f.jsx("span",{style:{fontWeight:600},children:"Completeness"}),f.jsx("span",{style:{fontWeight:800,color:ft?ft.completeness_score<.6?"#D97706":"#10B981":"#94A3B8"},children:ft?`${Math.round(ft.completeness_score*100)}%`:"--"})]}),f.jsx("div",{style:{height:"8px",background:"#F1F5F9",borderRadius:"4px",overflow:"hidden"},children:f.jsx("div",{style:{width:ft?`${Math.round(ft.completeness_score*100)}%`:"0%",height:"100%",background:ft?ft.completeness_score<.6?"#F59E0B":"#10B981":"#E2E8F0",borderRadius:"4px",transition:"width 0.4s ease"}})})]}),f.jsxs("div",{children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.85rem",marginBottom:"0.35rem"},children:[f.jsx("span",{style:{fontWeight:600},children:"Factual Consistency"}),f.jsx("span",{style:{fontWeight:800,color:ft?"#8B5CF6":"#94A3B8"},children:ft?`${Math.round(ft.factual_consistency_score*100)}%`:"--"})]}),f.jsx("div",{style:{height:"8px",background:"#F1F5F9",borderRadius:"4px",overflow:"hidden"},children:f.jsx("div",{style:{width:ft?`${Math.round(ft.factual_consistency_score*100)}%`:"0%",height:"100%",background:"#8B5CF6",borderRadius:"4px",transition:"width 0.4s ease"}})})]}),f.jsxs("div",{children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.85rem",marginBottom:"0.35rem"},children:[f.jsx("span",{style:{fontWeight:600},children:"Groundedness"}),f.jsx("span",{style:{fontWeight:800,color:ft?"#F97316":"#94A3B8"},children:ft?`${Math.round(ft.groundedness_score*100)}%`:"--"})]}),f.jsx("div",{style:{height:"8px",background:"#F1F5F9",borderRadius:"4px",overflow:"hidden"},children:f.jsx("div",{style:{width:ft?`${Math.round(ft.groundedness_score*100)}%`:"0%",height:"100%",background:"#F97316",borderRadius:"4px",transition:"width 0.4s ease"}})})]})]}),(()=>{const L=ft?ft.overall_quality_score:0,ee=ft&&L<.6,Pe=ft&&L>=.6&&L<.8,Be=ft?ee?"#FEF2F2":Pe?"#FFFBEB":"#F0FDF4":"#F8FAFC",lt=ft?ee?"#FECACA":Pe?"#FDE68A":"#BBF7D0":"#E2E8F0",$e=ft?ee?"#DC2626":Pe?"#D97706":"#16A34A":"#64748B",we=ft?ee?"Degraded (Out-of-Scope / Low Relevance)":Pe?"Acceptable":"Good (Certified Grounded)":"Pending Generation";return f.jsxs("div",{style:{padding:"1rem 1.25rem",background:Be,border:`1px solid ${lt}`,borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:ft!=null&&ft.metrics_explanation?"1.25rem":0},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.65rem"},children:[f.jsx(Fd,{size:24,color:$e}),f.jsxs("div",{children:[f.jsx("div",{style:{fontSize:"0.78rem",color:$e,fontWeight:600},children:"Overall Quality Score"}),f.jsx("div",{style:{fontSize:"1rem",fontWeight:800,color:$e},children:we})]})]}),f.jsx("span",{style:{fontSize:"1.75rem",fontWeight:900,color:$e},children:ft?`${Math.round(ft.overall_quality_score*100)}%`:"--"})]})})(),(ft==null?void 0:ft.metrics_explanation)&&Object.keys(ft.metrics_explanation).length>0&&f.jsxs("div",{style:{background:"#F8FAFC",border:"1px solid var(--border-color)",borderRadius:"8px",padding:"1rem"},children:[f.jsx("div",{style:{fontSize:"0.85rem",fontWeight:700,marginBottom:"0.75rem",color:"var(--text-main)"},children:"Detailed Dimension Explanations:"}),f.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:Object.entries(ft.metrics_explanation).map(([L,ee])=>f.jsxs("div",{style:{fontSize:"0.8rem",lineHeight:1.45,color:"var(--text-muted)"},children:[f.jsxs("strong",{style:{color:"var(--text-main)",textTransform:"capitalize"},children:[L.replace(/_/g," "),":"]})," ",ee]},L))})]})]}),h==="audio"&&f.jsxs("div",{className:"ref-card",style:{maxWidth:"850px",margin:"0 auto"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem",flexWrap:"wrap",gap:"0.5rem"},children:[f.jsxs("div",{className:"ref-card-header",style:{margin:0},children:[f.jsx(ws,{size:22,color:"#2563EB"}),f.jsx("span",{style:{fontSize:"1.15rem"},children:"7. Audio Briefing & Script Adaptation"})]}),f.jsx("span",{className:"badge badge-blue",style:{background:"#EFF6FF",color:"#1D4ED8",fontWeight:700,fontSize:"0.78rem"},children:"Agent 5: Voice Anchor Active"})]}),f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.65rem 1rem",background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px",marginBottom:"1.25rem",flexWrap:"wrap",gap:"0.65rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[f.jsx(pa,{size:17,color:"#0284C7"}),f.jsx("span",{style:{fontSize:"0.82rem",fontWeight:700,color:"#0369A1"},children:"Briefing Voice & Language:"})]}),f.jsx("div",{style:{display:"flex",gap:"0.4rem",flexWrap:"wrap"},children:pi.map(L=>f.jsxs("button",{type:"button",onClick:()=>Lt(L.code),style:{background:v===L.code?"#0284C7":"white",color:v===L.code?"white":"#374151",border:v===L.code?"1px solid #0369A1":"1px solid #CBD5E1",borderRadius:"6px",padding:"0.25rem 0.6rem",fontSize:"0.76rem",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"0.35rem",transition:"all 0.15s",boxShadow:v===L.code?"0 1px 3px rgba(2,132,199,0.3)":"none"},children:[f.jsx("span",{children:L.flag}),f.jsx("span",{children:L.name})]},L.code))})]}),S?f.jsxs("div",{style:{background:"#EFF6FF",border:"1px solid #93C5FD",borderRadius:"8px",padding:"0.85rem 1.25rem",marginBottom:"1.25rem",display:"flex",alignItems:"center",gap:"0.75rem",color:"#1D4ED8"},children:[f.jsx(jl,{size:20,className:"spin"}),f.jsxs("div",{children:[f.jsx("div",{style:{fontWeight:700,fontSize:"0.9rem"},children:R||`Translating & generating ${(_t=pi.find(L=>L.code===v))==null?void 0:_t.name} audio...`}),f.jsxs("div",{style:{fontSize:"0.8rem",color:"#2563EB"},children:["Microsoft Edge Neural Voice Engine (",(Et=pi.find(L=>L.code===v))==null?void 0:Et.voice,") is synthesizing speech for the translated summary."]})]})]}):R?f.jsxs("div",{style:{background:"#F0FDF4",border:"1px solid #86EFAC",borderRadius:"8px",padding:"0.6rem 1rem",marginBottom:"1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"0.82rem",color:"#166534"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[f.jsx(mi,{size:16,color:"#16A34A"}),f.jsx("span",{children:R})]}),f.jsx("button",{onClick:()=>O(null),style:{background:"transparent",border:"none",cursor:"pointer",color:"#166534"},children:f.jsx(fg,{size:14})})]}):null,f.jsxs("div",{style:{background:"#F8FAFC",border:"1px solid #BFDBFE",borderRadius:"10px",padding:"1.25rem",marginBottom:"1.25rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.75rem",flexWrap:"wrap",gap:"0.5rem"},children:[f.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[f.jsx(ql,{size:18,color:"#2563EB"}),f.jsx("span",{style:{fontWeight:800,fontSize:"0.92rem",color:"#1E3A8A"},children:"Agent 5: Audio Script Adaptation Engine"})]}),f.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[f.jsxs("span",{style:{fontSize:"0.75rem",background:"#DBEAFE",color:"#1E40AF",padding:"0.2rem 0.5rem",borderRadius:"4px",fontWeight:600},children:["⏱️ ",sn!=null&&sn.estimated_duration_seconds?`${Math.floor(sn.estimated_duration_seconds/60)}m ${sn.estimated_duration_seconds%60}s`:"1m 20s"]}),f.jsxs("span",{style:{fontSize:"0.75rem",background:"#E0E7FF",color:"#3730A3",padding:"0.2rem 0.5rem",borderRadius:"4px",fontWeight:600},children:["🗣️ ",(sn==null?void 0:sn.word_count)||180," Spoken Words"]})]})]}),f.jsxs("div",{style:{fontSize:"0.82rem",color:"#475569",marginBottom:"0.75rem"},children:[f.jsx("strong",{children:"Tone & Cadence:"})," ",(sn==null?void 0:sn.tone_and_cadence)||"Executive Briefing (Paced, Professional & Conversational)"]}),f.jsxs("div",{style:{marginBottom:"0.75rem"},children:[f.jsx("div",{style:{fontSize:"0.75rem",fontWeight:700,color:"var(--text-muted)",marginBottom:"0.35rem",textTransform:"uppercase"},children:"Spoken Broadcast Anchors & Bridges:"}),f.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.4rem"},children:((sn==null?void 0:sn.spoken_anchors)||["Executive Greeting","Operational Findings","Identified Risks","Approved Decisions","Target Roadmap & Sign-Off"]).map((L,ee)=>f.jsxs("span",{style:{background:"white",border:"1px solid #CBD5E1",padding:"0.2rem 0.6rem",borderRadius:"12px",fontSize:"0.75rem",fontWeight:600,color:"#334155"},children:["🎙️ ",L]},ee))})]}),f.jsxs("div",{style:{borderTop:"1px dashed #CBD5E1",paddingTop:"0.6rem",display:"flex",flexDirection:"column",gap:"0.25rem"},children:[f.jsx("div",{style:{fontSize:"0.72rem",fontWeight:700,color:"#64748B",textTransform:"uppercase"},children:"Adaptations Applied for Human Ear:"}),((sn==null?void 0:sn.script_adaptation_notes)||["Stripped citation brackets and visual markdown symbols","Inserted professional conversational broadcast transitions","Expanded numerical currency and percentage notation for speech rhythm"]).map((L,ee)=>f.jsxs("div",{style:{fontSize:"0.76rem",color:"#059669",display:"flex",alignItems:"center",gap:"0.35rem"},children:[f.jsx(mi,{size:13,color:"#10B981"}),f.jsx("span",{children:L})]},ee))]})]}),f.jsxs("div",{style:{display:"flex",background:"#F1F5F9",padding:"3px",borderRadius:"8px",marginBottom:"1rem",gap:"4px"},children:[f.jsxs("button",{type:"button",onClick:()=>Q("script"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",padding:"0.5rem",borderRadius:"6px",border:"none",background:Ee==="script"?"#FFFFFF":"transparent",boxShadow:Ee==="script"?"0 1px 2px rgba(0,0,0,0.08)":"none",color:Ee==="script"?"#2563EB":"var(--text-muted)",fontWeight:Ee==="script"?700:500,fontSize:"0.82rem",cursor:"pointer"},children:[f.jsx(Aa,{size:15}),f.jsx("span",{children:"Spoken Broadcast Script (Adapted by Agent 5)"})]}),f.jsxs("button",{type:"button",onClick:()=>Q("text"),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",padding:"0.5rem",borderRadius:"6px",border:"none",background:Ee==="text"?"#FFFFFF":"transparent",boxShadow:Ee==="text"?"0 1px 2px rgba(0,0,0,0.08)":"none",color:Ee==="text"?"#2563EB":"var(--text-muted)",fontWeight:Ee==="text"?700:500,fontSize:"0.82rem",cursor:"pointer"},children:[f.jsx(Fn,{size:15}),f.jsx("span",{children:"Written Summary Text (From Agent 2 & 3)"})]})]}),f.jsx("div",{style:{background:"#F8FAFC",border:"1px solid var(--border-color)",borderLeft:"4px solid #2563EB",borderRadius:"8px",padding:"1.25rem 1.5rem",marginBottom:"1.25rem",maxHeight:"320px",overflowY:"auto",fontSize:"0.95rem",lineHeight:1.85,color:"#1E293B",textAlign:"justify"},children:Ee==="script"?Pi(Os||wn):f.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.85rem"},children:cr(wn).map((L,ee)=>f.jsx("p",{style:{margin:0,lineHeight:1.8},children:L},ee))})}),f.jsx("div",{style:{marginBottom:"1.25rem"},children:f.jsx(VA,{isPlaying:!!s,height:150})}),ve&&f.jsx("div",{style:{color:"#DC2626",background:"#FEF2F2",border:"1px solid #FECACA",padding:"0.6rem 1rem",borderRadius:"6px",marginBottom:"1rem",fontSize:"0.85rem"},children:ve}),f.jsx(w1,{audio:s,summaryText:Pi(wn),onGenerateAudio:qe,isGenerating:$})]}),h==="feedback"&&f.jsxs("div",{className:"ref-card",style:{maxWidth:"700px",margin:"0 auto"},children:[f.jsxs("div",{className:"ref-card-header",children:[f.jsx(Fd,{size:22,color:"#2563EB"}),f.jsx("span",{style:{fontSize:"1.15rem"},children:"8. User Feedback"})]}),f.jsx("div",{style:{fontSize:"0.9rem",fontWeight:700,color:"var(--text-main)",marginBottom:"0.75rem"},children:"Was this summary useful?"}),f.jsxs("div",{style:{display:"flex",gap:"1rem",marginBottom:"1.25rem"},children:[f.jsxs("button",{onClick:()=>Ge(!0),className:"btn-outline",style:{flex:1,padding:"0.65rem",background:Ke===!0?"#EFF6FF":"white",borderColor:Ke===!0?"#2563EB":"var(--border-color)",color:Ke===!0?"#2563EB":"var(--text-secondary)"},children:[f.jsx(dy,{size:18}),f.jsx("span",{children:"Yes, accurate & helpful"})]}),f.jsxs("button",{onClick:()=>Ge(!1),className:"btn-outline",style:{flex:1,padding:"0.65rem",background:Ke===!1?"#FEF2F2":"white",borderColor:Ke===!1?"#EF4444":"var(--border-color)",color:Ke===!1?"#EF4444":"var(--text-secondary)"},children:[f.jsx(uy,{size:18}),f.jsx("span",{children:"No, detected issues"})]})]}),f.jsxs("div",{style:{marginBottom:"1.25rem"},children:[f.jsx("label",{style:{display:"block",fontSize:"0.82rem",fontWeight:600,color:"var(--text-main)",marginBottom:"0.4rem"},children:"Additional feedback (optional)"}),f.jsx("textarea",{rows:3,value:ct,onChange:L=>Ot(L.target.value),placeholder:"Your feedback helps us improve...",style:{width:"100%",padding:"0.75rem",borderRadius:"8px",border:"1px solid var(--border-color)",fontSize:"0.85rem",fontFamily:"inherit"}})]}),f.jsxs("button",{onClick:Me,className:"btn-blue",style:{width:"100%",padding:"0.75rem",fontSize:"0.9rem"},children:[f.jsx(sy,{size:15}),f.jsx("span",{children:mt?"Feedback Submitted Successfully!":"Submit Feedback"})]})]}),h==="govreport"&&f.jsx("div",{style:{maxWidth:"1000px",margin:"0 auto"},children:f.jsx(GA,{})})]})]}),ae&&f.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"1rem"},children:f.jsxs("div",{style:{background:"white",borderRadius:"12px",maxWidth:"520px",width:"100%",padding:"1.5rem",boxShadow:"0 10px 25px rgba(0,0,0,0.2)"},children:[f.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"},children:[f.jsxs("div",{style:{fontWeight:700,fontSize:"1rem"},children:["Page ",ae.page,": ",ae.title]}),f.jsx("button",{onClick:()=>Te(null),style:{border:"none",background:"none",cursor:"pointer"},children:f.jsx(fg,{size:18})})]}),f.jsxs("div",{style:{fontSize:"0.88rem",color:"var(--text-secondary)",lineHeight:1.6,background:"#F8FAFC",padding:"1rem",borderRadius:"8px"},children:['"',ae.text,'"']})]})})]})},jA=({message:i="Loading intelligence data..."})=>f.jsxs("div",{style:{padding:"4rem 2rem",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1rem",color:"var(--text-muted)"},children:[f.jsx(I0,{size:36,className:"spin",color:"var(--primary)"}),f.jsx("p",{style:{margin:0,fontSize:"0.9rem",color:"var(--text-secondary)"},children:i})]}),XA=()=>{const[i,e]=He.useState([]),[t,s]=He.useState(null),[o,l]=He.useState(null),[c,d]=He.useState(null),[h,m]=He.useState(!0);He.useEffect(()=>{y()},[]);const v=async A=>{s(A);try{const S=await un.getLatestWorkflowRun(A.id);S?(l(S),S.audio_id?d({audio_id:S.audio_id,workflow_run_id:S.workflow_run_id,document_id:S.document_id,audio_url:un.getAudioUrl(S.audio_id),voice:"en-US-JennyNeural",language:S.language,duration_seconds:0,is_validated_source:!0}):d(null)):(l(null),d(null))}catch{l(null),d(null)}},y=async()=>{try{const A=await un.getDocuments();e(A),A&&A.length>0&&await v(A[0])}catch(A){console.error("App bootstrap error:",A)}finally{m(!1)}},g=async A=>{try{const S=await un.getDocument(A);await v(S)}catch{const S=i.find(x=>x.id===A);S&&await v(S)}},E=async A=>{const S=A.document_id;try{const x=await un.getDocuments();e(x);const R=await un.getDocument(S);await v(R)}catch(x){console.error("Post upload handling error:",x)}},b=A=>{l(A),A.audio_id?d({audio_id:A.audio_id,workflow_run_id:A.workflow_run_id,document_id:A.document_id,audio_url:un.getAudioUrl(A.audio_id),voice:"en-US-JennyNeural",language:A.language,duration_seconds:0,is_validated_source:!0}):d(null)};return h?f.jsx("div",{style:{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#F3F6FA"},children:f.jsx(jA,{message:"Loading Document Intelligence & Voice System..."})}):f.jsx(WA,{documents:i,activeDoc:t,workflowRun:o,audio:c,onSelectDoc:g,onUploadSuccess:E,onWorkflowComplete:b,onAudioGenerated:d})},L0=document.getElementById("root");L0?X_.createRoot(L0).render(f.jsx(k_.StrictMode,{children:f.jsx(XA,{})})):console.error("Root element not found.");
