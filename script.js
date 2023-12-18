document.getElementById('calculate').addEventListener('click', calculateDimensions);
document.getElementById('clear-history').addEventListener('click', clearHistory);
window.onload = displayHistory;

function calculateDimensions() {
    let dim1 = parseFloat(document.getElementById('dimension1').value);
    let dim2 = parseFloat(document.getElementById('dimension2').value);
    let quantity = parseInt(document.getElementById('quantity').value);


    if (isNaN(dim1) || isNaN(dim2) || isNaN(quantity)) {
        alert("Please enter valid numbers for both dimensions.");
        return;
    }

    let length = Math.max(dim1, dim2);
    let width = Math.min(dim1, dim2);
    let total = length * 2 + width * 2;

    let sequence;

    if (total > 144) {
        sequence = calculateForLargeDimensions(length, width, quantity);
    } else {
        sequence = calculateForStandardDimensions(length, width, quantity);
    }

    displayResult(sequence);
    saveToHistory(dim1, dim2, sequence);
}

function calculateForLargeDimensions(length, width, quantity) {
    if (length + width <= 144) {
        // Case where width + length + width is more than 144
        return [2, width + 2, width + length + 2, width + length + 4 + ' (' + quantity * 2 + ')'];
    } else {
        // Case where width + length is more than 144
        return [[2, width + 2, width + 4 + ' (' + quantity * 2 + ')'] + '<br>' + [2, length + 2, length + 4 + ' (' + quantity * 2 + ')']];
    }
}

function calculateForStandardDimensions(length, width, quantity) {
    // Standard calculation
    return [2, (width + 2), (width + length + 2), (width * 2) + (length + 2), (width * 2) + (length * 2) + 2, (width * 2) + (length * 2) + 4 + ' (' + quantity + ')'];
}

function displayResult(sequence) {
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Calculated Sequence:<br> ${sequence.join(", ")}`;
}

function saveToHistory(length, width, sequence) {
    let history = getHistory();
    // Ensure the sequence is saved as a string
    let sequenceString = Array.isArray(sequence) ? sequence.join(", ") : sequence;
    sequenceString = sequenceString.replace(/<br>/g, '\n'); // Replace <br> with \n
    history.push({ length, width, sequence: sequenceString });
    localStorage.setItem('canvasConnectorHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    let history = getHistory();
    let historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(item => {
        let li = document.createElement('li');
        // Convert sequence to string if it's not already
        let sequenceString = typeof item.sequence === 'string' ? item.sequence : item.sequence.join(", ");
        // Replace \n with <br> for displaying in HTML
        let sequenceHTML = sequenceString.replace(/\n/g, '<br>');
        li.innerHTML = `${item.length} X ${item.width} <br> Mark it @: <br> ${sequenceHTML}`;
        historyList.appendChild(li);
    });
}



function getHistory() {
    let history = localStorage.getItem('canvasConnectorHistory');
    return history ? JSON.parse(history) : [];
}

function clearHistory() {
    localStorage.removeItem('canvasConnectorHistory');
    displayHistory();
}





