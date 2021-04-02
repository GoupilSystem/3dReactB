import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Model(props) {
  
  const group = useRef()
  const { scene } = useLoader(GLTFLoader, '/map.gltf');
  const { nodes, materials } = useGLTF('/map.gltf')

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={materials.Material_Leaves_0}
        geometry={nodes.Icosphere006.geometry}
        position={[-1.81, 0.09, 8.55]}
        rotation={[-1.92, 0.63, 2.73]}
        scale={[0.36, 0.36, 0.36]}
      />
      <mesh
        material={materials.Material_Leaves_1}
        geometry={nodes.Icosphere005.geometry}
        position={[14.58, 0.24, 2.36]}
        rotation={[-1.97, -0.95, -1.4]}
        scale={[0.36, 0.36, 0.36]}
      />
      <mesh
        material={materials.Material_Leaves_0}
        geometry={nodes.Icosphere004.geometry}
        position={[14.58, 0.09, 2.36]}
        rotation={[-1.97, -0.95, -1.4]}
        scale={[0.36, 0.36, 0.36]}
      />
      <mesh
        material={materials.Material_Leaves_1}
        geometry={nodes.Icosphere002.geometry}
        position={[0.05, 0.09, 12.61]}
        rotation={[-1.92, 0.63, 2.73]}
        scale={[0.36, 0.36, 0.36]}
      />
      <mesh
        material={materials.Material_Leaves_0}
        geometry={nodes.Icosphere003.geometry}
        position={[14.43, -0.17, 15.52]}
        rotation={[-1.7, -1.27, -2.26]}
        scale={[0.87, 0.87, 0.87]}
      />
      <mesh
        material={materials.Material_Leaves_0}
        geometry={nodes.Icosphere001.geometry}
        position={[15.68, -0.24, 14.39]}
        rotation={[-1.7, -1.27, -2.26]}
        scale={[0.65, 0.65, 0.65]}
      />
      <mesh
        material={materials.Material_Leaves_0}
        geometry={nodes.Icosphere.geometry}
        position={[12.2, -0.24, 15.93]}
        rotation={[-0.51, -0.32, 0.62]}
        scale={[0.65, 0.65, 0.65]}
      />
      <mesh
        material={materials.Material_Leaves_0}
        geometry={nodes.Icosphere000.geometry}
        position={[11.42, 0.09, 15.9]}
        rotation={[-2.25, 0.2, -2.78]}
        scale={[0.36, 0.36, 0.36]}
      />
      <mesh material={materials.Material_Concrete_0} geometry={nodes.Mesh001.geometry} />
      <mesh material={materials.Material_Sand_1} geometry={nodes.Mesh001_1.geometry} />
      <mesh material={materials.Material_Grass_1} geometry={nodes.Mesh001_2.geometry} />
      <mesh material={materials.Material_Concrete_1} geometry={nodes.Mesh001_3.geometry} />
      <mesh material={materials.Material_Sand_0} geometry={nodes.Mesh001_4.geometry} />
      <mesh material={materials.Material_Grass_2} geometry={nodes.Mesh001_5.geometry} />
      <mesh material={materials.Material_Wood} geometry={nodes.Mesh001_6.geometry} />
      <mesh material={materials.Material_Alley} geometry={nodes.Mesh001_7.geometry} />
      <mesh material={materials.Material_Grass_0} geometry={nodes.Mesh001_8.geometry} />
      <group position={[-10.53, 0.79, 12.72]} rotation={[-Math.PI, 0, -Math.PI]} scale={[3.56, 1.37, 2.01]}>
        <mesh material={materials.Material_Glass} geometry={nodes.Cube004_1.geometry} />
        <mesh material={materials.Material_Wall_3} geometry={nodes.Cube004_2.geometry} />
        <mesh material={materials.Material_Concrete_2} geometry={nodes.Cube004_3.geometry} />
        <mesh material={materials.Material_Wall_4} geometry={nodes.Cube004_4.geometry} />
        <mesh material={materials.Material_White} geometry={nodes.Cube004_5.geometry} />
        <mesh material={materials.Material_Wall_0} geometry={nodes.Cube004_6.geometry} />
      </group>
      <group position={[1.52, 0, -13.2]} scale={[3.09, 1.18, 2.8]}>
        <mesh material={materials.Material_White} geometry={nodes.Cube003_1.geometry} />
        <mesh material={materials.Material_Glass} geometry={nodes.Cube003_2.geometry} />
        <mesh material={materials.Material_Wall_1} geometry={nodes.Cube003_3.geometry} />
      </group>
      <group position={[-8.02, 1.07, -10.83]} rotation={[-Math.PI, -1.57, 0]} scale={[-0.88, -0.88, -0.88]}>
        <mesh material={materials.Material_Concrete_0} geometry={nodes.Cube001_1.geometry} />
        <mesh material={materials.Material_Concrete_1} geometry={nodes.Cube001_2.geometry} />
        <mesh material={materials['Material_ Beige']} geometry={nodes.Cube001_3.geometry} />
        <mesh material={materials.Material_Wall_0} geometry={nodes.Cube001_4.geometry} />
        <mesh material={materials.Material_Glass} geometry={nodes.Cube001_5.geometry} />
        <mesh material={materials.Material_Concrete_2} geometry={nodes.Cube001_6.geometry} />
        <mesh material={materials.Material_White} geometry={nodes.Cube001_7.geometry} />
      </group>
      <group position={[2.11, 3.76, 6.55]} rotation={[-0.26, -0.95, 0.62]} scale={[0.29, 0.29, 0.29]}>
        <mesh material={materials.Material_Leaves_Dark_0} geometry={nodes.Icosphere014.geometry} />
        <mesh material={materials.Material_Wood} geometry={nodes.Icosphere014_1.geometry} />
        <mesh material={materials.Material_Leaves_0} geometry={nodes.Icosphere014_2.geometry} />
      </group>
    </group>
  )
}

export default function World2() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  )
}
