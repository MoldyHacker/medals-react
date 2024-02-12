import React, { useState } from "react";
import Button from "react-bootstrap/Button";
// import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { PlusCircleFill } from "react-bootstrap-icons";

const NewCountry = props => {
	const [show, setShow] = useState(false);
	const [newCountryName, setNewCountryName] = useState("");
	const handleToastClose = () => {
		setShow(false);
		setNewCountryName("");
	};
	const handleToastKeyPress = (e) =>
		(e.keyCode ? e.keyCode : e.which) === 13 && handleAdd();
	const handleAdd = () => {
		newCountryName.length > 0 && props.onAdd(newCountryName);
		handleToastClose();
	};

	return (
		<React.Fragment>
			<Button
				variant="outline-success"
				onClick={() => setShow(true)}>
				<PlusCircleFill />
			</Button>
			<ToastContainer
				className="p-2"
				position="top-end"
				style={{ zIndex: 1 }}>
				<Toast
					onClose={() => handleToastClose()}
					show={show}
					delay={3000}
					onKeyDown={handleToastKeyPress}>
					<Toast.Header>
						<strong className="me-auto">Country Name Required</strong>
					</Toast.Header>
					<Toast.Body>
						<Form.Group controlId="modalForm1">
							<Form.Control
								type="text"
								name="newCountryName"
								onChange={(e) => setNewCountryName(e.target.value)}
								value={newCountryName}
								placeholder="Enter a name to add a new country."
								autoFocus
								autoComplete="off"
							/>
						</Form.Group>
					</Toast.Body>
				</Toast>
			</ToastContainer>
		</React.Fragment>
	);
};

export default NewCountry;
