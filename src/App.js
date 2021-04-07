import { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import { FormControlLabel, TextField, Checkbox } from '@material-ui/core';

function App() {
  const [name, setName] = useState('');
  const [sname, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [byear, setBYear] = useState('');
  const [street, setStreet] = useState('');
  const [streetNo, setStreetNo] = useState('');
  const [postcode, setPC] = useState('');
  const [note, setNote] = useState('');
  const [town, setTown] = useState('');
  const [accomodation, setAccomodation] = useState(1);
  const [vege, setVege] = useState(0);
  
  return (
    <form className="App">
      <h3 style={{
        'margin-bottom': '10px'
      }}>Registrační formulář</h3>
      <Grid container spacing={1}>
        <div className="in-put" style={{
          margin: '5px auto'
        }}>
          <Grid item xs={6}>
            <TextField
              label='Jméno'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Příjmení'
              value={sname}
              onChange={e => setSname(e.target.value)}
              required
            />
          </Grid>
        </div>
        <div className="in-put" style={{
          margin: '5px auto'
        }}>
          <Grid item xs={9}>
            <TextField
              style={{
                width: '97%'
              }}
              type='email'
              label='E-mailová adresa'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              type='number'
              label='Rok narození'
              value={byear}
              onChange={e => setBYear(e.target.value)}
              required
            />
          </Grid>
        </div>
        <div className="in-put" style={{
          margin: '5px auto'
        }}>
          <Grid item xs={8}>
            <TextField
              style={{
                width: '97%'
              }}
              label='Ulice'
              value={street}
              onChange={e => setStreet(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label='Č. P.'
              value={streetNo}
              onChange={e => setStreetNo(e.target.value)}
              required
            />
          </Grid>
        </div>
        <div className="in-put" style={{
          margin: '5px auto'
        }}>
          <Grid item xs={5}>
            <TextField
              style={{
                width: '97%'
              }}
              label='PSČ'
              value={postcode}
              onChange={e => setPC(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              style={{
                width: '97%'
              }}
              label='Město'
              value={town}
              onChange={e => setTown(e.target.value)}
              required
            />
          </Grid>
        </div>
        <div className="in-put" style={{
          margin: '5px auto'
        }}>
          <Grid item xs={6}>
            <TextField
              style={{
                width: '97%',
                'min-height': '120px'
              }}
              label='Poznámka k přihlášce'
              value={note}
              multiline
              onChange={e => setNote(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6} style={{
            'text-align': 'right',
            padding: '.5em 1em'
          }}>
            <FormControlLabel
              control={<Checkbox checked={accomodation} onChange={e => setAccomodation(e.target.checked)} name="checkedA" color="primary" style={{
                padding: '2px'
              }} />}
              label="Potřebuju ubytování"
              labelPlacement="start"
            />
            <FormControlLabel
              control={<Checkbox checked={vege} onChange={e => setVege(e.target.checked)} name="checkedA" color="primary" />}
              label="Jsem vegetarián"
              labelPlacement="start" 
            />
          </Grid>
        </div>
      </Grid>
    </form >
  );
}

export default App;