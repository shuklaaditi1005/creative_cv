import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FloatingCard from './FloatingCard';

gsap.registerPlugin(ScrollTrigger);

const Scene: React.FC = () => {
    const { camera } = useThree();
    const startZ = 5;
    const endZ = -64;

    const pointer = useRef({ x: 0, y: 0 });
    const scrollTargetZ = useRef<number>(startZ);

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const handlePointerMove = (e: PointerEvent) => {
            if (!isMobile) {
                pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
                pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
            }
        };

        window.addEventListener('pointermove', handlePointerMove as EventListener);
        return () => window.removeEventListener('pointermove', handlePointerMove as EventListener);
    }, []);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
                scrollTargetZ.current = startZ + (endZ - startZ) * self.progress;
            },
        });
    });

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Smooth camera Z dolly
        camera.position.z += (scrollTargetZ.current - camera.position.z) * 0.08;

        // Mouse parallax and natural floating
        const bobY = Math.sin(t * 0.8) * 0.05;
        const parallaxX = pointer.current.x * 0.3;
        const parallaxY = -pointer.current.y * 0.3;

        camera.position.x += (parallaxX - camera.position.x) * 0.05;
        camera.position.y += (bobY + parallaxY - camera.position.y) * 0.05;
    });

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const alignX = isMobile ? 0 : 3.6;

    return (
        <>
            <color attach="background" args={['#FFFFFF']} />
            <fog attach="fog" args={['#FFFFFF', 2, 20]} />

            <ambientLight intensity={0.9} />
            <directionalLight position={[1, 2, 4]} intensity={0.2} />

            {/* Stop 1: Hero (Already starts in the center) */}
            <FloatingCard index={1} x={0} y={0} z={-2} w={2.8} h={3.8} color="#F7F7F7" rotZ={0.02} />

            {/* Stop 2: About me */}
            <FloatingCard index={2} x={alignX} y={0} z={-12} w={2.8} h={3.8} color="#EACAC8" rotZ={-0.03} />

            {/* Stop 3: Passions (Combined into one large card for full-screen zoom) */}
            <FloatingCard index={3} x={alignX} y={0} z={-22} w={3.2} h={2.6} color="#F0F0F0" rotZ={0.02} />

            {/* Stop 4: Beauty */}
            <FloatingCard index={4} x={alignX} y={0} z={-32} w={3.0} h={4.0} color="#EAECEF" rotZ={-0.02} />

            {/* Stop 5: Brand */}
            <FloatingCard index={5} x={alignX} y={0} z={-42} w={2.8} h={3.5} color="#F4EAE6" rotZ={0.04} />

            {/* Stop 6: Strengths & Weaknesses */}
            <FloatingCard index={6} x={alignX} y={0} z={-52} w={3.6} h={2.4} color="#E6EAE3" rotZ={-0.01} />

            {/* Stop 7: Memory */}
            <FloatingCard index={7} x={alignX} y={0} z={-62} w={2.8} h={4.0} color="#F7F7F7" rotZ={0.03} />
        </>
    );
};

export default Scene;