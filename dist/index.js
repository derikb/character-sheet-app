(()=>{var jn=class{constructor(){this.events={},this.debug=!1}listenerIndex(e,t){return this.events[e].findIndex(i=>i.listener===t)}on(e,t,i=null){if(typeof t=="function"){if(this.events[e]=this.events[e]||[],this.events[e].length>0){let s=this.listenerIndex(e,t);s>-1&&this.events[e].splice(s,1)}this.events[e].push({listener:t,boundObj:i})}}off(e,t){if(Array.isArray(this.events[e])){let i=this.listenerIndex(e,t);if(i===-1)return;this.events[e].splice(i,1),this.events[e].length===0&&delete this.events[e]}}once(e,t,i){this.on(e,function s(){this.off(e,s);let r=typeof i>"u"?this:i;t.apply(r,arguments)})}trigger(e){this.debug&&console&&console.log(`EventEmitter triggered: ${e}`);let t=[].slice.call(arguments,1);Array.isArray(this.events[e])&&this.events[e].forEach(i=>{let s=i.boundObj===null?this:i.boundObj;i.listener.apply(s,t)})}};var Ve=class{constructor({header:e="",text:t=""}){this.header=e,this.text=t}toJSON(){let e={};return Object.getOwnPropertyNames(this).forEach(i=>{e[i]=this[i]}),e}};var qe=class{constructor({key:e="",charname:t="",updated:i="",key_prev:s="",version:r=""}){this.key=e,this.charname=t,this.updated=i,this.key_prev=s,this.version=r}get updatedTime(){return new Date(this.updated).toLocaleString()}get className(){return"Character"}get ruleset(){return"Generic"}get summaryHeader(){return`${this.charname} (${this.ruleset})`}_convertNotes(e){let t=[];return e.forEach(i=>{if(!(i&&typeof i!="object")){if(i instanceof Ve){t.push(i);return}if(Array.isArray(i)){t.push(new Ve({header:i[0]||"",text:i[1]||""}));return}t.push(new Ve(i))}}),t}toJSON(){let e={className:this.className};return Object.getOwnPropertyNames(this).forEach(i=>{if(i==="emitter")return;let s=this[i];Array.isArray(s)&&(s=s.map(r=>typeof r.toJSON=="function"?r.toJSON():r)),i.substring(0,1)==="_"?e[i.substring(1)]=s:e[i]=s}),e}};var K=Object.freeze({STRENGTH:"str",DEXTERITY:"dex",CONSTITUTION:"con",INTELLIGENCE:"intel",WISDOM:"wis",CHARISMA:"cha"}),Gi=Object.freeze({acrobatics:K.DEXTERITY,animal_handling:K.WISDOM,arcana:K.INTELLIGENCE,athletics:K.STRENGTH,deception:K.CHARISMA,history:K.INTELLIGENCE,insight:K.WISDOM,intimidation:K.CHARISMA,investigation:K.INTELLIGENCE,medicine:K.WISDOM,nature:K.INTELLIGENCE,perception:K.WISDOM,performance:K.CHARISMA,persuasion:K.CHARISMA,religion:K.INTELLIGENCE,sleight_of_hand:K.DEXTERITY,stealth:K.DEXTERITY,survival:K.WISDOM}),Gr=Object.freeze({UNSKILLED:0,PROFICIENT:1,EXPERT:2});var Be=class{constructor({name:e="",attack:t="",damage:i="",notes:s=""}){this.name=e,this.attack=t,this.damage=i,this.notes=s}toJSON(){let e={};return Object.getOwnPropertyNames(this).forEach(i=>{e[i]=this[i]}),e}};var St=class extends qe{constructor({key:e="",charname:t="",charclass:i="",race:s="",background:r="",alignment:o="",level:a=1,experience:c=0,inspiration:l="",armor_class:u="",speed:h=30,hp_cur:d="",hp_max:p="",hd_cur:b="",hd_max:S="",deathSave:A={success:0,fail:0},class_points:j={cur:0,max:0},str:M=10,dex:fe=10,con:le=10,intel:be=10,wis:Fe=10,cha:Ue=10,saves:qn={str:0,dex:0,con:0,intel:0,wis:0,cha:0},skills:Tt={acrobatics:0,animal_handling:0,arcana:0,athletics:0,deception:0,history:0,insight:0,intimidation:0,investigation:0,medicine:0,nature:0,perception:0,performance:0,persuasion:0,religion:0,sleight_of_hand:0,stealth:0,survival:0},weapons:Bn=[],proficiencies_other:Vr="",languages:qr="",traits:Br="",ideals:jr="",bonds:Hr="",flaws:$r="",appearance:Ym="",equipment:Xm=[],cp:Jm="",sp:Zm="",gp:ep="",pp:tp="",features:np=[],notes:ip="",notes_adv:sp=[],notes_cam:rp=[],npcs:op=[],factions:ap=[],partymembers:cp=[],spell_ability:lp="",spell_save:up="",spell_attack:hp="",spell_slots:dp={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0},spell_slots_cur:fp={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0},spells:mp={0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]},updated:pp="",key_prev:gp="",version:yp=""}){if(super({key:e,charname:t,updated:pp,key_prev:gp,version:yp}),this.charclass=i,this.race=s,this.background=r,this.alignment=o,this._level=a,this.experience=c,this.inspiration=l,this.armor_class=u,this.speed=h,this.hp_cur=d,this.hp_max=p,this.hd_cur=b,this.hd_max=S,this.deathSave=A,this.class_points=j,this.str=M,this.dex=fe,this.con=le,this.intel=be,this.wis=Fe,this.cha=Ue,this.saves=qn,this.skills=Tt,typeof this.skills.sleight_of_Hand<"u"){let me=this.skills.sleight_of_Hand;delete this.skills.sleight_of_Hand,this.skills.sleight_of_hand=me}this.weapons=[],Bn.forEach(me=>{if(!(me&&typeof me!="object")){if(Array.isArray(me)){this.weapons.push(new Be({name:me[0]||"",attack:me[1]||"",damage:me[2]||"",notes:me[3]||""}));return}if(me instanceof Be){this.weapons.push(me);return}this.weapons.push(new Be(me))}}),this.proficiencies_other=Vr,this.languages=qr,this.traits=Br,this.ideals=jr,this.bonds=Hr,this.flaws=$r,this.appearance=Ym,this.equipment=Xm,this.cp=Jm,this.sp=Zm,this.gp=ep,this.pp=tp,this.features=np,this.notes=ip,this.notes_adv=this._convertNotes(sp),this.notes_cam=this._convertNotes(rp),this.npcs=this._convertNotes(op),this.factions=this._convertNotes(ap),this.partymembers=this._convertNotes(cp),this.spell_ability=lp,this.spell_save=up,this.spell_attack=hp,this.spell_slots=dp,this.spell_slots_cur=fp,this.spells=mp,this.emitter=null}get className(){return"Character5e"}get ruleset(){return"5e"}get level(){return this._level}set level(e){let t=this.level;if(e===t)return;let i=this.proficiency;this._level=e;let s=this.proficiency;i!==s&&this.emitter&&this.emitter.trigger("character:proficiency:update")}get proficiency(){return`+${Math.ceil(this.level/4)+1}`}setAttribute(e,t){if(!(!this[e]||this[e]===t)&&(this[e]=t,this.emitter)){this.emitter.trigger("character:attribute:update",e);for(let s in Gi)Gi[s]===e&&this.emitter.trigger("character:skill:update",s,this.getSkillMod(s))}}attributeMod(e){let t=this[e];if(Number.isNaN(t))return"0";let i=Math.floor((t-10)/2);return i>0?`+${i}`:i.toString()}isProficient(e){return this.skills[e]>Gr.UNSKILLED}isExpert(e){return this.skills[e]===Gr.EXPERT}getSkillMod(e){let t=0;if(typeof this.skills[e]>"u")return 0;let s=Gi[e];s&&(t+=parseInt(this.attributeMod(s),10));let r=parseInt(this.proficiency,10);return this.isProficient(e)&&(t+=r),this.isExpert(e)&&(t+=r),t>0?`+${t}`:t.toString()}getSkill(e){let t=this.skills[e];return typeof t>"u"?null:t}setSkill(e,t){let i=this.getSkill(e);i===null||i===t||(this.skills[e]=t,this.emitter&&this.emitter.trigger("character:skill:update",e,this.getSkillMod(e)))}isSaveProficient(e){return this.saves[e]||0}saveMod(e){let t=0;this.isSaveProficient(e)&&(t=parseInt(this.proficiency,10));let i=0+t+parseInt(this.attributeMod(e),10);return i>0?`+${i}`:i.toString()}setSaveProficiency(e,t){let i=this.saves[e];typeof i>"u"||i!==t&&(this.saves[e]=t?1:0,this.emitter&&this.emitter.trigger("character:save:update",e))}};var kt=class extends qe{constructor({key:e="",charname:t="",level:i=1,conflict_approach:s="",goal:r="",gimmick:o="",background:a="",foreground:c="",weakness:l="",core_flaw:u="",techniques:h=[],traits:d=[],hp_cur:p=0,hp_max:b=0,armor:S=0,initiative:A="0",lineage:j=[],experience:M=0,appearance:fe="",personality:le="",inventory:be=[],coins:Fe=0,injuries:Ue=[],notes:qn="",notes_adv:Tt=[],notes_cam:Bn=[],npcs:Vr=[],factions:qr=[],partymembers:Br=[],updated:jr="",key_prev:Hr="",version:$r=""}){super({key:e,charname:t,updated:jr,key_prev:Hr,version:$r}),this.level=i,this.conflict_approach=s,this.goal=r,this.gimmick=o,this.background=a,this.foreground=c,this.weakness=l,this.core_flaw=u,this.techniques=h,this.traits=d,this.hp_cur=p,this.hp_max=b,this.armor=S,this.initiative=A,this.lineage=j,this.experience=M,this.appearance=fe,this.personality=le,this.inventory=be,this.coins=Fe,this.injuries=Ue,this.notes=qn,this.notes_adv=this._convertNotes(Tt),this.notes_cam=this._convertNotes(Bn),this.npcs=this._convertNotes(Vr),this.factions=this._convertNotes(qr),this.partymembers=this._convertNotes(Br),this.emitter=null}get className(){return"CharacterVagabonds"}get ruleset(){return"Vagabonds"}};var Ul={prefix:"",setPrefix:function(n){this.prefix=n},get:function(n){try{let e=localStorage.getItem(`${this.prefix}${n}`);return e!==null?JSON.parse(e):null}catch{return null}},set:function(n,e){try{localStorage.setItem(`${this.prefix}${n}`,JSON.stringify(e))}catch(t){return console.log(t.message),!1}return!0},remove:function(n){localStorage.removeItem(`${this.prefix}${n}`)},getAllKeys:function(){let n=[];if(localStorage.length>0){let e=new RegExp(`^(${this.prefix})+`,"i");for(let t=0;t<localStorage.length;t++){let i=localStorage.key(t);i=i.replace(e,""),n.push(i)}}return n},getAll:function(){let n=this.getAllKeys(),e=[];return n.forEach(t=>{let i=Ul.get(t);!i||!i.key||e.push(i)}),e}},nn=Ul;var ql=function(n){let e=[],t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},vp=function(n){let e=[],t=0,i=0;for(;t<n.length;){let s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){let r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){let r=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{let r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Bl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){let r=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,u=r>>2,h=(r&3)<<4|a>>4,d=(a&15)<<2|l>>6,p=l&63;c||(p=64,o||(d=64)),i.push(t[u],t[h],t[d],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ql(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):vp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){let r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;let l=s<n.length?t[n.charAt(s)]:64;++s;let h=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||l==null||h==null)throw Error();let d=r<<2|a>>4;if(i.push(d),l!==64){let p=a<<4&240|l>>2;if(i.push(p),h!==64){let b=l<<6&192|h;i.push(b)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},wp=function(n){let e=ql(n);return Bl.encodeByteArray(e,!0)},Hn=function(n){return wp(n).replace(/\./g,"")},Wr=function(n){try{return Bl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function bp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Ep=()=>bp().__FIREBASE_DEFAULTS__,_p=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ip=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Wr(n[1]);return e&&JSON.parse(e)},Qr=()=>{try{return Ep()||_p()||Ip()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Yr=n=>{var e,t;return(t=(e=Qr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},jl=n=>{let e=Yr(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Hl=()=>{var n;return(n=Qr())===null||n===void 0?void 0:n.config},Xr=n=>{var e;return(e=Qr())===null||e===void 0?void 0:e[`_${n}`]};var Ki=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}};function $l(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n),a="";return[Hn(JSON.stringify(t)),Hn(JSON.stringify(o)),a].join(".")}function z(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Gl(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(z())}function Kl(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function zl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Wl(){let n=z();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Jr(){try{return typeof indexedDB=="object"}catch{return!1}}function Ql(){return new Promise((n,e)=>{try{let t=!0,i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}var Tp="FirebaseError",se=class extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Tp,Object.setPrototypeOf(this,se.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,je.prototype.create)}},je=class{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){let i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Sp(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new se(s,a,i)}};function Sp(n,e){return n.replace(kp,(t,i)=>{let s=e[i];return s!=null?String(s):`<${i}?>`})}var kp=/\{\$([^}]+)}/g;function Yl(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ct(n,e){if(n===e)return!0;let t=Object.keys(n),i=Object.keys(e);for(let s of t){if(!i.includes(s))return!1;let r=n[s],o=e[s];if(Vl(r)&&Vl(o)){if(!Ct(r,o))return!1}else if(r!==o)return!1}for(let s of i)if(!t.includes(s))return!1;return!0}function Vl(n){return n!==null&&typeof n=="object"}function sn(n){let e=[];for(let[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function rn(n){let e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){let[s,r]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function on(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Xl(n,e){let t=new zr(n,e);return t.subscribe.bind(t)}var zr=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Cp(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Kr),s.error===void 0&&(s.error=Kr),s.complete===void 0&&(s.complete=Kr);let r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Cp(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Kr(){}var SE=4*60*60*1e3;function te(n){return n&&n._delegate?n._delegate:n}var pe=class{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Dt="[DEFAULT]";var Zr=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let i=new Ki;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let i=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ap(e))try{this.getOrInitializeService({instanceIdentifier:Dt})}catch{}for(let[t,i]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(t);try{let r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Dt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Dt){return this.instances.has(e)}getOptions(e=Dt){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(let[r,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){var i;let s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);let o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){let i=this.onInitCallbacks.get(t);if(i)for(let s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Dp(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Dt){return this.component?this.component.multipleInstances?e:Dt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Dp(n){return n===Dt?void 0:n}function Ap(n){return n.instantiationMode==="EAGER"}var zi=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Zr(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Np=[],N;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(N||(N={}));var xp={debug:N.DEBUG,verbose:N.VERBOSE,info:N.INFO,warn:N.WARN,error:N.ERROR,silent:N.SILENT},Rp=N.INFO,Lp={[N.DEBUG]:"log",[N.VERBOSE]:"log",[N.INFO]:"info",[N.WARN]:"warn",[N.ERROR]:"error"},Op=(n,e,...t)=>{if(e<n.logLevel)return;let i=new Date().toISOString(),s=Lp[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},it=class{constructor(e){this.name=e,this._logLevel=Rp,this._logHandler=Op,this._userLogHandler=null,Np.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in N))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?xp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,N.DEBUG,...e),this._logHandler(this,N.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,N.VERBOSE,...e),this._logHandler(this,N.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,N.INFO,...e),this._logHandler(this,N.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,N.WARN,...e),this._logHandler(this,N.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,N.ERROR,...e),this._logHandler(this,N.ERROR,...e)}};var Mp=(n,e)=>e.some(t=>n instanceof t),Jl,Zl;function Pp(){return Jl||(Jl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Fp(){return Zl||(Zl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var eu=new WeakMap,to=new WeakMap,tu=new WeakMap,eo=new WeakMap,io=new WeakMap;function Up(n){let e=new Promise((t,i)=>{let s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(ke(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&eu.set(t,n)}).catch(()=>{}),io.set(e,n),e}function Vp(n){if(to.has(n))return;let e=new Promise((t,i)=>{let s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});to.set(n,e)}var no={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return to.get(n);if(e==="objectStoreNames")return n.objectStoreNames||tu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ke(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function nu(n){no=n(no)}function qp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let i=n.call(Wi(this),e,...t);return tu.set(i,e.sort?e.sort():[e]),ke(i)}:Fp().includes(n)?function(...e){return n.apply(Wi(this),e),ke(eu.get(this))}:function(...e){return ke(n.apply(Wi(this),e))}}function Bp(n){return typeof n=="function"?qp(n):(n instanceof IDBTransaction&&Vp(n),Mp(n,Pp())?new Proxy(n,no):n)}function ke(n){if(n instanceof IDBRequest)return Up(n);if(eo.has(n))return eo.get(n);let e=Bp(n);return e!==n&&(eo.set(n,e),io.set(e,n)),e}var Wi=n=>io.get(n);function su(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){let o=indexedDB.open(n,e),a=ke(o);return i&&o.addEventListener("upgradeneeded",c=>{i(ke(o.result),c.oldVersion,c.newVersion,ke(o.transaction))}),t&&o.addEventListener("blocked",()=>t()),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",()=>s())}).catch(()=>{}),a}var jp=["get","getKey","getAll","getAllKeys","count"],Hp=["put","add","delete","clear"],so=new Map;function iu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(so.get(e))return so.get(e);let t=e.replace(/FromIndex$/,""),i=e!==t,s=Hp.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||jp.includes(t)))return;let r=async function(o,...a){let c=this.transaction(o,s?"readwrite":"readonly"),l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return so.set(e,r),r}nu(n=>({...n,get:(e,t,i)=>iu(e,t)||n.get(e,t,i),has:(e,t)=>!!iu(e,t)||n.has(e,t)}));var oo=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if($p(t)){let i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}};function $p(n){let e=n.getComponent();return e?.type==="VERSION"}var ao="@firebase/app",ru="0.9.1";var At=new it("@firebase/app"),Gp="@firebase/app-compat",Kp="@firebase/analytics-compat",zp="@firebase/analytics",Wp="@firebase/app-check-compat",Qp="@firebase/app-check",Yp="@firebase/auth",Xp="@firebase/auth-compat",Jp="@firebase/database",Zp="@firebase/database-compat",eg="@firebase/functions",tg="@firebase/functions-compat",ng="@firebase/installations",ig="@firebase/installations-compat",sg="@firebase/messaging",rg="@firebase/messaging-compat",og="@firebase/performance",ag="@firebase/performance-compat",cg="@firebase/remote-config",lg="@firebase/remote-config-compat",ug="@firebase/storage",hg="@firebase/storage-compat",dg="@firebase/firestore",fg="@firebase/firestore-compat",mg="firebase",pg="9.16.0";var co="[DEFAULT]",gg={[ao]:"fire-core",[Gp]:"fire-core-compat",[zp]:"fire-analytics",[Kp]:"fire-analytics-compat",[Qp]:"fire-app-check",[Wp]:"fire-app-check-compat",[Yp]:"fire-auth",[Xp]:"fire-auth-compat",[Jp]:"fire-rtdb",[Zp]:"fire-rtdb-compat",[eg]:"fire-fn",[tg]:"fire-fn-compat",[ng]:"fire-iid",[ig]:"fire-iid-compat",[sg]:"fire-fcm",[rg]:"fire-fcm-compat",[og]:"fire-perf",[ag]:"fire-perf-compat",[cg]:"fire-rc",[lg]:"fire-rc-compat",[ug]:"fire-gcs",[hg]:"fire-gcs-compat",[dg]:"fire-fst",[fg]:"fire-fst-compat","fire-js":"fire-js",[mg]:"fire-js-all"};var Qi=new Map,lo=new Map;function yg(n,e){try{n.container.addComponent(e)}catch(t){At.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function rt(n){let e=n.name;if(lo.has(e))return At.debug(`There were multiple attempts to register component ${e}.`),!1;lo.set(e,n);for(let t of Qi.values())yg(t,n);return!0}function Gn(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}var vg={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},st=new je("app","Firebase",vg);var uo=class{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new pe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw st.create("app-deleted",{appName:this._name})}};var Nt=pg;function mo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let i=Object.assign({name:co,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw st.create("bad-app-name",{appName:String(s)});if(t||(t=Hl()),!t)throw st.create("no-options");let r=Qi.get(s);if(r){if(Ct(t,r.options)&&Ct(i,r.config))return r;throw st.create("duplicate-app",{appName:s})}let o=new zi(s);for(let c of lo.values())o.addComponent(c);let a=new uo(t,i,o);return Qi.set(s,a),a}function Yi(n=co){let e=Qi.get(n);if(!e&&n===co)return mo();if(!e)throw st.create("no-app",{appName:n});return e}function Ee(n,e,t){var i;let s=(i=gg[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);let r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){let a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),At.warn(a.join(" "));return}rt(new pe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}var wg="firebase-heartbeat-database",bg=1,$n="firebase-heartbeat-store",ro=null;function lu(){return ro||(ro=su(wg,bg,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore($n)}}}).catch(n=>{throw st.create("idb-open",{originalErrorMessage:n.message})})),ro}async function Eg(n){try{return(await lu()).transaction($n).objectStore($n).get(uu(n))}catch(e){if(e instanceof se)At.warn(e.message);else{let t=st.create("idb-get",{originalErrorMessage:e?.message});At.warn(t.message)}}}async function ou(n,e){try{let i=(await lu()).transaction($n,"readwrite");return await i.objectStore($n).put(e,uu(n)),i.done}catch(t){if(t instanceof se)At.warn(t.message);else{let i=st.create("idb-set",{originalErrorMessage:t?.message});At.warn(i.message)}}}function uu(n){return`${n.name}!${n.options.appId}`}var _g=1024,Ig=30*24*60*60*1e3,ho=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new fo(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){let t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=au();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i)))return this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{let r=new Date(s.date).valueOf();return Date.now()-r<=Ig}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";let e=au(),{heartbeatsToSend:t,unsentEntries:i}=Tg(this._heartbeatsCache.heartbeats),s=Hn(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}};function au(){return new Date().toISOString().substring(0,10)}function Tg(n,e=_g){let t=[],i=n.slice();for(let s of n){let r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),cu(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),cu(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}var fo=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Jr()?Ql().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Eg(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let s=await this.read();return ou(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let s=await this.read();return ou(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}};function cu(n){return Hn(JSON.stringify({version:2,heartbeats:n})).length}function Sg(n){rt(new pe("platform-logger",e=>new oo(e),"PRIVATE")),rt(new pe("heartbeat",e=>new ho(e),"PRIVATE")),Ee(ao,ru,n),Ee(ao,ru,"esm2017"),Ee("fire-js","")}Sg("");var kg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ge={},g,Oo=Oo||{},I=kg||self;function is(){}function hs(n){var e=typeof n;return e=e!="object"?e:n?Array.isArray(n)?"array":e:"null",e=="array"||e=="object"&&typeof n.length=="number"}function ti(n){var e=typeof n;return e=="object"&&n!=null||e=="function"}function Cg(n){return Object.prototype.hasOwnProperty.call(n,po)&&n[po]||(n[po]=++Dg)}var po="closure_uid_"+(1e9*Math.random()>>>0),Dg=0;function Ag(n,e,t){return n.call.apply(n.bind,arguments)}function Ng(n,e,t){if(!n)throw Error();if(2<arguments.length){var i=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,i),n.apply(e,s)}}return function(){return n.apply(e,arguments)}}function ne(n,e,t){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?ne=Ag:ne=Ng,ne.apply(null,arguments)}function Xi(n,e){var t=Array.prototype.slice.call(arguments,1);return function(){var i=t.slice();return i.push.apply(i,arguments),n.apply(this,i)}}function ee(n,e){function t(){}t.prototype=e.prototype,n.X=e.prototype,n.prototype=new t,n.prototype.constructor=n,n.Wb=function(i,s,r){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[s].apply(i,o)}}function ot(){this.s=this.s,this.o=this.o}var xg=0;ot.prototype.s=!1;ot.prototype.na=function(){!this.s&&(this.s=!0,this.M(),xg!=0)&&Cg(this)};ot.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};var _u=Array.prototype.indexOf?function(n,e){return Array.prototype.indexOf.call(n,e,void 0)}:function(n,e){if(typeof n=="string")return typeof e!="string"||e.length!=1?-1:n.indexOf(e,0);for(let t=0;t<n.length;t++)if(t in n&&n[t]===e)return t;return-1};function Mo(n){let e=n.length;if(0<e){let t=Array(e);for(let i=0;i<e;i++)t[i]=n[i];return t}return[]}function hu(n,e){for(let t=1;t<arguments.length;t++){let i=arguments[t];if(hs(i)){let s=n.length||0,r=i.length||0;n.length=s+r;for(let o=0;o<r;o++)n[s+o]=i[o]}else n.push(i)}}function ie(n,e){this.type=n,this.g=this.target=e,this.defaultPrevented=!1}ie.prototype.h=function(){this.defaultPrevented=!0};var Rg=function(){if(!I.addEventListener||!Object.defineProperty)return!1;var n=!1,e=Object.defineProperty({},"passive",{get:function(){n=!0}});try{I.addEventListener("test",is,e),I.removeEventListener("test",is,e)}catch{}return n}();function ss(n){return/^[\s\xa0]*$/.test(n)}var du=String.prototype.trim?function(n){return n.trim()}:function(n){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(n)[1]};function go(n,e){return n<e?-1:n>e?1:0}function ds(){var n=I.navigator;return n&&(n=n.userAgent)?n:""}function Ce(n){return ds().indexOf(n)!=-1}function Po(n){return Po[" "](n),n}Po[" "]=is;function Lg(n){var e=Pg;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=n(9)}var Og=Ce("Opera"),cn=Ce("Trident")||Ce("MSIE"),Iu=Ce("Edge"),bo=Iu||cn,Tu=Ce("Gecko")&&!(ds().toLowerCase().indexOf("webkit")!=-1&&!Ce("Edge"))&&!(Ce("Trident")||Ce("MSIE"))&&!Ce("Edge"),Mg=ds().toLowerCase().indexOf("webkit")!=-1&&!Ce("Edge");function Su(){var n=I.document;return n?n.documentMode:void 0}var rs;e:{if(Ji="",Zi=function(){var n=ds();if(Tu)return/rv:([^\);]+)(\)|;)/.exec(n);if(Iu)return/Edge\/([\d\.]+)/.exec(n);if(cn)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(n);if(Mg)return/WebKit\/(\S+)/.exec(n);if(Og)return/(?:Version)[ \/]?(\S+)/.exec(n)}(),Zi&&(Ji=Zi?Zi[1]:""),cn&&(es=Su(),es!=null&&es>parseFloat(Ji))){rs=String(es);break e}rs=Ji}var Ji,Zi,es,Pg={};function Fg(){return Lg(function(){let n=0,e=du(String(rs)).split("."),t=du("9").split("."),i=Math.max(e.length,t.length);for(let o=0;n==0&&o<i;o++){var s=e[o]||"",r=t[o]||"";do{if(s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],r=/(\d*)(\D*)(.*)/.exec(r)||["","","",""],s[0].length==0&&r[0].length==0)break;n=go(s[1].length==0?0:parseInt(s[1],10),r[1].length==0?0:parseInt(r[1],10))||go(s[2].length==0,r[2].length==0)||go(s[2],r[2]),s=s[3],r=r[3]}while(n==0)}return 0<=n})}var Eo;I.document&&cn?(yo=Su(),Eo=yo||parseInt(rs,10)||void 0):Eo=void 0;var yo,Ug=Eo;function Yn(n,e){if(ie.call(this,n?n.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,n){var t=this.type=n.type,i=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:null;if(this.target=n.target||n.srcElement,this.g=e,e=n.relatedTarget){if(Tu){e:{try{Po(e.nodeName);var s=!0;break e}catch{}s=!1}s||(e=null)}}else t=="mouseover"?e=n.fromElement:t=="mouseout"&&(e=n.toElement);this.relatedTarget=e,i?(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0):(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0),this.button=n.button,this.key=n.key||"",this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.pointerId=n.pointerId||0,this.pointerType=typeof n.pointerType=="string"?n.pointerType:Vg[n.pointerType]||"",this.state=n.state,this.i=n,n.defaultPrevented&&Yn.X.h.call(this)}}ee(Yn,ie);var Vg={2:"touch",3:"pen",4:"mouse"};Yn.prototype.h=function(){Yn.X.h.call(this);var n=this.i;n.preventDefault?n.preventDefault():n.returnValue=!1};var ni="closure_listenable_"+(1e6*Math.random()|0),qg=0;function Bg(n,e,t,i,s){this.listener=n,this.proxy=null,this.src=e,this.type=t,this.capture=!!i,this.ha=s,this.key=++qg,this.ba=this.ea=!1}function fs(n){n.ba=!0,n.listener=null,n.proxy=null,n.src=null,n.ha=null}function Fo(n,e,t){for(let i in n)e.call(t,n[i],i,n)}function ku(n){let e={};for(let t in n)e[t]=n[t];return e}var fu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Cu(n,e){let t,i;for(let s=1;s<arguments.length;s++){i=arguments[s];for(t in i)n[t]=i[t];for(let r=0;r<fu.length;r++)t=fu[r],Object.prototype.hasOwnProperty.call(i,t)&&(n[t]=i[t])}}function ms(n){this.src=n,this.g={},this.h=0}ms.prototype.add=function(n,e,t,i,s){var r=n.toString();n=this.g[r],n||(n=this.g[r]=[],this.h++);var o=Io(n,e,i,s);return-1<o?(e=n[o],t||(e.ea=!1)):(e=new Bg(e,this.src,r,!!i,s),e.ea=t,n.push(e)),e};function _o(n,e){var t=e.type;if(t in n.g){var i=n.g[t],s=_u(i,e),r;(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(fs(e),n.g[t].length==0&&(delete n.g[t],n.h--))}}function Io(n,e,t,i){for(var s=0;s<n.length;++s){var r=n[s];if(!r.ba&&r.listener==e&&r.capture==!!t&&r.ha==i)return s}return-1}var Uo="closure_lm_"+(1e6*Math.random()|0),vo={};function Du(n,e,t,i,s){if(i&&i.once)return Nu(n,e,t,i,s);if(Array.isArray(e)){for(var r=0;r<e.length;r++)Du(n,e[r],t,i,s);return null}return t=Bo(t),n&&n[ni]?n.N(e,t,ti(i)?!!i.capture:!!i,s):Au(n,e,t,!1,i,s)}function Au(n,e,t,i,s,r){if(!e)throw Error("Invalid event type");var o=ti(s)?!!s.capture:!!s,a=qo(n);if(a||(n[Uo]=a=new ms(n)),t=a.add(e,t,i,o,r),t.proxy)return t;if(i=jg(),t.proxy=i,i.src=n,i.listener=t,n.addEventListener)Rg||(s=o),s===void 0&&(s=!1),n.addEventListener(e.toString(),i,s);else if(n.attachEvent)n.attachEvent(Ru(e.toString()),i);else if(n.addListener&&n.removeListener)n.addListener(i);else throw Error("addEventListener and attachEvent are unavailable.");return t}function jg(){function n(t){return e.call(n.src,n.listener,t)}let e=Hg;return n}function Nu(n,e,t,i,s){if(Array.isArray(e)){for(var r=0;r<e.length;r++)Nu(n,e[r],t,i,s);return null}return t=Bo(t),n&&n[ni]?n.O(e,t,ti(i)?!!i.capture:!!i,s):Au(n,e,t,!0,i,s)}function xu(n,e,t,i,s){if(Array.isArray(e))for(var r=0;r<e.length;r++)xu(n,e[r],t,i,s);else i=ti(i)?!!i.capture:!!i,t=Bo(t),n&&n[ni]?(n=n.i,e=String(e).toString(),e in n.g&&(r=n.g[e],t=Io(r,t,i,s),-1<t&&(fs(r[t]),Array.prototype.splice.call(r,t,1),r.length==0&&(delete n.g[e],n.h--)))):n&&(n=qo(n))&&(e=n.g[e.toString()],n=-1,e&&(n=Io(e,t,i,s)),(t=-1<n?e[n]:null)&&Vo(t))}function Vo(n){if(typeof n!="number"&&n&&!n.ba){var e=n.src;if(e&&e[ni])_o(e.i,n);else{var t=n.type,i=n.proxy;e.removeEventListener?e.removeEventListener(t,i,n.capture):e.detachEvent?e.detachEvent(Ru(t),i):e.addListener&&e.removeListener&&e.removeListener(i),(t=qo(e))?(_o(t,n),t.h==0&&(t.src=null,e[Uo]=null)):fs(n)}}}function Ru(n){return n in vo?vo[n]:vo[n]="on"+n}function Hg(n,e){if(n.ba)n=!0;else{e=new Yn(e,this);var t=n.listener,i=n.ha||n.src;n.ea&&Vo(n),n=t.call(i,e)}return n}function qo(n){return n=n[Uo],n instanceof ms?n:null}var wo="__closure_events_fn_"+(1e9*Math.random()>>>0);function Bo(n){return typeof n=="function"?n:(n[wo]||(n[wo]=function(e){return n.handleEvent(e)}),n[wo])}function W(){ot.call(this),this.i=new ms(this),this.P=this,this.I=null}ee(W,ot);W.prototype[ni]=!0;W.prototype.removeEventListener=function(n,e,t,i){xu(this,n,e,t,i)};function Z(n,e){var t,i=n.I;if(i)for(t=[];i;i=i.I)t.push(i);if(n=n.P,i=e.type||e,typeof e=="string")e=new ie(e,n);else if(e instanceof ie)e.target=e.target||n;else{var s=e;e=new ie(i,n),Cu(e,s)}if(s=!0,t)for(var r=t.length-1;0<=r;r--){var o=e.g=t[r];s=ts(o,i,!0,e)&&s}if(o=e.g=n,s=ts(o,i,!0,e)&&s,s=ts(o,i,!1,e)&&s,t)for(r=0;r<t.length;r++)o=e.g=t[r],s=ts(o,i,!1,e)&&s}W.prototype.M=function(){if(W.X.M.call(this),this.i){var n=this.i,e;for(e in n.g){for(var t=n.g[e],i=0;i<t.length;i++)fs(t[i]);delete n.g[e],n.h--}}this.I=null};W.prototype.N=function(n,e,t,i){return this.i.add(String(n),e,!1,t,i)};W.prototype.O=function(n,e,t,i){return this.i.add(String(n),e,!0,t,i)};function ts(n,e,t,i){if(e=n.i.g[String(e)],!e)return!0;e=e.concat();for(var s=!0,r=0;r<e.length;++r){var o=e[r];if(o&&!o.ba&&o.capture==t){var a=o.listener,c=o.ha||o.src;o.ea&&_o(n.i,o),s=a.call(c,i)!==!1&&s}}return s&&!i.defaultPrevented}var jo=I.JSON.stringify;function $g(){var n=Mu;let e=null;return n.g&&(e=n.g,n.g=n.g.next,n.g||(n.h=null),e.next=null),e}var To=class{constructor(){this.h=this.g=null}add(e,t){let i=Lu.get();i.set(e,t),this.h?this.h.next=i:this.g=i,this.h=i}},Lu=new class{constructor(n,e){this.i=n,this.j=e,this.h=0,this.g=null}get(){let n;return 0<this.h?(this.h--,n=this.g,this.g=n.next,n.next=null):n=this.i(),n}}(()=>new So,n=>n.reset()),So=class{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}};function Gg(n){I.setTimeout(()=>{throw n},0)}function Ou(n,e){ko||Kg(),Co||(ko(),Co=!0),Mu.add(n,e)}var ko;function Kg(){var n=I.Promise.resolve(void 0);ko=function(){n.then(zg)}}var Co=!1,Mu=new To;function zg(){for(var n;n=$g();){try{n.h.call(n.g)}catch(t){Gg(t)}var e=Lu;e.j(n),100>e.h&&(e.h++,n.next=e.g,e.g=n)}Co=!1}function ps(n,e){W.call(this),this.h=n||1,this.g=e||I,this.j=ne(this.lb,this),this.l=Date.now()}ee(ps,W);g=ps.prototype;g.ca=!1;g.R=null;g.lb=function(){if(this.ca){var n=Date.now()-this.l;0<n&&n<.8*this.h?this.R=this.g.setTimeout(this.j,this.h-n):(this.R&&(this.g.clearTimeout(this.R),this.R=null),Z(this,"tick"),this.ca&&(Ho(this),this.start()))}};g.start=function(){this.ca=!0,this.R||(this.R=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Ho(n){n.ca=!1,n.R&&(n.g.clearTimeout(n.R),n.R=null)}g.M=function(){ps.X.M.call(this),Ho(this),delete this.g};function $o(n,e,t){if(typeof n=="function")t&&(n=ne(n,t));else if(n&&typeof n.handleEvent=="function")n=ne(n.handleEvent,n);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:I.setTimeout(n,e||0)}function Pu(n){n.g=$o(()=>{n.g=null,n.i&&(n.i=!1,Pu(n))},n.j);let e=n.h;n.h=null,n.m.apply(null,e)}var Do=class extends ot{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:Pu(this)}M(){super.M(),this.g&&(I.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}};function Xn(n){ot.call(this),this.h=n,this.g={}}ee(Xn,ot);var mu=[];function Fu(n,e,t,i){Array.isArray(t)||(t&&(mu[0]=t.toString()),t=mu);for(var s=0;s<t.length;s++){var r=Du(e,t[s],i||n.handleEvent,!1,n.h||n);if(!r)break;n.g[r.key]=r}}function Uu(n){Fo(n.g,function(e,t){this.g.hasOwnProperty(t)&&Vo(e)},n),n.g={}}Xn.prototype.M=function(){Xn.X.M.call(this),Uu(this)};Xn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function gs(){this.g=!0}gs.prototype.Aa=function(){this.g=!1};function Wg(n,e,t,i,s,r){n.info(function(){if(n.g)if(r)for(var o="",a=r.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var h=u.split("_");o=2<=h.length&&h[1]=="type"?o+(u+"="+l+"&"):o+(u+"=redacted&")}}else o=null;else o=r;return"XMLHTTP REQ ("+i+") [attempt "+s+"]: "+e+`
`+t+`
`+o})}function Qg(n,e,t,i,s,r,o){n.info(function(){return"XMLHTTP RESP ("+i+") [ attempt "+s+"]: "+e+`
`+t+`
`+r+" "+o})}function an(n,e,t,i){n.info(function(){return"XMLHTTP TEXT ("+e+"): "+Xg(n,t)+(i?" "+i:"")})}function Yg(n,e){n.info(function(){return"TIMEOUT: "+e})}gs.prototype.info=function(){};function Xg(n,e){if(!n.g)return e;if(!e)return null;try{var t=JSON.parse(e);if(t){for(n=0;n<t.length;n++)if(Array.isArray(t[n])){var i=t[n];if(!(2>i.length)){var s=i[1];if(Array.isArray(s)&&!(1>s.length)){var r=s[0];if(r!="noop"&&r!="stop"&&r!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return jo(t)}catch{return e}}var Ot={},pu=null;function ys(){return pu=pu||new W}Ot.Pa="serverreachability";function Vu(n){ie.call(this,Ot.Pa,n)}ee(Vu,ie);function Jn(n){let e=ys();Z(e,new Vu(e))}Ot.STAT_EVENT="statevent";function qu(n,e){ie.call(this,Ot.STAT_EVENT,n),this.stat=e}ee(qu,ie);function re(n){let e=ys();Z(e,new qu(e,n))}Ot.Qa="timingevent";function Bu(n,e){ie.call(this,Ot.Qa,n),this.size=e}ee(Bu,ie);function ii(n,e){if(typeof n!="function")throw Error("Fn must not be null and must be a function");return I.setTimeout(function(){n()},e)}var vs={NO_ERROR:0,mb:1,zb:2,yb:3,tb:4,xb:5,Ab:6,Ma:7,TIMEOUT:8,Db:9},ju={rb:"complete",Nb:"success",Na:"error",Ma:"abort",Fb:"ready",Gb:"readystatechange",TIMEOUT:"timeout",Bb:"incrementaldata",Eb:"progress",ub:"downloadprogress",Vb:"uploadprogress"};function Go(){}Go.prototype.h=null;function gu(n){return n.h||(n.h=n.i())}function Hu(){}var si={OPEN:"a",qb:"b",Na:"c",Cb:"d"};function Ko(){ie.call(this,"d")}ee(Ko,ie);function zo(){ie.call(this,"c")}ee(zo,ie);var Ao;function ws(){}ee(ws,Go);ws.prototype.g=function(){return new XMLHttpRequest};ws.prototype.i=function(){return{}};Ao=new ws;function ri(n,e,t,i){this.l=n,this.j=e,this.m=t,this.U=i||1,this.S=new Xn(this),this.O=Jg,n=bo?125:void 0,this.T=new ps(n),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.V=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.Y=-1,this.I=!1,this.N=0,this.L=null,this.$=this.J=this.Z=this.P=!1,this.h=new $u}function $u(){this.i=null,this.g="",this.h=!1}var Jg=45e3,No={},os={};g=ri.prototype;g.setTimeout=function(n){this.O=n};function xo(n,e,t){n.K=1,n.v=Es($e(e)),n.s=t,n.P=!0,Gu(n,null)}function Gu(n,e){n.F=Date.now(),oi(n),n.A=$e(n.v);var t=n.A,i=n.U;Array.isArray(i)||(i=[String(i)]),Zu(t.i,"t",i),n.C=0,t=n.l.H,n.h=new $u,n.g=bh(n.l,t?e:null,!n.s),0<n.N&&(n.L=new Do(ne(n.La,n,n.g),n.N)),Fu(n.S,n.g,"readystatechange",n.ib),e=n.H?ku(n.H):{},n.s?(n.u||(n.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",n.g.da(n.A,n.u,n.s,e)):(n.u="GET",n.g.da(n.A,n.u,null,e)),Jn(),Wg(n.j,n.u,n.A,n.m,n.U,n.s)}g.ib=function(n){n=n.target;let e=this.L;e&&He(n)==3?e.l():this.La(n)};g.La=function(n){try{if(n==this.g)e:{let u=He(this.g);var e=this.g.Ea();let h=this.g.aa();if(!(3>u)&&(u!=3||bo||this.g&&(this.h.h||this.g.fa()||bu(this.g)))){this.I||u!=4||e==7||(e==8||0>=h?Jn(3):Jn(2)),bs(this);var t=this.g.aa();this.Y=t;t:if(Ku(this)){var i=bu(this.g);n="";var s=i.length,r=He(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){xt(this),Qn(this);var o="";break t}this.h.i=new I.TextDecoder}for(e=0;e<s;e++)this.h.h=!0,n+=this.h.i.decode(i[e],{stream:r&&e==s-1});i.splice(0,s),this.h.g+=n,this.C=0,o=this.h.g}else o=this.g.fa();if(this.i=t==200,Qg(this.j,this.u,this.A,this.m,this.U,u,t),this.i){if(this.Z&&!this.J){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!ss(a)){var l=a;break t}}l=null}if(t=l)an(this.j,this.m,t,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Ro(this,t);else{this.i=!1,this.o=3,re(12),xt(this),Qn(this);break e}}this.P?(zu(this,u,o),bo&&this.i&&u==3&&(Fu(this.S,this.T,"tick",this.hb),this.T.start())):(an(this.j,this.m,o,null),Ro(this,o)),u==4&&xt(this),this.i&&!this.I&&(u==4?gh(this.l,this):(this.i=!1,oi(this)))}else t==400&&0<o.indexOf("Unknown SID")?(this.o=3,re(12)):(this.o=0,re(13)),xt(this),Qn(this)}}}catch{}finally{}};function Ku(n){return n.g?n.u=="GET"&&n.K!=2&&n.l.Da:!1}function zu(n,e,t){let i=!0,s;for(;!n.I&&n.C<t.length;)if(s=Zg(n,t),s==os){e==4&&(n.o=4,re(14),i=!1),an(n.j,n.m,null,"[Incomplete Response]");break}else if(s==No){n.o=4,re(15),an(n.j,n.m,t,"[Invalid Chunk]"),i=!1;break}else an(n.j,n.m,s,null),Ro(n,s);Ku(n)&&s!=os&&s!=No&&(n.h.g="",n.C=0),e!=4||t.length!=0||n.h.h||(n.o=1,re(16),i=!1),n.i=n.i&&i,i?0<t.length&&!n.$&&(n.$=!0,e=n.l,e.g==n&&e.$&&!e.K&&(e.j.info("Great, no buffering proxy detected. Bytes received: "+t.length),ea(e),e.K=!0,re(11))):(an(n.j,n.m,t,"[Invalid Chunked Response]"),xt(n),Qn(n))}g.hb=function(){if(this.g){var n=He(this.g),e=this.g.fa();this.C<e.length&&(bs(this),zu(this,n,e),this.i&&n!=4&&oi(this))}};function Zg(n,e){var t=n.C,i=e.indexOf(`
`,t);return i==-1?os:(t=Number(e.substring(t,i)),isNaN(t)?No:(i+=1,i+t>e.length?os:(e=e.substr(i,t),n.C=i+t,e)))}g.cancel=function(){this.I=!0,xt(this)};function oi(n){n.V=Date.now()+n.O,Wu(n,n.O)}function Wu(n,e){if(n.B!=null)throw Error("WatchDog timer not null");n.B=ii(ne(n.gb,n),e)}function bs(n){n.B&&(I.clearTimeout(n.B),n.B=null)}g.gb=function(){this.B=null;let n=Date.now();0<=n-this.V?(Yg(this.j,this.A),this.K!=2&&(Jn(),re(17)),xt(this),this.o=2,Qn(this)):Wu(this,this.V-n)};function Qn(n){n.l.G==0||n.I||gh(n.l,n)}function xt(n){bs(n);var e=n.L;e&&typeof e.na=="function"&&e.na(),n.L=null,Ho(n.T),Uu(n.S),n.g&&(e=n.g,n.g=null,e.abort(),e.na())}function Ro(n,e){try{var t=n.l;if(t.G!=0&&(t.g==n||Lo(t.h,n))){if(!n.J&&Lo(t.h,n)&&t.G==3){try{var i=t.Fa.g.parse(e)}catch{i=null}if(Array.isArray(i)&&i.length==3){var s=i;if(s[0]==0){e:if(!t.u){if(t.g)if(t.g.F+3e3<n.F)ls(t),Ts(t);else break e;Zo(t),re(18)}}else t.Ba=s[1],0<t.Ba-t.T&&37500>s[2]&&t.L&&t.A==0&&!t.v&&(t.v=ii(ne(t.cb,t),6e3));if(1>=nh(t.h)&&t.ja){try{t.ja()}catch{}t.ja=void 0}}else Rt(t,11)}else if((n.J||t.g==n)&&ls(t),!ss(e))for(s=t.Fa.g.parse(e),e=0;e<s.length;e++){let l=s[e];if(t.T=l[0],l=l[1],t.G==2)if(l[0]=="c"){t.I=l[1],t.ka=l[2];let u=l[3];u!=null&&(t.ma=u,t.j.info("VER="+t.ma));let h=l[4];h!=null&&(t.Ca=h,t.j.info("SVER="+t.Ca));let d=l[5];d!=null&&typeof d=="number"&&0<d&&(i=1.5*d,t.J=i,t.j.info("backChannelRequestTimeoutMs_="+i)),i=t;let p=n.g;if(p){let b=p.g?p.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(b){var r=i.h;r.g||b.indexOf("spdy")==-1&&b.indexOf("quic")==-1&&b.indexOf("h2")==-1||(r.j=r.l,r.g=new Set,r.h&&(Wo(r,r.h),r.h=null))}if(i.D){let S=p.g?p.g.getResponseHeader("X-HTTP-Session-Id"):null;S&&(i.za=S,O(i.F,i.D,S))}}t.G=3,t.l&&t.l.xa(),t.$&&(t.P=Date.now()-n.F,t.j.info("Handshake RTT: "+t.P+"ms")),i=t;var o=n;if(i.sa=wh(i,i.H?i.ka:null,i.V),o.J){ih(i.h,o);var a=o,c=i.J;c&&a.setTimeout(c),a.B&&(bs(a),oi(a)),i.g=o}else mh(i);0<t.i.length&&Ss(t)}else l[0]!="stop"&&l[0]!="close"||Rt(t,7);else t.G==3&&(l[0]=="stop"||l[0]=="close"?l[0]=="stop"?Rt(t,7):Jo(t):l[0]!="noop"&&t.l&&t.l.wa(l),t.A=0)}}Jn(4)}catch{}}function ey(n){if(n.W&&typeof n.W=="function")return n.W();if(typeof Map<"u"&&n instanceof Map||typeof Set<"u"&&n instanceof Set)return Array.from(n.values());if(typeof n=="string")return n.split("");if(hs(n)){for(var e=[],t=n.length,i=0;i<t;i++)e.push(n[i]);return e}e=[],t=0;for(i in n)e[t++]=n[i];return e}function ty(n){if(n.oa&&typeof n.oa=="function")return n.oa();if(!n.W||typeof n.W!="function"){if(typeof Map<"u"&&n instanceof Map)return Array.from(n.keys());if(!(typeof Set<"u"&&n instanceof Set)){if(hs(n)||typeof n=="string"){var e=[];n=n.length;for(var t=0;t<n;t++)e.push(t);return e}e=[],t=0;for(let i in n)e[t++]=i;return e}}}function Qu(n,e){if(n.forEach&&typeof n.forEach=="function")n.forEach(e,void 0);else if(hs(n)||typeof n=="string")Array.prototype.forEach.call(n,e,void 0);else for(var t=ty(n),i=ey(n),s=i.length,r=0;r<s;r++)e.call(void 0,i[r],t&&t[r],n)}var Yu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ny(n,e){if(n){n=n.split("&");for(var t=0;t<n.length;t++){var i=n[t].indexOf("="),s=null;if(0<=i){var r=n[t].substring(0,i);s=n[t].substring(i+1)}else r=n[t];e(r,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function Lt(n,e){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,n instanceof Lt){this.h=e!==void 0?e:n.h,as(this,n.j),this.s=n.s,this.g=n.g,cs(this,n.m),this.l=n.l,e=n.i;var t=new Zn;t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),yu(this,t),this.o=n.o}else n&&(t=String(n).match(Yu))?(this.h=!!e,as(this,t[1]||"",!0),this.s=zn(t[2]||""),this.g=zn(t[3]||"",!0),cs(this,t[4]),this.l=zn(t[5]||"",!0),yu(this,t[6]||"",!0),this.o=zn(t[7]||"")):(this.h=!!e,this.i=new Zn(null,this.h))}Lt.prototype.toString=function(){var n=[],e=this.j;e&&n.push(Wn(e,vu,!0),":");var t=this.g;return(t||e=="file")&&(n.push("//"),(e=this.s)&&n.push(Wn(e,vu,!0),"@"),n.push(encodeURIComponent(String(t)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t=this.m,t!=null&&n.push(":",String(t))),(t=this.l)&&(this.g&&t.charAt(0)!="/"&&n.push("/"),n.push(Wn(t,t.charAt(0)=="/"?ry:sy,!0))),(t=this.i.toString())&&n.push("?",t),(t=this.o)&&n.push("#",Wn(t,ay)),n.join("")};function $e(n){return new Lt(n)}function as(n,e,t){n.j=t?zn(e,!0):e,n.j&&(n.j=n.j.replace(/:$/,""))}function cs(n,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);n.m=e}else n.m=null}function yu(n,e,t){e instanceof Zn?(n.i=e,cy(n.i,n.h)):(t||(e=Wn(e,oy)),n.i=new Zn(e,n.h))}function O(n,e,t){n.i.set(e,t)}function Es(n){return O(n,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),n}function zn(n,e){return n?e?decodeURI(n.replace(/%25/g,"%2525")):decodeURIComponent(n):""}function Wn(n,e,t){return typeof n=="string"?(n=encodeURI(n).replace(e,iy),t&&(n=n.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n):null}function iy(n){return n=n.charCodeAt(0),"%"+(n>>4&15).toString(16)+(n&15).toString(16)}var vu=/[#\/\?@]/g,sy=/[#\?:]/g,ry=/[#\?]/g,oy=/[#\?@]/g,ay=/#/g;function Zn(n,e){this.h=this.g=null,this.i=n||null,this.j=!!e}function at(n){n.g||(n.g=new Map,n.h=0,n.i&&ny(n.i,function(e,t){n.add(decodeURIComponent(e.replace(/\+/g," ")),t)}))}g=Zn.prototype;g.add=function(n,e){at(this),this.i=null,n=ln(this,n);var t=this.g.get(n);return t||this.g.set(n,t=[]),t.push(e),this.h+=1,this};function Xu(n,e){at(n),e=ln(n,e),n.g.has(e)&&(n.i=null,n.h-=n.g.get(e).length,n.g.delete(e))}function Ju(n,e){return at(n),e=ln(n,e),n.g.has(e)}g.forEach=function(n,e){at(this),this.g.forEach(function(t,i){t.forEach(function(s){n.call(e,s,i,this)},this)},this)};g.oa=function(){at(this);let n=Array.from(this.g.values()),e=Array.from(this.g.keys()),t=[];for(let i=0;i<e.length;i++){let s=n[i];for(let r=0;r<s.length;r++)t.push(e[i])}return t};g.W=function(n){at(this);let e=[];if(typeof n=="string")Ju(this,n)&&(e=e.concat(this.g.get(ln(this,n))));else{n=Array.from(this.g.values());for(let t=0;t<n.length;t++)e=e.concat(n[t])}return e};g.set=function(n,e){return at(this),this.i=null,n=ln(this,n),Ju(this,n)&&(this.h-=this.g.get(n).length),this.g.set(n,[e]),this.h+=1,this};g.get=function(n,e){return n?(n=this.W(n),0<n.length?String(n[0]):e):e};function Zu(n,e,t){Xu(n,e),0<t.length&&(n.i=null,n.g.set(ln(n,e),Mo(t)),n.h+=t.length)}g.toString=function(){if(this.i)return this.i;if(!this.g)return"";let n=[],e=Array.from(this.g.keys());for(var t=0;t<e.length;t++){var i=e[t];let r=encodeURIComponent(String(i)),o=this.W(i);for(i=0;i<o.length;i++){var s=r;o[i]!==""&&(s+="="+encodeURIComponent(String(o[i]))),n.push(s)}}return this.i=n.join("&")};function ln(n,e){return e=String(e),n.j&&(e=e.toLowerCase()),e}function cy(n,e){e&&!n.j&&(at(n),n.i=null,n.g.forEach(function(t,i){var s=i.toLowerCase();i!=s&&(Xu(this,i),Zu(this,s,t))},n)),n.j=e}var ly=class{constructor(n,e){this.h=n,this.g=e}};function eh(n){this.l=n||uy,I.PerformanceNavigationTiming?(n=I.performance.getEntriesByType("navigation"),n=0<n.length&&(n[0].nextHopProtocol=="hq"||n[0].nextHopProtocol=="h2")):n=!!(I.g&&I.g.Ga&&I.g.Ga()&&I.g.Ga().$b),this.j=n?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var uy=10;function th(n){return n.h?!0:n.g?n.g.size>=n.j:!1}function nh(n){return n.h?1:n.g?n.g.size:0}function Lo(n,e){return n.h?n.h==e:n.g?n.g.has(e):!1}function Wo(n,e){n.g?n.g.add(e):n.h=e}function ih(n,e){n.h&&n.h==e?n.h=null:n.g&&n.g.has(e)&&n.g.delete(e)}eh.prototype.cancel=function(){if(this.i=sh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let n of this.g.values())n.cancel();this.g.clear()}};function sh(n){if(n.h!=null)return n.i.concat(n.h.D);if(n.g!=null&&n.g.size!==0){let e=n.i;for(let t of n.g.values())e=e.concat(t.D);return e}return Mo(n.i)}function Qo(){}Qo.prototype.stringify=function(n){return I.JSON.stringify(n,void 0)};Qo.prototype.parse=function(n){return I.JSON.parse(n,void 0)};function hy(){this.g=new Qo}function dy(n,e,t){let i=t||"";try{Qu(n,function(s,r){let o=s;ti(s)&&(o=jo(s)),e.push(i+r+"="+encodeURIComponent(o))})}catch(s){throw e.push(i+"type="+encodeURIComponent("_badmap")),s}}function fy(n,e){let t=new gs;if(I.Image){let i=new Image;i.onload=Xi(ns,t,i,"TestLoadImage: loaded",!0,e),i.onerror=Xi(ns,t,i,"TestLoadImage: error",!1,e),i.onabort=Xi(ns,t,i,"TestLoadImage: abort",!1,e),i.ontimeout=Xi(ns,t,i,"TestLoadImage: timeout",!1,e),I.setTimeout(function(){i.ontimeout&&i.ontimeout()},1e4),i.src=n}else e(!1)}function ns(n,e,t,i,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(i)}catch{}}function ai(n){this.l=n.ac||null,this.j=n.jb||!1}ee(ai,Go);ai.prototype.g=function(){return new _s(this.l,this.j)};ai.prototype.i=function(n){return function(){return n}}({});function _s(n,e){W.call(this),this.D=n,this.u=e,this.m=void 0,this.readyState=Yo,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}ee(_s,W);var Yo=0;g=_s.prototype;g.open=function(n,e){if(this.readyState!=Yo)throw this.abort(),Error("Error reopening a connection");this.C=n,this.B=e,this.readyState=1,ei(this)};g.send=function(n){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};n&&(e.body=n),(this.D||I).fetch(new Request(this.B,e)).then(this.Wa.bind(this),this.ga.bind(this))};g.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ci(this)),this.readyState=Yo};g.Wa=function(n){if(this.g&&(this.l=n,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=n.headers,this.readyState=2,ei(this)),this.g&&(this.readyState=3,ei(this),this.g)))if(this.responseType==="arraybuffer")n.arrayBuffer().then(this.Ua.bind(this),this.ga.bind(this));else if(typeof I.ReadableStream<"u"&&"body"in n){if(this.j=n.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;rh(this)}else n.text().then(this.Va.bind(this),this.ga.bind(this))};function rh(n){n.j.read().then(n.Ta.bind(n)).catch(n.ga.bind(n))}g.Ta=function(n){if(this.g){if(this.u&&n.value)this.response.push(n.value);else if(!this.u){var e=n.value?n.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!n.done}))&&(this.response=this.responseText+=e)}n.done?ci(this):ei(this),this.readyState==3&&rh(this)}};g.Va=function(n){this.g&&(this.response=this.responseText=n,ci(this))};g.Ua=function(n){this.g&&(this.response=n,ci(this))};g.ga=function(){this.g&&ci(this)};function ci(n){n.readyState=4,n.l=null,n.j=null,n.A=null,ei(n)}g.setRequestHeader=function(n,e){this.v.append(n,e)};g.getResponseHeader=function(n){return this.h&&this.h.get(n.toLowerCase())||""};g.getAllResponseHeaders=function(){if(!this.h)return"";let n=[],e=this.h.entries();for(var t=e.next();!t.done;)t=t.value,n.push(t[0]+": "+t[1]),t=e.next();return n.join(`\r
`)};function ei(n){n.onreadystatechange&&n.onreadystatechange.call(n)}Object.defineProperty(_s.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(n){this.m=n?"include":"same-origin"}});var my=I.JSON.parse;function P(n){W.call(this),this.headers=new Map,this.u=n||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=oh,this.K=this.L=!1}ee(P,W);var oh="",py=/^https?$/i,gy=["POST","PUT"];g=P.prototype;g.Ka=function(n){this.L=n};g.da=function(n,e,t,i){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+n);e=e?e.toUpperCase():"GET",this.H=n,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():Ao.g(),this.C=this.u?gu(this.u):gu(Ao),this.g.onreadystatechange=ne(this.Ha,this);try{this.F=!0,this.g.open(e,String(n),!0),this.F=!1}catch(r){wu(this,r);return}if(n=t||"",t=new Map(this.headers),i)if(Object.getPrototypeOf(i)===Object.prototype)for(var s in i)t.set(s,i[s]);else if(typeof i.keys=="function"&&typeof i.get=="function")for(let r of i.keys())t.set(r,i.get(r));else throw Error("Unknown input type for opt_headers: "+String(i));i=Array.from(t.keys()).find(r=>r.toLowerCase()=="content-type"),s=I.FormData&&n instanceof I.FormData,!(0<=_u(gy,e))||i||s||t.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[r,o]of t)this.g.setRequestHeader(r,o);this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{lh(this),0<this.B&&((this.K=yy(this.g))?(this.g.timeout=this.B,this.g.ontimeout=ne(this.qa,this)):this.A=$o(this.qa,this.B,this)),this.v=!0,this.g.send(n),this.v=!1}catch(r){wu(this,r)}};function yy(n){return cn&&Fg()&&typeof n.timeout=="number"&&n.ontimeout!==void 0}g.qa=function(){typeof Oo<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,Z(this,"timeout"),this.abort(8))};function wu(n,e){n.h=!1,n.g&&(n.l=!0,n.g.abort(),n.l=!1),n.j=e,n.m=5,ah(n),Is(n)}function ah(n){n.D||(n.D=!0,Z(n,"complete"),Z(n,"error"))}g.abort=function(n){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=n||7,Z(this,"complete"),Z(this,"abort"),Is(this))};g.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Is(this,!0)),P.X.M.call(this)};g.Ha=function(){this.s||(this.F||this.v||this.l?ch(this):this.fb())};g.fb=function(){ch(this)};function ch(n){if(n.h&&typeof Oo<"u"&&(!n.C[1]||He(n)!=4||n.aa()!=2)){if(n.v&&He(n)==4)$o(n.Ha,0,n);else if(Z(n,"readystatechange"),He(n)==4){n.h=!1;try{let a=n.aa();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var t;if(!(t=e)){var i;if(i=a===0){var s=String(n.H).match(Yu)[1]||null;if(!s&&I.self&&I.self.location){var r=I.self.location.protocol;s=r.substr(0,r.length-1)}i=!py.test(s?s.toLowerCase():"")}t=i}if(t)Z(n,"complete"),Z(n,"success");else{n.m=6;try{var o=2<He(n)?n.g.statusText:""}catch{o=""}n.j=o+" ["+n.aa()+"]",ah(n)}}finally{Is(n)}}}}function Is(n,e){if(n.g){lh(n);let t=n.g,i=n.C[0]?is:null;n.g=null,n.C=null,e||Z(n,"ready");try{t.onreadystatechange=i}catch{}}}function lh(n){n.g&&n.K&&(n.g.ontimeout=null),n.A&&(I.clearTimeout(n.A),n.A=null)}function He(n){return n.g?n.g.readyState:0}g.aa=function(){try{return 2<He(this)?this.g.status:-1}catch{return-1}};g.fa=function(){try{return this.g?this.g.responseText:""}catch{return""}};g.Sa=function(n){if(this.g){var e=this.g.responseText;return n&&e.indexOf(n)==0&&(e=e.substring(n.length)),my(e)}};function bu(n){try{if(!n.g)return null;if("response"in n.g)return n.g.response;switch(n.J){case oh:case"text":return n.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in n.g)return n.g.mozResponseArrayBuffer}return null}catch{return null}}g.Ea=function(){return this.m};g.Oa=function(){return typeof this.j=="string"?this.j:String(this.j)};function uh(n){let e="";return Fo(n,function(t,i){e+=i,e+=":",e+=t,e+=`\r
`}),e}function Xo(n,e,t){e:{for(i in t){var i=!1;break e}i=!0}i||(t=uh(t),typeof n=="string"?t!=null&&encodeURIComponent(String(t)):O(n,e,t))}function Kn(n,e,t){return t&&t.internalChannelParams&&t.internalChannelParams[n]||e}function hh(n){this.Ca=0,this.i=[],this.j=new gs,this.ka=this.sa=this.F=this.V=this.g=this.za=this.D=this.ia=this.o=this.S=this.s=null,this.ab=this.U=0,this.Za=Kn("failFast",!1,n),this.L=this.v=this.u=this.m=this.l=null,this.Y=!0,this.pa=this.Ba=this.T=-1,this.Z=this.A=this.C=0,this.Xa=Kn("baseRetryDelayMs",5e3,n),this.bb=Kn("retryDelaySeedMs",1e4,n),this.$a=Kn("forwardChannelMaxRetries",2,n),this.ta=Kn("forwardChannelRequestTimeoutMs",2e4,n),this.ra=n&&n.xmlHttpFactory||void 0,this.Da=n&&n.Zb||!1,this.J=void 0,this.H=n&&n.supportsCrossDomainXhr||!1,this.I="",this.h=new eh(n&&n.concurrentRequestLimit),this.Fa=new hy,this.O=n&&n.fastHandshake||!1,this.N=n&&n.encodeInitMessageHeaders||!1,this.O&&this.N&&(this.N=!1),this.Ya=n&&n.Xb||!1,n&&n.Aa&&this.j.Aa(),n&&n.forceLongPolling&&(this.Y=!1),this.$=!this.O&&this.Y&&n&&n.detectBufferingProxy||!1,this.ja=void 0,this.P=0,this.K=!1,this.la=this.B=null}g=hh.prototype;g.ma=8;g.G=1;function Jo(n){if(dh(n),n.G==3){var e=n.U++,t=$e(n.F);O(t,"SID",n.I),O(t,"RID",e),O(t,"TYPE","terminate"),li(n,t),e=new ri(n,n.j,e,void 0),e.K=2,e.v=Es($e(t)),t=!1,I.navigator&&I.navigator.sendBeacon&&(t=I.navigator.sendBeacon(e.v.toString(),"")),!t&&I.Image&&(new Image().src=e.v,t=!0),t||(e.g=bh(e.l,null),e.g.da(e.v)),e.F=Date.now(),oi(e)}vh(n)}function Ts(n){n.g&&(ea(n),n.g.cancel(),n.g=null)}function dh(n){Ts(n),n.u&&(I.clearTimeout(n.u),n.u=null),ls(n),n.h.cancel(),n.m&&(typeof n.m=="number"&&I.clearTimeout(n.m),n.m=null)}function Ss(n){th(n.h)||n.m||(n.m=!0,Ou(n.Ja,n),n.C=0)}function vy(n,e){return nh(n.h)>=n.h.j-(n.m?1:0)?!1:n.m?(n.i=e.D.concat(n.i),!0):n.G==1||n.G==2||n.C>=(n.Za?0:n.$a)?!1:(n.m=ii(ne(n.Ja,n,e),yh(n,n.C)),n.C++,!0)}g.Ja=function(n){if(this.m)if(this.m=null,this.G==1){if(!n){this.U=Math.floor(1e5*Math.random()),n=this.U++;let s=new ri(this,this.j,n,void 0),r=this.s;if(this.S&&(r?(r=ku(r),Cu(r,this.S)):r=this.S),this.o!==null||this.N||(s.H=r,r=null),this.O)e:{for(var e=0,t=0;t<this.i.length;t++){t:{var i=this.i[t];if("__data__"in i.g&&(i=i.g.__data__,typeof i=="string")){i=i.length;break t}i=void 0}if(i===void 0)break;if(e+=i,4096<e){e=t;break e}if(e===4096||t===this.i.length-1){e=t+1;break e}}e=1e3}else e=1e3;e=fh(this,s,e),t=$e(this.F),O(t,"RID",n),O(t,"CVER",22),this.D&&O(t,"X-HTTP-Session-Id",this.D),li(this,t),r&&(this.N?e="headers="+encodeURIComponent(String(uh(r)))+"&"+e:this.o&&Xo(t,this.o,r)),Wo(this.h,s),this.Ya&&O(t,"TYPE","init"),this.O?(O(t,"$req",e),O(t,"SID","null"),s.Z=!0,xo(s,t,null)):xo(s,t,e),this.G=2}}else this.G==3&&(n?Eu(this,n):this.i.length==0||th(this.h)||Eu(this))};function Eu(n,e){var t;e?t=e.m:t=n.U++;let i=$e(n.F);O(i,"SID",n.I),O(i,"RID",t),O(i,"AID",n.T),li(n,i),n.o&&n.s&&Xo(i,n.o,n.s),t=new ri(n,n.j,t,n.C+1),n.o===null&&(t.H=n.s),e&&(n.i=e.D.concat(n.i)),e=fh(n,t,1e3),t.setTimeout(Math.round(.5*n.ta)+Math.round(.5*n.ta*Math.random())),Wo(n.h,t),xo(t,i,e)}function li(n,e){n.ia&&Fo(n.ia,function(t,i){O(e,i,t)}),n.l&&Qu({},function(t,i){O(e,i,t)})}function fh(n,e,t){t=Math.min(n.i.length,t);var i=n.l?ne(n.l.Ra,n.l,n):null;e:{var s=n.i;let r=-1;for(;;){let o=["count="+t];r==-1?0<t?(r=s[0].h,o.push("ofs="+r)):r=0:o.push("ofs="+r);let a=!0;for(let c=0;c<t;c++){let l=s[c].h,u=s[c].g;if(l-=r,0>l)r=Math.max(0,s[c].h-100),a=!1;else try{dy(u,o,"req"+l+"_")}catch{i&&i(u)}}if(a){i=o.join("&");break e}}}return n=n.i.splice(0,t),e.D=n,i}function mh(n){n.g||n.u||(n.Z=1,Ou(n.Ia,n),n.A=0)}function Zo(n){return n.g||n.u||3<=n.A?!1:(n.Z++,n.u=ii(ne(n.Ia,n),yh(n,n.A)),n.A++,!0)}g.Ia=function(){if(this.u=null,ph(this),this.$&&!(this.K||this.g==null||0>=this.P)){var n=2*this.P;this.j.info("BP detection timer enabled: "+n),this.B=ii(ne(this.eb,this),n)}};g.eb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.L=!1,this.K=!0,re(10),Ts(this),ph(this))};function ea(n){n.B!=null&&(I.clearTimeout(n.B),n.B=null)}function ph(n){n.g=new ri(n,n.j,"rpc",n.Z),n.o===null&&(n.g.H=n.s),n.g.N=0;var e=$e(n.sa);O(e,"RID","rpc"),O(e,"SID",n.I),O(e,"CI",n.L?"0":"1"),O(e,"AID",n.T),O(e,"TYPE","xmlhttp"),li(n,e),n.o&&n.s&&Xo(e,n.o,n.s),n.J&&n.g.setTimeout(n.J);var t=n.g;n=n.ka,t.K=1,t.v=Es($e(e)),t.s=null,t.P=!0,Gu(t,n)}g.cb=function(){this.v!=null&&(this.v=null,Ts(this),Zo(this),re(19))};function ls(n){n.v!=null&&(I.clearTimeout(n.v),n.v=null)}function gh(n,e){var t=null;if(n.g==e){ls(n),ea(n),n.g=null;var i=2}else if(Lo(n.h,e))t=e.D,ih(n.h,e),i=1;else return;if(n.G!=0){if(n.pa=e.Y,e.i)if(i==1){t=e.s?e.s.length:0,e=Date.now()-e.F;var s=n.C;i=ys(),Z(i,new Bu(i,t)),Ss(n)}else mh(n);else if(s=e.o,s==3||s==0&&0<n.pa||!(i==1&&vy(n,e)||i==2&&Zo(n)))switch(t&&0<t.length&&(e=n.h,e.i=e.i.concat(t)),s){case 1:Rt(n,5);break;case 4:Rt(n,10);break;case 3:Rt(n,6);break;default:Rt(n,2)}}}function yh(n,e){let t=n.Xa+Math.floor(Math.random()*n.bb);return n.l||(t*=2),t*e}function Rt(n,e){if(n.j.info("Error code "+e),e==2){var t=null;n.l&&(t=null);var i=ne(n.kb,n);t||(t=new Lt("//www.google.com/images/cleardot.gif"),I.location&&I.location.protocol=="http"||as(t,"https"),Es(t)),fy(t.toString(),i)}else re(2);n.G=0,n.l&&n.l.va(e),vh(n),dh(n)}g.kb=function(n){n?(this.j.info("Successfully pinged google.com"),re(2)):(this.j.info("Failed to ping google.com"),re(1))};function vh(n){if(n.G=0,n.la=[],n.l){let e=sh(n.h);(e.length!=0||n.i.length!=0)&&(hu(n.la,e),hu(n.la,n.i),n.h.i.length=0,Mo(n.i),n.i.length=0),n.l.ua()}}function wh(n,e,t){var i=t instanceof Lt?$e(t):new Lt(t,void 0);if(i.g!="")e&&(i.g=e+"."+i.g),cs(i,i.m);else{var s=I.location;i=s.protocol,e=e?e+"."+s.hostname:s.hostname,s=+s.port;var r=new Lt(null,void 0);i&&as(r,i),e&&(r.g=e),s&&cs(r,s),t&&(r.l=t),i=r}return t=n.D,e=n.za,t&&e&&O(i,t,e),O(i,"VER",n.ma),li(n,i),i}function bh(n,e,t){if(e&&!n.H)throw Error("Can't create secondary domain capable XhrIo object.");return e=t&&n.Da&&!n.ra?new P(new ai({jb:!0})):new P(n.ra),e.Ka(n.H),e}function Eh(){}g=Eh.prototype;g.xa=function(){};g.wa=function(){};g.va=function(){};g.ua=function(){};g.Ra=function(){};function us(){if(cn&&!(10<=Number(Ug)))throw Error("Environmental error: no available transport.")}us.prototype.g=function(n,e){return new ue(n,e)};function ue(n,e){W.call(this),this.g=new hh(e),this.l=n,this.h=e&&e.messageUrlParams||null,n=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(n?n["X-Client-Protocol"]="webchannel":n={"X-Client-Protocol":"webchannel"}),this.g.s=n,n=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(n?n["X-WebChannel-Content-Type"]=e.messageContentType:n={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(n?n["X-WebChannel-Client-Profile"]=e.ya:n={"X-WebChannel-Client-Profile":e.ya}),this.g.S=n,(n=e&&e.Yb)&&!ss(n)&&(this.g.o=n),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!ss(e)&&(this.g.D=e,n=this.h,n!==null&&e in n&&(n=this.h,e in n&&delete n[e])),this.j=new un(this)}ee(ue,W);ue.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.H=!0);var n=this.g,e=this.l,t=this.h||void 0;re(0),n.V=e,n.ia=t||{},n.L=n.Y,n.F=wh(n,null,n.V),Ss(n)};ue.prototype.close=function(){Jo(this.g)};ue.prototype.u=function(n){var e=this.g;if(typeof n=="string"){var t={};t.__data__=n,n=t}else this.v&&(t={},t.__data__=jo(n),n=t);e.i.push(new ly(e.ab++,n)),e.G==3&&Ss(e)};ue.prototype.M=function(){this.g.l=null,delete this.j,Jo(this.g),delete this.g,ue.X.M.call(this)};function _h(n){Ko.call(this);var e=n.__sm__;if(e){e:{for(let t in e){n=t;break e}n=void 0}(this.i=n)&&(n=this.i,e=e!==null&&n in e?e[n]:void 0),this.data=e}else this.data=n}ee(_h,Ko);function Ih(){zo.call(this),this.status=1}ee(Ih,zo);function un(n){this.g=n}ee(un,Eh);un.prototype.xa=function(){Z(this.g,"a")};un.prototype.wa=function(n){Z(this.g,new _h(n))};un.prototype.va=function(n){Z(this.g,new Ih)};un.prototype.ua=function(){Z(this.g,"b")};us.prototype.createWebChannel=us.prototype.g;ue.prototype.send=ue.prototype.u;ue.prototype.open=ue.prototype.m;ue.prototype.close=ue.prototype.close;vs.NO_ERROR=0;vs.TIMEOUT=8;vs.HTTP_ERROR=6;ju.COMPLETE="complete";Hu.EventType=si;si.OPEN="a";si.CLOSE="b";si.ERROR="c";si.MESSAGE="d";W.prototype.listen=W.prototype.N;P.prototype.listenOnce=P.prototype.O;P.prototype.getLastError=P.prototype.Oa;P.prototype.getLastErrorCode=P.prototype.Ea;P.prototype.getStatus=P.prototype.aa;P.prototype.getResponseJson=P.prototype.Sa;P.prototype.getResponseText=P.prototype.fa;P.prototype.send=P.prototype.da;P.prototype.setWithCredentials=P.prototype.Ka;var Th=Ge.createWebChannelTransport=function(){return new us},Sh=Ge.getStatEventTarget=function(){return ys()},ks=Ge.ErrorCode=vs,kh=Ge.EventType=ju,Ch=Ge.Event=Ot,ta=Ge.Stat={sb:0,vb:1,wb:2,Pb:3,Ub:4,Rb:5,Sb:6,Qb:7,Ob:8,Tb:9,PROXY:10,NOPROXY:11,Mb:12,Ib:13,Jb:14,Hb:15,Kb:16,Lb:17,ob:18,nb:19,pb:20},Dh=Ge.FetchXmlHttpFactory=ai,ui=Ge.WebChannel=Hu,Ah=Ge.XhrIo=P;var Nh="@firebase/firestore";var Q=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};Q.UNAUTHENTICATED=new Q(null),Q.GOOGLE_CREDENTIALS=new Q("google-credentials-uid"),Q.FIRST_PARTY=new Q("first-party-uid"),Q.MOCK_USER=new Q("mock-user");var An="9.16.0";var Ut=new it("@firebase/firestore");function xh(){return Ut.logLevel}function y(n,...e){if(Ut.logLevel<=N.DEBUG){let t=e.map(Cc);Ut.debug(`Firestore (${An}): ${n}`,...t)}}function ze(n,...e){if(Ut.logLevel<=N.ERROR){let t=e.map(Cc);Ut.error(`Firestore (${An}): ${n}`,...t)}}function sa(n,...e){if(Ut.logLevel<=N.WARN){let t=e.map(Cc);Ut.warn(`Firestore (${An}): ${n}`,...t)}}function Cc(n){if(typeof n=="string")return n;try{return e=n,JSON.stringify(e)}catch{return n}var e}function _(n="Unexpected state"){let e=`FIRESTORE (${An}) INTERNAL ASSERTION FAILED: `+n;throw ze(e),new Error(e)}function L(n,e){n||_()}function k(n,e){return n}var f={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},w=class extends se{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var _e=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Ns=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},ra=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Q.UNAUTHENTICATED))}shutdown(){}},oa=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},aa=class{constructor(e){this.t=e,this.currentUser=Q.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let i=this.i,s=c=>this.i!==i?(i=this.i,t(c)):Promise.resolve(),r=new _e;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new _e,e.enqueueRetryable(()=>s(this.currentUser))};let o=()=>{let c=r;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},a=c=>{y("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){let c=this.t.getImmediate({optional:!0});c?a(c):(y("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new _e)}},0),o()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(y("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(L(typeof i.accessToken=="string"),new Ns(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return L(e===null||typeof e=="string"),new Q(e)}},ca=class{constructor(e,t,i,s){this.h=e,this.l=t,this.m=i,this.g=s,this.type="FirstParty",this.user=Q.FIRST_PARTY,this.p=new Map}I(){return this.g?this.g():(L(!(typeof this.h!="object"||this.h===null||!this.h.auth||!this.h.auth.getAuthHeaderValueForFirstParty)),this.h.auth.getAuthHeaderValueForFirstParty([]))}get headers(){this.p.set("X-Goog-AuthUser",this.l);let e=this.I();return e&&this.p.set("Authorization",e),this.m&&this.p.set("X-Goog-Iam-Authorization-Token",this.m),this.p}},la=class{constructor(e,t,i,s){this.h=e,this.l=t,this.m=i,this.g=s}getToken(){return Promise.resolve(new ca(this.h,this.l,this.m,this.g))}start(e,t){e.enqueueRetryable(()=>t(Q.FIRST_PARTY))}shutdown(){}invalidateToken(){}},ua=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},ha=class{constructor(e){this.T=e,this.forceRefresh=!1,this.appCheck=null,this.A=null}start(e,t){let i=r=>{r.error!=null&&y("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);let o=r.token!==this.A;return this.A=r.token,y("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>i(r))};let s=r=>{y("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.appCheck.addTokenListener(this.o)};this.T.onInit(r=>s(r)),setTimeout(()=>{if(!this.appCheck){let r=this.T.getImmediate({optional:!0});r?s(r):y("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(L(typeof t.token=="string"),this.A=t.token,new ua(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}};function wy(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}var xs=class{static R(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,i="";for(;i.length<20;){let s=wy(40);for(let r=0;r<s.length;++r)i.length<20&&s[r]<t&&(i+=e.charAt(s[r]%e.length))}return i}};function x(n,e){return n<e?-1:n>e?1:0}function yn(n,e,t){return n.length===e.length&&n.every((i,s)=>t(i,e[s]))}var V=class{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new w(f.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new w(f.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new w(f.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new w(f.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return V.fromMillis(Date.now())}static fromDate(e){return V.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),i=Math.floor(1e6*(e-1e3*t));return new V(t,i)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?x(this.nanoseconds,e.nanoseconds):x(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var T=class{constructor(e){this.timestamp=e}static fromTimestamp(e){return new T(e)}static min(){return new T(new V(0,0))}static max(){return new T(new V(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Vt=class{constructor(e,t,i){t===void 0?t=0:t>e.length&&_(),i===void 0?i=e.length-t:i>e.length-t&&_(),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return Vt.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof Vt?e.forEach(i=>{t.push(i)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let i=Math.min(e.length,t.length);for(let s=0;s<i;s++){let r=e.get(s),o=t.get(s);if(r<o)return-1;if(r>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},R=class extends Vt{construct(e,t,i){return new R(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){let t=[];for(let i of e){if(i.indexOf("//")>=0)throw new w(f.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter(s=>s.length>0))}return new R(t)}static emptyPath(){return new R([])}},by=/^[_a-zA-Z][_a-zA-Z0-9]*$/,X=class extends Vt{construct(e,t,i){return new X(e,t,i)}static isValidIdentifier(e){return by.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),X.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new X(["__name__"])}static fromServerFormat(e){let t=[],i="",s=0,r=()=>{if(i.length===0)throw new w(f.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""},o=!1;for(;s<e.length;){let a=e[s];if(a==="\\"){if(s+1===e.length)throw new w(f.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new w(f.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=c,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(i+=a,s++):(r(),s++)}if(r(),o)throw new w(f.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new X(t)}static emptyPath(){return new X([])}};var v=class{constructor(e){this.path=e}static fromPath(e){return new v(R.fromString(e))}static fromName(e){return new v(R.fromString(e).popFirst(5))}static empty(){return new v(R.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&R.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return R.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new v(new R(e.slice()))}};var da=class{constructor(e,t,i,s){this.indexId=e,this.collectionGroup=t,this.fields=i,this.indexState=s}};da.UNKNOWN_ID=-1;function Ey(n,e){let t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,s=T.fromTimestamp(i===1e9?new V(t+1,0):new V(t,i));return new Ne(s,v.empty(),e)}function _y(n){return new Ne(n.readTime,n.key,-1)}var Ne=class{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new Ne(T.min(),v.empty(),-1)}static max(){return new Ne(T.max(),v.empty(),-1)}};function Iy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=v.comparator(n.documentKey,e.documentKey),t!==0?t:x(n.largestBatchId,e.largestBatchId))}var Ty="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",fa=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function Di(n){if(n.code!==f.FAILED_PRECONDITION||n.message!==Ty)throw n;y("LocalStore","Unexpectedly lost primary lease")}var m=class{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&_(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new m((i,s)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(i,s)},this.catchCallback=r=>{this.wrapFailure(t,r).next(i,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof m?t:m.resolve(t)}catch(t){return m.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):m.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):m.reject(t)}static resolve(e){return new m((t,i)=>{t(e)})}static reject(e){return new m((t,i)=>{i(e)})}static waitFor(e){return new m((t,i)=>{let s=0,r=0,o=!1;e.forEach(a=>{++s,a.next(()=>{++r,o&&r===s&&t()},c=>i(c))}),o=!0,r===s&&t()})}static or(e){let t=m.resolve(!1);for(let i of e)t=t.next(s=>s?m.resolve(s):i());return t}static forEach(e,t){let i=[];return e.forEach((s,r)=>{i.push(t.call(this,s,r))}),this.waitFor(i)}static mapArray(e,t){return new m((i,s)=>{let r=e.length,o=new Array(r),a=0;for(let c=0;c<r;c++){let l=c;t(e[l]).next(u=>{o[l]=u,++a,a===r&&i(o)},u=>s(u))}})}static doWhile(e,t){return new m((i,s)=>{let r=()=>{e()===!0?t().next(()=>{r()},s):i()};r()})}};function Ai(n){return n.name==="IndexedDbTransactionError"}var pi=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ut(i),this.ct=i=>t.writeSequenceNumber(i))}ut(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ct&&this.ct(e),e}};pi.at=-1;var ma=class{constructor(e,t,i,s,r,o,a,c){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=s,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.useFetchStreams=c}},qt=class{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new qt("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof qt&&e.projectId===this.projectId&&e.database===this.database}};function Rh(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Nn(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function ed(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function tr(n){return n==null}function gi(n){return n===0&&1/n==-1/0}function Sy(n){return typeof n=="number"&&Number.isInteger(n)&&!gi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var J=class{constructor(e){this.binaryString=e}static fromBase64String(e){let t=atob(e);return new J(t)}static fromUint8Array(e){let t=function(i){let s="";for(let r=0;r<i.length;++r)s+=String.fromCharCode(i[r]);return s}(e);return new J(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return x(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};J.EMPTY_BYTE_STRING=new J("");var ky=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function lt(n){if(L(!!n),typeof n=="string"){let e=0,t=ky.exec(n);if(L(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}let i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:F(n.seconds),nanos:F(n.nanos)}}function F(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Bt(n){return typeof n=="string"?J.fromBase64String(n):J.fromUint8Array(n)}function td(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function nd(n){let e=n.mapValue.fields.__previous_value__;return td(e)?nd(e):e}function yi(n){let e=lt(n.mapValue.fields.__local_write_time__.timestampValue);return new V(e.seconds,e.nanos)}var Cs={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function jt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?td(n)?4:id(n)?9007199254740991:10:_()}function xe(n,e){if(n===e)return!0;let t=jt(n);if(t!==jt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return yi(n).isEqual(yi(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let r=lt(i.timestampValue),o=lt(s.timestampValue);return r.seconds===o.seconds&&r.nanos===o.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Bt(i.bytesValue).isEqual(Bt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return F(i.geoPointValue.latitude)===F(s.geoPointValue.latitude)&&F(i.geoPointValue.longitude)===F(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return F(i.integerValue)===F(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let r=F(i.doubleValue),o=F(s.doubleValue);return r===o?gi(r)===gi(o):isNaN(r)&&isNaN(o)}return!1}(n,e);case 9:return yn(n.arrayValue.values||[],e.arrayValue.values||[],xe);case 10:return function(i,s){let r=i.mapValue.fields||{},o=s.mapValue.fields||{};if(Rh(r)!==Rh(o))return!1;for(let a in r)if(r.hasOwnProperty(a)&&(o[a]===void 0||!xe(r[a],o[a])))return!1;return!0}(n,e);default:return _()}}function vi(n,e){return(n.values||[]).find(t=>xe(t,e))!==void 0}function vn(n,e){if(n===e)return 0;let t=jt(n),i=jt(e);if(t!==i)return x(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return x(n.booleanValue,e.booleanValue);case 2:return function(s,r){let o=F(s.integerValue||s.doubleValue),a=F(r.integerValue||r.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(n,e);case 3:return Lh(n.timestampValue,e.timestampValue);case 4:return Lh(yi(n),yi(e));case 5:return x(n.stringValue,e.stringValue);case 6:return function(s,r){let o=Bt(s),a=Bt(r);return o.compareTo(a)}(n.bytesValue,e.bytesValue);case 7:return function(s,r){let o=s.split("/"),a=r.split("/");for(let c=0;c<o.length&&c<a.length;c++){let l=x(o[c],a[c]);if(l!==0)return l}return x(o.length,a.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,r){let o=x(F(s.latitude),F(r.latitude));return o!==0?o:x(F(s.longitude),F(r.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,r){let o=s.values||[],a=r.values||[];for(let c=0;c<o.length&&c<a.length;++c){let l=vn(o[c],a[c]);if(l)return l}return x(o.length,a.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,r){if(s===Cs.mapValue&&r===Cs.mapValue)return 0;if(s===Cs.mapValue)return 1;if(r===Cs.mapValue)return-1;let o=s.fields||{},a=Object.keys(o),c=r.fields||{},l=Object.keys(c);a.sort(),l.sort();for(let u=0;u<a.length&&u<l.length;++u){let h=x(a[u],l[u]);if(h!==0)return h;let d=vn(o[a[u]],c[l[u]]);if(d!==0)return d}return x(a.length,l.length)}(n.mapValue,e.mapValue);default:throw _()}}function Lh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return x(n,e);let t=lt(n),i=lt(e),s=x(t.seconds,i.seconds);return s!==0?s:x(t.nanos,i.nanos)}function wn(n){return pa(n)}function pa(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(i){let s=lt(i);return`time(${s.seconds},${s.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?Bt(n.bytesValue).toBase64():"referenceValue"in n?(t=n.referenceValue,v.fromName(t).toString()):"geoPointValue"in n?`geo(${(e=n.geoPointValue).latitude},${e.longitude})`:"arrayValue"in n?function(i){let s="[",r=!0;for(let o of i.values||[])r?r=!1:s+=",",s+=pa(o);return s+"]"}(n.arrayValue):"mapValue"in n?function(i){let s=Object.keys(i.fields||{}).sort(),r="{",o=!0;for(let a of s)o?o=!1:r+=",",r+=`${a}:${pa(i.fields[a])}`;return r+"}"}(n.mapValue):_();var e,t}function ga(n){return!!n&&"integerValue"in n}function Dc(n){return!!n&&"arrayValue"in n}function Oh(n){return!!n&&"nullValue"in n}function Mh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ds(n){return!!n&&"mapValue"in n}function di(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return Nn(n.mapValue.fields,(t,i)=>e.mapValue.fields[t]=di(i)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=di(n.arrayValue.values[t]);return e}return Object.assign({},n)}function id(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var bn=class{constructor(e,t){this.position=e,this.inclusive=t}};function Ph(n,e,t){let i=0;for(let s=0;s<n.position.length;s++){let r=e[s],o=n.position[s];if(r.field.isKeyField()?i=v.comparator(v.fromName(o.referenceValue),t.key):i=vn(o,t.data.field(r.field)),r.dir==="desc"&&(i*=-1),i!==0)break}return i}function Fh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!xe(n.position[t],e.position[t]))return!1;return!0}var Rs=class{},U=class extends Rs{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new va(e,t,i):t==="array-contains"?new Ea(e,i):t==="in"?new _a(e,i):t==="not-in"?new Ia(e,i):t==="array-contains-any"?new Ta(e,i):new U(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new wa(e,i):new ba(e,i)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(vn(t,this.value)):t!==null&&jt(this.value)===jt(t)&&this.matchesComparison(vn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return _()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}},ye=class extends Rs{constructor(e,t){super(),this.filters=e,this.op=t,this.ht=null}static create(e,t){return new ye(e,t)}matches(e){return sd(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ht!==null||(this.ht=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ht}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){let e=this.lt(t=>t.isInequality());return e!==null?e.field:null}lt(e){for(let t of this.getFlattenedFilters())if(e(t))return t;return null}};function sd(n){return n.op==="and"}function rd(n){return Cy(n)&&sd(n)}function Cy(n){for(let e of n.filters)if(e instanceof ye)return!1;return!0}function ya(n){if(n instanceof U)return n.field.canonicalString()+n.op.toString()+wn(n.value);if(rd(n))return n.filters.map(e=>ya(e)).join(",");{let e=n.filters.map(t=>ya(t)).join(",");return`${n.op}(${e})`}}function od(n,e){return n instanceof U?function(t,i){return i instanceof U&&t.op===i.op&&t.field.isEqual(i.field)&&xe(t.value,i.value)}(n,e):n instanceof ye?function(t,i){return i instanceof ye&&t.op===i.op&&t.filters.length===i.filters.length?t.filters.reduce((s,r,o)=>s&&od(r,i.filters[o]),!0):!1}(n,e):void _()}function ad(n){return n instanceof U?function(e){return`${e.field.canonicalString()} ${e.op} ${wn(e.value)}`}(n):n instanceof ye?function(e){return e.op.toString()+" {"+e.getFilters().map(ad).join(" ,")+"}"}(n):"Filter"}var va=class extends U{constructor(e,t,i){super(e,t,i),this.key=v.fromName(i.referenceValue)}matches(e){let t=v.comparator(e.key,this.key);return this.matchesComparison(t)}},wa=class extends U{constructor(e,t){super(e,"in",t),this.keys=cd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},ba=class extends U{constructor(e,t){super(e,"not-in",t),this.keys=cd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function cd(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(i=>v.fromName(i.referenceValue))}var Ea=class extends U{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return Dc(t)&&vi(t.arrayValue,this.value)}},_a=class extends U{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&vi(this.value.arrayValue,t)}},Ia=class extends U{constructor(e,t){super(e,"not-in",t)}matches(e){if(vi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!vi(this.value.arrayValue,t)}},Ta=class extends U{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!Dc(t)||!t.arrayValue.values)&&t.arrayValue.values.some(i=>vi(this.value.arrayValue,i))}};var Ft=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function Dy(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var B=class{constructor(e,t){this.comparator=e,this.root=t||G.EMPTY}insert(e,t){return new B(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,G.BLACK,null,null))}remove(e){return new B(this.comparator,this.root.remove(e,this.comparator).copy(null,null,G.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){let s=this.comparator(e,i.key);if(s===0)return t+i.left.size;s<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,i)=>(e(t,i),!1))}toString(){let e=[];return this.inorderTraversal((t,i)=>(e.push(`${t}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new fn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new fn(this.root,e,this.comparator,!1)}getReverseIterator(){return new fn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new fn(this.root,e,this.comparator,!0)}},fn=class{constructor(e,t,i,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?i(e.key,t):1,t&&s&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},G=class{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??G.RED,this.left=s??G.EMPTY,this.right=r??G.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,s,r){return new G(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this,r=i(e,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return G.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return G.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,G.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,G.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw _();let e=this.left.check();if(e!==this.right.check())throw _();return e+(this.isRed()?0:1)}};G.EMPTY=null,G.RED=!0,G.BLACK=!1;G.EMPTY=new class{constructor(){this.size=0}get key(){throw _()}get value(){throw _()}get color(){throw _()}get left(){throw _()}get right(){throw _()}copy(n,e,t,i,s){return this}insert(n,e,t){return new G(n,e)}remove(n,e){return this}isEmpty(){return!0}inorderTraversal(n){return!1}reverseTraversal(n){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var q=class{constructor(e){this.comparator=e,this.data=new B(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,i)=>(e(t),!1))}forEachInRange(e,t){let i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){let s=i.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ls(this.data.getIterator())}getIteratorFrom(e){return new Ls(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(i=>{t=t.add(i)}),t}isEqual(e){if(!(e instanceof q)||this.size!==e.size)return!1;let t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){let s=t.getNext().key,r=i.getNext().key;if(this.comparator(s,r)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new q(this.comparator);return t.data=e,t}},Ls=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var he=class{constructor(e){this.fields=e,e.sort(X.comparator)}static empty(){return new he([])}unionWith(e){let t=new q(X.comparator);for(let i of this.fields)t=t.add(i);for(let i of e)t=t.add(i);return new he(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return yn(this.fields,e.fields,(t,i)=>t.isEqual(i))}};var ce=class{constructor(e){this.value=e}static empty(){return new ce({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!Ds(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=di(t)}setAll(e){let t=X.emptyPath(),i={},s=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){let c=this.getFieldsMap(t);this.applyChanges(c,i,s),i={},s=[],t=a.popLast()}o?i[a.lastSegment()]=di(o):s.push(a.lastSegment())});let r=this.getFieldsMap(t);this.applyChanges(r,i,s)}delete(e){let t=this.field(e.popLast());Ds(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return xe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let s=t.mapValue.fields[e.get(i)];Ds(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,i){Nn(t,(s,r)=>e[s]=r);for(let s of i)delete e[s]}clone(){return new ce(di(this.value))}};function ld(n){let e=[];return Nn(n.fields,(t,i)=>{let s=new X([t]);if(Ds(i)){let r=ld(i.mapValue).fields;if(r.length===0)e.push(s);else for(let o of r)e.push(s.child(o))}else e.push(s)}),new he(e)}var Y=class{constructor(e,t,i,s,r,o,a){this.key=e,this.documentType=t,this.version=i,this.readTime=s,this.createTime=r,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Y(e,0,T.min(),T.min(),T.min(),ce.empty(),0)}static newFoundDocument(e,t,i,s){return new Y(e,1,t,T.min(),i,s,0)}static newNoDocument(e,t){return new Y(e,2,t,T.min(),T.min(),ce.empty(),0)}static newUnknownDocument(e,t){return new Y(e,3,t,T.min(),T.min(),ce.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(T.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ce.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ce.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=T.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Y&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Y(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Sa=class{constructor(e,t=null,i=[],s=[],r=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=s,this.limit=r,this.startAt=o,this.endAt=a,this.ft=null}};function Uh(n,e=null,t=[],i=[],s=null,r=null,o=null){return new Sa(n,e,t,i,s,r,o)}function Ac(n){let e=k(n);if(e.ft===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(i=>ya(i)).join(","),t+="|ob:",t+=e.orderBy.map(i=>function(s){return s.field.canonicalString()+s.dir}(i)).join(","),tr(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(i=>wn(i)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(i=>wn(i)).join(",")),e.ft=t}return e.ft}function Nc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Dy(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!od(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Fh(n.startAt,e.startAt)&&Fh(n.endAt,e.endAt)}function ka(n){return v.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var En=class{constructor(e,t=null,i=[],s=[],r=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=s,this.limit=r,this.limitType=o,this.startAt=a,this.endAt=c,this.dt=null,this._t=null,this.startAt,this.endAt}};function Ay(n,e,t,i,s,r,o,a){return new En(n,e,t,i,s,r,o,a)}function xc(n){return new En(n)}function Vh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ny(n){return n.explicitOrderBy.length>0?n.explicitOrderBy[0].field:null}function xy(n){for(let e of n.filters){let t=e.getFirstInequalityField();if(t!==null)return t}return null}function Ry(n){return n.collectionGroup!==null}function mn(n){let e=k(n);if(e.dt===null){e.dt=[];let t=xy(e),i=Ny(e);if(t!==null&&i===null)t.isKeyField()||e.dt.push(new Ft(t)),e.dt.push(new Ft(X.keyField(),"asc"));else{let s=!1;for(let r of e.explicitOrderBy)e.dt.push(r),r.field.isKeyField()&&(s=!0);if(!s){let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.dt.push(new Ft(X.keyField(),r))}}}return e.dt}function We(n){let e=k(n);if(!e._t)if(e.limitType==="F")e._t=Uh(e.path,e.collectionGroup,mn(e),e.filters,e.limit,e.startAt,e.endAt);else{let t=[];for(let r of mn(e)){let o=r.dir==="desc"?"asc":"desc";t.push(new Ft(r.field,o))}let i=e.endAt?new bn(e.endAt.position,e.endAt.inclusive):null,s=e.startAt?new bn(e.startAt.position,e.startAt.inclusive):null;e._t=Uh(e.path,e.collectionGroup,t,e.filters,e.limit,i,s)}return e._t}function Ca(n,e,t){return new En(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function nr(n,e){return Nc(We(n),We(e))&&n.limitType===e.limitType}function ud(n){return`${Ac(We(n))}|lt:${n.limitType}`}function Da(n){return`Query(target=${function(e){let t=e.path.canonicalString();return e.collectionGroup!==null&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(i=>ad(i)).join(", ")}]`),tr(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(i=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(i)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(i=>wn(i)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(i=>wn(i)).join(",")),`Target(${t})`}(We(n))}; limitType=${n.limitType})`}function Rc(n,e){return e.isFoundDocument()&&function(t,i){let s=i.key.path;return t.collectionGroup!==null?i.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(s):v.isDocumentKey(t.path)?t.path.isEqual(s):t.path.isImmediateParentOf(s)}(n,e)&&function(t,i){for(let s of mn(t))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(t,i){for(let s of t.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(t,i){return!(t.startAt&&!function(s,r,o){let a=Ph(s,r,o);return s.inclusive?a<=0:a<0}(t.startAt,mn(t),i)||t.endAt&&!function(s,r,o){let a=Ph(s,r,o);return s.inclusive?a>=0:a>0}(t.endAt,mn(t),i))}(n,e)}function Ly(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function hd(n){return(e,t)=>{let i=!1;for(let s of mn(n)){let r=Oy(s,e,t);if(r!==0)return r;i=i||s.field.isKeyField()}return 0}}function Oy(n,e,t){let i=n.field.isKeyField()?v.comparator(e.key,t.key):function(s,r,o){let a=r.data.field(s),c=o.data.field(s);return a!==null&&c!==null?vn(a,c):_()}(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return _()}}function dd(n,e){if(n.wt){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:gi(e)?"-0":e}}function fd(n){return{integerValue:""+n}}function My(n,e){return Sy(e)?fd(e):dd(n,e)}var _n=class{constructor(){this._=void 0}};function Py(n,e,t){return n instanceof In?function(i,s){let r={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&(r.fields.__previous_value__=s),{mapValue:r}}(t,e):n instanceof Ht?pd(n,e):n instanceof $t?gd(n,e):function(i,s){let r=md(i,s),o=qh(r)+qh(i.gt);return ga(r)&&ga(i.gt)?fd(o):dd(i.yt,o)}(n,e)}function Fy(n,e,t){return n instanceof Ht?pd(n,e):n instanceof $t?gd(n,e):t}function md(n,e){return n instanceof Tn?ga(t=e)||function(i){return!!i&&"doubleValue"in i}(t)?e:{integerValue:0}:null;var t}var In=class extends _n{},Ht=class extends _n{constructor(e){super(),this.elements=e}};function pd(n,e){let t=yd(e);for(let i of n.elements)t.some(s=>xe(s,i))||t.push(i);return{arrayValue:{values:t}}}var $t=class extends _n{constructor(e){super(),this.elements=e}};function gd(n,e){let t=yd(e);for(let i of n.elements)t=t.filter(s=>!xe(s,i));return{arrayValue:{values:t}}}var Tn=class extends _n{constructor(e,t){super(),this.yt=e,this.gt=t}};function qh(n){return F(n.integerValue||n.doubleValue)}function yd(n){return Dc(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Uy(n,e){return n.field.isEqual(e.field)&&function(t,i){return t instanceof Ht&&i instanceof Ht||t instanceof $t&&i instanceof $t?yn(t.elements,i.elements,xe):t instanceof Tn&&i instanceof Tn?xe(t.gt,i.gt):t instanceof In&&i instanceof In}(n.transform,e.transform)}var Aa=class{constructor(e,t){this.version=e,this.transformResults=t}},ge=class{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ge}static exists(e){return new ge(void 0,e)}static updateTime(e){return new ge(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function As(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Sn=class{};function vd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new wi(n.key,ge.none()):new Gt(n.key,n.data,ge.none());{let t=n.data,i=ce.empty(),s=new q(X.comparator);for(let r of e.fields)if(!s.has(r)){let o=t.field(r);o===null&&r.length>1&&(r=r.popLast(),o=t.field(r)),o===null?i.delete(r):i.set(r,o),s=s.add(r)}return new Qe(n.key,i,new he(s.toArray()),ge.none())}}function Vy(n,e,t){n instanceof Gt?function(i,s,r){let o=i.value.clone(),a=jh(i.fieldTransforms,s,r.transformResults);o.setAll(a),s.convertToFoundDocument(r.version,o).setHasCommittedMutations()}(n,e,t):n instanceof Qe?function(i,s,r){if(!As(i.precondition,s))return void s.convertToUnknownDocument(r.version);let o=jh(i.fieldTransforms,s,r.transformResults),a=s.data;a.setAll(wd(i)),a.setAll(o),s.convertToFoundDocument(r.version,a).setHasCommittedMutations()}(n,e,t):function(i,s,r){s.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,t)}function fi(n,e,t,i){return n instanceof Gt?function(s,r,o,a){if(!As(s.precondition,r))return o;let c=s.value.clone(),l=Hh(s.fieldTransforms,a,r);return c.setAll(l),r.convertToFoundDocument(r.version,c).setHasLocalMutations(),null}(n,e,t,i):n instanceof Qe?function(s,r,o,a){if(!As(s.precondition,r))return o;let c=Hh(s.fieldTransforms,a,r),l=r.data;return l.setAll(wd(s)),l.setAll(c),r.convertToFoundDocument(r.version,l).setHasLocalMutations(),o===null?null:o.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(u=>u.field))}(n,e,t,i):function(s,r,o){return As(s.precondition,r)?(r.convertToNoDocument(r.version).setHasLocalMutations(),null):o}(n,e,t)}function qy(n,e){let t=null;for(let i of n.fieldTransforms){let s=e.data.field(i.field),r=md(i.transform,s||null);r!=null&&(t===null&&(t=ce.empty()),t.set(i.field,r))}return t||null}function Bh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(t,i){return t===void 0&&i===void 0||!(!t||!i)&&yn(t,i,(s,r)=>Uy(s,r))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var Gt=class extends Sn{constructor(e,t,i,s=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}},Qe=class extends Sn{constructor(e,t,i,s,r=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}};function wd(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let i=n.data.field(t);e.set(t,i)}}),e}function jh(n,e,t){let i=new Map;L(n.length===t.length);for(let s=0;s<t.length;s++){let r=n[s],o=r.transform,a=e.data.field(r.field);i.set(r.field,Fy(o,a,t[s]))}return i}function Hh(n,e,t){let i=new Map;for(let s of n){let r=s.transform,o=t.data.field(s.field);i.set(s.field,Py(r,o,e))}return i}var wi=class extends Sn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},Na=class extends Sn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var xa=class{constructor(e){this.count=e}};var H,D;function By(n){switch(n){default:return _();case f.CANCELLED:case f.UNKNOWN:case f.DEADLINE_EXCEEDED:case f.RESOURCE_EXHAUSTED:case f.INTERNAL:case f.UNAVAILABLE:case f.UNAUTHENTICATED:return!1;case f.INVALID_ARGUMENT:case f.NOT_FOUND:case f.ALREADY_EXISTS:case f.PERMISSION_DENIED:case f.FAILED_PRECONDITION:case f.ABORTED:case f.OUT_OF_RANGE:case f.UNIMPLEMENTED:case f.DATA_LOSS:return!0}}function bd(n){if(n===void 0)return ze("GRPC error has no .code"),f.UNKNOWN;switch(n){case H.OK:return f.OK;case H.CANCELLED:return f.CANCELLED;case H.UNKNOWN:return f.UNKNOWN;case H.DEADLINE_EXCEEDED:return f.DEADLINE_EXCEEDED;case H.RESOURCE_EXHAUSTED:return f.RESOURCE_EXHAUSTED;case H.INTERNAL:return f.INTERNAL;case H.UNAVAILABLE:return f.UNAVAILABLE;case H.UNAUTHENTICATED:return f.UNAUTHENTICATED;case H.INVALID_ARGUMENT:return f.INVALID_ARGUMENT;case H.NOT_FOUND:return f.NOT_FOUND;case H.ALREADY_EXISTS:return f.ALREADY_EXISTS;case H.PERMISSION_DENIED:return f.PERMISSION_DENIED;case H.FAILED_PRECONDITION:return f.FAILED_PRECONDITION;case H.ABORTED:return f.ABORTED;case H.OUT_OF_RANGE:return f.OUT_OF_RANGE;case H.UNIMPLEMENTED:return f.UNIMPLEMENTED;case H.DATA_LOSS:return f.DATA_LOSS;default:return _()}}(D=H||(H={}))[D.OK=0]="OK",D[D.CANCELLED=1]="CANCELLED",D[D.UNKNOWN=2]="UNKNOWN",D[D.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",D[D.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",D[D.NOT_FOUND=5]="NOT_FOUND",D[D.ALREADY_EXISTS=6]="ALREADY_EXISTS",D[D.PERMISSION_DENIED=7]="PERMISSION_DENIED",D[D.UNAUTHENTICATED=16]="UNAUTHENTICATED",D[D.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",D[D.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",D[D.ABORTED=10]="ABORTED",D[D.OUT_OF_RANGE=11]="OUT_OF_RANGE",D[D.UNIMPLEMENTED=12]="UNIMPLEMENTED",D[D.INTERNAL=13]="INTERNAL",D[D.UNAVAILABLE=14]="UNAVAILABLE",D[D.DATA_LOSS=15]="DATA_LOSS";var ut=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(let[s,r]of i)if(this.equalsFn(s,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){let i=this.mapKeyFn(e),s=this.inner[i];if(s===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return void(s[r]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return i.length===1?delete this.inner[t]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Nn(this.inner,(t,i)=>{for(let[s,r]of i)e(s,r)})}isEmpty(){return ed(this.inner)}size(){return this.innerSize}};var jy=new B(v.comparator);function Ye(){return jy}var Ed=new B(v.comparator);function hi(...n){let e=Ed;for(let t of n)e=e.insert(t.key,t);return e}function _d(n){let e=Ed;return n.forEach((t,i)=>e=e.insert(t,i.overlayedDocument)),e}function Mt(){return mi()}function Id(){return mi()}function mi(){return new ut(n=>n.toString(),(n,e)=>n.isEqual(e))}var Hy=new B(v.comparator),$y=new q(v.comparator);function C(...n){let e=$y;for(let t of n)e=e.add(t);return e}var Gy=new q(x);function Td(){return Gy}var kn=class{constructor(e,t,i,s,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,i){let s=new Map;return s.set(e,Kt.createSynthesizedTargetChangeForCurrentChange(e,t,i)),new kn(T.min(),s,Td(),Ye(),C())}},Kt=class{constructor(e,t,i,s,r){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,i){return new Kt(i,t,C(),C(),C())}};var pn=class{constructor(e,t,i,s){this.It=e,this.removedTargetIds=t,this.key=i,this.Tt=s}},Os=class{constructor(e,t){this.targetId=e,this.Et=t}},Ms=class{constructor(e,t,i=J.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=s}},Ps=class{constructor(){this.At=0,this.Rt=Gh(),this.bt=J.EMPTY_BYTE_STRING,this.Pt=!1,this.vt=!0}get current(){return this.Pt}get resumeToken(){return this.bt}get Vt(){return this.At!==0}get St(){return this.vt}Dt(e){e.approximateByteSize()>0&&(this.vt=!0,this.bt=e)}Ct(){let e=C(),t=C(),i=C();return this.Rt.forEach((s,r)=>{switch(r){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:i=i.add(s);break;default:_()}}),new Kt(this.bt,this.Pt,e,t,i)}xt(){this.vt=!1,this.Rt=Gh()}Nt(e,t){this.vt=!0,this.Rt=this.Rt.insert(e,t)}kt(e){this.vt=!0,this.Rt=this.Rt.remove(e)}Ot(){this.At+=1}Mt(){this.At-=1}Ft(){this.vt=!0,this.Pt=!0}},Ra=class{constructor(e){this.$t=e,this.Bt=new Map,this.Lt=Ye(),this.qt=$h(),this.Ut=new q(x)}Kt(e){for(let t of e.It)e.Tt&&e.Tt.isFoundDocument()?this.Gt(t,e.Tt):this.Qt(t,e.key,e.Tt);for(let t of e.removedTargetIds)this.Qt(t,e.key,e.Tt)}jt(e){this.forEachTarget(e,t=>{let i=this.Wt(t);switch(e.state){case 0:this.zt(t)&&i.Dt(e.resumeToken);break;case 1:i.Mt(),i.Vt||i.xt(),i.Dt(e.resumeToken);break;case 2:i.Mt(),i.Vt||this.removeTarget(t);break;case 3:this.zt(t)&&(i.Ft(),i.Dt(e.resumeToken));break;case 4:this.zt(t)&&(this.Ht(t),i.Dt(e.resumeToken));break;default:_()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Bt.forEach((i,s)=>{this.zt(s)&&t(s)})}Jt(e){let t=e.targetId,i=e.Et.count,s=this.Yt(t);if(s){let r=s.target;if(ka(r))if(i===0){let o=new v(r.path);this.Qt(t,o,Y.newNoDocument(o,T.min()))}else L(i===1);else this.Xt(t)!==i&&(this.Ht(t),this.Ut=this.Ut.add(t))}}Zt(e){let t=new Map;this.Bt.forEach((r,o)=>{let a=this.Yt(o);if(a){if(r.current&&ka(a.target)){let c=new v(a.target.path);this.Lt.get(c)!==null||this.te(o,c)||this.Qt(o,c,Y.newNoDocument(c,e))}r.St&&(t.set(o,r.Ct()),r.xt())}});let i=C();this.qt.forEach((r,o)=>{let a=!0;o.forEachWhile(c=>{let l=this.Yt(c);return!l||l.purpose===2||(a=!1,!1)}),a&&(i=i.add(r))}),this.Lt.forEach((r,o)=>o.setReadTime(e));let s=new kn(e,t,this.Ut,this.Lt,i);return this.Lt=Ye(),this.qt=$h(),this.Ut=new q(x),s}Gt(e,t){if(!this.zt(e))return;let i=this.te(e,t.key)?2:0;this.Wt(e).Nt(t.key,i),this.Lt=this.Lt.insert(t.key,t),this.qt=this.qt.insert(t.key,this.ee(t.key).add(e))}Qt(e,t,i){if(!this.zt(e))return;let s=this.Wt(e);this.te(e,t)?s.Nt(t,1):s.kt(t),this.qt=this.qt.insert(t,this.ee(t).delete(e)),i&&(this.Lt=this.Lt.insert(t,i))}removeTarget(e){this.Bt.delete(e)}Xt(e){let t=this.Wt(e).Ct();return this.$t.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ot(e){this.Wt(e).Ot()}Wt(e){let t=this.Bt.get(e);return t||(t=new Ps,this.Bt.set(e,t)),t}ee(e){let t=this.qt.get(e);return t||(t=new q(x),this.qt=this.qt.insert(e,t)),t}zt(e){let t=this.Yt(e)!==null;return t||y("WatchChangeAggregator","Detected inactive target",e),t}Yt(e){let t=this.Bt.get(e);return t&&t.Vt?null:this.$t.ne(e)}Ht(e){this.Bt.set(e,new Ps),this.$t.getRemoteKeysForTarget(e).forEach(t=>{this.Qt(e,t,null)})}te(e,t){return this.$t.getRemoteKeysForTarget(e).has(t)}};function $h(){return new B(v.comparator)}function Gh(){return new B(v.comparator)}var Ky=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),zy=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Wy=(()=>({and:"AND",or:"OR"}))(),La=class{constructor(e,t){this.databaseId=e,this.wt=t}};function Fs(n,e){return n.wt?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Sd(n,e){return n.wt?e.toBase64():e.toUint8Array()}function Qy(n,e){return Fs(n,e.toTimestamp())}function De(n){return L(!!n),T.fromTimestamp(function(e){let t=lt(e);return new V(t.seconds,t.nanos)}(n))}function Lc(n,e){return function(t){return new R(["projects",t.projectId,"databases",t.database])}(n).child("documents").child(e).canonicalString()}function kd(n){let e=R.fromString(n);return L(Nd(e)),e}function Oa(n,e){return Lc(n.databaseId,e.path)}function na(n,e){let t=kd(e);if(t.get(1)!==n.databaseId.projectId)throw new w(f.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new w(f.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new v(Cd(t))}function Ma(n,e){return Lc(n.databaseId,e)}function Yy(n){let e=kd(n);return e.length===4?R.emptyPath():Cd(e)}function Pa(n){return new R(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Cd(n){return L(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Kh(n,e,t){return{name:Oa(n,e),fields:t.value.mapValue.fields}}function Xy(n,e){let t;if("targetChange"in e){e.targetChange;let i=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:_()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],r=function(c,l){return c.wt?(L(l===void 0||typeof l=="string"),J.fromBase64String(l||"")):(L(l===void 0||l instanceof Uint8Array),J.fromUint8Array(l||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){let l=c.code===void 0?f.UNKNOWN:bd(c.code);return new w(l,c.message||"")}(o);t=new Ms(i,s,r,a||null)}else if("documentChange"in e){e.documentChange;let i=e.documentChange;i.document,i.document.name,i.document.updateTime;let s=na(n,i.document.name),r=De(i.document.updateTime),o=i.document.createTime?De(i.document.createTime):T.min(),a=new ce({mapValue:{fields:i.document.fields}}),c=Y.newFoundDocument(s,r,o,a),l=i.targetIds||[],u=i.removedTargetIds||[];t=new pn(l,u,c.key,c)}else if("documentDelete"in e){e.documentDelete;let i=e.documentDelete;i.document;let s=na(n,i.document),r=i.readTime?De(i.readTime):T.min(),o=Y.newNoDocument(s,r),a=i.removedTargetIds||[];t=new pn([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;let i=e.documentRemove;i.document;let s=na(n,i.document),r=i.removedTargetIds||[];t=new pn([],r,s,null)}else{if(!("filter"in e))return _();{e.filter;let i=e.filter;i.targetId;let s=i.count||0,r=new xa(s),o=i.targetId;t=new Os(o,r)}}return t}function Jy(n,e){let t;if(e instanceof Gt)t={update:Kh(n,e.key,e.value)};else if(e instanceof wi)t={delete:Oa(n,e.key)};else if(e instanceof Qe)t={update:Kh(n,e.key,e.data),updateMask:av(e.fieldMask)};else{if(!(e instanceof Na))return _();t={verify:Oa(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(i=>function(s,r){let o=r.transform;if(o instanceof In)return{fieldPath:r.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof Ht)return{fieldPath:r.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof $t)return{fieldPath:r.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof Tn)return{fieldPath:r.field.canonicalString(),increment:o.gt};throw _()}(0,i))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Qy(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:_()}(n,e.precondition)),t}function Zy(n,e){return n&&n.length>0?(L(e!==void 0),n.map(t=>function(i,s){let r=i.updateTime?De(i.updateTime):De(s);return r.isEqual(T.min())&&(r=De(s)),new Aa(r,i.transformResults||[])}(t,e))):[]}function ev(n,e){return{documents:[Ma(n,e.path)]}}function tv(n,e){let t={structuredQuery:{}},i=e.path;e.collectionGroup!==null?(t.parent=Ma(n,i),t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(t.parent=Ma(n,i.popLast()),t.structuredQuery.from=[{collectionId:i.lastSegment()}]);let s=function(c){if(c.length!==0)return Ad(ye.create(c,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let r=function(c){if(c.length!==0)return c.map(l=>function(u){return{field:hn(u.field),direction:sv(u.dir)}}(l))}(e.orderBy);r&&(t.structuredQuery.orderBy=r);let o=function(c,l){return c.wt||tr(l)?l:{value:l}}(n,e.limit);var a;return o!==null&&(t.structuredQuery.limit=o),e.startAt&&(t.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),t}function nv(n){let e=Yy(n.parent),t=n.structuredQuery,i=t.from?t.from.length:0,s=null;if(i>0){L(i===1);let u=t.from[0];u.allDescendants?s=u.collectionId:e=e.child(u.collectionId)}let r=[];t.where&&(r=function(u){let h=Dd(u);return h instanceof ye&&rd(h)?h.getFilters():[h]}(t.where));let o=[];t.orderBy&&(o=t.orderBy.map(u=>function(h){return new Ft(dn(h.field),function(d){switch(d){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(u)));let a=null;t.limit&&(a=function(u){let h;return h=typeof u=="object"?u.value:u,tr(h)?null:h}(t.limit));let c=null;t.startAt&&(c=function(u){let h=!!u.before,d=u.values||[];return new bn(d,h)}(t.startAt));let l=null;return t.endAt&&(l=function(u){let h=!u.before,d=u.values||[];return new bn(d,h)}(t.endAt)),Ay(e,s,o,r,a,"F",c,l)}function iv(n,e){let t=function(i,s){switch(s){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return _()}}(0,e.purpose);return t==null?null:{"goog-listen-tags":t}}function Dd(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=dn(e.unaryFilter.field);return U.create(t,"==",{doubleValue:NaN});case"IS_NULL":let i=dn(e.unaryFilter.field);return U.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=dn(e.unaryFilter.field);return U.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let r=dn(e.unaryFilter.field);return U.create(r,"!=",{nullValue:"NULL_VALUE"});default:return _()}}(n):n.fieldFilter!==void 0?function(e){return U.create(dn(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return _()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return ye.create(e.compositeFilter.filters.map(t=>Dd(t)),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return _()}}(e.compositeFilter.op))}(n):_()}function sv(n){return Ky[n]}function rv(n){return zy[n]}function ov(n){return Wy[n]}function hn(n){return{fieldPath:n.canonicalString()}}function dn(n){return X.fromServerFormat(n.fieldPath)}function Ad(n){return n instanceof U?function(e){if(e.op==="=="){if(Mh(e.value))return{unaryFilter:{field:hn(e.field),op:"IS_NAN"}};if(Oh(e.value))return{unaryFilter:{field:hn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Mh(e.value))return{unaryFilter:{field:hn(e.field),op:"IS_NOT_NAN"}};if(Oh(e.value))return{unaryFilter:{field:hn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:hn(e.field),op:rv(e.op),value:e.value}}}(n):n instanceof ye?function(e){let t=e.getFilters().map(i=>Ad(i));return t.length===1?t[0]:{compositeFilter:{op:ov(e.op),filters:t}}}(n):_()}function av(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Nd(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var cv=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],JE=[...cv,"documentOverlays"],lv=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],uv=lv,ZE=[...uv,"indexConfiguration","indexState","indexEntries"];var Fa=class{constructor(e,t,i,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(e,t){let i=t.mutationResults;for(let s=0;s<this.mutations.length;s++){let r=this.mutations[s];r.key.isEqual(e.key)&&Vy(r,e,i[s])}}applyToLocalView(e,t){for(let i of this.baseMutations)i.key.isEqual(e.key)&&(t=fi(i,e,t,this.localWriteTime));for(let i of this.mutations)i.key.isEqual(e.key)&&(t=fi(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let i=Id();return this.mutations.forEach(s=>{let r=e.get(s.key),o=r.overlayedDocument,a=this.applyToLocalView(o,r.mutatedFields);a=t.has(s.key)?null:a;let c=vd(o,a);c!==null&&i.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(T.min())}),i}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),C())}isEqual(e){return this.batchId===e.batchId&&yn(this.mutations,e.mutations,(t,i)=>Bh(t,i))&&yn(this.baseMutations,e.baseMutations,(t,i)=>Bh(t,i))}},bi=class{constructor(e,t,i,s){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=s}static from(e,t,i){L(e.mutations.length===i.length);let s=Hy,r=e.mutations;for(let o=0;o<r.length;o++)s=s.insert(r[o].key,i[o].version);return new bi(e,t,i,s)}};var Ua=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var Ke=class{constructor(e,t,i,s,r=T.min(),o=T.min(),a=J.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a}withSequenceNumber(e){return new Ke(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new Ke(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new Ke(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}};var Va=class{constructor(e){this.ie=e}};function hv(n){let e=nv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ca(e,e.limit,"L"):e}var Us=class{constructor(){}ue(e,t){this.ce(e,t),t.ae()}ce(e,t){if("nullValue"in e)this.he(t,5);else if("booleanValue"in e)this.he(t,10),t.le(e.booleanValue?1:0);else if("integerValue"in e)this.he(t,15),t.le(F(e.integerValue));else if("doubleValue"in e){let i=F(e.doubleValue);isNaN(i)?this.he(t,13):(this.he(t,15),gi(i)?t.le(0):t.le(i))}else if("timestampValue"in e){let i=e.timestampValue;this.he(t,20),typeof i=="string"?t.fe(i):(t.fe(`${i.seconds||""}`),t.le(i.nanos||0))}else if("stringValue"in e)this.de(e.stringValue,t),this._e(t);else if("bytesValue"in e)this.he(t,30),t.we(Bt(e.bytesValue)),this._e(t);else if("referenceValue"in e)this.me(e.referenceValue,t);else if("geoPointValue"in e){let i=e.geoPointValue;this.he(t,45),t.le(i.latitude||0),t.le(i.longitude||0)}else"mapValue"in e?id(e)?this.he(t,Number.MAX_SAFE_INTEGER):(this.ge(e.mapValue,t),this._e(t)):"arrayValue"in e?(this.ye(e.arrayValue,t),this._e(t)):_()}de(e,t){this.he(t,25),this.pe(e,t)}pe(e,t){t.fe(e)}ge(e,t){let i=e.fields||{};this.he(t,55);for(let s of Object.keys(i))this.de(s,t),this.ce(i[s],t)}ye(e,t){let i=e.values||[];this.he(t,50);for(let s of i)this.ce(s,t)}me(e,t){this.he(t,37),v.fromName(e).path.forEach(i=>{this.he(t,60),this.pe(i,t)})}he(e,t){e.le(t)}_e(e){e.le(2)}};Us.Ie=new Us;var qa=class{constructor(){this.Je=new Ba}addToCollectionParentIndex(e,t){return this.Je.add(t),m.resolve()}getCollectionParents(e,t){return m.resolve(this.Je.getEntries(t))}addFieldIndex(e,t){return m.resolve()}deleteFieldIndex(e,t){return m.resolve()}getDocumentsMatchingTarget(e,t){return m.resolve(null)}getIndexType(e,t){return m.resolve(0)}getFieldIndexes(e,t){return m.resolve([])}getNextCollectionGroupToUpdate(e){return m.resolve(null)}getMinOffset(e,t){return m.resolve(Ne.min())}getMinOffsetFromCollectionGroup(e,t){return m.resolve(Ne.min())}updateCollectionGroup(e,t,i){return m.resolve()}updateIndexEntries(e,t){return m.resolve()}},Ba=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),i=e.popLast(),s=this.index[t]||new q(R.comparator),r=!s.has(i);return this.index[t]=s.add(i),r}has(e){let t=e.lastSegment(),i=e.popLast(),s=this.index[t];return s&&s.has(i)}getEntries(e){return(this.index[e]||new q(R.comparator)).toArray()}};var e_=new Uint8Array(0);var ae=class{constructor(e,t,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=i}static withCacheSize(e){return new ae(e,ae.DEFAULT_COLLECTION_PERCENTILE,ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};ae.DEFAULT_COLLECTION_PERCENTILE=10,ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ae.DEFAULT=new ae(41943040,ae.DEFAULT_COLLECTION_PERCENTILE,ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ae.DISABLED=new ae(-1,0,0);var ht=class{constructor(e){this.bn=e}next(){return this.bn+=2,this.bn}static Pn(){return new ht(0)}static vn(){return new ht(-1)}};var ja=class{constructor(){this.changes=new ut(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Y.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let i=this.changes.get(t);return i!==void 0?m.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var Ha=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var $a=class{constructor(e,t,i,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=s}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(i=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(i!==null&&fi(i.mutation,s,he.empty(),V.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.getLocalViewOfDocuments(e,i,C()).next(()=>i))}getLocalViewOfDocuments(e,t,i=C()){let s=Mt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,i).next(r=>{let o=hi();return r.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){let i=Mt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,C()))}populateOverlays(e,t,i){let s=[];return i.forEach(r=>{t.has(r)||s.push(r)}),this.documentOverlayCache.getOverlays(e,s).next(r=>{r.forEach((o,a)=>{t.set(o,a)})})}computeViews(e,t,i,s){let r=Ye(),o=mi(),a=mi();return t.forEach((c,l)=>{let u=i.get(l.key);s.has(l.key)&&(u===void 0||u.mutation instanceof Qe)?r=r.insert(l.key,l):u!==void 0?(o.set(l.key,u.mutation.getFieldMask()),fi(u.mutation,l,u.mutation.getFieldMask(),V.now())):o.set(l.key,he.empty())}),this.recalculateAndSaveOverlays(e,r).next(c=>(c.forEach((l,u)=>o.set(l,u)),t.forEach((l,u)=>{var h;return a.set(l,new Ha(u,(h=o.get(l))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,t){let i=mi(),s=new B((o,a)=>o-a),r=C();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(let a of o)a.keys().forEach(c=>{let l=t.get(c);if(l===null)return;let u=i.get(c)||he.empty();u=a.applyToLocalView(l,u),i.set(c,u);let h=(s.get(a.batchId)||C()).add(c);s=s.insert(a.batchId,h)})}).next(()=>{let o=[],a=s.getReverseIterator();for(;a.hasNext();){let c=a.getNext(),l=c.key,u=c.value,h=Id();u.forEach(d=>{if(!r.has(d)){let p=vd(t.get(d),i.get(d));p!==null&&h.set(d,p),r=r.add(d)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,h))}return m.waitFor(o)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,t,i){return function(s){return v.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ry(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i):this.getDocumentsMatchingCollectionQuery(e,t,i)}getNextDocuments(e,t,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,s).next(r=>{let o=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,s-r.size):m.resolve(Mt()),a=-1,c=r;return o.next(l=>m.forEach(l,(u,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),r.get(u)?m.resolve():this.remoteDocumentCache.getEntry(e,u).next(d=>{c=c.insert(u,d)}))).next(()=>this.populateOverlays(e,l,r)).next(()=>this.computeViews(e,c,l,C())).next(u=>({batchId:a,changes:_d(u)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new v(t)).next(i=>{let s=hi();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,i){let s=t.collectionGroup,r=hi();return this.indexManager.getCollectionParents(e,s).next(o=>m.forEach(o,a=>{let c=function(l,u){return new En(u,null,l.explicitOrderBy.slice(),l.filters.slice(),l.limit,l.limitType,l.startAt,l.endAt)}(t,a.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,i).next(l=>{l.forEach((u,h)=>{r=r.insert(u,h)})})}).next(()=>r))}getDocumentsMatchingCollectionQuery(e,t,i){let s;return this.remoteDocumentCache.getAllFromCollection(e,t.path,i).next(r=>(s=r,this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId))).next(r=>{r.forEach((a,c)=>{let l=c.getKey();s.get(l)===null&&(s=s.insert(l,Y.newInvalidDocument(l)))});let o=hi();return s.forEach((a,c)=>{let l=r.get(a);l!==void 0&&fi(l.mutation,c,he.empty(),V.now()),Rc(t,c)&&(o=o.insert(a,c))}),o})}};var Ga=class{constructor(e){this.yt=e,this.Zn=new Map,this.ts=new Map}getBundleMetadata(e,t){return m.resolve(this.Zn.get(t))}saveBundleMetadata(e,t){var i;return this.Zn.set(t.id,{id:(i=t).id,version:i.version,createTime:De(i.createTime)}),m.resolve()}getNamedQuery(e,t){return m.resolve(this.ts.get(t))}saveNamedQuery(e,t){return this.ts.set(t.name,function(i){return{name:i.name,query:hv(i.bundledQuery),readTime:De(i.readTime)}}(t)),m.resolve()}};var Ka=class{constructor(){this.overlays=new B(v.comparator),this.es=new Map}getOverlay(e,t){return m.resolve(this.overlays.get(t))}getOverlays(e,t){let i=Mt();return m.forEach(t,s=>this.getOverlay(e,s).next(r=>{r!==null&&i.set(s,r)})).next(()=>i)}saveOverlays(e,t,i){return i.forEach((s,r)=>{this.oe(e,t,r)}),m.resolve()}removeOverlaysForBatchId(e,t,i){let s=this.es.get(i);return s!==void 0&&(s.forEach(r=>this.overlays=this.overlays.remove(r)),this.es.delete(i)),m.resolve()}getOverlaysForCollection(e,t,i){let s=Mt(),r=t.length+1,o=new v(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){let c=a.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===r&&c.largestBatchId>i&&s.set(c.getKey(),c)}return m.resolve(s)}getOverlaysForCollectionGroup(e,t,i,s){let r=new B((l,u)=>l-u),o=this.overlays.getIterator();for(;o.hasNext();){let l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>i){let u=r.get(l.largestBatchId);u===null&&(u=Mt(),r=r.insert(l.largestBatchId,u)),u.set(l.getKey(),l)}}let a=Mt(),c=r.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((l,u)=>a.set(l,u)),!(a.size()>=s)););return m.resolve(a)}oe(e,t,i){let s=this.overlays.get(i.key);if(s!==null){let o=this.es.get(s.largestBatchId).delete(i.key);this.es.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(i.key,new Ua(t,i));let r=this.es.get(t);r===void 0&&(r=C(),this.es.set(t,r)),this.es.set(t,r.add(i.key))}};var Ei=class{constructor(){this.ns=new q($.ss),this.rs=new q($.os)}isEmpty(){return this.ns.isEmpty()}addReference(e,t){let i=new $(e,t);this.ns=this.ns.add(i),this.rs=this.rs.add(i)}us(e,t){e.forEach(i=>this.addReference(i,t))}removeReference(e,t){this.cs(new $(e,t))}hs(e,t){e.forEach(i=>this.removeReference(i,t))}ls(e){let t=new v(new R([])),i=new $(t,e),s=new $(t,e+1),r=[];return this.rs.forEachInRange([i,s],o=>{this.cs(o),r.push(o.key)}),r}fs(){this.ns.forEach(e=>this.cs(e))}cs(e){this.ns=this.ns.delete(e),this.rs=this.rs.delete(e)}ds(e){let t=new v(new R([])),i=new $(t,e),s=new $(t,e+1),r=C();return this.rs.forEachInRange([i,s],o=>{r=r.add(o.key)}),r}containsKey(e){let t=new $(e,0),i=this.ns.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}},$=class{constructor(e,t){this.key=e,this._s=t}static ss(e,t){return v.comparator(e.key,t.key)||x(e._s,t._s)}static os(e,t){return x(e._s,t._s)||v.comparator(e.key,t.key)}};var za=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.ws=1,this.gs=new q($.ss)}checkEmpty(e){return m.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,s){let r=this.ws;this.ws++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let o=new Fa(r,t,i,s);this.mutationQueue.push(o);for(let a of s)this.gs=this.gs.add(new $(a.key,r)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return m.resolve(o)}lookupMutationBatch(e,t){return m.resolve(this.ys(t))}getNextMutationBatchAfterBatchId(e,t){let i=t+1,s=this.ps(i),r=s<0?0:s;return m.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return m.resolve(this.mutationQueue.length===0?-1:this.ws-1)}getAllMutationBatches(e){return m.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let i=new $(t,0),s=new $(t,Number.POSITIVE_INFINITY),r=[];return this.gs.forEachInRange([i,s],o=>{let a=this.ys(o._s);r.push(a)}),m.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new q(x);return t.forEach(s=>{let r=new $(s,0),o=new $(s,Number.POSITIVE_INFINITY);this.gs.forEachInRange([r,o],a=>{i=i.add(a._s)})}),m.resolve(this.Is(i))}getAllMutationBatchesAffectingQuery(e,t){let i=t.path,s=i.length+1,r=i;v.isDocumentKey(r)||(r=r.child(""));let o=new $(new v(r),0),a=new q(x);return this.gs.forEachWhile(c=>{let l=c.key.path;return!!i.isPrefixOf(l)&&(l.length===s&&(a=a.add(c._s)),!0)},o),m.resolve(this.Is(a))}Is(e){let t=[];return e.forEach(i=>{let s=this.ys(i);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){L(this.Ts(t.batchId,"removed")===0),this.mutationQueue.shift();let i=this.gs;return m.forEach(t.mutations,s=>{let r=new $(s.key,t.batchId);return i=i.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.gs=i})}An(e){}containsKey(e,t){let i=new $(t,0),s=this.gs.firstAfterOrEqual(i);return m.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,m.resolve()}Ts(e,t){return this.ps(e)}ps(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}ys(e){let t=this.ps(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var Wa=class{constructor(e){this.Es=e,this.docs=new B(v.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let i=t.key,s=this.docs.get(i),r=s?s.size:0,o=this.Es(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let i=this.docs.get(t);return m.resolve(i?i.document.mutableCopy():Y.newInvalidDocument(t))}getEntries(e,t){let i=Ye();return t.forEach(s=>{let r=this.docs.get(s);i=i.insert(s,r?r.document.mutableCopy():Y.newInvalidDocument(s))}),m.resolve(i)}getAllFromCollection(e,t,i){let s=Ye(),r=new v(t.child("")),o=this.docs.getIteratorFrom(r);for(;o.hasNext();){let{key:a,value:{document:c}}=o.getNext();if(!t.isPrefixOf(a.path))break;a.path.length>t.length+1||Iy(_y(c),i)<=0||(s=s.insert(c.key,c.mutableCopy()))}return m.resolve(s)}getAllFromCollectionGroup(e,t,i,s){_()}As(e,t){return m.forEach(this.docs,i=>t(i))}newChangeBuffer(e){return new Qa(this)}getSize(e){return m.resolve(this.size)}},Qa=class extends ja{constructor(e){super(),this.Yn=e}applyChanges(e){let t=[];return this.changes.forEach((i,s)=>{s.isValidDocument()?t.push(this.Yn.addEntry(e,s)):this.Yn.removeEntry(i)}),m.waitFor(t)}getFromCache(e,t){return this.Yn.getEntry(e,t)}getAllFromCache(e,t){return this.Yn.getEntries(e,t)}};var Ya=class{constructor(e){this.persistence=e,this.Rs=new ut(t=>Ac(t),Nc),this.lastRemoteSnapshotVersion=T.min(),this.highestTargetId=0,this.bs=0,this.Ps=new Ei,this.targetCount=0,this.vs=ht.Pn()}forEachTarget(e,t){return this.Rs.forEach((i,s)=>t(s)),m.resolve()}getLastRemoteSnapshotVersion(e){return m.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return m.resolve(this.bs)}allocateTargetId(e){return this.highestTargetId=this.vs.next(),m.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.bs&&(this.bs=t),m.resolve()}Dn(e){this.Rs.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.vs=new ht(t),this.highestTargetId=t),e.sequenceNumber>this.bs&&(this.bs=e.sequenceNumber)}addTargetData(e,t){return this.Dn(t),this.targetCount+=1,m.resolve()}updateTargetData(e,t){return this.Dn(t),m.resolve()}removeTargetData(e,t){return this.Rs.delete(t.target),this.Ps.ls(t.targetId),this.targetCount-=1,m.resolve()}removeTargets(e,t,i){let s=0,r=[];return this.Rs.forEach((o,a)=>{a.sequenceNumber<=t&&i.get(a.targetId)===null&&(this.Rs.delete(o),r.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)}),m.waitFor(r).next(()=>s)}getTargetCount(e){return m.resolve(this.targetCount)}getTargetData(e,t){let i=this.Rs.get(t)||null;return m.resolve(i)}addMatchingKeys(e,t,i){return this.Ps.us(t,i),m.resolve()}removeMatchingKeys(e,t,i){this.Ps.hs(t,i);let s=this.persistence.referenceDelegate,r=[];return s&&t.forEach(o=>{r.push(s.markPotentiallyOrphaned(e,o))}),m.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.Ps.ls(t),m.resolve()}getMatchingKeysForTargetId(e,t){let i=this.Ps.ds(t);return m.resolve(i)}containsKey(e,t){return m.resolve(this.Ps.containsKey(t))}};var Xa=class{constructor(e,t){this.Vs={},this.overlays={},this.Ss=new pi(0),this.Ds=!1,this.Ds=!0,this.referenceDelegate=e(this),this.Cs=new Ya(this),this.indexManager=new qa,this.remoteDocumentCache=function(i){return new Wa(i)}(i=>this.referenceDelegate.xs(i)),this.yt=new Va(t),this.Ns=new Ga(this.yt)}start(){return Promise.resolve()}shutdown(){return this.Ds=!1,Promise.resolve()}get started(){return this.Ds}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Ka,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this.Vs[e.toKey()];return i||(i=new za(t,this.referenceDelegate),this.Vs[e.toKey()]=i),i}getTargetCache(){return this.Cs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ns}runTransaction(e,t,i){y("MemoryPersistence","Starting transaction:",e);let s=new Ja(this.Ss.next());return this.referenceDelegate.ks(),i(s).next(r=>this.referenceDelegate.Os(s).next(()=>r)).toPromise().then(r=>(s.raiseOnCommittedEvent(),r))}Ms(e,t){return m.or(Object.values(this.Vs).map(i=>()=>i.containsKey(e,t)))}},Ja=class extends fa{constructor(e){super(),this.currentSequenceNumber=e}},_i=class{constructor(e){this.persistence=e,this.Fs=new Ei,this.$s=null}static Bs(e){return new _i(e)}get Ls(){if(this.$s)return this.$s;throw _()}addReference(e,t,i){return this.Fs.addReference(i,t),this.Ls.delete(i.toString()),m.resolve()}removeReference(e,t,i){return this.Fs.removeReference(i,t),this.Ls.add(i.toString()),m.resolve()}markPotentiallyOrphaned(e,t){return this.Ls.add(t.toString()),m.resolve()}removeTarget(e,t){this.Fs.ls(t.targetId).forEach(s=>this.Ls.add(s.toString()));let i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(r=>this.Ls.add(r.toString()))}).next(()=>i.removeTargetData(e,t))}ks(){this.$s=new Set}Os(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return m.forEach(this.Ls,i=>{let s=v.fromPath(i);return this.qs(e,s).next(r=>{r||t.removeEntry(s,T.min())})}).next(()=>(this.$s=null,t.apply(e)))}updateLimboDocument(e,t){return this.qs(e,t).next(i=>{i?this.Ls.delete(t.toString()):this.Ls.add(t.toString())})}xs(e){return 0}qs(e,t){return m.or([()=>m.resolve(this.Fs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ms(e,t)])}};var Ii=class{constructor(e,t,i,s){this.targetId=e,this.fromCache=t,this.Si=i,this.Di=s}static Ci(e,t){let i=C(),s=C();for(let r of t.docChanges)switch(r.type){case 0:i=i.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new Ii(e,t.fromCache,i,s)}};var Za=class{constructor(){this.xi=!1}initialize(e,t){this.Ni=e,this.indexManager=t,this.xi=!0}getDocumentsMatchingQuery(e,t,i,s){return this.ki(e,t).next(r=>r||this.Oi(e,t,s,i)).next(r=>r||this.Mi(e,t))}ki(e,t){if(Vh(t))return m.resolve(null);let i=We(t);return this.indexManager.getIndexType(e,i).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Ca(t,null,"F"),i=We(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next(r=>{let o=C(...r);return this.Ni.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,i).next(c=>{let l=this.Fi(t,a);return this.$i(t,l,o,c.readTime)?this.ki(e,Ca(t,null,"F")):this.Bi(e,l,t,c)}))})))}Oi(e,t,i,s){return Vh(t)||s.isEqual(T.min())?this.Mi(e,t):this.Ni.getDocuments(e,i).next(r=>{let o=this.Fi(t,r);return this.$i(t,o,i,s)?this.Mi(e,t):(xh()<=N.DEBUG&&y("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Da(t)),this.Bi(e,o,t,Ey(s,-1)))})}Fi(e,t){let i=new q(hd(e));return t.forEach((s,r)=>{Rc(e,r)&&(i=i.add(r))}),i}$i(e,t,i,s){if(e.limit===null)return!1;if(i.size!==t.size)return!0;let r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}Mi(e,t){return xh()<=N.DEBUG&&y("QueryEngine","Using full collection scan to execute query:",Da(t)),this.Ni.getDocumentsMatchingQuery(e,t,Ne.min())}Bi(e,t,i,s){return this.Ni.getDocumentsMatchingQuery(e,i,s).next(r=>(t.forEach(o=>{r=r.insert(o.key,o)}),r))}};var ec=class{constructor(e,t,i,s){this.persistence=e,this.Li=t,this.yt=s,this.qi=new B(x),this.Ui=new ut(r=>Ac(r),Nc),this.Ki=new Map,this.Gi=e.getRemoteDocumentCache(),this.Cs=e.getTargetCache(),this.Ns=e.getBundleCache(),this.Qi(i)}Qi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new $a(this.Gi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Gi.setIndexManager(this.indexManager),this.Li.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.qi))}};function dv(n,e,t,i){return new ec(n,e,t,i)}async function xd(n,e){let t=k(n);return await t.persistence.runTransaction("Handle user change","readonly",i=>{let s;return t.mutationQueue.getAllMutationBatches(i).next(r=>(s=r,t.Qi(e),t.mutationQueue.getAllMutationBatches(i))).next(r=>{let o=[],a=[],c=C();for(let l of s){o.push(l.batchId);for(let u of l.mutations)c=c.add(u.key)}for(let l of r){a.push(l.batchId);for(let u of l.mutations)c=c.add(u.key)}return t.localDocuments.getDocuments(i,c).next(l=>({ji:l,removedBatchIds:o,addedBatchIds:a}))})})}function fv(n,e){let t=k(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{let s=e.batch.keys(),r=t.Gi.newChangeBuffer({trackRemovals:!0});return function(o,a,c,l){let u=c.batch,h=u.keys(),d=m.resolve();return h.forEach(p=>{d=d.next(()=>l.getEntry(a,p)).next(b=>{let S=c.docVersions.get(p);L(S!==null),b.version.compareTo(S)<0&&(u.applyToRemoteDocument(b,c),b.isValidDocument()&&(b.setReadTime(c.commitVersion),l.addEntry(b)))})}),d.next(()=>o.mutationQueue.removeMutationBatch(a,u))}(t,i,e,r).next(()=>r.apply(i)).next(()=>t.mutationQueue.performConsistencyCheck(i)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(i,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(o){let a=C();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(a=a.add(o.batch.mutations[c].key));return a}(e))).next(()=>t.localDocuments.getDocuments(i,s))})}function Rd(n){let e=k(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Cs.getLastRemoteSnapshotVersion(t))}function mv(n,e){let t=k(n),i=e.snapshotVersion,s=t.qi;return t.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{let o=t.Gi.newChangeBuffer({trackRemovals:!0});s=t.qi;let a=[];e.targetChanges.forEach((u,h)=>{let d=s.get(h);if(!d)return;a.push(t.Cs.removeMatchingKeys(r,u.removedDocuments,h).next(()=>t.Cs.addMatchingKeys(r,u.addedDocuments,h)));let p=d.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.has(h)?p=p.withResumeToken(J.EMPTY_BYTE_STRING,T.min()).withLastLimboFreeSnapshotVersion(T.min()):u.resumeToken.approximateByteSize()>0&&(p=p.withResumeToken(u.resumeToken,i)),s=s.insert(h,p),function(b,S,A){return b.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-b.snapshotVersion.toMicroseconds()>=3e8?!0:A.addedDocuments.size+A.modifiedDocuments.size+A.removedDocuments.size>0}(d,p,u)&&a.push(t.Cs.updateTargetData(r,p))});let c=Ye(),l=C();if(e.documentUpdates.forEach(u=>{e.resolvedLimboDocuments.has(u)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(r,u))}),a.push(pv(r,o,e.documentUpdates).next(u=>{c=u.Wi,l=u.zi})),!i.isEqual(T.min())){let u=t.Cs.getLastRemoteSnapshotVersion(r).next(h=>t.Cs.setTargetsMetadata(r,r.currentSequenceNumber,i));a.push(u)}return m.waitFor(a).next(()=>o.apply(r)).next(()=>t.localDocuments.getLocalViewOfDocuments(r,c,l)).next(()=>c)}).then(r=>(t.qi=s,r))}function pv(n,e,t){let i=C(),s=C();return t.forEach(r=>i=i.add(r)),e.getEntries(n,i).next(r=>{let o=Ye();return t.forEach((a,c)=>{let l=r.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(a)),c.isNoDocument()&&c.version.isEqual(T.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):y("LocalStore","Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)}),{Wi:o,zi:s}})}function gv(n,e){let t=k(n);return t.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}function yv(n,e){let t=k(n);return t.persistence.runTransaction("Allocate target","readwrite",i=>{let s;return t.Cs.getTargetData(i,e).next(r=>r?(s=r,m.resolve(s)):t.Cs.allocateTargetId(i).next(o=>(s=new Ke(e,o,0,i.currentSequenceNumber),t.Cs.addTargetData(i,s).next(()=>s))))}).then(i=>{let s=t.qi.get(i.targetId);return(s===null||i.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.qi=t.qi.insert(i.targetId,i),t.Ui.set(e,i.targetId)),i})}async function tc(n,e,t){let i=k(n),s=i.qi.get(e),r=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",r,o=>i.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Ai(o))throw o;y("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}i.qi=i.qi.remove(e),i.Ui.delete(s.target)}function zh(n,e,t){let i=k(n),s=T.min(),r=C();return i.persistence.runTransaction("Execute query","readonly",o=>function(a,c,l){let u=k(a),h=u.Ui.get(l);return h!==void 0?m.resolve(u.qi.get(h)):u.Cs.getTargetData(c,l)}(i,o,We(e)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,i.Cs.getMatchingKeysForTargetId(o,a.targetId).next(c=>{r=c})}).next(()=>i.Li.getDocumentsMatchingQuery(o,e,t?s:T.min(),t?r:C())).next(a=>(vv(i,Ly(e),a),{documents:a,Hi:r})))}function vv(n,e,t){let i=n.Ki.get(e)||T.min();t.forEach((s,r)=>{r.readTime.compareTo(i)>0&&(i=r.readTime)}),n.Ki.set(e,i)}var Vs=class{constructor(){this.activeTargetIds=Td()}er(e){this.activeTargetIds=this.activeTargetIds.add(e)}nr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tr(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var nc=class{constructor(){this.Lr=new Vs,this.qr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e){return this.Lr.er(e),this.qr[e]||"not-current"}updateQueryState(e,t,i){this.qr[e]=t}removeLocalQueryTarget(e){this.Lr.nr(e)}isLocalQueryTarget(e){return this.Lr.activeTargetIds.has(e)}clearQueryState(e){delete this.qr[e]}getAllActiveQueryTargets(){return this.Lr.activeTargetIds}isActiveQueryTarget(e){return this.Lr.activeTargetIds.has(e)}start(){return this.Lr=new Vs,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var ic=class{Ur(e){}shutdown(){}};var qs=class{constructor(){this.Kr=()=>this.Gr(),this.Qr=()=>this.jr(),this.Wr=[],this.zr()}Ur(e){this.Wr.push(e)}shutdown(){window.removeEventListener("online",this.Kr),window.removeEventListener("offline",this.Qr)}zr(){window.addEventListener("online",this.Kr),window.addEventListener("offline",this.Qr)}Gr(){y("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.Wr)e(0)}jr(){y("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.Wr)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var wv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var sc=class{constructor(e){this.Hr=e.Hr,this.Jr=e.Jr}Yr(e){this.Xr=e}Zr(e){this.eo=e}onMessage(e){this.no=e}close(){this.Jr()}send(e){this.Hr(e)}so(){this.Xr()}io(e){this.eo(e)}ro(e){this.no(e)}};var rc=class extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http";this.oo=t+"://"+e.host,this.uo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get co(){return!1}ao(e,t,i,s,r){let o=this.ho(e,t);y("RestConnection","Sending: ",o,i);let a={};return this.lo(a,s,r),this.fo(e,o,a,i).then(c=>(y("RestConnection","Received: ",c),c),c=>{throw sa("RestConnection",`${e} failed with error: `,c,"url: ",o,"request:",i),c})}_o(e,t,i,s,r,o){return this.ao(e,t,i,s,r)}lo(e,t,i){e["X-Goog-Api-Client"]="gl-js/ fire/"+An,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,r)=>e[r]=s),i&&i.headers.forEach((s,r)=>e[r]=s)}ho(e,t){let i=wv[e];return`${this.oo}/v1/${t}:${i}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}fo(e,t,i,s){return new Promise((r,o)=>{let a=new Ah;a.setWithCredentials(!0),a.listenOnce(kh.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case ks.NO_ERROR:let l=a.getResponseJson();y("Connection","XHR received:",JSON.stringify(l)),r(l);break;case ks.TIMEOUT:y("Connection",'RPC "'+e+'" timed out'),o(new w(f.DEADLINE_EXCEEDED,"Request time out"));break;case ks.HTTP_ERROR:let u=a.getStatus();if(y("Connection",'RPC "'+e+'" failed with status:',u,"response text:",a.getResponseText()),u>0){let h=a.getResponseJson();Array.isArray(h)&&(h=h[0]);let d=h?.error;if(d&&d.status&&d.message){let p=function(b){let S=b.toLowerCase().replace(/_/g,"-");return Object.values(f).indexOf(S)>=0?S:f.UNKNOWN}(d.status);o(new w(p,d.message))}else o(new w(f.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new w(f.UNAVAILABLE,"Connection failed."));break;default:_()}}finally{y("Connection",'RPC "'+e+'" completed.')}});let c=JSON.stringify(s);a.send(t,"POST",c,i,15)})}wo(e,t,i){let s=[this.oo,"/","google.firestore.v1.Firestore","/",e,"/channel"],r=Th(),o=Sh(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(a.xmlHttpFactory=new Dh({})),this.lo(a.initMessageHeaders,t,i),a.encodeInitMessageHeaders=!0;let c=s.join("");y("Connection","Creating WebChannel: "+c,a);let l=r.createWebChannel(c,a),u=!1,h=!1,d=new sc({Hr:b=>{h?y("Connection","Not sending because WebChannel is closed:",b):(u||(y("Connection","Opening WebChannel transport."),l.open(),u=!0),y("Connection","WebChannel sending:",b),l.send(b))},Jr:()=>l.close()}),p=(b,S,A)=>{b.listen(S,j=>{try{A(j)}catch(M){setTimeout(()=>{throw M},0)}})};return p(l,ui.EventType.OPEN,()=>{h||y("Connection","WebChannel transport opened.")}),p(l,ui.EventType.CLOSE,()=>{h||(h=!0,y("Connection","WebChannel transport closed"),d.io())}),p(l,ui.EventType.ERROR,b=>{h||(h=!0,sa("Connection","WebChannel transport errored:",b),d.io(new w(f.UNAVAILABLE,"The operation could not be completed")))}),p(l,ui.EventType.MESSAGE,b=>{var S;if(!h){let A=b.data[0];L(!!A);let j=A,M=j.error||((S=j[0])===null||S===void 0?void 0:S.error);if(M){y("Connection","WebChannel received error:",M);let fe=M.status,le=function(Fe){let Ue=H[Fe];if(Ue!==void 0)return bd(Ue)}(fe),be=M.message;le===void 0&&(le=f.INTERNAL,be="Unknown error status: "+fe+" with message "+M.message),h=!0,d.io(new w(le,be)),l.close()}else y("Connection","WebChannel received:",A),d.ro(A)}}),p(o,Ch.STAT_EVENT,b=>{b.stat===ta.PROXY?y("Connection","Detected buffering proxy"):b.stat===ta.NOPROXY&&y("Connection","Detected no buffering proxy")}),setTimeout(()=>{d.so()},0),d}};function ia(){return typeof document<"u"?document:null}function ir(n){return new La(n,!0)}var Bs=class{constructor(e,t,i=1e3,s=1.5,r=6e4){this.Hs=e,this.timerId=t,this.mo=i,this.yo=s,this.po=r,this.Io=0,this.To=null,this.Eo=Date.now(),this.reset()}reset(){this.Io=0}Ao(){this.Io=this.po}Ro(e){this.cancel();let t=Math.floor(this.Io+this.bo()),i=Math.max(0,Date.now()-this.Eo),s=Math.max(0,t-i);s>0&&y("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Io} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.To=this.Hs.enqueueAfterDelay(this.timerId,s,()=>(this.Eo=Date.now(),e())),this.Io*=this.yo,this.Io<this.mo&&(this.Io=this.mo),this.Io>this.po&&(this.Io=this.po)}Po(){this.To!==null&&(this.To.skipDelay(),this.To=null)}cancel(){this.To!==null&&(this.To.cancel(),this.To=null)}bo(){return(Math.random()-.5)*this.Io}};var js=class{constructor(e,t,i,s,r,o,a,c){this.Hs=e,this.vo=i,this.Vo=s,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.So=0,this.Do=null,this.Co=null,this.stream=null,this.xo=new Bs(e,t)}No(){return this.state===1||this.state===5||this.ko()}ko(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Oo()}async stop(){this.No()&&await this.close(0)}Mo(){this.state=0,this.xo.reset()}Fo(){this.ko()&&this.Do===null&&(this.Do=this.Hs.enqueueAfterDelay(this.vo,6e4,()=>this.$o()))}Bo(e){this.Lo(),this.stream.send(e)}async $o(){if(this.ko())return this.close(0)}Lo(){this.Do&&(this.Do.cancel(),this.Do=null)}qo(){this.Co&&(this.Co.cancel(),this.Co=null)}async close(e,t){this.Lo(),this.qo(),this.xo.cancel(),this.So++,e!==4?this.xo.reset():t&&t.code===f.RESOURCE_EXHAUSTED?(ze(t.toString()),ze("Using maximum backoff delay to prevent overloading the backend."),this.xo.Ao()):t&&t.code===f.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Uo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zr(t)}Uo(){}auth(){this.state=1;let e=this.Ko(this.So),t=this.So;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,s])=>{this.So===t&&this.Go(i,s)},i=>{e(()=>{let s=new w(f.UNKNOWN,"Fetching auth token failed: "+i.message);return this.Qo(s)})})}Go(e,t){let i=this.Ko(this.So);this.stream=this.jo(e,t),this.stream.Yr(()=>{i(()=>(this.state=2,this.Co=this.Hs.enqueueAfterDelay(this.Vo,1e4,()=>(this.ko()&&(this.state=3),Promise.resolve())),this.listener.Yr()))}),this.stream.Zr(s=>{i(()=>this.Qo(s))}),this.stream.onMessage(s=>{i(()=>this.onMessage(s))})}Oo(){this.state=5,this.xo.Ro(async()=>{this.state=0,this.start()})}Qo(e){return y("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Ko(e){return t=>{this.Hs.enqueueAndForget(()=>this.So===e?t():(y("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},oc=class extends js{constructor(e,t,i,s,r,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,s,o),this.yt=r}jo(e,t){return this.connection.wo("Listen",e,t)}onMessage(e){this.xo.reset();let t=Xy(this.yt,e),i=function(s){if(!("targetChange"in s))return T.min();let r=s.targetChange;return r.targetIds&&r.targetIds.length?T.min():r.readTime?De(r.readTime):T.min()}(e);return this.listener.Wo(t,i)}zo(e){let t={};t.database=Pa(this.yt),t.addTarget=function(s,r){let o,a=r.target;return o=ka(a)?{documents:ev(s,a)}:{query:tv(s,a)},o.targetId=r.targetId,r.resumeToken.approximateByteSize()>0?o.resumeToken=Sd(s,r.resumeToken):r.snapshotVersion.compareTo(T.min())>0&&(o.readTime=Fs(s,r.snapshotVersion.toTimestamp())),o}(this.yt,e);let i=iv(this.yt,e);i&&(t.labels=i),this.Bo(t)}Ho(e){let t={};t.database=Pa(this.yt),t.removeTarget=e,this.Bo(t)}},ac=class extends js{constructor(e,t,i,s,r,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,s,o),this.yt=r,this.Jo=!1}get Yo(){return this.Jo}start(){this.Jo=!1,this.lastStreamToken=void 0,super.start()}Uo(){this.Jo&&this.Xo([])}jo(e,t){return this.connection.wo("Write",e,t)}onMessage(e){if(L(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Jo){this.xo.reset();let t=Zy(e.writeResults,e.commitTime),i=De(e.commitTime);return this.listener.Zo(i,t)}return L(!e.writeResults||e.writeResults.length===0),this.Jo=!0,this.listener.tu()}eu(){let e={};e.database=Pa(this.yt),this.Bo(e)}Xo(e){let t={streamToken:this.lastStreamToken,writes:e.map(i=>Jy(this.yt,i))};this.Bo(t)}};var cc=class extends class{}{constructor(e,t,i,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.yt=s,this.nu=!1}su(){if(this.nu)throw new w(f.FAILED_PRECONDITION,"The client has already been terminated.")}ao(e,t,i){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,r])=>this.connection.ao(e,t,i,s,r)).catch(s=>{throw s.name==="FirebaseError"?(s.code===f.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new w(f.UNKNOWN,s.toString())})}_o(e,t,i,s){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection._o(e,t,i,r,o,s)).catch(r=>{throw r.name==="FirebaseError"?(r.code===f.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new w(f.UNKNOWN,r.toString())})}terminate(){this.nu=!0}};var lc=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.iu=0,this.ru=null,this.ou=!0}uu(){this.iu===0&&(this.cu("Unknown"),this.ru=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.ru=null,this.au("Backend didn't respond within 10 seconds."),this.cu("Offline"),Promise.resolve())))}hu(e){this.state==="Online"?this.cu("Unknown"):(this.iu++,this.iu>=1&&(this.lu(),this.au(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.cu("Offline")))}set(e){this.lu(),this.iu=0,e==="Online"&&(this.ou=!1),this.cu(e)}cu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}au(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ou?(ze(t),this.ou=!1):y("OnlineStateTracker",t)}lu(){this.ru!==null&&(this.ru.cancel(),this.ru=null)}};var uc=class{constructor(e,t,i,s,r){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.fu=[],this.du=new Map,this._u=new Set,this.wu=[],this.mu=r,this.mu.Ur(o=>{i.enqueueAndForget(async()=>{Wt(this)&&(y("RemoteStore","Restarting streams for network reachability change."),await async function(a){let c=k(a);c._u.add(4),await Ni(c),c.gu.set("Unknown"),c._u.delete(4),await sr(c)}(this))})}),this.gu=new lc(i,s)}};async function sr(n){if(Wt(n))for(let e of n.wu)await e(!0)}async function Ni(n){for(let e of n.wu)await e(!1)}function Ld(n,e){let t=k(n);t.du.has(e.targetId)||(t.du.set(e.targetId,e),Pc(t)?Mc(t):xn(t).ko()&&Oc(t,e))}function Od(n,e){let t=k(n),i=xn(t);t.du.delete(e),i.ko()&&Md(t,e),t.du.size===0&&(i.ko()?i.Fo():Wt(t)&&t.gu.set("Unknown"))}function Oc(n,e){n.yu.Ot(e.targetId),xn(n).zo(e)}function Md(n,e){n.yu.Ot(e),xn(n).Ho(e)}function Mc(n){n.yu=new Ra({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ne:e=>n.du.get(e)||null}),xn(n).start(),n.gu.uu()}function Pc(n){return Wt(n)&&!xn(n).No()&&n.du.size>0}function Wt(n){return k(n)._u.size===0}function Pd(n){n.yu=void 0}async function bv(n){n.du.forEach((e,t)=>{Oc(n,e)})}async function Ev(n,e){Pd(n),Pc(n)?(n.gu.hu(e),Mc(n)):n.gu.set("Unknown")}async function _v(n,e,t){if(n.gu.set("Online"),e instanceof Ms&&e.state===2&&e.cause)try{await async function(i,s){let r=s.cause;for(let o of s.targetIds)i.du.has(o)&&(await i.remoteSyncer.rejectListen(o,r),i.du.delete(o),i.yu.removeTarget(o))}(n,e)}catch(i){y("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),i),await Hs(n,i)}else if(e instanceof pn?n.yu.Kt(e):e instanceof Os?n.yu.Jt(e):n.yu.jt(e),!t.isEqual(T.min()))try{let i=await Rd(n.localStore);t.compareTo(i)>=0&&await function(s,r){let o=s.yu.Zt(r);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){let l=s.du.get(c);l&&s.du.set(c,l.withResumeToken(a.resumeToken,r))}}),o.targetMismatches.forEach(a=>{let c=s.du.get(a);if(!c)return;s.du.set(a,c.withResumeToken(J.EMPTY_BYTE_STRING,c.snapshotVersion)),Md(s,a);let l=new Ke(c.target,a,1,c.sequenceNumber);Oc(s,l)}),s.remoteSyncer.applyRemoteEvent(o)}(n,t)}catch(i){y("RemoteStore","Failed to raise snapshot:",i),await Hs(n,i)}}async function Hs(n,e,t){if(!Ai(e))throw e;n._u.add(1),await Ni(n),n.gu.set("Offline"),t||(t=()=>Rd(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{y("RemoteStore","Retrying IndexedDB access"),await t(),n._u.delete(1),await sr(n)})}function Fd(n,e){return e().catch(t=>Hs(n,t,e))}async function rr(n){let e=k(n),t=dt(e),i=e.fu.length>0?e.fu[e.fu.length-1].batchId:-1;for(;Iv(e);)try{let s=await gv(e.localStore,i);if(s===null){e.fu.length===0&&t.Fo();break}i=s.batchId,Tv(e,s)}catch(s){await Hs(e,s)}Ud(e)&&Vd(e)}function Iv(n){return Wt(n)&&n.fu.length<10}function Tv(n,e){n.fu.push(e);let t=dt(n);t.ko()&&t.Yo&&t.Xo(e.mutations)}function Ud(n){return Wt(n)&&!dt(n).No()&&n.fu.length>0}function Vd(n){dt(n).start()}async function Sv(n){dt(n).eu()}async function kv(n){let e=dt(n);for(let t of n.fu)e.Xo(t.mutations)}async function Cv(n,e,t){let i=n.fu.shift(),s=bi.from(i,e,t);await Fd(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await rr(n)}async function Dv(n,e){e&&dt(n).Yo&&await async function(t,i){if(s=i.code,By(s)&&s!==f.ABORTED){let r=t.fu.shift();dt(t).Mo(),await Fd(t,()=>t.remoteSyncer.rejectFailedWrite(r.batchId,i)),await rr(t)}var s}(n,e),Ud(n)&&Vd(n)}async function Wh(n,e){let t=k(n);t.asyncQueue.verifyOperationInProgress(),y("RemoteStore","RemoteStore received new credentials");let i=Wt(t);t._u.add(3),await Ni(t),i&&t.gu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t._u.delete(3),await sr(t)}async function Av(n,e){let t=k(n);e?(t._u.delete(2),await sr(t)):e||(t._u.add(2),await Ni(t),t.gu.set("Unknown"))}function xn(n){return n.pu||(n.pu=function(e,t,i){let s=k(e);return s.su(),new oc(t,s.connection,s.authCredentials,s.appCheckCredentials,s.yt,i)}(n.datastore,n.asyncQueue,{Yr:bv.bind(null,n),Zr:Ev.bind(null,n),Wo:_v.bind(null,n)}),n.wu.push(async e=>{e?(n.pu.Mo(),Pc(n)?Mc(n):n.gu.set("Unknown")):(await n.pu.stop(),Pd(n))})),n.pu}function dt(n){return n.Iu||(n.Iu=function(e,t,i){let s=k(e);return s.su(),new ac(t,s.connection,s.authCredentials,s.appCheckCredentials,s.yt,i)}(n.datastore,n.asyncQueue,{Yr:Sv.bind(null,n),Zr:Dv.bind(null,n),tu:kv.bind(null,n),Zo:Cv.bind(null,n)}),n.wu.push(async e=>{e?(n.Iu.Mo(),await rr(n)):(await n.Iu.stop(),n.fu.length>0&&(y("RemoteStore",`Stopping write stream with ${n.fu.length} pending writes`),n.fu=[]))})),n.Iu}var Ti=class{constructor(e,t,i,s,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=s,this.removalCallback=r,this.deferred=new _e,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,t,i,s,r){let o=Date.now()+i,a=new Ti(e,t,o,s,r);return a.start(i),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new w(f.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Fc(n,e){if(ze("AsyncQueue",`${e}: ${n}`),Ai(n))return new w(f.UNAVAILABLE,`${e}: ${n}`);throw n}var ct=class{constructor(e){this.comparator=e?(t,i)=>e(t,i)||v.comparator(t.key,i.key):(t,i)=>v.comparator(t.key,i.key),this.keyedMap=hi(),this.sortedSet=new B(this.comparator)}static emptySet(e){return new ct(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,i)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ct)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){let s=t.getNext().key,r=i.getNext().key;if(!s.isEqual(r))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let i=new ct;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}};var $s=class{constructor(){this.Tu=new B(v.comparator)}track(e){let t=e.doc.key,i=this.Tu.get(t);i?e.type!==0&&i.type===3?this.Tu=this.Tu.insert(t,e):e.type===3&&i.type!==1?this.Tu=this.Tu.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.Tu=this.Tu.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.Tu=this.Tu.remove(t):e.type===1&&i.type===2?this.Tu=this.Tu.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):_():this.Tu=this.Tu.insert(t,e)}Eu(){let e=[];return this.Tu.inorderTraversal((t,i)=>{e.push(i)}),e}},ft=class{constructor(e,t,i,s,r,o,a,c,l){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=s,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,t,i,s,r){let o=[];return t.forEach(a=>{o.push({type:0,doc:a})}),new ft(e,t,ct.emptySet(t),o,i,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&nr(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==i[s].type||!t[s].doc.isEqual(i[s].doc))return!1;return!0}};var hc=class{constructor(){this.Au=void 0,this.listeners=[]}},dc=class{constructor(){this.queries=new ut(e=>ud(e),nr),this.onlineState="Unknown",this.Ru=new Set}};async function qd(n,e){let t=k(n),i=e.query,s=!1,r=t.queries.get(i);if(r||(s=!0,r=new hc),s)try{r.Au=await t.onListen(i)}catch(o){let a=Fc(o,`Initialization of query '${Da(e.query)}' failed`);return void e.onError(a)}t.queries.set(i,r),r.listeners.push(e),e.bu(t.onlineState),r.Au&&e.Pu(r.Au)&&Uc(t)}async function Bd(n,e){let t=k(n),i=e.query,s=!1,r=t.queries.get(i);if(r){let o=r.listeners.indexOf(e);o>=0&&(r.listeners.splice(o,1),s=r.listeners.length===0)}if(s)return t.queries.delete(i),t.onUnlisten(i)}function Nv(n,e){let t=k(n),i=!1;for(let s of e){let r=s.query,o=t.queries.get(r);if(o){for(let a of o.listeners)a.Pu(s)&&(i=!0);o.Au=s}}i&&Uc(t)}function xv(n,e,t){let i=k(n),s=i.queries.get(e);if(s)for(let r of s.listeners)r.onError(t);i.queries.delete(e)}function Uc(n){n.Ru.forEach(e=>{e.next()})}var Gs=class{constructor(e,t,i){this.query=e,this.vu=t,this.Vu=!1,this.Su=null,this.onlineState="Unknown",this.options=i||{}}Pu(e){if(!this.options.includeMetadataChanges){let i=[];for(let s of e.docChanges)s.type!==3&&i.push(s);e=new ft(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.Du(e)&&(this.vu.next(e),t=!0):this.Cu(e,this.onlineState)&&(this.xu(e),t=!0),this.Su=e,t}onError(e){this.vu.error(e)}bu(e){this.onlineState=e;let t=!1;return this.Su&&!this.Vu&&this.Cu(this.Su,e)&&(this.xu(this.Su),t=!0),t}Cu(e,t){if(!e.fromCache)return!0;let i=t!=="Offline";return(!this.options.Nu||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Du(e){if(e.docChanges.length>0)return!0;let t=this.Su&&this.Su.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}xu(e){e=ft.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.vu.next(e)}};var Ks=class{constructor(e){this.key=e}},zs=class{constructor(e){this.key=e}},fc=class{constructor(e,t){this.query=e,this.qu=t,this.Uu=null,this.hasCachedResults=!1,this.current=!1,this.Ku=C(),this.mutatedKeys=C(),this.Gu=hd(e),this.Qu=new ct(this.Gu)}get ju(){return this.qu}Wu(e,t){let i=t?t.zu:new $s,s=t?t.Qu:this.Qu,r=t?t.mutatedKeys:this.mutatedKeys,o=s,a=!1,c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((u,h)=>{let d=s.get(u),p=Rc(this.query,h)?h:null,b=!!d&&this.mutatedKeys.has(d.key),S=!!p&&(p.hasLocalMutations||this.mutatedKeys.has(p.key)&&p.hasCommittedMutations),A=!1;d&&p?d.data.isEqual(p.data)?b!==S&&(i.track({type:3,doc:p}),A=!0):this.Hu(d,p)||(i.track({type:2,doc:p}),A=!0,(c&&this.Gu(p,c)>0||l&&this.Gu(p,l)<0)&&(a=!0)):!d&&p?(i.track({type:0,doc:p}),A=!0):d&&!p&&(i.track({type:1,doc:d}),A=!0,(c||l)&&(a=!0)),A&&(p?(o=o.add(p),r=S?r.add(u):r.delete(u)):(o=o.delete(u),r=r.delete(u)))}),this.query.limit!==null)for(;o.size>this.query.limit;){let u=this.query.limitType==="F"?o.last():o.first();o=o.delete(u.key),r=r.delete(u.key),i.track({type:1,doc:u})}return{Qu:o,zu:i,$i:a,mutatedKeys:r}}Hu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i){let s=this.Qu;this.Qu=e.Qu,this.mutatedKeys=e.mutatedKeys;let r=e.zu.Eu();r.sort((l,u)=>function(h,d){let p=b=>{switch(b){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return _()}};return p(h)-p(d)}(l.type,u.type)||this.Gu(l.doc,u.doc)),this.Ju(i);let o=t?this.Yu():[],a=this.Ku.size===0&&this.current?1:0,c=a!==this.Uu;return this.Uu=a,r.length!==0||c?{snapshot:new ft(this.query,e.Qu,s,r,e.mutatedKeys,a===0,c,!1,!!i&&i.resumeToken.approximateByteSize()>0),Xu:o}:{Xu:o}}bu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Qu:this.Qu,zu:new $s,mutatedKeys:this.mutatedKeys,$i:!1},!1)):{Xu:[]}}Zu(e){return!this.qu.has(e)&&!!this.Qu.has(e)&&!this.Qu.get(e).hasLocalMutations}Ju(e){e&&(e.addedDocuments.forEach(t=>this.qu=this.qu.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.qu=this.qu.delete(t)),this.current=e.current)}Yu(){if(!this.current)return[];let e=this.Ku;this.Ku=C(),this.Qu.forEach(i=>{this.Zu(i.key)&&(this.Ku=this.Ku.add(i.key))});let t=[];return e.forEach(i=>{this.Ku.has(i)||t.push(new zs(i))}),this.Ku.forEach(i=>{e.has(i)||t.push(new Ks(i))}),t}tc(e){this.qu=e.Hi,this.Ku=C();let t=this.Wu(e.documents);return this.applyChanges(t,!0)}ec(){return ft.fromInitialDocuments(this.query,this.Qu,this.mutatedKeys,this.Uu===0,this.hasCachedResults)}},mc=class{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}},pc=class{constructor(e){this.key=e,this.nc=!1}},gc=class{constructor(e,t,i,s,r,o){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.sc={},this.ic=new ut(a=>ud(a),nr),this.rc=new Map,this.oc=new Set,this.uc=new B(v.comparator),this.cc=new Map,this.ac=new Ei,this.hc={},this.lc=new Map,this.fc=ht.vn(),this.onlineState="Unknown",this.dc=void 0}get isPrimaryClient(){return this.dc===!0}};async function Rv(n,e){let t=jv(n),i,s,r=t.ic.get(e);if(r)i=r.targetId,t.sharedClientState.addLocalQueryTarget(i),s=r.view.ec();else{let o=await yv(t.localStore,We(e));t.isPrimaryClient&&Ld(t.remoteStore,o);let a=t.sharedClientState.addLocalQueryTarget(o.targetId);i=o.targetId,s=await Lv(t,e,i,a==="current",o.resumeToken)}return s}async function Lv(n,e,t,i,s){n._c=(h,d,p)=>async function(b,S,A,j){let M=S.view.Wu(A);M.$i&&(M=await zh(b.localStore,S.query,!1).then(({documents:be})=>S.view.Wu(be,M)));let fe=j&&j.targetChanges.get(S.targetId),le=S.view.applyChanges(M,b.isPrimaryClient,fe);return Yh(b,S.targetId,le.Xu),le.snapshot}(n,h,d,p);let r=await zh(n.localStore,e,!0),o=new fc(e,r.Hi),a=o.Wu(r.documents),c=Kt.createSynthesizedTargetChangeForCurrentChange(t,i&&n.onlineState!=="Offline",s),l=o.applyChanges(a,n.isPrimaryClient,c);Yh(n,t,l.Xu);let u=new mc(e,t,o);return n.ic.set(e,u),n.rc.has(t)?n.rc.get(t).push(e):n.rc.set(t,[e]),l.snapshot}async function Ov(n,e){let t=k(n),i=t.ic.get(e),s=t.rc.get(i.targetId);if(s.length>1)return t.rc.set(i.targetId,s.filter(r=>!nr(r,e))),void t.ic.delete(e);t.isPrimaryClient?(t.sharedClientState.removeLocalQueryTarget(i.targetId),t.sharedClientState.isActiveQueryTarget(i.targetId)||await tc(t.localStore,i.targetId,!1).then(()=>{t.sharedClientState.clearQueryState(i.targetId),Od(t.remoteStore,i.targetId),yc(t,i.targetId)}).catch(Di)):(yc(t,i.targetId),await tc(t.localStore,i.targetId,!0))}async function Mv(n,e,t){let i=Hv(n);try{let s=await function(r,o){let a=k(r),c=V.now(),l=o.reduce((d,p)=>d.add(p.key),C()),u,h;return a.persistence.runTransaction("Locally write mutations","readwrite",d=>{let p=Ye(),b=C();return a.Gi.getEntries(d,l).next(S=>{p=S,p.forEach((A,j)=>{j.isValidDocument()||(b=b.add(A))})}).next(()=>a.localDocuments.getOverlayedDocuments(d,p)).next(S=>{u=S;let A=[];for(let j of o){let M=qy(j,u.get(j.key).overlayedDocument);M!=null&&A.push(new Qe(j.key,M,ld(M.value.mapValue),ge.exists(!0)))}return a.mutationQueue.addMutationBatch(d,c,A,o)}).next(S=>{h=S;let A=S.applyToLocalDocumentSet(u,b);return a.documentOverlayCache.saveOverlays(d,S.batchId,A)})}).then(()=>({batchId:h.batchId,changes:_d(u)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(s.batchId),function(r,o,a){let c=r.hc[r.currentUser.toKey()];c||(c=new B(x)),c=c.insert(o,a),r.hc[r.currentUser.toKey()]=c}(i,s.batchId,t),await xi(i,s.changes),await rr(i.remoteStore)}catch(s){let r=Fc(s,"Failed to persist write");t.reject(r)}}async function jd(n,e){let t=k(n);try{let i=await mv(t.localStore,e);e.targetChanges.forEach((s,r)=>{let o=t.cc.get(r);o&&(L(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.nc=!0:s.modifiedDocuments.size>0?L(o.nc):s.removedDocuments.size>0&&(L(o.nc),o.nc=!1))}),await xi(t,i,e)}catch(i){await Di(i)}}function Qh(n,e,t){let i=k(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){let s=[];i.ic.forEach((r,o)=>{let a=o.view.bu(e);a.snapshot&&s.push(a.snapshot)}),function(r,o){let a=k(r);a.onlineState=o;let c=!1;a.queries.forEach((l,u)=>{for(let h of u.listeners)h.bu(o)&&(c=!0)}),c&&Uc(a)}(i.eventManager,e),s.length&&i.sc.Wo(s),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function Pv(n,e,t){let i=k(n);i.sharedClientState.updateQueryState(e,"rejected",t);let s=i.cc.get(e),r=s&&s.key;if(r){let o=new B(v.comparator);o=o.insert(r,Y.newNoDocument(r,T.min()));let a=C().add(r),c=new kn(T.min(),new Map,new q(x),o,a);await jd(i,c),i.uc=i.uc.remove(r),i.cc.delete(e),Vc(i)}else await tc(i.localStore,e,!1).then(()=>yc(i,e,t)).catch(Di)}async function Fv(n,e){let t=k(n),i=e.batch.batchId;try{let s=await fv(t.localStore,e);$d(t,i,null),Hd(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await xi(t,s)}catch(s){await Di(s)}}async function Uv(n,e,t){let i=k(n);try{let s=await function(r,o){let a=k(r);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let l;return a.mutationQueue.lookupMutationBatch(c,o).next(u=>(L(u!==null),l=u.keys(),a.mutationQueue.removeMutationBatch(c,u))).next(()=>a.mutationQueue.performConsistencyCheck(c)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(c,l,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,l)).next(()=>a.localDocuments.getDocuments(c,l))})}(i.localStore,e);$d(i,e,t),Hd(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await xi(i,s)}catch(s){await Di(s)}}function Hd(n,e){(n.lc.get(e)||[]).forEach(t=>{t.resolve()}),n.lc.delete(e)}function $d(n,e,t){let i=k(n),s=i.hc[i.currentUser.toKey()];if(s){let r=s.get(e);r&&(t?r.reject(t):r.resolve(),s=s.remove(e)),i.hc[i.currentUser.toKey()]=s}}function yc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let i of n.rc.get(e))n.ic.delete(i),t&&n.sc.wc(i,t);n.rc.delete(e),n.isPrimaryClient&&n.ac.ls(e).forEach(i=>{n.ac.containsKey(i)||Gd(n,i)})}function Gd(n,e){n.oc.delete(e.path.canonicalString());let t=n.uc.get(e);t!==null&&(Od(n.remoteStore,t),n.uc=n.uc.remove(e),n.cc.delete(t),Vc(n))}function Yh(n,e,t){for(let i of t)i instanceof Ks?(n.ac.addReference(i.key,e),Vv(n,i)):i instanceof zs?(y("SyncEngine","Document no longer in limbo: "+i.key),n.ac.removeReference(i.key,e),n.ac.containsKey(i.key)||Gd(n,i.key)):_()}function Vv(n,e){let t=e.key,i=t.path.canonicalString();n.uc.get(t)||n.oc.has(i)||(y("SyncEngine","New document in limbo: "+t),n.oc.add(i),Vc(n))}function Vc(n){for(;n.oc.size>0&&n.uc.size<n.maxConcurrentLimboResolutions;){let e=n.oc.values().next().value;n.oc.delete(e);let t=new v(R.fromString(e)),i=n.fc.next();n.cc.set(i,new pc(t)),n.uc=n.uc.insert(t,i),Ld(n.remoteStore,new Ke(We(xc(t.path)),i,2,pi.at))}}async function xi(n,e,t){let i=k(n),s=[],r=[],o=[];i.ic.isEmpty()||(i.ic.forEach((a,c)=>{o.push(i._c(c,e,t).then(l=>{if((l||t)&&i.isPrimaryClient&&i.sharedClientState.updateQueryState(c.targetId,l?.fromCache?"not-current":"current"),l){s.push(l);let u=Ii.Ci(c.targetId,l);r.push(u)}}))}),await Promise.all(o),i.sc.Wo(s),await async function(a,c){let l=k(a);try{await l.persistence.runTransaction("notifyLocalViewChanges","readwrite",u=>m.forEach(c,h=>m.forEach(h.Si,d=>l.persistence.referenceDelegate.addReference(u,h.targetId,d)).next(()=>m.forEach(h.Di,d=>l.persistence.referenceDelegate.removeReference(u,h.targetId,d)))))}catch(u){if(!Ai(u))throw u;y("LocalStore","Failed to update sequence numbers: "+u)}for(let u of c){let h=u.targetId;if(!u.fromCache){let d=l.qi.get(h),p=d.snapshotVersion,b=d.withLastLimboFreeSnapshotVersion(p);l.qi=l.qi.insert(h,b)}}}(i.localStore,r))}async function qv(n,e){let t=k(n);if(!t.currentUser.isEqual(e)){y("SyncEngine","User change. New user:",e.toKey());let i=await xd(t.localStore,e);t.currentUser=e,function(s,r){s.lc.forEach(o=>{o.forEach(a=>{a.reject(new w(f.CANCELLED,r))})}),s.lc.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await xi(t,i.ji)}}function Bv(n,e){let t=k(n),i=t.cc.get(e);if(i&&i.nc)return C().add(i.key);{let s=C(),r=t.rc.get(e);if(!r)return s;for(let o of r){let a=t.ic.get(o);s=s.unionWith(a.view.ju)}return s}}function jv(n){let e=k(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=jd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Bv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Pv.bind(null,e),e.sc.Wo=Nv.bind(null,e.eventManager),e.sc.wc=xv.bind(null,e.eventManager),e}function Hv(n){let e=k(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Fv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Uv.bind(null,e),e}var vc=class{constructor(){this.synchronizeTabs=!1}async initialize(e){this.yt=ir(e.databaseInfo.databaseId),this.sharedClientState=this.gc(e),this.persistence=this.yc(e),await this.persistence.start(),this.localStore=this.Ic(e),this.gcScheduler=this.Tc(e,this.localStore),this.indexBackfillerScheduler=this.Ec(e,this.localStore)}Tc(e,t){return null}Ec(e,t){return null}Ic(e){return dv(this.persistence,new Za,e.initialUser,this.yt)}yc(e){return new Xa(_i.Bs,this.yt)}gc(e){return new nc}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}};var wc=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>Qh(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=qv.bind(null,this.syncEngine),await Av(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new dc}createDatastore(e){let t=ir(e.databaseInfo.databaseId),i=(s=e.databaseInfo,new rc(s));var s;return function(r,o,a,c){return new cc(r,o,a,c)}(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return t=this.localStore,i=this.datastore,s=e.asyncQueue,r=a=>Qh(this.syncEngine,a,0),o=qs.C()?new qs:new ic,new uc(t,i,s,r,o);var t,i,s,r,o}createSyncEngine(e,t){return function(i,s,r,o,a,c,l){let u=new gc(i,s,r,o,a,c);return l&&(u.dc=!0),u}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){let t=k(e);y("RemoteStore","RemoteStore shutting down."),t._u.add(5),await Ni(t),t.mu.shutdown(),t.gu.set("Unknown")}(this.remoteStore)}};function Kd(n,e,t){if(!t)throw new w(f.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function $v(n,e,t,i){if(e===!0&&i===!0)throw new w(f.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Xh(n){if(!v.isDocumentKey(n))throw new w(f.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Jh(n){if(v.isDocumentKey(n))throw new w(f.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function qc(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(t){return t.constructor?t.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":_()}function mt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new w(f.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=qc(n);throw new w(f.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}var Zh=new Map,Ws=class{constructor(e){var t;if(e.host===void 0){if(e.ssl!==void 0)throw new w(f.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new w(f.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,$v("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}};var Cn=class{constructor(e,t,i,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ws({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new w(f.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new w(f.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ws(e),e.credentials!==void 0&&(this._authCredentials=function(t){if(!t)return new ra;switch(t.type){case"gapi":let i=t.client;return new la(i,t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new w(f.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=Zh.get(e);t&&(y("ComponentProvider","Removing Datastore"),Zh.delete(e),t.terminate())}(this),Promise.resolve()}};function Gv(n,e,t,i={}){var s;let r=(n=mt(n,Cn))._getSettings();if(r.host!=="firestore.googleapis.com"&&r.host!==e&&sa("Host has been set in both settings() and useEmulator(), emulator host will be used"),n._setSettings(Object.assign(Object.assign({},r),{host:`${e}:${t}`,ssl:!1})),i.mockUserToken){let o,a;if(typeof i.mockUserToken=="string")o=i.mockUserToken,a=Q.MOCK_USER;else{o=$l(i.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);let c=i.mockUserToken.sub||i.mockUserToken.user_id;if(!c)throw new w(f.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");a=new Q(c)}n._authCredentials=new oa(new Ns(o,a))}}var oe=class{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ae(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new oe(this.firestore,e,this._key)}},Dn=class{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Dn(this.firestore,e,this._query)}},Ae=class extends Dn{constructor(e,t,i){super(e,t,xc(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new oe(this.firestore,null,new v(e))}withConverter(e){return new Ae(this.firestore,e,this._path)}};function zd(n,e,...t){if(n=te(n),Kd("collection","path",e),n instanceof Cn){let i=R.fromString(e,...t);return Jh(i),new Ae(n,null,i)}{if(!(n instanceof oe||n instanceof Ae))throw new w(f.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let i=n._path.child(R.fromString(e,...t));return Jh(i),new Ae(n.firestore,null,i)}}function Wd(n,e,...t){if(n=te(n),arguments.length===1&&(e=xs.R()),Kd("doc","path",e),n instanceof Cn){let i=R.fromString(e,...t);return Xh(i),new oe(n,null,new v(i))}{if(!(n instanceof oe||n instanceof Ae))throw new w(f.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let i=n._path.child(R.fromString(e,...t));return Xh(i),new oe(n.firestore,n instanceof Ae?n.converter:null,new v(i))}}var Qs=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Rc(this.observer.next,e)}error(e){this.observer.error?this.Rc(this.observer.error,e):ze("Uncaught Error in snapshot listener:",e.toString())}bc(){this.muted=!0}Rc(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}};var bc=class{constructor(e,t,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this.databaseInfo=s,this.user=Q.UNAUTHENTICATED,this.clientId=xs.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(i,async r=>{y("FirestoreClient","Received user=",r.uid),await this.authCredentialListener(r),this.user=r}),this.appCheckCredentials.start(i,r=>(y("FirestoreClient","Received new app check token=",r),this.appCheckCredentialListener(r,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new w(f.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new _e;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let i=Fc(t,"Failed to shutdown persistence");e.reject(i)}}),e.promise}};async function Kv(n,e){n.asyncQueue.verifyOperationInProgress(),y("FirestoreClient","Initializing OfflineComponentProvider");let t=await n.getConfiguration();await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener(async s=>{i.isEqual(s)||(await xd(e.localStore,s),i=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n.offlineComponents=e}async function zv(n,e){n.asyncQueue.verifyOperationInProgress();let t=await Wv(n);y("FirestoreClient","Initializing OnlineComponentProvider");let i=await n.getConfiguration();await e.initialize(t,i),n.setCredentialChangeListener(s=>Wh(e.remoteStore,s)),n.setAppCheckTokenChangeListener((s,r)=>Wh(e.remoteStore,r)),n.onlineComponents=e}async function Wv(n){return n.offlineComponents||(y("FirestoreClient","Using default OfflineComponentProvider"),await Kv(n,new vc)),n.offlineComponents}async function Qd(n){return n.onlineComponents||(y("FirestoreClient","Using default OnlineComponentProvider"),await zv(n,new wc)),n.onlineComponents}function Qv(n){return Qd(n).then(e=>e.syncEngine)}async function Yd(n){let e=await Qd(n),t=e.eventManager;return t.onListen=Rv.bind(null,e.syncEngine),t.onUnlisten=Ov.bind(null,e.syncEngine),t}function Yv(n,e,t={}){let i=new _e;return n.asyncQueue.enqueueAndForget(async()=>function(s,r,o,a,c){let l=new Qs({next:h=>{r.enqueueAndForget(()=>Bd(s,u));let d=h.docs.has(o);!d&&h.fromCache?c.reject(new w(f.UNAVAILABLE,"Failed to get document because the client is offline.")):d&&h.fromCache&&a&&a.source==="server"?c.reject(new w(f.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(h)},error:h=>c.reject(h)}),u=new Gs(xc(o.path),l,{includeMetadataChanges:!0,Nu:!0});return qd(s,u)}(await Yd(n),n.asyncQueue,e,t,i)),i.promise}function Xv(n,e,t={}){let i=new _e;return n.asyncQueue.enqueueAndForget(async()=>function(s,r,o,a,c){let l=new Qs({next:h=>{r.enqueueAndForget(()=>Bd(s,u)),h.fromCache&&a.source==="server"?c.reject(new w(f.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(h)},error:h=>c.reject(h)}),u=new Gs(o,l,{includeMetadataChanges:!0,Nu:!0});return qd(s,u)}(await Yd(n),n.asyncQueue,e,t,i)),i.promise}var Ec=class{constructor(){this.Bc=Promise.resolve(),this.Lc=[],this.qc=!1,this.Uc=[],this.Kc=null,this.Gc=!1,this.Qc=!1,this.jc=[],this.xo=new Bs(this,"async_queue_retry"),this.Wc=()=>{let t=ia();t&&y("AsyncQueue","Visibility state changed to "+t.visibilityState),this.xo.Po()};let e=ia();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Wc)}get isShuttingDown(){return this.qc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.zc(),this.Hc(e)}enterRestrictedMode(e){if(!this.qc){this.qc=!0,this.Qc=e||!1;let t=ia();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Wc)}}enqueue(e){if(this.zc(),this.qc)return new Promise(()=>{});let t=new _e;return this.Hc(()=>this.qc&&this.Qc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Lc.push(e),this.Jc()))}async Jc(){if(this.Lc.length!==0){try{await this.Lc[0](),this.Lc.shift(),this.xo.reset()}catch(e){if(!Ai(e))throw e;y("AsyncQueue","Operation failed with retryable error: "+e)}this.Lc.length>0&&this.xo.Ro(()=>this.Jc())}}Hc(e){let t=this.Bc.then(()=>(this.Gc=!0,e().catch(i=>{this.Kc=i,this.Gc=!1;let s=function(r){let o=r.message||"";return r.stack&&(o=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),o}(i);throw ze("INTERNAL UNHANDLED ERROR: ",s),i}).then(i=>(this.Gc=!1,i))));return this.Bc=t,t}enqueueAfterDelay(e,t,i){this.zc(),this.jc.indexOf(e)>-1&&(t=0);let s=Ti.createAndSchedule(this,e,t,i,r=>this.Yc(r));return this.Uc.push(s),s}zc(){this.Kc&&_()}verifyOperationInProgress(){}async Xc(){let e;do e=this.Bc,await e;while(e!==this.Bc)}Zc(e){for(let t of this.Uc)if(t.timerId===e)return!0;return!1}ta(e){return this.Xc().then(()=>{this.Uc.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(let t of this.Uc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Xc()})}ea(e){this.jc.push(e)}Yc(e){let t=this.Uc.indexOf(e);this.Uc.splice(t,1)}};var zt=class extends Cn{constructor(e,t,i,s){super(e,t,i,s),this.type="firestore",this._queue=new Ec,this._persistenceKey=s?.name||"[DEFAULT]"}_terminate(){return this._firestoreClient||Xd(this),this._firestoreClient.terminate()}};function Bc(n,e){let t=typeof n=="object"?n:Yi(),i=typeof n=="string"?n:e||"(default)",s=Gn(t,"firestore").getImmediate({identifier:i});if(!s._initialized){let r=jl("firestore");r&&Gv(s,...r)}return s}function jc(n){return n._firestoreClient||Xd(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function Xd(n){var e;let t=n._freezeSettings(),i=function(s,r,o,a){return new ma(s,r,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,t);n._firestoreClient=new bc(n._authCredentials,n._appCheckCredentials,n._queue,i)}var pt=class{constructor(e){this._byteString=e}static fromBase64String(e){try{return new pt(J.fromBase64String(e))}catch(t){throw new w(f.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new pt(J.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var Si=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new w(f.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new X(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var Ys=class{constructor(e){this._methodName=e}};var ki=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new w(f.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new w(f.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return x(this._lat,e._lat)||x(this._long,e._long)}};var Jv=/^__.*__$/,_c=class{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new Qe(e,this.data,this.fieldMask,t,this.fieldTransforms):new Gt(e,this.data,t,this.fieldTransforms)}};function Jd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw _()}}var Ci=class{constructor(e,t,i,s,r,o){this.settings=e,this.databaseId=t,this.yt=i,this.ignoreUndefinedProperties=s,r===void 0&&this.na(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get sa(){return this.settings.sa}ia(e){return new Ci(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.yt,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ra(e){var t;let i=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ia({path:i,oa:!1});return s.ua(e),s}ca(e){var t;let i=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ia({path:i,oa:!1});return s.na(),s}aa(e){return this.ia({path:void 0,oa:!0})}ha(e){return Xs(e,this.settings.methodName,this.settings.la||!1,this.path,this.settings.fa)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}na(){if(this.path)for(let e=0;e<this.path.length;e++)this.ua(this.path.get(e))}ua(e){if(e.length===0)throw this.ha("Document fields must not be empty");if(Jd(this.sa)&&Jv.test(e))throw this.ha('Document fields cannot begin and end with "__"')}},Ic=class{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.yt=i||ir(e)}da(e,t,i,s=!1){return new Ci({sa:e,methodName:t,fa:i,path:X.emptyPath(),oa:!1,la:s},this.databaseId,this.yt,this.ignoreUndefinedProperties)}};function Zv(n){let e=n._freezeSettings(),t=ir(n._databaseId);return new Ic(n._databaseId,!!e.ignoreUndefinedProperties,t)}function ew(n,e,t,i,s,r={}){let o=n.da(r.merge||r.mergeFields?2:0,e,t,s);nf("Data must be an object, but it was:",o,i);let a=ef(i,o),c,l;if(r.merge)c=new he(o.fieldMask),l=o.fieldTransforms;else if(r.mergeFields){let u=[];for(let h of r.mergeFields){let d=tw(e,h,t);if(!o.contains(d))throw new w(f.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);iw(u,d)||u.push(d)}c=new he(u),l=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,l=o.fieldTransforms;return new _c(new ce(a),c,l)}function Zd(n,e){if(tf(n=te(n)))return nf("Unsupported field value:",e,n),ef(n,e);if(n instanceof Ys)return function(t,i){if(!Jd(i.sa))throw i.ha(`${t._methodName}() can only be used with update() and set()`);if(!i.path)throw i.ha(`${t._methodName}() is not currently supported inside arrays`);let s=t._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.oa&&e.sa!==4)throw e.ha("Nested arrays are not supported");return function(t,i){let s=[],r=0;for(let o of t){let a=Zd(o,i.aa(r));a==null&&(a={nullValue:"NULL_VALUE"}),s.push(a),r++}return{arrayValue:{values:s}}}(n,e)}return function(t,i){if((t=te(t))===null)return{nullValue:"NULL_VALUE"};if(typeof t=="number")return My(i.yt,t);if(typeof t=="boolean")return{booleanValue:t};if(typeof t=="string")return{stringValue:t};if(t instanceof Date){let s=V.fromDate(t);return{timestampValue:Fs(i.yt,s)}}if(t instanceof V){let s=new V(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Fs(i.yt,s)}}if(t instanceof ki)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof pt)return{bytesValue:Sd(i.yt,t._byteString)};if(t instanceof oe){let s=i.databaseId,r=t.firestore._databaseId;if(!r.isEqual(s))throw i.ha(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Lc(t.firestore._databaseId||i.databaseId,t._key.path)}}throw i.ha(`Unsupported field value: ${qc(t)}`)}(n,e)}function ef(n,e){let t={};return ed(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Nn(n,(i,s)=>{let r=Zd(s,e.ra(i));r!=null&&(t[i]=r)}),{mapValue:{fields:t}}}function tf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof V||n instanceof ki||n instanceof pt||n instanceof oe||n instanceof Ys)}function nf(n,e,t){if(!tf(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let i=qc(t);throw i==="an object"?e.ha(n+" a custom object"):e.ha(n+" "+i)}}function tw(n,e,t){if((e=te(e))instanceof Si)return e._internalPath;if(typeof e=="string")return sf(n,e);throw Xs("Field path arguments must be of type string or ",n,!1,void 0,t)}var nw=new RegExp("[~\\*/\\[\\]]");function sf(n,e,t){if(e.search(nw)>=0)throw Xs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Si(...e.split("."))._internalPath}catch{throw Xs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Xs(n,e,t,i,s){let r=i&&!i.isEmpty(),o=s!==void 0,a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(r||o)&&(c+=" (found",r&&(c+=` in field ${i}`),o&&(c+=` in document ${s}`),c+=")"),new w(f.INVALID_ARGUMENT,a+n+c)}function iw(n,e){return n.some(t=>t.isEqual(e))}var Js=class{constructor(e,t,i,s,r){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new oe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Tc(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(rf("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},Tc=class extends Js{data(){return super.data()}};function rf(n,e){return typeof e=="string"?sf(n,e):e instanceof Si?e._internalPath:e._delegate._internalPath}function sw(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new w(f.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var Sc=class{convertValue(e,t="none"){switch(jt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return F(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Bt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw _()}}convertObject(e,t){let i={};return Nn(e.fields,(s,r)=>{i[s]=this.convertValue(r,t)}),i}convertGeoPoint(e){return new ki(F(e.latitude),F(e.longitude))}convertArray(e,t){return(e.values||[]).map(i=>this.convertValue(i,t))}convertServerTimestamp(e,t){switch(t){case"previous":let i=nd(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(yi(e));default:return null}}convertTimestamp(e){let t=lt(e);return new V(t.seconds,t.nanos)}convertDocumentKey(e,t){let i=R.fromString(e);L(Nd(i));let s=new qt(i.get(1),i.get(3)),r=new v(i.popFirst(5));return s.isEqual(t)||ze(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}};function rw(n,e,t){let i;return i=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,i}var Pt=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},Zs=class extends Js{constructor(e,t,i,s,r,o){super(e,t,i,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new gn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let i=this._document.data.field(rf("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}},gn=class extends Zs{data(e={}){return super.data(e)}},kc=class{constructor(e,t,i,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Pt(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(i=>{e.call(t,new gn(this._firestore,this._userDataWriter,i.key,i,new Pt(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new w(f.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let r=0;return i._snapshot.docChanges.map(o=>{let a=new gn(i._firestore,i._userDataWriter,o.doc.key,o.doc,new Pt(i._snapshot.mutatedKeys.has(o.doc.key),i._snapshot.fromCache),i.query.converter);return o.doc,{type:"added",doc:a,oldIndex:-1,newIndex:r++}})}{let r=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(o=>s||o.type!==3).map(o=>{let a=new gn(i._firestore,i._userDataWriter,o.doc.key,o.doc,new Pt(i._snapshot.mutatedKeys.has(o.doc.key),i._snapshot.fromCache),i.query.converter),c=-1,l=-1;return o.type!==0&&(c=r.indexOf(o.doc.key),r=r.delete(o.doc.key)),o.type!==1&&(r=r.add(o.doc),l=r.indexOf(o.doc.key)),{type:ow(o.type),doc:a,oldIndex:c,newIndex:l}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function ow(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return _()}}function of(n){n=mt(n,oe);let e=mt(n.firestore,zt);return Yv(jc(e),n._key).then(t=>aw(e,n,t))}var er=class extends Sc{constructor(e){super(),this.firestore=e}convertBytes(e){return new pt(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new oe(this.firestore,null,t)}};function af(n){n=mt(n,Dn);let e=mt(n.firestore,zt),t=jc(e),i=new er(e);return sw(n._query),Xv(t,n._query).then(s=>new kc(e,i,n,s))}function cf(n,e,t){n=mt(n,oe);let i=mt(n.firestore,zt),s=rw(n.converter,e,t);return uf(i,[ew(Zv(i),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,ge.none())])}function lf(n){return uf(mt(n.firestore,zt),[new wi(n._key,ge.none())])}function uf(n,e){return function(t,i){let s=new _e;return t.asyncQueue.enqueueAndForget(async()=>Mv(await Qv(t),i,s)),s.promise}(jc(n),e)}function aw(n,e,t){let i=t.docs.get(e._key),s=new er(n);return new Zs(n,s,e._key,i,new Pt(t.hasPendingWrites,t.fromCache),e.converter)}(function(n,e=!0){(function(t){An=t})(Nt),rt(new pe("firestore",(t,{instanceIdentifier:i,options:s})=>{let r=t.getProvider("app").getImmediate(),o=new zt(new aa(t.getProvider("auth-internal")),new ha(t.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new w(f.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new qt(a.options.projectId,c)}(r,i),r);return s=Object.assign({useFetchStreams:e},s),o._setSettings(s),o},"PUBLIC").setMultipleInstances(!0)),Ee(Nh,"3.8.1",n),Ee(Nh,"3.8.1","esm2017")})();var cw="firebase",lw="9.16.0";Ee(cw,lw,"app");var Hc={};var hf=function(){if(!Hc.apiKey)throw Error("Firebase config is not setup.");mo(Hc)};function or(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function kf(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Cf=kf,Df=new je("auth","Firebase",kf());var df=new it("@firebase/auth");function ar(n,...e){df.logLevel<=N.ERROR&&df.error(`Auth (${Nt}): ${n}`,...e)}function ve(n,...e){throw rl(n,...e)}function Le(n,...e){return rl(n,...e)}function Af(n,e,t){let i=Object.assign(Object.assign({},Cf()),{[e]:t});return new je("auth","Firebase",i).create(e,{appName:n.name})}function uw(n,e,t){let i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&ve(n,"argument-error"),Af(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function rl(n,...e){if(typeof n!="string"){let t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Df.create(n,...e)}function E(n,e,...t){if(!n)throw rl(e,...t)}function Re(n){let e="INTERNAL ASSERTION FAILED: "+n;throw ar(e),new Error(e)}function tt(n,e){n||Re(e)}var ff=new Map;function Xe(n){tt(n instanceof Function,"Expected a class definition");let e=ff.get(n);return e?(tt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ff.set(n,e),e)}function Nf(n,e){let t=Gn(n,"auth");if(t.isInitialized()){let s=t.getImmediate(),r=t.getOptions();if(Ct(r,e??{}))return s;ve(s,"already-initialized")}return t.initialize({options:e})}function hw(n,e){let t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(Xe);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function Kc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function dw(){return mf()==="http:"||mf()==="https:"}function mf(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function fw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(dw()||Kl()||"connection"in navigator)?navigator.onLine:!0}function mw(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Qt=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,tt(t>e,"Short delay should be less than long delay!"),this.isMobile=Gl()||zl()}get(){return fw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function ol(n,e){tt(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var hr=class{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Re("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Re("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Re("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var pw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};var gw=new Qt(3e4,6e4);function we(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Pe(n,e,t,i,s={}){return xf(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});let a=sn(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode),hr.fetch()(Rf(n,n.config.apiHost,t,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},r))})}async function xf(n,e,t){n._canInitEmulator=!1;let i=Object.assign(Object.assign({},pw),e);try{let s=new zc(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();let o=await r.json();if("needConfirmation"in o)throw Ri(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{let a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ri(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ri(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ri(n,"user-disabled",o);let u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Af(n,u,l);ve(n,u)}}catch(s){if(s instanceof se)throw s;ve(n,"network-request-failed")}}async function en(n,e,t,i,s={}){let r=await Pe(n,e,t,i,s);return"mfaPendingCredential"in r&&ve(n,"multi-factor-auth-required",{_serverResponse:r}),r}function Rf(n,e,t,i){let s=`${e}${t}?${i}`;return n.config.emulator?ol(n.config,s):`${n.config.apiScheme}://${s}`}var zc=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Le(this.auth,"network-request-failed")),gw.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function Ri(n,e,t){let i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);let s=Le(n,e,i);return s.customData._tokenResponse=t,s}async function yw(n,e){return Pe(n,"POST","/v1/accounts:delete",e)}async function vw(n,e){return Pe(n,"POST","/v1/accounts:lookup",e)}function Li(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Lf(n,e=!1){let t=te(n),i=await t.getIdToken(e),s=al(i);E(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");let r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:Li($c(s.auth_time)),issuedAtTime:Li($c(s.iat)),expirationTime:Li($c(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function $c(n){return Number(n)*1e3}function al(n){let[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return ar("JWT malformed, contained fewer than 3 sections"),null;try{let s=Wr(t);return s?JSON.parse(s):(ar("Failed to decode base64 JWT payload"),null)}catch(s){return ar("Caught error parsing JWT payload as JSON",s?.toString()),null}}function ww(n){let e=al(n);return E(e,"internal-error"),E(typeof e.exp<"u","internal-error"),E(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Oi(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof se&&bw(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function bw({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Wc=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;let s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var dr=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Li(this.lastLoginAt),this.creationTime=Li(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function fr(n){var e;let t=n.auth,i=await n.getIdToken(),s=await Oi(n,vw(t,{idToken:i}));E(s?.users.length,t,"internal-error");let r=s.users[0];n._notifyReloadListener(r);let o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?_w(r.providerUserInfo):[],a=Ew(n.providerData,o),c=n.isAnonymous,l=!(n.email&&r.passwordHash)&&!a?.length,u=c?l:!1,h={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new dr(r.createdAt,r.lastLoginAt),isAnonymous:u};Object.assign(n,h)}async function Of(n){let e=te(n);await fr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Ew(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function _w(n){return n.map(e=>{var{providerId:t}=e,i=or(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}async function Iw(n,e){let t=await xf(n,{},async()=>{let i=sn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=Rf(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",hr.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}var Yt=class{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){E(e.idToken,"internal-error"),E(typeof e.idToken<"u","internal-error"),E(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ww(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return E(!this.accessToken||this.refreshToken,e,"user-token-expired"),!t&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:i,refreshToken:s,expiresIn:r}=await Iw(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){let{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Yt;return i&&(E(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(E(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(E(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Yt,this.toJSON())}_performRefresh(){return Re("not implemented")}};function gt(n,e){E(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var Je=class{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=or(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Wc(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new dr(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){let t=await Oi(this,this.stsTokenManager.getToken(this.auth,e));return E(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Lf(this,e)}reload(){return Of(this)}_assign(e){this!==e&&(E(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new Je(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){E(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await fr(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){let e=await this.getIdToken();return await Oi(this,yw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,o,a,c,l,u;let h=(i=t.displayName)!==null&&i!==void 0?i:void 0,d=(s=t.email)!==null&&s!==void 0?s:void 0,p=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,b=(o=t.photoURL)!==null&&o!==void 0?o:void 0,S=(a=t.tenantId)!==null&&a!==void 0?a:void 0,A=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,j=(l=t.createdAt)!==null&&l!==void 0?l:void 0,M=(u=t.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:fe,emailVerified:le,isAnonymous:be,providerData:Fe,stsTokenManager:Ue}=t;E(fe&&Ue,e,"internal-error");let qn=Yt.fromJSON(this.name,Ue);E(typeof fe=="string",e,"internal-error"),gt(h,e.name),gt(d,e.name),E(typeof le=="boolean",e,"internal-error"),E(typeof be=="boolean",e,"internal-error"),gt(p,e.name),gt(b,e.name),gt(S,e.name),gt(A,e.name),gt(j,e.name),gt(M,e.name);let Tt=new Je({uid:fe,auth:e,email:d,emailVerified:le,displayName:h,isAnonymous:be,photoURL:b,phoneNumber:p,tenantId:S,stsTokenManager:qn,createdAt:j,lastLoginAt:M});return Fe&&Array.isArray(Fe)&&(Tt.providerData=Fe.map(Bn=>Object.assign({},Bn))),A&&(Tt._redirectEventId=A),Tt}static async _fromIdTokenResponse(e,t,i=!1){let s=new Yt;s.updateFromServerResponse(t);let r=new Je({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await fr(r),r}};var mr=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};mr.type="NONE";var Qc=mr;function cr(n,e,t){return`firebase:${n}:${e}:${t}`}var vt=class{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;let{config:s,name:r}=this.auth;this.fullUserKey=cr(this.userKey,s.apiKey,r),this.fullPersistenceKey=cr("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?Je._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new vt(Xe(Qc),e,i);let s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l),r=s[0]||Xe(Qc),o=cr(i,e.config.apiKey,e.name),a=null;for(let l of t)try{let u=await l._get(o);if(u){let h=Je._fromJSON(e,u);l!==r&&(a=h),r=l;break}}catch{}let c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new vt(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new vt(r,e,i))}};function pf(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ff(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Mf(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Vf(e))return"Blackberry";if(qf(e))return"Webos";if(cl(e))return"Safari";if((e.includes("chrome/")||Pf(e))&&!e.includes("edge/"))return"Chrome";if(Uf(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function Mf(n=z()){return/firefox\//i.test(n)}function cl(n=z()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Pf(n=z()){return/crios\//i.test(n)}function Ff(n=z()){return/iemobile/i.test(n)}function Uf(n=z()){return/android/i.test(n)}function Vf(n=z()){return/blackberry/i.test(n)}function qf(n=z()){return/webos/i.test(n)}function Sr(n=z()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Tw(n=z()){var e;return Sr(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Sw(){return Wl()&&document.documentMode===10}function Bf(n=z()){return Sr(n)||Uf(n)||qf(n)||Vf(n)||/windows phone/i.test(n)||Ff(n)}function kw(){try{return!!(window&&window!==window.top)}catch{return!1}}function jf(n,e=[]){let t;switch(n){case"Browser":t=pf(z());break;case"Worker":t=`${pf(z())}-${n}`;break;default:t=n}let i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Nt}/${i}`}var Yc=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let i=r=>new Promise((o,a)=>{try{let c=e(r);o(c)}catch(c){a(c)}});i.onAbort=t,this.queue.push(i);let s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(let s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}};var Xc=class{constructor(e,t,i){this.app=e,this.heartbeatServiceProvider=t,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new pr(this),this.idTokenSubscription=new pr(this),this.beforeStateQueue=new Yc(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Df,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Xe(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await vt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var t;let i=await this.assertedPersistence.getCurrentUser(),s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=s?._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&c?.user&&(s=c.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return E(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await fr(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=mw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){let t=e?te(e):null;return t&&E(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&E(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Xe(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new je("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&Xe(e)||this._popupRedirectResolver;E(t,this,"argument-error"),this.redirectPersistenceManager=await vt.create(this,[Xe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};let r=typeof t=="function"?t:t.next.bind(t),o=this._isInitialized?Promise.resolve():this._initializationPromise;return E(o,this,"internal-error"),o.then(()=>r(this.currentUser)),typeof t=="function"?e.addObserver(t,i,s):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return E(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=jf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return i&&(t["X-Firebase-Client"]=i),t}};function Ui(n){return te(n)}var pr=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Xl(t=>this.observer=t)}get next(){return E(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};function Hf(n,e,t){let i=Ui(n);E(i._canInitEmulator,i,"emulator-config-failed"),E(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");let s=!!t?.disableWarnings,r=$f(e),{host:o,port:a}=Cw(e),c=a===null?"":`:${a}`;i.config.emulator={url:`${r}//${o}${c}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||Dw()}function $f(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Cw(n){let e=$f(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){let r=s[1];return{host:r,port:gf(i.substr(r.length+1))}}else{let[r,o]=i.split(":");return{host:r,port:gf(o)}}}function gf(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function Dw(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var Xt=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Re("not implemented")}_getIdTokenResponse(e){return Re("not implemented")}_linkToIdToken(e,t){return Re("not implemented")}_getReauthenticationResolver(e){return Re("not implemented")}};async function Aw(n,e){return Pe(n,"POST","/v1/accounts:update",e)}async function Nw(n,e){return en(n,"POST","/v1/accounts:signInWithPassword",we(n,e))}async function xw(n,e){return en(n,"POST","/v1/accounts:signInWithEmailLink",we(n,e))}async function Rw(n,e){return en(n,"POST","/v1/accounts:signInWithEmailLink",we(n,e))}var wt=class extends Xt{constructor(e,t,i,s=null){super("password",i),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new wt(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new wt(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return Nw(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return xw(e,{email:this._email,oobCode:this._password});default:ve(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Aw(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Rw(e,{idToken:t,email:this._email,oobCode:this._password});default:ve(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Rn(n,e){return en(n,"POST","/v1/accounts:signInWithIdp",we(n,e))}var Lw="http://localhost",Me=class extends Xt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new Me(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ve("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=or(t,["providerId","signInMethod"]);if(!i||!s)return null;let o=new Me(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return Rn(e,t)}_linkToIdToken(e,t){let i=this.buildRequest();return i.idToken=t,Rn(e,i)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Rn(e,t)}buildRequest(){let e={requestUri:Lw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=sn(t)}return e}};async function Ow(n,e){return Pe(n,"POST","/v1/accounts:sendVerificationCode",we(n,e))}async function Mw(n,e){return en(n,"POST","/v1/accounts:signInWithPhoneNumber",we(n,e))}async function Pw(n,e){let t=await en(n,"POST","/v1/accounts:signInWithPhoneNumber",we(n,e));if(t.temporaryProof)throw Ri(n,"account-exists-with-different-credential",t);return t}var Fw={USER_NOT_FOUND:"user-not-found"};async function Uw(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return en(n,"POST","/v1/accounts:signInWithPhoneNumber",we(n,t),Fw)}var Ze=class extends Xt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Ze({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Ze({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Mw(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Pw(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Uw(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:i,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:i,code:s}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:i,phoneNumber:s,temporaryProof:r}=e;return!i&&!t&&!s&&!r?null:new Ze({verificationId:t,verificationCode:i,phoneNumber:s,temporaryProof:r})}};function Vw(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function qw(n){let e=rn(on(n)).link,t=e?rn(on(e)).deep_link_id:null,i=rn(on(n)).deep_link_id;return(i?rn(on(i)).link:null)||i||t||e||n}var Ln=class{constructor(e){var t,i,s,r,o,a;let c=rn(on(e)),l=(t=c.apiKey)!==null&&t!==void 0?t:null,u=(i=c.oobCode)!==null&&i!==void 0?i:null,h=Vw((s=c.mode)!==null&&s!==void 0?s:null);E(l&&u&&h,"argument-error"),this.apiKey=l,this.operation=h,this.code=u,this.continueUrl=(r=c.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){let t=qw(e);try{return new Ln(t)}catch{return null}}};var bt=class{constructor(){this.providerId=bt.PROVIDER_ID}static credential(e,t){return wt._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let i=Ln.parseLink(t);return E(i,"argument-error"),wt._fromEmailAndCode(e,i.code,i.tenantId)}};bt.PROVIDER_ID="password";bt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";bt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Mi=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var Jt=class extends Mi{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Ie=class extends Jt{constructor(){super("facebook.com")}static credential(e){return Me._fromParams({providerId:Ie.PROVIDER_ID,signInMethod:Ie.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ie.credentialFromTaggedObject(e)}static credentialFromError(e){return Ie.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ie.credential(e.oauthAccessToken)}catch{return null}}};Ie.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ie.PROVIDER_ID="facebook.com";var de=class extends Jt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Me._fromParams({providerId:de.PROVIDER_ID,signInMethod:de.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return de.credentialFromTaggedObject(e)}static credentialFromError(e){return de.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return de.credential(t,i)}catch{return null}}};de.GOOGLE_SIGN_IN_METHOD="google.com";de.PROVIDER_ID="google.com";var Te=class extends Jt{constructor(){super("github.com")}static credential(e){return Me._fromParams({providerId:Te.PROVIDER_ID,signInMethod:Te.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Te.credentialFromTaggedObject(e)}static credentialFromError(e){return Te.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Te.credential(e.oauthAccessToken)}catch{return null}}};Te.GITHUB_SIGN_IN_METHOD="github.com";Te.PROVIDER_ID="github.com";var Se=class extends Jt{constructor(){super("twitter.com")}static credential(e,t){return Me._fromParams({providerId:Se.PROVIDER_ID,signInMethod:Se.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Se.credentialFromTaggedObject(e)}static credentialFromError(e){return Se.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Se.credential(t,i)}catch{return null}}};Se.TWITTER_SIGN_IN_METHOD="twitter.com";Se.PROVIDER_ID="twitter.com";var Et=class{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){let r=await Je._fromIdTokenResponse(e,i,s),o=yf(i);return new Et({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);let s=yf(i);return new Et({user:e,providerId:s,_tokenResponse:i,operationType:t})}};function yf(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var On=class extends se{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,On.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new On(e,t,i,s)}};function Gf(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?On._fromErrorAndOperation(n,r,e,i):r})}async function Bw(n,e,t=!1){let i=await Oi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Et._forOperation(n,"link",i)}async function jw(n,e,t=!1){let{auth:i}=n,s="reauthenticate";try{let r=await Oi(n,Gf(i,s,e,n),t);E(r.idToken,i,"internal-error");let o=al(r.idToken);E(o,i,"internal-error");let{sub:a}=o;return E(n.uid===a,i,"user-mismatch"),Et._forOperation(n,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&ve(i,"user-mismatch"),r}}async function Hw(n,e,t=!1){let i="signIn",s=await Gf(n,i,e),r=await Et._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}function Kf(n,e,t,i){return te(n).onIdTokenChanged(e,t,i)}function zf(n,e,t){return te(n).beforeAuthStateChanged(e,t)}function ll(n,e,t,i){return te(n).onAuthStateChanged(e,t,i)}function ul(n){return te(n).signOut()}function $w(n,e){return Pe(n,"POST","/v2/accounts/mfaEnrollment:start",we(n,e))}function Gw(n,e){return Pe(n,"POST","/v2/accounts/mfaEnrollment:finalize",we(n,e))}var gr="__sak";var yr=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(gr,"1"),this.storage.removeItem(gr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};function Kw(){let n=z();return cl(n)||Sr(n)}var zw=1e3,Ww=10,vr=class extends yr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Kw()&&kw(),this.fallbackToPolling=Bf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}let i=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let o=this.storage.getItem(i);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(i,e.newValue):this.storage.removeItem(i);else if(this.localCache[i]===e.newValue&&!t)return}let s=()=>{let o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Sw()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ww):s()}notifyListeners(e,t){this.localCache[e]=t;let i=this.listeners[e];if(i)for(let s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},zw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};vr.type="LOCAL";var Wf=vr;var wr=class extends yr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};wr.type="SESSION";var hl=wr;function Qw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Mn=class{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;let i=new Mn(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});let a=Array.from(o).map(async l=>l(t.origin,r)),c=await Qw(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Mn.receivers=[];function dl(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}var Jc=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){let s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{let l=dl("",20);s.port1.start();let u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(h){let d=h;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(d.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function Oe(){return window}function Yw(n){Oe().location.href=n}function Qf(){return typeof Oe().WorkerGlobalScope<"u"&&typeof Oe().importScripts=="function"}async function Xw(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Jw(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Zw(){return Qf()?self:null}var Yf="firebaseLocalStorageDb",eb=1,br="firebaseLocalStorage",Xf="fbase_key",Zt=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function kr(n,e){return n.transaction([br],e?"readwrite":"readonly").objectStore(br)}function tb(){let n=indexedDB.deleteDatabase(Yf);return new Zt(n).toPromise()}function Zc(){let n=indexedDB.open(Yf,eb);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let i=n.result;try{i.createObjectStore(br,{keyPath:Xf})}catch(s){t(s)}}),n.addEventListener("success",async()=>{let i=n.result;i.objectStoreNames.contains(br)?e(i):(i.close(),await tb(),e(await Zc()))})})}async function vf(n,e,t){let i=kr(n,!0).put({[Xf]:e,value:t});return new Zt(i).toPromise()}async function nb(n,e){let t=kr(n,!1).get(e),i=await new Zt(t).toPromise();return i===void 0?null:i.value}function wf(n,e){let t=kr(n,!0).delete(e);return new Zt(t).toPromise()}var ib=800,sb=3,Er=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Zc(),this.db)}async _withRetries(e){let t=0;for(;;)try{let i=await this._openDb();return await e(i)}catch(i){if(t++>sb)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Qf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Mn._getInstance(Zw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Xw(),!this.activeServiceWorker)return;this.sender=new Jc(this.activeServiceWorker);let i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Jw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Zc();return await vf(e,gr,"1"),await wf(e,gr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>vf(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(i=>nb(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>wf(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(s=>{let r=kr(s,!1).getAll();return new Zt(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],i=new Set;for(let{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(let s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;let i=this.listeners[e];if(i)for(let s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ib)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Er.type="LOCAL";var Jf=Er;function rb(n,e){return Pe(n,"POST","/v2/accounts/mfaSignIn:start",we(n,e))}function ob(n,e){return Pe(n,"POST","/v2/accounts/mfaSignIn:finalize",we(n,e))}function ab(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}function cb(n){return new Promise((e,t)=>{let i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{let r=Le("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",ab().appendChild(i)})}function Zf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var b_=Zf("rcb"),E_=new Qt(3e4,6e4);var lb="recaptcha";async function ub(n,e,t){var i;let s=await t.verify();try{E(typeof s=="string",n,"argument-error"),E(t.type===lb,n,"argument-error");let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){let o=r.session;if("phoneNumber"in r)return E(o.type==="enroll",n,"internal-error"),(await $w(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,recaptchaToken:s}})).phoneSessionInfo.sessionInfo;{E(o.type==="signin",n,"internal-error");let a=((i=r.multiFactorHint)===null||i===void 0?void 0:i.uid)||r.multiFactorUid;return E(a,n,"missing-multi-factor-info"),(await rb(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:s}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:o}=await Ow(n,{phoneNumber:r.phoneNumber,recaptchaToken:s});return o}}finally{t._reset()}}var et=class{constructor(e){this.providerId=et.PROVIDER_ID,this.auth=Ui(e)}verifyPhoneNumber(e,t){return ub(this.auth,e,te(t))}static credential(e,t){return Ze._fromVerification(e,t)}static credentialFromResult(e){let t=e;return et.credentialFromTaggedObject(t)}static credentialFromError(e){return et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:i}=e;return t&&i?Ze._fromTokenResponse(t,i):null}};et.PROVIDER_ID="phone";et.PHONE_SIGN_IN_METHOD="phone";function em(n,e){return e?Xe(e):(E(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Pi=class extends Xt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Rn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Rn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Rn(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function hb(n){return Hw(n.auth,new Pi(n),n.bypassAuthState)}function db(n){let{auth:e,user:t}=n;return E(t,e,"internal-error"),jw(t,new Pi(n),n.bypassAuthState)}async function fb(n){let{auth:e,user:t}=n;return E(t,e,"internal-error"),Bw(t,new Pi(n),n.bypassAuthState)}var _r=class{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}let c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hb;case"linkViaPopup":case"linkViaRedirect":return fb;case"reauthViaPopup":case"reauthViaRedirect":return db;default:ve(this.auth,"internal-error")}}resolve(e){tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var mb=new Qt(2e3,1e4);var yt=class extends _r{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,yt.currentPopupAction&&yt.currentPopupAction.cancel(),yt.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return E(e,this.auth,"internal-error"),e}async onExecution(){tt(this.filter.length===1,"Popup operations only handle one event");let e=dl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Le(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Le(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,yt.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Le(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,mb.get())};e()}};yt.currentPopupAction=null;var pb="pendingRedirect",lr=new Map,el=class extends _r{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=lr.get(this.auth._key());if(!e){try{let i=await gb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}lr.set(this.auth._key(),e)}return this.bypassAuthState||lr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function gb(n,e){let t=nm(e),i=tm(n);if(!await i._isAvailable())return!1;let s=await i._get(t)==="true";return await i._remove(t),s}async function yb(n,e){return tm(n)._set(nm(e),"true")}function vb(n,e){lr.set(n._key(),e)}function tm(n){return Xe(n._redirectPersistence)}function nm(n){return cr(pb,n.config.apiKey,n.name)}function fl(n,e,t){return wb(n,e,t)}async function wb(n,e,t){let i=Ui(n);uw(n,e,Mi),await i._initializationPromise;let s=em(i,t);return await yb(s,i),s._openRedirect(i,e,"signInViaRedirect")}async function bb(n,e,t=!1){let i=Ui(n),s=em(i,e),o=await new el(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}var Eb=10*60*1e3,tl=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!_b(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!im(e)){let s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(Le(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Eb&&this.cachedEventUids.clear(),this.cachedEventUids.has(bf(e))}saveEventToCache(e){this.cachedEventUids.add(bf(e)),this.lastProcessedEventTime=Date.now()}};function bf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function im({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function _b(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return im(n);default:return!1}}async function Ib(n,e={}){return Pe(n,"GET","/v1/projects",e)}var Tb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Sb=/^https?/;async function kb(n){if(n.config.emulator)return;let{authorizedDomains:e}=await Ib(n);for(let t of e)try{if(Cb(t))return}catch{}ve(n,"unauthorized-domain")}function Cb(n){let e=Kc(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!Sb.test(t))return!1;if(Tb.test(n))return i===n;let s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}var Db=new Qt(3e4,6e4);function Ef(){let n=Oe().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Ab(n){return new Promise((e,t)=>{var i,s,r;function o(){Ef(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ef(),t(Le(n,"network-request-failed"))},timeout:Db.get()})}if(!((s=(i=Oe().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=Oe().gapi)===null||r===void 0)&&r.load)o();else{let a=Zf("iframefcb");return Oe()[a]=()=>{gapi.load?o():t(Le(n,"network-request-failed"))},cb(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw ur=null,e})}var ur=null;function Nb(n){return ur=ur||Ab(n),ur}var xb=new Qt(5e3,15e3),Rb="__/auth/iframe",Lb="emulator/auth/iframe",Ob={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Mb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Pb(n){let e=n.config;E(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?ol(e,Lb):`https://${n.config.authDomain}/${Rb}`,i={apiKey:e.apiKey,appName:n.name,v:Nt},s=Mb.get(n.config.apiHost);s&&(i.eid=s);let r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${sn(i).slice(1)}`}async function Fb(n){let e=await Nb(n),t=Oe().gapi;return E(t,n,"internal-error"),e.open({where:document.body,url:Pb(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ob,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});let o=Le(n,"network-request-failed"),a=Oe().setTimeout(()=>{r(o)},xb.get());function c(){Oe().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}var Ub={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Vb=500,qb=600,Bb="_blank",jb="http://localhost",Ir=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Hb(n,e,t,i=Vb,s=qb){let r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString(),a="",c=Object.assign(Object.assign({},Ub),{width:i.toString(),height:s.toString(),top:r,left:o}),l=z().toLowerCase();t&&(a=Pf(l)?Bb:t),Mf(l)&&(e=e||jb,c.scrollbars="yes");let u=Object.entries(c).reduce((d,[p,b])=>`${d}${p}=${b},`,"");if(Tw(l)&&a!=="_self")return $b(e||"",a),new Ir(null);let h=window.open(e||"",a,u);E(h,n,"popup-blocked");try{h.focus()}catch{}return new Ir(h)}function $b(n,e){let t=document.createElement("a");t.href=n,t.target=e;let i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}var Gb="__/auth/handler",Kb="emulator/auth/handler";function _f(n,e,t,i,s,r){E(n.config.authDomain,n,"auth-domain-config-required"),E(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:Nt,eventId:s};if(e instanceof Mi){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Yl(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[c,l]of Object.entries(r||{}))o[c]=l}if(e instanceof Jt){let c=e.getScopes().filter(l=>l!=="");c.length>0&&(o.scopes=c.join(","))}n.tenantId&&(o.tid=n.tenantId);let a=o;for(let c of Object.keys(a))a[c]===void 0&&delete a[c];return`${zb(n)}?${sn(a).slice(1)}`}function zb({config:n}){return n.emulator?ol(n,Kb):`https://${n.authDomain}/${Gb}`}var Gc="webStorageSupport",nl=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=hl,this._completeRedirectFn=bb,this._overrideRedirectResult=vb}async _openPopup(e,t,i,s){var r;tt((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");let o=_f(e,t,i,Kc(),s);return Hb(e,o,dl())}async _openRedirect(e,t,i,s){return await this._originValidation(e),Yw(_f(e,t,i,Kc(),s)),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(tt(r,"If manager is not set, promise should be"),r)}let i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){let t=await Fb(e),i=new tl(e);return t.register("authEvent",s=>(E(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Gc,{type:Gc},s=>{var r;let o=(r=s?.[0])===null||r===void 0?void 0:r[Gc];o!==void 0&&t(!!o),ve(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=kb(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Bf()||cl()||Sr()}},sm=nl,il=class{constructor(e){this.factorId=e}_process(e,t,i){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,i);case"signin":return this._finalizeSignIn(e,t.credential);default:return Re("unexpected MultiFactorSessionType")}}},Fi=class extends il{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Fi(e)}_finalizeEnroll(e,t,i){return Gw(e,{idToken:t,displayName:i,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return ob(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Tr=class{constructor(){}static assertion(e){return Fi._fromCredential(e)}};Tr.FACTOR_ID="phone";var If="@firebase/auth",Tf="0.21.1";var sl=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){E(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Wb(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function Qb(n){rt(new pe("auth",(e,{options:t})=>{let i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),{apiKey:r,authDomain:o}=i.options;return((a,c)=>{E(r&&!r.includes(":"),"invalid-api-key",{appName:a.name}),E(!o?.includes(":"),"argument-error",{appName:a.name});let l={apiKey:r,authDomain:o,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:jf(n)},u=new Xc(a,c,l);return hw(u,t),u})(i,s)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),rt(new pe("auth-internal",e=>{let t=Ui(e.getProvider("auth").getImmediate());return(i=>new sl(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ee(If,Tf,Wb(n)),Ee(If,Tf,"esm2017")}var Yb=5*60,Xb=Xr("authIdTokenMaxAge")||Yb,Sf=null,Jb=n=>async e=>{let t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>Xb)return;let s=t?.token;Sf!==s&&(Sf=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Vi(n=Yi()){let e=Gn(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Nf(n,{popupRedirectResolver:sm,persistence:[Jf,Wf,hl]}),i=Xr("authTokenSyncURL");if(i){let r=Jb(i);zf(t,r,()=>r(t.currentUser)),Kf(t,o=>r(o))}let s=Yr("auth");return s&&Hf(t,`http://${s}`),t}Qb("Browser");var pl=!1,ml=null,Pn=null,gl=function(){return ml},qi=function(){return gl()!==null},yl=function(n,e){let t=n.code||"",i=n.message||"",s=`${e} auth error ${t}: ${i}`;console.log(s),Pn&&Pn.trigger("error:display",s)},rm=async function(){if(pl)try{let n=Vi(),e=new de;await fl(n,e)}catch(n){yl(n,"signIn")}},om=function(n){Pn=n;try{hf();let e=Vi();pl=!0,ll(e,t=>{t!=null?(console.log("Auth state changed to have a user."),ml=t,Pn.trigger("auth:signin")):(console.log("Auth state changed to no user."),ml=null,Pn.trigger("auth:signout"))}),Pn.trigger("auth:enabled")}catch(e){yl(e,"monitorAuth")}},am=function(){if(!pl)return;let n=Vi();ul(n).then(()=>{}).catch(e=>{yl(e,"signOut")})};var Cr=function(){let n=gl();if(!n||!n.uid)throw new Error("User not authed.");return n.uid},vl=function(n,e){let t=Bc();return Wd(t,`/users/${n}/characters`,e)},Zb=function(n){let e=Bc();return zd(e,`/users/${n}/characters`)},eE=async function(n){let e=Cr();if(!e)return null;let t=vl(e,n);try{let i=await of(t);return i.exists()?i.data():null}catch(i){throw console.log(`Database.get error: ${i}`),new Error(`Database.get error: ${i}`)}},tE=async function(n,e){let t=Cr();if(!t)return!1;let i=vl(t,n);try{await cf(i,e)}catch(s){throw console.log(`Database.set error: ${s}`),new Error(`Database.set error: ${s}`)}return!0},nE=async function(){let n=Cr();if(!n)return[];let e=[];try{(await af(Zb(n))).forEach(i=>{e.push(i.data())})}catch(t){throw console.log(`Database.getAll error: ${t}`),new Error(`Database.getAll error: ${t}`)}return e},iE=async function(n){let e=Cr();if(!e)return!1;let t=vl(e,n);try{await lf(t)}catch(i){throw console.log(`Database.remove error: ${i}`),new Error(`Database.remove error: ${i}`)}return!0},Bi={get:eE,set:tE,getAll:nE,remove:iE};var wl=class{constructor(e){this.tablist=e,this.tabs=[],this.panes=[],e&&(this.tabs=e.querySelectorAll("a[role=tab]"),this.panes=e.parentNode.querySelectorAll("section[role=tabpanel]"),Array.from(this.tabs).forEach(t=>{t.addEventListener("click",this.changeTab.bind(this))}))}switchToPane(e){let t=-1;if(e)t=Array.prototype.findIndex.call(this.panes,i=>i.id===e);else{let i=this.tablist.querySelector("[aria-selected=true]");t=Array.prototype.indexOf.call(this.tabs,i)+1,t>=this.tabs.length&&(t=0)}t!==-1&&this.tabs[t].click()}changeTab(e){e.preventDefault();let t=this.tablist.querySelector("[aria-selected=true]");if(!t)return;let i=Array.prototype.indexOf.call(this.tabs,t),s=e.currentTarget,r=Array.prototype.indexOf.call(this.tabs,s);if(i===r)return;t.setAttribute("aria-selected",!1),s.setAttribute("aria-selected",!0);let o=this.panes[i];o&&(o.hidden=!0);let a=this.panes[r];a&&(a.hidden=!1,a.querySelector("[data-name]").focus())}},cm=wl;var lm=document.createElement("template");lm.innerHTML=`
<link rel="stylesheet" href="./styles.css">
<header class="page-header">
    <h1 class="pc-charname" aria-label="Character Name"><field-editable data-name="charname" id="page-top" placeholder="Character Name"></field-editable></h1>
</header>
`;var Dr=class extends HTMLElement{constructor({emitter:e=null,templateNode:t=null}){super(),this.emitter=e,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(lm.content.cloneNode(!0)),t&&this.shadowRoot.appendChild(t),this.dataset.sheetview="true"}connectedCallback(){this.mainTabs=new cm(this.shadowRoot.querySelector("ul[role=tablist]")),this.shadowRoot.addEventListener("fieldChange",this._handleFieldChange.bind(this)),Array.from(this.shadowRoot.querySelectorAll("input[type=number]")).forEach(e=>{e.addEventListener("change",this._numberInputChange.bind(this))}),this.emitter.on("tab:switch",this.switchToPane,this)}disconnectedCallback(){this.shadowRoot.removeEventListener("fieldChange",this._handleFieldChange.bind(this)),Array.from(this.shadowRoot.querySelectorAll("input[type=number]")).forEach(t=>{t.removeEventListener("change",this._numberInputChange.bind(this))}),this.emitter.off("tab:switch",this.switchToPane,this),document.querySelector("footer-nav").removeLinks()}_validateCharacter(e){throw new Error("Invalid character type for this view.")}set character(e){this._validateCharacter(e),this.cur_character=e,this.emitter.trigger("character:set"),this.renderCharacter()}get character(){return this.cur_character}switchToPane(e){this.mainTabs&&this.mainTabs.switchToPane(e)}_renderCustomFields(e,t,i,s){return!1}_renderCustomPost(){}renderCharacter(){if(this.cur_character===null)return;this.shadowRoot.querySelector('[data-name="charname"]').content=this.cur_character.charname,Array.from(this.shadowRoot.querySelectorAll("*[data-name]")).forEach(t=>{let i=t.getAttribute("data-name");if(typeof this.cur_character[i]>"u")return;let s=t.getAttribute("data-subfield"),r=s?this.cur_character[i][s]:this.cur_character[i];switch(t.tagName){case"INPUT":case"TEXTAREA":case"SELECT":t.getAttribute("type")==="number"?t.value=r||0:t.value=r||"";let o=new Event("change");t.dispatchEvent(o);break;case"SIMPLE-LIST":t.clear();let a=r||[];a.length>0&&a.forEach(u=>{u.length!==0&&t.addItem(u)}),t.addItem();break;case"NOTE-LIST":t.clear();let c=r||[];c.length>0&&c.forEach(u=>{u.length!==0&&t.addItem(u)}),t.addItem();break;case"TABLE-EDITABLE":t.clear();let l=r||[];l.length>0&&l.forEach(u=>{u.length!==0&&t.addRow(u)}),t.addRow();break;case"FIELD-EDITABLE":t.content=r||"";break;default:this._renderCustomFields(t,i,s,r)||t.getAttribute("content-editable")==="true"&&(t.innerHTML=r||"")}}),this._renderCustomPost(),this.emitter.trigger("dialog:save:hide")}_showUnsavedDialog(){this.emitter.trigger("dialog:save:show")}_sameValues(e,t){return JSON.stringify(e)===JSON.stringify(t)}_customFieldChange(e,t,i){return!1}_handleFieldChange(e){let t=e.detail.field||"",i=e.detail.subfield||"";if(!t)return;let s=this.cur_character;if(typeof s[t]>"u"||this._customFieldChange(e,t,i))return;let r=e.detail.value;if(i){if(typeof s[t]!="object"||Array.isArray(s[t]))return;let a=s[t][i];this._sameValues(a,r)||(s[t][i]=e.detail.value,this._showUnsavedDialog());return}let o=s[t];this._sameValues(o,r)||(s[t]=r,this._showUnsavedDialog())}_customNumberInputChange(){}_numberInputChange(e){let t=e.target.dataset.name,i=e.target.dataset.subfield;if(typeof this.cur_character[t][i]>"u")return;let s=parseInt(e.target.value,10);this.cur_character[t][i]=s,this.emitter.trigger("dialog:save:show"),this._customNumberInputChange(e)}navigateTo(e){let t=this.shadowRoot.querySelector(e);t&&(t.scrollIntoView(),t.focus())}};window.customElements.get("sheet-view")||window.customElements.define("sheet-view",Dr);var Fn=Dr;var Ar=class{constructor(e,t,i){this.el=e,this.cur_character=t,this.emitter=i,this.el.addEventListener("click",this._openSpellModal.bind(this))}async getSpellData(e){let t=`https://www.dnd5eapi.co/api/spells?level=${e}&school=illusion&school=abjuration&school=conjuration&school=divination&school=enchantment&school=evocation&school=necromancy&school=psionic&school=transmutation`,i=await fetch(t,{method:"GET"}),{results:s}=await i.json();if(!i.ok)throw new Error("Error fetching API resource.");return s}async _openSpellModal(e){if(this.spellDialog=this.spellDialog||document.getElementById("dialog-spells"),this.spellDialog.clear(),this.spellDialog.isOpen){this.spellDialog.close();return}let t=document.getElementById("spellModal"),i=document.importNode(t.content,!0),s=i.querySelector("ul"),r=e.target.dataset.level;try{(await this.getSpellData(r)).forEach(a=>{let c=document.createElement("div"),l=document.createElement("button"),u=a.name.replace(/ /g,"-").replace(/'/g,"'");l.innerText=a.name,l.dataset.field="spells",l.dataset.subfield=r,l.dataset.name=u,l.classList.add("btn","btn-plain"),l.addEventListener("click",this._handleAddNewSpell.bind(this)),c.appendChild(l),s.appendChild(c)})}catch(o){console.log(o);let a=document.createElement("div");a.innerText="Unable to access this resource at the moment.",s.appendChild(a)}this.spellDialog.setContent([...i.children]),this.spellDialog.open()}_handleAddNewSpell(e){let t=e.target.dataset.field,i=e.target.dataset.subfield,s=e.target.dataset.name;if(typeof this.cur_character[t][i]>"u")return;let o=[...this.cur_character[t][i],s],a=this.cur_character.spell_slots[i]+1;this.cur_character.spell_slots[i]=a,this.cur_character[t][i]=o,this.emitter.trigger("character:update:spells")}};window.customElements.get("add-spell")||window.customElements.define("add-spell",Ar);var um=Ar;var hm=document.createElement("template");hm.innerHTML=`
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
`;var Nr=class extends Fn{constructor({emitter:e}){super({emitter:e,templateNode:hm.content.cloneNode(!0)}),this.spellButtons=[]}connectedCallback(){super.connectedCallback(),this.shadowRoot.addEventListener("attributeChange",this._handleAttributeChange.bind(this)),this.shadowRoot.addEventListener("saveChange",this._handleSaveChange.bind(this)),this.emitter.on("character:skill:update",this._updateSkillMod,this),this.emitter.on("character:proficiency:update",this._updateProficiency,this),this.emitter.on("character:attribute:update",this._updateAttributeMods,this),this.emitter.on("character:save:update",this._updateSaveMods,this),this.emitter.on("character:set",this._addSpellButtonEvents,this),this.emitter.on("character:update:spells",this._updateSpellList,this);let e=document.querySelector("footer-nav");e&&e.setLinks([{label:"Attributes",tab:"pane-stats",href:"#page-attributes"},{label:"Skills",tab:"pane-stats",href:"#page-skills"},{label:"Spells",tab:"pane-stats",href:"#page-spells"},{label:"Notes",tab:"pane-notes",href:"#page-notes_adv"}])}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.removeEventListener("attributeChange",this._handleAttributeChange.bind(this)),this.shadowRoot.removeEventListener("saveChange",this._handleSaveChange.bind(this)),this.emitter.off("character:skill:update",this._updateSkillMod,this),this.emitter.off("character:proficiency:update",this._updateProficiency,this),this.emitter.off("character:attribute:update",this._updateAttributeMods,this),this.emitter.off("character:save:update",this._updateSaveMods,this),this.emitter.off("character:set",this._addSpellButtonEvents,this),this.emitter.off("character:update:spells",this._updateSpellList,this)}_addSpellButtonEvents(){this.shadowRoot.querySelectorAll("[data-level]").forEach(t=>{this.spellButtons.push(new um(t,this.cur_character,this.emitter))})}_updateSpellList(){this.shadowRoot.querySelectorAll('[data-name="spells"]').forEach(t=>{let i=t.dataset.name||"";if(typeof this.cur_character[i]>"u"||i==="")return;let s=t.dataset.subfield||"",o=(s!==""?this.cur_character[i][s]:this.cur_character[i])||[];t.clear(),o.forEach(a=>{if(!a)return;let c=a.replace("-"," ");t.addItem(c)}),o.length===0&&t.addItem()})}_validateCharacter(e){if(!(e instanceof St))throw new Error("Invalid character type for this view.")}_renderCustomFields(e,t,i,s){switch(e.tagName){case"SKILL-LISTING":return e.skillValue=s||0,e.skillMod=this.cur_character.getSkillMod(i),!0;case"ATTR-LISTING":return e.attributeScore=s||10,e.attributeMod=this.cur_character.attributeMod(t),e.saveProficiency=this.cur_character.saves[t],e.saveMod=this.cur_character.saveMod(t),!0}return!1}_renderCustomPost(){this.shadowRoot.querySelector('[data-name="proficiency"]').innerHTML=this.cur_character.proficiency}_customFieldChange(e,t,i){if(t==="skills"){let s=this.character.getSkill(i);return this._sameValues(s,e.detail.value)||(this.character.setSkill(i,e.detail.value),this._showUnsavedDialog()),!0}if(t==="weapons"){let s=this.character[t],r=e.detail.value.map(o=>new Be(o));return this._sameValues(s,r)||(this.character[t]=r,this._showUnsavedDialog()),!0}}_updateSkillMod(e,t){let i=this.shadowRoot.querySelector(`skill-listing[data-subfield="${e}"]`);i&&(i.skillMod=t)}_updateProficiency(){let e=this.cur_character.proficiency;this.shadowRoot.querySelector('[data-name="proficiency"]').innerHTML=e,Array.from(this.shadowRoot.querySelectorAll("skill-listing")).forEach(t=>{let i=t.skillName;t.skillMod=this.cur_character.getSkillMod(i)}),Array.from(this.shadowRoot.querySelectorAll("attr-listing")).forEach(t=>{let i=t.attributeName;t.saveMod=this.cur_character.saveMod(i)})}_updateAttributeMods(e){let t=this.shadowRoot.querySelector(`attr-listing[data-name=${e}]`);t&&(t.attributeMod=this.cur_character.attributeMod(e),t.saveMod=this.cur_character.saveMod(e))}_updateSaveMods(e){let t=this.shadowRoot.querySelector(`attr-listing[data-name=${e}]`);t&&(t.saveMod=this.cur_character.saveMod(e))}_customNumberInputChange(e){let t=e.target.dataset.name,i=e.target.dataset.subfield,s=parseInt(e.target.value,10);if(t==="spell_slots"){let r=this.shadowRoot.querySelector(`[data-name="spells"][data-subfield="${i}"]`);s?r.parentNode.hidden=!1:r.parentNode.hidden=!0}}_handleAttributeChange(e){let t=e.detail.field||"";t&&(this.cur_character.setAttribute(t,e.detail.value),this._showUnsavedDialog())}_handleSaveChange(e){let t=e.detail.field||"";t&&(this.cur_character.setSaveProficiency(t,e.detail.value),this._showUnsavedDialog())}};window.customElements.get("sheet-view-5e")||window.customElements.define("sheet-view-5e",Nr);var dm=Nr;var fm=document.createElement("template");fm.innerHTML=`
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
`;var xr=class extends Fn{constructor({emitter:e}){super({emitter:e,templateNode:fm.content.cloneNode(!0)})}connectedCallback(){super.connectedCallback();let e=document.querySelector("footer-nav");e&&e.setLinks([{label:"Attributes",tab:"pane-stats",href:"#page-attributes"},{label:"Notes",tab:"pane-notes",href:"#page-notes"}])}disconnectedCallback(){super.disconnectedCallback()}_validateCharacter(e){if(!(e instanceof kt))throw new Error("Invalid character type for this view.")}};window.customElements.get("sheet-view-vagabonds")||window.customElements.define("sheet-view-vagabonds",xr);var mm=xr;var pm="4.3.2";var tn=null,rE=pm,oE=function(){return new Date().toUTCString()},bl=function(){let n=`${Math.random().toString(36)}00000000000000000`.slice(2,9);for(;nt(n)!==null;)n=`${Math.random().toString(36)}00000000000000000`.slice(2,9);return n},gm=function(){return["Character5e","CharacterVagabonds"]},Un=function(n,e){switch(n){case void 0:case"":case"Character5e":return new St(e);case"CharacterVagabonds":return new kt(e);default:return new qe(e)}},aE=function(n,e="Character5e"){return Un(e,{key:n})},nt=function(n){if(!n)return null;let e=nn.get(n);return!e||!e.key?null:Un(e.className,e)},Rr=async function(n){if(!n)return null;let e=await Bi.get(n);return!e||!e.key?null:Un(e.className,e)},ji=function(n){return n.updated=oE(),n.version=rE,nn.set(n.key,n)},El=async function(n){return await Bi.set(n.key,n.toJSON())},Lr=function(n){nn.remove(n)},ym=async function(n){return Bi.remove(n)},_t=function(){let n=[];return nn.getAll().forEach(e=>{n.push(Un(e.className,e))}),n},vm=async function(){let n=new Map;return qi()?((await Bi.getAll()).forEach(t=>{let i=Un(t.className,t);n.set(i.key,i)}),n):[]},wm=function(n){if(typeof n!="object"||!n.key)throw new Error("Data appears to be invalid. Try removing any text that isn't part of the backup (i.e. email introduction).");let e=Un(n.className,n),t=nt(n.key);if(t&&t.charname!==""&&t.charname!==e.charname)if(!e.key_prev)e.key_prev=e.key,e.key=bl();else{let i=e.key_prev;e.key_prev=e.key,e.key=i}return ji(e),e},bm=function(n){if(!n)throw Error("LocalStorage prefix is empty.");nn.setPrefix(n)},Em=function(n,e,t=!1){let i=nt(n);if(!i){if(!t)return null;i=aE(n,e)}return tn=i,tn};var Vn=function(){return tn?tn.key:""},_m=function(){if(!tn)throw new Error("No character is set.");if(tn.charname==="")throw new Error("Your character must have name to save!");ji(tn)},Im=function(n,e){let t=null;switch(n.className){case void 0:case"Character5e":t=new dm({emitter:e});break;case"CharacterVagabonds":t=new mm({emitter:e});break;default:t=new Fn({emitter:e});break}return t};var _l=class{constructor(e){this.emitter=e,this.shortcuts={},document.addEventListener("keydown",this.checkShortCuts.bind(this))}addShortCut(e,t){this.shortcuts[e]=t}getKeyCode(e,t,i){let s="";return t&&(s+="Ctrl+"),i&&(s+="Shift+"),s+=e,s}checkShortCuts(e){let t=!1,i=!1;e.ctrlKey&&(t=!0),e.shiftKey&&(i=!0);let s=e.key,r=this.getKeyCode(s,t,i),o=this.shortcuts[r]||null;o&&(e.preventDefault(),e.stopPropagation(),this.emitter.trigger(o))}},Tm=_l;var cE={emitter:null,appname:"",dialog_unsaved:document.querySelector(".alert-unsaved"),dialog_undo:document.querySelector(".alert-delete"),triggerNewCharacter:function(n=""){let e=bl();this.loadCharacter(e,n).then(()=>{window.location.hash=`#${e}`}).catch(t=>{console.log(t)})},changeCharacter:function(){let n=window.location.hash.substring(1),e=Vn();e&&n===e||this.loadCharacter(n)},loadCharacter:async function(n,e=""){this.hideUnsavedDialog();let t=Em(n,e,!0);t.emitter=this.emitter;let i=Im(t,this.emitter);document.querySelector("main").innerHTML="",document.querySelector("main").appendChild(i),i.character=t,this.emitter.trigger("loaddialog:close"),this.emitter.trigger("newdialog:close")},saveCharacter:function(){if(document.activeElement){let n=new Event("blur");document.activeElement.dispatchEvent(n)}try{_m()}catch(n){this.emitter.trigger("error:display",n.message);return}this.hideUnsavedDialog()},downloadBackup:function(n){let e=[],t=[];Array.from(n.querySelectorAll("input[type=checkbox]:checked")).forEach(o=>{let a=nt(o.value);e.push(a),t.push(a.charname)});let s=n.querySelector("input[name=format]:checked").value,r=new Date;if(s==="email"){let o=`Below is the backup data for your character(s) ${t.join(", ")}.

To use this data, go to: ${window.location.href} and click the "Restore Backup" button. Then paste the text below into the box.

---

${JSON.stringify(e)}`,a=`mailto:?subject=${encodeURIComponent(`Character backup: ${t.join(", ")} (${r.toLocaleString()})`)}&body=${encodeURIComponent(o)}`;this.emitter.trigger("backup:email",a)}else{if(typeof window.Blob!="function"){this.emitter.trigger("backup:textpaste",JSON.stringify(e));return}let o=document.createElement("a"),a=new Blob([JSON.stringify(e)],{type:"application/json"}),c=URL.createObjectURL(a);o.href=c,o.download=`${this.appname}_${r.getFullYear()}_${r.getMonth()+1}_${r.getDate()}`,document.body.appendChild(o),o.click(),setTimeout(function(){document.body.removeChild(o),window.URL.revokeObjectURL(c)},0)}},restoreFormSubmit:function(n){let e=n.querySelector("input[type=file]"),t=n.querySelector("textarea");e.files&&e.files.length>0?Array.from(e.files).forEach(i=>{let s=new FileReader;s.onload=(r=>o=>{this.restoreCharacters(o.target.result)})(i),s.readAsText(i)}):t.value!==""&&this.restoreCharacters(t.value)},restoreCharacters:function(n){try{let e=n.indexOf("[{"),t=n.lastIndexOf("}]"),i=n.indexOf(":[{");i!==-1&&i<e&&(e=-1),e===-1?(e=n.indexOf("{"),t=n.lastIndexOf("}"),n=n.substring(e),n=n.substring(0,t+1)):(n=n.substring(e),n=n.substring(0,t+2)),n=n.trim(),n=n.replace(/\},[\r\n]+\{/g,"},{"),n=n.replace(/(?:\r\n|\r|\n)/g,"<br/>");let s=JSON.parse(n);Array.isArray(s)||(s=[s]);let r=[],o=!1,a=Vn();s.forEach(l=>{let u=wm(l);u.key===a&&(o=!0);let h=document.createElement("li");h.textContent=`${u.charname} has been added. `;let d=document.createElement("a");d.setAttribute("href",`#${u.key}`),d.textContent="View character now.",d.addEventListener("click",p=>{this.alert.closeClear()}),h.appendChild(d),r.push(h)});let c=document.createElement("ul");r.forEach(l=>{c.appendChild(l)}),this.alert.header="Restored Characters",this.alert.setContent([c]),this.alert.open(),o&&this.loadCharacter(a).catch(l=>{console.log(l)})}catch(e){alert(`Error processing backup data: ${e.message}`)}},deleteCharacterTemp:function(n){if(n===""||n==="settings")return;Vn()===n&&this.triggerNewCharacter(),this.dialog_undo.querySelector("button").dataset.key=n,this.dialog_undo.hidden=!1;let e=this.dialog_undo.querySelector(".delete-timeout");setTimeout(()=>{e.classList.add("transition","timeout")},10),this[`deleteTimeout${n}`]=setTimeout(this.deleteCharacter.bind(this),8e3,n)},deleteCharacter:function(n){if(n===""||n==="settings")return;Lr(n),this.dialog_undo.querySelector("button").dataset.key="",this.dialog_undo.hidden=!0,this.dialog_undo.querySelector(".delete-timeout").classList.remove("transition","timeout")},undoDelete:function(n){let e=n.target.dataset.key||null;if(!e)return;this.dialog_undo.querySelector("button").dataset.key="",this.dialog_undo.hidden=!0,this.dialog_undo.querySelector(".delete-timeout").classList.remove("transition","timeout"),this[`deleteTimeout${e}`]&&clearTimeout(this[`deleteTimeout${e}`])},showIntroDialog:function(){let n=document.getElementById("introAlert");this.alert.setContent([...document.importNode(n.content,!0).children]),this.alert.open()},showUnsavedDialog:function(){this.dialog_unsaved.hidden=!1},hideUnsavedDialog:function(){this.dialog_unsaved.hidden=!0},showErrorMessage:function(n){alert(n)},initialize:function({emitter:n=null,prefix:e="",appname:t=""}){if(!n||!e||!t){document.body.innerHTML="<p>App is missing required settings.</p>";return}this.emitter=n,this.emitter.on("error:display",this.showErrorMessage,this),this.appname=t,bm(e),this.alert=document.getElementById("alert-main"),om(this.emitter);let i=new Tm(this.emitter);i.addShortCut("Ctrl+Shift+ArrowDown","character:save"),i.addShortCut("Ctrl+Shift+ArrowRight","tab:switch"),i.addShortCut("Ctrl+Shift+ArrowLeft","tab:switch"),i.addShortCut("Ctrl+Shift+ArrowUp","loaddialog:toggle"),document.querySelector(".btn-help").addEventListener("click",r=>{r.preventDefault();let o=document.getElementById("helpDialog"),a=document.importNode(o.content,!0);this.alert.setContent([...a.children]),this.alert.open()}),window.addEventListener("hashchange",r=>{this.changeCharacter()},!1),this.dialog_unsaved.querySelector(".btn-save").addEventListener("click",r=>{this.emitter.trigger("character:save")}),this.dialog_undo.querySelector(".btn-delete-undo").addEventListener("click",r=>{this.undoDelete(r)}),this.emitter.on("character:new",this.triggerNewCharacter,this),this.emitter.on("character:save",this.saveCharacter,this),this.emitter.on("character:delete",this.deleteCharacterTemp,this),this.emitter.on("backup:download",this.downloadBackup,this),this.emitter.on("backup:restore",this.restoreFormSubmit,this),this.emitter.on("dialog:save:show",this.showUnsavedDialog,this),this.emitter.on("dialog:save:hide",this.hideUnsavedDialog,this);let s=window.location.hash.substring(1);s!==""?this.loadCharacter(s).catch(r=>{console.log(r)}):(_t().length===0&&this.showIntroDialog(),this.triggerNewCharacter())}},Sm=cE;var km=document.createElement("template");km.innerHTML=`
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
`;var Or=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(km.content.cloneNode(!0)),this._wait=3e3,this._triggered=!1,this._confirm=!0,this._confirmCallback=null,this.dataset.triggered="false",this.setAttribute("role","button")}connectedCallback(){this.getAttribute("tabindex")===null&&this.setAttribute("tabindex",0),this.addEventListener("click",this._handleClick),this.addEventListener("keydown",this._handleKeyDown),this._wait=parseInt(this.dataset.wait||3e3,10),this.dataset.confirm!==void 0&&(this._confirm=this.dataset.confirm!=="false"),Array.from(this.children).forEach(e=>{e.hidden=!1}),this._confirmCallback&&this.addEventListener("click",this._confirmCallback)}disconnectedCallback(){this.removeEventListener("click",this._handleClick),this.removeEventListener("keydown",this._handleKeyDown),this._confirmCallback&&this.removeEventListener("click",this._confirmCallback)}set triggered(e){let t=!!e;this._triggered!==t&&(this._triggered=t,this._triggered?this.dataset.triggered="true":this.dataset.triggered="false")}get triggered(){return this._triggered}get confirm(){return this._confirm}set confirm(e){this._confirm=!!e}get confirmCallback(){return this._confirmCallback}set confirmCallback(e){typeof e=="function"&&(this._confirmCallback=e)}_handleClick(e){!this.triggered&&this._confirm&&(e.preventDefault(),e.stopImmediatePropagation(),this.triggered=!0,setTimeout(()=>{this.triggered=!1},this._wait))}_handleKeyDown(e){e.key!=="Enter"&&e.key!==" "||e.shiftKey||(e.preventDefault(),this.click())}reset(){this.triggered=!1}};window.customElements.get("confirm-button")||window.customElements.define("confirm-button",Or);var Cm=Or;var lE=function(n,e){let t=new Date(n),i=new Date(e);return t>i?"local":i>t?"remote":"equal"},Dm=async function(){let n=_t(),e=await vm(),t=[];return n.forEach(i=>{let s={key:i.key,local:i},r=e.get(i.key);r&&(s.remote=r,e.delete(i.key),s.latest=lE(i.updated,r.updated)),t.push(s)}),e.forEach(i=>{let s={key:i.key,remote:i};t.push(s)}),t},Am=async function(n){let e=nt(n);if(!e)throw new Error("Character not found");if(await Rr(n))throw new Error("Character already on the remote");return await El(e)},Nm=async function(n){if(nt(n))return"Character already on local";let t=await Rr(n);return t?await ji(t):"Character not found on the remote"},xm=async function(n){return ym(n)},Rm=async function(n){return Lr(n)},Lm=async function(n){let e=nt(n);if(!e)throw new Error("Character not found on local");return await El(e)},Om=async function(n){let e=await Rr(n);if(!e)throw new Error("Character not found on the remote");return await ji(e)};var Mm=document.createElement("template");Mm.innerHTML=`
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
`;var Mr=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Mm.content.cloneNode(!0)),this.setAttribute("role","list-item"),this.setAttribute("aria-labelledby","char-name"),this._key="",this.localDiv=this.shadowRoot.querySelector(".local"),this.remoteDiv=this.shadowRoot.querySelector(".remote"),this.syncDiv=this.shadowRoot.querySelector(".syncaction"),this.isCurrentCharacter=!1}connectedCallback(){this.shadowRoot.addEventListener("click",this.handleButtonClick.bind(this))}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this.handleButtonClick.bind(this))}get key(){return this._key}_showError(e){this.shadowRoot.querySelector(".error").innerHTML=e}handleButtonClick(e){console.log(e);let t=e.target.closest("button");if(!t)return;let i=t.dataset.action;if(i)switch(console.log(`Action: ${i}`),i){case"upload":Am(this._key).then(s=>{this.remoteDiv.querySelector(".summary").innerHTML=this.localDiv.querySelector(".summary").innerHTML,this.remoteDiv.querySelector(".updated").innerHTML=this.localDiv.querySelector(".updated").innerHTML,this.remoteDiv.querySelector(".action").innerHTML="",this.remoteDiv.querySelector(".action").appendChild(this._getButton("removeremote","Delete from Remote"))}).catch(s=>{this._showError(s)});break;case"removeremote":xm(this._key).then(s=>{this.remoteDiv.querySelector(".summary").innerHTML="No remote copy.",this.remoteDiv.querySelector(".updated").innerHTML="",this.remoteDiv.querySelector(".action").innerHTML="",this.remoteDiv.querySelector(".action").appendChild(this._getButton("upload","Upload"))}).catch(s=>{this._showError(s)});break;case"download":Nm(this._key).then(s=>{this.localDiv.querySelector(".summary").innerHTML=this.remoteDiv.querySelector(".summary").innerHTML,this.localDiv.querySelector(".updated").innerHTML=this.remoteDiv.querySelector(".updated").innerHTML,this.localDiv.querySelector(".action").innerHTML="",this.localDiv.querySelector(".action").appendChild(this._getButton("removelocal","Delete from Local"))}).catch(s=>{this._showError(s)});break;case"removelocal":if(this.isCurrentCharacter){this._showError("You cannot remove the currently displayed character.");return}Rm(this._key).then(s=>{this.localDiv.querySelector(".summary").innerHTML="No local copy.",this.localDiv.querySelector(".updated").innerHTML="",this.localDiv.querySelector(".action").innerHTML="",this.localDiv.querySelector(".action").appendChild(this._getButton("download","Download"))}).catch(s=>{this._showError(s)});break;case"syncup":Lm(this._key).then(s=>{this.remoteDiv.querySelector(".summary").innerHTML=this.localDiv.querySelector(".summary").innerHTML,this.remoteDiv.querySelector(".updated").innerHTML=this.localDiv.querySelector(".updated").innerHTML,this.remoteDiv.querySelector(".action").innerHTML="",this.remoteDiv.querySelector(".action").appendChild(this._getButton("removeremote","Delete from Remote")),this.syncDiv.innerHTML=""}).catch(s=>{this._showError(s)});break;case"syncdown":if(this.isCurrentCharacter){this._showError("You cannot sync to local the currently displayed character.");return}Om(this._key).then(s=>{this.localDiv.querySelector(".summary").innerHTML=this.remoteDiv.querySelector(".summary").innerHTML,this.localDiv.querySelector(".updated").innerHTML=this.remoteDiv.querySelector(".updated").innerHTML,this.localDiv.querySelector(".action").innerHTML="",this.localDiv.querySelector(".action").appendChild(this._getButton("removelocal","Delete from Local")),this.syncDiv.innerHTML=""}).catch(s=>{this._showError(s)});break}}_getButton(e,t){let i=document.createElement("BUTTON");return i.classList.add("btn-sm"),i.dataset.action=e,i.innerText=t,i}setData({key:e="",local:t={},remote:i={},latest:s=""}){if(!e)return;this._key=e;let r=t.key?t.charname:i.key?i.charname:"[Unknown]";this.shadowRoot.querySelector(".charname").innerHTML=r,this.shadowRoot.querySelector(".key").innerHTML=e,t.key?(this.localDiv.querySelector(".summary").innerHTML=t.summaryHeader,this.localDiv.querySelector(".updated").innerHTML=t.updatedTime,this.localDiv.querySelector(".action").appendChild(this._getButton("removelocal","Delete from Local"))):this.localDiv.querySelector(".action").appendChild(this._getButton("download","Download")),i.key?(this.remoteDiv.querySelector(".summary").innerHTML=i.summaryHeader,this.remoteDiv.querySelector(".updated").innerHTML=i.updatedTime,this.remoteDiv.querySelector(".action").appendChild(this._getButton("removeremote","Delete from Remote"))):this.remoteDiv.querySelector(".action").appendChild(this._getButton("upload","Upload")),s==="local"?this.syncDiv.appendChild(this._getButton("syncup","Update on Remote")):s==="remote"&&this.syncDiv.appendChild(this._getButton("syncdown","Update on Local"))}};window.customElements.get("sync-info")||window.customElements.define("sync-info",Mr);var Pm=Mr;var Il=class{constructor(e,t){this.el=e,this.menu=t,this.action=e.dataset.action||"",this.el.addEventListener("keydown",this.handleKeyBoardEvent.bind(this)),this.el.addEventListener("click",this.menu.setTabFocusToButton.bind(this.menu,this))}handleKeyBoardEvent(e){if(!(e.shiftKey||e.ctrlKey||e.metaKey||e.altKey)){if(e.key==="ArrowRight"){this.removeTabFocus(),this.menu.setFocusToNext(this);return}if(e.key==="ArrowLeft"){this.removeTabFocus(),this.menu.setFocusToPrevious(this);return}if(e.key==="Home"){this.removeTabFocus(),this.menu.setFocusToFirst();return}e.key==="End"&&(this.removeTabFocus(),this.menu.setFocusToLast())}}isFocusable(){return this.el.getAttribute("tabindex")>-1}isVisible(){return!!(this.el.offsetWidth||this.el.offsetHeight||this.el.getClientRects().length)}removeTabFocus(){this.el.setAttribute("tabindex","-1")}setTabFocus(){this.el.setAttribute("tabindex","0")}focus(){this.el.focus()}switchTo(e=!0){this.isVisible()||(e?this.menu.setFocusToNext(this):this.menu.setFocusToPrevious(this)),this.setTabFocus(),this.focus()}},Fm=document.createElement("template");Fm.innerHTML=`
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

`;var uE={save:"_saveCharacter",load:"_openLoadModal",new:"_newCharacterModal",backup:"_openDownloadForm",restore:"_openRestoreForm",delete:"_openDeleteModal",auth:"_openAuthDialog",more:"_showMore"},Tl=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Fm.content.cloneNode(!0)),this.setAttribute("role","toolbar"),this.setAttribute("aria-label","Character Actions"),this.setAttribute("tabindex",0),this.buttons=[],this.opener=null,this.newDialog=null,this.loadDialog=null,this.downloadDialog=null,this.restoreDialog=null,this.authDialog=null,this.syncDialog=null}connectedCallback(){this.addEventListener("focus",this.focus.bind(this));let e=this.shadowRoot.querySelectorAll("button");Array.prototype.forEach.call(e,t=>{this.buttons.push(new Il(t,this))}),this.shadowRoot.addEventListener("click",this._handleClicks.bind(this))}disconnectedCallback(){this.shadowRoot.removeEventListener("click",this._handleClicks.bind(this)),this.emitter&&(this.emitter.off("newdialog:close",this._closeNewModal,this),this.emitter.off("loaddialog:close",this._closeLoadModal,this),this.emitter.off("loaddialog:toggle",this._openLoadModal,this),this.emitter.off("backup:email",this._emailDownload,this),this.emitter.off("backup:textpaste",this._altDownload,this),this.emitter.off("auth:enabled",this._showAuth,this),this.emitter.off("auth:signin",this._signedIn,this),this.emitter.off("auth:signout",this._signedOut,this))}setEmitter(e){this.emitter=e,this.emitter.on("newdialog:close",this._closeNewModal,this),this.emitter.on("loaddialog:close",this._closeLoadModal,this),this.emitter.on("loaddialog:toggle",this._openLoadModal,this),this.emitter.on("backup:email",this._emailDownload,this),this.emitter.on("backup:textpaste",this._altDownload,this),this.emitter.on("auth:enabled",this._showAuth,this),this.emitter.on("auth:signin",this._signedIn,this),this.emitter.on("auth:signout",this._signedOut,this)}_handleClicks(e){let t=e.target.closest("button"),i=this.buttons.find(r=>r.el===t);if(!i)return;let s=uE[i.action]||null;s&&this[s](i)}_openAuthDialog(){if(this.authDialog=this.authDialog||document.getElementById("dialog-auth"),this.authDialog.clear(),this.authDialog.isOpen){this.authDialog.close();return}let e=null;qi()?e=document.getElementById("authSignOutModal"):e=document.getElementById("authSignInModal"),this.authDialog.setContent([...document.importNode(e.content,!0).children]),qi()?(this.authDialog.querySelector("#signOut").addEventListener("click",t=>{am()}),this.authDialog.querySelector("#syncData").addEventListener("click",t=>{this._openSyncModal(),this.authDialog.close()})):this.authDialog.querySelector("#googleSignIn").addEventListener("click",t=>{rm()}),this.authDialog.open()}_openSyncModal(){if(this.syncDialog=this.syncDialog||document.getElementById("dialog-sync"),this.syncDialog.clear(),this.syncDialog.isOpen){this.syncDialog.close();return}let e=document.getElementById("syncModal");this.syncDialog.setContent([...document.importNode(e.content,!0).children]);let t=Vn();Dm().then(i=>{let s=document.createDocumentFragment();i.forEach(r=>{let o=new Pm;o.setData(r),o.key===t&&(o.isCurrentCharacter=!0),s.appendChild(o)}),this.syncDialog.querySelector("#characterSyncList").appendChild(s),this.syncDialog.open()}).catch(i=>{console.log(i)})}_openDownloadForm(){if(this.downloadDialog=this.downloadDialog||document.getElementById("dialog-backup"),this.downloadDialog.clear(),this.downloadDialog.isOpen){this.downloadDialog.close();return}let e=document.getElementById("backupModal"),t=document.importNode(e.content,!0),i=[];_t().forEach(s=>{let r=`<li><label><input type="checkbox" name="${s.key}" value="${s.key}" /> ${s.summaryHeader}</label></li>`;i.push(r)}),t.querySelector(".character_downloads").innerHTML=i.join(""),this.downloadDialog.setContent([...t.children],!1),this.downloadDialog.querySelector("form").addEventListener("submit",s=>{s.preventDefault(),this.emitter.trigger("backup:download",s.target)}),this.downloadDialog.open()}_openRestoreForm(){if(this.restoreDialog=this.restoreDialog||document.getElementById("dialog-restore"),this.restoreDialog.clear(),this.restoreDialog.isOpen){this.restoreDialog.close();return}let e=document.getElementById("restoreModal"),t=document.importNode(e.content,!0);this.restoreDialog.setContent([...t.children],!1),this.restoreDialog.querySelector("form").addEventListener("submit",i=>{i.preventDefault(),this.emitter.trigger("backup:restore",i.target),this.restoreDialog.closeClear()}),this.restoreDialog.open()}_altDownload(e){let t=document.createElement("p");t.innerHTML="Your current browser/os does not support direct file downloads, so here is the data for you to copy/paste.";let i=document.createElement("textarea");i.classList.add("large"),i.value=e,this.downloadDialog.clear(),this.downloadDialog.header="Alernate Download Option",this.downloadDialog.setContent([t,i,this.downloadDialog.getCloseButton()],!1),this.downloadDialog.open()}_emailDownload(e){let t=document.createElement("a");t.href=e,t.setAttribute("target","_blank"),t.innerHTML="Open new message in default email client",t.addEventListener("click",()=>{this.downloadDialog.closeClear()});let i=document.createElement("p");i.appendChild(t),this.downloadDialog.clear(),this.downloadDialog.setContent([i,this.downloadDialog.getCloseButton()],!1),this.downloadDialog.open()}_saveCharacter(){this.emitter.trigger("character:save")}_newCharacterModal(e){if(this.newDialog=this.newDialog||document.getElementById("dialog-new"),this.newDialog.clear(),this.newDialog.isOpen){this.newDialog.close();return}let t=!1,i=document.querySelector(".alert-unsaved");i&&!i.hidden&&(t=!0);let s=document.getElementById("createModal"),r=document.importNode(s.content,!0);if(t){let a=document.createElement("p");a.classList.add("alert"),a.innerHTML="<strong>Warning:</strong> You have unsaved changes.",r.querySelector("form").prepend(a)}let o=r.querySelector("select");gm().forEach(a=>{let c=document.createElement("option");c.value=a,c.innerText=a,o.appendChild(c)}),this.newDialog.setContent([...r.children]),this.newDialog.querySelector("form").addEventListener("submit",a=>{a.preventDefault();let c=new FormData(a.target);this.emitter.trigger("character:new",c.get("char_type"))}),this.newDialog.open()}_closeNewModal(){this.newDialog!==null&&this.newDialog.closeClear()}_loadCharClick(e){let i=e.currentTarget.dataset.key||"";i!==""&&(window.location.hash=`#${i}`)}_openLoadModal(){if(this.loadDialog=this.loadDialog||document.getElementById("dialog-load"),this.loadDialog.clear(),this.loadDialog.isOpen){this.loadDialog.close();return}let e=!1,t=document.querySelector(".alert-unsaved");t&&!t.hidden&&(e=!0);let i=document.getElementById("loadModal"),s=document.importNode(i.content,!0),r=s.querySelector("ul");_t().forEach(o=>{let a=document.createElement("li"),c=new Cm;c.dataset.key=o.key,c.classList.add("btn","btn-plain"),c.innerHTML=`<span slot="default">${o.summaryHeader}</span>
            <span slot="confirm" hidden>Are you sure you want to load: ${o.charname?o.charname:"[Unnamed]"}, you have unsaved changes.</span>`,e||(c.confirm=!1),c.confirmCallback=this._loadCharClick.bind(this),a.appendChild(c),r.appendChild(a)}),this.loadDialog.setContent([...s.children]),this.loadDialog.open()}_closeLoadModal(){this.loadDialog!==null&&this.loadDialog.closeClear()}_openDeleteModal(){let e=document.getElementById("dialog-delete");if(e.isOpen){e.close();return}let t=document.getElementById("deleteModal"),i=document.importNode(t.content,!0),s=[];_t().forEach(r=>{let o=`<li><confirm-button data-key="${r.key}" class="btn btn-plain btn-delete-char">
                <span slot="default">${r.summaryHeader}</span>
                <span slot="confirm" hidden>Are you sure you want to delete: ${r.charname?r.charname:"[Unnamed]"}</span>
            </confirm-button></li>`;s.push(o)}),i.querySelector("ul").innerHTML=s.join(""),e.setContent([...i.children]),e.querySelector("ul").addEventListener("click",r=>{let o=r.target.tagName==="CONFIRM-BUTTON"?r.target:r.target.closest("confirm-button");o&&o.classList.contains("btn-delete-char")&&(r.preventDefault(),this.emitter.trigger("character:delete",o.getAttribute("data-key")),e.closeClear())}),e.open()}_showMore(){this.shadowRoot.querySelector(".more-actions").classList.toggle("closed")}_showAuth(){let e=this.buttons.find(t=>t.el.classList.contains("btn-auth"));e&&e.el.classList.remove("hidden")}_signedIn(){let e=this.buttons.find(t=>t.action==="auth");e&&(e.el.innerHTML="Sync/Logout"),this._openAuthDialog()}_signedOut(){let e=this.buttons.find(t=>t.action==="auth");e&&(e.el.innerHTML="Login"),this.authDialog&&this.authDialog.isOpen&&this.authDialog.close()}setFocusToNext(e){let i=this.buttons.indexOf(e)+1;if(i>this.buttons.length-1){this.setFocusToFirst();return}this.buttons[i].switchTo()}setFocusToPrevious(e){let i=this.buttons.indexOf(e)-1;if(i<0){this.setFocusToLast();return}this.buttons[i].switchTo(!1)}setFocusToFirst(){this.buttons[0].switchTo()}setFocusToLast(){this.buttons[this.buttons.length-1].switchTo(!1)}setTabFocusToButton(e){this.buttons.forEach(t=>{t===e?t.switchTo():t.removeTabFocus()})}focus(){let e=this.buttons.find(t=>t.isFocusable());e||(e=this.buttons[0]),this.setTabFocusToButton(e)}};window.customElements.get("action-menu")||window.customElements.define("action-menu",Tl);var Um=document.createElement("template");Um.innerHTML=`
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
`;var Pr=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Um.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list-item")}get content(){return new Ve({header:this.shadowRoot.querySelector("dt").innerHTML,text:this.shadowRoot.querySelector("dd").innerHTML})}set content(e){this.shadowRoot.querySelector("dt").innerHTML=e.header,this.shadowRoot.querySelector("dd").innerHTML=e.text}clear(){this.content=[]}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}focus(e=!1){if(e){this.shadowRoot.querySelector("dd").focus();return}this.shadowRoot.querySelector("dt").focus()}isEmpty(){return this.shadowRoot.querySelector("dt").innerText.trim()===""&&this.shadowRoot.querySelector("dd").innerText.trim()===""}};window.customElements.define("note-list-item",Pr);var Sl=Pr;var hE=function(n){let e=n.childNodes;if(e.length===0)return;let t=document.createRange(),i=window.getSelection();i.removeAllRanges(),t.setStartBefore(e[0]),t.setEndAfter(e[e.length-1]),t.collapse(!1),i.addRange(t),i.collapseToEnd()},It=hE;var Vm=document.createElement("template");Vm.innerHTML=`
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
`;var kl=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Vm.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list"),this.addEventListener("keydown",this._keyDown),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName")}disconnectedCallback(){this.removeEventListener("keydown",this._keyDown),this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}get contentArray(){let e=Array.from(this.shadowRoot.querySelectorAll("note-list-item")),t=[];return e.forEach(i=>{let s=i.content;!s.header&&!s.text||t.push(s)}),t}addItem(e=null){let t=new Sl;e&&(t.content=e),this.shadowRoot.appendChild(t)}clear(){Array.from(this.shadowRoot.querySelectorAll("note-list-item")).forEach(e=>{this.shadowRoot.removeChild(e)})}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}_keyDown(e){if(e.key!=="Enter"&&e.key!=="Backspace"||e.shiftKey)return;let t=this.deepActiveElement();if(e.key==="Enter"){if(e.preventDefault(),e.stopPropagation(),t.tagName==="DT"||t.closest("dt"))console.log(t),t.nextElementSibling.focus();else if(t.tagName==="DD"||t.closest("dd"))if(console.log(t),t.parentNode.host===this.shadowRoot.lastElementChild){let i=new Sl;this.shadowRoot.appendChild(i),i.focus()}else{let i=t.parentNode.host.nextElementSibling;i&&i.focus()}return}if(e.key==="Backspace"){if(t.innerText.trim()!=="")return;if(e.preventDefault(),e.stopPropagation(),t.tagName==="DT"||t.closest("dt")){if(t.parentNode.host!==this.shadowRoot.querySelector("note-list-item")){let i=t.parentNode.host.previousElementSibling;i&&(i.focus(!0),It(this.deepActiveElement()),t.parentNode.host.isEmpty()&&t.parentNode.host.remove())}}else(t.tagName==="DD"||t.closest("dd"))&&(t.parentNode.host.focus(),It(this.deepActiveElement()))}}_blur(e){let t={field:this.fieldName,value:this.contentArray};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}focus(){this.shadowRoot.querySelector("note-list-item").focus()}};window.customElements.define("note-list",kl);var qm=document.createElement("template");qm.innerHTML=`
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
`;var Cl=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(qm.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list"),this.addEventListener("keydown",this._keyDown),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName"),this._upgradeProperty("subFieldName")}disconnectedCallback(){this.removeEventListener("keydown",this._keyDown),this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}set subFieldName(e){this.dataset.subfield=e}get subFieldName(){return this.dataset.subfield||""}get contentArray(){let e=Array.from(this.shadowRoot.querySelectorAll("li")),t=[];return e.forEach(i=>{let s=i.innerHTML;s!==""&&t.push(s)}),t}addItem(e=""){let t=document.createElement("li");return t.setAttribute("contenteditable",!0),t.innerHTML=e,this.shadowRoot.appendChild(t),t}clear(){Array.from(this.shadowRoot.querySelectorAll("li")).forEach(e=>{this.shadowRoot.removeChild(e)})}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}_keyDown(e){if(e.key!=="Enter"&&e.key!=="Backspace"||e.shiftKey)return;let t=this.deepActiveElement();if(!(t.tagName!=="LI"&&!t.closest("li"))){if(e.key==="Enter"){if(e.preventDefault(),t===this.shadowRoot.lastElementChild)this.addItem().focus();else{let i=t.nextElementSibling;i&&i.focus()}return}if(e.key==="Backspace"&&t!==this.shadowRoot.querySelector("li")&&t.innerText.trim()===""){e.preventDefault();let i=t.previousElementSibling;i.focus(),It(i),t.remove()}}}_blur(e){let t={field:this.fieldName,subfield:this.subFieldName,value:this.contentArray};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}focus(){this.shadowRoot.querySelector("li").focus()}};window.customElements.get("simple-list")||window.customElements.define("simple-list",Cl);var Bm=document.createElement("template");Bm.innerHTML=`
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
`;var Dl=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Bm.content.cloneNode(!0)),this.columns=0}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","table"),this.addEventListener("keydown",this._keyDown),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName"),this.columnNames=this.getAttribute("columns").split("||"),this.columns=this.columnNames.length;let e=this.shadowRoot.querySelector("thead tr");this.columnNames.forEach(t=>{let i=document.createElement("th");i.innerHTML=t,e.appendChild(i)})}disconnectedCallback(){this.removeEventListener("keydown",this._keyDown),this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}get contentArray(){let e=[];return Array.from(this.shadowRoot.querySelectorAll("tbody > tr")).forEach(i=>{let s=Array.from(i.querySelectorAll("td"));if(s.length===0)return;let r={},o=!0;s.forEach((a,c)=>{let l=this.columnNames[c].toLowerCase(),u=a.innerHTML.trim();u!==""&&(o=!1),r[l]=u}),!o&&e.push(r)}),e}addRow(e=[]){let t=document.createElement("tr"),i=document.createElement("td");i.setAttribute("contenteditable",!0);for(let s=0;s<this.columns;s++){let r=this.columnNames[s].toLowerCase(),o=i.cloneNode(!1);o.innerHTML=e[r]||"",t.appendChild(o)}return this.shadowRoot.querySelector("tbody").appendChild(t),t}clear(){Array.from(this.shadowRoot.querySelectorAll("tbody > tr")).forEach(e=>{e.parentNode.removeChild(e)})}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}_keyDown(e){if(e.key!=="Enter"&&e.key!=="Backspace"||e.shiftKey)return;let t=this.deepActiveElement();if(t.tagName!=="TD"&&!t.closest("td"))return;let i=t.tagName==="TD"?t:t.closest("td"),s=i.parentElement;if(e.key==="Enter"){if(e.preventDefault(),i!==s.lastElementChild){let a=i.nextElementSibling;a&&a.focus();return}let r=s.nextElementSibling;if(r){r.querySelector("td").focus();return}this.addRow().querySelector("td").focus();return}if(e.key==="Backspace"){if(i.innerText.trim()!=="")return;if(e.preventDefault(),i!==s.firstElementChild){let o=i.previousElementSibling;o&&(o.focus(),It(o));return}let r=s.previousElementSibling;if(r){r.lastElementChild.focus(),It(r.lastElementChild);let o=!0;s.querySelectorAll("td").forEach(a=>{a.innerText.trim()!==""&&(o=!1)}),o&&s.remove()}}}_blur(e){let t={field:this.fieldName,value:this.contentArray};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}focus(){this.shadowRoot.querySelector("[contenteditable=true]").focus()}};window.customElements.define("table-editable",Dl);var jm=document.createElement("template");jm.innerHTML=`
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
`;var Al=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(jm.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list-item"),this.profCheck=this.shadowRoot.querySelector('input[data-name="skills"]'),this.expertCheck=this.shadowRoot.querySelector('input[data-name="expert"]'),this.profCheck.addEventListener("change",this._checkSkills.bind(this)),this.expertCheck.addEventListener("change",this._checkExpert.bind(this)),this.shadowRoot.querySelector("button").addEventListener("click",this._skillCheck.bind(this))}disconnectedCallback(){this.profCheck.removeEventListener("change",this._checkSkills.bind(this)),this.expertCheck.removeEventListener("change",this._checkExpert.bind(this)),this.shadowRoot.querySelector("button").removeEventListener("click",this._skillCheck.bind(this))}get skillName(){return this.dataset.subfield||""}set skillName(e){this.dataset.subfield=e}get skillLabel(){return this.shadowRoot.querySelector(".pc-skill-name").innerHTML}set skillLabel(e){this.shadowRoot.querySelector(".pc-skill-name").innerHTML=e}get skillValue(){return this.profCheck.checked?this.expertCheck.checked?2:1:0}set skillValue(e){this.profCheck.checked=!1,this.expertCheck.checked=!1,e>0&&(this.profCheck.checked=!0,this.expertCheck.disabled=!1),e>1&&(this.expertCheck.checked=!0)}get skillMod(){return this.shadowRoot.querySelector(".pc-skill-mod").innerHTML}set skillMod(e){this.shadowRoot.querySelector(".pc-skill-mod").innerHTML=e}_checkSkills(e){let t=this.expertCheck;e.target.checked?t.disabled=!1:(t.checked=!1,t.disabled=!0);let i={field:"skills",subfield:this.skillName,value:e.target.checked?1:0};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:i}))}_checkExpert(e){let t={field:"skills",subfield:this.skillName,value:e.target.checked?2:1};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:t}))}_skillCheck(e){let t=document.querySelector("sheet-view-5e").shadowRoot.querySelector("dice-roller");if(!t)return;let i=this.skillMod,s=`1d20${i!=="0"?i:""}`;t.roll(s)}focus(){this.shadowRoot.querySelector("input").focus()}};window.customElements.define("skill-listing",Al);var Hm=document.createElement("template");Hm.innerHTML=`
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
`;var Nl=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Hm.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","list-item"),this.scoreInput=this.shadowRoot.querySelector("input.pc-attribute"),this.saveCheck=this.shadowRoot.querySelector('input[name="pc-save"]'),this.saveCheck.addEventListener("change",this._checkSave.bind(this)),this.scoreInput.addEventListener("change",this._scoreUpdate.bind(this)),this.shadowRoot.querySelector("button").addEventListener("click",this._savingThrow.bind(this))}disconnectedCallback(){this.saveCheck.removeEventListener("change",this._checkSave.bind(this)),this.scoreInput.removeEventListener("change",this._scoreUpdate.bind(this)),this.shadowRoot.querySelector("button").removeEventListener("click",this._savingThrow.bind(this))}get attributeName(){return this.dataset.name||""}set attributeName(e){this.dataset.name=e}get attributeScore(){return parseInt(this.scoreInput.value,10)}set attributeScore(e){this.scoreInput.value=e}get saveProficiency(){return this.saveCheck.checked?1:0}set saveProficiency(e){this.saveCheck.checked=e}set attributeMod(e){this.shadowRoot.querySelector(".pc-attribute-mod").innerHTML=e}get saveMod(){return this.shadowRoot.querySelector(".pc-save-mod").innerHTML}set saveMod(e){this.shadowRoot.querySelector(".pc-save-mod").innerHTML=e}_checkSave(e){let t={field:this.attributeName,value:e.target.checked?1:0};this.dispatchEvent(new CustomEvent("saveChange",{bubbles:!0,detail:t}))}_scoreUpdate(e){let t={field:this.attributeName,value:e.target.value};this.dispatchEvent(new CustomEvent("attributeChange",{bubbles:!0,detail:t}))}_savingThrow(e){let t=document.querySelector("sheet-view-5e").shadowRoot.querySelector("dice-roller");if(!t)return;let i=this.saveMod,s=`1d20${i!=="0"?i:""}`;t.roll(s)}focus(){this.shadowRoot.querySelector("input").focus()}};window.customElements.define("attr-listing",Nl);var Hi=function(n=0,e=null){return e==null&&(e=n,n=0),n+Math.floor(Math.random()*(e-n+1))};var Fr=class{constructor({die:e="",value:t=0}){this.die=e,this.value=t}toString(){return this.value}toJSON(){return{className:"DiceResult",die:this.die,value:this.value}}},xl=class{getSingleDieResult(e){return Hi(1,e)}applyDieMod(e,t){let i=t.match(/^([dklh]{2})([0-9]*)$/);if(i===null)return e;let s=i[2]?parseInt(i[2]):1;switch(i[1]){case"dl":return e.sort((r,o)=>r-o),e.splice(0,s),e;case"dh":return e.sort((r,o)=>o-r),e.splice(0,s),e;case"kl":return e.sort((r,o)=>r-o),e.slice(0,s);case"kh":return e.sort((r,o)=>o-r),e.slice(0,s);default:return e}}_parseDiceNotation(e=6,t=1,i=0,s="+",r=""){i=parseInt(i,10),e=parseInt(e,10),t<=0?t=1:t=parseInt(t,10);let o=[];for(let c=1;c<=t;c++)o.push(this.getSingleDieResult(e));r!==""&&(o=this.applyDieMod(o,r));let a=0;if(o.length>0&&(a=o.reduce((c,l)=>c+l)),i===0)return a;switch(s){case"*":a=a*i;break;case"-":a=a-i;break;case"/":a=a/i;break;case"+":default:a=a+i;break}return Math.round(a)}rollDie(e=""){e=e.trim();let t=e.match(/^([0-9]*)d([0-9]+)([dklh]{2}[0-9]*)*(?:([\+\-\*\/])([0-9]+))*$/);return t?this._parseDiceNotation(t[2],t[1],t[5],t[4],t[3]):""}getDiceResult(e=""){return new Fr({die:e,value:this.rollDie(e)})}};var Rl=function(n=""){let e=new xl;return new Fr({die:n,value:e.rollDie(n)})};var $i=class{constructor({dragElement:e=null,handleSelector:t=null}){if(this.dragElement=e,!(this.dragElement instanceof HTMLElement))throw new Error("Dragger.dragElements must be HTMLElement");this.handleSelector=t,this.initDragBound=this.initDrag.bind(this),this.doDragCallback=this.doDrag.bind(this),this.stopDragCallback=this.stopDrag.bind(this),this._startX=null,this._startY=null,this._startPosX=null,this._startPosY=null,this._startWidth=null,this._startHeight=null,this.enabled=!1,this.callbackStartDrag=null}getEventX(e){return e.type.toLowerCase().indexOf("touch")===0?e.touches[0].clientX:e.clientX}getEventY(e){return e.type.toLowerCase().indexOf("touch")===0?e.touches[0].clientY:e.clientY}doDrag(e){e.preventDefault(),this.dragElement.coords=[this._startPosX+(this.getEventX(e)-this._startX),this._startPosY+(this.getEventY(e)-this._startY)]}stopDrag(){typeof this.dragElement.adjustForParentBounds=="function"&&this.dragElement.adjustForParentBounds(),typeof this.dragElement.saveCoords=="function"&&this.dragElement.saveCoords(),document.documentElement.removeEventListener("mousemove",this.doDragCallback,!1),document.documentElement.removeEventListener("touchmove",this.doDragCallback,!1),document.documentElement.removeEventListener("mouseup",this.stopDragCallback,!1),document.documentElement.removeEventListener("touchend",this.stopDragCallback,!1)}initDrag(e){e.button>1||(e.preventDefault(),e.stopPropagation(),this._startX=this.getEventX(e),this._startY=this.getEventY(e),[this._startPosX,this._startPosY]=this.dragElement.coords,this.callbackStartDrag!==null&&this.callbackStartDrag(this.dragElement,this.handleSelector),document.documentElement.addEventListener("mousemove",this.doDragCallback,!1),document.documentElement.addEventListener("touchmove",this.doDragCallback,!1),document.documentElement.addEventListener("mouseup",this.stopDragCallback,!1),document.documentElement.addEventListener("touchend",this.stopDragCallback,!1))}disableDrag(){if(!this.enabled)return;this.dragElement.removeEventListener("mousedown",this.initDragBound,!1),this.dragElement.removeEventListener("touchstart",this.initDragBound,!1);let e=this.handleSelector===""?this.dragElement:this.dragElement.querySelector(this.handleSelector);e!==null&&(e.style.cursor="auto"),this.enabled=!1}enableDrag(){if(this.enabled)return;this.dragElement.addEventListener("mousedown",this.initDragBound,!1),this.dragElement.addEventListener("touchstart",this.initDragBound,!1);let e=this.handleSelector===""?this.dragElement:this.dragElement.querySelector(this.handleSelector);e!==null&&(e.style.cursor="move"),this.enabled=!0}};var $m=document.createElement("template");$m.innerHTML=`
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
`;var Ur=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild($m.content.cloneNode(!0)),this.resultDiv=this.shadowRoot.querySelector("div"),this._die="1d6",this._result="",this._coords=[0,0]}connectedCallback(){this.removeButton=this.shadowRoot.querySelector("button.btn-remove"),this.dragger=new $i({dragElement:this}),this._upgradeProperty("die"),this._upgradeProperty("result"),this._upgradeProperty("coords"),this._updateLabels(),this.removeButton.addEventListener("click",this.remove.bind(this));let[e,t]=this.coords;if(e===0&&t===0){let{x:i,y:s}=this.getRootNode().host.getBoundingClientRect();i=i+Hi(-200,200),s=s+Hi(-200,200),this.coords=[i,s]}this.dragger.enableDrag()}disconnectedCallback(){this.removeButton.removeEventListener("click",this.remove.bind(this))}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}_updateLabels(){this.setAttribute("aria-label",`${this.die} roll result: ${this.result}`),this.shadowRoot.querySelector("small").innerText=`${this.die}`}get die(){return this._die}set die(e){this._die=e,this._updateLabels()}get result(){return this._result}set result(e){this._result=e,this.resultDiv.innerText=this._result,this._updateLabels()}get coords(){return this._coords}set coords([e,t]){e<0&&(e=0),e>window.innerWidth&&(e=window.innerWidth-this.offsetWidth),t<0&&(t=0),t>window.innerHeight&&(t=window.innerHeight-this.offsetHeight),this._coords=[e,t],this.style.left=`${e}px`,this.style.top=`${t}px`,this.style.bottom="auto",this.style.right="auto"}remove(){this.dispatchEvent(new CustomEvent("dice:remove",{bubbles:!0,detail:{die:this}}))}};window.customElements.get("dice-single")||window.customElements.define("dice-single",Ur);var Ll=Ur;var Gm=document.createElement("template");Gm.innerHTML=`
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
`;var Ol=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Gm.content.cloneNode(!0)),this._dice=[]}connectedCallback(){this.resultDiv=this.shadowRoot.getElementById("dice-result"),this.resetButton=this.shadowRoot.querySelector("button.btn-reset"),this._upgradeProperty("dice"),this.shadowRoot.addEventListener("dice:remove",this._removeDie.bind(this)),Array.from(this.children).forEach(e=>{e.addEventListener("click",this._handleRoll.bind(this))}),this.resetButton.addEventListener("click",this.reset.bind(this))}disconnectedCallback(){this.shadowRoot.removeEventListener("dice:remove",this._removeDie.bind(this)),Array.from(this.children).forEach(e=>{e.removeEventListener("click",this._handleRoll.bind(this))}),this.resetButton.removeEventListener("click",this.reset.bind(this))}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}_handleRoll(e){let i=e.target.dataset.die||"",s=Rl(`${i}`);this._addDie(s)}roll(e="1d6"){let t=Rl(e);this._addDie(t)}get dice(){return this._dice}set dice(e){if(!Array.isArray(e))throw Error("Dice must be array");this._dice=e,this.resultDiv.innerHTML="",this._dice.forEach(t=>{t instanceof Ll&&this.resultDiv.appendChild(t)})}_addDie(e){let t=new Ll;t.die=e.die,t.result=e.value,this._dice.push(t),this.resultDiv.appendChild(t)}_removeDie(e){e.stopImmediatePropagation();let t=e.detail.die||null;if(!t)return;let i=this._dice.findIndex(r=>r===t);if(i<0)return;let s=this._dice[i];this.resultDiv.removeChild(s),this._dice.splice(i,1)}reset(){this.dice=[]}};window.customElements.get("dice-roller")||window.customElements.define("dice-roller",Ol);var Km=document.createElement("template");Km.innerHTML=`
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
`;var Ml=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Km.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("placeholder")&&(this.placeholderText=this.getAttribute("placeholder")),this.addEventListener("blur",this._blur),this._upgradeProperty("fieldName")}disconnectedCallback(){this.removeEventListener("blur",this._blur)}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}set fieldName(e){this.dataset.name=e}get fieldName(){return this.dataset.name||""}get placeholderText(){this.shadowRoot.querySelector("span").getAttribute("placeholder")}set placeholderText(e){this.shadowRoot.querySelector("span").setAttribute("placeholder",e)}get content(){return this.shadowRoot.querySelector("span").innerHTML}set content(e){this.shadowRoot.querySelector("span").innerHTML=e}_blur(e){let t=this.content;t=t.trim().replace(/(\s|&nbsp;|<br\/?>)+$/,""),this.content=t;let i={field:this.fieldName,value:t};this.dispatchEvent(new CustomEvent("fieldChange",{bubbles:!0,detail:i}))}focus(){this.shadowRoot.querySelector("[contenteditable=true]").focus()}};window.customElements.define("field-editable",Ml);var zm=document.createElement("template");zm.innerHTML=`
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
`;var Pl=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(zm.content.cloneNode(!0)),this.setAttribute("role","navigation"),this.setAttribute("aria-label","Character sheet tab/section navigation"),this.list=this.shadowRoot.querySelector("ol"),this.topLink=this.shadowRoot.querySelector("li:first-child"),this.shadowRoot.addEventListener("click",this._handleClicks.bind(this))}_handleClicks(e){if(e.target.tagName==="A"){e.preventDefault();let t=e.target,i=t.dataset.tab,s=document.querySelector("[data-sheetview]");i&&s.switchToPane(i);let r=t.getAttribute("href");s.navigateTo(r)}}setLinks(e){e.forEach(t=>{let i=document.createElement("li"),s=document.createElement("a");s.href=t.href||"",s.innerText=t.label||"",s.dataset.tab=t.tab||"",i.appendChild(s),this.list.appendChild(i)})}removeLinks(){this.shadowRoot.querySelectorAll("li").forEach(e=>{e!==this.topLink&&e.parentNode.removeChild(e)})}};window.customElements.get("footer-nav")||window.customElements.define("footer-nav",Pl);var Wm=document.createElement("template");Wm.innerHTML=`
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
 `;var Fl=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Wm.content.cloneNode(!0)),this.setAttribute("role","dialog"),this.setAttribute("aria-labelledby","modal-label"),this.boundOutsideClickClose=function(){},this.boundKeyboardEvents=function(){},this.opener=null,this.addEventListener("click",this.handleCloseClick)}connectedCallback(){}disconnectedCallback(){}get header(){return this.shadowRoot.querySelector('slot[name="header"]').innerHTML}set header(e){this.shadowRoot.querySelector('slot[name="header"]').innerHTML=e}get isOpen(){return!this.hidden}getCloseButton(){let e=document.createElement("button");return e.setAttribute("type","button"),e.classList.add("close"),e.textContent="Close",e.setAttribute("slot","content"),e}getChildren(e){if(typeof e.assignedElements=="function"){let t=e.assignedElements();return t.length?t:e.children}else return e.children}isFocusable(e,t=!1){let i=e.tagName;if(i===void 0)return!1;let s=e.disabled,r=parseInt(e.getAttribute("tabindex"),10),o=e.getAttribute("contenteditable");switch(i){case"INPUT":case"TEXTAREA":case"SELECT":case"BUTTON":case"A":return!(r===-1||s||i==="A"&&!e.href);default:if(t&&r>=0)return!0;if(!t&&r>=-1||o==="true")return!0}return!1}getFocusableChildren(e,t=!1,i=!1){let s=[],r=Array.from(this.getChildren(e));if(r.length===0)return s;for(let o of r){if(this.isFocusable(o,t)&&(s.push(o),i))return s;let a=this.getFocusableChildren(o,t,i);if(i&&a.length===1)return a;s=s.concat(a)}return s}findFocusables(e=!1,t=!1){return this.getFocusableChildren(this.shadowRoot,e,t)}findFirstFocusable(){return this.findFocusables(!1,!0).shift()}findFirstTabFocusable(){return this.findFocusables(!0,!0).shift()}findLastTabFocusable(){let e=this.findFocusables(!0);return e[e.length-1]}focusFirst(){let e=this.findFirstFocusable();e&&e.focus()}outsideClickClose(e){if(e.target.closest("modal-mib")===null){if(e.target.classList.contains("btn-dialog"))return;this.close(),this.clear()}}deepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}keyboardEvents(e){if(e.key==="Escape"){this.close();return}if(e.key!=="Tab")return;let t=this.deepActiveElement();if(e.shiftKey){if(t===this.findFirstFocusable()||t===this.findFirstTabFocusable()){let i=this.findLastTabFocusable();i&&(e.preventDefault(),i.focus())}return}if(t===this.findLastTabFocusable()){let i=this.findFirstTabFocusable();i&&(e.preventDefault(),i.focus())}}open(){this.isOpen||(this.opener=this.deepActiveElement(),this.hidden=!1,this.focusFirst(),this.boundOutsideClickClose=this.outsideClickClose.bind(this),document.addEventListener("click",this.boundOutsideClickClose,!0),this.boundKeyboardEvents=this.keyboardEvents.bind(this),document.addEventListener("keydown",this.boundKeyboardEvents,!0))}close(){this.hidden=!0,document.removeEventListener("click",this.boundOutsideClickClose,!0),document.removeEventListener("keydown",this.boundKeyboardEvents,!0),this.opener&&this.opener.focus()}clear(){for(;this.firstChild;)this.removeChild(this.firstChild)}closeClear(){this.close(),this.clear()}handleCloseClick(e){e.target.classList.contains("close")&&(e.preventDefault(),this.close(),this.clear())}setContent(e,t=!0){Array.isArray(e)||(e=[e]),this.clear();let i=document.createDocumentFragment();e.forEach(s=>{s.getAttribute("slot")||s.setAttribute("slot","content"),i.appendChild(s)}),t&&i.appendChild(this.getCloseButton()),this.appendChild(i)}};window.customElements.get("modal-mib")||window.customElements.define("modal-mib",Fl);"serviceWorker"in navigator&&navigator.serviceWorker.register("./service_worker.js",{type:"module"});var Qm=new jn;document.querySelector("action-menu").setEmitter(Qm);Sm.initialize({emitter:Qm,prefix:"charsheet-app-",appname:"character-sheet"});})();
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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

@firebase/auth/dist/esm2017/index-e5b3cc81.js:
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
