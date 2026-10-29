#!/usr/bin/env python3
"""
Aanant Enterprises — Industrial Labelling Image Background Removal Tool
-----------------------------------------------------------------------
Processes raw product photographs (including iPhone/iPad .HEIC files) in:
  public/images/industrial-labelling-originals/<category>/

And exports transparent PNGs with alpha channels to:
  public/images/industrial-labelling/<category>/

Original photographs are NEVER overwritten or altered.
"""

import sys
import os
import json
import io
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
ORIGINALS_DIR = BASE_DIR / "public" / "images" / "industrial-labelling-originals"
PROCESSED_DIR = BASE_DIR / "public" / "images" / "industrial-labelling"
MANIFEST_FILE = BASE_DIR / "src" / "data" / "industrialLabellingManifest.json"

CATEGORIES = [
    "aluminium-name-plates",
    "trafolite-labelling",
    "sublimation-plates",
    "industrial-plates",
    "industrial-stickers",
    "panel-door-locks",
]

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff", ".heic"}

def update_manifest():
    """Scan processed images and update industrialLabellingManifest.json."""
    manifest = {}
    for cat in CATEGORIES:
        proc_folder = PROCESSED_DIR / cat
        files = []
        if proc_folder.exists():
            files = [
                f.name
                for f in sorted(proc_folder.iterdir())
                if f.is_file() and f.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"} and not f.name.startswith(".")
            ]
        manifest[cat] = files

    try:
        MANIFEST_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(MANIFEST_FILE, "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2)
        print(f"[OK] Image manifest synchronized: {MANIFEST_FILE.name}")
    except Exception as err:
        print(f"[!] Warning: Could not write manifest: {err}")

def check_dependencies():
    """Verify if rembg, Pillow, and pillow_heif are available."""
    try:
        from PIL import Image
    except ImportError:
        return False, None, None

    try:
        import pillow_heif
        pillow_heif.register_heif_opener()
    except ImportError:
        pass

    try:
        from rembg import remove
        return True, remove, Image
    except ImportError:
        return False, None, Image

def process_single_image(file_path, output_path, remove_fn, Image_cls):
    """Load an image (supporting HEIC, JPG, PNG, etc.), remove background, and save as transparent PNG."""
    try:
        # Open using PIL (with HEIF support if pillow_heif was registered)
        with Image_cls.open(file_path) as img:
            # Convert to RGB or RGBA
            if img.mode not in ("RGB", "RGBA"):
                img = img.convert("RGBA")
            
            # Save into memory buffer as PNG
            buffer = io.BytesIO()
            img.save(buffer, format="PNG")
            input_bytes = buffer.getvalue()

        # Remove background using rembg
        output_bytes = remove_fn(input_bytes)

        # Write transparent PNG
        with open(output_path, "wb") as out_file:
            out_file.write(output_bytes)

        return True, None
    except Exception as err:
        return False, str(err)

def process_category(category_name, remove_fn, Image_cls):
    """Process all images in a given category."""
    cat_orig = ORIGINALS_DIR / category_name
    cat_proc = PROCESSED_DIR / category_name

    if not cat_orig.exists():
        print(f"[-] Category directory does not exist: {cat_orig}")
        return 0, 0

    cat_proc.mkdir(parents=True, exist_ok=True)

    input_files = [
        f for f in sorted(cat_orig.iterdir())
        if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS and not f.name.startswith(".")
    ]

    if not input_files:
        return 0, 0

    print(f"\n[+] Processing '{category_name}' ({len(input_files)} original files found)...")
    processed_count = 0
    skipped_count = 0

    for file_path in input_files:
        output_filename = f"{file_path.stem}.png"
        output_path = cat_proc / output_filename

        # Skip if already processed and newer than original
        if output_path.exists() and output_path.stat().st_mtime >= file_path.stat().st_mtime:
            print(f"  [=] Up-to-date: {output_filename}")
            skipped_count += 1
            continue

        print(f"  [*] Processing {file_path.name} -> {output_filename}...")
        success, err = process_single_image(file_path, output_path, remove_fn, Image_cls)
        if success:
            print(f"  [OK] Saved transparent PNG: {output_path.name}")
            processed_count += 1
        else:
            print(f"  [!] Error processing {file_path.name}: {err}")

    return processed_count, skipped_count

def scan_status():
    """Check how many original images exist and how many have been processed."""
    print("=" * 70)
    print("Aanant Enterprises — Industrial Labelling Image Inventory")
    print("=" * 70)

    total_originals = 0
    total_processed = 0

    for cat in CATEGORIES:
        orig_folder = ORIGINALS_DIR / cat
        proc_folder = PROCESSED_DIR / cat

        orig_files = [
            f.name for f in orig_folder.iterdir()
            if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS
        ] if orig_folder.exists() else []

        proc_files = [
            f.name for f in proc_folder.iterdir()
            if f.is_file() and f.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}
        ] if proc_folder.exists() else []

        total_originals += len(orig_files)
        total_processed += len(proc_files)

        print(f"Category: {cat}")
        print(f"  - Originals: {len(orig_files)} {orig_files if orig_files else '(none uploaded yet)'}")
        print(f"  - Processed transparent PNGs: {len(proc_files)} {proc_files if proc_files else '(none processed yet)'}")

    print("-" * 70)
    print(f"Total original uploads: {total_originals}")
    print(f"Total processed transparent PNGs: {total_processed}")
    print("=" * 70)
    return total_originals, total_processed

def main():
    if "--status" in sys.argv:
        scan_status()
        update_manifest()
        return

    has_deps, remove_fn, Image_cls = check_dependencies()

    total_orig, total_proc = scan_status()

    if total_orig == 0:
        print("\nNotice: No product photographs found in 'public/images/industrial-labelling-originals/'.")
        print("Upload your raw product photographs into the category folders above.")
        print("Once uploaded, run: python scripts/remove_background.py")
        return

    if not has_deps:
        print("\n[!] The 'rembg' AI background removal library or 'pillow_heif' is not yet installed.")
        print("To install them, run:")
        print("    pip install rembg[cli] pillow pillow-heif onnxruntime")
        print("\nOnce installed, re-run this script to automatically cut out backgrounds into transparent PNGs.")
        sys.exit(1)

    print("\nStarting automated background removal for raw product photographs...")
    total_new = 0
    total_skip = 0

    target_category = None
    for arg in sys.argv[1:]:
        if arg in CATEGORIES:
            target_category = arg
            break

    categories_to_run = [target_category] if target_category else CATEGORIES

    for cat in categories_to_run:
        p, s = process_category(cat, remove_fn, Image_cls)
        total_new += p
        total_skip += s

    print(f"\nProcessing complete: {total_new} images processed, {total_skip} already up-to-date.")
    update_manifest()

if __name__ == "__main__":
    main()
