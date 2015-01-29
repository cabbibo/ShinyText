const int size  = @SIZE;

uniform sampler2D t_oPos;
uniform sampler2D t_pos;
uniform sampler2D t_og;
uniform sampler2D t_audio;
uniform float dT;
uniform float timer;

uniform vec3 repelers[ size ];
uniform vec3 velocities[ size ];

uniform float repulsionPower;
uniform float repulsionRadius;
uniform float dampening;

varying vec2 vUv;


void main(){


  
  vec4 oPos = texture2D( t_oPos , vUv );
  vec4 pos  = texture2D( t_pos , vUv );

  vec4 og   = texture2D( t_og , vUv );
  vec3 vel  = pos.xyz - oPos.xyz;
  vec3 p    = pos.xyz;

  float life = pos.w;
  
  vec3 f = vec3( 0. , 0. , 0. );
 
  vec3 dif = pos.xyz - og.xyz;

  vec3 repel = pos.xyz - vec3( 1. , 0. , 0. );

  for( int i = 0; i < size; i++ ){

    vec3  rP = repelers[ i ];
    vec3  rV = velocities[i];
    vec3  rD = pos.xyz - rP;

    float rMatch = dot( normalize(rD) , normalize(rV) );
    float rL = max( 1. , length( rD ) );
    vec3  rN = normalize( rD );

    if( rL < repulsionRadius * rMatch ){

      f +=  repulsionPower * rN / (rL) * length( rV );

    }


  }


  f -= dif;
 
  vel += f*min( .1 , dT);
  vel *= dampening;
  p += vel * 1.;//speed;*/



  //gl_FragColor = vec4( og.xyz + sin( timer ) * 1.* vec3( vUv.x , vUv.y , 0. ), 1.  );
  gl_FragColor = vec4( p , life );

}
