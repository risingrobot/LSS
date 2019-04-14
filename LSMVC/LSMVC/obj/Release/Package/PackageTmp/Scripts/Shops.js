var canvas = document.querySelector('canvas');
canvas.width = 1200;
canvas.height = 900;
var context = canvas.getContext('2d');
 
citynames = []
var sessionid = ""
window.onload = function myFunction() {
  
    window.addEventListener('keydown', doKeyDown, false);
    getLocation();
    $("#closbtn").click(function() {
       
        $('#myModal').modal('hide');
    });  
    
    $("#btn_chooseLocation").click(function () {
        $.ajax({
            url: '/ShowShops/getShops',
            data: { 'name': $('#CityName :selected').val() },
            type: "POST",
            success: function (data) {
                if (data instanceof Array) {
                    $('#myModal').modal('hide');
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
                    personobj[i].move(-340, 0);
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
                    personobj[i].move(340, 0);

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
        context.lineTo(this.x, innerHeight);
        context.lineWidth = 100;
        context.strokeStyle = '#8c8c8c';
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
        context.font = "18px sans-serif";
        context.fillText(this.persondetail.email + "", this.m-20, this.n -20);   
        context.beginPath();
        context.fillStyle = "bisque"; // #ffe4c4
        context.arc(this.m, this.n, 15, 0, Math.PI * 2, true); // draw circle for head
        // (x,y) center, radius, start angle, end angle, anticlockwise
        context.fill();

        context.beginPath();
        context.strokeStyle = "red"; // color
        context.lineWidth = 3;
        context.arc(this.m, this.n, 8, 0, Math.PI, false); // draw semicircle for smiling
        context.stroke();

        // eyes
        context.beginPath();
        context.fillStyle = "green"; // color
        context.arc(this.m - 5, this.n - 5, 3, 0, Math.PI * 2, true); // draw left eye
        context.fill();
        context.arc(this.m + 5, this.n - 5, 3, 0, Math.PI * 2, true); // draw right eye
        context.fill();
        // body
        context.beginPath();
        context.moveTo(this.m, this.n + 10);
        context.lineTo(this.m, this.n + 70);
        context.strokeStyle = "navy";
        context.stroke();

        // arms
        context.beginPath();
        context.strokeStyle = "#0000ff"; // blue
        context.moveTo(this.m, this.n + 20);
        context.lineTo(this.m - 20, this.n + 60);
        context.moveTo(this.m, this.n + 20);
        context.lineTo(this.m + 20, this.n + 60);
        context.stroke();

        // legs
        context.beginPath();
        context.strokeStyle = "orange";
        context.moveTo(this.m, this.n + 70);
        context.lineTo(this.m + 15, this.n + 120);
        context.moveTo(this.m, this.n + 70);
        context.lineTo(this.m - 15, this.n + 120);
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
    this.personcollides = function (rects) {
        var isCollision = false;        
        for (var i = 0, len = rects.length; i < len; i++) {           
            var a = this.m - rects[i].x;
            var b = this.n - rects[i].y;
            var c = Math.sqrt(a * a + b * b);
           // console.log(c);
            if (c < 300) {
                isCollision = true;
            }
        }
        return { code: isCollision};
    };
    this.shopcollides = function (rects) {
        var isCollision = false;
        for (var i = 0, len = rects.length; i < len; i++) {
            var a = this.m - rects[i].x;
            var b = this.n - rects[i].y;
            var c = Math.sqrt(a * a + b * b);
            // console.log(c);
            if (c < 300) {
                isCollision = true;
            }
        }
        return { code: isCollision };
    };
    this.collides = function (personobj,shopobj) {
        var isCollision = false;
        var x = false;
        var y = false;
        for (var i = 0, len = personobj.length; i < len; i++) {
            var a = this.m - personobj[i].m;
            var b = this.n - personobj[i].n;
            var c = Math.sqrt(a * a + b * b);
            // console.log(c);
            if (c < 200) {
                x = true;
            }
        }
        for (var i = 0, len = shopobj.length; i < len; i++) {
            var a = this.m - shopobj[i].x;
            var b = this.n - shopobj[i].y;
            var c = Math.sqrt(a * a + b * b);
            // console.log(c);
            if (c < 200) {
                y = true;
            }
        }
        if (x && y) {
            isCollision = true;
        }
        return { code: isCollision };
    };
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

function shops(x, y, dx, dy,shopdetail) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = 1;
    this.shopdetailmain = shopdetail;
    var img = "";
    var imageObj = null;


    this.draw = function () {
        context.fillStyle = "#659363";
        context.fillRect(this.x, this.y, this.dx, this.dy);
        context.fillStyle = "#7e58e8";
        context.font = "25px sans-serif";
        if (this.shopdetailmain != null) {                      
            if (imageObj == null) {
                imageObj = new Image();
                imageObj.onload = function () {
                    context.drawImage(imageObj, this.x, this.y, 100, 50);
                };
                imageObj.src = "/Item/getImage/1";
            } else {
                context.drawImage(imageObj, this.x, this.y, 120, 70);
            }
            context.fillText(this.shopdetailmain.Shopno + "", this.x, this.y + 90);
            context.fillText(this.shopdetailmain.ShopName + "", this.x, this.y + 100);
            context.fillText(this.shopdetailmain.ShopLocation + "", this.x, this.y + 120);
        } else {
            context.font = "20px sans-serif";
            context.fillText("Epmty Shop", this.x, this.y + 80);
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

function animate() {
    setTimeout(function () {
        requestAnimationFrame(animate);
    }, 1000 / fps);
    //requestAnimationFrame(animate);
    context.clearRect(0, 0, 1200, 900);
    
    if (roadarray.length > 0) {
        for (var i = 0; i < roadarray.length; i++) {
            roadarray[i].draw();
        }
        
    }
    if (personobj.length > 0) {
        for (var i = 0; i < personobj.length; i++) {
            personobj[i].walk();/*
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
        shoparray[j].update();
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
function createshopsnroad(arr) {

    
    var count = 0;    
    var y = 30;
    for (var k = 0; k < arr.length; k++)
    {       
        var x = 30;
        for (var j = 0; j < 4; j++) {           
            if (count < arr.length) {
                shoparray.push(new shops(x, y, 120, 200, arr[count]));
            } else{break;}                    
            x += 330;
            if (x > 1020) {
                x = 30;
            }        
            count += 1;
        }
        y += 250;
    }

    //road making
    var valuex = 240;
    for (var i = 0; i < 3; i++)
    {
        roadarray.push(new road(valuex, 0));
        valuex += 330;
    }
};
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
canvas.addEventListener('click', function (e) {
    
    var rect = collides(shoparray, e.offsetX, e.offsetY);
    if (rect.code) {
        window.location.href = '/ViewShop/ViewShop/' + rect.message.shopdetailmain.id;
            } else {
      //  console.log('no collision');
    }
}, false);
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