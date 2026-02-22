// pages/content.js
import Head from "next/head";
import React from "react";
import { YMaps, Map, Placemark, GeolocationControl, ZoomControl } from 'react-yandex-maps';
import Link from "next/link";

const ContentPage = () => {
  // Координаты центра карты (Москва, Кремль)
  const mapCenter = [55.751574, 37.573856];
  
  // Состояние для отслеживания загрузки карты
  const [mapLoaded, setMapLoaded] = React.useState(false);
  
  // Состояние для текущего центра карты
  const [currentCenter, setCurrentCenter] = React.useState(mapCenter);
  
  // Состояние для меток на карте
  const [placemarks, setPlacemarks] = React.useState([
    {
      id: 1,
      coordinates: [55.751574, 37.573856],
      name: "Кремль",
      description: "Исторический центр Москвы"
    },
    {
      id: 2,
      coordinates: [55.755864, 37.617698],
      name: "Красная площадь",
      description: "Главная площадь страны"
    },
    {
      id: 3,
      coordinates: [55.749792, 37.587385],
      name: "Храм Христа Спасителя",
      description: "Кафедральный собор"
    }
  ]);

  // Обработчик клика по карте
  const handleMapClick = (e) => {
    const coords = e.get('coords');
    alert(`Координаты клика: ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`);
  };

  // Функция добавления новой метки
  const addPlacemark = () => {
    const newId = placemarks.length + 1;
    const newPlacemark = {
      id: newId,
      coordinates: [currentCenter[0] + 0.01, currentCenter[1] + 0.01],
      name: `Метка ${newId}`,
      description: "Новая метка"
    };
    setPlacemarks([...placemarks, newPlacemark]);
  };

  return (
    <>
      <Head>
        <title>Яндекс Карта</title>
      </Head>
      
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Яндекс Карта</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <Link href="/" legacyBehavior>
            <a style={{ color: 'blue', textDecoration: 'underline' }}>
              ← Вернуться на главную
            </a>
          </Link>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Достопримечательности Москвы</h3>
          <p>На карте отмечены основные достопримечательности центра Москвы</p>
          <button 
            onClick={addPlacemark}
            style={{
              padding: '10px 15px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '15px'
            }}
          >
            Добавить новую метку
          </button>
        </div>

        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <YMaps 
            query={{
              apikey: '5df0811b-6dcc-4ba3-8182-86d5cb812ed0', // Получите ключ на https://developer.tech.yandex.ru/
              load: 'package.full'
            }}
          >
            <Map
              defaultState={{
                center: mapCenter,
                zoom: 12,
                controls: ['zoomControl', 'fullscreenControl']
              }}
              width="100%"
              height="500px"
              onLoad={() => setMapLoaded(true)}
              onClick={handleMapClick}
              onBoundsChange={(e) => {
                // Обновляем текущий центр карты при перемещении
                const newCenter = e.get('newCenter');
                if (newCenter) {
                  setCurrentCenter(newCenter);
                }
              }}
            >
              {/* Добавляем дополнительные контролы */}
              <GeolocationControl options={{ float: 'left' }} />
              <ZoomControl options={{ float: 'right' }} />
              
              {/* Отображаем все метки */}
              {placemarks.map((placemark) => (
                <Placemark
                  key={placemark.id}
                  geometry={placemark.coordinates}
                  properties={{
                    balloonContentHeader: placemark.name,
                    balloonContentBody: placemark.description,
                    balloonContentFooter: `Координаты: ${placemark.coordinates[0].toFixed(4)}, ${placemark.coordinates[1].toFixed(4)}`,
                    hintContent: placemark.name
                  }}
                  options={{
                    iconColor: placemark.id === 1 ? 'red' : 'blue',
                    preset: 'islands#icon',
                    iconColor: '#1e98ff'
                  }}
                  onClick={() => console.log(`Клик по метке: ${placemark.name}`)}
                  onBalloonOpen={() => console.log(`Открыт балун: ${placemark.name}`)}
                />
              ))}
            </Map>
          </YMaps>
        </div>

        {/* Информация о состоянии карты */}
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '5px',
          color: '#666'
        }}>
          <h4>Информация:</h4>
          <p>Статус загрузки: {mapLoaded ? '✅ Карта загружена' : '⏳ Загрузка...'}</p>
          <p>Текущий центр карты: {currentCenter[0].toFixed(4)}, {currentCenter[1].toFixed(4)}</p>
          <p>Количество меток: {placemarks.length}</p>
          <p>Кликните по карте, чтобы получить координаты</p>
          <p>Кликните по метке, чтобы открыть балун с информацией</p>
          <p style={{ fontSize: '0.9em', color: '#999', marginTop: '10px' }}>
            * Для работы карты необходимо получить API ключ на Яндекс.Developer
          </p>
        </div>

        {/* Список меток */}
        <div style={{ marginTop: '20px', color: '#1e98ff' }}>
          <h4>Список меток на карте:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {placemarks.map((pm) => (
              <li key={pm.id} style={{ 
                padding: '8px', 
                margin: '5px 0', 
                backgroundColor: '#f9f9f9', 
                borderRadius: '4px',
                borderLeft: '4px solid #1e98ff'
              }}>
                <strong>{pm.name}</strong> - {pm.description}
                <br />
                <small>Координаты: {pm.coordinates[0].toFixed(4)}, {pm.coordinates[1].toFixed(4)}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ContentPage;