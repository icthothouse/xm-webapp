export interface Container {
    create: <T>(...args: unknown[]) => T | null;
    remove: <T, R>(t?: T) => R;
}
