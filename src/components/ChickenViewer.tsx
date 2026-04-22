'use client';

import { useRef, useCallback, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Bounds, useBounds } from '@react-three/drei';
import * as THREE from 'three';
import { useChickenSound } from '@/hooks/useChickenSound';

function ChickenModel({ onSqueak }: { onSqueak: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/funny_rubber_chicken.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const isAnimating = useRef(false);
  const animationProgress = useRef(0);
  const { invalidate } = useThree();

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

  const handleClick = useCallback(() => {
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
        scale={1}
        position={[0, 0, 0]}
        style={{ cursor: 'pointer' }}
      />
    </group>
  );
}

export function ChickenViewer() {
  const { playSound } = useChickenSound();

  return (
    <div
      className="w-full h-full"
      role="application"
      aria-label="Interactive 3D rubber chicken model. Click to hear it squeak."
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{ antialias: true, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }}
        dpr={[1, 2]}
        frameloop="demand"
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
          <Bounds fit clip margin={1.2}>
            <ChickenModel onSqueak={playSound} />
          </Bounds>
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          enableDamping
          dampingFactor={0.05}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN,
          }}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/funny_rubber_chicken.glb');
