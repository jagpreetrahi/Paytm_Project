export function InputBox({label , placeholder , onChange}){
   return <div>
    <div className="py-2 font-medium text-sm text-left">
        {label}
    </div>
      <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200"/>
   </div>
}