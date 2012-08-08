YUI.add("sortable",function(a){var c=function(l){c.superclass.constructor.apply(this,arguments);},f="currentNode",d="opacityNode",i="container",e="id",j="zIndex",k="opacity",h="parentNode",g="nodes",b="node";a.extend(c,a.Base,{delegate:null,drop:null,initializer:function(){var n="sortable-"+a.guid(),m={container:this.get(i),nodes:this.get(g),target:true,invalid:this.get("invalid"),dragConfig:{groups:[n]}},l;if(this.get("handles")){m.handles=this.get("handles");}l=new a.DD.Delegate(m);this.set(e,n);l.dd.plug(a.Plugin.DDProxy,{moveOnEnd:false,cloneNode:true});this.drop=new a.DD.Drop({node:this.get(i),bubbleTarget:l,groups:l.dd.get("groups")});this.drop.on("drop:over",a.bind(this._onDropOver,this));l.on({"drag:start":a.bind(this._onDragStart,this),"drag:end":a.bind(this._onDragEnd,this),"drag:over":a.bind(this._onDragOver,this),"drag:drag":a.bind(this._onDrag,this)});this.delegate=l;c.reg(this);},_up:null,_y:null,_onDrag:function(l){if(l.pageY<this._y){this._up=true;}else{if(l.pageY>this._y){this._up=false;}}this._y=l.pageY;},_onDropOver:function(m){if(!m.drop.get(b).test(this.get(g))){var l=m.drop.get(b).all(this.get(g));m.drop.get(b).append(m.drag.get(b));}},_onDragOver:function(r){if(!r.drop.get(b).test(this.get(g))){return;}if(r.drag.get(b)==r.drop.get(b)){return;}if(r.drag.get(b).contains(r.drop.get(b))){return;}var s=false,m,q,o,n,l,p=this.get("moveType").toLowerCase();if(r.drag.get(b).get(h).contains(r.drop.get(b))){s=true;}if(s&&p=="move"){p="insert";}switch(p){case"insert":m=((this._up)?"before":"after");l=r.drop.get(b);if(a.Sortable._test(l,this.get(i))){l.append(r.drag.get(b));}else{l.insert(r.drag.get(b),m);}break;case"swap":a.DD.DDM.swapNode(r.drag,r.drop);break;case"move":case"copy":n=a.Sortable.getSortable(r.drop.get(b).get(h));if(!n){return;}a.DD.DDM.getDrop(r.drag.get(b)).addToGroup(n.get(e));if(s){a.DD.DDM.swapNode(r.drag,r.drop);}else{if(this.get("moveType")=="copy"){q=r.drag.get(b);o=q.cloneNode(true);o.set(e,"");r.drag.set(b,o);n.delegate.createDrop(o,[n.get(e)]);q.setStyles({top:"",left:""});}r.drop.get(b).insert(r.drag.get(b),"before");}break;}this.fire(p,{same:s,drag:r.drag,drop:r.drop});this.fire("moved",{same:s,drag:r.drag,drop:r.drop});},_onDragStart:function(n){var l=this.delegate,m=l.get("lastNode");if(m&&m.getDOMNode()){m.setStyle(j,"");}l.get(this.get(d)).setStyle(k,this.get(k));l.get(f).setStyle(j,"999");},_onDragEnd:function(l){this.delegate.get(this.get(d)).setStyle(k,1);this.delegate.get(f).setStyles({top:"",left:""});this.sync();},plug:function(l,m){if(l&&l.NAME.substring(0,4).toLowerCase()==="sort"){this.constructor.superclass.plug.call(this,l,m);}else{this.delegate.dd.plug(l,m);}return this;},sync:function(){this.delegate.syncTargets();return this;},destructor:function(){this.drop.destroy();this.delegate.destroy();c.unreg(this);},join:function(m,l){if(!(m instanceof a.Sortable)){a.error("Sortable: join needs a Sortable Instance");return this;}if(!l){l="full";}l=l.toLowerCase();var n="_join_"+l;if(this[n]){this[n](m);}return this;},_join_none:function(l){this.delegate.dd.removeFromGroup(l.get(e));l.delegate.dd.removeFromGroup(this.get(e));},_join_full:function(l){this.delegate.dd.addToGroup(l.get(e));l.delegate.dd.addToGroup(this.get(e));},_join_outer:function(l){this.delegate.dd.addToGroup(l.get(e));},_join_inner:function(l){l.delegate.dd.addToGroup(this.get(e));},getOrdering:function(m){var l=[];if(!a.Lang.isFunction(m)){m=function(n){return n;};}a.one(this.get(i)).all(this.get(g)).each(function(n){l.push(m(n));});return l;}},{NAME:"sortable",ATTRS:{handles:{value:false},container:{value:"body"},nodes:{value:".dd-draggable"},opacity:{value:".75"},opacityNode:{value:"currentNode"},id:{value:null},moveType:{value:"insert"},invalid:{value:""}},_sortables:[],_test:function(l,m){if(m instanceof a.Node){return(m===l);}else{return l.test(m);}},getSortable:function(m){var l=null;m=a.one(m);a.each(a.Sortable._sortables,function(n){if(a.Sortable._test(m,n.get(i))){l=n;}});return l;},reg:function(l){a.Sortable._sortables.push(l);},unreg:function(l){a.each(a.Sortable._sortables,function(n,m){if(n===l){a.Sortable._sortables[m]=null;delete c._sortables[m];}});}});a.Sortable=c;},"@VERSION@",{requires:["dd-delegate","dd-drop-plugin","dd-proxy"]});
