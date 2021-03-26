import ReactDOM from "react-dom"
import React, { Suspense, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "react-three-fiber"
import * as THREE from "three"
import Sphere from "./sphere";
import Ship from "./ship";
import { CarPart } from "./carPart";
import { Car } from "./car";
import { Map } from "./map";
import usePromise from "react-promise-suspense";
import { HTML, OrbitControls } from "drei";
import "./styles.css";

const materialDefault = new THREE.MeshPhysicalMaterial({
  color: 0x00cc00,
  roughness: 0.8
})
const materialHover = new THREE.MeshPhysicalMaterial({
  color: 0xcc0000,
  roughness: 0.1
})
const geometrySphere = new THREE.SphereBufferGeometry(1);
const Sphere1= ({...props }) => {
  return (
    <mesh
    {...props}
      material={materialDefault}
      geometry={geometrySphere}>
    </mesh>
  )
}

const geometryDefault = new THREE.DodecahedronBufferGeometry(1)
const geometryHover = new THREE.DodecahedronBufferGeometry(1.2)

const Dodecahedron = ({ time, ...props }) => {
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
      material={hovered ? materialHover : materialDefault}
      geometry={hovered ? geometryHover : geometryDefault}>
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

function Content() {
  // Useref permet de ne pas avoir de dbl alert qd on clique
  const ref = useRef()
  // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))
  return (
    <group ref={ref} scale={[3,3,3]}>
      <Map index={1} time={1000} color="#443333" ></Map>
      <Car name="Body_0" index={11} time={1000} color="#3344bb" description="Body_0"
        colorMenu={[{code:'#bbb533', name:'yellow'},{code:'#bb55b5',name:'purple'},{code:'#cccccc',name:'white'}]}
      />
      <Car name="Glass" index={12} time={1000} color="#9999bb" description="Glass"
      />
      <Car name="Body_1" index={13} time={1000} color="#aa3322" description="Body_1"
        colorMenu={[{code:'#bbb533', name:'yellow'},{code:'#bb55b5',name:'purple'},{code:'#cccccc',name:'white'}]}
      />
    </group>
  )
}

const Fallback = () => (
  <HTML>
    <div className="loading">Loading...</div>
  </HTML>
)

ReactDOM.render(
  <Canvas invalidateFrameloop style={{ background: "#0e0e0f" }} camera={{ position: [0, 0, 10] }}>
    <OrbitControls
      enableDamping={true}
      dampingFactor={0.25}
      rotateSpeed={0.4}
      keyPanSpeed={0.4}
      screenSpacePanning={true}
      zoomSpeed={0.6}
      enablePan={true}
      panSpeed={0.4}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
      minDistance={-500}
      maxDistance={1000}
    />
    <directionalLight color="white" />
    <pointLight position={[10, 10, -10]} color="white" />
    <pointLight position={[-10, -10, 10]} color="white" />
    <Suspense fallback={<Fallback />}>
      <Content />
    </Suspense>
  </Canvas>,
  document.getElementById("root")
)

/*
function Content() {
  // Useref permet de ne pas avoir de dbl alert qd on clique
  const ref = useRef()
  // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))
  return (
    <group ref={ref} scale={[3,3,3]}>
      <CarPart 
        name="frontWheels" 
        index={11} 
        time={0} 
        color="green" 
        description="Body"
        options={[
          {
            color: "green"
          },
          {
            color: "blue"
          }
        ]}/>
      <CarPart name="frontTyres" index={4} time={0} color="black" />
      <CarPart name="backWheels" index={5} time={0} color={0xaaaaaa} />
      <CarPart name="frontTyres" index={6} time={0} color="black" />
      <CarPart name="glass" index={10} time={0} color={0xaaaaff} />
      <CarPart name="grill" index={12} time={0} color="white" />
      <CarPart name="body1" index={13} time={0} color="blue" />
      <Sphere position={[2, -2, 0]} />
      <Sphere1 time={0} position={[2, 2, 0]} />
      <Dodecahedron time={0} position={[-2, 0, 0]} />
      <Dodecahedron time={0} position={[0, -1, -3]} />
      <Dodecahedron time={0} position={[2, 0, 0]} />
    </group>
  )
}*/