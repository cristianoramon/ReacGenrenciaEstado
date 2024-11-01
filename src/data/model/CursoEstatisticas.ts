import Capitulo from "./Capitulo";

export default class CursoEstatisticas {
    constructor(private capitulos: Capitulo[]) {}

    qtdeDeAulas() {
        return this.capitulos.reduce((qtde, cap) => qtde + cap.aulas.length, 0)
    }

    aulasConcluidas() {
        return this.capitulos.reduce((qtde, cap) => {
            return qtde + cap.aulas.filter(a => a.concluida).length
        }, 0)
    }

    duracaoTotalEmSegundos() {
        return this.capitulos.reduce((duracao, cap) => {
            return duracao + cap.aulas.reduce((duracao, aula) => duracao + aula.duracao, 0)
        }, 0)
    }

    duracaoTotal() {
        const umaHora = 60 * 60
        const duracao = this.duracaoTotalEmSegundos()
        const horas = Math.floor(duracao / umaHora)
        const minutos = Math.floor((duracao % umaHora) / 60)
        return `${horas}h ${minutos}m`
    }

    duracaoConcluidaEmSegundos() {
        return this.capitulos.reduce((duracao, cap) => {
            return duracao + cap.aulas.filter(a => a.concluida).reduce((duracao, aula) => duracao + aula.duracao, 0)
        }, 0)
    }

    duracaoConcluida() {
        const umaHora = 60 * 60
        const duracao = this.duracaoConcluidaEmSegundos()
        const horas = Math.floor(duracao / umaHora)
        const minutos = Math.floor((duracao % umaHora) / 60)
        return `${horas}h ${minutos}m`
    }

    percentualConclusao() {
        const p = this.duracaoConcluidaEmSegundos() / this.duracaoTotalEmSegundos()
        return Math.floor(p * 100)
    }
}