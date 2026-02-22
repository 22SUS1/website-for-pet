import React from 'react'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()

  function register(e) {
    e.preventDefault()

    const form = e.target
    const user = {
      name: form.name.value,
      surname: form.surname.value,
      email: form.email.value,
      password: form.password.value
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))

    alert('Регистрация успешна!')
    router.push('/')
  }

  return (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div style={{ width: 300 }}>
      <h1 style={{ textAlign: 'center' }}>Регистрация</h1>

      <form style = {{marginLeft: 60}} onSubmit={register}>
        <input name="name" placeholder="Имя" required /><br /><br />
        <input name="surname" placeholder="Фамилия" required /><br /><br />
        <input type="email" name="email" placeholder="E-mail" required /><br /><br />
        <input type="password" name="password" placeholder="Пароль" required /><br /><br />
        <button style={{ width: '100%', marginLeft: -32}}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  </div>
)
}