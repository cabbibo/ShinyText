function Text( text , subs ){

    var text = text || "#weirdkids",
        subs = subs || 2,


    height = 1,
    size = 3,
    hover = 30,

    curveSegments = 4,

    bevelThickness = 2,
    bevelSize = 1.5,
    bevelSegments = 3,
    bevelEnabled = false,

    font ="optimer", // helvetiker, optimer, gentilis, droid sans, droid serif

    weight = "bold", // normal bold
    style = "normal"; // normal italic


    var geometry = new THREE.Geometry();
  
    
    var geo = new THREE.TextGeometry( text, {

      size: size,
      height: height,
      curveSegments: curveSegments,

      font: font,
      weight: weight,
      style: style,

      bevelThickness: bevelThickness,
      bevelSize:  bevelSize,
      bevelEnabled: bevelEnabled,

      material: 0,
      extrudeMaterial: 1

    });



    geo.computeBoundingBox();
    console.log( geo );

    var m = new THREE.Mesh( geo );

    m.position.x = (geo.boundingBox.min.x - geo.boundingBox.max.x)/2;
    m.updateMatrix();
    
    geometry.merge( geo , m.matrix ); 
    // geo.computeVertexNormals();

    var modifier = new THREE.SubdivisionModifier( subs );
   
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    modifier.modify( geometry );


  this.geo = geometry;

  return new THREE.Mesh( this.geo );
 /* var mesh = new THREE.Mesh( geo ,/* new THREE.MeshBasicMaterial({
  
    color:0xffffff,
    map: t_audio.value
   // wireframe:true
    
  })  mat);

  this.mesh = mesh;*/
  //scene.add( mesh );



}
