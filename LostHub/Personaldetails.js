// Fetch data from JSON file
fetch('Personaldetails.json')
    .then(response => response.json())
    .then(data=> {
        // Set header title
        document.getElementById('header-title').textContent = data.headerTitle;

        // Set back button text and link
        const backButton = document.getElementById('back-button');
        backButton.textContent = data.backButtonText;
        backButton.href = data.backButtonLink;

        // Set profile picture
        document.getElementById('profile-icon').src = data.profilePicture;

        // Set upload button text
        document.getElementById('upload-button').textContent = data.uploadButtonText;

        // Set logo
        const logo = document.getElementById('logo');
        logo.src = data.logo;
        logo.alt = "Logo";

        // Populate details section
        const detailsSection = document.getElementById('details-section');
        data.details.forEach(detail => {
            const detailRow = document.createElement('div');
            detailRow.className = 'detail-row';
            
            const label = document.createElement('label');
            label.textContent = detail.label;
            detailRow.appendChild(label);
            
            const input = document.createElement('input');
            input.type = "text";
            input.placeholder = detail.placeholder;
            detailRow.appendChild(input);
            
            detailsSection.appendChild(detailRow);
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));
