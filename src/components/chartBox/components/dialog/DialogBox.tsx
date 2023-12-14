import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import CustomNumberInput from "../CustomInput/CustomInput";
import "./dialogBox.scss";
function DialogBox( {open, setOpen , numberOfChannels , setNumberOfChannels, loadSavedData  }) {


  const [numberOfChannelsLocal, setNumberOfChannelsLocal] = useState(numberOfChannels);

  const handleClickOpen = () => {
    setOpen(true);
  };


const handleSave = () => {
  setNumberOfChannels(numberOfChannelsLocal)
    setOpen(false);
  };

  
const handleLoadSaved = () => {
  loadSavedData()
    setOpen(false);
  };


  const handleClose = () => {
    setOpen(false);
  };

  return (
   <Dialog
        fullScreen={false}   
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Charts display"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input the number of channels you want to have, or load charts already saved
          </DialogContentText>
        </DialogContent>
        <div className='input'>
          <CustomNumberInput  value={numberOfChannelsLocal} editValue={ setNumberOfChannelsLocal } placeHolder={"number of channels"} />
        </div>
        <DialogActions>
          <Button className='dialog_btn' autoFocus onClick={handleSave}>
            Save changes
          </Button>
          <Button className='dialog_btn' onClick={handleLoadSaved} autoFocus>
            Load saved data
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DialogBox