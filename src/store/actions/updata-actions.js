export const UPDATA = "UPDATA"

export function updata(bol){
    return {
        type:UPDATA,
        payload:{
            bol:bol
        }
    }
}