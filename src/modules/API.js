export async function getForecast(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=34a8067f1d024415a9c161843231906&q=${city}&days=1&aqi=no&alerts=no`,
      {
        mode: 'cors',
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    // return data;
    if (data) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}
