import statsTypes from "@/types/stats-types";

export function getFormat(format: number): string {
    let value = '';

    if (format === 1) {
        value = statsTypes.LEGACY;
    }

    if (format === 0) {
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