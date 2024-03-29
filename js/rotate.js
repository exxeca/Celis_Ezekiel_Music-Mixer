document.addEventListener("DOMContentLoaded", function() {
    // Query Selectors
    const vinyl = document.getElementById("vinyl");
    const rotationDial = document.getElementById("rotationdl");
    let isMouseDown = false;
    let previousAngle = 0;
    let initialRotation = 0;

    // Function to calculate angle between two points
    function getAngle(x1, y1, x2, y2) {
        return Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
    }

    rotationDial.addEventListener("mousedown", function(event) {
        isMouseDown = true;
        const startX = event.clientX;
        const startY = event.clientY;

        const dialRect = rotationDial.getBoundingClientRect();
        const centerX = dialRect.left + dialRect.width / 2;
        const centerY = dialRect.top + dialRect.height / 2;

        initialRotation = getRotation(rotationDial.style.transform);
        previousAngle = getAngle(startX, startY, centerX, centerY) - initialRotation;

        document.addEventListener("mousemove", rotateVinylWithDial);
    });

    document.addEventListener("mouseup", function() {
        isMouseDown = false;
        document.removeEventListener("mousemove", rotateVinylWithDial);
    });

    function rotateVinylWithDial(event) {
        if (isMouseDown) {
            const currentX = event.clientX;
            const currentY = event.clientY;

            const dialRect = rotationDial.getBoundingClientRect();
            const centerX = dialRect.left + dialRect.width / 2;
            const centerY = dialRect.top + dialRect.height / 2;

            const currentAngle = getAngle(currentX, currentY, centerX, centerY);
            const rotation = currentAngle - previousAngle;
            const newRotation = initialRotation + rotation;

            rotationDial.style.transform = `rotate(${newRotation}deg)`;
            vinyl.style.transform = `rotate(${newRotation}deg)`;
        }
    }

    // Function to extract rotation value from transform string
    function getRotation(transformValue) {
        const match = transformValue.match(/rotate\(([-]?\d+)deg\)/);
        return match ? parseInt(match[1]) : 0;
    }
});
