import * as React from 'react';
import * as THREE from "three"

const Sphere= ({...props }) => {

    const materialDefault = new THREE.MeshPhysicalMaterial({
    color: 0x00cc00,
    roughness: 0.8
    })

    const materialHover = new THREE.MeshPhysicalMaterial({
    color: 0xcc0000,
    roughness: 0.1
    })

    const geometrySphere = new THREE.SphereBufferGeometry(1);

    return (
        <mesh
        {...props}
        material={materialDefault}
        geometry={geometrySphere}>
        </mesh>
    )
}

export default Sphere;