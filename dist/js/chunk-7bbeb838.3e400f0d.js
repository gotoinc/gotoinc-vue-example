(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7bbeb838"],{"0fd9":function(t,e,r){"use strict";r("99af"),r("4160"),r("caad"),r("13d5"),r("4ec9"),r("b64b"),r("d3b7"),r("ac1f"),r("2532"),r("3ca3"),r("5319"),r("159b"),r("ddb0");var a=r("ade3"),n=r("5530"),i=(r("4b85"),r("2b0e")),o=r("d9f7"),s=r("80d2"),c=["sm","md","lg","xl"],d=["start","end","center"];function l(t,e){return c.reduce((function(r,a){return r[t+Object(s["F"])(a)]=e(),r}),{})}var u=function(t){return[].concat(d,["baseline","stretch"]).includes(t)},f=l("align",(function(){return{type:String,default:null,validator:u}})),p=function(t){return[].concat(d,["space-between","space-around"]).includes(t)},v=l("justify",(function(){return{type:String,default:null,validator:p}})),g=function(t){return[].concat(d,["space-between","space-around","stretch"]).includes(t)},m=l("alignContent",(function(){return{type:String,default:null,validator:g}})),b={align:Object.keys(f),justify:Object.keys(v),alignContent:Object.keys(m)},h={align:"align",justify:"justify",alignContent:"align-content"};function y(t,e,r){var a=h[t];if(null!=r){if(e){var n=e.replace(t,"");a+="-".concat(n)}return a+="-".concat(r),a.toLowerCase()}}var w=new Map;e["a"]=i["default"].extend({name:"v-row",functional:!0,props:Object(n["a"])(Object(n["a"])(Object(n["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:u}},f),{},{justify:{type:String,default:null,validator:p}},v),{},{alignContent:{type:String,default:null,validator:g}},m),render:function(t,e){var r=e.props,n=e.data,i=e.children,s="";for(var c in r)s+=String(r[c]);var d=w.get(s);return d||function(){var t,e;for(e in d=[],b)b[e].forEach((function(t){var a=r[t],n=y(e,t,a);n&&d.push(n)}));d.push((t={"no-gutters":r.noGutters,"row--dense":r.dense},Object(a["a"])(t,"align-".concat(r.align),r.align),Object(a["a"])(t,"justify-".concat(r.justify),r.justify),Object(a["a"])(t,"align-content-".concat(r.alignContent),r.alignContent),t)),w.set(s,d)}(),t(r.tag,Object(o["a"])(n,{staticClass:"row",class:d}),i)}})},5326:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{id:"inspire"}},[r("v-main",[r("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[r("v-row",{attrs:{align:"center",justify:"center"}},[r("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[r("v-card",{staticClass:"elevation-12"},[r("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[r("v-toolbar-title",[t._v("Sign in form")]),r("v-spacer")],1),r("v-card-text",[r("v-form",[r("v-text-field",{class:{"clr-error":t.$v.form.identifier.$dirty&&t.$v.form.identifier.$error},attrs:{label:"Login",name:"login","prepend-icon":"mdi-account",type:"text","error-messages":t.loginError(t.$v.form.identifier)},on:{input:function(e){return t.$v.form.identifier.$touch()}},model:{value:t.form.identifier,callback:function(e){t.$set(t.form,"identifier",e)},expression:"form.identifier"}}),r("v-text-field",{class:{"clr-error":t.$v.form.password.$error},attrs:{id:"password",label:"Password",name:"password","prepend-icon":"mdi-lock",type:"password","error-messages":t.passwordError(t.$v.form.password)},on:{input:function(e){return t.$v.form.password.$touch()}},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1)],1),r("v-card-actions",[r("v-btn",{attrs:{link:"",text:"",to:"/register-university"}},[t._v("Register university")]),r("v-spacer"),t.error.length?r("ErrorAlert",{attrs:{data:t.error}}):t._e(),r("v-spacer"),r("v-btn",{attrs:{color:"primary"},on:{click:function(e){return e.preventDefault(),t.login(t.$v)}}},[t._v("Sign in")])],1)],1)],1)],1)],1)],1)],1)},n=[],i=(r("99af"),r("326b")),o=r("b5ae"),s=r("bb9a"),c={components:{ErrorAlert:i["a"]},data:function(){return{form:{identifier:"",password:""},error:""}},computed:{},validations:{form:{identifier:{required:o["required"],email:o["email"]},password:{required:o["required"],minLength:Object(o["minLength"])(6)}}},created:function(){this.$vuetify.theme.dark=!1},methods:{login:function(t){var e=this;if(this.$v.$touch(),t.$invalid)return!1;this.$store.dispatch("login",this.form).then((function(){var t=localStorage.getItem("token");e.$cable.connection.connect("".concat(s["a"].cable,"?token=").concat(t)),e.$router.push("/")})).catch((function(t){e.error=t}))},loginError:function(t){return t.$dirty?t.required?t.email?[]:"Invalid email":"Login is required":void 0},passwordError:function(t){return t.$dirty?t.required?t.minLength?[]:"Password is too short":"Password is required":void 0}}},d=c,l=r("2877"),u=r("6544"),f=r.n(u),p=r("7496"),v=r("8336"),g=r("b0af"),m=r("99d9"),b=r("62ad"),h=r("a523"),y=r("4bd4"),w=r("f6c4"),$=r("0fd9"),j=r("2fa4"),C=r("8654"),k=r("71d9"),x=r("2a7f"),O=Object(l["a"])(d,a,n,!1,null,null,null);e["default"]=O.exports;f()(O,{VApp:p["a"],VBtn:v["a"],VCard:g["a"],VCardActions:m["a"],VCardText:m["c"],VCol:b["a"],VContainer:h["a"],VForm:y["a"],VMain:w["a"],VRow:$["a"],VSpacer:j["a"],VTextField:C["a"],VToolbar:k["a"],VToolbarTitle:x["a"]})},7496:function(t,e,r){"use strict";var a=r("5530"),n=(r("df86"),r("7560")),i=r("58df");e["a"]=Object(i["a"])(n["a"]).extend({name:"v-app",props:{dark:{type:Boolean,default:void 0},id:{type:String,default:"app"},light:{type:Boolean,default:void 0}},computed:{isDark:function(){return this.$vuetify.theme.dark}},beforeCreate:function(){if(!this.$vuetify||this.$vuetify===this.$root)throw new Error("Vuetify is not properly initialized, see https://vuetifyjs.com/getting-started/quick-start#bootstrapping-the-vuetify-object")},render:function(t){var e=t("div",{staticClass:"v-application--wrap"},this.$slots.default);return t("div",{staticClass:"v-application",class:Object(a["a"])({"v-application--is-rtl":this.$vuetify.rtl,"v-application--is-ltr":!this.$vuetify.rtl},this.themeClasses),attrs:{"data-app":!0},domProps:{id:this.id}},[e])}})},a523:function(t,e,r){"use strict";r("99af"),r("4de4"),r("b64b"),r("2ca0"),r("20f6"),r("4b85"),r("a15b"),r("498a");var a=r("2b0e");function n(t){return a["default"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,r){var a=r.props,n=r.data,i=r.children;n.staticClass="".concat(t," ").concat(n.staticClass||"").trim();var o=n.attrs;if(o){n.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(n.staticClass+=" ".concat(s.join(" ")))}return a.id&&(n.domProps=n.domProps||{},n.domProps.id=a.id),e(a.tag,n,i)}})}var i=r("d9f7");e["a"]=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var r,a=e.props,n=e.data,o=e.children,s=n.attrs;return s&&(n.attrs={},r=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}))),a.id&&(n.domProps=n.domProps||{},n.domProps.id=a.id),t(a.tag,Object(i["a"])(n,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(r||[])}),o)}})},bd0c:function(t,e,r){},d10f:function(t,e,r){"use strict";var a=r("2b0e");e["a"]=a["default"].extend({name:"ssr-bootable",data:function(){return{isBooted:!1}},mounted:function(){var t=this;window.requestAnimationFrame((function(){t.$el.setAttribute("data-booted","true"),t.isBooted=!0}))}})},df86:function(t,e,r){},f6c4:function(t,e,r){"use strict";r("bd0c");var a=r("d10f");e["a"]=a["a"].extend({name:"v-main",props:{tag:{type:String,default:"main"}},computed:{styles:function(){var t=this.$vuetify.application,e=t.bar,r=t.top,a=t.right,n=t.footer,i=t.insetFooter,o=t.bottom,s=t.left;return{paddingTop:"".concat(r+e,"px"),paddingRight:"".concat(a,"px"),paddingBottom:"".concat(n+i+o,"px"),paddingLeft:"".concat(s,"px")}}},render:function(t){var e={staticClass:"v-main",style:this.styles,ref:"main"};return t(this.tag,e,[t("div",{staticClass:"v-main__wrap"},this.$slots.default)])}})}}]);
//# sourceMappingURL=chunk-7bbeb838.3e400f0d.js.map