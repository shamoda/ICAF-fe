import React, { Component } from "react";
import {
  Form,
  Container,
  Button,
  Modal,
  Spinner,
  Col,
  Row,
  Alert,
} from "react-bootstrap";
import swal from "sweetalert";
import Joi from "joi-browser";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import "./WorkshopConductor.css";
import WorkshopConductorDataService from "./WorkshopConductorDataService";
import InputField from "../../Commons/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class WorkshopRegistration extends Component {
  constructor(props) {
    super(props);
    //controlled inputs, should not be null as well..[ERR-LOG 01]
    this.state = {
      workshop: {
        email: "",
        fname: "",
        lname: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        qualification1: "",
        qualification2: "",
        post: "",
        password: "",
        passwordconfirmation: "",
        organization: "",
      },
      buttonError: "",
      loading: false,
      errors: {},
    };
    this.registerWorkshop = this.registerWorkshop.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  handleChange = ({ target: input }) => {
    let workshop = { ...this.state.workshop };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    (workshop[input.name] = input.value),
      this.setState(
        {
          workshop,
          errors,
        },
        () => console.log(this.state)
      );
  };

  passwordChange = ({ target: input }) => {
    let workshop = { ...this.state.workshop };
    const errors = { ...this.state.errors };
    (workshop[input.name] = input.value),
      this.setState({ workshop }, () => console.log(this.state));
    //verify passwords
    if (workshop.passwordconfirmation != workshop.password) {
      errors[input.name] = "Passwords don't Match ";
      this.setState({ errors });
    } else {
      delete errors[input.name];
      this.setState({ errors, passwordMatch: false });
    }
  };
  // Joi.ref('password')
  //Joi@13.4 Schema [Validation Library]
  Schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .label("Email"),
    fname: Joi.string().required().label("First Name").min(1),
    lname: Joi.string().required().label("Last Name").min(1),
    address: Joi.string().required().label("Address").max(30),
    city: Joi.string().required().label("City").min(1),
    state: Joi.string().required().label("State").min(1),
    password: Joi.string().min(8).max(10).required(),
    passwordconfirmation: Joi.string().required().label("Confirmed Password"),
    phone: Joi.string().required().label("Contact No").length(10),
    qualification1: Joi.string().required().label("Qualification 1"),
    qualification2: Joi.string().required().label("Qualification 2"),
    organization: Joi.string().required().label("Oraganization"),
    post: Joi.string().required().label("Post"),
  };

  validate() {
    const abortEarly = { abortEarly: false }; //1st Error priority disabled
    const { error } = Joi.validate(
      this.state.workshop,
      this.Schema,
      abortEarly
    );
    if (!error) return null; //if no result error return null
    const errors = {};
    for (let item of error.details) {
      //traversing in Joi error
      errors[item.path[0]] = item.message; //target input is given priority or first object [0]
    }
    return errors;
  }

  validateField({ name, value }) {
    const miniWorkshop = { [name]: value }; //Computed operators used [ES6]
    const miniSchema = { [name]: this.Schema[name] }; //Extracted property from Schema
    const { error } = Joi.validate(miniWorkshop, miniSchema);
    return error ? error.details[0].message : null;
  }
  displayError = (msg) => {
    this.setState({
      buttonError: msg,
    });
  };

  onFileChange(event) {
    if (event.target.files.length) {
      const { workshop } = { ...this.state };
      workshop.proposal = event.target.files[0];
      this.setState(
        {
          workshop,
        },
        () => console.log("File selected")
      );
    }
  }
  //registers a workshop
  registerWorkshop(event) {
    event.preventDefault();
    const { workshop } = this.state;
    //Object was used, Code 400 err, [ERR-LOG-02]
    // It uses the same format a form would use if the encoding type were set to "multipart/form-data".
    if (workshop.password !== workshop.passwordconfirmation) {
      this.displayError(
        "The passwords you entered do not match. Please re-enter your password"
      );
    } else {
      this.setState({ loading: true });
      let formData = new FormData();
      console.log(workshop.email);
      formData.append("email", workshop.email);
      formData.append("fName", workshop.fname);
      formData.append("lName", workshop.lname);
      formData.append("phone", workshop.phone);
      formData.append("address", workshop.address);
      formData.append("city", workshop.city);
      formData.append("state", workshop.state);
      formData.append("edu1", workshop.qualification1);
      formData.append("edu2", workshop.qualification2);
      formData.append("organization", workshop.organization);
      formData.append("post", workshop.post);
      formData.append("password", workshop.password);

      WorkshopConductorDataService.registerWorkshop(formData)
        .then((res) => {
          this.setState({ loading: false });
          swal({
            title: "Account Created SuccessFully  !!!",
            text: "Please enter your workshop Details here",
            icon: "success",
            button: "Ok",
          }).then((result) => {
            return this.props.history.push(
              `/workshopregistration/${workshop.email}`
            );
          });
        })
        .catch((err) => {
          this.setState({ loading: false });
          swal({
            title: "Oops!!",
            text: "Seems your email address is already exists. Please try again.",
            icon: "error",
            button: "ok",
          });
        });
    }
  }
  render() {
    const { workshop } = this.state;
    const { errors } = this.state; //properties
    const { registerWorkshop } = this; //methods
    return (
      <div>
        <Modal
          centered
          size="sm"
          show={this.state.loading}
          onHide={() => console.log("please wait...")}
        >
          <Modal.Header>
            <Modal.Title>
              <Spinner animation="border" /> Please wait...
            </Modal.Title>
          </Modal.Header>
        </Modal>
        <div className="workshopregistration-title">
          WORKSHOP PROPOSAL SUBMISSION
        </div>

        <Container className="workshopregistration-container">
          <Form autoComplete="off" onSubmit={registerWorkshop}>
            <div className="workshopregistration-head">
              <h4 className="workshopregistration-head-font">
                {" "}
                <FontAwesomeIcon icon={faUserShield} /> Personal Details
              </h4>
            </div>
            <Row>
              <Col>
                <InputField
                  FormLabel="First Name"
                  name="fname"
                  value={workshop.fname}
                  handleChange={this.handleChange}
                  FormText="Enter your first name here"
                  error={errors.fname}
                  type="text"
                  placeholder="Mahela"
                />
              </Col>
              <Col>
                <InputField
                  FormLabel="last Name"
                  name="lname"
                  value={workshop.lname}
                  handleChange={this.handleChange}
                  FormText="Enter your last name here"
                  error={errors.lname}
                  type="text"
                  placeholder="Jayawardhana"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  FormLabel="Email"
                  name="email"
                  value={workshop.email}
                  handleChange={this.handleChange}
                  FormText="Email would be your username"
                  error={errors.email}
                  type="text"
                  placeholder="example@gmail.com"
                />
              </Col>
              <Col>
                <InputField
                  FormLabel="Contact No"
                  name="phone"
                  value={workshop.phone}
                  handleChange={this.handleChange}
                  FormText="Enter your contact No here"
                  error={errors.phone}
                  type="number"
                  placeholder="77xxxxxxx"
                />
              </Col>
            </Row>
            <InputField
              FormLabel="Address"
              name="address"
              value={workshop.address}
              handleChange={this.handleChange}
              FormText="Enter your address here..."
              error={errors.address}
              type="text"
              placeholder="12/A MT Lavinia"
            />
            <Form.Row>
              <Col>
                <InputField
                  FormLabel="City"
                  name="city"
                  value={workshop.city}
                  handleChange={this.handleChange}
                  FormText="Enter your city here..."
                  error={errors.city}
                  type="text"
                  placeholder="Pettah"
                />
              </Col>
              <Col>
                <InputField
                  FormLabel="State"
                  name="state"
                  value={workshop.state}
                  handleChange={this.handleChange}
                  FormText="Enter your state here..."
                  error={errors.state}
                  type="text"
                  placeholder="Colombo"
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <InputField
                  FormLabel="Educational qualifications 1"
                  name="qualification1"
                  value={workshop.qualification1}
                  handleChange={this.handleChange}
                  FormText="Enter your educational qualifications here..."
                  error={errors.qualification1}
                  type="text"
                  placeholder="Bsc in Science"
                />
              </Col>
              <Col>
                <InputField
                  FormLabel="Educational qualifications 2"
                  name="qualification2"
                  value={workshop.qualification2}
                  handleChange={this.handleChange}
                  FormText="Enter your educational qualifications here..."
                  error={errors.qualification2}
                  type="text"
                  placeholder="Msc in Science"
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <InputField
                  FormLabel="Organization"
                  name="organization"
                  value={workshop.organization}
                  handleChange={this.handleChange}
                  FormText="Enter your educational qualifications here..."
                  error={errors.organization}
                  type="text"
                  placeholder="Msc in Science"
                />
              </Col>
              <Col>
                <InputField
                  FormLabel="Post"
                  name="post"
                  value={workshop.post}
                  handleChange={this.handleChange}
                  FormText="Enter your post holding in the organization..."
                  error={errors.post}
                  type="text"
                  placeholder="Head od Department"
                />
              </Col>
            </Form.Row>
            <h4
              className="workshopregistration-head-font"
              style={{ marginLeft: "400px", marginTop: "40px" }}
            >
              {" "}
              <FontAwesomeIcon icon={faUserShield} /> Create Account
            </h4>
            <div style={{ marginLeft: "-400px", marginTop: "30px" }}>
              <div className="workshopregistration-head">
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      defaultValue="email@example.com"
                      onChange={this.handleChange}
                      readOnly
                      value={workshop.email}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password1">
                  <Form.Label column sm="2">
                    Password
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      name="password"
                      onChange={this.handleChange}
                      value={workshop.password}
                      type="password"
                      placeholder="Password"
                    />
                    <Form.Text className="text-muted">
                      Enter a password with capital,simple letter,numeric values
                      and special characters..
                    </Form.Text>
                    {errors.password && (
                      <Alert variant="danger">
                        <Alert.Heading style={{ fontSize: "15px" }}>
                          {errors.password}
                        </Alert.Heading>
                      </Alert>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password2">
                  <Form.Label column sm="2">
                    Renter Password
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      name="passwordconfirmation"
                      onChange={this.passwordChange}
                      value={workshop.passwordconfirmation}
                      type="password"
                      placeholder="Password"
                    />
                    <Form.Text className="text-muted">
                      Match the passwords......
                    </Form.Text>
                    {errors.passwordconfirmation && (
                      <Alert variant="danger">
                        <Alert.Heading style={{ fontSize: "15px" }}>
                          {errors.passwordconfirmation}
                        </Alert.Heading>
                      </Alert>
                    )}
                  </Col>
                </Form.Group>
                <Button
                  type="submit"
                  variant="dark"
                  className="workshopregistration-button"
                  disabled={this.validate()}
                >
                  Submit
                </Button>
                {this.state.buttonError && (
                  <p className="paperregistration-error">
                    {this.state.buttonError}
                  </p>
                )}
              </div>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}
export default WorkshopRegistration;
