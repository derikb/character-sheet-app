(()=>{var Nn=class{constructor(){this.events={},this.debug=!1}listenerIndex(e,t){return this.events[e].findIndex(r=>r.listener===t)}on(e,t,r=null){if(typeof t=="function"){if(this.events[e]=this.events[e]||[],this.events[e].length>0){let i=this.listenerIndex(e,t);i>-1&&this.events[e].splice(i,1)}this.events[e].push({listener:t,boundObj:r})}}off(e,t){if(Array.isArray(this.events[e])){let r=this.listenerIndex(e,t);if(r===-1)return;this.events[e].splice(r,1),this.events[e].length===0&&delete this.events[e]}}once(e,t,r){this.on(e,function i(){this.off(e,i);let s=typeof r>"u"?this:r;t.apply(s,arguments)})}trigger(e){this.debug&&console&&console.log(`EventEmitter triggered: ${e}`);let t=[].slice.call(arguments,1);Array.isArray(this.events[e])&&this.events[e].forEach(r=>{let i=r.boundObj===null?this:r.boundObj;r.listener.apply(i,t)})}};var qe=class{constructor({header:e="",text:t=""}){this.header=e,this.text=t}toJSON(){let e={};return Object.getOwnPropertyNames(this).forEach(r=>{e[r]=this[r]}),e}};var Be=class{constructor({key:e="",charname:t="",updated:r="",key_prev:i="",version:s=""}){this.key=e,this.charname=t,this.updated=r,this.key_prev=i,this.version=s}get updatedTime(){return new Date(this.updated).toLocaleString()}get className(){return"Character"}get ruleset(){return"Generic"}get summaryHeader(){return`${this.charname} (${this.ruleset})`}_convertNotes(e){let t=[];return e.forEach(r=>{if(!(r&&typeof r!="object")){if(r instanceof qe){t.push(r);return}if(Array.isArray(r)){t.push(new qe({header:r[0]||"",text:r[1]||""}));return}t.push(new qe(r))}}),t}toJSON(){let e={className:this.className};return Object.getOwnPropertyNames(this).forEach(r=>{if(r==="emitter")return;let i=this[r];Array.isArray(i)&&(i=i.map(s=>typeof s.toJSON=="function"?s.toJSON():s)),r.substring(0,1)==="_"?e[r.substring(1)]=i:e[r]=i}),e}};var K=Object.freeze({STRENGTH:"str",DEXTERITY:"dex",CONSTITUTION:"con",INTELLIGENCE:"intel",WISDOM:"wis",CHARISMA:"cha"}),zr=Object.freeze({acrobatics:K.DEXTERITY,animal_handling:K.WISDOM,arcana:K.INTELLIGENCE,athletics:K.STRENGTH,deception:K.CHARISMA,history:K.INTELLIGENCE,insight:K.WISDOM,intimidation:K.CHARISMA,investigation:K.INTELLIGENCE,medicine:K.WISDOM,nature:K.INTELLIGENCE,perception:K.WISDOM,performance:K.CHARISMA,persuasion:K.CHARISMA,religion:K.INTELLIGENCE,sleight_of_hand:K.DEXTERITY,stealth:K.DEXTERITY,survival:K.WISDOM}),fo=Object.freeze({UNSKILLED:0,PROFICIENT:1,EXPERT:2});var je=class{constructor({name:e="",attack:t="",damage:r="",notes:i=""}){this.name=e,this.attack=t,this.damage=r,this.notes=i}toJSON(){let e={};return Object.getOwnPropertyNames(this).forEach(r=>{e[r]=this[r]}),e}};var gt=class extends Be{constructor({key:e="",charname:t="",charclass:r="",race:i="",background:s="",alignment:o="",level:a=1,experience:c=0,inspiration:l="",armor_class:u="",speed:h=30,hp_cur:d="",hp_max:f="",hd_cur:b="",hd_max:T="",deathSave:v={success:0,fail:0},class_points:P={cur:0,max:0},str:L=10,dex:O=10,con:G=10,intel:te=10,wis:j=10,cha:Fe=10,saves:$t={str:0,dex:0,con:0,intel:0,wis:0,cha:0},skills:Ue={acrobatics:0,animal_handling:0,arcana:0,athletics:0,deception:0,history:0,insight:0,intimidation:0,investigation:0,medicine:0,nature:0,perception:0,performance:0,persuasion:0,religion:0,sleight_of_hand:0,stealth:0,survival:0},weapons:Ze=[],proficiencies_other:oo="",languages:ao="",traits:co="",ideals:lo="",bonds:uo="",flaws:ho="",appearance:Up="",equipment:qp=[],cp:Bp="",sp:jp="",gp:Gp="",pp:zp="",features:Hp=[],notes:$p="",notes_adv:Kp=[],notes_cam:Wp=[],npcs:Qp=[],factions:Yp=[],partymembers:Jp=[],spell_ability:Xp="",spell_save:Zp="",spell_attack:eg="",spell_slots:tg={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0},spell_slots_cur:ng={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0},spells:rg={0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]},updated:ig="",key_prev:sg="",version:og=""}){if(super({key:e,charname:t,updated:ig,key_prev:sg,version:og}),this.charclass=r,this.race=i,this.background=s,this.alignment=o,this._level=a,this.experience=c,this.inspiration=l,this.armor_class=u,this.speed=h,this.hp_cur=d,this.hp_max=f,this.hd_cur=b,this.hd_max=T,this.deathSave=v,this.class_points=P,this.str=L,this.dex=O,this.con=G,this.intel=te,this.wis=j,this.cha=Fe,this.saves=$t,this.skills=Ue,typeof this.skills.sleight_of_Hand<"u"){let me=this.skills.sleight_of_Hand;delete this.skills.sleight_of_Hand,this.skills.sleight_of_hand=me}this.weapons=[],Ze.forEach(me=>{if(!(me&&typeof me!="object")){if(Array.isArray(me)){this.weapons.push(new je({name:me[0]||"",attack:me[1]||"",damage:me[2]||"",notes:me[3]||""}));return}if(me instanceof je){this.weapons.push(me);return}this.weapons.push(new je(me))}}),this.proficiencies_other=oo,this.languages=ao,this.traits=co,this.ideals=lo,this.bonds=uo,this.flaws=ho,this.appearance=Up,this.equipment=qp,this.cp=Bp,this.sp=jp,this.gp=Gp,this.pp=zp,this.features=Hp,this.notes=$p,this.notes_adv=this._convertNotes(Kp),this.notes_cam=this._convertNotes(Wp),this.npcs=this._convertNotes(Qp),this.factions=this._convertNotes(Yp),this.partymembers=this._convertNotes(Jp),this.spell_ability=Xp,this.spell_save=Zp,this.spell_attack=eg,this.spell_slots=tg,this.spell_slots_cur=ng,this.spells=rg,this.emitter=null}get className(){return"Character5e"}get ruleset(){return"5e"}get level(){return this._level}set level(e){let t=this.level;if(e===t)return;let r=this.proficiency;this._level=e;let i=this.proficiency;r!==i&&this.emitter&&this.emitter.trigger("character:proficiency:update")}get proficiency(){return`+${Math.ceil(this.level/4)+1}`}setAttribute(e,t){if(!(!this[e]||this[e]===t)&&(this[e]=t,this.emitter)){this.emitter.trigger("character:attribute:update",e);for(let i in zr)zr[i]===e&&this.emitter.trigger("character:skill:update",i,this.getSkillMod(i))}}attributeMod(e){let t=this[e];if(Number.isNaN(t))return"0";let r=Math.floor((t-10)/2);return r>0?`+${r}`:r.toString()}isProficient(e){return this.skills[e]>fo.UNSKILLED}isExpert(e){return this.skills[e]===fo.EXPERT}getSkillMod(e){let t=0;if(typeof this.skills[e]>"u")return 0;let i=zr[e];i&&(t+=parseInt(this.attributeMod(i),10));let s=parseInt(this.proficiency,10);return this.isProficient(e)&&(t+=s),this.isExpert(e)&&(t+=s),t>0?`+${t}`:t.toString()}getSkill(e){let t=this.skills[e];return typeof t>"u"?null:t}setSkill(e,t){let r=this.getSkill(e);r===null||r===t||(this.skills[e]=t,this.emitter&&this.emitter.trigger("character:skill:update",e,this.getSkillMod(e)))}isSaveProficient(e){return this.saves[e]||0}saveMod(e){let t=0;this.isSaveProficient(e)&&(t=parseInt(this.proficiency,10));let r=0+t+parseInt(this.attributeMod(e),10);return r>0?`+${r}`:r.toString()}setSaveProficiency(e,t){let r=this.saves[e];typeof r>"u"||r!==t&&(this.saves[e]=t?1:0,this.emitter&&this.emitter.trigger("character:save:update",e))}};var yt=class extends Be{constructor({key:e="",charname:t="",level:r=1,conflict_approach:i="",goal:s="",gimmick:o="",background:a="",foreground:c="",weakness:l="",core_flaw:u="",techniques:h=[],traits:d=[],hp_cur:f=0,hp_max:b=0,armor:T=0,initiative:v="0",lineage:P=[],experience:L=0,appearance:O="",personality:G="",inventory:te=[],coins:j=0,injuries:Fe=[],notes:$t="",notes_adv:Ue=[],notes_cam:Ze=[],npcs:oo=[],factions:ao=[],partymembers:co=[],updated:lo="",key_prev:uo="",version:ho=""}){super({key:e,charname:t,updated:lo,key_prev:uo,version:ho}),this.level=r,this.conflict_approach=i,this.goal=s,this.gimmick=o,this.background=a,this.foreground=c,this.weakness=l,this.core_flaw=u,this.techniques=h,this.traits=d,this.hp_cur=f,this.hp_max=b,this.armor=T,this.initiative=v,this.lineage=P,this.experience=L,this.appearance=O,this.personality=G,this.inventory=te,this.coins=j,this.injuries=Fe,this.notes=$t,this.notes_adv=this._convertNotes(Ue),this.notes_cam=this._convertNotes(Ze),this.npcs=this._convertNotes(oo),this.factions=this._convertNotes(ao),this.partymembers=this._convertNotes(co),this.emitter=null}get className(){return"CharacterVagabonds"}get ruleset(){return"Vagabonds"}};var bu={prefix:"",setPrefix:function(n){this.prefix=n},get:function(n){try{let e=localStorage.getItem(`${this.prefix}${n}`);return e!==null?JSON.parse(e):null}catch{return null}},set:function(n,e){try{localStorage.setItem(`${this.prefix}${n}`,JSON.stringify(e))}catch(t){return console.log(t.message),!1}return!0},remove:function(n){localStorage.removeItem(`${this.prefix}${n}`)},getAllKeys:function(){let n=[];if(localStorage.length>0){let e=new RegExp(`^(${this.prefix})+`,"i");for(let t=0;t<localStorage.length;t++){let r=localStorage.key(t);r=r.replace(e,""),n.push(r)}}return n},getAll:function(){let n=this.getAllKeys(),e=[];return n.forEach(t=>{let r=bu.get(t);!r||!r.key||e.push(r)}),e}},Kt=bu;var Tu=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},ag=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],o=n[t++],a=n[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{let s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Au={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],o=i+1<n.length,a=o?n[i+1]:0,c=i+2<n.length,l=c?n[i+2]:0,u=s>>2,h=(s&3)<<4|a>>4,d=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(d=64)),r.push(t[u],t[h],t[d],t[f])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Tu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ag(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;let l=i<n.length?t[n.charAt(i)]:64;++i;let h=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||l==null||h==null)throw new po;let d=s<<2|a>>4;if(r.push(d),l!==64){let f=a<<4&240|l>>2;if(r.push(f),h!==64){let b=l<<6&192|h;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},po=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},cg=function(n){let e=Tu(n);return Au.encodeByteArray(e,!0)},xn=function(n){return cg(n).replace(/\./g,"")},yo=function(n){try{return Au.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function lg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var ug=()=>lg().__FIREBASE_DEFAULTS__,hg=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},dg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&yo(n[1]);return e&&JSON.parse(e)},_o=()=>{try{return ug()||hg()||dg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},vo=n=>{var e,t;return(t=(e=_o())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Su=n=>{let e=vo(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},wo=()=>{var n;return(n=_o())===null||n===void 0?void 0:n.config},Eo=n=>{var e;return(e=_o())===null||e===void 0?void 0:e[`_${n}`]};var Hr=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function Cu(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n),a="";return[xn(JSON.stringify(t)),xn(JSON.stringify(o)),a].join(".")}function W(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ru(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(W())}function ku(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Du(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Pu(){let n=W();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function bo(){try{return typeof indexedDB=="object"}catch{return!1}}function Nu(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var fg="FirebaseError",he=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=fg,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ge.prototype.create)}},Ge=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?mg(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new he(i,a,r)}};function mg(n,e){return n.replace(pg,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var pg=/\{\$([^}]+)}/g;function xu(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function _t(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],o=e[i];if(Iu(s)&&Iu(o)){if(!_t(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function Iu(n){return n!==null&&typeof n=="object"}function Wt(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Qt(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Yt(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Lu(n,e){let t=new go(n,e);return t.subscribe.bind(t)}var go=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");gg(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=mo),i.error===void 0&&(i.error=mo),i.complete===void 0&&(i.complete=mo);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function gg(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function mo(){}var Ab=4*60*60*1e3;function ne(n){return n&&n._delegate?n._delegate:n}var pe=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var vt="[DEFAULT]";var Io=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new Hr;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(_g(e))try{this.getOrInitializeService({instanceIdentifier:vt})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=vt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=vt){return this.instances.has(e)}getOptions(e=vt){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:yg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=vt){return this.component?this.component.multipleInstances?e:vt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function yg(n){return n===vt?void 0:n}function _g(n){return n.instantiationMode==="EAGER"}var $r=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Io(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var vg=[],k;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(k||(k={}));var wg={debug:k.DEBUG,verbose:k.VERBOSE,info:k.INFO,warn:k.WARN,error:k.ERROR,silent:k.SILENT},Eg=k.INFO,bg={[k.DEBUG]:"log",[k.VERBOSE]:"log",[k.INFO]:"info",[k.WARN]:"warn",[k.ERROR]:"error"},Ig=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=bg[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},et=class{constructor(e){this.name=e,this._logLevel=Eg,this._logHandler=Ig,this._userLogHandler=null,vg.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in k))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?wg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,k.DEBUG,...e),this._logHandler(this,k.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,k.VERBOSE,...e),this._logHandler(this,k.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,k.INFO,...e),this._logHandler(this,k.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,k.WARN,...e),this._logHandler(this,k.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,k.ERROR,...e),this._logHandler(this,k.ERROR,...e)}};var Tg=(n,e)=>e.some(t=>n instanceof t),Ou,Vu;function Ag(){return Ou||(Ou=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Sg(){return Vu||(Vu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Mu=new WeakMap,Ao=new WeakMap,Fu=new WeakMap,To=new WeakMap,Co=new WeakMap;function Cg(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(Ae(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Mu.set(t,n)}).catch(()=>{}),Co.set(e,n),e}function Rg(n){if(Ao.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Ao.set(n,e)}var So={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ao.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Fu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ae(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Uu(n){So=n(So)}function kg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Kr(this),e,...t);return Fu.set(r,e.sort?e.sort():[e]),Ae(r)}:Sg().includes(n)?function(...e){return n.apply(Kr(this),e),Ae(Mu.get(this))}:function(...e){return Ae(n.apply(Kr(this),e))}}function Dg(n){return typeof n=="function"?kg(n):(n instanceof IDBTransaction&&Rg(n),Tg(n,Ag())?new Proxy(n,So):n)}function Ae(n){if(n instanceof IDBRequest)return Cg(n);if(To.has(n))return To.get(n);let e=Dg(n);return e!==n&&(To.set(n,e),Co.set(e,n)),e}var Kr=n=>Co.get(n);function Bu(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(n,e),a=Ae(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Ae(o.result),c.oldVersion,c.newVersion,Ae(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Pg=["get","getKey","getAll","getAllKeys","count"],Ng=["put","add","delete","clear"],Ro=new Map;function qu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ro.get(e))return Ro.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=Ng.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Pg.includes(t)))return;let s=async function(o,...a){let c=this.transaction(o,i?"readwrite":"readonly"),l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),i&&c.done]))[0]};return Ro.set(e,s),s}Uu(n=>({...n,get:(e,t,r)=>qu(e,t)||n.get(e,t,r),has:(e,t)=>!!qu(e,t)||n.has(e,t)}));var Do=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(xg(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function xg(n){let e=n.getComponent();return e?.type==="VERSION"}var Po="@firebase/app",ju="0.9.15";var wt=new et("@firebase/app"),Lg="@firebase/app-compat",Og="@firebase/analytics-compat",Vg="@firebase/analytics",Mg="@firebase/app-check-compat",Fg="@firebase/app-check",Ug="@firebase/auth",qg="@firebase/auth-compat",Bg="@firebase/database",jg="@firebase/database-compat",Gg="@firebase/functions",zg="@firebase/functions-compat",Hg="@firebase/installations",$g="@firebase/installations-compat",Kg="@firebase/messaging",Wg="@firebase/messaging-compat",Qg="@firebase/performance",Yg="@firebase/performance-compat",Jg="@firebase/remote-config",Xg="@firebase/remote-config-compat",Zg="@firebase/storage",ey="@firebase/storage-compat",ty="@firebase/firestore",ny="@firebase/firestore-compat",ry="firebase",iy="10.1.0";var No="[DEFAULT]",sy={[Po]:"fire-core",[Lg]:"fire-core-compat",[Vg]:"fire-analytics",[Og]:"fire-analytics-compat",[Fg]:"fire-app-check",[Mg]:"fire-app-check-compat",[Ug]:"fire-auth",[qg]:"fire-auth-compat",[Bg]:"fire-rtdb",[jg]:"fire-rtdb-compat",[Gg]:"fire-fn",[zg]:"fire-fn-compat",[Hg]:"fire-iid",[$g]:"fire-iid-compat",[Kg]:"fire-fcm",[Wg]:"fire-fcm-compat",[Qg]:"fire-perf",[Yg]:"fire-perf-compat",[Jg]:"fire-rc",[Xg]:"fire-rc-compat",[Zg]:"fire-gcs",[ey]:"fire-gcs-compat",[ty]:"fire-fst",[ny]:"fire-fst-compat","fire-js":"fire-js",[ry]:"fire-js-all"};var Wr=new Map,xo=new Map;function oy(n,e){try{n.container.addComponent(e)}catch(t){wt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function nt(n){let e=n.name;if(xo.has(e))return wt.debug(`There were multiple attempts to register component ${e}.`),!1;xo.set(e,n);for(let t of Wr.values())oy(t,n);return!0}function On(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}var ay={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},tt=new Ge("app","Firebase",ay);var Lo=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw tt.create("app-deleted",{appName:this._name})}};var rt=iy;function Mo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:No,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw tt.create("bad-app-name",{appName:String(i)});if(t||(t=wo()),!t)throw tt.create("no-options");let s=Wr.get(i);if(s){if(_t(t,s.options)&&_t(r,s.config))return s;throw tt.create("duplicate-app",{appName:i})}let o=new $r(i);for(let c of xo.values())o.addComponent(c);let a=new Lo(t,r,o);return Wr.set(i,a),a}function Qr(n=No){let e=Wr.get(n);if(!e&&n===No&&wo())return Mo();if(!e)throw tt.create("no-app",{appName:n});return e}function ve(n,e,t){var r;let i=(r=sy[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),wt.warn(a.join(" "));return}nt(new pe(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var cy="firebase-heartbeat-database",ly=1,Ln="firebase-heartbeat-store",ko=null;function $u(){return ko||(ko=Bu(cy,ly,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Ln)}}}).catch(n=>{throw tt.create("idb-open",{originalErrorMessage:n.message})})),ko}async function uy(n){try{return await(await $u()).transaction(Ln).objectStore(Ln).get(Ku(n))}catch(e){if(e instanceof he)wt.warn(e.message);else{let t=tt.create("idb-get",{originalErrorMessage:e?.message});wt.warn(t.message)}}}async function Gu(n,e){try{let r=(await $u()).transaction(Ln,"readwrite");await r.objectStore(Ln).put(e,Ku(n)),await r.done}catch(t){if(t instanceof he)wt.warn(t.message);else{let r=tt.create("idb-set",{originalErrorMessage:t?.message});wt.warn(r.message)}}}function Ku(n){return`${n.name}!${n.options.appId}`}var hy=1024,dy=30*24*60*60*1e3,Oo=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Vo(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){let t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=zu();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(i=>{let s=new Date(i.date).valueOf();return Date.now()-s<=dy}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";let e=zu(),{heartbeatsToSend:t,unsentEntries:r}=fy(this._heartbeatsCache.heartbeats),i=xn(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}};function zu(){return new Date().toISOString().substring(0,10)}function fy(n,e=hy){let t=[],r=n.slice();for(let i of n){let s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Hu(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Hu(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Vo=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return bo()?Nu().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await uy(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Gu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Gu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function Hu(n){return xn(JSON.stringify({version:2,heartbeats:n})).length}function my(n){nt(new pe("platform-logger",e=>new Do(e),"PRIVATE")),nt(new pe("heartbeat",e=>new Oo(e),"PRIVATE")),ve(Po,ju,n),ve(Po,ju,"esm2017"),ve("fire-js","")}my("");var py=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ee={},g,sa=sa||{},A=py||self;function ui(n){var e=typeof n;return e=e!="object"?e:n?Array.isArray(n)?"array":e:"null",e=="array"||e=="object"&&typeof n.length=="number"}function Qn(n){var e=typeof n;return e=="object"&&n!=null||e=="function"}function gy(n){return Object.prototype.hasOwnProperty.call(n,Fo)&&n[Fo]||(n[Fo]=++yy)}var Fo="closure_uid_"+(1e9*Math.random()>>>0),yy=0;function _y(n,e,t){return n.call.apply(n.bind,arguments)}function vy(n,e,t){if(!n)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var i=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(i,r),n.apply(e,i)}}return function(){return n.apply(e,arguments)}}function re(n,e,t){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?re=_y:re=vy,re.apply(null,arguments)}function Yr(n,e){var t=Array.prototype.slice.call(arguments,1);return function(){var r=t.slice();return r.push.apply(r,arguments),n.apply(this,r)}}function Y(n,e){function t(){}t.prototype=e.prototype,n.$=e.prototype,n.prototype=new t,n.prototype.constructor=n,n.ac=function(r,i,s){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[i].apply(r,o)}}function it(){this.s=this.s,this.o=this.o}var wy=0;it.prototype.s=!1;it.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),wy!=0)&&gy(this)};it.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};var oh=Array.prototype.indexOf?function(n,e){return Array.prototype.indexOf.call(n,e,void 0)}:function(n,e){if(typeof n=="string")return typeof e!="string"||e.length!=1?-1:n.indexOf(e,0);for(let t=0;t<n.length;t++)if(t in n&&n[t]===e)return t;return-1};function oa(n){let e=n.length;if(0<e){let t=Array(e);for(let r=0;r<e;r++)t[r]=n[r];return t}return[]}function Wu(n,e){for(let t=1;t<arguments.length;t++){let r=arguments[t];if(ui(r)){let i=n.length||0,s=r.length||0;n.length=i+s;for(let o=0;o<s;o++)n[i+o]=r[o]}else n.push(r)}}function ie(n,e){this.type=n,this.g=this.target=e,this.defaultPrevented=!1}ie.prototype.h=function(){this.defaultPrevented=!0};var Ey=function(){if(!A.addEventListener||!Object.defineProperty)return!1;var n=!1,e=Object.defineProperty({},"passive",{get:function(){n=!0}});try{A.addEventListener("test",()=>{},e),A.removeEventListener("test",()=>{},e)}catch{}return n}();function Bn(n){return/^[\s\xa0]*$/.test(n)}function hi(){var n=A.navigator;return n&&(n=n.userAgent)?n:""}function Se(n){return hi().indexOf(n)!=-1}function aa(n){return aa[" "](n),n}aa[" "]=function(){};function by(n,e){var t=u_;return Object.prototype.hasOwnProperty.call(t,n)?t[n]:t[n]=e(n)}var Iy=Se("Opera"),en=Se("Trident")||Se("MSIE"),ah=Se("Edge"),Go=ah||en,ch=Se("Gecko")&&!(hi().toLowerCase().indexOf("webkit")!=-1&&!Se("Edge"))&&!(Se("Trident")||Se("MSIE"))&&!Se("Edge"),Ty=hi().toLowerCase().indexOf("webkit")!=-1&&!Se("Edge");function lh(){var n=A.document;return n?n.documentMode:void 0}var zo;e:{if(Jr="",Xr=function(){var n=hi();if(ch)return/rv:([^\);]+)(\)|;)/.exec(n);if(ah)return/Edge\/([\d\.]+)/.exec(n);if(en)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(n);if(Ty)return/WebKit\/(\S+)/.exec(n);if(Iy)return/(?:Version)[ \/]?(\S+)/.exec(n)}(),Xr&&(Jr=Xr?Xr[1]:""),en&&(Zr=lh(),Zr!=null&&Zr>parseFloat(Jr))){zo=String(Zr);break e}zo=Jr}var Jr,Xr,Zr,Ho;A.document&&en?(Uo=lh(),Ho=Uo||parseInt(zo,10)||void 0):Ho=void 0;var Uo,Ay=Ho;function jn(n,e){if(ie.call(this,n?n.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,n){var t=this.type=n.type,r=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:null;if(this.target=n.target||n.srcElement,this.g=e,e=n.relatedTarget){if(ch){e:{try{aa(e.nodeName);var i=!0;break e}catch{}i=!1}i||(e=null)}}else t=="mouseover"?e=n.fromElement:t=="mouseout"&&(e=n.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0),this.button=n.button,this.key=n.key||"",this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.pointerId=n.pointerId||0,this.pointerType=typeof n.pointerType=="string"?n.pointerType:Sy[n.pointerType]||"",this.state=n.state,this.i=n,n.defaultPrevented&&jn.$.h.call(this)}}Y(jn,ie);var Sy={2:"touch",3:"pen",4:"mouse"};jn.prototype.h=function(){jn.$.h.call(this);var n=this.i;n.preventDefault?n.preventDefault():n.returnValue=!1};var Yn="closure_listenable_"+(1e6*Math.random()|0),Cy=0;function Ry(n,e,t,r,i){this.listener=n,this.proxy=null,this.src=e,this.type=t,this.capture=!!r,this.la=i,this.key=++Cy,this.fa=this.ia=!1}function di(n){n.fa=!0,n.listener=null,n.proxy=null,n.src=null,n.la=null}function ca(n,e,t){for(let r in n)e.call(t,n[r],r,n)}function ky(n,e){for(let t in n)e.call(void 0,n[t],t,n)}function uh(n){let e={};for(let t in n)e[t]=n[t];return e}var Qu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function hh(n,e){let t,r;for(let i=1;i<arguments.length;i++){r=arguments[i];for(t in r)n[t]=r[t];for(let s=0;s<Qu.length;s++)t=Qu[s],Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}}function fi(n){this.src=n,this.g={},this.h=0}fi.prototype.add=function(n,e,t,r,i){var s=n.toString();n=this.g[s],n||(n=this.g[s]=[],this.h++);var o=Ko(n,e,r,i);return-1<o?(e=n[o],t||(e.ia=!1)):(e=new Ry(e,this.src,s,!!r,i),e.ia=t,n.push(e)),e};function $o(n,e){var t=e.type;if(t in n.g){var r=n.g[t],i=oh(r,e),s;(s=0<=i)&&Array.prototype.splice.call(r,i,1),s&&(di(e),n.g[t].length==0&&(delete n.g[t],n.h--))}}function Ko(n,e,t,r){for(var i=0;i<n.length;++i){var s=n[i];if(!s.fa&&s.listener==e&&s.capture==!!t&&s.la==r)return i}return-1}var la="closure_lm_"+(1e6*Math.random()|0),qo={};function dh(n,e,t,r,i){if(r&&r.once)return mh(n,e,t,r,i);if(Array.isArray(e)){for(var s=0;s<e.length;s++)dh(n,e[s],t,r,i);return null}return t=da(t),n&&n[Yn]?n.O(e,t,Qn(r)?!!r.capture:!!r,i):fh(n,e,t,!1,r,i)}function fh(n,e,t,r,i,s){if(!e)throw Error("Invalid event type");var o=Qn(i)?!!i.capture:!!i,a=ha(n);if(a||(n[la]=a=new fi(n)),t=a.add(e,t,r,o,s),t.proxy)return t;if(r=Dy(),t.proxy=r,r.src=n,r.listener=t,n.addEventListener)Ey||(i=o),i===void 0&&(i=!1),n.addEventListener(e.toString(),r,i);else if(n.attachEvent)n.attachEvent(gh(e.toString()),r);else if(n.addListener&&n.removeListener)n.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return t}function Dy(){function n(t){return e.call(n.src,n.listener,t)}let e=Py;return n}function mh(n,e,t,r,i){if(Array.isArray(e)){for(var s=0;s<e.length;s++)mh(n,e[s],t,r,i);return null}return t=da(t),n&&n[Yn]?n.P(e,t,Qn(r)?!!r.capture:!!r,i):fh(n,e,t,!0,r,i)}function ph(n,e,t,r,i){if(Array.isArray(e))for(var s=0;s<e.length;s++)ph(n,e[s],t,r,i);else r=Qn(r)?!!r.capture:!!r,t=da(t),n&&n[Yn]?(n=n.i,e=String(e).toString(),e in n.g&&(s=n.g[e],t=Ko(s,t,r,i),-1<t&&(di(s[t]),Array.prototype.splice.call(s,t,1),s.length==0&&(delete n.g[e],n.h--)))):n&&(n=ha(n))&&(e=n.g[e.toString()],n=-1,e&&(n=Ko(e,t,r,i)),(t=-1<n?e[n]:null)&&ua(t))}function ua(n){if(typeof n!="number"&&n&&!n.fa){var e=n.src;if(e&&e[Yn])$o(e.i,n);else{var t=n.type,r=n.proxy;e.removeEventListener?e.removeEventListener(t,r,n.capture):e.detachEvent?e.detachEvent(gh(t),r):e.addListener&&e.removeListener&&e.removeListener(r),(t=ha(e))?($o(t,n),t.h==0&&(t.src=null,e[la]=null)):di(n)}}}function gh(n){return n in qo?qo[n]:qo[n]="on"+n}function Py(n,e){if(n.fa)n=!0;else{e=new jn(e,this);var t=n.listener,r=n.la||n.src;n.ia&&ua(n),n=t.call(r,e)}return n}function ha(n){return n=n[la],n instanceof fi?n:null}var Bo="__closure_events_fn_"+(1e9*Math.random()>>>0);function da(n){return typeof n=="function"?n:(n[Bo]||(n[Bo]=function(e){return n.handleEvent(e)}),n[Bo])}function Q(){it.call(this),this.i=new fi(this),this.S=this,this.J=null}Y(Q,it);Q.prototype[Yn]=!0;Q.prototype.removeEventListener=function(n,e,t,r){ph(this,n,e,t,r)};function Z(n,e){var t,r=n.J;if(r)for(t=[];r;r=r.J)t.push(r);if(n=n.S,r=e.type||e,typeof e=="string")e=new ie(e,n);else if(e instanceof ie)e.target=e.target||n;else{var i=e;e=new ie(r,n),hh(e,i)}if(i=!0,t)for(var s=t.length-1;0<=s;s--){var o=e.g=t[s];i=ei(o,r,!0,e)&&i}if(o=e.g=n,i=ei(o,r,!0,e)&&i,i=ei(o,r,!1,e)&&i,t)for(s=0;s<t.length;s++)o=e.g=t[s],i=ei(o,r,!1,e)&&i}Q.prototype.N=function(){if(Q.$.N.call(this),this.i){var n=this.i,e;for(e in n.g){for(var t=n.g[e],r=0;r<t.length;r++)di(t[r]);delete n.g[e],n.h--}}this.J=null};Q.prototype.O=function(n,e,t,r){return this.i.add(String(n),e,!1,t,r)};Q.prototype.P=function(n,e,t,r){return this.i.add(String(n),e,!0,t,r)};function ei(n,e,t,r){if(e=n.i.g[String(e)],!e)return!0;e=e.concat();for(var i=!0,s=0;s<e.length;++s){var o=e[s];if(o&&!o.fa&&o.capture==t){var a=o.listener,c=o.la||o.src;o.ia&&$o(n.i,o),i=a.call(c,r)!==!1&&i}}return i&&!r.defaultPrevented}var fa=A.JSON.stringify,Wo=class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}};function Ny(){var n=ma;let e=null;return n.g&&(e=n.g,n.g=n.g.next,n.g||(n.h=null),e.next=null),e}var Qo=class{constructor(){this.h=this.g=null}add(e,t){let r=yh.get();r.set(e,t),this.h?this.h.next=r:this.g=r,this.h=r}},yh=new Wo(()=>new Yo,n=>n.reset()),Yo=class{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}};function xy(n){var e=1;n=n.split(":");let t=[];for(;0<e&&n.length;)t.push(n.shift()),e--;return n.length&&t.push(n.join(":")),t}function Ly(n){A.setTimeout(()=>{throw n},0)}var Gn,zn=!1,ma=new Qo,_h=()=>{let n=A.Promise.resolve(void 0);Gn=()=>{n.then(Oy)}},Oy=()=>{for(var n;n=Ny();){try{n.h.call(n.g)}catch(t){Ly(t)}var e=yh;e.j(n),100>e.h&&(e.h++,n.next=e.g,e.g=n)}zn=!1};function mi(n,e){Q.call(this),this.h=n||1,this.g=e||A,this.j=re(this.qb,this),this.l=Date.now()}Y(mi,Q);g=mi.prototype;g.ga=!1;g.T=null;g.qb=function(){if(this.ga){var n=Date.now()-this.l;0<n&&n<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-n):(this.T&&(this.g.clearTimeout(this.T),this.T=null),Z(this,"tick"),this.ga&&(pa(this),this.start()))}};g.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function pa(n){n.ga=!1,n.T&&(n.g.clearTimeout(n.T),n.T=null)}g.N=function(){mi.$.N.call(this),pa(this),delete this.g};function ga(n,e,t){if(typeof n=="function")t&&(n=re(n,t));else if(n&&typeof n.handleEvent=="function")n=re(n.handleEvent,n);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:A.setTimeout(n,e||0)}function vh(n){n.g=ga(()=>{n.g=null,n.i&&(n.i=!1,vh(n))},n.j);let e=n.h;n.h=null,n.m.apply(null,e)}var Jo=class extends it{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:vh(this)}N(){super.N(),this.g&&(A.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}};function Hn(n){it.call(this),this.h=n,this.g={}}Y(Hn,it);var Yu=[];function wh(n,e,t,r){Array.isArray(t)||(t&&(Yu[0]=t.toString()),t=Yu);for(var i=0;i<t.length;i++){var s=dh(e,t[i],r||n.handleEvent,!1,n.h||n);if(!s)break;n.g[s.key]=s}}function Eh(n){ca(n.g,function(e,t){this.g.hasOwnProperty(t)&&ua(e)},n),n.g={}}Hn.prototype.N=function(){Hn.$.N.call(this),Eh(this)};Hn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function pi(){this.g=!0}pi.prototype.Ea=function(){this.g=!1};function Vy(n,e,t,r,i,s){n.info(function(){if(n.g)if(s)for(var o="",a=s.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var h=u.split("_");o=2<=h.length&&h[1]=="type"?o+(u+"="+l+"&"):o+(u+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+e+`
`+t+`
`+o})}function My(n,e,t,r,i,s,o){n.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+e+`
`+t+`
`+s+" "+o})}function Xt(n,e,t,r){n.info(function(){return"XMLHTTP TEXT ("+e+"): "+Uy(n,t)+(r?" "+r:"")})}function Fy(n,e){n.info(function(){return"TIMEOUT: "+e})}pi.prototype.info=function(){};function Uy(n,e){if(!n.g)return e;if(!e)return null;try{var t=JSON.parse(e);if(t){for(n=0;n<t.length;n++)if(Array.isArray(t[n])){var r=t[n];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if(s!="noop"&&s!="stop"&&s!="close")for(var o=1;o<i.length;o++)i[o]=""}}}}return fa(t)}catch{return e}}var Tt={},Ju=null;function gi(){return Ju=Ju||new Q}Tt.Ta="serverreachability";function bh(n){ie.call(this,Tt.Ta,n)}Y(bh,ie);function $n(n){let e=gi();Z(e,new bh(e))}Tt.STAT_EVENT="statevent";function Ih(n,e){ie.call(this,Tt.STAT_EVENT,n),this.stat=e}Y(Ih,ie);function ae(n){let e=gi();Z(e,new Ih(e,n))}Tt.Ua="timingevent";function Th(n,e){ie.call(this,Tt.Ua,n),this.size=e}Y(Th,ie);function Jn(n,e){if(typeof n!="function")throw Error("Fn must not be null and must be a function");return A.setTimeout(function(){n()},e)}var yi={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},Ah={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function ya(){}ya.prototype.h=null;function Xu(n){return n.h||(n.h=n.i())}function Sh(){}var Xn={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function _a(){ie.call(this,"d")}Y(_a,ie);function va(){ie.call(this,"c")}Y(va,ie);var Xo;function _i(){}Y(_i,ya);_i.prototype.g=function(){return new XMLHttpRequest};_i.prototype.i=function(){return{}};Xo=new _i;function Zn(n,e,t,r){this.l=n,this.j=e,this.m=t,this.W=r||1,this.U=new Hn(this),this.P=qy,n=Go?125:void 0,this.V=new mi(n),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new Ch}function Ch(){this.i=null,this.g="",this.h=!1}var qy=45e3,Zo={},ri={};g=Zn.prototype;g.setTimeout=function(n){this.P=n};function ea(n,e,t){n.L=1,n.v=wi(He(e)),n.s=t,n.S=!0,Rh(n,null)}function Rh(n,e){n.G=Date.now(),er(n),n.A=He(n.v);var t=n.A,r=n.W;Array.isArray(r)||(r=[String(r)]),Vh(t.i,"t",r),n.C=0,t=n.l.J,n.h=new Ch,n.g=rd(n.l,t?e:null,!n.s),0<n.O&&(n.M=new Jo(re(n.Pa,n,n.g),n.O)),wh(n.U,n.g,"readystatechange",n.nb),e=n.I?uh(n.I):{},n.s?(n.u||(n.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",n.g.ha(n.A,n.u,n.s,e)):(n.u="GET",n.g.ha(n.A,n.u,null,e)),$n(),Vy(n.j,n.u,n.A,n.m,n.W,n.s)}g.nb=function(n){n=n.target;let e=this.M;e&&Ce(n)==3?e.l():this.Pa(n)};g.Pa=function(n){try{if(n==this.g)e:{let u=Ce(this.g);var e=this.g.Ia();let h=this.g.da();if(!(3>u)&&(u!=3||Go||this.g&&(this.h.h||this.g.ja()||nh(this.g)))){this.J||u!=4||e==7||(e==8||0>=h?$n(3):$n(2)),vi(this);var t=this.g.da();this.ca=t;t:if(kh(this)){var r=nh(this.g);n="";var i=r.length,s=Ce(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Et(this),qn(this);var o="";break t}this.h.i=new A.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,n+=this.h.i.decode(r[e],{stream:s&&e==i-1});r.splice(0,i),this.h.g+=n,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=t==200,My(this.j,this.u,this.A,this.m,this.W,u,t),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Bn(a)){var l=a;break t}}l=null}if(t=l)Xt(this.j,this.m,t,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ta(this,t);else{this.i=!1,this.o=3,ae(12),Et(this),qn(this);break e}}this.S?(Dh(this,u,o),Go&&this.i&&u==3&&(wh(this.U,this.V,"tick",this.mb),this.V.start())):(Xt(this.j,this.m,o,null),ta(this,o)),u==4&&Et(this),this.i&&!this.J&&(u==4?Zh(this.l,this):(this.i=!1,er(this)))}else a_(this.g),t==400&&0<o.indexOf("Unknown SID")?(this.o=3,ae(12)):(this.o=0,ae(13)),Et(this),qn(this)}}}catch{}finally{}};function kh(n){return n.g?n.u=="GET"&&n.L!=2&&n.l.Ha:!1}function Dh(n,e,t){let r=!0,i;for(;!n.J&&n.C<t.length;)if(i=By(n,t),i==ri){e==4&&(n.o=4,ae(14),r=!1),Xt(n.j,n.m,null,"[Incomplete Response]");break}else if(i==Zo){n.o=4,ae(15),Xt(n.j,n.m,t,"[Invalid Chunk]"),r=!1;break}else Xt(n.j,n.m,i,null),ta(n,i);kh(n)&&i!=ri&&i!=Zo&&(n.h.g="",n.C=0),e!=4||t.length!=0||n.h.h||(n.o=1,ae(16),r=!1),n.i=n.i&&r,r?0<t.length&&!n.ba&&(n.ba=!0,e=n.l,e.g==n&&e.ca&&!e.M&&(e.l.info("Great, no buffering proxy detected. Bytes received: "+t.length),Aa(e),e.M=!0,ae(11))):(Xt(n.j,n.m,t,"[Invalid Chunked Response]"),Et(n),qn(n))}g.mb=function(){if(this.g){var n=Ce(this.g),e=this.g.ja();this.C<e.length&&(vi(this),Dh(this,n,e),this.i&&n!=4&&er(this))}};function By(n,e){var t=n.C,r=e.indexOf(`
`,t);return r==-1?ri:(t=Number(e.substring(t,r)),isNaN(t)?Zo:(r+=1,r+t>e.length?ri:(e=e.slice(r,r+t),n.C=r+t,e)))}g.cancel=function(){this.J=!0,Et(this)};function er(n){n.Y=Date.now()+n.P,Ph(n,n.P)}function Ph(n,e){if(n.B!=null)throw Error("WatchDog timer not null");n.B=Jn(re(n.lb,n),e)}function vi(n){n.B&&(A.clearTimeout(n.B),n.B=null)}g.lb=function(){this.B=null;let n=Date.now();0<=n-this.Y?(Fy(this.j,this.A),this.L!=2&&($n(),ae(17)),Et(this),this.o=2,qn(this)):Ph(this,this.Y-n)};function qn(n){n.l.H==0||n.J||Zh(n.l,n)}function Et(n){vi(n);var e=n.M;e&&typeof e.sa=="function"&&e.sa(),n.M=null,pa(n.V),Eh(n.U),n.g&&(e=n.g,n.g=null,e.abort(),e.sa())}function ta(n,e){try{var t=n.l;if(t.H!=0&&(t.g==n||na(t.i,n))){if(!n.K&&na(t.i,n)&&t.H==3){try{var r=t.Ja.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var i=r;if(i[0]==0){e:if(!t.u){if(t.g)if(t.g.G+3e3<n.G)oi(t),Ii(t);else break e;Ta(t),ae(18)}}else t.Fa=i[1],0<t.Fa-t.V&&37500>i[2]&&t.G&&t.A==0&&!t.v&&(t.v=Jn(re(t.ib,t),6e3));if(1>=Uh(t.i)&&t.oa){try{t.oa()}catch{}t.oa=void 0}}else bt(t,11)}else if((n.K||t.g==n)&&oi(t),!Bn(e))for(i=t.Ja.g.parse(e),e=0;e<i.length;e++){let l=i[e];if(t.V=l[0],l=l[1],t.H==2)if(l[0]=="c"){t.K=l[1],t.pa=l[2];let u=l[3];u!=null&&(t.ra=u,t.l.info("VER="+t.ra));let h=l[4];h!=null&&(t.Ga=h,t.l.info("SVER="+t.Ga));let d=l[5];d!=null&&typeof d=="number"&&0<d&&(r=1.5*d,t.L=r,t.l.info("backChannelRequestTimeoutMs_="+r)),r=t;let f=n.g;if(f){let b=f.g?f.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(b){var s=r.i;s.g||b.indexOf("spdy")==-1&&b.indexOf("quic")==-1&&b.indexOf("h2")==-1||(s.j=s.l,s.g=new Set,s.h&&(wa(s,s.h),s.h=null))}if(r.F){let T=f.g?f.g.getResponseHeader("X-HTTP-Session-Id"):null;T&&(r.Da=T,V(r.I,r.F,T))}}t.H=3,t.h&&t.h.Ba(),t.ca&&(t.S=Date.now()-n.G,t.l.info("Handshake RTT: "+t.S+"ms")),r=t;var o=n;if(r.wa=nd(r,r.J?r.pa:null,r.Y),o.K){qh(r.i,o);var a=o,c=r.L;c&&a.setTimeout(c),a.B&&(vi(a),er(a)),r.g=o}else Jh(r);0<t.j.length&&Ti(t)}else l[0]!="stop"&&l[0]!="close"||bt(t,7);else t.H==3&&(l[0]=="stop"||l[0]=="close"?l[0]=="stop"?bt(t,7):Ia(t):l[0]!="noop"&&t.h&&t.h.Aa(l),t.A=0)}}$n(4)}catch{}}function jy(n){if(n.Z&&typeof n.Z=="function")return n.Z();if(typeof Map<"u"&&n instanceof Map||typeof Set<"u"&&n instanceof Set)return Array.from(n.values());if(typeof n=="string")return n.split("");if(ui(n)){for(var e=[],t=n.length,r=0;r<t;r++)e.push(n[r]);return e}e=[],t=0;for(r in n)e[t++]=n[r];return e}function Gy(n){if(n.ta&&typeof n.ta=="function")return n.ta();if(!n.Z||typeof n.Z!="function"){if(typeof Map<"u"&&n instanceof Map)return Array.from(n.keys());if(!(typeof Set<"u"&&n instanceof Set)){if(ui(n)||typeof n=="string"){var e=[];n=n.length;for(var t=0;t<n;t++)e.push(t);return e}e=[],t=0;for(let r in n)e[t++]=r;return e}}}function Nh(n,e){if(n.forEach&&typeof n.forEach=="function")n.forEach(e,void 0);else if(ui(n)||typeof n=="string")Array.prototype.forEach.call(n,e,void 0);else for(var t=Gy(n),r=jy(n),i=r.length,s=0;s<i;s++)e.call(void 0,r[s],t&&t[s],n)}var xh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function zy(n,e){if(n){n=n.split("&");for(var t=0;t<n.length;t++){var r=n[t].indexOf("="),i=null;if(0<=r){var s=n[t].substring(0,r);i=n[t].substring(r+1)}else s=n[t];e(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}function It(n){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,n instanceof It){this.h=n.h,ii(this,n.j),this.s=n.s,this.g=n.g,si(this,n.m),this.l=n.l;var e=n.i,t=new Kn;t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),Zu(this,t),this.o=n.o}else n&&(e=String(n).match(xh))?(this.h=!1,ii(this,e[1]||"",!0),this.s=Fn(e[2]||""),this.g=Fn(e[3]||"",!0),si(this,e[4]),this.l=Fn(e[5]||"",!0),Zu(this,e[6]||"",!0),this.o=Fn(e[7]||"")):(this.h=!1,this.i=new Kn(null,this.h))}It.prototype.toString=function(){var n=[],e=this.j;e&&n.push(Un(e,eh,!0),":");var t=this.g;return(t||e=="file")&&(n.push("//"),(e=this.s)&&n.push(Un(e,eh,!0),"@"),n.push(encodeURIComponent(String(t)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t=this.m,t!=null&&n.push(":",String(t))),(t=this.l)&&(this.g&&t.charAt(0)!="/"&&n.push("/"),n.push(Un(t,t.charAt(0)=="/"?Ky:$y,!0))),(t=this.i.toString())&&n.push("?",t),(t=this.o)&&n.push("#",Un(t,Qy)),n.join("")};function He(n){return new It(n)}function ii(n,e,t){n.j=t?Fn(e,!0):e,n.j&&(n.j=n.j.replace(/:$/,""))}function si(n,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);n.m=e}else n.m=null}function Zu(n,e,t){e instanceof Kn?(n.i=e,Yy(n.i,n.h)):(t||(e=Un(e,Wy)),n.i=new Kn(e,n.h))}function V(n,e,t){n.i.set(e,t)}function wi(n){return V(n,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),n}function Fn(n,e){return n?e?decodeURI(n.replace(/%25/g,"%2525")):decodeURIComponent(n):""}function Un(n,e,t){return typeof n=="string"?(n=encodeURI(n).replace(e,Hy),t&&(n=n.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n):null}function Hy(n){return n=n.charCodeAt(0),"%"+(n>>4&15).toString(16)+(n&15).toString(16)}var eh=/[#\/\?@]/g,$y=/[#\?:]/g,Ky=/[#\?]/g,Wy=/[#\?@]/g,Qy=/#/g;function Kn(n,e){this.h=this.g=null,this.i=n||null,this.j=!!e}function st(n){n.g||(n.g=new Map,n.h=0,n.i&&zy(n.i,function(e,t){n.add(decodeURIComponent(e.replace(/\+/g," ")),t)}))}g=Kn.prototype;g.add=function(n,e){st(this),this.i=null,n=tn(this,n);var t=this.g.get(n);return t||this.g.set(n,t=[]),t.push(e),this.h+=1,this};function Lh(n,e){st(n),e=tn(n,e),n.g.has(e)&&(n.i=null,n.h-=n.g.get(e).length,n.g.delete(e))}function Oh(n,e){return st(n),e=tn(n,e),n.g.has(e)}g.forEach=function(n,e){st(this),this.g.forEach(function(t,r){t.forEach(function(i){n.call(e,i,r,this)},this)},this)};g.ta=function(){st(this);let n=Array.from(this.g.values()),e=Array.from(this.g.keys()),t=[];for(let r=0;r<e.length;r++){let i=n[r];for(let s=0;s<i.length;s++)t.push(e[r])}return t};g.Z=function(n){st(this);let e=[];if(typeof n=="string")Oh(this,n)&&(e=e.concat(this.g.get(tn(this,n))));else{n=Array.from(this.g.values());for(let t=0;t<n.length;t++)e=e.concat(n[t])}return e};g.set=function(n,e){return st(this),this.i=null,n=tn(this,n),Oh(this,n)&&(this.h-=this.g.get(n).length),this.g.set(n,[e]),this.h+=1,this};g.get=function(n,e){return n?(n=this.Z(n),0<n.length?String(n[0]):e):e};function Vh(n,e,t){Lh(n,e),0<t.length&&(n.i=null,n.g.set(tn(n,e),oa(t)),n.h+=t.length)}g.toString=function(){if(this.i)return this.i;if(!this.g)return"";let n=[],e=Array.from(this.g.keys());for(var t=0;t<e.length;t++){var r=e[t];let s=encodeURIComponent(String(r)),o=this.Z(r);for(r=0;r<o.length;r++){var i=s;o[r]!==""&&(i+="="+encodeURIComponent(String(o[r]))),n.push(i)}}return this.i=n.join("&")};function tn(n,e){return e=String(e),n.j&&(e=e.toLowerCase()),e}function Yy(n,e){e&&!n.j&&(st(n),n.i=null,n.g.forEach(function(t,r){var i=r.toLowerCase();r!=i&&(Lh(this,r),Vh(this,i,t))},n)),n.j=e}var Jy=class{constructor(n,e){this.g=n,this.map=e}};function Mh(n){this.l=n||Xy,A.PerformanceNavigationTiming?(n=A.performance.getEntriesByType("navigation"),n=0<n.length&&(n[0].nextHopProtocol=="hq"||n[0].nextHopProtocol=="h2")):n=!!(A.g&&A.g.Ka&&A.g.Ka()&&A.g.Ka().ec),this.j=n?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Xy=10;function Fh(n){return n.h?!0:n.g?n.g.size>=n.j:!1}function Uh(n){return n.h?1:n.g?n.g.size:0}function na(n,e){return n.h?n.h==e:n.g?n.g.has(e):!1}function wa(n,e){n.g?n.g.add(e):n.h=e}function qh(n,e){n.h&&n.h==e?n.h=null:n.g&&n.g.has(e)&&n.g.delete(e)}Mh.prototype.cancel=function(){if(this.i=Bh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let n of this.g.values())n.cancel();this.g.clear()}};function Bh(n){if(n.h!=null)return n.i.concat(n.h.F);if(n.g!=null&&n.g.size!==0){let e=n.i;for(let t of n.g.values())e=e.concat(t.F);return e}return oa(n.i)}var Zy=class{stringify(n){return A.JSON.stringify(n,void 0)}parse(n){return A.JSON.parse(n,void 0)}};function e_(){this.g=new Zy}function t_(n,e,t){let r=t||"";try{Nh(n,function(i,s){let o=i;Qn(i)&&(o=fa(i)),e.push(r+s+"="+encodeURIComponent(o))})}catch(i){throw e.push(r+"type="+encodeURIComponent("_badmap")),i}}function n_(n,e){let t=new pi;if(A.Image){let r=new Image;r.onload=Yr(ti,t,r,"TestLoadImage: loaded",!0,e),r.onerror=Yr(ti,t,r,"TestLoadImage: error",!1,e),r.onabort=Yr(ti,t,r,"TestLoadImage: abort",!1,e),r.ontimeout=Yr(ti,t,r,"TestLoadImage: timeout",!1,e),A.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=n}else e(!1)}function ti(n,e,t,r,i){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,i(r)}catch{}}function tr(n){this.l=n.fc||null,this.j=n.ob||!1}Y(tr,ya);tr.prototype.g=function(){return new Ei(this.l,this.j)};tr.prototype.i=function(n){return function(){return n}}({});function Ei(n,e){Q.call(this),this.F=n,this.u=e,this.m=void 0,this.readyState=Ea,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}Y(Ei,Q);var Ea=0;g=Ei.prototype;g.open=function(n,e){if(this.readyState!=Ea)throw this.abort(),Error("Error reopening a connection");this.C=n,this.B=e,this.readyState=1,Wn(this)};g.send=function(n){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};n&&(e.body=n),(this.F||A).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))};g.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,nr(this)),this.readyState=Ea};g.$a=function(n){if(this.g&&(this.l=n,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=n.headers,this.readyState=2,Wn(this)),this.g&&(this.readyState=3,Wn(this),this.g)))if(this.responseType==="arraybuffer")n.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof A.ReadableStream<"u"&&"body"in n){if(this.j=n.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;jh(this)}else n.text().then(this.Za.bind(this),this.ka.bind(this))};function jh(n){n.j.read().then(n.Xa.bind(n)).catch(n.ka.bind(n))}g.Xa=function(n){if(this.g){if(this.u&&n.value)this.response.push(n.value);else if(!this.u){var e=n.value?n.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!n.done}))&&(this.response=this.responseText+=e)}n.done?nr(this):Wn(this),this.readyState==3&&jh(this)}};g.Za=function(n){this.g&&(this.response=this.responseText=n,nr(this))};g.Ya=function(n){this.g&&(this.response=n,nr(this))};g.ka=function(){this.g&&nr(this)};function nr(n){n.readyState=4,n.l=null,n.j=null,n.A=null,Wn(n)}g.setRequestHeader=function(n,e){this.v.append(n,e)};g.getResponseHeader=function(n){return this.h&&this.h.get(n.toLowerCase())||""};g.getAllResponseHeaders=function(){if(!this.h)return"";let n=[],e=this.h.entries();for(var t=e.next();!t.done;)t=t.value,n.push(t[0]+": "+t[1]),t=e.next();return n.join(`\r
`)};function Wn(n){n.onreadystatechange&&n.onreadystatechange.call(n)}Object.defineProperty(Ei.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(n){this.m=n?"include":"same-origin"}});var r_=A.JSON.parse;function F(n){Q.call(this),this.headers=new Map,this.u=n||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=Gh,this.L=this.M=!1}Y(F,Q);var Gh="",i_=/^https?$/i,s_=["POST","PUT"];g=F.prototype;g.Oa=function(n){this.M=n};g.ha=function(n,e,t,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+n);e=e?e.toUpperCase():"GET",this.I=n,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():Xo.g(),this.C=this.u?Xu(this.u):Xu(Xo),this.g.onreadystatechange=re(this.La,this);try{this.G=!0,this.g.open(e,String(n),!0),this.G=!1}catch(s){th(this,s);return}if(n=t||"",t=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)t.set(i,r[i]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(let s of r.keys())t.set(s,r.get(s));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(t.keys()).find(s=>s.toLowerCase()=="content-type"),i=A.FormData&&n instanceof A.FormData,!(0<=oh(s_,e))||r||i||t.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[s,o]of t)this.g.setRequestHeader(s,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{$h(this),0<this.B&&((this.L=o_(this.g))?(this.g.timeout=this.B,this.g.ontimeout=re(this.ua,this)):this.A=ga(this.ua,this.B,this)),this.v=!0,this.g.send(n),this.v=!1}catch(s){th(this,s)}};function o_(n){return en&&typeof n.timeout=="number"&&n.ontimeout!==void 0}g.ua=function(){typeof sa<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,Z(this,"timeout"),this.abort(8))};function th(n,e){n.h=!1,n.g&&(n.l=!0,n.g.abort(),n.l=!1),n.j=e,n.m=5,zh(n),bi(n)}function zh(n){n.F||(n.F=!0,Z(n,"complete"),Z(n,"error"))}g.abort=function(n){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=n||7,Z(this,"complete"),Z(this,"abort"),bi(this))};g.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),bi(this,!0)),F.$.N.call(this)};g.La=function(){this.s||(this.G||this.v||this.l?Hh(this):this.kb())};g.kb=function(){Hh(this)};function Hh(n){if(n.h&&typeof sa<"u"&&(!n.C[1]||Ce(n)!=4||n.da()!=2)){if(n.v&&Ce(n)==4)ga(n.La,0,n);else if(Z(n,"readystatechange"),Ce(n)==4){n.h=!1;try{let o=n.da();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var t;if(!(t=e)){var r;if(r=o===0){var i=String(n.I).match(xh)[1]||null;!i&&A.self&&A.self.location&&(i=A.self.location.protocol.slice(0,-1)),r=!i_.test(i?i.toLowerCase():"")}t=r}if(t)Z(n,"complete"),Z(n,"success");else{n.m=6;try{var s=2<Ce(n)?n.g.statusText:""}catch{s=""}n.j=s+" ["+n.da()+"]",zh(n)}}finally{bi(n)}}}}function bi(n,e){if(n.g){$h(n);let t=n.g,r=n.C[0]?()=>{}:null;n.g=null,n.C=null,e||Z(n,"ready");try{t.onreadystatechange=r}catch{}}}function $h(n){n.g&&n.L&&(n.g.ontimeout=null),n.A&&(A.clearTimeout(n.A),n.A=null)}g.isActive=function(){return!!this.g};function Ce(n){return n.g?n.g.readyState:0}g.da=function(){try{return 2<Ce(this)?this.g.status:-1}catch{return-1}};g.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};g.Wa=function(n){if(this.g){var e=this.g.responseText;return n&&e.indexOf(n)==0&&(e=e.substring(n.length)),r_(e)}};function nh(n){try{if(!n.g)return null;if("response"in n.g)return n.g.response;switch(n.K){case Gh:case"text":return n.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in n.g)return n.g.mozResponseArrayBuffer}return null}catch{return null}}function a_(n){let e={};n=(n.g&&2<=Ce(n)&&n.g.getAllResponseHeaders()||"").split(`\r
`);for(let r=0;r<n.length;r++){if(Bn(n[r]))continue;var t=xy(n[r]);let i=t[0];if(t=t[1],typeof t!="string")continue;t=t.trim();let s=e[i]||[];e[i]=s,s.push(t)}ky(e,function(r){return r.join(", ")})}g.Ia=function(){return this.m};g.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function Kh(n){let e="";return ca(n,function(t,r){e+=r,e+=":",e+=t,e+=`\r
`}),e}function ba(n,e,t){e:{for(r in t){var r=!1;break e}r=!0}r||(t=Kh(t),typeof n=="string"?t!=null&&encodeURIComponent(String(t)):V(n,e,t))}function Vn(n,e,t){return t&&t.internalChannelParams&&t.internalChannelParams[n]||e}function Wh(n){this.Ga=0,this.j=[],this.l=new pi,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=Vn("failFast",!1,n),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=Vn("baseRetryDelayMs",5e3,n),this.hb=Vn("retryDelaySeedMs",1e4,n),this.eb=Vn("forwardChannelMaxRetries",2,n),this.xa=Vn("forwardChannelRequestTimeoutMs",2e4,n),this.va=n&&n.xmlHttpFactory||void 0,this.Ha=n&&n.dc||!1,this.L=void 0,this.J=n&&n.supportsCrossDomainXhr||!1,this.K="",this.i=new Mh(n&&n.concurrentRequestLimit),this.Ja=new e_,this.P=n&&n.fastHandshake||!1,this.O=n&&n.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=n&&n.bc||!1,n&&n.Ea&&this.l.Ea(),n&&n.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&n&&n.detectBufferingProxy||!1,this.qa=void 0,n&&n.longPollingTimeout&&0<n.longPollingTimeout&&(this.qa=n.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}g=Wh.prototype;g.ra=8;g.H=1;function Ia(n){if(Qh(n),n.H==3){var e=n.W++,t=He(n.I);if(V(t,"SID",n.K),V(t,"RID",e),V(t,"TYPE","terminate"),rr(n,t),e=new Zn(n,n.l,e),e.L=2,e.v=wi(He(t)),t=!1,A.navigator&&A.navigator.sendBeacon)try{t=A.navigator.sendBeacon(e.v.toString(),"")}catch{}!t&&A.Image&&(new Image().src=e.v,t=!0),t||(e.g=rd(e.l,null),e.g.ha(e.v)),e.G=Date.now(),er(e)}td(n)}function Ii(n){n.g&&(Aa(n),n.g.cancel(),n.g=null)}function Qh(n){Ii(n),n.u&&(A.clearTimeout(n.u),n.u=null),oi(n),n.i.cancel(),n.m&&(typeof n.m=="number"&&A.clearTimeout(n.m),n.m=null)}function Ti(n){if(!Fh(n.i)&&!n.m){n.m=!0;var e=n.Na;Gn||_h(),zn||(Gn(),zn=!0),ma.add(e,n),n.C=0}}function c_(n,e){return Uh(n.i)>=n.i.j-(n.m?1:0)?!1:n.m?(n.j=e.F.concat(n.j),!0):n.H==1||n.H==2||n.C>=(n.cb?0:n.eb)?!1:(n.m=Jn(re(n.Na,n,e),ed(n,n.C)),n.C++,!0)}g.Na=function(n){if(this.m)if(this.m=null,this.H==1){if(!n){this.W=Math.floor(1e5*Math.random()),n=this.W++;let i=new Zn(this,this.l,n),s=this.s;if(this.U&&(s?(s=uh(s),hh(s,this.U)):s=this.U),this.o!==null||this.O||(i.I=s,s=null),this.P)e:{for(var e=0,t=0;t<this.j.length;t++){t:{var r=this.j[t];if("__data__"in r.map&&(r=r.map.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=t;break e}if(e===4096||t===this.j.length-1){e=t+1;break e}}e=1e3}else e=1e3;e=Yh(this,i,e),t=He(this.I),V(t,"RID",n),V(t,"CVER",22),this.F&&V(t,"X-HTTP-Session-Id",this.F),rr(this,t),s&&(this.O?e="headers="+encodeURIComponent(String(Kh(s)))+"&"+e:this.o&&ba(t,this.o,s)),wa(this.i,i),this.bb&&V(t,"TYPE","init"),this.P?(V(t,"$req",e),V(t,"SID","null"),i.aa=!0,ea(i,t,null)):ea(i,t,e),this.H=2}}else this.H==3&&(n?rh(this,n):this.j.length==0||Fh(this.i)||rh(this))};function rh(n,e){var t;e?t=e.m:t=n.W++;let r=He(n.I);V(r,"SID",n.K),V(r,"RID",t),V(r,"AID",n.V),rr(n,r),n.o&&n.s&&ba(r,n.o,n.s),t=new Zn(n,n.l,t,n.C+1),n.o===null&&(t.I=n.s),e&&(n.j=e.F.concat(n.j)),e=Yh(n,t,1e3),t.setTimeout(Math.round(.5*n.xa)+Math.round(.5*n.xa*Math.random())),wa(n.i,t),ea(t,r,e)}function rr(n,e){n.na&&ca(n.na,function(t,r){V(e,r,t)}),n.h&&Nh({},function(t,r){V(e,r,t)})}function Yh(n,e,t){t=Math.min(n.j.length,t);var r=n.h?re(n.h.Va,n.h,n):null;e:{var i=n.j;let s=-1;for(;;){let o=["count="+t];s==-1?0<t?(s=i[0].g,o.push("ofs="+s)):s=0:o.push("ofs="+s);let a=!0;for(let c=0;c<t;c++){let l=i[c].g,u=i[c].map;if(l-=s,0>l)s=Math.max(0,i[c].g-100),a=!1;else try{t_(u,o,"req"+l+"_")}catch{r&&r(u)}}if(a){r=o.join("&");break e}}}return n=n.j.splice(0,t),e.F=n,r}function Jh(n){if(!n.g&&!n.u){n.ba=1;var e=n.Ma;Gn||_h(),zn||(Gn(),zn=!0),ma.add(e,n),n.A=0}}function Ta(n){return n.g||n.u||3<=n.A?!1:(n.ba++,n.u=Jn(re(n.Ma,n),ed(n,n.A)),n.A++,!0)}g.Ma=function(){if(this.u=null,Xh(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var n=2*this.S;this.l.info("BP detection timer enabled: "+n),this.B=Jn(re(this.jb,this),n)}};g.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,ae(10),Ii(this),Xh(this))};function Aa(n){n.B!=null&&(A.clearTimeout(n.B),n.B=null)}function Xh(n){n.g=new Zn(n,n.l,"rpc",n.ba),n.o===null&&(n.g.I=n.s),n.g.O=0;var e=He(n.wa);V(e,"RID","rpc"),V(e,"SID",n.K),V(e,"AID",n.V),V(e,"CI",n.G?"0":"1"),!n.G&&n.qa&&V(e,"TO",n.qa),V(e,"TYPE","xmlhttp"),rr(n,e),n.o&&n.s&&ba(e,n.o,n.s),n.L&&n.g.setTimeout(n.L);var t=n.g;n=n.pa,t.L=1,t.v=wi(He(e)),t.s=null,t.S=!0,Rh(t,n)}g.ib=function(){this.v!=null&&(this.v=null,Ii(this),Ta(this),ae(19))};function oi(n){n.v!=null&&(A.clearTimeout(n.v),n.v=null)}function Zh(n,e){var t=null;if(n.g==e){oi(n),Aa(n),n.g=null;var r=2}else if(na(n.i,e))t=e.F,qh(n.i,e),r=1;else return;if(n.H!=0){if(e.i)if(r==1){t=e.s?e.s.length:0,e=Date.now()-e.G;var i=n.C;r=gi(),Z(r,new Th(r,t)),Ti(n)}else Jh(n);else if(i=e.o,i==3||i==0&&0<e.ca||!(r==1&&c_(n,e)||r==2&&Ta(n)))switch(t&&0<t.length&&(e=n.i,e.i=e.i.concat(t)),i){case 1:bt(n,5);break;case 4:bt(n,10);break;case 3:bt(n,6);break;default:bt(n,2)}}}function ed(n,e){let t=n.ab+Math.floor(Math.random()*n.hb);return n.isActive()||(t*=2),t*e}function bt(n,e){if(n.l.info("Error code "+e),e==2){var t=null;n.h&&(t=null);var r=re(n.pb,n);t||(t=new It("//www.google.com/images/cleardot.gif"),A.location&&A.location.protocol=="http"||ii(t,"https"),wi(t)),n_(t.toString(),r)}else ae(2);n.H=0,n.h&&n.h.za(e),td(n),Qh(n)}g.pb=function(n){n?(this.l.info("Successfully pinged google.com"),ae(2)):(this.l.info("Failed to ping google.com"),ae(1))};function td(n){if(n.H=0,n.ma=[],n.h){let e=Bh(n.i);(e.length!=0||n.j.length!=0)&&(Wu(n.ma,e),Wu(n.ma,n.j),n.i.i.length=0,oa(n.j),n.j.length=0),n.h.ya()}}function nd(n,e,t){var r=t instanceof It?He(t):new It(t);if(r.g!="")e&&(r.g=e+"."+r.g),si(r,r.m);else{var i=A.location;r=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var s=new It(null);r&&ii(s,r),e&&(s.g=e),i&&si(s,i),t&&(s.l=t),r=s}return t=n.F,e=n.Da,t&&e&&V(r,t,e),V(r,"VER",n.ra),rr(n,r),r}function rd(n,e,t){if(e&&!n.J)throw Error("Can't create secondary domain capable XhrIo object.");return e=t&&n.Ha&&!n.va?new F(new tr({ob:!0})):new F(n.va),e.Oa(n.J),e}g.isActive=function(){return!!this.h&&this.h.isActive(this)};function id(){}g=id.prototype;g.Ba=function(){};g.Aa=function(){};g.za=function(){};g.ya=function(){};g.isActive=function(){return!0};g.Va=function(){};function ai(){if(en&&!(10<=Number(Ay)))throw Error("Environmental error: no available transport.")}ai.prototype.g=function(n,e){return new de(n,e)};function de(n,e){Q.call(this),this.g=new Wh(e),this.l=n,this.h=e&&e.messageUrlParams||null,n=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(n?n["X-Client-Protocol"]="webchannel":n={"X-Client-Protocol":"webchannel"}),this.g.s=n,n=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(n?n["X-WebChannel-Content-Type"]=e.messageContentType:n={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(n?n["X-WebChannel-Client-Profile"]=e.Ca:n={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=n,(n=e&&e.cc)&&!Bn(n)&&(this.g.o=n),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Bn(e)&&(this.g.F=e,n=this.h,n!==null&&e in n&&(n=this.h,e in n&&delete n[e])),this.j=new nn(this)}Y(de,Q);de.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var n=this.g,e=this.l,t=this.h||void 0;ae(0),n.Y=e,n.na=t||{},n.G=n.aa,n.I=nd(n,null,n.Y),Ti(n)};de.prototype.close=function(){Ia(this.g)};de.prototype.u=function(n){var e=this.g;if(typeof n=="string"){var t={};t.__data__=n,n=t}else this.v&&(t={},t.__data__=fa(n),n=t);e.j.push(new Jy(e.fb++,n)),e.H==3&&Ti(e)};de.prototype.N=function(){this.g.h=null,delete this.j,Ia(this.g),delete this.g,de.$.N.call(this)};function sd(n){_a.call(this),n.__headers__&&(this.headers=n.__headers__,this.statusCode=n.__status__,delete n.__headers__,delete n.__status__);var e=n.__sm__;if(e){e:{for(let t in e){n=t;break e}n=void 0}(this.i=n)&&(n=this.i,e=e!==null&&n in e?e[n]:void 0),this.data=e}else this.data=n}Y(sd,_a);function od(){va.call(this),this.status=1}Y(od,va);function nn(n){this.g=n}Y(nn,id);nn.prototype.Ba=function(){Z(this.g,"a")};nn.prototype.Aa=function(n){Z(this.g,new sd(n))};nn.prototype.za=function(n){Z(this.g,new od)};nn.prototype.ya=function(){Z(this.g,"b")};function l_(){this.blockSize=-1}function we(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}Y(we,l_);we.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function jo(n,e,t){t||(t=0);var r=Array(16);if(typeof e=="string")for(var i=0;16>i;++i)r[i]=e.charCodeAt(t++)|e.charCodeAt(t++)<<8|e.charCodeAt(t++)<<16|e.charCodeAt(t++)<<24;else for(i=0;16>i;++i)r[i]=e[t++]|e[t++]<<8|e[t++]<<16|e[t++]<<24;e=n.g[0],t=n.g[1],i=n.g[2];var s=n.g[3],o=e+(s^t&(i^s))+r[0]+3614090360&4294967295;e=t+(o<<7&4294967295|o>>>25),o=s+(i^e&(t^i))+r[1]+3905402710&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(t^s&(e^t))+r[2]+606105819&4294967295,i=s+(o<<17&4294967295|o>>>15),o=t+(e^i&(s^e))+r[3]+3250441966&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(s^t&(i^s))+r[4]+4118548399&4294967295,e=t+(o<<7&4294967295|o>>>25),o=s+(i^e&(t^i))+r[5]+1200080426&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(t^s&(e^t))+r[6]+2821735955&4294967295,i=s+(o<<17&4294967295|o>>>15),o=t+(e^i&(s^e))+r[7]+4249261313&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(s^t&(i^s))+r[8]+1770035416&4294967295,e=t+(o<<7&4294967295|o>>>25),o=s+(i^e&(t^i))+r[9]+2336552879&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(t^s&(e^t))+r[10]+4294925233&4294967295,i=s+(o<<17&4294967295|o>>>15),o=t+(e^i&(s^e))+r[11]+2304563134&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(s^t&(i^s))+r[12]+1804603682&4294967295,e=t+(o<<7&4294967295|o>>>25),o=s+(i^e&(t^i))+r[13]+4254626195&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(t^s&(e^t))+r[14]+2792965006&4294967295,i=s+(o<<17&4294967295|o>>>15),o=t+(e^i&(s^e))+r[15]+1236535329&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(i^s&(t^i))+r[1]+4129170786&4294967295,e=t+(o<<5&4294967295|o>>>27),o=s+(t^i&(e^t))+r[6]+3225465664&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(s^e))+r[11]+643717713&4294967295,i=s+(o<<14&4294967295|o>>>18),o=t+(s^e&(i^s))+r[0]+3921069994&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(i^s&(t^i))+r[5]+3593408605&4294967295,e=t+(o<<5&4294967295|o>>>27),o=s+(t^i&(e^t))+r[10]+38016083&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(s^e))+r[15]+3634488961&4294967295,i=s+(o<<14&4294967295|o>>>18),o=t+(s^e&(i^s))+r[4]+3889429448&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(i^s&(t^i))+r[9]+568446438&4294967295,e=t+(o<<5&4294967295|o>>>27),o=s+(t^i&(e^t))+r[14]+3275163606&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(s^e))+r[3]+4107603335&4294967295,i=s+(o<<14&4294967295|o>>>18),o=t+(s^e&(i^s))+r[8]+1163531501&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(i^s&(t^i))+r[13]+2850285829&4294967295,e=t+(o<<5&4294967295|o>>>27),o=s+(t^i&(e^t))+r[2]+4243563512&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(s^e))+r[7]+1735328473&4294967295,i=s+(o<<14&4294967295|o>>>18),o=t+(s^e&(i^s))+r[12]+2368359562&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(t^i^s)+r[5]+4294588738&4294967295,e=t+(o<<4&4294967295|o>>>28),o=s+(e^t^i)+r[8]+2272392833&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^t)+r[11]+1839030562&4294967295,i=s+(o<<16&4294967295|o>>>16),o=t+(i^s^e)+r[14]+4259657740&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(t^i^s)+r[1]+2763975236&4294967295,e=t+(o<<4&4294967295|o>>>28),o=s+(e^t^i)+r[4]+1272893353&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^t)+r[7]+4139469664&4294967295,i=s+(o<<16&4294967295|o>>>16),o=t+(i^s^e)+r[10]+3200236656&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(t^i^s)+r[13]+681279174&4294967295,e=t+(o<<4&4294967295|o>>>28),o=s+(e^t^i)+r[0]+3936430074&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^t)+r[3]+3572445317&4294967295,i=s+(o<<16&4294967295|o>>>16),o=t+(i^s^e)+r[6]+76029189&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(t^i^s)+r[9]+3654602809&4294967295,e=t+(o<<4&4294967295|o>>>28),o=s+(e^t^i)+r[12]+3873151461&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^t)+r[15]+530742520&4294967295,i=s+(o<<16&4294967295|o>>>16),o=t+(i^s^e)+r[2]+3299628645&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(i^(t|~s))+r[0]+4096336452&4294967295,e=t+(o<<6&4294967295|o>>>26),o=s+(t^(e|~i))+r[7]+1126891415&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~t))+r[14]+2878612391&4294967295,i=s+(o<<15&4294967295|o>>>17),o=t+(s^(i|~e))+r[5]+4237533241&4294967295,t=i+(o<<21&4294967295|o>>>11),o=e+(i^(t|~s))+r[12]+1700485571&4294967295,e=t+(o<<6&4294967295|o>>>26),o=s+(t^(e|~i))+r[3]+2399980690&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~t))+r[10]+4293915773&4294967295,i=s+(o<<15&4294967295|o>>>17),o=t+(s^(i|~e))+r[1]+2240044497&4294967295,t=i+(o<<21&4294967295|o>>>11),o=e+(i^(t|~s))+r[8]+1873313359&4294967295,e=t+(o<<6&4294967295|o>>>26),o=s+(t^(e|~i))+r[15]+4264355552&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~t))+r[6]+2734768916&4294967295,i=s+(o<<15&4294967295|o>>>17),o=t+(s^(i|~e))+r[13]+1309151649&4294967295,t=i+(o<<21&4294967295|o>>>11),o=e+(i^(t|~s))+r[4]+4149444226&4294967295,e=t+(o<<6&4294967295|o>>>26),o=s+(t^(e|~i))+r[11]+3174756917&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~t))+r[2]+718787259&4294967295,i=s+(o<<15&4294967295|o>>>17),o=t+(s^(i|~e))+r[9]+3951481745&4294967295,n.g[0]=n.g[0]+e&4294967295,n.g[1]=n.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,n.g[2]=n.g[2]+i&4294967295,n.g[3]=n.g[3]+s&4294967295}we.prototype.j=function(n,e){e===void 0&&(e=n.length);for(var t=e-this.blockSize,r=this.m,i=this.h,s=0;s<e;){if(i==0)for(;s<=t;)jo(this,n,s),s+=this.blockSize;if(typeof n=="string"){for(;s<e;)if(r[i++]=n.charCodeAt(s++),i==this.blockSize){jo(this,r),i=0;break}}else for(;s<e;)if(r[i++]=n[s++],i==this.blockSize){jo(this,r),i=0;break}}this.h=i,this.i+=e};we.prototype.l=function(){var n=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);n[0]=128;for(var e=1;e<n.length-8;++e)n[e]=0;var t=8*this.i;for(e=n.length-8;e<n.length;++e)n[e]=t&255,t/=256;for(this.j(n),n=Array(16),e=t=0;4>e;++e)for(var r=0;32>r;r+=8)n[t++]=this.g[e]>>>r&255;return n};function x(n,e){this.h=e;for(var t=[],r=!0,i=n.length-1;0<=i;i--){var s=n[i]|0;r&&s==e||(t[i]=s,r=!1)}this.g=t}var u_={};function Sa(n){return-128<=n&&128>n?by(n,function(e){return new x([e|0],0>e?-1:0)}):new x([n|0],0>n?-1:0)}function Re(n){if(isNaN(n)||!isFinite(n))return Zt;if(0>n)return X(Re(-n));for(var e=[],t=1,r=0;n>=t;r++)e[r]=n/t|0,t*=ra;return new x(e,0)}function ad(n,e){if(n.length==0)throw Error("number format error: empty string");if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(n.charAt(0)=="-")return X(ad(n.substring(1),e));if(0<=n.indexOf("-"))throw Error('number format error: interior "-" character');for(var t=Re(Math.pow(e,8)),r=Zt,i=0;i<n.length;i+=8){var s=Math.min(8,n.length-i),o=parseInt(n.substring(i,i+s),e);8>s?(s=Re(Math.pow(e,s)),r=r.R(s).add(Re(o))):(r=r.R(t),r=r.add(Re(o)))}return r}var ra=4294967296,Zt=Sa(0),ia=Sa(1),ih=Sa(16777216);g=x.prototype;g.ea=function(){if(ge(this))return-X(this).ea();for(var n=0,e=1,t=0;t<this.g.length;t++){var r=this.D(t);n+=(0<=r?r:ra+r)*e,e*=ra}return n};g.toString=function(n){if(n=n||10,2>n||36<n)throw Error("radix out of range: "+n);if(ze(this))return"0";if(ge(this))return"-"+X(this).toString(n);for(var e=Re(Math.pow(n,6)),t=this,r="";;){var i=li(t,e).g;t=ci(t,i.R(e));var s=((0<t.g.length?t.g[0]:t.h)>>>0).toString(n);if(t=i,ze(t))return s+r;for(;6>s.length;)s="0"+s;r=s+r}};g.D=function(n){return 0>n?0:n<this.g.length?this.g[n]:this.h};function ze(n){if(n.h!=0)return!1;for(var e=0;e<n.g.length;e++)if(n.g[e]!=0)return!1;return!0}function ge(n){return n.h==-1}g.X=function(n){return n=ci(this,n),ge(n)?-1:ze(n)?0:1};function X(n){for(var e=n.g.length,t=[],r=0;r<e;r++)t[r]=~n.g[r];return new x(t,~n.h).add(ia)}g.abs=function(){return ge(this)?X(this):this};g.add=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0,i=0;i<=e;i++){var s=r+(this.D(i)&65535)+(n.D(i)&65535),o=(s>>>16)+(this.D(i)>>>16)+(n.D(i)>>>16);r=o>>>16,s&=65535,o&=65535,t[i]=o<<16|s}return new x(t,t[t.length-1]&-2147483648?-1:0)};function ci(n,e){return n.add(X(e))}g.R=function(n){if(ze(this)||ze(n))return Zt;if(ge(this))return ge(n)?X(this).R(X(n)):X(X(this).R(n));if(ge(n))return X(this.R(X(n)));if(0>this.X(ih)&&0>n.X(ih))return Re(this.ea()*n.ea());for(var e=this.g.length+n.g.length,t=[],r=0;r<2*e;r++)t[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<n.g.length;i++){var s=this.D(r)>>>16,o=this.D(r)&65535,a=n.D(i)>>>16,c=n.D(i)&65535;t[2*r+2*i]+=o*c,ni(t,2*r+2*i),t[2*r+2*i+1]+=s*c,ni(t,2*r+2*i+1),t[2*r+2*i+1]+=o*a,ni(t,2*r+2*i+1),t[2*r+2*i+2]+=s*a,ni(t,2*r+2*i+2)}for(r=0;r<e;r++)t[r]=t[2*r+1]<<16|t[2*r];for(r=e;r<2*e;r++)t[r]=0;return new x(t,0)};function ni(n,e){for(;(n[e]&65535)!=n[e];)n[e+1]+=n[e]>>>16,n[e]&=65535,e++}function Mn(n,e){this.g=n,this.h=e}function li(n,e){if(ze(e))throw Error("division by zero");if(ze(n))return new Mn(Zt,Zt);if(ge(n))return e=li(X(n),e),new Mn(X(e.g),X(e.h));if(ge(e))return e=li(n,X(e)),new Mn(X(e.g),e.h);if(30<n.g.length){if(ge(n)||ge(e))throw Error("slowDivide_ only works with positive integers.");for(var t=ia,r=e;0>=r.X(n);)t=sh(t),r=sh(r);var i=Jt(t,1),s=Jt(r,1);for(r=Jt(r,2),t=Jt(t,2);!ze(r);){var o=s.add(r);0>=o.X(n)&&(i=i.add(t),s=o),r=Jt(r,1),t=Jt(t,1)}return e=ci(n,i.R(e)),new Mn(i,e)}for(i=Zt;0<=n.X(e);){for(t=Math.max(1,Math.floor(n.ea()/e.ea())),r=Math.ceil(Math.log(t)/Math.LN2),r=48>=r?1:Math.pow(2,r-48),s=Re(t),o=s.R(e);ge(o)||0<o.X(n);)t-=r,s=Re(t),o=s.R(e);ze(s)&&(s=ia),i=i.add(s),n=ci(n,o)}return new Mn(i,n)}g.gb=function(n){return li(this,n).h};g.and=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)&n.D(r);return new x(t,this.h&n.h)};g.or=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)|n.D(r);return new x(t,this.h|n.h)};g.xor=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)^n.D(r);return new x(t,this.h^n.h)};function sh(n){for(var e=n.g.length+1,t=[],r=0;r<e;r++)t[r]=n.D(r)<<1|n.D(r-1)>>>31;return new x(t,n.h)}function Jt(n,e){var t=e>>5;e%=32;for(var r=n.g.length-t,i=[],s=0;s<r;s++)i[s]=0<e?n.D(s+t)>>>e|n.D(s+t+1)<<32-e:n.D(s+t);return new x(i,n.h)}ai.prototype.createWebChannel=ai.prototype.g;de.prototype.send=de.prototype.u;de.prototype.open=de.prototype.m;de.prototype.close=de.prototype.close;yi.NO_ERROR=0;yi.TIMEOUT=8;yi.HTTP_ERROR=6;Ah.COMPLETE="complete";Sh.EventType=Xn;Xn.OPEN="a";Xn.CLOSE="b";Xn.ERROR="c";Xn.MESSAGE="d";Q.prototype.listen=Q.prototype.O;F.prototype.listenOnce=F.prototype.P;F.prototype.getLastError=F.prototype.Sa;F.prototype.getLastErrorCode=F.prototype.Ia;F.prototype.getStatus=F.prototype.da;F.prototype.getResponseJson=F.prototype.Wa;F.prototype.getResponseText=F.prototype.ja;F.prototype.send=F.prototype.ha;F.prototype.setWithCredentials=F.prototype.Oa;we.prototype.digest=we.prototype.l;we.prototype.reset=we.prototype.reset;we.prototype.update=we.prototype.j;x.prototype.add=x.prototype.add;x.prototype.multiply=x.prototype.R;x.prototype.modulo=x.prototype.gb;x.prototype.compare=x.prototype.X;x.prototype.toNumber=x.prototype.ea;x.prototype.toString=x.prototype.toString;x.prototype.getBits=x.prototype.D;x.fromNumber=Re;x.fromString=ad;var cd=Ee.createWebChannelTransport=function(){return new ai},ld=Ee.getStatEventTarget=function(){return gi()},Ai=Ee.ErrorCode=yi,ud=Ee.EventType=Ah,hd=Ee.Event=Tt,Ca=Ee.Stat={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},dd=Ee.FetchXmlHttpFactory=tr,ir=Ee.WebChannel=Sh,fd=Ee.XhrIo=F,md=Ee.Md5=we,At=Ee.Integer=x;var pd="@firebase/firestore";var J=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};J.UNAUTHENTICATED=new J(null),J.GOOGLE_CREDENTIALS=new J("google-credentials-uid"),J.FIRST_PARTY=new J("first-party-uid"),J.MOCK_USER=new J("mock-user");var bn="10.1.0";var Dt=new et("@firebase/firestore");function gd(){return Dt.logLevel}function y(n,...e){if(Dt.logLevel<=k.DEBUG){let t=e.map(al);Dt.debug(`Firestore (${bn}): ${n}`,...t)}}function $e(n,...e){if(Dt.logLevel<=k.ERROR){let t=e.map(al);Dt.error(`Firestore (${bn}): ${n}`,...t)}}function un(n,...e){if(Dt.logLevel<=k.WARN){let t=e.map(al);Dt.warn(`Firestore (${bn}): ${n}`,...t)}}function al(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function I(n="Unexpected state"){let e=`FIRESTORE (${bn}) INTERNAL ASSERTION FAILED: `+n;throw $e(e),new Error(e)}function M(n,e){n||I()}function C(n,e){return n}var m={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},_=class extends he{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Ie=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Pi=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Na=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(J.UNAUTHENTICATED))}shutdown(){}},xa=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},La=class{constructor(e){this.t=e,this.currentUser=J.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i,i=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve(),s=new Ie;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Ie,e.enqueueRetryable(()=>i(this.currentUser))};let o=()=>{let c=s;e.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},a=c=>{y("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){let c=this.t.getImmediate({optional:!0});c?a(c):(y("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Ie)}},0),o()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(y("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(M(typeof r.accessToken=="string"),new Pi(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return M(e===null||typeof e=="string"),new J(e)}},Oa=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=J.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}},Va=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Oa(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(J.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Ma=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Fa=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){let r=s=>{s.error!=null&&y("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let o=s.token!==this.R;return this.R=s.token,y("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{y("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.A.getImmediate({optional:!0});s?i(s):y("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(M(typeof t.token=="string"),this.R=t.token,new Ma(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}};function h_(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var Ni=class{static V(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=h_(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function N(n,e){return n<e?-1:n>e?1:0}function hn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var ee=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new _(m.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new _(m.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new _(m.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new _(m.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?N(this.nanoseconds,e.nanoseconds):N(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var S=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new ee(0,0))}static max(){return new n(new ee(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var xi=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&I(),r===void 0?r=e.length-t:r>e.length-t&&I(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},q=class n extends xi{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new _(m.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},d_=/^[_a-zA-Z][_a-zA-Z0-9]*$/,ye=class n extends xi{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return d_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new _(m.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},o=!1;for(;i<e.length;){let a=e[i];if(a==="\\"){if(i+1===e.length)throw new _(m.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new _(m.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new _(m.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var E=class n{constructor(e){this.path=e}static fromPath(e){return new n(q.fromString(e))}static fromName(e){return new n(q.fromString(e).popFirst(5))}static empty(){return new n(q.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&q.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return q.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new q(e.slice()))}};var Ua=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};Ua.UNKNOWN_ID=-1;function f_(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=S.fromTimestamp(r===1e9?new ee(t+1,0):new ee(t,r));return new Pt(i,E.empty(),e)}function m_(n){return new Pt(n.readTime,n.key,-1)}var Pt=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(S.min(),E.empty(),-1)}static max(){return new n(S.max(),E.empty(),-1)}};function p_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=E.comparator(n.documentKey,e.documentKey),t!==0?t:N(n.largestBatchId,e.largestBatchId))}var g_="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",qa=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function Er(n){if(n.code!==m.FAILED_PRECONDITION||n.message!==g_)throw n;y("LocalStore","Unexpectedly lost primary lease")}var p=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&I(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,o=!1;e.forEach(a=>{++i,a.next(()=>{++s,o&&s===i&&t()},c=>r(c))}),o=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,o=new Array(s),a=0;for(let c=0;c<s;c++){let l=c;t(e[l]).next(u=>{o[l]=u,++a,a===s&&r(o)},u=>i(u))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};function br(n){return n.name==="IndexedDbTransactionError"}var lr=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this._e&&this._e(e),e}};lr.ae=-1;function ls(n){return n==null}function ur(n){return n===0&&1/n==-1/0}function y_(n){return typeof n=="number"&&Number.isInteger(n)&&!ur(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var __=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],Xb=[...__,"documentOverlays"],v_=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],w_=v_,Zb=[...w_,"indexConfiguration","indexState","indexEntries"];function yd(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function In(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function jd(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var B=class n{constructor(e,t){this.comparator=e,this.root=t||Pe.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Pe.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Pe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new on(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new on(this.root,e,this.comparator,!1)}getReverseIterator(){return new on(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new on(this.root,e,this.comparator,!0)}},on=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Pe=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=s??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw I();let e=this.left.check();if(e!==this.right.check())throw I();return e+(this.isRed()?0:1)}};Pe.EMPTY=null,Pe.RED=!0,Pe.BLACK=!1;Pe.EMPTY=new class{constructor(){this.size=0}get key(){throw I()}get value(){throw I()}get color(){throw I()}get left(){throw I()}get right(){throw I()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Pe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var ce=class n{constructor(e){this.comparator=e,this.data=new B(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Li(this.data.getIterator())}getIteratorFrom(e){return new Li(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Li=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var De=class n{constructor(e){this.fields=e,e.sort(ye.comparator)}static empty(){return new n([])}unionWith(e){let t=new ce(ye.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return hn(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var Oi=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var le=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Oi("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return N(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};le.EMPTY_BYTE_STRING=new le("");var E_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ct(n){if(M(!!n),typeof n=="string"){let e=0,t=E_.exec(n);if(M(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:U(n.seconds),nanos:U(n.nanos)}}function U(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function lt(n){return typeof n=="string"?le.fromBase64String(n):le.fromUint8Array(n)}function cl(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function ll(n){let e=n.mapValue.fields.__previous_value__;return cl(e)?ll(e):e}function hr(n){let e=ct(n.mapValue.fields.__local_write_time__.timestampValue);return new ee(e.seconds,e.nanos)}var Ba=class{constructor(e,t,r,i,s,o,a,c,l){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l}},Vi=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var Si={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Nt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?cl(n)?4:Gd(n)?9007199254740991:10:I()}function xe(n,e){if(n===e)return!0;let t=Nt(n);if(t!==Nt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return hr(n).isEqual(hr(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let o=ct(i.timestampValue),a=ct(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return lt(i.bytesValue).isEqual(lt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return U(i.geoPointValue.latitude)===U(s.geoPointValue.latitude)&&U(i.geoPointValue.longitude)===U(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return U(i.integerValue)===U(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let o=U(i.doubleValue),a=U(s.doubleValue);return o===a?ur(o)===ur(a):isNaN(o)&&isNaN(a)}return!1}(n,e);case 9:return hn(n.arrayValue.values||[],e.arrayValue.values||[],xe);case 10:return function(i,s){let o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(yd(o)!==yd(a))return!1;for(let c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!xe(o[c],a[c])))return!1;return!0}(n,e);default:return I()}}function dr(n,e){return(n.values||[]).find(t=>xe(t,e))!==void 0}function dn(n,e){if(n===e)return 0;let t=Nt(n),r=Nt(e);if(t!==r)return N(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return N(n.booleanValue,e.booleanValue);case 2:return function(s,o){let a=U(s.integerValue||s.doubleValue),c=U(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1}(n,e);case 3:return _d(n.timestampValue,e.timestampValue);case 4:return _d(hr(n),hr(e));case 5:return N(n.stringValue,e.stringValue);case 6:return function(s,o){let a=lt(s),c=lt(o);return a.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){let a=s.split("/"),c=o.split("/");for(let l=0;l<a.length&&l<c.length;l++){let u=N(a[l],c[l]);if(u!==0)return u}return N(a.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){let a=N(U(s.latitude),U(o.latitude));return a!==0?a:N(U(s.longitude),U(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,o){let a=s.values||[],c=o.values||[];for(let l=0;l<a.length&&l<c.length;++l){let u=dn(a[l],c[l]);if(u)return u}return N(a.length,c.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,o){if(s===Si.mapValue&&o===Si.mapValue)return 0;if(s===Si.mapValue)return 1;if(o===Si.mapValue)return-1;let a=s.fields||{},c=Object.keys(a),l=o.fields||{},u=Object.keys(l);c.sort(),u.sort();for(let h=0;h<c.length&&h<u.length;++h){let d=N(c[h],u[h]);if(d!==0)return d;let f=dn(a[c[h]],l[u[h]]);if(f!==0)return f}return N(c.length,u.length)}(n.mapValue,e.mapValue);default:throw I()}}function _d(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return N(n,e);let t=ct(n),r=ct(e),i=N(t.seconds,r.seconds);return i!==0?i:N(t.nanos,r.nanos)}function fn(n){return ja(n)}function ja(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=ct(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return lt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return E.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=ja(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let o of r)s?s=!1:i+=",",i+=`${o}:${ja(t.fields[o])}`;return i+"}"}(n.mapValue):I()}function Ga(n){return!!n&&"integerValue"in n}function ul(n){return!!n&&"arrayValue"in n}function vd(n){return!!n&&"nullValue"in n}function wd(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ki(n){return!!n&&"mapValue"in n}function or(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return In(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=or(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=or(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Gd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var be=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ki(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=or(t)}setAll(e){let t=ye.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){let c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=or(o):i.push(a.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());ki(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return xe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];ki(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){In(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(or(this.value))}};function zd(n){let e=[];return In(n.fields,(t,r)=>{let i=new ye([t]);if(ki(r)){let s=zd(r.mapValue).fields;if(s.length===0)e.push(i);else for(let o of s)e.push(i.child(o))}else e.push(i)}),new De(e)}var Te=class n{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new n(e,0,S.min(),S.min(),S.min(),be.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,S.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,S.min(),S.min(),be.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,S.min(),S.min(),be.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(S.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=S.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var mn=class{constructor(e,t){this.position=e,this.inclusive=t}};function Ed(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],o=n.position[i];if(s.field.isKeyField()?r=E.comparator(E.fromName(o.referenceValue),t.key):r=dn(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function bd(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!xe(n.position[t],e.position[t]))return!1;return!0}var kt=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function b_(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var Mi=class{},$=class n extends Mi{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Ha(e,t,r):t==="array-contains"?new Wa(e,r):t==="in"?new Qa(e,r):t==="not-in"?new Ya(e,r):t==="array-contains-any"?new Ja(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new $a(e,r):new Ka(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(dn(t,this.value)):t!==null&&Nt(this.value)===Nt(t)&&this.matchesComparison(dn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return I()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}},Le=class n extends Mi{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new n(e,t)}matches(e){return Hd(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){let e=this.le(t=>t.isInequality());return e!==null?e.field:null}le(e){for(let t of this.getFlattenedFilters())if(e(t))return t;return null}};function Hd(n){return n.op==="and"}function $d(n){return I_(n)&&Hd(n)}function I_(n){for(let e of n.filters)if(e instanceof Le)return!1;return!0}function za(n){if(n instanceof $)return n.field.canonicalString()+n.op.toString()+fn(n.value);if($d(n))return n.filters.map(e=>za(e)).join(",");{let e=n.filters.map(t=>za(t)).join(",");return`${n.op}(${e})`}}function Kd(n,e){return n instanceof $?function(r,i){return i instanceof $&&r.op===i.op&&r.field.isEqual(i.field)&&xe(r.value,i.value)}(n,e):n instanceof Le?function(r,i){return i instanceof Le&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,a)=>s&&Kd(o,i.filters[a]),!0):!1}(n,e):void I()}function Wd(n){return n instanceof $?function(t){return`${t.field.canonicalString()} ${t.op} ${fn(t.value)}`}(n):n instanceof Le?function(t){return t.op.toString()+" {"+t.getFilters().map(Wd).join(" ,")+"}"}(n):"Filter"}var Ha=class extends ${constructor(e,t,r){super(e,t,r),this.key=E.fromName(r.referenceValue)}matches(e){let t=E.comparator(e.key,this.key);return this.matchesComparison(t)}},$a=class extends ${constructor(e,t){super(e,"in",t),this.keys=Qd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},Ka=class extends ${constructor(e,t){super(e,"not-in",t),this.keys=Qd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function Qd(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>E.fromName(r.referenceValue))}var Wa=class extends ${constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return ul(t)&&dr(t.arrayValue,this.value)}},Qa=class extends ${constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&dr(this.value.arrayValue,t)}},Ya=class extends ${constructor(e,t){super(e,"not-in",t)}matches(e){if(dr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!dr(this.value.arrayValue,t)}},Ja=class extends ${constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!ul(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>dr(this.value.arrayValue,r))}};var Xa=class{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.he=null}};function Id(n,e=null,t=[],r=[],i=null,s=null,o=null){return new Xa(n,e,t,r,i,s,o)}function hl(n){let e=C(n);if(e.he===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>za(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),ls(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>fn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>fn(r)).join(",")),e.he=t}return e.he}function dl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!b_(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Kd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!bd(n.startAt,e.startAt)&&bd(n.endAt,e.endAt)}function Za(n){return E.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var pn=class{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.Pe=null,this.Ie=null,this.startAt,this.endAt}};function T_(n,e,t,r,i,s,o,a){return new pn(n,e,t,r,i,s,o,a)}function fl(n){return new pn(n)}function Td(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function A_(n){return n.explicitOrderBy.length>0?n.explicitOrderBy[0].field:null}function S_(n){for(let e of n.filters){let t=e.getFirstInequalityField();if(t!==null)return t}return null}function C_(n){return n.collectionGroup!==null}function an(n){let e=C(n);if(e.Pe===null){e.Pe=[];let t=S_(e),r=A_(e);if(t!==null&&r===null)t.isKeyField()||e.Pe.push(new kt(t)),e.Pe.push(new kt(ye.keyField(),"asc"));else{let i=!1;for(let s of e.explicitOrderBy)e.Pe.push(s),s.field.isKeyField()&&(i=!0);if(!i){let s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.Pe.push(new kt(ye.keyField(),s))}}}return e.Pe}function Ke(n){let e=C(n);if(!e.Ie)if(e.limitType==="F")e.Ie=Id(e.path,e.collectionGroup,an(e),e.filters,e.limit,e.startAt,e.endAt);else{let t=[];for(let s of an(e)){let o=s.dir==="desc"?"asc":"desc";t.push(new kt(s.field,o))}let r=e.endAt?new mn(e.endAt.position,e.endAt.inclusive):null,i=e.startAt?new mn(e.startAt.position,e.startAt.inclusive):null;e.Ie=Id(e.path,e.collectionGroup,t,e.filters,e.limit,r,i)}return e.Ie}function ec(n,e,t){return new pn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function us(n,e){return dl(Ke(n),Ke(e))&&n.limitType===e.limitType}function Yd(n){return`${hl(Ke(n))}|lt:${n.limitType}`}function tc(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Wd(i)).join(", ")}]`),ls(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>fn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>fn(i)).join(",")),`Target(${r})`}(Ke(n))}; limitType=${n.limitType})`}function hs(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):E.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of an(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,a,c){let l=Ed(o,a,c);return o.inclusive?l<=0:l<0}(r.startAt,an(r),i)||r.endAt&&!function(o,a,c){let l=Ed(o,a,c);return o.inclusive?l>=0:l>0}(r.endAt,an(r),i))}(n,e)}function R_(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Jd(n){return(e,t)=>{let r=!1;for(let i of an(n)){let s=k_(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function k_(n,e,t){let r=n.field.isKeyField()?E.comparator(e.key,t.key):function(s,o,a){let c=o.data.field(s),l=a.data.field(s);return c!==null&&l!==null?dn(c,l):I()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return I()}}var ut=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){In(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return jd(this.inner)}size(){return this.innerSize}};var D_=new B(E.comparator);function We(){return D_}var Xd=new B(E.comparator);function sr(...n){let e=Xd;for(let t of n)e=e.insert(t.key,t);return e}function Zd(n){let e=Xd;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function St(){return ar()}function ef(){return ar()}function ar(){return new ut(n=>n.toString(),(n,e)=>n.isEqual(e))}var P_=new B(E.comparator),N_=new ce(E.comparator);function R(...n){let e=N_;for(let t of n)e=e.add(t);return e}var x_=new ce(N);function L_(){return x_}function tf(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ur(e)?"-0":e}}function nf(n){return{integerValue:""+n}}function O_(n,e){return y_(e)?nf(e):tf(n,e)}var gn=class{constructor(){this._=void 0}};function V_(n,e,t){return n instanceof yn?function(i,s){let o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&cl(s)&&(s=ll(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):n instanceof xt?sf(n,e):n instanceof Lt?of(n,e):function(i,s){let o=rf(i,s),a=Ad(o)+Ad(i.Te);return Ga(o)&&Ga(i.Te)?nf(a):tf(i.serializer,a)}(n,e)}function M_(n,e,t){return n instanceof xt?sf(n,e):n instanceof Lt?of(n,e):t}function rf(n,e){return n instanceof _n?function(r){return Ga(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var yn=class extends gn{},xt=class extends gn{constructor(e){super(),this.elements=e}};function sf(n,e){let t=af(e);for(let r of n.elements)t.some(i=>xe(i,r))||t.push(r);return{arrayValue:{values:t}}}var Lt=class extends gn{constructor(e){super(),this.elements=e}};function of(n,e){let t=af(e);for(let r of n.elements)t=t.filter(i=>!xe(i,r));return{arrayValue:{values:t}}}var _n=class extends gn{constructor(e,t){super(),this.serializer=e,this.Te=t}};function Ad(n){return U(n.integerValue||n.doubleValue)}function af(n){return ul(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function F_(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof xt&&i instanceof xt||r instanceof Lt&&i instanceof Lt?hn(r.elements,i.elements,xe):r instanceof _n&&i instanceof _n?xe(r.Te,i.Te):r instanceof yn&&i instanceof yn}(n.transform,e.transform)}var nc=class{constructor(e,t){this.version=e,this.transformResults=t}},ot=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Di(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var vn=class{};function cf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new fr(n.key,ot.none()):new Ot(n.key,n.data,ot.none());{let t=n.data,r=be.empty(),i=new ce(ye.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Qe(n.key,r,new De(i.toArray()),ot.none())}}function U_(n,e,t){n instanceof Ot?function(i,s,o){let a=i.value.clone(),c=Cd(i.fieldTransforms,s,o.transformResults);a.setAll(c),s.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(n,e,t):n instanceof Qe?function(i,s,o){if(!Di(i.precondition,s))return void s.convertToUnknownDocument(o.version);let a=Cd(i.fieldTransforms,s,o.transformResults),c=s.data;c.setAll(lf(i)),c.setAll(a),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function cr(n,e,t,r){return n instanceof Ot?function(s,o,a,c){if(!Di(s.precondition,o))return a;let l=s.value.clone(),u=Rd(s.fieldTransforms,c,o);return l.setAll(u),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(n,e,t,r):n instanceof Qe?function(s,o,a,c){if(!Di(s.precondition,o))return a;let l=Rd(s.fieldTransforms,c,o),u=o.data;return u.setAll(lf(s)),u.setAll(l),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(h=>h.field))}(n,e,t,r):function(s,o,a){return Di(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(n,e,t)}function q_(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=rf(r.transform,i||null);s!=null&&(t===null&&(t=be.empty()),t.set(r.field,s))}return t||null}function Sd(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&hn(r,i,(s,o)=>F_(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var Ot=class extends vn{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Qe=class extends vn{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function lf(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function Cd(n,e,t){let r=new Map;M(n.length===t.length);for(let i=0;i<t.length;i++){let s=n[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,M_(o,a,t[i]))}return r}function Rd(n,e,t){let r=new Map;for(let i of n){let s=i.transform,o=t.data.field(i.field);r.set(i.field,V_(s,o,e))}return r}var fr=class extends vn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},rc=class extends vn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var ic=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&U_(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=cr(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=cr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=ef();return this.mutations.forEach(i=>{let s=e.get(i.key),o=s.overlayedDocument,a=this.applyToLocalView(o,s.mutatedFields);a=t.has(i.key)?null:a;let c=cf(o,a);c!==null&&r.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(S.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),R())}isEqual(e){return this.batchId===e.batchId&&hn(this.mutations,e.mutations,(t,r)=>Sd(t,r))&&hn(this.baseMutations,e.baseMutations,(t,r)=>Sd(t,r))}},sc=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){M(e.mutations.length===r.length);let i=function(){return P_}(),s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new n(e,t,r,i)}};var oc=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var ac=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var z,D;function B_(n){switch(n){default:return I();case m.CANCELLED:case m.UNKNOWN:case m.DEADLINE_EXCEEDED:case m.RESOURCE_EXHAUSTED:case m.INTERNAL:case m.UNAVAILABLE:case m.UNAUTHENTICATED:return!1;case m.INVALID_ARGUMENT:case m.NOT_FOUND:case m.ALREADY_EXISTS:case m.PERMISSION_DENIED:case m.FAILED_PRECONDITION:case m.ABORTED:case m.OUT_OF_RANGE:case m.UNIMPLEMENTED:case m.DATA_LOSS:return!0}}function uf(n){if(n===void 0)return $e("GRPC error has no .code"),m.UNKNOWN;switch(n){case z.OK:return m.OK;case z.CANCELLED:return m.CANCELLED;case z.UNKNOWN:return m.UNKNOWN;case z.DEADLINE_EXCEEDED:return m.DEADLINE_EXCEEDED;case z.RESOURCE_EXHAUSTED:return m.RESOURCE_EXHAUSTED;case z.INTERNAL:return m.INTERNAL;case z.UNAVAILABLE:return m.UNAVAILABLE;case z.UNAUTHENTICATED:return m.UNAUTHENTICATED;case z.INVALID_ARGUMENT:return m.INVALID_ARGUMENT;case z.NOT_FOUND:return m.NOT_FOUND;case z.ALREADY_EXISTS:return m.ALREADY_EXISTS;case z.PERMISSION_DENIED:return m.PERMISSION_DENIED;case z.FAILED_PRECONDITION:return m.FAILED_PRECONDITION;case z.ABORTED:return m.ABORTED;case z.OUT_OF_RANGE:return m.OUT_OF_RANGE;case z.UNIMPLEMENTED:return m.UNIMPLEMENTED;case z.DATA_LOSS:return m.DATA_LOSS;default:return I()}}(D=z||(z={}))[D.OK=0]="OK",D[D.CANCELLED=1]="CANCELLED",D[D.UNKNOWN=2]="UNKNOWN",D[D.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",D[D.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",D[D.NOT_FOUND=5]="NOT_FOUND",D[D.ALREADY_EXISTS=6]="ALREADY_EXISTS",D[D.PERMISSION_DENIED=7]="PERMISSION_DENIED",D[D.UNAUTHENTICATED=16]="UNAUTHENTICATED",D[D.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",D[D.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",D[D.ABORTED=10]="ABORTED",D[D.OUT_OF_RANGE=11]="OUT_OF_RANGE",D[D.UNIMPLEMENTED=12]="UNIMPLEMENTED",D[D.INTERNAL=13]="INTERNAL",D[D.UNAVAILABLE=14]="UNAVAILABLE",D[D.DATA_LOSS=15]="DATA_LOSS";var cc=class n{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return Ci}static getOrCreateInstance(){return Ci===null&&(Ci=new n),Ci}onExistenceFilterMismatch(e){let t=Symbol();return this.onExistenceFilterMismatchCallbacks.set(t,e),()=>this.onExistenceFilterMismatchCallbacks.delete(t)}notifyOnExistenceFilterMismatch(e){this.onExistenceFilterMismatchCallbacks.forEach(t=>t(e))}},Ci=null;function j_(){return new TextEncoder}var G_=new At([4294967295,4294967295],0);function kd(n){let e=j_().encode(n),t=new md;return t.update(e),new Uint8Array(t.digest())}function Dd(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new At([t,r],0),new At([i,s],0)]}var lc=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ct(`Invalid padding: ${t}`);if(r<0)throw new Ct(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ct(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ct(`Invalid padding when bitmap length is 0: ${t}`);this.de=8*e.length-t,this.Ae=At.fromNumber(this.de)}Re(e,t,r){let i=e.add(t.multiply(At.fromNumber(r)));return i.compare(G_)===1&&(i=new At([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Ae).toNumber()}Ve(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.de===0)return!1;let t=kd(e),[r,i]=Dd(t);for(let s=0;s<this.hashCount;s++){let o=this.Re(r,i,s);if(!this.Ve(o))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new n(s,i,t);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.de===0)return;let t=kd(e),[r,i]=Dd(t);for(let s=0;s<this.hashCount;s++){let o=this.Re(r,i,s);this.me(o)}}me(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},Ct=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Fi=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,mr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(S.min(),i,new B(N),We(),R())}},mr=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,R(),R(),R())}};var cn=class{constructor(e,t,r,i){this.fe=e,this.removedTargetIds=t,this.key=r,this.ge=i}},Ui=class{constructor(e,t){this.targetId=e,this.pe=t}},qi=class{constructor(e,t,r=le.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},Bi=class{constructor(){this.ye=0,this.we=Nd(),this.Se=le.EMPTY_BYTE_STRING,this.be=!1,this.De=!0}get current(){return this.be}get resumeToken(){return this.Se}get ve(){return this.ye!==0}get Ce(){return this.De}Fe(e){e.approximateByteSize()>0&&(this.De=!0,this.Se=e)}Me(){let e=R(),t=R(),r=R();return this.we.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:I()}}),new mr(this.Se,this.be,e,t,r)}xe(){this.De=!1,this.we=Nd()}Oe(e,t){this.De=!0,this.we=this.we.insert(e,t)}Ne(e){this.De=!0,this.we=this.we.remove(e)}Be(){this.ye+=1}Le(){this.ye-=1}ke(){this.De=!0,this.be=!0}},uc=class{constructor(e){this.qe=e,this.Qe=new Map,this.Ke=We(),this.$e=Pd(),this.Ue=new B(N)}We(e){for(let t of e.fe)e.ge&&e.ge.isFoundDocument()?this.Ge(t,e.ge):this.ze(t,e.key,e.ge);for(let t of e.removedTargetIds)this.ze(t,e.key,e.ge)}je(e){this.forEachTarget(e,t=>{let r=this.He(t);switch(e.state){case 0:this.Je(t)&&r.Fe(e.resumeToken);break;case 1:r.Le(),r.ve||r.xe(),r.Fe(e.resumeToken);break;case 2:r.Le(),r.ve||this.removeTarget(t);break;case 3:this.Je(t)&&(r.ke(),r.Fe(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),r.Fe(e.resumeToken));break;default:I()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Qe.forEach((r,i)=>{this.Je(i)&&t(i)})}Ze(e){var t,r;let i=e.targetId,s=e.pe.count,o=this.Xe(i);if(o){let a=o.target;if(Za(a))if(s===0){let c=new E(a.path);this.ze(i,c,Te.newNoDocument(c,S.min()))}else M(s===1);else{let c=this.et(i);if(c!==s){let l=this.tt(e,c);if(l.status!==0){this.Ye(i);let u=l.status===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ue=this.Ue.insert(i,u)}(t=cc.instance)===null||t===void 0||t.notifyOnExistenceFilterMismatch(function(h,d,f,b){var T,v,P,L,O,G;let te={localCacheCount:f,existenceFilterCount:b.count},j=b.unchangedNames;return j&&(te.bloomFilter={applied:h===0,hashCount:(T=j?.hashCount)!==null&&T!==void 0?T:0,bitmapLength:(L=(P=(v=j?.bits)===null||v===void 0?void 0:v.bitmap)===null||P===void 0?void 0:P.length)!==null&&L!==void 0?L:0,padding:(G=(O=j?.bits)===null||O===void 0?void 0:O.padding)!==null&&G!==void 0?G:0},d&&(te.bloomFilter.mightContain=d)),te}(l.status,(r=l.nt)!==null&&r!==void 0?r:null,c,e.pe))}}}}tt(e,t){let{unchangedNames:r,count:i}=e.pe;if(!r||!r.bits)return{status:1};let{bits:{bitmap:s="",padding:o=0},hashCount:a=0}=r,c,l;try{c=lt(s).toUint8Array()}catch(h){if(h instanceof Oi)return un("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),{status:1};throw h}try{l=new lc(c,o,a)}catch(h){return un(h instanceof Ct?"BloomFilter error: ":"Applying bloom filter failed: ",h),{status:1}}let u=h=>{let d=this.qe.rt();return l.mightContain(`projects/${d.projectId}/databases/${d.database}/documents/${h}`)};return l.de===0?{status:1}:{status:i===t-this.it(e.targetId,u)?0:2,nt:u}}it(e,t){let r=this.qe.getRemoteKeysForTarget(e),i=0;return r.forEach(s=>{t(s.path.canonicalString())||(this.ze(e,s,null),i++)}),i}st(e){let t=new Map;this.Qe.forEach((s,o)=>{let a=this.Xe(o);if(a){if(s.current&&Za(a.target)){let c=new E(a.target.path);this.Ke.get(c)!==null||this.ot(o,c)||this.ze(o,c,Te.newNoDocument(c,e))}s.Ce&&(t.set(o,s.Me()),s.xe())}});let r=R();this.$e.forEach((s,o)=>{let a=!0;o.forEachWhile(c=>{let l=this.Xe(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(s))}),this.Ke.forEach((s,o)=>o.setReadTime(e));let i=new Fi(e,t,this.Ue,this.Ke,r);return this.Ke=We(),this.$e=Pd(),this.Ue=new B(N),i}Ge(e,t){if(!this.Je(e))return;let r=this.ot(e,t.key)?2:0;this.He(e).Oe(t.key,r),this.Ke=this.Ke.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e))}ze(e,t,r){if(!this.Je(e))return;let i=this.He(e);this.ot(e,t)?i.Oe(t,1):i.Ne(t),this.$e=this.$e.insert(t,this._t(t).delete(e)),r&&(this.Ke=this.Ke.insert(t,r))}removeTarget(e){this.Qe.delete(e)}et(e){let t=this.He(e).Me();return this.qe.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Be(e){this.He(e).Be()}He(e){let t=this.Qe.get(e);return t||(t=new Bi,this.Qe.set(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new ce(N),this.$e=this.$e.insert(e,t)),t}Je(e){let t=this.Xe(e)!==null;return t||y("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){let t=this.Qe.get(e);return t&&t.ve?null:this.qe.ut(e)}Ye(e){this.Qe.set(e,new Bi),this.qe.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ot(e,t){return this.qe.getRemoteKeysForTarget(e).has(t)}};function Pd(){return new B(E.comparator)}function Nd(){return new B(E.comparator)}var z_=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),H_=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),$_=(()=>({and:"AND",or:"OR"}))(),hc=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function dc(n,e){return n.useProto3Json||ls(e)?e:{value:e}}function ji(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function hf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function K_(n,e){return ji(n,e.toTimestamp())}function Ne(n){return M(!!n),S.fromTimestamp(function(t){let r=ct(t);return new ee(r.seconds,r.nanos)}(n))}function ml(n,e){return function(r){return new q(["projects",r.projectId,"databases",r.database])}(n).child("documents").child(e).canonicalString()}function df(n){let e=q.fromString(n);return M(gf(e)),e}function fc(n,e){return ml(n.databaseId,e.path)}function Ra(n,e){let t=df(e);if(t.get(1)!==n.databaseId.projectId)throw new _(m.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new _(m.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new E(ff(t))}function mc(n,e){return ml(n.databaseId,e)}function W_(n){let e=df(n);return e.length===4?q.emptyPath():ff(e)}function pc(n){return new q(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ff(n){return M(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function xd(n,e,t){return{name:fc(n,e),fields:t.value.mapValue.fields}}function Q_(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:I()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(l,u){return l.useProto3Json?(M(u===void 0||typeof u=="string"),le.fromBase64String(u||"")):(M(u===void 0||u instanceof Uint8Array),le.fromUint8Array(u||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(l){let u=l.code===void 0?m.UNKNOWN:uf(l.code);return new _(u,l.message||"")}(o);t=new qi(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=Ra(n,r.document.name),s=Ne(r.document.updateTime),o=r.document.createTime?Ne(r.document.createTime):S.min(),a=new be({mapValue:{fields:r.document.fields}}),c=Te.newFoundDocument(i,s,o,a),l=r.targetIds||[],u=r.removedTargetIds||[];t=new cn(l,u,c.key,c)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=Ra(n,r.document),s=r.readTime?Ne(r.readTime):S.min(),o=Te.newNoDocument(i,s),a=r.removedTargetIds||[];t=new cn([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=Ra(n,r.document),s=r.removedTargetIds||[];t=new cn([],s,i,null)}else{if(!("filter"in e))return I();{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,o=new ac(i,s),a=r.targetId;t=new Ui(a,o)}}return t}function Y_(n,e){let t;if(e instanceof Ot)t={update:xd(n,e.key,e.value)};else if(e instanceof fr)t={delete:fc(n,e.key)};else if(e instanceof Qe)t={update:xd(n,e.key,e.data),updateMask:sv(e.fieldMask)};else{if(!(e instanceof rc))return I();t={verify:fc(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){let a=o.transform;if(a instanceof yn)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof xt)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof Lt)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof _n)return{fieldPath:o.field.canonicalString(),increment:a.Te};throw I()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:K_(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:I()}(n,e.precondition)),t}function J_(n,e){return n&&n.length>0?(M(e!==void 0),n.map(t=>function(i,s){let o=i.updateTime?Ne(i.updateTime):Ne(s);return o.isEqual(S.min())&&(o=Ne(s)),new nc(o,i.transformResults||[])}(t,e))):[]}function X_(n,e){return{documents:[mc(n,e.path)]}}function Z_(n,e){let t={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(t.parent=mc(n,r),t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(t.parent=mc(n,r.popLast()),t.structuredQuery.from=[{collectionId:r.lastSegment()}]);let i=function(c){if(c.length!==0)return pf(Le.create(c,"and"))}(e.filters);i&&(t.structuredQuery.where=i);let s=function(c){if(c.length!==0)return c.map(l=>function(h){return{field:rn(h.field),direction:nv(h.dir)}}(l))}(e.orderBy);s&&(t.structuredQuery.orderBy=s);let o=dc(n,e.limit);return o!==null&&(t.structuredQuery.limit=o),e.startAt&&(t.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),t}function ev(n){let e=W_(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){M(r===1);let u=t.from[0];u.allDescendants?i=u.collectionId:e=e.child(u.collectionId)}let s=[];t.where&&(s=function(h){let d=mf(h);return d instanceof Le&&$d(d)?d.getFilters():[d]}(t.where));let o=[];t.orderBy&&(o=function(h){return h.map(d=>function(b){return new kt(sn(b.field),function(v){switch(v){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(d))}(t.orderBy));let a=null;t.limit&&(a=function(h){let d;return d=typeof h=="object"?h.value:h,ls(d)?null:d}(t.limit));let c=null;t.startAt&&(c=function(h){let d=!!h.before,f=h.values||[];return new mn(f,d)}(t.startAt));let l=null;return t.endAt&&(l=function(h){let d=!h.before,f=h.values||[];return new mn(f,d)}(t.endAt)),T_(e,i,o,s,a,"F",c,l)}function tv(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return I()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function mf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=sn(t.unaryFilter.field);return $.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=sn(t.unaryFilter.field);return $.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=sn(t.unaryFilter.field);return $.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let o=sn(t.unaryFilter.field);return $.create(o,"!=",{nullValue:"NULL_VALUE"});default:return I()}}(n):n.fieldFilter!==void 0?function(t){return $.create(sn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return I()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Le.create(t.compositeFilter.filters.map(r=>mf(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return I()}}(t.compositeFilter.op))}(n):I()}function nv(n){return z_[n]}function rv(n){return H_[n]}function iv(n){return $_[n]}function rn(n){return{fieldPath:n.canonicalString()}}function sn(n){return ye.fromServerFormat(n.fieldPath)}function pf(n){return n instanceof $?function(t){if(t.op==="=="){if(wd(t.value))return{unaryFilter:{field:rn(t.field),op:"IS_NAN"}};if(vd(t.value))return{unaryFilter:{field:rn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(wd(t.value))return{unaryFilter:{field:rn(t.field),op:"IS_NOT_NAN"}};if(vd(t.value))return{unaryFilter:{field:rn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:rn(t.field),op:rv(t.op),value:t.value}}}(n):n instanceof Le?function(t){let r=t.getFilters().map(i=>pf(i));return r.length===1?r[0]:{compositeFilter:{op:iv(t.op),filters:r}}}(n):I()}function sv(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function gf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var pr=class n{constructor(e,t,r,i,s=S.min(),o=S.min(),a=le.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var gc=class{constructor(e){this.ct=e}};function ov(n){let e=ev({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ec(e,e.limit,"L"):e}var Gi=class{constructor(){}Pt(e,t){this.It(e,t),t.Tt()}It(e,t){if("nullValue"in e)this.Et(t,5);else if("booleanValue"in e)this.Et(t,10),t.dt(e.booleanValue?1:0);else if("integerValue"in e)this.Et(t,15),t.dt(U(e.integerValue));else if("doubleValue"in e){let r=U(e.doubleValue);isNaN(r)?this.Et(t,13):(this.Et(t,15),ur(r)?t.dt(0):t.dt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Et(t,20),typeof r=="string"?t.At(r):(t.At(`${r.seconds||""}`),t.dt(r.nanos||0))}else if("stringValue"in e)this.Rt(e.stringValue,t),this.Vt(t);else if("bytesValue"in e)this.Et(t,30),t.ft(lt(e.bytesValue)),this.Vt(t);else if("referenceValue"in e)this.gt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Et(t,45),t.dt(r.latitude||0),t.dt(r.longitude||0)}else"mapValue"in e?Gd(e)?this.Et(t,Number.MAX_SAFE_INTEGER):(this.yt(e.mapValue,t),this.Vt(t)):"arrayValue"in e?(this.wt(e.arrayValue,t),this.Vt(t)):I()}Rt(e,t){this.Et(t,25),this.St(e,t)}St(e,t){t.At(e)}yt(e,t){let r=e.fields||{};this.Et(t,55);for(let i of Object.keys(r))this.Rt(i,t),this.It(r[i],t)}wt(e,t){let r=e.values||[];this.Et(t,50);for(let i of r)this.It(i,t)}gt(e,t){this.Et(t,37),E.fromName(e).path.forEach(r=>{this.Et(t,60),this.St(r,t)})}Et(e,t){e.dt(t)}Vt(e){e.dt(2)}};Gi.bt=new Gi;var yc=class{constructor(){this.sn=new _c}addToCollectionParentIndex(e,t){return this.sn.add(t),p.resolve()}getCollectionParents(e,t){return p.resolve(this.sn.getEntries(t))}addFieldIndex(e,t){return p.resolve()}deleteFieldIndex(e,t){return p.resolve()}getDocumentsMatchingTarget(e,t){return p.resolve(null)}getIndexType(e,t){return p.resolve(0)}getFieldIndexes(e,t){return p.resolve([])}getNextCollectionGroupToUpdate(e){return p.resolve(null)}getMinOffset(e,t){return p.resolve(Pt.min())}getMinOffsetFromCollectionGroup(e,t){return p.resolve(Pt.min())}updateCollectionGroup(e,t,r){return p.resolve()}updateIndexEntries(e,t){return p.resolve()}},_c=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new ce(q.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ce(q.comparator)).toArray()}};var tI=new Uint8Array(0);var ke=class n{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};ke.DEFAULT_COLLECTION_PERCENTILE=10,ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ke.DEFAULT=new ke(41943040,ke.DEFAULT_COLLECTION_PERCENTILE,ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ke.DISABLED=new ke(-1,0,0);var gr=class n{constructor(e){this.Mn=e}next(){return this.Mn+=2,this.Mn}static xn(){return new n(0)}static On(){return new n(-1)}};var vc=class{constructor(){this.changes=new ut(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Te.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?p.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var wc=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var Ec=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&cr(r.mutation,i,De.empty(),ee.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,R()).next(()=>r))}getLocalViewOfDocuments(e,t,r=R()){let i=St();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=sr();return s.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){let r=St();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,R()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,a)=>{t.set(o,a)})})}computeViews(e,t,r,i){let s=We(),o=ar(),a=function(){return ar()}();return t.forEach((c,l)=>{let u=r.get(l.key);i.has(l.key)&&(u===void 0||u.mutation instanceof Qe)?s=s.insert(l.key,l):u!==void 0?(o.set(l.key,u.mutation.getFieldMask()),cr(u.mutation,l,u.mutation.getFieldMask(),ee.now())):o.set(l.key,De.empty())}),this.recalculateAndSaveOverlays(e,s).next(c=>(c.forEach((l,u)=>o.set(l,u)),t.forEach((l,u)=>{var h;return a.set(l,new wc(u,(h=o.get(l))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,t){let r=ar(),i=new B((o,a)=>o-a),s=R();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(let a of o)a.keys().forEach(c=>{let l=t.get(c);if(l===null)return;let u=r.get(c)||De.empty();u=a.applyToLocalView(l,u),r.set(c,u);let h=(i.get(a.batchId)||R()).add(c);i=i.insert(a.batchId,h)})}).next(()=>{let o=[],a=i.getReverseIterator();for(;a.hasNext();){let c=a.getNext(),l=c.key,u=c.value,h=ef();u.forEach(d=>{if(!s.has(d)){let f=cf(t.get(d),r.get(d));f!==null&&h.set(d,f),s=s.add(d)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,h))}return p.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r){return function(s){return E.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):C_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r):this.getDocumentsMatchingCollectionQuery(e,t,r)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):p.resolve(St()),a=-1,c=s;return o.next(l=>p.forEach(l,(u,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),s.get(u)?p.resolve():this.remoteDocumentCache.getEntry(e,u).next(d=>{c=c.insert(u,d)}))).next(()=>this.populateOverlays(e,l,s)).next(()=>this.computeViews(e,c,l,R())).next(u=>({batchId:a,changes:Zd(u)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new E(t)).next(r=>{let i=sr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r){let i=t.collectionGroup,s=sr();return this.indexManager.getCollectionParents(e,i).next(o=>p.forEach(o,a=>{let c=function(u,h){return new pn(h,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt)}(t,a.child(i));return this.getDocumentsMatchingCollectionQuery(e,c,r).next(l=>{l.forEach((u,h)=>{s=s.insert(u,h)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i))).next(s=>{i.forEach((a,c)=>{let l=c.getKey();s.get(l)===null&&(s=s.insert(l,Te.newInvalidDocument(l)))});let o=sr();return s.forEach((a,c)=>{let l=i.get(a);l!==void 0&&cr(l.mutation,c,De.empty(),ee.now()),hs(t,c)&&(o=o.insert(a,c))}),o})}};var bc=class{constructor(e){this.serializer=e,this.ar=new Map,this.ur=new Map}getBundleMetadata(e,t){return p.resolve(this.ar.get(t))}saveBundleMetadata(e,t){return this.ar.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Ne(i.createTime)}}(t)),p.resolve()}getNamedQuery(e,t){return p.resolve(this.ur.get(t))}saveNamedQuery(e,t){return this.ur.set(t.name,function(i){return{name:i.name,query:ov(i.bundledQuery),readTime:Ne(i.readTime)}}(t)),p.resolve()}};var Ic=class{constructor(){this.overlays=new B(E.comparator),this.cr=new Map}getOverlay(e,t){return p.resolve(this.overlays.get(t))}getOverlays(e,t){let r=St();return p.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),p.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.cr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.cr.delete(r)),p.resolve()}getOverlaysForCollection(e,t,r){let i=St(),s=t.length+1,o=new E(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){let c=a.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return p.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new B((l,u)=>l-u),o=this.overlays.getIterator();for(;o.hasNext();){let l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let u=s.get(l.largestBatchId);u===null&&(u=St(),s=s.insert(l.largestBatchId,u)),u.set(l.getKey(),l)}}let a=St(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((l,u)=>a.set(l,u)),!(a.size()>=i)););return p.resolve(a)}ht(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let o=this.cr.get(i.largestBatchId).delete(r.key);this.cr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new oc(t,r));let s=this.cr.get(t);s===void 0&&(s=R(),this.cr.set(t,s)),this.cr.set(t,s.add(r.key))}};var yr=class{constructor(){this.lr=new ce(H.hr),this.Pr=new ce(H.Ir)}isEmpty(){return this.lr.isEmpty()}addReference(e,t){let r=new H(e,t);this.lr=this.lr.add(r),this.Pr=this.Pr.add(r)}Tr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Er(new H(e,t))}dr(e,t){e.forEach(r=>this.removeReference(r,t))}Ar(e){let t=new E(new q([])),r=new H(t,e),i=new H(t,e+1),s=[];return this.Pr.forEachInRange([r,i],o=>{this.Er(o),s.push(o.key)}),s}Rr(){this.lr.forEach(e=>this.Er(e))}Er(e){this.lr=this.lr.delete(e),this.Pr=this.Pr.delete(e)}Vr(e){let t=new E(new q([])),r=new H(t,e),i=new H(t,e+1),s=R();return this.Pr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){let t=new H(e,0),r=this.lr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},H=class{constructor(e,t){this.key=e,this.mr=t}static hr(e,t){return E.comparator(e.key,t.key)||N(e.mr,t.mr)}static Ir(e,t){return N(e.mr,t.mr)||E.comparator(e.key,t.key)}};var Tc=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.gr=1,this.pr=new ce(H.hr)}checkEmpty(e){return p.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.gr;this.gr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let o=new ic(s,t,r,i);this.mutationQueue.push(o);for(let a of i)this.pr=this.pr.add(new H(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return p.resolve(o)}lookupMutationBatch(e,t){return p.resolve(this.yr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.wr(r),s=i<0?0:i;return p.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return p.resolve(this.mutationQueue.length===0?-1:this.gr-1)}getAllMutationBatches(e){return p.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new H(t,0),i=new H(t,Number.POSITIVE_INFINITY),s=[];return this.pr.forEachInRange([r,i],o=>{let a=this.yr(o.mr);s.push(a)}),p.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(N);return t.forEach(i=>{let s=new H(i,0),o=new H(i,Number.POSITIVE_INFINITY);this.pr.forEachInRange([s,o],a=>{r=r.add(a.mr)})}),p.resolve(this.Sr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;E.isDocumentKey(s)||(s=s.child(""));let o=new H(new E(s),0),a=new ce(N);return this.pr.forEachWhile(c=>{let l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===i&&(a=a.add(c.mr)),!0)},o),p.resolve(this.Sr(a))}Sr(e){let t=[];return e.forEach(r=>{let i=this.yr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){M(this.br(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.pr;return p.forEach(t.mutations,i=>{let s=new H(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.pr=r})}Cn(e){}containsKey(e,t){let r=new H(t,0),i=this.pr.firstAfterOrEqual(r);return p.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,p.resolve()}br(e,t){return this.wr(e)}wr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}yr(e){let t=this.wr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var Ac=class{constructor(e){this.Dr=e,this.docs=function(){return new B(E.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.Dr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return p.resolve(r?r.document.mutableCopy():Te.newInvalidDocument(t))}getEntries(e,t){let r=We();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Te.newInvalidDocument(i))}),p.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=We(),o=t.path,a=new E(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){let{key:l,value:{document:u}}=c.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||p_(m_(u),r)<=0||(i.has(u.key)||hs(t,u))&&(s=s.insert(u.key,u.mutableCopy()))}return p.resolve(s)}getAllFromCollectionGroup(e,t,r,i){I()}vr(e,t){return p.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Sc(this)}getSize(e){return p.resolve(this.size)}},Sc=class extends vc{constructor(e){super(),this.sr=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.sr.addEntry(e,i)):this.sr.removeEntry(r)}),p.waitFor(t)}getFromCache(e,t){return this.sr.getEntry(e,t)}getAllFromCache(e,t){return this.sr.getEntries(e,t)}};var Cc=class{constructor(e){this.persistence=e,this.Cr=new ut(t=>hl(t),dl),this.lastRemoteSnapshotVersion=S.min(),this.highestTargetId=0,this.Fr=0,this.Mr=new yr,this.targetCount=0,this.Or=gr.xn()}forEachTarget(e,t){return this.Cr.forEach((r,i)=>t(i)),p.resolve()}getLastRemoteSnapshotVersion(e){return p.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return p.resolve(this.Fr)}allocateTargetId(e){return this.highestTargetId=this.Or.next(),p.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Fr&&(this.Fr=t),p.resolve()}Ln(e){this.Cr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Or=new gr(t),this.highestTargetId=t),e.sequenceNumber>this.Fr&&(this.Fr=e.sequenceNumber)}addTargetData(e,t){return this.Ln(t),this.targetCount+=1,p.resolve()}updateTargetData(e,t){return this.Ln(t),p.resolve()}removeTargetData(e,t){return this.Cr.delete(t.target),this.Mr.Ar(t.targetId),this.targetCount-=1,p.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.Cr.forEach((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.Cr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)}),p.waitFor(s).next(()=>i)}getTargetCount(e){return p.resolve(this.targetCount)}getTargetData(e,t){let r=this.Cr.get(t)||null;return p.resolve(r)}addMatchingKeys(e,t,r){return this.Mr.Tr(t,r),p.resolve()}removeMatchingKeys(e,t,r){this.Mr.dr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),p.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Mr.Ar(t),p.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Mr.Vr(t);return p.resolve(r)}containsKey(e,t){return p.resolve(this.Mr.containsKey(t))}};var Rc=class{constructor(e,t){this.Nr={},this.overlays={},this.Br=new lr(0),this.Lr=!1,this.Lr=!0,this.referenceDelegate=e(this),this.kr=new Cc(this),this.indexManager=new yc,this.remoteDocumentCache=function(i){return new Ac(i)}(r=>this.referenceDelegate.qr(r)),this.serializer=new gc(t),this.Qr=new bc(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Lr=!1,Promise.resolve()}get started(){return this.Lr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Ic,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Nr[e.toKey()];return r||(r=new Tc(t,this.referenceDelegate),this.Nr[e.toKey()]=r),r}getTargetCache(){return this.kr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Qr}runTransaction(e,t,r){y("MemoryPersistence","Starting transaction:",e);let i=new kc(this.Br.next());return this.referenceDelegate.Kr(),r(i).next(s=>this.referenceDelegate.$r(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ur(e,t){return p.or(Object.values(this.Nr).map(r=>()=>r.containsKey(e,t)))}},kc=class extends qa{constructor(e){super(),this.currentSequenceNumber=e}},Dc=class n{constructor(e){this.persistence=e,this.Wr=new yr,this.Gr=null}static zr(e){return new n(e)}get jr(){if(this.Gr)return this.Gr;throw I()}addReference(e,t,r){return this.Wr.addReference(r,t),this.jr.delete(r.toString()),p.resolve()}removeReference(e,t,r){return this.Wr.removeReference(r,t),this.jr.add(r.toString()),p.resolve()}markPotentiallyOrphaned(e,t){return this.jr.add(t.toString()),p.resolve()}removeTarget(e,t){this.Wr.Ar(t.targetId).forEach(i=>this.jr.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.jr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Kr(){this.Gr=new Set}$r(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return p.forEach(this.jr,r=>{let i=E.fromPath(r);return this.Hr(e,i).next(s=>{s||t.removeEntry(i,S.min())})}).next(()=>(this.Gr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Hr(e,t).next(r=>{r?this.jr.delete(t.toString()):this.jr.add(t.toString())})}qr(e){return 0}Hr(e,t){return p.or([()=>p.resolve(this.Wr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ur(e,t)])}};var Pc=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Li=r,this.ki=i}static qi(e,t){let r=R(),i=R();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var Nc=class{constructor(){this.Qi=!1}initialize(e,t){this.Ki=e,this.indexManager=t,this.Qi=!0}getDocumentsMatchingQuery(e,t,r,i){return this.$i(e,t).next(s=>s||this.Ui(e,t,i,r)).next(s=>s||this.Wi(e,t))}$i(e,t){if(Td(t))return p.resolve(null);let r=Ke(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=ec(t,null,"F"),r=Ke(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let o=R(...s);return this.Ki.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(c=>{let l=this.Gi(t,a);return this.zi(t,l,o,c.readTime)?this.$i(e,ec(t,null,"F")):this.ji(e,l,t,c)}))})))}Ui(e,t,r,i){return Td(t)||i.isEqual(S.min())?this.Wi(e,t):this.Ki.getDocuments(e,r).next(s=>{let o=this.Gi(t,s);return this.zi(t,o,r,i)?this.Wi(e,t):(gd()<=k.DEBUG&&y("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),tc(t)),this.ji(e,o,t,f_(i,-1)))})}Gi(e,t){let r=new ce(Jd(e));return t.forEach((i,s)=>{hs(e,s)&&(r=r.add(s))}),r}zi(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Wi(e,t){return gd()<=k.DEBUG&&y("QueryEngine","Using full collection scan to execute query:",tc(t)),this.Ki.getDocumentsMatchingQuery(e,t,Pt.min())}ji(e,t,r,i){return this.Ki.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}};var xc=class{constructor(e,t,r,i){this.persistence=e,this.Hi=t,this.serializer=i,this.Ji=new B(N),this.Yi=new ut(s=>hl(s),dl),this.Zi=new Map,this.Xi=e.getRemoteDocumentCache(),this.kr=e.getTargetCache(),this.Qr=e.getBundleCache(),this.es(r)}es(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ec(this.Xi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Xi.setIndexManager(this.indexManager),this.Hi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ji))}};function av(n,e,t,r){return new xc(n,e,t,r)}async function yf(n,e){let t=C(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.es(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let o=[],a=[],c=R();for(let l of i){o.push(l.batchId);for(let u of l.mutations)c=c.add(u.key)}for(let l of s){a.push(l.batchId);for(let u of l.mutations)c=c.add(u.key)}return t.localDocuments.getDocuments(r,c).next(l=>({ts:l,removedBatchIds:o,addedBatchIds:a}))})})}function cv(n,e){let t=C(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.Xi.newChangeBuffer({trackRemovals:!0});return function(a,c,l,u){let h=l.batch,d=h.keys(),f=p.resolve();return d.forEach(b=>{f=f.next(()=>u.getEntry(c,b)).next(T=>{let v=l.docVersions.get(b);M(v!==null),T.version.compareTo(v)<0&&(h.applyToRemoteDocument(T,l),T.isValidDocument()&&(T.setReadTime(l.commitVersion),u.addEntry(T)))})}),f.next(()=>a.mutationQueue.removeMutationBatch(c,h))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let c=R();for(let l=0;l<a.mutationResults.length;++l)a.mutationResults[l].transformResults.length>0&&(c=c.add(a.batch.mutations[l].key));return c}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function _f(n){let e=C(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.kr.getLastRemoteSnapshotVersion(t))}function lv(n,e){let t=C(n),r=e.snapshotVersion,i=t.Ji;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let o=t.Xi.newChangeBuffer({trackRemovals:!0});i=t.Ji;let a=[];e.targetChanges.forEach((u,h)=>{let d=i.get(h);if(!d)return;a.push(t.kr.removeMatchingKeys(s,u.removedDocuments,h).next(()=>t.kr.addMatchingKeys(s,u.addedDocuments,h)));let f=d.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(h)!==null?f=f.withResumeToken(le.EMPTY_BYTE_STRING,S.min()).withLastLimboFreeSnapshotVersion(S.min()):u.resumeToken.approximateByteSize()>0&&(f=f.withResumeToken(u.resumeToken,r)),i=i.insert(h,f),function(T,v,P){return T.resumeToken.approximateByteSize()===0||v.snapshotVersion.toMicroseconds()-T.snapshotVersion.toMicroseconds()>=3e8?!0:P.addedDocuments.size+P.modifiedDocuments.size+P.removedDocuments.size>0}(d,f,u)&&a.push(t.kr.updateTargetData(s,f))});let c=We(),l=R();if(e.documentUpdates.forEach(u=>{e.resolvedLimboDocuments.has(u)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(s,u))}),a.push(uv(s,o,e.documentUpdates).next(u=>{c=u.ns,l=u.rs})),!r.isEqual(S.min())){let u=t.kr.getLastRemoteSnapshotVersion(s).next(h=>t.kr.setTargetsMetadata(s,s.currentSequenceNumber,r));a.push(u)}return p.waitFor(a).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,c,l)).next(()=>c)}).then(s=>(t.Ji=i,s))}function uv(n,e,t){let r=R(),i=R();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=We();return t.forEach((a,c)=>{let l=s.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(i=i.add(a)),c.isNoDocument()&&c.version.isEqual(S.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):y("LocalStore","Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)}),{ns:o,rs:i}})}function hv(n,e){let t=C(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function dv(n,e){let t=C(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.kr.getTargetData(r,e).next(s=>s?(i=s,p.resolve(i)):t.kr.allocateTargetId(r).next(o=>(i=new pr(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.kr.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.Ji.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Ji=t.Ji.insert(r.targetId,r),t.Yi.set(e,r.targetId)),r})}async function Lc(n,e,t){let r=C(n),i=r.Ji.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!br(o))throw o;y("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ji=r.Ji.remove(e),r.Yi.delete(i.target)}function Ld(n,e,t){let r=C(n),i=S.min(),s=R();return r.persistence.runTransaction("Execute query","readonly",o=>function(c,l,u){let h=C(c),d=h.Yi.get(u);return d!==void 0?p.resolve(h.Ji.get(d)):h.kr.getTargetData(l,u)}(r,o,Ke(e)).next(a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.kr.getMatchingKeysForTargetId(o,a.targetId).next(c=>{s=c})}).next(()=>r.Hi.getDocumentsMatchingQuery(o,e,t?i:S.min(),t?s:R())).next(a=>(fv(r,R_(e),a),{documents:a,ss:s})))}function fv(n,e,t){let r=n.Zi.get(e)||S.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Zi.set(e,r)}var zi=class{constructor(){this.activeTargetIds=L_()}hs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ps(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ls(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Oc=class{constructor(){this.Hs=new zi,this.Js={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.Hs.hs(e),this.Js[e]||"not-current"}updateQueryState(e,t,r){this.Js[e]=t}removeLocalQueryTarget(e){this.Hs.Ps(e)}isLocalQueryTarget(e){return this.Hs.activeTargetIds.has(e)}clearQueryState(e){delete this.Js[e]}getAllActiveQueryTargets(){return this.Hs.activeTargetIds}isActiveQueryTarget(e){return this.Hs.activeTargetIds.has(e)}start(){return this.Hs=new zi,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Vc=class{Ys(e){}shutdown(){}};var Hi=class{constructor(){this.Zs=()=>this.Xs(),this.eo=()=>this.no(),this.ro=[],this.io()}Ys(e){this.ro.push(e)}shutdown(){window.removeEventListener("online",this.Zs),window.removeEventListener("offline",this.eo)}io(){window.addEventListener("online",this.Zs),window.addEventListener("offline",this.eo)}Xs(){y("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.ro)e(0)}no(){y("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.ro)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var Ri=null;function ka(){return Ri===null?Ri=function(){return 268435456+Math.round(2147483648*Math.random())}():Ri++,"0x"+Ri.toString(16)}var mv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var Mc=class{constructor(e){this.so=e.so,this.oo=e.oo}_o(e){this.ao=e}uo(e){this.co=e}onMessage(e){this.lo=e}close(){this.oo()}send(e){this.so(e)}ho(){this.ao()}Po(e){this.co(e)}Io(e){this.lo(e)}};var se="WebChannelConnection",Fc=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.To=r+"://"+t.host,this.Eo=`projects/${i}/databases/${s}`,this.Ao=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Ro(){return!1}Vo(t,r,i,s,o){let a=ka(),c=this.mo(t,r);y("RestConnection",`Sending RPC '${t}' ${a}:`,c,i);let l={"google-cloud-resource-prefix":this.Eo,"x-goog-request-params":this.Ao};return this.fo(l,s,o),this.po(t,c,l,i).then(u=>(y("RestConnection",`Received RPC '${t}' ${a}: `,u),u),u=>{throw un("RestConnection",`RPC '${t}' ${a} failed with error: `,u,"url: ",c,"request:",i),u})}yo(t,r,i,s,o,a){return this.Vo(t,r,i,s,o)}fo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+bn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}mo(t,r){let i=mv[t];return`${this.To}/v1/${r}:${i}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}po(e,t,r,i){let s=ka();return new Promise((o,a)=>{let c=new fd;c.setWithCredentials(!0),c.listenOnce(ud.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Ai.NO_ERROR:let u=c.getResponseJson();y(se,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(u)),o(u);break;case Ai.TIMEOUT:y(se,`RPC '${e}' ${s} timed out`),a(new _(m.DEADLINE_EXCEEDED,"Request time out"));break;case Ai.HTTP_ERROR:let h=c.getStatus();if(y(se,`RPC '${e}' ${s} failed with status:`,h,"response text:",c.getResponseText()),h>0){let d=c.getResponseJson();Array.isArray(d)&&(d=d[0]);let f=d?.error;if(f&&f.status&&f.message){let b=function(v){let P=v.toLowerCase().replace(/_/g,"-");return Object.values(m).indexOf(P)>=0?P:m.UNKNOWN}(f.status);a(new _(b,f.message))}else a(new _(m.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new _(m.UNAVAILABLE,"Connection failed."));break;default:I()}}finally{y(se,`RPC '${e}' ${s} completed.`)}});let l=JSON.stringify(i);y(se,`RPC '${e}' ${s} sending request:`,i),c.send(t,"POST",l,r,15)})}wo(e,t,r){let i=ka(),s=[this.To,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=cd(),a=ld(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.xmlHttpFactory=new dd({})),this.fo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;let u=s.join("");y(se,`Creating RPC '${e}' stream ${i}: ${u}`,c);let h=o.createWebChannel(u,c),d=!1,f=!1,b=new Mc({so:v=>{f?y(se,`Not sending because RPC '${e}' stream ${i} is closed:`,v):(d||(y(se,`Opening RPC '${e}' stream ${i} transport.`),h.open(),d=!0),y(se,`RPC '${e}' stream ${i} sending:`,v),h.send(v))},oo:()=>h.close()}),T=(v,P,L)=>{v.listen(P,O=>{try{L(O)}catch(G){setTimeout(()=>{throw G},0)}})};return T(h,ir.EventType.OPEN,()=>{f||y(se,`RPC '${e}' stream ${i} transport opened.`)}),T(h,ir.EventType.CLOSE,()=>{f||(f=!0,y(se,`RPC '${e}' stream ${i} transport closed`),b.Po())}),T(h,ir.EventType.ERROR,v=>{f||(f=!0,un(se,`RPC '${e}' stream ${i} transport errored:`,v),b.Po(new _(m.UNAVAILABLE,"The operation could not be completed")))}),T(h,ir.EventType.MESSAGE,v=>{var P;if(!f){let L=v.data[0];M(!!L);let O=L,G=O.error||((P=O[0])===null||P===void 0?void 0:P.error);if(G){y(se,`RPC '${e}' stream ${i} received error:`,G);let te=G.status,j=function(Ue){let Ze=z[Ue];if(Ze!==void 0)return uf(Ze)}(te),Fe=G.message;j===void 0&&(j=m.INTERNAL,Fe="Unknown error status: "+te+" with message "+G.message),f=!0,b.Po(new _(j,Fe)),h.close()}else y(se,`RPC '${e}' stream ${i} received:`,L),b.Io(L)}}),T(a,hd.STAT_EVENT,v=>{v.stat===Ca.PROXY?y(se,`RPC '${e}' stream ${i} detected buffering proxy`):v.stat===Ca.NOPROXY&&y(se,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{b.ho()},0),b}};function Da(){return typeof document<"u"?document:null}function ds(n){return new hc(n,!0)}var $i=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.ii=e,this.timerId=t,this.So=r,this.bo=i,this.Do=s,this.vo=0,this.Co=null,this.Fo=Date.now(),this.reset()}reset(){this.vo=0}Mo(){this.vo=this.Do}xo(e){this.cancel();let t=Math.floor(this.vo+this.Oo()),r=Math.max(0,Date.now()-this.Fo),i=Math.max(0,t-r);i>0&&y("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.vo} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Co=this.ii.enqueueAfterDelay(this.timerId,i,()=>(this.Fo=Date.now(),e())),this.vo*=this.bo,this.vo<this.So&&(this.vo=this.So),this.vo>this.Do&&(this.vo=this.Do)}No(){this.Co!==null&&(this.Co.skipDelay(),this.Co=null)}cancel(){this.Co!==null&&(this.Co.cancel(),this.Co=null)}Oo(){return(Math.random()-.5)*this.vo}};var Ki=class{constructor(e,t,r,i,s,o,a,c){this.ii=e,this.Bo=r,this.Lo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.ko=0,this.qo=null,this.Qo=null,this.stream=null,this.Ko=new $i(e,t)}$o(){return this.state===1||this.state===5||this.Uo()}Uo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Wo()}async stop(){this.$o()&&await this.close(0)}Go(){this.state=0,this.Ko.reset()}zo(){this.Uo()&&this.qo===null&&(this.qo=this.ii.enqueueAfterDelay(this.Bo,6e4,()=>this.jo()))}Ho(e){this.Jo(),this.stream.send(e)}async jo(){if(this.Uo())return this.close(0)}Jo(){this.qo&&(this.qo.cancel(),this.qo=null)}Yo(){this.Qo&&(this.Qo.cancel(),this.Qo=null)}async close(e,t){this.Jo(),this.Yo(),this.Ko.cancel(),this.ko++,e!==4?this.Ko.reset():t&&t.code===m.RESOURCE_EXHAUSTED?($e(t.toString()),$e("Using maximum backoff delay to prevent overloading the backend."),this.Ko.Mo()):t&&t.code===m.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Zo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.uo(t)}Zo(){}auth(){this.state=1;let e=this.Xo(this.ko),t=this.ko;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.ko===t&&this.e_(r,i)},r=>{e(()=>{let i=new _(m.UNKNOWN,"Fetching auth token failed: "+r.message);return this.t_(i)})})}e_(e,t){let r=this.Xo(this.ko);this.stream=this.n_(e,t),this.stream._o(()=>{r(()=>(this.state=2,this.Qo=this.ii.enqueueAfterDelay(this.Lo,1e4,()=>(this.Uo()&&(this.state=3),Promise.resolve())),this.listener._o()))}),this.stream.uo(i=>{r(()=>this.t_(i))}),this.stream.onMessage(i=>{r(()=>this.onMessage(i))})}Wo(){this.state=5,this.Ko.xo(async()=>{this.state=0,this.start()})}t_(e){return y("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Xo(e){return t=>{this.ii.enqueueAndForget(()=>this.ko===e?t():(y("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Uc=class extends Ki{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}n_(e,t){return this.connection.wo("Listen",e,t)}onMessage(e){this.Ko.reset();let t=Q_(this.serializer,e),r=function(s){if(!("targetChange"in s))return S.min();let o=s.targetChange;return o.targetIds&&o.targetIds.length?S.min():o.readTime?Ne(o.readTime):S.min()}(e);return this.listener.r_(t,r)}i_(e){let t={};t.database=pc(this.serializer),t.addTarget=function(s,o){let a,c=o.target;if(a=Za(c)?{documents:X_(s,c)}:{query:Z_(s,c)},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=hf(s,o.resumeToken);let l=dc(s,o.expectedCount);l!==null&&(a.expectedCount=l)}else if(o.snapshotVersion.compareTo(S.min())>0){a.readTime=ji(s,o.snapshotVersion.toTimestamp());let l=dc(s,o.expectedCount);l!==null&&(a.expectedCount=l)}return a}(this.serializer,e);let r=tv(this.serializer,e);r&&(t.labels=r),this.Ho(t)}s_(e){let t={};t.database=pc(this.serializer),t.removeTarget=e,this.Ho(t)}},qc=class extends Ki{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s,this.o_=!1}get __(){return this.o_}start(){this.o_=!1,this.lastStreamToken=void 0,super.start()}Zo(){this.o_&&this.a_([])}n_(e,t){return this.connection.wo("Write",e,t)}onMessage(e){if(M(!!e.streamToken),this.lastStreamToken=e.streamToken,this.o_){this.Ko.reset();let t=J_(e.writeResults,e.commitTime),r=Ne(e.commitTime);return this.listener.u_(r,t)}return M(!e.writeResults||e.writeResults.length===0),this.o_=!0,this.listener.c_()}l_(){let e={};e.database=pc(this.serializer),this.Ho(e)}a_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>Y_(this.serializer,r))};this.Ho(t)}};var Bc=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.h_=!1}P_(){if(this.h_)throw new _(m.FAILED_PRECONDITION,"The client has already been terminated.")}Vo(e,t,r){return this.P_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Vo(e,t,r,i,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===m.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new _(m.UNKNOWN,i.toString())})}yo(e,t,r,i){return this.P_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.yo(e,t,r,s,o,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===m.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new _(m.UNKNOWN,s.toString())})}terminate(){this.h_=!0}};var jc=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.T_=0,this.E_=null,this.d_=!0}A_(){this.T_===0&&(this.R_("Unknown"),this.E_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.E_=null,this.V_("Backend didn't respond within 10 seconds."),this.R_("Offline"),Promise.resolve())))}m_(e){this.state==="Online"?this.R_("Unknown"):(this.T_++,this.T_>=1&&(this.f_(),this.V_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.R_("Offline")))}set(e){this.f_(),this.T_=0,e==="Online"&&(this.d_=!1),this.R_(e)}R_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}V_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.d_?($e(t),this.d_=!1):y("OnlineStateTracker",t)}f_(){this.E_!==null&&(this.E_.cancel(),this.E_=null)}};var Gc=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.g_=[],this.p_=new Map,this.y_=new Set,this.w_=[],this.S_=s,this.S_.Ys(o=>{r.enqueueAndForget(async()=>{Mt(this)&&(y("RemoteStore","Restarting streams for network reachability change."),await async function(c){let l=C(c);l.y_.add(4),await Ir(l),l.b_.set("Unknown"),l.y_.delete(4),await fs(l)}(this))})}),this.b_=new jc(r,i)}};async function fs(n){if(Mt(n))for(let e of n.w_)await e(!0)}async function Ir(n){for(let e of n.w_)await e(!1)}function vf(n,e){let t=C(n);t.p_.has(e.targetId)||(t.p_.set(e.targetId,e),yl(t)?gl(t):Tn(t).Uo()&&pl(t,e))}function wf(n,e){let t=C(n),r=Tn(t);t.p_.delete(e),r.Uo()&&Ef(t,e),t.p_.size===0&&(r.Uo()?r.zo():Mt(t)&&t.b_.set("Unknown"))}function pl(n,e){if(n.D_.Be(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(S.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Tn(n).i_(e)}function Ef(n,e){n.D_.Be(e),Tn(n).s_(e)}function gl(n){n.D_=new uc({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ut:e=>n.p_.get(e)||null,rt:()=>n.datastore.serializer.databaseId}),Tn(n).start(),n.b_.A_()}function yl(n){return Mt(n)&&!Tn(n).$o()&&n.p_.size>0}function Mt(n){return C(n).y_.size===0}function bf(n){n.D_=void 0}async function pv(n){n.p_.forEach((e,t)=>{pl(n,e)})}async function gv(n,e){bf(n),yl(n)?(n.b_.m_(e),gl(n)):n.b_.set("Unknown")}async function yv(n,e,t){if(n.b_.set("Online"),e instanceof qi&&e.state===2&&e.cause)try{await async function(i,s){let o=s.cause;for(let a of s.targetIds)i.p_.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.p_.delete(a),i.D_.removeTarget(a))}(n,e)}catch(r){y("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Wi(n,r)}else if(e instanceof cn?n.D_.We(e):e instanceof Ui?n.D_.Ze(e):n.D_.je(e),!t.isEqual(S.min()))try{let r=await _f(n.localStore);t.compareTo(r)>=0&&await function(s,o){let a=s.D_.st(o);return a.targetChanges.forEach((c,l)=>{if(c.resumeToken.approximateByteSize()>0){let u=s.p_.get(l);u&&s.p_.set(l,u.withResumeToken(c.resumeToken,o))}}),a.targetMismatches.forEach((c,l)=>{let u=s.p_.get(c);if(!u)return;s.p_.set(c,u.withResumeToken(le.EMPTY_BYTE_STRING,u.snapshotVersion)),Ef(s,c);let h=new pr(u.target,c,l,u.sequenceNumber);pl(s,h)}),s.remoteSyncer.applyRemoteEvent(a)}(n,t)}catch(r){y("RemoteStore","Failed to raise snapshot:",r),await Wi(n,r)}}async function Wi(n,e,t){if(!br(e))throw e;n.y_.add(1),await Ir(n),n.b_.set("Offline"),t||(t=()=>_f(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{y("RemoteStore","Retrying IndexedDB access"),await t(),n.y_.delete(1),await fs(n)})}function If(n,e){return e().catch(t=>Wi(n,t,e))}async function ms(n){let e=C(n),t=ht(e),r=e.g_.length>0?e.g_[e.g_.length-1].batchId:-1;for(;_v(e);)try{let i=await hv(e.localStore,r);if(i===null){e.g_.length===0&&t.zo();break}r=i.batchId,vv(e,i)}catch(i){await Wi(e,i)}Tf(e)&&Af(e)}function _v(n){return Mt(n)&&n.g_.length<10}function vv(n,e){n.g_.push(e);let t=ht(n);t.Uo()&&t.__&&t.a_(e.mutations)}function Tf(n){return Mt(n)&&!ht(n).$o()&&n.g_.length>0}function Af(n){ht(n).start()}async function wv(n){ht(n).l_()}async function Ev(n){let e=ht(n);for(let t of n.g_)e.a_(t.mutations)}async function bv(n,e,t){let r=n.g_.shift(),i=sc.from(r,e,t);await If(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await ms(n)}async function Iv(n,e){e&&ht(n).__&&await async function(r,i){if(function(o){return B_(o)&&o!==m.ABORTED}(i.code)){let s=r.g_.shift();ht(r).Go(),await If(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await ms(r)}}(n,e),Tf(n)&&Af(n)}async function Od(n,e){let t=C(n);t.asyncQueue.verifyOperationInProgress(),y("RemoteStore","RemoteStore received new credentials");let r=Mt(t);t.y_.add(3),await Ir(t),r&&t.b_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.y_.delete(3),await fs(t)}async function Tv(n,e){let t=C(n);e?(t.y_.delete(2),await fs(t)):e||(t.y_.add(2),await Ir(t),t.b_.set("Unknown"))}function Tn(n){return n.v_||(n.v_=function(t,r,i){let s=C(t);return s.P_(),new Uc(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{_o:pv.bind(null,n),uo:gv.bind(null,n),r_:yv.bind(null,n)}),n.w_.push(async e=>{e?(n.v_.Go(),yl(n)?gl(n):n.b_.set("Unknown")):(await n.v_.stop(),bf(n))})),n.v_}function ht(n){return n.C_||(n.C_=function(t,r,i){let s=C(t);return s.P_(),new qc(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{_o:wv.bind(null,n),uo:Iv.bind(null,n),c_:Ev.bind(null,n),u_:bv.bind(null,n)}),n.w_.push(async e=>{e?(n.C_.Go(),await ms(n)):(await n.C_.stop(),n.g_.length>0&&(y("RemoteStore",`Stopping write stream with ${n.g_.length} pending writes`),n.g_=[]))})),n.C_}var zc=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Ie,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,t,r,i,s){let o=Date.now()+r,a=new n(e,t,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new _(m.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function _l(n,e){if($e("AsyncQueue",`${e}: ${n}`),br(n))return new _(m.UNAVAILABLE,`${e}: ${n}`);throw n}var Qi=class n{constructor(e){this.comparator=e?(t,r)=>e(t,r)||E.comparator(t.key,r.key):(t,r)=>E.comparator(t.key,r.key),this.keyedMap=sr(),this.sortedSet=new B(this.comparator)}static emptySet(e){return new n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var Yi=class{constructor(){this.F_=new B(E.comparator)}track(e){let t=e.doc.key,r=this.F_.get(t);r?e.type!==0&&r.type===3?this.F_=this.F_.insert(t,e):e.type===3&&r.type!==1?this.F_=this.F_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.F_=this.F_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.F_=this.F_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.F_=this.F_.remove(t):e.type===1&&r.type===2?this.F_=this.F_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.F_=this.F_.insert(t,{type:2,doc:e.doc}):I():this.F_=this.F_.insert(t,e)}M_(){let e=[];return this.F_.inorderTraversal((t,r)=>{e.push(r)}),e}},wn=class n{constructor(e,t,r,i,s,o,a,c,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,i,s){let o=[];return t.forEach(a=>{o.push({type:0,doc:a})}),new n(e,t,Qi.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&us(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var Hc=class{constructor(){this.x_=void 0,this.listeners=[]}},$c=class{constructor(){this.queries=new ut(e=>Yd(e),us),this.onlineState="Unknown",this.O_=new Set}};async function Sf(n,e){let t=C(n),r=e.query,i=!1,s=t.queries.get(r);if(s||(i=!0,s=new Hc),i)try{s.x_=await t.onListen(r)}catch(o){let a=_l(o,`Initialization of query '${tc(e.query)}' failed`);return void e.onError(a)}t.queries.set(r,s),s.listeners.push(e),e.N_(t.onlineState),s.x_&&e.B_(s.x_)&&vl(t)}async function Cf(n,e){let t=C(n),r=e.query,i=!1,s=t.queries.get(r);if(s){let o=s.listeners.indexOf(e);o>=0&&(s.listeners.splice(o,1),i=s.listeners.length===0)}if(i)return t.queries.delete(r),t.onUnlisten(r)}function Av(n,e){let t=C(n),r=!1;for(let i of e){let s=i.query,o=t.queries.get(s);if(o){for(let a of o.listeners)a.B_(i)&&(r=!0);o.x_=i}}r&&vl(t)}function Sv(n,e,t){let r=C(n),i=r.queries.get(e);if(i)for(let s of i.listeners)s.onError(t);r.queries.delete(e)}function vl(n){n.O_.forEach(e=>{e.next()})}var Ji=class{constructor(e,t,r){this.query=e,this.L_=t,this.k_=!1,this.q_=null,this.onlineState="Unknown",this.options=r||{}}B_(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new wn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.k_?this.Q_(e)&&(this.L_.next(e),t=!0):this.K_(e,this.onlineState)&&(this.U_(e),t=!0),this.q_=e,t}onError(e){this.L_.error(e)}N_(e){this.onlineState=e;let t=!1;return this.q_&&!this.k_&&this.K_(this.q_,e)&&(this.U_(this.q_),t=!0),t}K_(e,t){if(!e.fromCache)return!0;let r=t!=="Offline";return(!this.options.W_||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Q_(e){if(e.docChanges.length>0)return!0;let t=this.q_&&this.q_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}U_(e){e=wn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.k_=!0,this.L_.next(e)}};var Xi=class{constructor(e){this.key=e}},Zi=class{constructor(e){this.key=e}},Kc=class{constructor(e,t){this.query=e,this.X_=t,this.ea=null,this.hasCachedResults=!1,this.current=!1,this.ta=R(),this.mutatedKeys=R(),this.na=Jd(e),this.ra=new Qi(this.na)}get ia(){return this.X_}sa(e,t){let r=t?t.oa:new Yi,i=t?t.ra:this.ra,s=t?t.mutatedKeys:this.mutatedKeys,o=i,a=!1,c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,l=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((u,h)=>{let d=i.get(u),f=hs(this.query,h)?h:null,b=!!d&&this.mutatedKeys.has(d.key),T=!!f&&(f.hasLocalMutations||this.mutatedKeys.has(f.key)&&f.hasCommittedMutations),v=!1;d&&f?d.data.isEqual(f.data)?b!==T&&(r.track({type:3,doc:f}),v=!0):this._a(d,f)||(r.track({type:2,doc:f}),v=!0,(c&&this.na(f,c)>0||l&&this.na(f,l)<0)&&(a=!0)):!d&&f?(r.track({type:0,doc:f}),v=!0):d&&!f&&(r.track({type:1,doc:d}),v=!0,(c||l)&&(a=!0)),v&&(f?(o=o.add(f),s=T?s.add(u):s.delete(u)):(o=o.delete(u),s=s.delete(u)))}),this.query.limit!==null)for(;o.size>this.query.limit;){let u=this.query.limitType==="F"?o.last():o.first();o=o.delete(u.key),s=s.delete(u.key),r.track({type:1,doc:u})}return{ra:o,oa:r,zi:a,mutatedKeys:s}}_a(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r){let i=this.ra;this.ra=e.ra,this.mutatedKeys=e.mutatedKeys;let s=e.oa.M_();s.sort((l,u)=>function(d,f){let b=T=>{switch(T){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return I()}};return b(d)-b(f)}(l.type,u.type)||this.na(l.doc,u.doc)),this.aa(r);let o=t?this.ua():[],a=this.ta.size===0&&this.current?1:0,c=a!==this.ea;return this.ea=a,s.length!==0||c?{snapshot:new wn(this.query,e.ra,i,s,e.mutatedKeys,a===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),ca:o}:{ca:o}}N_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ra:this.ra,oa:new Yi,mutatedKeys:this.mutatedKeys,zi:!1},!1)):{ca:[]}}la(e){return!this.X_.has(e)&&!!this.ra.has(e)&&!this.ra.get(e).hasLocalMutations}aa(e){e&&(e.addedDocuments.forEach(t=>this.X_=this.X_.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.X_=this.X_.delete(t)),this.current=e.current)}ua(){if(!this.current)return[];let e=this.ta;this.ta=R(),this.ra.forEach(r=>{this.la(r.key)&&(this.ta=this.ta.add(r.key))});let t=[];return e.forEach(r=>{this.ta.has(r)||t.push(new Zi(r))}),this.ta.forEach(r=>{e.has(r)||t.push(new Xi(r))}),t}ha(e){this.X_=e.ss,this.ta=R();let t=this.sa(e.documents);return this.applyChanges(t,!0)}Pa(){return wn.fromInitialDocuments(this.query,this.ra,this.mutatedKeys,this.ea===0,this.hasCachedResults)}},Wc=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},Qc=class{constructor(e){this.key=e,this.Ia=!1}},Yc=class{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ta={},this.Ea=new ut(a=>Yd(a),us),this.da=new Map,this.Aa=new Set,this.Ra=new B(E.comparator),this.Va=new Map,this.ma=new yr,this.fa={},this.ga=new Map,this.pa=gr.On(),this.onlineState="Unknown",this.ya=void 0}get isPrimaryClient(){return this.ya===!0}};async function Cv(n,e){let t=Mv(n),r,i,s=t.Ea.get(e);if(s)r=s.targetId,t.sharedClientState.addLocalQueryTarget(r),i=s.view.Pa();else{let o=await dv(t.localStore,Ke(e)),a=t.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,i=await Rv(t,e,r,a==="current",o.resumeToken),t.isPrimaryClient&&vf(t.remoteStore,o)}return i}async function Rv(n,e,t,r,i){n.wa=(h,d,f)=>async function(T,v,P,L){let O=v.view.sa(P);O.zi&&(O=await Ld(T.localStore,v.query,!1).then(({documents:j})=>v.view.sa(j,O)));let G=L&&L.targetChanges.get(v.targetId),te=v.view.applyChanges(O,T.isPrimaryClient,G);return Md(T,v.targetId,te.ca),te.snapshot}(n,h,d,f);let s=await Ld(n.localStore,e,!0),o=new Kc(e,s.ss),a=o.sa(s.documents),c=mr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),l=o.applyChanges(a,n.isPrimaryClient,c);Md(n,t,l.ca);let u=new Wc(e,t,o);return n.Ea.set(e,u),n.da.has(t)?n.da.get(t).push(e):n.da.set(t,[e]),l.snapshot}async function kv(n,e){let t=C(n),r=t.Ea.get(e),i=t.da.get(r.targetId);if(i.length>1)return t.da.set(r.targetId,i.filter(s=>!us(s,e))),void t.Ea.delete(e);t.isPrimaryClient?(t.sharedClientState.removeLocalQueryTarget(r.targetId),t.sharedClientState.isActiveQueryTarget(r.targetId)||await Lc(t.localStore,r.targetId,!1).then(()=>{t.sharedClientState.clearQueryState(r.targetId),wf(t.remoteStore,r.targetId),Jc(t,r.targetId)}).catch(Er)):(Jc(t,r.targetId),await Lc(t.localStore,r.targetId,!0))}async function Dv(n,e,t){let r=Fv(n);try{let i=await function(o,a){let c=C(o),l=ee.now(),u=a.reduce((f,b)=>f.add(b.key),R()),h,d;return c.persistence.runTransaction("Locally write mutations","readwrite",f=>{let b=We(),T=R();return c.Xi.getEntries(f,u).next(v=>{b=v,b.forEach((P,L)=>{L.isValidDocument()||(T=T.add(P))})}).next(()=>c.localDocuments.getOverlayedDocuments(f,b)).next(v=>{h=v;let P=[];for(let L of a){let O=q_(L,h.get(L.key).overlayedDocument);O!=null&&P.push(new Qe(L.key,O,zd(O.value.mapValue),ot.exists(!0)))}return c.mutationQueue.addMutationBatch(f,l,P,a)}).next(v=>{d=v;let P=v.applyToLocalDocumentSet(h,T);return c.documentOverlayCache.saveOverlays(f,v.batchId,P)})}).then(()=>({batchId:d.batchId,changes:Zd(h)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,a,c){let l=o.fa[o.currentUser.toKey()];l||(l=new B(N)),l=l.insert(a,c),o.fa[o.currentUser.toKey()]=l}(r,i.batchId,t),await Tr(r,i.changes),await ms(r.remoteStore)}catch(i){let s=_l(i,"Failed to persist write");t.reject(s)}}async function Rf(n,e){let t=C(n);try{let r=await lv(t.localStore,e);e.targetChanges.forEach((i,s)=>{let o=t.Va.get(s);o&&(M(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.Ia=!0:i.modifiedDocuments.size>0?M(o.Ia):i.removedDocuments.size>0&&(M(o.Ia),o.Ia=!1))}),await Tr(t,r,e)}catch(r){await Er(r)}}function Vd(n,e,t){let r=C(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.Ea.forEach((s,o)=>{let a=o.view.N_(e);a.snapshot&&i.push(a.snapshot)}),function(o,a){let c=C(o);c.onlineState=a;let l=!1;c.queries.forEach((u,h)=>{for(let d of h.listeners)d.N_(a)&&(l=!0)}),l&&vl(c)}(r.eventManager,e),i.length&&r.Ta.r_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Pv(n,e,t){let r=C(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Va.get(e),s=i&&i.key;if(s){let o=new B(E.comparator);o=o.insert(s,Te.newNoDocument(s,S.min()));let a=R().add(s),c=new Fi(S.min(),new Map,new B(N),o,a);await Rf(r,c),r.Ra=r.Ra.remove(s),r.Va.delete(e),wl(r)}else await Lc(r.localStore,e,!1).then(()=>Jc(r,e,t)).catch(Er)}async function Nv(n,e){let t=C(n),r=e.batch.batchId;try{let i=await cv(t.localStore,e);Df(t,r,null),kf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Tr(t,i)}catch(i){await Er(i)}}async function xv(n,e,t){let r=C(n);try{let i=await function(o,a){let c=C(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let u;return c.mutationQueue.lookupMutationBatch(l,a).next(h=>(M(h!==null),u=h.keys(),c.mutationQueue.removeMutationBatch(l,h))).next(()=>c.mutationQueue.performConsistencyCheck(l)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(l,u,a)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,u)).next(()=>c.localDocuments.getDocuments(l,u))})}(r.localStore,e);Df(r,e,t),kf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Tr(r,i)}catch(i){await Er(i)}}function kf(n,e){(n.ga.get(e)||[]).forEach(t=>{t.resolve()}),n.ga.delete(e)}function Df(n,e,t){let r=C(n),i=r.fa[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.fa[r.currentUser.toKey()]=i}}function Jc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.da.get(e))n.Ea.delete(r),t&&n.Ta.Sa(r,t);n.da.delete(e),n.isPrimaryClient&&n.ma.Ar(e).forEach(r=>{n.ma.containsKey(r)||Pf(n,r)})}function Pf(n,e){n.Aa.delete(e.path.canonicalString());let t=n.Ra.get(e);t!==null&&(wf(n.remoteStore,t),n.Ra=n.Ra.remove(e),n.Va.delete(t),wl(n))}function Md(n,e,t){for(let r of t)r instanceof Xi?(n.ma.addReference(r.key,e),Lv(n,r)):r instanceof Zi?(y("SyncEngine","Document no longer in limbo: "+r.key),n.ma.removeReference(r.key,e),n.ma.containsKey(r.key)||Pf(n,r.key)):I()}function Lv(n,e){let t=e.key,r=t.path.canonicalString();n.Ra.get(t)||n.Aa.has(r)||(y("SyncEngine","New document in limbo: "+t),n.Aa.add(r),wl(n))}function wl(n){for(;n.Aa.size>0&&n.Ra.size<n.maxConcurrentLimboResolutions;){let e=n.Aa.values().next().value;n.Aa.delete(e);let t=new E(q.fromString(e)),r=n.pa.next();n.Va.set(r,new Qc(t)),n.Ra=n.Ra.insert(t,r),vf(n.remoteStore,new pr(Ke(fl(t.path)),r,"TargetPurposeLimboResolution",lr.ae))}}async function Tr(n,e,t){let r=C(n),i=[],s=[],o=[];r.Ea.isEmpty()||(r.Ea.forEach((a,c)=>{o.push(r.wa(c,e,t).then(l=>{if((l||t)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(c.targetId,l?.fromCache?"not-current":"current"),l){i.push(l);let u=Pc.qi(c.targetId,l);s.push(u)}}))}),await Promise.all(o),r.Ta.r_(i),await async function(c,l){let u=C(c);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",h=>p.forEach(l,d=>p.forEach(d.Li,f=>u.persistence.referenceDelegate.addReference(h,d.targetId,f)).next(()=>p.forEach(d.ki,f=>u.persistence.referenceDelegate.removeReference(h,d.targetId,f)))))}catch(h){if(!br(h))throw h;y("LocalStore","Failed to update sequence numbers: "+h)}for(let h of l){let d=h.targetId;if(!h.fromCache){let f=u.Ji.get(d),b=f.snapshotVersion,T=f.withLastLimboFreeSnapshotVersion(b);u.Ji=u.Ji.insert(d,T)}}}(r.localStore,s))}async function Ov(n,e){let t=C(n);if(!t.currentUser.isEqual(e)){y("SyncEngine","User change. New user:",e.toKey());let r=await yf(t.localStore,e);t.currentUser=e,function(s,o){s.ga.forEach(a=>{a.forEach(c=>{c.reject(new _(m.CANCELLED,o))})}),s.ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Tr(t,r.ts)}}function Vv(n,e){let t=C(n),r=t.Va.get(e);if(r&&r.Ia)return R().add(r.key);{let i=R(),s=t.da.get(e);if(!s)return i;for(let o of s){let a=t.Ea.get(o);i=i.unionWith(a.view.ia)}return i}}function Mv(n){let e=C(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Rf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Vv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Pv.bind(null,e),e.Ta.r_=Av.bind(null,e.eventManager),e.Ta.Sa=Sv.bind(null,e.eventManager),e}function Fv(n){let e=C(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Nv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=xv.bind(null,e),e}var es=class{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=ds(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return av(this.persistence,new Nc,e.initialUser,this.serializer)}createPersistence(e){return new Rc(Dc.zr,this.serializer)}createSharedClientState(e){return new Oc}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}};var Xc=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Vd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Ov.bind(null,this.syncEngine),await Tv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new $c}()}createDatastore(e){let t=ds(e.databaseInfo.databaseId),r=function(s){return new Fc(s)}(e.databaseInfo);return function(s,o,a,c){return new Bc(s,o,a,c)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,a){return new Gc(r,i,s,o,a)}(this.localStore,this.datastore,e.asyncQueue,t=>Vd(this.syncEngine,t,0),function(){return Hi.v()?new Hi:new Vc}())}createSyncEngine(e,t){return function(i,s,o,a,c,l,u){let h=new Yc(i,s,o,a,c,l);return u&&(h.ya=!0),h}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(t){let r=C(t);y("RemoteStore","RemoteStore shutting down."),r.y_.add(5),await Ir(r),r.S_.shutdown(),r.b_.set("Unknown")}(this.remoteStore)}};var ts=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.va(this.observer.next,e)}error(e){this.observer.error?this.va(this.observer.error,e):$e("Uncaught Error in snapshot listener:",e.toString())}Ca(){this.muted=!0}va(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}};var Zc=class{constructor(e,t,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=J.UNAUTHENTICATED,this.clientId=Ni.V(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async s=>{y("FirestoreClient","Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(r,s=>(y("FirestoreClient","Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new _(m.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Ie;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=_l(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Pa(n,e){n.asyncQueue.verifyOperationInProgress(),y("FirestoreClient","Initializing OfflineComponentProvider");let t=await n.getConfiguration();await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await yf(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Fd(n,e){n.asyncQueue.verifyOperationInProgress();let t=await qv(n);y("FirestoreClient","Initializing OnlineComponentProvider");let r=await n.getConfiguration();await e.initialize(t,r),n.setCredentialChangeListener(i=>Od(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,s)=>Od(e.remoteStore,s)),n._onlineComponents=e}function Uv(n){return n.name==="FirebaseError"?n.code===m.FAILED_PRECONDITION||n.code===m.UNIMPLEMENTED:!(typeof DOMException<"u"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function qv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){y("FirestoreClient","Using user provided OfflineComponentProvider");try{await Pa(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!Uv(t))throw t;un("Error using user provided cache. Falling back to memory cache: "+t),await Pa(n,new es)}}else y("FirestoreClient","Using default OfflineComponentProvider"),await Pa(n,new es);return n._offlineComponents}async function Nf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(y("FirestoreClient","Using user provided OnlineComponentProvider"),await Fd(n,n._uninitializedComponentsProvider._online)):(y("FirestoreClient","Using default OnlineComponentProvider"),await Fd(n,new Xc))),n._onlineComponents}function Bv(n){return Nf(n).then(e=>e.syncEngine)}async function xf(n){let e=await Nf(n),t=e.eventManager;return t.onListen=Cv.bind(null,e.syncEngine),t.onUnlisten=kv.bind(null,e.syncEngine),t}function jv(n,e,t={}){let r=new Ie;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,a,c,l){let u=new ts({next:d=>{o.enqueueAndForget(()=>Cf(s,h));let f=d.docs.has(a);!f&&d.fromCache?l.reject(new _(m.UNAVAILABLE,"Failed to get document because the client is offline.")):f&&d.fromCache&&c&&c.source==="server"?l.reject(new _(m.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(d)},error:d=>l.reject(d)}),h=new Ji(fl(a.path),u,{includeMetadataChanges:!0,W_:!0});return Sf(s,h)}(await xf(n),n.asyncQueue,e,t,r)),r.promise}function Gv(n,e,t={}){let r=new Ie;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,a,c,l){let u=new ts({next:d=>{o.enqueueAndForget(()=>Cf(s,h)),d.fromCache&&c.source==="server"?l.reject(new _(m.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(d)},error:d=>l.reject(d)}),h=new Ji(a,u,{includeMetadataChanges:!0,W_:!0});return Sf(s,h)}(await xf(n),n.asyncQueue,e,t,r)),r.promise}function Lf(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Ud=new Map;function Of(n,e,t){if(!t)throw new _(m.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function zv(n,e,t,r){if(e===!0&&r===!0)throw new _(m.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function qd(n){if(!E.isDocumentKey(n))throw new _(m.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Bd(n){if(E.isDocumentKey(n))throw new _(m.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function El(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":I()}function dt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new _(m.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=El(n);throw new _(m.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}var ns=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new _(m.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new _(m.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}zv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Lf((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new _(m.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new _(m.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new _(m.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},En=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ns({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new _(m.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new _(m.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ns(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Na;switch(r.type){case"firstParty":return new Va(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new _(m.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=Ud.get(t);r&&(y("ComponentProvider","Removing Datastore"),Ud.delete(t),r.terminate())}(this),Promise.resolve()}};function Hv(n,e,t,r={}){var i;let s=(n=dt(n,En))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&un("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,c;if(typeof r.mockUserToken=="string")a=r.mockUserToken,c=J.MOCK_USER;else{a=Cu(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let l=r.mockUserToken.sub||r.mockUserToken.user_id;if(!l)throw new _(m.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new J(l)}n._authCredentials=new xa(new Pi(a,c))}}var rs=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},fe=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new at(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},at=class n extends rs{constructor(e,t,r){super(e,t,fl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new fe(this.firestore,null,new E(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function Vf(n,e,...t){if(n=ne(n),Of("collection","path",e),n instanceof En){let r=q.fromString(e,...t);return Bd(r),new at(n,null,r)}{if(!(n instanceof fe||n instanceof at))throw new _(m.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(q.fromString(e,...t));return Bd(r),new at(n.firestore,null,r)}}function Mf(n,e,...t){if(n=ne(n),arguments.length===1&&(e=Ni.V()),Of("doc","path",e),n instanceof En){let r=q.fromString(e,...t);return qd(r),new fe(n,null,new E(r))}{if(!(n instanceof fe||n instanceof at))throw new _(m.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(q.fromString(e,...t));return qd(r),new fe(n.firestore,n instanceof at?n.converter:null,new E(r))}}var el=class{constructor(){this.Wa=Promise.resolve(),this.Ga=[],this.za=!1,this.ja=[],this.Ha=null,this.Ja=!1,this.Ya=!1,this.Za=[],this.Ko=new $i(this,"async_queue_retry"),this.Xa=()=>{let t=Da();t&&y("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Ko.No()};let e=Da();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Xa)}get isShuttingDown(){return this.za}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.eu(),this.tu(e)}enterRestrictedMode(e){if(!this.za){this.za=!0,this.Ya=e||!1;let t=Da();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Xa)}}enqueue(e){if(this.eu(),this.za)return new Promise(()=>{});let t=new Ie;return this.tu(()=>this.za&&this.Ya?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Ga.push(e),this.nu()))}async nu(){if(this.Ga.length!==0){try{await this.Ga[0](),this.Ga.shift(),this.Ko.reset()}catch(e){if(!br(e))throw e;y("AsyncQueue","Operation failed with retryable error: "+e)}this.Ga.length>0&&this.Ko.xo(()=>this.nu())}}tu(e){let t=this.Wa.then(()=>(this.Ja=!0,e().catch(r=>{this.Ha=r,this.Ja=!1;let i=function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a}(r);throw $e("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.Ja=!1,r))));return this.Wa=t,t}enqueueAfterDelay(e,t,r){this.eu(),this.Za.indexOf(e)>-1&&(t=0);let i=zc.createAndSchedule(this,e,t,r,s=>this.ru(s));return this.ja.push(i),i}eu(){this.Ha&&I()}verifyOperationInProgress(){}async iu(){let e;do e=this.Wa,await e;while(e!==this.Wa)}su(e){for(let t of this.ja)if(t.timerId===e)return!0;return!1}ou(e){return this.iu().then(()=>{this.ja.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.ja)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.iu()})}_u(e){this.Za.push(e)}ru(e){let t=this.ja.indexOf(e);this.ja.splice(t,1)}};var Vt=class extends En{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=function(){return new el}(),this._persistenceKey=i?.name||"[DEFAULT]"}_terminate(){return this._firestoreClient||Ff(this),this._firestoreClient.terminate()}};function bl(n,e){let t=typeof n=="object"?n:Qr(),r=typeof n=="string"?n:e||"(default)",i=On(t,"firestore").getImmediate({identifier:r});if(!i._initialized){let s=Su("firestore");s&&Hv(i,...s)}return i}function Il(n){return n._firestoreClient||Ff(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function Ff(n){var e,t,r;let i=n._freezeSettings(),s=function(a,c,l,u){return new Ba(a,c,l,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,Lf(u.experimentalLongPollingOptions),u.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._firestoreClient=new Zc(n._authCredentials,n._appCheckCredentials,n._queue,s),!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.localCache.kind,_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider})}var _r=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(le.fromBase64String(e))}catch(t){throw new _(m.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(le.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var vr=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new _(m.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ye(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var is=class{constructor(e){this._methodName=e}};var wr=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new _(m.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new _(m.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return N(this._lat,e._lat)||N(this._long,e._long)}};var $v=/^__.*__$/,tl=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Qe(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ot(e,this.data,t,this.fieldTransforms)}};function Uf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw I()}}var nl=class n{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.au(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get uu(){return this.settings.uu}cu(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}lu(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.cu({path:r,hu:!1});return i.Pu(e),i}Iu(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.cu({path:r,hu:!1});return i.au(),i}Tu(e){return this.cu({path:void 0,hu:!0})}Eu(e){return ss(e,this.settings.methodName,this.settings.du||!1,this.path,this.settings.Au)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}au(){if(this.path)for(let e=0;e<this.path.length;e++)this.Pu(this.path.get(e))}Pu(e){if(e.length===0)throw this.Eu("Document fields must not be empty");if(Uf(this.uu)&&$v.test(e))throw this.Eu('Document fields cannot begin and end with "__"')}},rl=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ds(e)}Ru(e,t,r,i=!1){return new nl({uu:e,methodName:t,Au:r,path:ye.emptyPath(),hu:!1,du:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Kv(n){let e=n._freezeSettings(),t=ds(n._databaseId);return new rl(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Wv(n,e,t,r,i,s={}){let o=n.Ru(s.merge||s.mergeFields?2:0,e,t,i);Gf("Data must be an object, but it was:",o,r);let a=Bf(r,o),c,l;if(s.merge)c=new De(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){let u=[];for(let h of s.mergeFields){let d=Qv(e,h,t);if(!o.contains(d))throw new _(m.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);Jv(u,d)||u.push(d)}c=new De(u),l=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,l=o.fieldTransforms;return new tl(new be(a),c,l)}function qf(n,e){if(jf(n=ne(n)))return Gf("Unsupported field value:",e,n),Bf(n,e);if(n instanceof is)return function(r,i){if(!Uf(i.uu))throw i.Eu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Eu(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.hu&&e.uu!==4)throw e.Eu("Nested arrays are not supported");return function(r,i){let s=[],o=0;for(let a of r){let c=qf(a,i.Tu(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=ne(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return O_(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=ee.fromDate(r);return{timestampValue:ji(i.serializer,s)}}if(r instanceof ee){let s=new ee(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ji(i.serializer,s)}}if(r instanceof wr)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof _r)return{bytesValue:hf(i.serializer,r._byteString)};if(r instanceof fe){let s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Eu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:ml(r.firestore._databaseId||i.databaseId,r._key.path)}}throw i.Eu(`Unsupported field value: ${El(r)}`)}(n,e)}function Bf(n,e){let t={};return jd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):In(n,(r,i)=>{let s=qf(i,e.lu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function jf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ee||n instanceof wr||n instanceof _r||n instanceof fe||n instanceof is)}function Gf(n,e,t){if(!jf(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=El(t);throw r==="an object"?e.Eu(n+" a custom object"):e.Eu(n+" "+r)}}function Qv(n,e,t){if((e=ne(e))instanceof vr)return e._internalPath;if(typeof e=="string")return zf(n,e);throw ss("Field path arguments must be of type string or ",n,!1,void 0,t)}var Yv=new RegExp("[~\\*/\\[\\]]");function zf(n,e,t){if(e.search(Yv)>=0)throw ss(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new vr(...e.split("."))._internalPath}catch{throw ss(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ss(n,e,t,r,i){let s=r&&!r.isEmpty(),o=i!==void 0,a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new _(m.INVALID_ARGUMENT,a+n+c)}function Jv(n,e){return n.some(t=>t.isEqual(e))}var os=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new fe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new il(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(Hf("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},il=class extends os{data(){return super.data()}};function Hf(n,e){return typeof e=="string"?zf(n,e):e instanceof vr?e._internalPath:e._delegate._internalPath}function Xv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new _(m.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var sl=class{convertValue(e,t="none"){switch(Nt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return U(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(lt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw I()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return In(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertGeoPoint(e){return new wr(U(e.latitude),U(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=ll(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(hr(e));default:return null}}convertTimestamp(e){let t=ct(e);return new ee(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=q.fromString(e);M(gf(r));let i=new Vi(r.get(1),r.get(3)),s=new E(r.popFirst(5));return i.isEqual(t)||$e(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function Zv(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var Rt=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},as=class extends os{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new ln(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(Hf("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}},ln=class extends as{data(e={}){return super.data(e)}},ol=class{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Rt(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new ln(this._firestore,this._userDataWriter,r.key,r,new Rt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new _(m.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(a=>{let c=new ln(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Rt(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(a=>s||a.type!==3).map(a=>{let c=new ln(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Rt(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter),l=-1,u=-1;return a.type!==0&&(l=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),u=o.indexOf(a.doc.key)),{type:ew(a.type),doc:c,oldIndex:l,newIndex:u}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function ew(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return I()}}function $f(n){n=dt(n,fe);let e=dt(n.firestore,Vt);return jv(Il(e),n._key).then(t=>tw(e,n,t))}var cs=class extends sl{constructor(e){super(),this.firestore=e}convertBytes(e){return new _r(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new fe(this.firestore,null,t)}};function Kf(n){n=dt(n,rs);let e=dt(n.firestore,Vt),t=Il(e),r=new cs(e);return Xv(n._query),Gv(t,n._query).then(i=>new ol(e,r,n,i))}function Wf(n,e,t){n=dt(n,fe);let r=dt(n.firestore,Vt),i=Zv(n.converter,e,t);return Yf(r,[Wv(Kv(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,ot.none())])}function Qf(n){return Yf(dt(n.firestore,Vt),[new fr(n._key,ot.none())])}function Yf(n,e){return function(r,i){let s=new Ie;return r.asyncQueue.enqueueAndForget(async()=>Dv(await Bv(r),i,s)),s.promise}(Il(n),e)}function tw(n,e,t){let r=t.docs.get(e._key),i=new cs(n);return new as(n,i,e._key,r,new Rt(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(i){bn=i})(rt),nt(new pe("firestore",(r,{instanceIdentifier:i,options:s})=>{let o=r.getProvider("app").getImmediate(),a=new Vt(new La(r.getProvider("auth-internal")),new Fa(r.getProvider("app-check-internal")),function(l,u){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new _(m.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Vi(l.options.projectId,u)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),a._setSettings(s),a},"PUBLIC").setMultipleInstances(!0)),ve(pd,"4.1.0",e),ve(pd,"4.1.0","esm2017")})();var nw="firebase",rw="10.1.0";ve(nw,rw,"app");var Tl={};var Jf=function(){if(!Tl.apiKey)throw Error("Firebase config is not setup.");Mo(Tl)};function ps(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function fm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var mm=fm,pm=new Ge("auth","Firebase",fm());var Es=new et("@firebase/auth");function iw(n,...e){Es.logLevel<=k.WARN&&Es.warn(`Auth (${rt}): ${n}`,...e)}function ys(n,...e){Es.logLevel<=k.ERROR&&Es.error(`Auth (${rt}): ${n}`,...e)}function _e(n,...e){throw Gl(n,...e)}function Ve(n,...e){return Gl(n,...e)}function gm(n,e,t){let r=Object.assign(Object.assign({},mm()),{[e]:t});return new Ge("auth","Firebase",r).create(e,{appName:n.name})}function sw(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&_e(n,"argument-error"),gm(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Gl(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return pm.create(n,...e)}function w(n,e,...t){if(!n)throw Gl(e,...t)}function Oe(n){let e="INTERNAL ASSERTION FAILED: "+n;throw ys(e),new Error(e)}function Je(n,e){n||Oe(e)}function Rl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function ow(){return Xf()==="http:"||Xf()==="https:"}function Xf(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function aw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ow()||ku()||"connection"in navigator)?navigator.onLine:!0}function cw(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Ft=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,Je(t>e,"Short delay should be less than long delay!"),this.isMobile=Ru()||Du()}get(){return aw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function zl(n,e){Je(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var bs=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Oe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Oe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Oe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var lw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var uw=new Ft(3e4,6e4);function oe(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function ue(n,e,t,r,i={}){return ym(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});let a=Wt(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode),bs.fetch()(_m(n,n.config.apiHost,t,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},s))})}async function ym(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},lw),e);try{let i=new kl(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw Ar(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ar(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ar(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ar(n,"user-disabled",o);let u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw gm(n,u,l);_e(n,u)}}catch(i){if(i instanceof he)throw i;_e(n,"network-request-failed",{message:String(i)})}}async function zt(n,e,t,r,i={}){let s=await ue(n,e,t,r,i);return"mfaPendingCredential"in s&&_e(n,"multi-factor-auth-required",{_serverResponse:s}),s}function _m(n,e,t,r){let i=`${e}${t}?${r}`;return n.config.emulator?zl(n.config,i):`${n.config.apiScheme}://${i}`}var kl=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ve(this.auth,"network-request-failed")),uw.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function Ar(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=Ve(n,e,r);return i.customData._tokenResponse=t,i}async function hw(n,e){return ue(n,"POST","/v1/accounts:delete",e)}async function dw(n,e){return ue(n,"POST","/v1/accounts:lookup",e)}function Sr(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function vm(n,e=!1){let t=ne(n),r=await t.getIdToken(e),i=Hl(r);w(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Sr(Al(i.auth_time)),issuedAtTime:Sr(Al(i.iat)),expirationTime:Sr(Al(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Al(n){return Number(n)*1e3}function Hl(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ys("JWT malformed, contained fewer than 3 sections"),null;try{let i=yo(t);return i?JSON.parse(i):(ys("Failed to decode base64 JWT payload"),null)}catch(i){return ys("Caught error parsing JWT payload as JSON",i?.toString()),null}}function fw(n){let e=Hl(n);return w(e,"internal-error"),w(typeof e.exp<"u","internal-error"),w(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Cr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof he&&mw(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function mw({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Dl=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var Is=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Sr(this.lastLoginAt),this.creationTime=Sr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Ts(n){var e;let t=n.auth,r=await n.getIdToken(),i=await Cr(n,dw(t,{idToken:r}));w(i?.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?gw(s.providerUserInfo):[],a=pw(n.providerData,o),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!a?.length,u=c?l:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Is(s.createdAt,s.lastLoginAt),isAnonymous:u};Object.assign(n,h)}async function wm(n){let e=ne(n);await Ts(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function pw(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function gw(n){return n.map(e=>{var{providerId:t}=e,r=ps(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function yw(n,e){let t=await ym(n,{},async()=>{let r=Wt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=_m(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",bs.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}var As=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){w(e.idToken,"internal-error"),w(typeof e.idToken<"u","internal-error"),w(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):fw(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return w(!this.accessToken||this.refreshToken,e,"user-token-expired"),!t&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await yw(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new n;return r&&(w(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(w(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(w(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Oe("not implemented")}};function ft(n,e){w(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var Rr=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=ps(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Dl(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Is(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Cr(this,this.stsTokenManager.getToken(this.auth,e));return w(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return vm(this,e)}reload(){return wm(this)}_assign(e){this!==e&&(w(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){w(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ts(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){let e=await this.getIdToken();return await Cr(this,hw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,c,l,u;let h=(r=t.displayName)!==null&&r!==void 0?r:void 0,d=(i=t.email)!==null&&i!==void 0?i:void 0,f=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,b=(o=t.photoURL)!==null&&o!==void 0?o:void 0,T=(a=t.tenantId)!==null&&a!==void 0?a:void 0,v=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,P=(l=t.createdAt)!==null&&l!==void 0?l:void 0,L=(u=t.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:O,emailVerified:G,isAnonymous:te,providerData:j,stsTokenManager:Fe}=t;w(O&&Fe,e,"internal-error");let $t=As.fromJSON(this.name,Fe);w(typeof O=="string",e,"internal-error"),ft(h,e.name),ft(d,e.name),w(typeof G=="boolean",e,"internal-error"),w(typeof te=="boolean",e,"internal-error"),ft(f,e.name),ft(b,e.name),ft(T,e.name),ft(v,e.name),ft(P,e.name),ft(L,e.name);let Ue=new n({uid:O,auth:e,email:d,emailVerified:G,displayName:h,isAnonymous:te,photoURL:b,phoneNumber:f,tenantId:T,stsTokenManager:$t,createdAt:P,lastLoginAt:L});return j&&Array.isArray(j)&&(Ue.providerData=j.map(Ze=>Object.assign({},Ze))),v&&(Ue._redirectEventId=v),Ue}static async _fromIdTokenResponse(e,t,r=!1){let i=new As;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ts(s),s}};var Zf=new Map;function Ye(n){Je(n instanceof Function,"Expected a class definition");let e=Zf.get(n);return e?(Je(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Zf.set(n,e),e)}var Ss=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Ss.type="NONE";var Pl=Ss;function _s(n,e,t){return`firebase:${n}:${e}:${t}`}var Cs=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=_s(this.userKey,i.apiKey,s),this.fullPersistenceKey=_s("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?Rr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(Ye(Pl),e,r);let i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l),s=i[0]||Ye(Pl),o=_s(r,e.config.apiKey,e.name),a=null;for(let l of t)try{let u=await l._get(o);if(u){let h=Rr._fromJSON(e,u);l!==s&&(a=h),s=l;break}}catch{}let c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new n(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new n(s,e,r))}};function em(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Im(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Em(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Am(e))return"Blackberry";if(Sm(e))return"Webos";if($l(e))return"Safari";if((e.includes("chrome/")||bm(e))&&!e.includes("edge/"))return"Chrome";if(Tm(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Em(n=W()){return/firefox\//i.test(n)}function $l(n=W()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function bm(n=W()){return/crios\//i.test(n)}function Im(n=W()){return/iemobile/i.test(n)}function Tm(n=W()){return/android/i.test(n)}function Am(n=W()){return/blackberry/i.test(n)}function Sm(n=W()){return/webos/i.test(n)}function $s(n=W()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function _w(n=W()){var e;return $s(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function vw(){return Pu()&&document.documentMode===10}function Cm(n=W()){return $s(n)||Tm(n)||Sm(n)||Am(n)||/windows phone/i.test(n)||Im(n)}function ww(){try{return!!(window&&window!==window.top)}catch{return!1}}function Rm(n,e=[]){let t;switch(n){case"Browser":t=em(W());break;case"Worker":t=`${em(W())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${rt}/${r}`}async function km(n,e){return ue(n,"GET","/v2/recaptchaConfig",oe(n,e))}function tm(n){return n!==void 0&&n.enterprise!==void 0}var Rs=class{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(t=>t.provider==="EMAIL_PASSWORD_PROVIDER"&&t.enforcementState!=="OFF")}};function Ew(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}function Dm(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=Ve("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Ew().appendChild(r)})}function Pm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var bw="https://www.google.com/recaptcha/enterprise.js?render=",Iw="recaptcha-enterprise",Tw="NO_RECAPTCHA",ks=class{constructor(e){this.type=Iw,this.auth=Cn(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{km(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{let l=new Rs(c);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){let c=window.grecaptcha;tm(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(Tw)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!t&&tm(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}Dm(bw+a).then(()=>{i(a,s,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}};async function nm(n,e,t,r=!1){let i=new ks(n),s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}let o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}var Nl=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((o,a)=>{try{let c=e(s);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};var xl=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ds(this),this.idTokenSubscription=new Ds(this),this.beforeStateQueue=new Nl(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=pm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ye(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Cs.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var t;let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i?._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&c?.user&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return w(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ts(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=cw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){let t=e?ne(e):null;return t&&w(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&w(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Ye(e))})}async initializeRecaptchaConfig(){let e=await km(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),t=new Rs(e);this.tenantId==null?this._agentRecaptchaConfig=t:this._tenantRecaptchaConfigs[this.tenantId]=t,t.emailPasswordEnabled&&new ks(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ge("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&Ye(e)||this._popupRedirectResolver;w(t,this,"argument-error"),this.redirectPersistenceManager=await Cs.create(this,[Ye(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=this._isInitialized?Promise.resolve():this._initializationPromise;return w(o,this,"internal-error"),o.then(()=>s(this.currentUser)),typeof t=="function"?e.addObserver(t,r,i):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return w(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Rm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&iw(`Error while retrieving App Check token: ${t.error}`),t?.token}};function Cn(n){return ne(n)}var Ds=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Lu(t=>this.observer=t)}get next(){return w(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};function Nm(n,e){let t=On(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(_t(s,e??{}))return i;_e(i,"already-initialized")}return t.initialize({options:e})}function Aw(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Ye);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function xm(n,e,t){let r=Cn(n);w(r._canInitEmulator,r,"emulator-config-failed"),w(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!t?.disableWarnings,s=Lm(e),{host:o,port:a}=Sw(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Cw()}function Lm(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Sw(n){let e=Lm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:rm(r.substr(s.length+1))}}else{let[s,o]=r.split(":");return{host:s,port:rm(o)}}}function rm(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function Cw(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var Ut=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Oe("not implemented")}_getIdTokenResponse(e){return Oe("not implemented")}_linkToIdToken(e,t){return Oe("not implemented")}_getReauthenticationResolver(e){return Oe("not implemented")}};async function Rw(n,e){return ue(n,"POST","/v1/accounts:update",e)}async function Sl(n,e){return zt(n,"POST","/v1/accounts:signInWithPassword",oe(n,e))}async function kw(n,e){return zt(n,"POST","/v1/accounts:signInWithEmailLink",oe(n,e))}async function Dw(n,e){return zt(n,"POST","/v1/accounts:signInWithEmailLink",oe(n,e))}var kr=class n extends Ut{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){var t;switch(this.signInMethod){case"password":let r={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((t=e._getRecaptchaConfig())===null||t===void 0)&&t.emailPasswordEnabled){let i=await nm(e,r,"signInWithPassword");return Sl(e,i)}else return Sl(e,r).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");let s=await nm(e,r,"signInWithPassword");return Sl(e,s)}else return Promise.reject(i)});case"emailLink":return kw(e,{email:this._email,oobCode:this._password});default:_e(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Rw(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Dw(e,{idToken:t,email:this._email,oobCode:this._password});default:_e(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function An(n,e){return zt(n,"POST","/v1/accounts:signInWithIdp",oe(n,e))}var Pw="http://localhost",qt=class n extends Ut{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):_e("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=ps(t,["providerId","signInMethod"]);if(!r||!i)return null;let o=new n(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return An(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,An(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,An(e,t)}buildRequest(){let e={requestUri:Pw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Wt(t)}return e}};async function Nw(n,e){return ue(n,"POST","/v1/accounts:sendVerificationCode",oe(n,e))}async function xw(n,e){return zt(n,"POST","/v1/accounts:signInWithPhoneNumber",oe(n,e))}async function Lw(n,e){let t=await zt(n,"POST","/v1/accounts:signInWithPhoneNumber",oe(n,e));if(t.temporaryProof)throw Ar(n,"account-exists-with-different-credential",t);return t}var Ow={USER_NOT_FOUND:"user-not-found"};async function Vw(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return zt(n,"POST","/v1/accounts:signInWithPhoneNumber",oe(n,t),Ow)}var Dr=class n extends Ut{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return xw(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Lw(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Vw(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function Mw(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Fw(n){let e=Qt(Yt(n)).link,t=e?Qt(Yt(e)).deep_link_id:null,r=Qt(Yt(n)).deep_link_id;return(r?Qt(Yt(r)).link:null)||r||t||e||n}var Ps=class n{constructor(e){var t,r,i,s,o,a;let c=Qt(Yt(e)),l=(t=c.apiKey)!==null&&t!==void 0?t:null,u=(r=c.oobCode)!==null&&r!==void 0?r:null,h=Mw((i=c.mode)!==null&&i!==void 0?i:null);w(l&&u&&h,"argument-error"),this.apiKey=l,this.operation=h,this.code=u,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){let t=Fw(e);try{return new n(t)}catch{return null}}};var Sn=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return kr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Ps.parseLink(t);return w(r,"argument-error"),kr._fromEmailAndCode(e,r.code,r.tenantId)}};Sn.PROVIDER_ID="password";Sn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Sn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Pr=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var Bt=class extends Pr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Nr=class n extends Bt{constructor(){super("facebook.com")}static credential(e){return qt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Nr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Nr.PROVIDER_ID="facebook.com";var jt=class n extends Bt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return qt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};jt.GOOGLE_SIGN_IN_METHOD="google.com";jt.PROVIDER_ID="google.com";var xr=class n extends Bt{constructor(){super("github.com")}static credential(e){return qt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};xr.GITHUB_SIGN_IN_METHOD="github.com";xr.PROVIDER_ID="github.com";var Lr=class n extends Bt{constructor(){super("twitter.com")}static credential(e,t){return qt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Lr.TWITTER_SIGN_IN_METHOD="twitter.com";Lr.PROVIDER_ID="twitter.com";var Or=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await Rr._fromIdTokenResponse(e,r,i),o=im(r);return new n({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=im(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function im(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var Ll=class n extends he{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function Om(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ll._fromErrorAndOperation(n,s,e,r):s})}async function Uw(n,e,t=!1){let r=await Cr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Or._forOperation(n,"link",r)}async function qw(n,e,t=!1){let{auth:r}=n,i="reauthenticate";try{let s=await Cr(n,Om(r,i,e,n),t);w(s.idToken,r,"internal-error");let o=Hl(s.idToken);w(o,r,"internal-error");let{sub:a}=o;return w(n.uid===a,r,"user-mismatch"),Or._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&_e(r,"user-mismatch"),s}}async function Bw(n,e,t=!1){let r="signIn",i=await Om(n,r,e),s=await Or._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}function Vm(n,e,t,r){return ne(n).onIdTokenChanged(e,t,r)}function Mm(n,e,t){return ne(n).beforeAuthStateChanged(e,t)}function Kl(n,e,t,r){return ne(n).onAuthStateChanged(e,t,r)}function Wl(n){return ne(n).signOut()}function jw(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:start",oe(n,e))}function Gw(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:finalize",oe(n,e))}function zw(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:start",oe(n,e))}function Hw(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:finalize",oe(n,e))}var Ns="__sak";var xs=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ns,"1"),this.storage.removeItem(Ns),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};function $w(){let n=W();return $l(n)||$s(n)}var Kw=1e3,Ww=10,Ls=class extends xs{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=$w()&&ww(),this.fallbackToPolling=Cm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}let r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}let i=()=>{let o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);vw()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ww):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Kw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};Ls.type="LOCAL";var Fm=Ls;var Os=class extends xs{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Os.type="SESSION";var Ql=Os;function Qw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Vs=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let a=Array.from(o).map(async l=>l(t.origin,s)),c=await Qw(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Vs.receivers=[];function Yl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var Ol=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{let l=Yl("",20);i.port1.start();let u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(h){let d=h;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(d.data.response);break;default:clearTimeout(u),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function Me(){return window}function Yw(n){Me().location.href=n}function Um(){return typeof Me().WorkerGlobalScope<"u"&&typeof Me().importScripts=="function"}async function Jw(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Xw(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Zw(){return Um()?self:null}var qm="firebaseLocalStorageDb",eE=1,Ms="firebaseLocalStorage",Bm="fbase_key",Gt=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Ks(n,e){return n.transaction([Ms],e?"readwrite":"readonly").objectStore(Ms)}function tE(){let n=indexedDB.deleteDatabase(qm);return new Gt(n).toPromise()}function Vl(){let n=indexedDB.open(qm,eE);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(Ms,{keyPath:Bm})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(Ms)?e(r):(r.close(),await tE(),e(await Vl()))})})}async function sm(n,e,t){let r=Ks(n,!0).put({[Bm]:e,value:t});return new Gt(r).toPromise()}async function nE(n,e){let t=Ks(n,!1).get(e),r=await new Gt(t).toPromise();return r===void 0?null:r.value}function om(n,e){let t=Ks(n,!0).delete(e);return new Gt(t).toPromise()}var rE=800,iE=3,Fs=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Vl(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>iE)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Um()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Vs._getInstance(Zw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Jw(),!this.activeServiceWorker)return;this.sender=new Ol(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Xw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Vl();return await sm(e,Ns,"1"),await om(e,Ns),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>sm(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>nE(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>om(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=Ks(i,!1).getAll();return new Gt(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),rE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Fs.type="LOCAL";var jm=Fs;function sE(n,e){return ue(n,"POST","/v2/accounts/mfaSignIn:start",oe(n,e))}function oE(n,e){return ue(n,"POST","/v2/accounts/mfaSignIn:finalize",oe(n,e))}function aE(n,e){return ue(n,"POST","/v2/accounts/mfaSignIn:finalize",oe(n,e))}var wI=Pm("rcb"),EI=new Ft(3e4,6e4);var cE="recaptcha";async function lE(n,e,t){var r;let i=await t.verify();try{w(typeof i=="string",n,"argument-error"),w(t.type===cE,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let o=s.session;if("phoneNumber"in s)return w(o.type==="enroll",n,"internal-error"),(await jw(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{w(o.type==="signin",n,"internal-error");let a=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return w(a,n,"missing-multi-factor-info"),(await sE(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:o}=await Nw(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}var Vr=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=Cn(e)}verifyPhoneNumber(e,t){return lE(this.auth,e,ne(t))}static credential(e,t){return Dr._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Dr._fromTokenResponse(t,r):null}};Vr.PROVIDER_ID="phone";Vr.PHONE_SIGN_IN_METHOD="phone";function Gm(n,e){return e?Ye(e):(w(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Mr=class extends Ut{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return An(e,this._buildIdpRequest())}_linkToIdToken(e,t){return An(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return An(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function uE(n){return Bw(n.auth,new Mr(n),n.bypassAuthState)}function hE(n){let{auth:e,user:t}=n;return w(t,e,"internal-error"),qw(t,new Mr(n),n.bypassAuthState)}async function dE(n){let{auth:e,user:t}=n;return w(t,e,"internal-error"),Uw(t,new Mr(n),n.bypassAuthState)}var Us=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}let c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return uE;case"linkViaPopup":case"linkViaRedirect":return dE;case"reauthViaPopup":case"reauthViaRedirect":return hE;default:_e(this.auth,"internal-error")}}resolve(e){Je(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Je(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var fE=new Ft(2e3,1e4);var Ml=class n extends Us{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return w(e,this.auth,"internal-error"),e}async onExecution(){Je(this.filter.length===1,"Popup operations only handle one event");let e=Yl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ve(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ve(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ve(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,fE.get())};e()}};Ml.currentPopupAction=null;var mE="pendingRedirect",vs=new Map,Fl=class extends Us{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=vs.get(this.auth._key());if(!e){try{let r=await pE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}vs.set(this.auth._key(),e)}return this.bypassAuthState||vs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function pE(n,e){let t=Hm(e),r=zm(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}async function gE(n,e){return zm(n)._set(Hm(e),"true")}function yE(n,e){vs.set(n._key(),e)}function zm(n){return Ye(n._redirectPersistence)}function Hm(n){return _s(mE,n.config.apiKey,n.name)}function Jl(n,e,t){return _E(n,e,t)}async function _E(n,e,t){let r=Cn(n);sw(n,e,Pr),await r._initializationPromise;let i=Gm(r,t);return await gE(i,r),i._openRedirect(r,e,"signInViaRedirect")}async function vE(n,e,t=!1){let r=Cn(n),i=Gm(r,e),o=await new Fl(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}var wE=10*60*1e3,Ul=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!EE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!$m(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ve(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=wE&&this.cachedEventUids.clear(),this.cachedEventUids.has(am(e))}saveEventToCache(e){this.cachedEventUids.add(am(e)),this.lastProcessedEventTime=Date.now()}};function am(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function $m({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function EE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return $m(n);default:return!1}}async function bE(n,e={}){return ue(n,"GET","/v1/projects",e)}var IE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,TE=/^https?/;async function AE(n){if(n.config.emulator)return;let{authorizedDomains:e}=await bE(n);for(let t of e)try{if(SE(t))return}catch{}_e(n,"unauthorized-domain")}function SE(n){let e=Rl(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!TE.test(t))return!1;if(IE.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var CE=new Ft(3e4,6e4);function cm(){let n=Me().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function RE(n){return new Promise((e,t)=>{var r,i,s;function o(){cm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{cm(),t(Ve(n,"network-request-failed"))},timeout:CE.get()})}if(!((i=(r=Me().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Me().gapi)===null||s===void 0)&&s.load)o();else{let a=Pm("iframefcb");return Me()[a]=()=>{gapi.load?o():t(Ve(n,"network-request-failed"))},Dm(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw ws=null,e})}var ws=null;function kE(n){return ws=ws||RE(n),ws}var DE=new Ft(5e3,15e3),PE="__/auth/iframe",NE="emulator/auth/iframe",xE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},LE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function OE(n){let e=n.config;w(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?zl(e,NE):`https://${n.config.authDomain}/${PE}`,r={apiKey:e.apiKey,appName:n.name,v:rt},i=LE.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Wt(r).slice(1)}`}async function VE(n){let e=await kE(n),t=Me().gapi;return w(t,n,"internal-error"),e.open({where:document.body,url:OE(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:xE,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let o=Ve(n,"network-request-failed"),a=Me().setTimeout(()=>{s(o)},DE.get());function c(){Me().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}var ME={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},FE=500,UE=600,qE="_blank",BE="http://localhost",qs=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function jE(n,e,t,r=FE,i=UE){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),a="",c=Object.assign(Object.assign({},ME),{width:r.toString(),height:i.toString(),top:s,left:o}),l=W().toLowerCase();t&&(a=bm(l)?qE:t),Em(l)&&(e=e||BE,c.scrollbars="yes");let u=Object.entries(c).reduce((d,[f,b])=>`${d}${f}=${b},`,"");if(_w(l)&&a!=="_self")return GE(e||"",a),new qs(null);let h=window.open(e||"",a,u);w(h,n,"popup-blocked");try{h.focus()}catch{}return new qs(h)}function GE(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var zE="__/auth/handler",HE="emulator/auth/handler",$E=encodeURIComponent("fac");async function lm(n,e,t,r,i,s){w(n.config.authDomain,n,"auth-domain-config-required"),w(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:rt,eventId:i};if(e instanceof Pr){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",xu(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[u,h]of Object.entries(s||{}))o[u]=h}if(e instanceof Bt){let u=e.getScopes().filter(h=>h!=="");u.length>0&&(o.scopes=u.join(","))}n.tenantId&&(o.tid=n.tenantId);let a=o;for(let u of Object.keys(a))a[u]===void 0&&delete a[u];let c=await n._getAppCheckToken(),l=c?`#${$E}=${encodeURIComponent(c)}`:"";return`${KE(n)}?${Wt(a).slice(1)}${l}`}function KE({config:n}){return n.emulator?zl(n,HE):`https://${n.authDomain}/${zE}`}var Cl="webStorageSupport",ql=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ql,this._completeRedirectFn=vE,this._overrideRedirectResult=yE}async _openPopup(e,t,r,i){var s;Je((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let o=await lm(e,t,r,Rl(),i);return jE(e,o,Yl())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await lm(e,t,r,Rl(),i);return Yw(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Je(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await VE(e),r=new Ul(e);return t.register("authEvent",i=>(w(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Cl,{type:Cl},i=>{var s;let o=(s=i?.[0])===null||s===void 0?void 0:s[Cl];o!==void 0&&t(!!o),_e(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=AE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Cm()||$l()||$s()}},Km=ql,Bs=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Oe("unexpected MultiFactorSessionType")}}},Bl=class n extends Bs{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return Gw(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return oE(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},js=class{constructor(){}static assertion(e){return Bl._fromCredential(e)}};js.FACTOR_ID="phone";var Gs=class{static assertionForEnrollment(e,t){return zs._fromSecret(e,t)}static assertionForSignIn(e,t){return zs._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;w(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let i=await zw(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Hs._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};Gs.FACTOR_ID="totp";var zs=class n extends Bs{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return w(typeof this.secret<"u",e,"argument-error"),Hw(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){w(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return aE(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Hs=class n{constructor(e,t,r,i,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(gs(e)||gs(t))&&(i=!0),i&&(gs(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),gs(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function gs(n){return typeof n>"u"||n?.length===0}var um="@firebase/auth",hm="1.1.0";var jl=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){w(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function WE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function QE(n){nt(new pe("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;w(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Rm(n)},l=new xl(r,i,s,c);return Aw(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),nt(new pe("auth-internal",e=>{let t=Cn(e.getProvider("auth").getImmediate());return(r=>new jl(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ve(um,hm,WE(n)),ve(um,hm,"esm2017")}var YE=5*60,JE=Eo("authIdTokenMaxAge")||YE,dm=null,XE=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>JE)return;let i=t?.token;dm!==i&&(dm=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Fr(n=Qr()){let e=On(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Nm(n,{popupRedirectResolver:Km,persistence:[jm,Fm,Ql]}),r=Eo("authTokenSyncURL");if(r){let s=XE(r);Mm(t,s,()=>s(t.currentUser)),Vm(t,o=>s(o))}let i=vo("auth");return i&&xm(t,`http://${i}`),t}QE("Browser");var Zl=!1,Xl=null,Rn=null,eu=function(){return Xl},Ur=function(){return eu()!==null},tu=function(n,e){let t=n.code||"",r=n.message||"",i=`${e} auth error ${t}: ${r}`;console.log(i),Rn&&Rn.trigger("error:display",i)},Wm=async function(){if(Zl)try{let n=Fr(),e=new jt;await Jl(n,e)}catch(n){tu(n,"signIn")}},Qm=function(n){Rn=n;try{Jf();let e=Fr();Zl=!0,Kl(e,t=>{t!=null?(console.log("Auth state changed to have a user."),Xl=t,Rn.trigger("auth:signin")):(console.log("Auth state changed to no user."),Xl=null,Rn.trigger("auth:signout"))}),Rn.trigger("auth:enabled")}catch(e){tu(e,"monitorAuth")}},Ym=function(){if(!Zl)return;let n=Fr();Wl(n).then(()=>{}).catch(e=>{tu(e,"signOut")})};var Ws=function(){let n=eu();if(!n||!n.uid)throw new Error("User not authed.");return n.uid},nu=function(n,e){let t=bl();return Mf(t,`/users/${n}/characters`,e)},ZE=function(n){let e=bl();return Vf(e,`/users/${n}/characters`)},eb=async function(n){let e=Ws();if(!e)return null;let t=nu(e,n);try{let r=await $f(t);return r.exists()?r.data():null}catch(r){throw console.log(`Database.get error: ${r}`),new Error(`Database.get error: ${r}`)}},tb=async function(n,e){let t=Ws();if(!t)return!1;let r=nu(t,n);try{await Wf(r,e)}catch(i){throw console.log(`Database.set error: ${i}`),new Error(`Database.set error: ${i}`)}return!0},nb=async function(){let n=Ws();if(!n)return[];let e=[];try{(await Kf(ZE(n))).forEach(r=>{e.push(r.data())})}catch(t){throw console.log(`Database.getAll error: ${t}`),new Error(`Database.getAll error: ${t}`)}return e},rb=async function(n){let e=Ws();if(!e)return!1;let t=nu(e,n);try{await Qf(t)}catch(r){throw console.log(`Database.remove error: ${r}`),new Error(`Database.remove error: ${r}`)}return!0},qr={get:eb,set:tb,getAll:nb,remove:rb};var ru=class{constructor(e){this.tablist=e,this.tabs=[],this.panes=[],e&&(this.tabs=e.querySelectorAll("a[role=tab]"),this.panes=e.parentNode.querySelectorAll("section[role=tabpanel]"),Array.from(this.tabs).forEach(t=>{t.addEventListener("click",this.changeTab.bind(this))}))}switchToPane(e){let t=-1;if(e)t=Array.prototype.findIndex.call(this.panes,r=>r.id===e);else{let r=this.tablist.querySelector("[aria-selected=true]");t=Array.prototype.indexOf.call(this.tabs,r)+1,t>=this.tabs.length&&(t=0)}t!==-1&&this.tabs[t].click()}changeTab(e){e.preventDefault();let t=this.tablist.querySelector("[aria-selected=true]");if(!t)return;let r=Array.prototype.indexOf.call(this.tabs,t),i=e.currentTarget,s=Array.prototype.indexOf.call(this.tabs,i);if(r===s)return;t.setAttribute("aria-selected",!1),i.setAttribute("aria-selected",!0);let o=this.panes[r];o&&(o.hidden=!0);let a=this.panes[s];a&&(a.hidden=!1,a.querySelector("[data-name]").focus())}},Jm=ru;var Xm=document.createElement("template");Xm.innerHTML=`
<link rel="stylesheet" href="./styles.css">
<header class="page-header">
    <h1 class="pc-charname" aria-label="Character Name"><field-editable data-name="charname" id="page-top" placeholder="Character Name"></field-editable></h1>
</header>
`;var Qs=class extends HTMLElement{constructor({emitter:e=null,templateNode:t=null}){super(),this.emitter=e,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Xm.content.cloneNode(!0)),t&&this.shadowRoot.appendChild(t),this.dataset.sheetview="true"}connectedCallback(){this.mainTabs=new Jm(this.shadowRoot.querySelector("ul[role=tablist]")),this.shadowRoot.addEventListener("fieldChange",this._handleFieldChange.bind(this)),Array.from(this.shadowRoot.querySelectorAll("input[type=number]")).forEach(e=>{e.addEventListener("change",this._numberInputChange.bind(this))}),this.emitter.on("tab:switch",this.switchToPane,this)}disconnectedCallback(){this.shadowRoot.removeEventListener("fieldChange",this._handleFieldChange.bind(this)),Array.from(this.shadowRoot.querySelectorAll("input[type=number]")).forEach(t=>{t.removeEventListener("change",this._numberInputChange.bind(this))}),this.emitter.off("tab:switch",this.switchToPane,this),document.querySelector("footer-nav").removeLinks()}_validateCharacter(e){throw new Error("Invalid character type for this view.")}set character(e){this._validateCharacter(e),this.cur_character=e,this.emitter.trigger("character:set"),this.renderCharacter()}get character(){return this.cur_character}switchToPane(e){this.mainTabs&&this.mainTabs.switchToPane(e)}_renderCustomFields(e,t,r,i){return!1}_renderCustomPost(){}renderCharacter(){if(this.cur_character===null)return;this.shadowRoot.querySelector('[data-name="charname"]').content=this.cur_character.charname,Array.from(this.shadowRoot.querySelectorAll("*[data-name]")).forEach(t=>{let r=t.getAttribute("data-name");if(typeof this.cur_character[r]>"u")return;let i=t.getAttribute("data-subfield"),s=i?this.cur_character[r][i]:this.cur_character[r];switch(t.tagName){case"INPUT":case"TEXTAREA":case"SELECT":t.getAttribute("type")==="number"?t.value=s||0:t.value=s||"";let o=new Event("change");t.dispatchEvent(o);break;case"SIMPLE-LIST":t.clear();let a=s||[];a.length>0&&a.forEach(u=>{u.length!==0&&t.addItem(u)}),t.addItem();break;case"NOTE-LIST":t.clear();let c=s||[];c.length>0&&c.forEach(u=>{u.length!==0&&t.addItem(u)}),t.addItem();break;case"TABLE-EDITABLE":t.clear();let l=s||[];l.length>0&&l.forEach(u=>{u.length!==0&&t.addRow(u)}),t.addRow();break;case"FIELD-EDITABLE":t.content=s||"";break;default:this._renderCustomFields(t,r,i,s)||t.getAttribute("content-editable")==="true"&&(t.innerHTML=s||"")}}),this._renderCustomPost(),this.emitter.trigger("dialog:save:hide")}_showUnsavedDialog(){this.emitter.trigger("dialog:save:show")}_sameValues(e,t){return JSON.stringify(e)===JSON.stringify(t)}_customFieldChange(e,t,r){return!1}_handleFieldChange(e){let t=e.detail.field||"",r=e.detail.subfield||"";if(!t)return;let i=this.cur_character;if(typeof i[t]>"u"||this._customFieldChange(e,t,r))return;let s=e.detail.value;if(r){if(typeof i[t]!="object"||Array.isArray(i[t]))return;let a=i[t][r];this._sameValues(a,s)||(i[t][r]=e.detail.value,this._showUnsavedDialog());return}let o=i[t];this._sameValues(o,s)||(i[t]=s,this._showUnsavedDialog())}_customNumberInputChange(){}_numberInputChange(e){let t=e.target.dataset.name,r=e.target.dataset.subfield;if(typeof this.cur_character[t][r]>"u")return;let i=parseInt(e.target.value,10);this.cur_character[t][r]=i,this.emitter.trigger("dialog:save:show"),this._customNumberInputChange(e)}navigateTo(e){let t=this.shadowRoot.querySelector(e);t&&(t.scrollIntoView(),t.focus())}};window.customElements.get("sheet-view")||window.customElements.define("sheet-view",Qs);var kn=Qs;var Ys=class{constructor(e,t,r){this.el=e,this.cur_character=t,this.emitter=r,this.el.addEventListener("click",this._openSpellModal.bind(this))}async getSpellData(e){let t=`https://www.dnd5eapi.co/api/spells?level=${e}&school=illusion&school=abjuration&school=conjuration&school=divination&school=enchantment&school=evocation&school=necromancy&school=psionic&school=transmutation`,r=await fetch(t,{method:"GET"}),{results:i}=await r.json();if(!r.ok)throw new Error("Error fetching API resource.");return i}async _openSpellModal(e){if(this.spellDialog=this.spellDialog||document.getElementById("dialog-spells"),this.spellDialog.clear(),this.spellDialog.isOpen){this.spellDialog.close();return}let t=document.getElementById("spellModal"),r=document.importNode(t.content,!0),i=r.querySelector("ul"),s=e.target.dataset.level;try{(await this.getSpellData(s)).forEach(a=>{let c=document.createElement("div"),l=document.createElement("button"),u=a.name.replace(/ /g,"-").replace(/'/g,"'");l.innerText=a.name,l.dataset.field="spells",l.dataset.subfield=s,l.dataset.name=u,l.classList.add("btn","btn-plain"),l.addEventListener("click",this._handleAddNewSpell.bind(this)),c.appendChild(l),i.appendChild(c)})}catch(o){console.log(o);let a=document.createElement("div");a.innerText="Unable to access this resource at the moment.",i.appendChild(a)}this.spellDialog.setContent([...r.children]),this.spellDialog.open()}_handleAddNewSpell(e){let t=e.target.dataset.field,r=e.target.dataset.subfield,i=e.target.dataset.name;if(typeof this.cur_character[t][r]>"u")return;let o=[...this.cur_character[t][r],i],a=this.cur_character.spell_slots[r]+1;this.cur_character.spell_slots[r]=a,this.cur_character[t][r]=o,this.emitter.trigger("character:update:spells")}};window.customElements.get("add-spell")||window.customElements.define("add-spell",Ys);var Zm=Ys;var ep=document.createElement("template");ep.innerHTML=`
<ul id="toptabs" role="tablist">
    <li role="presentation"><a role="tab" id="tab-stats" href="#pane-stats" aria-selected="true">Statistics, Abilities, Equipment, etc.</a></li>
    <li role="presentation"><a role="tab" id="tab-notes" href="#pane-notes" aria-selected="false">Notes, Personality, NPCs, etc.</a></li>
</ul>

<section id="pane-stats" class="grid" role="tabpanel" aria-labelledby="tab-stats">
    <section class="fullwidth">
        <dl class="field">
            <div>
                <dt>Class</dt><dd><field-editable data-name="charclass"></field-editable></dd>
            </div>
            <div>
                <dt>Race</dt><dd><field-editable data-name="race"></field-editable></dd>
            </div>
            <div>
                <dt>Background</dt><dd><field-editable data-name="background"></field-editable></dd>
            </div>
            <div>
                <dt>Alignment</dt><dd><field-editable data-name="alignment"></field-editable></dd>
            </div>
            <div>
                <dt>Level</dt><dd><field-editable data-name="level" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Experience</dt><dd><field-editable data-name="experience" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Proficiency Bonus</dt><dd class="small" data-name="proficiency"></dd>
            </div>
            <div>
                <dt>Inspiration</dt><dd><field-editable data-name="inspiration" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Speed</dt><dd><field-editable data-name="speed" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Hit Dice</dt>
                <dd>
                    <field-editable class="smallinline" data-name="hd_cur" placeholder="0" aria-label="Current Hit Dice"></field-editable> <strong>/</strong> <field-editable class="smallinline" data-name="hd_max" placeholder="0" aria-label="Maximum Hit Dice"></field-editable>
                </dd>
            </div>
            <div class="with_icon">
                <dt>Armor Class</dt><dd><field-editable data-name="armor_class" placeholder="10" class="small"></field-editable></dd>
            </div>
            <div class="with_icon">
                <dt>Hit Points</dt>
                <dd>
                    <field-editable class="smallinline" data-name="hp_cur" placeholder="0" aria-label="Current Hit Points"></field-editable> <strong>/</strong> <field-editable class="smallinline" data-name="hp_max" placeholder="0" aria-label="Maximum Hit Points"></field-editable>
                </dd>
            </div>
            <div>
                <dt>Death Save Success/Fail</dt>
                <dd>
                    <input type="number" class="small" name="death_success" data-name="deathSave" data-subfield="success" value="0" min="0" max="3" aria-label="Death Save Successes" />
                    <strong>/</strong>
                    <input type="number" class="small" name="death_fail" data-name="deathSave" data-subfield="fail" value="0" min="0" max="3" aria-label="Death Save Fails" />
                </dd>
            </div>
            <div class="with_icon">
                <dt>Class Points</dt>
                <dd>
                    <input type="number" class="small" data-name="class_points" data-subfield="cur" placeholder="0" min="0" aria-label="Current Class Points"/> <strong>/</strong> <input type="number" class="small" data-name="class_points" data-subfield="max" placeholder="0" min="0" aria-label="Maximum Class Points" />
                </dd>
            </div>
        </dl>
    </section>

    <section>
        <h2 id="page-attributes">Attributes</h2>
        <section class="pc-attributes" aria-labelledby="page-attributes" role="list">
            <attr-listing data-name="str">Str</attr-listing>
            <attr-listing data-name="dex">Dex</attr-listing>
            <attr-listing data-name="con">Con</attr-listing>
            <attr-listing data-name="intel">Int</attr-listing>
            <attr-listing data-name="wis">Wis</attr-listing>
            <attr-listing data-name="cha">Cha</attr-listing>
        </section>

        <h2 id="page-skills">Skills</h2>
        <section class="pc-skills" aria-labelledby="ppage-skills" role="list">
            <skill-listing data-name="skills" data-subfield="acrobatics">Acrobatics (Dex)</skill-listing>
            <skill-listing data-name="skills" data-subfield="animal_handling">Animal Handling (Wis)</skill-listing>
            <skill-listing data-name="skills" data-subfield="arcana">Arcana (Int)</skill-listing>
            <skill-listing data-name="skills" data-subfield="athletics">Athletics (Str)</skill-listing>
            <skill-listing data-name="skills" data-subfield="deception">Deception (Cha)</skill-listing>
            <skill-listing data-name="skills" data-subfield="history">History (Int)</skill-listing>
            <skill-listing data-name="skills" data-subfield="insight">Insight (Wis)</skill-listing>
            <skill-listing data-name="skills" data-subfield="intimidation">Intimidation (Cha)</skill-listing>
            <skill-listing data-name="skills" data-subfield="investigation">Investigation (Int)</skill-listing>
            <skill-listing data-name="skills" data-subfield="medicine">Medicine (Wis)</skill-listing>
            <skill-listing data-name="skills" data-subfield="nature">Nature (Int)</skill-listing>
            <skill-listing data-name="skills" data-subfield="perception">Perception (Wis)</skill-listing>
            <skill-listing data-name="skills" data-subfield="performance">Performance (Cha)</skill-listing>
            <skill-listing data-name="skills" data-subfield="persuasion">Persuasion (Cha)</skill-listing>
            <skill-listing data-name="skills" data-subfield="religion">Religion (Int)</skill-listing>
            <skill-listing data-name="skills" data-subfield="sleight_of_hand">Sleight of Hand (Dex)</skill-listing>
            <skill-listing data-name="skills" data-subfield="stealth">Stealth (Dex)</skill-listing>
            <skill-listing data-name="skills" data-subfield="survival">Survival (Wis)</skill-listing>
        </section>
    </section>

    <section class="grid-span-col-2">
        <h2>Dice Roller</h2>
        <dice-roller>
            <button type="button" slot="rollbuttons" data-die="1d20">1d20</button>
            <button type="button" slot="rollbuttons" data-die="1d12">1d12</button>
            <button type="button" slot="rollbuttons" data-die="1d10">1d10</button>
            <button type="button" slot="rollbuttons" data-die="1d8">1d8</button>
            <button type="button" slot="rollbuttons" data-die="1d6">1d6</button>
            <button type="button" slot="rollbuttons" data-die="1d4">1d4</button>
        </dice-roller>
        <h2>Weapons & Attacks</h2>
        <table-editable columns="Name||Attack||Damage||Notes" data-name="weapons"></table-editable>

        <h2>Features & Traits</h2>
        <simple-list data-name="features"></simple-list>

        <h2>Other Proficiencies</h2>
        <field-editable class="largearea" data-name="proficiencies_other"></field-editable>

        <h2>Equipment</h2>
        <simple-list data-name="equipment"></simple-list>

        <dl class="field">
            <div>
                <dt>CP</dt><dd><field-editable data-name="cp" placeholder="0" class="small"></field-editable></dd>
                <dt>SP</dt><dd><field-editable data-name="sp" placeholder="0" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>GP</dt><dd><field-editable data-name="gp" placeholder="0" class="small"></field-editable></dd>
                <dt>PP</dt><dd><field-editable data-name="pp" placeholder="0" class="small"></field-editable></dd>
            </div>
        </dl>
    </section>

    <section class="fullwidth">
        <h2 id="page-spells">Spells</h2>

        <dl class="field">
            <div>
                <dt>Spell Ability</dt><dd><field-editable data-name="spell_ability"></field-editable></dd>
            </div>
            <div>
                <dt>Spell Save DC</dt><dd><field-editable data-name="spell_save"></field-editable></dd>
            </div>
            <div>
                <dt>Spell Attack Bonus</dt><dd><field-editable data-name="spell_attack"></field-editable></dd>
            </div>
        </dl>

    
    <h3>Spell Slots</h3>

    <dl class="field">
        <div>
            <dt>1st</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="1" aria-label="Current spell slots: Level 1" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="1" aria-label="Max spell slots: Level 1" min="0" value="0" />
            </dd>
            <dt>2nd</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="2" aria-label="Current spell slots: Level 2" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="2" aria-label="Max spell slots: Level 2" min="0" value="0" />
            </dd>
        </div>
        <div>
            <dt>3rd</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="3" aria-label="Current spell slots: Level 3" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="3" aria-label="Max spell slots: Level 3" min="0" value="0" />
            </dd>
            <dt>4th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="4" aria-label="Current spell slots: Level 4" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="4" aria-label="Max spell slots: Level 4" min="0" value="0" />
            </dd>
        </div>
        <div>
            <dt>5th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="5" aria-label="Current spell slots: Level 5" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="5" aria-label="Max spell slots: Level 5" min="0" value="0" />
            </dd>
            <dt>6th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="6" aria-label="Current spell slots: Level 6" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="6" aria-label="Max spell slots: Level 6" min="0" value="0" />
            </dd>
        </div>
        <div>
            <dt>7th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="7" aria-label="Current spell slots: Level 7" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="7" aria-label="Max spell slots: Level 7" min="0" value="0" />
            </dd>
            <dt>8th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="8" aria-label="Current spell slots: Level 8" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="8" aria-label="Max spell slots: Level 8" min="0" value="0" />
            </dd>
        </div>
        <div>
            <dt>9th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="9" aria-label="Current spell slots: Level 9" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="9" aria-label="Max spell slots: Level 9" min="0" value="0" />
            </dd>
        </div>
    </dl>
</section>

    <section>
        <h3>Cantrips <span><button type="button" class="btn btn-plain btn-sm" data-level="0">Add Spell</button></span></h3>
        <simple-list data-name="spells" data-subfield="0"></simple-list>
    </section>
    <section hidden>
        <h3>1st <span><button type="button" class="btn btn-plain btn-sm" data-level="1">Add Spell</button></span></h3>
        <simple-list data-name="spells" data-subfield="1"></simple-list>
    </section>
    <section hidden>
        <h3>2nd <span><button type="button" class="btn btn-plain btn-sm" data-level="2">Add Spell</button></span></h3>
        <simple-list data-name="spells" data-subfield="2"></simple-list>
    </section>
    <section hidden>
        <h3>3rd <span><button type="button" class="btn btn-plain btn-sm" data-level="3">Add Spell</button></span></h3>
        <simple-list data-name="spells" data-subfield="3"></simple-list>
    </section>
    <section hidden>
        <h3>4th <span><button type="button" class="btn btn-plain btn-sm" data-level="4">Add Spell</button></span></h3>
        <simple-list data-name="spells" data-subfield="4"></simple-list>
    </section>
    <section hidden>
        <h3>5th <span><button type="button" class="btn btn-plain btn-sm" data-level="5">Add Spell</button></span></h3>
        <simple-list data-name="spells" data-subfield="5"></simple-list>
    </section>
    <section hidden>
        <h3>6th <span><button type="button" class="btn btn-plain btn-sm" data-level="6">Add Spell</button></span></h3>
        <simple-list data-name="spells" data-subfield="6"></simple-list>
    </section>
    <section hidden>
        <h3>7th <span><button type="button" class="btn btn-plain btn-sm" data-level="7">Add Spell</button></span></h3>
        <simple-list data-name="spells" data-subfield="7"></simple-list>
    </section>
    <section hidden>
        <h3>8th <span><button type="button" class="btn btn-plain btn-sm" data-level="8">Add Spell</button></span></h3>
        <simple-list data-name="spells" data-subfield="8"></simple-list>
    </section>
    <section hidden>
        <h3>9th <span><button type="button" class="btn btn-plain btn-sm" data-level="9">Add Spell</button></span></h3>
        <simple-list data-name="spells" data-subfield="9"></simple-list>
    </section>
</section>

<section id="pane-notes" role="tabpanel" aria-labelledby="tab-notes" hidden class="grid">
    <section>
        <h2>NPCs</h2>
        <note-list data-name="npcs"></note-list>
    </section>
    <section>
        <h2>Factions</h2>
        <note-list data-name="factions"></note-list>
    </section>
    <section>
        <h2>Party Members</h2>
        <note-list data-name="partymembers"></note-list>
    </section>

    <section>
        <h2>Personality</h2>
        <h3>Traits</h3>
        <field-editable class="smallarea" data-name="traits"></field-editable>
        <h3>Ideals</h3>
        <field-editable class="smallarea" data-name="ideals"></field-editable>
        <h3>Bonds</h3>
        <field-editable class="smallarea" data-name="bonds"></field-editable>
        <h3>Flaws</h3>
        <field-editable class="smallarea" data-name="flaws"></field-editable>
        <h3>Appearance</h3>
        <field-editable class="smallarea" data-name="appearance"></field-editable>
        <h2>Languages</h2>
        <field-editable class="smallarea" data-name="languages"></field-editable>
    </section>

    <section>
        <h2 id="page-notes_adv">Adventure Notes</h2>
        <note-list data-name="notes_adv"></note-list>
    </section>
    <section>
        <h2>Campaign Notes</h2>
        <note-list data-name="notes_cam"></note-list>
    </section>

    <section>
        <h2>Character Notes</h2>
        <field-editable class="largearea" data-name="notes"></field-editable>
    </section>
</section>
`;var Js=class extends kn{constructor({emitter:e}){super({emitter:e,templateNode:ep.content.cloneNode(!0)}),this.spellButtons=[]}connectedCallback(){super.connectedCallback(),this.shadowRoot.addEventListener("attributeChange",this._handleAttributeChange.bind(this)),this.shadowRoot.addEventListener("saveChange",this._handleSaveChange.bind(this)),this.emitter.on("character:skill:update",this._updateSkillMod,this),this.emitter.on("character:proficiency:update",this._updateProficiency,this),this.emitter.on("character:attribute:update",this._updateAttributeMods,this),this.emitter.on("character:save:update",this._updateSaveMods,this),this.emitter.on("character:set",this._addSpellButtonEvents,this),this.emitter.on("character:update:spells",this._updateSpellList,this);let e=document.querySelector("footer-nav");e&&e.setLinks([{label:"Attributes",tab:"pane-stats",href:"#page-attributes"},{label:"Skills",tab:"pane-stats",href:"#page-skills"},{label:"Spells",tab:"pane-stats",href:"#page-spells"},{label:"Notes",tab:"pane-notes",href:"#page-notes_adv"}])}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.removeEventListener("attributeChange",this._handleAttributeChange.bind(this)),this.shadowRoot.removeEventListener("saveChange",this._handleSaveChange.bind(this)),this.emitter.off("character:skill:update",this._updateSkillMod,this),this.emitter.off("character:proficiency:update",this._updateProficiency,this),this.emitter.off("character:attribute:update",this._updateAttributeMods,this),this.emitter.off("character:save:update",this._updateSaveMods,this),this.emitter.off("character:set",this._addSpellButtonEvents,this),this.emitter.off("character:update:spells",this._updateSpellList,this)}_addSpellButtonEvents(){this.shadowRoot.querySelectorAll("[data-level]").forEach(t=>{this.spellButtons.push(new Zm(t,this.cur_character,this.emitter))})}_updateSpellList(){this.shadowRoot.querySelectorAll('[data-name="spells"]').forEach(t=>{let r=t.dataset.name||"";if(typeof this.cur_character[r]>"u"||r==="")return;let i=t.dataset.subfield||"",o=(i!==""?this.cur_character[r][i]:this.cur_character[r])||[];t.clear(),o.forEach(a=>{if(!a)return;let c=a.replace("-"," ");t.addItem(c)}),o.length===0&&t.addItem()})}_validateCharacter(e){if(!(e instanceof gt))throw new Error("Invalid character type for this view.")}_renderCustomFields(e,t,r,i){switch(e.tagName){case"SKILL-LISTING":return e.skillValue=i||0,e.skillMod=this.cur_character.getSkillMod(r),!0;case"ATTR-LISTING":return e.attributeScore=i||10,e.attributeMod=this.cur_character.attributeMod(t),e.saveProficiency=this.cur_character.saves[t],e.saveMod=this.cur_character.saveMod(t),!0}return!1}_renderCustomPost(){this.shadowRoot.querySelector('[data-name="proficiency"]').innerHTML=this.cur_character.proficiency}_customFieldChange(e,t,r){if(t==="skills"){let i=this.character.getSkill(r);return this._sameValues(i,e.detail.value)||(this.character.setSkill(r,e.detail.value),this._showUnsavedDialog()),!0}if(t==="weapons"){let i=this.character[t],s=e.detail.value.map(o=>new je(o));return this._sameValues(i,s)||(this.character[t]=s,this._showUnsavedDialog()),!0}}_updateSkillMod(e,t){let r=this.shadowRoot.querySelector(`skill-listing[data-subfield="${e}"]`);r&&(r.skillMod=t)}_updateProficiency(){let e=this.cur_character.proficiency;this.shadowRoot.querySelector('[data-name="proficiency"]').innerHTML=e,Array.from(this.shadowRoot.querySelectorAll("skill-listing")).forEach(t=>{let r=t.skillName;t.skillMod=this.cur_character.getSkillMod(r)}),Array.from(this.shadowRoot.querySelectorAll("attr-listing")).forEach(t=>{let r=t.attributeName;t.saveMod=this.cur_character.saveMod(r)})}_updateAttributeMods(e){let t=this.shadowRoot.querySelector(`attr-listing[data-name=${e}]`);t&&(t.attributeMod=this.cur_character.attributeMod(e),t.saveMod=this.cur_character.saveMod(e))}_updateSaveMods(e){let t=this.shadowRoot.querySelector(`attr-listing[data-name=${e}]`);t&&(t.saveMod=this.cur_character.saveMod(e))}_customNumberInputChange(e){let t=e.target.dataset.name,r=e.target.dataset.subfield,i=parseInt(e.target.value,10);if(t==="spell_slots"){let s=this.shadowRoot.querySelector(`[data-name="spells"][data-subfield="${r}"]`);i?s.parentNode.hidden=!1:s.parentNode.hidden=!0}}_handleAttributeChange(e){let t=e.detail.field||"";t&&(this.cur_character.setAttribute(t,e.detail.value),this._showUnsavedDialog())}_handleSaveChange(e){let t=e.detail.field||"";t&&(this.cur_character.setSaveProficiency(t,e.detail.value),this._showUnsavedDialog())}};window.customElements.get("sheet-view-5e")||window.customElements.define("sheet-view-5e",Js);var tp=Js;var np=document.createElement("template");np.innerHTML=`
<style>
dl.field-horizontal > div {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-bottom: 1rem;
}
dl.field-horizontal dt {
    font-weight: bold;
}
</style>

<ul id="toptabs" role="tablist">
    <li role="presentation"><a role="tab" id="tab-stats" href="#pane-stats" aria-selected="true">Statistics, Abilities, Equipment, etc.</a></li>
    <li role="presentation"><a role="tab" id="tab-notes" href="#pane-notes" aria-selected="false">Notes, Personality, NPCs, etc.</a></li>
</ul>

<section id="pane-stats" class="grid" role="tabpanel" aria-labelledby="tab-stats">
    <section class="grid-span-col-2">
        <dl class="field-horizontal" id="page-attributes">
            <div>
                <dt>Conflict Approach</dt><dd><field-editable data-name="conflict_approach"></field-editable></dd>
            </div>
            <div>
                <dt>Goal</dt><dd><field-editable data-name="goal"></field-editable></dd>
            </div>
            <div>
                <dt>Gimmick</dt><dd><field-editable data-name="gimmick"></field-editable></dd>
            </div>
            <div>
                <dt>Background</dt><dd><field-editable data-name="background"></field-editable></dd>
            </div>
            <div>
                <dt>Foreground</dt><dd><field-editable data-name="foreground"></field-editable></dd>
            </div>
            <div>
                <dt>Weakness</dt><dd><field-editable data-name="weakness"></field-editable></dd>
            </div>
            <div>
                <dt>Core Flaw</dt><dd><field-editable data-name="core_flaw"></field-editable></dd>
            </div>
            <div>
                <dt>Level</dt><dd><field-editable data-name="level" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Experience</dt><dd><field-editable data-name="experience" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Initiative</dt><dd><field-editable data-name="initiative" class="small"></field-editable></dd>
            </div>
            <div class="with_icon">
                <dt>Armor</dt><dd><field-editable data-name="armor" placeholder="0" class="small"></field-editable></dd>
            </div>
            <div class="with_icon">
                <dt>Hit Points</dt>
                <dd>
                    <field-editable class="smallinline" data-name="hp_cur" placeholder="0" aria-label="Current Hit Points"></field-editable> <strong>/</strong> <field-editable class="smallinline" data-name="hp_max" placeholder="0" aria-label="Maximum Hit Points"></field-editable>
                </dd>
            </div>
            <div>
                <dt>Injuries</dt>
                <dd>
                    <simple-list data-name="injuries"></simple-list>
                </dd>
            </div>
            <div>
                <dt>Coins</dt><dd><field-editable data-name="coins" class="small" placeholder="0"></field-editable></dd>
            </div>
            <div>
                <dt>Level Traits/Tags</dt>
                <dd>
                    <simple-list data-name="traits"></simple-list>
                </dd>
            </div>
            <div>
                <dt>Lineage</dt><dd><simple-list data-name="lineage"></simple-list></dd>
            </div>
        </dl>
    </section>

    <section class="grid-span-col-1">
        <h2>Dice Roller</h2>
        <dice-roller>
            <button type="button" slot="rollbuttons" data-die="1d6">1d6</button>
        </dice-roller>
        <h2>Techniques</h2>
        <simple-list data-name="techniques"></simple-list>

        <h2>Inventory</h2>
        <simple-list data-name="inventory" data-number="true"></simple-list>
    </section>
</section>

<section id="pane-notes" role="tabpanel" aria-labelledby="tab-notes" hidden class="grid">
    <section id="page-notes">
        <h2>NPCs</h2>
        <note-list data-name="npcs"></note-list>
    </section>
    <section>
        <h2>Factions</h2>
        <note-list data-name="factions"></note-list>
    </section>
    <section>
        <h2>Party Members</h2>
        <note-list data-name="partymembers"></note-list>
    </section>

    <section>
        <h2>Personality</h2>
        <field-editable class="smallarea" data-name="personality"></field-editable>
        <h2>Appearance</h2>
        <field-editable class="smallarea" data-name="appearance"></field-editable>
    </section>

    <section>
        <h2>Adventure Notes</h2>
        <note-list data-name="notes_adv"></note-list>
    </section>
    <section>
        <h2>Campaign Notes</h2>
        <note-list data-name="notes_cam"></note-list>
    </section>

    <section>
        <h2>Character Notes</h2>
        <field-editable class="largearea" data-name="notes"></field-editable>
    </section>
</section>
`;var Xs=class extends kn{constructor({emitter:e}){super({emitter:e,templateNode:np.content.cloneNode(!0)})}connectedCallback(){super.connectedCallback();let e=document.querySelector("footer-nav");e&&e.setLinks([{label:"Attributes",tab:"pane-stats",href:"#page-attributes"},{label:"Notes",tab:"pane-notes",href:"#page-notes"}])}disconnectedCallback(){super.disconnectedCallback()}_validateCharacter(e){if(!(e instanceof yt))throw new Error("Invalid character type for this view.")}};window.customElements.get("sheet-view-vagabonds")||window.customElements.define("sheet-view-vagabonds",Xs);var rp=Xs;var ip="4.4.0";var Ht=null,sb=ip,ob=function(){return new Date().toUTCString()},iu=function(){let n=`${Math.random().toString(36)}00000000000000000`.slice(2,9);for(;Xe(n)!==null;)n=`${Math.random().toString(36)}00000000000000000`.slice(2,9);return n},sp=function(){return["Character5e","CharacterVagabonds"]},Dn=function(n,e){switch(n){case void 0:case"":case"Character5e":return new gt(e);case"CharacterVagabonds":return new yt(e);default:return new Be(e)}},ab=function(n,e="Character5e"){return Dn(e,{key:n})},Xe=function(n){if(!n)return null;let e=Kt.get(n);return!e||!e.key?null:Dn(e.className,e)},Zs=async function(n){if(!n)return null;let e=await qr.get(n);return!e||!e.key?null:Dn(e.className,e)},Br=function(n){return n.updated=ob(),n.version=sb,Kt.set(n.key,n)},su=async function(n){return await qr.set(n.key,n.toJSON())},eo=function(n){Kt.remove(n)},op=async function(n){return qr.remove(n)},mt=function(){let n=[];return Kt.getAll().forEach(e=>{n.push(Dn(e.className,e))}),n},ap=async function(){let n=new Map;return Ur()?((await qr.getAll()).forEach(t=>{let r=Dn(t.className,t);n.set(r.key,r)}),n):[]},cp=function(n){if(typeof n!="object"||!n.key)throw new Error("Data appears to be invalid. Try removing any text that isn't part of the backup (i.e. email introduction).");let e=Dn(n.className,n),t=Xe(n.key);if(t&&t.charname!==""&&t.charname!==e.charname)if(!e.key_prev)e.key_prev=e.key,e.key=iu();else{let r=e.key_prev;e.key_prev=e.key,e.key=r}return Br(e),e},lp=function(n){if(!n)throw Error("LocalStorage prefix is empty.");Kt.setPrefix(n)},up=function(n,e,t=!1){let r=Xe(n);if(!r){if(!t)return null;r=ab(n,e)}return Ht=r,Ht};var Pn=function(){return Ht?Ht.key:""},hp=function(){if(!Ht)throw new Error("No character is set.");if(Ht.charname==="")throw new Error("Your character must have name to save!");Br(Ht)},dp=function(n,e){let t=null;switch(n.className){case void 0:case"Character5e":t=new tp({emitter:e});break;case"CharacterVagabonds":t=new rp({emitter:e});break;default:t=new kn({emitter:e});break}return t};var ou=class{constructor(e){this.emitter=e,this.shortcuts={},document.addEventListener("keydown",this.checkShortCuts.bind(this))}addShortCut(e,t){this.shortcuts[e]=t}getKeyCode(e,t,r){let i="";return t&&(i+="Ctrl+"),r&&(i+="Shift+"),i+=e,i}checkShortCuts(e){let t=!1,r=!1;e.ctrlKey&&(t=!0),e.shiftKey&&(r=!0);let i=e.key,s=this.getKeyCode(i,t,r),o=this.shortcuts[s]||null;o&&(e.preventDefault(),e.stopPropagation(),this.emitter.trigger(o))}},fp=ou;var cb={emitter:null,appname:"",dialog_unsaved:document.querySelector(".alert-unsaved"),dialog_undo:document.querySelector(".alert-delete"),triggerNewCharacter:function(n=""){let e=iu();this.loadCharacter(e,n).then(()=>{window.location.hash=`#${e}`}).catch(t=>{console.log(t)})},changeCharacter:function(){let n=window.location.hash.substring(1),e=Pn();e&&n===e||this.loadCharacter(n)},loadCharacter:async function(n,e=""){this.hideUnsavedDialog();let t=up(n,e,!0);t.emitter=this.emitter;let r=dp(t,this.emitter);document.querySelector("main").innerHTML="",document.querySelector("main").appendChild(r),r.character=t,this.emitter.trigger("loaddialog:close"),this.emitter.trigger("newdialog:close")},saveCharacter:function(){if(document.activeElement){let n=new Event("blur");document.activeElement.dispatchEvent(n)}try{hp()}catch(n){this.emitter.trigger("error:display",n.message);return}this.hideUnsavedDialog()},downloadBackup:function(n){let e=[],t=[];Array.from(n.querySelectorAll("input[type=checkbox]:checked")).forEach(o=>{let a=Xe(o.value);e.push(a),t.push(a.charname)});let i=n.querySelector("input[name=format]:checked").value,s=new Date;if(i==="email"){let o=`Below is the backup data for your character(s) ${t.join(", ")}.

To use this data, go to: ${window.location.href} and click the "Restore Backup" button. Then paste the text below into the box.

---

${JSON.stringify(e)}`,a=`mailto:?subject=${encodeURIComponent(`Character backup: ${t.join(", ")} (${s.toLocaleString()})`)}&body=${encodeURIComponent(o)}`;this.emitter.trigger("backup:email",a)}else{if(typeof window.Blob!="function"){this.emitter.trigger("backup:textpaste",JSON.stringify(e));return}let o=document.createElement("a"),a=new Blob([JSON.stringify(e)],{type:"application/json"}),c=URL.createObjectURL(a);o.href=c,o.download=`${this.appname}_${s.getFullYear()}_${s.getMonth()+1}_${s.getDate()}`,document.body.appendChild(o),o.click(),setTimeout(function(){document.body.removeChild(o),window.URL.revokeObjectURL(c)},0)}},restoreFormSubmit:function(n){let e=n.querySelector("input[type=file]"),t=n.querySelector("textarea");e.files&&e.files.length>0?Array.from(e.files).forEach(r=>{let i=new FileReader;i.onload=(s=>o=>{this.restoreCharacters(o.target.result)})(r),i.readAsText(r)}):t.value!==""&&this.restoreCharacters(t.value)},restoreCharacters:function(n){try{let e=n.indexOf("[{"),t=n.lastIndexOf("}]"),r=n.indexOf(":[{");r!==-1&&r<e&&(e=-1),e===-1?(e=n.indexOf("{"),t=n.lastIndexOf("}"),n=n.substring(e),n=n.substring(0,t+1)):(n=n.substring(e),n=n.substring(0,t+2)),n=n.trim(),n=n.replace(/\},[\r\n]+\{/g,"},{"),n=n.replace(/(?:\r\n|\r|\n)/g,"<br/>");let i=JSON.parse(n);Array.isArray(i)||(i=[i]);let s=[],o=!1,a=Pn();i.forEach(l=>{let u=cp(l);u.key===a&&(o=!0);let h=document.createElement("li");h.textContent=`${u.charname} has been added. `;let d=document.createElement("a");d.setAttribute("href",`#${u.key}`),d.textContent="View character now.",d.addEventListener("click",f=>{this.alert.closeClear()}),h.appendChild(d),s.push(h)});let c=document.createElement("ul");s.forEach(l=>{c.appendChild(l)}),this.alert.header="Restored Characters",this.alert.setContent([c]),this.alert.open(),o&&this.loadCharacter(a).catch(l=>{console.log(l)})}catch(e){alert(`Error processing backup data: ${e.message}`)}},deleteCharacterTemp:function(n){if(n===""||n==="settings")return;Pn()===n&&this.triggerNewCharacter(),this.dialog_undo.querySelector("button").dataset.key=n,this.dialog_undo.hidden=!1;let e=this.dialog_undo.querySelector(".delete-timeout");setTimeout(()=>{e.classList.add("transition","timeout")},10),this[`deleteTimeout${n}`]=setTimeout(this.deleteCharacter.bind(this),8e3,n)},deleteCharacter:function(n){if(n===""||n==="settings")return;eo(n),this.dialog_undo.querySelector("button").dataset.key="",this.dialog_undo.hidden=!0,this.dialog_undo.querySelector(".delete-timeout").classList.remove("transition","timeout")},undoDelete:function(n){let e=n.target.dataset.key||null;if(!e)return;this.dialog_undo.querySelector("button").dataset.key="",this.dialog_undo.hidden=!0,this.dialog_undo.querySelector(".delete-timeout").classList.remove("transition","timeout"),this[`deleteTimeout${e}`]&&clearTimeout(this[`deleteTimeout${e}`])},showIntroDialog:function(){let n=document.getElementById("introAlert");this.alert.setContent([...document.importNode(n.content,!0).children]),this.alert.open()},showUnsavedDialog:function(){this.dialog_unsaved.hidden=!1},hideUnsavedDialog:function(){this.dialog_unsaved.hidden=!0},showErrorMessage:function(n){alert(n)},initialize:function({emitter:n=null,prefix:e="",appname:t=""}){if(!n||!e||!t){document.body.innerHTML="<p>App is missing required settings.</p>";return}this.emitter=n,this.emitter.on("error:display",this.showErrorMessage,this),this.appname=t,lp(e),this.alert=document.getElementById("alert-main"),Qm(this.emitter);let r=new fp(this.emitter);r.addShortCut("Ctrl+Shift+ArrowDown","character:save"),r.addShortCut("Ctrl+Shift+ArrowRight","tab:switch"),r.addShortCut("Ctrl+Shift+ArrowLeft","tab:switch"),r.addShortCut("Ctrl+Shift+ArrowUp","loaddialog:toggle"),document.querySelector(".btn-help").addEventListener("click",s=>{s.preventDefault();let o=document.getElementById("helpDialog"),a=document.importNode(o.content,!0);this.alert.setContent([...a.children]),this.alert.open()}),window.addEventListener("hashchange",s=>{this.changeCharacter()},!1),this.dialog_unsaved.querySelector(".btn-save").addEventListener("click",s=>{this.emitter.trigger("character:save")}),this.dialog_undo.querySelector(".btn-delete-undo").addEventListener("click",s=>{this.undoDelete(s)}),this.emitter.on("character:new",this.triggerNewCharacter,this),this.emitter.on("character:save",this.saveCharacter,this),this.emitter.on("character:delete",this.deleteCharacterTemp,this),this.emitter.on("backup:download",this.downloadBackup,this),this.emitter.on("backup:restore",this.restoreFormSubmit,this),this.emitter.on("dialog:save:show",this.showUnsavedDialog,this),this.emitter.on("dialog:save:hide",this.hideUnsavedDialog,this);let i=window.location.hash.substring(1);i!==""?this.loadCharacter(i).catch(s=>{console.log(s)}):(mt().length===0&&this.showIntroDialog(),this.triggerNewCharacter())}},mp=cb;var pp=document.createElement("template");pp.innerHTML=`
<style>
    :host {
        display: inline-block;
        transition: background-color 500ms;
    }
    :host([data-triggered="false"]) slot[name="default"] {
        display: inline;
    }
    :host([data-triggered="true"]) slot[name="default"] {
        display: none;
    }
    :host([data-triggered="false"]) slot[name="confirm"] {
        display: none;
    }
    :host([data-triggered="true"]) slot[name="confirm"] {
        display: inline;
    }
</style>
<slot name="default"><span>Submit</span></slot>
<slot name="confirm"><span>Are you sure?</span></slot>
`;var to=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(pp.content.cloneNode(!0)),this._wait=3e3,this._triggered=!1,this._confirm=!0,this._confirmCallback=null,this.dataset.triggered="false",this.setAttribute("role","button")}connectedCallback(){this.getAttribute("tabindex")===null&&this.setAttribute("tabindex",0),this.addEventListener("click",this._handleClick),this.addEventListener("keydown",this._handleKeyDown),this._wait=parseInt(this.dataset.wait||3e3,10),this.dataset.confirm!==void 0&&(this._confirm=this.dataset.confirm!=="false"),Array.from(this.children).forEach(e=>{e.hidden=!1}),this._confirmCallback&&this.addEventListener("click",this._confirmCallback)}disconnectedCallback(){this.removeEventListener("click",this._handleClick),this.removeEventListener("keydown",this._handleKeyDown),this._confirmCallback&&this.removeEventListener("click",this._confirmCallback)}set triggered(e){let t=!!e;this._triggered!==t&&(this._triggered=t,this._triggered?this.dataset.triggered="true":this.dataset.triggered="false")}get triggered(){return this._triggered}get confirm(){return this._confirm}set confirm(e){this._confirm=!!e}get confirmCallback(){return this._confirmCallback}set confirmCallback(e){typeof e=="function"&&(this._confirmCallback=e)}_handleClick(e){!this.triggered&&this._confirm&&(e.preventDefault(),e.stopImmediatePropagation(),this.triggered=!0,setTimeout(()=>{this.triggered=!1},this._wait))}_handleKeyDown(e){e.key!=="Enter"&&e.key!==" "||e.shiftKey||(e.preventDefault(),this.click())}reset(){this.triggered=!1}};window.customElements.get("confirm-button")||window.customElements.define("confirm-button",to);var gp=to;var lb=function(n,e){let t=new Date(n),r=new Date(e);return t>r?"local":r>t?"remote":"equal"},yp=async function(){let n=mt(),e=await ap(),t=[];return n.forEach(r=>{let i={key:r.key,local:r},s=e.get(r.key);s&&(i.remote=s,e.delete(r.key),i.latest=lb(r.updated,s.updated)),t.push(i)}),e.forEach(r=>{let i={key:r.key,remote:r};t.push(i)}),t},_p=async function(n){let e=Xe(n);if(!e)throw new Error("Character not found");if(await Zs(n))throw new Error("Character already on the remote");return await su(e)},vp=async function(n){if(Xe(n))return"Character already on local";let t=await Zs(n);return t?await Br(t):"Character not found on the remote"},wp=async function(n){return op(n)},Ep=async function(n){return eo(n)},bp=async function(n){let e=Xe(n);if(!e)throw new Error("Character not found on local");return await su(e)},Ip=async function(n){let e=await Zs(n);if(!e)throw new Error("Character not found on the remote");return await Br(e)};var Tp=document.createElement("template");Tp.innerHTML=`
<style>
    :host {
        display: block;
        margin: 1rem 0;
        border: 1px dotted black;
        padding: 1rem;
        border-radius: 0.25rem;
    }
    span {
        display: inline-block;
    }
    #char-name {
        font-weight: bold;
        margin-bottom: .5rem;
    }
    .charname {
        margin-right: .5rem;
    }
    div + div {
        margin-top: .5rem;
    }
    div.error {
        font-weight: bold;
        color: red;
    }
    button {
        background-color: rgb(207,0,15);
        border: none;
        border-radius: 0.4rem;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        line-height: 1rem;
        font-weight: 400;
        text-align: center;
        text-decoration: none;
        letter-spacing: 0.1rem;
        white-space: nowrap;
        font-size: 0.8rem;
        padding: .25rem .75rem;
        margin: 0;
    }
    button:hover, button:focus {
        background-color: #606c76;
        color: #fff;
    }
</style>
<div id="char-name"><span class="charname"></span>(<span class="key"></span>)</div>
<div class="local">
    <span class="summary">No local copy.</span>
    <span class="updated"></span>
    <span class="action"></span>
</div>
<div class="remote">
    <span class="summary">No remote copy.</span>
    <span class="updated"></span>
    <span class="action"></span>
</div>
<div class="syncaction"></div>
<div class="error"></div>
`;var no=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Tp.content.cloneNode(!0)),this.setAttribute("role","list-item"),this.setAttribute("aria-labelledby","char-name"),this._key="",this.localDiv=this.shadowRoot.querySelector(".local"),this.remoteDiv=this.shadowRoot.querySelector(".remote"),this.syncDiv=this.shadowRoot.querySelector(".syncaction"),this.isCurrentCharacter=!1}connectedCallback(){this.shadowRoot.addEventListener("click",this.handleButtonClick.bind(this))}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this.handleButtonClick.bind(this))}get key(){return this._key}_showError(e){this.shadowRoot.querySelector(".error").innerHTML=e}handleButtonClick(e){console.log(e);let t=e.target.closest("button");if(!t)return;let r=t.dataset.action;if(r)switch(console.log(`Action: ${r}`),r){case"upload":_p(this._key).then(i=>{this.remoteDiv.querySelector(".summary").innerHTML=this.localDiv.querySelector(".summary").innerHTML,this.remoteDiv.querySelector(".updated").innerHTML=this.localDiv.querySelector(".updated").innerHTML,this.remoteDiv.querySelector(".action").innerHTML="",this.remoteDiv.querySelector(".action").appendChild(this._getButton("removeremote","Delete from Remote"))}).catch(i=>{this._showError(i)});break;case"removeremote":wp(this._key).then(i=>{this.remoteDiv.querySelector(".summary").innerHTML="No remote copy.",this.remoteDiv.querySelector(".updated").innerHTML="",this.remoteDiv.querySelector(".action").innerHTML="",this.remoteDiv.querySelector(".action").appendChild(this._getButton("upload","Upload"))}).catch(i=>{this._showError(i)});break;case"download":vp(this._key).then(i=>{this.localDiv.querySelector(".summary").innerHTML=this.remoteDiv.querySelector(".summary").innerHTML,this.localDiv.querySelector(".updated").innerHTML=this.remoteDiv.querySelector(".updated").innerHTML,this.localDiv.querySelector(".action").innerHTML="",this.localDiv.querySelector(".action").appendChild(this._getButton("removelocal","Delete from Local"))}).catch(i=>{this._showError(i)});break;case"removelocal":if(this.isCurrentCharacter){this._showError("You cannot remove the currently displayed character.");return}Ep(this._key).then(i=>{this.localDiv.querySelector(".summary").innerHTML="No local copy.",this.localDiv.querySelector(".updated").innerHTML="",this.localDiv.querySelector(".action").innerHTML="",this.localDiv.querySelector(".action").appendChild(this._getButton("download","Download"))}).catch(i=>{this._showError(i)});break;case"syncup":bp(this._key).then(i=>{this.remoteDiv.querySelector(".summary").innerHTML=this.localDiv.querySelector(".summary").innerHTML,this.remoteDiv.querySelector(".updated").innerHTML=this.localDiv.querySelector(".updated").innerHTML,this.remoteDiv.querySelector(".action").innerHTML="",this.remoteDiv.querySelector(".action").appendChild(this._getButton("removeremote","Delete from Remote")),this.syncDiv.innerHTML=""}).catch(i=>{this._showError(i)});break;case"syncdown":if(this.isCurrentCharacter){this._showError("You cannot sync to local the currently displayed character.");return}Ip(this._key).then(i=>{this.localDiv.querySelector(".summary").innerHTML=this.remoteDiv.querySelector(".summary").innerHTML,this.localDiv.querySelector(".updated").innerHTML=this.remoteDiv.querySelector(".updated").innerHTML,this.localDiv.querySelector(".action").innerHTML="",this.localDiv.querySelector(".action").appendChild(this._getButton("removelocal","Delete from Local")),this.syncDiv.innerHTML=""}).catch(i=>{this._showError(i)});break}}_getButton(e,t){let r=document.createElement("BUTTON");return r.classList.add("btn-sm"),r.dataset.action=e,r.innerText=t,r}setData({key:e="",local:t={},remote:r={},latest:i=""}){if(!e)return;this._key=e;let s=t.key?t.charname:r.key?r.charname:"[Unknown]";this.shadowRoot.querySelector(".charname").innerHTML=s,this.shadowRoot.querySelector(".key").innerHTML=e,t.key?(this.localDiv.querySelector(".summary").innerHTML=t.summaryHeader,this.localDiv.querySelector(".updated").innerHTML=t.updatedTime,this.localDiv.querySelector(".action").appendChild(this._getButton("removelocal","Delete from Local"))):this.localDiv.querySelector(".action").appendChild(this._getButton("download","Download")),r.key?(this.remoteDiv.querySelector(".summary").innerHTML=r.summaryHeader,this.remoteDiv.querySelector(".updated").innerHTML=r.updatedTime,this.remoteDiv.querySelector(".action").appendChild(this._getButton("removeremote","Delete from Remote"))):this.remoteDiv.querySelector(".action").appendChild(this._getButton("upload","Upload")),i==="local"?this.syncDiv.appendChild(this._getButton("syncup","Update on Remote")):i==="remote"&&this.syncDiv.appendChild(this._getButton("syncdown","Update on Local"))}};window.customElements.get("sync-info")||window.customElements.define("sync-info",no);var Ap=no;var au=class{constructor(e,t){this.el=e,this.menu=t,this.action=e.dataset.action||"",this.el.addEventListener("keydown",this.handleKeyBoardEvent.bind(this)),this.el.addEventListener("click",this.menu.setTabFocusToButton.bind(this.menu,this))}handleKeyBoardEvent(e){if(!(e.shiftKey||e.ctrlKey||e.metaKey||e.altKey)){if(e.key==="ArrowRight"){this.removeTabFocus(),this.menu.setFocusToNext(this);return}if(e.key==="ArrowLeft"){this.removeTabFocus(),this.menu.setFocusToPrevious(this);return}if(e.key==="Home"){this.removeTabFocus(),this.menu.setFocusToFirst();return}e.key==="End"&&(this.removeTabFocus(),this.menu.setFocusToLast())}}isFocusable(){return this.el.getAttribute("tabindex")>-1}isVisible(){return!!(this.el.offsetWidth||this.el.offsetHeight||this.el.getClientRects().length)}removeTabFocus(){this.el.setAttribute("tabindex","-1")}setTabFocus(){this.el.setAttribute("tabindex","0")}focus(){this.el.focus()}switchTo(e=!0){this.isVisible()||(e?this.menu.setFocusToNext(this):this.menu.setFocusToPrevious(this)),this.setTabFocus(),this.focus()}},Sp=document.createElement("template");Sp.innerHTML=`
<link rel="stylesheet" href="./styles.css">
<style>
:host {
    position: relative;
    display: flex;
    padding-top: .5rem;
}
:host button {
    margin-right: 1rem;
}

:host .more-action-contain {
    position: relative;
}

:host .more-actions.closed {
    display: none;
}

:host .more-actions {
    display: block;
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 1rem;
    border-radius: 1rem;
    z-index: 10;
}
:host .more-actions button {
    margin-right: 0;
}

/* Larger than phone screen */
@media (min-width: 50.0rem) {
    :host .btn-more {
        display: none;
    }
    :host .more-actions {
        position: relative;
        background-color: transparent;
        padding: 0;
        display: inline-block;
        z-index: 0;
    }
    :host .more-actions.closed {
        display: block;
    }
    :host .more-actions button {
        margin-right: 1rem;
    }
}

@media print {
    :host {
        display: none;
    }
}
</style>
<button type="button" class="btn-save" data-action="save" tabindex="0">Save</button>
    <button type="button" class="btn-load btn-dialog" data-action="load" tabindex="-1">Load</button>
    <button class="btn-new-character btn-dialog" data-action="new" tabindex="-1">New</button>
    <div class="more-action-contain">
        <button type="button" class="btn-more" data-action="more">More</button>
        <div class="more-actions closed">
            <button type="button" class="btn-backup btn-dialog" data-action="backup" tabindex="-1">Backup</button>
            <button type="button" class="btn-restore-backup btn-dialog" data-action="restore" tabindex="-1">Restore</button>
            <button type="button" class="btn-delete btn-dialog" data-action="delete" tabindex="-1">Delete</button>
            <button type="button" class="btn-auth btn-dialog hidden" data-action="auth" tabindex="-1">Login</button>
        </div>
    </div>

`;var ub={save:"_saveCharacter",load:"_openLoadModal",new:"_newCharacterModal",backup:"_openDownloadForm",restore:"_openRestoreForm",delete:"_openDeleteModal",auth:"_openAuthDialog",more:"_showMore"},cu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Sp.content.cloneNode(!0)),this.setAttribute("role","toolbar"),this.setAttribute("aria-label","Character Actions"),this.setAttribute("tabindex",0),this.buttons=[],this.opener=null,this.newDialog=null,this.loadDialog=null,this.downloadDialog=null,this.restoreDialog=null,this.authDialog=null,this.syncDialog=null}connectedCallback(){this.addEventListener("focus",this.focus.bind(this));let e=this.shadowRoot.querySelectorAll("button");Array.prototype.forEach.call(e,t=>{this.buttons.push(new au(t,this))}),this.shadowRoot.addEventListener("click",this._handleClicks.bind(this))}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this._handleClicks.bind(this)),this.emitter&&(this.emitter.off("newdialog:close",this._closeNewModal,this),this.emitter.off("loaddialog:close",this._closeLoadModal,this),this.emitter.off("loaddialog:toggle",this._openLoadModal,this),this.emitter.off("backup:email",this._emailDownload,this),this.emitter.off("backup:textpaste",this._altDownload,this),this.emitter.off("auth:enabled",this._showAuth,this),this.emitter.off("auth:signin",this._signedIn,this),this.emitter.off("auth:signout",this._signedOut,this))}setEmitter(e){this.emitter=e,this.emitter.on("newdialog:close",this._closeNewModal,this),this.emitter.on("loaddialog:close",this._closeLoadModal,this),this.emitter.on("loaddialog:toggle",this._openLoadModal,this),this.emitter.on("backup:email",this._emailDownload,this),this.emitter.on("backup:textpaste",this._altDownload,this),this.emitter.on("auth:enabled",this._showAuth,this),this.emitter.on("auth:signin",this._signedIn,this),this.emitter.on("auth:signout",this._signedOut,this)}_handleClicks(e){let t=e.target.closest("button"),r=this.buttons.find(s=>s.el===t);if(!r)return;let i=ub[r.action]||null;i&&this[i](r)}_openAuthDialog(){if(this.authDialog=this.authDialog||document.getElementById("dialog-auth"),this.authDialog.clear(),this.authDialog.isOpen){this.authDialog.close();return}let e=null;Ur()?e=document.getElementById("authSignOutModal"):e=document.getElementById("authSignInModal"),this.authDialog.setContent([...document.importNode(e.content,!0).children]),Ur()?(this.authDialog.querySelector("#signOut").addEventListener("click",t=>{Ym()}),this.authDialog.querySelector("#syncData").addEventListener("click",t=>{this._openSyncModal(),this.authDialog.close()})):this.authDialog.querySelector("#googleSignIn").addEventListener("click",t=>{Wm()}),this.authDialog.open()}_openSyncModal(){if(this.syncDialog=this.syncDialog||document.getElementById("dialog-sync"),this.syncDialog.clear(),this.syncDialog.isOpen){this.syncDialog.close();return}let e=document.getElementById("syncModal");this.syncDialog.setContent([...document.importNode(e.content,!0).children]);let t=Pn();yp().then(r=>{let i=document.createDocumentFragment();r.forEach(s=>{let o=new Ap;o.setData(s),o.key===t&&(o.isCurrentCharacter=!0),i.appendChild(o)}),this.syncDialog.querySelector("#characterSyncList").appendChild(i),this.syncDialog.open()}).catch(r=>{console.log(r)})}_openDownloadForm(){if(this.downloadDialog=this.downloadDialog||document.getElementById("dialog-backup"),this.downloadDialog.clear(),this.downloadDialog.isOpen){this.downloadDialog.close();return}let e=document.getElementById("backupModal"),t=document.importNode(e.content,!0),r=[];mt().forEach(i=>{let s=`<li><label><input type="checkbox" name="${i.key}" value="${i.key}" /> ${i.summaryHeader}</label></li>`;r.push(s)}),t.querySelector(".character_downloads").innerHTML=r.join(""),this.downloadDialog.setContent([...t.children],!1),this.downloadDialog.querySelector("form").addEventListener("submit",i=>{i.preventDefault(),this.emitter.trigger("backup:download",i.target)}),this.downloadDialog.open()}_openRestoreForm(){if(this.restoreDialog=this.restoreDialog||document.getElementById("dialog-restore"),this.restoreDialog.clear(),this.restoreDialog.isOpen){this.restoreDialog.close();return}let e=document.getElementById("restoreModal"),t=document.importNode(e.content,!0);this.restoreDialog.setContent([...t.children],!1),this.restoreDialog.querySelector("form").addEventListener("submit",r=>{r.preventDefault(),this.emitter.trigger("backup:restore",r.target),this.restoreDialog.closeClear()}),this.restoreDialog.open()}_altDownload(e){let t=document.createElement("p");t.innerHTML="Your current browser/os does not support direct file downloads, so here is the data for you to copy/paste.";let r=document.createElement("textarea");r.classList.add("large"),r.value=e,this.downloadDialog.clear(),this.downloadDialog.header="Alernate Download Option",this.downloadDialog.setContent([t,r,this.downloadDialog.getCloseButton()],!1),this.downloadDialog.open()}_emailDownload(e){let t=document.createElement("a");t.href=e,t.setAttribute("target","_blank"),t.innerHTML="Open new message in default email client",t.addEventListener("click",()=>{this.downloadDialog.closeClear()});let r=document.createElement("p");r.appendChild(t),this.downloadDialog.clear(),this.downloadDialog.setContent([r,this.downloadDialog.getCloseButton()],!1),this.downloadDialog.open()}_saveCharacter(){this.emitter.trigger("character:save")}_newCharacterModal(e){if(this.newDialog=this.newDialog||document.getElementById("dialog-new"),this.newDialog.clear(),this.newDialog.isOpen){this.newDialog.close();return}let t=!1,r=document.querySelector(".alert-unsaved");r&&!r.hidden&&(t=!0);let i=document.getElementById("createModal"),s=document.importNode(i.content,!0);if(t){let a=document.createElement("p");a.classList.add("alert"),a.innerHTML="<strong>Warning:</strong> You have unsaved changes.",s.querySelector("form").prepend(a)}let o=s.querySelector("select");sp().forEach(a=>{let c=document.createElement("option");c.value=a,c.innerText=a,o.appendChild(c)}),this.newDialog.setContent([...s.children]),this.newDialog.querySelector("form").addEventListener("submit",a=>{a.preventDefault();let c=new FormData(a.target);this.emitter.trigger("character:new",c.get("char_type"))}),this.newDialog.open()}_closeNewModal(){this.newDialog!==null&&this.newDialog.closeClear()}_loadCharClick(e){let r=e.currentTarget.dataset.key||"";r!==""&&(window.location.hash=`#${r}`)}_openLoadModal(){if(this.loadDialog=this.loadDialog||document.getElementById("dialog-load"),this.loadDialog.clear(),this.loadDialog.isOpen){this.loadDialog.close();return}let e=!1,t=document.querySelector(".alert-unsaved");t&&!t.hidden&&(e=!0);let r=document.getElementById("loadModal"),i=document.importNode(r.content,!0),s=i.querySelector("ul");mt().forEach(o=>{let a=document.createElement("li"),c=new gp;c.dataset.key=o.key,c.classList.add("btn","btn-plain"),c.innerHTML=`<span slot="default">${o.summaryHeader}</span>
            <span slot="confirm" hidden>Are you sure you want to load: ${o.charname?o.charname:"[Unnamed]"}, you have unsaved changes.</span>`,e||(c.confirm=!1),c.confirmCallback=this._loadCharClick.bind(this),a.appendChild(c),s.appendChild(a)}),this.loadDialog.setContent([...i.children]),this.loadDialog.open()}_closeLoadModal(){this.loadDialog!==null&&this.loadDialog.closeClear()}_openDeleteModal(){let e=document.getElementById("dialog-delete");if(e.isOpen){e.close();return}let t=document.getElementById("deleteModal"),r=document.importNode(t.content,!0),i=[];mt().forEach(s=>{let o=`<li><confirm-button data-key="${s.key}" class="btn btn-plain btn-delete-char">
                <span slot="default">${s.summaryHeader}</span>
                <span slot="confirm" hidden>Are you sure you want to delete: ${s.charname?s.charname:"[Unnamed]"}</span>
            </confirm-button></li>`;i.push(o)}),r.querySelector("ul").innerHTML=i.join(""),e.setContent([...r.children]),e.querySelector("ul").addEventListener("click",s=>{let o=s.target.tagName==="CONFIRM-BUTTON"?s.target:s.target.closest("confirm-button");o&&o.classList.contains("btn-delete-char")&&(s.preventDefault(),this.emitter.trigger("character:delete",o.getAttribute("data-key")),e.closeClear())}),e.open()}_showMore(){this.shadowRoot.querySelector(".more-actions").classList.toggle("closed")}_showAuth(){let e=this.buttons.find(t=>t.el.classList.contains("btn-auth"));e&&e.el.classList.remove("hidden")}_signedIn(){let e=this.buttons.find(t=>t.action==="auth");e&&(e.el.innerHTML="Sync/Logout"),this._openAuthDialog()}_signedOut(){let e=this.buttons.find(t=>t.action==="auth");e&&(e.el.innerHTML="Login"),this.authDialog&&this.authDialog.isOpen&&this.authDialog.close()}setFocusToNext(e){let r=this.buttons.indexOf(e)+1;if(r>this.buttons.length-1){this.setFocusToFirst();return}this.buttons[r].switchTo()}setFocusToPrevious(e){let r=this.buttons.indexOf(e)-1;if(r<0){this.setFocusToLast();return}this.buttons[r].switchTo(!1)}setFocusToFirst(){this.buttons[0].switchTo()}setFocusToLast(){this.buttons[this.buttons.length-1].switchTo(!1)}setTabFocusToButton(e){this.buttons.forEach(t=>{t===e?t.switchTo():t.removeTabFocus()})}focus(){let e=this.buttons.find(t=>t.isFocusable());e||(e=this.buttons[0]),this.setTabFocusToButton(e)}};window.customElements.get("action-menu")||window.customElements.define("action-menu",cu);var Cp=document.createElement("template");Cp.innerHTML=`
<style>
    :host {
        display: block;
        margin-bottom: .5rem;
        padding-bottom: .5rem;
        border-bottom: 1px solid rgb(207,0,15);
    }
    :host([hidden]) {
        display: none
    }
    dt, dd {
        display: block;
        margin: 0;
        padding: 0;
        border: 1px dotted transparent;
    }
    dt {
        font-weight: bold;
    }
    [contenteditable=true]:empty {
        border: 1px dotted #bbb;
        border-radius: 4px;
    }
</style>
<dt contenteditable="true"></dt>
<dd contenteditable="true"></dd>
`;var ro=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Cp.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list-item")}get content(){return new qe({header:this.shadowRoot.querySelector("dt").innerHTML,text:this.shadowRoot.querySelector("dd").innerHTML})}set content(e){this.shadowRoot.querySelector("dt").innerHTML=e.header,this.shadowRoot.querySelector("dd").innerHTML=e.text}clear(){this.content=[]}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}focus(e=!1){if(e){this.shadowRoot.querySelector("dd").focus();return}this.shadowRoot.querySelector("dt").focus()}isEmpty(){return this.shadowRoot.querySelector("dt").innerText.trim()===""&&this.shadowRoot.querySelector("dd").innerText.trim()===""}};window.customElements.define("note-list-item",ro);var lu=ro;var hb=function(n){let e=n.childNodes;if(e.length===0)return;let t=document.createRange(),r=window.getSelection();r.removeAllRanges(),t.setStartBefore(e[0]),t.setEndAfter(e[e.length-1]),t.collapse(!1),r.addRange(t),r.collapseToEnd()},pt=hb;var Rp=document.createElement("template");Rp.innerHTML=`
<style>
    :host {
        display: block;
        margin: 0;
        padding: 0;
    }
    :host([hidden]) {
        display: none
    }
</style>
`;var uu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Rp.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list"),this.addEventListener("keydown",this._keyDown),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName")}disconnectedCallback(){this.removeEventListener("keydown",this._keyDown),this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}get contentArray(){let e=Array.from(this.shadowRoot.querySelectorAll("note-list-item")),t=[];return e.forEach(r=>{let i=r.content;!i.header&&!i.text||t.push(i)}),t}addItem(e=null){let t=new lu;e&&(t.content=e),this.shadowRoot.appendChild(t)}clear(){Array.from(this.shadowRoot.querySelectorAll("note-list-item")).forEach(e=>{this.shadowRoot.removeChild(e)})}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}_keyDown(e){if(e.key!=="Enter"&&e.key!=="Backspace"||e.shiftKey)return;let t=this.deepActiveElement();if(e.key==="Enter"){if(e.preventDefault(),e.stopPropagation(),t.tagName==="DT"||t.closest("dt"))console.log(t),t.nextElementSibling.focus();else if(t.tagName==="DD"||t.closest("dd"))if(console.log(t),t.parentNode.host===this.shadowRoot.lastElementChild){let r=new lu;this.shadowRoot.appendChild(r),r.focus()}else{let r=t.parentNode.host.nextElementSibling;r&&r.focus()}return}if(e.key==="Backspace"){if(t.innerText.trim()!=="")return;if(e.preventDefault(),e.stopPropagation(),t.tagName==="DT"||t.closest("dt")){if(t.parentNode.host!==this.shadowRoot.querySelector("note-list-item")){let r=t.parentNode.host.previousElementSibling;r&&(r.focus(!0),pt(this.deepActiveElement()),t.parentNode.host.isEmpty()&&t.parentNode.host.remove())}}else(t.tagName==="DD"||t.closest("dd"))&&(t.parentNode.host.focus(),pt(this.deepActiveElement()))}}_blur(e){let t={field:this.fieldName,value:this.contentArray};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}focus(){this.shadowRoot.querySelector("note-list-item").focus()}};window.customElements.define("note-list",uu);var kp=document.createElement("template");kp.innerHTML=`
<style>
    :host {
        display: block;
        margin: 0 0 1rem 0;
        padding: 0;
    }
    :host([hidden]) {
        display: none
    }
    li {
        display: block;
        margin-bottom: 0.125rem;
        border-bottom: 1px solid rgb(207,0,15);
    }
    :host([data-number]) li {
        list-style: decimal;
        display: list-item;
    }
    :host([data-number]) li::marker {
        text-align: end;
    }
    li div {
        display: inline-block;
    }
</style>
`;var hu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(kp.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list"),this.addEventListener("keydown",this._keyDown),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName"),this._upgradeProperty("subFieldName")}disconnectedCallback(){this.removeEventListener("keydown",this._keyDown),this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}set subFieldName(e){this.dataset.subfield=e}get subFieldName(){return this.dataset.subfield||""}get contentArray(){let e=Array.from(this.shadowRoot.querySelectorAll("li")),t=[];return e.forEach(r=>{let i=r.innerHTML;i!==""&&t.push(i)}),t}addItem(e=""){let t=document.createElement("li");return t.setAttribute("contenteditable",!0),t.innerHTML=e,this.shadowRoot.appendChild(t),t}clear(){Array.from(this.shadowRoot.querySelectorAll("li")).forEach(e=>{this.shadowRoot.removeChild(e)})}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}_keyDown(e){if(e.key!=="Enter"&&e.key!=="Backspace"||e.shiftKey)return;let t=this.deepActiveElement();if(!(t.tagName!=="LI"&&!t.closest("li"))){if(e.key==="Enter"){if(e.preventDefault(),t===this.shadowRoot.lastElementChild)this.addItem().focus();else{let r=t.nextElementSibling;r&&r.focus()}return}if(e.key==="Backspace"&&t!==this.shadowRoot.querySelector("li")&&t.innerText.trim()===""){e.preventDefault();let r=t.previousElementSibling;r.focus(),pt(r),t.remove()}}}_blur(e){let t={field:this.fieldName,subfield:this.subFieldName,value:this.contentArray};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}focus(){this.shadowRoot.querySelector("li").focus()}};window.customElements.get("simple-list")||window.customElements.define("simple-list",hu);var Dp=document.createElement("template");Dp.innerHTML=`
<style>
    :host {
        display: table;
        border-collapse: collapse;
        text-align: left;
        border: none;
        width: 100%;
        margin-bottom: 1.5rem;
    }
    :host([hidden]) {
        display: none
    }
    th {
        font-weight: bold;
    }
    tbody tr {
        border-bottom: 1px solid rgb(207,0,15);
        margin-bottom: .25rem;
    }
    th, td {
        padding: .25rem;
    }
    td[contenteditable=true] {
        display: table-cell;
        padding: .25rem;
        margin-bottom: .25rem;
    }
</style>
<thead>
    <tr></tr>
</thead>
<tbody>
</tbody>
<slot></slot>
`;var du=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Dp.content.cloneNode(!0)),this.columns=0}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","table"),this.addEventListener("keydown",this._keyDown),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName"),this.columnNames=this.getAttribute("columns").split("||"),this.columns=this.columnNames.length;let e=this.shadowRoot.querySelector("thead tr");this.columnNames.forEach(t=>{let r=document.createElement("th");r.innerHTML=t,e.appendChild(r)})}disconnectedCallback(){this.removeEventListener("keydown",this._keyDown),this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}get contentArray(){let e=[];return Array.from(this.shadowRoot.querySelectorAll("tbody > tr")).forEach(r=>{let i=Array.from(r.querySelectorAll("td"));if(i.length===0)return;let s={},o=!0;i.forEach((a,c)=>{let l=this.columnNames[c].toLowerCase(),u=a.innerHTML.trim();u!==""&&(o=!1),s[l]=u}),!o&&e.push(s)}),e}addRow(e=[]){let t=document.createElement("tr"),r=document.createElement("td");r.setAttribute("contenteditable",!0);for(let i=0;i<this.columns;i++){let s=this.columnNames[i].toLowerCase(),o=r.cloneNode(!1);o.innerHTML=e[s]||"",t.appendChild(o)}return this.shadowRoot.querySelector("tbody").appendChild(t),t}clear(){Array.from(this.shadowRoot.querySelectorAll("tbody > tr")).forEach(e=>{e.parentNode.removeChild(e)})}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}_keyDown(e){if(e.key!=="Enter"&&e.key!=="Backspace"||e.shiftKey)return;let t=this.deepActiveElement();if(t.tagName!=="TD"&&!t.closest("td"))return;let r=t.tagName==="TD"?t:t.closest("td"),i=r.parentElement;if(e.key==="Enter"){if(e.preventDefault(),r!==i.lastElementChild){let a=r.nextElementSibling;a&&a.focus();return}let s=i.nextElementSibling;if(s){s.querySelector("td").focus();return}this.addRow().querySelector("td").focus();return}if(e.key==="Backspace"){if(r.innerText.trim()!=="")return;if(e.preventDefault(),r!==i.firstElementChild){let o=r.previousElementSibling;o&&(o.focus(),pt(o));return}let s=i.previousElementSibling;if(s){s.lastElementChild.focus(),pt(s.lastElementChild);let o=!0;i.querySelectorAll("td").forEach(a=>{a.innerText.trim()!==""&&(o=!1)}),o&&i.remove()}}}_blur(e){let t={field:this.fieldName,value:this.contentArray};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}focus(){this.shadowRoot.querySelector("[contenteditable=true]").focus()}};window.customElements.define("table-editable",du);var Pp=document.createElement("template");Pp.innerHTML=`
<link rel="stylesheet" href="./styles.css">
<style>
    :host {
        display: block;
        margin-bottom: .25rem;
        white-space: nowrap;
    }
    :host([hidden]) {
        display: none
    }
    label {
        display: inline-block;
        margin-right: 1rem;
    }
    input[type=checkbox] {
        width: auto;
        margin-right: 0.5rem;
        display: inline-block;
    }
    button {
        background-color: var(--primary-color, black);
        color: white;
        border: none;
        padding: 0.25rem 0.5rem;
        margin: 0 0 -1rem 1rem;
        clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 95%, 5% 75%, 5% 25%);
        height: 1.25rem;
        width: 1.25rem;
    }
</style>
<label>
    <input type="checkbox" value=1 data-name="skills" />
    <input type="checkbox" value=1 data-name="expert" aria-label="Skill Expertise" disabled />
    <span class="pc-skill-name"><slot>Unknown Skill</slot></span>
</label>
<span class="pc-skill-mod">0</span>
<button type="button" data-die="1d20" aria-label="Skill check"></button>
`;var fu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Pp.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list-item"),this.profCheck=this.shadowRoot.querySelector('input[data-name="skills"]'),this.expertCheck=this.shadowRoot.querySelector('input[data-name="expert"]'),this.profCheck.addEventListener("change",this._checkSkills.bind(this)),this.expertCheck.addEventListener("change",this._checkExpert.bind(this)),this.shadowRoot.querySelector("button").addEventListener("click",this._skillCheck.bind(this))}disconnectedCallback(){this.profCheck.removeEventListener("change",this._checkSkills.bind(this)),this.expertCheck.removeEventListener("change",this._checkExpert.bind(this)),this.shadowRoot.querySelector("button").removeEventListener("click",this._skillCheck.bind(this))}get skillName(){return this.dataset.subfield||""}set skillName(e){this.dataset.subfield=e}get skillLabel(){return this.shadowRoot.querySelector(".pc-skill-name").innerHTML}set skillLabel(e){this.shadowRoot.querySelector(".pc-skill-name").innerHTML=e}get skillValue(){return this.profCheck.checked?this.expertCheck.checked?2:1:0}set skillValue(e){this.profCheck.checked=!1,this.expertCheck.checked=!1,e>0&&(this.profCheck.checked=!0,this.expertCheck.disabled=!1),e>1&&(this.expertCheck.checked=!0)}get skillMod(){return this.shadowRoot.querySelector(".pc-skill-mod").innerHTML}set skillMod(e){this.shadowRoot.querySelector(".pc-skill-mod").innerHTML=e}_checkSkills(e){let t=this.expertCheck;e.target.checked?t.disabled=!1:(t.checked=!1,t.disabled=!0);let r={field:"skills",subfield:this.skillName,value:e.target.checked?1:0};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:r}))}_checkExpert(e){let t={field:"skills",subfield:this.skillName,value:e.target.checked?2:1};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}_skillCheck(e){let t=document.querySelector("sheet-view-5e").shadowRoot.querySelector("dice-roller");if(!t)return;let r=this.skillMod,i=`1d20${r!=="0"?r:""}`;t.roll(i)}focus(){this.shadowRoot.querySelector("input").focus()}};window.customElements.define("skill-listing",fu);var Np=document.createElement("template");Np.innerHTML=`
<style>
    :host {
        display: block;
        margin-bottom: .75rem;
        white-space: nowrap;
    }
    :host([hidden]) {
        display: none
    }
    label {
        display: inline-block;
        margin-right: 1rem;
        width: auto;
        font-weight: bold;
    }
    label:first-of-type {
        width: 2rem;
    }
    input[type=number] {
        display: inline-block;
        margin-right: 1rem;
        width: 3rem;
        border: 1px dotted #bbb;
        border-radius: .4rem;
        padding: 0;
        font-size: 1rem;
    }
    input[type=checkbox] {
        width: auto;
        margin-right: 0.5rem;
        display: inline-block;
    }
    .pc-attribute-mod, .pc-save-mode {
        display: inline-block;
        margin-right: 1rem;
        font-weight: bold;
        min-width: 1.5rem;
        text-align: right;
    }
    button {
        background-color: var(--primary-color, black);
        color: white;
        border: none;
        padding: 0.25rem 0.5rem;
        margin: 0 0 -1rem 1rem;
        clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 95%, 5% 75%, 5% 25%);
        height: 1.25rem;
        width: 1.25rem;
    }
</style>
<label for="score"><slot></slot></label>
<input type="number" id="score" class="pc-attribute" value=10 min=3 max=25 />
<span class="pc-attribute-mod">0</span>
<label>
    <input type="checkbox" name="pc-save" value=1 />
    Save
</label>
<span class="pc-save-mod small">0</span>
<button type="button" data-die="1d20" aria-label="Saving throw"></button>
`;var mu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Np.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list-item"),this.scoreInput=this.shadowRoot.querySelector("input.pc-attribute"),this.saveCheck=this.shadowRoot.querySelector('input[name="pc-save"]'),this.saveCheck.addEventListener("change",this._checkSave.bind(this)),this.scoreInput.addEventListener("change",this._scoreUpdate.bind(this)),this.shadowRoot.querySelector("button").addEventListener("click",this._savingThrow.bind(this))}disconnectedCallback(){this.saveCheck.removeEventListener("change",this._checkSave.bind(this)),this.scoreInput.removeEventListener("change",this._scoreUpdate.bind(this)),this.shadowRoot.querySelector("button").removeEventListener("click",this._savingThrow.bind(this))}get attributeName(){return this.dataset.name||""}set attributeName(e){this.dataset.name=e}get attributeScore(){return parseInt(this.scoreInput.value,10)}set attributeScore(e){this.scoreInput.value=e}get saveProficiency(){return this.saveCheck.checked?1:0}set saveProficiency(e){this.saveCheck.checked=e}set attributeMod(e){this.shadowRoot.querySelector(".pc-attribute-mod").innerHTML=e}get saveMod(){return this.shadowRoot.querySelector(".pc-save-mod").innerHTML}set saveMod(e){this.shadowRoot.querySelector(".pc-save-mod").innerHTML=e}_checkSave(e){let t={field:this.attributeName,value:e.target.checked?1:0};this.dispatchEvent(new CustomEvent("saveChange",{bubbles:!0,detail:t}))}_scoreUpdate(e){let t={field:this.attributeName,value:e.target.value};this.dispatchEvent(new CustomEvent("attributeChange",{bubbles:!0,detail:t}))}_savingThrow(e){let t=document.querySelector("sheet-view-5e").shadowRoot.querySelector("dice-roller");if(!t)return;let r=this.saveMod,i=`1d20${r!=="0"?r:""}`;t.roll(i)}focus(){this.shadowRoot.querySelector("input").focus()}};window.customElements.define("attr-listing",mu);var jr=function(n=0,e=null){return e==null&&(e=n,n=0),n+Math.floor(Math.random()*(e-n+1))};var io=class{constructor({die:e="",value:t=0}){this.die=e,this.value=t}toString(){return this.value}toJSON(){return{className:"DiceResult",die:this.die,value:this.value}}},pu=class{getSingleDieResult(e){return jr(1,e)}applyDieMod(e,t){let r=t.match(/^([dklh]{2})([0-9]*)$/);if(r===null)return e;let i=r[2]?parseInt(r[2]):1;switch(r[1]){case"dl":return e.sort((s,o)=>s-o),e.splice(0,i),e;case"dh":return e.sort((s,o)=>o-s),e.splice(0,i),e;case"kl":return e.sort((s,o)=>s-o),e.slice(0,i);case"kh":return e.sort((s,o)=>o-s),e.slice(0,i);default:return e}}_parseDiceNotation(e=6,t=1,r=0,i="+",s=""){r=parseInt(r,10),e=parseInt(e,10),t<=0?t=1:t=parseInt(t,10);let o=[];for(let c=1;c<=t;c++)o.push(this.getSingleDieResult(e));s!==""&&(o=this.applyDieMod(o,s));let a=0;if(o.length>0&&(a=o.reduce((c,l)=>c+l)),r===0)return a;switch(i){case"*":a=a*r;break;case"-":a=a-r;break;case"/":a=a/r;break;case"+":default:a=a+r;break}return Math.round(a)}rollDie(e=""){e=e.trim();let t=e.match(/^([0-9]*)d([0-9]+)([dklh]{2}[0-9]*)*(?:([\+\-\*\/])([0-9]+))*$/);return t?this._parseDiceNotation(t[2],t[1],t[5],t[4],t[3]):""}getDiceResult(e=""){return new io({die:e,value:this.rollDie(e)})}};var gu=function(n=""){let e=new pu;return new io({die:n,value:e.rollDie(n)})};var Gr=class{constructor({dragElement:e=null,handleSelector:t=null}){if(this.dragElement=e,!(this.dragElement instanceof HTMLElement))throw new Error("Dragger.dragElements must be HTMLElement");this.handleSelector=t,this.initDragBound=this.initDrag.bind(this),this.doDragCallback=this.doDrag.bind(this),this.stopDragCallback=this.stopDrag.bind(this),this._startX=null,this._startY=null,this._startPosX=null,this._startPosY=null,this._startWidth=null,this._startHeight=null,this.enabled=!1,this.callbackStartDrag=null}getEventX(e){return e.type.toLowerCase().indexOf("touch")===0?e.touches[0].clientX:e.clientX}getEventY(e){return e.type.toLowerCase().indexOf("touch")===0?e.touches[0].clientY:e.clientY}doDrag(e){e.preventDefault(),this.dragElement.coords=[this._startPosX+(this.getEventX(e)-this._startX),this._startPosY+(this.getEventY(e)-this._startY)]}stopDrag(){typeof this.dragElement.adjustForParentBounds=="function"&&this.dragElement.adjustForParentBounds(),typeof this.dragElement.saveCoords=="function"&&this.dragElement.saveCoords(),document.documentElement.removeEventListener("mousemove",this.doDragCallback,!1),document.documentElement.removeEventListener("touchmove",this.doDragCallback,!1),document.documentElement.removeEventListener("mouseup",this.stopDragCallback,!1),document.documentElement.removeEventListener("touchend",this.stopDragCallback,!1)}initDrag(e){e.button>1||(e.preventDefault(),e.stopPropagation(),this._startX=this.getEventX(e),this._startY=this.getEventY(e),[this._startPosX,this._startPosY]=this.dragElement.coords,this.callbackStartDrag!==null&&this.callbackStartDrag(this.dragElement,this.handleSelector),document.documentElement.addEventListener("mousemove",this.doDragCallback,!1),document.documentElement.addEventListener("touchmove",this.doDragCallback,!1),document.documentElement.addEventListener("mouseup",this.stopDragCallback,!1),document.documentElement.addEventListener("touchend",this.stopDragCallback,!1))}disableDrag(){if(!this.enabled)return;this.dragElement.removeEventListener("mousedown",this.initDragBound,!1),this.dragElement.removeEventListener("touchstart",this.initDragBound,!1);let e=this.handleSelector===""?this.dragElement:this.dragElement.querySelector(this.handleSelector);e!==null&&(e.style.cursor="auto"),this.enabled=!1}enableDrag(){if(this.enabled)return;this.dragElement.addEventListener("mousedown",this.initDragBound,!1),this.dragElement.addEventListener("touchstart",this.initDragBound,!1);let e=this.handleSelector===""?this.dragElement:this.dragElement.querySelector(this.handleSelector);e!==null&&(e.style.cursor="move"),this.enabled=!0}};var xp=document.createElement("template");xp.innerHTML=`
<link rel="stylesheet" href="./styles.css">
<style>
:host {
    padding: .25rem;
    font-size: 1.5rem;
    background-color: hsla(351, 100%, 95%, 1);
    position: fixed;
    border: .25rem solid var(--primary-color, black);
    border-radius: .5rem;
    height: 5rem;
    width: 5rem;
    text-align: center;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.5);
    z-index: 10;
}

div {
    flex: 5 1 auto;
    /** Make sure number is centered vertically */
    display: flex;
    align-items: center;
}

small {
    font-size: 0.9rem;
    font-weight: normal;
    flex: 1 2 auto;
    line-height: .5;
}

button {
    font-size: 1rem;
    background-color: var(--primary-color, black);
    color: white;
    border: none;
    border-radius: 2rem;
    margin-bottom: 0;
    padding: 0 0 0.125rem 0.125rem;
    flex: 0 1 auto;
    line-height: 1;
    margin-left: .5rem;
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: -1rem;
    right: -1rem;
}
</style>
<div></div>
<small></small>
<button type="button" class="btn-remove" aria-label="Remove die">&times;</button>
`;var so=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(xp.content.cloneNode(!0)),this.resultDiv=this.shadowRoot.querySelector("div"),this._die="1d6",this._result="",this._coords=[0,0]}connectedCallback(){this.removeButton=this.shadowRoot.querySelector("button.btn-remove"),this.dragger=new Gr({dragElement:this}),this._upgradeProperty("die"),this._upgradeProperty("result"),this._upgradeProperty("coords"),this._updateLabels(),this.removeButton.addEventListener("click",this.remove.bind(this));let[e,t]=this.coords;if(e===0&&t===0){let{x:r,y:i}=this.getRootNode().host.getBoundingClientRect();r=r+jr(-200,200),i=i+jr(-200,200),this.coords=[r,i]}this.dragger.enableDrag()}disconnectedCallback(){this.removeButton.removeEventListener("click",this.remove.bind(this))}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}_updateLabels(){this.setAttribute("aria-label",`${this.die} roll result: ${this.result}`),this.shadowRoot.querySelector("small").innerText=`${this.die}`}get die(){return this._die}set die(e){this._die=e,this._updateLabels()}get result(){return this._result}set result(e){this._result=e,this.resultDiv.innerText=this._result,this._updateLabels()}get coords(){return this._coords}set coords([e,t]){e<0&&(e=0),e>window.innerWidth&&(e=window.innerWidth-this.offsetWidth),t<0&&(t=0),t>window.innerHeight&&(t=window.innerHeight-this.offsetHeight),this._coords=[e,t],this.style.left=`${e}px`,this.style.top=`${t}px`,this.style.bottom="auto",this.style.right="auto"}remove(){this.dispatchEvent(new CustomEvent("dice:remove",{bubbles:!0,detail:{die:this}}))}};window.customElements.get("dice-single")||window.customElements.define("dice-single",so);var yu=so;var Lp=document.createElement("template");Lp.innerHTML=`
<link rel="stylesheet" href="./styles.css">
<style>
:host {
    display: block;
    padding: .5rem;
    font-size: 1.125rem;
    background-color: white;
    display: flex;
    align-items: baseline;
    position: relative;
    flex-wrap: wrap;
}

button {
    font-size: inherit;
    background-color: var(--primary-color, black);
    color: white;
    border: none;
    border-radius: .5rem;
    margin-left: 1rem;
    flex: 0 1 auto;
}
</style>
<slot name="rollbuttons"></slot>
<div id="dice-result" class="result" aria-live="assertive"></div>
<button type="button" class="btn-reset" aria-controls="dice-result">Clear</button>
`;var _u=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Lp.content.cloneNode(!0)),this._dice=[]}connectedCallback(){this.resultDiv=this.shadowRoot.getElementById("dice-result"),this.resetButton=this.shadowRoot.querySelector("button.btn-reset"),this._upgradeProperty("dice"),this.shadowRoot.addEventListener("dice:remove",this._removeDie.bind(this)),Array.from(this.children).forEach(e=>{e.addEventListener("click",this._handleRoll.bind(this))}),this.resetButton.addEventListener("click",this.reset.bind(this))}disconnectedCallback(){this.shadowRoot.removeEventListener("dice:remove",this._removeDie.bind(this)),Array.from(this.children).forEach(e=>{e.removeEventListener("click",this._handleRoll.bind(this))}),this.resetButton.removeEventListener("click",this.reset.bind(this))}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}_handleRoll(e){let r=e.target.dataset.die||"",i=gu(`${r}`);this._addDie(i)}roll(e="1d6"){let t=gu(e);this._addDie(t)}get dice(){return this._dice}set dice(e){if(!Array.isArray(e))throw Error("Dice must be array");this._dice=e,this.resultDiv.innerHTML="",this._dice.forEach(t=>{t instanceof yu&&this.resultDiv.appendChild(t)})}_addDie(e){let t=new yu;t.die=e.die,t.result=e.value,this._dice.push(t),this.resultDiv.appendChild(t)}_removeDie(e){e.stopImmediatePropagation();let t=e.detail.die||null;if(!t)return;let r=this._dice.findIndex(s=>s===t);if(r<0)return;let i=this._dice[r];this.resultDiv.removeChild(i),this._dice.splice(r,1)}reset(){this.dice=[]}};window.customElements.get("dice-roller")||window.customElements.define("dice-roller",_u);var Op=document.createElement("template");Op.innerHTML=`
<style>
    :host {
        display: block;
        width: 100%;
        display: flex;
    }
    :host([hidden]) {
        display: none
    }
    [contenteditable=true] {
        display: inline-block;
        width: 100%;
        min-height: 100%;
    }
    [contenteditable=true]:empty:before {
        content: attr(placeholder);
        color: #aaa;
    }
    [contenteditable=true]:empty {
        border: 1px dotted #bbb;
        border-radius: 4px;
    }
</style>
<span contenteditable="true"></span>
`;var vu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Op.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("placeholder")&&(this.placeholderText=this.getAttribute("placeholder")),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName")}disconnectedCallback(){this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}get placeholderText(){this.shadowRoot.querySelector("span").getAttribute("placeholder")}set placeholderText(e){this.shadowRoot.querySelector("span").setAttribute("placeholder",e)}get content(){return this.shadowRoot.querySelector("span").innerHTML}set content(e){this.shadowRoot.querySelector("span").innerHTML=e}_blur(e){let t=this.content;t=t.trim().replace(/(\s|&nbsp;|<br\/?>)+$/,""),this.content=t;let r={field:this.fieldName,value:t};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:r}))}focus(){this.shadowRoot.querySelector("[contenteditable=true]").focus()}};window.customElements.define("field-editable",vu);var Vp=document.createElement("template");Vp.innerHTML=`
<link rel="stylesheet" href="./styles.css">
<style>
    :host {
        position: fixed;
        bottom: 0;
        background-color: rgb(238, 238, 238);
        width: 100%;
        left: 0;
        padding: 0;
        text-align: center;
    }
    :host ol {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    :host ol li {
        display: inline-block;
    }
    :host ol li:last-of-type {
        margin-bottom: 0;
    }
    :host a {
        display: inline-block;
        margin: 0;
        border-right: 1px solid rgb(51, 51, 51);
        padding: 0 1rem;
        font-size: 0.75rem;
        line-height: 1rem;
    }
    :host ol li:last-of-type a {
        border-right: 0;
    }
    @media (min-width: 50.0rem) {
        :host a {
            margin: .5rem 0;
            font-size: 1.25rem;
            line-height: 1.75rem;
        }
    }
</style>
<ol>
    <li><a href="#page-top">Top</a></li>
</ol>
`;var wu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Vp.content.cloneNode(!0)),this.setAttribute("role","navigation"),this.setAttribute("aria-label","Character sheet tab/section navigation"),this.list=this.shadowRoot.querySelector("ol"),this.topLink=this.shadowRoot.querySelector("li:first-child"),this.shadowRoot.addEventListener("click",this._handleClicks.bind(this))}_handleClicks(e){if(e.target.tagName==="A"){e.preventDefault();let t=e.target,r=t.dataset.tab,i=document.querySelector("[data-sheetview]");r&&i.switchToPane(r);let s=t.getAttribute("href");i.navigateTo(s)}}setLinks(e){e.forEach(t=>{let r=document.createElement("li"),i=document.createElement("a");i.href=t.href||"",i.innerText=t.label||"",i.dataset.tab=t.tab||"",r.appendChild(i),this.list.appendChild(r)})}removeLinks(){this.shadowRoot.querySelectorAll("li").forEach(e=>{e!==this.topLink&&e.parentNode.removeChild(e)})}};window.customElements.get("footer-nav")||window.customElements.define("footer-nav",wu);var Mp=document.createElement("template");Mp.innerHTML=`
<style>
    :host {
        margin: 1rem auto;
        padding: 1.5rem;
        border: 2px solid rgb(207,0,15);
        border-radius: 4px;
        background-color: #fefefe;
        box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.5);
        width: auto;
        z-index: 100;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        min-width: 80%;
        top: 2rem;
    }
    @media (min-width: 50.0rem) {
        :host {
            margin: 2rem auto;
            padding: 1.5rem 3rem;
            min-width: 40%;
            max-width: 70rem;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    :host([hidden]) {
        display: none
    }
    h2 {
        font-weight: bold;
        font-size: 1.25rem;
        line-height: 1.75rem;
        margin: 0rem 0 1.25rem 0;
    }
    /* Close button */
    button.close {
        float: right;
        margin: 1rem 0 0 1rem;
    }
    form button.close {
        float: none;
        margin: 0 0 0 2rem;
    }

</style>
<h2 id="modal-label" tabindex="-1"><slot name="header"></slot></h2>
<slot name="content"></slot>
 `;var Eu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Mp.content.cloneNode(!0)),this.setAttribute("role","dialog"),this.setAttribute("aria-labelledby","modal-label"),this.boundOutsideClickClose=function(){},this.boundKeyboardEvents=function(){},this.opener=null,this.addEventListener("click",this.handleCloseClick)}connectedCallback(){}disconnectedCallback(){}get header(){return this.shadowRoot.querySelector('slot[name="header"]').innerHTML}set header(e){this.shadowRoot.querySelector('slot[name="header"]').innerHTML=e}get isOpen(){return!this.hidden}getCloseButton(){let e=document.createElement("button");return e.setAttribute("type","button"),e.classList.add("close"),e.textContent="Close",e.setAttribute("slot","content"),e}getChildren(e){if(typeof e.assignedElements=="function"){let t=e.assignedElements();return t.length?t:e.children}else return e.children}isFocusable(e,t=!1){let r=e.tagName;if(r===void 0)return!1;let i=e.disabled,s=parseInt(e.getAttribute("tabindex"),10),o=e.getAttribute("contenteditable");switch(r){case"INPUT":case"TEXTAREA":case"SELECT":case"BUTTON":case"A":return!(s===-1||i||r==="A"&&!e.href);default:if(t&&s>=0)return!0;if(!t&&s>=-1||o==="true")return!0}return!1}getFocusableChildren(e,t=!1,r=!1){let i=[],s=Array.from(this.getChildren(e));if(s.length===0)return i;for(let o of s){if(this.isFocusable(o,t)&&(i.push(o),r))return i;let a=this.getFocusableChildren(o,t,r);if(r&&a.length===1)return a;i=i.concat(a)}return i}findFocusables(e=!1,t=!1){return this.getFocusableChildren(this.shadowRoot,e,t)}findFirstFocusable(){return this.findFocusables(!1,!0).shift()}findFirstTabFocusable(){return this.findFocusables(!0,!0).shift()}findLastTabFocusable(){let e=this.findFocusables(!0);return e[e.length-1]}focusFirst(){let e=this.findFirstFocusable();e&&e.focus()}outsideClickClose(e){if(e.target.closest("modal-mib")===null){if(e.target.classList.contains("btn-dialog"))return;this.close(),this.clear()}}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}keyboardEvents(e){if(e.key==="Escape"){this.close();return}if(e.key!=="Tab")return;let t=this.deepActiveElement();if(e.shiftKey){if(t===this.findFirstFocusable()||t===this.findFirstTabFocusable()){let r=this.findLastTabFocusable();r&&(e.preventDefault(),r.focus())}return}if(t===this.findLastTabFocusable()){let r=this.findFirstTabFocusable();r&&(e.preventDefault(),r.focus())}}open(){this.isOpen||(this.opener=this.deepActiveElement(),this.hidden=!1,this.focusFirst(),this.boundOutsideClickClose=this.outsideClickClose.bind(this),document.addEventListener("click",this.boundOutsideClickClose,!0),this.boundKeyboardEvents=this.keyboardEvents.bind(this),document.addEventListener("keydown",this.boundKeyboardEvents,!0))}close(){this.hidden=!0,document.removeEventListener("click",this.boundOutsideClickClose,!0),document.removeEventListener("keydown",this.boundKeyboardEvents,!0),this.opener&&this.opener.focus()}clear(){for(;this.firstChild;)this.removeChild(this.firstChild)}closeClear(){this.close(),this.clear()}handleCloseClick(e){e.target.classList.contains("close")&&(e.preventDefault(),this.close(),this.clear())}setContent(e,t=!0){Array.isArray(e)||(e=[e]),this.clear();let r=document.createDocumentFragment();e.forEach(i=>{i.getAttribute("slot")||i.setAttribute("slot","content"),r.appendChild(i)}),t&&r.appendChild(this.getCloseButton()),this.appendChild(r)}};window.customElements.get("modal-mib")||window.customElements.define("modal-mib",Eu);"serviceWorker"in navigator&&navigator.serviceWorker.register("./service_worker.js",{type:"module"});var Fp=new Nn;document.querySelector("action-menu").setEmitter(Fp);mp.initialize({emitter:Fp,prefix:"charsheet-app-",appname:"character-sheet"});})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-e24386e7.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=index.js.map
