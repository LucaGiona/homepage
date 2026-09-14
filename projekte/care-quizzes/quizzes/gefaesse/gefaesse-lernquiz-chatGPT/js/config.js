export const GROUP_LABELS = {
  gefaessanatomie: "Gefäßaufbau & Kreislauf",
  mikrozirkulation: "Mikrozirkulation & Regulation",
  diagnostik: "Gefäßdiagnostik",
  atherosklerose_hypertonie: "Atherosklerose & Hypertonie",
  pavk: "pAVK",
  akut_arteriell: "Akute & weitere arterielle Erkrankungen",
  venen_cvi: "Varikosis & CVI",
  pflege: "Gefäßpflege & Therapie"
};

export const TOPIC_LABELS = {
  grundlagen: "Grundlagen",
  erkrankungen: "Erkrankungen",
  pflege: "Pflege & Therapie",
  alle: "Alle Themen"
};

export const GROUPS_BY_TOPIC = {
  grundlagen: ["gefaessanatomie", "mikrozirkulation", "diagnostik"],
  erkrankungen: ["atherosklerose_hypertonie", "pavk", "akut_arteriell", "venen_cvi"],
  pflege: ["pflege"]
};

export const getGroupsForTopic = (topic) => topic === "alle"
  ? [...GROUPS_BY_TOPIC.grundlagen, ...GROUPS_BY_TOPIC.erkrankungen, ...GROUPS_BY_TOPIC.pflege]
  : (GROUPS_BY_TOPIC[topic] ?? GROUPS_BY_TOPIC.grundlagen);
