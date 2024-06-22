import requests

url = "https://vision.foodvisor.io/api/1.0/en/analysis/"
# Replace 'your_actual_api_key' with the API key you obtained from the API provider.
headers = {
    "Authorization": "Api-Key <D4eNOwSr.KIlOuu8OplaF66g18Ndi8VO4f4Cg9tJ7>"
}

with open("risbol.jpg", "rb") as image:  # Replace with the path to your image file
    response = requests.post(url, headers=headers, files={"image": image})
    response.raise_for_status()  # This will raise an exception for HTTP errors.
    data = response.json()

# Use the data from the response as needed
print(data)
