//Titel in den Metadaten
 
  const titles = [
    "test",
    "Maranta – Willkommen",
    "Webentwickler & Bar Manager",
    "Coole Ideen"
  ];

  let i = 0;
  setInterval(() => {
    document.title = titles[i % titles.length];
    i++;
  }, 10000); // alle 3 Sekunden wechseln

