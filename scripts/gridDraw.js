/**
 * Created by JohnBae on 3/17/16.
 */

var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.getElementById("grid");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}

var drawGrid = function(w, h, id) {
    var wOffs = w/8;
    var hOffs = h/5;
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');

    ctx.color = '#ffffff';
    ctx.canvas.width  = w;
    ctx.canvas.height = h;
    ctx.strokeStyle = '#ffffff';
    //ctx.lineWidth = 1;
    ctx.stroke();

    for (x=0;x<=w;x+=wOffs) {
        for (y=0;y<=h;y+=hOffs) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
    }
    //canvas.style.transform = "scale3d(0.5,0.5,0)";
};

drawGrid(window.innerWidth, window.innerHeight, "grid");
//var canvas = createHiDPICanvas(500, 250,1);