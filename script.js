var mycanvas = document.getElementById("field");
var ctx = mycanvas.getContext("2d");
var pointsize = 5;
var limit = 100;
var nodes = 1000;
var margin = 20;
var points = [];

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
        point.opacity = 0.1;

        points.push(point);
    }
}

var point_a = new set_point_elm();
point_a.x = 250;
point_a.y = 250;

// Wait for everything (including bg.jpg) to load so scrollHeight is accurate.
window.addEventListener('load', function () {
    resizeCanvas();
    randomizePoints();
});

window.addEventListener('resize', function () {
    resizeCanvas();
    randomizePoints();
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
            // Normalize to a 0-1 alpha value instead of an unbounded percentage
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