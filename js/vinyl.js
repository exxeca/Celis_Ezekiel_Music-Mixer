document.addEventListener("DOMContentLoaded", function() {
    var rotationDial = document.getElementById("vinyl");
    var isMouseDown = false;
    var previousAngle = 0;
    var initialRotation = 0;

    // Function to calculate angle between two points
    function getAngle(x1, y1, x2, y2) {
        var angle = Math.atan2(y1 - y2, x1 - x2);
        return angle * (180 / Math.PI);
    }

    rotationDial.addEventListener("mousedown", function(event) {
        isMouseDown = true;
        var startX = event.clientX;
        var startY = event.clientY;
      
        var dialRect = rotationDial.getBoundingClientRect();
        var centerX = dialRect.left + dialRect.width / 2;
        var centerY = dialRect.top + dialRect.height / 2;
      
        initialRotation = getRotation(rotationDial.style.transform);
        previousAngle = getAngle(startX, startY, centerX, centerY) - initialRotation;
      
        document.addEventListener("mousemove", rotateDial);
    });

    document.addEventListener("mouseup", function() {
        isMouseDown = false;
        document.removeEventListener("mousemove", rotateDial);
    });

    function rotateDial(event) {
        if (isMouseDown) {
            var currentX = event.clientX;
            var currentY = event.clientY;
          
            var dialRect = rotationDial.getBoundingClientRect();
            var centerX = dialRect.left + dialRect.width / 2;
            var centerY = dialRect.top + dialRect.height / 2;
          
            var currentAngle = getAngle(currentX, currentY, centerX, centerY);
            var rotation = currentAngle - previousAngle;
            var newRotation = initialRotation + rotation;
          
            rotationDial.style.transform = "rotate(" + newRotation + "deg)";
        }
    }

    // Function to extract rotation value from transform string
    function getRotation(transformValue) {
        var match = transformValue.match(/rotate\(([-]?\d+)deg\)/);
        return match ? parseInt(match[1]) : 0;
    }
});
