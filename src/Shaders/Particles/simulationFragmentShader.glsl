


uniform sampler2D uPosition;
uniform sampler2D texturePosition;
uniform float uTime;
uniform float uFrequency;
varying vec2 vUv; 
varying vec2 vUvs;
// attribute vec2 reference;



void main() {

      
      //  float time = abs(sin(uTime * 0.35));

				// vec2 uv = gl_FragCoord.xy / resolution.xy;
				// vec4 tmpPos = texture2D( texturePosition, uv);
				// vec3 position = tmpPos.xyz;
				
		
				// gl_FragColor = vec4( position + vec3(0.001) , 1. );
  

   vec4 tmpPos = texture2D(uPosition, vUv);
   vec3 pos = tmpPos.xyz;
//   vec3 pos = tmpPos.xyz;

//   move pos up
//  pos.y += uTime * 0.1;

pos += vec3(0.01) * uTime;

   // pos.y += sin(uTime + pos.x * 0.5) * 0.1;
  // vec3 curlPos = texture2D(positions, vUv).rgb;

   gl_FragColor = vec4(pos, 1.0);
}



