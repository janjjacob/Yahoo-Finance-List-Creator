const API_KEY = "Vp0hFhn4kz9gAWmBsTH14asS0z93Dazw2ADhcdrY";

// DOM variables
const button = document.querySelector(".chart-button");
const input = document.querySelector(".symbol-input");
const symbolInfoColumn = document.querySelector("#symbol-components-col");
const template = document.querySelector(".info-template");

async function getChart(symbol) {
  const url = `https://yfapi.net/v8/finance/chart/${symbol}`;
  const options = {
    method: "GET",
    withCredentials: true,
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json.chart.result[0].meta;
  } catch (err) {
    return undefined;
  }
}

async function handleButton() {
  const symbol = input.value.trim();

  if (symbol === "") return;

  const result = await getChart(symbol);

  if (result) {
    let symbol = result.symbol;
    let currency = result.currency;
    let previousClose = result.chartPreviousClose;

    let newSymbolInfo = template.content.cloneNode(true);

    newSymbolInfo.querySelector(".symbol").textContent = symbol;
    newSymbolInfo.querySelector(".currency").textContent = currency;
    newSymbolInfo.querySelector(".previousClose").textContent = previousClose;

    symbolInfoColumn.appendChild(newSymbolInfo);
  } else {
    alert(`${symbol} is not a valid symbol`);
  }
}

button.addEventListener("click", handleButton);
