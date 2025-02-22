export function Button({label , onClick}){
     return <button onClick={onClick} className="font-medium  me-2 mb-2 text-sm rounded-lg w-full text-white bg-gray-800 hover:bg-gray-900 focus-outline-none focus:ring-4 focus:ring-gray-300 px-5 py-2.5">{label}</button>


}     