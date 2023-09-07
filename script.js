import * as THREE from 'https://github.com/toonwwf/toonwwf-io/tree/main/node_modules/three';
import GLTFLoader from 'gltfloader';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// mario
const geometry = await GLTFLoader.loadGeometry('mario.glb');
const texture = new THREE.TextureLoader().load('mario.png');
const material = new THREE.MeshPhongMaterial({ map: texture, shininess: 0 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0,-1.5,0)
scene.add(mesh);

// light bleu
const light = new THREE.PointLight(0xfffff, 1);
light.position.set(-15, -15, 2);
scene.add(light);

// light rouge
const lightb = new THREE.PointLight(0xFF0000 , 1);
lightb.position.set(15, 15, -2);
scene.add(lightb);

// light blanche
const lightc = new THREE.PointLight(0xFFFFFF , 0.5);
lightc.position.set(0, 0, 1);
scene.add(lightc);

// plan
const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x242424 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0, -10);
scene.add(plane);

// cubes groupes
const cubeGroup = new THREE.Group();
const cubeGroupb = new THREE.Group();

// Créer un objet 3D (un cube) pour le groupe
const cubegeometry = new THREE.IcosahedronGeometry(2, 0);

const cubematerial = new THREE.MeshPhysicalMaterial({
    color: 0xFF0000, // Blanc
    transparent: true, 
    opacity: 0.8,
    roughness: 0.2, 
    metalness: 1, 
    clearcoat: 1.0,
    clearcoatRoughness: 0.1, 
    envMapIntensity: 1.0,
});
const cubeMesh = new THREE.Mesh(cubegeometry, cubematerial);

const edges = new THREE.EdgesGeometry(cubegeometry);
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xFF0000});
const edgesObject = new THREE.LineSegments(edges, edgeMaterial);

// Créer un objet 3D (un cube) pour le groupeb
const cubegeometryb = new THREE.IcosahedronGeometry(2, 0);

const cubematerialb = new THREE.MeshPhysicalMaterial({
    color: 0xFF0000, // Blanc
    transparent: true, 
    opacity: 0.8,
    roughness: 0.2, 
    metalness: 1, 
    clearcoat: 1.0,
    clearcoatRoughness: 0.1, 
    envMapIntensity: 1.0,
});
const cubeMeshb = new THREE.Mesh(cubegeometryb, cubematerialb);

const edgesb = new THREE.EdgesGeometry(cubegeometryb);
const edgeMaterialb = new THREE.LineBasicMaterial({ color: 0xfffff});
const edgesObjectb = new THREE.LineSegments(edgesb, edgeMaterialb);

// grouper le groupe 
cubeGroup.add(cubeMesh);
cubeGroup.add(edgesObject);

cubeGroupb.add(cubeMeshb);
cubeGroupb.add(edgesObjectb);

// Ajouter le groupe à la scène
scene.add(cubeGroup);
scene.add(cubeGroupb);

// propriétés du cubeGoup
cubeGroup.scale.set(0.5, 0.5, 0.5)
cubeGroup.position.set(-2,2,-3)

cubeGroupb.scale.set(0.2, 0.2, 0.2)
cubeGroupb.position.set(1,-0.5,2)

// Position initiale de la caméra
const cameraDistance = 4;
const cameraTarget = new THREE.Vector3(0, 0, 0);

camera.position.set(0, 0, cameraDistance);
camera.lookAt(cameraTarget);

// Easing 
let cameraPosition = new THREE.Vector3(0, 0, cameraDistance);
let cameraRotation = new THREE.Vector2(0, 0);
const easingSpeed = 0.1;

// Gérer les mouvements de la souris
const mouse = new THREE.Vector2();
const targetRotation = new THREE.Vector2(0, 0);
const sensitivity = 0.05;

const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    targetRotation.x = mouse.x * sensitivity * Math.PI / 2;
    targetRotation.y = mouse.y * sensitivity * Math.PI / 2;
};

window.addEventListener('mousemove', onMouseMove);

// Animation de la caméra
const animate = () => {
    requestAnimationFrame(animate);

    // Rotation de la caméra autour de la position cible
    const cameraPosition = new THREE.Vector3(
        Math.sin(targetRotation.x) * cameraDistance,
        Math.sin(targetRotation.y) * cameraDistance,
        Math.cos(targetRotation.x) * cameraDistance
    );
    camera.position.lerp(cameraPosition, easingSpeed);

    // Mise à jour la direction de la caméra en fonction de la position cible
    camera.lookAt(cameraTarget);

    renderer.render(scene, camera);
};

animate();
