import { Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { CreatePlat } from "../../store/plats/PlatsSlicer";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const ModalPlats = (props) => {
  // state
  const [data, setData] = useState({
    uuid: uuidv4(),
    plat: "",
    nama: "",
    id_plat: "",
    free: 0,
    saldo: 0,
    status: "",
    keterangan: "",
    plat_nomor: "",
  });
  const navigate = useNavigate();

  const dispacth = useDispatch();

  useEffect(() => {
    if (props.getId) {
    }
  }, [props.getId]);

  const [form] = Form.useForm();
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    dispacth(CreatePlat(data));
    props.handleOk();
    navigate("/");
  };

  const onCancel = () => {
    props.handleCancel();
  };

  return (
    <Modal open={props.isModalOpen} footer={null} onCancel={onCancel}>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          layout: "vertical",
        }}
      >
        <Form.Item label="Plat" style={{ fontWeight: "600" }}>
          <Input
            onChange={onChangeHandler}
            placeholder="Plat.."
            name="plat"
            required
          />
        </Form.Item>
        <Form.Item label="Nama" style={{ fontWeight: "600" }}>
          <Input
            onChange={onChangeHandler}
            placeholder="Nama Lengkap.."
            name="nama"
            required
          />
        </Form.Item>
        <Form.Item label="ID Plat" style={{ fontWeight: "600" }}>
          <Input
            onChange={onChangeHandler}
            placeholder="ID Plat.."
            name="id_plat"
            required
          />
        </Form.Item>
        <Form.Item label="Plat Nomor" style={{ fontWeight: "600" }}>
          <Input
            onChange={onChangeHandler}
            placeholder="Plat Nomor..."
            name="plat_nomor"
            required
          />
        </Form.Item>
        <Form.Item label="Free" style={{ fontWeight: "600" }}>
          <input
            onChange={onChangeHandler}
            type="number"
            name="free"
            id="free"
          />
        </Form.Item>
        <Form.Item label="Saldo" style={{ fontWeight: "600" }}>
          <input
            onChange={onChangeHandler}
            type="number"
            name="saldo"
            id="saldo"
          />
        </Form.Item>
        <Form.Item label="Status" style={{ fontWeight: "600" }}>
          <select onChange={onChangeHandler} name="status" id="status">
            <option value="">Pilih Status</option>
            <option value="Mahasiswa">Mahasiswa</option>
            <option value="Karyawan">Karyawan</option>
          </select>
        </Form.Item>
        <Form.Item style={{ fontWeight: "600" }} label="Keterangan" hasFeedback>
          <TextArea
            rows={4}
            onChange={onChangeHandler}
            name="keterangan"
            placeholder="keterangan..."
            allowClear
            required
          />
        </Form.Item>

        <div
          className="btn-group"
          style={{ display: "flex", justifyContent: "end", gap: "10px" }}
        >
          <button
            style={{
              background: "rgba(23, 128, 102, 1)",
              padding: "7px 12px 7px 12px",
              color: "white",
              width: "150px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
            className="btn-submit"
            type="submit"
            onClick={(e) => onClickHandler(e)}
          >
            <SendOutlined /> Submit
          </button>
          <button
            style={{
              background: "red",
              padding: "7px 6px 7px 6px",
              color: "white",
              width: "70px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
            className="btn-submit"
            type="cancel"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalPlats;
