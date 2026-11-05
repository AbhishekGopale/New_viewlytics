import {useState, useEffect} from "react"

export const useDate = () => {
    const [currentDate, setCurrentDate] = useState('');
    useEffect(()=>{
        const date = new Date();
        let day = date.getDate();
        day = day <10 ? "0"+day : day;
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        let month = date.getMonth() +1;
        month = month <10 ?  '0' + month : month;
        const monthName = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        const fullDate = `${year}-${month}-${day}`;
        const newDateObj = {day,month,year,fullDate,dayName,monthName};
        setCurrentDate(newDateObj)
    },[]);

    return [currentDate]
}
