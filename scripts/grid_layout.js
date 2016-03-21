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
    ctx.strokeStyle = '#d4d4d4';
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

function find_x_of(column){
    return column*(cell_width+cell_offset) + 2;
}

function find_y_of(row){
    return row*(cell_height+cell_offset) + 2;
}


function find_row_of(y){
    return Math.round(y/cell_height);
}

function find_column_of(x){
    return Math.round(x/cell_width);
}

function detect_collision_at(element, c,r){
    var widget = document.getElementsByClassName("widget");

    console.debug("Checking : " + c + "," + r);
    for(var i = 0; i<widget.length; i++){

        var viewportOffset = widget[i].getBoundingClientRect();
        var y = viewportOffset.top || 0;
        var x = viewportOffset.left || 0;

        var col = find_column_of(x);
        var row = find_row_of(y);

        console.debug("Current : " + col +", " + row)
        if(col == c && row == r && element.id != widget[i].id) {
            return true;
        }
    }
    return false;
}

function toggle(visibility){
    var canvas = document.getElementById("grid");
    if(visibility) canvas.style.visibility="visible";
    else canvas.style.visibility="hidden";
}

drawGrid(global_width, global_height, "grid");
toggle(false);