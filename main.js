(()=>{"use strict";var t,e=document.querySelector(".order__slider"),r=document.querySelector(".order__slider-track"),n=document.querySelectorAll(".order__slider-item"),c=document.querySelector(".order__button-prev"),i=document.querySelector(".order__button-next"),a=0,o=0,s=e.offsetWidth/2,d=n.length,l=1*s;function u(){r.style.transform="translateX(".concat(o-14*a,"px)")}function _(){c.disabled=0===o?c.classList.add("order__button_inactive"):c.classList.remove("order__button_inactive"),i.disabled=o<=-(d-2)*s?i.classList.add("order__button_inactive"):i.classList.remove("order__button_inactive")}n.forEach((function(t){t.style.minWidth="".concat(s,"px")})),c.addEventListener("click",(function(){a-=1;var t=Math.abs(o)/s;o+=t>=1?l:t*s,u(),_()})),i.addEventListener("click",(function(){a+=1;var t=d-(Math.abs(o)+2*s)/s;o-=t>=1?l:t*s,u(),_()})),_(),e.addEventListener("touchstart",(function(t){var e=t.touches[0];v.x=e.clientX,v.y=e.clientY})),e.addEventListener("touchmove",(function(t){if(v.x&&v.y){var e=v.x,r=v.y,n=e-t.touches[0].clientX,c=r-t.touches[0].clientY;if(Math.abs(n)>Math.abs(c)&&Math.abs(n)>100)if(n>0){var i=d-(Math.abs(o)+2*s)/s;o-=i>=1?l:i*s,u(),_()}else{var a=Math.abs(o)/s;o+=a>=1?l:a*s,u(),_()}}})),document.getElementById("result");var v={x:0,y:0};n.forEach((function(e,r){e.addEventListener("click",(function(){t=r,Array.from(n).find((function(e,r){t===r?e.classList.add("order__slider-item_active"):e.classList.remove("order__slider-item_active")}))}))}))})();