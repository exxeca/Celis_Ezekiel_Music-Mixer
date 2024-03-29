document.addEventListener("DOMContentLoaded", function() {
    // Query Selectors
    const dial = document.getElementById("volumedl");
    let isMouseDown = false;
    let previousAngle = 0;
    let initialRotation = 0;
    const audio = document.getElementById("audio1");
    

    // Function to calculate angle between two points
    function getAngle(x1, y1, x2, y2) {
        return Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
    }

    dial.addEventListener("mousedown", function(event) {
        isMouseDown = true;
        const startX = event.clientX;
        const startY = event.clientY;

        const dialRect = dial.getBoundingClientRect();
        const centerX = dialRect.left + dialRect.width / 2;
        const centerY = dialRect.top + dialRect.height / 2;

        initialRotation = getRotation(dial.style.transform);
        previousAngle = getAngle(startX, startY, centerX, centerY) - initialRotation;

        document.addEventListener("mousemove", rotateDial);
    });

    document.addEventListener("mouseup", function() {
        isMouseDown = false;
        document.removeEventListener("mousemove", rotateDial);
    });

    function rotateDial(event) {
        if (isMouseDown) {
            const currentX = event.clientX;
            const currentY = event.clientY;

            const dialRect = dial.getBoundingClientRect();
            const centerX = dialRect.left + dialRect.width / 2;
            const centerY = dialRect.top + dialRect.height / 2;

            const currentAngle = getAngle(currentX, currentY, centerX, centerY);
            const rotation = currentAngle - previousAngle;
            const newRotation = initialRotation + rotation;

            dial.style.transform = `rotate(${newRotation}deg)`;

            // Adjust audio volume based on rotation angle thresholds
            if (newRotation >= -45 && newRotation <= 45) {
                // Map the rotation angle to volume range (0 to 1)
                const volume = (newRotation + 45) / 90;
                audio.volume = Math.max(0, Math.min(1, volume));
            }
        }
    }

    // Function to extract rotation value from transform string
    function getRotation(transformValue) {
        const match = transformValue.match(/rotate\(([-]?\d+)deg\)/);
        return match ? parseInt(match[1]) : 0;
    }






});


// ---------------------------------------------------


{/* <input id="volumeControl" type="range" min="0" max="100" step="1"> */}




{/* volSlider = document.querySelector('#volumedl'); */}