import { useState, useRef, useEffect } from 'react';
import './App.css'

// 🎯 Bonus: Migliorare l'Usabilità

// Utilizziamo useRef() per migliorare l’esperienza utente, implementando le seguenti funzionalità:
// Focus automatico al primo input (Nome) al mount del componente.
// Bottone "Reset" in fondo al form per ripristinare tutti i valori:
// Gli input controllati devono tornare ai valori iniziali.
// Gli input non controllati devono essere resettati manualmente usando useRef().
// Freccia fissa in basso a destra che, quando cliccata, riporta l'utente all'inizio del form (bisogna usare position: fixed).

function App() {
  const nameRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const specRef = useRef();
  const experienceRef = useRef();
  const [description, setDescription] = useState('');

  useEffect(() => {
    nameRef.current.focus();
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameRef.current.value.trim() !== '' &&
      username.trim() !== '' &&
      password.trim() !== '' &&
      specRef.current.value.trim() !== '' &&
      parseInt(experienceRef.current.value.trim()) >= 0 &&
      description.trim() !== '' &&
      usernameValidation() &&
      passwordValidation() &&
      descriptionValidation()) {
      console.log(`Registrazione completata con i seguenti dati:
        Nome completo: ${nameRef.current.value}
        Username: ${username}
        Password: ${password}
        Specializzazione: ${specRef.current.value}
        Anni di esperienza: ${experienceRef.current.value}
        Descrizione: ${description}`);
      handleReset(e);
    } else {
      console.log('Devi compilare tutti i campi correttamente');

    }
  }

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  const usernameValidation = () => {

    // Regex: ^[a-zA-Z0-9]+$
    // Le regex in JavaScript si scrivono racchiuse tra slash: /.../
    // ^     --> Inizio stringa
    // $     --> Fine stringa
    // [a-zA-Z0-9] --> Caratteri consentiti: lettere maiuscole, minuscole e numeri
    // +     --> Dev'esserci almeno uno di questi caratteri (uno o più)
    // .test(stringa) verifica che la stringa rispetti la regex e restituisce true/false

    return /^[a-zA-Z0-9]+$/.test(username) && username.length >= 6
  }

  const passwordValidation = () => {
    const hasLetter = [...password].some(c => letters.includes(c));
    const hasNumber = [...password].some(c => numbers.includes(c));
    const hasSymbol = [...password].some(c => symbols.includes(c));

    return password.length >= 8 && hasLetter && hasNumber && hasSymbol
  }

  const descriptionValidation = () => {
    return description.trim().length >= 100 && description.trim().length <= 1000
  }

  const handleReset = (e) => {
    e.preventDefault();

    setUsername('');
    setPassword('');
    setDescription('');
    nameRef.current.value = '';
    specRef.current.value = '';
    experienceRef.current.value = 0;
  }

  return (
    <>
      <form autoComplete="off">
        <section>
          <input
            type='text'
            placeholder='Nome completo'
            ref={nameRef}
          />
        </section>

        <section>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <p style={{ color: usernameValidation() ? 'green' : 'red' }}>
            {usernameValidation() ? "L'username è valido" : "Devi inserire solo caratteri alfanumerici e almeno 6 caratteri"}
          </p>

        </section>

        <section>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <p style={{ color: passwordValidation() ? 'green' : 'red' }}>
            {passwordValidation() ? "La password è valida" : "Devi inserire almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo"}
          </p>
        </section>

        <section>
          <select
            ref={specRef}
          >
            <option value=''>Seleziona specializzazione</option>
            <option value='Full Stack'>Full Stack</option>
            <option value='Frontend'>Frontend</option>
            <option value='Backend'>Backend</option>
          </select>
        </section>

        <section>
          <input
            type='number'
            placeholder='Anni di esperienza'
            ref={experienceRef}
            defaultValue={0}
          />
        </section>

        <section>
          <textarea
            placeholder='Breve descrizione'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <p style={{ color: descriptionValidation() ? 'green' : 'red' }}>
            {descriptionValidation() ? "La descrizione è valida" : "Devi inserire tra 100 e 1000 caratteri"}
          </p>
        </section>

        <button onClick={handleSubmit}> Invia </button>
        <button className='reset' onClick={handleReset}> Reset </button>
      </form>
    </>
  )
}

export default App