from flask import Flask, send_from_directory
import os

# Initialize Flask with the current directory as the static folder
# static_url_path='' allows serving files from the root (e.g. /style.css instead of /static/style.css)
app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    print("Starting BrandBase server at http://localhost:5000")
    app.run(debug=True, port=5000)
