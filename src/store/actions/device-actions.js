export const LEND_DEViCE = 'LEND_DEViCE'
export const RETURN_DEViCE = 'RETURN_DEViCE'

export function lendDevice(info){
    return {
        type:LEND_DEViCE,
        payload:{
            info:info
        }
    }
} 
export function returnDevice(info){
    return {
        type:RETURN_DEViCE,
        payload:{
            info:info
        }
    }
} 
