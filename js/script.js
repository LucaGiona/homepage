//Titel in den Metadaten
 
  const titles = [
    "Luca Giona",
    "Maranta – Willkommen",
    "Webentwickler & Bar Manager",
    "Coole Ideen", 
    "Drinks",
    "API"
  ];

  let i = 0;
  setInterval(() => {
    document.title = titles[i % titles.length];
    i++;
  }, 7000); // alle 3 Sekunden wechseln


  // loading certifications

