import Box from '@mui/material/Box';
import randomHexColor from "random-hex-color";
import { useEffect, useState } from 'react';
import "./chartBox.scss";
import MyBarChart from "./components/BarChart/BarChart";
import Inputs from "./components/Inputs/Inputs";
import DialogBox from "./components/dialog/DialogBox";

type Channel = {

  index : number;
   color : string;
  data:number[]

};


function ChartBox() {

  



  const [canGenerate, setCanGenerate] = useState(false);
  const [saveToLocal, setSaveToLocal] = useState(false);

  const [minRange, setMinRange] = useState<number>(0);
  const [maxRange, setMaxRange] = useState<number>(10);
  const [timeInterval, setTimeInterval] = useState<number>(1000);
  const [open, setOpen] = useState<boolean>(true)
  const [loadData, setLoadData] = useState<boolean>(false)
  const [numberOfChannels , setNumberOfChannels] = useState<number>(2)
 const[channels, setChannels] = useState<Channel[]>([])
const [randomNumberList, setRandomNumberList] = useState<number[][]>([[0],[0]])

// to generate the random numbers

 useEffect(() => {
      let intervalId : number;
      if (canGenerate) {
        // Set up an interval to update the random number every 1000 milliseconds (1 second)
        intervalId = setInterval(() => {

          setChannels((prevChannels)=>prevChannels.map((channel)=>{

          if (channel.data[0] === 0 && channel.data.length === 1){
            return {...channel, data: [ Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange ]}
          }

            return {...channel, data: [...channel.data, Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange ]}}))
          // setTest(()=>[...test, 3])

        }, timeInterval);
      }
      // Clean up the interval when the component is unmounted or when canGenerate is set to false
      return () => clearInterval(intervalId);
    }, [canGenerate]);


  // To set the number of channels

  useEffect(() => {
    let newChannels : Channel[] = []

    for (var i=0; i<numberOfChannels; i++){
    newChannels.push({index : i+1 , color : randomHexColor(), data:[0]})
    }

    const newList = newChannels.map(()=>[0])


    setRandomNumberList(newList)

    setChannels( newChannels )
}, [numberOfChannels]);

// To save the generated numbers in to local storage

function save(){
localStorage.setItem('CHANNELS', JSON.stringify(channels));
console.log("deleting???")
}
 

function loadSavedData (){

setChannels(()=>{
  
  const defaultChannel : Channel[] = [{
    index : 0,
    color : "#000000",
    data:[-1]
  }]
  
  return JSON.parse(localStorage.getItem('CHANNELS') ?? "")?? defaultChannel});
console.log("updated?")
console.log(JSON.parse(localStorage.getItem('CHANNELS') ?? ""))
console.log("yes?")

}
console.log(channels)

  return (
<div className='box'>
{/* {channels[0].data} */}
    <DialogBox setLoadData={setLoadData} loadSavedData={loadSavedData} numberOfChannels={numberOfChannels} setNumberOfChannels={setNumberOfChannels} open={open} setOpen={setOpen} setNumberOfChannels={setNumberOfChannels} />
    <Box sx={{ width: '100%' }}>

      {channels.map((channel)=>{
        return <MyBarChart randomNumberList={channel.data} key={channel.index} index ={channel.index} color={channel.color} />
      })}


<div className='inputs'>   
      <Inputs save = {save} minRange={minRange} setMinRange={setMinRange} maxRange={maxRange} setMaxRange={setMaxRange} timeInterval={timeInterval} setTimeInterval={setTimeInterval} setCanGenerate={setCanGenerate} />
</div>
    </Box>
</div>
  );
}



export default ChartBox