import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';

const Particles = () => {
  return (
    <Canvas
      style={{ position: 'absolute', width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars
        radius={100}
        depth={70}
        count={10000}
        factor={5}
        saturation={0}
        fade
      />
      <Sphere args={[1, 32, 32]} scale={[4, 4, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ff4081"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
      <Html
        position={[0, 0, 2]}
        center
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
        }}>
          <p>Interactive 3D Particles</p>
        </div>
      </Html>
    </Canvas>
  );
};

export default Particles;
