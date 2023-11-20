import dev from './dev';
import prod from './prod';

// 제품 타입에 따라서 적합한 컨피그를 읽어온다.
const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
