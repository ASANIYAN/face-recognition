import { AiFillExclamationCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';

export const toastSuccessConfig = {
  icon: <BsFillCheckCircleFill size={30} className='dark-green' />,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  hideProgressBar: true,
  autoClose: 2000,
};

export const toastErrorConfig = {
  icon:<AiFillExclamationCircle size={30} className='dark-red'/>,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  hideProgressBar: true,
  autoClose: 2000,
};