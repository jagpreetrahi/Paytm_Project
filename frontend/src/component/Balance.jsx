export const Balance = ({value}) => {
    return <div className="flex mt-3 ml-3">
        <div className="font-bold text-2xl">
           Your Balance
        </div>
        <div className="font-semiBold text-xl ml-4 flex flex-col justify-center">
          Rs  {value}
        </div>

    </div>
}