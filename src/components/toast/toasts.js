import { toast } from "react-toastify";
import { toastErrorConfig, toastSuccessConfig } from "./toastConfig";


export const SuccessToast = (info = 'Success', pos = 'TOP_CENTER') => {
    toast(info, { ...toastSuccessConfig, position: toast.POSITION[pos] });
}

export const ErrorToast = (info = 'Error Occurred', pos = 'TOP_CENTER') => {
    toast(info, { ...toastErrorConfig, position: toast.POSITION[pos] });
}