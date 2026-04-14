#!/usr/bin/env python3
"""Prepare ValueStrip PNGs.

Premium website + dealer dashboard: copied as-is from ``public/screen-q2/`` (no background
removal — preserves the exported artwork).

WhatsApp: edge flood-fill removes the checkerboard backdrop in ``raw-product-whatsapp.png``.
"""

from __future__ import annotations

import shutil
import sys
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SCREEN_Q2 = PUBLIC / "screen-q2"


def flood_mask_from_seed(
    bgr: np.ndarray, seed_x: int, seed_y: int, lo: int, hi: int
) -> np.ndarray:
    h, w = bgr.shape[:2]
    fill_mask = np.zeros((h + 2, w + 2), np.uint8)
    flags = 4 | (1 << 8) | cv2.FLOODFILL_MASK_ONLY
    work = bgr.copy()
    cv2.floodFill(
        work,
        fill_mask,
        (int(seed_x), int(seed_y)),
        (0, 0, 0),
        (lo, lo, lo),
        (hi, hi, hi),
        flags,
    )
    return fill_mask[1:-1, 1:-1].astype(bool)


def edge_seeds(w: int, h: int, step: int) -> list[tuple[int, int]]:
    seeds: list[tuple[int, int]] = []
    for x in range(0, w, step):
        seeds.append((x, 0))
        seeds.append((x, h - 1))
    for y in range(0, h, step):
        seeds.append((0, y))
        seeds.append((w - 1, y))
    seeds.extend([(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1)])
    seen = set()
    out = []
    for sx, sy in seeds:
        if 0 <= sx < w and 0 <= sy < h and (sx, sy) not in seen:
            seen.add((sx, sy))
            out.append((sx, sy))
    return out


def flood_reachable_from_edges(bgr: np.ndarray, lo: int, hi: int) -> np.ndarray:
    h, w = bgr.shape[:2]
    accum = np.zeros((h, w), dtype=bool)
    step = max(10, min(w, h) // 28)
    for sx, sy in edge_seeds(w, h, step):
        accum |= flood_mask_from_seed(bgr, sx, sy, lo, hi)
    return accum


def remove_backdrop(bgr: np.ndarray, lo: int, hi: int) -> np.ndarray:
    reachable = flood_reachable_from_edges(bgr, lo, hi)
    alpha = np.where(reachable, 0, 255).astype(np.uint8)
    return np.dstack([bgr, alpha])


def main() -> None:
    jobs: list[tuple[Path, Path, str, int]] = [
        (SCREEN_Q2 / "3.png", PUBLIC / "agnt-visual-premium-website.png", "copy", 0),
        (PUBLIC / "raw-product-whatsapp.png", PUBLIC / "agnt-visual-whatsapp-agent.png", "flood", 10),
        (SCREEN_Q2 / "2.png", PUBLIC / "agnt-visual-dealer-dashboard.png", "copy", 0),
    ]
    for src, dst, mode, flood_tol in jobs:
        if not src.is_file():
            print(f"skip missing: {src}", file=sys.stderr)
            continue
        if mode == "copy":
            shutil.copyfile(src, dst)
            print(f"wrote {dst.name} (copy from {src.relative_to(PUBLIC)})")
            continue
        im = cv2.imread(str(src), cv2.IMREAD_COLOR)
        if im is None:
            print(f"read fail: {src}", file=sys.stderr)
            sys.exit(1)
        out = remove_backdrop(im, lo=flood_tol, hi=flood_tol)
        cv2.imwrite(str(dst), out)
        print(f"wrote {dst.name} ({mode})")


if __name__ == "__main__":
    main()
