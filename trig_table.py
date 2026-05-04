"""
Generate a trigonometric table for angles 0–360° in configurable steps.

Columns: Angle (°), Radians, sin, cos, tan
tan is marked as "undefined" for 90° and 270° where it is not defined.

Usage:
    python trig_table.py            # default step = 5°
    python trig_table.py 1          # step = 1°
"""

import math
import sys


def generate_trig_table(step: int = 5) -> None:
    header = f"{'Angle(°)':<10} {'Radians':<12} {'sin':<10} {'cos':<10} {'tan':<12}"
    print(header)
    print("-" * len(header))

    angle = 0
    while angle <= 360:
        radians = math.radians(angle)
        sin_val = math.sin(radians)
        cos_val = math.cos(radians)

        if angle in (90, 270):
            tan_str = "undefined"
        else:
            tan_val = math.tan(radians)
            tan_str = f"{tan_val:.4f}"

        print(
            f"{angle:<10} {radians:<12.6f} {sin_val:<10.4f} {cos_val:<10.4f} {tan_str:<12}"
        )
        angle += step


if __name__ == "__main__":
    step = int(sys.argv[1]) if len(sys.argv) > 1 else 5
    generate_trig_table(step)
