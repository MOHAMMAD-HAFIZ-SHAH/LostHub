// Load the JSON data
fetch('homepage.json')
  .then(response => response.json())
  .then(data => {
    // Profile Section
    const profileSection = document.querySelector('.profile-section');
    const profileIcon = document.querySelector('.profile-icon');
    const profileName = profileSection.querySelector('span');

    profileIcon.src = data.profile.icon;
    profileName.textContent = data.profile.name;


    // Sidebar Links
    const sidebarLinks = document.querySelector('.sidebar ul');
    data.navLinks.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      li.appendChild(a);
      sidebarLinks.appendChild(li);
    });

    // Logo
    const logoContainer = document.querySelector('.logo-container');
    const logoImg = logoContainer.querySelector('.logo');
    logoImg.src = data.logo.src;
    logoImg.alt = data.logo.alt;

    // Main Content Buttons
    const buttonContainer = document.querySelector('.button-container');
    data.mainContent.buttons.forEach(button => {
      const a = document.createElement('a');
      a.href = button.href;
      a.textContent = button.text;
      a.classList.add(button.class);
      buttonContainer.appendChild(a);
    });
  });
