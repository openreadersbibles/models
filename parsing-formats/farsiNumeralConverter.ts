export function nonNumeralConverter(s: string): string {
    return s;
}

export function farsiNumeralConverter(s: string): string {
    let result = "";
    for (let i = 0; i < s.length; i++) {
        switch (s[i]) {
            case "0":
                result += "۰";
                break;
            case "1":
                result += "۱";
                break;
            case "2":
                result += "۲";
                break;
            case "3":
                result += "۳";
                break;
            case "4":
                result += "۴";
                break;
            case "5":
                result += "۵";
                break;
            case "6":
                result += "۶";
                break;
            case "7":
                result += "۷";
                break;
            case "8":
                result += "۸";
                break;
            case "9":
                result += "۹";
                break;
            default:
                result += s[i];
        }
    }
    return result;
}