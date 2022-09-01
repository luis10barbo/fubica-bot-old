export function isStringNumber(str:string | null): boolean {
    if (typeof str !== "string") return false
    
    if (str.trim() === "") return false

    return !Number.isNaN(Number(str));
}