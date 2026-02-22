import React from 'react'
import Head from 'next/head'
import AwesomeSlider from "react-awesome-slider"
import "react-awesome-slider/dist/styles.css"
import styles from '../styles/Home.module.css'

const headerStyle = {
  color:'white',
  position:"absolute",
  zIndex:4,
  top:'30%',
  left:'40%'
}

const contentStyle = {
  color:'white',
  textAlign:"center",
  top:'50%',
  left:'25%',
  position:"absolute",
  zIndex:4
}

const bgImg = {
  position: "fixed",
  zIndex: 3,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

function sendEmail(email){
  window.open(`mailto:${email}?subject=Потерянный зверь`);
}

function Animal({ data }) {
  if(!data) return null
  return (
    <div>
      <h1 style={headerStyle}>{data.header}</h1>
      <h2 style={contentStyle}>{data.content}</h2>
      <img style={bgImg} src={data.img} />
    </div>
  )
}

export default function Home() {
  const [animals, setAnimals] = React.useState([])
  const [showLogin, setShowLogin] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState(null)

  React.useEffect(() => {
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => setAnimals(data))
  }, [])

  React.useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) setCurrentUser(JSON.parse(user))
  }, [])

  function login(e) {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      alert('Неверный e-mail или пароль')
      return
    }

    localStorage.setItem('currentUser', JSON.stringify(user))
    setCurrentUser(user)
    setShowLogin(false)
  }

  function logout() {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Petto</title>
      </Head>

      <main className={styles.main}>
        <h1>Petto</h1>

        {!currentUser ? (
          <>
            <button onClick={() => setShowLogin(true)}>Войти</button>
            <a href="/register" style={{ marginLeft: 10 }}>Регистрация</a>
            <br/>
          </>
        ) : (
          <>
            <p>Вы вошли как {currentUser.name}</p>
            <button onClick={logout}>Выйти</button>
          </>
        )}

        <AwesomeSlider style={{ "--slider-height-percentage": "100%" }}>
          {animals.map((a, i) => (
            <div key={i} onClick={() => sendEmail(a.email)}>
              <Animal data={a} />
            </div>
          ))}
        </AwesomeSlider>

{showLogin && (
  <>
    {/* затемнение */}
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      zIndex: 10
    }} />

    {/* окно входа */}
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      padding: 20,
      width: 320,
      borderRadius: 8,
      zIndex: 11
    }}>
      <h3>Вход</h3>
      <form onSubmit={login}>
        <input name="email" placeholder="E-mail" required /><br /><br />
        <input type="password" name="password" placeholder="Пароль" required /><br /><br />
        <button type="submit">Войти</button>
        <button type="button" onClick={() => setShowLogin(false)}>
          Отмена
        </button>
      </form>
    </div>
  </>
)}
      </main>
    </div>
  )
}