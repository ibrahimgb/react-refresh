# React Data Visualizer


## starting the application


- Configure the top-level `npm i`
- Configure the top-level `npm run dev`
- go to "http://localhost:5173/"

  
## Previeau

Initially you can choose to set the number of channels you want or get what is stored previously ( and stored in local storage)

![image](https://github.com/ibrahimgb/react-refresh/assets/59414164/591bab1a-c649-47bc-9b43-937810b3e998)

the user can set the min and max number possible in to generate and the time interval the collar of the chart is generated randomly.
when you click start it will start generating, and stop will stop it and save the result in to local storage.

![image](https://github.com/ibrahimgb/react-refresh/assets/59414164/6380f7f3-4e46-4d44-9674-31e2f8d7a570)


## Tasks done

- Make the generation time interval and the number range adjustable at any time.
- Integrate "Save" and "Load" functionalities. All generated numbers from each
channel should be saved and reloaded when required. If a new "Start" command is
issued after a load, the new numbers should append to the previous ones. Implement
some form of file versioning to save and check upon load.
- Implement unique colors for each channel, a numerical indicator, horizontal scrolling,
and vertical scaling for enhanced visualization.
- Implement unique colors for each channel, a numerical indicator, horizontal scrolling,
and vertical scaling for enhanced visualization.
-  Allow the number of channels to be set as a parameter before issuing the initial
"Start" command.
