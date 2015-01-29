
uniform float reflectionPower;
uniform sampler2D t_normal;
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

$uvNormalMap
$semLookup


void main(){

  vec3 newNormal = uvNormalMap( t_normal , vMPos , vUv , vNorm , 2. , 2. );
  vec2 lookup = semLookup( vCamVec , newNormal );
  vec4 sem = texture2D( t_sem , lookup );
  vec4 sem2 = texture2D( t_sem2 , lookup );
  float rPow = pow(vRFR,reflectionPower);
  gl_FragColor =rPow* sem2 + (1. -rPow)*sem;
}
