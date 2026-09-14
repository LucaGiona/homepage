export const GROUP_LABELS = {
  anatomie: "Anatomie & Fachbegriffe",
  physiologie: "Physiologie & Harnbildung",
  akute_niereninsuffizienz: "Akute Niereninsuffizienz",
  chronische_niereninsuffizienz: "Chronische Niereninsuffizienz",
  glomerulopathien: "Glomerulopathien",
  urolithiasis_hwi: "Harnsteine & Harnwegsinfektionen",
  tumoren_trauma_gefaesse: "Tumoren, Trauma & Gefäße",
  erkrankung: "Krankheitsbegriffe",
  dialyse: "Dialyse",
  pflege_labor: "Pflege & Labor"
};

export const TOPIC_LABELS = {
  grundlagen: "Grundlagen",
  erkrankungen: "Erkrankungen",
  pflege: "Pflege & Therapie",
  alle: "Alle Themen"
};

export const GROUPS_BY_TOPIC = {
  grundlagen: ["anatomie", "physiologie"],
  erkrankungen: [
    "akute_niereninsuffizienz", "chronische_niereninsuffizienz",
    "glomerulopathien", "urolithiasis_hwi", "tumoren_trauma_gefaesse",
    "erkrankung"
  ],
  pflege: ["dialyse", "pflege_labor"]
};

export const getGroupsForTopic = (topic) => topic === "alle"
  ? [...GROUPS_BY_TOPIC.grundlagen, ...GROUPS_BY_TOPIC.erkrankungen, ...GROUPS_BY_TOPIC.pflege]
  : (GROUPS_BY_TOPIC[topic] ?? GROUPS_BY_TOPIC.grundlagen);
