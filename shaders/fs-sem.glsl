
uniform float reflectionPower;

uniform sampler2D t_sem;
uniform sampler2D t_sem2;
varying vec2 vUv;
varying vec3 vVel;
varying vec4 vAudio;
varying vec3 vMPos;
varying vec3 vPos;

varying vec3 vNorm;
varying vec3 vMNorm;
varying vec3 vCamPos;

varying vec3 vLightDir;
//varying float vLife;

varying vec3 vCamVec;

varying vec2 vSEM;
varying float vFR;
varying float vRFR;
varying vec3 vReflection;

void main(){


 
  vec4 sem = texture2D( t_sem , vSEM );
  vec4 sem2 = texture2D( t_sem2 , vSEM );
  float rPow = pow(vRFR,reflectionPower);
  gl_FragColor =rPow* sem2 + (1. -rPow)*sem; //* sem2;//pow( vFR, 30. ) * 1. * vAudio + vec4( 0.5 * normalize(vReflection ) + 0.7 , 1. ) *   sem; //vec4( vSEM.x , 0. , vSEM.y , 1. );

}
