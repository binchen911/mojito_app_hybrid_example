YUI.add("model-sync-rest",function(c){var a=c.Lang;function b(){}b.CSRF_TOKEN=YUI.Env.CSRF_TOKEN;b.EMULATE_HTTP=false;b.HTTP_HEADERS={"Accept":"application/json","Content-Type":"application/json"};b.HTTP_METHODS={"create":"POST","read":"GET","update":"PUT","delete":"DELETE"};b.HTTP_TIMEOUT=30000;b._NON_ATTRS_CFG=["root","url"];b.prototype={root:"",url:"",initializer:function(d){d||(d={});if("root" in d){this.root=d.root||"";}if("url" in d){this.url=d.url||"";}},getURL:function(g,f){var d=this.root,e=this.url;if(this._isYUIModelList){if(!e){return this.model.prototype.root;}return this._substituteURL(e,c.merge(this.getAttrs(),f));}if(d&&(g==="create"||this.isNew())){return d;}if(!e){return this._joinURL(this.getAsURL("id")||"");}return this._substituteURL(e,c.merge(this.getAttrs(),f));},serialize:function(){return c.JSON.stringify(this);},sync:function(g,l,k){l||(l={});var e=this.getURL(g,l),d=b.HTTP_METHODS[g],f=c.merge(b.HTTP_HEADERS,l.headers),j=l.timeout||b.HTTP_TIMEOUT,i=l.csrfToken||b.CSRF_TOKEN,h;if(d==="POST"||d==="PUT"){h=this.serialize();}else{delete f["Content-Type"];}if(b.EMULATE_HTTP&&(d==="PUT"||d==="DELETE")){f["X-HTTP-Method-Override"]=d;d="POST";}if(i&&(d==="POST"||d==="PUT"||d==="DELETE")){f["X-CSRF-Token"]=i;}this._sendSyncIORequest({action:g,callback:k,entity:h,headers:f,method:d,timeout:j,url:e});},_joinURL:function(e){var d=this.root;if(!(d||e)){return"";}if(e.charAt(0)==="/"){e=e.substring(1);}return d&&d.charAt(d.length-1)==="/"?d+e+"/":d+"/"+e;},_sendSyncIORequest:function(d){return c.io(d.url,{"arguments":{action:d.action,callback:d.callback,url:d.url},context:this,data:d.entity,headers:d.headers,method:d.method,timeout:d.timeout,on:{start:this._onSyncIOStart,failure:this._onSyncIOFailure,success:this._onSyncIOSuccess,end:this._onSyncIOEnd}});},_substituteURL:function(e,f){if(!e){return"";}var d={};c.Object.each(f,function(h,g){if(a.isString(h)||a.isNumber(h)){d[g]=encodeURIComponent(h);}});return a.sub(e,d);},_onSyncIOEnd:function(e,d){},_onSyncIOFailure:function(f,e,d){var g=d.callback;if(a.isFunction(g)){g({code:e.status,msg:e.statusText},e.responseText);}},_onSyncIOSuccess:function(f,e,d){var g=d.callback;if(a.isFunction(g)){g(null,e.responseText);}},_onSyncIOStart:function(e,d){}};c.namespace("ModelSync").REST=b;},"@VERSION@",{requires:["model","io-base","json-stringify"]});
