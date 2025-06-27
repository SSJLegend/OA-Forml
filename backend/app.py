from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Simulating a real world situation
# Generate the secret code at startup
# 10 = the value of digits, k = the amount of digits
SECRET_CODE = random.choices(range(10), k=10)
attempts = [] #In-memory storage
print(f"Secret code is: {SECRET_CODE}")  # Optional: for testing



# POST
@app.route('/api/crack_safe', methods=['POST'])
def add_attempt():
    data = request.get_json()
    code = data.get('code')                
    guess = [int(c) for c in code]
    time_taken = data.get('time_taken', 0)
    correct_position= [guess[i] == SECRET_CODE[i] for i in range(10)] #Checks if the digits are correct
    success = guess == SECRET_CODE

    # Attempts logging
    entry = {
        'attempts': len(attempts) + 1,
        'code': code,
        'correct_position': correct_position,
        'success': success,
    }
    
    if success:
        entry['time_taken'] = time_taken
        
    attempts.append(entry)
    return jsonify(entry), 201

# GET
@app.route('/api/crack_safe', methods=['GET'])
def get_attempts():
    return jsonify(attempts), 200

# DELETE
@app.route('/api/reset', methods=['DELETE'])
def reset():
    global SECRET_CODE
    SECRET_CODE = random.choices(range(10), k=10)
    print(f"New secret code: {SECRET_CODE}")
    return jsonify({"message": "Lock has been reset", "new_code": SECRET_CODE}), 200

# For an actual database
# @app.route('/adjust', methods=['PUT'])
# def updateAttempt():
    
#     return jsonify(attempts), 200

if __name__ == '__main__':
    app.run(debug=True)
