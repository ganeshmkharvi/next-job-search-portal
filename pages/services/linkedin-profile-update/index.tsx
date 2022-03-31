import React from 'react';
import ServiceDetails from 'pages/services/service-details';

const LinkedinProfileUpdate = () => {
    sessionStorage.setItem('header', 'Welcome to Linkedin Profile Update Service');
     return (<ServiceDetails/>);
}

export default LinkedinProfileUpdate;
