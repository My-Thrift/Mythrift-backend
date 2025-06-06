import moment from "moment-timezone"

export const calculateVendorPayDate = (transactionDate: Date)=>{
    try {
        const day = transactionDate.getDay()

        if([5, 6, 0].includes(day)){
            const daysToAdd = (8 - day) % 7
            const addDay = addDayToVendor(transactionDate, daysToAdd)
            return addDay
        }
        else if([1, 2].includes(day)){
            const daysToAdd = (3 - day) 
            const addDay = addDayToVendor(transactionDate, daysToAdd)
            return addDay
        }
        else if([3, 4].includes(day)){
            const daysToAdd = (5 - day) 
            const addDay = addDayToVendor(transactionDate, daysToAdd)
            return addDay
        }
    } catch (error) {
        throw error
    }
}



const addDayToVendor = (date: Date, days: number)=>{
    try {
        return moment(date).add(days, 'days').toDate()
    } catch (error) {
        throw error
    }
}