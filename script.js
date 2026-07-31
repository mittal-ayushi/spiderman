var mycanvas = document.getElementById("field");
var ctx = mycanvas.getContext("2d");
var pointsize = 5;
var limit = 100;
var nodes = 3000;
var margin = 20;
var points = [];
var startbtn = document.getElementById("field");

var frontImg = document.querySelector('.front-img');
var parallaxSpeed = 0.5;

function updateParallax() {
    if (!frontImg) return;
    frontImg.style.transform = 'translateY(' + (-window.scrollY * parallaxSpeed) + 'px)';
}

window.addEventListener('scroll', updateParallax);
function resizeCanvas() {
    mycanvas.width = document.documentElement.scrollWidth;
    mycanvas.height = document.documentElement.scrollHeight;
}
function randomizePoints() {
    points = [];
    for (let i = 0; i < nodes; i++) {
        var point = new set_point_elm();

        point.x = Math.floor(Math.random() * (mycanvas.width - margin * 2) + margin);
        point.y = Math.floor(Math.random() * (mycanvas.height - margin * 2) + margin);
        point.opacity = 1;

        points.push(point);
    }
}

var point_a = new set_point_elm();
point_a.x = 250;
point_a.y = 250;
window.addEventListener('load', function () {
    resizeCanvas();
    randomizePoints();
    updateParallax();
});

window.addEventListener('resize', function () {
    resizeCanvas();
    randomizePoints();
    updateParallax();
});

document.addEventListener('mousemove', function (e) {
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    point_a.x = e.pageX;
    point_a.y = e.pageY;

    points.forEach(function (elm) {
        elm.draw();

        var dis_val = Math.sqrt(
            Math.pow(elm.x - point_a.x, 2) +
            Math.pow(elm.y - point_a.y, 2)
        );

        if (dis_val <= limit) {
            point_a.node_opacity = (limit - dis_val) / limit;
            point_a.link_node(elm.x, elm.y);
        }
    });

    point_a.draw();
});

function set_point_elm() {
    this.x = 0;
    this.y = 0;
    this.red = 255;
    this.green = 255;
    this.blue = 255;
    this.opacity = 1;
    this.node_opacity = 1;

    this.draw = function () {
        ctx.fillStyle = 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.opacity + ')';
        ctx.fillRect(this.x, this.y, pointsize, pointsize);
    };

    this.link_node = function (p_two_x, p_two_y) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + this.node_opacity + ')';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(p_two_x, p_two_y);
        ctx.stroke();
    };
}
//to add - cobweb!

//mouse scroll logic
window.addEventListener('wheel',function(e){
    e.preventDefault();
}, { passive :false});

window.addEventListener('touchmove',function(e){
    e.preventDefault();
}, { passive :false});

window.addEventListener('keydown',function(e){
    var keys = ['ArrowUp','ArrowDown','PageUp','PageDown']
    if (keys.indexOf(e.key) !== -1) {
        e.preventDefault();
    }});

var mouseScrollY = window.innerHeight / 2;
 
document.addEventListener('mousemove', function (e) {
    mouseScrollY = e.clientY;
});
 
function autoScrollLoop() {
    var center = window.innerHeight / 2;
    var deadZonePx = window.innerHeight * 0.15;
    var maxSpeed = 14; 
 
    var offset = mouseScrollY - center;
    var distanceIntoZone = Math.abs(offset) - deadZonePx;
 
    if (distanceIntoZone > 0) {
        var maxDistance = center - deadZonePx;
        var normalized = Math.min(distanceIntoZone / maxDistance, 1);
        var direction = offset > 0 ? 1 : -1;
        window.scrollBy(0, normalized * maxSpeed * direction);
    }
 
    requestAnimationFrame(autoScrollLoop);
}
requestAnimationFrame(autoScrollLoop);



