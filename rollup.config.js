import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
 
const productionConfig =
{
   entry:  'src/js/main.js',
   dest:   'dist/bundle.js',
   format: 'iife',
   plugins:
   [
      nodeResolve({
         jsnext: true,
         main: true,
         extensions: [ '.js', '.json' ],
         browser: true,
         preferBuiltins: false
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
      babel({
         exclude: [
            'node_modules/**',
            '**/*.json'
         ],
      }),
      globals(),
      builtins(),
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
      }),
      json()
   ]
}

const developmentConfig =
{
   entry:  'src/js/main.js',
   dest:   'dist/bundle.js',
   format: 'iife',
   plugins:
   [
      nodeResolve({
         jsnext: true,
         main: true,
         extensions: [ '.js', '.json' ],
         browser: true,
         preferBuiltins: false
      }),
      commonjs({
         include: 'node_modules/**',
         namedExports:
         {
            './node_modules/react/react.js': [ 'cloneElement', 'createElement', 'PropTypes', 
              'Children', 'Component' ],
         }
      }),
      babel({
         exclude: [
            'node_modules/**',
            '**/*.json'
         ],
      }),
      globals(),
      builtins(),
      replace({
         'process.env.NODE_ENV': JSON.stringify( 'development' )
      }),
      json()
   ]
}
// Edit this line for dev configs (either Dev or Production)
export default developmentConfig;

