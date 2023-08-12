import Link from "next/link"

const trendList = [
    {tag:"#Ukraine", posts:554},
    {tag:"#INDvsAU", posts:123},
    {tag:"#GPUs", posts:22}
] 

export default function Trending() {
  return (
    <div className="bg-neutral-900  rounded-2xl overflow-hidden">
        <h1 className="font-bold text-xl p-4">Trends for you</h1>
        {trendList.map((trend,index)=>{
            return (
                <Link href={trend.tag} key={index} >
                    <div className="p-2 hover:bg-neutral-800 transition">
                    <div className="font-bold px-2">{trend.tag}</div>
                    <div className="text-gray-500 text-sm px-2">{trend.posts} Posts</div>
                    </div>
                </Link >
            )
        })}
    </div>
  )
}
