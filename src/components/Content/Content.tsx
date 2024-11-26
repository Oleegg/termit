import { Dispatch, SetStateAction, useState } from "react";
import MyInput from "../inputs/MyInput";
import './Content.css';
import { ITamble } from "../../App";
import { hasNoCyrillic, isMessageLength, isNumber, isUnicMessage, searchMessage } from "./helper";
import Modal from "../Modal/Modal";

interface IContent {
    table: ITamble[];
    containerSize: number | null;
    setTable: Dispatch<SetStateAction<ITamble[]>>;
    containerNumber: number;
    setContainerSize: Dispatch<SetStateAction<number | null>>
}

enum Names {
    Count = 'count',
    Enter = 'enter',
    Search = 'search'
}

const INPUTS = [
    { name: Names.Count, type: 'number', placeholder: 'Объем контейнера' },
    { name: Names.Enter, type: '', placeholder: 'Ввод сообщений' },
    { name: Names.Search, type: '', placeholder: 'Найти сообщение' },
]

const Content = ({ table, containerSize, setTable, containerNumber, setContainerSize }: IContent) => {

    const [count, setCount] = useState<number>()
    const [enter, setEnter] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const enterDataHandler = (value: any, name: string) => {
        console.log('-------', value, name);
        if (name === Names.Count) {
            isNumber(value) ? setContainerSize(value) : setErrorMessage('нужно ввести число больше 0')
        } else if (name === Names.Enter) {
            const tableElement: ITamble = { message: value, container: containerNumber || 1 }

            !value 
            ? setErrorMessage('Сообщение не может быть пустым') 
            : isMessageLength(value)
            ? setErrorMessage('Длина сообщения должна быть не более 10 символов')
            : hasNoCyrillic(value)
            ? setErrorMessage('Сообщение не должно содержать букв на кирилице') 
            : isUnicMessage(value, table) 
            ? setErrorMessage('Такое сообщение уже есть в базе') 
            :setTable([...table, tableElement]) 
            setEnter('')
        }else if(name === Names.Search){
            const result = searchMessage(value, table)
            if(result){
                setErrorMessage(`Сообщение находится в контейнере № ${result}`)
            }else {
                setErrorMessage('Данного сообщения нет в базе')
            }
        }
    }   

    const handleCloseModal = () =>{
        setErrorMessage('')
    }

    return (
        <div className="content">
            {INPUTS.map(({ name, placeholder, type }, i) =>
                <MyInput
                    key={i}
                    name={name}
                    placeholder={placeholder}
                    label={placeholder}
                    type={type}
                    value={
                        name === Names.Count
                            ? count
                            : name === Names.Enter
                                ? enter
                                : search}
                    setValue={
                        name === Names.Count
                            ? setCount
                            : name === Names.Enter
                                ? setEnter
                                : setSearch}
                    disabled={name === Names.Count
                        ? !!containerSize
                        : !containerSize}
                    enterDataHandler={enterDataHandler}
                />
            )}
            {errorMessage && <Modal isOpen={!!errorMessage} onClose={handleCloseModal} message={errorMessage} />}
        </div>
    )
}
export default Content