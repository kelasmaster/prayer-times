// app.js

document.getElementById('fetch-prayer-times').addEventListener('click', function () {
  const location = document.getElementById('location').value;

  if (!location) {
    alert('Please enter a valid location');
    return;
  }

  // Fetch prayer times using Aladhan API
  fetch(`https://api.aladhan.com/v1/timingsByCity?city=${location}&country=US&method=2`)
    .then(response => response.json())
    .then(data => {
      const timings = data.data.timings;

      document.getElementById('fajr-time').textContent = timings.Fajr;
      document.getElementById('dhuhr-time').textContent = timings.Dhuhr;
      document.getElementById('asr-time').textContent = timings.Asr;
      document.getElementById('maghrib-time').textContent = timings.Maghrib;
      document.getElementById('isha-time').textContent = timings.Isha;

      // Update date display
      const date = data.data.date;
      document.getElementById('gregorian-date').textContent = `Gregorian Date: ${date.gregorian.date}`;
      document.getElementById('hijri-date').textContent = `Hijri Date: ${date.hijri.date}`;
    })
    .catch(error => {
      console.error('Error fetching prayer times:', error);
      alert('Failed to fetch prayer times. Please try again.');
    });
});

// Optional: Notification feature
document.getElementById('enable-notifications').addEventListener('click', function () {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        alert('Notifications enabled!');
      } else {
        alert('You denied notifications.');
      }
    });
  } else {
    alert('Your browser does not support notifications.');
  }
});
