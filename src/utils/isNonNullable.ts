export function isNonNullable<T>(data?: T): data is NonNullable<T> {
    return data !== undefined && data !== null;
}