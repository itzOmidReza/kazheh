from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin, get_db, get_optional_admin
from app.models.admin_user import AdminUser
from app.schemas.article import (
    ArticleCreate,
    ArticleListItem,
    ArticleResponse,
    ArticleUpdate,
)
from app.services.article_service import ArticleService
from app.services.image_service import process_and_save_article_image

router = APIRouter(prefix="/articles", tags=["Articles"])


# 0. ADMIN ONLY: Upload and optimize article cover image
@router.post(
    "/upload-image",
    response_model=dict[str, str],
    status_code=status.HTTP_201_CREATED,
    summary="Upload and optimize article cover image (Admin Only)",
)
async def upload_article_image(
    file: UploadFile = File(...),
    current_admin: AdminUser = Depends(get_current_admin),
):
    url = await process_and_save_article_image(file)
    return {"url": url}


# 1. PUBLIC (+ admin aware): List articles
@router.get(
    "",
    response_model=list[ArticleListItem],
    status_code=status.HTTP_200_OK,
    summary="List articles (published only, unless explicitly requested by an admin)",
)
def list_articles(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    published_only: bool = Query(
        default=True,
        description=(
            "Public default is true (published articles only). Sending false "
            "requires a valid admin Bearer token and returns drafts too."
        ),
    ),
    db: Session = Depends(get_db),
    current_admin: AdminUser | None = Depends(get_optional_admin),
):
    # Drafts must never leak to anonymous callers, so `published_only=false`
    # is only honoured for an authenticated admin.
    if not published_only and current_admin is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin authentication is required to list unpublished articles.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return ArticleService.get_articles(
        db=db, skip=skip, limit=limit, published_only=published_only
    )


# 2. ADMIN ONLY: List all articles (including drafts)
@router.get(
    "/admin/all",
    response_model=list[ArticleListItem],
    status_code=status.HTTP_200_OK,
    summary="List all articles including drafts (Admin Only)",
)
def list_all_articles_admin(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=100),
    published_only: bool = Query(default=False),
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    return ArticleService.get_articles(
        db=db, skip=skip, limit=limit, published_only=published_only
    )


# 3. ADMIN ONLY: Get single article by ID (including drafts)
@router.get(
    "/admin/{article_id}",
    response_model=ArticleResponse,
    status_code=status.HTTP_200_OK,
    summary="Get article by ID including drafts (Admin Only)",
)
def get_article_by_id_admin(
    article_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    article = ArticleService.get_by_id(db=db, article_id=article_id)
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Article with ID {article_id} not found.",
        )
    return article


# 4. PUBLIC (+ admin aware): Read single article by slug
@router.get(
    "/{slug}",
    response_model=ArticleResponse,
    status_code=status.HTTP_200_OK,
    summary="Get article by slug (drafts are only visible to authenticated admins)",
)
def get_article_by_slug(
    slug: str,
    db: Session = Depends(get_db),
    current_admin: AdminUser | None = Depends(get_optional_admin),
):
    article = ArticleService.get_by_slug(
        db=db,
        slug=slug,
        # Anonymous visitors only see published articles; admins also get drafts.
        published_only=current_admin is None,
    )
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Article '{slug}' not found.",
        )
    return article


# 5. ADMIN ONLY: Create article
@router.post(
    "",
    response_model=ArticleResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new article (Admin Only)",
)
def create_article(
    payload: ArticleCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    return ArticleService.create_article(db=db, article_in=payload, author_id=current_admin.id)


# 6. ADMIN ONLY: Update article
@router.patch(
    "/{article_id}",
    response_model=ArticleResponse,
    status_code=status.HTTP_200_OK,
    summary="Update an article (Admin Only)",
)
def update_article(
    article_id: int,
    payload: ArticleUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    article = ArticleService.get_by_id(db=db, article_id=article_id)
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Article with ID {article_id} not found.",
        )
    return ArticleService.update_article(db=db, db_article=article, update_in=payload)


# 7. ADMIN ONLY: Delete article
@router.delete(
    "/{article_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete an article (Admin Only)",
)
def delete_article(
    article_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    article = ArticleService.get_by_id(db=db, article_id=article_id)
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Article with ID {article_id} not found.",
        )
    ArticleService.delete_article(db=db, db_article=article)
    return None