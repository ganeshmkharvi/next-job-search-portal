import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Constants } from "@utility/constants";
import Link from 'next/link';
import { useRouter } from 'next/router'

const Checkout = () => {
    const [validated, setValidated] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const service = JSON.parse(sessionStorage.getItem("service")!);
    const detail = JSON.parse(sessionStorage.getItem("detail")!);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        const isValid = form.checkValidity();
        event.preventDefault();
        event.stopPropagation();

        if (!isValid) {
            setValidated(true);
            return;
        }

        var requestBody = {
            "serviceVariant": service.id,
            "billingAddress": {
                "firstName": event.target.firstName.value,
                "lastName": event.target.lastName.value,
                "email": event.target.email.value,
                "country": event.target.country.value,
                "state": event.target.state.value,
                "zip": event.target.zip.value,
            },
            "payment": {
                "mode": "payPal", //Todo: //logic needs to be changed if we add other payment modes
                "name": event.target.cardName.value,
                "number": event.target.cardNumber.value,
                "expiration": event.target.expiration.value,
                "cvv": event.target.cvv.value
            }
        }

        setValidated(false);

        if (isValid) {
            saveCheckout(requestBody, event);
        }
    };

    const saveCheckout = (requestBody: object, event: any) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };

        fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${Constants.URL.CHECKOUT}`, requestOptions).then(function (response) {
            scrollToTop();
            if (response.status === Constants.STATUS_CODE.STATUS_201) {
                setIsSuccess(true);
                setIsFetched(true);
                event.target.reset()
                return;
            }
            setIsSuccess(false);
            setIsFetched(true);
        }),
            (            err: string) => {
                setIsSuccess(false);
                console.log('error is ' + err);
                scrollToTop();
            };
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smooth scrolling
        });
    };

    const displayMessage = () => {
        if (isFetched) {
            if (isSuccess) {
                return <div className="alert alert-success" role="alert">
                    Your order has been placed successfully. You can click on the Home link to return to home page.
                </div>
            } else {
                return <div className="alert alert-danger" role="alert">
                    Your order was not placed. Please try after sometime.
                </div>
            }
        } else {
            return <></>
        }
    }

    return (
        <div className="container">
            <div className="py-5 text-center">
                <h2>Checkout form</h2>
                <p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
            </div>
            <p>
                <Link href='/'>
                    <a className="btn btn-lg btn-block btn-primary" role="button">Home Page</a>
                </Link></p>
            {displayMessage()}
            <div className="col-md-4 order-md-2 mb-4 py-5 text-left float-end">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                    <span className="badge badge-secondary badge-pill">3</span>
                </h4>
                <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">{service?.name}</h6>
                            <small className="text-muted">{detail?.type}</small>
                        </div>
                        <span className="text-muted">{detail?.price}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>{detail?.price}</strong>
                    </li>
                </ul>
            </div>

            <div className="py-5 text-left">
                <h4 className="mb-3">Billing address</h4>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                name="firstName"
                            />
                            <Form.Control.Feedback type="invalid">
                                Valid first name is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">
                                Valid last name is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="you@example.com"
                                name="email"
                            />
                            <Form.Control.Feedback type="invalid">
                                Valid email is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3 mt-3">
                        <Form.Group as={Col} md="3" controlId="validationCustomCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Select className="custom-select d-block w-100" name="country" required>
                                <option value="">Choose...</option>
                                <option value="1">United States</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please select a valid country.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                            <Form.Label>State</Form.Label>
                            <Form.Select className="custom-select d-block w-100" name="state" required>
                                <option value="">Choose...</option>
                                <option value="1">California</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control type="text" placeholder="Zip" name="zip" required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid zip.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <h4 className="mb-3">Payment</h4>
                        <Form.Check
                            type='radio'
                            defaultChecked
                            required
                            label="PayPal"
                            name="payPalmode"
                            feedback="You must select payment before submitting."
                            feedbackType="invalid"
                        />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Name on Card</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="cardName"
                            />
                            <Form.Text className="text-muted">
                                Full name as displayed on card
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Name on card is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Credit card number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="cardNumber"
                            />
                            <Form.Control.Feedback type="invalid">
                                Credit card number is required
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                            <Form.Label>Expiration</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="expiration"
                            />
                            <Form.Control.Feedback type="invalid">
                                Expiration date required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="cvv"
                            />
                            <Form.Control.Feedback type="invalid">
                                Security code required
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Continue to Checkout</Button>
                </Form>
            </div>
        </div>
    );
}

export default Checkout;
