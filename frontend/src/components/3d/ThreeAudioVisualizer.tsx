import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeAudioVisualizerProps {
  isPlaying: boolean;
  height?: number;
}

export const ThreeAudioVisualizer: React.FC<ThreeAudioVisualizerProps> = ({
  isPlaying,
  height = 140
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const sceneHeight = height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / sceneHeight, 0.1, 100);
    camera.position.set(0, 2.5, 4.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, sceneHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 3D Holographic Audio Rings
    const ringCount = 18;
    const rings: THREE.Line[] = [];
    const ringRadii: number[] = [];

    for (let r = 0; r < ringCount; r++) {
      const radius = 0.4 + (r * 0.11);
      ringRadii.push(radius);
      const segments = 64;
      const points: THREE.Vector3[] = [];

      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }

      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const color = new THREE.Color().setHSL(0.55 + (r / ringCount) * 0.18, 0.9, 0.55);
      const ringMat = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.35 + (r / ringCount) * 0.55,
        linewidth: 1.5
      });

      const ringLine = new THREE.Line(ringGeo, ringMat);
      scene.add(ringLine);
      rings.push(ringLine);
    }

    // 3D Audio Frequency Bars in Circle
    const barCount = 36;
    const bars: THREE.Mesh[] = [];
    const barGeo = new THREE.BoxGeometry(0.04, 0.4, 0.04);

    for (let b = 0; b < barCount; b++) {
      const angle = (b / barCount) * Math.PI * 2;
      const rad = 2.1;
      const barMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.58 + (b / barCount) * 0.25, 1.0, 0.6),
        transparent: true,
        opacity: 0.75
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set(Math.cos(angle) * rad, 0, Math.sin(angle) * rad);
      bar.rotation.y = -angle;
      scene.add(bar);
      bars.push(bar);
    }

    // Central Floating Neural Core Sphere
    const coreGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate entire scene gently
      scene.rotation.y = elapsed * 0.3;

      // Animate rings undulating
      rings.forEach((ring, idx) => {
        const posAttr = ring.geometry.attributes.position;
        const radius = ringRadii[idx];
        const segments = 64;

        for (let s = 0; s <= segments; s++) {
          const theta = (s / segments) * Math.PI * 2;
          let wave = 0;
          if (isPlaying) {
            wave = Math.sin(theta * 6 + elapsed * 8 + idx * 0.5) * (0.15 + (idx / ringCount) * 0.2);
            wave += Math.cos(theta * 3 - elapsed * 5) * 0.08;
          } else {
            wave = Math.sin(theta * 3 + elapsed * 1.5 + idx * 0.3) * 0.04;
          }
          posAttr.setXYZ(s, Math.cos(theta) * radius, wave, Math.sin(theta) * radius);
        }
        posAttr.needsUpdate = true;
      });

      // Animate frequency bars
      bars.forEach((bar, bIdx) => {
        if (isPlaying) {
          const scaleY = 0.5 + Math.abs(Math.sin(elapsed * 9 + bIdx * 0.8)) * 2.8 + Math.cos(elapsed * 4 + bIdx) * 0.8;
          bar.scale.set(1, Math.max(0.2, scaleY), 1);
          bar.position.y = scaleY * 0.15;
        } else {
          const idleScale = 0.4 + Math.sin(elapsed * 2 + bIdx * 0.3) * 0.2;
          bar.scale.set(1, idleScale, 1);
          bar.position.y = idleScale * 0.1;
        }
      });

      // Pulse core
      const corePulse = isPlaying ? 1 + Math.sin(elapsed * 12) * 0.25 : 1 + Math.sin(elapsed * 2) * 0.05;
      core.scale.set(corePulse, corePulse, corePulse);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / sceneHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, sceneHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      barGeo.dispose();
      coreGeo.dispose();
    };
  }, [isPlaying, height]);

  return (
    <div style={{
      width: '100%',
      height: `${height}px`,
      position: 'relative',
      background: 'linear-gradient(180deg, #0B132B 0%, #1C2541 100%)',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid #1E293B',
      boxShadow: isPlaying ? '0 0 20px rgba(56, 189, 248, 0.25)' : 'none',
      transition: 'box-shadow 0.3s ease'
    }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '12px',
        fontSize: '0.72rem',
        fontWeight: 700,
        color: isPlaying ? '#38BDF8' : '#94A3B8',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        padding: '3px 8px',
        borderRadius: '6px'
      }}>
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: isPlaying ? '#38BDF8' : '#64748B',
          boxShadow: isPlaying ? '0 0 8px #38BDF8' : 'none',
          animation: isPlaying ? 'ping 1.2s infinite' : 'none'
        }}></span>
        <span>{isPlaying ? '3D Neural Waveform Active' : '3D Audio Hologram Standby'}</span>
      </div>
    </div>
  );
};
