$(document).ready(function () {
    $('.listbox').multiselect({
        includeSelectAllOption: true
    });

});

function CallChangefunc(val) {
    
    var shopid = [];
    $.each($("#item3 option:selected"), function () {
        shopid.push($(this).val());
    });

    if (shopid.length > 0) {
        $.ajax({
            url: '/Item/Selectitem',
            data: { 'id': shopid },
            type: "POST",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    makeTable(data);
                    // createitem(data);
                }
            }
        });
    } else
    { makeTable(null) }
  

}
function ShowImagePreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#Simg').attr('src', e.target.result)
                .width(280)
                .height(200);
        };
        reader.readAsDataURL(input.files[0]);
    }
};
function makeTable(data) {
    var tblEmployee = $("#tblEmployee");
    tblEmployee.empty();
    if (data != null) {
        tblEmployee.append("<tr><th> Shop Name</th><th>Item Name </th><th>Item Details</th><th>Item Price</th><th>Available</th><th>Item Image</th></tr>");
        $.each(data, function (index, item) {
            $.each(item, function (index2, obj) {
                var tr = $("<tr></tr>");
                tr.html(("<td>" + obj.ShopName + "</td>")
                    + " " + ("<td>" + obj.ItemName + "</td>")
                    + " " + ("<td>" + obj.ItemDetails + "</td>")
                    + " " + ("<td>" + obj.Price + "</td>")
                    + " " + ("<td>" + obj.Available + "</td>")
                    + " " + ("<td id='ha'> <img src='/Item/getImage/" + obj.id+"' width='100px' height='150px' alt='pic'/>  </td>")

                );
                tblEmployee.append(tr);
                
            })
        }); 
    }
     

}


/*
animate();
var depth = 8;
var canvas = document.querySelector('canvas');
var context; //= canvas.getContext('2d');
context.fillStyle = '#000';
context.lineWidth = 1.5;
var deg_to_rad = Math.PI / 180.0;
canvas.width = 800;
canvas.height = 400;

function tree(posx, posy) {
    this.posx = posx;
    this.posy = posy;
    this.angle = 10;
    function drawTree(x1, y1, angle, offset, depth) {
        if (depth == 8) {
            var x2 = x1 + (Math.cos(-90 * deg_to_rad) * depth * 6.0);
            var y2 = y1 + (Math.sin(-90 * deg_to_rad) * depth * 9.0);
            drawLine(x1, y1, x2, y2, depth);
            drawTree(x2, y2, -90 - offset, offset, depth - 1);
            drawTree(x2, y2, -90 + offset, offset, depth - 1);

        } else if (depth != 0) {
            var x2 = x1 + (Math.cos(angle * deg_to_rad) * depth * 6.0);
            var y2 = y1 + (Math.sin(angle * deg_to_rad) * depth * 9.0);
            drawLine(x1, y1, x2, y2, depth);
            drawTree(x2, y2, angle - offset, offset, depth - 1);
            drawTree(x2, y2, angle + offset, offset, depth - 1);
        }
    }


    function drawLine(x1, y1, x2, y2, brightness) {
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
    }


    this.canvasDraw  =   function canvasDraw() {
         context.beginPath();
         drawTree(this.posx, this.posy, -90, this.angle, depth);
        context.closePath();
        context.stroke();
    }
    this.getAngle = function getAngle(x) { return parseInt(1 + 89 * x / $(window).width()); }
}

var slabobj = [];
var x = 200;
var y = 400;


function createitem(array)
{
    x = 200;
    while (slabobj.length > 0) {
        slabobj.pop();
    }
    if (array != null ) {
        for (var i = 0; i < array.length; i++) {
            slabobj.push(new tree(x, y));
            x += 400;

        }
    }

}
$(canvas).mousemove(function (e) {
    if (slabobj != null && slabobj.length > 0) {
        for (var i = 0; i < slabobj.length; i++) {
           slabobj[i].angle = slabobj[i].getAngle(e.pageX);
        }
    }


});
function animate() {
    // if (paused) { return; }
    context.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    if (slabobj.length > 0) {
        for (var i = 0; i < slabobj.length; i++) {
            slabobj[i].canvasDraw();
        }
    }


}
var canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 400;
var context = canvas.getContext('2d');
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
        this.y -= 50;  //change speed of shutter
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
var ob = new shutter(canvas.height);

function item() {

    this.draw = function (x,y) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(400, 200);
        context.lineWidth =  2;
        context.strokeStyle = '#8c8c8c';
        context.stroke();
    }
    this.branch = function (x, y) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(400, 200);
        context.lineWidth = 2;
        context.strokeStyle = '#8c8c8c';
        context.stroke();
    }
}
    var xitem = new item();

function animate() {
    // if (paused) { return; }
    requestAnimationFrame(animate);
    context.clearRect(0, 0, 1200, 900);
    if (ob.y > 0) {
        ob.update();

    }

    if (ob.y == 0) {
        xitem.draw(canvas.height, (canvas.width)/2);
    }


}

animate();
*/