export function getPluralString(number) {
    if ([11, 12, 13, 14, 15, 16, 17, 18, 19].includes(number)) {
        return "Интервалов"
    }

    const lastDigit = number % 10;

    if (lastDigit === 1) return "Интервал";
    if (lastDigit >= 2 && lastDigit <= 4) return "Интервала";
    return "Интервалов";
}