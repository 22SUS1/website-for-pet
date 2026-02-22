import Head from "next/head";
import React from "react";
import styles from '../styles/Home.module.css'


const UploadPage = () => {
  const [image, setImage] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [animals, setAnimals] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    email: '',
    type: 'cat'
  });

  // Загрузка списка животных для селекта
  React.useEffect(() => {
    fetch('/api/getAnimals')
      .then(res => res.json())
      .then(data => setAnimals(data))
      .catch(err => console.error('Ошибка загрузки:', err));
  }, []);

  // Обработка выбора файла
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Отправка на сервер
  const uploadToServer = async (event) => {
    event.preventDefault();
    
    if (!image) {
      alert('Выберите файл!');
      return;
    }

    if (!formData.name || !formData.description || !formData.email) {
      alert('Заполните все поля!');
      return;
    }

    const body = new FormData();
    body.append("file", image);
    body.append("name", formData.name);
    body.append("description", formData.description);
    body.append("email", formData.email);
    body.append("type", formData.type);

    try {
      const response = await fetch("/api/handleUpload", {
        method: "POST",
        body
      });

      if (response.ok) {
        alert('Объявление успешно добавлено!');
        // Очистка формы
        setImage(null);
        setPreviewUrl(null);
        setFormData({
          name: '',
          description: '',
          email: '',
          type: 'cat'
        });
      } else {
        alert('Ошибка при загрузке');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при загрузке');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Head>
        <title>Добавить объявление - Petto</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.logo}>🐾 Petto</h1>
          <a href="/" className={styles.loginBtn}>На главную</a>
        </header>

        <main style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
              Добавить объявление о пропаже
            </h2>
            
            <form onSubmit={uploadToServer}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>
                  Тип животного:
                </label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem'
                  }}
                >
                  <option value="cat">Кот</option>
                  <option value="dog">Собака</option>
                  <option value="bird">Птица</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>
                  Кличка:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem'
                  }}
                  placeholder="Например: Барсик"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>
                  Где потерян:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    minHeight: '80px'
                  }}
                  placeholder="Опишите место и обстоятельства"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>
                  Email для связи:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem'
                  }}
                  placeholder="example@mail.com"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>
                  Фото животного:
                </label>
                <input
                  type="file"
                  name="myImage"
                  onChange={uploadToClient}
                  accept="image/*"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}
                />
                {previewUrl && (
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '200px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                      }} 
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Опубликовать объявление
              </button>
            </form>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>Petto - Помогаем найти потерянных питомцев</p>
        </footer>
      </div>
    </>
  );
};

export default UploadPage;