import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
 
var productionConfig =
{
   entry:  'main.js',
   dest:   'bundle.js',
   format: 'iife',
   plugins:
   [
      babel({
         exclude: 'node_modules/**'
      }),
      nodeResolve({
        jsnext: true
      }),
      commonjs({
         include: 'node_modules/**',
         namedExports:
         {
            './node_modules/react/react.js': 
            [ 'cloneElement', 'createElement', 'PropTypes', 
              'Children', 'Component' ],
         }
      }),
      replace({
         'process.env.NODE_ENV': JSON.stringify( 'production' )
      }),
      uglify({
         compress: {
            screw_ie8: true,
            warnings: false
         },
         output: {
            comments: false
         },
         sourceMap: false
      })
   ]
}

var developmentConfig =
{
   entry:  'src/js/main.js',
   dest:   'dist/bundle.js',
   format: 'iife',
   plugins:
   [
      babel({
         exclude: 'node_modules/**'
      }),
      nodeResolve({
        jsnext: true
      }),
      commonjs({
         include: 'node_modules/**',
         namedExports:
         {
            './node_modules/react/react.js':      
            [ 'cloneElement', 'createElement', 'PropTypes', 
              'Children', 'Component' ],
         }
      }),
      replace({
         'process.env.NODE_ENV': JSON.stringify( 'development' )
      })
   ]
}
// Edit this line for dev configs (either Dev or Production)
export default developmentConfig;

