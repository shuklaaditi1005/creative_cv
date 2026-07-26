import * as THREE from 'three';

export const createRoundedCanvasTexture = (
    width: number,
    height: number,
    radius: number,
    colorHex: string
): THREE.CanvasTexture => {
    const cvs = document.createElement('canvas');
    const scale = 200;
    cvs.width = width * scale;
    cvs.height = height * scale;
    const ctx = cvs.getContext('2d');

    if (!ctx) throw new Error('2D Context not supported');

    const r = radius * scale;

    ctx.fillStyle = colorHex;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(cvs.width - r, 0);
    ctx.quadraticCurveTo(cvs.width, 0, cvs.width, r);
    ctx.lineTo(cvs.width, cvs.height - r);
    ctx.quadraticCurveTo(cvs.width, cvs.height, cvs.width - r, cvs.height);
    ctx.lineTo(r, cvs.height);
    ctx.quadraticCurveTo(0, cvs.height, 0, cvs.height - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();

    return new THREE.CanvasTexture(cvs);
};