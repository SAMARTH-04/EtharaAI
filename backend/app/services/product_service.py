from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.product import Product
from app.schemas.product import ProductCreate
from app.schemas.product import ProductUpdate



def create_product(
    db: Session,
    product: ProductCreate
):
    existing_product = (
        db.query(Product)
        .filter(Product.sku == product.sku)
        .first()
    )

    if existing_product:
        raise HTTPException(
            status_code=409,
            detail="SKU already exists"
        )

    db_product = Product(**product.model_dump())

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product

def get_products(db: Session):
    return db.query(Product).all()

from fastapi import HTTPException

def get_product(db: Session, product_id: int):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product

def delete_product(
    db: Session,
    product_id: int
):
    product = get_product(
        db,
        product_id
    )

    db.delete(product)

    db.commit()

    return {
        "message": "Product deleted"
    }
    
def update_product(
    db: Session,
    product_id: int,
    payload: ProductUpdate
):
    product = get_product(
        db,
        product_id
    )

    for key, value in payload.model_dump().items():
        setattr(product, key, value)

    db.commit()

    db.refresh(product)

    return product