// Carica gli scontrini da localStorage e li aggiunge alla lista
document.addEventListener('DOMContentLoaded', () => {
  const receiptList = document.getElementById('receiptList');
  const receipts = JSON.parse(localStorage.getItem('receipts')) || [];

  // Controlla se ci sono scontrini salvati
  if (receipts.length === 0) {
    receiptList.innerHTML = '<li>Nessuno scontrino disponibile.</li>';
    return;
  }

  // Aggiungi ogni scontrino alla lista
  receipts.forEach((receipt, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      Cliente: ${receipt.customer || `Sconosciuto`} - Totale: €${receipt.total || '0.00'}
      <div>
        <button class="btn btn-view" onclick="viewReceipt(${index})">Visualizza</button>
        <button class="btn btn-download" onclick="downloadReceipt(${index})">Scarica</button>
      </div>
    `;
    receiptList.appendChild(listItem);
  });
});

// Mostra i dettagli dello scontrino
function viewReceipt(index) {
  const receipts = JSON.parse(localStorage.getItem('receipts')) || [];
  const receipt = receipts[index];

  if (receipt) {
    const receiptElement = document.getElementById('receipt');
    document.getElementById('receiptDetails').innerText = `
      Cliente: ${receipt.customer || 'Sconosciuto'}
      Articoli: ${receipt.items || 'Nessun articolo'}
      Data: ${receipt.date || 'Data non disponibile'}
    `;
    document.getElementById('receiptTotal').innerText = `Totale: €${receipt.total || '0.00'}`;
    receiptElement.style.display = 'block';
  } else {
    alert('Scontrino non trovato!');
  }
}

// Scarica lo scontrino in una nuova pagina
function downloadReceipt(index) {
  const receipts = JSON.parse(localStorage.getItem('receipts')) || [];
  const receipt = receipts[index];

  if (receipt) {
    // Genera una nuova finestra con i dettagli dello scontrino
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="it">
      <head>
        <meta charset="UTF-8">
        <title>Fattura</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f4f4f4;
            color: #333;
          }
          .invoice-container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .invoice-header {
            text-align: center;
            margin-bottom: 20px;
          }
          .invoice-header h1 {
            margin: 0;
            font-size: 24px;
            color: #2c3e50;
          }
          .invoice-header p {
            margin: 0;
            font-size: 14px;
            color: #7f8c8d;
          }
          .invoice-details {
            margin-bottom: 20px;
          }
          .invoice-details p {
            margin: 5px 0;
            font-size: 14px;
          }
          .invoice-items {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .invoice-items th, .invoice-items td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          .invoice-items th {
            background: #f8f9fa;
            font-weight: bold;
          }
          .invoice-total {
            text-align: right;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
          }
        </style>
      </head>
      <body onload="window.print()">
        <div class="invoice-container">
          <div class="invoice-header">
            <h1>Fattura</h1>
            <p>Data: ${receipt.date || 'Data non disponibile'}</p>
          </div>
          <div class="invoice-details">
            <p><strong>Cliente:</strong> ${receipt.customer || 'Sconosciuto'}</p>
            <p><strong>Dettagli:</strong> ${receipt.items || 'Nessun articolo'}</p>
          </div>
          <table class="invoice-items">
            <thead>
              <tr>
                <th>Descrizione</th>
                <th>Quantità</th>
                <th>Prezzo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${receipt.items || 'Nessun articolo'}</td>
                <td>1</td>
                <td>€${receipt.total || '0.00'}</td>
              </tr>
            </tbody>
          </table>
          <div class="invoice-total">
            Totale: €${receipt.total || '0.00'}
          </div>
        </div>
      </body>
      </html>
    `);
    newWindow.document.close();
  } else {
    alert('Scontrino non trovato!');
  }
}