import Area from "@/components/template/Area";

export default function Temp(){

    return (
        <>
        <div className="flex flex-col">
            <div>   1</div>
            <div>   2</div>
            <div>   2</div>
            <div>   2</div>

        </div>
        <div className="flex flex-col gap-5 p-20">
            <Area titulo="Revisão" cor="sky">
                 <div>1 </div>
                 <div>2 </div>
                 <div>3 </div>                    
            </Area>
            <Area titulo="Revisão" sumario="Sumário" cor="sky">
                 <div>1 </div>
                 <div>2 </div>
                 <div>3 </div>                    
            </Area>
        </div>
        </>
    )
}