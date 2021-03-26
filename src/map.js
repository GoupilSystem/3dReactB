import * as THREE from 'three'
import React, { useState, useRef } from 'react'
import { useLoader } from 'react-three-fiber'
import usePromise from "react-promise-suspense"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export const Map = ({ time, ...props }) => {
  const gltf = useLoader(GLTFLoader, '/map.gltf')
  const ref = useRef()

  const [currentColor, setCurrentColor] = useState(props.color);
  
  const defaultMaterial = new THREE.MeshPhysicalMaterial({
    color: currentColor,
    roughness: 1,
    reflectivity: 0
  })

  const Model = () => {
    
    // In here it could load textures, images, triangulate textgeometry, etc
    // The line below produces a fake load, emulating loading assets/set-up processing
    usePromise(ms => new Promise(res => setTimeout(res, ms)), [time])
    // React will bail out until the suspense is lifted, then it renders the view
  
    return (
      <mesh
        {...props}
        material={defaultMaterial}>
        <bufferGeometry attach="geometry" {...gltf.__$[props.index].geometry} />
      </mesh>
    )
  }

  return (
    <group ref={ref}>
      <group scale={[3, 3, 3]}>
        <Model />
      </group>
    </group>
  )
}
