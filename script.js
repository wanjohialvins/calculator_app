const displayEl = document.getElementById("display");
const historyListEl = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
const exportHistoryBtn = document.getElementById("exportHistory");

let current = "";        
let prev = null;         
let pendingOp = null;    
const history = [];      

function updateDisplay(val) {
  displayEl.textContent = val + "";
}

function pushHistory(operand1, operator, operand2, result) {
  const entry = { operand1, operator, operand2, result };
  history.unshift(entry);
  renderHistory();
}

function renderHistory() {
  historyListEl.innerHTML = "";
  if (history.length === 0) {
    historyListEl.innerHTML = '<p class="empty">No calculations yet.</p>';
    return;
  }
  history.forEach((e) => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = '<div class="expr">'+ e.operand1 + ' ' + e.operator + ' ' + e.operand2 + '</div>' +
                    '<div class="res">'+ e.result + '</div>';
    historyListEl.appendChild(div);
  });
}

function compute(a, op, b) {
  a = Number(a); b = Number(b);
  if (isNaN(a) || isNaN(b)) return null;
  switch(op){
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? null : a / b;
    default: return null;
  }
}

function handleInput(num, action, op){
  if (num !== undefined) {
    if (num === "." && current.includes(".")) return;
    if (current === "0" && num !== ".") current = num;
    else current += num;
    updateDisplay(current);
    return;
  }

  if (action === "clear") { current=""; prev=null; pendingOp=null; updateDisplay(0); return; }
  if (action === "toggle-sign") { if(current){current=current.startsWith("-")?current.slice(1):"-"+current;updateDisplay(current);} return; }
  if (action === "percent") { if(current){current=(Number(current)/100).toString();updateDisplay(current);} return; }

  if (action === "op") {
    if (pendingOp && prev !== null && current !== "") {
      const res = compute(prev, pendingOp, current);
      if(res===null){updateDisplay("Error");current="";prev=null;pendingOp=null;return;}
      pushHistory(prev,pendingOp,current,res);
      prev=res; current=""; pendingOp=op; updateDisplay(res); return;
    }
    if(current===""){ pendingOp=op; return; }
    prev=current; pendingOp=op; current=""; updateDisplay(prev); return;
  }

  if(action==="equals") {
    if(!pendingOp||prev===null||current==="") return;
    const res=compute(prev,pendingOp,current);
    if(res===null){updateDisplay("Error");current="";prev=null;pendingOp=null;return;}
    pushHistory(prev,pendingOp,current,res);
    updateDisplay(res); current=""+res; prev=null; pendingOp=null; return;
  }
}

// Button clicks
document.querySelectorAll(".buttons .btn").forEach(btn => {
  btn.addEventListener("click", () => {
    handleInput(btn.dataset.num, btn.dataset.action, btn.dataset.op);
  });
});

clearHistoryBtn.addEventListener("click", () => { history.length=0; renderHistory(); });
exportHistoryBtn.addEventListener("click", () => {
  if(history.length===0)return alert("No history to export.");
  const csv=history.map(h=>`${h.operand1},${h.operator},${h.operand2},${h.result}`).join("\n");
  const blob=new Blob([csv],{type:"text/csv"});
  const url=URL.createObjectURL(blob); const a=document.createElement("a");
  a.href=url; a.download="calculator-history.csv"; document.body.appendChild(a); a.click(); a.remove();
});

// Keyboard support
document.addEventListener("keydown", (e)=>{
  const key=e.key;
  if(/[0-9.]/.test(key)) handleInput(key);
  else if(key==="Enter"||key==="=") handleInput(undefined,"equals");
  else if(key==="Escape") handleInput(undefined,"clear");
  else if(key==="+") handleInput(undefined,"op","+");
  else if(key==="-") handleInput(undefined,"op","-");
  else if(key==="*"||key==="x") handleInput(undefined,"op","*");
  else if(key==="/") handleInput(undefined,"op","/");
});

updateDisplay(0);
renderHistory();
