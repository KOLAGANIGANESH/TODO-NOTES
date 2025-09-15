const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const book = document.getElementById("book");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let pages = [];
let currentPage = 0;

// 🔮 AI Helper (OpenAI Example)
async function askAI(prompt) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "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" // Replace with your key
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    return "⚠️ AI unavailable.";
  }
}

// ➕ Add New Page
addBtn.addEventListener("click", async () => {
  const text = taskInput.value.trim();
  if (!text) return;

  const page = document.createElement("div");
  page.classList.add("page");

  // 🧠 Get AI suggestion
  const aiSuggestion = await askAI(`Improve or add detail to this note: ${text}`);

  page.innerHTML = `
    <h2>Page ${pages.length + 1}</h2>
    <p>${text}</p>
    <div class="ai-suggestion">✨ AI Suggestion: ${aiSuggestion}</div>
  `;

  book.appendChild(page);
  pages.push(page);

  showPage(pages.length - 1);
  taskInput.value = "";
});

// 📖 Show Specific Page
function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.remove("active");
    if (i === index) page.classList.add("active");
  });
  currentPage = index;
}

// ⬅ Prev / Next
prevBtn.addEventListener("click", () => {
  if (currentPage > 0) showPage(currentPage - 1);
});
nextBtn.addEventListener("click", () => {
  if (currentPage < pages.length - 1) showPage(currentPage + 1);
});
