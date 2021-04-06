import { useState } from 'react';
import FormInput from './components/form-input/form-input.comp';

function App() {
  const [name, setName] = useState('');
  const [sname, setSname] = useState('');
  return (
    <form className="App">
      <h3>Registrační formulář</h3>
      <div className="in-put">
        <FormInput
          name='name'
          type='name'
          handleChange={e => setName(e.target.value)}
          value={name}
          label='Příjmení'
          required />
        <FormInput
          name='name'
          type='sname'
          handleChange={e => setSname(e.target.value)}
          value={sname}
          label='Příjmení'
          required />
      </div>
    </form>
  );
}

export default App;