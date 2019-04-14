var canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 500;
var context = canvas.getContext('2d');
window.onload = function myFunction() {
    var myH2 = document.getElementsByTagName('h2')[0].innerHTML;
    $.ajax({
        url: '/Item/getitems',
        data: { 'id': myH2},
        type: "POST",
        success: function (data) {
            if (data instanceof Array) {
                $('#myModal').modal('hide');
                createshopitems(data);

            } else {

                var options = {
                    "backdrop": "static",
                    keyboard: true
                };
                $('#myModalContent').html(data);
                $('#myModal').modal(options);
                $('#myModal').modal('show');
            }
        }
    });
};
function shutter(y) {
    this.y = y;
    this.draw = function () {

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, this.y);
        context.lineWidth = canvas.width*2;
        context.strokeStyle = '#8c8c8c';
        context.stroke();

    };
    this.update = function () {
        this.y -= 1000;  //change speed of shutter
        this.draw();
    };
}

function slabs(posy,item) {
    this.posy = posy;
    this.itemdetail = item;
    this.draw = function () {

        //context.beginPath();
        //context.moveTo(this.posy, 0);
        //context.lineTo(this.posy, canvas.height - 100);
        //context.lineWidth = 5;
        //context.strokeStyle = '#b7955f';
        //context.stroke();      
        
        
        context.lineWidth = 5;
        for (var i = 80; i < 320; i++) {
            context.moveTo(this.posy, i+0);      // Bottom left
            context.lineTo(this.posy, i + 60); // Down 
            context.lineTo(this.posy - 60, i + 60); // Left
            context.lineTo(this.posy - 60, i + 120); // Down 
            context.lineTo(this.posy, i + 120);
        }


        context.stroke();


    };

}
var Shutterobj = new shutter(canvas.height);

var slabobj = [];
var countslab = 50;

//for (var i = 0; i < 11; i++) {
//    slabobj.push(new slabs(countslab));
//    countslab += 50;

//}


function animate() {
    // if (paused) { return; }
    requestAnimationFrame(animate);
    context.clearRect(0, 0, 1200, 900);
    if (Shutterobj.y > 0) {
        Shutterobj.update();

    }
    if (Shutterobj.y < canvas.height - 20) {
        for (var i = slabobj.length-1; i >= 0; i--) {
            if (Shutterobj.y < slabobj[i].posy) {
                slabobj[i].draw();
            }
        }
    }
    //if (Shutterobj.y < canvas.height - 20) {
    //    if (itemarray.length > 0) {
    //        for (var i = itemarray.length - 1; i >= 0; i--) {
    //            if (Shutterobj.y < itemarray[i].y) {
    //                itemarray[i].draw();
    //            }
    //        }
    //    }
    //}

}
function items(x, y, dx, dy, itemdetail) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = 1;
    this.rad = 30;
    this.itemdetail = itemdetail;
    var img = "";
    var imageObj = null;


    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.rad,0, Math.PI * 2, false);
        context.stroke();

        if (this.itemdetail != null) {
            if (imageObj == null) {
                imageObj = new Image();
                imageObj.onload = function () {
                    context.drawImage(imageObj, this.x - 20, this.y, this.dx - 10, this.dy - 10);
                };
                imageObj.src = "/Item/getImage/1";
            } else {
                context.drawImage(imageObj, this.x-20, this.y, this.dx - 10, this.dy - 10);
            }
         
        } else {
       
        }
    };
    this.update = function () {
        this.y -= this.speed;
        this.draw();
    };
    this.changespeed = function (xy) {
        this.speed = xy;
    };

    this.offscreen = function () {
        if (this.y < 0) {
            return true;
        }
        return false;
    };
}
var itemarray = [];
function createshopitems(arr) {  

    var count = 0;
    var x = 100;
    var variable;
    var itemplayarray = [];
    for (var k = 0; k < arr.length; k++) {                 
        if (count < 4) {
            if (count == 0) {
                variable = new slabs(x,null);
            }
            itemplayarray.push(new items(x, canvas.height - 20, 50, 25, arr[k]));
            count += 1;
            x += 30;            
        } else {
            count = 0;
            variable.itemdetail = itemplayarray;
            slabobj.push(variable);
            itemplayarray = [];
            k--;
        }            
    }
    if (count < 3) {
        variable.itemdetail = itemplayarray;
        slabobj.push(variable);
    }


};
//addEventListener("mousemove", function (event) {
//    mouse.x = event.clientX;
//    mouse.y = event.clientY;
//});
canvas.addEventListener('mousemove', function (event) {
    var mousePos = getMousePos(canvas, event);
    var id = 0
    var rect = collides(itemarray, mousePos.x, mousePos.y);
    if (rect.code) {        
        id = $.inArray(rect.message, itemarray);        
        itemarray[id].rad = 60;
       // window.location.href = '/ViewShop/ViewShop/' + rect.message.shopdetailmain.id;
    } else {        
        // console.log('no collision');    
    }
    
}, false);
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
//function collidesLast(personobj, shopobj) {
//    var isCollision = false;    
//    var y = false;
//    for (var i = 0, len = shopobj.length; i < len; i++) {
//        var a = shopobj[i].x - personobj.m;
//        var b = shopobj[i].y - personobj.n
//        var c = Math.sqrt(a * a + b * b);
//        // console.log(c);
//        if (c < 210) {
//            y = true;
//        }
//    }
//    if (y) {
//        isCollision = true;
//    }
//    return isCollision;
//    }
//    return { code: isCollision };
function collides(rects, x, y) {
    var isCollision = false;
    var shopde = null;
    for (var i = 0, len = rects.length; i < len; i++) {
        var left = rects[i].x, right = rects[i].x + rects[i].dx;
        var top = rects[i].y, bottom = rects[i].y + rects[i].dy;
        if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) {
            isCollision = rects[i];
            shopde = rects[i];
        }
    }
    return { code: isCollision, message: shopde };
};
animate();