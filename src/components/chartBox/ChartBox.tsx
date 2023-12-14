import Box from '@mui/material/Box';
import randomHexColor from "random-hex-color";
import { useEffect, useState } from 'react';
import "./chartBox.scss";
import MyBarChart from "./components/BarChart/BarChart";
import Inputs from "./components/Inputs/Inputs";
import DialogBox from "./components/dialog/DialogBox";
function ChartBox() {

  

const [randomNumberList, setRandomNumberList] = useState<number[][]>([[0],[0]])
function setRandomNumberListOfAList(index: number, value : number[]){
    console.log("gggg")
  let newRandomNumberList:  number[][] = JSON.parse(JSON.stringify(randomNumberList)) ;
  newRandomNumberList[1][1] = 1 //.push(value) ; newRandomNumberList[index].length+1
  
  console.log("index", newRandomNumberList[index].length)

  setRandomNumberList(()=> newRandomNumberList)
  console.log(randomNumberList)
  console.log(newRandomNumberList)
}
 

let random = [[1,3,4], [3,9,7]]


















  const [canGenerate, setCanGenerate] = useState(false);

  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(10);
  const [timeInterval, setTimeInterval] = useState(1000);
  const [open, setOpen] = useState(true)
  const [numberOfChannels , setNumberOfChannels] = useState(2)
 const[channels, setChannels] = useState([])
  useEffect(() => {
    let newChannels = []

    for (var i=0; i<numberOfChannels; i++){
    newChannels.push({index : i+1 , color : randomHexColor()})
    }

    const newList = newChannels.map(()=>[0])


    setRandomNumberList(newList)

    setChannels( newChannels )
}, [numberOfChannels]);

  useEffect(() => {
localStorage.setItem('CHANNELS', JSON.stringify(channels));
console.log(channels)
console.log("saved")
}, [canGenerate]);
 

function loadSavedData (){

setChannels(JSON.parse(localStorage.getItem('CHANNELS') ?? ""));

}


console.log(numberOfChannels)

  return (
<>
    <DialogBox loadSavedData={loadSavedData} numberOfChannels={numberOfChannels} setNumberOfChannels={setNumberOfChannels} open={open} setOpen={setOpen} setNumberOfChannels={setNumberOfChannels} />
    <Box sx={{ width: '100%' }}>

      {channels.map((channel, index)=>{
        return <MyBarChart randomNumberList={randomNumberList[index]} setRandomNumberList={(v)=>{setRandomNumberListOfAList(index, v)}}  key={channel.index} timeInterval = {timeInterval} maxRange  = {maxRange} minRange = {minRange} canGenerate={canGenerate} index ={channel.index} color={channel.color} />
      })}


<div className='inputs'>   
      <Inputs minRange={minRange} setMinRange={setMinRange} maxRange={maxRange} setMaxRange={setMaxRange} timeInterval={timeInterval} setTimeInterval={setTimeInterval} setCanGenerate={setCanGenerate} />

</div>
    </Box>
</>
  );
}



export default ChartBox