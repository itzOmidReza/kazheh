from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin, get_db
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


# 1. PUBLIC: List published articles
@router.get(
    "",
    response_model=list[ArticleListItem],
    status_code=status.HTTP_200_OK,
    summary="List published articles (Public)",
)
def list_published_articles(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return ArticleService.get_articles(db=db, skip=skip, limit=limit, published_only=True)


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


# 4. PUBLIC: Read single article by slug
@router.get(
    "/{slug}",
    response_model=ArticleResponse,
    status_code=status.HTTP_200_OK,
    summary="Get published article by slug (Public)",
)
def get_article_by_slug(
    slug: str,
    db: Session = Depends(get_db),
):
    article = ArticleService.get_by_slug(db=db, slug=slug, published_only=True)
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