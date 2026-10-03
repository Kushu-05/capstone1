import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeNeuralGlobeProps {
  isGenerating?: boolean;
  activeAgentsCount?: number;
  height?: number;
}

export const ThreeNeuralGlobe: React.FC<ThreeNeuralGlobeProps> = ({
  isGenerating = false,
  activeAgentsCount = 5,
  height = 240
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMouseDownRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.2, y: 0.4 });
  const currentRotationRef = useRef({ x: 0.2, y: 0.4 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const sceneHeight = height;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / sceneHeight, 0.1, 1000);
    camera.position.z = 5.5;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, sceneHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Central Node Particle Sphere (Knowledge Base Chunks)
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color('#3B82F6');
    const accentColor = new THREE.Color('#10B981');
    const pulseColor = new THREE.Color('#8B5CF6');

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 1.8;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixedColor = baseColor.clone().lerp(i % 3 === 0 ? accentColor : pulseColor, Math.random() * 0.5);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 4. Wireframe Icosahedron Inner Core
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x2563EB,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 5. 3D Orbital Rings (Orchestration Loops)
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.015, 8, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x60A5FA, transparent: true, opacity: 0.35 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.5, 0.015, 8, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xA78BFA, transparent: true, opacity: 0.25 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // 6. 5 Orbiting Agent Satellites
    const agentSatellites: THREE.Mesh[] = [];
    const agentColors = [0x3B82F6, 0x10B981, 0xF59E0B, 0x8B5CF6, 0xEC4899];
    for (let i = 0; i < activeAgentsCount; i++) {
      const satGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({ color: agentColors[i % agentColors.length] });
      const sat = new THREE.Mesh(satGeo, satMat);
      scene.add(sat);
      agentSatellites.push(sat);
    }

    // 7. Interactive Mouse Drag Controls
    const onMouseDown = (e: MouseEvent) => {
      isMouseDownRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDownRef.current) return;
      const deltaX = e.clientX - mousePosRef.current.x;
      const deltaY = e.clientY - mousePosRef.current.y;
      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.008;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isMouseDownRef.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth inertia rotation
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.06;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.06;

      // Auto-spin
      targetRotationRef.current.y += isGenerating ? 0.015 : 0.003;

      particles.rotation.x = currentRotationRef.current.x;
      particles.rotation.y = currentRotationRef.current.y;

      coreMesh.rotation.x = currentRotationRef.current.x * 0.8;
      coreMesh.rotation.y = currentRotationRef.current.y * 0.8;

      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.004;

      // Orbit agents around globe
      agentSatellites.forEach((sat, idx) => {
        const angle = elapsed * (0.8 + idx * 0.15) + (idx * (Math.PI * 2)) / activeAgentsCount;
        const orbitRadius = 2.4 + Math.sin(elapsed + idx) * 0.15;
        sat.position.x = Math.cos(angle) * orbitRadius;
        sat.position.y = Math.sin(angle * 0.8) * 0.9;
        sat.position.z = Math.sin(angle) * orbitRadius;
      });

      // Pulse size if generating
      if (isGenerating) {
        const pulse = 1 + Math.sin(elapsed * 5) * 0.08;
        particles.scale.set(pulse, pulse, pulse);
        coreMesh.scale.set(pulse, pulse, pulse);
      } else {
        particles.scale.set(1, 1, 1);
        coreMesh.scale.set(1, 1, 1);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / sceneHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, sceneHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      coreGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
    };
  }, [isGenerating, activeAgentsCount, height]);

  return (
    <div style={{ position: 'relative', width: '100%', height: `${height}px`, overflow: 'hidden', cursor: 'grab' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
