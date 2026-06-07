from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.product import ProductCreate, ProductUpdate
from app.schemas.product import ProductResponse

from app.services.product_service import create_product, delete_product, get_products, get_product, update_product

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post(
    "",
    response_model=ProductResponse,
    status_code=201
)
def create(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    return create_product(
        db,
        product
    )
    
    
@router.get(
    "",
    response_model=list[ProductResponse]
)
def get_all(
    db: Session = Depends(get_db)
):
    return get_products(db)

@router.get(
    "/{product_id}",
    response_model=ProductResponse
)
def get_one(
    product_id: int,
    db: Session = Depends(get_db)
):
    return get_product(
        db,
        product_id
    )
    
@router.put(
    "/{product_id}",
    response_model=ProductResponse
)
def update(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db)
):
    return update_product(
        db,
        product_id,
        product
    )
    
@router.delete("/{product_id}")
def delete(
    product_id: int,
    db: Session = Depends(get_db)
):
    return delete_product(
        db,
        product_id
    )