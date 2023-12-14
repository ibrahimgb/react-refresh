import Box from '@mui/material/Box';
import randomHexColor from "random-hex-color";
import { useEffect, useState } from 'react';
import "./chartBox.scss";
import MyBarChart from "./components/BarChart/BarChart";
import Inputs from "./components/Inputs/Inputs";
import DialogBox from "./components/dialog/DialogBox";
function ChartBox() {

  

const [randomNumberList, setRandomNumberList] = useState<number[][]>([[0],[0]])

  const [canGenerate, setCanGenerate] = useState(false);

  const [minRange, setMinRange] = useState<number>(0);
  const [maxRange, setMaxRange] = useState<number>(10);
  const [timeInterval, setTimeInterval] = useState<number>(1000);
  const [open, setOpen] = useState<boolean>(true)
  const [numberOfChannels , setNumberOfChannels] = useState<number>(2)
 const[channels, setChannels] = useState([])

 const[test, setTest] = useState([0])

// to generate the random numbers

 useEffect(() => {
      let intervalId : number;
  
      if (canGenerate) {
        // Set up an interval to update the random number every 1000 milliseconds (1 second)
        intervalId = setInterval(() => {

          const newRandomNumberList = 

          setRandomNumberList((prevRandomNumberList)=>prevRandomNumberList.map((subList)=>{
            console.log("newRandomNumberList")
          console.log(subList)
            return [...subList, Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange ]}))
          // setTest(()=>[...test, 3])

        }, timeInterval);
      }
  
      // Clean up the interval when the component is unmounted or when canGenerate is set to false
      return () => clearInterval(intervalId);
    }, [canGenerate]);




  // To set the number of channels

  useEffect(() => {
    let newChannels = []

    for (var i=0; i<numberOfChannels; i++){
    newChannels.push({index : i+1 , color : randomHexColor()})
    }

    const newList = newChannels.map(()=>[0])


    setRandomNumberList(newList)

    setChannels( newChannels )
}, [numberOfChannels]);

// To save the generated numbers in to local storage
  useEffect(() => {
localStorage.setItem('CHANNELS', JSON.stringify(channels));

}, [canGenerate]);
 

function loadSavedData (){

setChannels(JSON.parse(localStorage.getItem('CHANNELS') ?? ""));

}


  return (
<>
{test}
    <DialogBox loadSavedData={loadSavedData} numberOfChannels={numberOfChannels} setNumberOfChannels={setNumberOfChannels} open={open} setOpen={setOpen} setNumberOfChannels={setNumberOfChannels} />
    <Box sx={{ width: '100%' }}>

      {channels.map((channel, index)=>{
        return <MyBarChart randomNumberList={randomNumberList[index]} key={channel.index} index ={channel.index} color={channel.color} />
      })}


<div className='inputs'>   
      <Inputs minRange={minRange} setMinRange={setMinRange} maxRange={maxRange} setMaxRange={setMaxRange} timeInterval={timeInterval} setTimeInterval={setTimeInterval} setCanGenerate={setCanGenerate} />

</div>
    </Box>
</>
  );
}



export default ChartBox