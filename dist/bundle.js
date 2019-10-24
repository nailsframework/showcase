!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return RenderingEngine}));var _directiveDefinitions_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1);class RenderingEngine{constructor(e){null==e&&console.log("Engine was initialized without a state"),this.state=e,this.directives=new _directiveDefinitions_js__WEBPACK_IMPORTED_MODULE_0__.a}indexDOM(){if(void 0!==this.state.element){var e=null;if(this.state.element.startsWith("#")){var t=this.state.element.substr(1);e=document.getElementById(t)}else e=document.getElementsByTagName(this.state.element);if(null==e)return void console.error("No element with selector: "+this.state.element+" has been found");if(e instanceof HTMLCollection&&e.length>1)return void console.error("Multiple choices, try using id if the element tag is not unique. Your Selector was: "+this.state.element);if(e instanceof HTMLCollection&&0===e.length)return void console.error("No element with selector: "+this.state.element+" has been found");e instanceof HTMLCollection&&(e=e[0]);var n=this.indexElement(e);for(var i of n)this.executeDirectivesOnElement(i,!0);this.executeInerpolationsOnElement(e)}}insert(e,t,n){return e>0?n.substring(0,e)+t+n.substring(e,n.length):t+n}setTitle(){void 0===this.state.data.title&&null!==this.state.data.title||(document.title=this.state.data.title)}elementCanGetAttribute(e){return"getAttribute"in e}isNForActivated(e){return!!this.elementCanGetAttribute(e)&&null!==e.getAttribute("n-for")}disableInterpolationForVariableNameOnElement(e,t){if(void 0!==e&&void 0!==t){for(var n of this.state.disabledElements)if(n[0]==e&&n[1]==t)return;this.state.disabledElements.push([e,t])}}getElementDerrivedObject(e){return"object"}getElementDerrivedProperty(e){return"property"}getForArrayByStatement(e){return e.split(" ").last}isForAttribute(e){return"getAttribute"in(e=e[0])&&null!==e.getAttribute("n-for")}isActiveElement(e){return this.getElementDirectives(e).length>0}removePrefix(e){return e.substring(2)}prefixDiretive(e){return"n-"+e}getElementDirectives(e){if(void 0===e)return[];var t=[];for(var n of this.directives.directives)n=this.prefixDiretive(n),"hasAttribute"in e&&e.hasAttribute(n)&&t.push(n);return t}indexElement(e){this.state.disableElementIfNeeded(e);var t=[];for(var n of e.childNodes){var i=this.indexElement(n);t.push.apply(t,i)}return this.isActiveElement(e)&&t.push(e),t}getElementAttributeForDirective(e,t){return t=this.prefixDiretive(t),e.hasAttribute(t)?e.getAttribute(t):(console.warn("directive: "+t+" not found on element: "+e),"")}executeDirectivesOnElement(e,t){var n=this.getElementDirectives(e);for(var i of n)if((i=this.removePrefix(i))in this.directives){this.directives[i](e,this.getElementAttributeForDirective(e,i),this.state);n=this.getElementDirectives(e);if(t)for(var r of n)this.state.addActiveDirectiveElement(r,e.getAttribute(r),e)}else console.warn("not found directive: "+i)}stripAndTrimNForInterpolation(e){return e=(e=(e=e.replace("[[[","")).replace("]]]","")).trim()}getNForInterpolations(e){var t=[],n=(e=e.trim()).match(/\[\[\[(( +)?\w+.?\w+( +)?)\]\]\]/g);if(null===n)return t;for(var i of n)t.push(i);return t}getNForInterpolation(e){return(e=e.trim()).match(/\[\[\[(( +)?\w+.?\w+( +)?)\]\]\]/g)?e=this.stripAndTrimNForInterpolation(e):(console.warn("Not found interpolation in submitted value: "+e),e)}getValueOfInterpolation(interpolation){if(interpolation=interpolation.trim(),!interpolation.match(/{{(.?\s?\w?.?\w\s?)+}}/g))return console.warn("Not found interpolation in submitted value: "+interpolation),interpolation;interpolation=this.stripAndTrimInterpolation(interpolation),interpolation=interpolation.trim();var stripped=this.stripAndTrimInterpolation(interpolation),args=stripped.split(".");for(var arg of(stripped="",args))stripped+=arg+".";return stripped=stripped.substring(0,stripped.length-1),void 0===this.state.data[stripped.split(".")[0]]?"undefined":eval("this.state.data."+stripped)}removeWhiteSpaceFromString(e){return e.replace(/\s/g,"")}stripAndTrimInterpolation(e){return void 0===e||null===typeof e?e:e=(e=(e=e.replace("{{","")).replace("}}","")).trim()}getInterpolationsFortextContent(e){var t=[];if(null==e)return t;var n=e.match(/{{(.?\s?\w?.?\w\s?)+}}/g);if(null===n)return[];for(var i of n)t.push(i);return t}getObjectReferenceByInterpolationName(e){return e=this.stripAndTrimInterpolation(e),this.state.data[e]}interpolateOnTextWithState(e,t){}getContentOfNodeIfTextNodeExists(e){if(3===e.nodeType)return e.nodeValue;if(0===e.childNodes.length)return null;if(this.nodeHasTextNodeAsADirectChild(e))for(var t of e.childNodes)if(null!==this.getContentOfNodeIfTextNodeExists(t))return this.getContentOfNodeIfTextNodeExists(t)}setContentOfTextNode(e,t){return 3!==e.nodeType?(console.error("setContentOfTextNode... this implies that you *HAVE* to provide nothing else than a textNode as argument."),!1):(e.nodeValue=t,!0)}updateInterpolatedElement(e,t){this.executeDirectivesOnElement(e,!1);var n=this.getInterpolationsFortextContent(t);if(0!==n.length){var i=t;for(var r of n){var s=this.getValueOfInterpolation(r);this.isElementDisabled(this.stripAndTrimInterpolation(r),e)||(i=i.replace(r,s))}e.textContent=i}}isDescendant(e,t){for(var n=t.parentNode;null!=n;){if(n==e)return!0;n=n.parentNode}return!1}isElementDisabled(e,t){for(var n of this.state.disabledElements){if((this.isDescendant(t,n[1])||this.isDescendant(n[1],t))&&e.includes(n[0]))return!0;if(n[0]===e&&n[1]===t)return!0}return!1}interpolateElement(e,t){for(var n of t){this.state.disableElementIfNeeded(e);var i=this.getValueOfInterpolation(n);if(!this.isElementDisabled(this.stripAndTrimInterpolation(n).trim(),e)){var r=e.textContent||e.textContent;r=r.replace(n,i),"textContent"in e?e.textContent=r:"textContent"in e&&(e.textContent=r)}}return e}nodeHasTextNodeAsAChild(e){return 3===e.nodeType||0!==e.childNodes.length&&this.nodeHasTextNodeAsAChild(e)}nodeHasTextNodeAsADirectChild(e){for(var t of e.childNodes)if(3===t.nodeType)return!0;return!1}isTextNode(e){return 3===e.nodeType}sanitize(e){if("string"!=typeof e)return e;var t=document.createElement("div");return t.textContent=e,t.innerHTML}executeInerpolationsOnElement(e){for(var t of e.childNodes)this.executeInerpolationsOnElement(t);var n=this.getInterpolationsFortextContent(e.nodeValue);if(this.isTextNode(e)){if(0===n.length)return;if(3!==e.nodeType)return;for(var i of n)this.state.addActiveElement(e,this.getObjectReferenceByInterpolationName(i),e.nodeValue,i);this.interpolateElement(e,n)}else{if(!this.isNForActivated(e))return;i="{{"+e.getAttribute("n-for").split(" ")[3]+"}}";this.state.addActiveElement(e,e.getAttribute("n-for").split(" ")[3],null,i)}}}},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return NailsDirectives}));class NailsDirectives{constructor(){this.directives=["if","form","for","test"]}form(e,t,n){"text"===e.getAttribute("type")&&n.data[t]!==e.value&&(n.data[t]=e.value),e.addEventListener("input",(function(){n.data[t]!==e.value&&(n.data[t]=e.value)}))}for(element,statemenet,state){var engine=new RenderingEngine(state);function interpolateCustomElement(element,object,descriptor){var html=element.innerHTML,interpolations=engine.getInterpolationsFortextContent(html);for(var interpolation of interpolations){var stripped=engine.stripAndTrimInterpolation(interpolation),args=stripped.split(".");for(var arg of(args[0]="",stripped="",args))stripped+=arg+".";stripped=stripped.substring(0,stripped.length-1),"undefined"!==engine.getValueOfInterpolation(interpolation)?html=html.replace(interpolation,engine.getValueOfInterpolation(interpolation)):(console.log("interpolation inside"),html=html.replace(interpolation,engine.sanitize(eval("object"+stripped))))}element.innerHTML=html}element.style.display="none";var descriptor=statemenet.split(" ")[1],arr=statemenet.split(" ")[3],refArray=eval("state.data."+arr);if(null!=refArray){var parent=element.parentNode;for(var i of(parent.childNodes.length>5&&(console.log("State change?"),console.log(parent.childNodes.length)),refArray)){var child=document.createElement(element.nodeName);for(var i of(child.innerHTML=element.innerHTML,interpolateCustomElement(child,i,descriptor),parent.appendChild(child),element.attributes))"n-for"!==i.name&&"style"!==i.name&&child.setAttribute(i.name,i.value);engine.executeDirectivesOnElement(child,!0)}}}if(element,statement,state){var reversed=!1;"!"===statement[0]&&(statement=statement.substring(1),reversed=!0),state.data.hasOwnProperty(statement)?reversed?eval(state.data[statement])?element.style.display="none":element.style.display="block":eval(state.data[statement])?element.style.display="block":element.style.display="none":console.warn("statement: "+statement+" not found in context")}}},function(e,t){t.endianness=function(){return"LE"},t.hostname=function(){return"undefined"!=typeof location?location.hostname:""},t.loadavg=function(){return[]},t.uptime=function(){return 0},t.freemem=function(){return Number.MAX_VALUE},t.totalmem=function(){return Number.MAX_VALUE},t.cpus=function(){return[]},t.type=function(){return"Browser"},t.release=function(){return"undefined"!=typeof navigator?navigator.appVersion:""},t.networkInterfaces=t.getNetworkInterfaces=function(){return{}},t.arch=function(){return"javascript"},t.platform=function(){return"browser"},t.tmpdir=t.tmpDir=function(){return"/tmp"},t.EOL="\n",t.homedir=function(){return"/"}},function(e,t,n){"use strict";n.r(t);class i{constructor(){}greet(e){return"Hi, "+e}}class r{constructor(e){this.state=e,this.selector="login",this.i=0,this.greeter=this.state.injector.resolve(i)}incrementCounter(){return this.i++,this.i}render(){return`\n        <div>\n          <input type="text" placeholder="Username ">\n          <input type="text" placeholder="Username">\n          ${this.greeter.greet("Dominic")}\n        </div>\n      `}}class s{constructor(e){this.state=e;var t=this;this.selector="yield",this.hashRoute=window.location.hash.replace("#/",""),this.engine=e.componentEngine,window.onhashchange=function(){void 0!==t.engine&&void 0!==t.engine&&(t.hashRoute=window.location.hash.replace("#/",""),t.engine.recreateComponentsByName("yield"))}}isFunction(e){return e&&"[object Function]"==={}.toString.call(e)}addRoutings(e){this.routings=e}getComponent(){if(console.log(this.routings),void 0===this.routings)return"div";for(var e of this.routings){if(e.route===this.hashRoute)return this.isFunction(e.guard)?e.guard(this)?new e.component(this.state).selector:"div":new e.component(this.state).selector}}navigate(e){window.location.hash="/"+e.replace("/","")}render(){return`\n            <${this.getComponent()}></${this.getComponent()}>\n        `}}var o=n(0);n(2);class a{constructor(e,t,n,i){this.state=e,this.engine=t,this.instance=this,this.nails=n,this.routings=i}getInstance(){return this.instance}injectComponents(){if(!Array.isArray(this.state.mountedComponents)){this.state.mountedComponents=[];for(let e of this.state.components){console.log("state is "+typeof this.state);let t=new e(this.state);t instanceof s&&(this.state.router=t,t.addRoutings(this.routings),t.navigate("")),this.state.mountedComponents.push(t)}}}renderComponents(){if(this.injectComponents(),void 0!==this.state.mountedComponents&&null!==this.state.mountedComponents&&this.state.mountedComponents.length>0)for(let r=0;r<300;r++){let r,s=document.body.innerHTML;for(var e of this.state.mountedComponents){var t=document.getElementsByTagName(e.selector);if(0!==t.length){for(var n of t)if(!(n.childNodes.length>0)){var i=e.render();i.includes("<"+e.selector+">")||(n.innerHTML=i,this.engine.executeInerpolationsOnElement(n))}r=document.body.innerHTML}}if(s==r)break}}recreateComponentsByName(e){if(void 0!==this.state.mountedComponents&&null!==this.state.mountedComponents){var t=null;for(var n of this.state.mountedComponents)n.selector===e&&(t=n);if(null===t)return;if(null===this.state.mountedComponents[e])return;var i=document.getElementsByTagName(e);for(var r of i){var s=t.render();s.includes("<"+t.selector+">")?console.error("component "+t.selector+" has a recursion with no exit condition"):(r.innerHTML=s,this.renderComponents())}}}recreateAllComponents(){this.renderComponents()}}class l{getInstance(){return null===this.instance&&(this.instance=new l),this.instance}constructor(){this.data={},this.activeElements=[],this.activeDirectiveElements=[],this.engine=new o.a(this),this.disabledElements=[],this.componentEngine=new a(this,this.engine)}addInjector(e){this.injector=e}addActiveDirectiveElement(e,t,n){for(var i of this.activeDirectiveElements)if(i.key===e&&i.statement===t&&i.element===n)return void console.warn("refusing to insert element");this.activeDirectiveElements.push({key:e,statement:t,element:n})}updateElementRefByObject(e,t){for(var n of this.activeElements)n[1]===e&&(n[0]=t)}addActiveElement(e,t,n,i){this.activeElements.push([e,t,n,i])}findElementByRef(e){for(var t of this.activeElements)if(t[0]===e)return t}getHtmlReferenceOfStateElement(e){return e[0]}stripAndTrimInterpolation(e){return"string"!=typeof e?e:e=(e=(e=e.replace("{{","")).replace("}}","")).trim()}disableElementIfNeeded(e){if("getAttribute"in e){var t=e.getAttribute("n-for");if(null===t)return;var n=t.split(" ")[1];this.engine.disableInterpolationForVariableNameOnElement(n,e)}}findElementsByObject(e,t){var n=[];for(var i of this.activeElements)this.stripAndTrimInterpolation(i[3])===t&&n.push(i);for(var i of this.activeDirectiveElements)t=t.replace("!",""),i.statement=i.statement.replace("!",""),this.stripAndTrimInterpolation(i.statement)===t&&n.push(i);return n}}class c{constructor(e){this.state=e,this.bootstrap()}bootstrap(){Array.isArray(this.state.injectors)||(this.state.injectors=[])}insert(e){for(var t of this.state.injectors)if(t instanceof e)return;this.state.injectors.push(e)}resolve(e){for(var t of this.state.injectors)if(t instanceof e)return t}}class d{constructor(e){this.selector="showcase"}render(){return'\n        <div class="yield">\n            <p>Hi, this is a template rendered with the router</p>\n            {{whoami}}\n            <p>below is a table</p>\n            <table style="width:100%">\n                <tr>\n                    <th>Firstname</th>\n                    <th>Lastname</th>\n                    <th>Age</th>\n                </tr>\n                <tr>\n                    <td>Jill</td>\n                    <td>Smith</td>\n                    <td>50</td>\n                </tr>\n  \n            </table>\n        </div>'}}window.nails=new class{constructor(e){void 0!==e.methods.onInit&&e.methods.onInit(),this.state=new l,console.log("NailsJS Created with constructor object: "+JSON.stringify(e)),e.hasOwnProperty("el")?this.state.element=e.el:console.error("NailsJS cannot be initalized, because no element was specified"),e.hasOwnProperty("data")&&(this.state.data=e.data),e.hasOwnProperty("methods")&&(this.state.methods=e.methods),this.state.components=e.components,this.engine=new o.a(this.state),this.componentEngine=new a(this.state,this.engine,this,e.routings),this.setUpProxy(),this.injector=new c(this.state),this.prepareInjector(e.declarations),this.state.addInjector(this.injector),this.componentEngine.renderComponents(),this.engine.indexDOM(),this.engine.setTitle(),window.injector=this.injector,this.state.methods.getState=function(){return this.state},void 0!==this.state.methods.onMounted&&this.state.methods.onMounted(this.state)}prepareInjector(e){if(Array.isArray(e))for(var t of e){let e=new t;this.injector.insert(e)}else console.warn("Cannot iterate over declarations, since they are not an array")}notifyDOM(e,t,n){var i=this.state.findElementsByObject(e,t);if(i!==[]&&0!==i.length){for(var r of i)r.hasOwnProperty("key")?this.engine.executeDirectivesOnElement(r.element,!1):(this.engine.updateInterpolatedElement(r[0],r[2]),this.engine.executeDirectivesOnElement(r,!1));return!0}}setUpProxy(){var e={state:this.state,notifyDom:this.notifyDOM,engine:this.engine,get:function(e,t,n){return e[t]},set(e,t,n){return e[t]=n,this.notifyDom(e,t),!0}},t=new Proxy(this.state.data,e);this.state.data=t}}({el:"body",data:{title:"Your Nails App",whoami:"NailsJS"},methods:{onInit(){},onMounted(e){e.data.headers=[{Test:"Value"}]}},components:[r,s,d,class{constructor(e){this.state=e,this.selector="nailsnav"}render(){return'\n        <nav class="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm">\n        <div class="container">\n          <a href="#" class="navbar-brand">\n            \x3c!-- Logo Image --\x3e\n            <img src="https://res.cloudinary.com/mhmd/image/upload/v1557368579/logo_iqjuay.png" width="45" alt="" class="d-inline-block align-middle mr-2">\n            \x3c!-- Logo Text --\x3e\n            <span class="text-uppercase font-weight-bold">{{whoami}}</span>\n          </a>\n      \n          <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>\n      \n          <div id="navbarSupportedContent" class="collapse navbar-collapse">\n            <ul class="navbar-nav ml-auto">\n              <li class="nav-item active"><a href="#" class="nav-link">Home <span class="sr-only">(current)</span></a></li>\n              <li class="nav-item"><a href="#/login" class="nav-link">Login</a></li>\n              <li class="nav-item"><a href="#/showcase" class="nav-link">Other Routing</a></li>\n              <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>\n            </ul>\n          </div>\n        </div>\n      </nav>\n      '}}],routings:[{component:r,route:"login"},{component:r,route:"lappe",guard:function(){return null!==localStorage.getItem("jwt")}},{component:d,route:"showcase"}],declarations:[i]})}]);