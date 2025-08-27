// main.js - 3D Plant Shop Portfolio using Three.js

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Light gray for a cozy feel

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Orbit Controls for interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Lighting for homey feel: Warm ambient and point light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffd700, 1, 50); // Warm yellow light
pointLight.position.set(0, 10, 0);
pointLight.castShadow = true;
scene.add(pointLight);

// Floor (wooden-like for home feel)
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 }); // Brown wood color
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Walls for room/shop feel
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffdab9 }); // Peach for warmth

// Back wall
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
backWall.position.set(0, 5, -10);
backWall.receiveShadow = true;
scene.add(backWall);

// Left wall
const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
leftWall.position.set(-10, 5, 0);
leftWall.rotation.y = Math.PI / 2;
leftWall.receiveShadow = true;
scene.add(leftWall);

// Right wall
const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
rightWall.position.set(10, 5, 0);
rightWall.rotation.y = -Math.PI / 2;
rightWall.receiveShadow = true;
scene.add(rightWall);

// Shelves (simple boxes)
const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 }); // Dark wood

// Shelf 1 (Computer Science section)
const shelf1 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.2, 2), shelfMaterial);
shelf1.position.set(-6, 3, -8);
shelf1.castShadow = true;
shelf1.receiveShadow = true;
scene.add(shelf1);

// Shelf 2 (Engineering section)
const shelf2 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.2, 2), shelfMaterial);
shelf2.position.set(0, 3, -8);
shelf2.castShadow = true;
shelf2.receiveShadow = true;
scene.add(shelf2);

// Shelf 3 (Tech Enthusiast section)
const shelf3 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.2, 2), shelfMaterial);
shelf3.position.set(6, 3, -8);
shelf3.castShadow = true;
shelf3.receiveShadow = true;
scene.add(shelf3);

// Simple Plant Model Function
function createPlant(x, y, z) {
    // Pot (cylinder)
    const potGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const potMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 }); // Terracotta
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    pot.position.set(x, y + 0.5, z);
    pot.castShadow = true;
    scene.add(pot);

    // Stem (thin cylinder)
    const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 }); // Green
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.set(x, y + 2, z);
    stem.castShadow = true;
    scene.add(stem);

    // Leaves (spheres)
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x32cd32 }); // Lime green
    for (let i = 0; i < 3; i++) {
        const leafGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(x + (Math.random() - 0.5) * 0.5, y + 2 + i * 0.5, z + (Math.random() - 0.5) * 0.5);
        leaf.castShadow = true;
        scene.add(leaf);
    }
}

// Add plants to shelves
createPlant(-6, 3, -8); // CS shelf
createPlant(0, 3, -8); // Engineering shelf
createPlant(6, 3, -8); // Tech shelf

// Add more plants for shop feel
createPlant(-4, 0, -5);
createPlant(4, 0, -5);
createPlant(-2, 0, 2);
createPlant(2, 0, 2);

// Load font for 3D text
const loader = new THREE.FontLoader();
loader.load('./fonts/helvetiker_regular.typeface.json', function (font)  {
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

    // Computer Science text
    const csTextGeometry = new THREE.TextGeometry('Computer Science', {
        font: font,
        size: 0.5,
        height: 0.1,
    });
    const csText = new THREE.Mesh(csTextGeometry, textMaterial);
    csText.position.set(-7, 4, -9);
    csText.rotation.y = 0.2; // Slight angle for visibility
    scene.add(csText);

    // Engineering text
    const engTextGeometry = new THREE.TextGeometry('Engineering', {
        font: font,
        size: 0.5,
        height: 0.1,
    });
    const engText = new THREE.Mesh(engTextGeometry, textMaterial);
    engText.position.set(-1, 4, -9);
    engText.rotation.y = 0.2;
    scene.add(engText);

    // Tech Enthusiast text
    const techTextGeometry = new THREE.TextGeometry('Tech Enthusiast', {
        font: font,
        size: 0.5,
        height: 0.1,
    });
    const techText = new THREE.Mesh(techTextGeometry, textMaterial);
    techText.position.set(5, 4, -9);
    techText.rotation.y = 0.2;
    scene.add(techText);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});