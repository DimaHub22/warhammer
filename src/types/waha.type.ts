import {WahaOtherType} from "./wahaOther.type";

export type WahaType = {
  id: string,
  name: string,
  pts: string,
  image: string,
  power?: string,
  description: string,
  status:string
  otherUnits?:WahaOtherType[]
}
