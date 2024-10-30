function updateProfile(profileData) {
    const photo = document.getElementById('profilePhoto');
    photo.src = profileData.photo;
    photo.alt = profileData.name;

    const name = document.getElementById('profileName');
    name.innerText = profileData.name;

    const location = document.getElementById('profileLocation');
    location.innerText = profileData.location;

    const phone = document.getElementById('profilePhone');
    phone.innerText = profileData.phone;
    phone.href = `tel:${profileData.phone}`;

    const mail = document.getElementById('profileMail');
    
    mail.innerText = profileData.mail;
    mail.href = `mailto:${profileData.mail}`;
}

function updateSoftSkills(profileData) {
    const softSkills = document.getElementById('profileSoftSkills');
    softSkills.innerHTML = profileData.skills.softSkills.map(skill => `<li>${skill}</li>`).join('');
}

function updateHardSkills(profileData) {
    const hardSkills = document.getElementById('profileHardSkills');
    hardSkills.innerHTML = profileData.skills.hardSkills.map(skill => `<li><img src="${skill.logo}" alt="${skill.name}" title="${skill.name}"></li>`).join('');
}

function updateLanguages(profileData) {
    const languages = document.getElementById('profileLanguages');
    languages.innerHTML = profileData.languages.map(language => `<li>${language}</li>`).join('');
}

function updatePortfolio(profileData) {
    const portfolio = document.getElementById('profilePortfolio');
    portfolio.innerHTML = profileData.portfolio.map(project => `
        <li>
            <h3 ${project.github ? 'class="github"' : ''}>${project.name}</h3>
            <a href="${project.url}" target="_blank">${project.url}</a>
        </li>
    `).join('');
}

function updateProfessionalExperience(profileData) {
    const professionalExperience = document.getElementById('profileProfessionalExperience');
    professionalExperience.innerHTML = profileData.professionalExperience.map(experience => `
        <li>
            <h3 class="title">${experience.name}</h3>
            <p class="period">${experience.period}</p>
            <p>${experience.description}</p>
        </li>
    `).join('');
}

(async () => {
    const profileData = await fetchProfileData();
    updateProfile(profileData);
    updateSoftSkills(profileData);
    updateHardSkills(profileData);
    updateLanguages(profileData);
    updatePortfolio(profileData);
    updateProfessionalExperience(profileData);
})();
