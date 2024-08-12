import React, { useEffect, useState} from 'react'
import { Separator } from "@/components/ui/separator"


interface DataProps {
		id: number;
		question: string;
		answer: string;
}
interface FlipCardProps {
		data: DataProps;
} 



const FlipCard:React.FC<FlipCardProps> = ({data}) => {
		const [flip, setFlip] = useState(false)

        useEffect(()=>{
          setFlip(false);
        },[data]);


	return (
		<div
			className={`card  min-w-[25vw] min-h-[50vh] w-full max-w-lg flex justify-center items-center relative rounded-md cursor-pointer border border-secondary text-center bg-[rgb(255,90,90)] bg-[linear-gradient(332deg,_rgba(255,90,90,1)_40%,_rgba(251,209,200,0.9809173669467787)_100%)] text-white  ${flip ? 'flip' : ''}`}
			onClick={() => setFlip(!flip)}
		>
			<div title='Click' className="front absolute p-5 text-center text-lg " >
				<div className=" w-full text-left flex flex-col justify-around items-start gap-5">
					<h3 className="text-xl font-bold">Question</h3>
					<Separator  className='bg-white'/>
					<p className=" w-full ">
					{data.question}
					</p>
				</div>
				
			</div>
			<div className="back absolute p-5 text-center text-lg " >
			<div className="text-left flex flex-col justify-around items-start gap-5 w-full ">
					<h3 className="text-xl font-bold">Explaination</h3>
					<Separator className='bg-white'/>
					<p className=" w-full ">
					{data.answer}
					</p>
				</div>
				</div>
		</div>
	)
}

export default FlipCard