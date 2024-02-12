from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

Base = declarative_base()

class Customer(Base):
    __tablename__ = 'customers'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    instagram_username = Column(String)
    favorite_outfit_color = Column(String)

    def __init__(self, name, instagram_username, favorite_outfit_color):
        self.name = name
        self.instagram_username = instagram_username
        self.favorite_outfit_color = favorite_outfit_color

engine = create_engine('sqlite:///customerdatasystem.db', echo=True)
Base.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)
session = Session()

@app.route("/api/customer", methods=['GET', 'POST'])
def customer():
    if request.method == 'POST':
        data = request.get_json()
        name = data['name']
        instagram_username = data['instagram_username']
        favorite_outfit_color = data['favorite_outfit_color']

        customer = Customer(name, instagram_username, favorite_outfit_color)
        session.add(customer)
        session.commit()

        customer_data = {'id': customer.id, 'name': customer.name, 'instagram_username': customer.instagram_username, 'favorite_outfit_color': customer.favorite_outfit_color}
        
        return customer_data
    elif request.method == 'GET':
        customers = session.query(Customer).all()
        customers_data = [{'id': customer.id, 'name': customer.name, 'instagram_username': customer.instagram_username, 'favorite_outfit_color': customer.favorite_outfit_color} for customer in customers]
        return jsonify(customers_data)

@app.route("/api/customer/<int:id>", methods=['PUT', 'DELETE'])
def customer_by_id(id):
    if request.method == 'PUT':
        data = request.get_json()
        name = data['name']
        instagram_username = data['instagram_username']
        favorite_outfit_color = data['favorite_outfit_color']
        
        customer = session.query(Customer).filter_by(id=id).first()
        customer.name = name
        customer.instagram_username = instagram_username
        customer.favorite_outfit_color = favorite_outfit_color
        session.commit()

        customer_data = {'id': customer.id, 'name': customer.name, 'instagram_username': customer.instagram_username, 'favorite_outfit_color': customer.favorite_outfit_color}

        return customer_data
    elif request.method == 'DELETE':
        customer = session.query(Customer).filter_by(id=id).first()
        session.delete(customer)
        session.commit()
        return {"message": "customer data has been successfully deleted"}

if __name__ == "__main__":
    app.run(debug=True)