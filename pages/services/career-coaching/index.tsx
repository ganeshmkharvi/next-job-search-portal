import React from 'react';
import ServiceDetails from 'pages/services/service-details';

const CareerCoaching = () => {
   sessionStorage.setItem('header', 'Welcome to Career Coaching Service');
   return (<ServiceDetails/>);
}

export default CareerCoaching;
