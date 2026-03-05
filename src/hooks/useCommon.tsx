import statsTypes from "@/services/stats-types.tsx";

export function getFormat(format: string): string {
    if (format === 1) {
        return statsTypes.LEGACY;
    }
    if (format === 0) {
        return statsTypes.VINTAGE;
    }
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