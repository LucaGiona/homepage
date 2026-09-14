export const GROUP_LABELS = {
  anatomie: "Anatomie",
  erkrankung: "Erkrankungen",
  pflegeversicherung: "Pflegeversicherung",
  pflegegrade: "Pflegegrade",
  leistungen: "Leistungen",
  entlassungsmanagement: "Entlassungsmanagement",
  risikofaktoren: "Risikofaktoren",
  einschaetzung: "Einschätzung",
  beratung: "Beratung",
  mobilitaet: "Mobilität",
  umgebung: "Umgebung",
  hilfsmittel: "Hilfsmittel",
  medikation: "Medikation",
  alltag: "Alltag",
  nach_sturz: "Nach einem Sturz",
  grundsaetze: "Grundsätze",
  umgang_hoerbeeintraechtigung: "Umgang mit Hörbeeinträchtigung",
  umgang_sehbeeintraechtigung: "Umgang mit Sehbeeinträchtigung",
  presbyakusis: "Presbyakusis",
  augenmedikamente: "Augenmedikamente",
  traenenwege: "Tränenwege",
  pupillenreaktion: "Pupillenreaktion",
  augenerkrankungen: "Augenerkrankungen",
  pflegebeduerftigkeit: "Pflegebedürftigkeit",
  kurzzeitpflege: "Kurzzeitpflege",
  wohnformen: "Wohnformen"
};

export const TOPIC_LABELS = {
  auge: "Auge",
  ohr: "Ohr",
  sinnesorgane: "Auge & Ohr",
  pflege: "Pflegeversicherung",
  sturz: "Sturzprophylaxe",
  alle: "Alle Themen"
};

export const GROUPS_BY_TOPIC = {
  auge: [
    "anatomie", "erkrankung", "umgang_sehbeeintraechtigung",
    "augenmedikamente", "traenenwege", "pupillenreaktion",
    "augenerkrankungen"
  ],
  ohr: [
    "anatomie", "erkrankung", "umgang_hoerbeeintraechtigung",
    "presbyakusis"
  ],
  sinnesorgane: [
    "anatomie", "erkrankung", "umgang_sehbeeintraechtigung",
    "umgang_hoerbeeintraechtigung", "augenmedikamente", "traenenwege",
    "pupillenreaktion", "augenerkrankungen", "presbyakusis"
  ],
  pflege: [
    "pflegeversicherung", "pflegegrade", "leistungen",
    "entlassungsmanagement", "pflegebeduerftigkeit", "kurzzeitpflege",
    "wohnformen"
  ],
  sturz: [
    "risikofaktoren", "einschaetzung", "beratung", "mobilitaet",
    "umgebung", "hilfsmittel", "medikation", "alltag", "nach_sturz",
    "grundsaetze"
  ]
};

export const getGroupsForTopic = (topic) => {
  if (topic !== "alle") {
    return GROUPS_BY_TOPIC[topic] ?? GROUPS_BY_TOPIC.auge;
  }

  return [
    ...GROUPS_BY_TOPIC.sinnesorgane,
    ...GROUPS_BY_TOPIC.pflege,
    ...GROUPS_BY_TOPIC.sturz
  ];
};
