from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.order import (
    OrderCreate,
    OrderUpdate,
    OrderResponse
)

from app.services.order_service import (
    create_order,
    get_order,
    get_orders,
    update_order,
    delete_order
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post(
    "",
    response_model=OrderResponse,
    status_code=201
)
def create(
    order: OrderCreate,
    db: Session = Depends(get_db)
):
    return create_order(
        db,
        order
    )


@router.get(
    "",
    response_model=list[OrderResponse]
)
def get_all(
    db: Session = Depends(get_db)
):
    return get_orders(db)


@router.get(
    "/{order_id}",
    response_model=OrderResponse
)
def get_one(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = get_order(
        db,
        order_id
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order


@router.put(
    "/{order_id}",
    response_model=OrderResponse
)
def update(
    order_id: int,
    order_in: OrderUpdate,
    db: Session = Depends(get_db)
):
    order = get_order(
        db,
        order_id
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return update_order(
        db,
        order,
        order_in
    )


@router.delete(
    "/{order_id}",
    response_model=OrderResponse
)
def delete(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = get_order(
        db,
        order_id
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return delete_order(
        db,
        order
    )