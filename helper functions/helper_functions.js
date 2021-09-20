const checkForNaN = (args) => {
    args.forEach(num => {
        if(isNaN(Number(num))) {
            return true;
        }
        
    })
    return false;
}