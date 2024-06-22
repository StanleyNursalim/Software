document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        // Prepare the form data
        const formData = new FormData();
        formData.append('image', file);

        // Replace with your actual API key
        const apiKey = "D4eNOwSr.KIlOuu8OplaF66g18Ndi8VO4f4Cg9tJ7";

        // Send the file to the proxy server
        fetch("http://localhost:3000/proxy", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${apiKey}`
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data here
            console.log(data);
            displayResult(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
});

function displayResult(data) {
    const resultSection = document.getElementById('resultSection');
    const resultContent = document.getElementById('resultContent');

    // Clear previous results
    resultContent.innerHTML = '';

    // Display new results
    if (data.foods && data.foods.length > 0) {
        const food = data.foods[0];
        const nutritionInfo = document.createElement('div');
        nutritionInfo.innerHTML = `
            <h3>Nutrition Information</h3>
            <p>Calories: ${food.calories}</p>
            <p>Proteins: ${food.proteins}g</p>
            <p>Carbohydrates: ${food.carbohydrates}g</p>
            <p>Fats: ${food.fats}g</p>
        `;
        resultContent.appendChild(nutritionInfo);
    } else {
        resultContent.innerHTML = '<p>No nutrition information available.</p>';
    }

    resultSection.style.display = 'block';
}
