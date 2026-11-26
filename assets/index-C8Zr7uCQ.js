import{initializeApp as hh}from"https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";import{getDatabase as dh,ref as fh,set as ph,get as mh,onValue as gh,update as _h,remove as vh}from"https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const xh={apiKey:"AIzaSyBtl1_ScEASiOlBgcVz0vaJ8tFC344PMoA",authDomain:"wizard-chess-63c18.firebaseapp.com",databaseURL:"https://wizard-chess-63c18-default-rtdb.firebaseio.com",projectId:"wizard-chess-63c18",storageBucket:"wizard-chess-63c18.firebasestorage.app",messagingSenderId:"825912678494",appId:"1:825912678494:web:6275022eab05cc3152fccf",measurementId:"G-RDFLXNBHBW"};try{const i=hh(xh),e=dh(i);window.db=e,window.dbRef=fh,window.dbSet=ph,window.dbGet=mh,window.dbOnValue=gh,window.dbUpdate=_h,window.dbRemove=vh}catch(i){console.warn("Firebase não inicializado no modo offline:",i)}async function yh(i,e,t){const s=await(await fetch("http://127.0.0.1:5001/wizard-chess-63c18/us-central1/salvarPartida",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jogador_brancas:i,jogador_pretas:e,vencedor:t})})).json();console.log("Salvo no Neon:",s)}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const da="160",wi={ROTATE:0,DOLLY:1,PAN:2},Ai={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Mh=0,ka=1,Sh=2,lu=1,uu=2,wn=3,Zn=0,Vt=1,Tt=2,Yn=0,$i=1,Ga=2,Ha=3,Va=4,Eh=5,hi=100,bh=101,Th=102,Wa=103,Xa=104,wh=200,Ah=201,Rh=202,Ch=203,$o=204,Qo=205,Ph=206,Lh=207,Ih=208,Dh=209,Uh=210,Nh=211,Oh=212,Fh=213,Bh=214,zh=0,kh=1,Gh=2,Ur=3,Hh=4,Vh=5,Wh=6,Xh=7,hu=0,qh=1,Yh=2,jn=0,jh=1,Kh=2,Jh=3,Zh=4,$h=5,Qh=6,du=300,as=301,cs=302,ea=303,ta=304,qr=306,Ds=1e3,an=1001,na=1002,Ot=1003,qa=1004,co=1005,Qt=1006,ed=1007,Us=1008,Kn=1009,td=1010,nd=1011,fa=1012,fu=1013,Vn=1014,Wn=1015,Ns=1016,pu=1017,mu=1018,pi=1020,id=1021,cn=1023,sd=1024,rd=1025,mi=1026,ls=1027,od=1028,gu=1029,ad=1030,_u=1031,vu=1033,lo=33776,uo=33777,ho=33778,fo=33779,Ya=35840,ja=35841,Ka=35842,Ja=35843,xu=36196,Za=37492,$a=37496,Qa=37808,ec=37809,tc=37810,nc=37811,ic=37812,sc=37813,rc=37814,oc=37815,ac=37816,cc=37817,lc=37818,uc=37819,hc=37820,dc=37821,po=36492,fc=36494,pc=36495,cd=36283,mc=36284,gc=36285,_c=36286,yu=3e3,gi=3001,ld=3200,ud=3201,Mu=0,hd=1,en="",Rt="srgb",In="srgb-linear",pa="display-p3",Yr="display-p3-linear",Nr="linear",ot="srgb",Or="rec709",Fr="p3",Ri=7680,vc=519,dd=512,fd=513,pd=514,Su=515,md=516,gd=517,_d=518,vd=519,xc=35044,yc="300 es",ia=1035,Rn=2e3,Br=2001;class bi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ar=Math.PI/180,zr=180/Math.PI;function hs(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]).toLowerCase()}function Ct(i,e,t){return Math.max(e,Math.min(t,i))}function xd(i,e){return(i%e+e)%e}function mo(i,e,t){return(1-t)*i+t*e}function Mc(i){return(i&i-1)===0&&i!==0}function sa(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function vs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const yd={DEG2RAD:Ar};class re{constructor(e=0,t=0){re.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,t,n,s,r,o,a,c,l){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],y=s[1],_=s[4],S=s[7],L=s[2],R=s[5],w=s[8];return r[0]=o*v+a*y+c*L,r[3]=o*m+a*_+c*R,r[6]=o*p+a*S+c*w,r[1]=l*v+u*y+h*L,r[4]=l*m+u*_+h*R,r[7]=l*p+u*S+h*w,r[2]=d*v+f*y+g*L,r[5]=d*m+f*_+g*R,r[8]=d*p+f*S+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,d=a*c-u*r,f=l*r-o*c,g=t*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(s*l-u*n)*v,e[2]=(a*n-s*o)*v,e[3]=d*v,e[4]=(u*t-s*c)*v,e[5]=(s*r-a*t)*v,e[6]=f*v,e[7]=(n*c-l*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(go.makeScale(e,t)),this}rotate(e){return this.premultiply(go.makeRotation(-e)),this}translate(e,t){return this.premultiply(go.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const go=new Ye;function Eu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function kr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Md(){const i=kr("canvas");return i.style.display="block",i}const Sc={};function Cs(i){i in Sc||(Sc[i]=!0,console.warn(i))}const Ec=new Ye().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),bc=new Ye().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ks={[In]:{transfer:Nr,primaries:Or,toReference:i=>i,fromReference:i=>i},[Rt]:{transfer:ot,primaries:Or,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Yr]:{transfer:Nr,primaries:Fr,toReference:i=>i.applyMatrix3(bc),fromReference:i=>i.applyMatrix3(Ec)},[pa]:{transfer:ot,primaries:Fr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(bc),fromReference:i=>i.applyMatrix3(Ec).convertLinearToSRGB()}},Sd=new Set([In,Yr]),nt={enabled:!0,_workingColorSpace:In,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Sd.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Ks[e].toReference,s=Ks[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Ks[i].primaries},getTransfer:function(i){return i===en?Nr:Ks[i].transfer}};function Qi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _o(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ci;class bu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ci===void 0&&(Ci=kr("canvas")),Ci.width=e.width,Ci.height=e.height;const n=Ci.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ci}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=kr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Qi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Qi(t[n]/255)*255):t[n]=Qi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ed=0;class Tu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=hs(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(vo(s[o].image)):r.push(vo(s[o]))}else r=vo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function vo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?bu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bd=0;class Wt extends bi{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,n=an,s=an,r=Qt,o=Us,a=cn,c=Kn,l=Wt.DEFAULT_ANISOTROPY,u=en){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=hs(),this.name="",this.source=new Tu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Cs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===gi?Rt:en),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==du)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ds:e.x=e.x-Math.floor(e.x);break;case an:e.x=e.x<0?0:1;break;case na:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ds:e.y=e.y-Math.floor(e.y);break;case an:e.y=e.y<0?0:1;break;case na:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Cs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Rt?gi:yu}set encoding(e){Cs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===gi?Rt:en}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=du;Wt.DEFAULT_ANISOTROPY=1;class ct{constructor(e=0,t=0,n=0,s=1){ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(l+1)/2,S=(f+1)/2,L=(p+1)/2,R=(u+d)/4,w=(h+v)/4,N=(g+m)/4;return _>S&&_>L?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=R/n,r=w/n):S>L?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=R/s,r=N/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=w/r,s=N/r),this.set(n,s,r,t),this}let y=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(h-v)/y,this.z=(d-u)/y,this.w=Math.acos((l+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Td extends bi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(Cs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===gi?Rt:en),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Wt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Tu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends Td{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class wu extends Wt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wd extends Wt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(h!==v||c!==d||l!==f||u!==g){let m=1-a;const p=c*d+l*f+u*g+h*v,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const L=Math.sqrt(_),R=Math.atan2(L,p*y);m=Math.sin(m*R)/L,a=Math.sin(a*R)/L}const S=a*y;if(c=c*m+d*S,l=l*m+f*S,u=u*m+g*S,h=h*m+v*S,m===1-a){const L=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=L,l*=L,u*=L,h*=L}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+u*h+c*f-l*d,e[t+1]=c*g+u*d+l*h-a*f,e[t+2]=l*g+u*f+a*d-c*h,e[t+3]=u*g-a*h-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),h=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>h){const f=2*Math.sqrt(1+n-a-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>h){const f=2*Math.sqrt(1+a-n-h);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Tc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Tc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xo.copy(this).projectOnVector(e),this.sub(xo)}reflect(e){return this.sub(xo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xo=new C,Tc=new vi;class Gs{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,nn):nn.fromBufferAttribute(r,o),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Js.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Js.copy(n.boundingBox)),Js.applyMatrix4(e.matrixWorld),this.union(Js)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xs),Zs.subVectors(this.max,xs),Pi.subVectors(e.a,xs),Li.subVectors(e.b,xs),Ii.subVectors(e.c,xs),Un.subVectors(Li,Pi),Nn.subVectors(Ii,Li),si.subVectors(Pi,Ii);let t=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-si.z,si.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,si.z,0,-si.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-si.y,si.x,0];return!yo(t,Pi,Li,Ii,Zs)||(t=[1,0,0,0,1,0,0,0,1],!yo(t,Pi,Li,Ii,Zs))?!1:($s.crossVectors(Un,Nn),t=[$s.x,$s.y,$s.z],yo(t,Pi,Li,Ii,Zs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Mn=[new C,new C,new C,new C,new C,new C,new C,new C],nn=new C,Js=new Gs,Pi=new C,Li=new C,Ii=new C,Un=new C,Nn=new C,si=new C,xs=new C,Zs=new C,$s=new C,ri=new C;function yo(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ri.fromArray(i,r);const a=s.x*Math.abs(ri.x)+s.y*Math.abs(ri.y)+s.z*Math.abs(ri.z),c=e.dot(ri),l=t.dot(ri),u=n.dot(ri);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Ad=new Gs,ys=new C,Mo=new C;class jr{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ad.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ys.subVectors(e,this.center);const t=ys.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ys,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ys.copy(e.center).add(Mo)),this.expandByPoint(ys.copy(e.center).sub(Mo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Sn=new C,So=new C,Qs=new C,On=new C,Eo=new C,er=new C,bo=new C;class Kr{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){So.copy(e).add(t).multiplyScalar(.5),Qs.copy(t).sub(e).normalize(),On.copy(this.origin).sub(So);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Qs),a=On.dot(this.direction),c=-On.dot(Qs),l=On.lengthSq(),u=Math.abs(1-o*o);let h,d,f,g;if(u>0)if(h=o*c-a,d=o*a-c,g=r*u,h>=0)if(d>=-g)if(d<=g){const v=1/u;h*=v,d*=v,f=h*(h+o*d+2*a)+d*(o*h+d+2*c)+l}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(So).addScaledVector(Qs,d),f}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);const n=Sn.dot(this.direction),s=Sn.dot(Sn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,n,s,r){Eo.subVectors(t,e),er.subVectors(n,e),bo.crossVectors(Eo,er);let o=this.direction.dot(bo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;On.subVectors(this.origin,e);const c=a*this.direction.dot(er.crossVectors(On,er));if(c<0)return null;const l=a*this.direction.dot(Eo.cross(On));if(l<0||c+l>o)return null;const u=-a*On.dot(bo);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pt{constructor(e,t,n,s,r,o,a,c,l,u,h,d,f,g,v,m){pt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,h,d,f,g,v,m)}set(e,t,n,s,r,o,a,c,l,u,h,d,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Di.setFromMatrixColumn(e,0).length(),r=1/Di.setFromMatrixColumn(e,1).length(),o=1/Di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=o*u,f=o*h,g=a*u,v=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+g*l,t[5]=d-v*l,t[9]=-a*c,t[2]=v-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*u,f=c*h,g=l*u,v=l*h;t[0]=d+v*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=v+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*u,f=c*h,g=l*u,v=l*h;t[0]=d-v*a,t[4]=-o*h,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=v-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*u,f=o*h,g=a*u,v=a*h;t[0]=c*u,t[4]=g*l-f,t[8]=d*l+v,t[1]=c*h,t[5]=v*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,f=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=v-d*h,t[8]=g*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=f*h+g,t[10]=d-v*h}else if(e.order==="XZY"){const d=o*c,f=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+v,t[5]=o*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=a*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rd,e,Cd)}lookAt(e,t,n){const s=this.elements;return qt.subVectors(e,t),qt.lengthSq()===0&&(qt.z=1),qt.normalize(),Fn.crossVectors(n,qt),Fn.lengthSq()===0&&(Math.abs(n.z)===1?qt.x+=1e-4:qt.z+=1e-4,qt.normalize(),Fn.crossVectors(n,qt)),Fn.normalize(),tr.crossVectors(qt,Fn),s[0]=Fn.x,s[4]=tr.x,s[8]=qt.x,s[1]=Fn.y,s[5]=tr.y,s[9]=qt.y,s[2]=Fn.z,s[6]=tr.z,s[10]=qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],y=n[3],_=n[7],S=n[11],L=n[15],R=s[0],w=s[4],N=s[8],M=s[12],b=s[1],O=s[5],V=s[9],J=s[13],D=s[2],B=s[6],G=s[10],j=s[14],K=s[3],X=s[7],$=s[11],Q=s[15];return r[0]=o*R+a*b+c*D+l*K,r[4]=o*w+a*O+c*B+l*X,r[8]=o*N+a*V+c*G+l*$,r[12]=o*M+a*J+c*j+l*Q,r[1]=u*R+h*b+d*D+f*K,r[5]=u*w+h*O+d*B+f*X,r[9]=u*N+h*V+d*G+f*$,r[13]=u*M+h*J+d*j+f*Q,r[2]=g*R+v*b+m*D+p*K,r[6]=g*w+v*O+m*B+p*X,r[10]=g*N+v*V+m*G+p*$,r[14]=g*M+v*J+m*j+p*Q,r[3]=y*R+_*b+S*D+L*K,r[7]=y*w+_*O+S*B+L*X,r[11]=y*N+_*V+S*G+L*$,r[15]=y*M+_*J+S*j+L*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*c*h-s*l*h-r*a*d+n*l*d+s*a*f-n*c*f)+v*(+t*c*f-t*l*d+r*o*d-s*o*f+s*l*u-r*c*u)+m*(+t*l*h-t*a*f-r*o*h+n*o*f+r*a*u-n*l*u)+p*(-s*a*u-t*c*h+t*a*d+s*o*h-n*o*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],y=h*m*l-v*d*l+v*c*f-a*m*f-h*c*p+a*d*p,_=g*d*l-u*m*l-g*c*f+o*m*f+u*c*p-o*d*p,S=u*v*l-g*h*l+g*a*f-o*v*f-u*a*p+o*h*p,L=g*h*c-u*v*c-g*a*d+o*v*d+u*a*m-o*h*m,R=t*y+n*_+s*S+r*L;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return e[0]=y*w,e[1]=(v*d*r-h*m*r-v*s*f+n*m*f+h*s*p-n*d*p)*w,e[2]=(a*m*r-v*c*r+v*s*l-n*m*l-a*s*p+n*c*p)*w,e[3]=(h*c*r-a*d*r-h*s*l+n*d*l+a*s*f-n*c*f)*w,e[4]=_*w,e[5]=(u*m*r-g*d*r+g*s*f-t*m*f-u*s*p+t*d*p)*w,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*p-t*c*p)*w,e[7]=(o*d*r-u*c*r+u*s*l-t*d*l-o*s*f+t*c*f)*w,e[8]=S*w,e[9]=(g*h*r-u*v*r-g*n*f+t*v*f+u*n*p-t*h*p)*w,e[10]=(o*v*r-g*a*r+g*n*l-t*v*l-o*n*p+t*a*p)*w,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*f-t*a*f)*w,e[12]=L*w,e[13]=(u*v*s-g*h*s+g*n*d-t*v*d-u*n*m+t*h*m)*w,e[14]=(g*a*s-o*v*s-g*n*c+t*v*c+o*n*m-t*a*m)*w,e[15]=(o*h*s-u*a*s+u*n*c-t*h*c-o*n*d+t*a*d)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,d=r*l,f=r*u,g=r*h,v=o*u,m=o*h,p=a*h,y=c*l,_=c*u,S=c*h,L=n.x,R=n.y,w=n.z;return s[0]=(1-(v+p))*L,s[1]=(f+S)*L,s[2]=(g-_)*L,s[3]=0,s[4]=(f-S)*R,s[5]=(1-(d+p))*R,s[6]=(m+y)*R,s[7]=0,s[8]=(g+_)*w,s[9]=(m-y)*w,s[10]=(1-(d+v))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Di.set(s[0],s[1],s[2]).length();const o=Di.set(s[4],s[5],s[6]).length(),a=Di.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],sn.copy(this);const l=1/r,u=1/o,h=1/a;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=u,sn.elements[5]*=u,sn.elements[6]*=u,sn.elements[8]*=h,sn.elements[9]*=h,sn.elements[10]*=h,t.setFromRotationMatrix(sn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Rn){const c=this.elements,l=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s);let f,g;if(a===Rn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Br)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Rn){const c=this.elements,l=1/(t-e),u=1/(n-s),h=1/(o-r),d=(t+e)*l,f=(n+s)*u;let g,v;if(a===Rn)g=(o+r)*h,v=-2*h;else if(a===Br)g=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Di=new C,sn=new pt,Rd=new C(0,0,0),Cd=new C(1,1,1),Fn=new C,tr=new C,qt=new C,wc=new pt,Ac=new vi;class Jr{constructor(e=0,t=0,n=0,s=Jr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ct(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ct(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ac.setFromEuler(this),this.setFromQuaternion(Ac,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Jr.DEFAULT_ORDER="XYZ";class ma{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Pd=0;const Rc=new C,Ui=new vi,En=new pt,nr=new C,Ms=new C,Ld=new C,Id=new vi,Cc=new C(1,0,0),Pc=new C(0,1,0),Lc=new C(0,0,1),Dd={type:"added"},Ud={type:"removed"};class yt extends bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=hs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new C,t=new Jr,n=new vi,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pt},normalMatrix:{value:new Ye}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ma,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.premultiply(Ui),this}rotateX(e){return this.rotateOnAxis(Cc,e)}rotateY(e){return this.rotateOnAxis(Pc,e)}rotateZ(e){return this.rotateOnAxis(Lc,e)}translateOnAxis(e,t){return Rc.copy(e).applyQuaternion(this.quaternion),this.position.add(Rc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cc,e)}translateY(e){return this.translateOnAxis(Pc,e)}translateZ(e){return this.translateOnAxis(Lc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?nr.copy(e):nr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(Ms,nr,this.up):En.lookAt(nr,Ms,this.up),this.quaternion.setFromRotationMatrix(En),s&&(En.extractRotation(s.matrixWorld),Ui.setFromRotationMatrix(En),this.quaternion.premultiply(Ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Dd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ud)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),En.multiply(e.parent.matrixWorld)),e.applyMatrix4(En),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,e,Ld),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,Id,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}yt.DEFAULT_UP=new C(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new C,bn=new C,To=new C,Tn=new C,Ni=new C,Oi=new C,Ic=new C,wo=new C,Ao=new C,Ro=new C;let ir=!1;class on{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),rn.subVectors(e,t),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){rn.subVectors(s,t),bn.subVectors(n,t),To.subVectors(e,t);const o=rn.dot(rn),a=rn.dot(bn),c=rn.dot(To),l=bn.dot(bn),u=bn.dot(To),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-a*u)*d,g=(o*u-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getUV(e,t,n,s,r,o,a,c){return ir===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ir=!0),this.getInterpolation(e,t,n,s,r,o,a,c)}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Tn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Tn.x),c.addScaledVector(o,Tn.y),c.addScaledVector(a,Tn.z),c)}static isFrontFacing(e,t,n,s){return rn.subVectors(n,t),bn.subVectors(e,t),rn.cross(bn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),rn.cross(bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return ir===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ir=!0),on.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return on.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Ni.subVectors(s,n),Oi.subVectors(r,n),wo.subVectors(e,n);const c=Ni.dot(wo),l=Oi.dot(wo);if(c<=0&&l<=0)return t.copy(n);Ao.subVectors(e,s);const u=Ni.dot(Ao),h=Oi.dot(Ao);if(u>=0&&h<=u)return t.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(Ni,o);Ro.subVectors(e,r);const f=Ni.dot(Ro),g=Oi.dot(Ro);if(g>=0&&f<=g)return t.copy(r);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Oi,a);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return Ic.subVectors(r,s),a=(h-u)/(h-u+(f-g)),t.copy(s).addScaledVector(Ic,a);const p=1/(m+v+d);return o=v*p,a=d*p,t.copy(n).addScaledVector(Ni,o).addScaledVector(Oi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Au={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},sr={h:0,s:0,l:0};function Co(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=nt.workingColorSpace){if(e=xd(e,1),t=Ct(t,0,1),n=Ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Co(o,r,e+1/3),this.g=Co(o,r,e),this.b=Co(o,r,e-1/3)}return nt.toWorkingColorSpace(this,s),this}setStyle(e,t=Rt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){const n=Au[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}copyLinearToSRGB(e){return this.r=_o(e.r),this.g=_o(e.g),this.b=_o(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return nt.fromWorkingColorSpace(It.copy(this),e),Math.round(Ct(It.r*255,0,255))*65536+Math.round(Ct(It.g*255,0,255))*256+Math.round(Ct(It.b*255,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.fromWorkingColorSpace(It.copy(this),t);const n=It.r,s=It.g,r=It.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=nt.workingColorSpace){return nt.fromWorkingColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Rt){nt.fromWorkingColorSpace(It.copy(this),e);const t=It.r,n=It.g,s=It.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Bn),this.setHSL(Bn.h+e,Bn.s+t,Bn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bn),e.getHSL(sr);const n=mo(Bn.h,sr.h,t),s=mo(Bn.s,sr.s,t),r=mo(Bn.l,sr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Je;Je.NAMES=Au;let Nd=0;class ds extends bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=hs(),this.name="",this.type="Material",this.blending=$i,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$o,this.blendDst=Qo,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=Ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(n.blending=this.blending),this.side!==Zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$o&&(n.blendSrc=this.blendSrc),this.blendDst!==Qo&&(n.blendDst=this.blendDst),this.blendEquation!==hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ur&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Bt extends ds{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=hu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new C,rr=new re;class un{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)rr.fromBufferAttribute(this,t),rr.applyMatrix3(e),this.setXY(t,rr.x,rr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vs(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vs(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vs(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xc&&(e.usage=this.usage),e}}class Ru extends un{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Cu extends un{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class st extends un{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Od=0;const $t=new pt,Po=new yt,Fi=new C,Yt=new Gs,Ss=new Gs,bt=new C;class Ut extends bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=hs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Eu(e)?Cu:Ru)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,n){return $t.makeTranslation(e,t,n),this.applyMatrix4($t),this}scale(e,t,n){return $t.makeScale(e,t,n),this.applyMatrix4($t),this}lookAt(e){return Po.lookAt(e),Po.updateMatrix(),this.applyMatrix4(Po.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fi).negate(),this.translate(Fi.x,Fi.y,Fi.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new st(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Yt.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Yt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Yt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Yt.min),this.boundingBox.expandByPoint(Yt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(Yt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Ss.setFromBufferAttribute(a),this.morphTargetsRelative?(bt.addVectors(Yt.min,Ss.min),Yt.expandByPoint(bt),bt.addVectors(Yt.max,Ss.max),Yt.expandByPoint(bt)):(Yt.expandByPoint(Ss.min),Yt.expandByPoint(Ss.max))}Yt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)bt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(bt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)bt.fromBufferAttribute(a,l),c&&(Fi.fromBufferAttribute(e,l),bt.add(Fi)),s=Math.max(s,n.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,o=t.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new un(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let b=0;b<a;b++)l[b]=new C,u[b]=new C;const h=new C,d=new C,f=new C,g=new re,v=new re,m=new re,p=new C,y=new C;function _(b,O,V){h.fromArray(s,b*3),d.fromArray(s,O*3),f.fromArray(s,V*3),g.fromArray(o,b*2),v.fromArray(o,O*2),m.fromArray(o,V*2),d.sub(h),f.sub(h),v.sub(g),m.sub(g);const J=1/(v.x*m.y-m.x*v.y);isFinite(J)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-v.y).multiplyScalar(J),y.copy(f).multiplyScalar(v.x).addScaledVector(d,-m.x).multiplyScalar(J),l[b].add(p),l[O].add(p),l[V].add(p),u[b].add(y),u[O].add(y),u[V].add(y))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let b=0,O=S.length;b<O;++b){const V=S[b],J=V.start,D=V.count;for(let B=J,G=J+D;B<G;B+=3)_(n[B+0],n[B+1],n[B+2])}const L=new C,R=new C,w=new C,N=new C;function M(b){w.fromArray(r,b*3),N.copy(w);const O=l[b];L.copy(O),L.sub(w.multiplyScalar(w.dot(O))).normalize(),R.crossVectors(N,O);const J=R.dot(u[b])<0?-1:1;c[b*4]=L.x,c[b*4+1]=L.y,c[b*4+2]=L.z,c[b*4+3]=J}for(let b=0,O=S.length;b<O;++b){const V=S[b],J=V.start,D=V.count;for(let B=J,G=J+D;B<G;B+=3)M(n[B+0]),M(n[B+1]),M(n[B+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new un(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new C,r=new C,o=new C,a=new C,c=new C,l=new C,u=new C,h=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,h=a.normalized,d=new l.constructor(c.length*u);let f=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*u;for(let p=0;p<u;p++)d[g++]=l[f++]}return new un(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Dc=new pt,oi=new Kr,or=new jr,Uc=new C,Bi=new C,zi=new C,ki=new C,Lo=new C,ar=new C,cr=new re,lr=new re,ur=new re,Nc=new C,Oc=new C,Fc=new C,hr=new C,dr=new C;class ve extends yt{constructor(e=new Ut,t=new Bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){ar.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],h=r[c];u!==0&&(Lo.fromBufferAttribute(h,e),o?ar.addScaledVector(Lo,u):ar.addScaledVector(Lo.sub(t),u))}t.add(ar)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),or.copy(n.boundingSphere),or.applyMatrix4(r),oi.copy(e.ray).recast(e.near),!(or.containsPoint(oi.origin)===!1&&(oi.intersectSphere(or,Uc)===null||oi.origin.distanceToSquared(Uc)>(e.far-e.near)**2))&&(Dc.copy(r).invert(),oi.copy(e.ray).applyMatrix4(Dc),!(n.boundingBox!==null&&oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,oi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,L=_;S<L;S+=3){const R=a.getX(S),w=a.getX(S+1),N=a.getX(S+2);s=fr(this,p,e,n,l,u,h,R,w,N),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=a.getX(m),_=a.getX(m+1),S=a.getX(m+2);s=fr(this,o,e,n,l,u,h,y,_,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),_=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,L=_;S<L;S+=3){const R=S,w=S+1,N=S+2;s=fr(this,p,e,n,l,u,h,R,w,N),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=m,_=m+1,S=m+2;s=fr(this,o,e,n,l,u,h,y,_,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Fd(i,e,t,n,s,r,o,a){let c;if(e.side===Vt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Zn,a),c===null)return null;dr.copy(a),dr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(dr);return l<t.near||l>t.far?null:{distance:l,point:dr.clone(),object:i}}function fr(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Bi),i.getVertexPosition(c,zi),i.getVertexPosition(l,ki);const u=Fd(i,e,t,n,Bi,zi,ki,hr);if(u){s&&(cr.fromBufferAttribute(s,a),lr.fromBufferAttribute(s,c),ur.fromBufferAttribute(s,l),u.uv=on.getInterpolation(hr,Bi,zi,ki,cr,lr,ur,new re)),r&&(cr.fromBufferAttribute(r,a),lr.fromBufferAttribute(r,c),ur.fromBufferAttribute(r,l),u.uv1=on.getInterpolation(hr,Bi,zi,ki,cr,lr,ur,new re),u.uv2=u.uv1),o&&(Nc.fromBufferAttribute(o,a),Oc.fromBufferAttribute(o,c),Fc.fromBufferAttribute(o,l),u.normal=on.getInterpolation(hr,Bi,zi,ki,Nc,Oc,Fc,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new C,materialIndex:0};on.getNormal(Bi,zi,ki,h.normal),u.face=h}return u}class jt extends Ut{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(u,3)),this.setAttribute("uv",new st(h,2));function g(v,m,p,y,_,S,L,R,w,N,M){const b=S/w,O=L/N,V=S/2,J=L/2,D=R/2,B=w+1,G=N+1;let j=0,K=0;const X=new C;for(let $=0;$<G;$++){const Q=$*O-J;for(let fe=0;fe<B;fe++){const W=fe*b-V;X[v]=W*y,X[m]=Q*_,X[p]=D,l.push(X.x,X.y,X.z),X[v]=0,X[m]=0,X[p]=R>0?1:-1,u.push(X.x,X.y,X.z),h.push(fe/w),h.push(1-$/N),j+=1}}for(let $=0;$<N;$++)for(let Q=0;Q<w;Q++){const fe=d+Q+B*$,W=d+Q+B*($+1),ee=d+(Q+1)+B*($+1),pe=d+(Q+1)+B*$;c.push(fe,W,pe),c.push(W,ee,pe),K+=6}a.addGroup(f,K,M),f+=K,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function us(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=us(i[t]);for(const s in n)e[s]=n[s]}return e}function Bd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Pu(i){return i.getRenderTarget()===null?i.outputColorSpace:nt.workingColorSpace}const zd={clone:us,merge:Nt};var kd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xi extends ds{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kd,this.fragmentShader=Gd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=us(e.uniforms),this.uniformsGroups=Bd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Lu extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=Rn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Gt extends Lu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zr*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ar*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Gi=-90,Hi=1;class Hd extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Gt(Gi,Hi,e,t);s.layers=this.layers,this.add(s);const r=new Gt(Gi,Hi,e,t);r.layers=this.layers,this.add(r);const o=new Gt(Gi,Hi,e,t);o.layers=this.layers,this.add(o);const a=new Gt(Gi,Hi,e,t);a.layers=this.layers,this.add(a);const c=new Gt(Gi,Hi,e,t);c.layers=this.layers,this.add(c);const l=new Gt(Gi,Hi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Br)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Iu extends Wt{constructor(e,t,n,s,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:as,super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vd extends _i{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Cs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===gi?Rt:en),this.texture=new Iu(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Qt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new jt(5,5,5),r=new xi({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:Yn});r.uniforms.tEquirect.value=t;const o=new ve(s,r),a=t.minFilter;return t.minFilter===Us&&(t.minFilter=Qt),new Hd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const Io=new C,Wd=new C,Xd=new Ye;class kn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Io.subVectors(n,t).cross(Wd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Io),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Xd.getNormalMatrix(e),s=this.coplanarPoint(Io).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ai=new jr,pr=new C;class ga{constructor(e=new kn,t=new kn,n=new kn,s=new kn,r=new kn,o=new kn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],h=s[6],d=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],y=s[13],_=s[14],S=s[15];if(n[0].setComponents(c-r,d-l,m-f,S-p).normalize(),n[1].setComponents(c+r,d+l,m+f,S+p).normalize(),n[2].setComponents(c+o,d+u,m+g,S+y).normalize(),n[3].setComponents(c-o,d-u,m-g,S-y).normalize(),n[4].setComponents(c-a,d-h,m-v,S-_).normalize(),t===Rn)n[5].setComponents(c+a,d+h,m+v,S+_).normalize();else if(t===Br)n[5].setComponents(a,h,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(e){return ai.center.set(0,0,0),ai.radius=.7071067811865476,ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(pr.x=s.normal.x>0?e.max.x:e.min.x,pr.y=s.normal.y>0?e.max.y:e.min.y,pr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(pr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Du(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function qd(i,e){const t=e.isWebGL2,n=new WeakMap;function s(l,u){const h=l.array,d=l.usage,f=h.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,h,d),l.onUploadCallback();let v;if(h instanceof Float32Array)v=i.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)v=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)v=i.SHORT;else if(h instanceof Uint32Array)v=i.UNSIGNED_INT;else if(h instanceof Int32Array)v=i.INT;else if(h instanceof Int8Array)v=i.BYTE;else if(h instanceof Uint8Array)v=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)v=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:v,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:f}}function r(l,u,h){const d=u.array,f=u._updateRange,g=u.updateRanges;if(i.bindBuffer(h,l),f.count===-1&&g.length===0&&i.bufferSubData(h,0,d),g.length!==0){for(let v=0,m=g.length;v<m;v++){const p=g[v];t?i.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):i.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}f.count!==-1&&(t?i.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):i.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);u&&(i.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);if(h===void 0)n.set(l,s(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,u),h.version=l.version}}return{get:o,remove:a,update:c}}class Ti extends Ut{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,h=e/a,d=t/c,f=[],g=[],v=[],m=[];for(let p=0;p<u;p++){const y=p*d-o;for(let _=0;_<l;_++){const S=_*h-r;g.push(S,-y,0),v.push(0,0,1),m.push(_/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){const _=y+l*p,S=y+l*(p+1),L=y+1+l*(p+1),R=y+1+l*p;f.push(_,S,R),f.push(S,L,R)}this.setIndex(f),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(v,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ti(e.width,e.height,e.widthSegments,e.heightSegments)}}var Yd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jd=`#ifdef USE_ALPHAHASH
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
#endif`,Kd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,$d=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qd=`#ifdef USE_AOMAP
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
#endif`,ef=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tf=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,nf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,sf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,of=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,af=`#ifdef USE_IRIDESCENCE
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
#endif`,cf=`#ifdef USE_BUMPMAP
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
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,uf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,df=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ff=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,gf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,_f=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,vf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xf=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ef=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tf=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,wf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Af=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Rf=`#ifdef USE_ENVMAP
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
#endif`,Cf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Lf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,If=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Df=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Uf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nf=`#ifdef USE_GRADIENTMAP
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
}`,Of=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ff=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kf=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
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
#endif`,Gf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,Hf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Yf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,jf=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Kf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Jf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$f=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ep=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,tp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,np=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ip=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sp=`#if defined( USE_POINTS_UV )
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
#endif`,rp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,op=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ap=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,lp=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,up=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,dp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gp=`#ifdef USE_NORMALMAP
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
#endif`,_p=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ep=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ap=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Pp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Lp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,Ip=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Dp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Up=`#ifdef USE_SKINNING
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
#endif`,Np=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Op=`#ifdef USE_SKINNING
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
#endif`,Fp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kp=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gp=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Hp=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Yp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jp=`uniform sampler2D t2D;
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
}`,Kp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$p=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qp=`#include <common>
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
}`,em=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,tm=`#define DISTANCE
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
}`,nm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rm=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,om=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,am=`#include <common>
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
}`,cm=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,lm=`#define LAMBERT
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
}`,um=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,hm=`#define MATCAP
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
}`,dm=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,fm=`#define NORMAL
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
}`,pm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mm=`#define PHONG
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
}`,gm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,_m=`#define STANDARD
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
}`,vm=`#define STANDARD
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
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,xm=`#define TOON
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
}`,ym=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Mm=`uniform float size;
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
}`,Sm=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Em=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,bm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,Tm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,wm=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ve={alphahash_fragment:Yd,alphahash_pars_fragment:jd,alphamap_fragment:Kd,alphamap_pars_fragment:Jd,alphatest_fragment:Zd,alphatest_pars_fragment:$d,aomap_fragment:Qd,aomap_pars_fragment:ef,batching_pars_vertex:tf,batching_vertex:nf,begin_vertex:sf,beginnormal_vertex:rf,bsdfs:of,iridescence_fragment:af,bumpmap_pars_fragment:cf,clipping_planes_fragment:lf,clipping_planes_pars_fragment:uf,clipping_planes_pars_vertex:hf,clipping_planes_vertex:df,color_fragment:ff,color_pars_fragment:pf,color_pars_vertex:mf,color_vertex:gf,common:_f,cube_uv_reflection_fragment:vf,defaultnormal_vertex:xf,displacementmap_pars_vertex:yf,displacementmap_vertex:Mf,emissivemap_fragment:Sf,emissivemap_pars_fragment:Ef,colorspace_fragment:bf,colorspace_pars_fragment:Tf,envmap_fragment:wf,envmap_common_pars_fragment:Af,envmap_pars_fragment:Rf,envmap_pars_vertex:Cf,envmap_physical_pars_fragment:Gf,envmap_vertex:Pf,fog_vertex:Lf,fog_pars_vertex:If,fog_fragment:Df,fog_pars_fragment:Uf,gradientmap_pars_fragment:Nf,lightmap_fragment:Of,lightmap_pars_fragment:Ff,lights_lambert_fragment:Bf,lights_lambert_pars_fragment:zf,lights_pars_begin:kf,lights_toon_fragment:Hf,lights_toon_pars_fragment:Vf,lights_phong_fragment:Wf,lights_phong_pars_fragment:Xf,lights_physical_fragment:qf,lights_physical_pars_fragment:Yf,lights_fragment_begin:jf,lights_fragment_maps:Kf,lights_fragment_end:Jf,logdepthbuf_fragment:Zf,logdepthbuf_pars_fragment:$f,logdepthbuf_pars_vertex:Qf,logdepthbuf_vertex:ep,map_fragment:tp,map_pars_fragment:np,map_particle_fragment:ip,map_particle_pars_fragment:sp,metalnessmap_fragment:rp,metalnessmap_pars_fragment:op,morphcolor_vertex:ap,morphnormal_vertex:cp,morphtarget_pars_vertex:lp,morphtarget_vertex:up,normal_fragment_begin:hp,normal_fragment_maps:dp,normal_pars_fragment:fp,normal_pars_vertex:pp,normal_vertex:mp,normalmap_pars_fragment:gp,clearcoat_normal_fragment_begin:_p,clearcoat_normal_fragment_maps:vp,clearcoat_pars_fragment:xp,iridescence_pars_fragment:yp,opaque_fragment:Mp,packing:Sp,premultiplied_alpha_fragment:Ep,project_vertex:bp,dithering_fragment:Tp,dithering_pars_fragment:wp,roughnessmap_fragment:Ap,roughnessmap_pars_fragment:Rp,shadowmap_pars_fragment:Cp,shadowmap_pars_vertex:Pp,shadowmap_vertex:Lp,shadowmask_pars_fragment:Ip,skinbase_vertex:Dp,skinning_pars_vertex:Up,skinning_vertex:Np,skinnormal_vertex:Op,specularmap_fragment:Fp,specularmap_pars_fragment:Bp,tonemapping_fragment:zp,tonemapping_pars_fragment:kp,transmission_fragment:Gp,transmission_pars_fragment:Hp,uv_pars_fragment:Vp,uv_pars_vertex:Wp,uv_vertex:Xp,worldpos_vertex:qp,background_vert:Yp,background_frag:jp,backgroundCube_vert:Kp,backgroundCube_frag:Jp,cube_vert:Zp,cube_frag:$p,depth_vert:Qp,depth_frag:em,distanceRGBA_vert:tm,distanceRGBA_frag:nm,equirect_vert:im,equirect_frag:sm,linedashed_vert:rm,linedashed_frag:om,meshbasic_vert:am,meshbasic_frag:cm,meshlambert_vert:lm,meshlambert_frag:um,meshmatcap_vert:hm,meshmatcap_frag:dm,meshnormal_vert:fm,meshnormal_frag:pm,meshphong_vert:mm,meshphong_frag:gm,meshphysical_vert:_m,meshphysical_frag:vm,meshtoon_vert:xm,meshtoon_frag:ym,points_vert:Mm,points_frag:Sm,shadow_vert:Em,shadow_frag:bm,sprite_vert:Tm,sprite_frag:wm},ue={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},mn={basic:{uniforms:Nt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Nt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Je(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Nt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Nt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Nt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Je(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Nt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Nt([ue.points,ue.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Nt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Nt([ue.common,ue.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Nt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Nt([ue.sprite,ue.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Nt([ue.common,ue.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Nt([ue.lights,ue.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};mn.physical={uniforms:Nt([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const mr={r:0,b:0,g:0};function Am(i,e,t,n,s,r,o){const a=new Je(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function g(m,p){let y=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?t:e).get(_)),_===null?v(a,c):_&&_.isColor&&(v(_,1),y=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),_&&(_.isCubeTexture||_.mapping===qr)?(u===void 0&&(u=new ve(new jt(1,1,1),new xi({name:"BackgroundCubeMaterial",uniforms:us(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,R,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=nt.getTransfer(_.colorSpace)!==ot,(h!==_||d!==_.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ve(new Ti(2,2),new xi({name:"BackgroundMaterial",uniforms:us(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=nt.getTransfer(_.colorSpace)!==ot,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function v(m,p){m.getRGB(mr,Pu(i)),n.buffers.color.setClear(mr.r,mr.g,mr.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,v(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,v(a,c)},render:g}}function Rm(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null);let l=c,u=!1;function h(D,B,G,j,K){let X=!1;if(o){const $=v(j,G,B);l!==$&&(l=$,f(l.object)),X=p(D,j,G,K),X&&y(D,j,G,K)}else{const $=B.wireframe===!0;(l.geometry!==j.id||l.program!==G.id||l.wireframe!==$)&&(l.geometry=j.id,l.program=G.id,l.wireframe=$,X=!0)}K!==null&&t.update(K,i.ELEMENT_ARRAY_BUFFER),(X||u)&&(u=!1,N(D,B,G,j),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function f(D){return n.isWebGL2?i.bindVertexArray(D):r.bindVertexArrayOES(D)}function g(D){return n.isWebGL2?i.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function v(D,B,G){const j=G.wireframe===!0;let K=a[D.id];K===void 0&&(K={},a[D.id]=K);let X=K[B.id];X===void 0&&(X={},K[B.id]=X);let $=X[j];return $===void 0&&($=m(d()),X[j]=$),$}function m(D){const B=[],G=[],j=[];for(let K=0;K<s;K++)B[K]=0,G[K]=0,j[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:G,attributeDivisors:j,object:D,attributes:{},index:null}}function p(D,B,G,j){const K=l.attributes,X=B.attributes;let $=0;const Q=G.getAttributes();for(const fe in Q)if(Q[fe].location>=0){const ee=K[fe];let pe=X[fe];if(pe===void 0&&(fe==="instanceMatrix"&&D.instanceMatrix&&(pe=D.instanceMatrix),fe==="instanceColor"&&D.instanceColor&&(pe=D.instanceColor)),ee===void 0||ee.attribute!==pe||pe&&ee.data!==pe.data)return!0;$++}return l.attributesNum!==$||l.index!==j}function y(D,B,G,j){const K={},X=B.attributes;let $=0;const Q=G.getAttributes();for(const fe in Q)if(Q[fe].location>=0){let ee=X[fe];ee===void 0&&(fe==="instanceMatrix"&&D.instanceMatrix&&(ee=D.instanceMatrix),fe==="instanceColor"&&D.instanceColor&&(ee=D.instanceColor));const pe={};pe.attribute=ee,ee&&ee.data&&(pe.data=ee.data),K[fe]=pe,$++}l.attributes=K,l.attributesNum=$,l.index=j}function _(){const D=l.newAttributes;for(let B=0,G=D.length;B<G;B++)D[B]=0}function S(D){L(D,0)}function L(D,B){const G=l.newAttributes,j=l.enabledAttributes,K=l.attributeDivisors;G[D]=1,j[D]===0&&(i.enableVertexAttribArray(D),j[D]=1),K[D]!==B&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,B),K[D]=B)}function R(){const D=l.newAttributes,B=l.enabledAttributes;for(let G=0,j=B.length;G<j;G++)B[G]!==D[G]&&(i.disableVertexAttribArray(G),B[G]=0)}function w(D,B,G,j,K,X,$){$===!0?i.vertexAttribIPointer(D,B,G,K,X):i.vertexAttribPointer(D,B,G,j,K,X)}function N(D,B,G,j){if(n.isWebGL2===!1&&(D.isInstancedMesh||j.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();const K=j.attributes,X=G.getAttributes(),$=B.defaultAttributeValues;for(const Q in X){const fe=X[Q];if(fe.location>=0){let W=K[Q];if(W===void 0&&(Q==="instanceMatrix"&&D.instanceMatrix&&(W=D.instanceMatrix),Q==="instanceColor"&&D.instanceColor&&(W=D.instanceColor)),W!==void 0){const ee=W.normalized,pe=W.itemSize,we=t.get(W);if(we===void 0)continue;const Me=we.buffer,De=we.type,Fe=we.bytesPerElement,Te=n.isWebGL2===!0&&(De===i.INT||De===i.UNSIGNED_INT||W.gpuType===fu);if(W.isInterleavedBufferAttribute){const Oe=W.data,P=Oe.stride,le=W.offset;if(Oe.isInstancedInterleavedBuffer){for(let Y=0;Y<fe.locationSize;Y++)L(fe.location+Y,Oe.meshPerAttribute);D.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=Oe.meshPerAttribute*Oe.count)}else for(let Y=0;Y<fe.locationSize;Y++)S(fe.location+Y);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let Y=0;Y<fe.locationSize;Y++)w(fe.location+Y,pe/fe.locationSize,De,ee,P*Fe,(le+pe/fe.locationSize*Y)*Fe,Te)}else{if(W.isInstancedBufferAttribute){for(let Oe=0;Oe<fe.locationSize;Oe++)L(fe.location+Oe,W.meshPerAttribute);D.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Oe=0;Oe<fe.locationSize;Oe++)S(fe.location+Oe);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let Oe=0;Oe<fe.locationSize;Oe++)w(fe.location+Oe,pe/fe.locationSize,De,ee,pe*Fe,pe/fe.locationSize*Oe*Fe,Te)}}else if($!==void 0){const ee=$[Q];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(fe.location,ee);break;case 3:i.vertexAttrib3fv(fe.location,ee);break;case 4:i.vertexAttrib4fv(fe.location,ee);break;default:i.vertexAttrib1fv(fe.location,ee)}}}}R()}function M(){V();for(const D in a){const B=a[D];for(const G in B){const j=B[G];for(const K in j)g(j[K].object),delete j[K];delete B[G]}delete a[D]}}function b(D){if(a[D.id]===void 0)return;const B=a[D.id];for(const G in B){const j=B[G];for(const K in j)g(j[K].object),delete j[K];delete B[G]}delete a[D.id]}function O(D){for(const B in a){const G=a[B];if(G[D.id]===void 0)continue;const j=G[D.id];for(const K in j)g(j[K].object),delete j[K];delete G[D.id]}}function V(){J(),u=!0,l!==c&&(l=c,f(l.object))}function J(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:V,resetDefaultState:J,dispose:M,releaseStatesOfGeometry:b,releaseStatesOfProgram:O,initAttributes:_,enableAttribute:S,disableUnusedAttributes:R}}function Cm(i,e,t,n){const s=n.isWebGL2;let r;function o(u){r=u}function a(u,h){i.drawArrays(r,u,h),t.update(h,r,1)}function c(u,h,d){if(d===0)return;let f,g;if(s)f=i,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,u,h,d),t.update(h,r,d)}function l(u,h,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(u[g],h[g]);else{f.multiDrawArraysWEBGL(r,u,0,h,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Pm(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),v=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),_=d>0,S=o||e.has("OES_texture_float"),L=_&&S,R=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:y,vertexTextures:_,floatFragmentTextures:S,floatVertexTextures:L,maxSamples:R}}function Lm(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new kn,a=new Ye,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const y=r?0:n,_=y*4;let S=p.clippingState||null;c.value=S,S=u(g,d,_,f);for(let L=0;L!==_;++L)S[L]=t[L];p.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=f+v*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,S=f;_!==v;++_,S+=4)o.copy(h[_]).applyMatrix4(y,a),o.normal.toArray(m,S),m[S+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Im(i){let e=new WeakMap;function t(o,a){return a===ea?o.mapping=as:a===ta&&(o.mapping=cs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ea||a===ta)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Vd(c.height/2);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Uu extends Lu{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Wi=4,Bc=[.125,.215,.35,.446,.526,.582],di=20,Do=new Uu,zc=new Je;let Uo=null,No=0,Oo=0;const ci=(1+Math.sqrt(5))/2,Vi=1/ci,kc=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,ci,Vi),new C(0,ci,-Vi),new C(Vi,0,ci),new C(-Vi,0,ci),new C(ci,Vi,0),new C(-ci,Vi,0)];class Gc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Uo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Uo,No,Oo),e.scissorTest=!1,gr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===as||e.mapping===cs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Uo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:Ns,format:cn,colorSpace:In,depthBuffer:!1},s=Hc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dm(r)),this._blurMaterial=Um(r,e,t)}return s}_compileMaterial(e){const t=new ve(this._lodPlanes[0],e);this._renderer.compile(t,Do)}_sceneToCubeUV(e,t,n,s){const a=new Gt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(zc),u.toneMapping=jn,u.autoClear=!1;const f=new Bt({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),g=new ve(new jt,f);let v=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,v=!0):(f.color.copy(zc),v=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):y===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const _=this._cubeSize;gr(s,y*_,p>2?_:0,_,_),u.setRenderTarget(s),v&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===as||e.mapping===cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ve(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;gr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Do)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=kc[(s-1)%kc.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ve(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*di-1),v=r/g,m=isFinite(r)?1+Math.floor(u*v):di;m>di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${di}`);const p=[];let y=0;for(let w=0;w<di;++w){const N=w/v,M=Math.exp(-N*N/2);p.push(M),w===0?y+=M:w<m&&(y+=2*M)}for(let w=0;w<p.length;w++)p[w]=p[w]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-n;const S=this._sizeLods[s],L=3*S*(s>_-Wi?s-_+Wi:0),R=4*(this._cubeSize-S);gr(t,L,R,3*S,2*S),c.setRenderTarget(t),c.render(h,Do)}}function Dm(i){const e=[],t=[],n=[];let s=i;const r=i-Wi+1+Bc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Wi?c=Bc[o-i+Wi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,v=3,m=2,p=1,y=new Float32Array(v*g*f),_=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let R=0;R<f;R++){const w=R%3*2/3-1,N=R>2?0:-1,M=[w,N,0,w+2/3,N,0,w+2/3,N+1,0,w,N,0,w+2/3,N+1,0,w,N+1,0];y.set(M,v*g*R),_.set(d,m*g*R);const b=[R,R,R,R,R,R];S.set(b,p*g*R)}const L=new Ut;L.setAttribute("position",new un(y,v)),L.setAttribute("uv",new un(_,m)),L.setAttribute("faceIndex",new un(S,p)),e.push(L),s>Wi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Hc(i,e,t){const n=new _i(i,e,t);return n.texture.mapping=qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function gr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Um(i,e,t){const n=new Float32Array(di),s=new C(0,1,0);return new xi({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Vc(){return new xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_a(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Wc(){return new xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function _a(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Nm(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===ea||c===ta,u=c===as||c===cs;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new Gc(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(l&&h&&h.height>0||u&&h&&s(h)){t===null&&(t=new Gc(i));const d=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Om(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Fm(i,e,t,n){const s={},r=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const f=h.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)e.update(v[m],i.ARRAY_BUFFER)}}function l(h){const d=[],f=h.index,g=h.attributes.position;let v=0;if(f!==null){const y=f.array;v=f.version;for(let _=0,S=y.length;_<S;_+=3){const L=y[_+0],R=y[_+1],w=y[_+2];d.push(L,R,R,w,w,L)}}else if(g!==void 0){const y=g.array;v=g.version;for(let _=0,S=y.length/3-1;_<S;_+=3){const L=_+0,R=_+1,w=_+2;d.push(L,R,R,w,w,L)}}else return;const m=new(Eu(d)?Cu:Ru)(d,1);m.version=v;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Bm(i,e,t,n){const s=n.isWebGL2;let r;function o(f){r=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function u(f,g){i.drawElements(r,g,a,f*c),t.update(g,r,1)}function h(f,g,v){if(v===0)return;let m,p;if(s)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,f*c,v),t.update(g,r,v)}function d(f,g,v){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<v;p++)this.render(f[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,f,0,v);let p=0;for(let y=0;y<v;y++)p+=g[y];t.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function zm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function km(i,e){return i[0]-e[0]}function Gm(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Hm(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,o=new ct,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,h){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=f!==void 0?f.length:0;let v=r.get(u);if(v===void 0||v.count!==g){let D=function(){V.dispose(),r.delete(u),u.removeEventListener("dispose",D)};v!==void 0&&v.texture.dispose();const y=u.morphAttributes.position!==void 0,_=u.morphAttributes.normal!==void 0,S=u.morphAttributes.color!==void 0,L=u.morphAttributes.position||[],R=u.morphAttributes.normal||[],w=u.morphAttributes.color||[];let N=0;y===!0&&(N=1),_===!0&&(N=2),S===!0&&(N=3);let M=u.attributes.position.count*N,b=1;M>e.maxTextureSize&&(b=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const O=new Float32Array(M*b*4*g),V=new wu(O,M,b,g);V.type=Wn,V.needsUpdate=!0;const J=N*4;for(let B=0;B<g;B++){const G=L[B],j=R[B],K=w[B],X=M*b*4*B;for(let $=0;$<G.count;$++){const Q=$*J;y===!0&&(o.fromBufferAttribute(G,$),O[X+Q+0]=o.x,O[X+Q+1]=o.y,O[X+Q+2]=o.z,O[X+Q+3]=0),_===!0&&(o.fromBufferAttribute(j,$),O[X+Q+4]=o.x,O[X+Q+5]=o.y,O[X+Q+6]=o.z,O[X+Q+7]=0),S===!0&&(o.fromBufferAttribute(K,$),O[X+Q+8]=o.x,O[X+Q+9]=o.y,O[X+Q+10]=o.z,O[X+Q+11]=K.itemSize===4?o.w:1)}}v={count:g,texture:V,size:new re(M,b)},r.set(u,v),u.addEventListener("dispose",D)}let m=0;for(let y=0;y<d.length;y++)m+=d[y];const p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",p),h.getUniforms().setValue(i,"morphTargetInfluences",d),h.getUniforms().setValue(i,"morphTargetsTexture",v.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",v.size)}else{const f=d===void 0?0:d.length;let g=n[u.id];if(g===void 0||g.length!==f){g=[];for(let _=0;_<f;_++)g[_]=[_,0];n[u.id]=g}for(let _=0;_<f;_++){const S=g[_];S[0]=_,S[1]=d[_]}g.sort(Gm);for(let _=0;_<8;_++)_<f&&g[_][1]?(a[_][0]=g[_][0],a[_][1]=g[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(km);const v=u.morphAttributes.position,m=u.morphAttributes.normal;let p=0;for(let _=0;_<8;_++){const S=a[_],L=S[0],R=S[1];L!==Number.MAX_SAFE_INTEGER&&R?(v&&u.getAttribute("morphTarget"+_)!==v[L]&&u.setAttribute("morphTarget"+_,v[L]),m&&u.getAttribute("morphNormal"+_)!==m[L]&&u.setAttribute("morphNormal"+_,m[L]),s[_]=R,p+=R):(v&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),m&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),s[_]=0)}const y=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(i,"morphTargetBaseInfluence",y),h.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function Vm(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class Nu extends Wt{constructor(e,t,n,s,r,o,a,c,l,u){if(u=u!==void 0?u:mi,u!==mi&&u!==ls)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===mi&&(n=Vn),n===void 0&&u===ls&&(n=pi),super(null,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ot,this.minFilter=c!==void 0?c:Ot,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Ou=new Wt,Fu=new Nu(1,1);Fu.compareFunction=Su;const Bu=new wu,zu=new wd,ku=new Iu,Xc=[],qc=[],Yc=new Float32Array(16),jc=new Float32Array(9),Kc=new Float32Array(4);function fs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Xc[s];if(r===void 0&&(r=new Float32Array(s),Xc[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function St(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Zr(i,e){let t=qc[e];t===void 0&&(t=new Int32Array(e),qc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Wm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2fv(this.addr,e),St(t,e)}}function qm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;i.uniform3fv(this.addr,e),St(t,e)}}function Ym(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4fv(this.addr,e),St(t,e)}}function jm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;Kc.set(n),i.uniformMatrix2fv(this.addr,!1,Kc),St(t,n)}}function Km(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;jc.set(n),i.uniformMatrix3fv(this.addr,!1,jc),St(t,n)}}function Jm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;Yc.set(n),i.uniformMatrix4fv(this.addr,!1,Yc),St(t,n)}}function Zm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function $m(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2iv(this.addr,e),St(t,e)}}function Qm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3iv(this.addr,e),St(t,e)}}function eg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4iv(this.addr,e),St(t,e)}}function tg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2uiv(this.addr,e),St(t,e)}}function ig(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3uiv(this.addr,e),St(t,e)}}function sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4uiv(this.addr,e),St(t,e)}}function rg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Fu:Ou;t.setTexture2D(e||r,s)}function og(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||zu,s)}function ag(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||ku,s)}function cg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Bu,s)}function lg(i){switch(i){case 5126:return Wm;case 35664:return Xm;case 35665:return qm;case 35666:return Ym;case 35674:return jm;case 35675:return Km;case 35676:return Jm;case 5124:case 35670:return Zm;case 35667:case 35671:return $m;case 35668:case 35672:return Qm;case 35669:case 35673:return eg;case 5125:return tg;case 36294:return ng;case 36295:return ig;case 36296:return sg;case 35678:case 36198:case 36298:case 36306:case 35682:return rg;case 35679:case 36299:case 36307:return og;case 35680:case 36300:case 36308:case 36293:return ag;case 36289:case 36303:case 36311:case 36292:return cg}}function ug(i,e){i.uniform1fv(this.addr,e)}function hg(i,e){const t=fs(e,this.size,2);i.uniform2fv(this.addr,t)}function dg(i,e){const t=fs(e,this.size,3);i.uniform3fv(this.addr,t)}function fg(i,e){const t=fs(e,this.size,4);i.uniform4fv(this.addr,t)}function pg(i,e){const t=fs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function mg(i,e){const t=fs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function gg(i,e){const t=fs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function _g(i,e){i.uniform1iv(this.addr,e)}function vg(i,e){i.uniform2iv(this.addr,e)}function xg(i,e){i.uniform3iv(this.addr,e)}function yg(i,e){i.uniform4iv(this.addr,e)}function Mg(i,e){i.uniform1uiv(this.addr,e)}function Sg(i,e){i.uniform2uiv(this.addr,e)}function Eg(i,e){i.uniform3uiv(this.addr,e)}function bg(i,e){i.uniform4uiv(this.addr,e)}function Tg(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Ou,r[o])}function wg(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||zu,r[o])}function Ag(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||ku,r[o])}function Rg(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Bu,r[o])}function Cg(i){switch(i){case 5126:return ug;case 35664:return hg;case 35665:return dg;case 35666:return fg;case 35674:return pg;case 35675:return mg;case 35676:return gg;case 5124:case 35670:return _g;case 35667:case 35671:return vg;case 35668:case 35672:return xg;case 35669:case 35673:return yg;case 5125:return Mg;case 36294:return Sg;case 36295:return Eg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return Tg;case 35679:case 36299:case 36307:return wg;case 35680:case 36300:case 36308:case 36293:return Ag;case 36289:case 36303:case 36311:case 36292:return Rg}}class Pg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=lg(t.type)}}class Lg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Cg(t.type)}}class Ig{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Fo=/(\w+)(\])?(\[|\.)?/g;function Jc(i,e){i.seq.push(e),i.map[e.id]=e}function Dg(i,e,t){const n=i.name,s=n.length;for(Fo.lastIndex=0;;){const r=Fo.exec(n),o=Fo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Jc(t,l===void 0?new Pg(a,i,e):new Lg(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Ig(a),Jc(t,h)),t=h}}}class Rr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Dg(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Zc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Ug=37297;let Ng=0;function Og(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Fg(i){const e=nt.getPrimaries(nt.workingColorSpace),t=nt.getPrimaries(i);let n;switch(e===t?n="":e===Fr&&t===Or?n="LinearDisplayP3ToLinearSRGB":e===Or&&t===Fr&&(n="LinearSRGBToLinearDisplayP3"),i){case In:case Yr:return[n,"LinearTransferOETF"];case Rt:case pa:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function $c(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Og(i.getShaderSource(e),o)}else return s}function Bg(i,e){const t=Fg(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function zg(i,e){let t;switch(e){case jh:t="Linear";break;case Kh:t="Reinhard";break;case Jh:t="OptimizedCineon";break;case Zh:t="ACESFilmic";break;case Qh:t="AgX";break;case $h:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function kg(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Xi).join(`
`)}function Gg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Xi).join(`
`)}function Hg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Vg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Xi(i){return i!==""}function Qc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function el(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Wg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ra(i){return i.replace(Wg,qg)}const Xg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function qg(i,e){let t=Ve[e];if(t===void 0){const n=Xg.get(e);if(n!==void 0)t=Ve[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ra(t)}const Yg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tl(i){return i.replace(Yg,jg)}function jg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function nl(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Kg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===lu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===uu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===wn&&(e="SHADOWMAP_TYPE_VSM"),e}function Jg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case as:case cs:e="ENVMAP_TYPE_CUBE";break;case qr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Zg(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case cs:e="ENVMAP_MODE_REFRACTION";break}return e}function $g(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case hu:e="ENVMAP_BLENDING_MULTIPLY";break;case qh:e="ENVMAP_BLENDING_MIX";break;case Yh:e="ENVMAP_BLENDING_ADD";break}return e}function Qg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function e0(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Kg(t),l=Jg(t),u=Zg(t),h=$g(t),d=Qg(t),f=t.isWebGL2?"":kg(t),g=Gg(t),v=Hg(r),m=s.createProgram();let p,y,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Xi).join(`
`),p.length>0&&(p+=`
`),y=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Xi).join(`
`),y.length>0&&(y+=`
`)):(p=[nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xi).join(`
`),y=[f,nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==jn?"#define TONE_MAPPING":"",t.toneMapping!==jn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==jn?zg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Bg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xi).join(`
`)),o=ra(o),o=Qc(o,t),o=el(o,t),a=ra(a),a=Qc(a,t),a=el(a,t),o=tl(o),a=tl(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===yc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const S=_+p+o,L=_+y+a,R=Zc(s,s.VERTEX_SHADER,S),w=Zc(s,s.FRAGMENT_SHADER,L);s.attachShader(m,R),s.attachShader(m,w),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function N(V){if(i.debug.checkShaderErrors){const J=s.getProgramInfoLog(m).trim(),D=s.getShaderInfoLog(R).trim(),B=s.getShaderInfoLog(w).trim();let G=!0,j=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,R,w);else{const K=$c(s,R,"vertex"),X=$c(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+J+`
`+K+`
`+X)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(D===""||B==="")&&(j=!1);j&&(V.diagnostics={runnable:G,programLog:J,vertexShader:{log:D,prefix:p},fragmentShader:{log:B,prefix:y}})}s.deleteShader(R),s.deleteShader(w),M=new Rr(s,m),b=Vg(s,m)}let M;this.getUniforms=function(){return M===void 0&&N(this),M};let b;this.getAttributes=function(){return b===void 0&&N(this),b};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=s.getProgramParameter(m,Ug)),O},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ng++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=R,this.fragmentShader=w,this}let t0=0;class n0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new i0(e),t.set(e,n)),n}}class i0{constructor(e){this.id=t0++,this.code=e,this.usedTimes=0}}function s0(i,e,t,n,s,r,o){const a=new ma,c=new n0,l=[],u=s.isWebGL2,h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return M===0?"uv":`uv${M}`}function m(M,b,O,V,J){const D=V.fog,B=J.geometry,G=M.isMeshStandardMaterial?V.environment:null,j=(M.isMeshStandardMaterial?t:e).get(M.envMap||G),K=j&&j.mapping===qr?j.image.height:null,X=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const $=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Q=$!==void 0?$.length:0;let fe=0;B.morphAttributes.position!==void 0&&(fe=1),B.morphAttributes.normal!==void 0&&(fe=2),B.morphAttributes.color!==void 0&&(fe=3);let W,ee,pe,we;if(X){const mt=mn[X];W=mt.vertexShader,ee=mt.fragmentShader}else W=M.vertexShader,ee=M.fragmentShader,c.update(M),pe=c.getVertexShaderID(M),we=c.getFragmentShaderID(M);const Me=i.getRenderTarget(),De=J.isInstancedMesh===!0,Fe=J.isBatchedMesh===!0,Te=!!M.map,Oe=!!M.matcap,P=!!j,le=!!M.aoMap,Y=!!M.lightMap,oe=!!M.bumpMap,q=!!M.normalMap,Ae=!!M.displacementMap,me=!!M.emissiveMap,E=!!M.metalnessMap,x=!!M.roughnessMap,U=M.anisotropy>0,ie=M.clearcoat>0,te=M.iridescence>0,Z=M.sheen>0,be=M.transmission>0,he=U&&!!M.anisotropyMap,xe=ie&&!!M.clearcoatMap,Le=ie&&!!M.clearcoatNormalMap,ke=ie&&!!M.clearcoatRoughnessMap,ne=te&&!!M.iridescenceMap,Ze=te&&!!M.iridescenceThicknessMap,We=Z&&!!M.sheenColorMap,Be=Z&&!!M.sheenRoughnessMap,Pe=!!M.specularMap,_e=!!M.specularColorMap,A=!!M.specularIntensityMap,ae=be&&!!M.transmissionMap,Re=be&&!!M.thicknessMap,Se=!!M.gradientMap,se=!!M.alphaMap,I=M.alphaTest>0,ce=!!M.alphaHash,de=!!M.extensions,Ue=!!B.attributes.uv1,Ie=!!B.attributes.uv2,je=!!B.attributes.uv3;let Ke=jn;return M.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(Ke=i.toneMapping),{isWebGL2:u,shaderID:X,shaderType:M.type,shaderName:M.name,vertexShader:W,fragmentShader:ee,defines:M.defines,customVertexShaderID:pe,customFragmentShaderID:we,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Fe,instancing:De,instancingColor:De&&J.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Me===null?i.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:In,map:Te,matcap:Oe,envMap:P,envMapMode:P&&j.mapping,envMapCubeUVHeight:K,aoMap:le,lightMap:Y,bumpMap:oe,normalMap:q,displacementMap:d&&Ae,emissiveMap:me,normalMapObjectSpace:q&&M.normalMapType===hd,normalMapTangentSpace:q&&M.normalMapType===Mu,metalnessMap:E,roughnessMap:x,anisotropy:U,anisotropyMap:he,clearcoat:ie,clearcoatMap:xe,clearcoatNormalMap:Le,clearcoatRoughnessMap:ke,iridescence:te,iridescenceMap:ne,iridescenceThicknessMap:Ze,sheen:Z,sheenColorMap:We,sheenRoughnessMap:Be,specularMap:Pe,specularColorMap:_e,specularIntensityMap:A,transmission:be,transmissionMap:ae,thicknessMap:Re,gradientMap:Se,opaque:M.transparent===!1&&M.blending===$i,alphaMap:se,alphaTest:I,alphaHash:ce,combine:M.combine,mapUv:Te&&v(M.map.channel),aoMapUv:le&&v(M.aoMap.channel),lightMapUv:Y&&v(M.lightMap.channel),bumpMapUv:oe&&v(M.bumpMap.channel),normalMapUv:q&&v(M.normalMap.channel),displacementMapUv:Ae&&v(M.displacementMap.channel),emissiveMapUv:me&&v(M.emissiveMap.channel),metalnessMapUv:E&&v(M.metalnessMap.channel),roughnessMapUv:x&&v(M.roughnessMap.channel),anisotropyMapUv:he&&v(M.anisotropyMap.channel),clearcoatMapUv:xe&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Le&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ke&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ze&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:We&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Be&&v(M.sheenRoughnessMap.channel),specularMapUv:Pe&&v(M.specularMap.channel),specularColorMapUv:_e&&v(M.specularColorMap.channel),specularIntensityMapUv:A&&v(M.specularIntensityMap.channel),transmissionMapUv:ae&&v(M.transmissionMap.channel),thicknessMapUv:Re&&v(M.thicknessMap.channel),alphaMapUv:se&&v(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(q||U),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:Ue,vertexUv2s:Ie,vertexUv3s:je,pointsUvs:J.isPoints===!0&&!!B.attributes.uv&&(Te||se),fog:!!D,useFog:M.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:J.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:fe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ke,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Te&&M.map.isVideoTexture===!0&&nt.getTransfer(M.map.colorSpace)===ot,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Tt,flipSided:M.side===Vt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:de&&M.extensions.derivatives===!0,extensionFragDepth:de&&M.extensions.fragDepth===!0,extensionDrawBuffers:de&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:de&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:de&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){const b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(const O in M.defines)b.push(O),b.push(M.defines[O]);return M.isRawShaderMaterial===!1&&(y(b,M),_(b,M),b.push(i.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function y(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function _(M,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function S(M){const b=g[M.type];let O;if(b){const V=mn[b];O=zd.clone(V.uniforms)}else O=M.uniforms;return O}function L(M,b){let O;for(let V=0,J=l.length;V<J;V++){const D=l[V];if(D.cacheKey===b){O=D,++O.usedTimes;break}}return O===void 0&&(O=new e0(i,b,M,r),l.push(O)),O}function R(M){if(--M.usedTimes===0){const b=l.indexOf(M);l[b]=l[l.length-1],l.pop(),M.destroy()}}function w(M){c.remove(M)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:L,releaseProgram:R,releaseShaderCache:w,programs:l,dispose:N}}function r0(){let i=new WeakMap;function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function t(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function o0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function il(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function sl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,d,f,g,v,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=v,p.group=m),e++,p}function a(h,d,f,g,v,m){const p=o(h,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(h,d,f,g,v,m){const p=o(h,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(h,d){t.length>1&&t.sort(h||o0),n.length>1&&n.sort(d||il),s.length>1&&s.sort(d||il)}function u(){for(let h=e,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function a0(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new sl,i.set(n,[o])):s>=r.length?(o=new sl,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function c0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Je};break;case"SpotLight":t={position:new C,direction:new C,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function l0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let u0=0;function h0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function d0(i,e){const t=new c0,n=l0(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new C);const r=new C,o=new pt,a=new pt;function c(u,h){let d=0,f=0,g=0;for(let V=0;V<9;V++)s.probe[V].set(0,0,0);let v=0,m=0,p=0,y=0,_=0,S=0,L=0,R=0,w=0,N=0,M=0;u.sort(h0);const b=h===!0?Math.PI:1;for(let V=0,J=u.length;V<J;V++){const D=u[V],B=D.color,G=D.intensity,j=D.distance,K=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=B.r*G*b,f+=B.g*G*b,g+=B.b*G*b;else if(D.isLightProbe){for(let X=0;X<9;X++)s.probe[X].addScaledVector(D.sh.coefficients[X],G);M++}else if(D.isDirectionalLight){const X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity*b),D.castShadow){const $=D.shadow,Q=n.get(D);Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,s.directionalShadow[v]=Q,s.directionalShadowMap[v]=K,s.directionalShadowMatrix[v]=D.shadow.matrix,S++}s.directional[v]=X,v++}else if(D.isSpotLight){const X=t.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(B).multiplyScalar(G*b),X.distance=j,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,s.spot[p]=X;const $=D.shadow;if(D.map&&(s.spotLightMap[w]=D.map,w++,$.updateMatrices(D),D.castShadow&&N++),s.spotLightMatrix[p]=$.matrix,D.castShadow){const Q=n.get(D);Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,s.spotShadow[p]=Q,s.spotShadowMap[p]=K,R++}p++}else if(D.isRectAreaLight){const X=t.get(D);X.color.copy(B).multiplyScalar(G),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),s.rectArea[y]=X,y++}else if(D.isPointLight){const X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity*b),X.distance=D.distance,X.decay=D.decay,D.castShadow){const $=D.shadow,Q=n.get(D);Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,Q.shadowCameraNear=$.camera.near,Q.shadowCameraFar=$.camera.far,s.pointShadow[m]=Q,s.pointShadowMap[m]=K,s.pointShadowMatrix[m]=D.shadow.matrix,L++}s.point[m]=X,m++}else if(D.isHemisphereLight){const X=t.get(D);X.skyColor.copy(D.color).multiplyScalar(G*b),X.groundColor.copy(D.groundColor).multiplyScalar(G*b),s.hemi[_]=X,_++}}y>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ue.LTC_FLOAT_1,s.rectAreaLTC2=ue.LTC_FLOAT_2):(s.rectAreaLTC1=ue.LTC_HALF_1,s.rectAreaLTC2=ue.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ue.LTC_FLOAT_1,s.rectAreaLTC2=ue.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ue.LTC_HALF_1,s.rectAreaLTC2=ue.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=f,s.ambient[2]=g;const O=s.hash;(O.directionalLength!==v||O.pointLength!==m||O.spotLength!==p||O.rectAreaLength!==y||O.hemiLength!==_||O.numDirectionalShadows!==S||O.numPointShadows!==L||O.numSpotShadows!==R||O.numSpotMaps!==w||O.numLightProbes!==M)&&(s.directional.length=v,s.spot.length=p,s.rectArea.length=y,s.point.length=m,s.hemi.length=_,s.directionalShadow.length=S,s.directionalShadowMap.length=S,s.pointShadow.length=L,s.pointShadowMap.length=L,s.spotShadow.length=R,s.spotShadowMap.length=R,s.directionalShadowMatrix.length=S,s.pointShadowMatrix.length=L,s.spotLightMatrix.length=R+w-N,s.spotLightMap.length=w,s.numSpotLightShadowsWithMaps=N,s.numLightProbes=M,O.directionalLength=v,O.pointLength=m,O.spotLength=p,O.rectAreaLength=y,O.hemiLength=_,O.numDirectionalShadows=S,O.numPointShadows=L,O.numSpotShadows=R,O.numSpotMaps=w,O.numLightProbes=M,s.version=u0++)}function l(u,h){let d=0,f=0,g=0,v=0,m=0;const p=h.matrixWorldInverse;for(let y=0,_=u.length;y<_;y++){const S=u[y];if(S.isDirectionalLight){const L=s.directional[d];L.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),d++}else if(S.isSpotLight){const L=s.spot[g];L.position.setFromMatrixPosition(S.matrixWorld),L.position.applyMatrix4(p),L.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),g++}else if(S.isRectAreaLight){const L=s.rectArea[v];L.position.setFromMatrixPosition(S.matrixWorld),L.position.applyMatrix4(p),a.identity(),o.copy(S.matrixWorld),o.premultiply(p),a.extractRotation(o),L.halfWidth.set(S.width*.5,0,0),L.halfHeight.set(0,S.height*.5,0),L.halfWidth.applyMatrix4(a),L.halfHeight.applyMatrix4(a),v++}else if(S.isPointLight){const L=s.point[f];L.position.setFromMatrixPosition(S.matrixWorld),L.position.applyMatrix4(p),f++}else if(S.isHemisphereLight){const L=s.hemi[m];L.direction.setFromMatrixPosition(S.matrixWorld),L.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:s}}function rl(i,e){const t=new d0(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function o(h){n.push(h)}function a(h){s.push(h)}function c(h){t.setup(n,h)}function l(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function f0(i,e){let t=new WeakMap;function n(r,o=0){const a=t.get(r);let c;return a===void 0?(c=new rl(i,e),t.set(r,[c])):o>=a.length?(c=new rl(i,e),a.push(c)):c=a[o],c}function s(){t=new WeakMap}return{get:n,dispose:s}}class p0 extends ds{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ld,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class m0 extends ds{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const g0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function v0(i,e,t){let n=new ga;const s=new re,r=new re,o=new ct,a=new p0({depthPacking:ud}),c=new m0,l={},u=t.maxTextureSize,h={[Zn]:Vt,[Vt]:Zn,[Tt]:Tt},d=new xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:g0,fragmentShader:_0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ut;g.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ve(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lu;let p=this.type;this.render=function(R,w,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const M=i.getRenderTarget(),b=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Yn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const J=p!==wn&&this.type===wn,D=p===wn&&this.type!==wn;for(let B=0,G=R.length;B<G;B++){const j=R[B],K=j.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);const X=K.getFrameExtents();if(s.multiply(X),r.copy(K.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/X.x),s.x=r.x*X.x,K.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/X.y),s.y=r.y*X.y,K.mapSize.y=r.y)),K.map===null||J===!0||D===!0){const Q=this.type!==wn?{minFilter:Ot,magFilter:Ot}:{};K.map!==null&&K.map.dispose(),K.map=new _i(s.x,s.y,Q),K.map.texture.name=j.name+".shadowMap",K.camera.updateProjectionMatrix()}i.setRenderTarget(K.map),i.clear();const $=K.getViewportCount();for(let Q=0;Q<$;Q++){const fe=K.getViewport(Q);o.set(r.x*fe.x,r.y*fe.y,r.x*fe.z,r.y*fe.w),V.viewport(o),K.updateMatrices(j,Q),n=K.getFrustum(),S(w,N,K.camera,j,this.type)}K.isPointLightShadow!==!0&&this.type===wn&&y(K,N),K.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,b,O)};function y(R,w){const N=e.update(v);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new _i(s.x,s.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(w,null,N,d,v,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(w,null,N,f,v,null)}function _(R,w,N,M){let b=null;const O=N.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(O!==void 0)b=O;else if(b=N.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const V=b.uuid,J=w.uuid;let D=l[V];D===void 0&&(D={},l[V]=D);let B=D[J];B===void 0&&(B=b.clone(),D[J]=B,w.addEventListener("dispose",L)),b=B}if(b.visible=w.visible,b.wireframe=w.wireframe,M===wn?b.side=w.shadowSide!==null?w.shadowSide:w.side:b.side=w.shadowSide!==null?w.shadowSide:h[w.side],b.alphaMap=w.alphaMap,b.alphaTest=w.alphaTest,b.map=w.map,b.clipShadows=w.clipShadows,b.clippingPlanes=w.clippingPlanes,b.clipIntersection=w.clipIntersection,b.displacementMap=w.displacementMap,b.displacementScale=w.displacementScale,b.displacementBias=w.displacementBias,b.wireframeLinewidth=w.wireframeLinewidth,b.linewidth=w.linewidth,N.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const V=i.properties.get(b);V.light=N}return b}function S(R,w,N,M,b){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&b===wn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,R.matrixWorld);const J=e.update(R),D=R.material;if(Array.isArray(D)){const B=J.groups;for(let G=0,j=B.length;G<j;G++){const K=B[G],X=D[K.materialIndex];if(X&&X.visible){const $=_(R,X,M,b);R.onBeforeShadow(i,R,w,N,J,$,K),i.renderBufferDirect(N,null,J,$,R,K),R.onAfterShadow(i,R,w,N,J,$,K)}}}else if(D.visible){const B=_(R,D,M,b);R.onBeforeShadow(i,R,w,N,J,B,null),i.renderBufferDirect(N,null,J,B,R,null),R.onAfterShadow(i,R,w,N,J,B,null)}}const V=R.children;for(let J=0,D=V.length;J<D;J++)S(V[J],w,N,M,b)}function L(R){R.target.removeEventListener("dispose",L);for(const N in l){const M=l[N],b=R.target.uuid;b in M&&(M[b].dispose(),delete M[b])}}}function x0(i,e,t){const n=t.isWebGL2;function s(){let I=!1;const ce=new ct;let de=null;const Ue=new ct(0,0,0,0);return{setMask:function(Ie){de!==Ie&&!I&&(i.colorMask(Ie,Ie,Ie,Ie),de=Ie)},setLocked:function(Ie){I=Ie},setClear:function(Ie,je,Ke,dt,mt){mt===!0&&(Ie*=dt,je*=dt,Ke*=dt),ce.set(Ie,je,Ke,dt),Ue.equals(ce)===!1&&(i.clearColor(Ie,je,Ke,dt),Ue.copy(ce))},reset:function(){I=!1,de=null,Ue.set(-1,0,0,0)}}}function r(){let I=!1,ce=null,de=null,Ue=null;return{setTest:function(Ie){Ie?Fe(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(Ie){ce!==Ie&&!I&&(i.depthMask(Ie),ce=Ie)},setFunc:function(Ie){if(de!==Ie){switch(Ie){case zh:i.depthFunc(i.NEVER);break;case kh:i.depthFunc(i.ALWAYS);break;case Gh:i.depthFunc(i.LESS);break;case Ur:i.depthFunc(i.LEQUAL);break;case Hh:i.depthFunc(i.EQUAL);break;case Vh:i.depthFunc(i.GEQUAL);break;case Wh:i.depthFunc(i.GREATER);break;case Xh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}de=Ie}},setLocked:function(Ie){I=Ie},setClear:function(Ie){Ue!==Ie&&(i.clearDepth(Ie),Ue=Ie)},reset:function(){I=!1,ce=null,de=null,Ue=null}}}function o(){let I=!1,ce=null,de=null,Ue=null,Ie=null,je=null,Ke=null,dt=null,mt=null;return{setTest:function(Qe){I||(Qe?Fe(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function(Qe){ce!==Qe&&!I&&(i.stencilMask(Qe),ce=Qe)},setFunc:function(Qe,_t,fn){(de!==Qe||Ue!==_t||Ie!==fn)&&(i.stencilFunc(Qe,_t,fn),de=Qe,Ue=_t,Ie=fn)},setOp:function(Qe,_t,fn){(je!==Qe||Ke!==_t||dt!==fn)&&(i.stencilOp(Qe,_t,fn),je=Qe,Ke=_t,dt=fn)},setLocked:function(Qe){I=Qe},setClear:function(Qe){mt!==Qe&&(i.clearStencil(Qe),mt=Qe)},reset:function(){I=!1,ce=null,de=null,Ue=null,Ie=null,je=null,Ke=null,dt=null,mt=null}}}const a=new s,c=new r,l=new o,u=new WeakMap,h=new WeakMap;let d={},f={},g=new WeakMap,v=[],m=null,p=!1,y=null,_=null,S=null,L=null,R=null,w=null,N=null,M=new Je(0,0,0),b=0,O=!1,V=null,J=null,D=null,B=null,G=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,X=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec($)[1]),K=X>=1):$.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),K=X>=2);let Q=null,fe={};const W=i.getParameter(i.SCISSOR_BOX),ee=i.getParameter(i.VIEWPORT),pe=new ct().fromArray(W),we=new ct().fromArray(ee);function Me(I,ce,de,Ue){const Ie=new Uint8Array(4),je=i.createTexture();i.bindTexture(I,je),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ke=0;Ke<de;Ke++)n&&(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)?i.texImage3D(ce,0,i.RGBA,1,1,Ue,0,i.RGBA,i.UNSIGNED_BYTE,Ie):i.texImage2D(ce+Ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ie);return je}const De={};De[i.TEXTURE_2D]=Me(i.TEXTURE_2D,i.TEXTURE_2D,1),De[i.TEXTURE_CUBE_MAP]=Me(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(De[i.TEXTURE_2D_ARRAY]=Me(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),De[i.TEXTURE_3D]=Me(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Fe(i.DEPTH_TEST),c.setFunc(Ur),me(!1),E(ka),Fe(i.CULL_FACE),q(Yn);function Fe(I){d[I]!==!0&&(i.enable(I),d[I]=!0)}function Te(I){d[I]!==!1&&(i.disable(I),d[I]=!1)}function Oe(I,ce){return f[I]!==ce?(i.bindFramebuffer(I,ce),f[I]=ce,n&&(I===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ce),I===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ce)),!0):!1}function P(I,ce){let de=v,Ue=!1;if(I)if(de=g.get(ce),de===void 0&&(de=[],g.set(ce,de)),I.isWebGLMultipleRenderTargets){const Ie=I.texture;if(de.length!==Ie.length||de[0]!==i.COLOR_ATTACHMENT0){for(let je=0,Ke=Ie.length;je<Ke;je++)de[je]=i.COLOR_ATTACHMENT0+je;de.length=Ie.length,Ue=!0}}else de[0]!==i.COLOR_ATTACHMENT0&&(de[0]=i.COLOR_ATTACHMENT0,Ue=!0);else de[0]!==i.BACK&&(de[0]=i.BACK,Ue=!0);Ue&&(t.isWebGL2?i.drawBuffers(de):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(de))}function le(I){return m!==I?(i.useProgram(I),m=I,!0):!1}const Y={[hi]:i.FUNC_ADD,[bh]:i.FUNC_SUBTRACT,[Th]:i.FUNC_REVERSE_SUBTRACT};if(n)Y[Wa]=i.MIN,Y[Xa]=i.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(Y[Wa]=I.MIN_EXT,Y[Xa]=I.MAX_EXT)}const oe={[wh]:i.ZERO,[Ah]:i.ONE,[Rh]:i.SRC_COLOR,[$o]:i.SRC_ALPHA,[Uh]:i.SRC_ALPHA_SATURATE,[Ih]:i.DST_COLOR,[Ph]:i.DST_ALPHA,[Ch]:i.ONE_MINUS_SRC_COLOR,[Qo]:i.ONE_MINUS_SRC_ALPHA,[Dh]:i.ONE_MINUS_DST_COLOR,[Lh]:i.ONE_MINUS_DST_ALPHA,[Nh]:i.CONSTANT_COLOR,[Oh]:i.ONE_MINUS_CONSTANT_COLOR,[Fh]:i.CONSTANT_ALPHA,[Bh]:i.ONE_MINUS_CONSTANT_ALPHA};function q(I,ce,de,Ue,Ie,je,Ke,dt,mt,Qe){if(I===Yn){p===!0&&(Te(i.BLEND),p=!1);return}if(p===!1&&(Fe(i.BLEND),p=!0),I!==Eh){if(I!==y||Qe!==O){if((_!==hi||R!==hi)&&(i.blendEquation(i.FUNC_ADD),_=hi,R=hi),Qe)switch(I){case $i:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ga:i.blendFunc(i.ONE,i.ONE);break;case Ha:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Va:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case $i:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ga:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ha:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Va:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}S=null,L=null,w=null,N=null,M.set(0,0,0),b=0,y=I,O=Qe}return}Ie=Ie||ce,je=je||de,Ke=Ke||Ue,(ce!==_||Ie!==R)&&(i.blendEquationSeparate(Y[ce],Y[Ie]),_=ce,R=Ie),(de!==S||Ue!==L||je!==w||Ke!==N)&&(i.blendFuncSeparate(oe[de],oe[Ue],oe[je],oe[Ke]),S=de,L=Ue,w=je,N=Ke),(dt.equals(M)===!1||mt!==b)&&(i.blendColor(dt.r,dt.g,dt.b,mt),M.copy(dt),b=mt),y=I,O=!1}function Ae(I,ce){I.side===Tt?Te(i.CULL_FACE):Fe(i.CULL_FACE);let de=I.side===Vt;ce&&(de=!de),me(de),I.blending===$i&&I.transparent===!1?q(Yn):q(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),c.setFunc(I.depthFunc),c.setTest(I.depthTest),c.setMask(I.depthWrite),a.setMask(I.colorWrite);const Ue=I.stencilWrite;l.setTest(Ue),Ue&&(l.setMask(I.stencilWriteMask),l.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),l.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),U(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Fe(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function me(I){V!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),V=I)}function E(I){I!==Mh?(Fe(i.CULL_FACE),I!==J&&(I===ka?i.cullFace(i.BACK):I===Sh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),J=I}function x(I){I!==D&&(K&&i.lineWidth(I),D=I)}function U(I,ce,de){I?(Fe(i.POLYGON_OFFSET_FILL),(B!==ce||G!==de)&&(i.polygonOffset(ce,de),B=ce,G=de)):Te(i.POLYGON_OFFSET_FILL)}function ie(I){I?Fe(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function te(I){I===void 0&&(I=i.TEXTURE0+j-1),Q!==I&&(i.activeTexture(I),Q=I)}function Z(I,ce,de){de===void 0&&(Q===null?de=i.TEXTURE0+j-1:de=Q);let Ue=fe[de];Ue===void 0&&(Ue={type:void 0,texture:void 0},fe[de]=Ue),(Ue.type!==I||Ue.texture!==ce)&&(Q!==de&&(i.activeTexture(de),Q=de),i.bindTexture(I,ce||De[I]),Ue.type=I,Ue.texture=ce)}function be(){const I=fe[Q];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function he(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xe(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Le(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ke(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ze(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function We(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Be(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Pe(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _e(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function A(I){pe.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),pe.copy(I))}function ae(I){we.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),we.copy(I))}function Re(I,ce){let de=h.get(ce);de===void 0&&(de=new WeakMap,h.set(ce,de));let Ue=de.get(I);Ue===void 0&&(Ue=i.getUniformBlockIndex(ce,I.name),de.set(I,Ue))}function Se(I,ce){const Ue=h.get(ce).get(I);u.get(ce)!==Ue&&(i.uniformBlockBinding(ce,Ue,I.__bindingPointIndex),u.set(ce,Ue))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},Q=null,fe={},f={},g=new WeakMap,v=[],m=null,p=!1,y=null,_=null,S=null,L=null,R=null,w=null,N=null,M=new Je(0,0,0),b=0,O=!1,V=null,J=null,D=null,B=null,G=null,pe.set(0,0,i.canvas.width,i.canvas.height),we.set(0,0,i.canvas.width,i.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Fe,disable:Te,bindFramebuffer:Oe,drawBuffers:P,useProgram:le,setBlending:q,setMaterial:Ae,setFlipSided:me,setCullFace:E,setLineWidth:x,setPolygonOffset:U,setScissorTest:ie,activeTexture:te,bindTexture:Z,unbindTexture:be,compressedTexImage2D:he,compressedTexImage3D:xe,texImage2D:Pe,texImage3D:_e,updateUBOMapping:Re,uniformBlockBinding:Se,texStorage2D:We,texStorage3D:Be,texSubImage2D:Le,texSubImage3D:ke,compressedTexSubImage2D:ne,compressedTexSubImage3D:Ze,scissor:A,viewport:ae,reset:se}}function y0(i,e,t,n,s,r,o){const a=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,x){return f?new OffscreenCanvas(E,x):kr("canvas")}function v(E,x,U,ie){let te=1;if((E.width>ie||E.height>ie)&&(te=ie/Math.max(E.width,E.height)),te<1||x===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const Z=x?sa:Math.floor,be=Z(te*E.width),he=Z(te*E.height);h===void 0&&(h=g(be,he));const xe=U?g(be,he):h;return xe.width=be,xe.height=he,xe.getContext("2d").drawImage(E,0,0,be,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+be+"x"+he+")."),xe}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return Mc(E.width)&&Mc(E.height)}function p(E){return a?!1:E.wrapS!==an||E.wrapT!==an||E.minFilter!==Ot&&E.minFilter!==Qt}function y(E,x){return E.generateMipmaps&&x&&E.minFilter!==Ot&&E.minFilter!==Qt}function _(E){i.generateMipmap(E)}function S(E,x,U,ie,te=!1){if(a===!1)return x;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Z=x;if(x===i.RED&&(U===i.FLOAT&&(Z=i.R32F),U===i.HALF_FLOAT&&(Z=i.R16F),U===i.UNSIGNED_BYTE&&(Z=i.R8)),x===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.R8UI),U===i.UNSIGNED_SHORT&&(Z=i.R16UI),U===i.UNSIGNED_INT&&(Z=i.R32UI),U===i.BYTE&&(Z=i.R8I),U===i.SHORT&&(Z=i.R16I),U===i.INT&&(Z=i.R32I)),x===i.RG&&(U===i.FLOAT&&(Z=i.RG32F),U===i.HALF_FLOAT&&(Z=i.RG16F),U===i.UNSIGNED_BYTE&&(Z=i.RG8)),x===i.RGBA){const be=te?Nr:nt.getTransfer(ie);U===i.FLOAT&&(Z=i.RGBA32F),U===i.HALF_FLOAT&&(Z=i.RGBA16F),U===i.UNSIGNED_BYTE&&(Z=be===ot?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function L(E,x,U){return y(E,U)===!0||E.isFramebufferTexture&&E.minFilter!==Ot&&E.minFilter!==Qt?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function R(E){return E===Ot||E===qa||E===co?i.NEAREST:i.LINEAR}function w(E){const x=E.target;x.removeEventListener("dispose",w),M(x),x.isVideoTexture&&u.delete(x)}function N(E){const x=E.target;x.removeEventListener("dispose",N),O(x)}function M(E){const x=n.get(E);if(x.__webglInit===void 0)return;const U=E.source,ie=d.get(U);if(ie){const te=ie[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&b(E),Object.keys(ie).length===0&&d.delete(U)}n.remove(E)}function b(E){const x=n.get(E);i.deleteTexture(x.__webglTexture);const U=E.source,ie=d.get(U);delete ie[x.__cacheKey],o.memory.textures--}function O(E){const x=E.texture,U=n.get(E),ie=n.get(x);if(ie.__webglTexture!==void 0&&(i.deleteTexture(ie.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(U.__webglFramebuffer[te]))for(let Z=0;Z<U.__webglFramebuffer[te].length;Z++)i.deleteFramebuffer(U.__webglFramebuffer[te][Z]);else i.deleteFramebuffer(U.__webglFramebuffer[te]);U.__webglDepthbuffer&&i.deleteRenderbuffer(U.__webglDepthbuffer[te])}else{if(Array.isArray(U.__webglFramebuffer))for(let te=0;te<U.__webglFramebuffer.length;te++)i.deleteFramebuffer(U.__webglFramebuffer[te]);else i.deleteFramebuffer(U.__webglFramebuffer);if(U.__webglDepthbuffer&&i.deleteRenderbuffer(U.__webglDepthbuffer),U.__webglMultisampledFramebuffer&&i.deleteFramebuffer(U.__webglMultisampledFramebuffer),U.__webglColorRenderbuffer)for(let te=0;te<U.__webglColorRenderbuffer.length;te++)U.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(U.__webglColorRenderbuffer[te]);U.__webglDepthRenderbuffer&&i.deleteRenderbuffer(U.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let te=0,Z=x.length;te<Z;te++){const be=n.get(x[te]);be.__webglTexture&&(i.deleteTexture(be.__webglTexture),o.memory.textures--),n.remove(x[te])}n.remove(x),n.remove(E)}let V=0;function J(){V=0}function D(){const E=V;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),V+=1,E}function B(E){const x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function G(E,x){const U=n.get(E);if(E.isVideoTexture&&Ae(E),E.isRenderTargetTexture===!1&&E.version>0&&U.__version!==E.version){const ie=E.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{pe(U,E,x);return}}t.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+x)}function j(E,x){const U=n.get(E);if(E.version>0&&U.__version!==E.version){pe(U,E,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+x)}function K(E,x){const U=n.get(E);if(E.version>0&&U.__version!==E.version){pe(U,E,x);return}t.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+x)}function X(E,x){const U=n.get(E);if(E.version>0&&U.__version!==E.version){we(U,E,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+x)}const $={[Ds]:i.REPEAT,[an]:i.CLAMP_TO_EDGE,[na]:i.MIRRORED_REPEAT},Q={[Ot]:i.NEAREST,[qa]:i.NEAREST_MIPMAP_NEAREST,[co]:i.NEAREST_MIPMAP_LINEAR,[Qt]:i.LINEAR,[ed]:i.LINEAR_MIPMAP_NEAREST,[Us]:i.LINEAR_MIPMAP_LINEAR},fe={[dd]:i.NEVER,[vd]:i.ALWAYS,[fd]:i.LESS,[Su]:i.LEQUAL,[pd]:i.EQUAL,[_d]:i.GEQUAL,[md]:i.GREATER,[gd]:i.NOTEQUAL};function W(E,x,U){if(U?(i.texParameteri(E,i.TEXTURE_WRAP_S,$[x.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,$[x.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,$[x.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,Q[x.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,Q[x.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(x.wrapS!==an||x.wrapT!==an)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,R(x.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,R(x.minFilter)),x.minFilter!==Ot&&x.minFilter!==Qt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,fe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ie=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===Ot||x.minFilter!==co&&x.minFilter!==Us||x.type===Wn&&e.has("OES_texture_float_linear")===!1||a===!1&&x.type===Ns&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||n.get(x).__currentAnisotropy)&&(i.texParameterf(E,ie.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy)}}function ee(E,x){let U=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",w));const ie=x.source;let te=d.get(ie);te===void 0&&(te={},d.set(ie,te));const Z=B(x);if(Z!==E.__cacheKey){te[Z]===void 0&&(te[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,U=!0),te[Z].usedTimes++;const be=te[E.__cacheKey];be!==void 0&&(te[E.__cacheKey].usedTimes--,be.usedTimes===0&&b(x)),E.__cacheKey=Z,E.__webglTexture=te[Z].texture}return U}function pe(E,x,U){let ie=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(ie=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(ie=i.TEXTURE_3D);const te=ee(E,x),Z=x.source;t.bindTexture(ie,E.__webglTexture,i.TEXTURE0+U);const be=n.get(Z);if(Z.version!==be.__version||te===!0){t.activeTexture(i.TEXTURE0+U);const he=nt.getPrimaries(nt.workingColorSpace),xe=x.colorSpace===en?null:nt.getPrimaries(x.colorSpace),Le=x.colorSpace===en||he===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);const ke=p(x)&&m(x.image)===!1;let ne=v(x.image,ke,!1,s.maxTextureSize);ne=me(x,ne);const Ze=m(ne)||a,We=r.convert(x.format,x.colorSpace);let Be=r.convert(x.type),Pe=S(x.internalFormat,We,Be,x.colorSpace,x.isVideoTexture);W(ie,x,Ze);let _e;const A=x.mipmaps,ae=a&&x.isVideoTexture!==!0&&Pe!==xu,Re=be.__version===void 0||te===!0,Se=L(x,ne,Ze);if(x.isDepthTexture)Pe=i.DEPTH_COMPONENT,a?x.type===Wn?Pe=i.DEPTH_COMPONENT32F:x.type===Vn?Pe=i.DEPTH_COMPONENT24:x.type===pi?Pe=i.DEPTH24_STENCIL8:Pe=i.DEPTH_COMPONENT16:x.type===Wn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===mi&&Pe===i.DEPTH_COMPONENT&&x.type!==fa&&x.type!==Vn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=Vn,Be=r.convert(x.type)),x.format===ls&&Pe===i.DEPTH_COMPONENT&&(Pe=i.DEPTH_STENCIL,x.type!==pi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=pi,Be=r.convert(x.type))),Re&&(ae?t.texStorage2D(i.TEXTURE_2D,1,Pe,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,Pe,ne.width,ne.height,0,We,Be,null));else if(x.isDataTexture)if(A.length>0&&Ze){ae&&Re&&t.texStorage2D(i.TEXTURE_2D,Se,Pe,A[0].width,A[0].height);for(let se=0,I=A.length;se<I;se++)_e=A[se],ae?t.texSubImage2D(i.TEXTURE_2D,se,0,0,_e.width,_e.height,We,Be,_e.data):t.texImage2D(i.TEXTURE_2D,se,Pe,_e.width,_e.height,0,We,Be,_e.data);x.generateMipmaps=!1}else ae?(Re&&t.texStorage2D(i.TEXTURE_2D,Se,Pe,ne.width,ne.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ne.width,ne.height,We,Be,ne.data)):t.texImage2D(i.TEXTURE_2D,0,Pe,ne.width,ne.height,0,We,Be,ne.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ae&&Re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Pe,A[0].width,A[0].height,ne.depth);for(let se=0,I=A.length;se<I;se++)_e=A[se],x.format!==cn?We!==null?ae?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,_e.width,_e.height,ne.depth,We,_e.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,Pe,_e.width,_e.height,ne.depth,0,_e.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,_e.width,_e.height,ne.depth,We,Be,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,Pe,_e.width,_e.height,ne.depth,0,We,Be,_e.data)}else{ae&&Re&&t.texStorage2D(i.TEXTURE_2D,Se,Pe,A[0].width,A[0].height);for(let se=0,I=A.length;se<I;se++)_e=A[se],x.format!==cn?We!==null?ae?t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,_e.width,_e.height,We,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,se,Pe,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?t.texSubImage2D(i.TEXTURE_2D,se,0,0,_e.width,_e.height,We,Be,_e.data):t.texImage2D(i.TEXTURE_2D,se,Pe,_e.width,_e.height,0,We,Be,_e.data)}else if(x.isDataArrayTexture)ae?(Re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Pe,ne.width,ne.height,ne.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,We,Be,ne.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Pe,ne.width,ne.height,ne.depth,0,We,Be,ne.data);else if(x.isData3DTexture)ae?(Re&&t.texStorage3D(i.TEXTURE_3D,Se,Pe,ne.width,ne.height,ne.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,We,Be,ne.data)):t.texImage3D(i.TEXTURE_3D,0,Pe,ne.width,ne.height,ne.depth,0,We,Be,ne.data);else if(x.isFramebufferTexture){if(Re)if(ae)t.texStorage2D(i.TEXTURE_2D,Se,Pe,ne.width,ne.height);else{let se=ne.width,I=ne.height;for(let ce=0;ce<Se;ce++)t.texImage2D(i.TEXTURE_2D,ce,Pe,se,I,0,We,Be,null),se>>=1,I>>=1}}else if(A.length>0&&Ze){ae&&Re&&t.texStorage2D(i.TEXTURE_2D,Se,Pe,A[0].width,A[0].height);for(let se=0,I=A.length;se<I;se++)_e=A[se],ae?t.texSubImage2D(i.TEXTURE_2D,se,0,0,We,Be,_e):t.texImage2D(i.TEXTURE_2D,se,Pe,We,Be,_e);x.generateMipmaps=!1}else ae?(Re&&t.texStorage2D(i.TEXTURE_2D,Se,Pe,ne.width,ne.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,We,Be,ne)):t.texImage2D(i.TEXTURE_2D,0,Pe,We,Be,ne);y(x,Ze)&&_(ie),be.__version=Z.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function we(E,x,U){if(x.image.length!==6)return;const ie=ee(E,x),te=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+U);const Z=n.get(te);if(te.version!==Z.__version||ie===!0){t.activeTexture(i.TEXTURE0+U);const be=nt.getPrimaries(nt.workingColorSpace),he=x.colorSpace===en?null:nt.getPrimaries(x.colorSpace),xe=x.colorSpace===en||be===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Le=x.isCompressedTexture||x.image[0].isCompressedTexture,ke=x.image[0]&&x.image[0].isDataTexture,ne=[];for(let se=0;se<6;se++)!Le&&!ke?ne[se]=v(x.image[se],!1,!0,s.maxCubemapSize):ne[se]=ke?x.image[se].image:x.image[se],ne[se]=me(x,ne[se]);const Ze=ne[0],We=m(Ze)||a,Be=r.convert(x.format,x.colorSpace),Pe=r.convert(x.type),_e=S(x.internalFormat,Be,Pe,x.colorSpace),A=a&&x.isVideoTexture!==!0,ae=Z.__version===void 0||ie===!0;let Re=L(x,Ze,We);W(i.TEXTURE_CUBE_MAP,x,We);let Se;if(Le){A&&ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,_e,Ze.width,Ze.height);for(let se=0;se<6;se++){Se=ne[se].mipmaps;for(let I=0;I<Se.length;I++){const ce=Se[I];x.format!==cn?Be!==null?A?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I,0,0,ce.width,ce.height,Be,ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I,_e,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):A?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I,0,0,ce.width,ce.height,Be,Pe,ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I,_e,ce.width,ce.height,0,Be,Pe,ce.data)}}}else{Se=x.mipmaps,A&&ae&&(Se.length>0&&Re++,t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,_e,ne[0].width,ne[0].height));for(let se=0;se<6;se++)if(ke){A?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ne[se].width,ne[se].height,Be,Pe,ne[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,_e,ne[se].width,ne[se].height,0,Be,Pe,ne[se].data);for(let I=0;I<Se.length;I++){const de=Se[I].image[se].image;A?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I+1,0,0,de.width,de.height,Be,Pe,de.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I+1,_e,de.width,de.height,0,Be,Pe,de.data)}}else{A?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Be,Pe,ne[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,_e,Be,Pe,ne[se]);for(let I=0;I<Se.length;I++){const ce=Se[I];A?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I+1,0,0,Be,Pe,ce.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I+1,_e,Be,Pe,ce.image[se])}}}y(x,We)&&_(i.TEXTURE_CUBE_MAP),Z.__version=te.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Me(E,x,U,ie,te,Z){const be=r.convert(U.format,U.colorSpace),he=r.convert(U.type),xe=S(U.internalFormat,be,he,U.colorSpace);if(!n.get(x).__hasExternalTextures){const ke=Math.max(1,x.width>>Z),ne=Math.max(1,x.height>>Z);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,Z,xe,ke,ne,x.depth,0,be,he,null):t.texImage2D(te,Z,xe,ke,ne,0,be,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),q(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,te,n.get(U).__webglTexture,0,oe(x)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ie,te,n.get(U).__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(E,x,U){if(i.bindRenderbuffer(i.RENDERBUFFER,E),x.depthBuffer&&!x.stencilBuffer){let ie=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(U||q(x)){const te=x.depthTexture;te&&te.isDepthTexture&&(te.type===Wn?ie=i.DEPTH_COMPONENT32F:te.type===Vn&&(ie=i.DEPTH_COMPONENT24));const Z=oe(x);q(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Z,ie,x.width,x.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Z,ie,x.width,x.height)}else i.renderbufferStorage(i.RENDERBUFFER,ie,x.width,x.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(x.depthBuffer&&x.stencilBuffer){const ie=oe(x);U&&q(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,i.DEPTH24_STENCIL8,x.width,x.height):q(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie,i.DEPTH24_STENCIL8,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const ie=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let te=0;te<ie.length;te++){const Z=ie[te],be=r.convert(Z.format,Z.colorSpace),he=r.convert(Z.type),xe=S(Z.internalFormat,be,he,Z.colorSpace),Le=oe(x);U&&q(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,xe,x.width,x.height):q(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Le,xe,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,xe,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Fe(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G(x.depthTexture,0);const ie=n.get(x.depthTexture).__webglTexture,te=oe(x);if(x.depthTexture.format===mi)q(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0);else if(x.depthTexture.format===ls)q(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Te(E){const x=n.get(E),U=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");Fe(x.__webglFramebuffer,E)}else if(U){x.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[ie]),x.__webglDepthbuffer[ie]=i.createRenderbuffer(),De(x.__webglDepthbuffer[ie],E,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=i.createRenderbuffer(),De(x.__webglDepthbuffer,E,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(E,x,U){const ie=n.get(E);x!==void 0&&Me(ie.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&Te(E)}function P(E){const x=E.texture,U=n.get(E),ie=n.get(x);E.addEventListener("dispose",N),E.isWebGLMultipleRenderTargets!==!0&&(ie.__webglTexture===void 0&&(ie.__webglTexture=i.createTexture()),ie.__version=x.version,o.memory.textures++);const te=E.isWebGLCubeRenderTarget===!0,Z=E.isWebGLMultipleRenderTargets===!0,be=m(E)||a;if(te){U.__webglFramebuffer=[];for(let he=0;he<6;he++)if(a&&x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer[he]=[];for(let xe=0;xe<x.mipmaps.length;xe++)U.__webglFramebuffer[he][xe]=i.createFramebuffer()}else U.__webglFramebuffer[he]=i.createFramebuffer()}else{if(a&&x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer=[];for(let he=0;he<x.mipmaps.length;he++)U.__webglFramebuffer[he]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(Z)if(s.drawBuffers){const he=E.texture;for(let xe=0,Le=he.length;xe<Le;xe++){const ke=n.get(he[xe]);ke.__webglTexture===void 0&&(ke.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&q(E)===!1){const he=Z?x:[x];U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let xe=0;xe<he.length;xe++){const Le=he[xe];U.__webglColorRenderbuffer[xe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[xe]);const ke=r.convert(Le.format,Le.colorSpace),ne=r.convert(Le.type),Ze=S(Le.internalFormat,ke,ne,Le.colorSpace,E.isXRRenderTarget===!0),We=oe(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,We,Ze,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,U.__webglColorRenderbuffer[xe])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),De(U.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(te){t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),W(i.TEXTURE_CUBE_MAP,x,be);for(let he=0;he<6;he++)if(a&&x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)Me(U.__webglFramebuffer[he][xe],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,xe);else Me(U.__webglFramebuffer[he],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);y(x,be)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Z){const he=E.texture;for(let xe=0,Le=he.length;xe<Le;xe++){const ke=he[xe],ne=n.get(ke);t.bindTexture(i.TEXTURE_2D,ne.__webglTexture),W(i.TEXTURE_2D,ke,be),Me(U.__webglFramebuffer,E,ke,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,0),y(ke,be)&&_(i.TEXTURE_2D)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?he=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(he,ie.__webglTexture),W(he,x,be),a&&x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)Me(U.__webglFramebuffer[xe],E,x,i.COLOR_ATTACHMENT0,he,xe);else Me(U.__webglFramebuffer,E,x,i.COLOR_ATTACHMENT0,he,0);y(x,be)&&_(he),t.unbindTexture()}E.depthBuffer&&Te(E)}function le(E){const x=m(E)||a,U=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ie=0,te=U.length;ie<te;ie++){const Z=U[ie];if(y(Z,x)){const be=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,he=n.get(Z).__webglTexture;t.bindTexture(be,he),_(be),t.unbindTexture()}}}function Y(E){if(a&&E.samples>0&&q(E)===!1){const x=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],U=E.width,ie=E.height;let te=i.COLOR_BUFFER_BIT;const Z=[],be=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=n.get(E),xe=E.isWebGLMultipleRenderTargets===!0;if(xe)for(let Le=0;Le<x.length;Le++)t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let Le=0;Le<x.length;Le++){Z.push(i.COLOR_ATTACHMENT0+Le),E.depthBuffer&&Z.push(be);const ke=he.__ignoreDepthValues!==void 0?he.__ignoreDepthValues:!1;if(ke===!1&&(E.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),xe&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,he.__webglColorRenderbuffer[Le]),ke===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[be]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[be])),xe){const ne=n.get(x[Le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ne,0)}i.blitFramebuffer(0,0,U,ie,0,0,U,ie,te,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Z)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),xe)for(let Le=0;Le<x.length;Le++){t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.RENDERBUFFER,he.__webglColorRenderbuffer[Le]);const ke=n.get(x[Le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.TEXTURE_2D,ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}}function oe(E){return Math.min(s.maxSamples,E.samples)}function q(E){const x=n.get(E);return a&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ae(E){const x=o.render.frame;u.get(E)!==x&&(u.set(E,x),E.update())}function me(E,x){const U=E.colorSpace,ie=E.format,te=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===ia||U!==In&&U!==en&&(nt.getTransfer(U)===ot?a===!1?e.has("EXT_sRGB")===!0&&ie===cn?(E.format=ia,E.minFilter=Qt,E.generateMipmaps=!1):x=bu.sRGBToLinear(x):(ie!==cn||te!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),x}this.allocateTextureUnit=D,this.resetTextureUnits=J,this.setTexture2D=G,this.setTexture2DArray=j,this.setTexture3D=K,this.setTextureCube=X,this.rebindTextures=Oe,this.setupRenderTarget=P,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=q}function M0(i,e,t){const n=t.isWebGL2;function s(r,o=en){let a;const c=nt.getTransfer(o);if(r===Kn)return i.UNSIGNED_BYTE;if(r===pu)return i.UNSIGNED_SHORT_4_4_4_4;if(r===mu)return i.UNSIGNED_SHORT_5_5_5_1;if(r===td)return i.BYTE;if(r===nd)return i.SHORT;if(r===fa)return i.UNSIGNED_SHORT;if(r===fu)return i.INT;if(r===Vn)return i.UNSIGNED_INT;if(r===Wn)return i.FLOAT;if(r===Ns)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===id)return i.ALPHA;if(r===cn)return i.RGBA;if(r===sd)return i.LUMINANCE;if(r===rd)return i.LUMINANCE_ALPHA;if(r===mi)return i.DEPTH_COMPONENT;if(r===ls)return i.DEPTH_STENCIL;if(r===ia)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===od)return i.RED;if(r===gu)return i.RED_INTEGER;if(r===ad)return i.RG;if(r===_u)return i.RG_INTEGER;if(r===vu)return i.RGBA_INTEGER;if(r===lo||r===uo||r===ho||r===fo)if(c===ot)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===lo)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===uo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===ho)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===fo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===lo)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===uo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===ho)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===fo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Ya||r===ja||r===Ka||r===Ja)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Ya)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ja)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ka)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ja)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===xu)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Za||r===$a)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Za)return c===ot?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===$a)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Qa||r===ec||r===tc||r===nc||r===ic||r===sc||r===rc||r===oc||r===ac||r===cc||r===lc||r===uc||r===hc||r===dc)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Qa)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ec)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===tc)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===nc)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ic)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===sc)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===rc)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===oc)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ac)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===cc)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===lc)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===uc)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===hc)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===dc)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===po||r===fc||r===pc)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===po)return c===ot?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===fc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===pc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===cd||r===mc||r===gc||r===_c)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===po)return a.COMPRESSED_RED_RGTC1_EXT;if(r===mc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===gc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===_c)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===pi?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class S0 extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ln extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const E0={type:"move"};class Bo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(E0)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ln;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class b0 extends bi{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null;const v=t.getContextAttributes();let m=null,p=null;const y=[],_=[],S=new re;let L=null;const R=new Gt;R.layers.enable(1),R.viewport=new ct;const w=new Gt;w.layers.enable(2),w.viewport=new ct;const N=[R,w],M=new S0;M.layers.enable(1),M.layers.enable(2);let b=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ee=y[W];return ee===void 0&&(ee=new Bo,y[W]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(W){let ee=y[W];return ee===void 0&&(ee=new Bo,y[W]=ee),ee.getGripSpace()},this.getHand=function(W){let ee=y[W];return ee===void 0&&(ee=new Bo,y[W]=ee),ee.getHandSpace()};function V(W){const ee=_.indexOf(W.inputSource);if(ee===-1)return;const pe=y[ee];pe!==void 0&&(pe.update(W.inputSource,W.frame,l||o),pe.dispatchEvent({type:W.type,data:W.inputSource}))}function J(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",D);for(let W=0;W<y.length;W++){const ee=_[W];ee!==null&&(_[W]=null,y[W].disconnect(ee))}b=null,O=null,e.setRenderTarget(m),f=null,d=null,h=null,s=null,p=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",J),s.addEventListener("inputsourceschange",D),v.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(S),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ee={antialias:s.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new _i(f.framebufferWidth,f.framebufferHeight,{format:cn,type:Kn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let ee=null,pe=null,we=null;v.depth&&(we=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=v.stencil?ls:mi,pe=v.stencil?pi:Vn);const Me={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(Me),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new _i(d.textureWidth,d.textureHeight,{format:cn,type:Kn,depthTexture:new Nu(d.textureWidth,d.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const De=e.properties.get(p);De.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),fe.setContext(s),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function D(W){for(let ee=0;ee<W.removed.length;ee++){const pe=W.removed[ee],we=_.indexOf(pe);we>=0&&(_[we]=null,y[we].disconnect(pe))}for(let ee=0;ee<W.added.length;ee++){const pe=W.added[ee];let we=_.indexOf(pe);if(we===-1){for(let De=0;De<y.length;De++)if(De>=_.length){_.push(pe),we=De;break}else if(_[De]===null){_[De]=pe,we=De;break}if(we===-1)break}const Me=y[we];Me&&Me.connect(pe)}}const B=new C,G=new C;function j(W,ee,pe){B.setFromMatrixPosition(ee.matrixWorld),G.setFromMatrixPosition(pe.matrixWorld);const we=B.distanceTo(G),Me=ee.projectionMatrix.elements,De=pe.projectionMatrix.elements,Fe=Me[14]/(Me[10]-1),Te=Me[14]/(Me[10]+1),Oe=(Me[9]+1)/Me[5],P=(Me[9]-1)/Me[5],le=(Me[8]-1)/Me[0],Y=(De[8]+1)/De[0],oe=Fe*le,q=Fe*Y,Ae=we/(-le+Y),me=Ae*-le;ee.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(me),W.translateZ(Ae),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const E=Fe+Ae,x=Te+Ae,U=oe-me,ie=q+(we-me),te=Oe*Te/x*E,Z=P*Te/x*E;W.projectionMatrix.makePerspective(U,ie,te,Z,E,x),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function K(W,ee){ee===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ee.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;M.near=w.near=R.near=W.near,M.far=w.far=R.far=W.far,(b!==M.near||O!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),b=M.near,O=M.far);const ee=W.parent,pe=M.cameras;K(M,ee);for(let we=0;we<pe.length;we++)K(pe[we],ee);pe.length===2?j(M,R,w):M.projectionMatrix.copy(R.projectionMatrix),X(W,M,ee)};function X(W,ee,pe){pe===null?W.matrix.copy(ee.matrixWorld):(W.matrix.copy(pe.matrixWorld),W.matrix.invert(),W.matrix.multiply(ee.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ee.projectionMatrix),W.projectionMatrixInverse.copy(ee.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=zr*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(W){c=W,d!==null&&(d.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)};let $=null;function Q(W,ee){if(u=ee.getViewerPose(l||o),g=ee,u!==null){const pe=u.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let we=!1;pe.length!==M.cameras.length&&(M.cameras.length=0,we=!0);for(let Me=0;Me<pe.length;Me++){const De=pe[Me];let Fe=null;if(f!==null)Fe=f.getViewport(De);else{const Oe=h.getViewSubImage(d,De);Fe=Oe.viewport,Me===0&&(e.setRenderTargetTextures(p,Oe.colorTexture,d.ignoreDepthValues?void 0:Oe.depthStencilTexture),e.setRenderTarget(p))}let Te=N[Me];Te===void 0&&(Te=new Gt,Te.layers.enable(Me),Te.viewport=new ct,N[Me]=Te),Te.matrix.fromArray(De.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(De.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),Me===0&&(M.matrix.copy(Te.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),we===!0&&M.cameras.push(Te)}}for(let pe=0;pe<y.length;pe++){const we=_[pe],Me=y[pe];we!==null&&Me!==void 0&&Me.update(we,ee,l||o)}$&&$(W,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const fe=new Du;fe.setAnimationLoop(Q),this.setAnimationLoop=function(W){$=W},this.dispose=function(){}}}function T0(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Pu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,_,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,y,_):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Vt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Vt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const _=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Vt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function w0(i,e,t,n){let s={},r={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(y,_){const S=_.program;n.uniformBlockBinding(y,S)}function l(y,_){let S=s[y.id];S===void 0&&(g(y),S=u(y),s[y.id]=S,y.addEventListener("dispose",m));const L=_.program;n.updateUBOMapping(y,L);const R=e.render.frame;r[y.id]!==R&&(d(y),r[y.id]=R)}function u(y){const _=h();y.__bindingPointIndex=_;const S=i.createBuffer(),L=y.__size,R=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,L,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,S),S}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const _=s[y.id],S=y.uniforms,L=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let R=0,w=S.length;R<w;R++){const N=Array.isArray(S[R])?S[R]:[S[R]];for(let M=0,b=N.length;M<b;M++){const O=N[M];if(f(O,R,M,L)===!0){const V=O.__offset,J=Array.isArray(O.value)?O.value:[O.value];let D=0;for(let B=0;B<J.length;B++){const G=J[B],j=v(G);typeof G=="number"||typeof G=="boolean"?(O.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,V+D,O.__data)):G.isMatrix3?(O.__data[0]=G.elements[0],O.__data[1]=G.elements[1],O.__data[2]=G.elements[2],O.__data[3]=0,O.__data[4]=G.elements[3],O.__data[5]=G.elements[4],O.__data[6]=G.elements[5],O.__data[7]=0,O.__data[8]=G.elements[6],O.__data[9]=G.elements[7],O.__data[10]=G.elements[8],O.__data[11]=0):(G.toArray(O.__data,D),D+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,O.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,_,S,L){const R=y.value,w=_+"_"+S;if(L[w]===void 0)return typeof R=="number"||typeof R=="boolean"?L[w]=R:L[w]=R.clone(),!0;{const N=L[w];if(typeof R=="number"||typeof R=="boolean"){if(N!==R)return L[w]=R,!0}else if(N.equals(R)===!1)return N.copy(R),!0}return!1}function g(y){const _=y.uniforms;let S=0;const L=16;for(let w=0,N=_.length;w<N;w++){const M=Array.isArray(_[w])?_[w]:[_[w]];for(let b=0,O=M.length;b<O;b++){const V=M[b],J=Array.isArray(V.value)?V.value:[V.value];for(let D=0,B=J.length;D<B;D++){const G=J[D],j=v(G),K=S%L;K!==0&&L-K<j.boundary&&(S+=L-K),V.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=S,S+=j.storage}}}const R=S%L;return R>0&&(S+=L-R),y.__size=S,y.__cache={},this}function v(y){const _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function m(y){const _=y.target;_.removeEventListener("dispose",m);const S=o.indexOf(_.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Gu{constructor(e={}){const{canvas:t=Md(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,m=null;const p=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Rt,this._useLegacyLights=!1,this.toneMapping=jn,this.toneMappingExposure=1;const _=this;let S=!1,L=0,R=0,w=null,N=-1,M=null;const b=new ct,O=new ct;let V=null;const J=new Je(0);let D=0,B=t.width,G=t.height,j=1,K=null,X=null;const $=new ct(0,0,B,G),Q=new ct(0,0,B,G);let fe=!1;const W=new ga;let ee=!1,pe=!1,we=null;const Me=new pt,De=new re,Fe=new C,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Oe(){return w===null?j:1}let P=n;function le(T,F){for(let k=0;k<T.length;k++){const H=T[k],z=t.getContext(H,F);if(z!==null)return z}return null}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${da}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",ce,!1),P===null){const F=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&F.shift(),P=le(F,T),P===null)throw le(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&P instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),P.getShaderPrecisionFormat===void 0&&(P.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Y,oe,q,Ae,me,E,x,U,ie,te,Z,be,he,xe,Le,ke,ne,Ze,We,Be,Pe,_e,A,ae;function Re(){Y=new Om(P),oe=new Pm(P,Y,e),Y.init(oe),_e=new M0(P,Y,oe),q=new x0(P,Y,oe),Ae=new zm(P),me=new r0,E=new y0(P,Y,q,me,oe,_e,Ae),x=new Im(_),U=new Nm(_),ie=new qd(P,oe),A=new Rm(P,Y,ie,oe),te=new Fm(P,ie,Ae,A),Z=new Vm(P,te,ie,Ae),We=new Hm(P,oe,E),ke=new Lm(me),be=new s0(_,x,U,Y,oe,A,ke),he=new T0(_,me),xe=new a0,Le=new f0(Y,oe),Ze=new Am(_,x,U,q,Z,d,c),ne=new v0(_,Z,oe),ae=new w0(P,Ae,oe,q),Be=new Cm(P,Y,Ae,oe),Pe=new Bm(P,Y,Ae,oe),Ae.programs=be.programs,_.capabilities=oe,_.extensions=Y,_.properties=me,_.renderLists=xe,_.shadowMap=ne,_.state=q,_.info=Ae}Re();const Se=new b0(_,P);this.xr=Se,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=Y.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Y.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(T){T!==void 0&&(j=T,this.setSize(B,G,!1))},this.getSize=function(T){return T.set(B,G)},this.setSize=function(T,F,k=!0){if(Se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=T,G=F,t.width=Math.floor(T*j),t.height=Math.floor(F*j),k===!0&&(t.style.width=T+"px",t.style.height=F+"px"),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(B*j,G*j).floor()},this.setDrawingBufferSize=function(T,F,k){B=T,G=F,j=k,t.width=Math.floor(T*k),t.height=Math.floor(F*k),this.setViewport(0,0,T,F)},this.getCurrentViewport=function(T){return T.copy(b)},this.getViewport=function(T){return T.copy($)},this.setViewport=function(T,F,k,H){T.isVector4?$.set(T.x,T.y,T.z,T.w):$.set(T,F,k,H),q.viewport(b.copy($).multiplyScalar(j).floor())},this.getScissor=function(T){return T.copy(Q)},this.setScissor=function(T,F,k,H){T.isVector4?Q.set(T.x,T.y,T.z,T.w):Q.set(T,F,k,H),q.scissor(O.copy(Q).multiplyScalar(j).floor())},this.getScissorTest=function(){return fe},this.setScissorTest=function(T){q.setScissorTest(fe=T)},this.setOpaqueSort=function(T){K=T},this.setTransparentSort=function(T){X=T},this.getClearColor=function(T){return T.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor.apply(Ze,arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha.apply(Ze,arguments)},this.clear=function(T=!0,F=!0,k=!0){let H=0;if(T){let z=!1;if(w!==null){const ye=w.texture.format;z=ye===vu||ye===_u||ye===gu}if(z){const ye=w.texture.type,Ce=ye===Kn||ye===Vn||ye===fa||ye===pi||ye===pu||ye===mu,Ne=Ze.getClearColor(),ze=Ze.getClearAlpha(),Xe=Ne.r,Ge=Ne.g,He=Ne.b;Ce?(f[0]=Xe,f[1]=Ge,f[2]=He,f[3]=ze,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=Xe,g[1]=Ge,g[2]=He,g[3]=ze,P.clearBufferiv(P.COLOR,0,g))}else H|=P.COLOR_BUFFER_BIT}F&&(H|=P.DEPTH_BUFFER_BIT),k&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),xe.dispose(),Le.dispose(),me.dispose(),x.dispose(),U.dispose(),Z.dispose(),A.dispose(),ae.dispose(),be.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",mt),Se.removeEventListener("sessionend",Qe),we&&(we.dispose(),we=null),_t.stop()};function se(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const T=Ae.autoReset,F=ne.enabled,k=ne.autoUpdate,H=ne.needsUpdate,z=ne.type;Re(),Ae.autoReset=T,ne.enabled=F,ne.autoUpdate=k,ne.needsUpdate=H,ne.type=z}function ce(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function de(T){const F=T.target;F.removeEventListener("dispose",de),Ue(F)}function Ue(T){Ie(T),me.remove(T)}function Ie(T){const F=me.get(T).programs;F!==void 0&&(F.forEach(function(k){be.releaseProgram(k)}),T.isShaderMaterial&&be.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,k,H,z,ye){F===null&&(F=Te);const Ce=z.isMesh&&z.matrixWorld.determinant()<0,Ne=ah(T,F,k,H,z);q.setMaterial(H,Ce);let ze=k.index,Xe=1;if(H.wireframe===!0){if(ze=te.getWireframeAttribute(k),ze===void 0)return;Xe=2}const Ge=k.drawRange,He=k.attributes.position;let gt=Ge.start*Xe,Xt=(Ge.start+Ge.count)*Xe;ye!==null&&(gt=Math.max(gt,ye.start*Xe),Xt=Math.min(Xt,(ye.start+ye.count)*Xe)),ze!==null?(gt=Math.max(gt,0),Xt=Math.min(Xt,ze.count)):He!=null&&(gt=Math.max(gt,0),Xt=Math.min(Xt,He.count));const Et=Xt-gt;if(Et<0||Et===1/0)return;A.setup(z,H,Ne,k,ze);let yn,lt=Be;if(ze!==null&&(yn=ie.get(ze),lt=Pe,lt.setIndex(yn)),z.isMesh)H.wireframe===!0?(q.setLineWidth(H.wireframeLinewidth*Oe()),lt.setMode(P.LINES)):lt.setMode(P.TRIANGLES);else if(z.isLine){let qe=H.linewidth;qe===void 0&&(qe=1),q.setLineWidth(qe*Oe()),z.isLineSegments?lt.setMode(P.LINES):z.isLineLoop?lt.setMode(P.LINE_LOOP):lt.setMode(P.LINE_STRIP)}else z.isPoints?lt.setMode(P.POINTS):z.isSprite&&lt.setMode(P.TRIANGLES);if(z.isBatchedMesh)lt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else if(z.isInstancedMesh)lt.renderInstances(gt,Et,z.count);else if(k.isInstancedBufferGeometry){const qe=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,so=Math.min(k.instanceCount,qe);lt.renderInstances(gt,Et,so)}else lt.render(gt,Et)};function je(T,F,k){T.transparent===!0&&T.side===Tt&&T.forceSinglePass===!1?(T.side=Vt,T.needsUpdate=!0,js(T,F,k),T.side=Zn,T.needsUpdate=!0,js(T,F,k),T.side=Tt):js(T,F,k)}this.compile=function(T,F,k=null){k===null&&(k=T),m=Le.get(k),m.init(),y.push(m),k.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),T!==k&&T.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights(_._useLegacyLights);const H=new Set;return T.traverse(function(z){const ye=z.material;if(ye)if(Array.isArray(ye))for(let Ce=0;Ce<ye.length;Ce++){const Ne=ye[Ce];je(Ne,k,z),H.add(Ne)}else je(ye,k,z),H.add(ye)}),y.pop(),m=null,H},this.compileAsync=function(T,F,k=null){const H=this.compile(T,F,k);return new Promise(z=>{function ye(){if(H.forEach(function(Ce){me.get(Ce).currentProgram.isReady()&&H.delete(Ce)}),H.size===0){z(T);return}setTimeout(ye,10)}Y.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Ke=null;function dt(T){Ke&&Ke(T)}function mt(){_t.stop()}function Qe(){_t.start()}const _t=new Du;_t.setAnimationLoop(dt),typeof self<"u"&&_t.setContext(self),this.setAnimationLoop=function(T){Ke=T,Se.setAnimationLoop(T),T===null?_t.stop():_t.start()},Se.addEventListener("sessionstart",mt),Se.addEventListener("sessionend",Qe),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(F),F=Se.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,F,w),m=Le.get(T,y.length),m.init(),y.push(m),Me.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),W.setFromProjectionMatrix(Me),pe=this.localClippingEnabled,ee=ke.init(this.clippingPlanes,pe),v=xe.get(T,p.length),v.init(),p.push(v),fn(T,F,0,_.sortObjects),v.finish(),_.sortObjects===!0&&v.sort(K,X),this.info.render.frame++,ee===!0&&ke.beginShadows();const k=m.state.shadowsArray;if(ne.render(k,T,F),ee===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ze.render(v,T),m.setupLights(_._useLegacyLights),F.isArrayCamera){const H=F.cameras;for(let z=0,ye=H.length;z<ye;z++){const Ce=H[z];Ua(v,T,Ce,Ce.viewport)}}else Ua(v,T,F);w!==null&&(E.updateMultisampleRenderTarget(w),E.updateRenderTargetMipmap(w)),T.isScene===!0&&T.onAfterRender(_,T,F),A.resetDefaultState(),N=-1,M=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function fn(T,F,k,H){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)k=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||W.intersectsSprite(T)){H&&Fe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Me);const Ce=Z.update(T),Ne=T.material;Ne.visible&&v.push(T,Ce,Ne,k,Fe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||W.intersectsObject(T))){const Ce=Z.update(T),Ne=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Fe.copy(T.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),Fe.copy(Ce.boundingSphere.center)),Fe.applyMatrix4(T.matrixWorld).applyMatrix4(Me)),Array.isArray(Ne)){const ze=Ce.groups;for(let Xe=0,Ge=ze.length;Xe<Ge;Xe++){const He=ze[Xe],gt=Ne[He.materialIndex];gt&&gt.visible&&v.push(T,Ce,gt,k,Fe.z,He)}}else Ne.visible&&v.push(T,Ce,Ne,k,Fe.z,null)}}const ye=T.children;for(let Ce=0,Ne=ye.length;Ce<Ne;Ce++)fn(ye[Ce],F,k,H)}function Ua(T,F,k,H){const z=T.opaque,ye=T.transmissive,Ce=T.transparent;m.setupLightsView(k),ee===!0&&ke.setGlobalState(_.clippingPlanes,k),ye.length>0&&oh(z,ye,F,k),H&&q.viewport(b.copy(H)),z.length>0&&Ys(z,F,k),ye.length>0&&Ys(ye,F,k),Ce.length>0&&Ys(Ce,F,k),q.buffers.depth.setTest(!0),q.buffers.depth.setMask(!0),q.buffers.color.setMask(!0),q.setPolygonOffset(!1)}function oh(T,F,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;const ye=oe.isWebGL2;we===null&&(we=new _i(1,1,{generateMipmaps:!0,type:Y.has("EXT_color_buffer_half_float")?Ns:Kn,minFilter:Us,samples:ye?4:0})),_.getDrawingBufferSize(De),ye?we.setSize(De.x,De.y):we.setSize(sa(De.x),sa(De.y));const Ce=_.getRenderTarget();_.setRenderTarget(we),_.getClearColor(J),D=_.getClearAlpha(),D<1&&_.setClearColor(16777215,.5),_.clear();const Ne=_.toneMapping;_.toneMapping=jn,Ys(T,k,H),E.updateMultisampleRenderTarget(we),E.updateRenderTargetMipmap(we);let ze=!1;for(let Xe=0,Ge=F.length;Xe<Ge;Xe++){const He=F[Xe],gt=He.object,Xt=He.geometry,Et=He.material,yn=He.group;if(Et.side===Tt&&gt.layers.test(H.layers)){const lt=Et.side;Et.side=Vt,Et.needsUpdate=!0,Na(gt,k,H,Xt,Et,yn),Et.side=lt,Et.needsUpdate=!0,ze=!0}}ze===!0&&(E.updateMultisampleRenderTarget(we),E.updateRenderTargetMipmap(we)),_.setRenderTarget(Ce),_.setClearColor(J,D),_.toneMapping=Ne}function Ys(T,F,k){const H=F.isScene===!0?F.overrideMaterial:null;for(let z=0,ye=T.length;z<ye;z++){const Ce=T[z],Ne=Ce.object,ze=Ce.geometry,Xe=H===null?Ce.material:H,Ge=Ce.group;Ne.layers.test(k.layers)&&Na(Ne,F,k,ze,Xe,Ge)}}function Na(T,F,k,H,z,ye){T.onBeforeRender(_,F,k,H,z,ye),T.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),z.onBeforeRender(_,F,k,H,T,ye),z.transparent===!0&&z.side===Tt&&z.forceSinglePass===!1?(z.side=Vt,z.needsUpdate=!0,_.renderBufferDirect(k,F,H,z,T,ye),z.side=Zn,z.needsUpdate=!0,_.renderBufferDirect(k,F,H,z,T,ye),z.side=Tt):_.renderBufferDirect(k,F,H,z,T,ye),T.onAfterRender(_,F,k,H,z,ye)}function js(T,F,k){F.isScene!==!0&&(F=Te);const H=me.get(T),z=m.state.lights,ye=m.state.shadowsArray,Ce=z.state.version,Ne=be.getParameters(T,z.state,ye,F,k),ze=be.getProgramCacheKey(Ne);let Xe=H.programs;H.environment=T.isMeshStandardMaterial?F.environment:null,H.fog=F.fog,H.envMap=(T.isMeshStandardMaterial?U:x).get(T.envMap||H.environment),Xe===void 0&&(T.addEventListener("dispose",de),Xe=new Map,H.programs=Xe);let Ge=Xe.get(ze);if(Ge!==void 0){if(H.currentProgram===Ge&&H.lightsStateVersion===Ce)return Fa(T,Ne),Ge}else Ne.uniforms=be.getUniforms(T),T.onBuild(k,Ne,_),T.onBeforeCompile(Ne,_),Ge=be.acquireProgram(Ne,ze),Xe.set(ze,Ge),H.uniforms=Ne.uniforms;const He=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(He.clippingPlanes=ke.uniform),Fa(T,Ne),H.needsLights=lh(T),H.lightsStateVersion=Ce,H.needsLights&&(He.ambientLightColor.value=z.state.ambient,He.lightProbe.value=z.state.probe,He.directionalLights.value=z.state.directional,He.directionalLightShadows.value=z.state.directionalShadow,He.spotLights.value=z.state.spot,He.spotLightShadows.value=z.state.spotShadow,He.rectAreaLights.value=z.state.rectArea,He.ltc_1.value=z.state.rectAreaLTC1,He.ltc_2.value=z.state.rectAreaLTC2,He.pointLights.value=z.state.point,He.pointLightShadows.value=z.state.pointShadow,He.hemisphereLights.value=z.state.hemi,He.directionalShadowMap.value=z.state.directionalShadowMap,He.directionalShadowMatrix.value=z.state.directionalShadowMatrix,He.spotShadowMap.value=z.state.spotShadowMap,He.spotLightMatrix.value=z.state.spotLightMatrix,He.spotLightMap.value=z.state.spotLightMap,He.pointShadowMap.value=z.state.pointShadowMap,He.pointShadowMatrix.value=z.state.pointShadowMatrix),H.currentProgram=Ge,H.uniformsList=null,Ge}function Oa(T){if(T.uniformsList===null){const F=T.currentProgram.getUniforms();T.uniformsList=Rr.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function Fa(T,F){const k=me.get(T);k.outputColorSpace=F.outputColorSpace,k.batching=F.batching,k.instancing=F.instancing,k.instancingColor=F.instancingColor,k.skinning=F.skinning,k.morphTargets=F.morphTargets,k.morphNormals=F.morphNormals,k.morphColors=F.morphColors,k.morphTargetsCount=F.morphTargetsCount,k.numClippingPlanes=F.numClippingPlanes,k.numIntersection=F.numClipIntersection,k.vertexAlphas=F.vertexAlphas,k.vertexTangents=F.vertexTangents,k.toneMapping=F.toneMapping}function ah(T,F,k,H,z){F.isScene!==!0&&(F=Te),E.resetTextureUnits();const ye=F.fog,Ce=H.isMeshStandardMaterial?F.environment:null,Ne=w===null?_.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:In,ze=(H.isMeshStandardMaterial?U:x).get(H.envMap||Ce),Xe=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ge=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),He=!!k.morphAttributes.position,gt=!!k.morphAttributes.normal,Xt=!!k.morphAttributes.color;let Et=jn;H.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Et=_.toneMapping);const yn=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,lt=yn!==void 0?yn.length:0,qe=me.get(H),so=m.state.lights;if(ee===!0&&(pe===!0||T!==M)){const Zt=T===M&&H.id===N;ke.setState(H,T,Zt)}let ft=!1;H.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==so.state.version||qe.outputColorSpace!==Ne||z.isBatchedMesh&&qe.batching===!1||!z.isBatchedMesh&&qe.batching===!0||z.isInstancedMesh&&qe.instancing===!1||!z.isInstancedMesh&&qe.instancing===!0||z.isSkinnedMesh&&qe.skinning===!1||!z.isSkinnedMesh&&qe.skinning===!0||z.isInstancedMesh&&qe.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&qe.instancingColor===!1&&z.instanceColor!==null||qe.envMap!==ze||H.fog===!0&&qe.fog!==ye||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==ke.numPlanes||qe.numIntersection!==ke.numIntersection)||qe.vertexAlphas!==Xe||qe.vertexTangents!==Ge||qe.morphTargets!==He||qe.morphNormals!==gt||qe.morphColors!==Xt||qe.toneMapping!==Et||oe.isWebGL2===!0&&qe.morphTargetsCount!==lt)&&(ft=!0):(ft=!0,qe.__version=H.version);let ni=qe.currentProgram;ft===!0&&(ni=js(H,F,z));let Ba=!1,_s=!1,ro=!1;const Pt=ni.getUniforms(),ii=qe.uniforms;if(q.useProgram(ni.program)&&(Ba=!0,_s=!0,ro=!0),H.id!==N&&(N=H.id,_s=!0),Ba||M!==T){Pt.setValue(P,"projectionMatrix",T.projectionMatrix),Pt.setValue(P,"viewMatrix",T.matrixWorldInverse);const Zt=Pt.map.cameraPosition;Zt!==void 0&&Zt.setValue(P,Fe.setFromMatrixPosition(T.matrixWorld)),oe.logarithmicDepthBuffer&&Pt.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Pt.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,_s=!0,ro=!0)}if(z.isSkinnedMesh){Pt.setOptional(P,z,"bindMatrix"),Pt.setOptional(P,z,"bindMatrixInverse");const Zt=z.skeleton;Zt&&(oe.floatVertexTextures?(Zt.boneTexture===null&&Zt.computeBoneTexture(),Pt.setValue(P,"boneTexture",Zt.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}z.isBatchedMesh&&(Pt.setOptional(P,z,"batchingTexture"),Pt.setValue(P,"batchingTexture",z._matricesTexture,E));const oo=k.morphAttributes;if((oo.position!==void 0||oo.normal!==void 0||oo.color!==void 0&&oe.isWebGL2===!0)&&We.update(z,k,ni),(_s||qe.receiveShadow!==z.receiveShadow)&&(qe.receiveShadow=z.receiveShadow,Pt.setValue(P,"receiveShadow",z.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(ii.envMap.value=ze,ii.flipEnvMap.value=ze.isCubeTexture&&ze.isRenderTargetTexture===!1?-1:1),_s&&(Pt.setValue(P,"toneMappingExposure",_.toneMappingExposure),qe.needsLights&&ch(ii,ro),ye&&H.fog===!0&&he.refreshFogUniforms(ii,ye),he.refreshMaterialUniforms(ii,H,j,G,we),Rr.upload(P,Oa(qe),ii,E)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Rr.upload(P,Oa(qe),ii,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Pt.setValue(P,"center",z.center),Pt.setValue(P,"modelViewMatrix",z.modelViewMatrix),Pt.setValue(P,"normalMatrix",z.normalMatrix),Pt.setValue(P,"modelMatrix",z.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Zt=H.uniformsGroups;for(let ao=0,uh=Zt.length;ao<uh;ao++)if(oe.isWebGL2){const za=Zt[ao];ae.update(za,ni),ae.bind(za,ni)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ni}function ch(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function lh(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(T,F,k){me.get(T.texture).__webglTexture=F,me.get(T.depthTexture).__webglTexture=k;const H=me.get(T);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=k===void 0,H.__autoAllocateDepthBuffer||Y.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,F){const k=me.get(T);k.__webglFramebuffer=F,k.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(T,F=0,k=0){w=T,L=F,R=k;let H=!0,z=null,ye=!1,Ce=!1;if(T){const ze=me.get(T);ze.__useDefaultFramebuffer!==void 0?(q.bindFramebuffer(P.FRAMEBUFFER,null),H=!1):ze.__webglFramebuffer===void 0?E.setupRenderTarget(T):ze.__hasExternalTextures&&E.rebindTextures(T,me.get(T.texture).__webglTexture,me.get(T.depthTexture).__webglTexture);const Xe=T.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Ce=!0);const Ge=me.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ge[F])?z=Ge[F][k]:z=Ge[F],ye=!0):oe.isWebGL2&&T.samples>0&&E.useMultisampledRTT(T)===!1?z=me.get(T).__webglMultisampledFramebuffer:Array.isArray(Ge)?z=Ge[k]:z=Ge,b.copy(T.viewport),O.copy(T.scissor),V=T.scissorTest}else b.copy($).multiplyScalar(j).floor(),O.copy(Q).multiplyScalar(j).floor(),V=fe;if(q.bindFramebuffer(P.FRAMEBUFFER,z)&&oe.drawBuffers&&H&&q.drawBuffers(T,z),q.viewport(b),q.scissor(O),q.setScissorTest(V),ye){const ze=me.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,ze.__webglTexture,k)}else if(Ce){const ze=me.get(T.texture),Xe=F||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,ze.__webglTexture,k||0,Xe)}N=-1},this.readRenderTargetPixels=function(T,F,k,H,z,ye,Ce){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ne=Ne[Ce]),Ne){q.bindFramebuffer(P.FRAMEBUFFER,Ne);try{const ze=T.texture,Xe=ze.format,Ge=ze.type;if(Xe!==cn&&_e.convert(Xe)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const He=Ge===Ns&&(Y.has("EXT_color_buffer_half_float")||oe.isWebGL2&&Y.has("EXT_color_buffer_float"));if(Ge!==Kn&&_e.convert(Ge)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ge===Wn&&(oe.isWebGL2||Y.has("OES_texture_float")||Y.has("WEBGL_color_buffer_float")))&&!He){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-H&&k>=0&&k<=T.height-z&&P.readPixels(F,k,H,z,_e.convert(Xe),_e.convert(Ge),ye)}finally{const ze=w!==null?me.get(w).__webglFramebuffer:null;q.bindFramebuffer(P.FRAMEBUFFER,ze)}}},this.copyFramebufferToTexture=function(T,F,k=0){const H=Math.pow(2,-k),z=Math.floor(F.image.width*H),ye=Math.floor(F.image.height*H);E.setTexture2D(F,0),P.copyTexSubImage2D(P.TEXTURE_2D,k,0,0,T.x,T.y,z,ye),q.unbindTexture()},this.copyTextureToTexture=function(T,F,k,H=0){const z=F.image.width,ye=F.image.height,Ce=_e.convert(k.format),Ne=_e.convert(k.type);E.setTexture2D(k,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,k.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,k.unpackAlignment),F.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,H,T.x,T.y,z,ye,Ce,Ne,F.image.data):F.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,H,T.x,T.y,F.mipmaps[0].width,F.mipmaps[0].height,Ce,F.mipmaps[0].data):P.texSubImage2D(P.TEXTURE_2D,H,T.x,T.y,Ce,Ne,F.image),H===0&&k.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),q.unbindTexture()},this.copyTextureToTexture3D=function(T,F,k,H,z=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ye=T.max.x-T.min.x+1,Ce=T.max.y-T.min.y+1,Ne=T.max.z-T.min.z+1,ze=_e.convert(H.format),Xe=_e.convert(H.type);let Ge;if(H.isData3DTexture)E.setTexture3D(H,0),Ge=P.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)E.setTexture2DArray(H,0),Ge=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,H.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,H.unpackAlignment);const He=P.getParameter(P.UNPACK_ROW_LENGTH),gt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Xt=P.getParameter(P.UNPACK_SKIP_PIXELS),Et=P.getParameter(P.UNPACK_SKIP_ROWS),yn=P.getParameter(P.UNPACK_SKIP_IMAGES),lt=k.isCompressedTexture?k.mipmaps[z]:k.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,lt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,lt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,T.min.x),P.pixelStorei(P.UNPACK_SKIP_ROWS,T.min.y),P.pixelStorei(P.UNPACK_SKIP_IMAGES,T.min.z),k.isDataTexture||k.isData3DTexture?P.texSubImage3D(Ge,z,F.x,F.y,F.z,ye,Ce,Ne,ze,Xe,lt.data):k.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),P.compressedTexSubImage3D(Ge,z,F.x,F.y,F.z,ye,Ce,Ne,ze,lt.data)):P.texSubImage3D(Ge,z,F.x,F.y,F.z,ye,Ce,Ne,ze,Xe,lt),P.pixelStorei(P.UNPACK_ROW_LENGTH,He),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,gt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Xt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Et),P.pixelStorei(P.UNPACK_SKIP_IMAGES,yn),z===0&&H.generateMipmaps&&P.generateMipmap(Ge),q.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?E.setTextureCube(T,0):T.isData3DTexture?E.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?E.setTexture2DArray(T,0):E.setTexture2D(T,0),q.unbindTexture()},this.resetState=function(){L=0,R=0,w=null,q.reset(),A.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===pa?"display-p3":"srgb",t.unpackColorSpace=nt.workingColorSpace===Yr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Rt?gi:yu}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===gi?Rt:In}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class A0 extends Gu{}A0.prototype.isWebGL1Renderer=!0;class va{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Je(e),this.density=t}clone(){return new va(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class R0 extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Hu extends ds{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ol=new pt,oa=new Kr,_r=new jr,vr=new C;class C0 extends yt{constructor(e=new Ut,t=new Hu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(s),_r.radius+=r,e.ray.intersectsSphere(_r)===!1)return;ol.copy(s).invert(),oa.copy(e.ray).applyMatrix4(ol);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,v=f;g<v;g++){const m=l.getX(g);vr.fromBufferAttribute(h,m),al(vr,m,c,s,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let g=d,v=f;g<v;g++)vr.fromBufferAttribute(h,g),al(vr,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function al(i,e,t,n,s,r,o){const a=oa.distanceSqToPoint(i);if(a<t){const c=new C;oa.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}class xa extends Wt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const u=n[s],d=n[s+1]-u,f=(o-u)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new re:new C);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new C,s=[],r=[],o=[],a=new C,c=new pt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new C)}r[0]=new C,o[0]=new C;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ct(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Ct(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ya extends xn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){const n=t||new re,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class P0 extends ya{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ma(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let d=(o-r)/l-(a-r)/(l+u)+(a-o)/u,f=(a-o)/u-(c-o)/(u+h)+(c-a)/h;d*=u,f*=u,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const xr=new C,zo=new Ma,ko=new Ma,Go=new Ma;class L0 extends xn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new C){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(xr.subVectors(s[0],s[1]).add(s[0]),l=xr);const h=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(xr.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=xr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),f),v=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),zo.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,g,v,m),ko.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,g,v,m),Go.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,g,v,m)}else this.curveType==="catmullrom"&&(zo.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),ko.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Go.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(zo.calc(c),ko.calc(c),Go.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function cl(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function I0(i,e){const t=1-i;return t*t*e}function D0(i,e){return 2*(1-i)*i*e}function U0(i,e){return i*i*e}function Ps(i,e,t,n){return I0(i,e)+D0(i,t)+U0(i,n)}function N0(i,e){const t=1-i;return t*t*t*e}function O0(i,e){const t=1-i;return 3*t*t*i*e}function F0(i,e){return 3*(1-i)*i*i*e}function B0(i,e){return i*i*i*e}function Ls(i,e,t,n,s){return N0(i,e)+O0(i,t)+F0(i,n)+B0(i,s)}class Vu extends xn{constructor(e=new re,t=new re,n=new re,s=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new re){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ls(e,s.x,r.x,o.x,a.x),Ls(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class z0 extends xn{constructor(e=new C,t=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ls(e,s.x,r.x,o.x,a.x),Ls(e,s.y,r.y,o.y,a.y),Ls(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Wu extends xn{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class k0 extends xn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xu extends xn{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ps(e,s.x,r.x,o.x),Ps(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class G0 extends xn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ps(e,s.x,r.x,o.x),Ps(e,s.y,r.y,o.y),Ps(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qu extends xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return n.set(cl(a,c.x,l.x,u.x,h.x),cl(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new re().fromArray(s))}return this}}var aa=Object.freeze({__proto__:null,ArcCurve:P0,CatmullRomCurve3:L0,CubicBezierCurve:Vu,CubicBezierCurve3:z0,EllipseCurve:ya,LineCurve:Wu,LineCurve3:k0,QuadraticBezierCurve:Xu,QuadraticBezierCurve3:G0,SplineCurve:qu});class H0 extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new aa[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new aa[s.type]().fromJSON(s))}return this}}class ll extends H0{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Wu(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Xu(this.currentPoint.clone(),new re(e,t),new re(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new Vu(this.currentPoint.clone(),new re(e,t),new re(n,s),new re(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new qu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){const l=new ya(e,t,n,s,r,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class xt extends Ut{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;y(),o===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new st(h,3)),this.setAttribute("normal",new st(d,3)),this.setAttribute("uv",new st(f,2));function y(){const S=new C,L=new C;let R=0;const w=(t-e)/n;for(let N=0;N<=r;N++){const M=[],b=N/r,O=b*(t-e)+e;for(let V=0;V<=s;V++){const J=V/s,D=J*c+a,B=Math.sin(D),G=Math.cos(D);L.x=O*B,L.y=-b*n+m,L.z=O*G,h.push(L.x,L.y,L.z),S.set(B,w,G).normalize(),d.push(S.x,S.y,S.z),f.push(J,1-b),M.push(g++)}v.push(M)}for(let N=0;N<s;N++)for(let M=0;M<r;M++){const b=v[M][N],O=v[M+1][N],V=v[M+1][N+1],J=v[M][N+1];u.push(b,O,J),u.push(O,V,J),R+=6}l.addGroup(p,R,0),p+=R}function _(S){const L=g,R=new re,w=new C;let N=0;const M=S===!0?e:t,b=S===!0?1:-1;for(let V=1;V<=s;V++)h.push(0,m*b,0),d.push(0,b,0),f.push(.5,.5),g++;const O=g;for(let V=0;V<=s;V++){const D=V/s*c+a,B=Math.cos(D),G=Math.sin(D);w.x=M*G,w.y=m*b,w.z=M*B,h.push(w.x,w.y,w.z),d.push(0,b,0),R.x=B*.5+.5,R.y=G*.5*b+.5,f.push(R.x,R.y),g++}for(let V=0;V<s;V++){const J=L+V,D=O+V;S===!0?u.push(D,D+1,J):u.push(D+1,D,J),N+=3}l.addGroup(p,N,S===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $r extends Ut{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),l(n),u(),this.setAttribute("position",new st(r,3)),this.setAttribute("normal",new st(r.slice(),3)),this.setAttribute("uv",new st(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const _=new C,S=new C,L=new C;for(let R=0;R<t.length;R+=3)f(t[R+0],_),f(t[R+1],S),f(t[R+2],L),c(_,S,L,y)}function c(y,_,S,L){const R=L+1,w=[];for(let N=0;N<=R;N++){w[N]=[];const M=y.clone().lerp(S,N/R),b=_.clone().lerp(S,N/R),O=R-N;for(let V=0;V<=O;V++)V===0&&N===R?w[N][V]=M:w[N][V]=M.clone().lerp(b,V/O)}for(let N=0;N<R;N++)for(let M=0;M<2*(R-N)-1;M++){const b=Math.floor(M/2);M%2===0?(d(w[N][b+1]),d(w[N+1][b]),d(w[N][b])):(d(w[N][b+1]),d(w[N+1][b+1]),d(w[N+1][b]))}}function l(y){const _=new C;for(let S=0;S<r.length;S+=3)_.x=r[S+0],_.y=r[S+1],_.z=r[S+2],_.normalize().multiplyScalar(y),r[S+0]=_.x,r[S+1]=_.y,r[S+2]=_.z}function u(){const y=new C;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];const S=m(y)/2/Math.PI+.5,L=p(y)/Math.PI+.5;o.push(S,1-L)}g(),h()}function h(){for(let y=0;y<o.length;y+=6){const _=o[y+0],S=o[y+2],L=o[y+4],R=Math.max(_,S,L),w=Math.min(_,S,L);R>.9&&w<.1&&(_<.2&&(o[y+0]+=1),S<.2&&(o[y+2]+=1),L<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,_){const S=y*3;_.x=e[S+0],_.y=e[S+1],_.z=e[S+2]}function g(){const y=new C,_=new C,S=new C,L=new C,R=new re,w=new re,N=new re;for(let M=0,b=0;M<r.length;M+=9,b+=6){y.set(r[M+0],r[M+1],r[M+2]),_.set(r[M+3],r[M+4],r[M+5]),S.set(r[M+6],r[M+7],r[M+8]),R.set(o[b+0],o[b+1]),w.set(o[b+2],o[b+3]),N.set(o[b+4],o[b+5]),L.copy(y).add(_).add(S).divideScalar(3);const O=m(L);v(R,b+0,y,O),v(w,b+2,_,O),v(N,b+4,S,O)}}function v(y,_,S,L){L<0&&y.x===1&&(o[_]=y.x-1),S.x===0&&S.z===0&&(o[_]=L/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $r(e.vertices,e.indices,e.radius,e.details)}}class Sa extends $r{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Sa(e.radius,e.detail)}}class qi extends ll{constructor(e){super(e),this.uuid=hs(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new ll().fromJSON(s))}return this}}const V0={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Yu(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,u,h,d,f;if(n&&(r=j0(i,e,r,t)),i.length>80*t){a=l=i[0],c=u=i[1];for(let g=t;g<s;g+=t)h=i[g],d=i[g+1],h<a&&(a=h),d<c&&(c=d),h>l&&(l=h),d>u&&(u=d);f=Math.max(l-a,u-c),f=f!==0?32767/f:0}return Os(r,o,t,a,c,f,0),o}};function Yu(i,e,t,n,s){let r,o;if(s===r_(i,e,t,n)>0)for(r=e;r<t;r+=n)o=ul(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=ul(r,i[r],i[r+1],o);return o&&Qr(o,o.next)&&(Bs(o),o=o.next),o}function yi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Qr(t,t.next)||ht(t.prev,t,t.next)===0)){if(Bs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Os(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Q0(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?X0(i,n,s,r):W0(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),Bs(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=q0(yi(i),e,t),Os(i,e,t,n,s,r,2)):o===2&&Y0(i,e,t,n,s,r):Os(yi(i),e,t,n,s,r,1);break}}}function W0(i){const e=i.prev,t=i,n=i.next;if(ht(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,u=s<r?s<o?s:o:r<o?r:o,h=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=d&&g.y>=h&&g.y<=f&&Yi(s,a,r,c,o,l,g.x,g.y)&&ht(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function X0(i,e,t,n){const s=i.prev,r=i,o=i.next;if(ht(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,u=s.y,h=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=u<h?u<d?u:d:h<d?h:d,v=a>c?a>l?a:l:c>l?c:l,m=u>h?u>d?u:d:h>d?h:d,p=ca(f,g,e,t,n),y=ca(v,m,e,t,n);let _=i.prevZ,S=i.nextZ;for(;_&&_.z>=p&&S&&S.z<=y;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Yi(a,u,c,h,l,d,_.x,_.y)&&ht(_.prev,_,_.next)>=0||(_=_.prevZ,S.x>=f&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Yi(a,u,c,h,l,d,S.x,S.y)&&ht(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Yi(a,u,c,h,l,d,_.x,_.y)&&ht(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;S&&S.z<=y;){if(S.x>=f&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Yi(a,u,c,h,l,d,S.x,S.y)&&ht(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function q0(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!Qr(s,r)&&ju(s,n,n.next,r)&&Fs(s,r)&&Fs(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Bs(n),Bs(n.next),n=i=r),n=n.next}while(n!==i);return yi(n)}function Y0(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&n_(o,a)){let c=Ku(o,a);o=yi(o,o.next),c=yi(c,c.next),Os(o,e,t,n,s,r,0),Os(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function j0(i,e,t,n){const s=[];let r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=Yu(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(t_(l));for(s.sort(K0),r=0;r<s.length;r++)t=J0(s[r],t);return t}function K0(i,e){return i.x-e.x}function J0(i,e){const t=Z0(i,e);if(!t)return e;const n=Ku(t,i);return yi(n,n.next),yi(t,t.next)}function Z0(i,e){let t=e,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,s=t.x<t.next.x?t:t.next,d===r))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,c=s.x,l=s.y;let u=1/0,h;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&Yi(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(h=Math.abs(o-t.y)/(r-t.x),Fs(t,i)&&(h<u||h===u&&(t.x>s.x||t.x===s.x&&$0(s,t)))&&(s=t,u=h)),t=t.next;while(t!==a);return s}function $0(i,e){return ht(i.prev,i,e.prev)<0&&ht(e.next,i,i.next)<0}function Q0(i,e,t,n){let s=i;do s.z===0&&(s.z=ca(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,e_(s)}function e_(i){let e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function ca(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function t_(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Yi(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function n_(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!i_(i,e)&&(Fs(i,e)&&Fs(e,i)&&s_(i,e)&&(ht(i.prev,i,e.prev)||ht(i,e.prev,e))||Qr(i,e)&&ht(i.prev,i,i.next)>0&&ht(e.prev,e,e.next)>0)}function ht(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Qr(i,e){return i.x===e.x&&i.y===e.y}function ju(i,e,t,n){const s=Mr(ht(i,e,t)),r=Mr(ht(i,e,n)),o=Mr(ht(t,n,i)),a=Mr(ht(t,n,e));return!!(s!==r&&o!==a||s===0&&yr(i,t,e)||r===0&&yr(i,n,e)||o===0&&yr(t,i,n)||a===0&&yr(t,e,n))}function yr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Mr(i){return i>0?1:i<0?-1:0}function i_(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&ju(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Fs(i,e){return ht(i.prev,i,i.next)<0?ht(i,e,i.next)>=0&&ht(i,i.prev,e)>=0:ht(i,e,i.prev)<0||ht(i,i.next,e)<0}function s_(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ku(i,e){const t=new la(i.i,i.x,i.y),n=new la(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ul(i,e,t,n){const s=new la(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Bs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function la(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function r_(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Jn{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Jn.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];hl(e),dl(n,e);let o=e.length;t.forEach(hl);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,dl(n,t[c]);const a=V0.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function hl(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function dl(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Is extends Ut{constructor(e=new qi([new re(.5,.5),new re(-.5,.5),new re(-.5,-.5),new re(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new st(s,3)),this.setAttribute("uv",new st(r,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:o_;let _,S=!1,L,R,w,N;p&&(_=p.getSpacedPoints(u),S=!0,d=!1,L=p.computeFrenetFrames(u,!1),R=new C,w=new C,N=new C),d||(m=0,f=0,g=0,v=0);const M=a.extractPoints(l);let b=M.shape;const O=M.holes;if(!Jn.isClockWise(b)){b=b.reverse();for(let P=0,le=O.length;P<le;P++){const Y=O[P];Jn.isClockWise(Y)&&(O[P]=Y.reverse())}}const J=Jn.triangulateShape(b,O),D=b;for(let P=0,le=O.length;P<le;P++){const Y=O[P];b=b.concat(Y)}function B(P,le,Y){return le||console.error("THREE.ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(le,Y)}const G=b.length,j=J.length;function K(P,le,Y){let oe,q,Ae;const me=P.x-le.x,E=P.y-le.y,x=Y.x-P.x,U=Y.y-P.y,ie=me*me+E*E,te=me*U-E*x;if(Math.abs(te)>Number.EPSILON){const Z=Math.sqrt(ie),be=Math.sqrt(x*x+U*U),he=le.x-E/Z,xe=le.y+me/Z,Le=Y.x-U/be,ke=Y.y+x/be,ne=((Le-he)*U-(ke-xe)*x)/(me*U-E*x);oe=he+me*ne-P.x,q=xe+E*ne-P.y;const Ze=oe*oe+q*q;if(Ze<=2)return new re(oe,q);Ae=Math.sqrt(Ze/2)}else{let Z=!1;me>Number.EPSILON?x>Number.EPSILON&&(Z=!0):me<-Number.EPSILON?x<-Number.EPSILON&&(Z=!0):Math.sign(E)===Math.sign(U)&&(Z=!0),Z?(oe=-E,q=me,Ae=Math.sqrt(ie)):(oe=me,q=E,Ae=Math.sqrt(ie/2))}return new re(oe/Ae,q/Ae)}const X=[];for(let P=0,le=D.length,Y=le-1,oe=P+1;P<le;P++,Y++,oe++)Y===le&&(Y=0),oe===le&&(oe=0),X[P]=K(D[P],D[Y],D[oe]);const $=[];let Q,fe=X.concat();for(let P=0,le=O.length;P<le;P++){const Y=O[P];Q=[];for(let oe=0,q=Y.length,Ae=q-1,me=oe+1;oe<q;oe++,Ae++,me++)Ae===q&&(Ae=0),me===q&&(me=0),Q[oe]=K(Y[oe],Y[Ae],Y[me]);$.push(Q),fe=fe.concat(Q)}for(let P=0;P<m;P++){const le=P/m,Y=f*Math.cos(le*Math.PI/2),oe=g*Math.sin(le*Math.PI/2)+v;for(let q=0,Ae=D.length;q<Ae;q++){const me=B(D[q],X[q],oe);Me(me.x,me.y,-Y)}for(let q=0,Ae=O.length;q<Ae;q++){const me=O[q];Q=$[q];for(let E=0,x=me.length;E<x;E++){const U=B(me[E],Q[E],oe);Me(U.x,U.y,-Y)}}}const W=g+v;for(let P=0;P<G;P++){const le=d?B(b[P],fe[P],W):b[P];S?(w.copy(L.normals[0]).multiplyScalar(le.x),R.copy(L.binormals[0]).multiplyScalar(le.y),N.copy(_[0]).add(w).add(R),Me(N.x,N.y,N.z)):Me(le.x,le.y,0)}for(let P=1;P<=u;P++)for(let le=0;le<G;le++){const Y=d?B(b[le],fe[le],W):b[le];S?(w.copy(L.normals[P]).multiplyScalar(Y.x),R.copy(L.binormals[P]).multiplyScalar(Y.y),N.copy(_[P]).add(w).add(R),Me(N.x,N.y,N.z)):Me(Y.x,Y.y,h/u*P)}for(let P=m-1;P>=0;P--){const le=P/m,Y=f*Math.cos(le*Math.PI/2),oe=g*Math.sin(le*Math.PI/2)+v;for(let q=0,Ae=D.length;q<Ae;q++){const me=B(D[q],X[q],oe);Me(me.x,me.y,h+Y)}for(let q=0,Ae=O.length;q<Ae;q++){const me=O[q];Q=$[q];for(let E=0,x=me.length;E<x;E++){const U=B(me[E],Q[E],oe);S?Me(U.x,U.y+_[u-1].y,_[u-1].x+Y):Me(U.x,U.y,h+Y)}}}ee(),pe();function ee(){const P=s.length/3;if(d){let le=0,Y=G*le;for(let oe=0;oe<j;oe++){const q=J[oe];De(q[2]+Y,q[1]+Y,q[0]+Y)}le=u+m*2,Y=G*le;for(let oe=0;oe<j;oe++){const q=J[oe];De(q[0]+Y,q[1]+Y,q[2]+Y)}}else{for(let le=0;le<j;le++){const Y=J[le];De(Y[2],Y[1],Y[0])}for(let le=0;le<j;le++){const Y=J[le];De(Y[0]+G*u,Y[1]+G*u,Y[2]+G*u)}}n.addGroup(P,s.length/3-P,0)}function pe(){const P=s.length/3;let le=0;we(D,le),le+=D.length;for(let Y=0,oe=O.length;Y<oe;Y++){const q=O[Y];we(q,le),le+=q.length}n.addGroup(P,s.length/3-P,1)}function we(P,le){let Y=P.length;for(;--Y>=0;){const oe=Y;let q=Y-1;q<0&&(q=P.length-1);for(let Ae=0,me=u+m*2;Ae<me;Ae++){const E=G*Ae,x=G*(Ae+1),U=le+oe+E,ie=le+q+E,te=le+q+x,Z=le+oe+x;Fe(U,ie,te,Z)}}}function Me(P,le,Y){c.push(P),c.push(le),c.push(Y)}function De(P,le,Y){Te(P),Te(le),Te(Y);const oe=s.length/3,q=y.generateTopUV(n,s,oe-3,oe-2,oe-1);Oe(q[0]),Oe(q[1]),Oe(q[2])}function Fe(P,le,Y,oe){Te(P),Te(le),Te(oe),Te(le),Te(Y),Te(oe);const q=s.length/3,Ae=y.generateSideWallUV(n,s,q-6,q-3,q-2,q-1);Oe(Ae[0]),Oe(Ae[1]),Oe(Ae[3]),Oe(Ae[1]),Oe(Ae[2]),Oe(Ae[3])}function Te(P){s.push(c[P*3+0]),s.push(c[P*3+1]),s.push(c[P*3+2])}function Oe(P){r.push(P.x),r.push(P.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return a_(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new aa[s.type]().fromJSON(s)),new Is(n,e.options)}}const o_={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new re(r,o),new re(a,c),new re(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],h=e[n*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],v=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new re(o,1-c),new re(l,1-h),new re(d,1-g),new re(v,1-p)]:[new re(a,1-c),new re(u,1-h),new re(f,1-g),new re(m,1-p)]}};function a_(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class ps extends $r{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ps(e.radius,e.detail)}}class Hs extends Ut{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let h=e;const d=(t-e)/s,f=new C,g=new re;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}h+=d}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const y=p+m,_=y,S=y+n+1,L=y+n+2,R=y+1;a.push(_,S,R),a.push(S,L,R)}}this.setIndex(a),this.setAttribute("position",new st(c,3)),this.setAttribute("normal",new st(l,3)),this.setAttribute("uv",new st(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hs(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ea extends Ut{constructor(e=new qi([new re(0,.5),new re(-.5,-.5),new re(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new st(s,3)),this.setAttribute("normal",new st(r,3)),this.setAttribute("uv",new st(o,2));function l(u){const h=s.length/3,d=u.extractPoints(t);let f=d.shape;const g=d.holes;Jn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const y=g[m];Jn.isClockWise(y)===!0&&(g[m]=y.reverse())}const v=Jn.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const y=g[m];f=f.concat(y)}for(let m=0,p=f.length;m<p;m++){const y=f[m];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let m=0,p=v.length;m<p;m++){const y=v[m],_=y[0]+h,S=y[1]+h,L=y[2]+h;n.push(_,S,L),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return c_(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];n.push(o)}return new Ea(n,e.curveSegments)}}function c_(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class ji extends Ut{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new C,d=new C,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const y=[],_=p/n;let S=0;p===0&&o===0?S=.5/t:p===n&&c===Math.PI&&(S=-.5/t);for(let L=0;L<=t;L++){const R=L/t;h.x=-e*Math.cos(s+R*r)*Math.sin(o+_*a),h.y=e*Math.cos(o+_*a),h.z=e*Math.sin(s+R*r)*Math.sin(o+_*a),g.push(h.x,h.y,h.z),d.copy(h).normalize(),v.push(d.x,d.y,d.z),m.push(R+S,1-_),y.push(l++)}u.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const _=u[p][y+1],S=u[p][y],L=u[p+1][y],R=u[p+1][y+1];(p!==0||o>0)&&f.push(_,S,R),(p!==n-1||c<Math.PI)&&f.push(S,L,R)}this.setIndex(f),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(v,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ji(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class pn extends Ut{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],u=new C,h=new C,d=new C;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const v=g/s*r,m=f/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(v),h.y=(e+t*Math.cos(m))*Math.sin(v),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),d.subVectors(h,u).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,y=(s+1)*f+g;o.push(v,m,y),o.push(m,p,y)}this.setIndex(o),this.setAttribute("position",new st(a,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class li extends ds{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mu,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class eo extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Ho=new pt,fl=new C,pl=new C;class ba{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ga,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;fl.setFromMatrixPosition(e.matrixWorld),t.position.copy(fl),pl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(pl),t.updateMatrixWorld(),Ho.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ho),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ho)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class l_ extends ba{constructor(){super(new Gt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=zr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class u_ extends eo{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new l_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ml=new pt,Es=new C,Vo=new C;class h_ extends ba{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new re(4,2),this._viewportCount=6,this._viewports=[new ct(2,1,1,1),new ct(0,1,1,1),new ct(3,1,1,1),new ct(1,1,1,1),new ct(3,0,1,1),new ct(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Es.setFromMatrixPosition(e.matrixWorld),n.position.copy(Es),Vo.copy(n.position),Vo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Vo),n.updateMatrixWorld(),s.makeTranslation(-Es.x,-Es.y,-Es.z),ml.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ml)}}class d_ extends eo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new h_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class f_ extends ba{constructor(){super(new Uu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class p_ extends eo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new f_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class m_ extends eo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class g_{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=gl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=gl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function gl(){return(typeof performance>"u"?Date:performance).now()}class __{constructor(e,t,n=0,s=1/0){this.ray=new Kr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ma,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return ua(e,this,n,t),n.sort(_l),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)ua(e[s],this,n,t);return n.sort(_l),n}}function _l(i,e){return i.distance-e.distance}function ua(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const s=i.children;for(let r=0,o=s.length;r<o;r++)ua(s[r],e,t,!0)}}class vl{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ct(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:da}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=da);const xl={type:"change"},Wo={type:"start"},yl={type:"end"},Sr=new Kr,Ml=new kn,v_=Math.cos(70*yd.DEG2RAD);class x_ extends bi{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:wi.ROTATE,MIDDLE:wi.DOLLY,RIGHT:wi.PAN},this.touches={ONE:Ai.ROTATE,TWO:Ai.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(A){A.addEventListener("keydown",Le),this._domElementKeyEvents=A},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Le),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(xl),n.update(),r=s.NONE},this.update=function(){const A=new C,ae=new vi().setFromUnitVectors(e.up,new C(0,1,0)),Re=ae.clone().invert(),Se=new C,se=new vi,I=new C,ce=2*Math.PI;return function(Ue=null){const Ie=n.object.position;A.copy(Ie).sub(n.target),A.applyQuaternion(ae),a.setFromVector3(A),n.autoRotate&&r===s.NONE&&V(b(Ue)),n.enableDamping?(a.theta+=c.theta*n.dampingFactor,a.phi+=c.phi*n.dampingFactor):(a.theta+=c.theta,a.phi+=c.phi);let je=n.minAzimuthAngle,Ke=n.maxAzimuthAngle;isFinite(je)&&isFinite(Ke)&&(je<-Math.PI?je+=ce:je>Math.PI&&(je-=ce),Ke<-Math.PI?Ke+=ce:Ke>Math.PI&&(Ke-=ce),je<=Ke?a.theta=Math.max(je,Math.min(Ke,a.theta)):a.theta=a.theta>(je+Ke)/2?Math.max(je,a.theta):Math.min(Ke,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&R||n.object.isOrthographicCamera?a.radius=$(a.radius):a.radius=$(a.radius*l),A.setFromSpherical(a),A.applyQuaternion(Re),Ie.copy(n.target).add(A),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),u.set(0,0,0));let dt=!1;if(n.zoomToCursor&&R){let mt=null;if(n.object.isPerspectiveCamera){const Qe=A.length();mt=$(Qe*l);const _t=Qe-mt;n.object.position.addScaledVector(S,_t),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Qe=new C(L.x,L.y,0);Qe.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),dt=!0;const _t=new C(L.x,L.y,0);_t.unproject(n.object),n.object.position.sub(_t).add(Qe),n.object.updateMatrixWorld(),mt=A.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;mt!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(mt).add(n.object.position):(Sr.origin.copy(n.object.position),Sr.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Sr.direction))<v_?e.lookAt(n.target):(Ml.setFromNormalAndCoplanarPoint(n.object.up,n.target),Sr.intersectPlane(Ml,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),dt=!0);return l=1,R=!1,dt||Se.distanceToSquared(n.object.position)>o||8*(1-se.dot(n.object.quaternion))>o||I.distanceToSquared(n.target)>0?(n.dispatchEvent(xl),Se.copy(n.object.position),se.copy(n.object.quaternion),I.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ze),n.domElement.removeEventListener("pointerdown",E),n.domElement.removeEventListener("pointercancel",U),n.domElement.removeEventListener("wheel",Z),n.domElement.removeEventListener("pointermove",x),n.domElement.removeEventListener("pointerup",U),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Le),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const o=1e-6,a=new vl,c=new vl;let l=1;const u=new C,h=new re,d=new re,f=new re,g=new re,v=new re,m=new re,p=new re,y=new re,_=new re,S=new C,L=new re;let R=!1;const w=[],N={};let M=!1;function b(A){return A!==null?2*Math.PI/60*n.autoRotateSpeed*A:2*Math.PI/60/60*n.autoRotateSpeed}function O(A){const ae=Math.abs(A*.01);return Math.pow(.95,n.zoomSpeed*ae)}function V(A){c.theta-=A}function J(A){c.phi-=A}const D=function(){const A=new C;return function(Re,Se){A.setFromMatrixColumn(Se,0),A.multiplyScalar(-Re),u.add(A)}}(),B=function(){const A=new C;return function(Re,Se){n.screenSpacePanning===!0?A.setFromMatrixColumn(Se,1):(A.setFromMatrixColumn(Se,0),A.crossVectors(n.object.up,A)),A.multiplyScalar(Re),u.add(A)}}(),G=function(){const A=new C;return function(Re,Se){const se=n.domElement;if(n.object.isPerspectiveCamera){const I=n.object.position;A.copy(I).sub(n.target);let ce=A.length();ce*=Math.tan(n.object.fov/2*Math.PI/180),D(2*Re*ce/se.clientHeight,n.object.matrix),B(2*Se*ce/se.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(D(Re*(n.object.right-n.object.left)/n.object.zoom/se.clientWidth,n.object.matrix),B(Se*(n.object.top-n.object.bottom)/n.object.zoom/se.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function j(A){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=A:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function K(A){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=A:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function X(A,ae){if(!n.zoomToCursor)return;R=!0;const Re=n.domElement.getBoundingClientRect(),Se=A-Re.left,se=ae-Re.top,I=Re.width,ce=Re.height;L.x=Se/I*2-1,L.y=-(se/ce)*2+1,S.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function $(A){return Math.max(n.minDistance,Math.min(n.maxDistance,A))}function Q(A){h.set(A.clientX,A.clientY)}function fe(A){X(A.clientX,A.clientX),p.set(A.clientX,A.clientY)}function W(A){g.set(A.clientX,A.clientY)}function ee(A){d.set(A.clientX,A.clientY),f.subVectors(d,h).multiplyScalar(n.rotateSpeed);const ae=n.domElement;V(2*Math.PI*f.x/ae.clientHeight),J(2*Math.PI*f.y/ae.clientHeight),h.copy(d),n.update()}function pe(A){y.set(A.clientX,A.clientY),_.subVectors(y,p),_.y>0?j(O(_.y)):_.y<0&&K(O(_.y)),p.copy(y),n.update()}function we(A){v.set(A.clientX,A.clientY),m.subVectors(v,g).multiplyScalar(n.panSpeed),G(m.x,m.y),g.copy(v),n.update()}function Me(A){X(A.clientX,A.clientY),A.deltaY<0?K(O(A.deltaY)):A.deltaY>0&&j(O(A.deltaY)),n.update()}function De(A){let ae=!1;switch(A.code){case n.keys.UP:A.ctrlKey||A.metaKey||A.shiftKey?J(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,n.keyPanSpeed),ae=!0;break;case n.keys.BOTTOM:A.ctrlKey||A.metaKey||A.shiftKey?J(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,-n.keyPanSpeed),ae=!0;break;case n.keys.LEFT:A.ctrlKey||A.metaKey||A.shiftKey?V(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(n.keyPanSpeed,0),ae=!0;break;case n.keys.RIGHT:A.ctrlKey||A.metaKey||A.shiftKey?V(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(-n.keyPanSpeed,0),ae=!0;break}ae&&(A.preventDefault(),n.update())}function Fe(A){if(w.length===1)h.set(A.pageX,A.pageY);else{const ae=_e(A),Re=.5*(A.pageX+ae.x),Se=.5*(A.pageY+ae.y);h.set(Re,Se)}}function Te(A){if(w.length===1)g.set(A.pageX,A.pageY);else{const ae=_e(A),Re=.5*(A.pageX+ae.x),Se=.5*(A.pageY+ae.y);g.set(Re,Se)}}function Oe(A){const ae=_e(A),Re=A.pageX-ae.x,Se=A.pageY-ae.y,se=Math.sqrt(Re*Re+Se*Se);p.set(0,se)}function P(A){n.enableZoom&&Oe(A),n.enablePan&&Te(A)}function le(A){n.enableZoom&&Oe(A),n.enableRotate&&Fe(A)}function Y(A){if(w.length==1)d.set(A.pageX,A.pageY);else{const Re=_e(A),Se=.5*(A.pageX+Re.x),se=.5*(A.pageY+Re.y);d.set(Se,se)}f.subVectors(d,h).multiplyScalar(n.rotateSpeed);const ae=n.domElement;V(2*Math.PI*f.x/ae.clientHeight),J(2*Math.PI*f.y/ae.clientHeight),h.copy(d)}function oe(A){if(w.length===1)v.set(A.pageX,A.pageY);else{const ae=_e(A),Re=.5*(A.pageX+ae.x),Se=.5*(A.pageY+ae.y);v.set(Re,Se)}m.subVectors(v,g).multiplyScalar(n.panSpeed),G(m.x,m.y),g.copy(v)}function q(A){const ae=_e(A),Re=A.pageX-ae.x,Se=A.pageY-ae.y,se=Math.sqrt(Re*Re+Se*Se);y.set(0,se),_.set(0,Math.pow(y.y/p.y,n.zoomSpeed)),j(_.y),p.copy(y);const I=(A.pageX+ae.x)*.5,ce=(A.pageY+ae.y)*.5;X(I,ce)}function Ae(A){n.enableZoom&&q(A),n.enablePan&&oe(A)}function me(A){n.enableZoom&&q(A),n.enableRotate&&Y(A)}function E(A){n.enabled!==!1&&(w.length===0&&(n.domElement.setPointerCapture(A.pointerId),n.domElement.addEventListener("pointermove",x),n.domElement.addEventListener("pointerup",U)),We(A),A.pointerType==="touch"?ke(A):ie(A))}function x(A){n.enabled!==!1&&(A.pointerType==="touch"?ne(A):te(A))}function U(A){Be(A),w.length===0&&(n.domElement.releasePointerCapture(A.pointerId),n.domElement.removeEventListener("pointermove",x),n.domElement.removeEventListener("pointerup",U)),n.dispatchEvent(yl),r=s.NONE}function ie(A){let ae;switch(A.button){case 0:ae=n.mouseButtons.LEFT;break;case 1:ae=n.mouseButtons.MIDDLE;break;case 2:ae=n.mouseButtons.RIGHT;break;default:ae=-1}switch(ae){case wi.DOLLY:if(n.enableZoom===!1)return;fe(A),r=s.DOLLY;break;case wi.ROTATE:if(A.ctrlKey||A.metaKey||A.shiftKey){if(n.enablePan===!1)return;W(A),r=s.PAN}else{if(n.enableRotate===!1)return;Q(A),r=s.ROTATE}break;case wi.PAN:if(A.ctrlKey||A.metaKey||A.shiftKey){if(n.enableRotate===!1)return;Q(A),r=s.ROTATE}else{if(n.enablePan===!1)return;W(A),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(Wo)}function te(A){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;ee(A);break;case s.DOLLY:if(n.enableZoom===!1)return;pe(A);break;case s.PAN:if(n.enablePan===!1)return;we(A);break}}function Z(A){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(A.preventDefault(),n.dispatchEvent(Wo),Me(be(A)),n.dispatchEvent(yl))}function be(A){const ae=A.deltaMode,Re={clientX:A.clientX,clientY:A.clientY,deltaY:A.deltaY};switch(ae){case 1:Re.deltaY*=16;break;case 2:Re.deltaY*=100;break}return A.ctrlKey&&!M&&(Re.deltaY*=10),Re}function he(A){A.key==="Control"&&(M=!0,document.addEventListener("keyup",xe,{passive:!0,capture:!0}))}function xe(A){A.key==="Control"&&(M=!1,document.removeEventListener("keyup",xe,{passive:!0,capture:!0}))}function Le(A){n.enabled===!1||n.enablePan===!1||De(A)}function ke(A){switch(Pe(A),w.length){case 1:switch(n.touches.ONE){case Ai.ROTATE:if(n.enableRotate===!1)return;Fe(A),r=s.TOUCH_ROTATE;break;case Ai.PAN:if(n.enablePan===!1)return;Te(A),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case Ai.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;P(A),r=s.TOUCH_DOLLY_PAN;break;case Ai.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;le(A),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(Wo)}function ne(A){switch(Pe(A),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;Y(A),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;oe(A),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ae(A),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;me(A),n.update();break;default:r=s.NONE}}function Ze(A){n.enabled!==!1&&A.preventDefault()}function We(A){w.push(A.pointerId)}function Be(A){delete N[A.pointerId];for(let ae=0;ae<w.length;ae++)if(w[ae]==A.pointerId){w.splice(ae,1);return}}function Pe(A){let ae=N[A.pointerId];ae===void 0&&(ae=new re,N[A.pointerId]=ae),ae.set(A.pageX,A.pageY)}function _e(A){const ae=A.pointerId===w[0]?w[1]:w[0];return N[ae]}n.domElement.addEventListener("contextmenu",Ze),n.domElement.addEventListener("pointerdown",E),n.domElement.addEventListener("pointercancel",U),n.domElement.addEventListener("wheel",Z,{passive:!1}),document.addEventListener("keydown",he,{passive:!0,capture:!0}),this.update()}}class y_{constructor(){this.ctx=null,this.enabled=!0,this.ambientPlaying=!1,this.ambientGain=null,this.ambientNodes=[],this.slideNoiseBuffer=null}init(){if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;this.ctx=new e}this.ctx.state==="suspended"&&this.ctx.resume()}playSlide(){if(!this.enabled)return;this.init();const e=.45;if(!this.slideNoiseBuffer||this.slideNoiseBuffer.sampleRate!==this.ctx.sampleRate){const r=Math.floor(this.ctx.sampleRate*e);this.slideNoiseBuffer=this.ctx.createBuffer(1,r,this.ctx.sampleRate);const o=this.slideNoiseBuffer.getChannelData(0);for(let a=0;a<r;a++)o[a]=(Math.random()*2-1)*Math.exp(-a/(r*.6))}const t=this.ctx.createBufferSource();t.buffer=this.slideNoiseBuffer;const n=this.ctx.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(190,this.ctx.currentTime);const s=this.ctx.createGain();s.gain.setValueAtTime(.22,this.ctx.currentTime),s.gain.exponentialRampToValueAtTime(.01,this.ctx.currentTime+e),t.connect(n).connect(s).connect(this.ctx.destination),t.start()}playShatter(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(120,e),t.frequency.exponentialRampToValueAtTime(28,e+.35),n.gain.setValueAtTime(.5,e),n.gain.exponentialRampToValueAtTime(.01,e+.38),t.connect(n).connect(this.ctx.destination),t.start(e),t.stop(e+.4);const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(880,e),s.frequency.exponentialRampToValueAtTime(220,e+.25),r.gain.setValueAtTime(.2,e),r.gain.exponentialRampToValueAtTime(.001,e+.28),s.connect(r).connect(this.ctx.destination),s.start(e),s.stop(e+.3)}playCheck(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime;[174.61,261.63,349.23].forEach((t,n)=>{const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="triangle",s.frequency.setValueAtTime(t,e),s.frequency.exponentialRampToValueAtTime(t*.98,e+1.2);const o=.25/(n+1);r.gain.setValueAtTime(.01,e),r.gain.exponentialRampToValueAtTime(o,e+.05),r.gain.exponentialRampToValueAtTime(.001,e+1.2),s.connect(r).connect(this.ctx.destination),s.start(e),s.stop(e+1.3)})}playVictory(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime;[261.63,329.63,392,523.25,659.25,783.99].forEach((n,s)=>{const r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sine";const a=e+s*.11;r.frequency.setValueAtTime(n,a),o.gain.setValueAtTime(.001,a),o.gain.exponentialRampToValueAtTime(.25,a+.04),o.gain.exponentialRampToValueAtTime(.001,a+1.4),r.connect(o).connect(this.ctx.destination),r.start(a),r.stop(a+1.5)})}playClick(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(420,e),t.frequency.exponentialRampToValueAtTime(140,e+.06),n.gain.setValueAtTime(.18,e),n.gain.exponentialRampToValueAtTime(.001,e+.06),t.connect(n).connect(this.ctx.destination),t.start(e),t.stop(e+.07)}playBeam(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(440,e),t.frequency.linearRampToValueAtTime(880,e+.35);const s=this.ctx.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(650,e),s.Q.setValueAtTime(4,e),n.gain.setValueAtTime(.2,e),n.gain.exponentialRampToValueAtTime(.001,e+.4),t.connect(s).connect(n).connect(this.ctx.destination),t.start(e),t.stop(e+.45)}playTremor(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(65,e),t.frequency.exponentialRampToValueAtTime(20,e+.6),n.gain.setValueAtTime(.65,e),n.gain.exponentialRampToValueAtTime(.001,e+.65),t.connect(n).connect(this.ctx.destination),t.start(e),t.stop(e+.7)}playVortex(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(280,e),t.frequency.exponentialRampToValueAtTime(720,e+.25),t.frequency.exponentialRampToValueAtTime(140,e+.5),n.gain.setValueAtTime(.01,e),n.gain.linearRampToValueAtTime(.3,e+.25),n.gain.exponentialRampToValueAtTime(.001,e+.55),t.connect(n).connect(this.ctx.destination),t.start(e),t.stop(e+.6)}playEmote(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime;[659.25,987.77].forEach((t,n)=>{const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine";const o=e+n*.08;s.frequency.setValueAtTime(t,o),r.gain.setValueAtTime(.18,o),r.gain.exponentialRampToValueAtTime(.001,o+.4),s.connect(r).connect(this.ctx.destination),s.start(o),s.stop(o+.45)})}toggleAmbience(){return this.ambientPlaying?(this.stopAmbience(),!1):(this.startAmbience(),!0)}startAmbience(){if(this.ambientPlaying)return;this.init(),this.ambientPlaying=!0;const e=this.ctx.createGain();e.gain.setValueAtTime(.001,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(.09,this.ctx.currentTime+3),e.connect(this.ctx.destination),this.ambientGain=e;const t=[73.42,110,146.83,174.61];this.ambientNodes=[],t.forEach((n,s)=>{const r=this.ctx.createOscillator(),o=this.ctx.createBiquadFilter(),a=this.ctx.createGain();r.type=s%2===0?"sine":"triangle",r.frequency.setValueAtTime(n,this.ctx.currentTime);const c=(Math.random()-.5)*8;r.detune.setValueAtTime(c,this.ctx.currentTime),o.type="lowpass",o.frequency.setValueAtTime(260+s*70,this.ctx.currentTime),a.gain.setValueAtTime(.2/(s+1),this.ctx.currentTime),r.connect(o).connect(a).connect(e),r.start(),this.ambientNodes.push(r)})}stopAmbience(){!this.ambientPlaying||!this.ambientGain||(this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value,this.ctx.currentTime),this.ambientGain.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+1.2),setTimeout(()=>{this.ambientNodes.forEach(e=>{try{e.stop()}catch{}}),this.ambientNodes=[],this.ambientPlaying=!1},1300))}playThunderStomp(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(95,e),t.frequency.exponentialRampToValueAtTime(25,e+.4),n.gain.setValueAtTime(.7,e),n.gain.exponentialRampToValueAtTime(.001,e+.45),t.connect(n).connect(this.ctx.destination),t.start(e),t.stop(e+.5);const s=Math.floor(this.ctx.sampleRate*.25),r=this.ctx.createBuffer(1,s,this.ctx.sampleRate),o=r.getChannelData(0);for(let u=0;u<s;u++)o[u]=(Math.random()*2-1)*Math.exp(-u/(s*.3));const a=this.ctx.createBufferSource();a.buffer=r;const c=this.ctx.createBiquadFilter();c.type="bandpass",c.frequency.setValueAtTime(1400,e);const l=this.ctx.createGain();l.gain.setValueAtTime(.35,e),l.gain.exponentialRampToValueAtTime(.01,e+.25),a.connect(c).connect(l).connect(this.ctx.destination),a.start(e)}playRoyalSmite(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime;[220,440,659.25,880].forEach((t,n)=>{const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(t,e),r.gain.setValueAtTime(.01,e),r.gain.linearRampToValueAtTime(.2/(n+1),e+.04),r.gain.exponentialRampToValueAtTime(.001,e+.9),s.connect(r).connect(this.ctx.destination),s.start(e),s.stop(e+1)})}playPawnThrust(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(580,e),t.frequency.exponentialRampToValueAtTime(220,e+.18),n.gain.setValueAtTime(.28,e),n.gain.exponentialRampToValueAtTime(.001,e+.2),t.connect(n).connect(this.ctx.destination),t.start(e),t.stop(e+.22)}playPuzzleSuccess(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((n,s)=>{const r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="triangle";const a=e+s*.08;r.frequency.setValueAtTime(n,a),o.gain.setValueAtTime(.01,a),o.gain.linearRampToValueAtTime(.22,a+.03),o.gain.exponentialRampToValueAtTime(.001,a+.7),r.connect(o).connect(this.ctx.destination),r.start(a),r.stop(a+.75)})}playPuzzleFail(){if(!this.enabled)return;this.init();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(220,e),t.frequency.exponentialRampToValueAtTime(110,e+.35),n.gain.setValueAtTime(.25,e),n.gain.exponentialRampToValueAtTime(.001,e+.38),t.connect(n).connect(this.ctx.destination),t.start(e),t.stop(e+.4)}}const Er={P:10,N:30,B:30,R:50,Q:90,K:900};class M_{constructor(){this.reset()}reset(){this.turn="w",this.lastMove=null,this.history=[],this.halfmoveClock=0,this.positionHistory=[],this.board=Array.from({length:8},()=>Array(8).fill(null));const e=["R","N","B","Q","K","B","N","R"];for(let t=0;t<8;t++)this.board[0][t]={type:e[t],color:"b",moved:!1},this.board[1][t]={type:"P",color:"b",moved:!1},this.board[6][t]={type:"P",color:"w",moved:!1},this.board[7][t]={type:e[t],color:"w",moved:!1};this.positionHistory.push(this.getPositionHash())}loadFen(e){const t=e.trim().split(/\s+/),n=t[0],s=t[1]||"w",r=t[2]||"",o=t[3]||"-";this.board=Array.from({length:8},()=>Array(8).fill(null)),this.turn=s,this.lastMove=null,this.history=[],this.halfmoveClock=parseInt(t[4],10)||0,this.positionHistory=[];const a=n.split("/");for(let c=0;c<8;c++){let l=0;const u=a[c]||"";for(const h of u)if(h>="1"&&h<="8")l+=parseInt(h,10);else{const d=h===h.toUpperCase(),f=h.toUpperCase(),g=d?"w":"b";let v=!0;f==="P"?(g==="w"&&c===6||g==="b"&&c===1)&&(v=!1):f==="K"?g==="w"&&c===7&&l===4?(r.includes("K")||r.includes("Q")||r==="")&&(v=!1):g==="b"&&c===0&&l===4&&(r.includes("k")||r.includes("q")||r==="")&&(v=!1):f==="R"&&(g==="w"&&c===7&&l===7&&(r.includes("K")||r==="")&&(v=!1),g==="w"&&c===7&&l===0&&(r.includes("Q")||r==="")&&(v=!1),g==="b"&&c===0&&l===7&&(r.includes("k")||r==="")&&(v=!1),g==="b"&&c===0&&l===0&&(r.includes("q")||r==="")&&(v=!1)),this.board[c][l]={type:f,color:g,moved:v},l++}}if(o!=="-"&&o.length>=2){const c=o.charCodeAt(0)-97;c>=0&&c<8&&(s==="w"?this.lastMove={piece:{type:"P",color:"b"},from:{r:1,c},to:{r:3,c}}:this.lastMove={piece:{type:"P",color:"w"},from:{r:6,c},to:{r:4,c}})}this.positionHistory.push(this.getPositionHash())}getEvaluationScore(){return+(this.evaluateBoard(this.board,"w")/100).toFixed(1)}inBounds(e,t){return e>=0&&e<8&&t>=0&&t<8}getPositionHash(e=this.board,t=this.turn){var c,l,u,h,d,f,g,v,m,p,y;let n="";const s=(c=e[7])==null?void 0:c[4];s&&s.type==="K"&&s.color==="w"&&!s.moved&&(((l=e[7][7])==null?void 0:l.type)==="R"&&!((u=e[7][7])!=null&&u.moved)&&(n+="K"),((h=e[7][0])==null?void 0:h.type)==="R"&&!((d=e[7][0])!=null&&d.moved)&&(n+="Q"));const r=(f=e[0])==null?void 0:f[4];r&&r.type==="K"&&r.color==="b"&&!r.moved&&(((g=e[0][7])==null?void 0:g.type)==="R"&&!((v=e[0][7])!=null&&v.moved)&&(n+="k"),((m=e[0][0])==null?void 0:m.type)==="R"&&!((p=e[0][0])!=null&&p.moved)&&(n+="q")),n||(n="-");let o="-";this.lastMove&&((y=this.lastMove.piece)==null?void 0:y.type)==="P"&&Math.abs(this.lastMove.from.r-this.lastMove.to.r)===2&&(o=`${this.lastMove.to.c}`);let a=`${t}:${n}:${o}:`;for(let _=0;_<8;_++)for(let S=0;S<8;S++){const L=e[_][S];a+=L?`${L.color}${L.type}`:"."}return a}recordMoveRuleState(e,t,n){t||n?this.halfmoveClock=0:this.halfmoveClock++,this.positionHistory.push(this.getPositionHash())}isFiftyMoveRule(){return this.halfmoveClock>=100}isThreefoldRepetition(){if(this.positionHistory.length<3)return!1;const e=this.positionHistory[this.positionHistory.length-1];let t=0;for(const n of this.positionHistory)n===e&&t++;return t>=3}isInsufficientMaterial(e=this.board){const t=[];for(let o=0;o<8;o++)for(let a=0;a<8;a++){const c=e[o][a];c&&t.push({type:c.type,color:c.color,r:o,c:a})}if(t.some(o=>o.type==="P"||o.type==="R"||o.type==="Q"))return!1;const n=t.filter(o=>o.type==="K"),s=t.filter(o=>o.type==="N"),r=t.filter(o=>o.type==="B");if(n.length!==2)return!1;if(t.length===2||t.length===3&&(s.length===1||r.length===1))return!0;if(t.length===4&&r.length===2&&s.length===0){const o=r[0],a=r[1],c=(o.r+o.c)%2,l=(a.r+a.c)%2;if(c===l)return!0}return!1}getPseudoLegalMoves(e,t,n=this.board){const s=n[e][t];if(!s)return[];const r=[],o=s.color==="w"?-1:1;if(s.type==="P"){this.inBounds(e+o,t)&&!n[e+o][t]&&(r.push({r:e+o,c:t}),!s.moved&&this.inBounds(e+o*2,t)&&!n[e+o*2][t]&&!n[e+o][t]&&r.push({r:e+o*2,c:t}));for(const c of[-1,1])if(this.inBounds(e+o,t+c)){const l=n[e+o][t+c];l&&l.color!==s.color&&r.push({r:e+o,c:t+c,capture:!0}),this.lastMove&&this.lastMove.piece.type==="P"&&Math.abs(this.lastMove.from.r-this.lastMove.to.r)===2&&this.lastMove.to.r===e&&this.lastMove.to.c===t+c&&r.push({r:e+o,c:t+c,capture:!0,enPassant:!0})}}const a={R:[[1,0],[-1,0],[0,1],[0,-1]],B:[[1,1],[1,-1],[-1,1],[-1,-1]],Q:[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]}[s.type];if(a)for(const[c,l]of a){let u=e+c,h=t+l;for(;this.inBounds(u,h);){const d=n[u][h];if(!d)r.push({r:u,c:h});else{d.color!==s.color&&r.push({r:u,c:h,capture:!0});break}u+=c,h+=l}}if(s.type==="N"){const c=[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];for(const[l,u]of c){const h=e+l,d=t+u;if(this.inBounds(h,d)){const f=n[h][d];(!f||f.color!==s.color)&&r.push({r:h,c:d,capture:!!f})}}}if(s.type==="K")for(let c=-1;c<=1;c++)for(let l=-1;l<=1;l++){if(!c&&!l)continue;const u=e+c,h=t+l;if(this.inBounds(u,h)){const d=n[u][h];(!d||d.color!==s.color)&&r.push({r:u,c:h,capture:!!d})}}return r}isSquareAttacked(e,t,n,s=this.board){for(let r=0;r<8;r++)for(let o=0;o<8;o++){const a=s[r][o];if(!(!a||a.color!==n)){if(a.type==="P"){if(e===r+(n==="w"?-1:1)&&(t===o-1||t===o+1))return!0;continue}if(a.type==="N"){const c=Math.abs(e-r),l=Math.abs(t-o);if(c===1&&l===2||c===2&&l===1)return!0;continue}if(a.type==="K"){if(Math.abs(e-r)<=1&&Math.abs(t-o)<=1)return!0;continue}if(a.type==="R"||a.type==="B"||a.type==="Q"){const c=e-r,l=t-o,u=Math.abs(c)===Math.abs(l)&&c!==0,h=c===0&&l!==0||l===0&&c!==0;if(u&&(a.type==="B"||a.type==="Q")){const d=c>0?1:-1,f=l>0?1:-1;let g=r+d,v=o+f,m=!1;for(;g!==e||v!==t;){if(s[g][v]){m=!0;break}g+=d,v+=f}if(!m)return!0}else if(h&&(a.type==="R"||a.type==="Q")){const d=c===0?0:c>0?1:-1,f=l===0?0:l>0?1:-1;let g=r+d,v=o+f,m=!1;for(;g!==e||v!==t;){if(s[g][v]){m=!0;break}g+=d,v+=f}if(!m)return!0}}}}return!1}isInCheck(e,t=this.board){let n=null;for(let r=0;r<8;r++){for(let o=0;o<8;o++){const a=t[r][o];if(a&&a.type==="K"&&a.color===e){n={r,c:o};break}}if(n)break}if(!n)return!1;const s=e==="w"?"b":"w";return this.isSquareAttacked(n.r,n.c,s,t)}getLegalMoves(e,t,n=this.board){const s=n[e][t];if(!s)return[];const r=this.getPseudoLegalMoves(e,t,n),o=[];s.type==="K"&&o.push(...this.getCastlingMoves(e,t,s.color,n));for(const a of r){const c=n.map(l=>[...l]);c[a.r][a.c]=c[e][t],c[e][t]=null,a.enPassant&&(c[e][a.c]=null),this.isInCheck(s.color,c)||o.push(a)}return o}getAllLegalMoves(e,t=this.board){const n=[];for(let s=0;s<8;s++)for(let r=0;r<8;r++){const o=t[s][r];if(o&&o.color===e){const a=this.getLegalMoves(s,r,t);for(const c of a)n.push({from:{r:s,c:r},to:c})}}return n}evaluateBoard(e,t){let n=0,s=0;for(let r=0;r<8;r++)for(let o=0;o<8;o++){const a=e[r][o];if(!a)continue;let c=Er[a.type]*10;c+=(3.5-Math.abs(3.5-r))*2,c+=(3.5-Math.abs(3.5-o))*2,a.type==="P"&&(c+=(a.color==="w"?6-r:r-1)*3),(a.type==="N"||a.type==="B")&&!a.moved&&(c-=8),a.color===t?n+=c:s+=c}return n-s}simulateMove(e,t){const n=e.map(o=>[...o]),s=n[t.from.r][t.from.c];if(!s)return n;let r={...s,moved:!0};if(r.type==="P"&&(t.to.r===0||t.to.r===7)&&(r={type:"Q",color:r.color,moved:!0}),n[t.to.r][t.to.c]=r,n[t.from.r][t.from.c]=null,t.to.enPassant&&(n[t.from.r][t.to.c]=null),t.to.castling==="kingside"){const o=n[t.to.r][7];n[t.to.r][5]=o?{...o,moved:!0}:null,n[t.to.r][7]=null}else if(t.to.castling==="queenside"){const o=n[t.to.r][0];n[t.to.r][3]=o?{...o,moved:!0}:null,n[t.to.r][0]=null}return n}minimaxAlphaBeta(e,t,n,s,r,o,a){if(t===0)return this.evaluateBoard(e,o);const c=r?o:a,l=this.getAllLegalMoves(c,e);if(l.length===0)return this.isInCheck(c,e)?r?-99999+(3-t):99999-(3-t):0;if(l.sort((u,h)=>{const d=e[u.to.r][u.to.c],f=e[h.to.r][h.to.c],g=d?Er[d.type]:0;return(f?Er[f.type]:0)-g}),r){let u=-1/0;for(const h of l){const d=this.simulateMove(e,h),f=this.minimaxAlphaBeta(d,t-1,n,s,!1,o,a);if(u=Math.max(u,f),n=Math.max(n,f),s<=n)break}return u}else{let u=1/0;for(const h of l){const d=this.simulateMove(e,h),f=this.minimaxAlphaBeta(d,t-1,n,s,!0,o,a);if(u=Math.min(u,f),s=Math.min(s,f),s<=n)break}return u}}chooseBestMove(e=this.turn,t=2){const n=e==="w"?"b":"w";if(t>=2&&(!this.history||this.history.length<=2)){const a=[],c=e==="w"?6:1,l=e==="w"?4:3,u=e==="w"?7:0,h=e==="w"?5:2;[2,3,4].forEach(f=>a.push({from:{r:c,c:f},to:{r:l,c:f}})),a.push({from:{r:u,c:1},to:{r:h,c:2}}),a.push({from:{r:u,c:6},to:{r:h,c:5}});const d=a.filter(f=>{const g=this.board[f.from.r][f.from.c];return!g||g.color!==e?!1:this.getLegalMoves(f.from.r,f.from.c).some(m=>m.r===f.to.r&&m.c===f.to.c)});if(d.length>0){const f=d[Math.floor(Math.random()*d.length)],g=this.getLegalMoves(f.from.r,f.from.c).find(v=>v.r===f.to.r&&v.c===f.to.c);return{from:f.from,to:g}}}const s=this.getAllLegalMoves(e,this.board);if(s.length===0)return null;if(t===1)return s.forEach(a=>{const c=this.board[a.to.r][a.to.c];a.score=(c?Er[c.type]*5:0)+Math.random()*25}),s.sort((a,c)=>c.score-a.score),s[0];if(t===2)return s.forEach(a=>{const c=this.simulateMove(this.board,a);let l=this.evaluateBoard(c,e);this.isInCheck(n,c)&&(l+=35),l+=Math.random()*4,a.score=l}),s.sort((a,c)=>c.score-a.score),s[0];let r=null,o=-1/0;for(const a of s){const c=this.simulateMove(this.board,a),u=this.minimaxAlphaBeta(c,2,-1/0,1/0,!1,e,n)+Math.random()*1.5;u>o&&(o=u,r=a)}return r||s[0]}getCastlingMoves(e,t,n,s=this.board){const r=[],o=s[e][t];if(!o||o.type!=="K"||o.moved||this.isInCheck(n,s))return r;const a=s[e][7];if(a&&a.type==="R"&&!a.moved&&!s[e][5]&&!s[e][6]){let l=!0;for(let u=5;u<=6;u++){const h=s.map(d=>[...d]);h[e][u]=o,h[e][t]=null,this.isInCheck(n,h)&&(l=!1)}l&&r.push({r:e,c:6,castling:"kingside"})}const c=s[e][0];if(c&&c.type==="R"&&!c.moved&&!s[e][1]&&!s[e][2]&&!s[e][3]){let l=!0;for(let u=2;u<=3;u++){const h=s.map(d=>[...d]);h[e][u]=o,h[e][t]=null,this.isInCheck(n,h)&&(l=!1)}l&&r.push({r:e,c:2,castling:"queenside"})}return r}saveState(){this.history||(this.history=[]),this.history.push({board:this.board.map(e=>e.map(t=>t?{...t}:null)),turn:this.turn,lastMove:this.lastMove?JSON.parse(JSON.stringify(this.lastMove)):null,halfmoveClock:this.halfmoveClock,positionHistory:[...this.positionHistory]})}undo(){if(!this.history||this.history.length===0)return!1;const e=this.history.pop();return this.board=e.board,this.turn=e.turn,this.lastMove=e.lastMove,this.halfmoveClock=e.halfmoveClock||0,this.positionHistory=e.positionHistory||[],!0}}const Xo=["cathedral","inferno","frost"],Ju={cathedral:{id:"cathedral",name:"Catedral Arcana",icon:"castle",themeColor:"#f5c56b",lore:"O santuário ancestral onde a sabedoria do Mármore e as sombras da Obsidiana colidem."},inferno:{id:"inferno",name:"Cripta Infernal",icon:"local_fire_department",themeColor:"#ff4d00",lore:"As profundezas de basalto e lava onde apenas os feitiços mais agressivos sobrevivem."},frost:{id:"frost",name:"Templo de Gelo",icon:"ac_unit",themeColor:"#00f5d4",lore:"O pico congelado onde a frieza do cálculo e a precisão do gelo decidem o destino."}},Gr={cathedral:[{level:1,difficulty:"Iniciante",title:"O Pastor Sagrado",objective:"Mate em 1 lance com a Rainha",lore:"A Rainha de Mármore avança sob a bênção do Bispo e mira o ponto fraco do monarca inimigo.",fen:"r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1",turn:"w",playerColor:"w",hint:"Ataque o peão desprotegido em f7 com sua Rainha com a cobertura do Bispo em c4.",solution:[{from:{r:3,c:7},to:{r:1,c:5}}]},{level:2,difficulty:"Fácil",title:"O Corredor de Pedra",objective:"Mate no fundo em 1 lance",lore:"As sentinelas de Obsidiana bloqueiam a fuga de seu monarca. A Torre de Mármore sela a passagem.",fen:"6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",turn:"w",playerColor:"w",hint:"Avance a Torre de d1 diretamente para d8 para aplicar o mate no corredor.",solution:[{from:{r:7,c:3},to:{r:0,c:3}}]},{level:3,difficulty:"Médio",title:"O Beijo da Catedral",objective:"Mate em 1 com Rainha e Cavalo",lore:"O Cavalo mantém o Rei sob a mira mística enquanto a Rainha desfere o golpe de misericórdia.",fen:"7k/6pp/7N/8/8/8/8/6QK w - - 0 1",turn:"w",playerColor:"w",hint:"Capture o peão em g7 com a Rainha. O Cavalo em h6 garante a proteção do lance.",solution:[{from:{r:7,c:6},to:{r:1,c:6}}]},{level:4,difficulty:"Mestre",title:"O Cerco dos Apóstolos",objective:"Elimine a defesa e aplique o Mate",lore:"A Torre inimiga tenta segurar a retaguarda, mas a Torre de Mármore aniquila a guardiã.",fen:"2r3k1/5ppp/8/8/8/8/5PPP/2R3K1 w - - 0 1",turn:"w",playerColor:"w",hint:"Capture a Torre em c8 diretamente com sua Torre de c1.",solution:[{from:{r:7,c:2},to:{r:0,c:2}}]}],inferno:[{level:1,difficulty:"Fácil",title:"A Sentinela de Enxofre",objective:"Mate lateral em 1 lance",lore:"O monarca de Obsidiana foi empurrado para a beira do precipício de fogo.",fen:"k7/ppp5/8/8/8/8/8/R3K3 w - - 0 1",turn:"w",playerColor:"w",hint:"Avance a Torre de a1 diretamente para a8.",solution:[{from:{r:7,c:0},to:{r:0,c:0}}]},{level:2,difficulty:"Médio",title:"A Invasão das Chamas",objective:"Mate em 1 com Torre e Rainha",lore:"A Rainha cerca as saídas superiores enquanto a Torre penetra pela fenda de magma.",fen:"6k1/pp3p1p/5Qp1/8/8/8/PPP2PPP/4R1K1 w - - 0 1",turn:"w",playerColor:"w",hint:"Mova a Torre de e1 direto para e8 no fundo da cripta.",solution:[{from:{r:7,c:4},to:{r:0,c:4}}]},{level:3,difficulty:"Avançado",title:"O Fogo Cruzado",objective:"Mate fulminante com a Rainha",lore:"A Rainha cruza o salão em chamas para atingir a retaguarda vulnerável.",fen:"6k1/5ppp/8/4Q3/8/8/5PPP/6K1 w - - 0 1",turn:"w",playerColor:"w",hint:"Leve a Rainha de e5 direto para a casa e8.",solution:[{from:{r:3,c:4},to:{r:0,c:4}}]},{level:4,difficulty:"Mestre",title:"O Selo Vulcânico",objective:"Cravação fatal do Bispo e Torre",lore:"O Bispo impede a fuga diagonal e a Torre de Mármore executa o golpe final.",fen:"r1b3kr/ppp3pp/8/8/1B6/8/PPP2PPP/4R1K1 w - - 0 1",turn:"w",playerColor:"w",hint:"A Torre em e1 deve avançar até e8. O Bispo em b4 impede a fuga do Rei.",solution:[{from:{r:7,c:4},to:{r:0,c:4}}]}],frost:[{level:1,difficulty:"Fácil",title:"A Flecha de Cristal",objective:"Mate na coluna aberta em 1 lance",lore:"A Torre desliza com velocidade sobre o lago congelado até a retaguarda adversária.",fen:"1k6/ppp5/8/8/8/8/8/1R2K3 w - - 0 1",turn:"w",playerColor:"w",hint:"Deslize a Torre de b1 até b8.",solution:[{from:{r:7,c:1},to:{r:0,c:1}}]},{level:2,difficulty:"Médio",title:"O Raio Polar",objective:"Mate diagonal com o Bispo",lore:"O Bispo dispara um feixe de luz gélida pela grande diagonal do templo.",fen:"k7/8/1K6/8/8/8/8/5B2 w - - 0 1",turn:"w",playerColor:"w",hint:"Posicione o Bispo em g2 para acertar o Rei na diagonal longa.",solution:[{from:{r:7,c:5},to:{r:6,c:6}}]},{level:3,difficulty:"Avançado",title:"A Ascensão da Rainha de Gelo",objective:"Promova o peão e finalize o duelo",lore:"O peão solitário atravessa a nevasca e atinge a linha final, despertando a Rainha Suprema.",fen:"kb6/pp5P/8/8/8/8/8/7B w - - 0 1",turn:"w",playerColor:"w",hint:"Avance o peão em h7 para h8 e escolha a Rainha para o xeque-mate.",solution:[{from:{r:1,c:7},to:{r:0,c:7}}]},{level:4,difficulty:"Grão-Mestre",title:"O Julgamento do Zero Absoluto",objective:"Mate de cooperação entre Torre e Rei",lore:"Com as peças de Obsidiana congeladas na muralha, a Torre desfere o xeque-mate inescapável.",fen:"3rkr2/R7/4K3/8/8/8/8/8 w - - 0 1",turn:"w",playerColor:"w",hint:"Deslize a Torre de a7 para e7, protegida pelo Rei em e6.",solution:[{from:{r:1,c:0},to:{r:1,c:4}}]}]},Ee=new y_,ge=new M_;let $n=!1,es=null,dn=!1,it=!0,Mi=2,Qn=!1,ts=!1,gn=null,_n=[],ns=0,et=!1,$e="w",at=null,wt=!1,Kt="cathedral",Ht=0,Vs=localStorage.getItem("wizard_arena")||"cathedral";const Cr=[];let Si=300,Cn=300,Pn=300,bs=null,fi=0,Pr=null,qo=null;const Sl=document.getElementById("canvas-container"),El=document.getElementById("turn-banner"),tt=new R0;tt.background=new Je(723470);tt.fog=new va(723470,.022);const Dt=new Gt(42,window.innerWidth/window.innerHeight,.1,150),Jt=new Gu({antialias:!0,powerPreference:"high-performance"});Jt.setSize(window.innerWidth,window.innerHeight);Jt.setPixelRatio(Math.min(window.devicePixelRatio,1.25));Jt.shadowMap.enabled=!0;Jt.shadowMap.type=uu;Sl&&Sl.appendChild(Jt.domElement);const rt=new x_(Dt,Jt.domElement);rt.enableDamping=!0;rt.dampingFactor=.06;rt.maxPolarAngle=Math.PI/2-.05;rt.minDistance=6;rt.maxDistance=28;rt.target.set(0,.5,0);rt.autoRotateSpeed=.8;rt.enabled=!1;const Ln=[];let Yo=null;const ha=[{pos:new C(0,11.5,13.5),target:new C(0,.4,0)},{pos:new C(0,11.5,-13.5),target:new C(0,.4,0)},{pos:new C(0,18.5,.01),target:new C(0,0,0)},{pos:new C(12.5,7.5,11.5),target:new C(0,.6,0)}];function ei(i,e=!1){if(ts&&!e)return;const t=ha[i%ha.length],n=window.innerWidth/window.innerHeight;let s=42,r=1;n<1?(s=52,r=1.32):n>1&&window.innerHeight<600&&(s=48,r=1.15);const o=t.pos.clone().multiplyScalar(r),a=t.target.clone();if(e){Dt.fov=s,Dt.position.copy(o),rt.target.copy(a),Dt.updateProjectionMatrix(),rt.update();return}ts=!0;const c=Dt.position.clone(),l=rt.target.clone(),u=Dt.fov;Ln.push({elapsed:0,duration:.85,update(h){this.elapsed+=h;const d=Math.min(this.elapsed/this.duration,1),f=d<.5?4*d*d*d:1-Math.pow(-2*d+2,3)/2;return Dt.position.lerpVectors(c,o,f),rt.target.lerpVectors(l,a,f),Dt.fov=u+(s-u)*f,Dt.updateProjectionMatrix(),rt.update(),d>=1?(ts=!1,!0):!1}})}ei(0,!0);function Zu(i,e){const t=document.createElement("canvas");t.width=512,t.height=512;const n=t.getContext("2d");n.fillStyle=i,n.fillRect(0,0,512,512);const s=n.getImageData(0,0,512,512),r=s.data;for(let a=0;a<r.length;a+=4){const c=(Math.random()-.5)*16;r[a]=Math.min(255,Math.max(0,r[a]+c)),r[a+1]=Math.min(255,Math.max(0,r[a+1]+c)),r[a+2]=Math.min(255,Math.max(0,r[a+2]+c))}n.putImageData(s,0,0),n.strokeStyle=e,n.lineWidth=2.5;for(let a=0;a<28;a++){n.beginPath();let c=Math.random()*512,l=Math.random()*512;n.moveTo(c,l);for(let u=0;u<7;u++)c+=(Math.random()-.5)*75,l+=(Math.random()-.5)*75,n.lineTo(c,l);n.stroke()}const o=new xa(t);return o.wrapS=o.wrapT=Ds,o}function S_(){const i=document.createElement("canvas");i.width=512,i.height=512;const e=i.getContext("2d");e.fillStyle="#808080",e.fillRect(0,0,512,512);const t=e.getImageData(0,0,512,512),n=t.data;for(let r=0;r<n.length;r+=4){const o=Math.min(255,Math.max(0,128+(Math.random()-.5)*45));n[r]=o,n[r+1]=o,n[r+2]=o}e.putImageData(t,0,0),e.strokeStyle="#252525",e.lineWidth=3;for(let r=0;r<32;r++){e.beginPath();let o=Math.random()*512,a=Math.random()*512;e.moveTo(o,a);for(let c=0;c<7;c++)o+=(Math.random()-.5)*80,a+=(Math.random()-.5)*80,e.lineTo(o,a);e.stroke()}const s=new xa(i);return s.wrapS=s.wrapT=Ds,s}const br=S_(),E_=Zu("#f3efe6","#c5b8a5"),b_=Zu("#16131d","#3b2d54"),At={marble:new li({map:E_,bumpMap:br,bumpScale:.035,roughness:.28,metalness:.1}),obsidian:new li({map:b_,bumpMap:br,bumpScale:.045,roughness:.22,metalness:.45}),runeWhite:new li({color:16106859,emissive:16106859,emissiveIntensity:1.6}),runeBlack:new li({color:11895807,emissive:10179040,emissiveIntensity:1.9}),stoneDark:new li({color:1709857,bumpMap:br,bumpScale:.04,roughness:.85}),stoneLight:new li({color:14209737,bumpMap:br,bumpScale:.03,roughness:.4}),magicBeam:new Bt({color:62932,transparent:!0,opacity:.85,side:Tt})};At.runeWhite.userData={isGlobal:!0};At.runeBlack.userData={isGlobal:!0};At.magicBeam.userData={isGlobal:!0};const An=new m_(10390718,.65);tt.add(An);const Dn=new u_(16773846,95);Dn.position.set(6,18,8);Dn.angle=Math.PI/4;Dn.penumbra=.6;Dn.castShadow=!0;Dn.shadow.mapSize.set(1024,1024);Dn.shadow.radius=1.5;tt.add(Dn);const Ta=new p_(9067765,1.4);Ta.position.set(-10,8,-10);tt.add(Ta);const wa=[];function T_(){const i=new ln,e=new ve(new xt(28,28,.5,32),new li({color:920594,roughness:.9}));e.position.y=-1.2,e.receiveShadow=!0,i.add(e);const t=new ve(new xt(7.2,8.2,1.2,8),At.stoneDark);t.position.y=-.62,t.receiveShadow=!0,i.add(t);const n=new xt(.65,.8,18,12),s=new Ti(1.6,8.5),r=new Bt({color:7094968,side:Tt,transparent:!0,opacity:.45});for(let a=0;a<12;a++){const c=a/12*Math.PI*2,l=17.5,u=Math.cos(c)*l,h=Math.sin(c)*l,d=new ve(n,At.stoneDark);d.position.set(u,7.5,h),d.castShadow=!0,i.add(d);const f=c+Math.PI/12,g=new ve(s,r);g.position.set(Math.cos(f)*(l+.5),6.5,Math.sin(f)*(l+.5)),g.lookAt(0,6.5,0),i.add(g)}[[6.2,6.2],[-6.2,6.2],[6.2,-6.2],[-6.2,-6.2]].forEach(([a,c])=>{const l=new ve(new xt(.45,.3,1.4,8),At.stoneDark);l.position.set(a,.4,c),i.add(l);const u=new ve(new Sa(.32),new Bt({color:16755251}));u.position.set(a,1.25,c),i.add(u);const h=new d_(16746530,6,12);h.position.set(a,1.6,c),i.add(h),wa.push({light:h,orb:u,baseIntensity:6,phase:Math.random()*10})}),tt.add(i)}T_();const $u=180,Qu=new Ut,Lr=new Float32Array($u*3);for(let i=0;i<$u*3;i+=3)Lr[i]=(Math.random()-.5)*22,Lr[i+1]=Math.random()*10,Lr[i+2]=(Math.random()-.5)*22;Qu.setAttribute("position",new un(Lr,3));const Aa=new C0(Qu,new Hu({color:16106859,size:.08,transparent:!0,opacity:.55}));tt.add(Aa);const ui=new ln;tt.add(ui);const Ra=[],is=new ln;tt.add(is);function hn(i,e){return new C((e-3.5)*1.15,.1,(i-3.5)*1.15)}function bl(i){const e=document.createElement("canvas");e.width=128,e.height=128;const t=e.getContext("2d");return t.clearRect(0,0,128,128),t.font='bold 72px "Cinzel", "Cinzel Decorative", serif',t.textAlign="center",t.textBaseline="middle",t.fillStyle="#f5c56b",t.shadowColor="#f5c56b",t.shadowBlur=10,t.fillText(i,64,64),new xa(e)}function w_(){const i=new ve(new jt(9.8,.22,9.8),At.stoneDark);i.position.y=-.05,i.receiveShadow=!0,ui.add(i);const e=new jt(1.12,.14,1.12);for(let s=0;s<8;s++)for(let r=0;r<8;r++){const o=(s+r)%2===0,a=o?At.stoneLight.clone():At.stoneDark.clone();s<4?a.color.lerp(new Je(1707822),o?.15:.35):a.color.lerp(new Je(7035957),o?.2:.4);const c=new ve(e,a),l=hn(s,r);c.position.set(l.x,.02,l.z),c.receiveShadow=!0,c.userData={isSquare:!0,r:s,c:r},ui.add(c),Ra.push(c)}const t=["A","B","C","D","E","F","G","H"],n=new Ti(.48,.48);n.rotateX(-Math.PI/2),t.forEach((s,r)=>{const o=(r-3.5)*1.15,a=bl(s),c=new Bt({map:a,transparent:!0,opacity:.85,depthWrite:!1}),l=new ve(n,c);l.position.set(o,.07,4.45),ui.add(l);const u=new ve(n,c);u.position.set(o,.07,-4.45),u.rotation.y=Math.PI,ui.add(u)});for(let s=0;s<8;s++){const r=`${8-s}`,o=(s-3.5)*1.15,a=bl(r),c=new Bt({map:a,transparent:!0,opacity:.85,depthWrite:!1}),l=new ve(n,c);l.position.set(-4.45,.07,o),ui.add(l);const u=new ve(n,c);u.position.set(4.45,.07,o),u.rotation.y=Math.PI,ui.add(u)}}w_();const Tl={cathedral:{bg:723470,fog:723470,fogDensity:.022,ambient:10390718,ambientIntensity:.65,spot:16773846,spotIntensity:95,rim:9067765,flameOrb:16755251,flameLight:16746530,dustColor:16106859},inferno:{bg:1312005,fog:1312005,fogDensity:.024,ambient:9445906,ambientIntensity:.72,spot:16737826,spotIntensity:110,rim:16720384,flameOrb:16720384,flameLight:16729088,dustColor:16731392},frost:{bg:331288,fog:397855,fogDensity:.02,ambient:5944040,ambientIntensity:.68,spot:14218751,spotIntensity:92,rim:62932,flameOrb:62932,flameLight:46296,dustColor:10217727}};function to(i){const e=Tl[i]||Tl.cathedral;Vs=i;try{localStorage.setItem("wizard_arena",i)}catch{}tt.background.setHex(e.bg),tt.fog.color.setHex(e.fog),tt.fog.density=e.fogDensity,An.color.setHex(e.ambient),An.intensity=e.ambientIntensity,Dn.color.setHex(e.spot),Dn.intensity=e.spotIntensity,Ta.color.setHex(e.rim),wa.forEach(o=>{o.orb.material.color.setHex(e.flameOrb),o.light.color.setHex(e.flameLight)}),Aa.material.color.setHex(e.dustColor),document.querySelectorAll("#menu-arena-group .toggle-btn, #pause-arena-group .toggle-btn").forEach(o=>{o.classList.toggle("active",o.dataset.arena===i)});const t=document.getElementById("btn-start-game"),n=document.querySelector("#start-menu .brand-pill span:last-child"),s={cathedral:{btn:"Entrar na Catedral",pill:"CATEDRAL ARCANA"},inferno:{btn:"Entrar na Cripta Infernal",pill:"CRIPTA INFERNAL"},frost:{btn:"Entrar no Templo de Gelo",pill:"TEMPLO DE GELO"}},r=s[i]||s.cathedral;t&&(t.textContent=r.btn),n&&(n.textContent=r.pill),et&&at&&window.dbUpdate&&window.db&&window.dbUpdate(window.dbRef(window.db,`rooms/${at}`),{arena:i})}to(Vs);const Ft=new ln;tt.add(Ft);function A_(i,e,t,n){for(;Ft.children.length>0;)Ft.remove(Ft.children[0]);const s=new Bt({color:16106859,transparent:!0,opacity:.18,side:Tt}),r=new Ti(1.1,1.1);r.rotateX(-Math.PI/2);const o=new ve(r,s),a=hn(i,e);o.position.set(a.x,.1,a.z),Ft.add(o);const c=new ve(r,s),l=hn(t,n);c.position.set(l.x,.1,l.z),Ft.add(c)}const eh=new Hs(.35,.52,32);eh.rotateX(-Math.PI/2);const R_=new Bt({color:16711731,side:Tt,transparent:!0,opacity:.85}),ss=new ve(eh,R_);ss.position.y=.12;ss.visible=!1;tt.add(ss);const ut=Array.from({length:8},()=>Array(8).fill(null));function th(i,e){const t=new ln,n=e==="w"?At.marble:At.obsidian,s=e==="w"?At.runeWhite:At.runeBlack,r=new ln;t.add(r);const o=(c,l,u=.015,h=32)=>{const d=new ve(new pn(l,u,4,h),s);d.rotation.x=Math.PI/2,d.position.y=c,r.add(d)},a=()=>{const c=new ve(new xt(.22,.35,.25,32),n);c.position.y=.125,r.add(c),o(.05,.33)};if(i==="P"){a();const c=new ve(new xt(.1,.2,.4,32),n);c.position.y=.45;const l=new ve(new pn(.12,.03,16,32),n);l.rotation.x=Math.PI/2,l.position.y=.65;const u=new ve(new ji(.16,32,16),n);u.position.y=.82,r.add(c,l,u),o(.65,.14)}else if(i==="R"){a();const c=new ve(new xt(.18,.22,.5,32),n);c.position.y=.5;const l=new ve(new pn(.2,.03,16,32),n);l.rotation.x=Math.PI/2,l.position.y=.75;const u=new ve(new xt(.22,.18,.2,32),n);u.position.y=.85;const h=new ve(new xt(.15,.15,.05,32),s);h.position.y=.95,r.add(c,l,u,h),o(.75,.22)}else if(i==="N"){const c=new ve(new xt(.35,.36,.05,32),n);c.position.y=.025,r.add(c);const l=new ve(new xt(.22,.34,.22,32),n);l.position.y=.14,r.add(l);const u=new ve(new pn(.33,.016,8,32),s);u.rotation.x=Math.PI/2,u.position.y=.055,r.add(u);const h=new ve(new pn(.222,.016,8,32),s);h.rotation.x=Math.PI/2,h.position.y=.25,r.add(h);const d=new ln;d.position.y=.25;const f=new qi;f.moveTo(-.18,0),f.lineTo(-.25,.3),f.lineTo(-.18,.58),f.lineTo(-.04,.76),f.lineTo(.04,.76),f.lineTo(.18,.64),f.lineTo(.25,.55),f.lineTo(.26,.46),f.lineTo(.22,.42),f.lineTo(.06,.42),f.lineTo(.09,.3),f.lineTo(.14,.15),f.lineTo(.18,0),f.closePath();const g={depth:.18,bevelEnabled:!0,bevelThickness:.025,bevelSize:.02,bevelSegments:3},v=new Is(f,g);v.translate(0,0,-.09);const m=new ve(v,n);d.add(m);const p=new qi;p.moveTo(-.04,0),p.lineTo(.03,0),p.lineTo(-.01,.17),p.closePath();const y=new Is(p,{depth:.08,bevelEnabled:!0,bevelThickness:.015,bevelSize:.01,bevelSegments:2});y.translate(0,.75,-.04);const _=new ve(y,n);d.add(_);const S=new qi;S.moveTo(-.025,0),S.lineTo(.018,0),S.lineTo(-.01,.13),S.closePath();const L=new Is(S,{depth:.02,bevelEnabled:!1});L.translate(0,.76,.035);const R=new ve(L,s);d.add(R);const w=new qi;w.moveTo(-.035,0),w.lineTo(.01,.025),w.lineTo(.035,0),w.lineTo(0,-.02),w.closePath();const N=new Ea(w),M=new ve(N,s);M.position.set(.11,.6,.106),M.rotation.z=-.25,d.add(M);const b=new ve(N,s);b.position.set(.11,.6,-.106),b.rotation.y=Math.PI,b.rotation.z=.25,d.add(b);const O=new ve(new jt(.28,.024,.225),s);O.position.set(.02,.18,0),d.add(O);const V=new ve(new jt(.24,.024,.225),s);V.position.set(.01,.34,0),d.add(V);for(let J=0;J<5;J++){const D=J/4,B=-.22+D*.16,G=.33+D*.38,j=new ve(new jt(.13,.024,.225),s);j.position.set(B,G,0),j.rotation.z=-.7,d.add(j)}d.rotation.y=-Math.PI/2,r.add(d)}else if(i==="B"){a();const c=new ve(new xt(.1,.2,.6,32),n);c.position.y=.55;const l=new ve(new pn(.14,.03,16,32),n);l.rotation.x=Math.PI/2,l.position.y=.85;const u=new ve(new ji(.14,32,16),n);u.scale.set(1,1.5,1),u.position.y=1.05;const h=new ve(new jt(.02,.15,.15),s);h.position.set(0,1.1,.1),h.rotation.x=Math.PI/4;const d=new ve(new ji(.04,16,16),s);d.position.y=1.3,r.add(c,l,u,h,d),o(.85,.16)}else if(i==="Q"){a();const c=new ve(new xt(.12,.2,.8,32),n);c.position.y=.65;const l=new ve(new pn(.18,.03,16,32),n);l.rotation.x=Math.PI/2,l.position.y=1.05;const u=new ve(new xt(.24,.12,.25,32),n);u.position.y=1.2;const h=new ve(new ji(.08,16,16),s);h.position.y=1.35,r.add(c,l,u,h),o(1.05,.2),o(1.32,.22)}else if(i==="K"){a();const c=new ve(new xt(.14,.22,.9,32),n);c.position.y=.7;const l=new ve(new pn(.2,.03,16,32),n);l.rotation.x=Math.PI/2,l.position.y=1.15;const u=new ve(new xt(.2,.14,.2,32),n);u.position.y=1.25;const h=new ve(new jt(.04,.2,.04),s);h.position.y=1.45;const d=new ve(new jt(.15,.04,.04),s);d.position.y=1.45,r.add(c,l,u,h,d),o(1.15,.22)}return t.traverse(c=>{c.isMesh&&(c.castShadow=!0)}),t.userData={type:i,color:e,body:r,basePosY:.1,phase:Math.random()*Math.PI*2},e==="b"&&(t.rotation.y=Math.PI),t}function Ws(){for(let i=0;i<8;i++)for(let e=0;e<8;e++)ut[i]&&ut[i][e]&&(tt.remove(ut[i][e]),ut[i][e]=null);for(let i=0;i<8;i++)for(let e=0;e<8;e++){const t=ge.board[i][e];if(t){const n=th(t.type,t.color),s=hn(i,e);n.position.copy(s),n.userData.r=i,n.userData.c=e,n.userData.basePosY=s.y,t.type==="N"&&(n.rotation.y+=e<=3?.24:-.24),tt.add(n),ut[i][e]=n}}}function wl(i){i.classList.remove("capture-pulse"),i.offsetWidth,i.classList.add("capture-pulse")}function C_(){const i=document.getElementById("grave-w"),e=document.getElementById("grave-b");if(!i||!e)return;const t={P:8,N:2,B:2,R:2,Q:1},n={w:{P:0,N:0,B:0,R:0,Q:0},b:{P:0,N:0,B:0,R:0,Q:0}};for(let c=0;c<8;c++)for(let l=0;l<8;l++){const u=ge.board[c][l];u&&u.type!=="K"&&n[u.color][u.type]++}const s={P:"♟",N:"♞",B:"♝",R:"♜",Q:"♛"},r=["P","N","B","R","Q"];let o="",a="";r.forEach(c=>{for(let l=0;l<t[c]-n.w[c];l++)o+=s[c];for(let l=0;l<t[c]-n.b[c];l++)a+=s[c]}),i.textContent.length<o.length&&wl(i),e.textContent.length<a.length&&wl(e),i.textContent=o,e.textContent=a}function no(){if(El){const t=ge.turn==="w";El.textContent=t?"Turno: Mármore (Brancas)":"Turno: Obsidiana (Pretas)"}const i=ge.isInCheck(ge.turn),e=document.getElementById("check-warning");e&&(i?(e.classList.remove("hidden"),qo!==ge.turn&&(qo=ge.turn,Ee.playCheck())):(e.classList.add("hidden"),qo=null)),ss.visible=!1;for(const t of["w","b"])if(ge.isInCheck(t))for(let n=0;n<8;n++)for(let s=0;s<8;s++){const r=ge.board[n][s];if(r&&r.type==="K"&&r.color===t){const o=hn(n,s);ss.position.set(o.x,.12,o.z),ss.visible=!0;break}}C_(),Xs(),P_()}function P_(){const i=document.getElementById("eval-bar-container"),e=document.getElementById("eval-bar-fill-w"),t=document.getElementById("eval-score-badge");if(!i||!e||!t)return;if(wt){i.style.display="none";return}i.style.display="flex";const n=ge.getEvaluationScore?ge.getEvaluationScore():0,r=50+Math.max(-10,Math.min(10,n))/10*45;e.style.height=`${r}%`,n>0?(t.textContent=`+${n}`,t.style.color="#f5c56b"):n<0?(t.textContent=`${n}`,t.style.color="#b583ff"):(t.textContent="0.0",t.style.color="#d0bcff")}function Al(i){if(i<=0)return"00:00";const e=Math.floor(i),t=Math.floor(e/60).toString().padStart(2,"0"),n=(e%60).toString().padStart(2,"0");return`${t}:${n}`}function Xs(){const i=document.getElementById("timer-w"),e=document.getElementById("timer-b");if(Si<=0){i&&(i.style.display="none"),e&&(e.style.display="none");return}i&&(i.style.display="flex",i.querySelector(".timer-digits").textContent=Al(Cn),i.classList.toggle("active",ge.turn==="w"),i.classList.toggle("timer-critical",Cn>0&&Cn<=30)),e&&(e.style.display="flex",e.querySelector(".timer-digits").textContent=Al(Pn),e.classList.toggle("active",ge.turn==="b"),e.classList.toggle("timer-critical",Pn>0&&Pn<=30))}let As=Date.now();function io(){bs&&clearInterval(bs),!(Si<=0)&&(As=Date.now(),bs=setInterval(()=>{if(dn){As=Date.now();return}const i=document.getElementById("game-over-modal");if(i&&!i.classList.contains("hidden"))return;const e=Date.now(),t=(e-As)/1e3;As=e,t>0&&(ge.turn==="w"?(Cn=Math.max(0,Cn-t),Cn<=0&&(Cn=0,clearInterval(bs),Rl("w"))):(Pn=Math.max(0,Pn-t),Pn<=0&&(Pn=0,clearInterval(bs),Rl("b"))),Xs())},250))}document.addEventListener("visibilitychange",()=>{As=Date.now(),Xs()});function Rl(i){const e=document.getElementById("game-over-modal"),t=document.getElementById("game-over-title"),n=document.getElementById("game-over-msg");e&&t&&n&&(e.classList.remove("hidden"),t.textContent="Tempo Esgotado!",n.textContent=i==="w"?"O Mármore perdeu pelo relógio. A Obsidiana venceu!":"A Obsidiana perdeu pelo relógio. O Mármore venceu!"),Hn(i===$e?"loss":"win"),zs(i==="w"?"Obsidiana":"Mármore"),Ee.playVictory(),ih()}let Xn={wins:0,losses:0,draws:0};function L_(){try{const i=localStorage.getItem("wizard_chess_stats");i&&(Xn=JSON.parse(i))}catch{}nh()}function zs(i){if(wt||et&&$e!=="w")return;let e="Mármore",t="Obsidiana";it?(e=$e==="w"?"Jogador (Mármore)":`IA Nível ${Mi} (Mármore)`,t=$e==="b"?"Jogador (Obsidiana)":`IA Nível ${Mi} (Obsidiana)`):et&&(e="Mármore (Online)",t="Obsidiana (Online)"),yh(e,t,i).catch(n=>{console.error("Erro ao enviar partida para o Neon:",n)})}function nh(){const i=document.getElementById("stat-wins"),e=document.getElementById("stat-losses"),t=document.getElementById("stat-draws");i&&(i.textContent=Xn.wins),e&&(e.textContent=Xn.losses),t&&(t.textContent=Xn.draws)}function Hn(i){i==="win"?Xn.wins++:i==="loss"?Xn.losses++:i==="draw"&&Xn.draws++;try{localStorage.setItem("wizard_chess_stats",JSON.stringify(Xn))}catch{}nh()}L_();function I_(){const i=document.getElementById("ad-game-over-fallback");try{(window.adsbygoogle=window.adsbygoogle||[]).push({}),setTimeout(()=>{const e=document.querySelector("#ad-game-over-card ins.adsbygoogle");i&&(!e||e.clientHeight===0||e.getAttribute("data-ad-status")==="unfilled")&&(i.style.display="flex")},1200)}catch{i&&(i.style.display="flex")}}function Ki(i,e){const t=document.getElementById("game-over-modal"),n=document.getElementById("game-over-title"),s=document.getElementById("game-over-msg");t&&n&&s&&(t.classList.remove("hidden"),n.textContent=i,s.textContent=e,I_())}function D_(){if(ge.isInsufficientMaterial())return Ki("Empate!","Apenas os Reis sobreviveram (Material Insuficiente)."),Hn("draw"),!0;if(ge.isFiftyMoveRule&&ge.isFiftyMoveRule())return Ki("Empate!","Regra dos 50 lances sem capturas nem avanço de peões."),Hn("draw"),!0;if(ge.isThreefoldRepetition&&ge.isThreefoldRepetition())return Ki("Empate!","A mesma posição do tabuleiro repetiu 3 vezes."),Hn("draw"),!0;let i=!1;for(let e=0;e<8;e++){for(let t=0;t<8;t++){const n=ge.board[e][t];if(n&&n.color===ge.turn&&ge.getLegalMoves(e,t).length>0){i=!0;break}}if(i)break}if(!i){const e=ge.isInCheck(ge.turn),t=e?"Xeque-Mate!":"Empate!",n=e?ge.turn==="w"?"A Obsidiana venceu!":"O Mármore venceu!":"O Rei está afogado.";return Ki(t,n),e?(Hn(ge.turn===$e?"loss":"win"),zs(ge.turn==="w"?"Obsidiana":"Mármore"),Ee.playVictory(),ih(ge.turn==="w"?"b":"w")):(Hn("draw"),zs("Empate")),!0}return!1}function Tr(i,e,t,n,s,r){n.type=i,tt.remove(s);const o=th(i,n.color);o.position.copy(r),tt.add(o),ut[e][t]=o}function U_(i){const e=document.getElementById("promotion-modal");if(!e){i("Q");return}e.classList.remove("hidden");const t=n=>{const s=n.target.closest(".promo-btn");if(!s)return;const r=s.getAttribute("data-type");r&&(e.classList.add("hidden"),document.querySelectorAll("#promotion-modal .promo-btn").forEach(o=>o.removeEventListener("click",t)),i(r))};document.querySelectorAll("#promotion-modal .promo-btn").forEach(n=>n.addEventListener("click",t))}const rs=[];function Hr(i){var e;i&&(tt.remove(i),i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material.forEach(t=>{var n;(n=t.userData)!=null&&n.isGlobal||t.dispose()}):(e=i.material.userData)!=null&&e.isGlobal||i.material.dispose()))}function N_(i,e){Ee.playShatter();const n=e==="w"?At.runeWhite:At.runeBlack;for(let s=0;s<40;s++){const r=new ve(new ps(.03+Math.random()*.05,0),n);r.position.copy(i),r.position.y+=.15+Math.random()*1.2,r.position.x+=(Math.random()-.5)*.4,r.position.z+=(Math.random()-.5)*.4,tt.add(r);const o=Math.random()*Math.PI*2,a=.5+Math.random()*1.5;rs.push({mesh:r,life:1.5,maxLife:1.5,vel:new C(Math.cos(o)*a,.5+Math.random()*1.5,Math.sin(o)*a),rot:new C(Math.random()*10,Math.random()*10,Math.random()*10)})}}function Gn(i,e=62932,t=1.8){const n=new Hs(.12,.28,32);n.rotateX(-Math.PI/2);const s=new Bt({color:e,side:Tt,transparent:!0,opacity:.9}),r=new ve(n,s);r.position.copy(i),r.position.y=.12,tt.add(r),Ln.push({elapsed:0,duration:.55,update(o){this.elapsed+=o;const a=Math.min(this.elapsed/this.duration,1),c=1+a*t;return r.scale.set(c,c,c),r.material.opacity=Math.max(0,.9*(1-a)),a>=1?(Hr(r),!0):!1}})}function O_(i){const e=new xt(.35,.35,20,16,1,!0),t=new Bt({color:16774048,transparent:!0,opacity:.75,side:Tt}),n=new ve(e,t);n.position.set(i.x,10,i.z),tt.add(n),Ln.push({elapsed:0,duration:.6,update(s){this.elapsed+=s;const r=Math.min(this.elapsed/this.duration,1);return n.scale.set(1+r*.8,1,1+r*.8),n.material.opacity=Math.max(0,.75*(1-r)),r>=1?(Hr(n),!0):!1}})}function F_(i){Ee.playVortex(),Gn(i,11895807,2.4);for(let e=0;e<28;e++){const t=new ve(new ps(.04+Math.random()*.04,0),At.runeBlack);t.position.copy(i),tt.add(t);const n=Math.random()*Math.PI*2,s=1.2+Math.random()*2.2;rs.push({mesh:t,life:1.2,maxLife:1.2,vel:new C(Math.cos(n)*s,1.2+Math.random()*2,Math.sin(n)*s),rot:new C(Math.random()*10,Math.random()*10,Math.random()*10)})}}function B_(i){Ee.playRoyalSmite(),Gn(i,16106859,2);for(let e=0;e<25;e++){const t=new ve(new ps(.05,0),At.runeWhite);t.position.copy(i),tt.add(t);const n=Math.random()*Math.PI*2,s=1.5+Math.random()*2;rs.push({mesh:t,life:1.4,maxLife:1.4,vel:new C(Math.cos(n)*s,2+Math.random()*1.5,Math.sin(n)*s),rot:new C(Math.random()*8,Math.random()*8,Math.random()*8)})}}function ih(i){rt.autoRotate=!0,rt.autoRotateSpeed=2;const e=[16106859,62932,13679871,16766720,16777215];for(let t=0;t<90;t++){const n=e[Math.floor(Math.random()*e.length)],s=new Bt({color:n}),r=new ps(.08+Math.random()*.05,0),o=new ve(r,s);o.position.set((Math.random()-.5)*4,.4,(Math.random()-.5)*4),tt.add(o);const a=Math.random()*Math.PI*2,c=2+Math.random()*3.5;Cr.push({mesh:o,life:2.5+Math.random()*1,maxLife:3.5,vel:new C(Math.cos(a)*c,5+Math.random()*4.5,Math.sin(a)*c),rot:new C(Math.random()*10,Math.random()*10,Math.random()*10)})}Ee.playVictory()}function z_(i,e){Ee.playBeam();const t=i.distanceTo(e),n=new xt(.04,.04,t,12);n.translate(0,t/2,0),n.rotateX(Math.PI/2);const s=new ve(n,At.magicBeam);s.position.copy(i),s.lookAt(e),tt.add(s),Ln.push({elapsed:0,duration:.4,update(r){this.elapsed+=r;const o=this.elapsed/this.duration;return s.scale.set(1+o*2,1+o*2,1),s.material.opacity=Math.max(0,1-o),o>=1?(tt.remove(s),!0):!1}})}function Ca(i,e,t){typeof ge.saveState=="function"&&ge.saveState(),Qn=!0,Ei();const n=ut[i.r][i.c],s=ge.board[i.r][i.c],r=!!e.enPassant;let o=ut[e.r][e.c];r&&(o=ut[i.r][e.c]);const a=n.position.clone(),c=hn(e.r,e.c),l=s.type==="N",u=s.type==="B",h=s.type==="R",d=s.type==="Q",f=!!o,g=!!e.castling;if(Ee.playSlide(),f&&(l?(Ee.playThunderStomp(),fi=.45):u?(z_(a.clone().add(new C(0,.9,0)),c.clone().add(new C(0,.5,0))),O_(c)):h?(Ee.playTremor(),fi=.55):d?F_(c):s.type==="K"?B_(c):s.type==="P"&&Ee.playPawnThrust()),g){const p=e.castling==="kingside"?7:0,y=e.castling==="kingside"?5:3,_=ut[i.r][p],S=_.position.clone(),L=hn(e.r,y);Ln.push({elapsed:0,duration:.48,update(R){this.elapsed+=R;let w=Math.min(this.elapsed/this.duration,1);const N=w<.5?2*w*w:1-Math.pow(-2*w+2,2)/2;return _.position.lerpVectors(S,L,N),w>=1?(_.position.copy(L),!0):!1}})}const v=f?.85:.48;let m=!1;Ln.push({elapsed:0,duration:v,update(p){this.elapsed+=p;let y=Math.min(this.elapsed/this.duration,1);if(f){let _;if(y<.3){const S=y/.3;_=-.15*Math.sin(S*Math.PI/2),n.userData.body&&(n.userData.body.rotation.x=-.4*Math.sin(S*Math.PI/2))}else if(y<.5){const S=(y-.3)/.2;_=S,n.userData.body&&(n.userData.body.rotation.x=-.4+.9*S)}else{_=1;const S=(y-.5)/.5;n.userData.body&&(n.userData.body.rotation.x=.5*Math.exp(-S*6)*Math.cos(S*25))}if(_>=0?n.position.lerpVectors(a,c,_):n.position.copy(a).add(c.clone().sub(a).normalize().multiplyScalar(_)),l&&(n.position.y=.1+Math.sin(Math.max(0,_)*Math.PI)*1.45),y>=.5&&!m){m=!0;const S=r?hn(i.r,e.c):c;N_(S,o.userData.color),l?Gn(S,62932,1.8):h?Gn(S,16106859,2.2):u?Gn(S,16771968,1.6):d?Gn(S,11895807,2.2):s.type==="K"?Gn(S,16766720,1.9):s.type==="P"&&Gn(S,13679871,1.3),tt.remove(o)}}else{const _=y<.5?2*y*y:1-Math.pow(-2*y+2,2)/2;n.position.lerpVectors(a,c,_),l&&(n.position.y=.1+Math.sin(y*Math.PI)*1.45)}if(y>=1){n.position.copy(c),n.userData.body&&(n.userData.body.rotation.x=0),ge.board[e.r][e.c]=s,ge.board[i.r][i.c]=null,s.moved=!0,r&&(ge.board[i.r][e.c]=null),ge.recordMoveRuleState&&ge.recordMoveRuleState(s,f,s.type==="P");const _=()=>{if(g){const N=e.castling==="kingside"?7:0,M=e.castling==="kingside"?5:3;ut[i.r][M]=ut[i.r][N],ut[i.r][N]=null,ut[i.r][M].userData.c=M,ge.board[i.r][M]=ge.board[i.r][N],ge.board[i.r][N]=null,ge.board[i.r][M].moved=!0}ge.lastMove={from:{r:i.r,c:i.c},to:{r:e.r,c:e.c},piece:s},ut[i.r][i.c]=null,ut[e.r][e.c]=n,ut[e.r][e.c].userData.r=e.r,ut[e.r][e.c].userData.c=e.c,r&&(ut[i.r][e.c]=null),ge.turn=ge.turn==="w"?"b":"w";const S=["a","b","c","d","e","f","g","h"],L=["8","7","6","5","4","3","2","1"];let R="";if(g)R=e.castling==="kingside"?"O-O":"O-O-O";else{const N=s.type==="P"?"":s.type,M=e.capture||r?"x":"",b=s.type==="P"&&M?S[i.c]:"",O=S[e.c]+L[e.r];let V="";const J=ge.board[e.r][e.c];s.type==="P"&&J&&J.type!=="P"&&(V="="+J.type),R=`${N}${b}${M}${O}${V}`}ge.isInCheck(ge.turn)&&(R+="+");const w=document.getElementById("history-list");if(w){if(s.color==="w"){const M=document.createElement("li");M.innerHTML=`<span style="color:#f5c56b">${R}</span>`,w.appendChild(M)}else w.lastElementChild&&(w.lastElementChild.innerHTML+=` &nbsp;&nbsp;<span style="color:#b583ff">${R}</span>`);const N=document.getElementById("history-panel");N&&(N.scrollTop=N.scrollHeight)}A_(i.r,i.c,e.r,e.c),no(),Qn=!1,et&&at&&s.color===$e&&window.dbUpdate&&window.db&&window.dbUpdate(window.dbRef(window.db,`rooms/${at}`),{lastMove:{color:$e,from:{r:i.r,c:i.c},to:{r:e.r,c:e.c,capture:!!e.capture,promote:e.promote||null,castling:e.castling||null,enPassant:e.enPassant||null},time:Date.now()}}),wt?k_(i,e):!D_()&&t&&t()};return s.type==="P"&&(e.r===0||e.r===7)?e.promote?(Tr(e.promote,e.r,e.c,s,n,c),_()):et&&s.color!==$e||it&&s.color!==$e?(Tr("Q",e.r,e.c,s,n,c),_()):U_(S=>{e.promote=S,Tr(S,e.r,e.c,s,n,c),_()}):_(),!0}return!1}})}function k_(i,e){const t=Gr[Kt];if(!t||!t[Ht])return;const s=t[Ht].solution[0],r=i.r===s.from.r&&i.c===s.from.c&&e.r===s.to.r&&e.c===s.to.c,o=document.getElementById("puzzle-prompt");if(r)if(Ee.playPuzzleSuccess(),Ht>=t.length-1){const a=(Xo.indexOf(Kt)+1)%Xo.length,c=Xo[a],l=Ju[c];o&&(o.innerHTML=`<span style="color: #f5c56b; font-weight: 700;">🏆 Arena Concluída! Desbloqueando ${l.name}...</span>`),setTimeout(()=>{vn(c,0)},2500)}else o&&(o.innerHTML='<span style="color: #00f5d4; font-weight: 700;">✨ Nível Concluído com Sucesso! Avançando...</span>'),setTimeout(()=>{vn(Kt,Ht+1)},2e3);else Ee.playPuzzleFail(),o&&(o.innerHTML='<span style="color: #ff4d6d; font-weight: 700;">⚠️ Lance incorreto! Retornando posição...</span>'),setTimeout(()=>{vn(Kt,Ht)},1400)}function vn(i=Kt,e=Ht){Gr[i]||(i="cathedral");const t=Gr[i];Kt=i,Ht=Math.max(0,Math.min(t.length-1,e));const n=t[Ht],s=Ju[i];for(wt=!0,it=!1,et=!1,$e=n.playerColor,to(i),ge.loadFen(n.fen),Ws();Ft.children.length>0;)Ft.remove(Ft.children[0]);gn=null,_n=[],Ei();const r=document.getElementById("puzzle-hud"),o=document.getElementById("puzzle-arena-name"),a=document.getElementById("puzzle-arena-icon"),c=document.getElementById("puzzle-title"),l=document.getElementById("puzzle-step-badge"),u=document.getElementById("puzzle-prompt");r&&r.classList.remove("hidden"),o&&(o.textContent=s.name),a&&(a.textContent=s.icon),c&&(c.textContent=n.title),l&&(l.textContent=`Nível ${n.level}/${t.length} • ${n.difficulty}`),u&&(u.textContent=`${n.objective} - ${n.lore}`),document.querySelectorAll(".puzzle-tab").forEach(f=>{f.classList.toggle("active",f.dataset.arenaChallenge===i)});const h=document.getElementById("timer-w"),d=document.getElementById("timer-b");h&&(h.style.display="none"),d&&(d.style.display="none"),ei(n.playerColor==="w"?0:1,!1),no()}const Vr=new __,os=new re,qn=new ve(new Ti(1.1,1.1),new Bt({color:16777215,transparent:!0,opacity:.12,side:Tt}));qn.rotation.x=-Math.PI/2;qn.position.y=.11;qn.visible=!1;tt.add(qn);function Ei(){for(;is.children.length>0;)is.remove(is.children[0])}function Pa(i,e,t,n=!1){Ei();const s=new Hs(.32,.46,24);s.rotateX(-Math.PI/2);const r=new ve(s,new Bt({color:n?62932:16106859,side:Tt})),o=hn(i,e);r.position.set(o.x,.11,o.z),is.add(r),t.forEach(a=>{const c=new ve(s,new Bt({color:a.capture?16731501:n?62932:13679871,side:Tt})),l=hn(a.r,a.c);c.position.set(l.x,.11,l.z),is.add(c)})}let Ji=null,G_=0;const Ir=new Map;try{Ji=new Worker(new URL("/assets/chess-worker-DWiYyI8Z.js",import.meta.url),{type:"module"}),Ji.onmessage=i=>{const{id:e,bestMove:t}=i.data;if(Ir.has(e)){const n=Ir.get(e);Ir.delete(e),n(t)}},Ji.onerror=i=>{console.warn("Worker de xadrez indisponível, usando fallback síncrono:",i),Ji=null}}catch{console.warn("Web Workers não suportados neste ambiente")}function sh(i,e,t){if(Ji){const n=++G_;Ir.set(n,t),Ji.postMessage({id:n,board:ge.board,turn:i,difficulty:e,history:ge.history,lastMove:ge.lastMove,halfmoveClock:ge.halfmoveClock})}else{const n=ge.chooseBestMove(i,e);t(n)}}function ms(){if(dn)return;const i=$e==="w"?"b":"w";it&&ge.turn===i&&!Qn&&sh(i,Mi,e=>{!dn&&it&&ge.turn===i&&e&&Ca(e.from,e.to,ms)})}Jt.domElement.addEventListener("pointermove",i=>{if(!$n||dn||Qn||ts){qn.visible=!1,document.body.style.cursor="default";return}const e=Jt.domElement.getBoundingClientRect();os.x=(i.clientX-e.left)/e.width*2-1,os.y=-((i.clientY-e.top)/e.height)*2+1,Vr.setFromCamera(os,Dt);const t=Vr.intersectObjects(Ra,!1);let n=null,s=null;if(t.length>0){const r=t[0].object;r.userData&&typeof r.userData.r=="number"&&(n={r:r.userData.r,c:r.userData.c},ut[n.r]&&ut[n.r][n.c]&&(s=ut[n.r][n.c]))}if(n){const r=hn(n.r,n.c);qn.position.set(r.x,.11,r.z),qn.visible=!0,document.body.style.cursor="pointer";const o=ge.board[n.r][n.c];o&&o.color===ge.turn&&(!et||o.color===$e)?Pr=s:Pr=null}else qn.visible=!1,document.body.style.cursor="default",Pr=null});let Rs=null;Jt.domElement.addEventListener("pointerdown",i=>{Rs={x:i.clientX,y:i.clientY}});Jt.domElement.addEventListener("pointerup",i=>{if(!Rs)return;const e=i.clientX-Rs.x,t=i.clientY-Rs.y,n=Math.hypot(e,t);if(Rs=null,n>7||!$n||dn||Qn||ts)return;const s=$e==="w"?"b":"w";if(it&&ge.turn===s||et&&ge.turn!==$e)return;const r=Jt.domElement.getBoundingClientRect();os.x=(i.clientX-r.left)/r.width*2-1,os.y=-((i.clientY-r.top)/r.height)*2+1,Vr.setFromCamera(os,Dt);const o=Vr.intersectObjects(Ra,!1);let a=null;if(o.length>0){const u=o[0].object;u.userData&&typeof u.userData.r=="number"&&(a={r:u.userData.r,c:u.userData.c})}if(!a){gn=null,_n=[],Ei();return}const c=_n.find(u=>u.r===a.r&&u.c===a.c);if(gn&&c){const u=gn;gn=null,_n=[],Ca(u,c,ms);return}const l=ge.board[a.r][a.c];l&&l.color===ge.turn&&(!et||l.color===$e)?(Ee.playClick(),gn=a,_n=ge.getLegalMoves(a.r,a.c),Pa(a.r,a.c,_n)):(gn=null,_n=[],Ei())});const kt=document.getElementById("start-menu"),Cl=document.getElementById("btn-start-game");if(kt){const i=e=>{kt.classList.contains("hidden")||e.stopPropagation()};kt.addEventListener("pointerdown",i),kt.addEventListener("pointerup",i),kt.addEventListener("click",i),kt.addEventListener("touchstart",i,{passive:!1}),kt.addEventListener("touchend",i,{passive:!1})}document.querySelectorAll("#menu-mode-group .toggle-btn").forEach(i=>{i.addEventListener("click",e=>{e.stopPropagation(),document.querySelectorAll("#menu-mode-group .toggle-btn").forEach(a=>a.classList.remove("active")),e.currentTarget.classList.add("active");const t=e.currentTarget.dataset.mode;wt=t==="puzzle",it=t==="ai",et=t==="online";const n=document.getElementById("puzzle-hud");n&&!wt&&n.classList.add("hidden");const s=document.getElementById("menu-diff-section");s&&(s.style.display=it?"flex":"none");const r=document.getElementById("menu-online-code-section");r&&(r.style.display=et?"block":"none");const o=document.getElementById("btn-mode");o&&(o.querySelector(".btn-label").textContent=wt?"Desafios":it?"vs IA":et?"Online":"2 Jogadores")})});const Pl=document.getElementById("menu-btn-join-code"),jo=document.getElementById("menu-input-join-code");if(Pl&&jo){const i=e=>{e&&e.stopPropagation();const t=jo.value.trim().toUpperCase();t&&(Ee.playClick(),kt.classList.add("hidden"),$n=!0,rt.enabled=!0,et=!0,it=!1,Ia(t),window.history.replaceState(null,"",`?room=${t}`),ks(`⚔️ Conectando à sala ${t}...`))};Pl.addEventListener("click",i),jo.addEventListener("keydown",e=>{e.key==="Enter"&&i(e)})}document.querySelectorAll("#menu-arena-group .toggle-btn, #pause-arena-group .toggle-btn").forEach(i=>{i.addEventListener("click",e=>{e.stopPropagation(),to(e.currentTarget.dataset.arena),Ee.playClick()})});document.querySelectorAll("#menu-color-group .toggle-btn").forEach(i=>{i.addEventListener("click",e=>{e.stopPropagation(),document.querySelectorAll("#menu-color-group .toggle-btn").forEach(t=>t.classList.remove("active")),e.currentTarget.classList.add("active"),$e=e.currentTarget.dataset.color})});document.querySelectorAll("#menu-time-group .toggle-btn").forEach(i=>{i.addEventListener("click",e=>{e.stopPropagation(),document.querySelectorAll("#menu-time-group .toggle-btn").forEach(t=>t.classList.remove("active")),e.currentTarget.classList.add("active"),Si=parseInt(e.currentTarget.dataset.time,10)})});document.querySelectorAll("#menu-diff-group .toggle-btn").forEach(i=>{i.addEventListener("click",e=>{e.stopPropagation(),document.querySelectorAll("#menu-diff-group .toggle-btn").forEach(t=>t.classList.remove("active")),e.currentTarget.classList.add("active"),Mi=parseInt(e.currentTarget.dataset.diff,10),H_()})});function H_(){Mi===1?(An.color.setHex(10390718),An.intensity=.65):Mi===2?(An.color.setHex(9067765),An.intensity=.9):(An.color.setHex(16711731),An.intensity=.5)}const Ll=document.getElementById("btn-puzzle-prev"),Il=document.getElementById("btn-puzzle-next"),Dl=document.getElementById("btn-puzzle-reset"),Ul=document.getElementById("btn-puzzle-hint");document.querySelectorAll(".puzzle-tab").forEach(i=>{i.addEventListener("click",e=>{Ee.playClick();const t=e.currentTarget.dataset.arenaChallenge;vn(t,0)})});Ll&&Ll.addEventListener("click",()=>{Ee.playClick(),vn(Kt,Ht-1)});Il&&Il.addEventListener("click",()=>{Ee.playClick(),vn(Kt,Ht+1)});Dl&&Dl.addEventListener("click",()=>{Ee.playClick(),vn(Kt,Ht)});Ul&&Ul.addEventListener("click",()=>{Ee.playClick();const i=Gr[Kt];if(i&&i[Ht]){const e=i[Ht];Pa(e.solution[0].from.r,e.solution[0].from.c,[e.solution[0].to],!0);const t=document.getElementById("puzzle-prompt");t&&(t.innerHTML=`<span style="color:#f5c56b">💡 Dica: ${e.hint}</span>`)}});const Nl=document.getElementById("btn-puzzle-close");Nl&&Nl.addEventListener("click",i=>{i.stopPropagation(),Ee.playClick(),wt=!1,it=!0;const e=document.getElementById("puzzle-hud");e&&e.classList.add("hidden");const t=document.getElementById("timer-w"),n=document.getElementById("timer-b");t&&(t.style.display="flex"),n&&(n.style.display="flex");const s=document.getElementById("btn-mode");s&&(s.classList.add("active"),s.querySelector(".btn-label").textContent="vs IA"),gs()});Cl&&Cl.addEventListener("click",i=>{if(i.stopPropagation(),Ee.init(),Ee.playClick(),$n=!0,rt.enabled=!0,kt&&kt.classList.add("hidden"),qs(),wt){vn(Kt,0);return}const e=document.getElementById("puzzle-hud");if(e&&e.classList.add("hidden"),et){W_();return}Cn=Si,Pn=Si,Xs(),io(),$e==="b"?(ei(1,!0),it&&setTimeout(ms,600)):ei(0,!0)});const Ol=document.getElementById("btn-open-menu");Ol&&kt&&Ol.addEventListener("click",()=>{Ee.playClick(),kt.classList.remove("hidden"),$n=!1,rt.enabled=!1;const i=document.getElementById("puzzle-hud");i&&i.classList.add("hidden")});const Fl=document.getElementById("btn-music");Fl&&Fl.addEventListener("click",i=>{Ee.init();const e=Ee.toggleAmbience();i.currentTarget.classList.toggle("active",e)});const Ko=document.getElementById("btn-emotes"),Zi=document.getElementById("emotes-popup");Ko&&Zi&&(Ko.addEventListener("click",i=>{Ee.playClick(),Zi.classList.toggle("hidden"),i.currentTarget.classList.toggle("active",!Zi.classList.contains("hidden"))}),document.querySelectorAll(".emote-btn").forEach(i=>{i.addEventListener("click",e=>{const t=e.currentTarget.dataset.msg;V_(t),Zi.classList.add("hidden"),Ko.classList.remove("active")})}));function ks(i){const e=document.getElementById("emote-toast-container");if(!e)return;const t=document.createElement("div");t.className="emote-toast",t.textContent=i,e.appendChild(t),Ee.playEmote(),setTimeout(()=>{t.parentElement&&t.parentElement.removeChild(t)},2800)}function V_(i){ks(i),et&&at&&window.dbUpdate&&window.db&&window.dbUpdate(window.dbRef(window.db,`rooms/${at}`),{lastEmote:{msg:i,color:$e,time:Date.now()}})}const Bl=document.getElementById("btn-undo");Bl&&Bl.addEventListener("click",()=>{if(et||Qn||!ge.history||ge.history.length===0)return;Ee.playClick(),ge.undo(),it&&ge.turn!==$e&&ge.history.length>0&&ge.undo();const i=document.getElementById("history-list");for(i&&i.lastElementChild&&i.removeChild(i.lastElementChild);Ft.children.length>0;)Ft.remove(Ft.children[0]);gn=null,_n=[],Ei(),Ws(),no()});const zl=document.getElementById("btn-history"),Jo=document.getElementById("history-panel");zl&&Jo&&zl.addEventListener("click",i=>{Ee.playClick(),Jo.classList.toggle("hidden"),i.currentTarget.classList.toggle("active",!Jo.classList.contains("hidden"))});const kl=document.getElementById("btn-pause"),tn=document.getElementById("pause-modal"),Gl=document.getElementById("btn-resume"),Hl=document.getElementById("btn-pause-restart"),Vl=document.getElementById("btn-pause-main-menu");kl&&tn&&kl.addEventListener("click",()=>{Ee.playClick(),dn=!0,tn.classList.remove("hidden"),document.querySelectorAll("#pause-mode-group .toggle-btn").forEach(i=>{i.classList.remove("active"),(i.dataset.mode==="online"&&et||i.dataset.mode==="puzzle"&&wt||i.dataset.mode==="ai"&&it&&!et&&!wt||i.dataset.mode==="2p"&&!it&&!et&&!wt)&&i.classList.add("active")}),document.querySelectorAll("#pause-arena-group .toggle-btn").forEach(i=>{i.classList.toggle("active",i.dataset.arena===Vs)})});document.querySelectorAll("#pause-mode-group .toggle-btn").forEach(i=>{i.addEventListener("click",e=>{Ee.playClick(),document.querySelectorAll("#pause-mode-group .toggle-btn").forEach(s=>s.classList.remove("active")),e.currentTarget.classList.add("active");const t=e.currentTarget.dataset.mode;wt=t==="puzzle",it=t==="ai",et=t==="online";const n=document.getElementById("btn-mode");if(n&&(n.classList.toggle("active",it||wt),n.querySelector(".btn-label").textContent=wt?"Desafios":it?"vs IA":et?"Online":"2 Jogadores"),wt)tn.classList.add("hidden"),dn=!1,vn(Kt,0);else if(et)tn.classList.add("hidden"),dn=!1,La();else{const s=document.getElementById("puzzle-hud");s&&s.classList.add("hidden");const r=document.getElementById("timer-w"),o=document.getElementById("timer-b");r&&(r.style.display="flex"),o&&(o.style.display="flex"),gs()}})});Gl&&tn&&Gl.addEventListener("click",()=>{Ee.playClick(),dn=!1,tn.classList.add("hidden"),ms()});Hl&&tn&&Hl.addEventListener("click",()=>{Ee.playClick(),dn=!1,tn.classList.add("hidden"),wt?vn(Kt,Ht):gs()});Vl&&tn&&Vl.addEventListener("click",()=>{Ee.playClick(),tn.classList.add("hidden"),dn=!1,$n=!1,rt.enabled=!1;const i=document.getElementById("puzzle-hud");i&&i.classList.add("hidden"),kt&&kt.classList.remove("hidden")});const Wl=document.getElementById("btn-mode");Wl&&Wl.addEventListener("click",i=>{Ee.playClick(),it=!it,et&&(et=!1),i.currentTarget.classList.toggle("active",it),i.currentTarget.querySelector(".btn-label").textContent=it?"vs IA":"2 Jogadores",ms()});const Xl=document.getElementById("btn-cam");Xl&&Xl.addEventListener("click",()=>{Ee.playClick(),ns=(ns+1)%ha.length,ei(ns)});const ql=document.getElementById("btn-hint");ql&&ql.addEventListener("click",()=>{Qn||ts||(Ee.playClick(),sh(ge.turn,Mi,i=>{i&&(gn=i.from,_n=[i.to],Pa(i.from.r,i.from.c,[i.to],!0))}))});const Ts=document.getElementById("btn-pause-audio");Ts&&Ts.addEventListener("click",()=>{Ee.init(),Ee.enabled=!Ee.enabled;const i=Ts.querySelector(".audio-label"),e=Ts.querySelector(".material-symbols-rounded");i&&(i.textContent=Ee.enabled?"Som: Ligado":"Som: Mudo"),e&&(e.textContent=Ee.enabled?"volume_up":"volume_off"),Ts.classList.toggle("active",Ee.enabled)});const Yl=document.getElementById("btn-pause-fullscreen");Yl&&Yl.addEventListener("click",()=>{Ee.playClick(),document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})});const jl=document.getElementById("btn-pause-emotes");jl&&Zi&&jl.addEventListener("click",()=>{Ee.playClick(),Zi.classList.toggle("hidden")});const Kl=document.getElementById("btn-resign"),ti=document.getElementById("resign-modal"),Jl=document.getElementById("btn-confirm-resign"),Zl=document.getElementById("btn-cancel-resign"),$l=document.getElementById("btn-pause-resign");$l&&ti&&$l.addEventListener("click",()=>{Ee.playClick(),tn&&tn.classList.add("hidden"),ti.classList.remove("hidden")});Kl&&ti&&Kl.addEventListener("click",()=>{Ee.playClick(),ti.classList.remove("hidden")});Zl&&ti&&Zl.addEventListener("click",()=>{Ee.playClick(),ti.classList.add("hidden")});Jl&&ti&&Jl.addEventListener("click",()=>{Ee.playClick(),ti.classList.add("hidden"),Ki("Batalha Encerrada",$e==="w"?"O Mármore rendeu-se e abandonou a batalha.":"A Obsidiana rendeu-se e abandonou a batalha."),Hn("loss"),zs($e==="w"?"Obsidiana":"Mármore"),et&&at&&window.dbUpdate&&window.db&&window.dbUpdate(window.dbRef(window.db,`rooms/${at}`),{resign:{color:$e,time:Date.now()}})});const wr=document.getElementById("btn-copy-pgn");wr&&wr.addEventListener("click",()=>{Ee.playClick();const i=document.querySelectorAll("#history-list li");let e="";i.forEach((s,r)=>{const o=s.innerText.replace(/\s+/g," ").trim();e+=`${r+1}. ${o} `});const n=`[Event "Wizard's Chess 3D"]
[Site "Catedral Arcana"]
[Date "${new Date().toISOString().split("T")[0].replace(/-/g,".")}"]
[White "Mármore"]
[Black "Obsidiana"]
[Result "*"]

${e||"Nenhum lance efetuado"}
`;navigator.clipboard.writeText(n).then(()=>{wr.textContent="PGN Copiado!",setTimeout(()=>{wr.textContent="Copiar PGN"},2e3)}).catch(()=>{})});const ws=document.getElementById("btn-fullscreen");ws&&(ws.addEventListener("click",()=>{Ee.playClick(),document.fullscreenElement?(screen.orientation&&screen.orientation.unlock&&screen.orientation.unlock(),document.exitFullscreen()):document.documentElement.requestFullscreen().then(()=>{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}).catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{const i=ws.querySelector(".material-symbols-rounded");document.fullscreenElement?(i&&(i.textContent="fullscreen_exit"),ws.classList.add("active")):(i&&(i.textContent="fullscreen"),ws.classList.remove("active"))}));const Ql=document.getElementById("btn-audio");Ql&&Ql.addEventListener("click",i=>{Ee.enabled=!Ee.enabled,i.currentTarget.classList.toggle("active",Ee.enabled);const e=i.currentTarget.querySelector(".material-symbols-rounded");e&&(e.textContent=Ee.enabled?"volume_up":"volume_off")});const Wr=document.getElementById("btn-reset");function gs(i=!0){if(Qn)return;for(Ee.playClick(),gn=null,_n=[],Ei();Ft.children.length>0;)Ft.remove(Ft.children[0]);if(!wt){const n=document.getElementById("puzzle-hud");n&&n.classList.add("hidden");const s=document.getElementById("timer-w"),r=document.getElementById("timer-b");s&&(s.style.display="flex"),r&&(r.style.display="flex")}ge.reset(),Ws(),Cn=Si,Pn=Si,Xs();const e=document.getElementById("history-list");e&&(e.innerHTML="");const t=document.getElementById("game-over-modal");t&&t.classList.add("hidden"),no(),$e==="b"&&it&&setTimeout(ms,600)}Wr&&Wr.addEventListener("click",()=>{et&&at&&window.dbUpdate&&window.db?window.dbUpdate(window.dbRef(window.db,`rooms/${at}`),{reset:Date.now()}):gs()});const eu=document.getElementById("btn-play-again");eu&&eu.addEventListener("click",()=>{const i=document.getElementById("game-over-modal");i&&i.classList.add("hidden"),Wr?Wr.click():gs()});window.addEventListener("resize",()=>{Dt.aspect=window.innerWidth/window.innerHeight,Dt.updateProjectionMatrix(),Jt.setSize(window.innerWidth,window.innerHeight),ei(ns,!0)});let tu=null,nu=null,Dr=null,Xr=!1,iu=null;function W_(){const i=document.getElementById("waiting-modal"),e=new URLSearchParams(window.location.search).get("room"),t=sessionStorage.getItem("myRoom")===(e||at);if(es&&!t){if(Ia(es),i){i.classList.remove("hidden");const n=document.getElementById("room-short-code");n&&(n.textContent=es);const s=document.getElementById("room-link-input");s&&(s.value=window.location.href)}}else at&&t?X_(at):La()}function La(){Ee.playClick(),ge.reset(),Ws(),et=!0,$e="w",it=!1,Xr=!1,Dr=null,updateColorButton(),at=Math.random().toString(36).substring(2,6).toUpperCase(),sessionStorage.setItem("myRoom",at),window.dbSet&&window.db&&window.dbSet(window.dbRef(window.db,`rooms/${at}`),{player2Joined:!1,lastMove:null,reset:null,lastEmote:null,arena:Vs}),window.history.replaceState(null,"",`?room=${at}`);const i=document.getElementById("waiting-modal");i&&i.classList.remove("hidden");const e=document.getElementById("room-short-code");e&&(e.textContent=at);const t=document.getElementById("room-link-input");t&&(t.value=window.location.href);const n=document.getElementById("btn-online");n&&n.classList.add("active"),Da(at),io()}function Ia(i){at=i.toUpperCase(),et=!0,$e="b",it=!1,Xr=!0,updateColorButton(),window.dbUpdate&&window.db&&window.dbUpdate(window.dbRef(window.db,`rooms/${at}`),{player2Joined:!0}),Da(at),ei(1,!0),io()}function X_(i){at=i.toUpperCase(),et=!0,$e="w",it=!1,updateColorButton(),Da(at);const e=document.getElementById("waiting-modal");e&&e.classList.remove("hidden");const t=document.getElementById("room-short-code");t&&(t.textContent=at);const n=document.getElementById("room-link-input");n&&(n.value=window.location.href);const s=document.getElementById("btn-online");s&&s.classList.add("active"),io()}function q_(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return;if(sessionStorage.getItem("myRoom")===e){es=e.toUpperCase(),et=!0,it=!1,$e="w";const n=document.querySelector('#menu-mode-group [data-mode="online"]');n&&(document.querySelectorAll("#menu-mode-group .toggle-btn").forEach(r=>r.classList.remove("active")),n.classList.add("active"));const s=document.getElementById("menu-diff-section");s&&(s.style.display="none")}else{es=e.toUpperCase(),et=!0,it=!1,$e="b";const n=document.querySelector('#menu-mode-group [data-mode="online"]');n&&(document.querySelectorAll("#menu-mode-group .toggle-btn").forEach(a=>a.classList.remove("active")),n.classList.add("active"));const s=document.getElementById("menu-diff-section");s&&(s.style.display="none");const r=document.querySelector('#menu-color-group [data-color="b"]');r&&(document.querySelectorAll("#menu-color-group .toggle-btn").forEach(a=>a.classList.remove("active")),r.classList.add("active"));const o=document.querySelector("#start-menu p");o&&(o.innerHTML=`⚔️ Convidado para a Sala <strong>${es}</strong>!<br>Configure suas opções e clique em <strong>Entrar na Catedral</strong>.`,o.style.color="#00f5d4")}}const su=document.getElementById("btn-online");su&&su.addEventListener("click",()=>{La()});const zn=document.getElementById("btn-copy-link");zn&&zn.addEventListener("click",()=>{navigator.clipboard.writeText(window.location.href),zn.textContent="Link Copiado!",zn.style.background="#00f5d4",zn.style.color="#000",setTimeout(()=>{zn.textContent="Copiar Link",zn.style.background="",zn.style.color=""},2e3)});const ru=document.getElementById("btn-close-online"),ou=document.getElementById("waiting-modal");ru&&ou&&ru.addEventListener("click",()=>{ou.classList.add("hidden")});const au=document.getElementById("btn-join-code"),Zo=document.getElementById("input-join-code");if(au&&Zo){const i=()=>{const e=Zo.value.trim().toUpperCase();if(e){Ia(e),window.history.replaceState(null,"",`?room=${e}`);const t=document.getElementById("waiting-modal");t&&t.classList.add("hidden"),ks(`⚔️ Conectado à sala ${e}!`)}};au.addEventListener("click",i),Zo.addEventListener("keydown",e=>{e.key==="Enter"&&i()})}function Da(i){if(!window.dbOnValue||!window.db)return;const e=window.dbRef(window.db,`rooms/${i}`);window.dbOnValue(e,t=>{const n=t.val();if(n){if(n.arena&&n.arena!==Vs&&to(n.arena),n.player2Joined){const s=document.getElementById("waiting-modal");s&&!s.classList.contains("hidden")&&s.classList.add("hidden"),Xr||(Xr=!0,ks("⚔️ Adversário entrou na sala!"))}if(n.reset&&n.reset!==tu&&(tu=n.reset,Dr=null,gs(!1)),n.lastEmote&&n.lastEmote.time!==nu&&(nu=n.lastEmote.time,n.lastEmote.color!==$e&&ks(n.lastEmote.msg)),n.resign&&n.resign.time!==iu&&(iu=n.resign.time,n.resign.color!==$e&&(Ki("Vitória por Desistência!","O adversário baixou as armas e abandonou a batalha!"),Hn("win"),zs(n.resign.color==="w"?"Obsidiana":"Mármore"),Ee.playVictory())),n.lastMove&&n.lastMove.color!==$e&&n.lastMove.time!==Dr){Dr=n.lastMove.time;const s=n.lastMove.from,r=n.lastMove.to,o=ge.board[s.r][s.c];o&&o.color!==$e&&Ca(s,r,null)}}})}setTimeout(q_,500);const cu=new g_;function rh(){requestAnimationFrame(rh);const i=Math.min(cu.getDelta(),.1),e=cu.getElapsedTime();wa.forEach(t=>{t.light.intensity=t.baseIntensity+Math.sin(e*7+t.phase)*1.4,t.orb.rotation.y+=i*1.5}),Aa.rotation.y=e*.03;for(let t=0;t<8;t++)for(let n=0;n<8;n++){const s=ut[t][n];if(s){const o=s===Pr?s.userData.basePosY+.16:s.userData.basePosY;s.position.y+=(o-s.position.y)*.18;const a=Math.sin(e*2.2+s.userData.phase)*.018;s.scale.set(1,1+a,1)}}for(let t=Ln.length-1;t>=0;t--)Ln[t].update(i)&&Ln.splice(t,1);for(let t=rs.length-1;t>=0;t--){const n=rs[t];n.mesh.position.addScaledVector(n.vel,i),n.mesh.rotation.x+=n.rot.x*i,n.mesh.rotation.y+=n.rot.y*i,n.life-=i;const s=Math.max(n.life/n.maxLife,.01);n.mesh.scale.set(s,s,s),n.life<=0&&(Hr(n.mesh),rs.splice(t,1))}for(let t=Cr.length-1;t>=0;t--){const n=Cr[t];n.mesh.position.addScaledVector(n.vel,i),n.vel.y-=4.2*i,n.mesh.rotation.x+=n.rot.x*i,n.mesh.rotation.y+=n.rot.y*i,n.life-=i;const s=Math.max(n.life/n.maxLife,.01);n.mesh.scale.set(s,s,s),n.life<=0&&(Hr(n.mesh),Cr.splice(t,1))}fi>0&&(Dt.position.x+=(Math.random()-.5)*fi*.35,Dt.position.y+=(Math.random()-.5)*fi*.35,fi=Math.max(0,fi-i*2.2)),rt.update(),Jt.render(tt,Dt)}Ws();rh();function qs(){if(!$n){rt&&(rt.autoRotate=!1),clearTimeout(Yo);return}rt.autoRotate?(rt.autoRotate=!1,ns=$e==="w"?0:1,ei(ns)):rt.autoRotate=!1,clearTimeout(Yo),Yo=setTimeout(()=>{$n&&(rt.autoRotate=!0)},12e3)}window.addEventListener("pointermove",qs);window.addEventListener("pointerdown",qs);window.addEventListener("keydown",qs);qs();async function Y_(){if(!(typeof AdMob>"u"||typeof BannerAdSize>"u"))try{await AdMob.initialize({requestTrackingAuthorization:!0,initializeForTesting:!0}),await AdMob.showBanner({adId:"ca-app-pub-3940256099942544/6300978111",adSize:BannerAdSize.BANNER,position:BannerAdPosition.BOTTOM_CENTER,margin:0,isTesting:!0})}catch{}}Y_();
