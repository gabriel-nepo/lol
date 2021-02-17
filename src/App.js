import logo from './logo.svg';
import React from 'react';
import BasicTable from './table';
import TextField from '@material-ui/core/TextField';
import ScheduleTable from './table schedule';
import { Button } from '@material-ui/core';


function App() {

  const [id,setId] = React.useState("");
  const [current,setCurrent] = React.useState("");
  console.log(current);
  return (
    <div >
      <div style={{ margin: 20 }}>
        <div>
          <TextField id="outlined-basic" label="Game ID" variant="outlined" onChange={(e)=> setId(e.target.value)} />
          <Button style={{height: 50,marginTop: 2,marginLeft: 10,backgroundColor: "pink"}} variant="contained" color="secondary" onClick={()=>setCurrent(id)}>
            Procurar
          </Button>

        </div>
      </div>
      <div style={{ margin: 20 }}>
        <BasicTable match={current} />
      </div>
      <div style={{ margin: 20 }}>
        <ScheduleTable />
      </div>
    </div>
  );
}

export default App;
