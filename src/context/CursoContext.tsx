import Capitulo from '@/data/model/Capitulo'
import { createContext, useReducer, useRef, useState } from 'react'
import capitulosFake from '@/data/constants/capitulos'
import Aula from '@/data/model/Aula'
import CursoEstatisticas from '@/data/model/CursoEstatisticas'

interface CursoContextProps {
    capitulos: Capitulo[]
    aulaAtual: Aula
    qtdeDeAulas: number
    aulasConcluidas: number
    duracaoTotal: string
    duracaoConcluida: string
    percentualConclusao: number
    selecionaStatusAulas:boolean
    selecionarAula: (aula: Aula) => void
    alternarConclusaoAula: (aula: Aula) => void
    selecionarAulasCapituloConcluidas: (capitulo: Capitulo) => void

}

const CursoContext = createContext<CursoContextProps>({} as any)

export function CursoProvider(props: any) {
    const [capitulos, setCapitulos] = useState(capitulosFake)
    const [aulaAtual, setAulaAtual] = useState(capitulosFake[0].aulas[0])
    const boolTodasAulas            = useRef(false);
    const cursoEstatisticas         = new CursoEstatisticas(capitulos)

    function alternarConclusaoAula(aulaSelecionada: Aula) {
        const novosCapitulos = capitulos.map((capitulo) => {
            const novasAulas = capitulo.aulas.map((aula) => {
                return aula.ordem === aulaSelecionada.ordem
                    ? { ...aula, concluida: !(aula.concluida ?? false) }
                    : aula
            })
            return { ...capitulo, aulas: novasAulas }
        })
        setCapitulos(novosCapitulos)
    }

    function selecionarAula(aula: Aula) {
        setAulaAtual(aula)
    }
    function selecionaTodasAulas() {
        boolTodasAulas.current = !boolTodasAulas.current;
        return boolTodasAulas.current;
    };

    function selecionarAulasCapituloConcluidas(capituloSelecionado: Capitulo) {

        const boolSelecao = selecionaTodasAulas();

        const aulasConcluidas = capitulos.map( (cap) =>{
            if ( cap.id === capituloSelecionado.id ) {
                return {...cap, aulas: cap.aulas.map( (aula) => {
                    return {...aula, concluida:boolSelecao}
                })}
            } else {
                return {...cap}
            }
        });
        setCapitulos(aulasConcluidas);
    }

    return (
        <CursoContext.Provider
            value={{
                capitulos,
                aulaAtual,
                selecionarAula,
                alternarConclusaoAula,
                selecionarAulasCapituloConcluidas,
                get selecionaStatusAulas() { return boolTodasAulas.current },
                get qtdeDeAulas() { return cursoEstatisticas.qtdeDeAulas() },
                get aulasConcluidas() { return cursoEstatisticas.aulasConcluidas() },
                get duracaoTotal() { return cursoEstatisticas.duracaoTotal() },
                get duracaoConcluida() { return cursoEstatisticas.duracaoConcluida() },
                get percentualConclusao() { return cursoEstatisticas.percentualConclusao() },
            }}
        >
            {props.children}
        </CursoContext.Provider>
    )
}

export default CursoContext
