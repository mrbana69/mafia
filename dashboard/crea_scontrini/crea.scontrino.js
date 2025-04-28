document.addEventListener('DOMContentLoaded', function () {
    const receiptForm = document.getElementById('receiptForm');
  
    receiptForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const customerName = document.getElementById('customerName').value;
      const items = document.getElementById('items').value;
      const total = document.getElementById('total').value;
  
      if (!customerName || !items || !total) {
        alert('Per favore, compila tutti i campi.');
        return;
      }
  
      const receipt = {
        customer: customerName,
        items: items,
        total: parseFloat(total).toFixed(2),
        date: new Date().toLocaleString(),
      };
  
      const savedReceipts = JSON.parse(localStorage.getItem('receipts')) || [];
      savedReceipts.push(receipt);
      localStorage.setItem('receipts', JSON.stringify(savedReceipts));
  
      alert('Scontrino creato con successo!');
      window.location.href = '../home.html';
    });
  });