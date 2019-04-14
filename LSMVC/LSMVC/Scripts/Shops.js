var canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 250;
var context = canvas.getContext('2d'), elemLeft = canvas.offsetLeft,
   elemTop = canvas.offsetTop;
 
citynames = []
var sessionid = ""
window.onload = function myFunction() {
    createRoad(4);
    window.addEventListener('keydown', doKeyDown, false);
    getLocation();
    $("#closbtn").click(function() {
       
        $('#myModal').modal('hide');
    });  
    $(window).resize(function () {
        canvas.width = 600;
        canvas.height = 250;
    });
    $("#btn_chooseLocation").click(function () {
        $.ajax({
            url: '/ShowShops/getShops',
            data: { 'name': $('#CityName :selected').val() },
            type: "POST",
            success: function (data) {
                if (data instanceof Array) {
                    $('#myModal').modal('hide');
                    createshops(data);
                  
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
    });  
       
    setInterval(function () {
        $.ajax({
            url: '/ShowShops/getperson',
            type: "POST",
            success: function (data) {
                if (data instanceof Array) {
                    createperson(data);
                }
            }
        });
    }, 1000);
    
    $.ajax({
        url: '/ShowShops/getsessionid',
        type: "POST",
        success: function (data) {
            sessionid = data;
        }
    });
   
    setInterval(function () {
        var perso = null;
        if (personobj.length > 0) {
            for (var i = 0; i < personobj.length; i++) {
                if (personobj[i].persondetail.session == sessionid) {
                    perso = personobj[i];
                }
                
            }
            if (perso != null) {
                $.ajax({
                    url: '/ShowShops/setperson',
                    data: { sessionid: sessionid, x: perso.m, y: perso.n },
                    type: "POST"
                });
            }
               
            }
            
        }, 200);

};
function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i].persondetail.session === obj.session) {
            personobj[i].persondetail.m = obj.m;
            personobj[i].persondetail.n = obj.n;
            return true;
        }
    }
    return false;
}
function displayLocation(latitude, longitude) {
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode(
        { 'latLng': latlng },
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add = results[0].formatted_address;
                    var value = add.split(",");

                    count = value.length;
                    country = value[count - 1];
                    state = value[count - 2];
                    city = value[count - 3];
                    alert("city name is: " + city);
                }
                else {
                    alert("address not found");
                }
            }
            else {
                alert("Geocoder failed due to: " + status);
            }
        }
    );
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            showPosition(pos);
        },
            function (error) {
                $.ajax({
                    url: '/UserRegister/ChooseShop',
                    type: "POST",
                    success: function (data) {                        
                            
                            var options = {
                                "backdrop": "static",
                                keyboard: true
                            };
                            $('#myModalContent').html(data);
                            $('#myModal').modal(options);
                            $('#myModal').modal('show');
                        }
                    
                });
            });
    } 
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    alert('handleLocationError');
}
//position.coords.latitude + ',' + position.coords.longitude
function showPosition(position) {
    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.latitude + ',' + position.longitude+'&sensor=true',
        success: function (data) {         
   //     alert(data.results[8].formatted_address);        
    $.ajax({
        url: '/ShowShops/getShops',
        data: { 'name': data.results[8].formatted_address },
        type: "POST",
        
        success: function(data) {
            if (data instanceof Array) {
                createshopsnroad(data);
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
        },
        Error: function (data) {
            alert('error' + data);
        }
    });
    /*
    
    var actionUrl = '/ShowShops/Showps';
    $.getJSON(actionUrl, function (response) {
        if (response != null) {
            createshopsnroad(response);
        }
      });
    */
}
function doKeyDown(e) {

    
    var code = e.keyCode;
    switch (code) {
        case 37:
            for (var i = 0; i < personobj.length; i++) {
                if (personobj[i].persondetail.session == sessionid) {
                    personobj[i].move(-125, 0);
                }
                
            }
            
            break; //Left key
        case 38: 
            for (var i = 0; i < personobj.length; i++) {
                if (personobj[i].persondetail.session == sessionid) {
                    personobj[i].move(0, -10);

                }

            }
            
            break; //Up key

        case 39: 
           
            for (var i = 0; i < personobj.length; i++) {
                if (personobj[i].persondetail.session == sessionid) {
                    personobj[i].move(125, 0);

                }

            }
            break; //Right key
        case 40: 
            for (var i = 0; i < personobj.length; i++) {
                if (personobj[i].persondetail.session == sessionid) {
                    personobj[i].move(0, 5);
                    
                }

            }
           
            break; //Down key
        default:
            break; //Everything else
    }
    //if (personobj.length > 0) {
    //    for (var i = 0; i < personobj.length; i++) {
    //        personobj[i].move(0, 5);
    //    }
    //}
   

}

//rectangle
/*
context.fillRect(100, 100, 200, 200);
context.fillRect(200, 200, 200, 200);
context.fillRect(300, 300, 200, 200);
context.fillRect(400, 400, 200, 200);

//line

context.beginPath();
context.moveTo(50, 300);
context.lineTo(200, 100);
context.lineTo(300, 200);
context.lineTo(100, 300);
context.stroke();

//arc



for (var i = 0; i < 900; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    context.beginPath();
    context.arc(x, y, 40, 0, Math.PI * 2, false);
   
    context.strokeStyle = 'blue';
    context.stroke();
}
*/

function mouseDown(event) {

    /*
    var x = event.clientX;
    var y = event.clientY;
   
    if (x < 400) {
        personobj.changex(200);
    } else if (x > 400 && x < 900) {
        personobj.changex(530);
    } else if (x > 900) {
        personobj.changex(860);
    }
    if (y < 300) {
        personobj.changey(200);
    } else if (y > 350 && y < 600) {
        personobj.changey(500);
    } else if (y > 600){
        personobj.changey(800);
    } 
   
       if (paused) {
        paused = false;
        //requestAnimationFrame(animate);
    } else {
        paused = true;
      //  personobj.move(mouse.x, mouse.y);
    }
   */

};
function road(x, y) {
    this.x = x;
    this.y = y;
    this.draw = function () {
        context.beginPath();
        context.moveTo(this.x, 0);
        context.lineTo(this.x, 900);
        context.lineWidth = 30;
        context.strokeStyle = '#aaaaaa';
        context.stroke();
    };
    this.update = function () {
        this.draw();
    };
}
function person(pp) {    
    //var m = 200+20;
    //var n = 80;
    this.m = pp.m;
    this.n = pp.n;
   
    this.persondetail = pp;
    this.draw = function () {
        context.font = "12px sans-serif";
        context.fillText(this.persondetail.email + "", this.m-7, this.n -7);   
        context.beginPath();
        context.fillStyle = "bisque"; // #ffe4c4
        context.arc(this.m, this.n, 7, 0, Math.PI * 2, true); // draw circle for head
        // (x,y) center, radius, start angle, end angle, anticlockwise
        context.fill();

        context.beginPath();
        context.strokeStyle = "red"; // color
        context.lineWidth = 2;
        context.arc(this.m, this.n, 4, 0, Math.PI, false); // draw semicircle for smiling
        context.stroke();

        // eyes
        context.beginPath();
        context.fillStyle = "green"; // color
        context.arc(this.m - 2, this.n - 2, 1, 0, Math.PI * 2, true); // draw left eye
        context.fill();
        context.arc(this.m + 2, this.n - 2, 1, 0, Math.PI * 2, true); // draw right eye
        context.fill();
        // body
        context.beginPath();
        context.moveTo(this.m, this.n + 8);
        context.lineTo(this.m, this.n + 25);
        context.strokeStyle = "navy";
        context.stroke();

        // arms
        context.beginPath();
        context.strokeStyle = "#0000ff"; // blue
        context.moveTo(this.m, this.n + 8);
        context.lineTo(this.m - 10, this.n + 20);
        context.moveTo(this.m, this.n + 8);
        context.lineTo(this.m + 10, this.n + 20);
        context.stroke();

        // legs
        context.beginPath();
        context.strokeStyle = "orange";
        context.moveTo(this.m, this.n + 25);
        context.lineTo(this.m + 8, this.n + 50);
        context.moveTo(this.m, this.n + 25);
        context.lineTo(this.m - 8, this.n + 50);
        context.stroke();

        /*
        context.fillStyle = "#29acd1";
        context.fillRect(this.x, this.y, 80, 70);
        */
    };
    this.changex = function (pos) {
        this.x = pos;
    };
    this.changey = function (pos) {
        this.y = pos;
    };
    this.leftlegmove = function (x, y) {
        this.x = x;
        this.y = y;
    };
    this.rightlegmove = function (x, y) {
        this.x1 = x;
        this.y1 = y;
    };
    var obj = 10;
    this.update = function () {
        this.draw();
    };
    this.move = function (m1, n1) {
        if (this.m + m1 < canvas.width && this.m + m1 > 0) {
            this.m += m1;
        }
        if (this.n + n1 < canvas.height && this.n + n1 > 0) {
            this.n += n1;
        }
        this.draw();
    };
    this.walk = function () {
        if (obj > 9) {
            this.rightlegmove(this.m + 20, 120 + this.n);
            this.leftlegmove(this.m, this.n + 100);
            obj = 7;
        } else {
            this.leftlegmove(this.m - 10, this.n + 120);
            this.rightlegmove(this.m - 20, this.n - 120);
            obj = 10;
        }
        this.draw();
    };
    this.offscreen = function () {
        if (this.y < 0) {
            return true;
        }
        return false;
    };
    //this.personcollides = function (rects) {
    //    var isCollision = false;        
    //    for (var i = 0, len = rects.length; i < len; i++) {           
    //        var a = this.m - rects[i].x;
    //        var b = this.n - rects[i].y;
    //        var c = Math.sqrt(a * a + b * b);
    //       // console.log(c);
    //        if (c < 150) {
    //            isCollision = true;
    //        }
    //    }
    //    return { code: isCollision};
    //};
    //this.shopcollides = function (rects) {
    //    var isCollision = false;
    //    for (var i = 0, len = rects.length; i < len; i++) {
    //        var a = this.m - rects[i].x;
    //        var b = this.n - rects[i].y;
    //        var c = Math.sqrt(a * a + b * b);
    //        // console.log(c);
    //        if (c < 5) {
    //            isCollision = true;
    //        }
    //    }
    //    return { code: isCollision };
    //};
    //this.collides = function (personobj,shopobj) {
    //    var isCollision = false;
    //    var x = false;
    //    var y = false;
    //    for (var i = 0, len = personobj.length; i < len; i++) { D
    //        var a = this.m - personobj[i].m;
    //        var b = this.n - personobj[i].n;
    //        var c = Math.sqrt(a * a + b * b);
    //        // console.log(c);
    //        if (c < 1) {
    //            x = true;
    //        }
    //    }
    //    for (var i = 0, len = shopobj.length; i < len; i++) {
    //        var a = this.m - shopobj[i].x;
    //        var b = this.n - shopobj[i].y;
    //        var c = Math.sqrt(a * a + b * b);
    //        // console.log(c);
    //        if (c < 1) {
    //            y = true;
    //        }
    //    }
    //    if (x && y) {
    //        isCollision = true;
    //    }
    //    return { code: isCollision };
    //};
    this.Login = function () {
        var isCollision = false;
        if (this.persondetail.session == sessionid) {
            isCollision = true;
        }
        return { code: isCollision };
    };
};
var personobj = [];
function loadCanvas(dataURL) {    
    // load image from data url
    
}
function collidesLast(personobj, shopobj) {
    var isCollision = false;
    var y = false;
    for (var i = 0, len = shopobj.length; i < len; i++) {
        var a = shopobj[i].x - personobj.m;
        var b = shopobj[i].y - personobj.n
        var c = Math.sqrt(a * a + b * b);
              
        if (c < 72) {
            y = true;
        }
    }
    if (y) {
        isCollision = true;
    }
    return isCollision;
};
function shops(x, y, dx, dy,speed,shopdetail) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
    this.shopdetailmain = shopdetail;
    var img = "";
    var imageObj = null;
    this.door = null;

    this.draw = function () {
        //context.fillStyle = "#7b4812";
        //context.fillRect(this.x, this.y, this.dx, this.dy);
        //context.fillStyle = "#0c59cf";
        //context.font = "12px sans-serif";
       
        context.strokeStyle = "black";
        context.beginPath();
        context.lineWidth = 2;
        context.rect(this.x+5, this.y-15, 20, 5);
        context.stroke();
        context.fillStyle = "White";
        context.fill();
        //left top

        context.beginPath();
        context.rect(this.x+40, this.y - 15, 20, 5);
        context.stroke();
        context.fillStyle = "White";
        context.fill();
        //right Top

        context.beginPath();
        context.rect(this.x, this.y-10, 65, 45);
        context.stroke();
        //body

        //context.beginPath();
        //context.rect(this.x-10, this.y, 90, 5);
        //context.stroke();
        ////center top 
        //context.beginPath();
        //context.rect(this.x - 10, this.y + 50, 90, 10);
        //context.stroke();
        ////center bottom 

        context.beginPath();
        context.rect(this.x+5, this.y+5, 35, 20);
        context.stroke();
        context.fillStyle = "#8fe0e0";
        context.fill();
        //window

        context.beginPath();
        context.rect(this.x+45, this.y+8, 15, 25);
        context.stroke();
        context.fillStyle = "#425572";
        context.fill();
        this.door = { x: this.x + 45, y: this.y + 8, dx: 15, dy: 25 }
        
        //door
        context.beginPath();
        context.arc(this.x+58, this.y+23, 1, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = "#a2aab5";
        context.fill();
        //door knob
        context.fillStyle = "black";
        context.strokeStyle = "black";
        context.font = "9px Arial";
        if (this.shopdetailmain != null) {
            if (imageObj == null) {
                imageObj = new Image();
                imageObj.onload = function () {
                    context.drawImage(imageObj, this.x + 5, this.y + 5, 35, 20);
                };
              //  imageObj.src = "/Item/getImage/1";
            } else {
               // context.drawImage(imageObj, this.x + 5, this.y + 5, 35, 20);
            }
            context.fillText(this.shopdetailmain.ID + "", this.x + 30, this.y);
            context.fillText(this.shopdetailmain.Name + "", this.x+5, this.y);
            //context.fillText(this.shopdetailmain.Location + "", this.x, this.y + 50);
        } else {
            context.font = "12px sans-serif";
            context.fillText("Epmty Shop", this.x, this.y + 30);
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
canvas.onmousemove = function (e) {

    var x = e.offsetX, y = e.offsetY,i = 0, r;   
    while (r = drawanShops[i++]) {
        // add a single rect to path:
        context.beginPath();
        context.rect(r.x, r.y, r.dy, r.dx);

        if (context.isPointInPath(x, y)) {
            context.fillStyle = "blue";           
            context.fill();
        }
    }
};
canvas.addEventListener('click', function (e) {
    var x = e.offsetX, y = e.offsetY,   
    i = 0, r;    
    while (r = drawanShops[i++]) {
        // add a single rect to path:
        context.beginPath();
        context.rect(r.x - 10, r.y - 10, r.dy, r.dx);
        if (context.isPointInPath(x, y)) {           
            window.location.href = '/ViewShop/ViewShop/' + drawanShops[i-1].shopdetailmain.ID;
            
        }
    }  
}, false);
function Circle(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 200;
    this.dy = 200;
    this.radius = 30;

    this.draw = function () {

        context.beginPath();
        context.arc(this.x, this.y, 30, 0, Math.PI * 2, false);
        context.strokeStyle = '#b20000';
        context.stroke();
        context.fill();
    };
    this.update = function () {
        if (this.x + this.radius > innerWidth - 200 || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight - 200 || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
};

var circlearray = [];
var shoparray = [];
var roadarray = [];
var last5shops = [];
/*
for (var i = 0; i < 800; i++) {
    var x = Math.random() * window.innerWidth - 200;
    var y = Math.random() * window.innerHeight - 200;
    var dx = Math.random();
    var dy = Math.random();
    var radius = 30;
    
    circlearray.push(new Circle(x, y, dx, dy, radius));
}

*/
var fps = 60

var paused = false;
var outroads = [];
var drawanShops = [];
function animate() {
    setTimeout(function () {
        requestAnimationFrame(animate);
    }, 1000 / fps);
    //requestAnimationFrame(animate);
    context.clearRect(0, 0, 1200, 900);
    
    if (roadarray.length > 0) {
        if ($(window).width() <= 600) {
            if (roadarray.length > 1)
            { outroads.push(roadarray.pop()); }

        } else {
            if (roadarray.length < 3) {
                if (outroads.length > 0) {

                    roadarray.push(outroads.pop());
                }
            }
        }
        for (var i = 0; i < roadarray.length; i++) {
            roadarray[i].draw();
        }
        
    }
    if (personobj.length > 0) {
        for (var i = 0; i < personobj.length; i++) {
            personobj[i].walk();

            if (collidesLast(personobj[i], last5shops) == true) {
                if (processing.length == 0) {
                    processing.push(1);
                    lastobj = last5shops[last5shops.length - 1];
                    getMoreShops(lastobj);
                    
                }
                
            }
            /*
           // var rect = personobj[i].personcollides(personobj);
           // var rectx = personobj[i].shopcollides(shoparray);
            var rectxx = personobj[i].collides(personobj,shoparray);
            var checklogin = personobj[i].Login();
            if (rectxx.code || checklogin.code) {
                personobj[i].walk();
           
            }
             */
        }
    }
    for (var j = 0; j < shoparray.length; j++) {
        if (shoparray[j].y <= 300 && shoparray[j].y > -30) {
            var index = $.inArray(shoparray[j], drawanShops);
            if (index == -1) {
                drawanShops.push(shoparray[j]);
            }
            shoparray[j].update();
        } else {
            shoparray[j].y -= shoparray[j].speed;
            var index = $.inArray(shoparray[j], drawanShops);
            if (index != -1) {                
                drawanShops.splice(index, 1);                
            }                       
        }
        
        /*
        var intvalue = Math.round(dist(shoparray[j].dx/2, shoparray[j].dy/2, mouse.x, mouse.y));
        if (intvalue < 60) {
            console.log(intvalue + ' ' + j);
        }
         console.log(intvalue + ' ' + j)
        */
    }
    /*
    for (var i = 0; i < circlearray.length; i++) {
        circlearray[i].update();
    }
    */
};
function removeItem(array, item) {
    for (var i in array) {
        if (array[i] == item) {
            array.splice(i, 1);
            break;
        }
    }
}
var processing = [];
function getMoreShops(lastobj)
{
    if (lastobj.shopdetailmain.ID != shoparray[shoparray.length - 1].shopdetailmain.ID) {
        return;
    }
    if (processing.length ==1) {        
            $.ajax({
            url: '/ShowShops/GetMoreShops',
            data: { 'ID': lastobj.shopdetailmain.ID },
            type: "POST",
            success: function (data) {
            if (data != null) {
            createshops(data);
                              }                
            }
        });
        processing.pop();
    }
}
$(function () {
    $("#myRange").change(function () {
        var newval = $(this).val();
        $("#minbeds").val(newval);
        for (var i = 0; i < shoparray.length; i++) {
            shoparray[i].speed = newval;
        }
    });

    $("#minbeds").on("change", function () {
        var newval = $(this).val();
        $("#myRange").val(newval);
        for (var i = 0; i < shoparray.length; i++) {
            shoparray[i].speed = newval;
        }
    });
});
function dist(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    var c = Math.sqrt(a * a + b * b);
    return c;
};
var xy = 220;
var yx = 80;
function createperson(arrx)
{
    while (personobj.length > 0) {
        personobj.pop();
    }
    if (arrx.length > 0) {
        for (var i = 0; i < arrx.length; i++) {
             
                personobj.push(new person(arrx[i]));

        }
    }/*
    if (arrx.length > 0) {
        for (var i = 0; i < arrx.length; i++)
        {
            if (personobj.length > 0) {
                if (!(contains(personobj,arrx[i]))) {                   
                        personobj.push(new person(arrx[i]));
                        xy += 350;                    
                } else
                {
                    
                }
            } else {
                personobj.push(new person(arrx[i]));
            }
            
            
            
        }
    }
    */
};
function createshops(arr) {

    
    var count = 0;
    var x = 10;
    var y = 30;
    var speed = 1;
    if (shoparray.length > 0) {
        y = shoparray[shoparray.length - 1].y;
        if (shoparray[shoparray.length - 1].x > 10) {
            x = shoparray[shoparray.length - 1].x + 125;
        } else if (shoparray[shoparray.length - 1].x == 10) {
            x = 10;
        }
        speed = shoparray[shoparray.length - 1].speed;
    }    
    while (count < arr.length) {
        for (var j = 0; j < 5; j++) {           
            if (count < arr.length) {
                shoparray.push(new shops(x, y, 50, 70, speed, arr[count]));
            } else{break;}                    
            x += 125;
            if (x > 600) {
                x = 10;
            }        
            count += 1;
        }
        y += 100;
    }
        
    last5shops = shoparray.slice(shoparray.length - 5, shoparray.length);
   
};
function createRoad(count)
{
    var valuex = 100;
    for (var i = 0; i < count; i++) {
        roadarray.push(new road(valuex, 0));
        valuex += 125;
    }
}

var mouse = {
    x: 0,
    y: 0
};

var colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];


// Event Listeners
addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;    
});

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