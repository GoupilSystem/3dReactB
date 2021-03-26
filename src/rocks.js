import React, { useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Rocks() {
  const gltf = useLoader(GLTFLoader, '/rock.gltf')
  const rocks = useStore(state => state.rocks)
  return rocks.map(data => <Rock gltf={gltf} key={data.guid} data={data} />)
}

const Rock = React.memo(({ gltf, data }) => {
  const ref = useRef()
  return (
    <group ref={ref}>
      <object3D
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[20, 20, 20]}>
        <mesh>
          <bufferGeometry attach="geometry" {...gltf.__$[7].geometry} />
          <meshStandardMaterial attach="material" {...gltf.__$[7].material} color="white" roughness={1} metalness={1} />
        </mesh>
      </object3D>
    </group>
  )
})