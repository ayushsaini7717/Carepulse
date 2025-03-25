interface props{
    num: number,
    text: string,
    icon: React.ReactNode;
};

const Adminval=({prop}: {prop:props})=>{
    return <>
        <div className="h-10vh border border-white pb-2">
            <div className="inline-flex items-center pt-2 px-3 gap-1">
                <span className="text-[32px]">
                    {prop.icon}
                </span>
                <span className="font-bold text-[32px]">
                    {prop.num}
                </span>
            </div>
            <div className="pl-3 font-semibold text-[16px] ">
                {prop.text}
            </div>
        </div>
    </>
}

export default Adminval;