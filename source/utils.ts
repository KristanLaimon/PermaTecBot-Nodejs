export default class Utils {
    static capitalizeFirstLetter(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
}
