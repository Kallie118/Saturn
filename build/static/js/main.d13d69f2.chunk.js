(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{31:function(e,a,t){e.exports=t(59)},59:function(e,a,t){"use strict";t.r(a);var r=t(0),l=t.n(r),n=t(28),c=t.n(n),s=t(5),o=t(6),m=t(8),i=t(7),u=t(9),d=t(14),b=t(11),E=(t(36),function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(m.a)(this,Object(i.a)(a).call(this,e))).handleRegister=function(){console.log("Clicked Register Button"),t.dUsername.current.value.length>20?t.setState({error:"Your username can not exceed 20 characters."}):t.dUsername.current.value.length<3?t.setState({error:"Your username can not be less then 3 characters."}):/^[a-zA-Z0-9]+$/.test(t.dUsername.value)?t.setState({error:""}):t.setState({error:"Username can only contain letters and numbers."})},t.dUsername=l.a.createRef(),t.dEmail=l.a.createRef(),t.dPassword=l.a.createRef(),t.dCPassword=l.a.createRef(),t.state={error:""},t}return Object(u.a)(a,e),Object(o.a)(a,[{key:"redAlert",value:function(){return""!==this.state.error?l.a.createElement("div",{className:"alert alert-dismissible alert-danger"},l.a.createElement("strong",null,"Oh snap!")," ",this.state.error):l.a.createElement("p",null)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement("ol",{className:"breadcrumb"},l.a.createElement("li",{className:"breadcrumb-item"},l.a.createElement("a",{href:"/"},"Home")),l.a.createElement("li",{className:"breadcrumb-item active"},"Register")),l.a.createElement("div",{className:"col-sm"},l.a.createElement("br",null),"  ",l.a.createElement("br",null),l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"jumbotron"},l.a.createElement("h1",null,"Make a new account. "),this.redAlert(),l.a.createElement("label",{className:"col-form-label",htmlFor:"username"},"Username"),l.a.createElement("input",{type:"text",ref:this.dUsername,className:"form-control",placeholder:"Username",id:"username"}),l.a.createElement("label",{className:"col-form-label",htmlFor:"email"},"Email"),l.a.createElement("input",{type:"text",ref:this.dEmail,className:"form-control",placeholder:"JohnDoe@gmail.com",id:"email"}),l.a.createElement("label",{className:"col-form-label",htmlFor:"pass"},"Password"),l.a.createElement("input",{type:"text",ref:this.dPassword,className:"form-control",placeholder:"Password",id:"pass"}),l.a.createElement("label",{className:"col-form-label",htmlFor:"cpass"},"Confirm Password"),l.a.createElement("input",{type:"text",ref:this.dCPassword,className:"form-control",placeholder:"Confirm Password",id:"cpass"})," ",l.a.createElement("br",null),l.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:function(){e.handleRegister()}},"Register")," ",l.a.createElement("br",null)))))}}]),a}(l.a.Component)),h=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(m.a)(this,Object(i.a)(a).call(this,e))).state={},t}return Object(u.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("ol",{class:"breadcrumb"},l.a.createElement("li",{class:"breadcrumb-item active"},"Home")),l.a.createElement("div",{className:"row login"},l.a.createElement("div",{className:"col-md-7 login-splash"}),l.a.createElement("div",{className:"col-md-4 login-holder"},l.a.createElement("div",{class:"card card-center text-white bg-primary mb-3 fullLength"},l.a.createElement("div",{class:"card-header text-center"},"Login"),l.a.createElement("div",{class:"card-body"},l.a.createElement("div",{class:"form-group"},l.a.createElement("label",{class:"col-form-label",for:"inputDefault"},"Username"),l.a.createElement("input",{type:"text",class:"form-control",placeholder:"Username",id:"inputDefault"}),l.a.createElement("label",{class:"col-form-label",for:"inputDefault"},"Password"),l.a.createElement("input",{type:"password",class:"form-control",placeholder:"Password",id:"inputDefault"})," ",l.a.createElement("br",null),l.a.createElement("button",{type:"button",class:"btn btn-secondary btn-white"},"Login")," \xa0"))),l.a.createElement("div",{className:"text-center"},l.a.createElement("small",null,"Don't have an account? ",l.a.createElement("a",{href:"/register"},l.a.createElement("b",null,"Register")))))))}}]),a}(l.a.Component),v=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(m.a)(this,Object(i.a)(a).call(this,e))).state={},t}return Object(u.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return l.a.createElement(d.a,null,l.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},l.a.createElement("a",{className:"navbar-brand",href:"/"},l.a.createElement("img",{src:"images/logo.png",alt:"Brand Logo",height:"40px"})," ",l.a.createElement("b",null,"Saturn")),l.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarColor03","aria-controls":"navbarColor03","aria-expanded":"false","aria-label":"Toggle navigation"},l.a.createElement("span",{className:"navbar-toggler-icon"})),l.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarColor03"},l.a.createElement("ul",{className:"navbar-nav mr-auto"},l.a.createElement("li",{className:"nav-item"},l.a.createElement(d.b,{to:"/",className:"nav-link"},"Home")),l.a.createElement("li",{className:"nav-item"},l.a.createElement(d.b,{to:"/register",className:"nav-link"},"Register"))))),l.a.createElement(b.c,null,l.a.createElement(b.a,{path:"/register",component:E}),l.a.createElement(b.a,{path:"/",component:h})))}}]),a}(l.a.Component),p=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(m.a)(this,Object(i.a)(a).call(this,e))).state={},t}return Object(u.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"blank-div"}),l.a.createElement("div",{className:"text-center footer fixed-bottom my-auto",style:{clear:"both",float:"none",size:"0.3vh"}},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col my-auto"},l.a.createElement("p",null,l.a.createElement("small",null,"This is a demonstration of using a backend (express.js) to work with a front end(React.js)"))),l.a.createElement("div",{className:"col my-auto"},l.a.createElement("p",null,l.a.createElement("small",null,"Copyright \xa9 2019 Caleb Hinton"))))))}}]),a}(l.a.Component),f=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(m.a)(this,Object(i.a)(a).call(this,e))).state={},t}return Object(u.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(v,null),l.a.createElement(p,null))}}]),a}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[31,1,2]]]);
//# sourceMappingURL=main.d13d69f2.chunk.js.map