import { cn } from '@/lib/utils'
import React from 'react'

type TextTypeToAddProps = {
   width : number,
   height : number
}
const TextTypeToAdd = ({width , height}:TextTypeToAddProps) => {
    console.log(width,height)
  return (
    <div>
        <div className={cn(`border-[1px] border-black`,)}>
            
        </div>
    </div>
  )
}

export default TextTypeToAdd