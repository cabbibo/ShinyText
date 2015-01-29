
uniform float reflectionPower;
uniform sampler2D t_sem;
uniform sampler2D t_sem2;

varying vec2 vUv;
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
varying vec3 vReflection;
varying float vRFR;


void main(){

  vec4 sem = texture2D( t_sem , vSEM );
  vec4 sem2 = texture2D( t_sem2 , vSEM );
  float rPow = pow(vRFR,reflectionPower);
  gl_FragColor =rPow* sem2 + (1. -rPow)*sem;
}
