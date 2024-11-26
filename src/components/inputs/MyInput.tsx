import { Dispatch, SetStateAction } from 'react';
import './MyInput.css';

interface IMyInput {
    name: string;
    label: string;
    placeholder: string;
    value: any;
    setValue: Dispatch<SetStateAction<any>>;
    enterDataHandler: (v: any, name: string)=> void;
    disabled?: boolean;
    type?: string;
}

const MyInput = ({name, label,type='text',placeholder, value,setValue, enterDataHandler, disabled=false}: IMyInput) =>{
    
    return (
        <div className="my-input">
            <label className="my-label">
                {label}
            <div>
                <input 
                type={type} 
                placeholder={placeholder} 
                value={value} 
                onChange={(e)=>setValue(e.target.value)}
                disabled={disabled}
                />
                <button onClick={()=>enterDataHandler(value, name)}>ввод</button>
            </div>
            </label>
        </div>
    )
}
export default MyInput