const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('.'));

const questions = {
  technical: [
    {
      question: "Write a function to reverse a string in JavaScript.",
      keywords: ['reverse', 'split', 'join', 'loop', 'for', 'while'],
      type: 'coding'
    },
    {
      question: "Explain the difference between let, const, and var.",
      keywords: ['scope', 'hoisting', 'block', 'function'],
      type: 'coding'
    }
  ],
  hr: [
    {
      question: "Tell me about a time you faced a challenge at work.",
      keywords: ['challenge', 'team', 'solution', 'learned', 'result'],
      type: 'behavioral'
    },
    {
      question: "Why do you want to work here?",
      keywords: ['company', 'role', 'passion', 'contribute'],
      type: 'behavioral'
    }
  ]
};

function analyzeAnswer(question, answer) {
  const lowerAnswer = answer.toLowerCase();
  const matched = question.keywords.filter(kw => lowerAnswer.includes(kw.toLowerCase())).length;
  const total = question.keywords.length;
  let score = Math.round((matched / total) * 70 + 30); // Base 30, up to 100

  // Confidence: negative words
  const lowConf = ['um', 'uh', 'like', 'you know'].filter(word => lowerAnswer.includes(word)).length;
  score -= lowConf * 10;
  score = Math.max(0, score);

  // Feedback
  let feedback = matched > total * 0.5 ? 'Good response! Clear understanding.' : 'Needs more detail on key concepts.';
  let improvement = 'Practice using specific examples and avoid filler words.';

  return { score, feedback, improvement };
}

app.post('/interview', (req, res) => {
  const { answer, agentType } = req.body; // agentType: 'technical' or 'hr'

  const qList = questions[agentType];
  const question = qList[Math.floor(Math.random() * qList.length)];

  const analysis = analyzeAnswer(question, answer);

  const agentSteps = [
    `Technical Interviewer/HR: Asked "${question.question}"`,
    'User: Provided answer',
    `Feedback Analyzer: Analyzed correctness (${analysis.score}), confidence, and structure`,
    'Score calculated based on keyword match and tone.'
  ];

  res.json({
    question: question.question,
    score: analysis.score,
    feedback: analysis.feedback,
    improvement: analysis.improvement,
    agent_steps: agentSteps
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

