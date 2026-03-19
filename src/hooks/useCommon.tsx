import statsTypes from "@/types/stats-types";

export function getFormat(format: boolean): string {
    let value = '';

    if (format) {
        value = statsTypes.LEGACY;
    } else {
        value = statsTypes.VINTAGE;
    }

    return value;
}

export function createModalLink(name: string, modalType: string): string {
    name = 'modal-' + modalType + '-' + name

    name = name.replace(/\s+/g, '-').toLowerCase();
    name = name.replace(' ', '-').toLowerCase();
    name = name.replace('\'', '-').toLowerCase();
    name = name.replace(',', '-').toLowerCase();
    name = name.replace('--', '-').toLowerCase();

    return name;
}