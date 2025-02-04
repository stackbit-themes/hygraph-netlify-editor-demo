import type { Color } from './gql-types/gql-content-types';

export function colorToHex(hgColor: Color): string {
    let rgba = hgColor.rgba;
    if (
        !rgba ||
        typeof rgba.r === 'undefined' ||
        typeof rgba.g === 'undefined' ||
        typeof rgba.b === 'undefined' ||
        typeof rgba.a === 'undefined'
    ) {
        return '#ffffff';
    }
    function componentToHex(component: number) {
        const hex = component.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }
    let result = `#${componentToHex(rgba.r)}${componentToHex(rgba.g)}${componentToHex(rgba.b)}`;
    if (rgba.a >= 0 && rgba.a < 1) {
        result += componentToHex(Math.round(rgba.a * 255));
    }
    return result;
}

export function hexToColor(hex: string): Pick<Color, 'rgba'> {
    const alpha = hex.slice(7, 9);
    return {
        rgba: {
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16),
            a: alpha.length === 2 ? Math.round((parseInt(alpha, 16) / 255) * 100) / 100 : 1
        }
    };
}
