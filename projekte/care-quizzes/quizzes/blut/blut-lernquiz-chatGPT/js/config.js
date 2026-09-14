export const GROUP_LABELS = {
  blut_aufbau: "Blutaufbau & Blutbildung",
  blutgruppen: "Blutgruppen & Transfusion",
  haemostase: "Hämostase & Gerinnung",
  anaemien: "Anämien",
  gerinnungsstoerungen: "Gerinnungsstörungen",
  thrombose: "Thrombose",
  entzuendung: "Entzündung",
  antikoagulation: "Antikoagulation",
  pflege_diagnostik: "Pflege & Diagnostik"
};

export const TOPIC_LABELS = {
  grundlagen: "Grundlagen",
  erkrankungen: "Erkrankungen",
  pflege: "Pflege & Therapie",
  alle: "Alle Themen"
};

export const GROUPS_BY_TOPIC = {
  grundlagen: ["blut_aufbau", "blutgruppen", "haemostase"],
  erkrankungen: ["anaemien", "gerinnungsstoerungen", "thrombose", "entzuendung"],
  pflege: ["antikoagulation", "pflege_diagnostik"]
};

export const getGroupsForTopic = (topic) => topic === "alle"
  ? [...GROUPS_BY_TOPIC.grundlagen, ...GROUPS_BY_TOPIC.erkrankungen, ...GROUPS_BY_TOPIC.pflege]
  : (GROUPS_BY_TOPIC[topic] ?? GROUPS_BY_TOPIC.grundlagen);
