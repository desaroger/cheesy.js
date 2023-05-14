
export function classNameToChar(className: string): string {
    const mapping: Record<string, string> = {
        'Empty': ' ',
        'Pawn': 'p',
    }
    if (mapping[className]) {
        return mapping[className];
    }

    throw new Error(`Class name '${className}' not supported.`);
}
