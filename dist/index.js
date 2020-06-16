var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};
$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.objectCreate=$jscomp.ASSUME_ES5||"function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b};
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};
$jscomp.polyfill=function(a,b,c,e){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,e):$jscomp.polyfillUnisolated(a,b,c,e))};$jscomp.polyfillUnisolated=function(a,b,c,e){c=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var d=a[e];d in c||(c[d]={});c=c[d]}a=a[a.length-1];e=c[a];b=b(e);b!=e&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,e){var d=a.split(".");a=1===d.length;e=d[0];e=!a&&e in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<d.length-1;f++){var g=d[f];g in e||(e[g]={});e=e[g]}d=d[d.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?e[d]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,d,{configurable:!0,writable:!0,value:b}):b!==c&&($jscomp.propertyToPolyfillSymbol[d]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(d):$jscomp.POLYFILL_PREFIX+d,d=$jscomp.propertyToPolyfillSymbol[d],
$jscomp.defineProperty(e,d,{configurable:!0,writable:!0,value:b})))};$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},b={};try{return b.__proto__=a,b.a}catch(c){}return!1};$jscomp.setPrototypeOf=$jscomp.TRUST_ES6_POLYFILLS&&"function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;
$jscomp.inherits=function(a,b){a.prototype=$jscomp.objectCreate(b.prototype);a.prototype.constructor=a;if($jscomp.setPrototypeOf){var c=$jscomp.setPrototypeOf;c(a,b)}else for(c in b)if("prototype"!=c)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,c);e&&Object.defineProperty(a,c,e)}else a[c]=b[c];a.superClass_=b.prototype};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}function c(a){return a instanceof d?a:new d(function(b,c){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){if(null==this.batch_){this.batch_=[];var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})}this.batch_.push(a)};var e=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){e(a,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];a[b]=null;try{c()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var d=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(l){b.reject(l)}};d.prototype.createResolveAndReject_=function(){function a(a){return function(d){c||(c=!0,a.call(b,d))}}var b=this,c=!1;
return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};d.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof d)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};d.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(l){this.reject_(l);return}"function"==typeof b?
this.settleSameAsThenable_(b,a):this.fulfill_(a)};d.prototype.reject_=function(a){this.settle_(2,a)};d.prototype.fulfill_=function(a){this.settle_(1,a)};d.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};d.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=0;a<this.onSettledCallbacks_.length;++a)f.asyncExecute(this.onSettledCallbacks_[a]);
this.onSettledCallbacks_=null}};var f=new b;d.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};d.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(k){c.reject(k)}};d.prototype.then=function(a,b){function c(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(m){f(m)}}:b}var e,f,g=new d(function(a,b){e=a;f=b});this.callWhenSettled_(c(a,e),c(b,f));return g};
d.prototype.catch=function(a){return this.then(void 0,a)};d.prototype.callWhenSettled_=function(a,b){function c(){switch(d.state_){case 1:a(d.result_);break;case 2:b(d.result_);break;default:throw Error("Unexpected state: "+d.state_);}}var d=this;null==this.onSettledCallbacks_?f.asyncExecute(c):this.onSettledCallbacks_.push(c)};d.resolve=c;d.reject=function(a){return new d(function(b,c){c(a)})};d.race=function(a){return new d(function(b,d){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())c(f.value).callWhenSettled_(b,
d)})};d.all=function(a){var b=$jscomp.makeIterator(a),e=b.next();return e.done?c([]):new d(function(a,d){function f(b){return function(c){g[b]=c;k--;0==k&&a(g)}}var g=[],k=0;do g.push(void 0),k++,c(e.value).callWhenSettled_(f(g.length-1),d),e=b.next();while(!e.done)})};return d},"es6","es3");$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var b=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};b.prototype.toString=function(){return this.$jscomp$symbol$id_};var c=0,e=function(a){if(this instanceof e)throw new TypeError("Symbol is not a constructor");return new b("jscomp_symbol_"+(a||"")+"_"+c++,a)};return e},"es6","es3");$jscomp.initSymbolIterator=function(){};
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var e=$jscomp.global[b[c]];"function"===typeof e&&"function"!=typeof e.prototype[a]&&$jscomp.defineProperty(e.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.initSymbolAsyncIterator=function(){};$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.generator={};$jscomp.generator.ensureIteratorResultIsObject_=function(a){if(!(a instanceof Object))throw new TypeError("Iterator result "+a+" is not an object");};
$jscomp.generator.Context=function(){this.isRunning_=!1;this.yieldAllIterator_=null;this.yieldResult=void 0;this.nextAddress=1;this.finallyAddress_=this.catchAddress_=0;this.finallyContexts_=this.abruptCompletion_=null};$jscomp.generator.Context.prototype.start_=function(){if(this.isRunning_)throw new TypeError("Generator is already running");this.isRunning_=!0};$jscomp.generator.Context.prototype.stop_=function(){this.isRunning_=!1};
$jscomp.generator.Context.prototype.jumpToErrorHandler_=function(){this.nextAddress=this.catchAddress_||this.finallyAddress_};$jscomp.generator.Context.prototype.next_=function(a){this.yieldResult=a};$jscomp.generator.Context.prototype.throw_=function(a){this.abruptCompletion_={exception:a,isException:!0};this.jumpToErrorHandler_()};$jscomp.generator.Context.prototype.return=function(a){this.abruptCompletion_={return:a};this.nextAddress=this.finallyAddress_};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks=function(a){this.abruptCompletion_={jumpTo:a};this.nextAddress=this.finallyAddress_};$jscomp.generator.Context.prototype.yield=function(a,b){this.nextAddress=b;return{value:a}};$jscomp.generator.Context.prototype.yieldAll=function(a,b){a=$jscomp.makeIterator(a);var c=a.next();$jscomp.generator.ensureIteratorResultIsObject_(c);if(c.done)this.yieldResult=c.value,this.nextAddress=b;else return this.yieldAllIterator_=a,this.yield(c.value,b)};
$jscomp.generator.Context.prototype.jumpTo=function(a){this.nextAddress=a};$jscomp.generator.Context.prototype.jumpToEnd=function(){this.nextAddress=0};$jscomp.generator.Context.prototype.setCatchFinallyBlocks=function(a,b){this.catchAddress_=a;void 0!=b&&(this.finallyAddress_=b)};$jscomp.generator.Context.prototype.setFinallyBlock=function(a){this.catchAddress_=0;this.finallyAddress_=a||0};$jscomp.generator.Context.prototype.leaveTryBlock=function(a,b){this.nextAddress=a;this.catchAddress_=b||0};
$jscomp.generator.Context.prototype.enterCatchBlock=function(a){this.catchAddress_=a||0;a=this.abruptCompletion_.exception;this.abruptCompletion_=null;return a};$jscomp.generator.Context.prototype.enterFinallyBlock=function(a,b,c){c?this.finallyContexts_[c]=this.abruptCompletion_:this.finallyContexts_=[this.abruptCompletion_];this.catchAddress_=a||0;this.finallyAddress_=b||0};
$jscomp.generator.Context.prototype.leaveFinallyBlock=function(a,b){b=this.finallyContexts_.splice(b||0)[0];if(b=this.abruptCompletion_=this.abruptCompletion_||b){if(b.isException)return this.jumpToErrorHandler_();void 0!=b.jumpTo&&this.finallyAddress_<b.jumpTo?(this.nextAddress=b.jumpTo,this.abruptCompletion_=null):this.nextAddress=this.finallyAddress_}else this.nextAddress=a};$jscomp.generator.Context.prototype.forIn=function(a){return new $jscomp.generator.Context.PropertyIterator(a)};
$jscomp.generator.Context.PropertyIterator=function(a){this.object_=a;this.properties_=[];for(var b in a)this.properties_.push(b);this.properties_.reverse()};$jscomp.generator.Context.PropertyIterator.prototype.getNext=function(){for(;0<this.properties_.length;){var a=this.properties_.pop();if(a in this.object_)return a}return null};$jscomp.generator.Engine_=function(a){this.context_=new $jscomp.generator.Context;this.program_=a};
$jscomp.generator.Engine_.prototype.next_=function(a){this.context_.start_();if(this.context_.yieldAllIterator_)return this.yieldAllStep_(this.context_.yieldAllIterator_.next,a,this.context_.next_);this.context_.next_(a);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.return_=function(a){this.context_.start_();var b=this.context_.yieldAllIterator_;if(b)return this.yieldAllStep_("return"in b?b["return"]:function(a){return{value:a,done:!0}},a,this.context_.return);this.context_.return(a);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.throw_=function(a){this.context_.start_();if(this.context_.yieldAllIterator_)return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"],a,this.context_.next_);this.context_.throw_(a);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.yieldAllStep_=function(a,b,c){try{var e=a.call(this.context_.yieldAllIterator_,b);$jscomp.generator.ensureIteratorResultIsObject_(e);if(!e.done)return this.context_.stop_(),e;var d=e.value}catch(f){return this.context_.yieldAllIterator_=null,this.context_.throw_(f),this.nextStep_()}this.context_.yieldAllIterator_=null;c.call(this.context_,d);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.nextStep_=function(){for(;this.context_.nextAddress;)try{var a=this.program_(this.context_);if(a)return this.context_.stop_(),{value:a.value,done:!1}}catch(b){this.context_.yieldResult=void 0,this.context_.throw_(b)}this.context_.stop_();if(this.context_.abruptCompletion_){a=this.context_.abruptCompletion_;this.context_.abruptCompletion_=null;if(a.isException)throw a.exception;return{value:a.return,done:!0}}return{value:void 0,done:!0}};
$jscomp.generator.Generator_=function(a){this.next=function(b){return a.next_(b)};this.throw=function(b){return a.throw_(b)};this.return=function(b){return a.return_(b)};this[Symbol.iterator]=function(){return this}};$jscomp.generator.createGenerator=function(a,b){b=new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));$jscomp.setPrototypeOf&&$jscomp.setPrototypeOf(b,a.prototype);return b};
$jscomp.asyncExecutePromiseGenerator=function(a){function b(b){return a.next(b)}function c(b){return a.throw(b)}return new Promise(function(e,d){function f(a){a.done?e(a.value):Promise.resolve(a.value).then(b,c).then(f,d)}f(a.next())})};$jscomp.asyncExecutePromiseGeneratorFunction=function(a){return $jscomp.asyncExecutePromiseGenerator(a())};$jscomp.asyncExecutePromiseGeneratorProgram=function(a){return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)))};
var $=function(a){function b(a){a.on=function(b,c){a.addEventListener(b,c,!1)};a.animate=function(b,c,e,h){e=void 0===e?2E3:e;a.style.transition="all "+(void 0===h?200:h)/1E3+"s ease-in-out";for(var d in b)a.style[d]=b[d];a.toggle&&clearTimeout(a.toggle);a.toggle=setTimeout(function(){for(var b in c)a.style[b]=c[b]},e)}}var c=1<document.querySelectorAll(a).length?document.querySelectorAll(a):document.querySelectorAll(a)[0];if(c)return c.tagName?b(c):(c.on=function(a,b){c.forEach(function(c,d){c.addEventListener(a,
function(a){return b(a)},!1)})},c.forEach(function(a,c){b(a)})),c;console.log("no se encontro el selector: "+a)},pallete=function(a){for(var b in a)"object"!=typeof a[b]&&(a[b]={color:a[b]}),a[b].font||(a[b].font="black"),a[b].select||(a[b].select=!1);this.colors=a};
pallete.prototype.generatePallete=function(){var a=document.createElement("ul");a.classList="styleNote";a.id="styleNote"+document.querySelectorAll(".styleNote").length;for(var b in this.colors)if(!this.colors[b].select){var c=document.createElement("li");c.id="colorNote-"+b;c.classList="prefered";c.style.background=this.colors[b].color;a.appendChild(c)}return a};
var defaultPallete=new pallete([{color:"#2f3640",font:"white"},"#fd9644","#f1c40f","#26de81","#2bcbba","#9c88ff"]),APIchrome=function(){var a={protocol:"chrome:",hostname:"chrome.google.com"};this.filter=function(b){var c=new URL(b.url);if(b.title==c.hostname)return!1;for(var e in a)if(c[e]==a[e])return!1;return!0}};APIchrome.prototype.send=function(a,b){b=void 0===b?null:b;null==b?chrome.runtime.sendMessage(a):chrome.tabs.sendMessage(b,a)};
APIchrome.prototype.exeScript=function(a,b,c){c=void 0===c?100:c;return $jscomp.asyncExecutePromiseGeneratorProgram(function(e){return e.return(new Promise(function(d,e){chrome.tabs.executeScript(a,b,function(a){d(a)});setTimeout(function(){d("timeout")},c)}))})};
APIchrome.prototype.getTab=function(a){a=void 0===a?{}:a;return $jscomp.asyncExecutePromiseGeneratorProgram(function(b){return 1==b.nextAddress?("active"==a&&(a={active:!0,lastFocusedWindow:!0}),b.yield(new Promise(function(b,e){"number"==typeof a?chrome.tabs.get(a,function(a){a&&a.url?b(a):b("empty")}):chrome.tabs.query(a,function(a){a&&0<a.length?b(a):b("empty")})}),2)):b.return(b.yieldResult)})};
APIchrome.prototype.getStorage=function(a){a=void 0===a?null:a;return $jscomp.asyncExecutePromiseGeneratorProgram(function(b){return 1==b.nextAddress?b.yield(new Promise(function(b,e){return $jscomp.asyncExecutePromiseGeneratorProgram(function(c){chrome.storage.sync.get(a,function(c){(c=null==a?c:c[a])?b(c):b("empty")});c.jumpToEnd()})}),2):b.return(b.yieldResult)})};
APIchrome.prototype.removeStorage=function(a){a=void 0===a?null:a;return $jscomp.asyncExecutePromiseGeneratorProgram(function(b){return b.return(new Promise(function(b,e){a?chrome.storage.sync.remove(a,function(){b()}):chrome.storage.sync.clean(function(){b()})}))})};
APIchrome.prototype.setStorage=function(a,b){var c=this,e;return $jscomp.asyncExecutePromiseGeneratorProgram(function(d){if(1==d.nextAddress)return d.yield(c.getStorage(a),2);e=d.yieldResult;return d.return(new Promise(function(c,d){d={};chrome.storage.sync.set((d[a]=b,d),function(){e=={}?c("setted"):c("modified")})}))})};
APIchrome.prototype.onUpdated=function(a){return $jscomp.asyncExecutePromiseGeneratorProgram(function(b){chrome.tabs.onUpdated.addListener(function(b,e){if("complete"==e.status)for(var c in a)a[c]({tabId:b,info:e})});b.jumpToEnd()})};
APIchrome.prototype.onMessages=function(a){a&&chrome.runtime.onMessage.addListener(function(b,c,e){var d,f;return $jscomp.asyncExecutePromiseGeneratorProgram(function(c){d=!0;for(f in a)if(b.action){if(b.action==f){a[f](b);d=!1;break}}else if(b.verifyURL){a.verifyURL(b);d=!1;break}if(1==d&&a["default"])a["default"](b);c.jumpToEnd()})})};
APIchrome.prototype.onCommand=function(){var a=this;return $jscomp.asyncExecutePromiseGeneratorProgram(function(b){chrome.commands.onCommand.addListener(function(b){return $jscomp.asyncExecutePromiseGeneratorProgram(function(c){if(1==c.nextAddress)return"createNote"!=b?c.jumpTo(0):c.yield(a.requestIndex("selection"),3);a.sendContentScript({});c.jumpToEnd()})});b.jumpToEnd()})};
var popupComunication=function(){APIchrome.call(this);var a=this;this.toggles={menuDelete:!1,menuHidden:function(){return $jscomp.asyncExecutePromiseGeneratorProgram(function(b){return 1==b.nextAddress?b.yield(new Promise(function(b,e){var c;return $jscomp.asyncExecutePromiseGeneratorProgram(function(d){if(1==d.nextAddress)return d.yield(a.getStorage("hiddenNotes"),2);c=d.yieldResult;return d.return("empty"!=c?b(c):e("show"))})}),2):b.return(b.yieldResult)})}};this.onMessages({notesDelete:function(b){b=
b.notesDelete;var c=1<b||0==b?"s":"";a.showBubbleMessage(b+" nota"+c+" eliminada"+c)},accessUrlBloked:function(){a.showBubbleMessage("P\u00e1gina no accesible")}})};$jscomp.inherits(popupComunication,APIchrome);popupComunication.prototype.showBubbleMessage=function(a,b){b=$("#bubbleInfo");b.textContent=a;b.animate({opacity:"1"},{opacity:"0"},2E3)};var colors=function(){popupComunication.call(this)};$jscomp.inherits(colors,popupComunication);
colors.prototype.onSelectionColor=function(a){var b=this,c,e,d,f,g;return $jscomp.asyncExecutePromiseGeneratorProgram(function(h){if(1==h.nextAddress)return c=$("#toolbar"),e=b.palletes,h.yield(b.getStorage("defaultConfigNote"),2);d=h.yieldResult;f={};for(g in e)f.$jscomp$loop$prop$key$3=g,f.$jscomp$loop$prop$styleNote$4=e[f.$jscomp$loop$prop$key$3].generatePallete(),c.appendChild(f.$jscomp$loop$prop$styleNote$4),$("#"+f.$jscomp$loop$prop$styleNote$4.id+" li").on("click",function(a){return function(c){c=
c.target.id.replace("colorNote-","");b.selectColor(a.$jscomp$loop$prop$key$3,c,a.$jscomp$loop$prop$styleNote$4.id)}}(f)),f={$jscomp$loop$prop$key$3:f.$jscomp$loop$prop$key$3,$jscomp$loop$prop$styleNote$4:f.$jscomp$loop$prop$styleNote$4};"empty"!=d?b.selectColor(d.pallete,d.color):b.selectColor(a.pallete,a.color);h.jumpToEnd()})};
colors.prototype.selectColor=function(a,b){var c=this.palletes[a].colors[b];$(".prefered").forEach(function(a,b){a.style.transform="scale(1)"});$("#styleNote"+a+" > #colorNote-"+b).style.transform="scale(1.4)";$("#miniNote").style.background=c.color;$("#bubbleInfo").style.background=c.color;$("#bubbleInfo").style.color=c.font;$(".falseLetter").forEach(function(a,b){a.style.background=c.font});this.setStorage("defaultConfigNote",{pallete:a,color:b,colors:this.palletes[a].colors[b]})};
var popup=function(a){colors.call(this);var b=this;this.palletes=a;this.onSelectionColor({pallete:0,color:2});this.menuHidden("show");$("#miniNote").on("click",function(){var a,e;return $jscomp.asyncExecutePromiseGeneratorProgram(function(c){if(1==c.nextAddress)return c.yield(b.getStorage("defaultConfigNote"),2);a=c.yieldResult;e=b.palletes[a.pallete].colors[a.color];b.send({verifyURL:"createNote",noteColor:e.color,fontColor:e.font});c.jumpToEnd()})});$("#deleteButton").on("click",function(){b.menuDelete()});
$("#deleteConfirm").on("click",function(){b.deleteNotes();b.menuDelete()});$("#hiddenButton").on("click",function(){b.menuHidden("toggle")});$("#feedbackButton").on("click",function(){b.send({verifyURL:"createFeedback"})})};$jscomp.inherits(popup,colors);
popup.prototype.menuHidden=function(a){var b=this,c=$("#hiddenButton"),e={toggle:function(a){var d="hidden"==a?"show":"hidden";"hidden"==a?(b.send({action:"showNotes"}),c.style.backgroundColor="transparent",b.setStorage("hiddenNotes",d)):"show"==a&&(b.send({action:"hiddenNotes"}),c.style.backgroundColor="#636e72",b.setStorage("hiddenNotes",d))},show:function(a){"hidden"==a?(b.setStorage("hiddenNotes","hidden"),c.style.backgroundColor="#636e72"):(b.setStorage("hiddenNotes","show"),c.style.backgroundColor=
"transparent")}};this.toggles.menuHidden().then(function(b){return e[a](b)},function(b){return e[a](b)})};
popup.prototype.deleteNotes=function(){var a=this,b,c,e;return $jscomp.asyncExecutePromiseGeneratorProgram(function(d){if(1==d.nextAddress){b={allHere:function(){var a=$("#allHere");a.bind="removeNotesHere";return a},allPages:function(){var a=$("#allPages");a.bind="deleteAll";return a},checked:function(){return this.allHere().checked?this.allHere():this.allPages()}};c=b.checked().bind;switch(c){case "deleteAll":a.send({action:c});break;case "removeNotesHere":return d.jumpTo(2)}return d.jumpTo(0)}if(4!=
d.nextAddress)return d.yield(a.getTab("active"),4);e=d.yieldResult;a.send({action:c,url:e[0].url},e[0].id);return d.jumpTo(0)})};popup.prototype.menuDelete=function(){var a=$("#deleteMenu");0==this.toggles.menuDelete?($("#deleteButton").style.backgroundColor="#636e72",a.style.visibility="visible",a.style.height="80%",this.toggles.menuDelete=!0):($("#deleteButton").style.backgroundColor="transparent",a.style.height="0",a.style.visibility="hidden",this.toggles.menuDelete=!1)};new popup([defaultPallete]);
