"""
利用信息技术制作三角函数表
Generate a trigonometric (sine) table from 1' to 90° (5400 minutes)
using the recurrence relation:
    sin(a_n) = sin(1') * cos(a_{n-1}) + cos(1') * sin(a_{n-1})
    cos(a_n) = sqrt(1 - sin^2(a_n))
"""

import math


def generate_trig_table():
    # sin 1' ≈ 2.908882046 × 10^(-4)
    s0 = 2.908882046e-4
    # cos 1' = sqrt(1 - sin^2(1'))
    c0 = math.sqrt(1 - s0 ** 2)

    # Output header
    print(f"{'Angle':<12} {'sin(angle)':<20} {'cos(angle)':<20}")
    print("-" * 52)

    # Output sin(1')
    angle_str = "0° 1'"
    print(f"{angle_str:<12} {s0:<20.10f} {c0:<20.10f}")

    # Initialize s and c
    s = s0
    c = c0

    # n starts at 2, loop until n > 5400
    n = 2
    while n <= 5400:
        # Recurrence: sin(a_n) = sin(1')*cos(a_{n-1}) + cos(1')*sin(a_{n-1})
        s_new = s * c0 + c * s0
        # cos(a_n) = sqrt(1 - sin^2(a_n))
        c_new = math.sqrt(1 - s_new ** 2)

        s = s_new
        c = c_new

        # Convert n minutes to degrees and minutes for display
        degrees = n // 60
        minutes = n % 60

        # Output every 1 minute value (print all, or just key angles)
        # Print every 10 minutes to keep output manageable
        if n % 10 == 0:
            print(f"{degrees}° {minutes}'".ljust(12) + f"{s:<20.10f} {c:<20.10f}")

        n = n + 1

    # Final output: sin(90°) should be ≈ 1.0
    print("-" * 52)
    print(f"Final: sin(90°) = {s:.10f} (expected: 1.0)")


if __name__ == "__main__":
    generate_trig_table()
