const getSevenDaysBefore=(): string=> {
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the date 7 days before
    const sevenDaysBefore = new Date(currentDate);
    sevenDaysBefore.setDate(currentDate.getDate() - 7);
  
    // Format the result as "YYYY-MM-DD"
    const formattedDate = sevenDaysBefore.toISOString().split('T')[0];
  
    return formattedDate;
  }
  
export {getSevenDaysBefore}
  