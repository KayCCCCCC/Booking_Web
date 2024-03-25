const moment = require('moment');


export const isValidDate = (dateString) => {
    return moment(dateString, 'DD-MM-YYYY', true).isValid();
}