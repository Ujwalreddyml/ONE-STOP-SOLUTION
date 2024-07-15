function calculateEMI() {
    // Get input values
    let principal= document.getElementById('principal').value;
    let rate= document.getElementById('rate').value;
    let time= document.getElementById('time').value;
    
    // Validate input
    if (principal === "" || rate === "" || time === "") {
        alert("Please enter all the fields.");
        return;
    }
    
    // Convert rate from percentage to decimal
    rate= rate / 100.0;
    
    // Calculate monthly interest rate
    let monthRate= rate / 12;
    
    // Calculate number of months
    let months= time * 12;
    
    // Calculate EMI
    let emi= (principal * monthRate * Math.pow(1 + monthRate, months)) / (Math.pow(1 + monthRate, months) - 1);
    
    // Display the result
    let emiElement= document.getElementById('emiAmount');
    emiElement.textContent= `₹ ${emi.toFixed(2)}`;
}
