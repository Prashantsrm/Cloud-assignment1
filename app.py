from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_number():
    data = request.json
    number = data.get('number')

    if number is None:
        return jsonify({"error": "Number is required"}), 400

    try:
        number = float(number)
        result = number ** 2  
        return jsonify({"result": result})
    except ValueError:
        return jsonify({"error": "Invalid number"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)