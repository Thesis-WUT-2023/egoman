from typing import List

from fastapi import APIRouter, Depends, HTTPException
from pydio.api import Injector

from src.delivery.web.middleware.injector import get_injector
from src.domains.auth.interaces import InvalidToken, SessionExpired
from src.domains.sales.entities import FetchSalesRequest, Sales
from src.domains.sales.interfaces import IFetchSales, NoSalesFound
from src.domains.sales.queries import FetchSalesQuery
from src.gateways.auth import JWTBearer

router = APIRouter()


@router.post("/", dependencies=[Depends(JWTBearer())])
async def get_sales(
    date_bounds: FetchSalesRequest, injector: Injector = Depends(get_injector)
) -> List[Sales]:
    try:
        query: FetchSalesQuery = await injector.inject(IFetchSales)
        args = FetchSalesQuery.Args(date_bounds=date_bounds)
        sales = await query.invoke(args)
        return sales
    except NoSalesFound:
        raise HTTPException(403, detail="No Sales Found")
    except SessionExpired:
        raise HTTPException(403, detail="Session Expired")
    except InvalidToken:
        raise HTTPException(403, detail="Invalid token")
