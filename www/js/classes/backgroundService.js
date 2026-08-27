export class BackgroundService {

    static plugin = window.Capacitor.Plugins.ForegroundService

    static async start({
        title = 'Pulse',
        body = 'Тренировка выполняется'
    } = {}) {

        await this.plugin.startForegroundService({
            id: 1,
            title,
            body,
            smallIcon: 'ic_stat_pulse',
            silent: true
        })

    }

    static async update({
        title = 'Pulse',
        body = 'Тренировка выполняется'
    } = {}) {

        await this.plugin.updateForegroundService({
            id: 1,
            title,
            body,
            smallIcon: 'ic_stat_pulse',
            silent: true
        })

    }

    static async stop() {

        await this.plugin.stopForegroundService()

    }

}