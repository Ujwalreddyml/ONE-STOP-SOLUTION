document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    const financeTypeSelect = document.getElementById('financeType');
    const serviceDetailsDiv = document.getElementById('serviceDetails');

    financeTypeSelect.addEventListener('change', function () {
        const selectedService = financeTypeSelect.value;
        if (selectedService === 'banking') {
            displayBankingServices();
        } else if (selectedService === 'tax') {
            displayTaxServices();
        } else if (selectedService === 'insurance') {
            displayInsuranceServices();
        } else if (selectedService === 'emiCalculator') {
            window.location.href = 'emicalc.html';
        } else if (selectedService === 'educationLoan') {
            displayEducationLoanServices();
        }
    });

    function displayBankingServices() {
        // Clear previous service details
        serviceDetailsDiv.innerHTML = '';

        // Add banking services
        const bankingDetails = `
            <h2>Banking Services</h2>
            <p>Choose a bank to view interest rates and housing loan details:</p>
            <select id="bankSelect">
                <option value="" disabled selected>Select an option</option>
                <option value="icici">ICICI Bank</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="sbi">State Bank of India (SBI)</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
                <option value="punjab">Punjab National Bank (PNB)</option>
                <option value="boi">Bank of India (BOI)</option>
                <option value="canara">Canara Bank</option>
                <option value="yes">Yes Bank</option>
                <option value="idfc">IDFC First Bank</option>
                <option value="indusind">IndusInd Bank</option>
                <!-- Add more bank options here -->
            </select>
            <div id="bankDetails">
                <!-- Bank details will be dynamically added here -->
            </div>
        `;
        serviceDetailsDiv.innerHTML = bankingDetails;

        // Add event listener to bank select dropdown
        const bankSelect = document.getElementById('bankSelect');
        bankSelect.addEventListener('change', function () {
            const selectedBank = bankSelect.value;
            // Fetch bank details and update bankDetailsDiv
            fetchBankDetails(selectedBank);
        });
    }

    function displayTaxServices() {
        // Clear previous service details
        serviceDetailsDiv.innerHTML = '';

        // Add tax services
        const taxDetails = `
            <h2>Tax Services</h2>
            <p>View different tax-saving plans and recommendations:</p>
            <ul>
                <li>Plan 1: XYZZ</li>
                <li>Plan 2: ABCDD</li>
                <li>Plan 3: HIJK</li>
                <!-- Add more tax saving plans here -->
            </ul>
        `;
        serviceDetailsDiv.innerHTML = taxDetails;
    }

    function displayInsuranceServices() {
        // Clear previous service details
        serviceDetailsDiv.innerHTML = '';

        // Add insurance services
        const insuranceDetails = `
            <h2>Insurance Services</h2>
            <p>View different insurance options and their details:</p>
            <ul>
                <li>Insurance Option 1: ABCD</li>
                <li>Insurance Option 2: XYZ</li>
                <li>Insurance Option 3: AYT</li>
                <!-- Add more insurance options here -->
            </ul>
        `;
        serviceDetailsDiv.innerHTML = insuranceDetails;
    }

    function displayEducationLoanServices() {
        serviceDetailsDiv.innerHTML = `
            <h2>Education Loan</h2>
            <p>Our education loan services offer a range of options to support students pursuing higher education. 
            We provide competitive interest rates, flexible repayment options, and support throughout the application process.</p>
            <ul>
                <li>Eligibility Criteria</li>
                <li>Loan Amount and Tenure</li>
                <li>Interest Rates</li>
                <li>Application Process</li>
                <li>Contact Information</li>
            </ul>
            <h3>Steps to Apply for an Education Loan</h3>
            <ol>
                <li>Visit the <a href="https://www.vidyalakshmi.co.in/Students/" target="_blank">Vidya Lakshmi Portal</a>.</li>
                <li>Register and create a new account.</li>
                <li>Fill in your profile details.</li>
                <li>Search for and select the education loan that suits your needs.</li>
                <li>Complete the application form and upload the required documents.</li>
                <li>Submit the application and track its status online.</li>
            </ol>
        `;
    }

    function fetchBankDetails(bank) {
        const bankDetailsDiv = document.getElementById('bankDetails');
        bankDetailsDiv.innerHTML = ''; // Clear previous bank details

        // Placeholder for fetching bank details
        const bankDetails = {
            icici: {
                name: 'ICICI Bank',
                interestRate: '7.75%',
                imgSrc: 'assets/img/icici.png',
                website: 'https://www.icicibank.com/',
                customerCare: '1800 123 4567',
                rating: '4.5/5',
                recommendation: 'Highly recommended for low-interest housing loans.'
            },
            hdfc: {
                name: 'HDFC Bank',
                interestRate: '7.90%',
                imgSrc: 'assets/img/hdfc.jpg',
                website: 'https://www.hdfcbank.com/',
                customerCare: '1800 123 9876',
                rating: '4.3/5',
                recommendation: 'Great for first-time home buyers.'
            },
            sbi: {
                name: 'State Bank of India (SBI)',
                interestRate: '7.85%',
                imgSrc: 'assets/img/sbi.jpg',
                website: 'https://www.onlinesbi.com/',
                customerCare: '1800 123 3456',
                rating: '4.4/5',
                recommendation: 'Trusted by millions for reliable services.'
            },
            axis: {
                name: 'Axis Bank',
                interestRate: '8.00%',
                imgSrc: 'assets/img/axis.jpg',
                website: 'https://www.axisbank.com/',
                customerCare: '1800 209 5577',
                rating: '4.2/5',
                recommendation: 'Offers flexible loan repayment options.'
            },
            kotak: {
                name: 'Kotak Mahindra Bank',
                interestRate: '8.05%',
                imgSrc: 'assets/img/kotak.jpg',
                website: 'https://www.kotak.com/',
                customerCare: '1860 266 2666',
                rating: '4.1/5',
                recommendation: 'Competitive rates and excellent customer service.'
            },
            punjab: {
                name: 'Punjab National Bank (PNB)',
                interestRate: '7.95%',
                imgSrc: 'assets/img/pnb.png',
                website: 'https://www.pnbindia.in/',
                customerCare: '1800 180 2222',
                rating: '4.0/5',
                recommendation: 'Good for government employees.'
            },
            boi: {
                name: 'Bank of India (BOI)',
                interestRate: '8.10%',
                imgSrc: 'assets/img/boi.jpg',
                website: 'https://www.bankofindia.co.in/',
                customerCare: '1800 103 1906',
                rating: '3.9/5',
                recommendation: 'Suitable for urban and rural customers.'
            },
            canara: {
                name: 'Canara Bank',
                interestRate: '8.25%',
                imgSrc: 'assets/img/canara.jpg',
                website: 'https://www.canarabank.com/',
                customerCare: '1800 425 0018',
                rating: '4.0/5',
                recommendation: 'Offers a variety of loan products.'
            },
            yes: {
                name: 'Yes Bank',
                interestRate: '8.35%',
                imgSrc: 'assets/img/yes.png',
                website: 'https://www.yesbank.in/',
                customerCare: '1800 1200',
                rating: '3.8/5',
                recommendation: 'Innovative banking solutions.'
            },
            idfc: {
                name: 'IDFC First Bank',
                interestRate: '8.20%',
                imgSrc: 'assets/img/idfc.png',
                website: 'https://www.idfcfirstbank.com/',
                customerCare: '1800 419 4332',
                rating: '4.1/5',
                recommendation: 'Best for high-value loans.'
            },
            indusind: {
                name: 'IndusInd Bank',
                interestRate: '8.30%',
                imgSrc: 'assets/img/indusind.jpg',
                website: 'https://www.indusind.com/',
                customerCare: '1860 500 5004',
                rating: '4.2/5',
                recommendation: 'Known for quick loan approvals.'
            }
        };

        if (bankDetails[bank]) {
            const { name, interestRate, imgSrc, website, customerCare, rating, recommendation } = bankDetails[bank];
            const detailsHtml = `
                <h3>${name}</h3>
                <p>Interest Rate: ${interestRate}</p>
                <p>Customer Care: ${customerCare}</p>
                <p>Rating: ${rating}</p>
                <p>Recommendation: ${recommendation}</p>
                <img src="${imgSrc}" alt="${name}" style="width: 200px; height: auto;">
                <p><a href="${website}" target="_blank">Visit Official Website</a></p>
            `;
            bankDetailsDiv.innerHTML = detailsHtml;
        } else {
            bankDetailsDiv.innerHTML = '<p>No details available for the selected bank.</p>';
        }
    }
});
