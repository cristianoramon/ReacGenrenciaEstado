import Capitulo from '@/data/model/Capitulo'
import AulaItem from './AulaItem'
import { useContext } from 'react'
import CursoContext from '@/context/CursoContext'

interface CapituloItemProps {
    capitulo: Capitulo
}

export default function CapituloItem(props: CapituloItemProps) {
    const { capitulo } = props
    const { aulaAtual,selecionarAulasCapituloConcluidas,selecionaStatusAulas } = useContext(CursoContext)

      return (
        <div className='text-zinc-300'>
            <div className="flex items-center gap-3 p-4 bg-zinc-900">
                <div
                    className={`
                     flex justify-center items-center
                      h-9 w-9 rounded-full ${selecionaStatusAulas ? 'bg-green-500':'bg-black'}
                      border border-zinc-400`}
                onClick={() => selecionarAulasCapituloConcluidas(capitulo)}
                >
                    {capitulo.ordem}
                </div>
                <span>{capitulo.titulo}</span>
            </div>
            <div className="p-4">
                {capitulo.aulas.map((aula) => {
                    return (
                        <AulaItem
                            key={aula.ordem}
                            aula={aula}
                            selecionada={aulaAtual.ordem === aula.ordem}
                        />
                    )
                })}
            </div>
        </div>
    )
}
