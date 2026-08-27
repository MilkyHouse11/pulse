export class Type {
    static WORK = 'work'
    static REST = 'rest'

    static isValid(type) {
        return [Type.REST, Type.WORK].includes(type)
    }
}