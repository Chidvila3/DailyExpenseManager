const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const categorySelect = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
  expenseList.innerHTML = "";
  let sum = 0;

  expenses.forEach((exp, index) => {
    sum += exp.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <strong>${exp.desc}</strong> - ₹${exp.amount.toFixed(2)}<br>
        <small>${exp.category} | ${exp.date}</small>
      </span>
      <div>
        <button onclick="editExpense(${index})">✏️</button>
        <button onclick="deleteExpense(${index})">🗑️</button>
      </div>
    `;
    expenseList.appendChild(li);
  });

  total.textContent = sum.toFixed(2);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

function editExpense(index) {
  const exp = expenses[index];
  descInput.value = exp.desc;
  amountInput.value = exp.amount;
  dateInput.value = exp.date;
  categorySelect.value = exp.category;
  deleteExpense(index);
}

addBtn.addEventListener("click", () => {
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;
  const category = categorySelect.value;

  if (!desc || isNaN(amount) || amount <= 0 || !date || !category)
    return alert("Please fill all fields correctly.");

  expenses.push({ desc, amount, date, category });
  descInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
  categorySelect.value = "";
  renderExpenses();
});

renderExpenses();

