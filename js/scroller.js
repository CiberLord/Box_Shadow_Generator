(function () {

    let S = {};

    S.create = function (selector, item_style) {
        let scroller={};
        
        scroller.value=0;
        scroller.min=0;
            
        scroller.box = document.querySelector(selector);
        scroller.box.style.position="relative";
        scroller.item = document.createElement('div');
        scroller.item.classList.add(item_style);
        scroller.item.style.position="absolute";
        scroller.item.style.cursor="pointer";
        scroller.box.append(scroller.item);

        scroller.limit = parseFloat(getComputedStyle(scroller.box).width)-parseFloat(getComputedStyle(scroller.item).width);
        
        scroller.onscroll=function(value){
            return false;
        }
        scroller.getValue=function(posx){
            return (posx-scroller.min)/(scroller.limit-scroller.min);    
        }
        scroller.setValue=function(value){
            if(value<0){
                scroller.item.style.left = scroller.min + 'px';
            }
            else if(value>1){
                scroller.item.style.left = scroller.limit + 'px';
            }else{
                scroller.item.style.left=(value*(scroller.limit-scroller.min)+scroller.min)+'px';
            }
    
        }
        init(scroller);

        return scroller;
        
    }

    function init(scroller) {

        scroller.item.ondragstart = function () {
            return false;
        }
        scroller.item.addEventListener("mousedown", function (event) {

            
            let currentX = event.clientX;
            let style = getComputedStyle(scroller.item);

            function moveItem(pagex) {

                let posx = parseFloat(style.left) + pagex;
              
                if(posx<scroller.min){
                    posx=scroller.min;
                }
                if(posx>scroller.limit){
                    posx=scroller.limit;
                }
                scroller.value=scroller.getValue(posx);
                scroller.onscroll(scroller.value);
                scroller.item.style.left = posx + 'px';
            }

            function onDrag(event) {

                moveItem(event.pageX - currentX);
                currentX = event.pageX;
            }


            document.addEventListener('mousemove', onDrag);

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onDrag);
                document.onMouseDown = null;
            }
        });
    }

    window.SCROLLER = S;
})();