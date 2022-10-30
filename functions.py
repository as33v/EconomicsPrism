import math


def get_coordinates(social, economics, ecologics):
    left_side_x = 0.25 + 0.25 * (social - economics)
    left_side_y = (math.sqrt(3) / 2) - math.sqrt(3) * abs(left_side_x - 0.5)
    left_side = ((left_side_x, left_side_y), (1, 0))

    right_side_x = 0.75 + 0.25 * (ecologics - social)
    right_side_y = (math.sqrt(3) / 2) - math.sqrt(3) * abs(right_side_x - 0.5)
    right_side = ((right_side_x, right_side_y), (0, 0))

    y = (social + economics + ecologics) / 3
    x, z = lines_intersection(left_side, right_side)

    return x, y, z


def lines_intersection(line1, line2):
    xdiff = (line1[0][0] - line1[1][0], line2[0][0] - line2[1][0])
    ydiff = (line1[0][1] - line1[1][1], line2[0][1] - line2[1][1])

    def det(a, b):
        return a[0] * b[1] - a[1] * b[0]

    div = det(xdiff, ydiff)
    if div == 0:
        return None

    d = (det(*line1), det(*line2))
    x = det(d, xdiff) / div
    y = det(d, ydiff) / div
    return x, y
