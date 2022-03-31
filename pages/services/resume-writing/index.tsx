import React from 'react';
import ServiceDetails from 'pages/services/service-details';

const ResumeWriting = () => {
    sessionStorage.setItem('header', 'Welcome to Resume Writing Service');
    return (<ServiceDetails />);
}

export default ResumeWriting;
