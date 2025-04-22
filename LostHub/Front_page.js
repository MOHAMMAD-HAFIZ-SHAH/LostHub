// Fetch data from JSON file
fetch("Front_page.json")
    .then(response => response.json())
    .then(data => {
        // Set the logo
        const logoContainer = document.getElementById("logo");
        logoContainer.innerHTML = `<span>L<img src="${data.logoImage}" class="logo-img">STHUB</span>`;

        // Populate navigation links
        const navLinksContainer = document.getElementById("nav-links-container");
        const navLinks = data.navLinks.map(link => `<li><a href="${link.href}">${link.text}</a></li>`).join("");
        navLinksContainer.innerHTML = `<ul class="nav-links">${navLinks}</ul>`;

        // Populate auth links (Login and Sign Up)
        const authLinksContainer = document.getElementById("auth-links");
        authLinksContainer.innerHTML = data.authLinks.map(link => 
            `<a href="${link.href}" class="${link.class || ""}">${link.text}</a>`).join("");

        // Populate main content
        const mainContent = document.getElementById("main-content");
        mainContent.innerHTML = `<h1>${data.main.headline}</h1><p>${data.main.paragraph}</p>`;

        // Set main image
        const mainImage = document.getElementById("main-image");
        mainImage.innerHTML = `<img src="${data.main.image}" alt="${data.main.imageAlt}">`;

        // Populate contact information
        const contactInfo = document.getElementById("contact-info");
        contactInfo.innerHTML = `
            <h2>Contact us</h2>
            <p><strong>Phone:</strong> ${data.contact.phone}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
        `;

        // Set footer text
        const footerText = document.getElementById("footer-text");
        footerText.textContent = data.footer;
    })
    .catch(error => console.error("Error loading JSON data:", error));
