import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { createRoundedCanvasTexture } from '../../utils/canvasUtils';

interface FloatingCardProps {
    x: number;
    y: number;
    z: number;
    w: number;
    h: number;
    color: string;
    rotZ?: number;
    index?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({
    x, y, z, w, h, color, rotZ = 0, index = 0
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    const texture = useMemo(() => {
        return createRoundedCanvasTexture(w, h, 0.15, color);
    }, [w, h, color]);

    useFrame((state) => {
        // 1. Handle the gentle up/down floating animation
        if (meshRef.current) {
            meshRef.current.position.y = y + Math.sin(state.clock.elapsedTime + index) * 0.03;
        }

        // 2. Handle the "Magnetic Pull" to center as the camera approaches
        if (groupRef.current) {
            const dist = state.camera.position.z - z;
            let pullFactor = 1;

            // Start pulling to center when 9 units away, finish centering at 2 units away
            if (dist <= 9 && dist >= 2) {
                const rawProgress = (dist - 2) / 7; // Scales 9->2 into 1->0
                // Apply smoothstep easing so the glide looks natural
                pullFactor = rawProgress * rawProgress * (3 - 2 * rawProgress);
            } else if (dist < 2) {
                pullFactor = 0; // Perfectly centered just before the camera zooms through
            }

            // Apply the multiplier to X and Rotation. 
            // When pullFactor is 0, it perfectly centers and faces forward.
            groupRef.current.position.x = x * pullFactor;
            groupRef.current.rotation.z = rotZ * pullFactor;
        }
    });

    return (
        <group ref={groupRef} position={[x, 0, z]} rotation={[0, 0, rotZ]}>
            <mesh ref={meshRef} position={[0, y, 0]}>
                <planeGeometry args={[w, h]} />
                <meshBasicMaterial map={texture} transparent={true} />

                {/* Soft Drop Shadow */}
                <mesh position={[0.1, -0.1, -0.05]}>
                    <planeGeometry args={[w, h]} />
                    <meshBasicMaterial color="#000000" transparent={true} opacity={0.04} />
                </mesh>
            </mesh>
        </group>
    );
};

export default FloatingCard;