(()=>{var Nn=class{constructor(){this.events={},this.debug=!1}listenerIndex(e,t){return this.events[e].findIndex(r=>r.listener===t)}on(e,t,r=null){if(typeof t=="function"){if(this.events[e]=this.events[e]||[],this.events[e].length>0){let i=this.listenerIndex(e,t);i>-1&&this.events[e].splice(i,1)}this.events[e].push({listener:t,boundObj:r})}}off(e,t){if(Array.isArray(this.events[e])){let r=this.listenerIndex(e,t);if(r===-1)return;this.events[e].splice(r,1),this.events[e].length===0&&delete this.events[e]}}once(e,t,r){this.on(e,function i(){this.off(e,i);let s=typeof r>"u"?this:r;t.apply(s,arguments)})}trigger(e){this.debug&&console&&console.log(`EventEmitter triggered: ${e}`);let t=[].slice.call(arguments,1);Array.isArray(this.events[e])&&this.events[e].forEach(r=>{let i=r.boundObj===null?this:r.boundObj;r.listener.apply(i,t)})}};var je=class{constructor({header:e="",text:t=""}){this.header=e,this.text=t}toJSON(){let e={};return Object.getOwnPropertyNames(this).forEach(r=>{e[r]=this[r]}),e}};var ze=class{constructor({key:e="",charname:t="",updated:r="",key_prev:i="",version:s=""}){this.key=e,this.charname=t,this.updated=r,this.key_prev=i,this.version=s}get updatedTime(){return new Date(this.updated).toLocaleString()}get className(){return"Character"}get ruleset(){return"Generic"}get summaryHeader(){return`${this.charname} (${this.ruleset})`}_convertNotes(e){let t=[];return e.forEach(r=>{if(!(r&&typeof r!="object")){if(r instanceof je){t.push(r);return}if(Array.isArray(r)){t.push(new je({header:r[0]||"",text:r[1]||""}));return}t.push(new je(r))}}),t}toJSON(){let e={className:this.className};return Object.getOwnPropertyNames(this).forEach(r=>{if(r==="emitter")return;let i=this[r];Array.isArray(i)&&(i=i.map(s=>typeof s.toJSON=="function"?s.toJSON():s)),r.substring(0,1)==="_"?e[r.substring(1)]=i:e[r]=i}),e}};var K=Object.freeze({STRENGTH:"str",DEXTERITY:"dex",CONSTITUTION:"con",INTELLIGENCE:"intel",WISDOM:"wis",CHARISMA:"cha"}),$r=Object.freeze({acrobatics:K.DEXTERITY,animal_handling:K.WISDOM,arcana:K.INTELLIGENCE,athletics:K.STRENGTH,deception:K.CHARISMA,history:K.INTELLIGENCE,insight:K.WISDOM,intimidation:K.CHARISMA,investigation:K.INTELLIGENCE,medicine:K.WISDOM,nature:K.INTELLIGENCE,perception:K.WISDOM,performance:K.CHARISMA,persuasion:K.CHARISMA,religion:K.INTELLIGENCE,sleight_of_hand:K.DEXTERITY,stealth:K.DEXTERITY,survival:K.WISDOM}),ho=Object.freeze({UNSKILLED:0,PROFICIENT:1,EXPERT:2});var He=class{constructor({name:e="",attack:t="",damage:r="",notes:i=""}){this.name=e,this.attack=t,this.damage=r,this.notes=i}toJSON(){let e={};return Object.getOwnPropertyNames(this).forEach(r=>{e[r]=this[r]}),e}};var yt=class extends ze{constructor({key:e="",charname:t="",charclass:r="",race:i="",background:s="",alignment:o="",level:a=1,experience:c=0,inspiration:l="",armor_class:u="",speed:h=30,hp_cur:d="",hp_max:f="",hd_cur:I="",hd_max:T="",deathSave:v={success:0,fail:0},class_points:D={cur:0,max:0},str:L=10,dex:O=10,con:z=10,intel:oe=10,wis:j=10,cha:ve=10,saves:Se={str:0,dex:0,con:0,intel:0,wis:0,cha:0},skills:Be={acrobatics:0,animal_handling:0,arcana:0,athletics:0,deception:0,history:0,insight:0,intimidation:0,investigation:0,medicine:0,nature:0,perception:0,performance:0,persuasion:0,religion:0,sleight_of_hand:0,stealth:0,survival:0},weapons:et=[],proficiencies_other:so="",languages:oo="",traits:ao="",ideals:co="",bonds:lo="",flaws:uo="",appearance:Fp="",equipment:Up=[],cp:qp="",sp:Bp="",gp:jp="",pp:zp="",features:Hp=[],notes:Gp="",notes_adv:$p=[],notes_cam:Kp=[],npcs:Wp=[],factions:Qp=[],partymembers:Yp=[],spell_ability:Xp="",spell_save:Jp="",spell_attack:Zp="",spell_slots:eg={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0},spell_slots_cur:tg={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0},spells:ng={0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]},updated:rg="",key_prev:ig="",version:sg=""}){if(super({key:e,charname:t,updated:rg,key_prev:ig,version:sg}),this.charclass=r,this.race=i,this.background=s,this.alignment=o,this._level=a,this.experience=c,this.inspiration=l,this.armor_class=u,this.speed=h,this.hp_cur=d,this.hp_max=f,this.hd_cur=I,this.hd_max=T,this.deathSave=v,this.class_points=D,this.str=L,this.dex=O,this.con=z,this.intel=oe,this.wis=j,this.cha=ve,this.saves=Se,this.skills=Be,typeof this.skills.sleight_of_Hand<"u"){let me=this.skills.sleight_of_Hand;delete this.skills.sleight_of_Hand,this.skills.sleight_of_hand=me}this.weapons=[],et.forEach(me=>{if(!(me&&typeof me!="object")){if(Array.isArray(me)){this.weapons.push(new He({name:me[0]||"",attack:me[1]||"",damage:me[2]||"",notes:me[3]||""}));return}if(me instanceof He){this.weapons.push(me);return}this.weapons.push(new He(me))}}),this.proficiencies_other=so,this.languages=oo,this.traits=ao,this.ideals=co,this.bonds=lo,this.flaws=uo,this.appearance=Fp,this.equipment=Up,this.cp=qp,this.sp=Bp,this.gp=jp,this.pp=zp,this.features=Hp,this.notes=Gp,this.notes_adv=this._convertNotes($p),this.notes_cam=this._convertNotes(Kp),this.npcs=this._convertNotes(Wp),this.factions=this._convertNotes(Qp),this.partymembers=this._convertNotes(Yp),this.spell_ability=Xp,this.spell_save=Jp,this.spell_attack=Zp,this.spell_slots=eg,this.spell_slots_cur=tg,this.spells=ng,this.emitter=null}get className(){return"Character5e"}get ruleset(){return"5e"}get level(){return this._level}set level(e){let t=this.level;if(e===t)return;let r=this.proficiency;this._level=e;let i=this.proficiency;r!==i&&this.emitter&&this.emitter.trigger("character:proficiency:update")}get proficiency(){return`+${Math.ceil(this.level/4)+1}`}setAttribute(e,t){if(!(!this[e]||this[e]===t)&&(this[e]=t,this.emitter)){this.emitter.trigger("character:attribute:update",e);for(let i in $r)$r[i]===e&&this.emitter.trigger("character:skill:update",i,this.getSkillMod(i))}}attributeMod(e){let t=this[e];if(Number.isNaN(t))return"0";let r=Math.floor((t-10)/2);return r>0?`+${r}`:r.toString()}isProficient(e){return this.skills[e]>ho.UNSKILLED}isExpert(e){return this.skills[e]===ho.EXPERT}getSkillMod(e){let t=0;if(typeof this.skills[e]>"u")return 0;let i=$r[e];i&&(t+=parseInt(this.attributeMod(i),10));let s=parseInt(this.proficiency,10);return this.isProficient(e)&&(t+=s),this.isExpert(e)&&(t+=s),t>0?`+${t}`:t.toString()}getSkill(e){let t=this.skills[e];return typeof t>"u"?null:t}setSkill(e,t){let r=this.getSkill(e);r===null||r===t||(this.skills[e]=t,this.emitter&&this.emitter.trigger("character:skill:update",e,this.getSkillMod(e)))}isSaveProficient(e){return this.saves[e]||0}saveMod(e){let t=0;this.isSaveProficient(e)&&(t=parseInt(this.proficiency,10));let r=0+t+parseInt(this.attributeMod(e),10);return r>0?`+${r}`:r.toString()}setSaveProficiency(e,t){let r=this.saves[e];typeof r>"u"||r!==t&&(this.saves[e]=t?1:0,this.emitter&&this.emitter.trigger("character:save:update",e))}};var _t=class extends ze{constructor({key:e="",charname:t="",level:r=1,conflict_approach:i="",goal:s="",gimmick:o="",background:a="",foreground:c="",weakness:l="",core_flaw:u="",techniques:h=[],traits:d=[],hp_cur:f=0,hp_max:I=0,armor:T=0,initiative:v="0",lineage:D=[],experience:L=0,appearance:O="",personality:z="",inventory:oe=[],coins:j=0,injuries:ve=[],notes:Se="",notes_adv:Be=[],notes_cam:et=[],npcs:so=[],factions:oo=[],partymembers:ao=[],updated:co="",key_prev:lo="",version:uo=""}){super({key:e,charname:t,updated:co,key_prev:lo,version:uo}),this.level=r,this.conflict_approach=i,this.goal=s,this.gimmick=o,this.background=a,this.foreground=c,this.weakness=l,this.core_flaw=u,this.techniques=h,this.traits=d,this.hp_cur=f,this.hp_max=I,this.armor=T,this.initiative=v,this.lineage=D,this.experience=L,this.appearance=O,this.personality=z,this.inventory=oe,this.coins=j,this.injuries=ve,this.notes=Se,this.notes_adv=this._convertNotes(Be),this.notes_cam=this._convertNotes(et),this.npcs=this._convertNotes(so),this.factions=this._convertNotes(oo),this.partymembers=this._convertNotes(ao),this.emitter=null}get className(){return"CharacterVagabonds"}get ruleset(){return"Vagabonds"}};var bu={prefix:"",setPrefix:function(n){this.prefix=n},get:function(n){try{let e=localStorage.getItem(`${this.prefix}${n}`);return e!==null?JSON.parse(e):null}catch{return null}},set:function(n,e){try{localStorage.setItem(`${this.prefix}${n}`,JSON.stringify(e))}catch(t){return console.log(t.message),!1}return!0},remove:function(n){localStorage.removeItem(`${this.prefix}${n}`)},getAllKeys:function(){let n=[];if(localStorage.length>0){let e=new RegExp(`^(${this.prefix})+`,"i");for(let t=0;t<localStorage.length;t++){let r=localStorage.key(t);r=r.replace(e,""),n.push(r)}}return n},getAll:function(){let n=this.getAllKeys(),e=[];return n.forEach(t=>{let r=bu.get(t);!r||!r.key||e.push(r)}),e}},Kt=bu;var Au=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},og=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],o=n[t++],a=n[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{let s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Su={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],o=i+1<n.length,a=o?n[i+1]:0,c=i+2<n.length,l=c?n[i+2]:0,u=s>>2,h=(s&3)<<4|a>>4,d=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(d=64)),r.push(t[u],t[h],t[d],t[f])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Au(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):og(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;let l=i<n.length?t[n.charAt(i)]:64;++i;let h=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||l==null||h==null)throw new mo;let d=s<<2|a>>4;if(r.push(d),l!==64){let f=a<<4&240|l>>2;if(r.push(f),h!==64){let I=l<<6&192|h;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},mo=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},ag=function(n){let e=Au(n);return Su.encodeByteArray(e,!0)},xn=function(n){return ag(n).replace(/\./g,"")},go=function(n){try{return Su.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function cg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var lg=()=>cg().__FIREBASE_DEFAULTS__,ug=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},hg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&go(n[1]);return e&&JSON.parse(e)},yo=()=>{try{return lg()||ug()||hg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},_o=n=>{var e,t;return(t=(e=yo())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Cu=n=>{let e=_o(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},vo=()=>{var n;return(n=yo())===null||n===void 0?void 0:n.config},wo=n=>{var e;return(e=yo())===null||e===void 0?void 0:e[`_${n}`]};var Kr=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function Ru(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n),a="";return[xn(JSON.stringify(t)),xn(JSON.stringify(o)),a].join(".")}function W(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ku(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(W())}function Pu(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Du(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Nu(){let n=W();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Eo(){try{return typeof indexedDB=="object"}catch{return!1}}function xu(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var dg="FirebaseError",he=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=dg,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ge.prototype.create)}},Ge=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?fg(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new he(i,a,r)}};function fg(n,e){return n.replace(mg,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var mg=/\{\$([^}]+)}/g;function Lu(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function vt(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],o=e[i];if(Tu(s)&&Tu(o)){if(!vt(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function Tu(n){return n!==null&&typeof n=="object"}function Wt(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Qt(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Yt(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Ou(n,e){let t=new po(n,e);return t.subscribe.bind(t)}var po=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");pg(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=fo),i.error===void 0&&(i.error=fo),i.complete===void 0&&(i.complete=fo);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function pg(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function fo(){}var RI=4*60*60*1e3;function ne(n){return n&&n._delegate?n._delegate:n}var pe=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var wt="[DEFAULT]";var Io=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new Kr;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(yg(e))try{this.getOrInitializeService({instanceIdentifier:wt})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=wt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=wt){return this.instances.has(e)}getOptions(e=wt){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:gg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=wt){return this.component?this.component.multipleInstances?e:wt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function gg(n){return n===wt?void 0:n}function yg(n){return n.instantiationMode==="EAGER"}var Wr=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Io(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var _g=[],R;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(R||(R={}));var vg={debug:R.DEBUG,verbose:R.VERBOSE,info:R.INFO,warn:R.WARN,error:R.ERROR,silent:R.SILENT},wg=R.INFO,Eg={[R.DEBUG]:"log",[R.VERBOSE]:"log",[R.INFO]:"info",[R.WARN]:"warn",[R.ERROR]:"error"},Ig=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=Eg[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},tt=class{constructor(e){this.name=e,this._logLevel=wg,this._logHandler=Ig,this._userLogHandler=null,_g.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in R))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?vg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,R.DEBUG,...e),this._logHandler(this,R.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,R.VERBOSE,...e),this._logHandler(this,R.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,R.INFO,...e),this._logHandler(this,R.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,R.WARN,...e),this._logHandler(this,R.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,R.ERROR,...e),this._logHandler(this,R.ERROR,...e)}};var bg=(n,e)=>e.some(t=>n instanceof t),Vu,Mu;function Tg(){return Vu||(Vu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ag(){return Mu||(Mu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Fu=new WeakMap,To=new WeakMap,Uu=new WeakMap,bo=new WeakMap,So=new WeakMap;function Sg(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(Ce(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Fu.set(t,n)}).catch(()=>{}),So.set(e,n),e}function Cg(n){if(To.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});To.set(n,e)}var Ao={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return To.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Uu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ce(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function qu(n){Ao=n(Ao)}function Rg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Qr(this),e,...t);return Uu.set(r,e.sort?e.sort():[e]),Ce(r)}:Ag().includes(n)?function(...e){return n.apply(Qr(this),e),Ce(Fu.get(this))}:function(...e){return Ce(n.apply(Qr(this),e))}}function kg(n){return typeof n=="function"?Rg(n):(n instanceof IDBTransaction&&Cg(n),bg(n,Tg())?new Proxy(n,Ao):n)}function Ce(n){if(n instanceof IDBRequest)return Sg(n);if(bo.has(n))return bo.get(n);let e=kg(n);return e!==n&&(bo.set(n,e),So.set(e,n)),e}var Qr=n=>So.get(n);function ju(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(n,e),a=Ce(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Ce(o.result),c.oldVersion,c.newVersion,Ce(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Pg=["get","getKey","getAll","getAllKeys","count"],Dg=["put","add","delete","clear"],Co=new Map;function Bu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Co.get(e))return Co.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=Dg.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Pg.includes(t)))return;let s=async function(o,...a){let c=this.transaction(o,i?"readwrite":"readonly"),l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),i&&c.done]))[0]};return Co.set(e,s),s}qu(n=>({...n,get:(e,t,r)=>Bu(e,t)||n.get(e,t,r),has:(e,t)=>!!Bu(e,t)||n.has(e,t)}));var ko=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ng(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function Ng(n){let e=n.getComponent();return e?.type==="VERSION"}var Po="@firebase/app",zu="0.9.18";var Et=new tt("@firebase/app"),xg="@firebase/app-compat",Lg="@firebase/analytics-compat",Og="@firebase/analytics",Vg="@firebase/app-check-compat",Mg="@firebase/app-check",Fg="@firebase/auth",Ug="@firebase/auth-compat",qg="@firebase/database",Bg="@firebase/database-compat",jg="@firebase/functions",zg="@firebase/functions-compat",Hg="@firebase/installations",Gg="@firebase/installations-compat",$g="@firebase/messaging",Kg="@firebase/messaging-compat",Wg="@firebase/performance",Qg="@firebase/performance-compat",Yg="@firebase/remote-config",Xg="@firebase/remote-config-compat",Jg="@firebase/storage",Zg="@firebase/storage-compat",ey="@firebase/firestore",ty="@firebase/firestore-compat",ny="firebase",ry="10.3.1";var Do="[DEFAULT]",iy={[Po]:"fire-core",[xg]:"fire-core-compat",[Og]:"fire-analytics",[Lg]:"fire-analytics-compat",[Mg]:"fire-app-check",[Vg]:"fire-app-check-compat",[Fg]:"fire-auth",[Ug]:"fire-auth-compat",[qg]:"fire-rtdb",[Bg]:"fire-rtdb-compat",[jg]:"fire-fn",[zg]:"fire-fn-compat",[Hg]:"fire-iid",[Gg]:"fire-iid-compat",[$g]:"fire-fcm",[Kg]:"fire-fcm-compat",[Wg]:"fire-perf",[Qg]:"fire-perf-compat",[Yg]:"fire-rc",[Xg]:"fire-rc-compat",[Jg]:"fire-gcs",[Zg]:"fire-gcs-compat",[ey]:"fire-fst",[ty]:"fire-fst-compat","fire-js":"fire-js",[ny]:"fire-js-all"};var Yr=new Map,No=new Map;function sy(n,e){try{n.container.addComponent(e)}catch(t){Et.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function rt(n){let e=n.name;if(No.has(e))return Et.debug(`There were multiple attempts to register component ${e}.`),!1;No.set(e,n);for(let t of Yr.values())sy(t,n);return!0}function On(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}var oy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},nt=new Ge("app","Firebase",oy);var xo=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw nt.create("app-deleted",{appName:this._name})}};var it=ry;function Vo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:Do,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw nt.create("bad-app-name",{appName:String(i)});if(t||(t=vo()),!t)throw nt.create("no-options");let s=Yr.get(i);if(s){if(vt(t,s.options)&&vt(r,s.config))return s;throw nt.create("duplicate-app",{appName:i})}let o=new Wr(i);for(let c of No.values())o.addComponent(c);let a=new xo(t,r,o);return Yr.set(i,a),a}function Xr(n=Do){let e=Yr.get(n);if(!e&&n===Do&&vo())return Vo();if(!e)throw nt.create("no-app",{appName:n});return e}function we(n,e,t){var r;let i=(r=iy[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Et.warn(a.join(" "));return}rt(new pe(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var ay="firebase-heartbeat-database",cy=1,Ln="firebase-heartbeat-store",Ro=null;function Ku(){return Ro||(Ro=ju(ay,cy,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Ln)}}}).catch(n=>{throw nt.create("idb-open",{originalErrorMessage:n.message})})),Ro}async function ly(n){try{return await(await Ku()).transaction(Ln).objectStore(Ln).get(Wu(n))}catch(e){if(e instanceof he)Et.warn(e.message);else{let t=nt.create("idb-get",{originalErrorMessage:e?.message});Et.warn(t.message)}}}async function Hu(n,e){try{let r=(await Ku()).transaction(Ln,"readwrite");await r.objectStore(Ln).put(e,Wu(n)),await r.done}catch(t){if(t instanceof he)Et.warn(t.message);else{let r=nt.create("idb-set",{originalErrorMessage:t?.message});Et.warn(r.message)}}}function Wu(n){return`${n.name}!${n.options.appId}`}var uy=1024,hy=30*24*60*60*1e3,Lo=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Oo(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){let t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Gu();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(i=>{let s=new Date(i.date).valueOf();return Date.now()-s<=hy}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";let e=Gu(),{heartbeatsToSend:t,unsentEntries:r}=dy(this._heartbeatsCache.heartbeats),i=xn(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}};function Gu(){return new Date().toISOString().substring(0,10)}function dy(n,e=uy){let t=[],r=n.slice();for(let i of n){let s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),$u(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),$u(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Oo=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Eo()?xu().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await ly(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Hu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Hu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function $u(n){return xn(JSON.stringify({version:2,heartbeats:n})).length}function fy(n){rt(new pe("platform-logger",e=>new ko(e),"PRIVATE")),rt(new pe("heartbeat",e=>new Lo(e),"PRIVATE")),we(Po,zu,n),we(Po,zu,"esm2017"),we("fire-js","")}fy("");var my=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ie={},g,ia=ia||{},A=my||self;function di(n){var e=typeof n;return e=e!="object"?e:n?Array.isArray(n)?"array":e:"null",e=="array"||e=="object"&&typeof n.length=="number"}function Qn(n){var e=typeof n;return e=="object"&&n!=null||e=="function"}function py(n){return Object.prototype.hasOwnProperty.call(n,Mo)&&n[Mo]||(n[Mo]=++gy)}var Mo="closure_uid_"+(1e9*Math.random()>>>0),gy=0;function yy(n,e,t){return n.call.apply(n.bind,arguments)}function _y(n,e,t){if(!n)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var i=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(i,r),n.apply(e,i)}}return function(){return n.apply(e,arguments)}}function re(n,e,t){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?re=yy:re=_y,re.apply(null,arguments)}function Jr(n,e){var t=Array.prototype.slice.call(arguments,1);return function(){var r=t.slice();return r.push.apply(r,arguments),n.apply(this,r)}}function Y(n,e){function t(){}t.prototype=e.prototype,n.$=e.prototype,n.prototype=new t,n.prototype.constructor=n,n.ac=function(r,i,s){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[i].apply(r,o)}}function st(){this.s=this.s,this.o=this.o}var vy=0;st.prototype.s=!1;st.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),vy!=0)&&py(this)};st.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};var ah=Array.prototype.indexOf?function(n,e){return Array.prototype.indexOf.call(n,e,void 0)}:function(n,e){if(typeof n=="string")return typeof e!="string"||e.length!=1?-1:n.indexOf(e,0);for(let t=0;t<n.length;t++)if(t in n&&n[t]===e)return t;return-1};function sa(n){let e=n.length;if(0<e){let t=Array(e);for(let r=0;r<e;r++)t[r]=n[r];return t}return[]}function Qu(n,e){for(let t=1;t<arguments.length;t++){let r=arguments[t];if(di(r)){let i=n.length||0,s=r.length||0;n.length=i+s;for(let o=0;o<s;o++)n[i+o]=r[o]}else n.push(r)}}function ie(n,e){this.type=n,this.g=this.target=e,this.defaultPrevented=!1}ie.prototype.h=function(){this.defaultPrevented=!0};var wy=function(){if(!A.addEventListener||!Object.defineProperty)return!1;var n=!1,e=Object.defineProperty({},"passive",{get:function(){n=!0}});try{A.addEventListener("test",()=>{},e),A.removeEventListener("test",()=>{},e)}catch{}return n}();function Bn(n){return/^[\s\xa0]*$/.test(n)}function fi(){var n=A.navigator;return n&&(n=n.userAgent)?n:""}function Re(n){return fi().indexOf(n)!=-1}function oa(n){return oa[" "](n),n}oa[" "]=function(){};function Ey(n,e){var t=l_;return Object.prototype.hasOwnProperty.call(t,n)?t[n]:t[n]=e(n)}var Iy=Re("Opera"),en=Re("Trident")||Re("MSIE"),ch=Re("Edge"),jo=ch||en,lh=Re("Gecko")&&!(fi().toLowerCase().indexOf("webkit")!=-1&&!Re("Edge"))&&!(Re("Trident")||Re("MSIE"))&&!Re("Edge"),by=fi().toLowerCase().indexOf("webkit")!=-1&&!Re("Edge");function uh(){var n=A.document;return n?n.documentMode:void 0}var zo;e:{if(Zr="",ei=function(){var n=fi();if(lh)return/rv:([^\);]+)(\)|;)/.exec(n);if(ch)return/Edge\/([\d\.]+)/.exec(n);if(en)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(n);if(by)return/WebKit\/(\S+)/.exec(n);if(Iy)return/(?:Version)[ \/]?(\S+)/.exec(n)}(),ei&&(Zr=ei?ei[1]:""),en&&(ti=uh(),ti!=null&&ti>parseFloat(Zr))){zo=String(ti);break e}zo=Zr}var Zr,ei,ti,Ho;A.document&&en?(Fo=uh(),Ho=Fo||parseInt(zo,10)||void 0):Ho=void 0;var Fo,Ty=Ho;function jn(n,e){if(ie.call(this,n?n.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,n){var t=this.type=n.type,r=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:null;if(this.target=n.target||n.srcElement,this.g=e,e=n.relatedTarget){if(lh){e:{try{oa(e.nodeName);var i=!0;break e}catch{}i=!1}i||(e=null)}}else t=="mouseover"?e=n.fromElement:t=="mouseout"&&(e=n.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0),this.button=n.button,this.key=n.key||"",this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.pointerId=n.pointerId||0,this.pointerType=typeof n.pointerType=="string"?n.pointerType:Ay[n.pointerType]||"",this.state=n.state,this.i=n,n.defaultPrevented&&jn.$.h.call(this)}}Y(jn,ie);var Ay={2:"touch",3:"pen",4:"mouse"};jn.prototype.h=function(){jn.$.h.call(this);var n=this.i;n.preventDefault?n.preventDefault():n.returnValue=!1};var Yn="closure_listenable_"+(1e6*Math.random()|0),Sy=0;function Cy(n,e,t,r,i){this.listener=n,this.proxy=null,this.src=e,this.type=t,this.capture=!!r,this.la=i,this.key=++Sy,this.fa=this.ia=!1}function mi(n){n.fa=!0,n.listener=null,n.proxy=null,n.src=null,n.la=null}function aa(n,e,t){for(let r in n)e.call(t,n[r],r,n)}function Ry(n,e){for(let t in n)e.call(void 0,n[t],t,n)}function hh(n){let e={};for(let t in n)e[t]=n[t];return e}var Yu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function dh(n,e){let t,r;for(let i=1;i<arguments.length;i++){r=arguments[i];for(t in r)n[t]=r[t];for(let s=0;s<Yu.length;s++)t=Yu[s],Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}}function pi(n){this.src=n,this.g={},this.h=0}pi.prototype.add=function(n,e,t,r,i){var s=n.toString();n=this.g[s],n||(n=this.g[s]=[],this.h++);var o=$o(n,e,r,i);return-1<o?(e=n[o],t||(e.ia=!1)):(e=new Cy(e,this.src,s,!!r,i),e.ia=t,n.push(e)),e};function Go(n,e){var t=e.type;if(t in n.g){var r=n.g[t],i=ah(r,e),s;(s=0<=i)&&Array.prototype.splice.call(r,i,1),s&&(mi(e),n.g[t].length==0&&(delete n.g[t],n.h--))}}function $o(n,e,t,r){for(var i=0;i<n.length;++i){var s=n[i];if(!s.fa&&s.listener==e&&s.capture==!!t&&s.la==r)return i}return-1}var ca="closure_lm_"+(1e6*Math.random()|0),Uo={};function fh(n,e,t,r,i){if(r&&r.once)return ph(n,e,t,r,i);if(Array.isArray(e)){for(var s=0;s<e.length;s++)fh(n,e[s],t,r,i);return null}return t=ha(t),n&&n[Yn]?n.O(e,t,Qn(r)?!!r.capture:!!r,i):mh(n,e,t,!1,r,i)}function mh(n,e,t,r,i,s){if(!e)throw Error("Invalid event type");var o=Qn(i)?!!i.capture:!!i,a=ua(n);if(a||(n[ca]=a=new pi(n)),t=a.add(e,t,r,o,s),t.proxy)return t;if(r=ky(),t.proxy=r,r.src=n,r.listener=t,n.addEventListener)wy||(i=o),i===void 0&&(i=!1),n.addEventListener(e.toString(),r,i);else if(n.attachEvent)n.attachEvent(yh(e.toString()),r);else if(n.addListener&&n.removeListener)n.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return t}function ky(){function n(t){return e.call(n.src,n.listener,t)}let e=Py;return n}function ph(n,e,t,r,i){if(Array.isArray(e)){for(var s=0;s<e.length;s++)ph(n,e[s],t,r,i);return null}return t=ha(t),n&&n[Yn]?n.P(e,t,Qn(r)?!!r.capture:!!r,i):mh(n,e,t,!0,r,i)}function gh(n,e,t,r,i){if(Array.isArray(e))for(var s=0;s<e.length;s++)gh(n,e[s],t,r,i);else r=Qn(r)?!!r.capture:!!r,t=ha(t),n&&n[Yn]?(n=n.i,e=String(e).toString(),e in n.g&&(s=n.g[e],t=$o(s,t,r,i),-1<t&&(mi(s[t]),Array.prototype.splice.call(s,t,1),s.length==0&&(delete n.g[e],n.h--)))):n&&(n=ua(n))&&(e=n.g[e.toString()],n=-1,e&&(n=$o(e,t,r,i)),(t=-1<n?e[n]:null)&&la(t))}function la(n){if(typeof n!="number"&&n&&!n.fa){var e=n.src;if(e&&e[Yn])Go(e.i,n);else{var t=n.type,r=n.proxy;e.removeEventListener?e.removeEventListener(t,r,n.capture):e.detachEvent?e.detachEvent(yh(t),r):e.addListener&&e.removeListener&&e.removeListener(r),(t=ua(e))?(Go(t,n),t.h==0&&(t.src=null,e[ca]=null)):mi(n)}}}function yh(n){return n in Uo?Uo[n]:Uo[n]="on"+n}function Py(n,e){if(n.fa)n=!0;else{e=new jn(e,this);var t=n.listener,r=n.la||n.src;n.ia&&la(n),n=t.call(r,e)}return n}function ua(n){return n=n[ca],n instanceof pi?n:null}var qo="__closure_events_fn_"+(1e9*Math.random()>>>0);function ha(n){return typeof n=="function"?n:(n[qo]||(n[qo]=function(e){return n.handleEvent(e)}),n[qo])}function Q(){st.call(this),this.i=new pi(this),this.S=this,this.J=null}Y(Q,st);Q.prototype[Yn]=!0;Q.prototype.removeEventListener=function(n,e,t,r){gh(this,n,e,t,r)};function Z(n,e){var t,r=n.J;if(r)for(t=[];r;r=r.J)t.push(r);if(n=n.S,r=e.type||e,typeof e=="string")e=new ie(e,n);else if(e instanceof ie)e.target=e.target||n;else{var i=e;e=new ie(r,n),dh(e,i)}if(i=!0,t)for(var s=t.length-1;0<=s;s--){var o=e.g=t[s];i=ni(o,r,!0,e)&&i}if(o=e.g=n,i=ni(o,r,!0,e)&&i,i=ni(o,r,!1,e)&&i,t)for(s=0;s<t.length;s++)o=e.g=t[s],i=ni(o,r,!1,e)&&i}Q.prototype.N=function(){if(Q.$.N.call(this),this.i){var n=this.i,e;for(e in n.g){for(var t=n.g[e],r=0;r<t.length;r++)mi(t[r]);delete n.g[e],n.h--}}this.J=null};Q.prototype.O=function(n,e,t,r){return this.i.add(String(n),e,!1,t,r)};Q.prototype.P=function(n,e,t,r){return this.i.add(String(n),e,!0,t,r)};function ni(n,e,t,r){if(e=n.i.g[String(e)],!e)return!0;e=e.concat();for(var i=!0,s=0;s<e.length;++s){var o=e[s];if(o&&!o.fa&&o.capture==t){var a=o.listener,c=o.la||o.src;o.ia&&Go(n.i,o),i=a.call(c,r)!==!1&&i}}return i&&!r.defaultPrevented}var da=A.JSON.stringify,Ko=class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}};function Dy(){var n=fa;let e=null;return n.g&&(e=n.g,n.g=n.g.next,n.g||(n.h=null),e.next=null),e}var Wo=class{constructor(){this.h=this.g=null}add(e,t){let r=_h.get();r.set(e,t),this.h?this.h.next=r:this.g=r,this.h=r}},_h=new Ko(()=>new Qo,n=>n.reset()),Qo=class{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}};function Ny(n){var e=1;n=n.split(":");let t=[];for(;0<e&&n.length;)t.push(n.shift()),e--;return n.length&&t.push(n.join(":")),t}function xy(n){A.setTimeout(()=>{throw n},0)}var zn,Hn=!1,fa=new Wo,vh=()=>{let n=A.Promise.resolve(void 0);zn=()=>{n.then(Ly)}},Ly=()=>{for(var n;n=Dy();){try{n.h.call(n.g)}catch(t){xy(t)}var e=_h;e.j(n),100>e.h&&(e.h++,n.next=e.g,e.g=n)}Hn=!1};function gi(n,e){Q.call(this),this.h=n||1,this.g=e||A,this.j=re(this.qb,this),this.l=Date.now()}Y(gi,Q);g=gi.prototype;g.ga=!1;g.T=null;g.qb=function(){if(this.ga){var n=Date.now()-this.l;0<n&&n<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-n):(this.T&&(this.g.clearTimeout(this.T),this.T=null),Z(this,"tick"),this.ga&&(ma(this),this.start()))}};g.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function ma(n){n.ga=!1,n.T&&(n.g.clearTimeout(n.T),n.T=null)}g.N=function(){gi.$.N.call(this),ma(this),delete this.g};function pa(n,e,t){if(typeof n=="function")t&&(n=re(n,t));else if(n&&typeof n.handleEvent=="function")n=re(n.handleEvent,n);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:A.setTimeout(n,e||0)}function wh(n){n.g=pa(()=>{n.g=null,n.i&&(n.i=!1,wh(n))},n.j);let e=n.h;n.h=null,n.m.apply(null,e)}var Yo=class extends st{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:wh(this)}N(){super.N(),this.g&&(A.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}};function Gn(n){st.call(this),this.h=n,this.g={}}Y(Gn,st);var Xu=[];function Eh(n,e,t,r){Array.isArray(t)||(t&&(Xu[0]=t.toString()),t=Xu);for(var i=0;i<t.length;i++){var s=fh(e,t[i],r||n.handleEvent,!1,n.h||n);if(!s)break;n.g[s.key]=s}}function Ih(n){aa(n.g,function(e,t){this.g.hasOwnProperty(t)&&la(e)},n),n.g={}}Gn.prototype.N=function(){Gn.$.N.call(this),Ih(this)};Gn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function yi(){this.g=!0}yi.prototype.Ea=function(){this.g=!1};function Oy(n,e,t,r,i,s){n.info(function(){if(n.g)if(s)for(var o="",a=s.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var h=u.split("_");o=2<=h.length&&h[1]=="type"?o+(u+"="+l+"&"):o+(u+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+e+`
`+t+`
`+o})}function Vy(n,e,t,r,i,s,o){n.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+e+`
`+t+`
`+s+" "+o})}function Jt(n,e,t,r){n.info(function(){return"XMLHTTP TEXT ("+e+"): "+Fy(n,t)+(r?" "+r:"")})}function My(n,e){n.info(function(){return"TIMEOUT: "+e})}yi.prototype.info=function(){};function Fy(n,e){if(!n.g)return e;if(!e)return null;try{var t=JSON.parse(e);if(t){for(n=0;n<t.length;n++)if(Array.isArray(t[n])){var r=t[n];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if(s!="noop"&&s!="stop"&&s!="close")for(var o=1;o<i.length;o++)i[o]=""}}}}return da(t)}catch{return e}}var At={},Ju=null;function _i(){return Ju=Ju||new Q}At.Ta="serverreachability";function bh(n){ie.call(this,At.Ta,n)}Y(bh,ie);function $n(n){let e=_i();Z(e,new bh(e))}At.STAT_EVENT="statevent";function Th(n,e){ie.call(this,At.STAT_EVENT,n),this.stat=e}Y(Th,ie);function ae(n){let e=_i();Z(e,new Th(e,n))}At.Ua="timingevent";function Ah(n,e){ie.call(this,At.Ua,n),this.size=e}Y(Ah,ie);function Xn(n,e){if(typeof n!="function")throw Error("Fn must not be null and must be a function");return A.setTimeout(function(){n()},e)}var vi={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},Sh={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function ga(){}ga.prototype.h=null;function Zu(n){return n.h||(n.h=n.i())}function Ch(){}var Jn={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function ya(){ie.call(this,"d")}Y(ya,ie);function _a(){ie.call(this,"c")}Y(_a,ie);var Xo;function wi(){}Y(wi,ga);wi.prototype.g=function(){return new XMLHttpRequest};wi.prototype.i=function(){return{}};Xo=new wi;function Zn(n,e,t,r){this.l=n,this.j=e,this.m=t,this.W=r||1,this.U=new Gn(this),this.P=Uy,n=jo?125:void 0,this.V=new gi(n),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new Rh}function Rh(){this.i=null,this.g="",this.h=!1}var Uy=45e3,Jo={},si={};g=Zn.prototype;g.setTimeout=function(n){this.P=n};function Zo(n,e,t){n.L=1,n.v=Ii(Ke(e)),n.s=t,n.S=!0,kh(n,null)}function kh(n,e){n.G=Date.now(),er(n),n.A=Ke(n.v);var t=n.A,r=n.W;Array.isArray(r)||(r=[String(r)]),Mh(t.i,"t",r),n.C=0,t=n.l.J,n.h=new Rh,n.g=id(n.l,t?e:null,!n.s),0<n.O&&(n.M=new Yo(re(n.Pa,n,n.g),n.O)),Eh(n.U,n.g,"readystatechange",n.nb),e=n.I?hh(n.I):{},n.s?(n.u||(n.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",n.g.ha(n.A,n.u,n.s,e)):(n.u="GET",n.g.ha(n.A,n.u,null,e)),$n(),Oy(n.j,n.u,n.A,n.m,n.W,n.s)}g.nb=function(n){n=n.target;let e=this.M;e&&ke(n)==3?e.l():this.Pa(n)};g.Pa=function(n){try{if(n==this.g)e:{let u=ke(this.g);var e=this.g.Ia();let h=this.g.da();if(!(3>u)&&(u!=3||jo||this.g&&(this.h.h||this.g.ja()||rh(this.g)))){this.J||u!=4||e==7||(e==8||0>=h?$n(3):$n(2)),Ei(this);var t=this.g.da();this.ca=t;t:if(Ph(this)){var r=rh(this.g);n="";var i=r.length,s=ke(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){It(this),qn(this);var o="";break t}this.h.i=new A.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,n+=this.h.i.decode(r[e],{stream:s&&e==i-1});r.splice(0,i),this.h.g+=n,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=t==200,Vy(this.j,this.u,this.A,this.m,this.W,u,t),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Bn(a)){var l=a;break t}}l=null}if(t=l)Jt(this.j,this.m,t,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ea(this,t);else{this.i=!1,this.o=3,ae(12),It(this),qn(this);break e}}this.S?(Dh(this,u,o),jo&&this.i&&u==3&&(Eh(this.U,this.V,"tick",this.mb),this.V.start())):(Jt(this.j,this.m,o,null),ea(this,o)),u==4&&It(this),this.i&&!this.J&&(u==4?ed(this.l,this):(this.i=!1,er(this)))}else o_(this.g),t==400&&0<o.indexOf("Unknown SID")?(this.o=3,ae(12)):(this.o=0,ae(13)),It(this),qn(this)}}}catch{}finally{}};function Ph(n){return n.g?n.u=="GET"&&n.L!=2&&n.l.Ha:!1}function Dh(n,e,t){let r=!0,i;for(;!n.J&&n.C<t.length;)if(i=qy(n,t),i==si){e==4&&(n.o=4,ae(14),r=!1),Jt(n.j,n.m,null,"[Incomplete Response]");break}else if(i==Jo){n.o=4,ae(15),Jt(n.j,n.m,t,"[Invalid Chunk]"),r=!1;break}else Jt(n.j,n.m,i,null),ea(n,i);Ph(n)&&i!=si&&i!=Jo&&(n.h.g="",n.C=0),e!=4||t.length!=0||n.h.h||(n.o=1,ae(16),r=!1),n.i=n.i&&r,r?0<t.length&&!n.ba&&(n.ba=!0,e=n.l,e.g==n&&e.ca&&!e.M&&(e.l.info("Great, no buffering proxy detected. Bytes received: "+t.length),Ta(e),e.M=!0,ae(11))):(Jt(n.j,n.m,t,"[Invalid Chunked Response]"),It(n),qn(n))}g.mb=function(){if(this.g){var n=ke(this.g),e=this.g.ja();this.C<e.length&&(Ei(this),Dh(this,n,e),this.i&&n!=4&&er(this))}};function qy(n,e){var t=n.C,r=e.indexOf(`
`,t);return r==-1?si:(t=Number(e.substring(t,r)),isNaN(t)?Jo:(r+=1,r+t>e.length?si:(e=e.slice(r,r+t),n.C=r+t,e)))}g.cancel=function(){this.J=!0,It(this)};function er(n){n.Y=Date.now()+n.P,Nh(n,n.P)}function Nh(n,e){if(n.B!=null)throw Error("WatchDog timer not null");n.B=Xn(re(n.lb,n),e)}function Ei(n){n.B&&(A.clearTimeout(n.B),n.B=null)}g.lb=function(){this.B=null;let n=Date.now();0<=n-this.Y?(My(this.j,this.A),this.L!=2&&($n(),ae(17)),It(this),this.o=2,qn(this)):Nh(this,this.Y-n)};function qn(n){n.l.H==0||n.J||ed(n.l,n)}function It(n){Ei(n);var e=n.M;e&&typeof e.sa=="function"&&e.sa(),n.M=null,ma(n.V),Ih(n.U),n.g&&(e=n.g,n.g=null,e.abort(),e.sa())}function ea(n,e){try{var t=n.l;if(t.H!=0&&(t.g==n||ta(t.i,n))){if(!n.K&&ta(t.i,n)&&t.H==3){try{var r=t.Ja.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var i=r;if(i[0]==0){e:if(!t.u){if(t.g)if(t.g.G+3e3<n.G)ci(t),Ai(t);else break e;ba(t),ae(18)}}else t.Fa=i[1],0<t.Fa-t.V&&37500>i[2]&&t.G&&t.A==0&&!t.v&&(t.v=Xn(re(t.ib,t),6e3));if(1>=qh(t.i)&&t.oa){try{t.oa()}catch{}t.oa=void 0}}else bt(t,11)}else if((n.K||t.g==n)&&ci(t),!Bn(e))for(i=t.Ja.g.parse(e),e=0;e<i.length;e++){let l=i[e];if(t.V=l[0],l=l[1],t.H==2)if(l[0]=="c"){t.K=l[1],t.pa=l[2];let u=l[3];u!=null&&(t.ra=u,t.l.info("VER="+t.ra));let h=l[4];h!=null&&(t.Ga=h,t.l.info("SVER="+t.Ga));let d=l[5];d!=null&&typeof d=="number"&&0<d&&(r=1.5*d,t.L=r,t.l.info("backChannelRequestTimeoutMs_="+r)),r=t;let f=n.g;if(f){let I=f.g?f.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(I){var s=r.i;s.g||I.indexOf("spdy")==-1&&I.indexOf("quic")==-1&&I.indexOf("h2")==-1||(s.j=s.l,s.g=new Set,s.h&&(va(s,s.h),s.h=null))}if(r.F){let T=f.g?f.g.getResponseHeader("X-HTTP-Session-Id"):null;T&&(r.Da=T,V(r.I,r.F,T))}}t.H=3,t.h&&t.h.Ba(),t.ca&&(t.S=Date.now()-n.G,t.l.info("Handshake RTT: "+t.S+"ms")),r=t;var o=n;if(r.wa=rd(r,r.J?r.pa:null,r.Y),o.K){Bh(r.i,o);var a=o,c=r.L;c&&a.setTimeout(c),a.B&&(Ei(a),er(a)),r.g=o}else Jh(r);0<t.j.length&&Si(t)}else l[0]!="stop"&&l[0]!="close"||bt(t,7);else t.H==3&&(l[0]=="stop"||l[0]=="close"?l[0]=="stop"?bt(t,7):Ia(t):l[0]!="noop"&&t.h&&t.h.Aa(l),t.A=0)}}$n(4)}catch{}}function By(n){if(n.Z&&typeof n.Z=="function")return n.Z();if(typeof Map<"u"&&n instanceof Map||typeof Set<"u"&&n instanceof Set)return Array.from(n.values());if(typeof n=="string")return n.split("");if(di(n)){for(var e=[],t=n.length,r=0;r<t;r++)e.push(n[r]);return e}e=[],t=0;for(r in n)e[t++]=n[r];return e}function jy(n){if(n.ta&&typeof n.ta=="function")return n.ta();if(!n.Z||typeof n.Z!="function"){if(typeof Map<"u"&&n instanceof Map)return Array.from(n.keys());if(!(typeof Set<"u"&&n instanceof Set)){if(di(n)||typeof n=="string"){var e=[];n=n.length;for(var t=0;t<n;t++)e.push(t);return e}e=[],t=0;for(let r in n)e[t++]=r;return e}}}function xh(n,e){if(n.forEach&&typeof n.forEach=="function")n.forEach(e,void 0);else if(di(n)||typeof n=="string")Array.prototype.forEach.call(n,e,void 0);else for(var t=jy(n),r=By(n),i=r.length,s=0;s<i;s++)e.call(void 0,r[s],t&&t[s],n)}var Lh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function zy(n,e){if(n){n=n.split("&");for(var t=0;t<n.length;t++){var r=n[t].indexOf("="),i=null;if(0<=r){var s=n[t].substring(0,r);i=n[t].substring(r+1)}else s=n[t];e(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}function Tt(n){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,n instanceof Tt){this.h=n.h,oi(this,n.j),this.s=n.s,this.g=n.g,ai(this,n.m),this.l=n.l;var e=n.i,t=new Kn;t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),eh(this,t),this.o=n.o}else n&&(e=String(n).match(Lh))?(this.h=!1,oi(this,e[1]||"",!0),this.s=Fn(e[2]||""),this.g=Fn(e[3]||"",!0),ai(this,e[4]),this.l=Fn(e[5]||"",!0),eh(this,e[6]||"",!0),this.o=Fn(e[7]||"")):(this.h=!1,this.i=new Kn(null,this.h))}Tt.prototype.toString=function(){var n=[],e=this.j;e&&n.push(Un(e,th,!0),":");var t=this.g;return(t||e=="file")&&(n.push("//"),(e=this.s)&&n.push(Un(e,th,!0),"@"),n.push(encodeURIComponent(String(t)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t=this.m,t!=null&&n.push(":",String(t))),(t=this.l)&&(this.g&&t.charAt(0)!="/"&&n.push("/"),n.push(Un(t,t.charAt(0)=="/"?$y:Gy,!0))),(t=this.i.toString())&&n.push("?",t),(t=this.o)&&n.push("#",Un(t,Wy)),n.join("")};function Ke(n){return new Tt(n)}function oi(n,e,t){n.j=t?Fn(e,!0):e,n.j&&(n.j=n.j.replace(/:$/,""))}function ai(n,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);n.m=e}else n.m=null}function eh(n,e,t){e instanceof Kn?(n.i=e,Qy(n.i,n.h)):(t||(e=Un(e,Ky)),n.i=new Kn(e,n.h))}function V(n,e,t){n.i.set(e,t)}function Ii(n){return V(n,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),n}function Fn(n,e){return n?e?decodeURI(n.replace(/%25/g,"%2525")):decodeURIComponent(n):""}function Un(n,e,t){return typeof n=="string"?(n=encodeURI(n).replace(e,Hy),t&&(n=n.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n):null}function Hy(n){return n=n.charCodeAt(0),"%"+(n>>4&15).toString(16)+(n&15).toString(16)}var th=/[#\/\?@]/g,Gy=/[#\?:]/g,$y=/[#\?]/g,Ky=/[#\?@]/g,Wy=/#/g;function Kn(n,e){this.h=this.g=null,this.i=n||null,this.j=!!e}function ot(n){n.g||(n.g=new Map,n.h=0,n.i&&zy(n.i,function(e,t){n.add(decodeURIComponent(e.replace(/\+/g," ")),t)}))}g=Kn.prototype;g.add=function(n,e){ot(this),this.i=null,n=tn(this,n);var t=this.g.get(n);return t||this.g.set(n,t=[]),t.push(e),this.h+=1,this};function Oh(n,e){ot(n),e=tn(n,e),n.g.has(e)&&(n.i=null,n.h-=n.g.get(e).length,n.g.delete(e))}function Vh(n,e){return ot(n),e=tn(n,e),n.g.has(e)}g.forEach=function(n,e){ot(this),this.g.forEach(function(t,r){t.forEach(function(i){n.call(e,i,r,this)},this)},this)};g.ta=function(){ot(this);let n=Array.from(this.g.values()),e=Array.from(this.g.keys()),t=[];for(let r=0;r<e.length;r++){let i=n[r];for(let s=0;s<i.length;s++)t.push(e[r])}return t};g.Z=function(n){ot(this);let e=[];if(typeof n=="string")Vh(this,n)&&(e=e.concat(this.g.get(tn(this,n))));else{n=Array.from(this.g.values());for(let t=0;t<n.length;t++)e=e.concat(n[t])}return e};g.set=function(n,e){return ot(this),this.i=null,n=tn(this,n),Vh(this,n)&&(this.h-=this.g.get(n).length),this.g.set(n,[e]),this.h+=1,this};g.get=function(n,e){return n?(n=this.Z(n),0<n.length?String(n[0]):e):e};function Mh(n,e,t){Oh(n,e),0<t.length&&(n.i=null,n.g.set(tn(n,e),sa(t)),n.h+=t.length)}g.toString=function(){if(this.i)return this.i;if(!this.g)return"";let n=[],e=Array.from(this.g.keys());for(var t=0;t<e.length;t++){var r=e[t];let s=encodeURIComponent(String(r)),o=this.Z(r);for(r=0;r<o.length;r++){var i=s;o[r]!==""&&(i+="="+encodeURIComponent(String(o[r]))),n.push(i)}}return this.i=n.join("&")};function tn(n,e){return e=String(e),n.j&&(e=e.toLowerCase()),e}function Qy(n,e){e&&!n.j&&(ot(n),n.i=null,n.g.forEach(function(t,r){var i=r.toLowerCase();r!=i&&(Oh(this,r),Mh(this,i,t))},n)),n.j=e}var Yy=class{constructor(n,e){this.g=n,this.map=e}};function Fh(n){this.l=n||Xy,A.PerformanceNavigationTiming?(n=A.performance.getEntriesByType("navigation"),n=0<n.length&&(n[0].nextHopProtocol=="hq"||n[0].nextHopProtocol=="h2")):n=!!(A.g&&A.g.Ka&&A.g.Ka()&&A.g.Ka().ec),this.j=n?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Xy=10;function Uh(n){return n.h?!0:n.g?n.g.size>=n.j:!1}function qh(n){return n.h?1:n.g?n.g.size:0}function ta(n,e){return n.h?n.h==e:n.g?n.g.has(e):!1}function va(n,e){n.g?n.g.add(e):n.h=e}function Bh(n,e){n.h&&n.h==e?n.h=null:n.g&&n.g.has(e)&&n.g.delete(e)}Fh.prototype.cancel=function(){if(this.i=jh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let n of this.g.values())n.cancel();this.g.clear()}};function jh(n){if(n.h!=null)return n.i.concat(n.h.F);if(n.g!=null&&n.g.size!==0){let e=n.i;for(let t of n.g.values())e=e.concat(t.F);return e}return sa(n.i)}var Jy=class{stringify(n){return A.JSON.stringify(n,void 0)}parse(n){return A.JSON.parse(n,void 0)}};function Zy(){this.g=new Jy}function e_(n,e,t){let r=t||"";try{xh(n,function(i,s){let o=i;Qn(i)&&(o=da(i)),e.push(r+s+"="+encodeURIComponent(o))})}catch(i){throw e.push(r+"type="+encodeURIComponent("_badmap")),i}}function t_(n,e){let t=new yi;if(A.Image){let r=new Image;r.onload=Jr(ri,t,r,"TestLoadImage: loaded",!0,e),r.onerror=Jr(ri,t,r,"TestLoadImage: error",!1,e),r.onabort=Jr(ri,t,r,"TestLoadImage: abort",!1,e),r.ontimeout=Jr(ri,t,r,"TestLoadImage: timeout",!1,e),A.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=n}else e(!1)}function ri(n,e,t,r,i){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,i(r)}catch{}}function tr(n){this.l=n.fc||null,this.j=n.ob||!1}Y(tr,ga);tr.prototype.g=function(){return new bi(this.l,this.j)};tr.prototype.i=function(n){return function(){return n}}({});function bi(n,e){Q.call(this),this.F=n,this.u=e,this.m=void 0,this.readyState=wa,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}Y(bi,Q);var wa=0;g=bi.prototype;g.open=function(n,e){if(this.readyState!=wa)throw this.abort(),Error("Error reopening a connection");this.C=n,this.B=e,this.readyState=1,Wn(this)};g.send=function(n){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};n&&(e.body=n),(this.F||A).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))};g.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,nr(this)),this.readyState=wa};g.$a=function(n){if(this.g&&(this.l=n,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=n.headers,this.readyState=2,Wn(this)),this.g&&(this.readyState=3,Wn(this),this.g)))if(this.responseType==="arraybuffer")n.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof A.ReadableStream<"u"&&"body"in n){if(this.j=n.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;zh(this)}else n.text().then(this.Za.bind(this),this.ka.bind(this))};function zh(n){n.j.read().then(n.Xa.bind(n)).catch(n.ka.bind(n))}g.Xa=function(n){if(this.g){if(this.u&&n.value)this.response.push(n.value);else if(!this.u){var e=n.value?n.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!n.done}))&&(this.response=this.responseText+=e)}n.done?nr(this):Wn(this),this.readyState==3&&zh(this)}};g.Za=function(n){this.g&&(this.response=this.responseText=n,nr(this))};g.Ya=function(n){this.g&&(this.response=n,nr(this))};g.ka=function(){this.g&&nr(this)};function nr(n){n.readyState=4,n.l=null,n.j=null,n.A=null,Wn(n)}g.setRequestHeader=function(n,e){this.v.append(n,e)};g.getResponseHeader=function(n){return this.h&&this.h.get(n.toLowerCase())||""};g.getAllResponseHeaders=function(){if(!this.h)return"";let n=[],e=this.h.entries();for(var t=e.next();!t.done;)t=t.value,n.push(t[0]+": "+t[1]),t=e.next();return n.join(`\r
`)};function Wn(n){n.onreadystatechange&&n.onreadystatechange.call(n)}Object.defineProperty(bi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(n){this.m=n?"include":"same-origin"}});var n_=A.JSON.parse;function F(n){Q.call(this),this.headers=new Map,this.u=n||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=Hh,this.L=this.M=!1}Y(F,Q);var Hh="",r_=/^https?$/i,i_=["POST","PUT"];g=F.prototype;g.Oa=function(n){this.M=n};g.ha=function(n,e,t,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+n);e=e?e.toUpperCase():"GET",this.I=n,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():Xo.g(),this.C=this.u?Zu(this.u):Zu(Xo),this.g.onreadystatechange=re(this.La,this);try{this.G=!0,this.g.open(e,String(n),!0),this.G=!1}catch(s){nh(this,s);return}if(n=t||"",t=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)t.set(i,r[i]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(let s of r.keys())t.set(s,r.get(s));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(t.keys()).find(s=>s.toLowerCase()=="content-type"),i=A.FormData&&n instanceof A.FormData,!(0<=ah(i_,e))||r||i||t.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[s,o]of t)this.g.setRequestHeader(s,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{Kh(this),0<this.B&&((this.L=s_(this.g))?(this.g.timeout=this.B,this.g.ontimeout=re(this.ua,this)):this.A=pa(this.ua,this.B,this)),this.v=!0,this.g.send(n),this.v=!1}catch(s){nh(this,s)}};function s_(n){return en&&typeof n.timeout=="number"&&n.ontimeout!==void 0}g.ua=function(){typeof ia<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,Z(this,"timeout"),this.abort(8))};function nh(n,e){n.h=!1,n.g&&(n.l=!0,n.g.abort(),n.l=!1),n.j=e,n.m=5,Gh(n),Ti(n)}function Gh(n){n.F||(n.F=!0,Z(n,"complete"),Z(n,"error"))}g.abort=function(n){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=n||7,Z(this,"complete"),Z(this,"abort"),Ti(this))};g.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Ti(this,!0)),F.$.N.call(this)};g.La=function(){this.s||(this.G||this.v||this.l?$h(this):this.kb())};g.kb=function(){$h(this)};function $h(n){if(n.h&&typeof ia<"u"&&(!n.C[1]||ke(n)!=4||n.da()!=2)){if(n.v&&ke(n)==4)pa(n.La,0,n);else if(Z(n,"readystatechange"),ke(n)==4){n.h=!1;try{let o=n.da();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var t;if(!(t=e)){var r;if(r=o===0){var i=String(n.I).match(Lh)[1]||null;!i&&A.self&&A.self.location&&(i=A.self.location.protocol.slice(0,-1)),r=!r_.test(i?i.toLowerCase():"")}t=r}if(t)Z(n,"complete"),Z(n,"success");else{n.m=6;try{var s=2<ke(n)?n.g.statusText:""}catch{s=""}n.j=s+" ["+n.da()+"]",Gh(n)}}finally{Ti(n)}}}}function Ti(n,e){if(n.g){Kh(n);let t=n.g,r=n.C[0]?()=>{}:null;n.g=null,n.C=null,e||Z(n,"ready");try{t.onreadystatechange=r}catch{}}}function Kh(n){n.g&&n.L&&(n.g.ontimeout=null),n.A&&(A.clearTimeout(n.A),n.A=null)}g.isActive=function(){return!!this.g};function ke(n){return n.g?n.g.readyState:0}g.da=function(){try{return 2<ke(this)?this.g.status:-1}catch{return-1}};g.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};g.Wa=function(n){if(this.g){var e=this.g.responseText;return n&&e.indexOf(n)==0&&(e=e.substring(n.length)),n_(e)}};function rh(n){try{if(!n.g)return null;if("response"in n.g)return n.g.response;switch(n.K){case Hh:case"text":return n.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in n.g)return n.g.mozResponseArrayBuffer}return null}catch{return null}}function o_(n){let e={};n=(n.g&&2<=ke(n)&&n.g.getAllResponseHeaders()||"").split(`\r
`);for(let r=0;r<n.length;r++){if(Bn(n[r]))continue;var t=Ny(n[r]);let i=t[0];if(t=t[1],typeof t!="string")continue;t=t.trim();let s=e[i]||[];e[i]=s,s.push(t)}Ry(e,function(r){return r.join(", ")})}g.Ia=function(){return this.m};g.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function Wh(n){let e="";return aa(n,function(t,r){e+=r,e+=":",e+=t,e+=`\r
`}),e}function Ea(n,e,t){e:{for(r in t){var r=!1;break e}r=!0}r||(t=Wh(t),typeof n=="string"?t!=null&&encodeURIComponent(String(t)):V(n,e,t))}function Vn(n,e,t){return t&&t.internalChannelParams&&t.internalChannelParams[n]||e}function Qh(n){this.Ga=0,this.j=[],this.l=new yi,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=Vn("failFast",!1,n),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=Vn("baseRetryDelayMs",5e3,n),this.hb=Vn("retryDelaySeedMs",1e4,n),this.eb=Vn("forwardChannelMaxRetries",2,n),this.xa=Vn("forwardChannelRequestTimeoutMs",2e4,n),this.va=n&&n.xmlHttpFactory||void 0,this.Ha=n&&n.dc||!1,this.L=void 0,this.J=n&&n.supportsCrossDomainXhr||!1,this.K="",this.i=new Fh(n&&n.concurrentRequestLimit),this.Ja=new Zy,this.P=n&&n.fastHandshake||!1,this.O=n&&n.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=n&&n.bc||!1,n&&n.Ea&&this.l.Ea(),n&&n.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&n&&n.detectBufferingProxy||!1,this.qa=void 0,n&&n.longPollingTimeout&&0<n.longPollingTimeout&&(this.qa=n.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}g=Qh.prototype;g.ra=8;g.H=1;function Ia(n){if(Yh(n),n.H==3){var e=n.W++,t=Ke(n.I);if(V(t,"SID",n.K),V(t,"RID",e),V(t,"TYPE","terminate"),rr(n,t),e=new Zn(n,n.l,e),e.L=2,e.v=Ii(Ke(t)),t=!1,A.navigator&&A.navigator.sendBeacon)try{t=A.navigator.sendBeacon(e.v.toString(),"")}catch{}!t&&A.Image&&(new Image().src=e.v,t=!0),t||(e.g=id(e.l,null),e.g.ha(e.v)),e.G=Date.now(),er(e)}nd(n)}function Ai(n){n.g&&(Ta(n),n.g.cancel(),n.g=null)}function Yh(n){Ai(n),n.u&&(A.clearTimeout(n.u),n.u=null),ci(n),n.i.cancel(),n.m&&(typeof n.m=="number"&&A.clearTimeout(n.m),n.m=null)}function Si(n){if(!Uh(n.i)&&!n.m){n.m=!0;var e=n.Na;zn||vh(),Hn||(zn(),Hn=!0),fa.add(e,n),n.C=0}}function a_(n,e){return qh(n.i)>=n.i.j-(n.m?1:0)?!1:n.m?(n.j=e.F.concat(n.j),!0):n.H==1||n.H==2||n.C>=(n.cb?0:n.eb)?!1:(n.m=Xn(re(n.Na,n,e),td(n,n.C)),n.C++,!0)}g.Na=function(n){if(this.m)if(this.m=null,this.H==1){if(!n){this.W=Math.floor(1e5*Math.random()),n=this.W++;let i=new Zn(this,this.l,n),s=this.s;if(this.U&&(s?(s=hh(s),dh(s,this.U)):s=this.U),this.o!==null||this.O||(i.I=s,s=null),this.P)e:{for(var e=0,t=0;t<this.j.length;t++){t:{var r=this.j[t];if("__data__"in r.map&&(r=r.map.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=t;break e}if(e===4096||t===this.j.length-1){e=t+1;break e}}e=1e3}else e=1e3;e=Xh(this,i,e),t=Ke(this.I),V(t,"RID",n),V(t,"CVER",22),this.F&&V(t,"X-HTTP-Session-Id",this.F),rr(this,t),s&&(this.O?e="headers="+encodeURIComponent(String(Wh(s)))+"&"+e:this.o&&Ea(t,this.o,s)),va(this.i,i),this.bb&&V(t,"TYPE","init"),this.P?(V(t,"$req",e),V(t,"SID","null"),i.aa=!0,Zo(i,t,null)):Zo(i,t,e),this.H=2}}else this.H==3&&(n?ih(this,n):this.j.length==0||Uh(this.i)||ih(this))};function ih(n,e){var t;e?t=e.m:t=n.W++;let r=Ke(n.I);V(r,"SID",n.K),V(r,"RID",t),V(r,"AID",n.V),rr(n,r),n.o&&n.s&&Ea(r,n.o,n.s),t=new Zn(n,n.l,t,n.C+1),n.o===null&&(t.I=n.s),e&&(n.j=e.F.concat(n.j)),e=Xh(n,t,1e3),t.setTimeout(Math.round(.5*n.xa)+Math.round(.5*n.xa*Math.random())),va(n.i,t),Zo(t,r,e)}function rr(n,e){n.na&&aa(n.na,function(t,r){V(e,r,t)}),n.h&&xh({},function(t,r){V(e,r,t)})}function Xh(n,e,t){t=Math.min(n.j.length,t);var r=n.h?re(n.h.Va,n.h,n):null;e:{var i=n.j;let s=-1;for(;;){let o=["count="+t];s==-1?0<t?(s=i[0].g,o.push("ofs="+s)):s=0:o.push("ofs="+s);let a=!0;for(let c=0;c<t;c++){let l=i[c].g,u=i[c].map;if(l-=s,0>l)s=Math.max(0,i[c].g-100),a=!1;else try{e_(u,o,"req"+l+"_")}catch{r&&r(u)}}if(a){r=o.join("&");break e}}}return n=n.j.splice(0,t),e.F=n,r}function Jh(n){if(!n.g&&!n.u){n.ba=1;var e=n.Ma;zn||vh(),Hn||(zn(),Hn=!0),fa.add(e,n),n.A=0}}function ba(n){return n.g||n.u||3<=n.A?!1:(n.ba++,n.u=Xn(re(n.Ma,n),td(n,n.A)),n.A++,!0)}g.Ma=function(){if(this.u=null,Zh(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var n=2*this.S;this.l.info("BP detection timer enabled: "+n),this.B=Xn(re(this.jb,this),n)}};g.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,ae(10),Ai(this),Zh(this))};function Ta(n){n.B!=null&&(A.clearTimeout(n.B),n.B=null)}function Zh(n){n.g=new Zn(n,n.l,"rpc",n.ba),n.o===null&&(n.g.I=n.s),n.g.O=0;var e=Ke(n.wa);V(e,"RID","rpc"),V(e,"SID",n.K),V(e,"AID",n.V),V(e,"CI",n.G?"0":"1"),!n.G&&n.qa&&V(e,"TO",n.qa),V(e,"TYPE","xmlhttp"),rr(n,e),n.o&&n.s&&Ea(e,n.o,n.s),n.L&&n.g.setTimeout(n.L);var t=n.g;n=n.pa,t.L=1,t.v=Ii(Ke(e)),t.s=null,t.S=!0,kh(t,n)}g.ib=function(){this.v!=null&&(this.v=null,Ai(this),ba(this),ae(19))};function ci(n){n.v!=null&&(A.clearTimeout(n.v),n.v=null)}function ed(n,e){var t=null;if(n.g==e){ci(n),Ta(n),n.g=null;var r=2}else if(ta(n.i,e))t=e.F,Bh(n.i,e),r=1;else return;if(n.H!=0){if(e.i)if(r==1){t=e.s?e.s.length:0,e=Date.now()-e.G;var i=n.C;r=_i(),Z(r,new Ah(r,t)),Si(n)}else Jh(n);else if(i=e.o,i==3||i==0&&0<e.ca||!(r==1&&a_(n,e)||r==2&&ba(n)))switch(t&&0<t.length&&(e=n.i,e.i=e.i.concat(t)),i){case 1:bt(n,5);break;case 4:bt(n,10);break;case 3:bt(n,6);break;default:bt(n,2)}}}function td(n,e){let t=n.ab+Math.floor(Math.random()*n.hb);return n.isActive()||(t*=2),t*e}function bt(n,e){if(n.l.info("Error code "+e),e==2){var t=null;n.h&&(t=null);var r=re(n.pb,n);t||(t=new Tt("//www.google.com/images/cleardot.gif"),A.location&&A.location.protocol=="http"||oi(t,"https"),Ii(t)),t_(t.toString(),r)}else ae(2);n.H=0,n.h&&n.h.za(e),nd(n),Yh(n)}g.pb=function(n){n?(this.l.info("Successfully pinged google.com"),ae(2)):(this.l.info("Failed to ping google.com"),ae(1))};function nd(n){if(n.H=0,n.ma=[],n.h){let e=jh(n.i);(e.length!=0||n.j.length!=0)&&(Qu(n.ma,e),Qu(n.ma,n.j),n.i.i.length=0,sa(n.j),n.j.length=0),n.h.ya()}}function rd(n,e,t){var r=t instanceof Tt?Ke(t):new Tt(t);if(r.g!="")e&&(r.g=e+"."+r.g),ai(r,r.m);else{var i=A.location;r=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var s=new Tt(null);r&&oi(s,r),e&&(s.g=e),i&&ai(s,i),t&&(s.l=t),r=s}return t=n.F,e=n.Da,t&&e&&V(r,t,e),V(r,"VER",n.ra),rr(n,r),r}function id(n,e,t){if(e&&!n.J)throw Error("Can't create secondary domain capable XhrIo object.");return e=t&&n.Ha&&!n.va?new F(new tr({ob:!0})):new F(n.va),e.Oa(n.J),e}g.isActive=function(){return!!this.h&&this.h.isActive(this)};function sd(){}g=sd.prototype;g.Ba=function(){};g.Aa=function(){};g.za=function(){};g.ya=function(){};g.isActive=function(){return!0};g.Va=function(){};function li(){if(en&&!(10<=Number(Ty)))throw Error("Environmental error: no available transport.")}li.prototype.g=function(n,e){return new de(n,e)};function de(n,e){Q.call(this),this.g=new Qh(e),this.l=n,this.h=e&&e.messageUrlParams||null,n=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(n?n["X-Client-Protocol"]="webchannel":n={"X-Client-Protocol":"webchannel"}),this.g.s=n,n=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(n?n["X-WebChannel-Content-Type"]=e.messageContentType:n={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(n?n["X-WebChannel-Client-Profile"]=e.Ca:n={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=n,(n=e&&e.cc)&&!Bn(n)&&(this.g.o=n),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Bn(e)&&(this.g.F=e,n=this.h,n!==null&&e in n&&(n=this.h,e in n&&delete n[e])),this.j=new nn(this)}Y(de,Q);de.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var n=this.g,e=this.l,t=this.h||void 0;ae(0),n.Y=e,n.na=t||{},n.G=n.aa,n.I=rd(n,null,n.Y),Si(n)};de.prototype.close=function(){Ia(this.g)};de.prototype.u=function(n){var e=this.g;if(typeof n=="string"){var t={};t.__data__=n,n=t}else this.v&&(t={},t.__data__=da(n),n=t);e.j.push(new Yy(e.fb++,n)),e.H==3&&Si(e)};de.prototype.N=function(){this.g.h=null,delete this.j,Ia(this.g),delete this.g,de.$.N.call(this)};function od(n){ya.call(this),n.__headers__&&(this.headers=n.__headers__,this.statusCode=n.__status__,delete n.__headers__,delete n.__status__);var e=n.__sm__;if(e){e:{for(let t in e){n=t;break e}n=void 0}(this.i=n)&&(n=this.i,e=e!==null&&n in e?e[n]:void 0),this.data=e}else this.data=n}Y(od,ya);function ad(){_a.call(this),this.status=1}Y(ad,_a);function nn(n){this.g=n}Y(nn,sd);nn.prototype.Ba=function(){Z(this.g,"a")};nn.prototype.Aa=function(n){Z(this.g,new od(n))};nn.prototype.za=function(n){Z(this.g,new ad)};nn.prototype.ya=function(){Z(this.g,"b")};function c_(){this.blockSize=-1}function Ee(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}Y(Ee,c_);Ee.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function Bo(n,e,t){t||(t=0);var r=Array(16);if(typeof e=="string")for(var i=0;16>i;++i)r[i]=e.charCodeAt(t++)|e.charCodeAt(t++)<<8|e.charCodeAt(t++)<<16|e.charCodeAt(t++)<<24;else for(i=0;16>i;++i)r[i]=e[t++]|e[t++]<<8|e[t++]<<16|e[t++]<<24;e=n.g[0],t=n.g[1],i=n.g[2];var s=n.g[3],o=e+(s^t&(i^s))+r[0]+3614090360&4294967295;e=t+(o<<7&4294967295|o>>>25),o=s+(i^e&(t^i))+r[1]+3905402710&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(t^s&(e^t))+r[2]+606105819&4294967295,i=s+(o<<17&4294967295|o>>>15),o=t+(e^i&(s^e))+r[3]+3250441966&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(s^t&(i^s))+r[4]+4118548399&4294967295,e=t+(o<<7&4294967295|o>>>25),o=s+(i^e&(t^i))+r[5]+1200080426&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(t^s&(e^t))+r[6]+2821735955&4294967295,i=s+(o<<17&4294967295|o>>>15),o=t+(e^i&(s^e))+r[7]+4249261313&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(s^t&(i^s))+r[8]+1770035416&4294967295,e=t+(o<<7&4294967295|o>>>25),o=s+(i^e&(t^i))+r[9]+2336552879&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(t^s&(e^t))+r[10]+4294925233&4294967295,i=s+(o<<17&4294967295|o>>>15),o=t+(e^i&(s^e))+r[11]+2304563134&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(s^t&(i^s))+r[12]+1804603682&4294967295,e=t+(o<<7&4294967295|o>>>25),o=s+(i^e&(t^i))+r[13]+4254626195&4294967295,s=e+(o<<12&4294967295|o>>>20),o=i+(t^s&(e^t))+r[14]+2792965006&4294967295,i=s+(o<<17&4294967295|o>>>15),o=t+(e^i&(s^e))+r[15]+1236535329&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(i^s&(t^i))+r[1]+4129170786&4294967295,e=t+(o<<5&4294967295|o>>>27),o=s+(t^i&(e^t))+r[6]+3225465664&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(s^e))+r[11]+643717713&4294967295,i=s+(o<<14&4294967295|o>>>18),o=t+(s^e&(i^s))+r[0]+3921069994&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(i^s&(t^i))+r[5]+3593408605&4294967295,e=t+(o<<5&4294967295|o>>>27),o=s+(t^i&(e^t))+r[10]+38016083&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(s^e))+r[15]+3634488961&4294967295,i=s+(o<<14&4294967295|o>>>18),o=t+(s^e&(i^s))+r[4]+3889429448&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(i^s&(t^i))+r[9]+568446438&4294967295,e=t+(o<<5&4294967295|o>>>27),o=s+(t^i&(e^t))+r[14]+3275163606&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(s^e))+r[3]+4107603335&4294967295,i=s+(o<<14&4294967295|o>>>18),o=t+(s^e&(i^s))+r[8]+1163531501&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(i^s&(t^i))+r[13]+2850285829&4294967295,e=t+(o<<5&4294967295|o>>>27),o=s+(t^i&(e^t))+r[2]+4243563512&4294967295,s=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(s^e))+r[7]+1735328473&4294967295,i=s+(o<<14&4294967295|o>>>18),o=t+(s^e&(i^s))+r[12]+2368359562&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(t^i^s)+r[5]+4294588738&4294967295,e=t+(o<<4&4294967295|o>>>28),o=s+(e^t^i)+r[8]+2272392833&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^t)+r[11]+1839030562&4294967295,i=s+(o<<16&4294967295|o>>>16),o=t+(i^s^e)+r[14]+4259657740&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(t^i^s)+r[1]+2763975236&4294967295,e=t+(o<<4&4294967295|o>>>28),o=s+(e^t^i)+r[4]+1272893353&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^t)+r[7]+4139469664&4294967295,i=s+(o<<16&4294967295|o>>>16),o=t+(i^s^e)+r[10]+3200236656&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(t^i^s)+r[13]+681279174&4294967295,e=t+(o<<4&4294967295|o>>>28),o=s+(e^t^i)+r[0]+3936430074&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^t)+r[3]+3572445317&4294967295,i=s+(o<<16&4294967295|o>>>16),o=t+(i^s^e)+r[6]+76029189&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(t^i^s)+r[9]+3654602809&4294967295,e=t+(o<<4&4294967295|o>>>28),o=s+(e^t^i)+r[12]+3873151461&4294967295,s=e+(o<<11&4294967295|o>>>21),o=i+(s^e^t)+r[15]+530742520&4294967295,i=s+(o<<16&4294967295|o>>>16),o=t+(i^s^e)+r[2]+3299628645&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(i^(t|~s))+r[0]+4096336452&4294967295,e=t+(o<<6&4294967295|o>>>26),o=s+(t^(e|~i))+r[7]+1126891415&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~t))+r[14]+2878612391&4294967295,i=s+(o<<15&4294967295|o>>>17),o=t+(s^(i|~e))+r[5]+4237533241&4294967295,t=i+(o<<21&4294967295|o>>>11),o=e+(i^(t|~s))+r[12]+1700485571&4294967295,e=t+(o<<6&4294967295|o>>>26),o=s+(t^(e|~i))+r[3]+2399980690&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~t))+r[10]+4293915773&4294967295,i=s+(o<<15&4294967295|o>>>17),o=t+(s^(i|~e))+r[1]+2240044497&4294967295,t=i+(o<<21&4294967295|o>>>11),o=e+(i^(t|~s))+r[8]+1873313359&4294967295,e=t+(o<<6&4294967295|o>>>26),o=s+(t^(e|~i))+r[15]+4264355552&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~t))+r[6]+2734768916&4294967295,i=s+(o<<15&4294967295|o>>>17),o=t+(s^(i|~e))+r[13]+1309151649&4294967295,t=i+(o<<21&4294967295|o>>>11),o=e+(i^(t|~s))+r[4]+4149444226&4294967295,e=t+(o<<6&4294967295|o>>>26),o=s+(t^(e|~i))+r[11]+3174756917&4294967295,s=e+(o<<10&4294967295|o>>>22),o=i+(e^(s|~t))+r[2]+718787259&4294967295,i=s+(o<<15&4294967295|o>>>17),o=t+(s^(i|~e))+r[9]+3951481745&4294967295,n.g[0]=n.g[0]+e&4294967295,n.g[1]=n.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,n.g[2]=n.g[2]+i&4294967295,n.g[3]=n.g[3]+s&4294967295}Ee.prototype.j=function(n,e){e===void 0&&(e=n.length);for(var t=e-this.blockSize,r=this.m,i=this.h,s=0;s<e;){if(i==0)for(;s<=t;)Bo(this,n,s),s+=this.blockSize;if(typeof n=="string"){for(;s<e;)if(r[i++]=n.charCodeAt(s++),i==this.blockSize){Bo(this,r),i=0;break}}else for(;s<e;)if(r[i++]=n[s++],i==this.blockSize){Bo(this,r),i=0;break}}this.h=i,this.i+=e};Ee.prototype.l=function(){var n=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);n[0]=128;for(var e=1;e<n.length-8;++e)n[e]=0;var t=8*this.i;for(e=n.length-8;e<n.length;++e)n[e]=t&255,t/=256;for(this.j(n),n=Array(16),e=t=0;4>e;++e)for(var r=0;32>r;r+=8)n[t++]=this.g[e]>>>r&255;return n};function x(n,e){this.h=e;for(var t=[],r=!0,i=n.length-1;0<=i;i--){var s=n[i]|0;r&&s==e||(t[i]=s,r=!1)}this.g=t}var l_={};function Aa(n){return-128<=n&&128>n?Ey(n,function(e){return new x([e|0],0>e?-1:0)}):new x([n|0],0>n?-1:0)}function Pe(n){if(isNaN(n)||!isFinite(n))return Zt;if(0>n)return J(Pe(-n));for(var e=[],t=1,r=0;n>=t;r++)e[r]=n/t|0,t*=na;return new x(e,0)}function cd(n,e){if(n.length==0)throw Error("number format error: empty string");if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(n.charAt(0)=="-")return J(cd(n.substring(1),e));if(0<=n.indexOf("-"))throw Error('number format error: interior "-" character');for(var t=Pe(Math.pow(e,8)),r=Zt,i=0;i<n.length;i+=8){var s=Math.min(8,n.length-i),o=parseInt(n.substring(i,i+s),e);8>s?(s=Pe(Math.pow(e,s)),r=r.R(s).add(Pe(o))):(r=r.R(t),r=r.add(Pe(o)))}return r}var na=4294967296,Zt=Aa(0),ra=Aa(1),sh=Aa(16777216);g=x.prototype;g.ea=function(){if(ge(this))return-J(this).ea();for(var n=0,e=1,t=0;t<this.g.length;t++){var r=this.D(t);n+=(0<=r?r:na+r)*e,e*=na}return n};g.toString=function(n){if(n=n||10,2>n||36<n)throw Error("radix out of range: "+n);if($e(this))return"0";if(ge(this))return"-"+J(this).toString(n);for(var e=Pe(Math.pow(n,6)),t=this,r="";;){var i=hi(t,e).g;t=ui(t,i.R(e));var s=((0<t.g.length?t.g[0]:t.h)>>>0).toString(n);if(t=i,$e(t))return s+r;for(;6>s.length;)s="0"+s;r=s+r}};g.D=function(n){return 0>n?0:n<this.g.length?this.g[n]:this.h};function $e(n){if(n.h!=0)return!1;for(var e=0;e<n.g.length;e++)if(n.g[e]!=0)return!1;return!0}function ge(n){return n.h==-1}g.X=function(n){return n=ui(this,n),ge(n)?-1:$e(n)?0:1};function J(n){for(var e=n.g.length,t=[],r=0;r<e;r++)t[r]=~n.g[r];return new x(t,~n.h).add(ra)}g.abs=function(){return ge(this)?J(this):this};g.add=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0,i=0;i<=e;i++){var s=r+(this.D(i)&65535)+(n.D(i)&65535),o=(s>>>16)+(this.D(i)>>>16)+(n.D(i)>>>16);r=o>>>16,s&=65535,o&=65535,t[i]=o<<16|s}return new x(t,t[t.length-1]&-2147483648?-1:0)};function ui(n,e){return n.add(J(e))}g.R=function(n){if($e(this)||$e(n))return Zt;if(ge(this))return ge(n)?J(this).R(J(n)):J(J(this).R(n));if(ge(n))return J(this.R(J(n)));if(0>this.X(sh)&&0>n.X(sh))return Pe(this.ea()*n.ea());for(var e=this.g.length+n.g.length,t=[],r=0;r<2*e;r++)t[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<n.g.length;i++){var s=this.D(r)>>>16,o=this.D(r)&65535,a=n.D(i)>>>16,c=n.D(i)&65535;t[2*r+2*i]+=o*c,ii(t,2*r+2*i),t[2*r+2*i+1]+=s*c,ii(t,2*r+2*i+1),t[2*r+2*i+1]+=o*a,ii(t,2*r+2*i+1),t[2*r+2*i+2]+=s*a,ii(t,2*r+2*i+2)}for(r=0;r<e;r++)t[r]=t[2*r+1]<<16|t[2*r];for(r=e;r<2*e;r++)t[r]=0;return new x(t,0)};function ii(n,e){for(;(n[e]&65535)!=n[e];)n[e+1]+=n[e]>>>16,n[e]&=65535,e++}function Mn(n,e){this.g=n,this.h=e}function hi(n,e){if($e(e))throw Error("division by zero");if($e(n))return new Mn(Zt,Zt);if(ge(n))return e=hi(J(n),e),new Mn(J(e.g),J(e.h));if(ge(e))return e=hi(n,J(e)),new Mn(J(e.g),e.h);if(30<n.g.length){if(ge(n)||ge(e))throw Error("slowDivide_ only works with positive integers.");for(var t=ra,r=e;0>=r.X(n);)t=oh(t),r=oh(r);var i=Xt(t,1),s=Xt(r,1);for(r=Xt(r,2),t=Xt(t,2);!$e(r);){var o=s.add(r);0>=o.X(n)&&(i=i.add(t),s=o),r=Xt(r,1),t=Xt(t,1)}return e=ui(n,i.R(e)),new Mn(i,e)}for(i=Zt;0<=n.X(e);){for(t=Math.max(1,Math.floor(n.ea()/e.ea())),r=Math.ceil(Math.log(t)/Math.LN2),r=48>=r?1:Math.pow(2,r-48),s=Pe(t),o=s.R(e);ge(o)||0<o.X(n);)t-=r,s=Pe(t),o=s.R(e);$e(s)&&(s=ra),i=i.add(s),n=ui(n,o)}return new Mn(i,n)}g.gb=function(n){return hi(this,n).h};g.and=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)&n.D(r);return new x(t,this.h&n.h)};g.or=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)|n.D(r);return new x(t,this.h|n.h)};g.xor=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)^n.D(r);return new x(t,this.h^n.h)};function oh(n){for(var e=n.g.length+1,t=[],r=0;r<e;r++)t[r]=n.D(r)<<1|n.D(r-1)>>>31;return new x(t,n.h)}function Xt(n,e){var t=e>>5;e%=32;for(var r=n.g.length-t,i=[],s=0;s<r;s++)i[s]=0<e?n.D(s+t)>>>e|n.D(s+t+1)<<32-e:n.D(s+t);return new x(i,n.h)}li.prototype.createWebChannel=li.prototype.g;de.prototype.send=de.prototype.u;de.prototype.open=de.prototype.m;de.prototype.close=de.prototype.close;vi.NO_ERROR=0;vi.TIMEOUT=8;vi.HTTP_ERROR=6;Sh.COMPLETE="complete";Ch.EventType=Jn;Jn.OPEN="a";Jn.CLOSE="b";Jn.ERROR="c";Jn.MESSAGE="d";Q.prototype.listen=Q.prototype.O;F.prototype.listenOnce=F.prototype.P;F.prototype.getLastError=F.prototype.Sa;F.prototype.getLastErrorCode=F.prototype.Ia;F.prototype.getStatus=F.prototype.da;F.prototype.getResponseJson=F.prototype.Wa;F.prototype.getResponseText=F.prototype.ja;F.prototype.send=F.prototype.ha;F.prototype.setWithCredentials=F.prototype.Oa;Ee.prototype.digest=Ee.prototype.l;Ee.prototype.reset=Ee.prototype.reset;Ee.prototype.update=Ee.prototype.j;x.prototype.add=x.prototype.add;x.prototype.multiply=x.prototype.R;x.prototype.modulo=x.prototype.gb;x.prototype.compare=x.prototype.X;x.prototype.toNumber=x.prototype.ea;x.prototype.toString=x.prototype.toString;x.prototype.getBits=x.prototype.D;x.fromNumber=Pe;x.fromString=cd;var ld=Ie.createWebChannelTransport=function(){return new li},ud=Ie.getStatEventTarget=function(){return _i()},Ci=Ie.ErrorCode=vi,hd=Ie.EventType=Sh,dd=Ie.Event=At,Sa=Ie.Stat={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},GI=Ie.FetchXmlHttpFactory=tr,ir=Ie.WebChannel=Ch,fd=Ie.XhrIo=F,md=Ie.Md5=Ee,St=Ie.Integer=x;var pd="@firebase/firestore";var X=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};X.UNAUTHENTICATED=new X(null),X.GOOGLE_CREDENTIALS=new X("google-credentials-uid"),X.FIRST_PARTY=new X("first-party-uid"),X.MOCK_USER=new X("mock-user");var In="10.3.1";var Dt=new tt("@firebase/firestore");function sr(){return Dt.logLevel}function y(n,...e){if(Dt.logLevel<=R.DEBUG){let t=e.map(sl);Dt.debug(`Firestore (${In}): ${n}`,...t)}}function We(n,...e){if(Dt.logLevel<=R.ERROR){let t=e.map(sl);Dt.error(`Firestore (${In}): ${n}`,...t)}}function un(n,...e){if(Dt.logLevel<=R.WARN){let t=e.map(sl);Dt.warn(`Firestore (${In}): ${n}`,...t)}}function sl(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function b(n="Unexpected state"){let e=`FIRESTORE (${In}) INTERNAL ASSERTION FAILED: `+n;throw We(e),new Error(e)}function M(n,e){n||b()}function C(n,e){return n}var m={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},_=class extends he{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Te=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Ni=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Da=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(X.UNAUTHENTICATED))}shutdown(){}},Na=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},xa=class{constructor(e){this.t=e,this.currentUser=X.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i,i=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve(),s=new Te;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Te,e.enqueueRetryable(()=>i(this.currentUser))};let o=()=>{let c=s;e.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},a=c=>{y("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){let c=this.t.getImmediate({optional:!0});c?a(c):(y("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Te)}},0),o()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(y("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(M(typeof r.accessToken=="string"),new Ni(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return M(e===null||typeof e=="string"),new X(e)}},La=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=X.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}},Oa=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new La(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(X.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Va=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Ma=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){let r=s=>{s.error!=null&&y("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let o=s.token!==this.R;return this.R=s.token,y("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{y("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.A.getImmediate({optional:!0});s?i(s):y("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(M(typeof t.token=="string"),this.R=t.token,new Va(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}};function u_(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var xi=class{static V(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=u_(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function N(n,e){return n<e?-1:n>e?1:0}function hn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var ee=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new _(m.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new _(m.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new _(m.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new _(m.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?N(this.nanoseconds,e.nanoseconds):N(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var S=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new ee(0,0))}static max(){return new n(new ee(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Li=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&b(),r===void 0?r=e.length-t:r>e.length-t&&b(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},q=class n extends Li{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new _(m.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},h_=/^[_a-zA-Z][_a-zA-Z0-9]*$/,ye=class n extends Li{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return h_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new _(m.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},o=!1;for(;i<e.length;){let a=e[i];if(a==="\\"){if(i+1===e.length)throw new _(m.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new _(m.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new _(m.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var E=class n{constructor(e){this.path=e}static fromPath(e){return new n(q.fromString(e))}static fromName(e){return new n(q.fromString(e).popFirst(5))}static empty(){return new n(q.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&q.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return q.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new q(e.slice()))}};var Fa=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};Fa.UNKNOWN_ID=-1;function d_(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=S.fromTimestamp(r===1e9?new ee(t+1,0):new ee(t,r));return new Nt(i,E.empty(),e)}function f_(n){return new Nt(n.readTime,n.key,-1)}var Nt=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(S.min(),E.empty(),-1)}static max(){return new n(S.max(),E.empty(),-1)}};function m_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=E.comparator(n.documentKey,e.documentKey),t!==0?t:N(n.largestBatchId,e.largestBatchId))}var p_="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Ua=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function br(n){if(n.code!==m.FAILED_PRECONDITION||n.message!==p_)throw n;y("LocalStore","Unexpectedly lost primary lease")}var p=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&b(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,o=!1;e.forEach(a=>{++i,a.next(()=>{++s,o&&s===i&&t()},c=>r(c))}),o=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,o=new Array(s),a=0;for(let c=0;c<s;c++){let l=c;t(e[l]).next(u=>{o[l]=u,++a,a===s&&r(o)},u=>i(u))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};function Tr(n){return n.name==="IndexedDbTransactionError"}var hr=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.oe(r),this._e=r=>t.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this._e&&this._e(e),e}};hr.ae=-1;function us(n){return n==null}function dr(n){return n===0&&1/n==-1/0}function g_(n){return typeof n=="number"&&Number.isInteger(n)&&!dr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var y_=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],nb=[...y_,"documentOverlays"],__=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],v_=__,rb=[...v_,"indexConfiguration","indexState","indexEntries"];function gd(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function bn(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function jd(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var B=class n{constructor(e,t){this.comparator=e,this.root=t||xe.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,xe.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,xe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new an(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new an(this.root,e,this.comparator,!1)}getReverseIterator(){return new an(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new an(this.root,e,this.comparator,!0)}},an=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},xe=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=s??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw b();let e=this.left.check();if(e!==this.right.check())throw b();return e+(this.isRed()?0:1)}};xe.EMPTY=null,xe.RED=!0,xe.BLACK=!1;xe.EMPTY=new class{constructor(){this.size=0}get key(){throw b()}get value(){throw b()}get color(){throw b()}get left(){throw b()}get right(){throw b()}copy(e,t,r,i,s){return this}insert(e,t,r){return new xe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var ce=class n{constructor(e){this.comparator=e,this.data=new B(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Oi(this.data.getIterator())}getIteratorFrom(e){return new Oi(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Oi=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var Ne=class n{constructor(e){this.fields=e,e.sort(ye.comparator)}static empty(){return new n([])}unionWith(e){let t=new ce(ye.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return hn(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var Vi=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var le=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Vi("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return N(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};le.EMPTY_BYTE_STRING=new le("");var w_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function lt(n){if(M(!!n),typeof n=="string"){let e=0,t=w_.exec(n);if(M(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:U(n.seconds),nanos:U(n.nanos)}}function U(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ut(n){return typeof n=="string"?le.fromBase64String(n):le.fromUint8Array(n)}function ol(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function al(n){let e=n.mapValue.fields.__previous_value__;return ol(e)?al(e):e}function fr(n){let e=lt(n.mapValue.fields.__local_write_time__.timestampValue);return new ee(e.seconds,e.nanos)}var qa=class{constructor(e,t,r,i,s,o,a,c,l){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l}},Mi=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var Ri={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function xt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ol(n)?4:zd(n)?9007199254740991:10:b()}function Ve(n,e){if(n===e)return!0;let t=xt(n);if(t!==xt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return fr(n).isEqual(fr(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let o=lt(i.timestampValue),a=lt(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return ut(i.bytesValue).isEqual(ut(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return U(i.geoPointValue.latitude)===U(s.geoPointValue.latitude)&&U(i.geoPointValue.longitude)===U(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return U(i.integerValue)===U(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let o=U(i.doubleValue),a=U(s.doubleValue);return o===a?dr(o)===dr(a):isNaN(o)&&isNaN(a)}return!1}(n,e);case 9:return hn(n.arrayValue.values||[],e.arrayValue.values||[],Ve);case 10:return function(i,s){let o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(gd(o)!==gd(a))return!1;for(let c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!Ve(o[c],a[c])))return!1;return!0}(n,e);default:return b()}}function mr(n,e){return(n.values||[]).find(t=>Ve(t,e))!==void 0}function dn(n,e){if(n===e)return 0;let t=xt(n),r=xt(e);if(t!==r)return N(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return N(n.booleanValue,e.booleanValue);case 2:return function(s,o){let a=U(s.integerValue||s.doubleValue),c=U(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1}(n,e);case 3:return yd(n.timestampValue,e.timestampValue);case 4:return yd(fr(n),fr(e));case 5:return N(n.stringValue,e.stringValue);case 6:return function(s,o){let a=ut(s),c=ut(o);return a.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){let a=s.split("/"),c=o.split("/");for(let l=0;l<a.length&&l<c.length;l++){let u=N(a[l],c[l]);if(u!==0)return u}return N(a.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){let a=N(U(s.latitude),U(o.latitude));return a!==0?a:N(U(s.longitude),U(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,o){let a=s.values||[],c=o.values||[];for(let l=0;l<a.length&&l<c.length;++l){let u=dn(a[l],c[l]);if(u)return u}return N(a.length,c.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,o){if(s===Ri.mapValue&&o===Ri.mapValue)return 0;if(s===Ri.mapValue)return 1;if(o===Ri.mapValue)return-1;let a=s.fields||{},c=Object.keys(a),l=o.fields||{},u=Object.keys(l);c.sort(),u.sort();for(let h=0;h<c.length&&h<u.length;++h){let d=N(c[h],u[h]);if(d!==0)return d;let f=dn(a[c[h]],l[u[h]]);if(f!==0)return f}return N(c.length,u.length)}(n.mapValue,e.mapValue);default:throw b()}}function yd(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return N(n,e);let t=lt(n),r=lt(e),i=N(t.seconds,r.seconds);return i!==0?i:N(t.nanos,r.nanos)}function fn(n){return Ba(n)}function Ba(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=lt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return ut(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return E.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=Ba(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let o of r)s?s=!1:i+=",",i+=`${o}:${Ba(t.fields[o])}`;return i+"}"}(n.mapValue):b()}function ja(n){return!!n&&"integerValue"in n}function cl(n){return!!n&&"arrayValue"in n}function _d(n){return!!n&&"nullValue"in n}function vd(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Pi(n){return!!n&&"mapValue"in n}function ar(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return bn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ar(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ar(n.arrayValue.values[t]);return e}return Object.assign({},n)}function zd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var be=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Pi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ar(t)}setAll(e){let t=ye.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){let c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=ar(o):i.push(a.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());Pi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ve(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Pi(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){bn(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(ar(this.value))}};function Hd(n){let e=[];return bn(n.fields,(t,r)=>{let i=new ye([t]);if(Pi(r)){let s=Hd(r.mapValue).fields;if(s.length===0)e.push(i);else for(let o of s)e.push(i.child(o))}else e.push(i)}),new Ne(e)}var Ae=class n{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new n(e,0,S.min(),S.min(),S.min(),be.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,S.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,S.min(),S.min(),be.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,S.min(),S.min(),be.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(S.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=S.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var mn=class{constructor(e,t){this.position=e,this.inclusive=t}};function wd(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],o=n.position[i];if(s.field.isKeyField()?r=E.comparator(E.fromName(o.referenceValue),t.key):r=dn(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ed(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ve(n.position[t],e.position[t]))return!1;return!0}var Pt=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function E_(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var Fi=class{},$=class n extends Fi{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Ha(e,t,r):t==="array-contains"?new Ka(e,r):t==="in"?new Wa(e,r):t==="not-in"?new Qa(e,r):t==="array-contains-any"?new Ya(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Ga(e,r):new $a(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(dn(t,this.value)):t!==null&&xt(this.value)===xt(t)&&this.matchesComparison(dn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return b()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}},Me=class n extends Fi{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new n(e,t)}matches(e){return Gd(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){let e=this.le(t=>t.isInequality());return e!==null?e.field:null}le(e){for(let t of this.getFlattenedFilters())if(e(t))return t;return null}};function Gd(n){return n.op==="and"}function $d(n){return I_(n)&&Gd(n)}function I_(n){for(let e of n.filters)if(e instanceof Me)return!1;return!0}function za(n){if(n instanceof $)return n.field.canonicalString()+n.op.toString()+fn(n.value);if($d(n))return n.filters.map(e=>za(e)).join(",");{let e=n.filters.map(t=>za(t)).join(",");return`${n.op}(${e})`}}function Kd(n,e){return n instanceof $?function(r,i){return i instanceof $&&r.op===i.op&&r.field.isEqual(i.field)&&Ve(r.value,i.value)}(n,e):n instanceof Me?function(r,i){return i instanceof Me&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,a)=>s&&Kd(o,i.filters[a]),!0):!1}(n,e):void b()}function Wd(n){return n instanceof $?function(t){return`${t.field.canonicalString()} ${t.op} ${fn(t.value)}`}(n):n instanceof Me?function(t){return t.op.toString()+" {"+t.getFilters().map(Wd).join(" ,")+"}"}(n):"Filter"}var Ha=class extends ${constructor(e,t,r){super(e,t,r),this.key=E.fromName(r.referenceValue)}matches(e){let t=E.comparator(e.key,this.key);return this.matchesComparison(t)}},Ga=class extends ${constructor(e,t){super(e,"in",t),this.keys=Qd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},$a=class extends ${constructor(e,t){super(e,"not-in",t),this.keys=Qd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function Qd(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>E.fromName(r.referenceValue))}var Ka=class extends ${constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return cl(t)&&mr(t.arrayValue,this.value)}},Wa=class extends ${constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&mr(this.value.arrayValue,t)}},Qa=class extends ${constructor(e,t){super(e,"not-in",t)}matches(e){if(mr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!mr(this.value.arrayValue,t)}},Ya=class extends ${constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!cl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>mr(this.value.arrayValue,r))}};var Xa=class{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.he=null}};function Id(n,e=null,t=[],r=[],i=null,s=null,o=null){return new Xa(n,e,t,r,i,s,o)}function ll(n){let e=C(n);if(e.he===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>za(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),us(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>fn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>fn(r)).join(",")),e.he=t}return e.he}function ul(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!E_(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Kd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ed(n.startAt,e.startAt)&&Ed(n.endAt,e.endAt)}function Ja(n){return E.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var pn=class{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.Pe=null,this.Ie=null,this.de=null,this.startAt,this.endAt}};function b_(n,e,t,r,i,s,o,a){return new pn(n,e,t,r,i,s,o,a)}function hl(n){return new pn(n)}function bd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function T_(n){return n.explicitOrderBy.length>0?n.explicitOrderBy[0].field:null}function A_(n){for(let e of n.filters){let t=e.getFirstInequalityField();if(t!==null)return t}return null}function S_(n){return n.collectionGroup!==null}function cr(n){let e=C(n);if(e.Pe===null){e.Pe=[];let t=A_(e),r=T_(e);if(t!==null&&r===null)t.isKeyField()||e.Pe.push(new Pt(t)),e.Pe.push(new Pt(ye.keyField(),"asc"));else{let i=!1;for(let s of e.explicitOrderBy)e.Pe.push(s),s.field.isKeyField()&&(i=!0);if(!i){let s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.Pe.push(new Pt(ye.keyField(),s))}}}return e.Pe}function Le(n){let e=C(n);return e.Ie||(e.Ie=C_(e,cr(n))),e.Ie}function C_(n,e){if(n.limitType==="F")return Id(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new Pt(i.field,s)});let t=n.endAt?new mn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new mn(n.startAt.position,n.startAt.inclusive):null;return Id(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Za(n,e,t){return new pn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function hs(n,e){return ul(Le(n),Le(e))&&n.limitType===e.limitType}function Yd(n){return`${ll(Le(n))}|lt:${n.limitType}`}function rn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Wd(i)).join(", ")}]`),us(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>fn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>fn(i)).join(",")),`Target(${r})`}(Le(n))}; limitType=${n.limitType})`}function ds(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):E.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of cr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,a,c){let l=wd(o,a,c);return o.inclusive?l<=0:l<0}(r.startAt,cr(r),i)||r.endAt&&!function(o,a,c){let l=wd(o,a,c);return o.inclusive?l>=0:l>0}(r.endAt,cr(r),i))}(n,e)}function R_(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Xd(n){return(e,t)=>{let r=!1;for(let i of cr(n)){let s=k_(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function k_(n,e,t){let r=n.field.isKeyField()?E.comparator(e.key,t.key):function(s,o,a){let c=o.data.field(s),l=a.data.field(s);return c!==null&&l!==null?dn(c,l):b()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return b()}}var ht=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){bn(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return jd(this.inner)}size(){return this.innerSize}};var P_=new B(E.comparator);function Qe(){return P_}var Jd=new B(E.comparator);function or(...n){let e=Jd;for(let t of n)e=e.insert(t.key,t);return e}function Zd(n){let e=Jd;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Ct(){return lr()}function ef(){return lr()}function lr(){return new ht(n=>n.toString(),(n,e)=>n.isEqual(e))}var D_=new B(E.comparator),N_=new ce(E.comparator);function k(...n){let e=N_;for(let t of n)e=e.add(t);return e}var x_=new ce(N);function L_(){return x_}function tf(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:dr(e)?"-0":e}}function nf(n){return{integerValue:""+n}}function O_(n,e){return g_(e)?nf(e):tf(n,e)}var gn=class{constructor(){this._=void 0}};function V_(n,e,t){return n instanceof yn?function(i,s){let o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&ol(s)&&(s=al(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):n instanceof Lt?sf(n,e):n instanceof Ot?of(n,e):function(i,s){let o=rf(i,s),a=Td(o)+Td(i.Te);return ja(o)&&ja(i.Te)?nf(a):tf(i.serializer,a)}(n,e)}function M_(n,e,t){return n instanceof Lt?sf(n,e):n instanceof Ot?of(n,e):t}function rf(n,e){return n instanceof _n?function(r){return ja(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var yn=class extends gn{},Lt=class extends gn{constructor(e){super(),this.elements=e}};function sf(n,e){let t=af(e);for(let r of n.elements)t.some(i=>Ve(i,r))||t.push(r);return{arrayValue:{values:t}}}var Ot=class extends gn{constructor(e){super(),this.elements=e}};function of(n,e){let t=af(e);for(let r of n.elements)t=t.filter(i=>!Ve(i,r));return{arrayValue:{values:t}}}var _n=class extends gn{constructor(e,t){super(),this.serializer=e,this.Te=t}};function Td(n){return U(n.integerValue||n.doubleValue)}function af(n){return cl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function F_(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Lt&&i instanceof Lt||r instanceof Ot&&i instanceof Ot?hn(r.elements,i.elements,Ve):r instanceof _n&&i instanceof _n?Ve(r.Te,i.Te):r instanceof yn&&i instanceof yn}(n.transform,e.transform)}var ec=class{constructor(e,t){this.version=e,this.transformResults=t}},at=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Di(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var vn=class{};function cf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new pr(n.key,at.none()):new Vt(n.key,n.data,at.none());{let t=n.data,r=be.empty(),i=new ce(ye.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Ye(n.key,r,new Ne(i.toArray()),at.none())}}function U_(n,e,t){n instanceof Vt?function(i,s,o){let a=i.value.clone(),c=Sd(i.fieldTransforms,s,o.transformResults);a.setAll(c),s.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(n,e,t):n instanceof Ye?function(i,s,o){if(!Di(i.precondition,s))return void s.convertToUnknownDocument(o.version);let a=Sd(i.fieldTransforms,s,o.transformResults),c=s.data;c.setAll(lf(i)),c.setAll(a),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function ur(n,e,t,r){return n instanceof Vt?function(s,o,a,c){if(!Di(s.precondition,o))return a;let l=s.value.clone(),u=Cd(s.fieldTransforms,c,o);return l.setAll(u),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(n,e,t,r):n instanceof Ye?function(s,o,a,c){if(!Di(s.precondition,o))return a;let l=Cd(s.fieldTransforms,c,o),u=o.data;return u.setAll(lf(s)),u.setAll(l),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(h=>h.field))}(n,e,t,r):function(s,o,a){return Di(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(n,e,t)}function q_(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=rf(r.transform,i||null);s!=null&&(t===null&&(t=be.empty()),t.set(r.field,s))}return t||null}function Ad(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&hn(r,i,(s,o)=>F_(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var Vt=class extends vn{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Ye=class extends vn{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function lf(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function Sd(n,e,t){let r=new Map;M(n.length===t.length);for(let i=0;i<t.length;i++){let s=n[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,M_(o,a,t[i]))}return r}function Cd(n,e,t){let r=new Map;for(let i of n){let s=i.transform,o=t.data.field(i.field);r.set(i.field,V_(s,o,e))}return r}var pr=class extends vn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},tc=class extends vn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var nc=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&U_(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=ur(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=ur(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=ef();return this.mutations.forEach(i=>{let s=e.get(i.key),o=s.overlayedDocument,a=this.applyToLocalView(o,s.mutatedFields);a=t.has(i.key)?null:a;let c=cf(o,a);c!==null&&r.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(S.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),k())}isEqual(e){return this.batchId===e.batchId&&hn(this.mutations,e.mutations,(t,r)=>Ad(t,r))&&hn(this.baseMutations,e.baseMutations,(t,r)=>Ad(t,r))}},rc=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){M(e.mutations.length===r.length);let i=function(){return D_}(),s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new n(e,t,r,i)}};var ic=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var sc=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var H,P;function B_(n){switch(n){default:return b();case m.CANCELLED:case m.UNKNOWN:case m.DEADLINE_EXCEEDED:case m.RESOURCE_EXHAUSTED:case m.INTERNAL:case m.UNAVAILABLE:case m.UNAUTHENTICATED:return!1;case m.INVALID_ARGUMENT:case m.NOT_FOUND:case m.ALREADY_EXISTS:case m.PERMISSION_DENIED:case m.FAILED_PRECONDITION:case m.ABORTED:case m.OUT_OF_RANGE:case m.UNIMPLEMENTED:case m.DATA_LOSS:return!0}}function uf(n){if(n===void 0)return We("GRPC error has no .code"),m.UNKNOWN;switch(n){case H.OK:return m.OK;case H.CANCELLED:return m.CANCELLED;case H.UNKNOWN:return m.UNKNOWN;case H.DEADLINE_EXCEEDED:return m.DEADLINE_EXCEEDED;case H.RESOURCE_EXHAUSTED:return m.RESOURCE_EXHAUSTED;case H.INTERNAL:return m.INTERNAL;case H.UNAVAILABLE:return m.UNAVAILABLE;case H.UNAUTHENTICATED:return m.UNAUTHENTICATED;case H.INVALID_ARGUMENT:return m.INVALID_ARGUMENT;case H.NOT_FOUND:return m.NOT_FOUND;case H.ALREADY_EXISTS:return m.ALREADY_EXISTS;case H.PERMISSION_DENIED:return m.PERMISSION_DENIED;case H.FAILED_PRECONDITION:return m.FAILED_PRECONDITION;case H.ABORTED:return m.ABORTED;case H.OUT_OF_RANGE:return m.OUT_OF_RANGE;case H.UNIMPLEMENTED:return m.UNIMPLEMENTED;case H.DATA_LOSS:return m.DATA_LOSS;default:return b()}}(P=H||(H={}))[P.OK=0]="OK",P[P.CANCELLED=1]="CANCELLED",P[P.UNKNOWN=2]="UNKNOWN",P[P.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",P[P.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",P[P.NOT_FOUND=5]="NOT_FOUND",P[P.ALREADY_EXISTS=6]="ALREADY_EXISTS",P[P.PERMISSION_DENIED=7]="PERMISSION_DENIED",P[P.UNAUTHENTICATED=16]="UNAUTHENTICATED",P[P.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",P[P.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",P[P.ABORTED=10]="ABORTED",P[P.OUT_OF_RANGE=11]="OUT_OF_RANGE",P[P.UNIMPLEMENTED=12]="UNIMPLEMENTED",P[P.INTERNAL=13]="INTERNAL",P[P.UNAVAILABLE=14]="UNAVAILABLE",P[P.DATA_LOSS=15]="DATA_LOSS";var Rd=null;function j_(){return new TextEncoder}var z_=new St([4294967295,4294967295],0);function kd(n){let e=j_().encode(n),t=new md;return t.update(e),new Uint8Array(t.digest())}function Pd(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new St([t,r],0),new St([i,s],0)]}var oc=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Rt(`Invalid padding: ${t}`);if(r<0)throw new Rt(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Rt(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Rt(`Invalid padding when bitmap length is 0: ${t}`);this.Ae=8*e.length-t,this.Re=St.fromNumber(this.Ae)}Ve(e,t,r){let i=e.add(t.multiply(St.fromNumber(r)));return i.compare(z_)===1&&(i=new St([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Re).toNumber()}me(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ae===0)return!1;let t=kd(e),[r,i]=Pd(t);for(let s=0;s<this.hashCount;s++){let o=this.Ve(r,i,s);if(!this.me(o))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new n(s,i,t);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.Ae===0)return;let t=kd(e),[r,i]=Pd(t);for(let s=0;s<this.hashCount;s++){let o=this.Ve(r,i,s);this.fe(o)}}fe(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},Rt=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Ui=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,gr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(S.min(),i,new B(N),Qe(),k())}},gr=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,k(),k(),k())}};var cn=class{constructor(e,t,r,i){this.ge=e,this.removedTargetIds=t,this.key=r,this.pe=i}},qi=class{constructor(e,t){this.targetId=e,this.ye=t}},Bi=class{constructor(e,t,r=le.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},ji=class{constructor(){this.we=0,this.Se=Nd(),this.be=le.EMPTY_BYTE_STRING,this.De=!1,this.Ce=!0}get current(){return this.De}get resumeToken(){return this.be}get ve(){return this.we!==0}get Fe(){return this.Ce}Me(e){e.approximateByteSize()>0&&(this.Ce=!0,this.be=e)}xe(){let e=k(),t=k(),r=k();return this.Se.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:b()}}),new gr(this.be,this.De,e,t,r)}Oe(){this.Ce=!1,this.Se=Nd()}Ne(e,t){this.Ce=!0,this.Se=this.Se.insert(e,t)}Be(e){this.Ce=!0,this.Se=this.Se.remove(e)}Le(){this.we+=1}ke(){this.we-=1}qe(){this.Ce=!0,this.De=!0}},ac=class{constructor(e){this.Qe=e,this.Ke=new Map,this.$e=Qe(),this.Ue=Dd(),this.We=new B(N)}Ge(e){for(let t of e.ge)e.pe&&e.pe.isFoundDocument()?this.ze(t,e.pe):this.je(t,e.key,e.pe);for(let t of e.removedTargetIds)this.je(t,e.key,e.pe)}He(e){this.forEachTarget(e,t=>{let r=this.Je(t);switch(e.state){case 0:this.Ye(t)&&r.Me(e.resumeToken);break;case 1:r.ke(),r.ve||r.Oe(),r.Me(e.resumeToken);break;case 2:r.ke(),r.ve||this.removeTarget(t);break;case 3:this.Ye(t)&&(r.qe(),r.Me(e.resumeToken));break;case 4:this.Ye(t)&&(this.Ze(t),r.Me(e.resumeToken));break;default:b()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ke.forEach((r,i)=>{this.Ye(i)&&t(i)})}Xe(e){let t=e.targetId,r=e.ye.count,i=this.et(t);if(i){let s=i.target;if(Ja(s))if(r===0){let o=new E(s.path);this.je(t,o,Ae.newNoDocument(o,S.min()))}else M(r===1);else{let o=this.tt(t);if(o!==r){let a=this.nt(e),c=a?this.rt(a,e,o):1;if(c!==0){this.Ze(t);let l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.We=this.We.insert(t,l)}Rd?.it(function(u,h,d,f,I){var T,v,D,L,O,z;let oe={localCacheCount:u,existenceFilterCount:h.count,databaseId:d.database,projectId:d.projectId},j=h.unchangedNames;return j&&(oe.bloomFilter={applied:I===0,hashCount:(T=j?.hashCount)!==null&&T!==void 0?T:0,bitmapLength:(L=(D=(v=j?.bits)===null||v===void 0?void 0:v.bitmap)===null||D===void 0?void 0:D.length)!==null&&L!==void 0?L:0,padding:(z=(O=j?.bits)===null||O===void 0?void 0:O.padding)!==null&&z!==void 0?z:0,mightContain:ve=>{var Se;return(Se=f?.mightContain(ve))!==null&&Se!==void 0&&Se}}),oe}(o,e.ye,this.Qe.st(),a,c))}}}}nt(e){let t=e.ye.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,o,a;try{o=ut(r).toUint8Array()}catch(c){if(c instanceof Vi)return un("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new oc(o,i,s)}catch(c){return un(c instanceof Rt?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.Ae===0?null:a}rt(e,t,r){return t.ye.count===r-this.ot(e,t.targetId)?0:2}ot(e,t){let r=this.Qe.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let o=this.Qe.st(),a=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(a)||(this.je(t,s,null),i++)}),i}_t(e){let t=new Map;this.Ke.forEach((s,o)=>{let a=this.et(o);if(a){if(s.current&&Ja(a.target)){let c=new E(a.target.path);this.$e.get(c)!==null||this.ut(o,c)||this.je(o,c,Ae.newNoDocument(c,e))}s.Fe&&(t.set(o,s.xe()),s.Oe())}});let r=k();this.Ue.forEach((s,o)=>{let a=!0;o.forEachWhile(c=>{let l=this.et(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(s))}),this.$e.forEach((s,o)=>o.setReadTime(e));let i=new Ui(e,t,this.We,this.$e,r);return this.$e=Qe(),this.Ue=Dd(),this.We=new B(N),i}ze(e,t){if(!this.Ye(e))return;let r=this.ut(e,t.key)?2:0;this.Je(e).Ne(t.key,r),this.$e=this.$e.insert(t.key,t),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}je(e,t,r){if(!this.Ye(e))return;let i=this.Je(e);this.ut(e,t)?i.Ne(t,1):i.Be(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),r&&(this.$e=this.$e.insert(t,r))}removeTarget(e){this.Ke.delete(e)}tt(e){let t=this.Je(e).xe();return this.Qe.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Le(e){this.Je(e).Le()}Je(e){let t=this.Ke.get(e);return t||(t=new ji,this.Ke.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new ce(N),this.Ue=this.Ue.insert(e,t)),t}Ye(e){let t=this.et(e)!==null;return t||y("WatchChangeAggregator","Detected inactive target",e),t}et(e){let t=this.Ke.get(e);return t&&t.ve?null:this.Qe.lt(e)}Ze(e){this.Ke.set(e,new ji),this.Qe.getRemoteKeysForTarget(e).forEach(t=>{this.je(e,t,null)})}ut(e,t){return this.Qe.getRemoteKeysForTarget(e).has(t)}};function Dd(){return new B(E.comparator)}function Nd(){return new B(E.comparator)}var H_=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),G_=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),$_=(()=>({and:"AND",or:"OR"}))(),cc=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function lc(n,e){return n.useProto3Json||us(e)?e:{value:e}}function zi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function hf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function K_(n,e){return zi(n,e.toTimestamp())}function Oe(n){return M(!!n),S.fromTimestamp(function(t){let r=lt(t);return new ee(r.seconds,r.nanos)}(n))}function dl(n,e){return function(r){return new q(["projects",r.projectId,"databases",r.database])}(n).child("documents").child(e).canonicalString()}function df(n){let e=q.fromString(n);return M(gf(e)),e}function uc(n,e){return dl(n.databaseId,e.path)}function Ca(n,e){let t=df(e);if(t.get(1)!==n.databaseId.projectId)throw new _(m.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new _(m.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new E(ff(t))}function hc(n,e){return dl(n.databaseId,e)}function W_(n){let e=df(n);return e.length===4?q.emptyPath():ff(e)}function dc(n){return new q(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ff(n){return M(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function xd(n,e,t){return{name:uc(n,e),fields:t.value.mapValue.fields}}function Q_(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:b()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(l,u){return l.useProto3Json?(M(u===void 0||typeof u=="string"),le.fromBase64String(u||"")):(M(u===void 0||u instanceof Uint8Array),le.fromUint8Array(u||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(l){let u=l.code===void 0?m.UNKNOWN:uf(l.code);return new _(u,l.message||"")}(o);t=new Bi(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=Ca(n,r.document.name),s=Oe(r.document.updateTime),o=r.document.createTime?Oe(r.document.createTime):S.min(),a=new be({mapValue:{fields:r.document.fields}}),c=Ae.newFoundDocument(i,s,o,a),l=r.targetIds||[],u=r.removedTargetIds||[];t=new cn(l,u,c.key,c)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=Ca(n,r.document),s=r.readTime?Oe(r.readTime):S.min(),o=Ae.newNoDocument(i,s),a=r.removedTargetIds||[];t=new cn([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=Ca(n,r.document),s=r.removedTargetIds||[];t=new cn([],s,i,null)}else{if(!("filter"in e))return b();{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,o=new sc(i,s),a=r.targetId;t=new qi(a,o)}}return t}function Y_(n,e){let t;if(e instanceof Vt)t={update:xd(n,e.key,e.value)};else if(e instanceof pr)t={delete:uc(n,e.key)};else if(e instanceof Ye)t={update:xd(n,e.key,e.data),updateMask:sv(e.fieldMask)};else{if(!(e instanceof tc))return b();t={verify:uc(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){let a=o.transform;if(a instanceof yn)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Lt)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof Ot)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof _n)return{fieldPath:o.field.canonicalString(),increment:a.Te};throw b()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:K_(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:b()}(n,e.precondition)),t}function X_(n,e){return n&&n.length>0?(M(e!==void 0),n.map(t=>function(i,s){let o=i.updateTime?Oe(i.updateTime):Oe(s);return o.isEqual(S.min())&&(o=Oe(s)),new ec(o,i.transformResults||[])}(t,e))):[]}function J_(n,e){return{documents:[hc(n,e.path)]}}function Z_(n,e){let t={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(t.parent=hc(n,r),t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(t.parent=hc(n,r.popLast()),t.structuredQuery.from=[{collectionId:r.lastSegment()}]);let i=function(c){if(c.length!==0)return pf(Me.create(c,"and"))}(e.filters);i&&(t.structuredQuery.where=i);let s=function(c){if(c.length!==0)return c.map(l=>function(h){return{field:sn(h.field),direction:nv(h.dir)}}(l))}(e.orderBy);s&&(t.structuredQuery.orderBy=s);let o=lc(n,e.limit);return o!==null&&(t.structuredQuery.limit=o),e.startAt&&(t.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),t}function ev(n){let e=W_(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){M(r===1);let u=t.from[0];u.allDescendants?i=u.collectionId:e=e.child(u.collectionId)}let s=[];t.where&&(s=function(h){let d=mf(h);return d instanceof Me&&$d(d)?d.getFilters():[d]}(t.where));let o=[];t.orderBy&&(o=function(h){return h.map(d=>function(I){return new Pt(on(I.field),function(v){switch(v){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(I.direction))}(d))}(t.orderBy));let a=null;t.limit&&(a=function(h){let d;return d=typeof h=="object"?h.value:h,us(d)?null:d}(t.limit));let c=null;t.startAt&&(c=function(h){let d=!!h.before,f=h.values||[];return new mn(f,d)}(t.startAt));let l=null;return t.endAt&&(l=function(h){let d=!h.before,f=h.values||[];return new mn(f,d)}(t.endAt)),b_(e,i,o,s,a,"F",c,l)}function tv(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return b()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function mf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=on(t.unaryFilter.field);return $.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=on(t.unaryFilter.field);return $.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=on(t.unaryFilter.field);return $.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let o=on(t.unaryFilter.field);return $.create(o,"!=",{nullValue:"NULL_VALUE"});default:return b()}}(n):n.fieldFilter!==void 0?function(t){return $.create(on(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return b()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Me.create(t.compositeFilter.filters.map(r=>mf(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return b()}}(t.compositeFilter.op))}(n):b()}function nv(n){return H_[n]}function rv(n){return G_[n]}function iv(n){return $_[n]}function sn(n){return{fieldPath:n.canonicalString()}}function on(n){return ye.fromServerFormat(n.fieldPath)}function pf(n){return n instanceof $?function(t){if(t.op==="=="){if(vd(t.value))return{unaryFilter:{field:sn(t.field),op:"IS_NAN"}};if(_d(t.value))return{unaryFilter:{field:sn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(vd(t.value))return{unaryFilter:{field:sn(t.field),op:"IS_NOT_NAN"}};if(_d(t.value))return{unaryFilter:{field:sn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:sn(t.field),op:rv(t.op),value:t.value}}}(n):n instanceof Me?function(t){let r=t.getFilters().map(i=>pf(i));return r.length===1?r[0]:{compositeFilter:{op:iv(t.op),filters:r}}}(n):b()}function sv(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function gf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var yr=class n{constructor(e,t,r,i,s=S.min(),o=S.min(),a=le.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var fc=class{constructor(e){this.ht=e}};function ov(n){let e=ev({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Za(e,e.limit,"L"):e}var Hi=class{constructor(){}dt(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.At(t,5);else if("booleanValue"in e)this.At(t,10),t.Rt(e.booleanValue?1:0);else if("integerValue"in e)this.At(t,15),t.Rt(U(e.integerValue));else if("doubleValue"in e){let r=U(e.doubleValue);isNaN(r)?this.At(t,13):(this.At(t,15),dr(r)?t.Rt(0):t.Rt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.At(t,20),typeof r=="string"?t.Vt(r):(t.Vt(`${r.seconds||""}`),t.Rt(r.nanos||0))}else if("stringValue"in e)this.ft(e.stringValue,t),this.gt(t);else if("bytesValue"in e)this.At(t,30),t.yt(ut(e.bytesValue)),this.gt(t);else if("referenceValue"in e)this.wt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.At(t,45),t.Rt(r.latitude||0),t.Rt(r.longitude||0)}else"mapValue"in e?zd(e)?this.At(t,Number.MAX_SAFE_INTEGER):(this.St(e.mapValue,t),this.gt(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.gt(t)):b()}ft(e,t){this.At(t,25),this.Dt(e,t)}Dt(e,t){t.Vt(e)}St(e,t){let r=e.fields||{};this.At(t,55);for(let i of Object.keys(r))this.ft(i,t),this.Tt(r[i],t)}bt(e,t){let r=e.values||[];this.At(t,50);for(let i of r)this.Tt(i,t)}wt(e,t){this.At(t,37),E.fromName(e).path.forEach(r=>{this.At(t,60),this.Dt(r,t)})}At(e,t){e.Rt(t)}gt(e){e.Rt(2)}};Hi.Ct=new Hi;var mc=class{constructor(){this.an=new pc}addToCollectionParentIndex(e,t){return this.an.add(t),p.resolve()}getCollectionParents(e,t){return p.resolve(this.an.getEntries(t))}addFieldIndex(e,t){return p.resolve()}deleteFieldIndex(e,t){return p.resolve()}deleteAllFieldIndexes(e){return p.resolve()}createTargetIndexes(e,t){return p.resolve()}getDocumentsMatchingTarget(e,t){return p.resolve(null)}getIndexType(e,t){return p.resolve(0)}getFieldIndexes(e,t){return p.resolve([])}getNextCollectionGroupToUpdate(e){return p.resolve(null)}getMinOffset(e,t){return p.resolve(Nt.min())}getMinOffsetFromCollectionGroup(e,t){return p.resolve(Nt.min())}updateCollectionGroup(e,t,r){return p.resolve()}updateIndexEntries(e,t){return p.resolve()}},pc=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new ce(q.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ce(q.comparator)).toArray()}};var sb=new Uint8Array(0);var De=class n{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};De.DEFAULT_COLLECTION_PERCENTILE=10,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,De.DEFAULT=new De(41943040,De.DEFAULT_COLLECTION_PERCENTILE,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),De.DISABLED=new De(-1,0,0);var _r=class n{constructor(e){this.Nn=e}next(){return this.Nn+=2,this.Nn}static Bn(){return new n(0)}static Ln(){return new n(-1)}};var gc=class{constructor(){this.changes=new ht(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ae.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?p.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var yc=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var _c=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&ur(r.mutation,i,Ne.empty(),ee.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,k()).next(()=>r))}getLocalViewOfDocuments(e,t,r=k()){let i=Ct();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=or();return s.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){let r=Ct();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,k()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,a)=>{t.set(o,a)})})}computeViews(e,t,r,i){let s=Qe(),o=lr(),a=function(){return lr()}();return t.forEach((c,l)=>{let u=r.get(l.key);i.has(l.key)&&(u===void 0||u.mutation instanceof Ye)?s=s.insert(l.key,l):u!==void 0?(o.set(l.key,u.mutation.getFieldMask()),ur(u.mutation,l,u.mutation.getFieldMask(),ee.now())):o.set(l.key,Ne.empty())}),this.recalculateAndSaveOverlays(e,s).next(c=>(c.forEach((l,u)=>o.set(l,u)),t.forEach((l,u)=>{var h;return a.set(l,new yc(u,(h=o.get(l))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,t){let r=lr(),i=new B((o,a)=>o-a),s=k();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(let a of o)a.keys().forEach(c=>{let l=t.get(c);if(l===null)return;let u=r.get(c)||Ne.empty();u=a.applyToLocalView(l,u),r.set(c,u);let h=(i.get(a.batchId)||k()).add(c);i=i.insert(a.batchId,h)})}).next(()=>{let o=[],a=i.getReverseIterator();for(;a.hasNext();){let c=a.getNext(),l=c.key,u=c.value,h=ef();u.forEach(d=>{if(!s.has(d)){let f=cf(t.get(d),r.get(d));f!==null&&h.set(d,f),s=s.add(d)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,h))}return p.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return E.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):S_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):p.resolve(Ct()),a=-1,c=s;return o.next(l=>p.forEach(l,(u,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),s.get(u)?p.resolve():this.remoteDocumentCache.getEntry(e,u).next(d=>{c=c.insert(u,d)}))).next(()=>this.populateOverlays(e,l,s)).next(()=>this.computeViews(e,c,l,k())).next(u=>({batchId:a,changes:Zd(u)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new E(t)).next(r=>{let i=or();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,o=or();return this.indexManager.getCollectionParents(e,s).next(a=>p.forEach(a,c=>{let l=function(h,d){return new pn(d,null,h.explicitOrderBy.slice(),h.filters.slice(),h.limit,h.limitType,h.startAt,h.endAt)}(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,l,r,i).next(u=>{u.forEach((h,d)=>{o=o.insert(h,d)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((c,l)=>{let u=l.getKey();o.get(u)===null&&(o=o.insert(u,Ae.newInvalidDocument(u)))});let a=or();return o.forEach((c,l)=>{let u=s.get(c);u!==void 0&&ur(u.mutation,l,Ne.empty(),ee.now()),ds(t,l)&&(a=a.insert(c,l))}),a})}};var vc=class{constructor(e){this.serializer=e,this.lr=new Map,this.hr=new Map}getBundleMetadata(e,t){return p.resolve(this.lr.get(t))}saveBundleMetadata(e,t){return this.lr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Oe(i.createTime)}}(t)),p.resolve()}getNamedQuery(e,t){return p.resolve(this.hr.get(t))}saveNamedQuery(e,t){return this.hr.set(t.name,function(i){return{name:i.name,query:ov(i.bundledQuery),readTime:Oe(i.readTime)}}(t)),p.resolve()}};var wc=class{constructor(){this.overlays=new B(E.comparator),this.Pr=new Map}getOverlay(e,t){return p.resolve(this.overlays.get(t))}getOverlays(e,t){let r=Ct();return p.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.It(e,t,s)}),p.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.Pr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Pr.delete(r)),p.resolve()}getOverlaysForCollection(e,t,r){let i=Ct(),s=t.length+1,o=new E(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){let c=a.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return p.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new B((l,u)=>l-u),o=this.overlays.getIterator();for(;o.hasNext();){let l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let u=s.get(l.largestBatchId);u===null&&(u=Ct(),s=s.insert(l.largestBatchId,u)),u.set(l.getKey(),l)}}let a=Ct(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((l,u)=>a.set(l,u)),!(a.size()>=i)););return p.resolve(a)}It(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let o=this.Pr.get(i.largestBatchId).delete(r.key);this.Pr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new ic(t,r));let s=this.Pr.get(t);s===void 0&&(s=k(),this.Pr.set(t,s)),this.Pr.set(t,s.add(r.key))}};var vr=class{constructor(){this.Ir=new ce(G.dr),this.Tr=new ce(G.Er)}isEmpty(){return this.Ir.isEmpty()}addReference(e,t){let r=new G(e,t);this.Ir=this.Ir.add(r),this.Tr=this.Tr.add(r)}Ar(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Rr(new G(e,t))}Vr(e,t){e.forEach(r=>this.removeReference(r,t))}mr(e){let t=new E(new q([])),r=new G(t,e),i=new G(t,e+1),s=[];return this.Tr.forEachInRange([r,i],o=>{this.Rr(o),s.push(o.key)}),s}gr(){this.Ir.forEach(e=>this.Rr(e))}Rr(e){this.Ir=this.Ir.delete(e),this.Tr=this.Tr.delete(e)}pr(e){let t=new E(new q([])),r=new G(t,e),i=new G(t,e+1),s=k();return this.Tr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){let t=new G(e,0),r=this.Ir.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},G=class{constructor(e,t){this.key=e,this.yr=t}static dr(e,t){return E.comparator(e.key,t.key)||N(e.yr,t.yr)}static Er(e,t){return N(e.yr,t.yr)||E.comparator(e.key,t.key)}};var Ec=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.wr=1,this.Sr=new ce(G.dr)}checkEmpty(e){return p.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.wr;this.wr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let o=new nc(s,t,r,i);this.mutationQueue.push(o);for(let a of i)this.Sr=this.Sr.add(new G(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return p.resolve(o)}lookupMutationBatch(e,t){return p.resolve(this.br(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.Dr(r),s=i<0?0:i;return p.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return p.resolve(this.mutationQueue.length===0?-1:this.wr-1)}getAllMutationBatches(e){return p.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new G(t,0),i=new G(t,Number.POSITIVE_INFINITY),s=[];return this.Sr.forEachInRange([r,i],o=>{let a=this.br(o.yr);s.push(a)}),p.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(N);return t.forEach(i=>{let s=new G(i,0),o=new G(i,Number.POSITIVE_INFINITY);this.Sr.forEachInRange([s,o],a=>{r=r.add(a.yr)})}),p.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;E.isDocumentKey(s)||(s=s.child(""));let o=new G(new E(s),0),a=new ce(N);return this.Sr.forEachWhile(c=>{let l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===i&&(a=a.add(c.yr)),!0)},o),p.resolve(this.Cr(a))}Cr(e){let t=[];return e.forEach(r=>{let i=this.br(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){M(this.vr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Sr;return p.forEach(t.mutations,i=>{let s=new G(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Sr=r})}xn(e){}containsKey(e,t){let r=new G(t,0),i=this.Sr.firstAfterOrEqual(r);return p.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,p.resolve()}vr(e,t){return this.Dr(e)}Dr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}br(e){let t=this.Dr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var Ic=class{constructor(e){this.Fr=e,this.docs=function(){return new B(E.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.Fr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return p.resolve(r?r.document.mutableCopy():Ae.newInvalidDocument(t))}getEntries(e,t){let r=Qe();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ae.newInvalidDocument(i))}),p.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Qe(),o=t.path,a=new E(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){let{key:l,value:{document:u}}=c.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||m_(f_(u),r)<=0||(i.has(u.key)||ds(t,u))&&(s=s.insert(u.key,u.mutableCopy()))}return p.resolve(s)}getAllFromCollectionGroup(e,t,r,i){b()}Mr(e,t){return p.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new bc(this)}getSize(e){return p.resolve(this.size)}},bc=class extends gc{constructor(e){super(),this.ur=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.ur.addEntry(e,i)):this.ur.removeEntry(r)}),p.waitFor(t)}getFromCache(e,t){return this.ur.getEntry(e,t)}getAllFromCache(e,t){return this.ur.getEntries(e,t)}};var Tc=class{constructor(e){this.persistence=e,this.Or=new ht(t=>ll(t),ul),this.lastRemoteSnapshotVersion=S.min(),this.highestTargetId=0,this.Nr=0,this.Br=new vr,this.targetCount=0,this.Lr=_r.Bn()}forEachTarget(e,t){return this.Or.forEach((r,i)=>t(i)),p.resolve()}getLastRemoteSnapshotVersion(e){return p.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return p.resolve(this.Nr)}allocateTargetId(e){return this.highestTargetId=this.Lr.next(),p.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Nr&&(this.Nr=t),p.resolve()}Qn(e){this.Or.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Lr=new _r(t),this.highestTargetId=t),e.sequenceNumber>this.Nr&&(this.Nr=e.sequenceNumber)}addTargetData(e,t){return this.Qn(t),this.targetCount+=1,p.resolve()}updateTargetData(e,t){return this.Qn(t),p.resolve()}removeTargetData(e,t){return this.Or.delete(t.target),this.Br.mr(t.targetId),this.targetCount-=1,p.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.Or.forEach((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.Or.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)}),p.waitFor(s).next(()=>i)}getTargetCount(e){return p.resolve(this.targetCount)}getTargetData(e,t){let r=this.Or.get(t)||null;return p.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Ar(t,r),p.resolve()}removeMatchingKeys(e,t,r){this.Br.Vr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),p.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.mr(t),p.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Br.pr(t);return p.resolve(r)}containsKey(e,t){return p.resolve(this.Br.containsKey(t))}};var Ac=class{constructor(e,t){this.kr={},this.overlays={},this.qr=new hr(0),this.Qr=!1,this.Qr=!0,this.referenceDelegate=e(this),this.Kr=new Tc(this),this.indexManager=new mc,this.remoteDocumentCache=function(i){return new Ic(i)}(r=>this.referenceDelegate.$r(r)),this.serializer=new fc(t),this.Ur=new vc(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Qr=!1,Promise.resolve()}get started(){return this.Qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new wc,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.kr[e.toKey()];return r||(r=new Ec(t,this.referenceDelegate),this.kr[e.toKey()]=r),r}getTargetCache(){return this.Kr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ur}runTransaction(e,t,r){y("MemoryPersistence","Starting transaction:",e);let i=new Sc(this.qr.next());return this.referenceDelegate.Wr(),r(i).next(s=>this.referenceDelegate.Gr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}zr(e,t){return p.or(Object.values(this.kr).map(r=>()=>r.containsKey(e,t)))}},Sc=class extends Ua{constructor(e){super(),this.currentSequenceNumber=e}},Cc=class n{constructor(e){this.persistence=e,this.jr=new vr,this.Hr=null}static Jr(e){return new n(e)}get Yr(){if(this.Hr)return this.Hr;throw b()}addReference(e,t,r){return this.jr.addReference(r,t),this.Yr.delete(r.toString()),p.resolve()}removeReference(e,t,r){return this.jr.removeReference(r,t),this.Yr.add(r.toString()),p.resolve()}markPotentiallyOrphaned(e,t){return this.Yr.add(t.toString()),p.resolve()}removeTarget(e,t){this.jr.mr(t.targetId).forEach(i=>this.Yr.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Yr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Wr(){this.Hr=new Set}Gr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return p.forEach(this.Yr,r=>{let i=E.fromPath(r);return this.Zr(e,i).next(s=>{s||t.removeEntry(i,S.min())})}).next(()=>(this.Hr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Zr(e,t).next(r=>{r?this.Yr.delete(t.toString()):this.Yr.add(t.toString())})}$r(e){return 0}Zr(e,t){return p.or([()=>p.resolve(this.jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.zr(e,t)])}};var Rc=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Qi=r,this.Ki=i}static $i(e,t){let r=k(),i=k();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var kc=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var Pc=class{constructor(){this.Ui=!1,this.Wi=!1,this.Gi=100,this.zi=2}initialize(e,t){this.ji=e,this.indexManager=t,this.Ui=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.Hi(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Ji(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;let o=new kc;return this.Yi(e,t,o).next(a=>{if(s.result=a,this.Wi)return this.Zi(e,t,o,a.size)})}).next(()=>s.result)}Zi(e,t,r,i){return r.documentReadCount<this.Gi?(sr()<=R.DEBUG&&y("QueryEngine","SDK will not create cache indexes for query:",rn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Gi,"documents"),p.resolve()):(sr()<=R.DEBUG&&y("QueryEngine","Query:",rn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.zi*i?(sr()<=R.DEBUG&&y("QueryEngine","The SDK decides to create cache indexes for query:",rn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Le(t))):p.resolve())}Hi(e,t){if(bd(t))return p.resolve(null);let r=Le(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Za(t,null,"F"),r=Le(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let o=k(...s);return this.ji.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(c=>{let l=this.Xi(t,a);return this.es(t,l,o,c.readTime)?this.Hi(e,Za(t,null,"F")):this.ts(e,l,t,c)}))})))}Ji(e,t,r,i){return bd(t)||i.isEqual(S.min())?p.resolve(null):this.ji.getDocuments(e,r).next(s=>{let o=this.Xi(t,s);return this.es(t,o,r,i)?p.resolve(null):(sr()<=R.DEBUG&&y("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),rn(t)),this.ts(e,o,t,d_(i,-1)).next(a=>a))})}Xi(e,t){let r=new ce(Xd(e));return t.forEach((i,s)=>{ds(e,s)&&(r=r.add(s))}),r}es(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Yi(e,t,r){return sr()<=R.DEBUG&&y("QueryEngine","Using full collection scan to execute query:",rn(t)),this.ji.getDocumentsMatchingQuery(e,t,Nt.min(),r)}ts(e,t,r,i){return this.ji.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}};var Dc=class{constructor(e,t,r,i){this.persistence=e,this.ns=t,this.serializer=i,this.rs=new B(N),this.ss=new ht(s=>ll(s),ul),this.os=new Map,this._s=e.getRemoteDocumentCache(),this.Kr=e.getTargetCache(),this.Ur=e.getBundleCache(),this.us(r)}us(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new _c(this._s,this.mutationQueue,this.documentOverlayCache,this.indexManager),this._s.setIndexManager(this.indexManager),this.ns.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.rs))}};function av(n,e,t,r){return new Dc(n,e,t,r)}async function yf(n,e){let t=C(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.us(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let o=[],a=[],c=k();for(let l of i){o.push(l.batchId);for(let u of l.mutations)c=c.add(u.key)}for(let l of s){a.push(l.batchId);for(let u of l.mutations)c=c.add(u.key)}return t.localDocuments.getDocuments(r,c).next(l=>({cs:l,removedBatchIds:o,addedBatchIds:a}))})})}function cv(n,e){let t=C(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t._s.newChangeBuffer({trackRemovals:!0});return function(a,c,l,u){let h=l.batch,d=h.keys(),f=p.resolve();return d.forEach(I=>{f=f.next(()=>u.getEntry(c,I)).next(T=>{let v=l.docVersions.get(I);M(v!==null),T.version.compareTo(v)<0&&(h.applyToRemoteDocument(T,l),T.isValidDocument()&&(T.setReadTime(l.commitVersion),u.addEntry(T)))})}),f.next(()=>a.mutationQueue.removeMutationBatch(c,h))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let c=k();for(let l=0;l<a.mutationResults.length;++l)a.mutationResults[l].transformResults.length>0&&(c=c.add(a.batch.mutations[l].key));return c}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function _f(n){let e=C(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Kr.getLastRemoteSnapshotVersion(t))}function lv(n,e){let t=C(n),r=e.snapshotVersion,i=t.rs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let o=t._s.newChangeBuffer({trackRemovals:!0});i=t.rs;let a=[];e.targetChanges.forEach((u,h)=>{let d=i.get(h);if(!d)return;a.push(t.Kr.removeMatchingKeys(s,u.removedDocuments,h).next(()=>t.Kr.addMatchingKeys(s,u.addedDocuments,h)));let f=d.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(h)!==null?f=f.withResumeToken(le.EMPTY_BYTE_STRING,S.min()).withLastLimboFreeSnapshotVersion(S.min()):u.resumeToken.approximateByteSize()>0&&(f=f.withResumeToken(u.resumeToken,r)),i=i.insert(h,f),function(T,v,D){return T.resumeToken.approximateByteSize()===0||v.snapshotVersion.toMicroseconds()-T.snapshotVersion.toMicroseconds()>=3e8?!0:D.addedDocuments.size+D.modifiedDocuments.size+D.removedDocuments.size>0}(d,f,u)&&a.push(t.Kr.updateTargetData(s,f))});let c=Qe(),l=k();if(e.documentUpdates.forEach(u=>{e.resolvedLimboDocuments.has(u)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(s,u))}),a.push(uv(s,o,e.documentUpdates).next(u=>{c=u.ls,l=u.hs})),!r.isEqual(S.min())){let u=t.Kr.getLastRemoteSnapshotVersion(s).next(h=>t.Kr.setTargetsMetadata(s,s.currentSequenceNumber,r));a.push(u)}return p.waitFor(a).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,c,l)).next(()=>c)}).then(s=>(t.rs=i,s))}function uv(n,e,t){let r=k(),i=k();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=Qe();return t.forEach((a,c)=>{let l=s.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(i=i.add(a)),c.isNoDocument()&&c.version.isEqual(S.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):y("LocalStore","Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)}),{ls:o,hs:i}})}function hv(n,e){let t=C(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function dv(n,e){let t=C(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Kr.getTargetData(r,e).next(s=>s?(i=s,p.resolve(i)):t.Kr.allocateTargetId(r).next(o=>(i=new yr(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Kr.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.rs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.rs=t.rs.insert(r.targetId,r),t.ss.set(e,r.targetId)),r})}async function Nc(n,e,t){let r=C(n),i=r.rs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Tr(o))throw o;y("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.rs=r.rs.remove(e),r.ss.delete(i.target)}function Ld(n,e,t){let r=C(n),i=S.min(),s=k();return r.persistence.runTransaction("Execute query","readwrite",o=>function(c,l,u){let h=C(c),d=h.ss.get(u);return d!==void 0?p.resolve(h.rs.get(d)):h.Kr.getTargetData(l,u)}(r,o,Le(e)).next(a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Kr.getMatchingKeysForTargetId(o,a.targetId).next(c=>{s=c})}).next(()=>r.ns.getDocumentsMatchingQuery(o,e,t?i:S.min(),t?s:k())).next(a=>(fv(r,R_(e),a),{documents:a,Ps:s})))}function fv(n,e,t){let r=n.os.get(e)||S.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.os.set(e,r)}var Gi=class{constructor(){this.activeTargetIds=L_()}Rs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}As(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var xc=class{constructor(){this.ro=new Gi,this.io={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.ro.Rs(e),this.io[e]||"not-current"}updateQueryState(e,t,r){this.io[e]=t}removeLocalQueryTarget(e){this.ro.Vs(e)}isLocalQueryTarget(e){return this.ro.activeTargetIds.has(e)}clearQueryState(e){delete this.io[e]}getAllActiveQueryTargets(){return this.ro.activeTargetIds}isActiveQueryTarget(e){return this.ro.activeTargetIds.has(e)}start(){return this.ro=new Gi,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Lc=class{so(e){}shutdown(){}};var $i=class{constructor(){this.oo=()=>this._o(),this.ao=()=>this.uo(),this.co=[],this.lo()}so(e){this.co.push(e)}shutdown(){window.removeEventListener("online",this.oo),window.removeEventListener("offline",this.ao)}lo(){window.addEventListener("online",this.oo),window.addEventListener("offline",this.ao)}_o(){y("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.co)e(0)}uo(){y("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.co)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var ki=null;function Ra(){return ki===null?ki=function(){return 268435456+Math.round(2147483648*Math.random())}():ki++,"0x"+ki.toString(16)}var mv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var Oc=class{constructor(e){this.ho=e.ho,this.Po=e.Po}Io(e){this.To=e}Eo(e){this.Ao=e}onMessage(e){this.Ro=e}close(){this.Po()}send(e){this.ho(e)}Vo(){this.To()}mo(e){this.Ao(e)}fo(e){this.Ro(e)}};var se="WebChannelConnection",Vc=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=r+"://"+t.host,this.yo=`projects/${i}/databases/${s}`,this.wo=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get So(){return!1}bo(t,r,i,s,o){let a=Ra(),c=this.Do(t,r);y("RestConnection",`Sending RPC '${t}' ${a}:`,c,i);let l={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Co(l,s,o),this.vo(t,c,l,i).then(u=>(y("RestConnection",`Received RPC '${t}' ${a}: `,u),u),u=>{throw un("RestConnection",`RPC '${t}' ${a} failed with error: `,u,"url: ",c,"request:",i),u})}Fo(t,r,i,s,o,a){return this.bo(t,r,i,s,o)}Co(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+In}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}Do(t,r){let i=mv[t];return`${this.po}/v1/${r}:${i}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,r,i){let s=Ra();return new Promise((o,a)=>{let c=new fd;c.setWithCredentials(!0),c.listenOnce(hd.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Ci.NO_ERROR:let u=c.getResponseJson();y(se,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(u)),o(u);break;case Ci.TIMEOUT:y(se,`RPC '${e}' ${s} timed out`),a(new _(m.DEADLINE_EXCEEDED,"Request time out"));break;case Ci.HTTP_ERROR:let h=c.getStatus();if(y(se,`RPC '${e}' ${s} failed with status:`,h,"response text:",c.getResponseText()),h>0){let d=c.getResponseJson();Array.isArray(d)&&(d=d[0]);let f=d?.error;if(f&&f.status&&f.message){let I=function(v){let D=v.toLowerCase().replace(/_/g,"-");return Object.values(m).indexOf(D)>=0?D:m.UNKNOWN}(f.status);a(new _(I,f.message))}else a(new _(m.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new _(m.UNAVAILABLE,"Connection failed."));break;default:b()}}finally{y(se,`RPC '${e}' ${s} completed.`)}});let l=JSON.stringify(i);y(se,`RPC '${e}' ${s} sending request:`,i),c.send(t,"POST",l,r,15)})}Mo(e,t,r){let i=Ra(),s=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=ld(),a=ud(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Co(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;let u=s.join("");y(se,`Creating RPC '${e}' stream ${i}: ${u}`,c);let h=o.createWebChannel(u,c),d=!1,f=!1,I=new Oc({ho:v=>{f?y(se,`Not sending because RPC '${e}' stream ${i} is closed:`,v):(d||(y(se,`Opening RPC '${e}' stream ${i} transport.`),h.open(),d=!0),y(se,`RPC '${e}' stream ${i} sending:`,v),h.send(v))},Po:()=>h.close()}),T=(v,D,L)=>{v.listen(D,O=>{try{L(O)}catch(z){setTimeout(()=>{throw z},0)}})};return T(h,ir.EventType.OPEN,()=>{f||y(se,`RPC '${e}' stream ${i} transport opened.`)}),T(h,ir.EventType.CLOSE,()=>{f||(f=!0,y(se,`RPC '${e}' stream ${i} transport closed`),I.mo())}),T(h,ir.EventType.ERROR,v=>{f||(f=!0,un(se,`RPC '${e}' stream ${i} transport errored:`,v),I.mo(new _(m.UNAVAILABLE,"The operation could not be completed")))}),T(h,ir.EventType.MESSAGE,v=>{var D;if(!f){let L=v.data[0];M(!!L);let O=L,z=O.error||((D=O[0])===null||D===void 0?void 0:D.error);if(z){y(se,`RPC '${e}' stream ${i} received error:`,z);let oe=z.status,j=function(Be){let et=H[Be];if(et!==void 0)return uf(et)}(oe),ve=z.message;j===void 0&&(j=m.INTERNAL,ve="Unknown error status: "+oe+" with message "+z.message),f=!0,I.mo(new _(j,ve)),h.close()}else y(se,`RPC '${e}' stream ${i} received:`,L),I.fo(L)}}),T(a,dd.STAT_EVENT,v=>{v.stat===Sa.PROXY?y(se,`RPC '${e}' stream ${i} detected buffering proxy`):v.stat===Sa.NOPROXY&&y(se,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{I.Vo()},0),I}};function ka(){return typeof document<"u"?document:null}function fs(n){return new cc(n,!0)}var Ki=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this._i=e,this.timerId=t,this.xo=r,this.Oo=i,this.No=s,this.Bo=0,this.Lo=null,this.ko=Date.now(),this.reset()}reset(){this.Bo=0}qo(){this.Bo=this.No}Qo(e){this.cancel();let t=Math.floor(this.Bo+this.Ko()),r=Math.max(0,Date.now()-this.ko),i=Math.max(0,t-r);i>0&&y("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Bo} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Lo=this._i.enqueueAfterDelay(this.timerId,i,()=>(this.ko=Date.now(),e())),this.Bo*=this.Oo,this.Bo<this.xo&&(this.Bo=this.xo),this.Bo>this.No&&(this.Bo=this.No)}$o(){this.Lo!==null&&(this.Lo.skipDelay(),this.Lo=null)}cancel(){this.Lo!==null&&(this.Lo.cancel(),this.Lo=null)}Ko(){return(Math.random()-.5)*this.Bo}};var Wi=class{constructor(e,t,r,i,s,o,a,c){this._i=e,this.Uo=r,this.Wo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Go=0,this.zo=null,this.jo=null,this.stream=null,this.Ho=new Ki(e,t)}Jo(){return this.state===1||this.state===5||this.Yo()}Yo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Zo()}async stop(){this.Jo()&&await this.close(0)}Xo(){this.state=0,this.Ho.reset()}e_(){this.Yo()&&this.zo===null&&(this.zo=this._i.enqueueAfterDelay(this.Uo,6e4,()=>this.t_()))}n_(e){this.r_(),this.stream.send(e)}async t_(){if(this.Yo())return this.close(0)}r_(){this.zo&&(this.zo.cancel(),this.zo=null)}i_(){this.jo&&(this.jo.cancel(),this.jo=null)}async close(e,t){this.r_(),this.i_(),this.Ho.cancel(),this.Go++,e!==4?this.Ho.reset():t&&t.code===m.RESOURCE_EXHAUSTED?(We(t.toString()),We("Using maximum backoff delay to prevent overloading the backend."),this.Ho.qo()):t&&t.code===m.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.s_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Eo(t)}s_(){}auth(){this.state=1;let e=this.o_(this.Go),t=this.Go;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Go===t&&this.__(r,i)},r=>{e(()=>{let i=new _(m.UNKNOWN,"Fetching auth token failed: "+r.message);return this.a_(i)})})}__(e,t){let r=this.o_(this.Go);this.stream=this.u_(e,t),this.stream.Io(()=>{r(()=>(this.state=2,this.jo=this._i.enqueueAfterDelay(this.Wo,1e4,()=>(this.Yo()&&(this.state=3),Promise.resolve())),this.listener.Io()))}),this.stream.Eo(i=>{r(()=>this.a_(i))}),this.stream.onMessage(i=>{r(()=>this.onMessage(i))})}Zo(){this.state=5,this.Ho.Qo(async()=>{this.state=0,this.start()})}a_(e){return y("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}o_(e){return t=>{this._i.enqueueAndForget(()=>this.Go===e?t():(y("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Mc=class extends Wi{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}u_(e,t){return this.connection.Mo("Listen",e,t)}onMessage(e){this.Ho.reset();let t=Q_(this.serializer,e),r=function(s){if(!("targetChange"in s))return S.min();let o=s.targetChange;return o.targetIds&&o.targetIds.length?S.min():o.readTime?Oe(o.readTime):S.min()}(e);return this.listener.c_(t,r)}l_(e){let t={};t.database=dc(this.serializer),t.addTarget=function(s,o){let a,c=o.target;if(a=Ja(c)?{documents:J_(s,c)}:{query:Z_(s,c)},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=hf(s,o.resumeToken);let l=lc(s,o.expectedCount);l!==null&&(a.expectedCount=l)}else if(o.snapshotVersion.compareTo(S.min())>0){a.readTime=zi(s,o.snapshotVersion.toTimestamp());let l=lc(s,o.expectedCount);l!==null&&(a.expectedCount=l)}return a}(this.serializer,e);let r=tv(this.serializer,e);r&&(t.labels=r),this.n_(t)}h_(e){let t={};t.database=dc(this.serializer),t.removeTarget=e,this.n_(t)}},Fc=class extends Wi{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s,this.P_=!1}get I_(){return this.P_}start(){this.P_=!1,this.lastStreamToken=void 0,super.start()}s_(){this.P_&&this.d_([])}u_(e,t){return this.connection.Mo("Write",e,t)}onMessage(e){if(M(!!e.streamToken),this.lastStreamToken=e.streamToken,this.P_){this.Ho.reset();let t=X_(e.writeResults,e.commitTime),r=Oe(e.commitTime);return this.listener.T_(r,t)}return M(!e.writeResults||e.writeResults.length===0),this.P_=!0,this.listener.E_()}A_(){let e={};e.database=dc(this.serializer),this.n_(e)}d_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>Y_(this.serializer,r))};this.n_(t)}};var Uc=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.R_=!1}V_(){if(this.R_)throw new _(m.FAILED_PRECONDITION,"The client has already been terminated.")}bo(e,t,r){return this.V_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.bo(e,t,r,i,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===m.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new _(m.UNKNOWN,i.toString())})}Fo(e,t,r,i){return this.V_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Fo(e,t,r,s,o,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===m.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new _(m.UNKNOWN,s.toString())})}terminate(){this.R_=!0}};var qc=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.f_=0,this.g_=null,this.p_=!0}y_(){this.f_===0&&(this.w_("Unknown"),this.g_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.g_=null,this.S_("Backend didn't respond within 10 seconds."),this.w_("Offline"),Promise.resolve())))}b_(e){this.state==="Online"?this.w_("Unknown"):(this.f_++,this.f_>=1&&(this.D_(),this.S_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.w_("Offline")))}set(e){this.D_(),this.f_=0,e==="Online"&&(this.p_=!1),this.w_(e)}w_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}S_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.p_?(We(t),this.p_=!1):y("OnlineStateTracker",t)}D_(){this.g_!==null&&(this.g_.cancel(),this.g_=null)}};var Bc=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.C_=[],this.v_=new Map,this.F_=new Set,this.M_=[],this.x_=s,this.x_.so(o=>{r.enqueueAndForget(async()=>{Ft(this)&&(y("RemoteStore","Restarting streams for network reachability change."),await async function(c){let l=C(c);l.F_.add(4),await Ar(l),l.O_.set("Unknown"),l.F_.delete(4),await ms(l)}(this))})}),this.O_=new qc(r,i)}};async function ms(n){if(Ft(n))for(let e of n.M_)await e(!0)}async function Ar(n){for(let e of n.M_)await e(!1)}function vf(n,e){let t=C(n);t.v_.has(e.targetId)||(t.v_.set(e.targetId,e),pl(t)?ml(t):Tn(t).Yo()&&fl(t,e))}function wf(n,e){let t=C(n),r=Tn(t);t.v_.delete(e),r.Yo()&&Ef(t,e),t.v_.size===0&&(r.Yo()?r.e_():Ft(t)&&t.O_.set("Unknown"))}function fl(n,e){if(n.N_.Le(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(S.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Tn(n).l_(e)}function Ef(n,e){n.N_.Le(e),Tn(n).h_(e)}function ml(n){n.N_=new ac({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.v_.get(e)||null,st:()=>n.datastore.serializer.databaseId}),Tn(n).start(),n.O_.y_()}function pl(n){return Ft(n)&&!Tn(n).Jo()&&n.v_.size>0}function Ft(n){return C(n).F_.size===0}function If(n){n.N_=void 0}async function pv(n){n.v_.forEach((e,t)=>{fl(n,e)})}async function gv(n,e){If(n),pl(n)?(n.O_.b_(e),ml(n)):n.O_.set("Unknown")}async function yv(n,e,t){if(n.O_.set("Online"),e instanceof Bi&&e.state===2&&e.cause)try{await async function(i,s){let o=s.cause;for(let a of s.targetIds)i.v_.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.v_.delete(a),i.N_.removeTarget(a))}(n,e)}catch(r){y("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Qi(n,r)}else if(e instanceof cn?n.N_.Ge(e):e instanceof qi?n.N_.Xe(e):n.N_.He(e),!t.isEqual(S.min()))try{let r=await _f(n.localStore);t.compareTo(r)>=0&&await function(s,o){let a=s.N_._t(o);return a.targetChanges.forEach((c,l)=>{if(c.resumeToken.approximateByteSize()>0){let u=s.v_.get(l);u&&s.v_.set(l,u.withResumeToken(c.resumeToken,o))}}),a.targetMismatches.forEach((c,l)=>{let u=s.v_.get(c);if(!u)return;s.v_.set(c,u.withResumeToken(le.EMPTY_BYTE_STRING,u.snapshotVersion)),Ef(s,c);let h=new yr(u.target,c,l,u.sequenceNumber);fl(s,h)}),s.remoteSyncer.applyRemoteEvent(a)}(n,t)}catch(r){y("RemoteStore","Failed to raise snapshot:",r),await Qi(n,r)}}async function Qi(n,e,t){if(!Tr(e))throw e;n.F_.add(1),await Ar(n),n.O_.set("Offline"),t||(t=()=>_f(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{y("RemoteStore","Retrying IndexedDB access"),await t(),n.F_.delete(1),await ms(n)})}function bf(n,e){return e().catch(t=>Qi(n,t,e))}async function ps(n){let e=C(n),t=dt(e),r=e.C_.length>0?e.C_[e.C_.length-1].batchId:-1;for(;_v(e);)try{let i=await hv(e.localStore,r);if(i===null){e.C_.length===0&&t.e_();break}r=i.batchId,vv(e,i)}catch(i){await Qi(e,i)}Tf(e)&&Af(e)}function _v(n){return Ft(n)&&n.C_.length<10}function vv(n,e){n.C_.push(e);let t=dt(n);t.Yo()&&t.I_&&t.d_(e.mutations)}function Tf(n){return Ft(n)&&!dt(n).Jo()&&n.C_.length>0}function Af(n){dt(n).start()}async function wv(n){dt(n).A_()}async function Ev(n){let e=dt(n);for(let t of n.C_)e.d_(t.mutations)}async function Iv(n,e,t){let r=n.C_.shift(),i=rc.from(r,e,t);await bf(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await ps(n)}async function bv(n,e){e&&dt(n).I_&&await async function(r,i){if(function(o){return B_(o)&&o!==m.ABORTED}(i.code)){let s=r.C_.shift();dt(r).Xo(),await bf(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await ps(r)}}(n,e),Tf(n)&&Af(n)}async function Od(n,e){let t=C(n);t.asyncQueue.verifyOperationInProgress(),y("RemoteStore","RemoteStore received new credentials");let r=Ft(t);t.F_.add(3),await Ar(t),r&&t.O_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.F_.delete(3),await ms(t)}async function Tv(n,e){let t=C(n);e?(t.F_.delete(2),await ms(t)):e||(t.F_.add(2),await Ar(t),t.O_.set("Unknown"))}function Tn(n){return n.B_||(n.B_=function(t,r,i){let s=C(t);return s.V_(),new Mc(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Io:pv.bind(null,n),Eo:gv.bind(null,n),c_:yv.bind(null,n)}),n.M_.push(async e=>{e?(n.B_.Xo(),pl(n)?ml(n):n.O_.set("Unknown")):(await n.B_.stop(),If(n))})),n.B_}function dt(n){return n.L_||(n.L_=function(t,r,i){let s=C(t);return s.V_(),new Fc(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Io:wv.bind(null,n),Eo:bv.bind(null,n),E_:Ev.bind(null,n),T_:Iv.bind(null,n)}),n.M_.push(async e=>{e?(n.L_.Xo(),await ps(n)):(await n.L_.stop(),n.C_.length>0&&(y("RemoteStore",`Stopping write stream with ${n.C_.length} pending writes`),n.C_=[]))})),n.L_}var jc=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Te,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let o=Date.now()+r,a=new n(e,t,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new _(m.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function gl(n,e){if(We("AsyncQueue",`${e}: ${n}`),Tr(n))return new _(m.UNAVAILABLE,`${e}: ${n}`);throw n}var Yi=class n{constructor(e){this.comparator=e?(t,r)=>e(t,r)||E.comparator(t.key,r.key):(t,r)=>E.comparator(t.key,r.key),this.keyedMap=or(),this.sortedSet=new B(this.comparator)}static emptySet(e){return new n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var Xi=class{constructor(){this.k_=new B(E.comparator)}track(e){let t=e.doc.key,r=this.k_.get(t);r?e.type!==0&&r.type===3?this.k_=this.k_.insert(t,e):e.type===3&&r.type!==1?this.k_=this.k_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.k_=this.k_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.k_=this.k_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.k_=this.k_.remove(t):e.type===1&&r.type===2?this.k_=this.k_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.k_=this.k_.insert(t,{type:2,doc:e.doc}):b():this.k_=this.k_.insert(t,e)}q_(){let e=[];return this.k_.inorderTraversal((t,r)=>{e.push(r)}),e}},wn=class n{constructor(e,t,r,i,s,o,a,c,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,i,s){let o=[];return t.forEach(a=>{o.push({type:0,doc:a})}),new n(e,t,Yi.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&hs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var zc=class{constructor(){this.Q_=void 0,this.listeners=[]}},Hc=class{constructor(){this.queries=new ht(e=>Yd(e),hs),this.onlineState="Unknown",this.K_=new Set}};async function Sf(n,e){let t=C(n),r=e.query,i=!1,s=t.queries.get(r);if(s||(i=!0,s=new zc),i)try{s.Q_=await t.onListen(r)}catch(o){let a=gl(o,`Initialization of query '${rn(e.query)}' failed`);return void e.onError(a)}t.queries.set(r,s),s.listeners.push(e),e.U_(t.onlineState),s.Q_&&e.W_(s.Q_)&&yl(t)}async function Cf(n,e){let t=C(n),r=e.query,i=!1,s=t.queries.get(r);if(s){let o=s.listeners.indexOf(e);o>=0&&(s.listeners.splice(o,1),i=s.listeners.length===0)}if(i)return t.queries.delete(r),t.onUnlisten(r)}function Av(n,e){let t=C(n),r=!1;for(let i of e){let s=i.query,o=t.queries.get(s);if(o){for(let a of o.listeners)a.W_(i)&&(r=!0);o.Q_=i}}r&&yl(t)}function Sv(n,e,t){let r=C(n),i=r.queries.get(e);if(i)for(let s of i.listeners)s.onError(t);r.queries.delete(e)}function yl(n){n.K_.forEach(e=>{e.next()})}var Ji=class{constructor(e,t,r){this.query=e,this.G_=t,this.z_=!1,this.j_=null,this.onlineState="Unknown",this.options=r||{}}W_(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new wn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.z_?this.H_(e)&&(this.G_.next(e),t=!0):this.J_(e,this.onlineState)&&(this.Y_(e),t=!0),this.j_=e,t}onError(e){this.G_.error(e)}U_(e){this.onlineState=e;let t=!1;return this.j_&&!this.z_&&this.J_(this.j_,e)&&(this.Y_(this.j_),t=!0),t}J_(e,t){if(!e.fromCache)return!0;let r=t!=="Offline";return(!this.options.Z_||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}H_(e){if(e.docChanges.length>0)return!0;let t=this.j_&&this.j_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Y_(e){e=wn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.z_=!0,this.G_.next(e)}};var Zi=class{constructor(e){this.key=e}},es=class{constructor(e){this.key=e}},Gc=class{constructor(e,t){this.query=e,this.oa=t,this._a=null,this.hasCachedResults=!1,this.current=!1,this.aa=k(),this.mutatedKeys=k(),this.ua=Xd(e),this.ca=new Yi(this.ua)}get la(){return this.oa}ha(e,t){let r=t?t.Pa:new Xi,i=t?t.ca:this.ca,s=t?t.mutatedKeys:this.mutatedKeys,o=i,a=!1,c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,l=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((u,h)=>{let d=i.get(u),f=ds(this.query,h)?h:null,I=!!d&&this.mutatedKeys.has(d.key),T=!!f&&(f.hasLocalMutations||this.mutatedKeys.has(f.key)&&f.hasCommittedMutations),v=!1;d&&f?d.data.isEqual(f.data)?I!==T&&(r.track({type:3,doc:f}),v=!0):this.Ia(d,f)||(r.track({type:2,doc:f}),v=!0,(c&&this.ua(f,c)>0||l&&this.ua(f,l)<0)&&(a=!0)):!d&&f?(r.track({type:0,doc:f}),v=!0):d&&!f&&(r.track({type:1,doc:d}),v=!0,(c||l)&&(a=!0)),v&&(f?(o=o.add(f),s=T?s.add(u):s.delete(u)):(o=o.delete(u),s=s.delete(u)))}),this.query.limit!==null)for(;o.size>this.query.limit;){let u=this.query.limitType==="F"?o.last():o.first();o=o.delete(u.key),s=s.delete(u.key),r.track({type:1,doc:u})}return{ca:o,Pa:r,es:a,mutatedKeys:s}}Ia(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r){let i=this.ca;this.ca=e.ca,this.mutatedKeys=e.mutatedKeys;let s=e.Pa.q_();s.sort((l,u)=>function(d,f){let I=T=>{switch(T){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return b()}};return I(d)-I(f)}(l.type,u.type)||this.ua(l.doc,u.doc)),this.da(r);let o=t?this.Ta():[],a=this.aa.size===0&&this.current?1:0,c=a!==this._a;return this._a=a,s.length!==0||c?{snapshot:new wn(this.query,e.ca,i,s,e.mutatedKeys,a===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ea:o}:{Ea:o}}U_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ca:this.ca,Pa:new Xi,mutatedKeys:this.mutatedKeys,es:!1},!1)):{Ea:[]}}Aa(e){return!this.oa.has(e)&&!!this.ca.has(e)&&!this.ca.get(e).hasLocalMutations}da(e){e&&(e.addedDocuments.forEach(t=>this.oa=this.oa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.oa=this.oa.delete(t)),this.current=e.current)}Ta(){if(!this.current)return[];let e=this.aa;this.aa=k(),this.ca.forEach(r=>{this.Aa(r.key)&&(this.aa=this.aa.add(r.key))});let t=[];return e.forEach(r=>{this.aa.has(r)||t.push(new es(r))}),this.aa.forEach(r=>{e.has(r)||t.push(new Zi(r))}),t}Ra(e){this.oa=e.Ps,this.aa=k();let t=this.ha(e.documents);return this.applyChanges(t,!0)}Va(){return wn.fromInitialDocuments(this.query,this.ca,this.mutatedKeys,this._a===0,this.hasCachedResults)}},$c=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},Kc=class{constructor(e){this.key=e,this.ma=!1}},Wc=class{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.fa={},this.ga=new ht(a=>Yd(a),hs),this.pa=new Map,this.ya=new Set,this.wa=new B(E.comparator),this.Sa=new Map,this.ba=new vr,this.Da={},this.Ca=new Map,this.va=_r.Ln(),this.onlineState="Unknown",this.Fa=void 0}get isPrimaryClient(){return this.Fa===!0}};async function Cv(n,e){let t=Mv(n),r,i,s=t.ga.get(e);if(s)r=s.targetId,t.sharedClientState.addLocalQueryTarget(r),i=s.view.Va();else{let o=await dv(t.localStore,Le(e)),a=t.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,i=await Rv(t,e,r,a==="current",o.resumeToken),t.isPrimaryClient&&vf(t.remoteStore,o)}return i}async function Rv(n,e,t,r,i){n.Ma=(h,d,f)=>async function(T,v,D,L){let O=v.view.ha(D);O.es&&(O=await Ld(T.localStore,v.query,!1).then(({documents:j})=>v.view.ha(j,O)));let z=L&&L.targetChanges.get(v.targetId),oe=v.view.applyChanges(O,T.isPrimaryClient,z);return Md(T,v.targetId,oe.Ea),oe.snapshot}(n,h,d,f);let s=await Ld(n.localStore,e,!0),o=new Gc(e,s.Ps),a=o.ha(s.documents),c=gr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),l=o.applyChanges(a,n.isPrimaryClient,c);Md(n,t,l.Ea);let u=new $c(e,t,o);return n.ga.set(e,u),n.pa.has(t)?n.pa.get(t).push(e):n.pa.set(t,[e]),l.snapshot}async function kv(n,e){let t=C(n),r=t.ga.get(e),i=t.pa.get(r.targetId);if(i.length>1)return t.pa.set(r.targetId,i.filter(s=>!hs(s,e))),void t.ga.delete(e);t.isPrimaryClient?(t.sharedClientState.removeLocalQueryTarget(r.targetId),t.sharedClientState.isActiveQueryTarget(r.targetId)||await Nc(t.localStore,r.targetId,!1).then(()=>{t.sharedClientState.clearQueryState(r.targetId),wf(t.remoteStore,r.targetId),Qc(t,r.targetId)}).catch(br)):(Qc(t,r.targetId),await Nc(t.localStore,r.targetId,!0))}async function Pv(n,e,t){let r=Fv(n);try{let i=await function(o,a){let c=C(o),l=ee.now(),u=a.reduce((f,I)=>f.add(I.key),k()),h,d;return c.persistence.runTransaction("Locally write mutations","readwrite",f=>{let I=Qe(),T=k();return c._s.getEntries(f,u).next(v=>{I=v,I.forEach((D,L)=>{L.isValidDocument()||(T=T.add(D))})}).next(()=>c.localDocuments.getOverlayedDocuments(f,I)).next(v=>{h=v;let D=[];for(let L of a){let O=q_(L,h.get(L.key).overlayedDocument);O!=null&&D.push(new Ye(L.key,O,Hd(O.value.mapValue),at.exists(!0)))}return c.mutationQueue.addMutationBatch(f,l,D,a)}).next(v=>{d=v;let D=v.applyToLocalDocumentSet(h,T);return c.documentOverlayCache.saveOverlays(f,v.batchId,D)})}).then(()=>({batchId:d.batchId,changes:Zd(h)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,a,c){let l=o.Da[o.currentUser.toKey()];l||(l=new B(N)),l=l.insert(a,c),o.Da[o.currentUser.toKey()]=l}(r,i.batchId,t),await Sr(r,i.changes),await ps(r.remoteStore)}catch(i){let s=gl(i,"Failed to persist write");t.reject(s)}}async function Rf(n,e){let t=C(n);try{let r=await lv(t.localStore,e);e.targetChanges.forEach((i,s)=>{let o=t.Sa.get(s);o&&(M(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.ma=!0:i.modifiedDocuments.size>0?M(o.ma):i.removedDocuments.size>0&&(M(o.ma),o.ma=!1))}),await Sr(t,r,e)}catch(r){await br(r)}}function Vd(n,e,t){let r=C(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.ga.forEach((s,o)=>{let a=o.view.U_(e);a.snapshot&&i.push(a.snapshot)}),function(o,a){let c=C(o);c.onlineState=a;let l=!1;c.queries.forEach((u,h)=>{for(let d of h.listeners)d.U_(a)&&(l=!0)}),l&&yl(c)}(r.eventManager,e),i.length&&r.fa.c_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Dv(n,e,t){let r=C(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Sa.get(e),s=i&&i.key;if(s){let o=new B(E.comparator);o=o.insert(s,Ae.newNoDocument(s,S.min()));let a=k().add(s),c=new Ui(S.min(),new Map,new B(N),o,a);await Rf(r,c),r.wa=r.wa.remove(s),r.Sa.delete(e),_l(r)}else await Nc(r.localStore,e,!1).then(()=>Qc(r,e,t)).catch(br)}async function Nv(n,e){let t=C(n),r=e.batch.batchId;try{let i=await cv(t.localStore,e);Pf(t,r,null),kf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Sr(t,i)}catch(i){await br(i)}}async function xv(n,e,t){let r=C(n);try{let i=await function(o,a){let c=C(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let u;return c.mutationQueue.lookupMutationBatch(l,a).next(h=>(M(h!==null),u=h.keys(),c.mutationQueue.removeMutationBatch(l,h))).next(()=>c.mutationQueue.performConsistencyCheck(l)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(l,u,a)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,u)).next(()=>c.localDocuments.getDocuments(l,u))})}(r.localStore,e);Pf(r,e,t),kf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Sr(r,i)}catch(i){await br(i)}}function kf(n,e){(n.Ca.get(e)||[]).forEach(t=>{t.resolve()}),n.Ca.delete(e)}function Pf(n,e,t){let r=C(n),i=r.Da[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Da[r.currentUser.toKey()]=i}}function Qc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.pa.get(e))n.ga.delete(r),t&&n.fa.xa(r,t);n.pa.delete(e),n.isPrimaryClient&&n.ba.mr(e).forEach(r=>{n.ba.containsKey(r)||Df(n,r)})}function Df(n,e){n.ya.delete(e.path.canonicalString());let t=n.wa.get(e);t!==null&&(wf(n.remoteStore,t),n.wa=n.wa.remove(e),n.Sa.delete(t),_l(n))}function Md(n,e,t){for(let r of t)r instanceof Zi?(n.ba.addReference(r.key,e),Lv(n,r)):r instanceof es?(y("SyncEngine","Document no longer in limbo: "+r.key),n.ba.removeReference(r.key,e),n.ba.containsKey(r.key)||Df(n,r.key)):b()}function Lv(n,e){let t=e.key,r=t.path.canonicalString();n.wa.get(t)||n.ya.has(r)||(y("SyncEngine","New document in limbo: "+t),n.ya.add(r),_l(n))}function _l(n){for(;n.ya.size>0&&n.wa.size<n.maxConcurrentLimboResolutions;){let e=n.ya.values().next().value;n.ya.delete(e);let t=new E(q.fromString(e)),r=n.va.next();n.Sa.set(r,new Kc(t)),n.wa=n.wa.insert(t,r),vf(n.remoteStore,new yr(Le(hl(t.path)),r,"TargetPurposeLimboResolution",hr.ae))}}async function Sr(n,e,t){let r=C(n),i=[],s=[],o=[];r.ga.isEmpty()||(r.ga.forEach((a,c)=>{o.push(r.Ma(c,e,t).then(l=>{if((l||t)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(c.targetId,l?.fromCache?"not-current":"current"),l){i.push(l);let u=Rc.$i(c.targetId,l);s.push(u)}}))}),await Promise.all(o),r.fa.c_(i),await async function(c,l){let u=C(c);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",h=>p.forEach(l,d=>p.forEach(d.Qi,f=>u.persistence.referenceDelegate.addReference(h,d.targetId,f)).next(()=>p.forEach(d.Ki,f=>u.persistence.referenceDelegate.removeReference(h,d.targetId,f)))))}catch(h){if(!Tr(h))throw h;y("LocalStore","Failed to update sequence numbers: "+h)}for(let h of l){let d=h.targetId;if(!h.fromCache){let f=u.rs.get(d),I=f.snapshotVersion,T=f.withLastLimboFreeSnapshotVersion(I);u.rs=u.rs.insert(d,T)}}}(r.localStore,s))}async function Ov(n,e){let t=C(n);if(!t.currentUser.isEqual(e)){y("SyncEngine","User change. New user:",e.toKey());let r=await yf(t.localStore,e);t.currentUser=e,function(s,o){s.Ca.forEach(a=>{a.forEach(c=>{c.reject(new _(m.CANCELLED,o))})}),s.Ca.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Sr(t,r.cs)}}function Vv(n,e){let t=C(n),r=t.Sa.get(e);if(r&&r.ma)return k().add(r.key);{let i=k(),s=t.pa.get(e);if(!s)return i;for(let o of s){let a=t.ga.get(o);i=i.unionWith(a.view.la)}return i}}function Mv(n){let e=C(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Rf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Vv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Dv.bind(null,e),e.fa.c_=Av.bind(null,e.eventManager),e.fa.xa=Sv.bind(null,e.eventManager),e}function Fv(n){let e=C(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Nv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=xv.bind(null,e),e}var ts=class{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=fs(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return av(this.persistence,new Pc,e.initialUser,this.serializer)}createPersistence(e){return new Ac(Cc.Jr,this.serializer)}createSharedClientState(e){return new xc}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}};var Yc=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Vd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Ov.bind(null,this.syncEngine),await Tv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Hc}()}createDatastore(e){let t=fs(e.databaseInfo.databaseId),r=function(s){return new Vc(s)}(e.databaseInfo);return function(s,o,a,c){return new Uc(s,o,a,c)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,a){return new Bc(r,i,s,o,a)}(this.localStore,this.datastore,e.asyncQueue,t=>Vd(this.syncEngine,t,0),function(){return $i.C()?new $i:new Lc}())}createSyncEngine(e,t){return function(i,s,o,a,c,l,u){let h=new Wc(i,s,o,a,c,l);return u&&(h.Fa=!0),h}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(t){let r=C(t);y("RemoteStore","RemoteStore shutting down."),r.F_.add(5),await Ar(r),r.x_.shutdown(),r.O_.set("Unknown")}(this.remoteStore)}};var ns=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ba(this.observer.next,e)}error(e){this.observer.error?this.Ba(this.observer.error,e):We("Uncaught Error in snapshot listener:",e.toString())}La(){this.muted=!0}Ba(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}};var Xc=class{constructor(e,t,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=X.UNAUTHENTICATED,this.clientId=xi.V(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async s=>{y("FirestoreClient","Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(r,s=>(y("FirestoreClient","Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new _(m.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Te;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=gl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Pa(n,e){n.asyncQueue.verifyOperationInProgress(),y("FirestoreClient","Initializing OfflineComponentProvider");let t=await n.getConfiguration();await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await yf(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Fd(n,e){n.asyncQueue.verifyOperationInProgress();let t=await qv(n);y("FirestoreClient","Initializing OnlineComponentProvider");let r=await n.getConfiguration();await e.initialize(t,r),n.setCredentialChangeListener(i=>Od(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,s)=>Od(e.remoteStore,s)),n._onlineComponents=e}function Uv(n){return n.name==="FirebaseError"?n.code===m.FAILED_PRECONDITION||n.code===m.UNIMPLEMENTED:!(typeof DOMException<"u"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function qv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){y("FirestoreClient","Using user provided OfflineComponentProvider");try{await Pa(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!Uv(t))throw t;un("Error using user provided cache. Falling back to memory cache: "+t),await Pa(n,new ts)}}else y("FirestoreClient","Using default OfflineComponentProvider"),await Pa(n,new ts);return n._offlineComponents}async function Nf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(y("FirestoreClient","Using user provided OnlineComponentProvider"),await Fd(n,n._uninitializedComponentsProvider._online)):(y("FirestoreClient","Using default OnlineComponentProvider"),await Fd(n,new Yc))),n._onlineComponents}function Bv(n){return Nf(n).then(e=>e.syncEngine)}async function xf(n){let e=await Nf(n),t=e.eventManager;return t.onListen=Cv.bind(null,e.syncEngine),t.onUnlisten=kv.bind(null,e.syncEngine),t}function jv(n,e,t={}){let r=new Te;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,a,c,l){let u=new ns({next:d=>{o.enqueueAndForget(()=>Cf(s,h));let f=d.docs.has(a);!f&&d.fromCache?l.reject(new _(m.UNAVAILABLE,"Failed to get document because the client is offline.")):f&&d.fromCache&&c&&c.source==="server"?l.reject(new _(m.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(d)},error:d=>l.reject(d)}),h=new Ji(hl(a.path),u,{includeMetadataChanges:!0,Z_:!0});return Sf(s,h)}(await xf(n),n.asyncQueue,e,t,r)),r.promise}function zv(n,e,t={}){let r=new Te;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,a,c,l){let u=new ns({next:d=>{o.enqueueAndForget(()=>Cf(s,h)),d.fromCache&&c.source==="server"?l.reject(new _(m.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(d)},error:d=>l.reject(d)}),h=new Ji(a,u,{includeMetadataChanges:!0,Z_:!0});return Sf(s,h)}(await xf(n),n.asyncQueue,e,t,r)),r.promise}function Lf(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Ud=new Map;function Of(n,e,t){if(!t)throw new _(m.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Hv(n,e,t,r){if(e===!0&&r===!0)throw new _(m.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function qd(n){if(!E.isDocumentKey(n))throw new _(m.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Bd(n){if(E.isDocumentKey(n))throw new _(m.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function vl(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":b()}function ft(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new _(m.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=vl(n);throw new _(m.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}var rs=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new _(m.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new _(m.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Hv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Lf((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new _(m.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new _(m.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new _(m.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},En=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new rs({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new _(m.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new _(m.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new rs(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Da;switch(r.type){case"firstParty":return new Oa(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new _(m.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=Ud.get(t);r&&(y("ComponentProvider","Removing Datastore"),Ud.delete(t),r.terminate())}(this),Promise.resolve()}};function Gv(n,e,t,r={}){var i;let s=(n=ft(n,En))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&un("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,c;if(typeof r.mockUserToken=="string")a=r.mockUserToken,c=X.MOCK_USER;else{a=Ru(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let l=r.mockUserToken.sub||r.mockUserToken.user_id;if(!l)throw new _(m.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new X(l)}n._authCredentials=new Na(new Ni(a,c))}}var is=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},fe=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ct(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},ct=class n extends is{constructor(e,t,r){super(e,t,hl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new fe(this.firestore,null,new E(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function Vf(n,e,...t){if(n=ne(n),Of("collection","path",e),n instanceof En){let r=q.fromString(e,...t);return Bd(r),new ct(n,null,r)}{if(!(n instanceof fe||n instanceof ct))throw new _(m.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(q.fromString(e,...t));return Bd(r),new ct(n.firestore,null,r)}}function Mf(n,e,...t){if(n=ne(n),arguments.length===1&&(e=xi.V()),Of("doc","path",e),n instanceof En){let r=q.fromString(e,...t);return qd(r),new fe(n,null,new E(r))}{if(!(n instanceof fe||n instanceof ct))throw new _(m.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(q.fromString(e,...t));return qd(r),new fe(n.firestore,n instanceof ct?n.converter:null,new E(r))}}var Jc=class{constructor(){this.Za=Promise.resolve(),this.Xa=[],this.eu=!1,this.tu=[],this.nu=null,this.ru=!1,this.iu=!1,this.su=[],this.Ho=new Ki(this,"async_queue_retry"),this.ou=()=>{let t=ka();t&&y("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Ho.$o()};let e=ka();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.ou)}get isShuttingDown(){return this.eu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this._u(),this.au(e)}enterRestrictedMode(e){if(!this.eu){this.eu=!0,this.iu=e||!1;let t=ka();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.ou)}}enqueue(e){if(this._u(),this.eu)return new Promise(()=>{});let t=new Te;return this.au(()=>this.eu&&this.iu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xa.push(e),this.uu()))}async uu(){if(this.Xa.length!==0){try{await this.Xa[0](),this.Xa.shift(),this.Ho.reset()}catch(e){if(!Tr(e))throw e;y("AsyncQueue","Operation failed with retryable error: "+e)}this.Xa.length>0&&this.Ho.Qo(()=>this.uu())}}au(e){let t=this.Za.then(()=>(this.ru=!0,e().catch(r=>{this.nu=r,this.ru=!1;let i=function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a}(r);throw We("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.ru=!1,r))));return this.Za=t,t}enqueueAfterDelay(e,t,r){this._u(),this.su.indexOf(e)>-1&&(t=0);let i=jc.createAndSchedule(this,e,t,r,s=>this.cu(s));return this.tu.push(i),i}_u(){this.nu&&b()}verifyOperationInProgress(){}async lu(){let e;do e=this.Za,await e;while(e!==this.Za)}hu(e){for(let t of this.tu)if(t.timerId===e)return!0;return!1}Pu(e){return this.lu().then(()=>{this.tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.lu()})}Iu(e){this.su.push(e)}cu(e){let t=this.tu.indexOf(e);this.tu.splice(t,1)}};var Mt=class extends En{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=function(){return new Jc}(),this._persistenceKey=i?.name||"[DEFAULT]"}_terminate(){return this._firestoreClient||Ff(this),this._firestoreClient.terminate()}};function wl(n,e){let t=typeof n=="object"?n:Xr(),r=typeof n=="string"?n:e||"(default)",i=On(t,"firestore").getImmediate({identifier:r});if(!i._initialized){let s=Cu("firestore");s&&Gv(i,...s)}return i}function El(n){return n._firestoreClient||Ff(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function Ff(n){var e,t,r;let i=n._freezeSettings(),s=function(a,c,l,u){return new qa(a,c,l,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,Lf(u.experimentalLongPollingOptions),u.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._firestoreClient=new Xc(n._authCredentials,n._appCheckCredentials,n._queue,s),!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.localCache.kind,_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider})}var wr=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(le.fromBase64String(e))}catch(t){throw new _(m.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(le.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var Er=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new _(m.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ye(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var ss=class{constructor(e){this._methodName=e}};var Ir=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new _(m.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new _(m.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return N(this._lat,e._lat)||N(this._long,e._long)}};var $v=/^__.*__$/,Zc=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ye(e,this.data,this.fieldMask,t,this.fieldTransforms):new Vt(e,this.data,t,this.fieldTransforms)}};function Uf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw b()}}var el=class n{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.du(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Tu(){return this.settings.Tu}Eu(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Au(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Eu({path:r,Ru:!1});return i.Vu(e),i}mu(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Eu({path:r,Ru:!1});return i.du(),i}fu(e){return this.Eu({path:void 0,Ru:!0})}gu(e){return os(e,this.settings.methodName,this.settings.pu||!1,this.path,this.settings.yu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}du(){if(this.path)for(let e=0;e<this.path.length;e++)this.Vu(this.path.get(e))}Vu(e){if(e.length===0)throw this.gu("Document fields must not be empty");if(Uf(this.Tu)&&$v.test(e))throw this.gu('Document fields cannot begin and end with "__"')}},tl=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||fs(e)}wu(e,t,r,i=!1){return new el({Tu:e,methodName:t,yu:r,path:ye.emptyPath(),Ru:!1,pu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Kv(n){let e=n._freezeSettings(),t=fs(n._databaseId);return new tl(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Wv(n,e,t,r,i,s={}){let o=n.wu(s.merge||s.mergeFields?2:0,e,t,i);zf("Data must be an object, but it was:",o,r);let a=Bf(r,o),c,l;if(s.merge)c=new Ne(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){let u=[];for(let h of s.mergeFields){let d=Qv(e,h,t);if(!o.contains(d))throw new _(m.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);Xv(u,d)||u.push(d)}c=new Ne(u),l=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,l=o.fieldTransforms;return new Zc(new be(a),c,l)}function qf(n,e){if(jf(n=ne(n)))return zf("Unsupported field value:",e,n),Bf(n,e);if(n instanceof ss)return function(r,i){if(!Uf(i.Tu))throw i.gu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.gu(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Ru&&e.Tu!==4)throw e.gu("Nested arrays are not supported");return function(r,i){let s=[],o=0;for(let a of r){let c=qf(a,i.fu(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=ne(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return O_(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=ee.fromDate(r);return{timestampValue:zi(i.serializer,s)}}if(r instanceof ee){let s=new ee(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:zi(i.serializer,s)}}if(r instanceof Ir)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof wr)return{bytesValue:hf(i.serializer,r._byteString)};if(r instanceof fe){let s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.gu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:dl(r.firestore._databaseId||i.databaseId,r._key.path)}}throw i.gu(`Unsupported field value: ${vl(r)}`)}(n,e)}function Bf(n,e){let t={};return jd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):bn(n,(r,i)=>{let s=qf(i,e.Au(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function jf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ee||n instanceof Ir||n instanceof wr||n instanceof fe||n instanceof ss)}function zf(n,e,t){if(!jf(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=vl(t);throw r==="an object"?e.gu(n+" a custom object"):e.gu(n+" "+r)}}function Qv(n,e,t){if((e=ne(e))instanceof Er)return e._internalPath;if(typeof e=="string")return Hf(n,e);throw os("Field path arguments must be of type string or ",n,!1,void 0,t)}var Yv=new RegExp("[~\\*/\\[\\]]");function Hf(n,e,t){if(e.search(Yv)>=0)throw os(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Er(...e.split("."))._internalPath}catch{throw os(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function os(n,e,t,r,i){let s=r&&!r.isEmpty(),o=i!==void 0,a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new _(m.INVALID_ARGUMENT,a+n+c)}function Xv(n,e){return n.some(t=>t.isEqual(e))}var as=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new fe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new nl(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(Gf("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},nl=class extends as{data(){return super.data()}};function Gf(n,e){return typeof e=="string"?Hf(n,e):e instanceof Er?e._internalPath:e._delegate._internalPath}function Jv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new _(m.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var rl=class{convertValue(e,t="none"){switch(xt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return U(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ut(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw b()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return bn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertGeoPoint(e){return new Ir(U(e.latitude),U(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=al(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(fr(e));default:return null}}convertTimestamp(e){let t=lt(e);return new ee(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=q.fromString(e);M(gf(r));let i=new Mi(r.get(1),r.get(3)),s=new E(r.popFirst(5));return i.isEqual(t)||We(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function Zv(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var kt=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},cs=class extends as{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new ln(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(Gf("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}},ln=class extends cs{data(e={}){return super.data(e)}},il=class{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new kt(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new ln(this._firestore,this._userDataWriter,r.key,r,new kt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new _(m.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(a=>{let c=new ln(i._firestore,i._userDataWriter,a.doc.key,a.doc,new kt(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(a=>s||a.type!==3).map(a=>{let c=new ln(i._firestore,i._userDataWriter,a.doc.key,a.doc,new kt(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter),l=-1,u=-1;return a.type!==0&&(l=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),u=o.indexOf(a.doc.key)),{type:ew(a.type),doc:c,oldIndex:l,newIndex:u}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function ew(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return b()}}function $f(n){n=ft(n,fe);let e=ft(n.firestore,Mt);return jv(El(e),n._key).then(t=>tw(e,n,t))}var ls=class extends rl{constructor(e){super(),this.firestore=e}convertBytes(e){return new wr(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new fe(this.firestore,null,t)}};function Kf(n){n=ft(n,is);let e=ft(n.firestore,Mt),t=El(e),r=new ls(e);return Jv(n._query),zv(t,n._query).then(i=>new il(e,r,n,i))}function Wf(n,e,t){n=ft(n,fe);let r=ft(n.firestore,Mt),i=Zv(n.converter,e,t);return Yf(r,[Wv(Kv(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,at.none())])}function Qf(n){return Yf(ft(n.firestore,Mt),[new pr(n._key,at.none())])}function Yf(n,e){return function(r,i){let s=new Te;return r.asyncQueue.enqueueAndForget(async()=>Pv(await Bv(r),i,s)),s.promise}(El(n),e)}function tw(n,e,t){let r=t.docs.get(e._key),i=new ls(n);return new cs(n,i,e._key,r,new kt(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(i){In=i})(it),rt(new pe("firestore",(r,{instanceIdentifier:i,options:s})=>{let o=r.getProvider("app").getImmediate(),a=new Mt(new xa(r.getProvider("auth-internal")),new Ma(r.getProvider("app-check-internal")),function(l,u){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new _(m.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Mi(l.options.projectId,u)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),a._setSettings(s),a},"PUBLIC").setMultipleInstances(!0)),we(pd,"4.1.3",e),we(pd,"4.1.3","esm2017")})();var nw="firebase",rw="10.3.1";we(nw,rw,"app");var Il={};var Xf=function(){if(!Il.apiKey)throw Error("Firebase config is not setup.");Vo(Il)};function gs(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Jf(n){return n!==void 0&&n.enterprise!==void 0}var Sl=class{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(t=>t.provider==="EMAIL_PASSWORD_PROVIDER"&&t.enforcementState!=="OFF")}};function fm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var mm=fm,pm=new Ge("auth","Firebase",fm());var Is=new tt("@firebase/auth");function iw(n,...e){Is.logLevel<=R.WARN&&Is.warn(`Auth (${it}): ${n}`,...e)}function _s(n,...e){Is.logLevel<=R.ERROR&&Is.error(`Auth (${it}): ${n}`,...e)}function _e(n,...e){throw Hl(n,...e)}function Ue(n,...e){return Hl(n,...e)}function gm(n,e,t){let r=Object.assign(Object.assign({},mm()),{[e]:t});return new Ge("auth","Firebase",r).create(e,{appName:n.name})}function sw(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&_e(n,"argument-error"),gm(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Hl(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return pm.create(n,...e)}function w(n,e,...t){if(!n)throw Hl(e,...t)}function Fe(n){let e="INTERNAL ASSERTION FAILED: "+n;throw _s(e),new Error(e)}function Je(n,e){n||Fe(e)}function Cl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function ow(){return Zf()==="http:"||Zf()==="https:"}function Zf(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function aw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ow()||Pu()||"connection"in navigator)?navigator.onLine:!0}function cw(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Ut=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,Je(t>e,"Short delay should be less than long delay!"),this.isMobile=ku()||Du()}get(){return aw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Gl(n,e){Je(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var bs=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Fe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Fe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Fe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var lw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var uw=new Ut(3e4,6e4);function te(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function ue(n,e,t,r,i={}){return ym(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});let a=Wt(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode),bs.fetch()(_m(n,n.config.apiHost,t,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},s))})}async function ym(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},lw),e);try{let i=new Rl(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw Cr(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Cr(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Cr(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Cr(n,"user-disabled",o);let u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw gm(n,u,l);_e(n,u)}}catch(i){if(i instanceof he)throw i;_e(n,"network-request-failed",{message:String(i)})}}async function Gt(n,e,t,r,i={}){let s=await ue(n,e,t,r,i);return"mfaPendingCredential"in s&&_e(n,"multi-factor-auth-required",{_serverResponse:s}),s}function _m(n,e,t,r){let i=`${e}${t}?${r}`;return n.config.emulator?Gl(n.config,i):`${n.config.apiScheme}://${i}`}var Rl=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ue(this.auth,"network-request-failed")),uw.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function Cr(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=Ue(n,e,r);return i.customData._tokenResponse=t,i}async function hw(n,e){return ue(n,"GET","/v2/recaptchaConfig",te(n,e))}async function dw(n,e){return ue(n,"POST","/v1/accounts:delete",e)}async function fw(n,e){return ue(n,"POST","/v1/accounts:lookup",e)}function Rr(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function vm(n,e=!1){let t=ne(n),r=await t.getIdToken(e),i=$l(r);w(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Rr(bl(i.auth_time)),issuedAtTime:Rr(bl(i.iat)),expirationTime:Rr(bl(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function bl(n){return Number(n)*1e3}function $l(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return _s("JWT malformed, contained fewer than 3 sections"),null;try{let i=go(t);return i?JSON.parse(i):(_s("Failed to decode base64 JWT payload"),null)}catch(i){return _s("Caught error parsing JWT payload as JSON",i?.toString()),null}}function mw(n){let e=$l(n);return w(e,"internal-error"),w(typeof e.exp<"u","internal-error"),w(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function kr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof he&&pw(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function pw({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var kl=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var Ts=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Rr(this.lastLoginAt),this.creationTime=Rr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function As(n){var e;let t=n.auth,r=await n.getIdToken(),i=await kr(n,fw(t,{idToken:r}));w(i?.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?yw(s.providerUserInfo):[],a=gw(n.providerData,o),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!a?.length,u=c?l:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ts(s.createdAt,s.lastLoginAt),isAnonymous:u};Object.assign(n,h)}async function wm(n){let e=ne(n);await As(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function gw(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function yw(n){return n.map(e=>{var{providerId:t}=e,r=gs(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function _w(n,e){let t=await ym(n,{},async()=>{let r=Wt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=_m(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",bs.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}var Ss=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){w(e.idToken,"internal-error"),w(typeof e.idToken<"u","internal-error"),w(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):mw(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return w(!this.accessToken||this.refreshToken,e,"user-token-expired"),!t&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await _w(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new n;return r&&(w(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(w(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(w(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Fe("not implemented")}};function mt(n,e){w(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var Pr=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=gs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new kl(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ts(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await kr(this,this.stsTokenManager.getToken(this.auth,e));return w(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return vm(this,e)}reload(){return wm(this)}_assign(e){this!==e&&(w(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){w(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await As(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){let e=await this.getIdToken();return await kr(this,dw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,c,l,u;let h=(r=t.displayName)!==null&&r!==void 0?r:void 0,d=(i=t.email)!==null&&i!==void 0?i:void 0,f=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,I=(o=t.photoURL)!==null&&o!==void 0?o:void 0,T=(a=t.tenantId)!==null&&a!==void 0?a:void 0,v=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,D=(l=t.createdAt)!==null&&l!==void 0?l:void 0,L=(u=t.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:O,emailVerified:z,isAnonymous:oe,providerData:j,stsTokenManager:ve}=t;w(O&&ve,e,"internal-error");let Se=Ss.fromJSON(this.name,ve);w(typeof O=="string",e,"internal-error"),mt(h,e.name),mt(d,e.name),w(typeof z=="boolean",e,"internal-error"),w(typeof oe=="boolean",e,"internal-error"),mt(f,e.name),mt(I,e.name),mt(T,e.name),mt(v,e.name),mt(D,e.name),mt(L,e.name);let Be=new n({uid:O,auth:e,email:d,emailVerified:z,displayName:h,isAnonymous:oe,photoURL:I,phoneNumber:f,tenantId:T,stsTokenManager:Se,createdAt:D,lastLoginAt:L});return j&&Array.isArray(j)&&(Be.providerData=j.map(et=>Object.assign({},et))),v&&(Be._redirectEventId=v),Be}static async _fromIdTokenResponse(e,t,r=!1){let i=new Ss;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await As(s),s}};var em=new Map;function Xe(n){Je(n instanceof Function,"Expected a class definition");let e=em.get(n);return e?(Je(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,em.set(n,e),e)}var Cs=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Cs.type="NONE";var Pl=Cs;function vs(n,e,t){return`firebase:${n}:${e}:${t}`}var Rs=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=vs(this.userKey,i.apiKey,s),this.fullPersistenceKey=vs("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?Pr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(Xe(Pl),e,r);let i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l),s=i[0]||Xe(Pl),o=vs(r,e.config.apiKey,e.name),a=null;for(let l of t)try{let u=await l._get(o);if(u){let h=Pr._fromJSON(e,u);l!==s&&(a=h),s=l;break}}catch{}let c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new n(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new n(s,e,r))}};function tm(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(bm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Em(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Am(e))return"Blackberry";if(Sm(e))return"Webos";if(Kl(e))return"Safari";if((e.includes("chrome/")||Im(e))&&!e.includes("edge/"))return"Chrome";if(Tm(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Em(n=W()){return/firefox\//i.test(n)}function Kl(n=W()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Im(n=W()){return/crios\//i.test(n)}function bm(n=W()){return/iemobile/i.test(n)}function Tm(n=W()){return/android/i.test(n)}function Am(n=W()){return/blackberry/i.test(n)}function Sm(n=W()){return/webos/i.test(n)}function Gs(n=W()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function vw(n=W()){var e;return Gs(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ww(){return Nu()&&document.documentMode===10}function Cm(n=W()){return Gs(n)||Tm(n)||Sm(n)||Am(n)||/windows phone/i.test(n)||bm(n)}function Ew(){try{return!!(window&&window!==window.top)}catch{return!1}}function Rm(n,e=[]){let t;switch(n){case"Browser":t=tm(W());break;case"Worker":t=`${tm(W())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${it}/${r}`}var Dl=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((o,a)=>{try{let c=e(s);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function Iw(n,e={}){return ue(n,"GET","/v2/passwordPolicy",te(n,e))}var bw=6,Nl=class{constructor(e){var t,r,i,s;let o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:bw,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,a;let c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var xl=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ks(this),this.idTokenSubscription=new ks(this),this.beforeStateQueue=new Dl(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=pm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Xe(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Rs.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var t;let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i?._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&c?.user&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return w(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await As(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=cw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){let t=e?ne(e):null;return t&&w(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&w(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Xe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await Iw(this),t=new Nl(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ge("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&Xe(e)||this._popupRedirectResolver;w(t,this,"argument-error"),this.redirectPersistenceManager=await Rs.create(this,[Xe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(w(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){let c=e.addObserver(t,r,i);return()=>{o=!0,c()}}else{let c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return w(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Rm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&iw(`Error while retrieving App Check token: ${t.error}`),t?.token}};function Cn(n){return ne(n)}var ks=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ou(t=>this.observer=t)}get next(){return w(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};function Tw(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}function km(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=Ue("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Tw().appendChild(r)})}function Pm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var Aw="https://www.google.com/recaptcha/enterprise.js?render=",Sw="recaptcha-enterprise",Cw="NO_RECAPTCHA",Ll=class{constructor(e){this.type=Sw,this.auth=Cn(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{hw(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{let l=new Sl(c);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){let c=window.grecaptcha;Jf(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(Cw)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!t&&Jf(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}km(Aw+a).then(()=>{i(a,s,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}};async function nm(n,e,t,r=!1){let i=new Ll(n),s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}let o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}function Dm(n,e){let t=On(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(vt(s,e??{}))return i;_e(i,"already-initialized")}return t.initialize({options:e})}function Rw(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Xe);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Nm(n,e,t){let r=Cn(n);w(r._canInitEmulator,r,"emulator-config-failed"),w(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!t?.disableWarnings,s=xm(e),{host:o,port:a}=kw(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Pw()}function xm(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function kw(n){let e=xm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:rm(r.substr(s.length+1))}}else{let[s,o]=r.split(":");return{host:s,port:rm(o)}}}function rm(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function Pw(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var qt=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Fe("not implemented")}_getIdTokenResponse(e){return Fe("not implemented")}_linkToIdToken(e,t){return Fe("not implemented")}_getReauthenticationResolver(e){return Fe("not implemented")}};async function Dw(n,e){return ue(n,"POST","/v1/accounts:update",e)}async function Tl(n,e){return Gt(n,"POST","/v1/accounts:signInWithPassword",te(n,e))}async function Nw(n,e){return Gt(n,"POST","/v1/accounts:signInWithEmailLink",te(n,e))}async function xw(n,e){return Gt(n,"POST","/v1/accounts:signInWithEmailLink",te(n,e))}var Dr=class n extends qt{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){var t;switch(this.signInMethod){case"password":let r={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((t=e._getRecaptchaConfig())===null||t===void 0)&&t.emailPasswordEnabled){let i=await nm(e,r,"signInWithPassword");return Tl(e,i)}else return Tl(e,r).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");let s=await nm(e,r,"signInWithPassword");return Tl(e,s)}else return Promise.reject(i)});case"emailLink":return Nw(e,{email:this._email,oobCode:this._password});default:_e(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Dw(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return xw(e,{idToken:t,email:this._email,oobCode:this._password});default:_e(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function An(n,e){return Gt(n,"POST","/v1/accounts:signInWithIdp",te(n,e))}var Lw="http://localhost",Bt=class n extends qt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):_e("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=gs(t,["providerId","signInMethod"]);if(!r||!i)return null;let o=new n(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return An(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,An(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,An(e,t)}buildRequest(){let e={requestUri:Lw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Wt(t)}return e}};async function Ow(n,e){return ue(n,"POST","/v1/accounts:sendVerificationCode",te(n,e))}async function Vw(n,e){return Gt(n,"POST","/v1/accounts:signInWithPhoneNumber",te(n,e))}async function Mw(n,e){let t=await Gt(n,"POST","/v1/accounts:signInWithPhoneNumber",te(n,e));if(t.temporaryProof)throw Cr(n,"account-exists-with-different-credential",t);return t}var Fw={USER_NOT_FOUND:"user-not-found"};async function Uw(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Gt(n,"POST","/v1/accounts:signInWithPhoneNumber",te(n,t),Fw)}var Nr=class n extends qt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Vw(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Mw(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Uw(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function qw(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Bw(n){let e=Qt(Yt(n)).link,t=e?Qt(Yt(e)).deep_link_id:null,r=Qt(Yt(n)).deep_link_id;return(r?Qt(Yt(r)).link:null)||r||t||e||n}var Ps=class n{constructor(e){var t,r,i,s,o,a;let c=Qt(Yt(e)),l=(t=c.apiKey)!==null&&t!==void 0?t:null,u=(r=c.oobCode)!==null&&r!==void 0?r:null,h=qw((i=c.mode)!==null&&i!==void 0?i:null);w(l&&u&&h,"argument-error"),this.apiKey=l,this.operation=h,this.code=u,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){let t=Bw(e);try{return new n(t)}catch{return null}}};var Sn=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Dr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Ps.parseLink(t);return w(r,"argument-error"),Dr._fromEmailAndCode(e,r.code,r.tenantId)}};Sn.PROVIDER_ID="password";Sn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Sn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var xr=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var jt=class extends xr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Lr=class n extends jt{constructor(){super("facebook.com")}static credential(e){return Bt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Lr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Lr.PROVIDER_ID="facebook.com";var zt=class n extends jt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Bt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};zt.GOOGLE_SIGN_IN_METHOD="google.com";zt.PROVIDER_ID="google.com";var Or=class n extends jt{constructor(){super("github.com")}static credential(e){return Bt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Or.GITHUB_SIGN_IN_METHOD="github.com";Or.PROVIDER_ID="github.com";var Vr=class n extends jt{constructor(){super("twitter.com")}static credential(e,t){return Bt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Vr.TWITTER_SIGN_IN_METHOD="twitter.com";Vr.PROVIDER_ID="twitter.com";var Mr=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await Pr._fromIdTokenResponse(e,r,i),o=im(r);return new n({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=im(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function im(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var Ol=class n extends he{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function Lm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ol._fromErrorAndOperation(n,s,e,r):s})}async function jw(n,e,t=!1){let r=await kr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Mr._forOperation(n,"link",r)}async function zw(n,e,t=!1){let{auth:r}=n,i="reauthenticate";try{let s=await kr(n,Lm(r,i,e,n),t);w(s.idToken,r,"internal-error");let o=$l(s.idToken);w(o,r,"internal-error");let{sub:a}=o;return w(n.uid===a,r,"user-mismatch"),Mr._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&_e(r,"user-mismatch"),s}}async function Hw(n,e,t=!1){let r="signIn",i=await Lm(n,r,e),s=await Mr._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}function Om(n,e,t,r){return ne(n).onIdTokenChanged(e,t,r)}function Vm(n,e,t){return ne(n).beforeAuthStateChanged(e,t)}function Wl(n,e,t,r){return ne(n).onAuthStateChanged(e,t,r)}function Ql(n){return ne(n).signOut()}function Gw(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:start",te(n,e))}function $w(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:finalize",te(n,e))}function Kw(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:start",te(n,e))}function Ww(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:finalize",te(n,e))}var Ds="__sak";var Ns=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ds,"1"),this.storage.removeItem(Ds),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};function Qw(){let n=W();return Kl(n)||Gs(n)}var Yw=1e3,Xw=10,xs=class extends Ns{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Qw()&&Ew(),this.fallbackToPolling=Cm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}let r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}let i=()=>{let o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);ww()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Xw):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Yw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};xs.type="LOCAL";var Mm=xs;var Ls=class extends Ns{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Ls.type="SESSION";var Yl=Ls;function Jw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Os=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let a=Array.from(o).map(async l=>l(t.origin,s)),c=await Jw(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Os.receivers=[];function Xl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var Vl=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{let l=Xl("",20);i.port1.start();let u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(h){let d=h;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(d.data.response);break;default:clearTimeout(u),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function qe(){return window}function Zw(n){qe().location.href=n}function Fm(){return typeof qe().WorkerGlobalScope<"u"&&typeof qe().importScripts=="function"}async function eE(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function tE(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function nE(){return Fm()?self:null}var Um="firebaseLocalStorageDb",rE=1,Vs="firebaseLocalStorage",qm="fbase_key",Ht=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function $s(n,e){return n.transaction([Vs],e?"readwrite":"readonly").objectStore(Vs)}function iE(){let n=indexedDB.deleteDatabase(Um);return new Ht(n).toPromise()}function Ml(){let n=indexedDB.open(Um,rE);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(Vs,{keyPath:qm})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(Vs)?e(r):(r.close(),await iE(),e(await Ml()))})})}async function sm(n,e,t){let r=$s(n,!0).put({[qm]:e,value:t});return new Ht(r).toPromise()}async function sE(n,e){let t=$s(n,!1).get(e),r=await new Ht(t).toPromise();return r===void 0?null:r.value}function om(n,e){let t=$s(n,!0).delete(e);return new Ht(t).toPromise()}var oE=800,aE=3,Ms=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ml(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>aE)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Fm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Os._getInstance(nE()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await eE(),!this.activeServiceWorker)return;this.sender=new Vl(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||tE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Ml();return await sm(e,Ds,"1"),await om(e,Ds),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>sm(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>sE(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>om(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=$s(i,!1).getAll();return new Ht(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),oE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Ms.type="LOCAL";var Bm=Ms;function cE(n,e){return ue(n,"POST","/v2/accounts/mfaSignIn:start",te(n,e))}function lE(n,e){return ue(n,"POST","/v2/accounts/mfaSignIn:finalize",te(n,e))}function uE(n,e){return ue(n,"POST","/v2/accounts/mfaSignIn:finalize",te(n,e))}var Tb=Pm("rcb"),Ab=new Ut(3e4,6e4);var hE="recaptcha";async function dE(n,e,t){var r;let i=await t.verify();try{w(typeof i=="string",n,"argument-error"),w(t.type===hE,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let o=s.session;if("phoneNumber"in s)return w(o.type==="enroll",n,"internal-error"),(await Gw(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{w(o.type==="signin",n,"internal-error");let a=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return w(a,n,"missing-multi-factor-info"),(await cE(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:o}=await Ow(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}var Fr=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=Cn(e)}verifyPhoneNumber(e,t){return dE(this.auth,e,ne(t))}static credential(e,t){return Nr._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Nr._fromTokenResponse(t,r):null}};Fr.PROVIDER_ID="phone";Fr.PHONE_SIGN_IN_METHOD="phone";function jm(n,e){return e?Xe(e):(w(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Ur=class extends qt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return An(e,this._buildIdpRequest())}_linkToIdToken(e,t){return An(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return An(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function fE(n){return Hw(n.auth,new Ur(n),n.bypassAuthState)}function mE(n){let{auth:e,user:t}=n;return w(t,e,"internal-error"),zw(t,new Ur(n),n.bypassAuthState)}async function pE(n){let{auth:e,user:t}=n;return w(t,e,"internal-error"),jw(t,new Ur(n),n.bypassAuthState)}var Fs=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}let c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return fE;case"linkViaPopup":case"linkViaRedirect":return pE;case"reauthViaPopup":case"reauthViaRedirect":return mE;default:_e(this.auth,"internal-error")}}resolve(e){Je(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Je(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var gE=new Ut(2e3,1e4);var Fl=class n extends Fs{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return w(e,this.auth,"internal-error"),e}async onExecution(){Je(this.filter.length===1,"Popup operations only handle one event");let e=Xl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ue(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ue(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ue(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,gE.get())};e()}};Fl.currentPopupAction=null;var yE="pendingRedirect",ws=new Map,Ul=class extends Fs{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ws.get(this.auth._key());if(!e){try{let r=await _E(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ws.set(this.auth._key(),e)}return this.bypassAuthState||ws.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function _E(n,e){let t=Hm(e),r=zm(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}async function vE(n,e){return zm(n)._set(Hm(e),"true")}function wE(n,e){ws.set(n._key(),e)}function zm(n){return Xe(n._redirectPersistence)}function Hm(n){return vs(yE,n.config.apiKey,n.name)}function Jl(n,e,t){return EE(n,e,t)}async function EE(n,e,t){let r=Cn(n);sw(n,e,xr),await r._initializationPromise;let i=jm(r,t);return await vE(i,r),i._openRedirect(r,e,"signInViaRedirect")}async function IE(n,e,t=!1){let r=Cn(n),i=jm(r,e),o=await new Ul(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}var bE=10*60*1e3,ql=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!TE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Gm(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ue(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=bE&&this.cachedEventUids.clear(),this.cachedEventUids.has(am(e))}saveEventToCache(e){this.cachedEventUids.add(am(e)),this.lastProcessedEventTime=Date.now()}};function am(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Gm({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function TE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Gm(n);default:return!1}}async function AE(n,e={}){return ue(n,"GET","/v1/projects",e)}var SE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,CE=/^https?/;async function RE(n){if(n.config.emulator)return;let{authorizedDomains:e}=await AE(n);for(let t of e)try{if(kE(t))return}catch{}_e(n,"unauthorized-domain")}function kE(n){let e=Cl(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!CE.test(t))return!1;if(SE.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var PE=new Ut(3e4,6e4);function cm(){let n=qe().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function DE(n){return new Promise((e,t)=>{var r,i,s;function o(){cm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{cm(),t(Ue(n,"network-request-failed"))},timeout:PE.get()})}if(!((i=(r=qe().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=qe().gapi)===null||s===void 0)&&s.load)o();else{let a=Pm("iframefcb");return qe()[a]=()=>{gapi.load?o():t(Ue(n,"network-request-failed"))},km(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw Es=null,e})}var Es=null;function NE(n){return Es=Es||DE(n),Es}var xE=new Ut(5e3,15e3),LE="__/auth/iframe",OE="emulator/auth/iframe",VE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ME=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function FE(n){let e=n.config;w(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Gl(e,OE):`https://${n.config.authDomain}/${LE}`,r={apiKey:e.apiKey,appName:n.name,v:it},i=ME.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Wt(r).slice(1)}`}async function UE(n){let e=await NE(n),t=qe().gapi;return w(t,n,"internal-error"),e.open({where:document.body,url:FE(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:VE,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let o=Ue(n,"network-request-failed"),a=qe().setTimeout(()=>{s(o)},xE.get());function c(){qe().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}var qE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},BE=500,jE=600,zE="_blank",HE="http://localhost",Us=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function GE(n,e,t,r=BE,i=jE){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),a="",c=Object.assign(Object.assign({},qE),{width:r.toString(),height:i.toString(),top:s,left:o}),l=W().toLowerCase();t&&(a=Im(l)?zE:t),Em(l)&&(e=e||HE,c.scrollbars="yes");let u=Object.entries(c).reduce((d,[f,I])=>`${d}${f}=${I},`,"");if(vw(l)&&a!=="_self")return $E(e||"",a),new Us(null);let h=window.open(e||"",a,u);w(h,n,"popup-blocked");try{h.focus()}catch{}return new Us(h)}function $E(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var KE="__/auth/handler",WE="emulator/auth/handler",QE=encodeURIComponent("fac");async function lm(n,e,t,r,i,s){w(n.config.authDomain,n,"auth-domain-config-required"),w(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:it,eventId:i};if(e instanceof xr){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Lu(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[u,h]of Object.entries(s||{}))o[u]=h}if(e instanceof jt){let u=e.getScopes().filter(h=>h!=="");u.length>0&&(o.scopes=u.join(","))}n.tenantId&&(o.tid=n.tenantId);let a=o;for(let u of Object.keys(a))a[u]===void 0&&delete a[u];let c=await n._getAppCheckToken(),l=c?`#${QE}=${encodeURIComponent(c)}`:"";return`${YE(n)}?${Wt(a).slice(1)}${l}`}function YE({config:n}){return n.emulator?Gl(n,WE):`https://${n.authDomain}/${KE}`}var Al="webStorageSupport",Bl=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Yl,this._completeRedirectFn=IE,this._overrideRedirectResult=wE}async _openPopup(e,t,r,i){var s;Je((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let o=await lm(e,t,r,Cl(),i);return GE(e,o,Xl())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await lm(e,t,r,Cl(),i);return Zw(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Je(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await UE(e),r=new ql(e);return t.register("authEvent",i=>(w(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Al,{type:Al},i=>{var s;let o=(s=i?.[0])===null||s===void 0?void 0:s[Al];o!==void 0&&t(!!o),_e(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=RE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Cm()||Kl()||Gs()}},$m=Bl,qs=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Fe("unexpected MultiFactorSessionType")}}},jl=class n extends qs{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return $w(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return lE(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Bs=class{constructor(){}static assertion(e){return jl._fromCredential(e)}};Bs.FACTOR_ID="phone";var js=class{static assertionForEnrollment(e,t){return zs._fromSecret(e,t)}static assertionForSignIn(e,t){return zs._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;w(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let i=await Kw(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Hs._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};js.FACTOR_ID="totp";var zs=class n extends qs{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return w(typeof this.secret<"u",e,"argument-error"),Ww(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){w(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return uE(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Hs=class n{constructor(e,t,r,i,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(ys(e)||ys(t))&&(i=!0),i&&(ys(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),ys(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function ys(n){return typeof n>"u"||n?.length===0}var um="@firebase/auth",hm="1.3.0";var zl=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){w(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function XE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function JE(n){rt(new pe("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;w(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Rm(n)},l=new xl(r,i,s,c);return Rw(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),rt(new pe("auth-internal",e=>{let t=Cn(e.getProvider("auth").getImmediate());return(r=>new zl(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),we(um,hm,XE(n)),we(um,hm,"esm2017")}var ZE=5*60,eI=wo("authIdTokenMaxAge")||ZE,dm=null,tI=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>eI)return;let i=t?.token;dm!==i&&(dm=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function qr(n=Xr()){let e=On(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Dm(n,{popupRedirectResolver:$m,persistence:[Bm,Mm,Yl]}),r=wo("authTokenSyncURL");if(r){let s=tI(r);Vm(t,s,()=>s(t.currentUser)),Om(t,o=>s(o))}let i=_o("auth");return i&&Nm(t,`http://${i}`),t}JE("Browser");var eu=!1,Zl=null,Rn=null,tu=function(){return Zl},Br=function(){return tu()!==null},nu=function(n,e){let t=n.code||"",r=n.message||"",i=`${e} auth error ${t}: ${r}`;console.log(i),Rn&&Rn.trigger("error:display",i)},Km=async function(){if(eu)try{let n=qr(),e=new zt;await Jl(n,e)}catch(n){nu(n,"signIn")}},Wm=function(n){Rn=n;try{Xf();let e=qr();eu=!0,Wl(e,t=>{t!=null?(console.log("Auth state changed to have a user."),Zl=t,Rn.trigger("auth:signin")):(console.log("Auth state changed to no user."),Zl=null,Rn.trigger("auth:signout"))}),Rn.trigger("auth:enabled")}catch(e){nu(e,"monitorAuth")}},Qm=function(){if(!eu)return;let n=qr();Ql(n).then(()=>{}).catch(e=>{nu(e,"signOut")})};var Ks=function(){let n=tu();if(!n||!n.uid)throw new Error("User not authed.");return n.uid},ru=function(n,e){let t=wl();return Mf(t,`/users/${n}/characters`,e)},nI=function(n){let e=wl();return Vf(e,`/users/${n}/characters`)},rI=async function(n){let e=Ks();if(!e)return null;let t=ru(e,n);try{let r=await $f(t);return r.exists()?r.data():null}catch(r){throw console.log(`Database.get error: ${r}`),new Error(`Database.get error: ${r}`)}},iI=async function(n,e){let t=Ks();if(!t)return!1;let r=ru(t,n);try{await Wf(r,e)}catch(i){throw console.log(`Database.set error: ${i}`),new Error(`Database.set error: ${i}`)}return!0},sI=async function(){let n=Ks();if(!n)return[];let e=[];try{(await Kf(nI(n))).forEach(r=>{e.push(r.data())})}catch(t){throw console.log(`Database.getAll error: ${t}`),new Error(`Database.getAll error: ${t}`)}return e},oI=async function(n){let e=Ks();if(!e)return!1;let t=ru(e,n);try{await Qf(t)}catch(r){throw console.log(`Database.remove error: ${r}`),new Error(`Database.remove error: ${r}`)}return!0},jr={get:rI,set:iI,getAll:sI,remove:oI};var iu=class{constructor(e){this.tablist=e,this.tabs=[],this.panes=[],e&&(this.tabs=e.querySelectorAll("a[role=tab]"),this.panes=e.parentNode.querySelectorAll("section[role=tabpanel]"),Array.from(this.tabs).forEach(t=>{t.addEventListener("click",this.changeTab.bind(this))}))}switchToPane(e){let t=-1;if(e)t=Array.prototype.findIndex.call(this.panes,r=>r.id===e);else{let r=this.tablist.querySelector("[aria-selected=true]");t=Array.prototype.indexOf.call(this.tabs,r)+1,t>=this.tabs.length&&(t=0)}t!==-1&&this.tabs[t].click()}changeTab(e){e.preventDefault();let t=this.tablist.querySelector("[aria-selected=true]");if(!t)return;let r=Array.prototype.indexOf.call(this.tabs,t),i=e.currentTarget,s=Array.prototype.indexOf.call(this.tabs,i);if(r===s)return;t.setAttribute("aria-selected",!1),i.setAttribute("aria-selected",!0);let o=this.panes[r];o&&(o.hidden=!0);let a=this.panes[s];a&&(a.hidden=!1,a.querySelector("[data-name]").focus())}},Ym=iu;var Xm=document.createElement("template");Xm.innerHTML=`
<link rel="stylesheet" href="./styles.css">
<header class="page-header">
    <h1 class="pc-charname" aria-label="Character Name"><field-editable data-name="charname" id="page-top" placeholder="Character Name"></field-editable></h1>
</header>
`;var Ws=class extends HTMLElement{constructor({emitter:e=null,templateNode:t=null}){super(),this.emitter=e,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Xm.content.cloneNode(!0)),t&&this.shadowRoot.appendChild(t),this.dataset.sheetview="true"}connectedCallback(){this.mainTabs=new Ym(this.shadowRoot.querySelector("ul[role=tablist]")),this.shadowRoot.addEventListener("fieldChange",this._handleFieldChange.bind(this)),Array.from(this.shadowRoot.querySelectorAll("input[type=number]")).forEach(e=>{e.addEventListener("change",this._numberInputChange.bind(this))}),this.emitter.on("tab:switch",this.switchToPane,this)}disconnectedCallback(){this.shadowRoot.removeEventListener("fieldChange",this._handleFieldChange.bind(this)),Array.from(this.shadowRoot.querySelectorAll("input[type=number]")).forEach(t=>{t.removeEventListener("change",this._numberInputChange.bind(this))}),this.emitter.off("tab:switch",this.switchToPane,this),document.querySelector("footer-nav").removeLinks()}_validateCharacter(e){throw new Error("Invalid character type for this view.")}set character(e){this._validateCharacter(e),this.cur_character=e,this.emitter.trigger("character:set"),this.renderCharacter()}get character(){return this.cur_character}switchToPane(e){this.mainTabs&&this.mainTabs.switchToPane(e)}_renderCustomFields(e,t,r,i){return!1}_renderCustomPost(){}renderCharacter(){if(this.cur_character===null)return;this.shadowRoot.querySelector('[data-name="charname"]').content=this.cur_character.charname,Array.from(this.shadowRoot.querySelectorAll("*[data-name]")).forEach(t=>{let r=t.getAttribute("data-name");if(typeof this.cur_character[r]>"u")return;let i=t.getAttribute("data-subfield"),s=i?this.cur_character[r][i]:this.cur_character[r];switch(t.tagName){case"INPUT":case"TEXTAREA":case"SELECT":t.getAttribute("type")==="number"?t.value=s||0:t.value=s||"";let o=new Event("change");t.dispatchEvent(o);break;case"SIMPLE-LIST":t.clear();let a=s||[];a.length>0&&a.forEach(u=>{u.length!==0&&t.addItem(u)}),t.addItem();break;case"NOTE-LIST":t.clear();let c=s||[];c.length>0&&c.forEach(u=>{u.length!==0&&t.addItem(u)}),t.addItem();break;case"TABLE-EDITABLE":t.clear();let l=s||[];l.length>0&&l.forEach(u=>{u.length!==0&&t.addRow(u)}),t.addRow();break;case"FIELD-EDITABLE":t.content=s||"";break;default:this._renderCustomFields(t,r,i,s)||t.getAttribute("content-editable")==="true"&&(t.innerHTML=s||"")}}),this._renderCustomPost(),this.emitter.trigger("dialog:save:hide")}_showUnsavedDialog(){this.emitter.trigger("dialog:save:show")}_sameValues(e,t){return JSON.stringify(e)===JSON.stringify(t)}_customFieldChange(e,t,r){return!1}_handleFieldChange(e){let t=e.detail.field||"",r=e.detail.subfield||"";if(!t)return;let i=this.cur_character;if(typeof i[t]>"u"||this._customFieldChange(e,t,r))return;let s=e.detail.value;if(r){if(typeof i[t]!="object"||Array.isArray(i[t]))return;let a=i[t][r];this._sameValues(a,s)||(i[t][r]=e.detail.value,this._showUnsavedDialog());return}let o=i[t];this._sameValues(o,s)||(i[t]=s,this._showUnsavedDialog())}_customNumberInputChange(){}_numberInputChange(e){let t=e.target.dataset.name,r=e.target.dataset.subfield;if(typeof this.cur_character[t][r]>"u")return;let i=parseInt(e.target.value,10);this.cur_character[t][r]=i,this.emitter.trigger("dialog:save:show"),this._customNumberInputChange(e)}navigateTo(e){let t=this.shadowRoot.querySelector(e);t&&(t.scrollIntoView(),t.focus())}};window.customElements.get("sheet-view")||window.customElements.define("sheet-view",Ws);var kn=Ws;var Qs=class{constructor(e,t,r){this.el=e,this.cur_character=t,this.emitter=r,this.el.addEventListener("click",this._openSpellModal.bind(this))}async getSpellData(e){let t=`https://www.dnd5eapi.co/api/spells?level=${e}&school=illusion&school=abjuration&school=conjuration&school=divination&school=enchantment&school=evocation&school=necromancy&school=psionic&school=transmutation`,r=await fetch(t,{method:"GET"}),{results:i}=await r.json();if(!r.ok)throw new Error("Error fetching API resource.");return i}async _openSpellModal(e){if(this.spellDialog=this.spellDialog||document.getElementById("dialog-spells"),this.spellDialog.clear(),this.spellDialog.isOpen){this.spellDialog.close();return}let t=document.getElementById("spellModal"),r=document.importNode(t.content,!0),i=r.querySelector("ul"),s=e.target.dataset.level;try{(await this.getSpellData(s)).forEach(a=>{let c=document.createElement("div"),l=document.createElement("button"),u=a.name.replace(/ /g,"-").replace(/'/g,"'");l.innerText=a.name,l.dataset.field="spells",l.dataset.subfield=s,l.dataset.name=u,l.classList.add("btn","btn-plain"),l.addEventListener("click",this._handleAddNewSpell.bind(this)),c.appendChild(l),i.appendChild(c)})}catch(o){console.log(o);let a=document.createElement("div");a.innerText="Unable to access this resource at the moment.",i.appendChild(a)}this.spellDialog.setContent([...r.children]),this.spellDialog.open()}_handleAddNewSpell(e){let t=e.target.dataset.field,r=e.target.dataset.subfield,i=e.target.dataset.name;if(typeof this.cur_character[t][r]>"u")return;let o=[...this.cur_character[t][r],i],a=this.cur_character.spell_slots[r]+1;this.cur_character.spell_slots[r]=a,this.cur_character[t][r]=o,this.emitter.trigger("character:update:spells")}};window.customElements.get("add-spell")||window.customElements.define("add-spell",Qs);var Jm=Qs;var Zm=document.createElement("template");Zm.innerHTML=`
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
`;var Ys=class extends kn{constructor({emitter:e}){super({emitter:e,templateNode:Zm.content.cloneNode(!0)}),this.spellButtons=[]}connectedCallback(){super.connectedCallback(),this.shadowRoot.addEventListener("attributeChange",this._handleAttributeChange.bind(this)),this.shadowRoot.addEventListener("saveChange",this._handleSaveChange.bind(this)),this.emitter.on("character:skill:update",this._updateSkillMod,this),this.emitter.on("character:proficiency:update",this._updateProficiency,this),this.emitter.on("character:attribute:update",this._updateAttributeMods,this),this.emitter.on("character:save:update",this._updateSaveMods,this),this.emitter.on("character:set",this._addSpellButtonEvents,this),this.emitter.on("character:update:spells",this._updateSpellList,this);let e=document.querySelector("footer-nav");e&&e.setLinks([{label:"Attributes",tab:"pane-stats",href:"#page-attributes"},{label:"Skills",tab:"pane-stats",href:"#page-skills"},{label:"Spells",tab:"pane-stats",href:"#page-spells"},{label:"Notes",tab:"pane-notes",href:"#page-notes_adv"}])}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.removeEventListener("attributeChange",this._handleAttributeChange.bind(this)),this.shadowRoot.removeEventListener("saveChange",this._handleSaveChange.bind(this)),this.emitter.off("character:skill:update",this._updateSkillMod,this),this.emitter.off("character:proficiency:update",this._updateProficiency,this),this.emitter.off("character:attribute:update",this._updateAttributeMods,this),this.emitter.off("character:save:update",this._updateSaveMods,this),this.emitter.off("character:set",this._addSpellButtonEvents,this),this.emitter.off("character:update:spells",this._updateSpellList,this)}_addSpellButtonEvents(){this.shadowRoot.querySelectorAll("[data-level]").forEach(t=>{this.spellButtons.push(new Jm(t,this.cur_character,this.emitter))})}_updateSpellList(){this.shadowRoot.querySelectorAll('[data-name="spells"]').forEach(t=>{let r=t.dataset.name||"";if(typeof this.cur_character[r]>"u"||r==="")return;let i=t.dataset.subfield||"",o=(i!==""?this.cur_character[r][i]:this.cur_character[r])||[];t.clear(),o.forEach(a=>{if(!a)return;let c=a.replace("-"," ");t.addItem(c)}),o.length===0&&t.addItem()})}_validateCharacter(e){if(!(e instanceof yt))throw new Error("Invalid character type for this view.")}_renderCustomFields(e,t,r,i){switch(e.tagName){case"SKILL-LISTING":return e.skillValue=i||0,e.skillMod=this.cur_character.getSkillMod(r),!0;case"ATTR-LISTING":return e.attributeScore=i||10,e.attributeMod=this.cur_character.attributeMod(t),e.saveProficiency=this.cur_character.saves[t],e.saveMod=this.cur_character.saveMod(t),!0}return!1}_renderCustomPost(){this.shadowRoot.querySelector('[data-name="proficiency"]').innerHTML=this.cur_character.proficiency}_customFieldChange(e,t,r){if(t==="skills"){let i=this.character.getSkill(r);return this._sameValues(i,e.detail.value)||(this.character.setSkill(r,e.detail.value),this._showUnsavedDialog()),!0}if(t==="weapons"){let i=this.character[t],s=e.detail.value.map(o=>new He(o));return this._sameValues(i,s)||(this.character[t]=s,this._showUnsavedDialog()),!0}}_updateSkillMod(e,t){let r=this.shadowRoot.querySelector(`skill-listing[data-subfield="${e}"]`);r&&(r.skillMod=t)}_updateProficiency(){let e=this.cur_character.proficiency;this.shadowRoot.querySelector('[data-name="proficiency"]').innerHTML=e,Array.from(this.shadowRoot.querySelectorAll("skill-listing")).forEach(t=>{let r=t.skillName;t.skillMod=this.cur_character.getSkillMod(r)}),Array.from(this.shadowRoot.querySelectorAll("attr-listing")).forEach(t=>{let r=t.attributeName;t.saveMod=this.cur_character.saveMod(r)})}_updateAttributeMods(e){let t=this.shadowRoot.querySelector(`attr-listing[data-name=${e}]`);t&&(t.attributeMod=this.cur_character.attributeMod(e),t.saveMod=this.cur_character.saveMod(e))}_updateSaveMods(e){let t=this.shadowRoot.querySelector(`attr-listing[data-name=${e}]`);t&&(t.saveMod=this.cur_character.saveMod(e))}_customNumberInputChange(e){let t=e.target.dataset.name,r=e.target.dataset.subfield,i=parseInt(e.target.value,10);if(t==="spell_slots"){let s=this.shadowRoot.querySelector(`[data-name="spells"][data-subfield="${r}"]`);i?s.parentNode.hidden=!1:s.parentNode.hidden=!0}}_handleAttributeChange(e){let t=e.detail.field||"";t&&(this.cur_character.setAttribute(t,e.detail.value),this._showUnsavedDialog())}_handleSaveChange(e){let t=e.detail.field||"";t&&(this.cur_character.setSaveProficiency(t,e.detail.value),this._showUnsavedDialog())}};window.customElements.get("sheet-view-5e")||window.customElements.define("sheet-view-5e",Ys);var ep=Ys;var tp=document.createElement("template");tp.innerHTML=`
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
`;var Xs=class extends kn{constructor({emitter:e}){super({emitter:e,templateNode:tp.content.cloneNode(!0)})}connectedCallback(){super.connectedCallback();let e=document.querySelector("footer-nav");e&&e.setLinks([{label:"Attributes",tab:"pane-stats",href:"#page-attributes"},{label:"Notes",tab:"pane-notes",href:"#page-notes"}])}disconnectedCallback(){super.disconnectedCallback()}_validateCharacter(e){if(!(e instanceof _t))throw new Error("Invalid character type for this view.")}};window.customElements.get("sheet-view-vagabonds")||window.customElements.define("sheet-view-vagabonds",Xs);var np=Xs;var rp="4.4.1";var $t=null,cI=rp,lI=function(){return new Date().toUTCString()},su=function(){let n=`${Math.random().toString(36)}00000000000000000`.slice(2,9);for(;Ze(n)!==null;)n=`${Math.random().toString(36)}00000000000000000`.slice(2,9);return n},ip=function(){return["Character5e","CharacterVagabonds"]},Pn=function(n,e){switch(n){case void 0:case"":case"Character5e":return new yt(e);case"CharacterVagabonds":return new _t(e);default:return new ze(e)}},uI=function(n,e="Character5e"){return Pn(e,{key:n})},Ze=function(n){if(!n)return null;let e=Kt.get(n);return!e||!e.key?null:Pn(e.className,e)},Js=async function(n){if(!n)return null;let e=await jr.get(n);return!e||!e.key?null:Pn(e.className,e)},zr=function(n){return n.updated=lI(),n.version=cI,Kt.set(n.key,n)},ou=async function(n){return await jr.set(n.key,n.toJSON())},Zs=function(n){Kt.remove(n)},sp=async function(n){return jr.remove(n)},pt=function(){let n=[];return Kt.getAll().forEach(e=>{n.push(Pn(e.className,e))}),n},op=async function(){let n=new Map;return Br()?((await jr.getAll()).forEach(t=>{let r=Pn(t.className,t);n.set(r.key,r)}),n):[]},ap=function(n){if(typeof n!="object"||!n.key)throw new Error("Data appears to be invalid. Try removing any text that isn't part of the backup (i.e. email introduction).");let e=Pn(n.className,n),t=Ze(n.key);if(t&&t.charname!==""&&t.charname!==e.charname)if(!e.key_prev)e.key_prev=e.key,e.key=su();else{let r=e.key_prev;e.key_prev=e.key,e.key=r}return zr(e),e},cp=function(n){if(!n)throw Error("LocalStorage prefix is empty.");Kt.setPrefix(n)},lp=function(n,e,t=!1){let r=Ze(n);if(!r){if(!t)return null;r=uI(n,e)}return $t=r,$t};var Dn=function(){return $t?$t.key:""},up=function(){if(!$t)throw new Error("No character is set.");if($t.charname==="")throw new Error("Your character must have name to save!");zr($t)},hp=function(n,e){let t=null;switch(n.className){case void 0:case"Character5e":t=new ep({emitter:e});break;case"CharacterVagabonds":t=new np({emitter:e});break;default:t=new kn({emitter:e});break}return t};var au=class{constructor(e){this.emitter=e,this.shortcuts={},document.addEventListener("keydown",this.checkShortCuts.bind(this))}addShortCut(e,t){this.shortcuts[e]=t}getKeyCode(e,t,r){let i="";return t&&(i+="Ctrl+"),r&&(i+="Shift+"),i+=e,i}checkShortCuts(e){let t=!1,r=!1;e.ctrlKey&&(t=!0),e.shiftKey&&(r=!0);let i=e.key,s=this.getKeyCode(i,t,r),o=this.shortcuts[s]||null;o&&(e.preventDefault(),e.stopPropagation(),this.emitter.trigger(o))}},dp=au;var hI={emitter:null,appname:"",dialog_unsaved:document.querySelector(".alert-unsaved"),dialog_undo:document.querySelector(".alert-delete"),triggerNewCharacter:function(n=""){let e=su();this.loadCharacter(e,n).then(()=>{window.location.hash=`#${e}`}).catch(t=>{console.log(t)})},changeCharacter:function(){let n=window.location.hash.substring(1),e=Dn();e&&n===e||this.loadCharacter(n)},loadCharacter:async function(n,e=""){this.hideUnsavedDialog();let t=lp(n,e,!0);t.emitter=this.emitter;let r=hp(t,this.emitter);document.querySelector("main").innerHTML="",document.querySelector("main").appendChild(r),r.character=t,this.emitter.trigger("loaddialog:close"),this.emitter.trigger("newdialog:close")},saveCharacter:function(){if(document.activeElement){let n=new Event("blur");document.activeElement.dispatchEvent(n)}try{up()}catch(n){this.emitter.trigger("error:display",n.message);return}this.hideUnsavedDialog()},downloadBackup:function(n){let e=[],t=[];Array.from(n.querySelectorAll("input[type=checkbox]:checked")).forEach(o=>{let a=Ze(o.value);e.push(a),t.push(a.charname)});let i=n.querySelector("input[name=format]:checked").value,s=new Date;if(i==="email"){let o=`Below is the backup data for your character(s) ${t.join(", ")}.

To use this data, go to: ${window.location.href} and click the "Restore Backup" button. Then paste the text below into the box.

---

${JSON.stringify(e)}`,a=`mailto:?subject=${encodeURIComponent(`Character backup: ${t.join(", ")} (${s.toLocaleString()})`)}&body=${encodeURIComponent(o)}`;this.emitter.trigger("backup:email",a)}else{if(typeof window.Blob!="function"){this.emitter.trigger("backup:textpaste",JSON.stringify(e));return}let o=document.createElement("a"),a=new Blob([JSON.stringify(e)],{type:"application/json"}),c=URL.createObjectURL(a);o.href=c,o.download=`${this.appname}_${s.getFullYear()}_${s.getMonth()+1}_${s.getDate()}`,document.body.appendChild(o),o.click(),setTimeout(function(){document.body.removeChild(o),window.URL.revokeObjectURL(c)},0)}},restoreFormSubmit:function(n){let e=n.querySelector("input[type=file]"),t=n.querySelector("textarea");e.files&&e.files.length>0?Array.from(e.files).forEach(r=>{let i=new FileReader;i.onload=(s=>o=>{this.restoreCharacters(o.target.result)})(r),i.readAsText(r)}):t.value!==""&&this.restoreCharacters(t.value)},restoreCharacters:function(n){try{let e=n.indexOf("[{"),t=n.lastIndexOf("}]"),r=n.indexOf(":[{");r!==-1&&r<e&&(e=-1),e===-1?(e=n.indexOf("{"),t=n.lastIndexOf("}"),n=n.substring(e),n=n.substring(0,t+1)):(n=n.substring(e),n=n.substring(0,t+2)),n=n.trim(),n=n.replace(/\},[\r\n]+\{/g,"},{"),n=n.replace(/(?:\r\n|\r|\n)/g,"<br/>");let i=JSON.parse(n);Array.isArray(i)||(i=[i]);let s=[],o=!1,a=Dn();i.forEach(l=>{let u=ap(l);u.key===a&&(o=!0);let h=document.createElement("li");h.textContent=`${u.charname} has been added. `;let d=document.createElement("a");d.setAttribute("href",`#${u.key}`),d.textContent="View character now.",d.addEventListener("click",f=>{this.alert.closeClear()}),h.appendChild(d),s.push(h)});let c=document.createElement("ul");s.forEach(l=>{c.appendChild(l)}),this.alert.header="Restored Characters",this.alert.setContent([c]),this.alert.open(),o&&this.loadCharacter(a).catch(l=>{console.log(l)})}catch(e){alert(`Error processing backup data: ${e.message}`)}},deleteCharacterTemp:function(n){if(n===""||n==="settings")return;Dn()===n&&this.triggerNewCharacter(),this.dialog_undo.querySelector("button").dataset.key=n,this.dialog_undo.hidden=!1;let e=this.dialog_undo.querySelector(".delete-timeout");setTimeout(()=>{e.classList.add("transition","timeout")},10),this[`deleteTimeout${n}`]=setTimeout(this.deleteCharacter.bind(this),8e3,n)},deleteCharacter:function(n){if(n===""||n==="settings")return;Zs(n),this.dialog_undo.querySelector("button").dataset.key="",this.dialog_undo.hidden=!0,this.dialog_undo.querySelector(".delete-timeout").classList.remove("transition","timeout")},undoDelete:function(n){let e=n.target.dataset.key||null;if(!e)return;this.dialog_undo.querySelector("button").dataset.key="",this.dialog_undo.hidden=!0,this.dialog_undo.querySelector(".delete-timeout").classList.remove("transition","timeout"),this[`deleteTimeout${e}`]&&clearTimeout(this[`deleteTimeout${e}`])},showIntroDialog:function(){let n=document.getElementById("introAlert");this.alert.setContent([...document.importNode(n.content,!0).children]),this.alert.open()},showUnsavedDialog:function(){this.dialog_unsaved.hidden=!1},hideUnsavedDialog:function(){this.dialog_unsaved.hidden=!0},showErrorMessage:function(n){alert(n)},initialize:function({emitter:n=null,prefix:e="",appname:t=""}){if(!n||!e||!t){document.body.innerHTML="<p>App is missing required settings.</p>";return}this.emitter=n,this.emitter.on("error:display",this.showErrorMessage,this),this.appname=t,cp(e),this.alert=document.getElementById("alert-main"),Wm(this.emitter);let r=new dp(this.emitter);r.addShortCut("Ctrl+Shift+ArrowDown","character:save"),r.addShortCut("Ctrl+Shift+ArrowRight","tab:switch"),r.addShortCut("Ctrl+Shift+ArrowLeft","tab:switch"),r.addShortCut("Ctrl+Shift+ArrowUp","loaddialog:toggle"),document.querySelector(".btn-help").addEventListener("click",s=>{s.preventDefault();let o=document.getElementById("helpDialog"),a=document.importNode(o.content,!0);this.alert.setContent([...a.children]),this.alert.open()}),window.addEventListener("hashchange",s=>{this.changeCharacter()},!1),this.dialog_unsaved.querySelector(".btn-save").addEventListener("click",s=>{this.emitter.trigger("character:save")}),this.dialog_undo.querySelector(".btn-delete-undo").addEventListener("click",s=>{this.undoDelete(s)}),this.emitter.on("character:new",this.triggerNewCharacter,this),this.emitter.on("character:save",this.saveCharacter,this),this.emitter.on("character:delete",this.deleteCharacterTemp,this),this.emitter.on("backup:download",this.downloadBackup,this),this.emitter.on("backup:restore",this.restoreFormSubmit,this),this.emitter.on("dialog:save:show",this.showUnsavedDialog,this),this.emitter.on("dialog:save:hide",this.hideUnsavedDialog,this);let i=window.location.hash.substring(1);i!==""?this.loadCharacter(i).catch(s=>{console.log(s)}):(pt().length===0&&this.showIntroDialog(),this.triggerNewCharacter())}},fp=hI;var mp=document.createElement("template");mp.innerHTML=`
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
`;var eo=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(mp.content.cloneNode(!0)),this._wait=3e3,this._triggered=!1,this._confirm=!0,this._confirmCallback=null,this.dataset.triggered="false",this.setAttribute("role","button")}connectedCallback(){this.getAttribute("tabindex")===null&&this.setAttribute("tabindex",0),this.addEventListener("click",this._handleClick),this.addEventListener("keydown",this._handleKeyDown),this._wait=parseInt(this.dataset.wait||3e3,10),this.dataset.confirm!==void 0&&(this._confirm=this.dataset.confirm!=="false"),Array.from(this.children).forEach(e=>{e.hidden=!1}),this._confirmCallback&&this.addEventListener("click",this._confirmCallback)}disconnectedCallback(){this.removeEventListener("click",this._handleClick),this.removeEventListener("keydown",this._handleKeyDown),this._confirmCallback&&this.removeEventListener("click",this._confirmCallback)}set triggered(e){let t=!!e;this._triggered!==t&&(this._triggered=t,this._triggered?this.dataset.triggered="true":this.dataset.triggered="false")}get triggered(){return this._triggered}get confirm(){return this._confirm}set confirm(e){this._confirm=!!e}get confirmCallback(){return this._confirmCallback}set confirmCallback(e){typeof e=="function"&&(this._confirmCallback=e)}_handleClick(e){!this.triggered&&this._confirm&&(e.preventDefault(),e.stopImmediatePropagation(),this.triggered=!0,setTimeout(()=>{this.triggered=!1},this._wait))}_handleKeyDown(e){e.key!=="Enter"&&e.key!==" "||e.shiftKey||(e.preventDefault(),this.click())}reset(){this.triggered=!1}};window.customElements.get("confirm-button")||window.customElements.define("confirm-button",eo);var pp=eo;var dI=function(n,e){let t=new Date(n),r=new Date(e);return t>r?"local":r>t?"remote":"equal"},gp=async function(){let n=pt(),e=await op(),t=[];return n.forEach(r=>{let i={key:r.key,local:r},s=e.get(r.key);s&&(i.remote=s,e.delete(r.key),i.latest=dI(r.updated,s.updated)),t.push(i)}),e.forEach(r=>{let i={key:r.key,remote:r};t.push(i)}),t},yp=async function(n){let e=Ze(n);if(!e)throw new Error("Character not found");if(await Js(n))throw new Error("Character already on the remote");return await ou(e)},_p=async function(n){if(Ze(n))return"Character already on local";let t=await Js(n);return t?await zr(t):"Character not found on the remote"},vp=async function(n){return sp(n)},wp=async function(n){return Zs(n)},Ep=async function(n){let e=Ze(n);if(!e)throw new Error("Character not found on local");return await ou(e)},Ip=async function(n){let e=await Js(n);if(!e)throw new Error("Character not found on the remote");return await zr(e)};var bp=document.createElement("template");bp.innerHTML=`
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
`;var to=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(bp.content.cloneNode(!0)),this.setAttribute("role","list-item"),this.setAttribute("aria-labelledby","char-name"),this._key="",this.localDiv=this.shadowRoot.querySelector(".local"),this.remoteDiv=this.shadowRoot.querySelector(".remote"),this.syncDiv=this.shadowRoot.querySelector(".syncaction"),this.isCurrentCharacter=!1}connectedCallback(){this.shadowRoot.addEventListener("click",this.handleButtonClick.bind(this))}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this.handleButtonClick.bind(this))}get key(){return this._key}_showError(e){this.shadowRoot.querySelector(".error").innerHTML=e}handleButtonClick(e){console.log(e);let t=e.target.closest("button");if(!t)return;let r=t.dataset.action;if(r)switch(console.log(`Action: ${r}`),r){case"upload":yp(this._key).then(i=>{this.remoteDiv.querySelector(".summary").innerHTML=this.localDiv.querySelector(".summary").innerHTML,this.remoteDiv.querySelector(".updated").innerHTML=this.localDiv.querySelector(".updated").innerHTML,this.remoteDiv.querySelector(".action").innerHTML="",this.remoteDiv.querySelector(".action").appendChild(this._getButton("removeremote","Delete from Remote"))}).catch(i=>{this._showError(i)});break;case"removeremote":vp(this._key).then(i=>{this.remoteDiv.querySelector(".summary").innerHTML="No remote copy.",this.remoteDiv.querySelector(".updated").innerHTML="",this.remoteDiv.querySelector(".action").innerHTML="",this.remoteDiv.querySelector(".action").appendChild(this._getButton("upload","Upload"))}).catch(i=>{this._showError(i)});break;case"download":_p(this._key).then(i=>{this.localDiv.querySelector(".summary").innerHTML=this.remoteDiv.querySelector(".summary").innerHTML,this.localDiv.querySelector(".updated").innerHTML=this.remoteDiv.querySelector(".updated").innerHTML,this.localDiv.querySelector(".action").innerHTML="",this.localDiv.querySelector(".action").appendChild(this._getButton("removelocal","Delete from Local"))}).catch(i=>{this._showError(i)});break;case"removelocal":if(this.isCurrentCharacter){this._showError("You cannot remove the currently displayed character.");return}wp(this._key).then(i=>{this.localDiv.querySelector(".summary").innerHTML="No local copy.",this.localDiv.querySelector(".updated").innerHTML="",this.localDiv.querySelector(".action").innerHTML="",this.localDiv.querySelector(".action").appendChild(this._getButton("download","Download"))}).catch(i=>{this._showError(i)});break;case"syncup":Ep(this._key).then(i=>{this.remoteDiv.querySelector(".summary").innerHTML=this.localDiv.querySelector(".summary").innerHTML,this.remoteDiv.querySelector(".updated").innerHTML=this.localDiv.querySelector(".updated").innerHTML,this.remoteDiv.querySelector(".action").innerHTML="",this.remoteDiv.querySelector(".action").appendChild(this._getButton("removeremote","Delete from Remote")),this.syncDiv.innerHTML=""}).catch(i=>{this._showError(i)});break;case"syncdown":if(this.isCurrentCharacter){this._showError("You cannot sync to local the currently displayed character.");return}Ip(this._key).then(i=>{this.localDiv.querySelector(".summary").innerHTML=this.remoteDiv.querySelector(".summary").innerHTML,this.localDiv.querySelector(".updated").innerHTML=this.remoteDiv.querySelector(".updated").innerHTML,this.localDiv.querySelector(".action").innerHTML="",this.localDiv.querySelector(".action").appendChild(this._getButton("removelocal","Delete from Local")),this.syncDiv.innerHTML=""}).catch(i=>{this._showError(i)});break}}_getButton(e,t){let r=document.createElement("BUTTON");return r.classList.add("btn-sm"),r.dataset.action=e,r.innerText=t,r}setData({key:e="",local:t={},remote:r={},latest:i=""}){if(!e)return;this._key=e;let s=t.key?t.charname:r.key?r.charname:"[Unknown]";this.shadowRoot.querySelector(".charname").innerHTML=s,this.shadowRoot.querySelector(".key").innerHTML=e,t.key?(this.localDiv.querySelector(".summary").innerHTML=t.summaryHeader,this.localDiv.querySelector(".updated").innerHTML=t.updatedTime,this.localDiv.querySelector(".action").appendChild(this._getButton("removelocal","Delete from Local"))):this.localDiv.querySelector(".action").appendChild(this._getButton("download","Download")),r.key?(this.remoteDiv.querySelector(".summary").innerHTML=r.summaryHeader,this.remoteDiv.querySelector(".updated").innerHTML=r.updatedTime,this.remoteDiv.querySelector(".action").appendChild(this._getButton("removeremote","Delete from Remote"))):this.remoteDiv.querySelector(".action").appendChild(this._getButton("upload","Upload")),i==="local"?this.syncDiv.appendChild(this._getButton("syncup","Update on Remote")):i==="remote"&&this.syncDiv.appendChild(this._getButton("syncdown","Update on Local"))}};window.customElements.get("sync-info")||window.customElements.define("sync-info",to);var Tp=to;var cu=class{constructor(e,t){this.el=e,this.menu=t,this.action=e.dataset.action||"",this.el.addEventListener("keydown",this.handleKeyBoardEvent.bind(this)),this.el.addEventListener("click",this.menu.setTabFocusToButton.bind(this.menu,this))}handleKeyBoardEvent(e){if(!(e.shiftKey||e.ctrlKey||e.metaKey||e.altKey)){if(e.key==="ArrowRight"){this.removeTabFocus(),this.menu.setFocusToNext(this);return}if(e.key==="ArrowLeft"){this.removeTabFocus(),this.menu.setFocusToPrevious(this);return}if(e.key==="Home"){this.removeTabFocus(),this.menu.setFocusToFirst();return}e.key==="End"&&(this.removeTabFocus(),this.menu.setFocusToLast())}}isFocusable(){return this.el.getAttribute("tabindex")>-1}isVisible(){return!!(this.el.offsetWidth||this.el.offsetHeight||this.el.getClientRects().length)}removeTabFocus(){this.el.setAttribute("tabindex","-1")}setTabFocus(){this.el.setAttribute("tabindex","0")}focus(){this.el.focus()}switchTo(e=!0){this.isVisible()||(e?this.menu.setFocusToNext(this):this.menu.setFocusToPrevious(this)),this.setTabFocus(),this.focus()}},Ap=document.createElement("template");Ap.innerHTML=`
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

`;var fI={save:"_saveCharacter",load:"_openLoadModal",new:"_newCharacterModal",backup:"_openDownloadForm",restore:"_openRestoreForm",delete:"_openDeleteModal",auth:"_openAuthDialog",more:"_showMore"},lu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Ap.content.cloneNode(!0)),this.setAttribute("role","toolbar"),this.setAttribute("aria-label","Character Actions"),this.setAttribute("tabindex",0),this.buttons=[],this.opener=null,this.newDialog=null,this.loadDialog=null,this.downloadDialog=null,this.restoreDialog=null,this.authDialog=null,this.syncDialog=null}connectedCallback(){this.addEventListener("focus",this.focus.bind(this));let e=this.shadowRoot.querySelectorAll("button");Array.prototype.forEach.call(e,t=>{this.buttons.push(new cu(t,this))}),this.shadowRoot.addEventListener("click",this._handleClicks.bind(this))}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this._handleClicks.bind(this)),this.emitter&&(this.emitter.off("newdialog:close",this._closeNewModal,this),this.emitter.off("loaddialog:close",this._closeLoadModal,this),this.emitter.off("loaddialog:toggle",this._openLoadModal,this),this.emitter.off("backup:email",this._emailDownload,this),this.emitter.off("backup:textpaste",this._altDownload,this),this.emitter.off("auth:enabled",this._showAuth,this),this.emitter.off("auth:signin",this._signedIn,this),this.emitter.off("auth:signout",this._signedOut,this))}setEmitter(e){this.emitter=e,this.emitter.on("newdialog:close",this._closeNewModal,this),this.emitter.on("loaddialog:close",this._closeLoadModal,this),this.emitter.on("loaddialog:toggle",this._openLoadModal,this),this.emitter.on("backup:email",this._emailDownload,this),this.emitter.on("backup:textpaste",this._altDownload,this),this.emitter.on("auth:enabled",this._showAuth,this),this.emitter.on("auth:signin",this._signedIn,this),this.emitter.on("auth:signout",this._signedOut,this)}_handleClicks(e){let t=e.target.closest("button"),r=this.buttons.find(s=>s.el===t);if(!r)return;let i=fI[r.action]||null;i&&this[i](r)}_openAuthDialog(){if(this.authDialog=this.authDialog||document.getElementById("dialog-auth"),this.authDialog.clear(),this.authDialog.isOpen){this.authDialog.close();return}let e=null;Br()?e=document.getElementById("authSignOutModal"):e=document.getElementById("authSignInModal"),this.authDialog.setContent([...document.importNode(e.content,!0).children]),Br()?(this.authDialog.querySelector("#signOut").addEventListener("click",t=>{Qm()}),this.authDialog.querySelector("#syncData").addEventListener("click",t=>{this._openSyncModal(),this.authDialog.close()})):this.authDialog.querySelector("#googleSignIn").addEventListener("click",t=>{Km()}),this.authDialog.open()}_openSyncModal(){if(this.syncDialog=this.syncDialog||document.getElementById("dialog-sync"),this.syncDialog.clear(),this.syncDialog.isOpen){this.syncDialog.close();return}let e=document.getElementById("syncModal");this.syncDialog.setContent([...document.importNode(e.content,!0).children]);let t=Dn();gp().then(r=>{let i=document.createDocumentFragment();r.forEach(s=>{let o=new Tp;o.setData(s),o.key===t&&(o.isCurrentCharacter=!0),i.appendChild(o)}),this.syncDialog.querySelector("#characterSyncList").appendChild(i),this.syncDialog.open()}).catch(r=>{console.log(r)})}_openDownloadForm(){if(this.downloadDialog=this.downloadDialog||document.getElementById("dialog-backup"),this.downloadDialog.clear(),this.downloadDialog.isOpen){this.downloadDialog.close();return}let e=document.getElementById("backupModal"),t=document.importNode(e.content,!0),r=[];pt().forEach(i=>{let s=`<li><label><input type="checkbox" name="${i.key}" value="${i.key}" /> ${i.summaryHeader}</label></li>`;r.push(s)}),t.querySelector(".character_downloads").innerHTML=r.join(""),this.downloadDialog.setContent([...t.children],!1),this.downloadDialog.querySelector("form").addEventListener("submit",i=>{i.preventDefault(),this.emitter.trigger("backup:download",i.target)}),this.downloadDialog.open()}_openRestoreForm(){if(this.restoreDialog=this.restoreDialog||document.getElementById("dialog-restore"),this.restoreDialog.clear(),this.restoreDialog.isOpen){this.restoreDialog.close();return}let e=document.getElementById("restoreModal"),t=document.importNode(e.content,!0);this.restoreDialog.setContent([...t.children],!1),this.restoreDialog.querySelector("form").addEventListener("submit",r=>{r.preventDefault(),this.emitter.trigger("backup:restore",r.target),this.restoreDialog.closeClear()}),this.restoreDialog.open()}_altDownload(e){let t=document.createElement("p");t.innerHTML="Your current browser/os does not support direct file downloads, so here is the data for you to copy/paste.";let r=document.createElement("textarea");r.classList.add("large"),r.value=e,this.downloadDialog.clear(),this.downloadDialog.header="Alernate Download Option",this.downloadDialog.setContent([t,r,this.downloadDialog.getCloseButton()],!1),this.downloadDialog.open()}_emailDownload(e){let t=document.createElement("a");t.href=e,t.setAttribute("target","_blank"),t.innerHTML="Open new message in default email client",t.addEventListener("click",()=>{this.downloadDialog.closeClear()});let r=document.createElement("p");r.appendChild(t),this.downloadDialog.clear(),this.downloadDialog.setContent([r,this.downloadDialog.getCloseButton()],!1),this.downloadDialog.open()}_saveCharacter(){this.emitter.trigger("character:save")}_newCharacterModal(e){if(this.newDialog=this.newDialog||document.getElementById("dialog-new"),this.newDialog.clear(),this.newDialog.isOpen){this.newDialog.close();return}let t=!1,r=document.querySelector(".alert-unsaved");r&&!r.hidden&&(t=!0);let i=document.getElementById("createModal"),s=document.importNode(i.content,!0);if(t){let a=document.createElement("p");a.classList.add("alert"),a.innerHTML="<strong>Warning:</strong> You have unsaved changes.",s.querySelector("form").prepend(a)}let o=s.querySelector("select");ip().forEach(a=>{let c=document.createElement("option");c.value=a,c.innerText=a,o.appendChild(c)}),this.newDialog.setContent([...s.children]),this.newDialog.querySelector("form").addEventListener("submit",a=>{a.preventDefault();let c=new FormData(a.target);this.emitter.trigger("character:new",c.get("char_type"))}),this.newDialog.open()}_closeNewModal(){this.newDialog!==null&&this.newDialog.closeClear()}_loadCharClick(e){let r=e.currentTarget.dataset.key||"";r!==""&&(window.location.hash=`#${r}`)}_openLoadModal(){if(this.loadDialog=this.loadDialog||document.getElementById("dialog-load"),this.loadDialog.clear(),this.loadDialog.isOpen){this.loadDialog.close();return}let e=!1,t=document.querySelector(".alert-unsaved");t&&!t.hidden&&(e=!0);let r=document.getElementById("loadModal"),i=document.importNode(r.content,!0),s=i.querySelector("ul");pt().forEach(o=>{let a=document.createElement("li"),c=new pp;c.dataset.key=o.key,c.classList.add("btn","btn-plain"),c.innerHTML=`<span slot="default">${o.summaryHeader}</span>
            <span slot="confirm" hidden>Are you sure you want to load: ${o.charname?o.charname:"[Unnamed]"}, you have unsaved changes.</span>`,e||(c.confirm=!1),c.confirmCallback=this._loadCharClick.bind(this),a.appendChild(c),s.appendChild(a)}),this.loadDialog.setContent([...i.children]),this.loadDialog.open()}_closeLoadModal(){this.loadDialog!==null&&this.loadDialog.closeClear()}_openDeleteModal(){let e=document.getElementById("dialog-delete");if(e.isOpen){e.close();return}let t=document.getElementById("deleteModal"),r=document.importNode(t.content,!0),i=[];pt().forEach(s=>{let o=`<li><confirm-button data-key="${s.key}" class="btn btn-plain btn-delete-char">
                <span slot="default">${s.summaryHeader}</span>
                <span slot="confirm" hidden>Are you sure you want to delete: ${s.charname?s.charname:"[Unnamed]"}</span>
            </confirm-button></li>`;i.push(o)}),r.querySelector("ul").innerHTML=i.join(""),e.setContent([...r.children]),e.querySelector("ul").addEventListener("click",s=>{let o=s.target.tagName==="CONFIRM-BUTTON"?s.target:s.target.closest("confirm-button");o&&o.classList.contains("btn-delete-char")&&(s.preventDefault(),this.emitter.trigger("character:delete",o.getAttribute("data-key")),e.closeClear())}),e.open()}_showMore(){this.shadowRoot.querySelector(".more-actions").classList.toggle("closed")}_showAuth(){let e=this.buttons.find(t=>t.el.classList.contains("btn-auth"));e&&e.el.classList.remove("hidden")}_signedIn(){let e=this.buttons.find(t=>t.action==="auth");e&&(e.el.innerHTML="Sync/Logout"),this._openAuthDialog()}_signedOut(){let e=this.buttons.find(t=>t.action==="auth");e&&(e.el.innerHTML="Login"),this.authDialog&&this.authDialog.isOpen&&this.authDialog.close()}setFocusToNext(e){let r=this.buttons.indexOf(e)+1;if(r>this.buttons.length-1){this.setFocusToFirst();return}this.buttons[r].switchTo()}setFocusToPrevious(e){let r=this.buttons.indexOf(e)-1;if(r<0){this.setFocusToLast();return}this.buttons[r].switchTo(!1)}setFocusToFirst(){this.buttons[0].switchTo()}setFocusToLast(){this.buttons[this.buttons.length-1].switchTo(!1)}setTabFocusToButton(e){this.buttons.forEach(t=>{t===e?t.switchTo():t.removeTabFocus()})}focus(){let e=this.buttons.find(t=>t.isFocusable());e||(e=this.buttons[0]),this.setTabFocusToButton(e)}};window.customElements.get("action-menu")||window.customElements.define("action-menu",lu);var Sp=document.createElement("template");Sp.innerHTML=`
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
`;var no=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Sp.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list-item")}get content(){return new je({header:this.shadowRoot.querySelector("dt").innerHTML,text:this.shadowRoot.querySelector("dd").innerHTML})}set content(e){this.shadowRoot.querySelector("dt").innerHTML=e.header,this.shadowRoot.querySelector("dd").innerHTML=e.text}clear(){this.content=[]}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}focus(e=!1){if(e){this.shadowRoot.querySelector("dd").focus();return}this.shadowRoot.querySelector("dt").focus()}isEmpty(){return this.shadowRoot.querySelector("dt").innerText.trim()===""&&this.shadowRoot.querySelector("dd").innerText.trim()===""}};window.customElements.define("note-list-item",no);var uu=no;var mI=function(n){let e=n.childNodes;if(e.length===0)return;let t=document.createRange(),r=window.getSelection();r.removeAllRanges(),t.setStartBefore(e[0]),t.setEndAfter(e[e.length-1]),t.collapse(!1),r.addRange(t),r.collapseToEnd()},gt=mI;var Cp=document.createElement("template");Cp.innerHTML=`
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
`;var hu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Cp.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list"),this.addEventListener("keydown",this._keyDown),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName")}disconnectedCallback(){this.removeEventListener("keydown",this._keyDown),this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}get contentArray(){let e=Array.from(this.shadowRoot.querySelectorAll("note-list-item")),t=[];return e.forEach(r=>{let i=r.content;!i.header&&!i.text||t.push(i)}),t}addItem(e=null){let t=new uu;e&&(t.content=e),this.shadowRoot.appendChild(t)}clear(){Array.from(this.shadowRoot.querySelectorAll("note-list-item")).forEach(e=>{this.shadowRoot.removeChild(e)})}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}_keyDown(e){if(e.key!=="Enter"&&e.key!=="Backspace"||e.shiftKey)return;let t=this.deepActiveElement();if(e.key==="Enter"){if(e.preventDefault(),e.stopPropagation(),t.tagName==="DT"||t.closest("dt"))console.log(t),t.nextElementSibling.focus();else if(t.tagName==="DD"||t.closest("dd"))if(console.log(t),t.parentNode.host===this.shadowRoot.lastElementChild){let r=new uu;this.shadowRoot.appendChild(r),r.focus()}else{let r=t.parentNode.host.nextElementSibling;r&&r.focus()}return}if(e.key==="Backspace"){if(t.innerText.trim()!=="")return;if(e.preventDefault(),e.stopPropagation(),t.tagName==="DT"||t.closest("dt")){if(t.parentNode.host!==this.shadowRoot.querySelector("note-list-item")){let r=t.parentNode.host.previousElementSibling;r&&(r.focus(!0),gt(this.deepActiveElement()),t.parentNode.host.isEmpty()&&t.parentNode.host.remove())}}else(t.tagName==="DD"||t.closest("dd"))&&(t.parentNode.host.focus(),gt(this.deepActiveElement()))}}_blur(e){let t={field:this.fieldName,value:this.contentArray};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}focus(){this.shadowRoot.querySelector("note-list-item").focus()}};window.customElements.define("note-list",hu);var Rp=document.createElement("template");Rp.innerHTML=`
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
`;var du=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Rp.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list"),this.addEventListener("keydown",this._keyDown),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName"),this._upgradeProperty("subFieldName")}disconnectedCallback(){this.removeEventListener("keydown",this._keyDown),this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}set subFieldName(e){this.dataset.subfield=e}get subFieldName(){return this.dataset.subfield||""}get contentArray(){let e=Array.from(this.shadowRoot.querySelectorAll("li")),t=[];return e.forEach(r=>{let i=r.innerHTML;i!==""&&t.push(i)}),t}addItem(e=""){let t=document.createElement("li");return t.setAttribute("contenteditable",!0),t.innerHTML=e,this.shadowRoot.appendChild(t),t}clear(){Array.from(this.shadowRoot.querySelectorAll("li")).forEach(e=>{this.shadowRoot.removeChild(e)})}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}_keyDown(e){if(e.key!=="Enter"&&e.key!=="Backspace"||e.shiftKey)return;let t=this.deepActiveElement();if(!(t.tagName!=="LI"&&!t.closest("li"))){if(e.key==="Enter"){if(e.preventDefault(),t===this.shadowRoot.lastElementChild)this.addItem().focus();else{let r=t.nextElementSibling;r&&r.focus()}return}if(e.key==="Backspace"&&t!==this.shadowRoot.querySelector("li")&&t.innerText.trim()===""){e.preventDefault();let r=t.previousElementSibling;r.focus(),gt(r),t.remove()}}}_blur(e){let t={field:this.fieldName,subfield:this.subFieldName,value:this.contentArray};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}focus(){this.shadowRoot.querySelector("li").focus()}};window.customElements.get("simple-list")||window.customElements.define("simple-list",du);var kp=document.createElement("template");kp.innerHTML=`
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
`;var fu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(kp.content.cloneNode(!0)),this.columns=0}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","table"),this.addEventListener("keydown",this._keyDown),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName"),this.columnNames=this.getAttribute("columns").split("||"),this.columns=this.columnNames.length;let e=this.shadowRoot.querySelector("thead tr");this.columnNames.forEach(t=>{let r=document.createElement("th");r.innerHTML=t,e.appendChild(r)})}disconnectedCallback(){this.removeEventListener("keydown",this._keyDown),this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}get contentArray(){let e=[];return Array.from(this.shadowRoot.querySelectorAll("tbody > tr")).forEach(r=>{let i=Array.from(r.querySelectorAll("td"));if(i.length===0)return;let s={},o=!0;i.forEach((a,c)=>{let l=this.columnNames[c].toLowerCase(),u=a.innerHTML.trim();u!==""&&(o=!1),s[l]=u}),!o&&e.push(s)}),e}addRow(e=[]){let t=document.createElement("tr"),r=document.createElement("td");r.setAttribute("contenteditable",!0);for(let i=0;i<this.columns;i++){let s=this.columnNames[i].toLowerCase(),o=r.cloneNode(!1);o.innerHTML=e[s]||"",t.appendChild(o)}return this.shadowRoot.querySelector("tbody").appendChild(t),t}clear(){Array.from(this.shadowRoot.querySelectorAll("tbody > tr")).forEach(e=>{e.parentNode.removeChild(e)})}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}_keyDown(e){if(e.key!=="Enter"&&e.key!=="Backspace"||e.shiftKey)return;let t=this.deepActiveElement();if(t.tagName!=="TD"&&!t.closest("td"))return;let r=t.tagName==="TD"?t:t.closest("td"),i=r.parentElement;if(e.key==="Enter"){if(e.preventDefault(),r!==i.lastElementChild){let a=r.nextElementSibling;a&&a.focus();return}let s=i.nextElementSibling;if(s){s.querySelector("td").focus();return}this.addRow().querySelector("td").focus();return}if(e.key==="Backspace"){if(r.innerText.trim()!=="")return;if(e.preventDefault(),r!==i.firstElementChild){let o=r.previousElementSibling;o&&(o.focus(),gt(o));return}let s=i.previousElementSibling;if(s){s.lastElementChild.focus(),gt(s.lastElementChild);let o=!0;i.querySelectorAll("td").forEach(a=>{a.innerText.trim()!==""&&(o=!1)}),o&&i.remove()}}}_blur(e){let t={field:this.fieldName,value:this.contentArray};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}focus(){this.shadowRoot.querySelector("[contenteditable=true]").focus()}};window.customElements.define("table-editable",fu);var Pp=document.createElement("template");Pp.innerHTML=`
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
`;var mu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Pp.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list-item"),this.profCheck=this.shadowRoot.querySelector('input[data-name="skills"]'),this.expertCheck=this.shadowRoot.querySelector('input[data-name="expert"]'),this.profCheck.addEventListener("change",this._checkSkills.bind(this)),this.expertCheck.addEventListener("change",this._checkExpert.bind(this)),this.shadowRoot.querySelector("button").addEventListener("click",this._skillCheck.bind(this))}disconnectedCallback(){this.profCheck.removeEventListener("change",this._checkSkills.bind(this)),this.expertCheck.removeEventListener("change",this._checkExpert.bind(this)),this.shadowRoot.querySelector("button").removeEventListener("click",this._skillCheck.bind(this))}get skillName(){return this.dataset.subfield||""}set skillName(e){this.dataset.subfield=e}get skillLabel(){return this.shadowRoot.querySelector(".pc-skill-name").innerHTML}set skillLabel(e){this.shadowRoot.querySelector(".pc-skill-name").innerHTML=e}get skillValue(){return this.profCheck.checked?this.expertCheck.checked?2:1:0}set skillValue(e){this.profCheck.checked=!1,this.expertCheck.checked=!1,e>0&&(this.profCheck.checked=!0,this.expertCheck.disabled=!1),e>1&&(this.expertCheck.checked=!0)}get skillMod(){return this.shadowRoot.querySelector(".pc-skill-mod").innerHTML}set skillMod(e){this.shadowRoot.querySelector(".pc-skill-mod").innerHTML=e}_checkSkills(e){let t=this.expertCheck;e.target.checked?t.disabled=!1:(t.checked=!1,t.disabled=!0);let r={field:"skills",subfield:this.skillName,value:e.target.checked?1:0};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:r}))}_checkExpert(e){let t={field:"skills",subfield:this.skillName,value:e.target.checked?2:1};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}_skillCheck(e){let t=document.querySelector("sheet-view-5e").shadowRoot.querySelector("dice-roller");if(!t)return;let r=this.skillMod,i=`1d20${r!=="0"?r:""}`;t.roll(i)}focus(){this.shadowRoot.querySelector("input").focus()}};window.customElements.define("skill-listing",mu);var Dp=document.createElement("template");Dp.innerHTML=`
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
`;var pu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Dp.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list-item"),this.scoreInput=this.shadowRoot.querySelector("input.pc-attribute"),this.saveCheck=this.shadowRoot.querySelector('input[name="pc-save"]'),this.saveCheck.addEventListener("change",this._checkSave.bind(this)),this.scoreInput.addEventListener("change",this._scoreUpdate.bind(this)),this.shadowRoot.querySelector("button").addEventListener("click",this._savingThrow.bind(this))}disconnectedCallback(){this.saveCheck.removeEventListener("change",this._checkSave.bind(this)),this.scoreInput.removeEventListener("change",this._scoreUpdate.bind(this)),this.shadowRoot.querySelector("button").removeEventListener("click",this._savingThrow.bind(this))}get attributeName(){return this.dataset.name||""}set attributeName(e){this.dataset.name=e}get attributeScore(){return parseInt(this.scoreInput.value,10)}set attributeScore(e){this.scoreInput.value=e}get saveProficiency(){return this.saveCheck.checked?1:0}set saveProficiency(e){this.saveCheck.checked=e}set attributeMod(e){this.shadowRoot.querySelector(".pc-attribute-mod").innerHTML=e}get saveMod(){return this.shadowRoot.querySelector(".pc-save-mod").innerHTML}set saveMod(e){this.shadowRoot.querySelector(".pc-save-mod").innerHTML=e}_checkSave(e){let t={field:this.attributeName,value:e.target.checked?1:0};this.dispatchEvent(new CustomEvent("saveChange",{bubbles:!0,detail:t}))}_scoreUpdate(e){let t={field:this.attributeName,value:e.target.value};this.dispatchEvent(new CustomEvent("attributeChange",{bubbles:!0,detail:t}))}_savingThrow(e){let t=document.querySelector("sheet-view-5e").shadowRoot.querySelector("dice-roller");if(!t)return;let r=this.saveMod,i=`1d20${r!=="0"?r:""}`;t.roll(i)}focus(){this.shadowRoot.querySelector("input").focus()}};window.customElements.define("attr-listing",pu);var Hr=function(n=0,e=null){return e==null&&(e=n,n=0),n+Math.floor(Math.random()*(e-n+1))};var ro=class{constructor({die:e="",value:t=0}){this.die=e,this.value=t}toString(){return this.value}toJSON(){return{className:"DiceResult",die:this.die,value:this.value}}},gu=class{getSingleDieResult(e){return Hr(1,e)}applyDieMod(e,t){let r=t.match(/^([dklh]{2})([0-9]*)$/);if(r===null)return e;let i=r[2]?parseInt(r[2]):1;switch(r[1]){case"dl":return e.sort((s,o)=>s-o),e.splice(0,i),e;case"dh":return e.sort((s,o)=>o-s),e.splice(0,i),e;case"kl":return e.sort((s,o)=>s-o),e.slice(0,i);case"kh":return e.sort((s,o)=>o-s),e.slice(0,i);default:return e}}_parseDiceNotation(e=6,t=1,r=0,i="+",s=""){r=parseInt(r,10),e=parseInt(e,10),t<=0?t=1:t=parseInt(t,10);let o=[];for(let c=1;c<=t;c++)o.push(this.getSingleDieResult(e));s!==""&&(o=this.applyDieMod(o,s));let a=0;if(o.length>0&&(a=o.reduce((c,l)=>c+l)),r===0)return a;switch(i){case"*":a=a*r;break;case"-":a=a-r;break;case"/":a=a/r;break;case"+":default:a=a+r;break}return Math.round(a)}rollDie(e=""){e=e.trim();let t=e.match(/^([0-9]*)d([0-9]+)([dklh]{2}[0-9]*)*(?:([\+\-\*\/])([0-9]+))*$/);return t?this._parseDiceNotation(t[2],t[1],t[5],t[4],t[3]):""}getDiceResult(e=""){return new ro({die:e,value:this.rollDie(e)})}};var yu=function(n=""){let e=new gu;return new ro({die:n,value:e.rollDie(n)})};var Gr=class{constructor({dragElement:e=null,handleSelector:t=null}){if(this.dragElement=e,!(this.dragElement instanceof HTMLElement))throw new Error("Dragger.dragElements must be HTMLElement");this.handleSelector=t,this.initDragBound=this.initDrag.bind(this),this.doDragCallback=this.doDrag.bind(this),this.stopDragCallback=this.stopDrag.bind(this),this._startX=null,this._startY=null,this._startPosX=null,this._startPosY=null,this._startWidth=null,this._startHeight=null,this.enabled=!1,this.callbackStartDrag=null}getEventX(e){return e.type.toLowerCase().indexOf("touch")===0?e.touches[0].clientX:e.clientX}getEventY(e){return e.type.toLowerCase().indexOf("touch")===0?e.touches[0].clientY:e.clientY}doDrag(e){e.preventDefault(),this.dragElement.coords=[this._startPosX+(this.getEventX(e)-this._startX),this._startPosY+(this.getEventY(e)-this._startY)]}stopDrag(){typeof this.dragElement.adjustForParentBounds=="function"&&this.dragElement.adjustForParentBounds(),typeof this.dragElement.saveCoords=="function"&&this.dragElement.saveCoords(),document.documentElement.removeEventListener("mousemove",this.doDragCallback,!1),document.documentElement.removeEventListener("touchmove",this.doDragCallback,!1),document.documentElement.removeEventListener("mouseup",this.stopDragCallback,!1),document.documentElement.removeEventListener("touchend",this.stopDragCallback,!1)}initDrag(e){e.button>1||(e.preventDefault(),e.stopPropagation(),this._startX=this.getEventX(e),this._startY=this.getEventY(e),[this._startPosX,this._startPosY]=this.dragElement.coords,this.callbackStartDrag!==null&&this.callbackStartDrag(this.dragElement,this.handleSelector),document.documentElement.addEventListener("mousemove",this.doDragCallback,!1),document.documentElement.addEventListener("touchmove",this.doDragCallback,!1),document.documentElement.addEventListener("mouseup",this.stopDragCallback,!1),document.documentElement.addEventListener("touchend",this.stopDragCallback,!1))}disableDrag(){if(!this.enabled)return;this.dragElement.removeEventListener("mousedown",this.initDragBound,!1),this.dragElement.removeEventListener("touchstart",this.initDragBound,!1);let e=this.handleSelector===""?this.dragElement:this.dragElement.querySelector(this.handleSelector);e!==null&&(e.style.cursor="auto"),this.enabled=!1}enableDrag(){if(this.enabled)return;this.dragElement.addEventListener("mousedown",this.initDragBound,!1),this.dragElement.addEventListener("touchstart",this.initDragBound,!1);let e=this.handleSelector===""?this.dragElement:this.dragElement.querySelector(this.handleSelector);e!==null&&(e.style.cursor="move"),this.enabled=!0}};var Np=document.createElement("template");Np.innerHTML=`
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
`;var io=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Np.content.cloneNode(!0)),this.resultDiv=this.shadowRoot.querySelector("div"),this._die="1d6",this._result="",this._coords=[0,0]}connectedCallback(){this.removeButton=this.shadowRoot.querySelector("button.btn-remove"),this.dragger=new Gr({dragElement:this}),this._upgradeProperty("die"),this._upgradeProperty("result"),this._upgradeProperty("coords"),this._updateLabels(),this.removeButton.addEventListener("click",this.remove.bind(this));let[e,t]=this.coords;if(e===0&&t===0){let{x:r,y:i}=this.getRootNode().host.getBoundingClientRect();r=r+Hr(-200,200),i=i+Hr(-200,200),this.coords=[r,i]}this.dragger.enableDrag()}disconnectedCallback(){this.removeButton.removeEventListener("click",this.remove.bind(this))}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}_updateLabels(){this.setAttribute("aria-label",`${this.die} roll result: ${this.result}`),this.shadowRoot.querySelector("small").innerText=`${this.die}`}get die(){return this._die}set die(e){this._die=e,this._updateLabels()}get result(){return this._result}set result(e){this._result=e,this.resultDiv.innerText=this._result,this._updateLabels()}get coords(){return this._coords}set coords([e,t]){e<0&&(e=0),e>window.innerWidth&&(e=window.innerWidth-this.offsetWidth),t<0&&(t=0),t>window.innerHeight&&(t=window.innerHeight-this.offsetHeight),this._coords=[e,t],this.style.left=`${e}px`,this.style.top=`${t}px`,this.style.bottom="auto",this.style.right="auto"}remove(){this.dispatchEvent(new CustomEvent("dice:remove",{bubbles:!0,detail:{die:this}}))}};window.customElements.get("dice-single")||window.customElements.define("dice-single",io);var _u=io;var xp=document.createElement("template");xp.innerHTML=`
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
`;var vu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(xp.content.cloneNode(!0)),this._dice=[]}connectedCallback(){this.resultDiv=this.shadowRoot.getElementById("dice-result"),this.resetButton=this.shadowRoot.querySelector("button.btn-reset"),this._upgradeProperty("dice"),this.shadowRoot.addEventListener("dice:remove",this._removeDie.bind(this)),Array.from(this.children).forEach(e=>{e.addEventListener("click",this._handleRoll.bind(this))}),this.resetButton.addEventListener("click",this.reset.bind(this))}disconnectedCallback(){this.shadowRoot.removeEventListener("dice:remove",this._removeDie.bind(this)),Array.from(this.children).forEach(e=>{e.removeEventListener("click",this._handleRoll.bind(this))}),this.resetButton.removeEventListener("click",this.reset.bind(this))}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}_handleRoll(e){let r=e.target.dataset.die||"",i=yu(`${r}`);this._addDie(i)}roll(e="1d6"){let t=yu(e);this._addDie(t)}get dice(){return this._dice}set dice(e){if(!Array.isArray(e))throw Error("Dice must be array");this._dice=e,this.resultDiv.innerHTML="",this._dice.forEach(t=>{t instanceof _u&&this.resultDiv.appendChild(t)})}_addDie(e){let t=new _u;t.die=e.die,t.result=e.value,this._dice.push(t),this.resultDiv.appendChild(t)}_removeDie(e){e.stopImmediatePropagation();let t=e.detail.die||null;if(!t)return;let r=this._dice.findIndex(s=>s===t);if(r<0)return;let i=this._dice[r];this.resultDiv.removeChild(i),this._dice.splice(r,1)}reset(){this.dice=[]}};window.customElements.get("dice-roller")||window.customElements.define("dice-roller",vu);var Lp=document.createElement("template");Lp.innerHTML=`
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
`;var wu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Lp.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("placeholder")&&(this.placeholderText=this.getAttribute("placeholder")),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName")}disconnectedCallback(){this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}get placeholderText(){this.shadowRoot.querySelector("span").getAttribute("placeholder")}set placeholderText(e){this.shadowRoot.querySelector("span").setAttribute("placeholder",e)}get content(){return this.shadowRoot.querySelector("span").innerHTML}set content(e){this.shadowRoot.querySelector("span").innerHTML=e}_blur(e){let t=this.content;t=t.trim().replace(/(\s|&nbsp;|<br\/?>)+$/,""),this.content=t;let r={field:this.fieldName,value:t};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:r}))}focus(){this.shadowRoot.querySelector("[contenteditable=true]").focus()}};window.customElements.define("field-editable",wu);var Op=document.createElement("template");Op.innerHTML=`
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
`;var Eu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Op.content.cloneNode(!0)),this.setAttribute("role","navigation"),this.setAttribute("aria-label","Character sheet tab/section navigation"),this.list=this.shadowRoot.querySelector("ol"),this.topLink=this.shadowRoot.querySelector("li:first-child"),this.shadowRoot.addEventListener("click",this._handleClicks.bind(this))}_handleClicks(e){if(e.target.tagName==="A"){e.preventDefault();let t=e.target,r=t.dataset.tab,i=document.querySelector("[data-sheetview]");r&&i.switchToPane(r);let s=t.getAttribute("href");i.navigateTo(s)}}setLinks(e){e.forEach(t=>{let r=document.createElement("li"),i=document.createElement("a");i.href=t.href||"",i.innerText=t.label||"",i.dataset.tab=t.tab||"",r.appendChild(i),this.list.appendChild(r)})}removeLinks(){this.shadowRoot.querySelectorAll("li").forEach(e=>{e!==this.topLink&&e.parentNode.removeChild(e)})}};window.customElements.get("footer-nav")||window.customElements.define("footer-nav",Eu);var Vp=document.createElement("template");Vp.innerHTML=`
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
 `;var Iu=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Vp.content.cloneNode(!0)),this.setAttribute("role","dialog"),this.setAttribute("aria-labelledby","modal-label"),this.boundOutsideClickClose=function(){},this.boundKeyboardEvents=function(){},this.opener=null,this.addEventListener("click",this.handleCloseClick)}connectedCallback(){}disconnectedCallback(){}get header(){return this.shadowRoot.querySelector('slot[name="header"]').innerHTML}set header(e){this.shadowRoot.querySelector('slot[name="header"]').innerHTML=e}get isOpen(){return!this.hidden}getCloseButton(){let e=document.createElement("button");return e.setAttribute("type","button"),e.classList.add("close"),e.textContent="Close",e.setAttribute("slot","content"),e}getChildren(e){if(typeof e.assignedElements=="function"){let t=e.assignedElements();return t.length?t:e.children}else return e.children}isFocusable(e,t=!1){let r=e.tagName;if(r===void 0)return!1;let i=e.disabled,s=parseInt(e.getAttribute("tabindex"),10),o=e.getAttribute("contenteditable");switch(r){case"INPUT":case"TEXTAREA":case"SELECT":case"BUTTON":case"A":return!(s===-1||i||r==="A"&&!e.href);default:if(t&&s>=0)return!0;if(!t&&s>=-1||o==="true")return!0}return!1}getFocusableChildren(e,t=!1,r=!1){let i=[],s=Array.from(this.getChildren(e));if(s.length===0)return i;for(let o of s){if(this.isFocusable(o,t)&&(i.push(o),r))return i;let a=this.getFocusableChildren(o,t,r);if(r&&a.length===1)return a;i=i.concat(a)}return i}findFocusables(e=!1,t=!1){return this.getFocusableChildren(this.shadowRoot,e,t)}findFirstFocusable(){return this.findFocusables(!1,!0).shift()}findFirstTabFocusable(){return this.findFocusables(!0,!0).shift()}findLastTabFocusable(){let e=this.findFocusables(!0);return e[e.length-1]}focusFirst(){let e=this.findFirstFocusable();e&&e.focus()}outsideClickClose(e){if(e.target.closest("modal-mib")===null){if(e.target.classList.contains("btn-dialog"))return;this.close(),this.clear()}}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}keyboardEvents(e){if(e.key==="Escape"){this.close();return}if(e.key!=="Tab")return;let t=this.deepActiveElement();if(e.shiftKey){if(t===this.findFirstFocusable()||t===this.findFirstTabFocusable()){let r=this.findLastTabFocusable();r&&(e.preventDefault(),r.focus())}return}if(t===this.findLastTabFocusable()){let r=this.findFirstTabFocusable();r&&(e.preventDefault(),r.focus())}}open(){this.isOpen||(this.opener=this.deepActiveElement(),this.hidden=!1,this.focusFirst(),this.boundOutsideClickClose=this.outsideClickClose.bind(this),document.addEventListener("click",this.boundOutsideClickClose,!0),this.boundKeyboardEvents=this.keyboardEvents.bind(this),document.addEventListener("keydown",this.boundKeyboardEvents,!0))}close(){this.hidden=!0,document.removeEventListener("click",this.boundOutsideClickClose,!0),document.removeEventListener("keydown",this.boundKeyboardEvents,!0),this.opener&&this.opener.focus()}clear(){for(;this.firstChild;)this.removeChild(this.firstChild)}closeClear(){this.close(),this.clear()}handleCloseClick(e){e.target.classList.contains("close")&&(e.preventDefault(),this.close(),this.clear())}setContent(e,t=!0){Array.isArray(e)||(e=[e]),this.clear();let r=document.createDocumentFragment();e.forEach(i=>{i.getAttribute("slot")||i.setAttribute("slot","content"),r.appendChild(i)}),t&&r.appendChild(this.getCloseButton()),this.appendChild(r)}};window.customElements.get("modal-mib")||window.customElements.define("modal-mib",Iu);"serviceWorker"in navigator&&navigator.serviceWorker.register("./service_worker.js",{type:"module"});var Mp=new Nn;document.querySelector("action-menu").setEmitter(Mp);fp.initialize({emitter:Mp,prefix:"charsheet-app-",appname:"character-sheet"});})();
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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

@firebase/auth/dist/esm2017/index-9a76d29a.js:
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
