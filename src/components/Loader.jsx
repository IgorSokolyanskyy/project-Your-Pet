import { TailSpin } from 'react-loader-spinner';

const Loader = () => (
  <div
    style={{
      position: 'absolute',
      top: ' 20%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <TailSpin
      color="#54adff"
      height={100}
      width={100}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
);

export default Loader;
