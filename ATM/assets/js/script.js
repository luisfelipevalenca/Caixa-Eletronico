const terminalOutput = document.getElementById("terminalOutput");
const rightStream = document.getElementById("rightStream");
const lines = [
  "inject ghostnet.cfg --force",
  "ping -ghost 127.0.0.1",
  "link /btc/network_sync",
  "confirm btcwallet -hash=sha256",
  "trace route --btcnet",
  "establish handshake...",
  "keygen session",
  "login success — session root-871",
  "BTC_CHAIN::load(✓)",
  "tx push stream — mempool/active",
  "inject random() > entropyBuffer",
  "trigger packet::x2ff903",
  "update ledger — status 200"
];
function loopWrite(target) {
  const div = document.createElement("div");
  const text = lines[Math.floor(Math.random() * lines.length)];
  div.innerHTML = `<span class='prompt'></span>${text}`;
  target.appendChild(div);
  target.scrollTop = target.scrollHeight;
}
setInterval(() => loopWrite(terminalOutput), 1200);
setInterval(() => loopWrite(rightStream), 1600);

const payBtn = document.getElementById("payBtn");
const receipt = document.getElementById("receipt");
const receiptAmount = document.getElementById("receiptAmount");
const receiptDate = document.getElementById("receiptDate");
const receiptTx = document.getElementById("receiptTx");
payBtn.addEventListener("click", async () => {
  const btc = parseFloat(document.getElementById("btcAmount").value);
  if (!btc || btc <= 0 || btc > 10) return alert("Valor inválido (max 10 BTC)");
  const agora = new Date().toLocaleString("pt-BR");
  const txId = "TX-" + Math.floor(Math.random() * 999999);
  receiptAmount.textContent = btc.toFixed(6);
  receiptDate.textContent = agora;
  receiptTx.textContent = txId;
  receipt.classList.remove("hidden");
  await navigator.clipboard.writeText(`Valor: ${btc.toFixed(6)} BTC\nData: ${agora}\nID: ${txId}`);
  alert("Recibo copiado.");
});