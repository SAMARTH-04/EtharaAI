from fastapi import FastAPI

from app.db.database import Base
from app.db.database import engine

from app.routers import product
from app.routers import customer
from app.routers import order
from app.routers import dashboard 
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management System"
)

app.include_router(product.router)  
app.include_router(customer.router)
app.include_router(order.router)
app.include_router(dashboard.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


