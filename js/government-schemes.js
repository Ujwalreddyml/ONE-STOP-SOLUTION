document.addEventListener("DOMContentLoaded", function() {
    const schemesDropdown = document.getElementById('schemes-dropdown');
    const schemeDetails = document.getElementById('scheme-details');
  
    const schemesData = {
      scheme1: {
        description: "Description of Scheme 1",
        eligibility: "Eligibility criteria for Scheme 1",
        benefits: "Benefits of Scheme 1",
        link: "https://www.example.com/scheme1"
      },
      scheme2: {
        description: "Description of Scheme 2",
        eligibility: "Eligibility criteria for Scheme 2",
        benefits: "Benefits of Scheme 2",
        link: "https://www.example.com/scheme2"
      },
      scheme3: {
        description: "Description of Scheme 3",
        eligibility: "Eligibility criteria for Scheme 3",
        benefits: "Benefits of Scheme 3",
        link: "https://www.example.com/scheme3"
      },
      scheme4: {
        description: "Description of Scheme 4",
        eligibility: "Eligibility criteria for Scheme 4",
        benefits: "Benefits of Scheme 4",
        link: "https://www.example.com/scheme4"
      }
    };
  
    schemesDropdown.addEventListener('change', function() {
      const selectedScheme = schemesDropdown.value;
  
      if (selectedScheme) {
        const scheme = schemesData[selectedScheme];
        schemeDetails.innerHTML = `
          <h3>${selectedScheme.replace('scheme', 'Scheme ')}</h3>
          <p><strong>Description:</strong> ${scheme.description}</p>
          <p><strong>Eligibility:</strong> ${scheme.eligibility}</p>
          <p><strong>Benefits:</strong> ${scheme.benefits}</p>
          <a href="${scheme.link}" target="_blank" class="button">Learn More</a>
        `;
      } else {
        schemeDetails.innerHTML = '';
      }
    });
  });
  