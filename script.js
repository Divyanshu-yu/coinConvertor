// Fetch data using .then()
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  .then(response => response.json())
  .then(data => {
    // Handle the data
    console.log(data);
    renderTable(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  // Fetch data using async/await
async function fetchData() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      // Handle the data
      console.log(data);
      renderTable(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  fetchData();

  let cryptoData = []; // Store fetched data globally

function renderTable(data) {
  const tableBody = document.getElementById('dataTable');
  tableBody.innerHTML = ''; // Clear existing rows

  data.forEach(coin => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${coin.name}</td>
      <td><img src="${coin.image}" alt="${coin.name}" style="width: 50px;"></td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price.toFixed(2)}</td>
      <td>$${coin.total_volume.toLocaleString()}</td>
      <td>$${coin.market_cap.toLocaleString()}</td>
      <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
    `;
    tableBody.appendChild(row);
  });

  cryptoData = data; // Store the data for sorting/filtering
}

function sortDataBy(field, ascending = true) {
  const sortedData = [...cryptoData].sort((a, b) => {
    if (a[field] < b[field]) return ascending ? -1 : 1;
    if (a[field] > b[field]) return ascending ? 1 : -1;
    return 0;
  });
  renderTable(sortedData);
}

document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('search').value.toLowerCase();
  const filteredData = cryptoData.filter(coin => coin.name.toLowerCase().includes(query));
  renderTable(filteredData);
});

document.getElementById('sortMarketCap').addEventListener('click', () => {
  sortDataBy('market_cap');
});

document.getElementById('sortChange').addEventListener('click', () => {
  sortDataBy('price_change_percentage_24h');
});

// Fetch data when page loads
fetchData();
