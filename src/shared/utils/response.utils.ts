const SuccessResponse = (message: string, data?: any)=>{
return {
    status: true,
    message: message,
    data
}
}

export default SuccessResponse