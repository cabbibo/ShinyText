function Slider( name , uniform , controls ){

  this.name = name;
  this.uniform = uniform;
  this.controls = controls;

  this.height = 40;
  this.width = 200;
  this.depth = 10;
  this.titleSize = .6;

  this.scene = new THREE.Object3D();

  this.title = textCreator.createMesh( name );
  this.scene.add( this.title );
  this.title.scale.multiplyScalar( this.titleSize ); 
  this.title.position.y = this.height/ 2 + this.title.totalHeight * this.titleSize  * .5;
  this.title.position.x = - this.width / 2 + this.title.totalWidth * .5 * this.titleSize;

  this.title.material.opacity = .4;

  var m = new THREE.ShaderMaterial({
    uniforms:{
      t_normal:  G_UNIFORMS.t_normal,      
      t_sem:  { type:"t" , value: matcap },
      t_sem2:  { type:"t" , value: matcap2 },
      lightPos:G_UNIFORMS.lightPos,
      reflectionPower:G_UNIFORMS.reflectionPower,
    },
    vertexShader:   shaders.vs.knob,
    fragmentShader: shaders.fs.knob,
  });


  var geo = new THREE.BoxGeometry( this.height / 5 , this.height * 1.1 , this.depth * 2 );
  this.knob = new THREE.Mesh( geo , m );
  this.knob.position.z = this.depth * .5;

  var geo = new THREE.PlaneBufferGeometry( this.width , this.height ); 


  this.full = new THREE.Mesh( geo , m );

  var m = new THREE.ShaderMaterial({
    uniforms:{
      t_normal:  G_UNIFORMS.t_normal,
      t_sem:  { type:"t" , value: sem },
      t_sem2:  { type:"t" , value: sem2 },
      lightPos:G_UNIFORMS.lightPos,
      reflectionPower:G_UNIFORMS.reflectionPower,
    },
    vertexShader:   shaders.vs.knob,
    fragmentShader: shaders.fs.knob,
  });
  var geo = new THREE.PlaneBufferGeometry( 1 , this.height ); 

  this.fill = new THREE.Mesh( geo , m );
  this.fill.position.z = this.depth;

  this.iPlane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry( 10000 , 10000 ),
      new THREE.MeshBasicMaterial({side: THREE.DoubleSide })
  );
  this.iPlane.visible = false;
  
  this.scene.add( this.iPlane );
  this.scene.add( this.full );
  this.scene.add( this.fill );
  this.scene.add( this.knob );

  this.constraints = uniform.constraints;
  this.range = this.constraints[1] - this.constraints[0];

  
  this.left = -this.width / 2;
  this.right = this.width / 2;
 

  this.uniform = uniform;

  var p = this.position( uniform.value- this.constraints[0] );
  console.log( p );
  this.knob.position.x = p;

  this.resizeFill( uniform.value - this.constraints[0] );

  this.knob.hoverOver = this.hoverOver.bind(  this );
  this.knob.hoverOut  = this.hoverOut.bind(   this );
  this.knob.select    = this.select.bind(     this );
  this.knob.deselect  = this.deselect.bind(   this );
  this.knob.update    = this.update.bind(     this );

  this.fill.hoverOver = this.hoverOver.bind(  this );
  this.fill.hoverOut  = this.hoverOut.bind(   this );
  this.fill.select    = this.select.bind(     this );
  this.fill.deselect  = this.deselect.bind(   this );
  this.fill.update    = this.update.bind(     this );
  
  this.full.hoverOver = this.hoverOver.bind(  this );
  this.full.hoverOut  = this.hoverOut.bind(   this );
  this.full.select    = this.select.bind(     this );
  this.full.deselect  = this.deselect.bind(   this );
  this.full.update    = this.update.bind(     this );
  
  this.controls.add( this.knob );
  this.controls.add( this.fill );
  this.controls.add( this.full );

}

Slider.prototype.position = function( value ){


  var percentage = this.percentage( value );
  //console.log( percentage );
  return this.left + this.width * percentage


}

Slider.prototype.resizeFill = function( value ){

  var percentage = this.percentage( value );
  this.fill.scale.x = this.width * percentage;
  if( this.fill.scale.x == 0 ){ this.fill.scale.x = .0000001 }
  //console.log( this.fill.scale.x );
  this.fill.position.x = this.left + this.width * percentage * .5;


}

Slider.prototype.percentage = function( value ){

  //var val = value - this.constraints[0];

  return value / this.range;

}

Slider.prototype.getValueFromPosition = function( position ){

  var l = position.x - this.left;
  var r = this.right - this.left;
  var percentage = l/r;
  
  return percentage * this.range;

}

Slider.prototype.hoverOver = function(){

  this.title.material.opacity = .8;

}
Slider.prototype.hoverOut = function(){

  this.title.material.opacity = .4;


}
Slider.prototype.select = function(){

  this.title.material.opacity = 1;



}
Slider.prototype.deselect = function(){

  //this.knob.material.opacity = .4;
  this.title.material.opacity = .8;


}
Slider.prototype.update = function( intersect ){

  this.controls.setRaycaster( this.controls.unprojectedMouse );
  var i = this.controls.raycaster.intersectObject( this.iPlane );

  this.knob.position.x = i[0].point.x-this.scene.position.x;

  var p = this.knob.position;
  if( p.x < this.left ){ p.x = this.left }
  if( p.x > this.right ){ p.x = this.right }
  var value = this.getValueFromPosition( this.knob.position );
  this.resizeFill( value );
  this.uniform.value = value + this.constraints[0];
  //this.knob.material.opacity = .4;

}
