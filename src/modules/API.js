export async function getForecast(city) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=34a8067f1d024415a9c161843231906&q=${city}&days=1&aqi=no&alerts=no`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    // return data;
    if (data) {
      console.log(data);
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}

// {
//         location: {
//           name: data['location']['name'],
//           country: data['location']['country'],
//           localtime: data['location']['localtime'],
//         },
//         current: {
//           temp_c: data['current'][' temp_c'],
//           temp_f: data['current'][' temp_f'],
//           condition: {
//             text: data['current']['condition']['text'],
//           },
//           uv: data['current']['uv'],
//           humidity: data['current'][' humidity'],
//           wind_kph: data['current'][' wind_kph'],
//           wind_mph: data['current'][' wind_mph'],
//         },
//       };
