import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { Facebook, Google } from "react-bootstrap-icons";
import { Context } from "../main";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.login(formData.email, formData.password);
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
            {t("login")}
          </Button>
        </Form>
        <p className="text-body-secondary text-center">or login with</p>
        <div className="d-flex justify-content-center mt-3 gap-3">
          <Facebook size={36} color="royalblue"></Facebook>
          <Google size={36} color="red"></Google>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
