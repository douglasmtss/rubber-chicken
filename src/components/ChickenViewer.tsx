'use client';

import { useRef, useCallback, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useChickenSound } from '@/hooks/useChickenSound';

function ChickenModel({ onSqueak }: { onSqueak: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/funny_rubber_chicken.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const isAnimating = useRef(false);
  const animationProgress = useRef(0);
  const { invalidate } = useThree();

  // Normalize model to fit within a 2-unit bounding box
  const { normalizedScale, centeredPosition } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    return {
      normalizedScale: scale,
      centeredPosition: [-center.x * scale, -center.y * scale, -center.z * scale] as [number, number, number],
    };
  }, [clonedScene]);

  useFrame(() => {
    if (!groupRef.current) return;
    if (isAnimating.current) {
      animationProgress.current += 0.12;
      const squish = Math.sin(animationProgress.current) * 0.15;
      groupRef.current.scale.set(1 + squish, 1 - squish * 0.5, 1 + squish);
      if (animationProgress.current >= Math.PI * 2) {
        isAnimating.current = false;
        animationProgress.current = 0;
        groupRef.current.scale.set(1, 1, 1);
      } else {
        invalidate();
      }
    }
  });

  const handleClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onSqueak();
    isAnimating.current = true;
    animationProgress.current = 0;
    invalidate();
  }, [onSqueak, invalidate]);

  return (
    <group ref={groupRef}>
      <primitive
        object={clonedScene}
        onClick={handleClick}
        scale={normalizedScale}
        position={centeredPosition}
        style={{ cursor: 'pointer' }}
      />
    </group>
  );
}

function Controls() {
  const { invalidate } = useThree();
  return (
    <OrbitControls
      enablePan={false}
      minDistance={2}
      maxDistance={10}
      onChange={() => invalidate()}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
    />
  );
}

export function ChickenViewer() {
  const { playSound } = useChickenSound();

  return (
    <div
      style={{ position: 'fixed', inset: 0 }}
      role="application"
      aria-label="Interactive 3D rubber chicken model. Click to hear it squeak."
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{ antialias: true, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }}
        dpr={[1, 2]}
        frameloop="demand"
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
          });
        }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <spotLight position={[-10, 10, -5]} intensity={0.8} color="#f59e0b" />
        <Suspense fallback={null}>
          <ChickenModel onSqueak={playSound} />
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
          <Environment preset="city" />
        </Suspense>
        <Controls />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/funny_rubber_chicken.glb');
