Arrangements = {


  row: function( length , y ){

    var y = y || 0;
    var length = length || 50;

    for( var i = 0; i < REPELERS.length; i++ ){

      var x = ((i / REPELERS.length ) - .5 ) * length;
      var y = y;
      var z = 0;


      REPELERS[i].target.set( x , y , z );

    }

  },

  randomSphere: function( radius ){


    var radius = radius || 15;

    for( var i = 0; i < REPELERS.length; i++ ){

      var t = Math.random() * 2 * Math.PI;
      var p = Math.random() * 2 * Math.PI;

      REPELERS[i].target.copy( toCart( radius , t , p ) );

    }

  },


  cube: function( size ){

    var size = size || 10;

    for( var i = 0; i < REPELERS.length; i++ ){

      var x = Math.random() < .5 ? size : -size; 
      var y = Math.random() < .5 ? size : -size; 
      var z = Math.random() < .5 ? size : -size; 

      REPELERS[i].target.set( x , y , z );

    }


  },

  plane: function( size , dir , pos ){

    var size = size || 10;
    var dir  =  dir || 'x';
    var pos  =  pos || 20;

    for( var i = 0; i < REPELERS.length; i++ ){


      var x = 0 , y = 0 , z = 0;

      var s = Math.ceil( Math.pow( REPELERS.length , .5 ) );

      var q = pos;
      var w = (((Math.floor((i+.5) / s))/s - .5 )+(.5/s)) *2 * size;
      var e = (((((i+.5) % s) / s ) - .5 )+(.5/s) )  *2 * size;
      
      if( dir == 'x' ){
        x = q;
        y = w;
        z = e;
      }else if( dir == 'y' ){
        x = w;
        y = q;
        z = e;
      }else if( dir == 'z' ){
        x = w;
        y = e;
        z = q;
      }


      REPELERS[i].target.set( x , y , z );

    }




  }



}


