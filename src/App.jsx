import { useState } from 'react';
import './App.css'

// 📌 Milestone 2: Validare in tempo reale

// Aggiungere la validazione in tempo reale dei seguenti campi:
// ✅ Username: Deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no spazi o simboli).
// ✅ Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.
// ✅ Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).
// Suggerimento: Per semplificare la validazione, puoi definire tre stringhe con i caratteri validi e usare .includes() per controllare se i caratteri appartengono a una di queste categorie:

// const letters = "abcdefghijklmnopqrstuvwxyz";
// const numbers = "0123456789";
// const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";
// Per ciascuno dei campi validati in tempo reale, mostrare un messaggio di errore (rosso) nel caso non siano validi, oppure un messaggio di conferma (verde) nel caso siano validi.

function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [spec, setSpec] = useState('');
  const [experience, setExperience] = useState(0);
  const [description, setDescription] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    if (name !== '' && username !== '' && password !== '' && spec !== '' && parseInt(experience) >= 0 && description !== '') {
      console.log(`Registrazione completata con i seguenti dati:
        Nome completo: ${name}
        Username: ${username}
        Password: ${password}
        Specializzazione: ${spec}
        Anni di esperienza: ${experience}
        Descrizione: ${description}`);
    } else {
      console.log('Devi compilare tutti i campi');

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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        autoComplete="off">
        <section>
          <input
            type='text'
            placeholder='Nome completo'
            value={name}
            onChange={e => setName(e.target.value)}
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
            value={spec}
            onChange={e => setSpec(e.target.value)}
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
            value={experience}
            onChange={e => setExperience(e.target.value)}
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

        <button> Invia </button>
      </form>
    </>
  )
}

export default App
