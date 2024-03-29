document.addEventListener("DOMContentLoaded", function() {
    // Query Selectors
    const draggables = document.querySelectorAll('.item-lb');
    const dropTargets = document.querySelectorAll('.item');
    const audioElement = document.getElementById('audio1');
    const pauseaudio = document.getElementById('pp');
    const resetBtn = document.querySelector('#resetbtn');
    var vinyl = document.getElementById("vinyl");

    

    const volSlider = document.querySelector('#volumedl');

    // Create an AudioContext
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // Create an AnalyserNode
    const analyser = audioContext.createAnalyser();
    // Connect the AnalyserNode to the audioElement
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Functions
    function handleDragStart() {
        this.classList.add('dragging');
    }

    function handleDragEnd() {
        this.classList.remove('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        const draggable = document.querySelector('.dragging');
        this.appendChild(draggable);

        // Get the track reference from the dropped item
        const trackRef = draggable.dataset.trackref;
        // Load and play the corresponding audio
        loadAudio(trackRef);
        console.log('music played');

        vinyl.classList.add("rotate");
    }

    // Function to load audio
    function loadAudio(trackRef) {
        let currentSrc = `audios/${trackRef}.mp3`;
        // Set the new audio source
        audioElement.src = currentSrc;
        // Load the new audio source
        audioElement.load();
        // Tell the audio element to play
        audioElement.play();

        startVisualizer(); // Call the visualizer function after the audio starts playing
    }

    // Function to pause the audio
    function pause(e) {
        if (audioElement.paused) {
            audioElement.play();
            console.log('music played');
        } else {
            audioElement.pause();
            console.log('music paused');
        }

        vinyl.classList.remove("rotate");

    }

    // Function to reset the dropped items
    function resetdrops(e) {
        draggables.forEach(draggable => {
            draggable.removeAttribute('style'); // Remove any custom styles applied to the draggable item
            draggable.classList.remove('dragging'); // Remove the "dragging" class if it was added
            document.getElementById('grid-layout-lb').appendChild(draggable); // Append the draggable item back to its original container
        });

        vinyl.classList.remove("rotate");
        
        if (!audioElement.paused) {
            pause(e);
        }
    }

    // Function to set volume
    function setVolume() {
        audio1.volume = (this.value / 100);
    }

    // Event Listeners
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
    });

    dropTargets.forEach(dropTarget => {
        dropTarget.addEventListener('dragover', handleDragOver);
        dropTarget.addEventListener('drop', handleDrop);
    });

    pauseaudio.addEventListener('click', pause);
    resetBtn.addEventListener('click', resetdrops);

    volSlider.addEventListener('change', setVolume);


    // ----------------visualizer

    function startVisualizer() {
        analyser.fftSize = 256;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        function draw() {
            var canvas = document.getElementById("tv-layout");
            var ctx = canvas.getContext("2d");
            var WIDTH = canvas.width;
            var HEIGHT = canvas.height;

            // Create gradient
            var gradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, 'red');

            requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, WIDTH, HEIGHT);

            var barHeight;
            var barWidth = WIDTH / bufferLength;
            var x = 0;

            for (var i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] * 0.4; // Adjust the multiplier to control the wave amplitude

                ctx.fillStyle = gradient; // Set the gradient as fill style
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight * 2); // Adjusted for horizontal visualizer

                x += barWidth + 1;
            }
        }

        draw();

    }
});