from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users_db = {
    "1":  {'name': 'John', 'age': '30', 'gender': 'male'},
    "2":  {'name': 'Jane', 'age': '25'},
    "3":  {'name': 'Bob', 'age': '40', 'gender': 'male'},
    "4":  {'name': 'Alice', 'age': '35', 'gender': 'female'}
}

# EXAMPLE GET Request : Retrieve all users
@app.route('/users', methods=['GET'])
def get_all_users():
    return jsonify(users_db), 200

# EXAMPLE GET Request : Retrieve user for ID
@app.route('/users/<id>', methods=['GET']) # The default format for url params like <id> is a string
def get_user(id):
    user = users_db[id]
    return jsonify(user), 200
    # user = mongo.db.users.find_one({"_id": ObjectId(user_id)})

# EXAMPLE POST Request : Add a user using args for the data
@app.route('/users', methods=['POST'])  # url will look like this: .../users?id=5&name=Bob&age=25&gender=Male
def add_user():
    id = request.args.get('id')
    name = request.args.get('name')
    age = request.args.get('age')
    gender = request.args.get('gender')
    
    if not id or not name or not age or not gender:
        return jsonify({"error": "Missing query parameters"}), 400

    user = {"id": id, "name": name, "age": age, "gender": gender}
    users_db[id] = user
    return jsonify(user), 201

# EXAMPLE POST Request : Add a user using json for the data
@app.route('/users/json', methods=['POST'])  # url will look like this: .../users
def add_user_by_json():
    data = request.get_json()

    user = {"id": data.get('id'), 
            "name": data.get('name'), 
            "age": data.get('age')
           }
    users_db[data.get('id')] = user
    return jsonify(user), 201


# TO DO: CREATE A GET ENDPOINT TO GET ALL MALE USERS




# TO DO: CREATE A POST ENDPOINT TO ADD A NEW USER WITH A RANDOM AGE




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
