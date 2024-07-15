document.addEventListener('DOMContentLoaded', function() {
    let map;
    let userLocationMarker;

    function initMap(lat, lng) {
        const userLocation = { lat: lat, lng: lng };
        map = new MapmyIndia.Map('map', {
            center: [lat, lng],
            zoom: 14
        });
        userLocationMarker = new L.Marker([lat, lng]).addTo(map).bindPopup("Your Location").openPopup();
    }

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude: " + latitude + " Longitude: " + longitude);
        
        initMap(latitude, longitude);

        const geocodeUrl = `https://apis.mapmyindia.com/advancedmaps/v1/{yc9e16618aeebadd54a5bb1397d36ad99}/rev_geocode?lat=${latitude}&lng=${longitude}`;
        console.log("Geocode URL:", geocodeUrl);

        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                const locationElement = document.getElementById('userLocation');
                if (data.results && data.results.length > 0) {
                    locationElement.textContent = data.results[0].formatted_address;
                } else {
                    locationElement.textContent = "Location not found";
                }
            })
            .catch(error => {
                console.error('Error fetching location:', error);
            });
    }

    getUserLocation();

    function fetchEducationalInstitutions(category) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const serviceDetailsElement = document.getElementById('serviceDetails');

                const placesUrl = `https://atlas.mapmyindia.com/api/places/nearby/json?keywords=${category}&refLocation=${latitude},${longitude}&radius=5000&key={c9e16618aeebadd54a5bb1397d36ad99}`;
                console.log("Places URL:", placesUrl);

                fetch(placesUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.results && data.results.length > 0) {
                            serviceDetailsElement.innerHTML = ''; // Clear previous content
                            data.results.forEach(institution => {
                                const marker = new L.Marker([institution.latitude, institution.longitude]).addTo(map).bindPopup(institution.poi).openPopup();
                                const institutionInfo = document.createElement('div');
                                institutionInfo.textContent = institution.poi;
                                serviceDetailsElement.appendChild(institutionInfo);
                            });
                        } else {
                            serviceDetailsElement.textContent = "No institutions found nearby.";
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching institutions:', error);
                    });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function handleAcademicsSelection() {
        const nameForm = document.createElement('form');
        nameForm.innerHTML = `
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br>
            <button type="submit">Submit</button>
        `;
        const serviceDetailsElement = document.getElementById('serviceDetails');
        serviceDetailsElement.innerHTML = ''; // Clear previous content
        serviceDetailsElement.appendChild(nameForm);

        nameForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            console.log("Name: " + name);

            const classDropdown = document.createElement('select');
            classDropdown.id = 'classDropdown';
            classDropdown.innerHTML = `
                <option value="" disabled selected>Select class</option>
                <option value="Kindergarten">Kindergarten</option>
                <option value="1 to 10">1 to 10</option>
                <option value="PUC">PUC</option>
                <option value="UG">UG</option>
                <option value="PG">PG</option>
            `;
            serviceDetailsElement.innerHTML = ''; // Clear previous content
            serviceDetailsElement.appendChild(classDropdown);

            classDropdown.addEventListener('change', function() {
                const selectedClass = this.value;
                console.log("Selected class: " + selectedClass);
                serviceDetailsElement.innerHTML = '';
                serviceDetailsElement.appendChild(classDropdown);

                if (selectedClass === 'Kindergarten' || selectedClass === '1 to 10' || selectedClass === 'PUC') {
                    const boardDropdown = document.createElement('select');
                    boardDropdown.id = 'boardDropdown';
                    boardDropdown.innerHTML = `
                        <option value="" disabled selected>Select board</option>
                        <option value="State">State</option>
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                    `;
                    serviceDetailsElement.appendChild(boardDropdown);

                    boardDropdown.addEventListener('change', function() {
                        const selectedBoard = this.value;
                        console.log("Selected board: " + selectedBoard);
                        serviceDetailsElement.innerHTML = '';
                        serviceDetailsElement.appendChild(classDropdown);
                        serviceDetailsElement.appendChild(boardDropdown);

                        if (selectedClass === 'PUC') {
                            const marksForm = document.createElement('form');
                            marksForm.innerHTML = `
                                <label for="tenthMarks">10th Marks:</label>
                                <input type="number" id="tenthMarks" name="tenthMarks" required><br>
                                <label for="totalMarks">Total Marks:</label>
                                <input type="number" id="totalMarks" name="totalMarks" required><br>
                                <button type="submit">Submit</button>
                            `;
                            serviceDetailsElement.appendChild(marksForm);

                            marksForm.addEventListener('submit', function(event) {
                                event.preventDefault();
                                const tenthMarks = document.getElementById('tenthMarks').value;
                                const totalMarks = document.getElementById('totalMarks').value;
                                console.log("10th Marks: " + tenthMarks + ", Total Marks: " + totalMarks);

                                const suggestedCourse = suggestPUCCourse(tenthMarks, totalMarks);
                                console.log("Suggested Course: " + suggestedCourse);

                                const courseDropdown = document.createElement('select');
                                courseDropdown.id = 'courseDropdown';
                                courseDropdown.innerHTML = `
                                    <option value="" disabled selected>Select course</option>
                                `;
                                if (suggestedCourse === 'Science') {
                                    courseDropdown.innerHTML += `
                                        <option value="PCMB">PCMB</option>
                                        <option value="PCMC">PCMC</option>
                                    `;
                                } else if (suggestedCourse === 'Commerce') {
                                    courseDropdown.innerHTML += `
                                        <option value="EBCS">EBCS</option>
                                        <option value="CSCB">CSCB</option>
                                    `;
                                } else if (suggestedCourse === 'Arts') {
                                    courseDropdown.innerHTML += `
                                        <option value="English">English</option>
                                        <option value="Kannada">Kannada</option>
                                    `;
                                }
                                serviceDetailsElement.appendChild(courseDropdown);

                                courseDropdown.addEventListener('change', function() {
                                    const selectedCourse = this.value;
                                    console.log("Selected Course: " + selectedCourse);
                                    fetchEducationalInstitutions(selectedCourse, selectedBoard);
                                });
                            });
                        } else {
                            boardDropdown.addEventListener('change', function() {
                                const selectedBoard = this.value;
                                console.log("Selected board: " + selectedBoard);
                                fetchEducationalInstitutions(selectedClass, selectedBoard);
                            });
                        }
                    });
                } else if (selectedClass === 'UG') {
                    const ugForm = document.createElement('form');
                    ugForm.innerHTML = `
                        <label for="pucStream">PUC Stream:</label>
                        <select id="pucStream" name="pucStream" required>
                            <option value="" disabled selected>Select PUC Stream</option>
                            <option value="Science">Science</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Arts">Arts</option>
                        </select><br>
                        <label for="pucMarks">PUC Marks:</label>
                        <input type="number" id="pucMarks" name="pucMarks" required><br>
                        <button type="submit">Submit</button>
                    `;
                    serviceDetailsElement.appendChild(ugForm);

                    ugForm.addEventListener('submit', function(event) {
                        event.preventDefault();
                        const pucStream = document.getElementById('pucStream').value;
                        const pucMarks = document.getElementById('pucMarks').value;
                        console.log("PUC Stream: " + pucStream + ", PUC Marks: " + pucMarks);

                        const suggestedCourses = suggestUGCourses(pucStream, pucMarks);
                        console.log("Suggested UG Courses: " + suggestedCourses);

                        const courseDropdown = document.createElement('select');
                        courseDropdown.id = 'ugCourseDropdown';
                        courseDropdown.innerHTML = `
                            <option value="" disabled selected>Select course</option>
                        `;
                        suggestedCourses.forEach(course => {
                            courseDropdown.innerHTML += `<option value="${course}">${course}</option>`;
                        });
                        serviceDetailsElement.appendChild(courseDropdown);

                        courseDropdown.addEventListener('change', function() {
                            const selectedCourse = this.value;
                            console.log("Selected UG Course: " + selectedCourse);
                            fetchEducationalInstitutions(selectedCourse);
                        });
                    });
                } else if (selectedClass === 'PG') {
                    const pgForm = document.createElement('form');
                    pgForm.innerHTML = `
                        <label for="ugDetails">UG Details:</label>
                        <textarea id="ugDetails" name="ugDetails" required></textarea><br>
                        <button type="submit">Submit</button>
                    `;
                    serviceDetailsElement.appendChild(pgForm);

                    pgForm.addEventListener('submit', function(event) {
                        event.preventDefault();
                        const ugDetails = document.getElementById('ugDetails').value;
                        console.log("UG Details: " + ugDetails);

                        const suggestedCourses = suggestPGCourses(ugDetails);
                        console.log("Suggested PG Courses: " + suggestedCourses);

                        const courseDropdown = document.createElement('select');
                        courseDropdown.id = 'pgCourseDropdown';
                        courseDropdown.innerHTML = `
                            <option value="" disabled selected>Select course</option>
                        `;
                        suggestedCourses.forEach(course => {
                            courseDropdown.innerHTML += `<option value="${course}">${course}</option>`;
                        });
                        serviceDetailsElement.appendChild(courseDropdown);

                        courseDropdown.addEventListener('change', function() {
                            const selectedCourse = this.value;
                            console.log("Selected PG Course: " + selectedCourse);
                            fetchEducationalInstitutions(selectedCourse);
                        });
                    });
                }
            });
        });
    }

    function handleTuitionsSelection() {
        const tuitionCategories = ['1 to 10', 'Puc', 'COMPETETIVE EXAMS', 'UG'];
        const categoryDropdown = document.createElement('select');
        categoryDropdown.id = 'categoryDropdown';
        categoryDropdown.innerHTML = `
            <option value="" disabled selected>Select category</option>
        `;
        tuitionCategories.forEach(category => {
            categoryDropdown.innerHTML += `<option value="${category}">${category}</option>`;
        });
        const serviceDetailsElement = document.getElementById('serviceDetails');
        serviceDetailsElement.innerHTML = ''; // Clear previous content
        serviceDetailsElement.appendChild(categoryDropdown);

        categoryDropdown.addEventListener('change', function() {
            const selectedCategory = this.value;
            console.log("Selected Tuition Category: " + selectedCategory);
            fetchEducationalInstitutions(selectedCategory);
        });
    }

    function handleCoCurricularSelection() {
        const coCurricularCategories = ['Singing', 'Dancing', 'Martial Arts', 'Sports'];
        const categoryDropdown = document.createElement('select');
        categoryDropdown.id = 'categoryDropdown';
        categoryDropdown.innerHTML = `
            <option value="" disabled selected>Select category</option>
        `;
        coCurricularCategories.forEach(category => {
            categoryDropdown.innerHTML += `<option value="${category}">${category}</option>`;
        });
        const serviceDetailsElement = document.getElementById('serviceDetails');
        serviceDetailsElement.innerHTML = ''; // Clear previous content
        serviceDetailsElement.appendChild(categoryDropdown);

        categoryDropdown.addEventListener('change', function() {
            const selectedCategory = this.value;
            console.log("Selected Co-curricular Category: " + selectedCategory);
            fetchEducationalInstitutions(selectedCategory);
        });
    }

    function suggestUGCourses(pucStream, pucMarks) {
        if (pucStream === 'Science') {
            if (pucMarks >= 85) {
                return ['Engineering', 'Medicine', 'B.Sc.'];
            } else if (pucMarks >= 70) {
                return ['B.Sc.', 'Pharmacy', 'Nursing'];
            } else {
                return ['B.Sc.'];
            }
        } else if (pucStream === 'Commerce') {
            if (pucMarks >= 85) {
                return ['B.Com', 'BBA', 'CA'];
            } else if (pucMarks >= 70) {
                return ['B.Com', 'BBA'];
            } else {
                return ['B.Com'];
            }
        } else if (pucStream === 'Arts') {
            if (pucMarks >= 85) {
                return ['BA', 'BFA', 'BSW'];
            } else if (pucMarks >= 70) {
                return ['BA', 'BFA'];
            } else {
                return ['BA'];
            }
        }
        return [];
    }

    function suggestPGCourses(ugDetails) {
        const ugCourse = ugDetails.toLowerCase();
        if (ugCourse.includes('engineering')) {
            return ['M.Tech', 'MBA', 'MS'];
        } else if (ugCourse.includes('b.com')) {
            return ['M.Com', 'MBA', 'CA'];
        } else if (ugCourse.includes('b.sc')) {
            return ['M.Sc.', 'MBA', 'MCA'];
        } else if (ugCourse.includes('arts')) {
            return ['MA', 'MSW', 'MBA'];
        }
        return [];
    }

    function suggestPUCCourse(tenthMarks, totalMarks) {
        const percentage = (tenthMarks / totalMarks) * 100;
        if (percentage >= 85) {
            return 'Science';
        } else if (percentage >= 70) {
            return 'Commerce';
        } else {
            return 'Arts';
        }
    }

    document.getElementById('educationType').addEventListener('change', function() {
        const selectedOption = this.value;
        const serviceDetailsElement = document.getElementById('serviceDetails');
        serviceDetailsElement.innerHTML = ''; // Clear previous content

        if (selectedOption === 'academics') {
            handleAcademicsSelection();
        } else if (selectedOption === 'tuitions') {
            handleTuitionsSelection();
        } else if (selectedOption === 'co-curricular') {
            handleCoCurricularSelection();
        }
    });
});
