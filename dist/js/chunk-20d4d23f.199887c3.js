(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20d4d23f"],{"0fd9":function(t,e,n){"use strict";n("99af"),n("4160"),n("caad"),n("13d5"),n("4ec9"),n("b64b"),n("d3b7"),n("ac1f"),n("2532"),n("3ca3"),n("5319"),n("159b"),n("ddb0");var a=n("ade3"),i=n("5530"),s=(n("4b85"),n("2b0e")),r=n("d9f7"),o=n("80d2"),c=["sm","md","lg","xl"],l=["start","end","center"];function u(t,e){return c.reduce((function(n,a){return n[t+Object(o["F"])(a)]=e(),n}),{})}var d=function(t){return[].concat(l,["baseline","stretch"]).includes(t)},h=u("align",(function(){return{type:String,default:null,validator:d}})),v=function(t){return[].concat(l,["space-between","space-around"]).includes(t)},f=u("justify",(function(){return{type:String,default:null,validator:v}})),p=function(t){return[].concat(l,["space-between","space-around","stretch"]).includes(t)},g=u("alignContent",(function(){return{type:String,default:null,validator:p}})),b={align:Object.keys(h),justify:Object.keys(f),alignContent:Object.keys(g)},m={align:"align",justify:"justify",alignContent:"align-content"};function k(t,e,n){var a=m[t];if(null!=n){if(e){var i=e.replace(t,"");a+="-".concat(i)}return a+="-".concat(n),a.toLowerCase()}}var j=new Map;e["a"]=s["default"].extend({name:"v-row",functional:!0,props:Object(i["a"])(Object(i["a"])(Object(i["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},h),{},{justify:{type:String,default:null,validator:v}},f),{},{alignContent:{type:String,default:null,validator:p}},g),render:function(t,e){var n=e.props,i=e.data,s=e.children,o="";for(var c in n)o+=String(n[c]);var l=j.get(o);return l||function(){var t,e;for(e in l=[],b)b[e].forEach((function(t){var a=n[t],i=k(e,t,a);i&&l.push(i)}));l.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(a["a"])(t,"align-".concat(n.align),n.align),Object(a["a"])(t,"justify-".concat(n.justify),n.justify),Object(a["a"])(t,"align-content-".concat(n.alignContent),n.alignContent),t)),j.set(o,l)}(),t(n.tag,Object(r["a"])(i,{staticClass:"row",class:l}),s)}})},"15eb":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"chat-window"},[t.currentConversation?n("div",{directives:[{name:"chat-scroll",rawName:"v-chat-scroll"}],staticClass:"chat-messages"},t._l(t.currentConversation.chat_messages,(function(e){return n("v-snackbar",{key:e.id,attrs:{timeout:-1,value:!0,color:"blue-grey",left:e.sender_id!==t.user.id,right:e.sender_id==t.user.id,shaped:""}},[t._v(" "+t._s(e.content)+" ")])})),1):t._e(),[n("v-divider"),n("v-row",[n("v-col",{attrs:{cols:9}},[n("v-text-field",{staticClass:"message-input",attrs:{label:t.$t("typeMessage"),"hide-details":"auto"},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.sendMessage(e)}},model:{value:t.inputModel,callback:function(e){t.inputModel=e},expression:"inputModel"}})],1),n("v-col",{attrs:{cols:3}},[n("v-btn",{attrs:{color:"primary mt-3"},on:{click:t.sendMessage}},[t._v(" "+t._s(t.$t("send"))+" ")])],1)],1)]],2)},i=[],s=n("5530"),r=n("2f62"),o={name:"single-conversation",data:function(){return{inputModel:""}},created:function(){this.$store.commit("set_current_conversation_id",this.$route.params.id)},computed:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(r["d"])(["user","currentConversationId"])),Object(r["c"])(["currentConversation"])),{},{conversationId:function(){return this.$route.params.id}}),methods:{sendMessage:function(){this.inputModel&&(this.$cable.perform({channel:"ConversationChannel",room:this.currentConversationId,action:"send_message",data:{conversation_id:this.currentConversationId,content:this.inputModel}}),this.inputModel="")}},watch:{conversationId:function(t){this.$store.commit("set_current_conversation_id",t)}}},c=o,l=(n("e715"),n("2877")),u=n("6544"),d=n.n(u),h=n("8336"),v=n("b0af"),f=n("62ad"),p=n("ce7e"),g=n("0fd9"),b=(n("caad"),n("a9e3"),n("ade3")),m=(n("ca71"),n("8dd9")),k=n("a9ad"),j=n("7560"),y=n("f2e7"),C=n("fe6c"),O=n("58df"),_=n("80d2"),w=n("d9bd"),B=Object(O["a"])(m["a"],k["a"],y["a"],Object(C["b"])(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:function(t){return"string"===typeof t||!1===t}},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground:function(){return!this.text&&!this.outlined},isDark:function(){return this.hasBackground?!this.light:j["a"].options.computed.isDark.call(this)},styles:function(){if(this.absolute)return{};var t=this.$vuetify.application,e=t.bar,n=t.bottom,a=t.footer,i=t.insetFooter,s=t.left,r=t.right,o=t.top;return{paddingBottom:Object(_["g"])(n+a+i),paddingLeft:this.app?Object(_["g"])(s):void 0,paddingRight:this.app?Object(_["g"])(r):void 0,paddingTop:Object(_["g"])(e+o)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted:function(){this.isActive&&this.setTimeout()},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(w["e"])("auto-height",this),0==this.timeout&&Object(w["d"])('timeout="0"',"-1",this)},methods:{genActions:function(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object(_["s"])(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent:function(){return this.$createElement("div",{staticClass:"v-snack__content",class:Object(b["a"])({},this.contentClass,!0),attrs:{role:"status","aria-live":"polite"}},[Object(_["s"])(this)])},genWrapper:function(){var t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:m["a"].options.computed.classes.call(this),directives:[{name:"show",value:this.isActive}]});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition:function(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout);var e=Number(this.timeout);this.isActive&&![0,-1].includes(e)&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),e))}},render:function(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}}),$=n("8654"),x=Object(l["a"])(c,a,i,!1,null,null,null);e["default"]=x.exports;d()(x,{VBtn:h["a"],VCard:v["a"],VCol:f["a"],VDivider:p["a"],VRow:g["a"],VSnackbar:B,VTextField:$["a"]})},3176:function(t,e,n){},"615b":function(t,e,n){},"8ce9":function(t,e,n){},b0af:function(t,e,n){"use strict";n("0481"),n("4069"),n("a9e3");var a=n("5530"),i=(n("615b"),n("10d2")),s=n("297c"),r=n("1c87"),o=n("58df");e["a"]=Object(o["a"])(s["a"],r["a"],i["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({"v-card":!0},r["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},i["a"].options.computed.classes.call(this))},styles:function(){var t=Object(a["a"])({},i["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=s["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),n=e.tag,a=e.data;return a.style=this.styles,this.isClickable&&(a.attrs=a.attrs||{},a.attrs.tabindex=0),t(n,this.setBackgroundColor(this.color,a),[this.genProgress(),this.$slots.default])}})},ca71:function(t,e,n){},ce7e:function(t,e,n){"use strict";var a=n("5530"),i=(n("8ce9"),n("7560"));e["a"]=i["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(a["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(a["a"])({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},e715:function(t,e,n){"use strict";var a=n("3176"),i=n.n(a);i.a}}]);
//# sourceMappingURL=chunk-20d4d23f.199887c3.js.map