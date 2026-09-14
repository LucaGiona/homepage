export const GROUP_LABELS = {
  anatomie: "Anatomie des Herzens",
  physiologie: "Herzzyklus & Pumpfunktion",
  reizleitung_ekg: "Reizleitung & EKG",
  khk_infarkt: "KHK & Herzinfarkt",
  herzinsuffizienz: "Herzinsuffizienz",
  pflege_diagnostik: "Diagnostik, Therapie & Pflege"
};

export const TOPIC_LABELS = {
  grundlagen: "Grundlagen",
  erkrankungen: "Erkrankungen",
  pflege: "Pflege & Therapie",
  alle: "Alle Themen"
};

export const GROUPS_BY_TOPIC = {
  grundlagen: ["anatomie", "physiologie", "reizleitung_ekg"],
  erkrankungen: ["khk_infarkt", "herzinsuffizienz"],
  pflege: ["pflege_diagnostik"]
};

export const getGroupsForTopic = (topic) => topic === "alle"
  ? [...GROUPS_BY_TOPIC.grundlagen, ...GROUPS_BY_TOPIC.erkrankungen, ...GROUPS_BY_TOPIC.pflege]
  : (GROUPS_BY_TOPIC[topic] ?? GROUPS_BY_TOPIC.grundlagen);
