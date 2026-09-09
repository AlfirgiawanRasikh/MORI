"""Derive web fonts without changing the licensed originals or optical-size axis.

Optional asset preparation: python with fonttools and brotli installed.
The ranges match the existing next/font/local declarations.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

root = Path(__file__).resolve().parent.parent / "src/assets/fonts"
for name, low, high in [("newsreader-roman", 300, 500), ("newsreader-italic", 300, 500), ("jakarta", 400, 600)]:
    font = TTFont(root / f"{name}.woff2")
    instantiateVariableFont(font, {"wght": (low, high)}, inplace=True)
    options = subset.Options()
    options.layout_features = ["*"]
    subsetter = subset.Subsetter(options=options)
    # English interface glyphs plus the typography used in the repository.
    subsetter.populate(unicodes=list(range(0x20, 0x7F)) + [0xA0, 0xB7, 0xD7, 0x2018, 0x2019, 0x201C, 0x201D, 0x2026])
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(root / f"{name}-web.woff2")
