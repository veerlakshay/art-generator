const canvas = document.getElementById('artCanvas');
const ctx = canvas.getContext('2d');
const generateButton = document.getElementById('generateButton');
const shapeCountSlider = document.getElementById('shapeCount');
const shapeSizeSlider = document.getElementById('shapeSize');
const artContainer = document.getElementById('artContainer');

// Predefined set of soft, pastel colors
const pastelColors = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
    '#D4A5A5', '#D4C4A5', '#D4D4A5', '#A5D4A5', '#A5D4D4'
];

// Function to get a random pastel color
function getRandomPastelColor() {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
}

// Function to generate random color for shapes
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to generate random shapes with user inputs
function generateRandomArt() {
    // Add blur-out animation
    artContainer.classList.add('blur-out');
    
    // Wait for the blur-out animation to complete
    setTimeout(() => {
        // Clear the canvas before drawing new art
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get user input values
        const numberOfShapes = shapeCountSlider.value;
        const shapeSize = shapeSizeSlider.value;

        for (let i = 0; i < numberOfShapes; i++) {
            const shapeType = Math.floor(Math.random() * 5); // 0 for circle, 1 for rectangle, 2 for line, 3 for triangle, 4 for ellipse
            const color = getRandomColor();
            const x = Math.floor(Math.random() * canvas.width);
            const y = Math.floor(Math.random() * canvas.height);

            // Randomize shapes
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;

            if (shapeType === 0) {
                // Draw Circle
                ctx.beginPath();
                ctx.arc(x, y, shapeSize, 0, Math.PI * 2);
                ctx.fill();
            } else if (shapeType === 1) {
                // Draw Rectangle
                ctx.fillRect(x, y, shapeSize, shapeSize);
            } else if (shapeType === 2) {
                // Draw Line
                const x2 = Math.floor(Math.random() * canvas.width);
                const y2 = Math.floor(Math.random() * canvas.height);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            } else if (shapeType === 3) {
                // Draw Triangle
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + shapeSize, y);
                ctx.lineTo(x + shapeSize / 2, y - shapeSize);
                ctx.closePath();
                ctx.fill();
            } else if (shapeType === 4) {
                // Draw Ellipse
                ctx.beginPath();
                ctx.ellipse(x, y, shapeSize, shapeSize / 2, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Change colors to random pastel colors
        const newBackgroundColor = getRandomPastelColor();
        const newContainerColor = getRandomPastelColor();
        const newButtonColor = getRandomPastelColor();

        document.body.style.background = newBackgroundColor;
        artContainer.style.background = newContainerColor;
        generateButton.style.background = newButtonColor;

        // Add blur-in animation
        artContainer.classList.remove('blur-out');
        artContainer.classList.add('blur-in');
    }, 200); // Duration of the blur-out animation
}

// Event listener to trigger art generation on button click
generateButton.addEventListener('click', generateRandomArt);

// Initialize with some art when the page loads
generateRandomArt();