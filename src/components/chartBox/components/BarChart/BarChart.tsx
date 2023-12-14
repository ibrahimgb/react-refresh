import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect } from 'react';
function MyBarChart({ index , color, canGenerate , maxRange , minRange  , timeInterval , randomNumberList, setRandomNumberList}:{ index: number , color : string, canGenerate : boolean , maxRange : number , minRange : number  , timeInterval: number , randomNumberList : number[] , setRandomNumberList : any}) {


    
    useEffect(() => {
      let intervalId : number;
  
      if (canGenerate) {
        // Set up an interval to update the random number every 1000 milliseconds (1 second)
        intervalId = setInterval(() => {
          const newRandomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange; //Math.floor(Math.random() * 11);
          setRandomNumberList([...randomNumberList, newRandomNumber])

        }, timeInterval);
      }
  
      // Clean up the interval when the component is unmounted or when canGenerate is set to false
      return () => clearInterval(intervalId);
    }, [canGenerate]);
    console.log(randomNumberList)


  return (
   <>
    <div className='chart_box'>
  <BarChart 
      xAxis={[{ scaleType: 'band', data: randomNumberList.map((item,index)=>index) }]}
      series={[{ data: randomNumberList, color: color,}, ]}
      
      height={300}
      width={randomNumberList.length>70? 1600 : undefined}
    /></div>

<h3>channel {index}</h3>
{randomNumberList}
    </>
  )
}

export default MyBarChart