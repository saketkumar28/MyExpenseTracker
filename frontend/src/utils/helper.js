export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export const getInitials = (name) => {
    if (!name) return '';

    const names = name.split(' ');
    let initials = "";

    for (let i = 0; i < Math.min(names.length, 2); i++) {
        if (names[i] && names[i][0]) {
            initials += names[i][0];
        }
    }

    return initials.toUpperCase();
};

export const addThousandsSeperator = (num) => {
    if(num == null || isNaN(num)) return "";
    const [integerPart, fractionalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}

export const prepareExpenseData = (data = []) => {
    const charData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));
    return charData;
}