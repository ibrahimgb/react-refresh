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

  
  const [canGenerate, setCanGenerate] = useState<boolean>(false);
  // the minimal range that the random number generated can retch
  const [minRange, setMinRange] = useState<number>(0);
  // the maximum range that the random number generated can retch
  const [maxRange, setMaxRange] = useState<number>(10);
  // time interval between etch number generated
  const [timeInterval, setTimeInterval] = useState<number>(1000);
// the conditional variable to show the initial dialog for the first loading
  const [openDialog, setOpenDialog] = useState<boolean>(true)
  // number of channel charts to display
  const [numberOfChannels , setNumberOfChannels] = useState<number>(2)
  // channel list 
 const[channels, setChannels] = useState<Channel[]>([])

// to generate the random numbers

 useEffect(() => {
      let intervalId : number;
      if (canGenerate) {
        // Set up an interval to update the random number every 1000 milliseconds (1 second)
        intervalId = setInterval(() => {

          setChannels((prevChannels)=>prevChannels.map((channel)=>{
// generate random number between min and may
          if (channel.data[0] === 0 && channel.data.length === 1){
            return {...channel, data: [ Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange ]}
          }
            return {...channel, data: [...channel.data, Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange ]}}))

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


    setChannels( newChannels )
}, [numberOfChannels]);

// To save the generated numbers in to local storage
function save(){
localStorage.setItem('CHANNELS', JSON.stringify(channels));
}
 
// read the saved data from local storage
function loadSavedData (){

setChannels(()=>{  
  const defaultChannel : Channel[] = [{
    index : 0,
    color : "#000000",
    data:[-1]
  }]
  
  return JSON.parse(localStorage.getItem('CHANNELS') ?? "")?? defaultChannel});
// console.log("updated?")
// console.log(JSON.parse(localStorage.getItem('CHANNELS') ?? ""))
// console.log("yes?")

}

  return (
<div className='box'>
{/* {channels[0].data} */}
    <DialogBox  loadSavedData={loadSavedData} numberOfChannels={numberOfChannels} setNumberOfChannels={setNumberOfChannels} open={openDialog} setOpen={setOpenDialog} />
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