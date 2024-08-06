function startScan() {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        const video = document.createElement('video');
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        document.body.appendChild(video);

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();

                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.style.position = 'absolute';
                canvas.style.top = '0';
                canvas.style.left = '0';
                document.body.appendChild(canvas);
                const ctx = canvas.getContext('2d');

                const points = [];

                function draw() {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = 'green';
                    points.forEach(point => {
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    requestAnimationFrame(draw);
                }

                canvas.addEventListener('click', event => {
                    const rect = canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    points.push({ x, y });
                });

                draw();

                setTimeout(() => {
                    document.body.removeChild(video);
                    document.body.removeChild(canvas);
                    alert("Scanned your home. Click 'Finish' to complete.");
                    document.getElementById('finish-button').style.display = 'block';
                }, 10000);
            })
            .catch(err => {
                alert('Error accessing the camera: ' + err);
            });

        const finishButton = document.createElement('button');
        finishButton.id = 'finish-button';
        finishButton.style.display = 'none';
        finishButton.innerText = 'Finish';
        finishButton.onclick = () => {
            finishButton.style.display = 'none';
            alert("Start finding hidden objects around your home!");
        };
        document.body.appendChild(finishButton);
    } else {
        alert('You need to be logged in to start the game.');
        window.location.href = 'login.html';
    }
}