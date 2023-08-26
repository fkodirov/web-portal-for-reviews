import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";

interface RegistrationProps {
  show: boolean;
  onClose: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ show, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
              id="floatingInput"
              placeholder="Farkhod"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <Form.Label htmlFor="floatingInput">{t("name")}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="email"
              id="floatingInput"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Form.Label htmlFor="floatingInput">{t("email")}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="password"
              id="floatingPassword"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Form.Label htmlFor="floatingPassword">{t("psw")}</Form.Label>
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
