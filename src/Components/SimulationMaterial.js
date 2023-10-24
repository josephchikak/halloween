import simulationFragmentShader from '../Shaders/Particles/simulationFragmentShader.glsl'
import simulationVertexShader from '../Shaders/Particles/simulationVertexShader.glsl'
import * as THREE from 'three'
import { useEffect } from 'react'


// import imgs from './noise.jpg'

const parameters = {
    width: 256,
    size: 2,
    count: 1000,
}

//
const width = parameters.width
const height = parameters.width

   const getRandomDataBox = (width, height) => {
    var len = width * height * 4;
    var data = new Float32Array(len);
  
    for (let i = 0; i < data.length; i++) {
      const stride = i * 4;
  
      data[stride] = (Math.random() - 0.5) * 2.0;
      data[stride + 1] = (Math.random() - 0.5) * 2.0;
      data[stride + 2] = (Math.random() - 0.5) * 2.0;
      data[stride + 3] = 1.0;
    }
    return data;
  };

  const getRandomDataSphere = (width, height) => {
    // we need to create a vec4 since we're passing the positions to the fragment shader
    // data textures need to have 4 components, R, G, B, and A
    const length = width * height * 4 
    const data = new Float32Array(length);
      
    for (let i = 0; i < length; i++) {
      const stride = i * 4;
  
      const distance = Math.sqrt((Math.random())) * 2.0;
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
  
      data[stride] =  distance * Math.sin(theta) * Math.cos(phi)
      data[stride + 1] =  distance * Math.sin(theta) * Math.sin(phi);
      data[stride + 2] =  distance * Math.cos(theta);
      data[stride + 3] =  1.0; // this value will not have any impact
    }
    
    return data;
  }

   
   class SimulationMaterial extends THREE.ShaderMaterial {
    constructor() {
      //creating a Data Texture with the given postion data 
      const positionsTexture = new THREE.DataTexture(
        getRandomDataSphere(width, height),
        width,
        height,
        THREE.RGBAFormat,
        THREE.FloatType
      );
      positionsTexture.needsUpdate = true;
  
      const simulationUniforms = {
        //passing the positions Data Texture as uniform
        uPosition: { value: positionsTexture },
        uFrequency: { value: 0.25 },
        uTime: { value: 0 },
      };
  
      super({
        uniforms: simulationUniforms,
        vertexShader: simulationVertexShader,
        fragmentShader: simulationFragmentShader,
      });
    }
}


export default SimulationMaterial