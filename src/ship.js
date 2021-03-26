import * as THREE from 'three'
import React, { useState, useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import usePromise from "react-promise-suspense"
import { HTML, OrbitControls } from "drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const geometry = new THREE.BoxBufferGeometry(1, 1, 40)
const position = new THREE.Vector3()
const direction = new THREE.Vector3()

export default function Ship() {
  const gltf = useLoader(GLTFLoader, '/carrito.gltf')
  const carRef = useRef()

  const materialDefault = new THREE.MeshPhysicalMaterial({
    color: 0x00cc00,
    roughness: 0.8
  })
  const materialHover = new THREE.MeshPhysicalMaterial({
    color: 0xcc0000,
    roughness: 0.1
  })

  const Car = ({ time, ...props }) => {
    const [hovered, setHover] = useState(false)
    const hover = e => e.stopPropagation() && setHover(true)
    const unhover = e => e.stopPropagation() && setHover(false)
  
    // In here it could load textures, images, triangulate textgeometry, etc
    // The line below produces a fake load, emulating loading assets/set-up processing
    usePromise(ms => new Promise(res => setTimeout(res, ms)), [time])
    // React will bail out until the suspense is lifted, then it renders the view
  
    return (
      <mesh
        {...props}
        onClick={() => alert("clicked mesh")}
        onPointerOver={hover}
        onPointerOut={unhover}
        material={hovered ? materialHover : materialDefault}>
        <bufferGeometry attach="geometry" {...gltf.__$[10].geometry} />
        <HTML scaleFactor={10} style={{ pointerEvents: "none", display: hovered ? "block" : "none" }}>
          <div className="content">
            <button
              style={{ pointerEvents: "all" }}
              onClick={e => {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
                e.nativeEvent.stopPropagation()
                alert("Clicked button")
              }}>
              Suspense <br />
              {time}ms
            </button>
          </div>
        </HTML>
      </mesh>
    )
  }

  const Car2 = ({ time, ...props }) => {
    const [hovered, setHover] = useState(false)
    const hover = e => e.stopPropagation() && setHover(true)
    const unhover = e => e.stopPropagation() && setHover(false)
    
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xccccff,
      roughness: 0
    })
    // In here it could load textures, images, triangulate textgeometry, etc
    // The line below produces a fake load, emulating loading assets/set-up processing
    usePromise(ms => new Promise(res => setTimeout(res, ms)), [time])
    // React will bail out until the suspense is lifted, then it renders the view
  
    return (
      <mesh
        {...props}
        onClick={() => alert("clicked mesh")}
        onPointerOver={hover}
        onPointerOut={unhover}
        material={hovered ? materialHover : materialDefault}>
        <bufferGeometry attach="geometry" {...gltf.__$[11].geometry} />
        <HTML scaleFactor={10} style={{ pointerEvents: "none", display: hovered ? "block" : "none" }}>
          <div className="content">
            <button
              style={{ pointerEvents: "all" }}
              onClick={e => {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
                e.nativeEvent.stopPropagation()
                alert("Clicked button")
              }}>
              Suspense <br />
              {time}ms
            </button>
          </div>
        </HTML>
      </mesh>
    )
  }

  return (
    <group ref={carRef}>
      <group scale={[1, 1, 1]}>
        <Car />
        <Car2 />
      </group>
    </group>
  )
}

/*return (
    <group ref={carRef}>
      <group scale={[1, 1, 1]}>
        <Car />
        <mesh 
          onPointerOver={hover}
          onPointerOut={unhover}
          material={hovered ? materialHover : materialDefault}
          position={[0, 0, 0]}>
            <bufferGeometry attach="geometry" {...gltf.__$[13].geometry} />
        </mesh>
      </group>
    </group>
  )*/


// <primitive object={gltf.s+cene} position={[-2, 2, 0]} rotation={[Math.PI / 3, Math.PI/4, 0]}/>