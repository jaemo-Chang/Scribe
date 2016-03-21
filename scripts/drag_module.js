interact('.widget')
    .draggable({
        inertia:true,
        snap: {
            targets: [
                interact.createSnapGrid({ x: cell_width+cell_offset, y: cell_height+cell_offset })
            ],
            offset: { x: 2, y: 2 },
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ],
            endOnly: true
        },
        restrict: {
            restriction: document.getElementById("grid"),
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
            endOnly: true
        },
        onstart: function(event){
            event.target.setAttribute("data-start_x", parseFloat(event.target.getAttribute('data-x')) || 0);
            event.target.setAttribute("data-start_y", parseFloat(event.target.getAttribute('data-y')) || 0);
            toggle(true);
        },
        onmove: dragMoveListener,
        onend: function (event) {
            console.debug(event.target.id);
            var element = document.getElementById(event.target.id), target = event.target;

            var viewportOffset = element.getBoundingClientRect();
            var y = viewportOffset.top || 0;
            var x = viewportOffset.left || 0;

            var row = find_row_of(y);
            var column = find_column_of(x);
            console.debug("r: " + row + "," + "c:" + column);
            element && (element.textContent = element.id + ": " + column + "," + row);

            if(detect_collision_at(element, column,row)){
                console.debug("COLLISION");
                let x = target.getAttribute("data-start_x");
                let y = target.getAttribute("data-start_y");
                target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }

        }
    })
    .on("draginertiastart", function(){
        toggle(false);
    })
    .resizable({
        invert: 'none',
        inertia:true,
        square: false,
        preserveAspectRatio: false,
        edges: { left: true, right: true, bottom: true, top: true },
        snap: {
            targets: [
                interact.createSnapGrid({ x: cell_width+cell_offset, y: cell_height+cell_offset })
            ],
            offset: { x: 2, y: 2 },
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ],
            endOnly: true
        },
        restrict: {
            restriction: document.getElementById("grid"),
            endOnly: true
        },
        onstart: function(event){
            toggle(true);
        },
        onmove: dragResizeListener,
    })
    .on("resizeinertiastart", function(event){
        toggle(false);
    });

function testResizeListener(event){
    console.debug(event.rect);
}

function dragResizeListener(event){
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges

    if(event.rect.width>cell_width-cell_offset){
        x += event.deltaRect.left;
        target.setAttribute('data-x', x);
    }
    else{
        x += event.deltaRect.left;
        target.setAttribute('data-x', x);
    }
    if(event.rect.height>cell_height-cell_offset){
        y += event.deltaRect.top;
        target.setAttribute('data-y', y);
    }
    else{
        y += event.deltaRect.top;
        target.setAttribute('data-y', y);
    }
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
}

function dragMoveListener (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}