# app/services/customer_service.py

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.schemas.customer import CustomerCreate

def create_customer(
    db: Session,
    customer: CustomerCreate
):
    
    if len(customer.phone_number) < 10:
        raise HTTPException(
            status_code=400,
            detail="Phone number must be at least 10 digits"
        )
        
    existing_customer = (
        db.query(Customer)
        .filter(Customer.email == customer.email)
        .first()
    )

    if existing_customer:
        raise HTTPException(
            status_code=409,
            detail="Email already exists"
        )

    db_customer = Customer(
        **customer.model_dump()
    )

    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)

    return db_customer

def get_customers(db: Session):
    return db.query(Customer).all()

def get_customer(
    db: Session,
    customer_id: int
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer

def delete_customer(db, customer_id):
    customer = get_customer(db, customer_id)

    if customer.orders:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete customer with existing orders"
        )

    db.delete(customer)
    db.commit()

    return {"message": "Customer deleted"}