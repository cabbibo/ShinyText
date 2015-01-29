uniform vec3 lightPos;
uniform vec3 velocity;
varying vec2 vUv;

varying vec3 vPos;
varying vec3 vMPos;

varying vec3 vLightDir;

//varying float vLife;
varying vec4 vAudio;

varying vec3 vNorm;

varying vec3 vCamPos;
varying vec3 vCamVec;
varying vec3 vMNorm;

varying vec2 vSEM;
varying float vFR;
varying float vRFR;

varying vec3 vReflection;

void main(){


  vec3 pos = position.xyz;
  vNorm = normal;

  vMPos = ( modelMatrix * vec4( pos.xyz , 1. ) ).xyz;
  vMNorm = ( modelMatrix * vec4( vNorm.xyz , 0. ) ).xyz;

  vLightDir = normalize( vMPos - lightPos );
 
  float velMatch = dot( normalize(velocity) , vNorm );
  //pos.xyz = vNorm * pow( length( velocity ), 2.) * .1 * pow( velMatch, 5.);
  //pos.xyz = vNorm * 40. * .1 * pow(  max( 0. , velMatch ) + 1. - max(0. , -velMatch), 5.);

  pos.xyz = vNorm * ((1. - abs(velMatch)) + max( 0. , velMatch ) + (max( 0. , -velMatch * 5.) *  pow( max( 0. , -velMatch),5.))) * pow( length( velocity ), 1.5) * .06;
  
  vec3 e = normalize( vec3( modelViewMatrix * vec4( pos.xyz , 1. ) ) );
  vec3 n = normalize( normalMatrix * vNorm );

  vec3 r = reflect( e, n );

  float m = 2. * sqrt( 
    pow( r.x, 2. ) + 
    pow( r.y, 2. ) + 
    pow( r.z + 1., 2. ) 
  );
  vSEM = r.xy / m + .5;

  float fr = 1. - abs(pow( dot( e , n ) , 4. )) ; 

   vReflection = reflect( vLightDir , vNorm );
  vFR = fr;

  vPos = pos.xyz;
  //vLightDir = normalize( vMPos - vec3( 1000. , 0. , 0. ) );

  vCamVec = normalize( cameraPosition - vMPos);
 
  vRFR = dot( vCamVec , vReflection );
  //vLightDir = normalize( vMPos - vec3( 1000. , 0. , 0. ) );

  vCamVec = normalize( cameraPosition - vMPos);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos.xyz , 1. );


}

