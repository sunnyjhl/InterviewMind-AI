# InterviewMind AI – Agentic Interview Simulator 🧠

## 🎯 Overview

InterviewMind AI is a full-stack interview practice platform that simulates real technical and HR interviews using agentic AI workflows. Get instant AI-powered feedback on correctness, confidence, and improvement areas.

**Tech Stack:**

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (responsive, modern UI/UX)
- **Backend:** Node.js + Express.js (mock AI analysis)

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start backend server:**

   ```bash
   npm start
   ```

   Server runs on `http://localhost:3000`

3. **Open frontend:**
   - Windows: `start index.html`
   - Or open `index.html` in your browser

4. **Practice interviews:**
   - Choose Technical or HR interviewer
   - Answer questions in chat
   - Get AI analysis + dashboard updates

## ✨ Features

- **Dual Agents:** Technical Interviewer (coding questions) + HR Interviewer (behavioral)
- **AI Feedback Analyzer:** Scores correctness, confidence, provides tips
- **Real-time Dashboard:** Average score, performance meter, stats
- **Responsive Chat UI:** Modern gradients, animations, auto-scroll
- **Performance Metrics:** Visual meter, best score tracking

## 🧮 Evaluation Logic (Mock AI)

Rule-based analysis for realistic feedback:

### Technical Questions (Coding)

**Keywords matched → Score boost**

```
Ex: "Reverse string" → ['reverse','split','join','loop','for','while']
2/6 matches = ~60% base score + confidence adjustment
```

### HR Questions (Behavioral)

**Structure keywords → Score boost**

```
Ex: "Work challenge" → ['challenge','team','solution','learned','result']
```

### Confidence Detection

**Penalty for filler words:** -10 pts each

```
['um', 'uh', 'like', 'you know']
```

**Formula:** `base_score = (matched_keywords / total_keywords) * 70 + 30`
`final_score = base_score - (filler_count * 10)`
`Range: 0-100`

## 📊 Dashboard Components

| Metric     | Updates                 |
| ---------- | ----------------------- |
| Avg Score  | Rolling average         |
| Total Qs   | Cumulative count        |
| Best Score | Lifetime max            |
| Meter      | Color-coded performance |

## 🛠️ Project Structure

```
InterviewMind AI/
├── index.html       # Main chat UI
├── style.css        # Modern, responsive design
├── script.js        # Frontend logic + API integration
├── server.js        # Express backend + mock AI
├── package.json     # Dependencies
├── README.md        # 📜 You're reading it!
└── TODO.md          # Progress tracker
```

## 🎨 UI/UX Highlights

- **Gradient themes** & glassmorphism
- **Animated meter** with shine effect
- **Bubble chat** with typing flow
- **Mobile-responsive** grid layout
- **Real-time feedback** animations

## 🔮 Future Enhancements

- Real LLM integration (OpenAI/Groq)
- Voice recording analysis
- Interview history
- Multiple languages
- Custom question bank

## 📝 Credits

Built with ❤️ using:

- [Express.js](https://expressjs.com/)
- Modern CSS (Grid, Flexbox, Animations)
- Vanilla JS ES6+ Classes
- Created by Jayaditya Malviya

**License:** MIT - Free to use/modify!

---

⭐ **Practice smart, interview confident!**
