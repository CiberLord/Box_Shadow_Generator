let min_radius = -50;
let max_radius = 50;
let min_pos=-25;
let max_pos=25;

let box = document.querySelector(".box");
let input = document.querySelector(".css__text");
let btn = document.querySelector("button");
let s = {};

btn.on = false;
btn.onclick = function () {
   btn.on = !btn.on;
   if (btn.on) {
      let val = input.value.replace(/^box-shadow:/gmi, "");
      val = "inset " + val;
      box.boxShadow(val);
      input.value = "box-shadow:" + val;
      btn.classList.add("checked");
   }
   else {
      let val = input.value.replace(/^box-shadow:/gmi, "");
      val = val.replace(/inset /gmi, "")
      box.boxShadow(val);
      input.value = "box-shadow:" + val;
      btn.classList.remove("checked");
   }

}
box.boxShadow = function (val) {
   box.style.boxShadow = val;
}

s.sx = SCROLLER.create("#posx", "item");
s.sy = SCROLLER.create("#posy", "item");
s.br = SCROLLER.create("#blur-radius", "item");
s.sr = SCROLLER.create("#spread-radius", "item");
s.sx.setValue(0.5);
s.sy.setValue(0.5);
s.br.setValue(0.5);
s.sr.setValue(0.5);

//spread radius scroll
s.sr.onscroll = function (val) {
   val = Math.floor(val*(max_radius-min_radius)+min_radius);
   _spec(val,3);
}

//br radius scroll
s.br.onscroll = function (val) {
   val = Math.floor(val*(max_radius-min_radius)+min_radius);
   _spec(val,2);
}
s.sx.onscroll=function(val){
   val =Math.floor(val*(max_pos-min_pos)+min_pos);
   _spec(val,0);
}
s.sy.onscroll=function(val){
   val =Math.floor(val*(max_pos-min_pos)+min_pos);
   _spec(val,1);
}


input.oninput = function () {
   let val = input.value.replace(/^box-shadow:/gmi, "")

   box.boxShadow(val);
}

function _spec(val,index){
   let str = input.value.replace(/box-shadow:/gmi, "");
   if (btn.on)
      str = str.replace(/inset /gmi, "");
   let arr = str.split(" ");
   arr[index] = val + "px";
   str = arr.join(" ");
   if (btn.on) {
      str = "inset " + str;
   }
   box.boxShadow(str);
   str = "box-shadow:" + str;
   input.value = str;
}

