import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { Facebook, Google } from "react-bootstrap-icons";
import { Context } from "../main";
import { URL } from "../http";
import axios from "axios";

interface LoginProps {
  show: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ show, onClose }) => {
  const { store } = useContext(Context);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

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
    } else {
      newErrors.password = "";
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await store.login(formData.email, formData.password);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const responseMessage = e.response?.data;
          if (responseMessage.includes("User not found")) {
            setFormErrors({
              ...formErrors,
              email: t("User Not Found"),
            });
          }
          if (responseMessage.includes("Incorrect Password"))
            setFormErrors({
              ...formErrors,
              password: t("Incorrect Password"),
            });
        }
      }
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("login")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="p-3" noValidate>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="email"
              id="floatingInput"
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
            <Form.Label htmlFor="floatingInput">{t("email")}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="password"
              id="floatingPassword"
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
            <Form.Label htmlFor="floatingPassword">{t("psw")}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button className="btn btn-danger w-100 py-2" type="submit">
            {t("login")}
          </Button>
        </Form>
        <p className="text-body-secondary text-center">or login with</p>
        <div className="d-flex justify-content-center mt-3 gap-3">
          <Facebook
            size={36}
            color="royalblue"
            onClick={() => window.open(`${URL}/auth/facebook`, "_self")}
          ></Facebook>
          <Google
            size={36}
            color="red"
            onClick={() => window.open(`${URL}/auth/google`, "_self")}
          ></Google>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
