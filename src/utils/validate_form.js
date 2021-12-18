export default function validateForm (formData) {
    for (let pair of formData.entries()) {
        console.log(`${pair[0]} = ${pair[1]}`);
    }

    console.log("photo ada?: ", formData.get('photo'));

    let errors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!formData.get('name')) {
        errors.name = 'Name is required.';
    }

    if (formData.get('role') === 'host' || formData.get('role') === 'Host') {
        if (!formData.get('nip') && !formData.get('position')) {
            errors.nip = 'NIP is required.';
            errors.position = 'Position is required.';
        } else if (!formData.get('nip')) {
            errors.nip = 'NIP is required.';
        } else if (!formData.get('position')) {
            errors.position = 'Position is required.';
        }
    }

    if (!formData.get('email')) {
        errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.get('email'))) {
        errors.email = 'Email address is invalid.';
    }

    return errors;
};