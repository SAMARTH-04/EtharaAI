from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.product import Product
from app.models.customer import Customer
from fastapi import HTTPException
from app.schemas.order import OrderCreate, OrderUpdate


def create_order(
    db: Session,
    order_in: OrderCreate
):

    product = (
        db.query(Product)
        .filter(Product.id == order_in.product_id)
        .first()
    )
    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )   
    customer = (
    db.query(Customer)
    .filter(Customer.id == order_in.customer_id)
    .first()
)
    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )
    if product.stock_quantity < order_in.quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient inventory"
        )
    product.stock_quantity -= order_in.quantity
    total_amount = (
        product.price *
        order_in.quantity
    )
    order = Order(
        customer_id=order_in.customer_id,
        product_id=order_in.product_id,
        quantity=order_in.quantity,
        total_amount=total_amount
    )

    db.add(order)
    db.commit()
    db.refresh(order)

    return order

def get_order(db: Session, order_id: int) -> Optional[Order]:
    return db.query(Order).filter(Order.id == order_id).first()


def get_orders(db: Session, skip: int = 0, limit: int = 100):

    orders = db.query(Order).offset(skip).limit(limit).all()

    result = []

    for o in orders:
        result.append({
            "id": o.id,
            "customer_id": o.customer_id,
            "customer_name": o.customer.full_name,
            "product_id": o.product_id,
            "product_name": o.product.name,
            "quantity": o.quantity,
            "total_amount": o.total_amount
        })

    return result


def update_order(db: Session, order: Order, order_in: OrderUpdate) -> Order:
    order_data = order_in.dict(exclude_unset=True)
    for field, value in order_data.items():
        setattr(order, field, value)
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


def delete_order(db: Session, order: Order) -> Order:
    db.delete(order)
    db.commit()
    return order
