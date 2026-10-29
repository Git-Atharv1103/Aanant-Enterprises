# Industrial Labelling — Original Photography Upload Directory

Store your raw, unedited camera photographs here.

## Directory Structure
- `aluminium-name-plates/`: Raw photographs of aluminium nameplates
- `trafolite-labelling/`: Raw photographs of trafolite labels
- `sublimation-plates/`: Raw photographs of sublimation plates
- `industrial-plates/`: Raw photographs of industrial plates
- `industrial-stickers/`: Raw photographs of industrial stickers
- `panel-door-locks/`: Raw photographs of panel door locks

## Background Removal Workflow
1. Upload your original camera photos (JPG/PNG) into the appropriate category folder above.
2. Run the automated background removal tool (`python scripts/remove_background.py`).
3. The script processes each photo, cuts out the product with genuine alpha transparency, and places the transparent PNG in `public/images/industrial-labelling/<category>/`.
4. Your original files here in `industrial-labelling-originals/` are **never overwritten or altered**.

