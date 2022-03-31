import Link from 'next/link';
import Head from "next/head";
import { useRouter } from 'next/router'
import { Key } from 'react';

const ServiceDetails = () => {
    
    const header =  sessionStorage.getItem("header");
    const service =  JSON.parse(sessionStorage.getItem("service")!);
    const router = useRouter();

    const handleClick = (e: any, service: object, detail:object) => {
      e.preventDefault()
      sessionStorage.setItem('detail', JSON.stringify(detail));
      router.push({
          pathname: '/checkout'
      })
  }
  
    return (
      <>
      <Head>
          <title>{header}</title>
      </Head>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Company name</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="d-flex" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Enterprise</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Support</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
              </ul>
              <form className="d-flex">
                <button className="btn btn-outline-success" type="submit">Sign up</button>
              </form>
            </div>
          </div>
        </nav>
        <div className='container'>
          <h3>{header}</h3>
        </div>
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">{service.name}</h1>
          <p className="lead">{service.description}</p>
        </div>
        <div className="container">
          <div className="card-deck mb-3 text-center">
            <div className='row'>
              {service && service.tiers && service.tiers.length > 0 && service.tiers.map((detail: any, index: Key | null | undefined) =>
                <div className='col-md-4' key={index}>
                  <div className="card mb-4 shadow-sm" key={index}>
                    <div className="card-header">
                      <h4 className="my-0 font-weight-normal">{detail.type}</h4>
                    </div>
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title">{detail.price} <small className="text-muted">{detail.period}</small></h1>
                      {detail && detail.descriptionList && detail.descriptionList.length > 0 && detail.descriptionList.map((desc: string, descIndex: Key | null | undefined) =>
                        <ul className="list-unstyled mt-3 mb-4" key={descIndex}>
                          <li>{desc}</li>
                        </ul>
                      )}
                      <p><Link href="/checkout">
                                <a className="btn btn-lg btn-block btn-primary" role="button" onClick={(e) => { handleClick(e, service, detail)}}>Buy now</a>
                            </Link>
                            </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <footer className="pt-4 my-md-5 pt-md-5 border-top">
          <div className='container'>
            <div className="row">
              <div className="col-md-3">
                <small className="d-block mb-3 text-muted">© 2017-2020</small>
              </div>
              <div className="col-md-3">
                <h5>Features</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="#">Cool stuff</a></li>
                  <li><a className="text-muted" href="#">Random feature</a></li>
                  <li><a className="text-muted" href="#">Team feature</a></li>
                  <li><a className="text-muted" href="#">Stuff for developers</a></li>
                  <li><a className="text-muted" href="#">Another one</a></li>
                  <li><a className="text-muted" href="#">Last time</a></li>
                </ul>
              </div>
              <div className="col-md-3">
                <h5>Resources</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="#">Resource</a></li>
                  <li><a className="text-muted" href="#">Resource name</a></li>
                  <li><a className="text-muted" href="#">Another resource</a></li>
                  <li><a className="text-muted" href="#">Final resource</a></li>
                </ul>
              </div>
              <div className="col-md-3">
                <h5>About</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="#">Team</a></li>
                  <li><a className="text-muted" href="#">Locations</a></li>
                  <li><a className="text-muted" href="#">Privacy</a></li>
                  <li><a className="text-muted" href="#">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
  
  export default ServiceDetails;
