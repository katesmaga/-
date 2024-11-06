const digitToWords = {
    2: "два", 3: "три", 4: "чотири", 30: "тридцять", 50: "п'ятдесят",
    100: "сто", 150: "сто п'ятдесят", 200: "двісті", 250: "двісті п'ятдесят",
    280: "двісті вісімдесят", 300: "триста", 320: "триста двадцять",
    350: "триста п'ятдесят", 400: "чотириста", 450: "чотириста п'ятдесят", 500: "п'ятсот"
};

function replaceDigitsWithWords(text) {
    return text.replace(/\b\d+\b/g, match => digitToWords[parseInt(match)] || match);
}

async function loadXML() {
    try {
        const response = await fetch('test.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        return parser.parseFromString(xmlText, "text/xml");
    } catch (error) {
        console.error("Error loading XML file:", error);
    }
}

async function generateRecipeTable() {
    const xmlDoc = await loadXML();
    if (!xmlDoc) return;

    const dishes = xmlDoc.getElementsByTagName("DISH");
    let tableHtml = "<table><tr><th>Назва</th><th>Рецепт</th><th>Калорії</th><th>Інгредієнти</th></tr>";

    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];
        const name = dish.getElementsByTagName("NAME")[0].textContent;
        const recipe = dish.getElementsByTagName("RECIPE")[0].textContent;
        const calories = dish.getElementsByTagName("CALORIES")[0].textContent;
        const ingredients = dish.getElementsByTagName("INGREDIENT");

        let ingredientsHtml = "<ul>";
        for (let j = 0; j < ingredients.length; j++) {
            const ingredientName = ingredients[j].getElementsByTagName("NAME")[0].textContent;
            const quantity = ingredients[j].getElementsByTagName("QUANTITY")[0].textContent;
            const unit = ingredients[j].getElementsByTagName("UNIT")[0].textContent;
            ingredientsHtml += `<li>${ingredientName}: ${replaceDigitsWithWords(quantity)} ${unit}</li>`;
        }
        ingredientsHtml += "</ul>";

        tableHtml += `<tr>
            <td>${name}</td>
            <td>${replaceDigitsWithWords(recipe)}</td>
            <td>${replaceDigitsWithWords(calories)}</td>
            <td>${ingredientsHtml}</td>
        </tr>`;
    }

    tableHtml += "</table>";
    document.getElementById("recipe-table").innerHTML = tableHtml;
}

generateRecipeTable();
