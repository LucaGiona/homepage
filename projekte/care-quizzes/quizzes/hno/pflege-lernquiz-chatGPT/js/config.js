export const GROUP_LABELS = {
  aufbau: "Aufbau und Lage", anatomie: "Anatomie", erkrankung: "Erkrankungen",
  abschnitte: "Abschnitte", nasennebenhoehlen: "Nasennebenhöhlen", knorpel: "Knorpel",
  glottis: "Glottis und Stimmbänder", muskulatur_mandeln: "Muskulatur und Mandeln",
  muskeln_feinbau: "Muskeln und Feinbau", feinbau: "Feinbau",
  gefaesse_nerven: "Gefäße und Nerven", funktionen: "Funktionen", patho: "Krankheitslehre"
};

export const TOPIC_LABELS = { nase: "Nase", ohr: "Ohr", rachen: "Rachen", kehlkopf: "Kehlkopf", alle: "Alle HNO-Themen" };

export const GROUPS_BY_TOPIC = {
  nase: ["aufbau", "nasennebenhoehlen", "feinbau", "gefaesse_nerven", "funktionen", "patho"],
  ohr: ["anatomie", "erkrankung"],
  rachen: ["aufbau", "abschnitte", "muskulatur_mandeln", "feinbau", "gefaesse_nerven", "funktionen"],
  kehlkopf: ["aufbau", "knorpel", "glottis", "muskeln_feinbau", "gefaesse_nerven", "funktionen", "patho"]
};

export const getGroupsForTopic = (topic) => topic !== "alle"
  ? (GROUPS_BY_TOPIC[topic] ?? GROUPS_BY_TOPIC.nase)
  : [...new Set(Object.values(GROUPS_BY_TOPIC).flat())];
