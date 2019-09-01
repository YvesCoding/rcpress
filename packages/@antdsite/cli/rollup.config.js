import { config } from '@antdsite/rollup';

export default config({
  input: './src/index.ts',
  output: {
    dir: 'bin'
  }
});    
