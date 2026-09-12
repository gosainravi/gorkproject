const greetings = [
  "Hello again.",
  "Namaste.",
  "Good to see you.",
  "Agentic demo ready.",
  "Ship it when you’re happy."
];

const msg = document.getElementById("msg");
const btn = document.getElementById("greetBtn");
let i = 0;

btn.addEventListener("click", () => {
  msg.textContent = greetings[i % greetings.length];
  i += 1;
});
