class InterviewMindAI {
  constructor() {
    this.chatContainer = document.getElementById('chat-container');
    this.userInput = document.getElementById('user-input');
    this.sendBtn = document.getElementById('send-btn');
    this.agentType = document.getElementById('agent-type');
    this.avgScoreEl = document.getElementById('avg-score');
    this.totalQuestionsEl = document.getElementById('total-questions');
    this.bestScoreEl = document.getElementById('best-score');
    this.meterFill = document.getElementById('meter-fill');
    this.meterLabel = document.getElementById('meter-label');

    this.scores = [];
    this.totalQuestions = 0;
    this.bestScore = 0;

    this.init();
  }

  init() {
    // Welcome message
    this.addBotMessage('Welcome to InterviewMind AI! Choose an interviewer type and start practicing. I\\'ll analyze your responses with AI-powered feedback. 🚀');
    
    this.sendBtn.addEventListener('click', () => this.sendAnswer());
    this.userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendAnswer();
    });

    // Auto-scroll chat
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  async sendAnswer() {
    const answer = this.userInput.value.trim();
    if (!answer) return;

    this.addUserMessage(answer);
    this.userInput.value = '';
    this.sendBtn.disabled = true;
    this.sendBtn.textContent = 'Analyzing...';

    try {
      const response = await fetch('http://localhost:3000/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer,
          agentType: this.agentType.value
        })
      });

      const data = await response.json();

      // Add question and analysis to chat
      this.addBotMessage(`**${this.agentType.value.toUpperCase()} Interviewer:** ${data.question}`);
      setTimeout(() => {
        this.addBotMessage(`**🤖 AI Feedback:** Score: ${data.score}/100 | ${data.feedback}`);
        this.addBotMessage(`**💡 Improvement Tip:** ${data.improvement}`);
        this.addBotMessage(`**Agent Steps:** ${data.agent_steps.join(' → ')}`);
      }, 500);

      // Update dashboard
      this.updateDashboard(data.score);

    } catch (error) {
      console.error('Error:', error);
      this.addBotMessage('⚠️ Backend not running. Please run `node server.js` and try again.');
    } finally {
      this.sendBtn.disabled = false;
      this.sendBtn.textContent = 'Send Answer';
    }
  }

  addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `<div class="bubble bot">${this.formatMessage(text)}</div>`;
    this.chatContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }

  addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `<div class="bubble user">${text}</div>`;
    this.chatContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }

  formatMessage(text) {
    return text.replace(/\n/g, '<br>');
  }

  updateDashboard(score) {
    this.scores.push(score);
    this.totalQuestions++;
    this.bestScore = Math.max(this.bestScore, score);

    const avgScore = Math.round(this.scores.reduce((a, b) => a + b, 0) / this.scores.length);
    
    this.avgScoreEl.textContent = avgScore;
    this.totalQuestionsEl.textContent = this.totalQuestions;
    this.bestScoreEl.textContent = this.bestScore;

    // Update meter
    const percentage = (avgScore / 100) * 100;
    this.meterFill.style.width = percentage + '%';

    // Update label
    if (avgScore >= 90) this.meterLabel.textContent = 'Excellent! 👏';
    else if (avgScore >= 70) this.meterLabel.textContent = 'Good 💪';
    else if (avgScore >= 50) this.meterLabel.textContent = 'Fair 📈';
    else this.meterLabel.textContent = 'Needs Practice 📚';
  }

  scrollToBottom() {
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }
}

// Initialize app
const app = new InterviewMindAI();

