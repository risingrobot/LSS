var canvas = document.querySelector('canvas');
canvas.width = 1200;
canvas.height = 900;
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
        context.lineWidth = 2400;
        context.strokeStyle = '#8c8c8c';
        context.stroke();

    };
    this.update = function () {
        this.y -= 2;  //change speed of shutter
        this.draw();
    };
}

function slabs(posy) {
    this.posy = posy;
    this.draw = function () {

        context.beginPath();
        context.moveTo(100, this.posy);
        context.lineTo(canvas.width - 100, this.posy);
        context.lineWidth = 5;
        context.strokeStyle = '#b7955f';
        context.stroke();

    };

}
var ob = new shutter(900);

var slabobj = [];
var countslab = 80;

for (var i = 0; i < 11; i++) {
    slabobj.push(new slabs(countslab));
    countslab += 80;

}


function animate() {
    // if (paused) { return; }
    requestAnimationFrame(animate);
    context.clearRect(0, 0, 1200, 900);
    if (ob.y > 0) {
        ob.update();

    }
    if (ob.y < canvas.height - 20) {
        for (var i = slabobj.length-1; i >= 0; i--) {
            if (ob.y < slabobj[i].posy) {
                slabobj[i].draw();
            }
        }
    }
    if (ob.y < canvas.height - 20) {
        if (itemarray.length > 0) {
            for (var i = itemarray.length - 1; i >= 0; i--) {
                if (ob.y < itemarray[i].y) {
                    itemarray[i].draw();
                }
            }
        }
    }

}
function items(x, y, dx, dy, itemdetail) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = 1;
    this.itemdetail = itemdetail;
    var img = "";
    var imageObj = null;


    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, 30,0, Math.PI * 2, false);
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
            //context.fillText(this.shopdetailmain.Shopno + "", this.x, this.y + 90);
            //context.fillText(this.shopdetailmain.ShopName + "", this.x, this.y + 100);
            //context.fillText(this.shopdetailmain.ShopLocation + "", this.x, this.y + 120);
        } else {
           // context.font = "20px sans-serif";
          //  context.fillText("Epmty Shop", this.x, this.y + 80);
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
    var y = 50;
    for (var k = 0; k < arr.length; k++) {
        var x = 150;
        for (var j = 0; j < 10; j++) {
            if (count < arr.length) {
                itemarray.push(new items(x, y, 50, 25, arr[count]));
            } else { break; }
            x += 100;
            if (x > 1050) {
                x = 150;
            }
            count += 1;
        }
        y += 80;
    }
};
animate();