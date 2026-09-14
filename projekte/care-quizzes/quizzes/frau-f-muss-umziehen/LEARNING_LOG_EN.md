# Learning Log – Mrs. F. Has to Move

*[Deutsche Version](LEARNING_LOG.md)*

This file documents the progress of the project: goal, AI/tools used, prompt, outcome, difficulties, solution, lessons learned.

The template for new entries is in `../../templates/entry-template_EN.md`.

**Translate through AI**

---

## Project Overview

**Project name:** Mrs. F. Has to Move
**Parent repository:** `care-quizzes`

### Project goal

The project combines two learning areas: learning and reviewing care-nursing knowledge (through play) and learning to build a web application. The application is implemented as a quiz and may contain different technical variants.

### Nursing/care topics

- Eye (anatomy, diseases, eye medication, tear ducts)
- Ear (anatomy, diseases, presbycusis)
- Long-term care insurance, care levels, long-term care insurance benefits
- Discharge management, transitional care management
- Living arrangements in old age, fall prevention
- Dealing with visual and hearing impairments

### Technical topics

HTML, CSS, JavaScript, JSON, Git/GitHub, project architecture, responsive web design, deployment, prompt engineering, AI-assisted development, comparison of different AI systems.

---

# Development Log

## 1. Basic Quiz Setup

**Goal:**
Browser-based learning app with HTML, CSS, JavaScript, and JSON.
Four answer options, exactly one correct;
technical terms as multiple choice or free-text input;
a choice of several care topics or anatomical knowledge;
score/progress; explanation after each answer.

**AI/Tools:** ChatGPT, Claude · VS Code, Live Server, Git, GitHub

**Prompt (paraphrased):**

```text
Build a quiz with HTML, CSS, and JavaScript. Each question shows four
answers, one correct. For technical terms, also allow free-text input.
Load quiz data from JSON files. Topics initially: eye and ear.
```

**Brief first comparison ChatGPT/Claude**
The first prompt was deliberately kept very simple for both AIs.
The result, especially in CSS, was already quite different. ChatGPT's design resembled the familiar pattern of common apps: large buttons, simple color scheme. It liked to work with shadowing and border colors. The overall impression was therefore modern and conventional.
Claude, on the other hand, had a more code-oriented layout for the first prompt. In other words, it looked like the GitHub page. Buttons, for example, were placed so that they stood out in color by default. Also, little use was made of select elements.
Claude also used emojis, which was not the case with ChatGPT. This is probably because in the past I always told ChatGPT, when summarizing texts, to work without emojis. The AI apparently remembered this.

**Result:** `index.html`, `css/style.css`, `js/app.js`, `data/auge.json`, `data/ohr.json` (more JSON files were added later).

**Architecture:** HTML = structure, CSS = styling, JavaScript = logic, JSON = questions/content.

**Difficulties → Solution:**

- JSON couldn't be loaded via `fetch()` when opening the HTML file directly → started the app with Live Server instead.
- Unclear which data should be stored as terms vs. full questions → separate JSON structures for terms (eye/ear) and full care-nursing questions.
- Wrong multiple-choice answers had to be generated sensibly.

**Lessons learned:** `fetch()` usually needs a local web server during development; JSON is good for separating data from logic; terms need a different data structure than fully phrased questions. Anatomical terms work well as vocabulary quizzes; long-term care insurance/discharge management work better as fully phrased questions; explanations after answers improve learning.

**Status:** Basic structure, eye, ear, multiple choice, and free-text input are in place. Open: full manual review of all questions.

---

## 2. Mixed Question Direction for Technical Terms

**Goal:** Terms from `auge.json`/`ohr.json` should automatically be quizzed in both directions (German → term, e.g. Netzhaut → Retina; and term → German, e.g. Retina → Netzhaut), without an extra selector in the HTML.

**AI:** Codex in VS Code, Claude directly in VS Code

**Prompt (short version):**

```text
Adjust the existing quiz app so that terms from auge.json and ohr.json
are randomly quizzed in both directions. For German→term, the answer
options must be terms; for term→German, the answer options must be
German words. Long-term care insurance questions must not be changed.
```

Full version: `prompts/002-mixed-question-direction.md`

**Expected change:** `js/app.js`, possibly a new property `answerDirection: "term" | "german"`.

**Requirements:** Direction is chosen anew for each round, both directions occur, the correct answer appears only once, wrong answers match the expected answer type, alternative spellings are accepted for free-text input, long-term care insurance questions remain unchanged.

**Result checklist (fill in after testing):**

- [ ] German → term works
- [ ] Term → German works
- [ ] Multiple choice and free text work in both directions
- [ ] Alternative terms are accepted
- [ ] Long-term care insurance questions still work

**Reflection:** Both delivered working code. The JSON data was in each case created from summaries of textbook material or transcripts of YouTube videos.
For the needs of nursing/care training, this was sometimes too specific and detailed.

---

## 3. Expanding the Quiz Data

**Goal:** Compare existing JSON files with the study summary and add missing content as new quiz questions.

**AI:** ChatGPT - Claude

**Files used:** `lernzusammenfassung.pdf`, `auge.json`, `ohr.json`, `pflegeversicherung.json`, `goldene_regeln.json`, `sturzprophylaxe.json`

**Checked, among others:** presbycusis, eye anatomy, administering eye medication, conjunctival sac/tear ducts, miosis/mydriasis, cataract/glaucoma, short-term care, need for care, living arrangements in old age.

**Result:** Well covered already: eye/ear anatomy, basics of cataract/glaucoma, care levels, short-term care, long-term care insurance benefits. Only partially/not covered: presbycusis details, technique for administering eye medication, conjunctival sac/tear drainage, miosis/mydriasis, detailed cataract/glaucoma comparison, living arrangements in old age, details on need for care.

**Architecture decision:** Existing term collections were left unchanged; a new supplementary file `data/lernzusammenfassung_zusatz.json` was created with questions on presbycusis, eye medication, tear ducts, pupil reactions, cataract/glaucoma, short-term care, need for care, living arrangements in old age.

**Difficulties → Solution:** Existing JSON files use different structures (terms vs. full questions); new questions must not duplicate existing content → new file in the format of full quiz questions, existing term data unchanged, topic/category distinguished via dedicated fields.

**Next steps:** load the new JSON file in `app.js`, add a topic filter, test in the browser, review content accuracy, check for duplicates.
These steps were carried out successfully.

---

## 4. Comparing Different AI Systems

**Goal:** Use different AI systems (ChatGPT, Codex, Claude, possibly others) for comparable development tasks.

**Criteria:** understanding of the prompt, quality of architecture, code quality/readability, number of corrections needed, handling of existing files, error-proneness, usability of the result.

**Observations:** It was interesting that, due to sync issues, I no longer had Claude's first prompt as an end result. This meant I had to have the folder sent to me by email. This happened relatively late in the process, though. But what was interesting was that Claude in VS Code somehow then adopted ChatGPT's design. The emojis were no longer present. The UI structure also stayed the same. Claude didn't really respond to prompts asking it to make the design look more like a GitHub page.
At the end of the quiz, Claude on its own produced a summary of all the questions. This meant that at the end you could see which questions you had answered correctly or incorrectly, including the correct answers. This is especially good for the learning effect.

**Conclusion:** Basically, both AIs delivered usable, working apps. Claude needed somewhat less code for the UX. In both cases, the JS code is well readable. The data structure was also very well carried over consistently by both.
For further learning-app topics, the first prompt will be more precise, especially regarding CSS. Neither result was really responsive, for example — this had to be fixed. The order of the buttons for the learning topics also needed improvement.
The JSON should have the ability, from the very start, to alternate between asking for technical terms and German terms.
For free-text input, further options should be considered, such as handling typos and keyword-based matching.

---

*Template for new entries: see `../../templates/entry-template_EN.md`.*
