import { useState, useRef } from 'react';
import './App.css'

// 📌 Milestone 3: Convertire i Campi Non Controllati

// Non tutti i campi del form necessitano di essere aggiornati a ogni carattere digitato. Alcuni di essi non influenzano direttamente l’interfaccia mentre l’utente li compila, quindi è possibile gestirli in modo più efficiente.
// Analizza il form: Identifica quali campi devono rimanere controllati e quali invece possono essere non controllati senza impattare l’esperienza utente.
// Converti i campi non controllati: Usa useRef() per gestirli e recuperare il loro valore solo al momento del submit.
// Assicurati che la validazione continui a funzionare: Anche se un campo non è controllato, deve comunque essere validato correttamente quando l’utente invia il form.

function App() {
  const nameRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const specRef = useRef();
  const experienceRef = useRef();
  const [description, setDescription] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameRef.current.value !== '' && username !== '' && password !== '' && specRef.current.value !== '' &&
      parseInt(experienceRef.current.value) >= 0 && description !== '' && usernameValidation() && passwordValidation() && descriptionValidation()) {
      console.log(`Registrazione completata con i seguenti dati:
        Nome completo: ${nameRef.current.value}
        Username: ${username}
        Password: ${password}
        Specializzazione: ${specRef.current.value}
        Anni di esperienza: ${experienceRef.current.value}
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