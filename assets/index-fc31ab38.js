(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const te=(e,t)=>e===t,L={equals:te};let G=X;const w=1,I=2,W={owned:null,cleanups:null,context:null,owner:null};var d=null;let U=null,f=null,h=null,m=null,O=0;function ne(e,t){const n=f,s=d,i=e.length===0,r=t===void 0?s:t,o=i?W:{owned:null,cleanups:null,context:r?r.context:null,owner:r},l=i?e:()=>e(()=>b(()=>P(o)));d=o,f=null;try{return C(l,!0)}finally{f=n,d=s}}function E(e,t){t=t?Object.assign({},L,t):L;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),Q(n,i));return[K.bind(n),s]}function N(e,t,n){const s=H(e,t,!1,w);$(s)}function Y(e,t,n){G=re;const s=H(e,t,!1,w);(!n||!n.render)&&(s.user=!0),m?m.push(s):$(s)}function B(e,t,n){n=n?Object.assign({},L,n):L;const s=H(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,$(s),K.bind(s)}function b(e){if(f===null)return e();const t=f;f=null;try{return e()}finally{f=t}}function K(){if(this.sources&&this.state)if(this.state===w)$(this);else{const e=h;h=null,C(()=>_(this),!1),h=e}if(f){const e=this.observers?this.observers.length:0;f.sources?(f.sources.push(this),f.sourceSlots.push(e)):(f.sources=[this],f.sourceSlots=[e]),this.observers?(this.observers.push(f),this.observerSlots.push(f.sources.length-1)):(this.observers=[f],this.observerSlots=[f.sources.length-1])}return this.value}function Q(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&C(()=>{for(let i=0;i<e.observers.length;i+=1){const r=e.observers[i],o=U&&U.running;o&&U.disposed.has(r),(o?!r.tState:!r.state)&&(r.pure?h.push(r):m.push(r),r.observers&&J(r)),o||(r.state=w)}if(h.length>1e6)throw h=[],new Error},!1)),t}function $(e){if(!e.fn)return;P(e);const t=d,n=f,s=O;f=d=e,se(e,e.value,s),f=n,d=t}function se(e,t,n){let s;try{s=e.fn(t)}catch(i){return e.pure&&(e.state=w,e.owned&&e.owned.forEach(P),e.owned=null),e.updatedAt=n+1,Z(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Q(e,s):e.value=s,e.updatedAt=n)}function H(e,t,n,s=w,i){const r={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:d,context:d?d.context:null,pure:n};return d===null||d!==W&&(d.owned?d.owned.push(r):d.owned=[r]),r}function T(e){if(e.state===0)return;if(e.state===I)return _(e);if(e.suspense&&b(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<O);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===w)$(e);else if(e.state===I){const s=h;h=null,C(()=>_(e,t[0]),!1),h=s}}function C(e,t){if(h)return e();let n=!1;t||(h=[]),m?n=!0:m=[],O++;try{const s=e();return ie(n),s}catch(s){n||(m=null),h=null,Z(s)}}function ie(e){if(h&&(X(h),h=null),e)return;const t=m;m=null,t.length&&C(()=>G(t),!1)}function X(e){for(let t=0;t<e.length;t++)T(e[t])}function re(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:T(s)}for(t=0;t<n;t++)T(e[t])}function _(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const s=e.sources[n];if(s.sources){const i=s.state;i===w?s!==t&&(!s.updatedAt||s.updatedAt<O)&&T(s):i===I&&_(s,t)}}}function J(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=I,n.pure?h.push(n):m.push(n),n.observers&&J(n))}}function P(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const r=i.pop(),o=n.observerSlots.pop();s<i.length&&(r.sourceSlots[o]=s,i[s]=r,n.observerSlots[s]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)P(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function le(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Z(e,t=d){throw le(e)}function p(e,t){return b(()=>e(t||{}))}const oe=e=>`Stale read from <${e}>.`;function A(e){const t=e.keyed,n=B(()=>e.when,void 0,{equals:(s,i)=>t?s===i:!s==!i});return B(()=>{const s=n();if(s){const i=e.children;return typeof i=="function"&&i.length>0?b(()=>i(t?s:()=>{if(!b(n))throw oe("Show");return e.when})):i}return e.fallback},void 0,void 0)}function ce(e,t,n){let s=n.length,i=t.length,r=s,o=0,l=0,u=t[i-1].nextSibling,c=null;for(;o<i||l<r;){if(t[o]===n[l]){o++,l++;continue}for(;t[i-1]===n[r-1];)i--,r--;if(i===o){const a=r<s?l?n[l-1].nextSibling:n[r-l]:u;for(;l<r;)e.insertBefore(n[l++],a)}else if(r===l)for(;o<i;)(!c||!c.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[r-1]&&n[l]===t[i-1]){const a=t[--i].nextSibling;e.insertBefore(n[l++],t[o++].nextSibling),e.insertBefore(n[--r],a),t[i]=n[r]}else{if(!c){c=new Map;let y=l;for(;y<r;)c.set(n[y],y++)}const a=c.get(t[o]);if(a!=null)if(l<a&&a<r){let y=o,M=1,D;for(;++y<i&&y<r&&!((D=c.get(t[y]))==null||D!==a+M);)M++;if(M>a-l){const ee=t[o];for(;l<a;)e.insertBefore(n[l++],ee)}else e.replaceChild(n[l++],t[o++])}else o++;else t[o++].remove()}}}const V="_$DX_DELEGATE";function ue(e,t,n,s={}){let i;return ne(r=>{i=r,t===document?e():S(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function x(e,t,n){let s;const i=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},r=t?()=>b(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return r.cloneNode=r,r}function ae(e,t=window.document){const n=t[V]||(t[V]=new Set);for(let s=0,i=e.length;s<i;s++){const r=e[s];n.has(r)||(n.add(r),t.addEventListener(r,de))}}function fe(e,t){t==null?e.removeAttribute("class"):e.className=t}function he(e,t,n){return b(()=>e(t,n))}function S(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return R(e,t,s,n);N(i=>R(e,t(),i,n),s)}function de(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function R(e,t,n,s,i){for(;typeof n=="function";)n=n();if(t===n)return n;const r=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,r==="string"||r==="number")if(r==="number"&&(t=t.toString()),o){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=v(e,n,s,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||r==="boolean")n=v(e,n,s);else{if(r==="function")return N(()=>{let l=t();for(;typeof l=="function";)l=l();n=R(e,l,n,s)}),()=>n;if(Array.isArray(t)){const l=[],u=n&&Array.isArray(n);if(j(l,t,n,i))return N(()=>n=R(e,l,n,s,!0)),()=>n;if(l.length===0){if(n=v(e,n,s),o)return n}else u?n.length===0?k(e,l,s):ce(e,n,l):(n&&v(e),k(e,l));n=l}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=v(e,n,s,t);v(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function j(e,t,n,s){let i=!1;for(let r=0,o=t.length;r<o;r++){let l=t[r],u=n&&n[r],c;if(!(l==null||l===!0||l===!1))if((c=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))i=j(e,l,u)||i;else if(c==="function")if(s){for(;typeof l=="function";)l=l();i=j(e,Array.isArray(l)?l:[l],Array.isArray(u)?u:[u])||i}else e.push(l),i=!0;else{const a=String(l);u&&u.nodeType===3&&u.data===a?e.push(u):e.push(document.createTextNode(a))}}return i}function k(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function v(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let r=!1;for(let o=t.length-1;o>=0;o--){const l=t[o];if(i!==l){const u=l.parentNode===e;!r&&!o?u?e.replaceChild(i,l):e.insertBefore(i,n):u&&l.remove()}else r=!0}}else e.insertBefore(i,n);return[i]}const q=E(null),z=E(!1),F=600,ge="Изображение имеет малую высоту";const pe="Старт";function g(e){return e!=null}class me{recorder;fps=60;chunks=[];url=null;state=null;constructor({canvas:t}){this.recorder=new MediaRecorder(t.captureStream(this.fps),{bitsPerSecond:8e6}),this.recorder.ondataavailable=n=>{this.chunks.push(n.data)},this.recorder.onstop=()=>{this.url=URL.createObjectURL(new Blob(this.chunks,{type:"video/mp4"})),this.download(),this.chunks=[]}}download(){if(g(this.url)){const t=document.createElement("a");t.href=this.url,t.target="_blank",t.download="result.mp4",t.click()}}record(){this.state="started",this.recorder.start()}stop(){this.state="ended",this.recorder.stop()}}class we{image=new Image;canvas=null;width=null;height=null;y=0;animationRequest=0;videoManager;constructor({image:t,canvas:n}){this.image.src=URL.createObjectURL(t),this.canvas=n,this.image.onload=()=>{this.width=this.image.naturalWidth,this.height=this.image.naturalHeight,this.canvas&&(this.canvas.width=this.width,this.canvas.height=F,this.draw(0))},this.videoManager=new me({canvas:this.canvas})}getContext(){return this.canvas?.getContext("2d")}draw(t){const n=this.getContext();g(n)&&g(this.width)&&g(this.height)&&n.drawImage(this.image,0,t,this.width,this.height)}incrementYPosition(){this.y+=1}reachedTheEnd(){return g(this.height)&&this.y+F>=this.height}animate(){if(this.reachedTheEnd())this.videoManager.stop(),cancelAnimationFrame(this.animationRequest),this.y=0;else{const t=this.getContext();g(this.videoManager.state)||this.videoManager.record(),g(t)&&g(this.width)&&g(this.height)&&(t.clearRect(0,0,this.width,this.height),this.incrementYPosition(),this.draw(-this.y),this.animationRequest=requestAnimationFrame(this.animate.bind(this)))}}}const ye=x("<div>"),be=x("<canvas class=canvas>"),ve=()=>{const[e]=q,[t,n]=E(null),[s,i]=E(!1);let r,o;Y(()=>{const c=e();g(c)&&g(r)&&(o=new we({image:c,canvas:r}))});const l=()=>{let c=setInterval(()=>{i(!0),n(a=>a===0?(clearInterval(c),g(o)&&o.animate(),null):g(a)?a-1:3)},1e3)},u=B(()=>{const c=t();return g(c)?`...${c}`:pe});return[p(A,{get when(){return!s()||t()},get children(){const c=ye();return c.$$click=l,S(c,u),N(()=>fe(c,`button ${t()?"disabled":""}`)),c}}),(()=>{const c=be(),a=r;return typeof a=="function"?he(a,c):r=c,c})()]};ae(["click"]);const Se=x("<span class=image-low-height>"),Ae=x("<div class=image-wrapper>"),Ee=()=>{const[e]=q,[t,n]=E(null),[s,i]=z;return Y(()=>{const r=e();if(r){const o=new FileReader;o.onload=l=>{if(typeof l.target?.result=="string"){const u=document.createElement("img"),c=l.target.result;u.src=c,u.onload=()=>{n(c),i(u.naturalHeight>=F)}}},o.readAsDataURL(r)}}),p(A,{get when(){return t()},get children(){const r=Ae();return S(r,p(A,{get when(){return!s()},get children(){const o=Se();return S(o,ge),o}}),null),S(r,p(A,{get when(){return s()},get children(){return p(ve,{})}}),null),r}})},$e="Выберите изображение";const Ce=x('<label class=label><div class=button></div><input hidden type=file accept="image/png, image/jpeg">'),xe=()=>{const[e,t]=q,[n]=z,s=i=>{const r=i.currentTarget.files?.[0];r&&t(r)};return p(A,{get when(){return!e()||!n()},get children(){const i=Ce(),r=i.firstChild,o=r.nextSibling;return S(r,$e),o.addEventListener("change",s),i}})};function Le(){return[p(xe,{}),p(Ee,{})]}const Ie=document.getElementById("root");ue(()=>p(Le,{}),Ie);
