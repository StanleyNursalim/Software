from flask import Flask, request, render_template, redirect, jsonify, url_for, flash
import requests
import os

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Needed for flashing messages
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html', result="")

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)

    file = request.files['file']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)

    if file:
        # Save the file to the server
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        # Prepare the request to the external API
        url = "https://vision.foodvisor.io/api/1.0/en/analysis/"
        headers = {
            "Authorization": "Api-Key D4eNOwSr.KIlOuu8OplaF66g18Ndi8VO4f4Cg9tJ7"
        }

        with open(file_path, "rb") as image:
            try:
                response = requests.post(url, headers=headers, files={"image": image})
                response.raise_for_status()  # Raises an HTTPError for bad responses
                data = response.json()
                # Pass the data to the template to display
                return render_template('index.html', result=data)
            except requests.exceptions.HTTPError as err:
                flash(f"HTTP error occurred: {err}")
                return redirect(request.url)
            except Exception as err:
                flash(f"Other error occurred: {err}")
                return redirect(request.url)

if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
