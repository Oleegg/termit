import { ITamble } from "../../App";

export const isNumber = (value: any): boolean =>{
    const pattern = /^\d+$/;  
    const number = parseFloat(value);
   
    if (pattern.test(value) && !isNaN(number) && number > 0) {
        return true; // Значение корректно
    } else {
        return false; // Значение некорректно
    }
}

export const isUnicMessage = (value: string, table: ITamble[]): boolean =>{  
    console.log('=table++++++',table, value);
    
    return table.some(item => item.message === value);
}

export const isMessageLength = (value: string): boolean =>{  
    console.log('=isMessageLength++++++', value);       
    return value.length > 10;
}

export const hasNoCyrillic = (input: string): boolean => {
    const pattern = /^[^а-яА-ЯЁё]*$/; // Все символы, кроме кириллицы
    console.log('=hasNoCyrillic++++++', !pattern.test(input))
    return !pattern.test(input);
};

export const searchMessage = (value: string, table: ITamble[]): number => {
const message = table.filter(item => item.message === value);
if(message.length){
    return message[0].container
}else{
    return 0
}

}