(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41b95406"],{2493:function(t,c,e){"use strict";var a=e("8d3a"),n=e.n(a);n.a},"46d9":function(t,c,e){"use strict";var a=e("b029"),n=e.n(a);n.a},"6e66":function(t,c,e){"use strict";var a=e("89bf"),n=e.n(a);n.a},"89bf":function(t,c,e){},"8d3a":function(t,c,e){},a50a:function(t,c,e){"use strict";var a=e("e7ac"),n=e.n(a);n.a},b029:function(t,c,e){},d23b:function(t,c,e){"use strict";e.r(c);var a=function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("v-app-bar",{attrs:{id:"app-header",fixed:"",dark:"","hide-on-scroll":"",height:"72","extension-height":"72"},scopedSlots:t._u([{key:"extension",fn:function(){return[e("v-container",{staticClass:"fill-height px-0 py-0 app-tool-bar-extention"},[e("v-row",{class:"mx-0 "+t.headerMenuClass},[e("v-col",{staticClass:"px-0 login-layout",attrs:{cols:"6",md:"2"}},[e("v-btn",{staticClass:"mx-2",attrs:{fab:"",dark:"",small:"",color:"secondary"},on:{click:function(c){return c.stopPropagation(),t.openLoginSheet(c)}}},[t.isLogin?[e("v-icon",{staticClass:"d-none d-md-block",attrs:{dark:""}},[t._v("account_box")])]:[e("v-icon",{staticClass:"d-none d-md-block",attrs:{dark:""}},[t._v("person")])],t.loginStatus?[e("v-icon",{staticClass:"d-md-none",attrs:{dark:""}},[t._v("close")])]:[e("v-icon",{staticClass:"d-md-none",attrs:{dark:""}},[t._v("menu")])]],2),e("v-btn",{attrs:{small:"",fab:"",color:"primary",dark:""},on:{click:function(c){return t.switchLanguage(t.language)}}},["zh-hans"===t.language?[t._v(" EN ")]:"en"===t.language?[t._v(" 中文 ")]:t._e()],2)],1),e("v-col",{staticClass:"py-0 menu-layout hidden-sm-and-down",attrs:{cols:"12",sm:"8"}},[e("menu-links")],1),e("v-col",{staticClass:"px-0 search-layout text-right",attrs:{cols:"6",md:"2"}},[e("basket"),e("v-btn",t._g({staticClass:"mx-2",attrs:{fab:"",small:"",color:"secondary"},on:{click:t.openGlobalSearch}},t.on),[e("v-icon",[t._v("search")])],1)],1)],1),e("v-row",{class:"mx-0 "+t.searchGlobalClass,staticStyle:{"animation-duration":"0.25s"}},[t.globalSearchLoading?[e("v-progress-circular",{attrs:{size:72,color:"primary",indeterminate:""}})]:[e("v-icon",[t._v("search")])],e("div",{staticClass:"search-input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.globalSearchKeyWord,expression:"globalSearchKeyWord"}],staticClass:"smartSearch",attrs:{type:"text",placeholder:"Search",name:"searchInput",id:"smartSearch"},domProps:{value:t.globalSearchKeyWord},on:{keyup:function(c){return t.globalSearch()},input:function(c){c.target.composing||(t.globalSearchKeyWord=c.target.value)}}}),e("ul",{staticClass:"search-result",attrs:{id:"search-result"}},[t._l(t.globalSearchResult,(function(c,a){return[e("li",{key:a,class:c.isPublic?"normal":"locked"},[e("div",{staticClass:"item listed product result"},[e("span",["product"===c.type?[e("router-link",{attrs:{to:{name:"Product",params:{id:c.uuid}}},nativeOn:{click:function(c){return t.flushCom(c)}}},[t._v(" "+t._s(c.title)+" ")])]:[e("router-link",{attrs:{to:{name:"Formulation",params:{id:c.uuid}}},nativeOn:{click:function(c){return t.flushCom(c)}}},[t._v(" "+t._s(c.title)+" ")])],e("small",[t._v(" - "+t._s(c.type)+" ")])],2),e("span")])])]}))],2)]),e("v-btn",{attrs:{icon:""},on:{click:t.closeGlobalSearch}},[e("v-icon",[t._v("closed")])],1)],2)],1)]},proxy:!0}])},[e("v-container",{staticClass:"fill-height app-tool-bar"},[e("v-row",[e("a",{staticClass:"logo",attrs:{href:"/"}},[e("Logo")],1),e("v-spacer")],1)],1)],1)},n=[],r=e("2f62"),s=function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("i",{staticClass:"icon basf"},[e("svg",{attrs:{viewBox:"0 0 510.24 184.252"}},[e("g",{attrs:{stroke:"none"}},[e("g",{attrs:{stroke:"none"}},[e("path",{attrs:{fill:"#FFFFFF",d:"M0,2.755v91.384h91.384V2.755H0z M63.27,66.025H28.114V30.87H63.27V66.025z","vector-effect":"non-scaling-stroke"}}),e("rect",{attrs:{x:"119.549",y:"30.87",fill:"#FFFFFF",width:"35.156",height:"35.155","vector-effect":"non-scaling-stroke"}})]),e("path",{attrs:{fill:"#FFFFFF",d:"M182.819,2.755c0,0,42.401,0,50.922,0c18.674,0,27.246,12.45,27.246,23.828 c0,8.215-3.164,13.521-11.632,18.419c10.664,3.929,16.48,11.072,16.48,22.042c0,13.113-9.541,27.043-32.043,27.043 c-12.45,0-51.024,0-51.024,0L182.819,2.755z M210.627,73.525c0,0,11.837,0,18.419,0s9.542-4.694,9.542-8.827 c0,1.939,0.867-7.551-8.572-7.551c-4.949,0-19.338,0-19.338,0v16.378H210.627z M210.678,38.727c0,0,8.572,0,14.797,0 c6.786,0,9.491-3.164,9.491-7.755c0-1.072-0.357-7.042-7.5-7.042c3.265,0-16.736,0-16.736,0v14.797H210.678z"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M294.765,2.755h29.441l33.523,91.281h-30.207l-4.439-13.674h-28.164l-3.725,13.623h-30.002L294.765,2.755z M308.286,29.849l-7.754,30.512h16.633L308.286,29.849z"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M404.722,29.9h28.064c0-15.511-11.686-29.9-39.34-29.9c-30.359,0-39.748,16.736-39.748,29.033 c0,19.746,24.186,25.001,24.951,25.257c3.623,1.123,18.623,5.153,22.4,6.48c3.264,1.174,6.377,3.776,6.377,7.246 c0,5.357-6.377,7.909-11.633,7.909c-3.42,0-14.797-1.123-14.797-13.215h-29.033c0,16.073,11.072,34.084,42.094,34.084 c34.238,0,41.381-20.41,41.381-31.278c0-8.878-5-18.675-16.633-23.369c-6.99-2.807-18.521-5.256-24.34-6.991 c-2.908-0.867-12.652-2.806-12.652-8.776c0-7.603,12.551-6.633,10.715-6.633C398.192,19.746,404.722,22.91,404.722,29.9z"}}),e("polygon",{attrs:{fill:"#FFFFFF",points:"440.185,2.755 510.241,2.755 510.241,26.89 468.196,26.89 468.196,42.962 505.698,42.962 505.698,65.974 468.044,65.974 468.044,94.139 440.03,94.139 \t"}}),e("polygon",{attrs:{fill:"#FFFFFF",points:"36.482,166.492 36.431,166.338 27.706,133.427 22.195,133.427 13.317,166.492 12.96,166.492 12.909,166.338 5.153,133.427 0.102,133.427 10.205,172.818 15.46,172.818 24.645,139.449 25.002,139.449 25.002,139.601 34.033,172.818 39.339,172.818 49.851,133.427 44.901,133.427 36.839,166.492 \t"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M73.168,149.246c-1.021-1.633-2.347-2.96-4.031-3.98c-1.633-1.02-3.776-1.582-6.276-1.582 c-1.939,0-3.725,0.357-5.358,1.123c-1.632,0.715-3.061,1.785-4.235,3.062c-1.173,1.327-2.143,2.908-2.806,4.694 c-0.664,1.785-0.97,3.775-0.97,5.97c0.051,2.194,0.408,4.185,0.97,6.021c0.561,1.837,1.429,3.419,2.551,4.746 c1.123,1.326,2.551,2.346,4.184,3.061c1.684,0.715,3.674,1.123,5.919,1.123c3.214,0,5.919-0.816,8.011-2.398 c2.092-1.582,3.418-3.929,4.082-6.99h-4.286c-0.408,1.837-1.275,3.266-2.551,4.184c-1.275,0.919-3.01,1.43-5,1.43 c-1.582,0-2.959-0.256-4.133-0.766c-1.173-0.511-2.143-1.225-2.908-2.144c-0.765-0.867-1.327-1.888-1.633-3.062 c-0.357-1.123-0.51-2.347-0.459-3.623v-0.152h21.532c0.051-1.684-0.102-3.47-0.459-5.307 C74.903,152.664,74.189,150.878,73.168,149.246 M54.188,156.031v-0.152c0.102-1.123,0.306-2.194,0.714-3.215 c0.408-1.02,0.97-1.888,1.684-2.652c0.714-0.766,1.582-1.327,2.603-1.787c1.021-0.408,2.143-0.662,3.368-0.662 s2.296,0.203,3.316,0.662c1.021,0.46,1.888,1.021,2.602,1.735s1.327,1.633,1.735,2.653s0.714,2.092,0.766,3.215v0.152H54.188 V156.031z"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M108.987,169.655c-1.479,0-2.806-0.306-3.929-0.919c-1.072-0.611-1.99-1.428-2.653-2.397 c-0.663-1.021-1.173-2.144-1.479-3.419s-0.459-2.602-0.459-3.929c0-1.429,0.153-2.857,0.459-4.235 c0.306-1.377,0.816-2.602,1.479-3.622c0.714-1.071,1.633-1.888,2.806-2.552c1.174-0.611,2.653-0.969,4.337-0.969 c2.041,0,3.673,0.51,4.898,1.53c1.174,0.97,1.99,2.398,2.347,4.185h4.592c-0.204-1.633-0.612-3.011-1.275-4.185 c-0.714-1.225-1.582-2.245-2.653-3.062c-1.072-0.816-2.347-1.377-3.725-1.785c-1.429-0.408-2.959-0.562-4.541-0.562 c-2.245,0-4.184,0.408-5.868,1.174s-3.112,1.889-4.184,3.215c-1.123,1.378-1.939,3.011-2.5,4.848 c-0.562,1.836-0.816,3.877-0.816,6.021s0.306,4.133,0.867,5.868c0.562,1.785,1.429,3.316,2.551,4.592s2.5,2.296,4.184,2.959 c1.633,0.715,3.572,1.021,5.766,1.021c3.623,0,6.531-0.971,8.623-2.857c2.041-1.838,3.368-4.541,3.878-7.961h-4.541 c-0.306,2.195-1.123,3.93-2.449,5.154C113.222,168.992,111.334,169.655,108.987,169.655"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M135.979,145.265c-1.633,1.072-3.266,2.807-4.388,5.103l-0.051,0.103h-0.153v-6.072h-4.133v28.471h4.439 v-12.653c0-1.837,0.204-3.521,0.562-4.949c0.357-1.429,0.969-2.704,1.837-3.674c0.816-1.021,1.939-1.786,3.266-2.347 c1.326-0.511,2.908-0.766,4.745-0.816v-4.695c-0.102,0-0.204,0-0.306,0C139.5,143.735,137.561,144.246,135.979,145.265"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M166.287,149.246c-1.02-1.633-2.347-2.96-4.031-3.98c-1.633-1.02-3.776-1.582-6.276-1.582 c-1.939,0-3.725,0.357-5.357,1.123c-1.633,0.715-3.062,1.785-4.235,3.062c-1.174,1.327-2.143,2.908-2.807,4.694 c-0.663,1.785-0.969,3.775-0.969,5.97c0.051,2.194,0.408,4.185,0.969,6.021c0.562,1.837,1.429,3.419,2.551,4.746 c1.123,1.326,2.551,2.346,4.184,3.061c1.684,0.715,3.674,1.123,5.919,1.123c3.214,0,5.918-0.816,8.011-2.398 c2.092-1.582,3.418-3.929,4.082-6.99h-4.388c-0.408,1.837-1.276,3.266-2.551,4.184c-1.276,0.919-3.011,1.43-5,1.43 c-1.582,0-2.959-0.256-4.133-0.766c-1.174-0.511-2.143-1.225-2.909-2.144c-0.765-0.867-1.326-1.888-1.633-3.062 c-0.357-1.123-0.51-2.347-0.459-3.623v-0.152h21.532c0.051-1.684-0.102-3.47-0.459-5.307 C167.971,152.664,167.257,150.878,166.287,149.246 M147.307,156.031v-0.152c0.102-1.123,0.306-2.194,0.714-3.215 c0.408-1.02,0.97-1.888,1.684-2.652c0.714-0.766,1.582-1.327,2.602-1.787c1.021-0.408,2.143-0.662,3.368-0.662 s2.296,0.203,3.316,0.662c1.021,0.46,1.888,1.021,2.603,1.735s1.327,1.633,1.735,2.653s0.663,2.092,0.765,3.215v0.152h-16.787 V156.031z"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M197.514,168.736c-0.153-0.51-0.204-1.326-0.204-2.5v-14.797c0-1.633-0.306-2.959-0.918-3.979 s-1.429-1.786-2.449-2.347c-1.021-0.562-2.143-0.919-3.418-1.123c-2.857-0.408-5.766-0.357-8.368,0.204 c-1.429,0.356-2.704,0.867-3.776,1.633c-1.071,0.765-1.99,1.735-2.602,2.908c-0.612,1.174-1.021,2.603-1.071,4.286h4.439 c0.153-2.092,0.918-3.521,2.245-4.286c1.377-0.765,3.061-1.173,5.102-1.173c0.766,0,1.531,0.051,2.296,0.152 c0.765,0.102,1.479,0.357,2.092,0.664c0.612,0.356,1.174,0.867,1.582,1.479c0.408,0.664,0.612,1.531,0.612,2.604 c0,0.918-0.255,1.632-0.816,2.143c-0.51,0.459-1.276,0.867-2.194,1.071c-0.918,0.255-1.939,0.459-3.112,0.562 c-1.174,0.102-2.398,0.306-3.674,0.561c-1.225,0.205-2.398,0.511-3.572,0.816c-1.123,0.307-2.194,0.816-3.062,1.43 c-0.867,0.611-1.632,1.479-2.143,2.5c-0.562,1.02-0.816,2.347-0.816,3.928c0,1.43,0.255,2.654,0.714,3.623 c0.459,0.97,1.173,1.838,1.99,2.449c0.867,0.613,1.837,1.072,2.959,1.378c1.123,0.255,2.347,0.408,3.623,0.408 c1.99,0,3.827-0.357,5.511-1.021c1.684-0.663,3.214-1.785,4.49-3.316l0.255-0.307v0.408c0,1.48,0.357,2.603,1.021,3.266 c0.714,0.664,1.633,0.97,2.806,0.97c1.378,0,2.449-0.204,3.266-0.663v-3.367c-0.51,0.152-0.918,0.203-1.275,0.203 C198.177,169.655,197.667,169.349,197.514,168.736 M192.922,162.97c0,0.664-0.153,1.43-0.51,2.194 c-0.357,0.766-0.867,1.479-1.582,2.144c-0.714,0.663-1.633,1.225-2.755,1.633s-2.5,0.663-4.082,0.663 c-0.714,0-1.429-0.052-2.143-0.204c-0.714-0.153-1.327-0.408-1.837-0.766s-0.969-0.816-1.275-1.377 c-0.306-0.562-0.51-1.276-0.51-2.041c0-1.225,0.306-2.195,0.816-2.909c0.561-0.714,1.275-1.275,2.143-1.632 c0.867-0.357,1.837-0.664,2.908-0.816c1.021-0.154,2.092-0.307,3.214-0.46c1.072-0.153,2.092-0.306,3.011-0.511 c0.918-0.203,1.684-0.51,2.296-0.969l0.255-0.204v5.255H192.922z"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M243.895,149.246c-1.021-1.633-2.347-2.96-4.031-3.98c-1.632-1.02-3.775-1.582-6.276-1.582 c-1.939,0-3.725,0.357-5.357,1.123c-1.633,0.715-3.062,1.785-4.235,3.062c-1.174,1.327-2.143,2.908-2.755,4.694 c-0.663,1.785-0.969,3.775-0.969,5.97c0.051,2.144,0.408,4.185,0.969,6.021c0.561,1.837,1.429,3.419,2.551,4.746 c1.123,1.326,2.551,2.346,4.184,3.061c1.684,0.715,3.673,1.123,5.918,1.123c3.215,0,5.919-0.816,8.011-2.398 c2.093-1.582,3.419-3.929,4.082-6.99h-4.388c-0.408,1.837-1.275,3.266-2.551,4.184c-1.276,0.919-2.959,1.43-5,1.43 c-1.582,0-2.959-0.256-4.133-0.766c-1.174-0.511-2.143-1.225-2.909-2.144c-0.765-0.867-1.327-1.888-1.633-3.062 c-0.357-1.123-0.51-2.347-0.459-3.623v-0.152h21.533c0.051-1.684-0.103-3.47-0.46-5.307 C245.63,152.664,244.916,150.878,243.895,149.246 M225.016,156.031v-0.152c0.051-1.123,0.306-2.194,0.714-3.215 c0.408-1.02,0.969-1.888,1.684-2.652c0.714-0.766,1.582-1.327,2.602-1.787c1.021-0.408,2.143-0.662,3.368-0.662 s2.296,0.203,3.317,0.662c1.021,0.46,1.888,1.021,2.602,1.735c0.715,0.714,1.327,1.633,1.735,2.653s0.714,2.092,0.765,3.215v0.152 h-16.786V156.031z"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M279.765,169.655c-1.48,0-2.807-0.306-3.93-0.919c-1.07-0.611-1.988-1.428-2.652-2.397 s-1.174-2.144-1.48-3.419c-0.305-1.275-0.459-2.602-0.459-3.929c0-1.429,0.154-2.857,0.459-4.235 c0.307-1.377,0.816-2.602,1.48-3.622c0.715-1.071,1.633-1.888,2.807-2.552c1.174-0.611,2.652-0.969,4.336-0.969 c2.041,0,3.674,0.51,4.898,1.53c1.174,0.97,1.99,2.398,2.348,4.185h4.592c-0.203-1.633-0.611-3.011-1.275-4.185 c-0.715-1.225-1.582-2.245-2.652-3.062c-1.072-0.816-2.348-1.377-3.727-1.785c-1.428-0.408-2.959-0.562-4.541-0.562 c-2.244,0-4.184,0.408-5.867,1.174s-3.111,1.889-4.184,3.215c-1.123,1.378-1.939,3.011-2.5,4.848 c-0.562,1.836-0.816,3.877-0.816,6.021s0.307,4.082,0.867,5.868c0.561,1.785,1.428,3.316,2.551,4.592s2.5,2.296,4.184,2.959 c1.684,0.715,3.623,1.021,5.766,1.021c3.623,0,6.531-0.971,8.623-2.857c2.041-1.838,3.369-4.541,3.879-7.961h-4.695 c-0.305,2.195-1.121,3.93-2.449,5.154C283.999,168.992,282.112,169.655,279.765,169.655"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M319.614,146.643c-0.766-0.919-1.785-1.633-3.01-2.144c-1.225-0.51-2.807-0.766-4.695-0.766 c-0.816,0-1.734,0.104-2.602,0.256c-0.918,0.152-1.734,0.459-2.602,0.867c-0.816,0.408-1.582,0.867-2.195,1.48 c-0.662,0.611-1.326,1.326-1.684,2.193l-0.051,0.102h-0.203v-15.205h-4.439v39.391h4.439v-16.072c0-1.326,0.152-2.551,0.51-3.623 c0.357-1.122,0.918-2.092,1.633-2.908c0.713-0.816,1.633-1.479,2.703-1.938c1.072-0.46,2.348-0.663,3.828-0.663 c1.836,0,3.316,0.561,4.387,1.582c1.072,1.07,1.582,2.5,1.582,4.336v19.338h4.439v-18.776c0-1.53-0.152-2.959-0.459-4.235 C320.94,148.632,320.38,147.51,319.614,146.643"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M351.401,149.246c-1.02-1.633-2.346-2.96-4.029-3.98c-1.684-1.02-3.777-1.582-6.277-1.582 c-1.938,0-3.725,0.357-5.357,1.123c-1.633,0.715-3.061,1.785-4.234,3.062c-1.174,1.327-2.143,2.908-2.756,4.694 c-0.662,1.785-0.969,3.826-0.969,5.97c0.051,2.144,0.408,4.185,0.969,6.021c0.562,1.837,1.43,3.419,2.551,4.746 c1.123,1.326,2.553,2.346,4.186,3.061c1.684,0.715,3.674,1.123,5.918,1.123c3.215,0,5.918-0.816,8.012-2.398 c2.092-1.582,3.418-3.929,4.082-6.99h-4.338c-0.408,1.837-1.275,3.266-2.551,4.184c-1.275,0.919-3.012,1.43-5,1.43 c-1.582,0-2.961-0.256-4.133-0.766c-1.174-0.511-2.145-1.225-2.91-2.144c-0.764-0.867-1.326-1.888-1.633-3.062 c-0.355-1.123-0.51-2.347-0.459-3.623v-0.152h21.533c0.051-1.684-0.102-3.47-0.459-5.307 C353.087,152.664,352.372,150.878,351.401,149.246 M332.421,156.031v-0.152c0.051-1.123,0.307-2.194,0.715-3.215 c0.408-1.02,0.969-1.888,1.684-2.652c0.715-0.766,1.582-1.327,2.602-1.787c0.971-0.408,2.145-0.662,3.369-0.662 s2.295,0.203,3.316,0.662c1.02,0.46,1.887,1.021,2.602,1.735s1.326,1.633,1.734,2.653s0.664,2.092,0.766,3.215v0.152h-16.787 V156.031z"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M397.069,145.623c-0.816-0.664-1.787-1.123-2.959-1.429c-1.174-0.306-2.449-0.459-3.879-0.459 c-1.836,0-3.572,0.407-5.152,1.275c-1.531,0.816-2.807,2.041-3.725,3.571l-0.154,0.256l-0.102-0.307 c-0.562-1.734-1.582-2.959-2.959-3.674c-1.43-0.715-3.012-1.071-4.797-1.071c-3.98,0-7.246,1.633-9.338,4.847l-0.051,0.052h-0.152 v-4.235h-4.133v28.472h4.438v-17.757c0-0.561,0.154-1.275,0.408-2.143c0.307-0.867,0.766-1.684,1.379-2.449 c0.611-0.816,1.428-1.479,2.449-2.041c1.02-0.561,2.193-0.867,3.623-0.867c1.07,0,1.988,0.152,2.703,0.51 c0.715,0.307,1.275,0.766,1.684,1.378s0.715,1.276,0.867,2.093c0.154,0.765,0.256,1.633,0.256,2.602v18.726h4.439v-17.757 c0-2.244,0.664-4.081,2.041-5.459c1.377-1.377,3.266-2.041,5.613-2.041c1.172,0,2.143,0.153,2.855,0.51 c0.766,0.357,1.328,0.816,1.736,1.43c0.408,0.611,0.713,1.275,0.867,2.092c0.152,0.816,0.254,1.633,0.254,2.551v18.727h4.439 v-20.92c0-1.48-0.254-2.705-0.662-3.776C398.548,147.154,397.886,146.286,397.069,145.623"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M411.815,138.939h-4.439v-5.512h4.439V138.939z M411.815,144.398h-4.439v28.471h4.439V144.398z"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M438.296,171.593c1.123-0.714,2.092-1.633,2.807-2.755s1.072-2.552,1.072-4.286 c0-1.326-0.256-2.449-0.766-3.367s-1.225-1.684-2.092-2.245c-0.867-0.612-1.838-1.122-2.959-1.479 c-1.123-0.357-2.297-0.664-3.471-0.919c-1.123-0.255-2.244-0.511-3.316-0.765c-1.123-0.256-2.143-0.562-3.01-0.919 c-0.92-0.357-1.633-0.816-2.246-1.378c-0.611-0.561-0.918-1.275-0.918-2.143c0-0.766,0.203-1.429,0.611-1.889 c0.408-0.459,0.869-0.867,1.48-1.173c0.613-0.306,1.275-0.511,2.041-0.612c1.531-0.256,3.061-0.256,4.49,0.102 c0.766,0.153,1.48,0.459,2.143,0.816c0.664,0.357,1.174,0.867,1.633,1.531c0.408,0.612,0.664,1.377,0.715,2.245h4.439 c-0.104-1.633-0.512-3.062-1.072-4.134c-0.611-1.122-1.428-2.041-2.5-2.703c-1.02-0.664-2.244-1.174-3.572-1.43 c-1.377-0.254-2.857-0.408-4.49-0.408c-1.225,0-2.5,0.154-3.775,0.46s-2.398,0.815-3.418,1.429c-0.971,0.611-1.838,1.479-2.449,2.5 c-0.613,1.021-0.969,2.245-0.969,3.623c0,1.785,0.459,3.214,1.377,4.234s2.041,1.837,3.418,2.398 c1.379,0.561,2.908,1.021,4.49,1.326c1.633,0.307,3.164,0.664,4.541,1.072c1.43,0.408,2.604,0.918,3.521,1.53 c0.969,0.663,1.479,1.633,1.479,2.908c0,0.919-0.254,1.685-0.713,2.296c-0.459,0.613-1.021,1.072-1.736,1.378 c-0.713,0.306-1.479,0.511-2.295,0.612c-1.889,0.256-3.572,0.204-5.205-0.102c-0.918-0.205-1.734-0.511-2.5-0.919 c-0.766-0.459-1.377-1.021-1.785-1.786c-0.408-0.714-0.664-1.582-0.766-2.551h-4.439c0.102,1.684,0.459,3.112,1.072,4.286 c0.662,1.225,1.529,2.194,2.602,2.96c1.072,0.765,2.348,1.275,3.775,1.632c2.756,0.612,5.816,0.663,8.879,0.103 C435.847,172.767,437.122,172.257,438.296,171.593"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M454.114,135.775h-4.439v8.623h-4.746v3.878h4.746v18.471c0,1.327,0.152,2.397,0.408,3.163 s0.664,1.378,1.174,1.838c0.51,0.407,1.174,0.713,2.041,0.867c0.867,0.152,1.887,0.254,3.111,0.254h3.471v-3.877h-2.041 c-0.766,0-1.379-0.051-1.838-0.102c-0.51-0.052-0.867-0.205-1.172-0.408c-0.307-0.205-0.512-0.511-0.562-0.868 c-0.102-0.356-0.152-0.816-0.152-1.378v-18.012h5.918v-3.877h-5.918V135.775z"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M211.24,135.775H206.8v8.623h-4.745v3.878h4.745v18.471c0,1.327,0.153,2.397,0.408,3.163 c0.255,0.766,0.612,1.378,1.174,1.838c0.51,0.407,1.173,0.713,2.041,0.867c0.867,0.152,1.888,0.254,3.112,0.254h3.47v-3.877h-2.041 c-0.766,0-1.378-0.051-1.837-0.102c-0.51-0.052-0.868-0.205-1.174-0.408c-0.306-0.205-0.459-0.511-0.561-0.868 c-0.102-0.356-0.153-0.816-0.153-1.378v-18.012h5.919v-3.877h-5.918V135.775z"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M471.003,150.725l-0.051,0.051h-0.154v-6.378h-4.133v28.471h4.439v-12.296c0-1.837,0.205-3.521,0.562-4.95 c0.355-1.428,0.969-2.703,1.785-3.725c0.816-1.02,1.939-1.785,3.266-2.347c1.326-0.511,2.908-0.765,4.744-0.765v-4.695 c-2.449-0.051-4.49,0.459-6.121,1.531C473.759,146.694,472.126,148.429,471.003,150.725"}}),e("path",{attrs:{fill:"#FFFFFF",d:"M496.106,180.267c0.51-0.969,1.072-2.143,1.633-3.57l12.449-32.35h-4.693l-8.062,23.521h-0.305 l-0.053-0.102l-8.367-23.42h-5l11.326,28.42v0.051l-1.938,4.848c-0.459,0.867-1.021,1.582-1.582,1.99 c-0.613,0.459-1.43,0.715-2.449,0.715c-0.51,0-0.969-0.104-1.48-0.256c-0.408-0.102-0.766-0.255-1.174-0.357v4.031 c0.461,0.152,0.971,0.307,1.48,0.357c0.561,0.051,1.123,0.102,1.633,0.102c1.072,0,1.99-0.152,2.756-0.408 c0.766-0.255,1.479-0.715,2.092-1.326C494.983,182.002,495.597,181.186,496.106,180.267"}})])])])},o=[],i={name:"icon-logo",data:function(){return{}}},l=i,u=e("2877"),h=Object(u["a"])(l,s,o,!1,null,"3d9318bd",null),d=h.exports,p=function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("div",{staticClass:"menu-minibasket"},[e("v-btn",{attrs:{fab:"",small:"",color:"secondary"},on:{click:function(c){return t.openMiniBasket()}}},[e("v-badge",{attrs:{color:"secondary",left:""},scopedSlots:t._u([{key:"badge",fn:function(){return[e("span",[t._v(t._s(t.shoppingCartCount))])]},proxy:!0}]),model:{value:t.showBadge,callback:function(c){t.showBadge=c},expression:"showBadge"}},[e("v-icon",[t._v("shopping_cart")])],1)],1),e("v-card",{class:t.miniBasketClass,staticStyle:{"animation-duration":"0.25s"},attrs:{id:"minibasket",light:""}},[e("div",[e("h2",[e("v-icon",[t._v("shopping_cart")]),t._v(" "+t._s(t.$t("basket.title"))+" "),e("v-btn",{attrs:{icon:""},on:{click:function(c){return t.closeMiniBasket()}}},[e("v-icon",{staticClass:"material-icons-outlined"},[t._v("close")])],1)],1),t._l(t.shoppingCart,(function(c,a){return e("ul",{key:a},[e("li",[e("div",{staticClass:"item added product"},[e("span",[e("router-link",{attrs:{to:{name:"Product",params:c.uuid}}},[e("icon-additives",{attrs:{"bg-color-class":"default"}}),e("b",[t._v(t._s(c.title))])],1),e("div",{staticClass:"select small closed"},[e("v-select",{attrs:{items:c.variationsItem,label:t.$t("basket.productWeight"),height:"18","hide-details":"",outlined:"",dense:"",solo:""},model:{value:c.selectVariation,callback:function(e){t.$set(c,"selectVariation",e)},expression:"product.selectVariation"}})],1)],1),e("span",[e("v-btn",{attrs:{icon:""},on:{click:function(e){return t.removeShoppingCart(c.uuid)}}},[e("v-icon",{staticClass:"material-icons-outlined"},[t._v("delete")])],1)],1)])])])})),e("v-btn",{staticClass:"white--text",attrs:{block:"",color:"grey"},on:{click:function(c){return t.clearShoppingCart()}}},[t._v(" "+t._s(t.$t("basket.clearBasket"))+" "),e("v-icon",{staticClass:"material-icons-outlined",attrs:{right:""}},[t._v(" delete ")])],1),e("v-btn",{attrs:{block:"",color:"primary"},on:{click:function(c){return t.sampleOrder()}}},[t._v(" "+t._s(t.$t("basket.seeOrder"))+" "),t.isLogin?[e("v-icon",{staticClass:"material-icons-outlined",attrs:{right:""}},[t._v(" check ")])]:[e("v-icon",{staticClass:"material-icons-outlined",attrs:{right:""}},[t._v(" clock ")])]],2)],2)])],1)},v=[],f=e("2f0c");function b(t,c){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);c&&(a=a.filter((function(c){return Object.getOwnPropertyDescriptor(t,c).enumerable}))),e.push.apply(e,a)}return e}function m(t){for(var c=1;c<arguments.length;c++){var e=null!=arguments[c]?arguments[c]:{};c%2?b(e,!0).forEach((function(c){g(t,c,e[c])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):b(e).forEach((function(c){Object.defineProperty(t,c,Object.getOwnPropertyDescriptor(e,c))}))}return t}function g(t,c,e){return c in t?Object.defineProperty(t,c,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[c]=e,t}var F={name:"basket",components:{IconAdditives:f["a"]},data:function(){return{miniBasketClass:"hiddenBasket",showShoppingCart:!1,showBadge:!0}},computed:m({},Object(r["b"])({shoppingCartCount:function(t){return t.basket.shoppingCartCount},shoppingCart:function(t){return t.basket.shoppingCart},isLogin:function(t){return t.user.isLogin}})),watch:{shoppingCartCount:function(t,c){t&&this.openMiniBasket()}},created:function(){this.$store.commit("initComputedShoppingCart")},methods:{closeMiniBasket:function(){var t=this;this.miniBasketClass="fadeDown-leave-active",setTimeout((function(){t.miniBasketClass="hiddenBasket"}),1e3)},openMiniBasket:function(){this.miniBasketClass="fadeDown-enter-active"},clearShoppingCart:function(){this.$store.commit("clearShoppingCart")},sampleOrder:function(){var t=this;t.isLogin?this.$router.push({path:"/sample-order",query:{step:"sampleOrder"}}):this.$store.commit("open_login_dialog")},removeShoppingCart:function(t){this.$store.dispatch("removeShoppingCart",t)}}},k=F,y=(e("2493"),Object(u["a"])(k,p,v,!1,null,"37367c4f",null)),C=y.exports,_=function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("ul",{staticClass:"main-menu"},[t._l(t.menuLinks,(function(c,a){return[c.dialog?[e("li",{key:a},[e("v-btn",t._g({attrs:{color:"primary",dark:"",icon:""},on:{click:function(e){return t.headerMenuClick(e,c)}}},t.on),[e("v-icon",{staticClass:"material-icons-outlined",attrs:{left:""}},[t._v(t._s(c.options.icon))]),t._v(" "+t._s(c.title)+" ")],1)],1)]:c.below?[e("li",{key:a,staticClass:"below-menu"},[e("v-btn",t._g({attrs:{color:"primary",dark:"",icon:""}},t.on),[e("v-icon",{staticClass:"material-icons-outlined",attrs:{left:""}},[t._v(t._s(c.options.icon))]),t._v(" "+t._s(c.title)+" ")],1),e("div",{staticClass:"sub-menu"},[e("sub-menu",{attrs:{below:c.below}})],1)],1)]:[e("li",{key:a},[e("v-btn",t._g({attrs:{color:"primary",dark:"",icon:""},on:{click:function(e){return t.headerMenuClick(e,c)}}},t.on),[e("v-icon",{staticClass:"material-icons-outlined",attrs:{left:""}},[t._v(t._s(c.options.icon))]),t._v(" "+t._s(c.title)+" ")],1)],1)]]}))],2)},O=[],S=function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("ul",t._l(t.below,(function(c,a){return e("li",{key:a},["applacation"===c.vid?[e("router-link",{attrs:{to:{path:"/industry",query:{industry:c.tid}}}},[t._v(" "+t._s(c.name)+" ")])]:[e("router-link",{attrs:{to:{path:"/products",query:{product_type:c.tid}}}},[t._v(" "+t._s(c.name)+" ")])],c.children.length?[e("span",{staticClass:"glyphicon glyphicon-play"},[e("v-icon",[t._v("play_arrow")])],1),e("sub-menu",{attrs:{below:c.children}})]:t._e()],2)})),0)},w=[],M={name:"sub-menu",props:{below:{type:Object}}},j=M,P=(e("a50a"),Object(u["a"])(j,S,w,!1,null,"7671ba52",null)),x=P.exports;function L(t,c){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);c&&(a=a.filter((function(c){return Object.getOwnPropertyDescriptor(t,c).enumerable}))),e.push.apply(e,a)}return e}function $(t){for(var c=1;c<arguments.length;c++){var e=null!=arguments[c]?arguments[c]:{};c%2?L(e,!0).forEach((function(c){z(t,c,e[c])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):L(e).forEach((function(c){Object.defineProperty(t,c,Object.getOwnPropertyDescriptor(e,c))}))}return t}function z(t,c,e){return c in t?Object.defineProperty(t,c,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[c]=e,t}var B={name:"menu-links",components:{SubMenu:x},computed:$({},Object(r["b"])({menuLinks:function(t){return t.core.menuItems},isLogin:function(t){return t.user.isLogin},loginStatus:function(t){return t.core.loginStatus},globalSearchResult:function(t){return t.search.searchResult}})),mounted:function(){},methods:{headerMenuClick:function(t,c){t.stopPropagation(),c.dialog?this.$store.state.core.requestDialog=!0:"base:sample-order"!==c.uri||this.isLogin?!c.to&&c.relative&&(window.location.href=c.relative):this.$store.commit("open_login_dialog")}}},D=B,V=(e("6e66"),Object(u["a"])(D,_,O,!1,null,"60f0ca4e",null)),G=V.exports,E=e("77b9"),R=e("f3e4"),H=e("c5e1"),W=e.n(H);function K(t,c){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);c&&(a=a.filter((function(c){return Object.getOwnPropertyDescriptor(t,c).enumerable}))),e.push.apply(e,a)}return e}function I(t){for(var c=1;c<arguments.length;c++){var e=null!=arguments[c]?arguments[c]:{};c%2?K(e,!0).forEach((function(c){T(t,c,e[c])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):K(e).forEach((function(c){Object.defineProperty(t,c,Object.getOwnPropertyDescriptor(e,c))}))}return t}function T(t,c,e){return c in t?Object.defineProperty(t,c,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[c]=e,t}var q={components:{Logo:d,Basket:C,MenuLinks:G},data:function(){return{globalSearchLoading:!1,globalSearchKeyWord:"",headerMenuClass:"header-main-menu",searchGlobalClass:"search d-none hidden"}},computed:I({},Object(r["b"])({menuLinks:function(t){return t.core.menuItems},isLogin:function(t){return t.user.isLogin},loginStatus:function(t){return t.core.loginStatus},globalSearchResult:function(t){return t.search.searchResult}}),{language:function(){return Object(R["b"])("drupal:session:language")||"zh-hans"}}),mounted:function(){var t=this;t.clearSearchResult(),"Home"!==t.$router.history.current.name&&W()("body").click((function(c){"router-link-exact-active router-link-active"!==W()(c.target).attr("class")&&"v-icon notranslate material-icons theme--dark"!==W()(c.target).attr("class")&&"smartSearch"!==W()(c.target).attr("class")&&"mx-2 v-btn v-btn--contained v-btn--fab v-btn--round theme--dark v-size--small secondary"!==W()(c.target).attr("class")&&t.closeGlobalSearch()}))},methods:{switchLanguage:function(t){var c=this,e={};"zh-hans"===t?e={language:"en"}:"en"===t&&(e={language:"zh-hans"}),c.$store.commit("switch_Language",e),window.location.reload()},openGlobalSearch:function(){if("Home"===this.$router.history.current.name){this.$store.commit("changeSearchFocus");var t=W()(".search-content").offset().top/2+50;this.scrollTop(t),W()(".search-content").find("input").focus()}else console.log("searchGlobalClasssearchGlobalClass"),this.headerMenuClass="header-main-menu d-none",this.searchGlobalClass="search fadeRight-enter-active",setTimeout((function(){W()("#smartSearch").focus()}),1e3)},scrollTop:function(t){window.scrollTo({top:t,left:0,behavior:"smooth"})},flushCom:function(){this.$router.go(0)},closeGlobalSearch:function(){this.headerMenuClass="header-main-menu",this.searchGlobalClass="search hidden fadeRight-leave-active"},openLoginSheet:function(){this.$store.state.core.loginStatus=!this.$store.state.core.loginStatus},debounceGlobalSearch:Object(E["a"])((function(t){var c=t.vm;c.globalSearchKeyWord?(c.globalSearchLoading=!0,c.$store.dispatch("productSearch",c.globalSearchKeyWord).then((function(t){c.globalSearchLoading=!1,W()("#search-result").removeClass("hidden")}))):c.clearSearchResult()}),300),globalSearch:function(){var t=this;t.debounceGlobalSearch({vm:t})},clearSearchResult:function(){this.$store.commit("clearSearchResult"),W()("#search-result").addClass("hidden")}}},J=q,N=(e("46d9"),Object(u["a"])(J,a,n,!1,null,null,null));c["default"]=N.exports},e7ac:function(t,c,e){}}]);
//# sourceMappingURL=chunk-41b95406.6c7460c5.js.map