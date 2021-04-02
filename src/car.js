import * as THREE from 'three'
import React, { useState, useRef, useEffect } from 'react'
import { useLoader } from 'react-three-fiber'
import usePromise from "react-promise-suspense"
import { HTML } from "drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useDetectOutsideClick } from "./useDetectOutsideClick";

import "./styles.css";

import * as Constants from './constants'

function shadeColor(color, percent) {

  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

export const Car = ({ time, ...props }) => {
  const gltf = useLoader(GLTFLoader, '/car.gltf')
  const ref = useRef()

  const [currentColor, setCurrentColor] = useState(props.color);
  
  const defaultMaterial = new THREE.MeshPhysicalMaterial({
    color: currentColor,
    roughness: 0.8
  })

  const hoverMaterial = new THREE.MeshPhysicalMaterial({
    color: shadeColor(currentColor, -25),
    roughness: 0.1
  })

  const Model = () => {
    const [hovered, setHover] = useState(false)
    const hover = e => e.stopPropagation() && setHover(true)
    const unhover = e => e.stopPropagation() && setHover(false)
    
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    
    const onMeshClick = () => {
      setIsActive(!isActive);
    }

    const onColorMenuClick = color => () => setCurrentColor(color);

    
    // In here it could load textures, images, triangulate textgeometry, etc
    // The line below produces a fake load, emulating loading assets/set-up processing
    usePromise(ms => new Promise(res => setTimeout(res, ms)), [time])
    // React will bail out until the suspense is lifted, then it renders the view
  
    return (
      <mesh
        {...props}
        castShadow
        onClick={onMeshClick}
        onPointerOver={hover}
        onPointerOut={unhover}
        material={hovered ? hoverMaterial : defaultMaterial}>
        <bufferGeometry attach="geometry" {...gltf.__$[props.index].geometry} />
      </mesh>
    )
  }

  return (
    <group ref={ref}>
      <group position={[0,-0.25,0]} scale={[1,1,1]}>
        <Model />
      </group>
    </group>
  )
}

/*
return (
      <mesh
        {...props}
        onClick={onMeshClick}
        onPointerOver={hover}
        onPointerOut={unhover}
        material={hovered ? hoverMaterial : defaultMaterial}>
        <bufferGeometry attach="geometry" {...gltf.__$[props.index].geometry} />
        <HTML scaleFactor={10} style={{ pointerEvents: "none" }}>
          <div className="content" style={{ display: hovered ? "block" : "none" }}>
            <button
              style={{ pointerEvents: "all" }}
              onClick={e => {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
                e.nativeEvent.stopPropagation()
              }}>
              {!isActive && props.description}
            </button>
          </div>
          <div>
            <nav 
              ref={dropdownRef} 
              className={`menu ${isActive ? "active" : "inactive"}`}
              style={{ pointerEvents: "all" }}>
              <ul>
                {props.colorMenu?.map((item) =>
                  <li>
                    <a onClick={onColorMenuClick(item.code)}>{item.name}</a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </HTML>
      </mesh>
    )
  }*/
