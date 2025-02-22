import {Link} from 'react-router-dom' 
export const BottomWarning = ({label , buttonText , to}) => {
    return <div className="flex justify-center py-2 text-sm">
        <div>
            {label}
        </div>
        <Link to={to} className='pl-1 pointer curson-pointer underline'>
           {buttonText}
        </Link>

    </div>
}