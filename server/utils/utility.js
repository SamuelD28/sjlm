/*  Author: Samuel Dube
    Date of creation: 201/07/16
    Date Last Modified: ******
    Description: Utility javascript file for the admin project
*/


let Utility = {};

Utility.DateMethod = {
    ParseFullDate: function(originalDate)
    {
        let parsedDate;
        let year    = originalDate.getFullYear();
        let month   = originalDate.getMonth() + 1;
        let day     = originalDate.getDate();
        
        year = String(year);
        
        if(month < 10)
            month = String("0" + month);
        if(day < 10)
            day = String("0" + day);
        else
        {
            month = String(month);
            day = String(day);
        }
        parsedDate = year + "-" + month + "-" + day;    
        return parsedDate;
    },
    ParseYear: function(parsedDate){
        return parsedDate.substring(0, 4);
    },
    ParseMonth: function(parsedDate){
        return parsedDate.substring(5,7);
    },
    ParseDay: function(parsedDate){
        return parsedDate.substring(8,10);
    }
};

module.exports = Utility;