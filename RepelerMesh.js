function RepelerMesh( title , mesh , repelers , extraParams ){

    
  

  var title = title || 'HELLO';
  var mesh = mesh || new THREE.Mesh( new THREE.BoxGeometry( 1000 , 1000 , 1000 , 80 , 80 , 80 ) );
  var geometry = new THREE.Geometry();

  geometry.merge( mesh.geometry , mesh.matrix );
  
 // var geometry =  || new THREE.BoxGeometry( 1000 , 1000 , 1000 , 80 , 80 , 80 );
  

  var st = repelers.length + "";

  var s = shaders.setValue( shaders.simulationShaders.fire , 'SIZE' , st );
 
  
  this.rotationSpeed = .1;

  var extraParams = extraParams || {};
  console.log( extraParams );
  var params =  {

    rotationSpeed: .1,
    rotationRadius: 300,
    repelers: REPELERS,

    vs: extraParams.vs || shaders.vertexShaders.fire,
    fs: extraParams.fs || shaders.fragmentShaders.weird1,
    ss: s,

    geometry: geometry,


    dT: G_UNIFORMS.dT,
    time: G_UNIFORMS.time,

    soul:{
       
      dampening:          { type:"f" , value: .9 , constraints:[.8 , .999] },
      repulsionPower:     { type:"f" , value: 1. , constraints:[-100  , 100] },
      repulsionRadius:     { type:"f" , value: 1. , constraints:[-100  , 100] },
      
      repelers:         { type:"v3v" , value:[] },
      velocities:       { type:"v3v" , value:[] },

    },

    body:{
      
    },

  }


  var s = params.soul;
  for( var i = 0; i < repelers.length; i++ ){

    var r = repelers[i]
    s.repelers.value.push( r.position );
    s.velocities.value.push( r.velocity );

  }


  //Passing through extra params
 
  if( extraParams.soul ){
    var s = extraParams.soul;
    for( var propt in s ){
      params.soul[propt] = s[propt];
    }
  }

  if( extraParams.body ){
    var s = extraParams.body;
    for( var propt in s ){
      params.body[propt] = s[propt];
    }
  }

 
  if( extraParams.vs ) params.vs = extraParams.vs;
  if( extraParams.fs ) params.fs = extraParams.fs;

  var gem = new GEM( params );
 
 /* var gHolder = document.createElement('div');

  var tHolder = document.createElement('h1');

  tHolder.innerHTML =''+ title;

  gHolder.appendChild( tHolder );
  var guis = document.getElementById( 'GUI' );

  guis.appendChild( gHolder );



  $(tHolder).hover(function(){
    this.gui.gui.open();
  }.bind( gem ));

  $(gHolder).hover(function(){},function(){
    this.gui.gui.close();
  }.bind(gem));

  gem.tHolder = tHolder;

  gem.gui = new GUI( params , {
   domElement: gHolder 
  });
*/

  return gem;

}

