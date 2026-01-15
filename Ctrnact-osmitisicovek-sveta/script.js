const buttons = document.querySelectorAll(".menu-button");
const mainContent = document.getElementById("main-content");
let data = {};

fetch("data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Chyba při načítání JSONu");
        }
        return response.json();
    })
    .then(json => {
        data = json;
        showContent("intro");
    })
    .catch(err => {
        console.error(err);
        mainContent.innerHTML = "<p>Data se nepodařilo načíst.</p>";
    });

function showContent(key) {
    const item = data[key];
    if (!item) {
        mainContent.innerHTML = "<p>Data nejsou dostupná.</p>";
        return;
    }

    if (key === "intro") {
        let html = `<h2>${item.title}</h2>`;
        item.paragraphs.forEach(p => html += `<p>${p}</p>`);
        mainContent.innerHTML = html;
        return;
    }

    mainContent.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}" class="mountain-img">
        <p><strong>Výška:</strong> ${item.height}</p>
        <p><strong>Pohoří:</strong> ${item.range}</p>
        <p><strong>Státy:</strong> ${item.countries}</p>
        <p class="description">${item.description}</p>
    `;
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        showContent(btn.dataset.target);
    });
});
