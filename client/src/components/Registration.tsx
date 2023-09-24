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

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.username) {
      newErrors.username = t("usernameRequired");
      valid = false;
    } else {
      newErrors.username = "";
    }

    if (!formData.email) {
      newErrors.email = t("emailRequired");
      valid = false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formData.email
      )
    ) {
      newErrors.email = t("invalidEmail");
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.password) {
      newErrors.password = t("passwordRequired");
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = t("passwordTooShort");
      valid = false;
    } else {
      newErrors.password = "";
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      store.registration(formData.username, formData.email, formData.password);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("register")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="p-3" noValidate>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="text"
              id="username"
              placeholder="Farkhod"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setFormErrors({
                  ...formErrors,
                  username: "",
                });
              }}
              isInvalid={!!formErrors.username}
            />
            <Form.Label htmlFor="username">{t("name")}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formErrors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="email"
              id="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setFormErrors({
                  ...formErrors,
                  email: "",
                });
              }}
              isInvalid={!!formErrors.email}
            />
            <Form.Label htmlFor="email">{t("email")}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setFormErrors({
                  ...formErrors,
                  password: "",
                });
              }}
              isInvalid={!!formErrors.password}
            />
            <Form.Label htmlFor="password">{t("psw")}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
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
