export class KeepAwake {
    static async enable() {
        await window.Capacitor?.Plugins?.KeepAwake?.keepAwake();
    }

    static async disable() {
        await window.Capacitor?.Plugins?.KeepAwake?.allowSleep();
    }

    static async isEnabled() {
        const result = await window.Capacitor?.Plugins?.KeepAwake?.isKeptAwake();
        return result.isKeptAwake;
    }
}