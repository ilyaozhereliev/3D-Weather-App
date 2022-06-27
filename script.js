window.addEventListener('load', () => {
  // Day/night switch
  const checkbox = document.getElementById('checkbox');

  checkbox.addEventListener('change', () => {
    // change the theme
    document.body.classList.toggle('dark');
  });

  // Movement animation to happened
  const card = document.querySelector('.card');
  const container = document.querySelector('.container');

  // Items
  const city = document.querySelector('.city');
  const icon = document.querySelector('.icon');
  const temperature = document.querySelector('.temperature');

  // Moving animation effect
  container.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 100;
    let yAxis = (window.innerWidth / 2 - e.pageY) / 100;
    container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  // Animate In
  container.addEventListener('mouseenter', (e) => {
    container.style.transition = 'none';
    // Popout
    city.style.transform = 'translateZ(150px)';
    icon.style.transform = 'translateZ(200px) rotateZ(-360deg)';
    temperature.style.transform = 'translateZ(125px)';
  });

  // Animate Out
  container.addEventListener('mouseleave', (e) => {
    container.style.transition = 'all 0.5s ease';
    container.style.transform = `rotateY(0deg) rotateX(0deg)`;
    // Popback
    city.style.transform = 'translateZ(0px)';
    icon.style.transform = 'translateZ(0px) rotateZ(0deg)';
    temperature.style.transform = 'translateZ(0px)';
  });

  function capitalize(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      if (i === 0) {
        result += str[i].toUpperCase();
      } else {
        result += str[i];
      }
    }
    return result;
  }

  function toCamelCase(str) {
    const arr = str.split(' ');
    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        newArray.push(arr[i]);
      } else {
        newArray.push(capitalize(arr[i]));
      }
    }
    return newArray.join('');
  }

  const searchTxt = document.querySelector('.search-txt');
  const btn = document.querySelector('.search-btn');
  searchTxt.addEventListener('keypress', setQuery);

  function setQuery(e) {
    if (event.keyCode == 13 || event.keycode == btn) {
      getResults(searchTxt.value);
      console.log(getResults);
    }
  }

  function getResults(city) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=6bae6c7343b8015e3160f2431d724cbc`,
    )
      .then(function (resp) {
        // convert data to json
        return resp.json();
      })
      .then(function (data) {
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temperature-degree').innerHTML =
          Math.floor(data.main.temp - 273) + '&deg';
        document.querySelector('.temperature-description').innerHTML = data.weather[0].description;
        document.querySelector('.feels-like').innerHTML = `Feels like: ${Math.floor(
          data.main.feels_like - 273,
        )}`;
        document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
        document.querySelector('.pressure').innerHTML = `Pressure: ${Math.floor(
          data.main.pressure / 1.33,
        )}mb`;
        document.querySelector('.wind-speed').innerHTML = `Wind speed: ${data.wind.speed}m/s`;
        document.querySelector('.icon').innerHTML = `<img width='150' src ="icons/${toCamelCase(
          data.weather[0].description,
        )}.png">`;
      });
  }
});
