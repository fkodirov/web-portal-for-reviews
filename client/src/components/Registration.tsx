import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { Context } from "../main";

interface RegistrationProps {
  show: boolean;
  onClose: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ show, onClose }) => {
  const { store } = useContext(Context);
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.registration(username, email, password);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("login")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="p-3">
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="text"
              id="username"
              placeholder="Farkhod"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Label htmlFor="username">{t("name")}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Label htmlFor="email">{t("email")}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Label htmlFor="password">{t("psw")}</Form.Label>
          </Form.Group>
          <Button className="btn btn-danger w-100 py-2" type="submit">
            {t("register")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Registration;
