import Button from '@mui/joy/Button';
import { useState } from 'react';
import CustomNumberInput from "../CustomInput/CustomInput";
import "./inputs.scss";








function Inputs({minRange , setMinRange , maxRange, setMaxRange , timeInterval , setTimeInterval , setCanGenerate, save }) {
  const [min, setMin] = useState(minRange);
  const [max, setMax] = useState(maxRange);
  const [time, setTime] = useState(timeInterval);

  const saveParams = ()=>{
    setMinRange(min)
    setMaxRange(max)
    setTimeInterval(time)
  }
function stop(){
  setCanGenerate(false)
  save()
}

  return (
    <>
      
<div className='generate'>

<Button onClick={()=>{setCanGenerate(true)}} >Start</Button>
          <Button  onClick={()=>{stop()}}  >Stop</Button>
    
</div>

<h4>Set minimum and maximum value</h4>
        <div className='range_input'>
            
            <CustomNumberInput value = {min} editValue = {setMin} placeHolder = {"Set Min"} />
            <CustomNumberInput value = {max} editValue = {setMax} placeHolder = {"Set Max"} />
    {/* <Input type="text" value={minRange} onChange={e=>setMin(parseInt(e.target.value))} name="" id="item" />
    <Input type="text" value={maxRange} onChange={e=>setMax(parseInt(e.target.value))} name="" id="item" /> */}
    
          </div>
     <div className='time_input'>

     <CustomNumberInput value = {time} editValue = {setTime} placeHolder = {"Set Time"} />
    {/* <Input type="text" value={time} onChange={e=>setTime(parseInt(e.target.value))} name="" id="item" /> */}
    <Button className="btn" onClick={saveParams} >save</Button>
     </div>

  </>
  )
}

export default Inputs

