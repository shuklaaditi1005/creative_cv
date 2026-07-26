import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/canvas/Scene';
import DOMContent from './components/dom/DOMContent';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <>
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>
      <DOMContent />
    </>
  );
};

export default App;