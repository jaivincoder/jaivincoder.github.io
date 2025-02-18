class ThreeScene {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("#000000");
        this.scene.fog = new THREE.Fog("#3c1e02", 0.5, 50);

        this.clock = new THREE.Clock();
        this.deltaAccumulator = 0;
        this.frameTimeInterval = 1 / 60;

        this.frame = 0;
        this.cameraDx = 0.2;

        this.planets = [];
        this.moons = [];

        this.initCamera();
        this.initRenderer();
        this.initLights();
        this.initObjects();
        this.initStars(); // Initialize the glowing stars

        window.addEventListener("resize", this.onWindowResize.bind(this));

        this.animate();
    }

    initCamera() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(70, aspect, 0.01, 1100);
        this.camera.position.set(50, 30, 50);
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
    }

    initLights() {
        const pointLight = new THREE.PointLight("#ffffff", 1, 0);
        pointLight.position.set(0, 30, 30);
        this.scene.add(pointLight);
    }

    initObjects() {
        const loader = new THREE.TextureLoader();

        // Load planet texture.
        const planetTextures = [
            loader.load(
                "/images/img.png"
            ),
        ];

        // Load moon texture.
        const textureMoon = loader.load(
            "/images/img_1.png"
        );
        textureMoon.anisotropy = 16;
        const moonGeometry = new THREE.SphereGeometry(2, 32, 32);
        const moonMaterialTemplate = new THREE.MeshPhongMaterial({
            map: textureMoon,
            fog: false,
        });

        // Define planet data with movement properties.
        const planetsData = [
            {
                pos: new THREE.Vector3(-25, 20, -30),
                scale: 0.9,
                planetRotationSpeed: 0.05,
                movement: { speed: 0.1, boundary: 50 },
                moon: {
                    orbitRadius: 20,
                    orbitSpeed: 0.045,
                    initialAngle: Math.random() * Math.PI * 2,
                },
            },
        ];

        // Create planets and their moons.
        planetsData.forEach((data, index) => {
            // Create the planet.
            const planetGeometry = new THREE.SphereGeometry(10, 50, 50);
            const planetMaterial = new THREE.MeshLambertMaterial({
                map: planetTextures[index],
                fog: false,
            });
            const planet = new THREE.Mesh(planetGeometry, planetMaterial);
            planet.position.copy(data.pos);
            planet.scale.setScalar(data.scale);
            planet.userData.rotationSpeed = data.planetRotationSpeed;

            // Assign a random 2D velocity (on the XZ plane).
            const randomAngle = Math.random() * Math.PI * 2;
            const speed = data.movement.speed;
            planet.userData.velocity = new THREE.Vector3(
                Math.cos(randomAngle) * speed,
                0,
                Math.sin(randomAngle) * speed
            );
            planet.userData.boundary = data.movement.boundary;
            this.scene.add(planet);
            this.planets.push(planet);

            // Create the moon orbiting the planet.
            const moon = new THREE.Mesh(
                moonGeometry.clone(),
                moonMaterialTemplate.clone()
            );
            const orbitRadius = data.moon.orbitRadius * data.scale;
            moon.userData.orbitCenter = planet;
            moon.userData.orbitRadius = orbitRadius;
            moon.userData.orbitSpeed = data.moon.orbitSpeed;
            moon.userData.orbitAngle = data.moon.initialAngle;
            moon.position.x =
                planet.position.x +
                orbitRadius * Math.cos(moon.userData.orbitAngle);
            moon.position.z =
                planet.position.z +
                orbitRadius * Math.sin(moon.userData.orbitAngle);
            moon.position.y = planet.position.y;
            this.scene.add(moon);
            this.moons.push(moon);
        });

        // Create a background sphere.
        const textureSphereBg = loader.load(
            "https://images.unsplash.com/photo-15397dd21972319-f0e80a00d424?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3"
        );
        textureSphereBg.anisotropy = 16;
        const sphereBgGeometry = new THREE.SphereGeometry(100, 64, 64);
        const sphereBgMaterial = new THREE.MeshBasicMaterial({
            side: THREE.BackSide,
            map: textureSphereBg,
            fog: false,
        });
        this.sphereBg = new THREE.Mesh(sphereBgGeometry, sphereBgMaterial);
        this.sphereBg.position.set(0, 50, 0);
        this.scene.add(this.sphereBg);
    }

    initStars() {
        // Create a field of stars with random positions and random glow phases.
        const starCount = 1000;
        const positions = new Float32Array(starCount * 3);
        const phases = new Float32Array(starCount);
        for (let i = 0; i < starCount; i++) {
            positions[i * 3 + 0] = THREE.MathUtils.randFloatSpread(1000);
            positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(1000);
            positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(1000);
            phases[i] = Math.random() * Math.PI * 2;
        }
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );
        starGeometry.setAttribute(
            "phase",
            new THREE.BufferAttribute(phases, 1)
        );

        // Uniforms for time and star appearance.
        this.starUniforms = {
            time: { value: 5 },
            color: { value: new THREE.Color(0xADD8E6) },
            pointSize: { value: 40.0 } // Increased point size for bigger, more visible stars
        };

        // Shader material for glowing stars with a radial gradient.
        const starMaterial = new THREE.ShaderMaterial({
            uniforms: this.starUniforms,
            vertexShader: `
              attribute float phase;
              uniform float time;
              uniform float pointSize;
              varying float vAlpha;
              void main(){
                // Use a sine function to create a pulsing effect.
                float glow = 0.5 + 0.5 * sin(time + phase);
                vAlpha = glow;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                // You can adjust the multiplier here to change size scaling with distance.
                gl_PointSize = pointSize * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
              }
            `,
            fragmentShader: `
              uniform vec3 color;
              varying float vAlpha;
              void main(){
                // Create a radial gradient based on gl_PointCoord.
                vec2 coord = gl_PointCoord - vec2(0.5);
                float dist = length(coord);
                float alpha = smoothstep(0.5, 0.0, dist);
                gl_FragColor = vec4(color, alpha * vAlpha);
              }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending // Additive blending enhances the glowing effect.
        });

        const starField = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(starField);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();
        this.deltaAccumulator += delta;
        if (this.deltaAccumulator < this.frameTimeInterval) return;

        this.update(this.deltaAccumulator);
        this.deltaAccumulator = 0;

        this.renderer.render(this.scene, this.camera);
    }

    update(deltaTime) {
        // Update planet rotation and movement.
        this.planets.forEach((planet) => {
            planet.rotation.y += planet.userData.rotationSpeed;
            planet.position.add(planet.userData.velocity);

            if (
                planet.position.x > planet.userData.boundary ||
                planet.position.x < -planet.userData.boundary
            ) {
                planet.userData.velocity.x *= -1;
            }
            if (
                planet.position.z > planet.userData.boundary ||
                planet.position.z < -planet.userData.boundary
            ) {
                planet.userData.velocity.z *= -1;
            }
        });

        // Update moon orbit.
        this.moons.forEach((moon) => {
            moon.userData.orbitAngle += moon.userData.orbitSpeed;
            const planet = moon.userData.orbitCenter;
            const orbitRadius = moon.userData.orbitRadius;
            moon.position.x =
                planet.position.x +
                orbitRadius * Math.cos(moon.userData.orbitAngle);
            moon.position.z =
                planet.position.z +
                orbitRadius * Math.sin(moon.userData.orbitAngle);
            moon.rotation.y += 0.005;
        });

        // Rotate the background sphere.
        this.sphereBg.rotation.x += 0.002;
        this.sphereBg.rotation.y += 0.002;
        this.sphereBg.rotation.z += 0.002;

        // Optional camera movement.
        this.camera.position.x += this.cameraDx;
        this.camera.position.y =
            -1.2 * (1 - Math.abs(this.frame / 2000 - 0.5) / 0.5);
        this.camera.lookAt(0, 0, 0);
        this.frame += 8;
        if (this.frame > 2000) this.frame = 0;
        if (this.camera.position.x > 18)
            this.cameraDx = -Math.abs(this.cameraDx);
        if (this.camera.position.x < -18)
            this.cameraDx = Math.abs(this.cameraDx);

        // Update the star field's time uniform to animate the glow.
        this.starUniforms.time.value += deltaTime;
    }

    onWindowResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.camera.aspect =
                this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(
                this.container.clientWidth,
                this.container.clientHeight
            );
        }, 80);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ThreeScene("canvas_container");
});