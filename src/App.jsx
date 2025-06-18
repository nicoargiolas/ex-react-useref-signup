import { useState } from 'react';
import './App.css'

// 📌 Milestone 1: Creare un Form con Campi Controllati

// Crea un form di registrazione con i seguenti campi controllati (gestiti con useState):
// ✅ Nome completo (input di testo)
// ✅ Username (input di testo)
// ✅ Password (input di tipo password)
// ✅ Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend")
// ✅ Anni di esperienza (input di tipo number)
// ✅ Breve descrizione sullo sviluppatore (textarea)
// Aggiungi una validazione al submit, verificando che:
// Tutti i campi siano compilati
// L'input Anni di esperienza sia un numero positivo
// La Specializzazione sia selezionata

// Al submit, se il form è valido, stampa in console i dati.

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

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        </section>

        <section>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
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
        </section>

        <button> Invia </button>
      </form>
    </>
  )
}

export default App
