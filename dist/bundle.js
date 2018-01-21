!function(t){function e(i){if(a[i])return a[i].exports;var s=a[i]={i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var a={};e.m=t,e.c=a,e.d=function(t,a,i){e.o(t,a)||Object.defineProperty(t,a,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,a){"use strict";function i(t){k=t,(p=new l.a).setLevel(t),m.a.drawTextCenter("Level "+t),x=p.getMap(),C=new u.a,(v=new c.a).health=30/(E/1.2*2)+10,console.log(v.health),y.a.updateUI(v,C),B=[],M&&m.a.drawEndTile(32*p.endTileCords.x+16,32*p.endTileCords.y+16),setTimeout(r,700)}function s(t){p.removeFromWorld(t.x,t.y),setTimeout(()=>{for(let e=0;e<B.length;e++)B[e].id===t.id&&B.splice(e,1)},300)}function r(){y.a.updateUI(v,C),p.updateUnit(v),function(){function t(t){let e=P[(new t).name+"s"];const a=e*=Math.round(Math.pow(E,p.currentLevel));for(let e=0;e<a;e++){let e=p.getUniqueMapCords();const a=new t(32*e.x,32*e.y);B.push(a),p.updateUnit(a)}}t(h.a),t(A.a),t(w.a)}(),T.updateEnemies(B),b.addListeners(),C.addNextTurnAction(o),m.a.drawUnit(v)}function n(){m.a.clear(),m.a.drawTerrain(p,x),m.a.drawCircle(32*p.endTileCords.x+16,32*p.endTileCords.y+16,16,"blue"),m.a.drawEnemies(B),m.a.drawUnit(v),b.updateContext(x,v),m.a.drawLightAroundPlayer(v),y.a.updateUI(v,C)}function o(){v.x===32*p.endTileCords.x&&v.y===32*p.endTileCords.y&&i(p.currentLevel+1),v.avaiableMoves=3,v.avaiableAttacks=3,v.mana<10&&v.mana++,T.updateEnemies(B),T.moveEnemiesToPlayer(v),setTimeout(()=>T.moveEnemiesToPlayer(v),600),setTimeout(()=>{T.moveEnemiesToPlayer(v),B.forEach(t=>{t.avaiableAttacks=1,t.freezed=!1})},1200),v.health<=0&&(setTimeout(()=>v.frame=3,300),setTimeout(()=>v.frame=4,600),setTimeout(()=>{confirm("You have died. Try again."),window.location.reload()},1e3))}Object.defineProperty(e,"__esModule",{value:!0}),a.d(e,"destroyEnemy",function(){return s}),a.d(e,"world",function(){return p}),a.d(e,"player",function(){return v});var l=a(6),c=a(5),h=a(8),A=a(9),d=a(10),m=a(2),u=a(11),f=a(12),y=a(15),g=a(3),w=a(16);let p,x,C,v,B,k,E=1.2,M=!0;const T=new d.a,b=new f.a,P={Goblins:3,Imps:3,"Orc Archers":3};window.setDifficulty=(t=>{E=1.2*t/2,document.querySelector(".difficulty").style.display="none",i(1),g.a.start(n)}),window.setSpell=((t,e)=>{v.spell=t,document.querySelectorAll(".spell").forEach(t=>{t.style.border="2px solid #562403"}),e.style.border="2px solid #5b86e5"}),window.restartLevel=function(){i(k)},document.addEventListener("keydown",t=>{const e=t.keyCode;v.avaiableMoves>0&&function(t){37===t||65===t?v.moveLeft():39===t||68===t?v.moveRight():38===t||87===t?v.moveUp():40!==t&&83!==t||v.moveDown()}(e)}),document.addEventListener("keydown",t=>{const e=t.keyCode;13!==e&&70!==e||C.nextTurn()})},function(t,e,a){"use strict";var i=a(2),s=a(0),r=a(3);let n=0;e.a=class{constructor(){this.id=n++,this.avaiableMoves=1,this.avaiableAttacks=1,this.frame=1,this.isMoving=!1,this.tick=10}moveUp(){s.world.isCollidingUp(this)||(this.updateLastPosition(),this.y-=32,this.afterMove())}moveDown(){s.world.isCollidingDown(this)||(this.updateLastPosition(),this.y+=32,this.afterMove())}moveLeft(){s.world.isCollidingLeft(this)||(this.updateLastPosition(),this.x-=32,this.frame=-1,this.afterMove())}moveRight(){s.world.isCollidingRight(this)||(this.updateLastPosition(),this.x+=32,this.frame=1,this.afterMove())}afterMove(){this.isMoving=!0,s.world.updateUnit(this),i.a.drawUnit(this),setTimeout(()=>this.isMoving=!1,400),this.avaiableMoves--}updateLastPosition(){this.lastY=this.y,this.lastX=this.x}revertMove(){this.x=this.lastX,this.y=this.lastY}takeDamage(t){this.health-=t,r.a.addAnimation(()=>i.a.drawBlood(this.lastX+16,this.lastY+16),300),setTimeout(i.a.clearBloodParticles,300)}}},function(t,e,a){"use strict";function i(t){const e=new Image;return e.src=t,e}var s=a(4),r=a(3),n=a(7),o=a.n(n);const l=document.getElementById("game"),c=l.getContext("2d"),h=32,A={wizard:11,goblin:5,imp:7,"orc archer":15,rock:3,rock2:4,forest:1,forest2:2};let d=[];class m{static clear(){c.clearRect(0,0,l.width,l.height)}static drawImage(t,e,a){c.drawImage(i(o.a),A[t]*h-h,0,h,h,e,a,h,h)}static drawUnit(t){t.lastX!==t.x?t.lastX>t.x?t.lastX-=1:t.lastX+=1:t.lastY!==t.y&&(t.lastY>t.y?t.lastY-=1:t.lastY+=1),t.tick>10&&!0===t.isMoving?(-1===t.frame||-2===t.frame?-1===t.frame?t.frame=-2:t.frame=-1:1!==t.frame&&2!==t.frame||(1===t.frame?t.frame=2:t.frame=1),t.tick=0):t.tick++,c.save();let e=t.lastX,a=t.lastY;-3===t.frame?(c.scale(1,-1),a=-a-h):t.frame<0?(c.scale(-1,1),e=-e-h):c.scale(1,1),c.drawImage(i(o.a),A[t.name.toLowerCase()]*h-h+Math.abs(t.frame)*h-h,0,h,h,e,a,h,h),c.restore()}static drawEnemies(t){t.forEach(t=>{m.drawUnit(t),t.freezed&&m.drawLine(t.x,t.y+h,t.x+h,t.y+h,"#5b86e5",5)})}static drawTerrain(t,e){t.terrainCords.forEach(a=>{m.drawImage(t.mapData[e[a.y][a.x]-1],a.x*h,a.y*h)})}static drawLightAroundPlayer(t){c.save(),c.beginPath(),c.lineWidth=1e3,c.strokeStyle="rgba(0,0,0,.96)",c.filter="blur(50px)",c.arc(t.lastX+16,t.lastY+16,700,0,2*Math.PI),c.stroke(),c.restore()}static drawLine(t,e,a,i,s,r=2){c.beginPath(),c.moveTo(t,e),c.lineTo(a,i),c.lineWidth=r,c.strokeStyle=s,c.stroke(),c.closePath()}static drawCircle(t,e,a,i,s=2){c.beginPath(),c.arc(t,e,a,0,2*Math.PI),c.lineWidth=s,c.strokeStyle=i,c.stroke(),c.closePath()}static drawHit(t,e){let a=0;r.a.addAnimation(()=>{c.beginPath(),c.fillStyle="rgba(116, 193, 246, 0.86)",c.moveTo(26+t,11+e),c.bezierCurveTo(6+t,12+e,28+t,37+e,21+t,29+e),c.bezierCurveTo(20+t,28+e,-7+t,8+e,25+t-a++,9+e),c.fill(),c.closePath()},50)}static drawStickAttack(t,e,a,i){let s=0;r.a.addAnimation(()=>{c.lineWidth=2;let r=t.frame<0?6:24;m.drawLine(t.x+r,t.y+3,e+16,a+16,i),c.strokeStyle=i,m.drawCircle(e+16,a+16,6+s,i),m.drawCircle(e+16,a+16,4+s/2,i),m.drawBlood(e+16,a+16),s+=.5},200)}static clearBloodParticles(){d=[]}static drawBlood(t,e){d.push(new function(t,e,a,i,s,r){this.position={x:t,y:e},this.size=a,this.velocity={x:i,y:s},this.decayRate=r}(t,e,5*Math.random(),s.a.range(-10,10),s.a.range(-5,5),Math.random()));for(let t=0;t<d.length;t++)c.fillStyle="rgba(255,0,0,"+d[t].decayRate+")",c.fillRect(d[t].position.x,d[t].position.y,d[t].size,d[t].size),d[t].position.x+=d[t].velocity.x,d[t].position.y+=d[t].velocity.y,d[t].velocity.x*=.18,d[t].velocity.y*=.38,d[t].velocity.y+=.25,d[t].decayRate-=.01*Math.random(),(d[t].position.x>l.width||d[t].position.x<0)&&(d[t].velocity.x*=-1),(d[t].position.y>e+16||d[t].position.y+d[t].size<0)&&(d[t].velocity.y*=-.75),d[t].decayRate<=0&&d.splice(t,1)}static drawText(t,e,a,i,s){c.textAlign="center",c.fillStyle=s,c.font=a+" sans-serif",c.fillText(i,t,e)}static drawEndTile(t,e){m.drawCircle(t,e,16,"darkblue"),c.fillStyle="rgba(96, 104, 244,1)",c.fill(),m.drawText(t,e+5,"15px","End","black")}static drawTextCenter(t){r.a.addAnimation(()=>{c.beginPath(),c.fillStyle="black",c.fillRect(0,0,l.width,l.height),m.drawText(l.width/2,l.height/2,"50px",t,"white"),c.closePath()},1e3)}static drawArrow(t,e,a,i,s,n){let o=t-a,l=e-i;for(;Math.sqrt(o*o+l*l)>25;)o/=2,l/=2;c.lineWidth=1;let h=0;r.a.addAnimation(function(){Math.sqrt((t-a)*(t-a)+(e-i)*(e-i))>10&&(m.drawLine(t+16,e+16,t+16-o,e+16-l,s),t-=o/3,e-=l/3),void 0!==n&&(m.drawCircle(t+16,e+16,4+h,"orange"),m.drawCircle(t+16,e+16,3+h/2,"orange",1),h+=.2)},1e3)}static boom(t,e,a){m.drawCircle(t+16,e+16,6+a,"orange",2),m.drawCircle(t+16,e+16,2+a/2,"red",1)}}e.a=m},function(t,e,a){"use strict";function i(t){window.requestAnimationFrame(()=>{t(),s.forEach(t=>{t()}),i(t)})}const s=[];e.a=class{static start(t){i(t)}static addAnimation(t,e){s.push(t),setTimeout(()=>s.forEach((t,e)=>{s[e]===t&&s.splice(e,1)}),e)}}},function(t,e,a){"use strict";e.a=class{static random(){const t=1e4*Math.sin(.8765111159592828+Math.random()+1);return t-Math.floor(t)}static int(t){return this.random()*(t||268435455)|0}static bool(){return this.random()>.5}static range(t,e){return this.int(e-t+1)+t}static pick(t){return t[this.range(0,t.length-1)]}}},function(t,e,a){"use strict";var i=a(1);e.a=class extends i.a{constructor(){super(),this.y=608,this.x=0,this.lastY=this.y,this.lastX=this.x,this.name="Wizard",this.description="You.",this.health=99,this.mana=10,this.attack=3,this.range=1,this.basicStickAttack=6,this.avaiableMoves=3,this.avaiableAttacks=3,this.spell=3}}},function(t,e,a){"use strict";var i=a(4);e.a=class{constructor(){this.mapData=["rock","rock2","forest","forest2"]}setLevel(t){this.currentLevel=t,this.map=[20];for(let t=0;t<20;t++)this.map[t]=new Array(30).fill(0);this.map[19][0]=99;const e=i.a.bool();this.endTileCords={y:e?0:i.a.range(0,19),x:e?i.a.range(0,29):29},this.terrainCords=[];for(let t=0;t<5;t++){let t=this.getUniqueMapCords();this.map[t.y][t.x]=i.a.range(1,this.mapData.length),this.terrainCords.push(t);let e=t.x,a=t.y;for(let t=0;t<10;t++)try{if(e-=i.a.pick([-1,0,0,1]),a-=i.a.pick([-1,0,0,1]),0===this.map[a][e]){this.map[a][e]=i.a.range(1,this.mapData.length);const t=[];t.x=e,t.y=a,this.terrainCords.push(t)}}catch(t){}}}getLevelInfo(){return this.currentLevel}getMap(){return this.map}getUniqueMapCords(){let t=i.a.int(this.map[0].length),e=i.a.int(this.map.length);for(;0!==this.map[e][t];)t=i.a.int(this.map[0].length),e=i.a.int(this.map.length);let a=[];return a.x=t,a.y=e,a}updateUnit(t){t.lastY%32==0&&t.lastX%32==0&&(this.map[t.lastY/32][t.lastX/32]=0,this.map[t.y/32][t.x/32]=t)}isCollidingUp(t){return this.isColliding(t,0,-32)}isCollidingDown(t){return this.isColliding(t,0,32)}isCollidingRight(t){return this.isColliding(t,32,0)}isCollidingLeft(t){return this.isColliding(t,-32,0)}isColliding(t,e,a){try{if(0!==parseInt(this.map[(t.y+a)/32][(t.x+e)/32]))return!0}catch(t){return!0}}removeFromWorld(t,e){this.map[e/32][t/32]=0}}},function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAgCAMAAABTlTDXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABjUExURUdwTGAzNHxqNWRoaFI+GGNTUEktOCexYlUcGGFMUHOBiDwXFDEnDT0bGBkODKabjvVh7yauXxoRCBmNShNpN5umpmMvmszU2h6cU667u8a1TJmNPr+EQX2EhJkNXFVvOp6VIoeMeWkAAAASdFJOUwD6/vv6sjL+/l36yZ+X4XrQs8LHp1kAAA/+SURBVHja3VuNeuI4EsRGEsg/kMgABgPZ93/K6+qWZNmWmU1m59u7c2bAWAJCqrq6uiU2Oz76U7+bHp2/8Dm73O3CM+Rs839ymIPDceC7g/kHXvBf+iBWHb81X+A8nU67cObx9ZT49MN9mCe4d+Fs/npHvdX2vxJh2777vdz0aH/zzT6MMf9DBOhOIaB7j+tJKNH3n/ygE17QvI6pQNOFIv387fV2+44Bvxr/nU/+FuDNwR32B5phKcbrJTiuppitffQb534IvG75w1m6IQaYDA2t/rPM0O4HBCA4u5M/45MO950nQMfDPTOh58v+UjcngCF4z7fzOsSM/x9hACT8HcC1KHzd7rMBbhyeYvd01HTS/owAprhcLhbQb+zHh13mAXu5fFRGCJKXqQ/7e/w4Wqv0e4bYBQEowjuJ8Y4jm5HuJeg/mRQ9KwTiXi7LpdMsBRjAf71eQQGTh/95vt1u5+c/TwEB2K0D7GpLc4AwiLAUCPxCGN23Kxm8rn/1O1vgf+HA//i4MgNmf/uLEASjJmcb+Gnflr6j1uM5/Z9rgD3a9RQheo6DYhwId6zznY9wIgDDzsN8+RTmiSpM3mgL+HHctjYb/Wc/TBTIzDBNUzbvQ6xp8gHyK4DtoeYI/4t+QJbFm3PKrvH0tfeGOLRm9owFvFUhHgAf82NGpPYiBLF+MGMdMPBdCdBKRciPcmEqCmWpUwLkFKAXBRAqCAG6lACCdsdU8EwQyuwmCeAZCHB9zvHl6Af2/HO9LlTANE4N9/t9nQFN09CEIfv3+RXAdo+nmf2+2O8N2JKnUb2O/wZPBQlMeEc3lQRdMb4XyvEI8SUB4vgvCGC/jb8KoHoeOL0yzsdUAsYU0PkzTgEhJxABAtodCz+fjJd2s/x/Ywrc2AdMkNKIfsH+Kjw4b9Nfs1FKEfzDcDcr6As/7vcyS4BfASy4kTwA4notxYMAawHYUvy3NWTAiqkkoUn+rsbje7kWSAFA8mPyWjZMqAqM2n+KAEdXIgXoIwxAwDx9X6f11BVMTIK39BLifCZOj654BThNCYD6QK5MCGC32yfhfuYcj7vzVOT1c4Te0+C5TfEfBlUO96HMS0CjSsUEKFcm/ApgI6mdQtiEB0sS+cOul/aeAnR2qEkDkoaBrooIsDX29fExEwAdx6uiql7ZNyHr+PHS3/V9WlNQWzcK/Uzmj1ZPfOeEHz4DCN6MvQDcd94F7ka0vQXoPAH6lAAa+f8s0OOAD0gzTxCA20iDc2QIyb9TqnSEcjnkNL5x5VCWfFPehyw4LaflNwBbC/CoVGjNWo6HgBRSB6xbrlAp0LukEtBWBR0vOj5eBVhAQpDaBFO94gSMV3ma2Ree+L2jdMrpo3Lq6CVgZgNL5ACrtM3xIwoAwl6KOwY5SMDnbkTbD4tAdMKQNMIl9L0CEB2SUkBHf5iQIDCE1F3tSeFLwv9eumZp/RwNq0Ep5Ya7yuu3MQzw3q0BXEt4u2D058/fJ8cbCEwdRaIOBDBWF9Xl9RKAPx6I9WuVCABPAPZCACSDfBJAKfH4Zg6wEj0O8aMzIr/BuNbKqUgAnRIgCDpinxMAEwA30guSIgAPPAE6KRJ6bhmkEX4dUwD7vCQHwALcEglgBQg5wO0J2T2Cn1AuVbNw+MqPswgo9RsAF2OltxAAN07IzqCQtyQjhzBufbUBdCmkL6+XQEw08ASI8ONC5ccLGb9UZo0AD/29ZoAm6DVXwQHiUh8Ti20d4U+jRUgSpUoJ0CUEYGwBNmeCLhT/XbQGITkETuymFeDNE+A2iXAMPz0rggSAJb5UgP5TiBO2A8E/jPg2TSIQTvE4TRiadQJ4p57zcPtE401uuA7xT+fZrqIdJaImT4jWA5u7K/CU6I/wXqr44c01TgA7Xt4KFGtw0sRviQCJv1POcZxb8Xuq3JSlPoaADw3uEPlazVKAJ4B0+JkK3AoMvaHg/UL274MvHAnAHR4pAG5SCnC/x0wIwBQIRMHBDGmAPgG8FwYMUQHI+DWeAI6n0DBcYl4BrMBf8M9aig8iUWf0oSVxF/7AStR5ijnWiULYMiHA7EhBzEzQ6yCjnVwUfxt9wlcx+EptKTyU06Wmu6OGoWIOhHEXq0GlpimgjzbPIwwBAMwjAXxmiMiLYEQCGAE45nlBeGwGaMFfMsTtFh4gBxjSdTcozvKKPB6VAiHwXclYwwGU+MvLeL5XZNo0h+czQBsJsDD6NSFugoYwm+x7lyAvJCkgdAAuYxmwMcVDRw9gpxPYANpCr3gZAxVYlQBr7aS6InRLmCc4Pf4LbsECpzSH/PGox3H6rzkz6MQF+rZ/7yv8k+T4cNf5ZYGT7w2PBOj5f7eLFiDgG/Q9RngiAIlJPAeGNBT39zs83p0/Ax410tvbiwTgI96RAeQz5hsFQC9qeCaFA1LMQYzXh3mAW/Z97T4mkDqjATWYU4xOgzjZRo+nEfMF1XdFcb0WWptiiqEpKkyorpTir5Ux1uajHC9lNnZVAizkY+IACdgtxzcSgRKonUPS53mTcdhEqhQmBOC4jnWf6H0QAoR45/0Ae76xA+Dd4i5mgDzAxlvAvAIQQ4xU98AYfSCq8ujBAPz3AJ60qoEo3Hl8SAQiAzDbAJFnkwlfExC27WxCdHWAn5sIOQlINeaAB3/tp1XggwDGzYVcwGMOYVVhjAZAE56QywFYTkInSOdrQYN287RTpEN+nyxnKx36fdNxaKjWqow9o00PfEPhd4paIC3BXrKCjKNVJOmiD6rReQKYKcDxXHJA7BEtCfDcNtzea1xo87ARVA03BiABIACPKCEI/WQlwCBiBaLa1ksJSAlgKF+0MwJIuXHgookBzfrEWCm07Bqn+F4APtClkhDnUwWoikomVNWjqtgkPPLLSWihmiK3amy17zXnGMCH1r4cOKZV4sgLrhXRFtClp8BOojsqfyjwpA+AHMCW368SxfrvlBLA6u05H+FPLeE/+r6ZB9Ds/O6mYfFX5f0+qPvg7l6x4AEa1oa75IgBJCmnVYJHxwYCHJAP7NIEBgJQDWCmNsGIANQJAfI20oUiwMwWgyzae8BULNBrTgBbyIRKxiEBGQIIwK08YUkAbyUW5NbHQIIj9/2ORzdZDrKBBMpaLVqgtCIlAAfCSsDXVygCvcZzSpC1/z72f7xS0H3pNSEuAqxEuO8QBGcgRcItjG6tc8DdGCZmydkAMsD5TOqBRkAXg8ATpFdIKpH4wXpM4nVAdKYAoY6rGczsinLNBDCrCwVgACX+zEIgA8zwkge4Mrxmuk5AGiHj1APC4yUBPMDcBTAZGxis5FwcrA76b3PdfkwYhzVHllxRNvYBWAfislB38us+/bhWGJ2BuANPgG7cBHAbCXAbI5wEIFT+1xkBeElYOeR3s1Gc3u9o9LnSuXsZ130byvyDU4OCP0AhiOmmaVAbjBWh7OPwCsBV3XIxFwRwEr7ZOu/Af6HDylKh33FwyDQRtAeYgxu3QFfP14lC+DMJCMYFAWKtwHtGFgyItcR13kMas4AXx9mOgNAJ8IlBO211KCYiASjEPQF6rvf7dBdI7/NANIEnv4DUhQgf+4C38xjhGv7wNhv3DJAtAQh0mL6mZHzLAVW/Sp2ec4444gbF4Y9eEFkGaQyMXUOxdVyo7w98tiTAPmwLsrLst3K4fA6IqbSxK9L8GAG+6tTiBeBGBhSw8nObyA5PykQsKS/KRH3hFtOLlIbgM2knaNbqOc6Ww6NCKP/QzvsADHDvl4Wk7xOa/X6TSFCAvguNAk8A2QTAIC8iXPsK8HYbFwqm+G8o43Nrr+FOH+GPzu9kVwARAnUsyljuE2FRgPseMUkw4Mjs445Os2imtq0s4ToW+jet1nwK8LuG8Wy7Is3BAEiWt/N1wEdiAS6axucI20tcLaIJemoDrdWy2iDLTZIojLUp+onMT/S/HEuE5YaRuBjc+Z5gz63/7vR4fKVrAadYJMhWkEAAA4cvKcD3gUeEtSwCjEuE6BJIp/AWtgSxw2uwHoBWH5/Otv00SnYCKOeQI6BzJS8OhD6BlM+8k8+r9No6josEeLd7tF577qHO7xj2C72Px6Pif3RzTQTcVA/2fFXUgILT+IQAxgPMy0UoF2myTteSwmJCEVaTqkJrtHU0i2i0+XpuAY5WTQlwVBMCdH4x+LTzp0ICIoDsDw4EKaUmDMuAngCf0gK6TRwAPxL8fYfAjz/HI+wWIGyh94bbvWV2Q1DDO0UIeow7LgebppG+l8kF6RoBiCCH9od7vpkAbZs6rfF1H7wEUBDQKPRAgCox8UwJulzBGwQHMCWAgf8fl5NeL149ChJgK28ixtUkfruw3uNUhJhig0TBzbOXXy1QWA06Kp06hJ1f6+n9lq8urA2H7wKE3T/l10m+LtB3vj+Ek8/Q5D/PCODx9z2gqPrxCL+8gQTA9ZIJUG7I9vmV7AQa8PnI+XuBWOwPtIzRYZ0AsPkmh+DfIQBe12Lb4SJDGEEYXSBU+YQWNf8TApjCj0YLIN08XcxMRDFdLryEFSnjFxOowxThB0HSPV/YFoJYJ7lfbAu2UvlruteYPd0TKE0+2eXPjYCvLzF5J/lyUEgBgB64D5QaeqYCUaL/3KYK8NzSD/49n3El0O8EDpzgzlBunydXe/kKrME2ASKKaVx5N283BmObzmqEU/xa+zP8WQGssXUmgXgCIPqBvYCl5wt80AfODhXaAEQUY4uxi+QXkIp0OclYHRngbUbxiOyIxeARewFsjAHEyLxKpNDivzsnz9nHB5JfSPde70/4Jbkm6Pv4HaFeLuB7AjyZ7nupBD7tJMJ1PNKtAM/RE745KM6HZnU3MLeA0RNqVhnAMWrqVQHABg4iweEn+IM8VP/X2a+NWR+VSN0VBB7yPJlWcAu44lYRvCKrwbhTLwIcjzZ4vAgilwgPj75udXx9KGfYBXp0ThXzrwYdy8AQVy6/M4BC/0uCWjaAfYXkH78OePoawjfHBHfhAkvEJ9v8EOH52NIz1V8jwLBOgI1jdlC+GN7M4QJv3eORireIkR9984KeazZr8qIlfAsQQE6r69TD6wuzo5J+UIW+kTY69fjt+IMiPWxCTBMJDAbq90kfCglg3Aki7f55m0gFAriyXBKAkPzycr/jit9HOx7yDSWFwI9+13dxlDcNc6H3PNPPGv7h60DbX0hvQ0Ves74lvBxKJIOmeSPSUgrW60H8dvztwc9t1/yFhciTw+ONoaz319meP1YJ8n+FripLt9ztmy0D87G+7wevsKCf9QVxsjusmOwKh+lXyhMgUmG6KxjGPnzpt58hLFE/Xugn5AABsNgjEb75V49WovMw2ay9IMDmxwRwdsNFgFnFh1BHi42RWsgd1nl/6/tQxtMmsyFQBcjtrCUcZ7jwIRZtrhTpgPDk8eKYXP7kbcl/6gt/390bWYsVXM/yzrwff0uAmlPAqodkhP3ZH/n+Z/5VrU23iDDLFkiE8eXI5j8AAdTvX+rbUQAAAABJRU5ErkJggg=="},function(t,e,a){"use strict";var i=a(1),s=a(2);e.a=class extends i.a{constructor(t,e){super(),this.name="Goblin",this.description="Basic attacks.",this.x=t,this.y=e,this.lastY=this.y,this.lastX=this.x,this.health=6,this.attack=3,this.range=1}performAttack(t){return this.avaiableAttacks-=1,s.a.drawHit(t.x,t.y),t.takeDamage(this.attack),t}}},function(t,e,a){"use strict";var i=a(1);e.a=class extends i.a{constructor(t,e){super(),this.name="Imp",this.description=" His attacks knocks back.",this.x=t,this.y=e,this.lastY=this.y,this.lastX=this.x,this.health=9,this.attack=1,this.range=1}performAttack(t){return t.takeDamage(this.attack),this.avaiableAttacks-=1,t.x===this.x?t.y>this.y?(t.moveDown(),t.avaiableMoves++,this.moveDown(),this.frame=-3):(t.moveUp(),t.avaiableMoves++,this.moveUp(),this.frame=3):t.y===this.y&&(t.x>this.x?(t.moveRight(),t.avaiableMoves++,this.moveRight(),this.frame=4):(t.moveLeft(),t.avaiableMoves++,this.moveLeft(),this.frame=-4)),setTimeout(()=>this.frame=-1,500),t}}},function(t,e,a){"use strict";var i=a(0);e.a=class{updateEnemies(t){this.enemies=t}moveEnemiesToPlayer(t){this.player=t,this.enemies.forEach(e=>{let a=e.x-t.x,s=e.y-t.y,r=a>=0,n=s<=0;if(a=Math.abs(a),s=Math.abs(s),this.getDistanceFromPlayer(e)<=e.range){if(e.range>1)return this.tryToAttack(e),0;if(0===a||0===s)return this.tryToAttack(e),0}this.getDistanceFromPlayer(e)<9&&!e.freezed&&(r&&n?a>=s&&!i.world.isCollidingLeft(e)?e.moveLeft():i.world.isCollidingDown(e)?i.world.isCollidingLeft(e)||e.moveLeft():e.moveDown():r&&!n?a>=s&&!i.world.isCollidingLeft(e)?e.moveLeft():i.world.isCollidingUp(e)?i.world.isCollidingLeft(e)||e.moveLeft():e.moveUp():r||n?!r&&n&&(a>=s&&!i.world.isCollidingRight(e)?e.moveRight():i.world.isCollidingDown(e)?i.world.isCollidingRight(e)||e.moveRight():e.moveDown()):a>=s&&!i.world.isCollidingRight(e)?e.moveRight():i.world.isCollidingUp(e)?i.world.isCollidingRight(e)||e.moveRight():e.moveUp(),setTimeout(()=>this.tryToAttack(e),300))})}getDistanceFromPlayer(t){return Math.floor(Math.sqrt(Math.pow(this.player.x/32-t.x/32,2)+Math.pow(this.player.y/32-t.y/32,2)))}tryToAttack(t){this.getDistanceFromPlayer(t)<=t.range&&t.avaiableAttacks>0&&(this.player=t.performAttack(this.player),i.world.updateUnit(this.player),i.world.updateUnit(t))}}},function(t,e,a){"use strict";e.a=class{constructor(){this.turn=1,this.actions=[]}nextTurn(){this.turn+=1,this.actions.forEach(t=>{t()})}addNextTurnAction(t){this.actions.push(t)}}},function(t,e,a){"use strict";var i=a(5),s=a(2),r=a(1),n=a(0),o=a(3);const l=document.getElementById("game"),c=document.getElementById("infoHolder");e.a=class{updateContext(t,e){this.map=t}addListeners(){document.addEventListener("mousemove",t=>{this.getCursorCordsAndDistance(t),void 0!==this.distanceFromPlayer&&this.enableActionsBasedOnDistance(t)}),document.addEventListener("click",()=>this.attack()),l.addEventListener("contextmenu",t=>this.showUnitInfo(t)),window.addEventListener("click",()=>c.style.display="none")}getCursorCordsAndDistance(t){const e=l.getBoundingClientRect();let a=e.width/30,i=e.height/20;this.x=Math.floor((t.clientX-e.left)/a),this.y=Math.floor((t.clientY-e.top)/i),this.x>=0&&this.y>=0&&this.x<30&&this.y<20?this.distanceFromPlayer=Math.floor(Math.sqrt(Math.pow(n.player.x/32-this.x,2)+Math.pow(n.player.y/32-this.y,2))):this.distanceFromPlayer=void 0}enableActionsBasedOnDistance(t){const e=this.map[this.y][this.x];e instanceof r.a&&!(e instanceof i.a)?(n.player.canCastSpell=this.distanceFromPlayer<=4&&n.player.mana>=n.player.spell,n.player.canAttackWithSword=this.distanceFromPlayer<=n.player.range&&n.player.avaiableAttacks>0):(n.player.canAttackWithSword=!1,n.player.canCastSpell=!1),n.player.canAttackWithSword?l.style.cursor="url("+a(13)+"), auto":n.player.canCastSpell?l.style.cursor="url("+a(14)+"), auto":l.style.cursor="default"}attack(){if(n.player.canAttackWithSword||n.player.canCastSpell){let t=this.map[this.y][this.x];if(t instanceof r.a&&!(t instanceof i.a)){if(n.player.canAttackWithSword)s.a.drawHit(32*this.x,32*this.y),t.takeDamage(n.player.attack),n.player.avaiableAttacks--;else switch(n.player.spell){case 3:s.a.drawStickAttack(n.player,t.x,t.y,"#5b86e5"),t.takeDamage(n.player.basicStickAttack),n.player.mana-=3;break;case 5:{s.a.drawArrow(n.player.x,n.player.y,t.x,t.y,"red",!0);let e=1;setTimeout(()=>{const a=[{x:t.x,y:t.y},{x:t.x+32,y:t.y},{x:t.x,y:t.y+32},{x:t.x-32,y:t.y},{x:t.x,y:t.y-32}];o.a.addAnimation(()=>{a.forEach((t,a)=>{s.a.boom(t.x,t.y,e)}),e++},8),a.forEach(t=>{let e=this.map[t.y/32][t.x/32];e instanceof r.a?(e.takeDamage(99),Object(n.destroyEnemy)(e)):n.world.removeFromWorld(t.x,t.y)})},300),n.player.mana-=5;break}case 2:s.a.drawArrow(n.player.x,n.player.y,t.x,t.y,"#5b86e5"),setTimeout(()=>{let e=0;o.a.addAnimation(()=>{e<32&&(t.freezed=!0,s.a.drawLine(t.x,t.y+32,t.x+e,t.y+32,"#5b86e5",5),e++)},100)},300),n.player.mana-=2}n.world.updateUnit(t),t.health<=0&&Object(n.destroyEnemy)(t)}}}showUnitInfo(t){t.preventDefault();const e=l.getBoundingClientRect();let a=this.map[this.y][this.x];if(a instanceof r.a){o.a.addAnimation(()=>s.a.drawCircle(a.x+16,a.y+16,32*a.range+16,"rgb(206, 57, 57)"),1e3),c.innerHTML="",c.style.display="block";const i=document.createElement("h2");i.innerHTML=a.name,c.appendChild(i);const r=document.createElement("p");r.innerText=`${a.description} \n\n                     Health: ${a.health} \n \n                     Attack: ${a.attack} \n \n                     Range: ${a.range} \n`,c.appendChild(r);let n=t.clientY-c.offsetHeight-10;n<0&&(n+=c.offsetHeight+10);let l=t.clientX+10;l-e.left+c.offsetWidth>e.width&&(l-=c.offsetWidth+30),c.style.top=n+"px",c.style.left=l+"px",c.focus()}}}},function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA2UExURUdwTOujLOXn7z8oFmVVU21cWZSJkKRrGMTEz39PEFs7G7GFQ3VtgNPQ2NbT2nZzjXFhU5aZp4Ftno8AAAAPdFJOUwD8/fyAVSX+/v645MBXnxS2UhAAAAC4SURBVCjPdZJBkgQhCARFVEC6Ff//2WE9LrRHM6pMCEsZ7xolP/3htd53pOgw11pXROPZf6TyG1Hb55xaz8rQNiJvDbHR9zEA4/jaRQRkzCvx+Kx0/8s4syxXRb4Z4qmcbK3vjSLuWVuDHnKEHuSjoOO/qHkOCYBmqDQRBSGYyXwotImkB5Nnu8dRackABiQkOBPkBjLRNDIlmr10MwuVQ+9VQ7X28ZGmGekXE4CZB7vP1noea65TfvQbCKXzIW49AAAAAElFTkSuQmCC"},function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAaCAMAAACEqFxyAAAAJ1BMVEVHcExuldhfKxLZPvihPTJUKBg4HA5DOT7wVPD4LPaSYmj/6v/9kP8LEZ6QAAAAC3RSTlMAH+5O/Z1FcOat8apfcyEAAACMSURBVCjPlZBLFgMhCAT5KaLe/7xpk01kyCK90rJfwQzRCSOU8kGZM+tJ4qqsMfYAvzHFXmsHXxy3WAjqyt/qd3slCyo69h7mtxxYNcRm2vKcWWS2nqbiwcXMpqdPImomeHn8gu7exRoVAe9PiglVHeKyfjSlHQuVdRKhWuO1pq7zj6kuXGsa/bN8by/cBAKfOnYkvAAAAABJRU5ErkJggg=="},function(t,e,a){"use strict";const i=document.getElementById("health"),s=document.getElementById("mana"),r=document.getElementById("turn");e.a=class{static updateUI(t,e){i.innerText=t.health,s.innerText=t.mana,r.innerText=`Turn: ${e.turn} Moves left: ${t.avaiableMoves} Attacks left: ${t.avaiableAttacks}`}}},function(t,e,a){"use strict";var i=a(1),s=a(2);e.a=class extends i.a{constructor(t,e){super(),this.name="Orc Archer",this.description=" Can attack from distance.",this.x=t,this.y=e,this.lastY=this.y,this.lastX=this.x,this.health=3,this.attack=3,this.range=4}performAttack(t){return t.takeDamage(this.attack),this.avaiableAttacks-=1,s.a.drawArrow(this.x,this.y,t.x,t.y,"black"),t}}}]);