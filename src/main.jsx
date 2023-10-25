import { Loader, Bvh} from "@react-three/drei"
import ReactDOM from 'react-dom/client'
import './index.css'
import HalloweenScene from "./Components/HalloweenScene"
import { Canvas } from '@react-three/fiber'

import { StrictMode, Suspense } from 'react'

//import canvs


ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>  
      <>
        <Canvas
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [ 0, 2, 10 ]
            }}
          >  
          <Suspense fallback={null}>
          <Bvh>
              <HalloweenScene />
          </Bvh>
          </Suspense>
        </Canvas>
        <Loader/>
       
      
      </>
       
    </StrictMode>
)
