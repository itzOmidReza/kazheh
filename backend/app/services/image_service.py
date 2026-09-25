import io
from pathlib import Path
import uuid
from fastapi import HTTPException, UploadFile, status
from PIL import Image, ImageOps

UPLOAD_DIR = Path("uploads")
ARTICLES_UPLOAD_DIR = UPLOAD_DIR / "articles"
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 Megabytes
MAX_HERO_WIDTH = 1600


def ensure_upload_dirs() -> None:
    """Ensure upload directories exist on disk."""
    ARTICLES_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


async def process_and_save_article_image(file: UploadFile) -> str:
    """
    Validates, optimizes, and converts uploaded image to WebP.
    Resizes image proportionally if width > 1600px.
    Returns relative public static URL (e.g. '/static/articles/<uuid>.webp').
    """
    ensure_upload_dirs()

    if not file.content_type or file.content_type.lower() not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="فرمت فایل مجاز نیست. لطفاً یک تصویر با فرمت JPG، PNG یا WebP انتخاب کنید.",
        )

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="حجم فایل ارسالی بیشتر از حد مجاز (۵ مگابایت) است.",
        )

    if len(content) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="فایل ارسالی خالی است.",
        )

    # Verify image integrity
    try:
        test_img = Image.open(io.BytesIO(content))
        test_img.verify()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="فایل ارسالی تصویر معتبری نیست یا آسیب دیده است.",
        )

    # Re-open for processing (verify() modifies stream)
    try:
        image = Image.open(io.BytesIO(content))

        # Auto-orient using EXIF metadata if present
        image = ImageOps.exif_transpose(image)

        # Proportional resize if larger than maximum hero width
        if image.width > MAX_HERO_WIDTH:
            ratio = MAX_HERO_WIDTH / float(image.width)
            new_height = int(float(image.height) * ratio)
            image = image.resize((MAX_HERO_WIDTH, new_height), Image.Resampling.LANCZOS)

        # Ensure correct color space for WebP
        if image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info):
            image = image.convert("RGBA")
        elif image.mode != "RGB":
            image = image.convert("RGB")

        filename = f"{uuid.uuid4().hex}.webp"
        file_path = ARTICLES_UPLOAD_DIR / filename

        image.save(file_path, format="WEBP", quality=82, method=6)
        return f"/static/articles/{filename}"
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"خطا در پردازش و ذخیره‌سازی تصویر: {str(e)}",
        )

