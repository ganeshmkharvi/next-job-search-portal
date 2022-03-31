import Link from 'next/link';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Constants } from "@utility/constants";
import { useRouter } from 'next/router'

export default function Home() {

    const [isFetched, setIsFetched] = useState(false);
    const [services, setServices] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${Constants.URL.SERVICES}`)
            .then(response => response.json())
            .then(responseJson => {
                setServices(responseJson);
                setIsFetched(true);
            },
                err => {
                    console.log('error is ' + err);
                    setServices([]);
                    setIsFetched(true);
                });
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, service: { type: any; }) => {
        e.preventDefault()
        sessionStorage.setItem('service', JSON.stringify(service));
        router.push({
            pathname: `/services/${service.type}`
        })
    }

    const fetchServiceContent = () => {
        if (isFetched) {
            return <div className="container">
                <div className="row">
                    {services.map((service: any, index) => <div className="col-md-4" key={index}>
                        <h2>{service.name}</h2>
                        <p>{service.description}</p>
                        <p>
                            <Link href={`/services/${service.type}`}>
                                <a className="btn btn-secondary" role="button" onClick={(e) => { handleClick(e, service) }}>View details »</a>
                            </Link>
                        </p>

                    </div>
                    )}
                </div>
            </div>;
        } else {
            return <div className='d-flex align-items-center justify-content-center'>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>;
        }
    }

    const fetchContent = () => {
        return <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-3">Hello, world!</h1>
                    <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                    <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
                </div>
            </div>
            {fetchServiceContent()}
            <footer className="container">
                <p>© Company 2017-2020</p>
            </footer>
        </>;
    }

    return (
        <>
            <Head>
                <title>Next Job Search Portal</title>
            </Head>
            {fetchContent()}
        </>
    )
}
