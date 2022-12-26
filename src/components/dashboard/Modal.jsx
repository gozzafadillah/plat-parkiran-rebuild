import { Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { CreatePlat } from "../../store/plats/PlatsSlicer";
import { io } from "socket.io-client";

const ModalPlats = (props) => {
  // state
  const [rfid, setRfid] = useState("");
  const socket = io("http://192.168.1.25:5000");
  const dispacth = useDispatch();

  const [data, setData] = useState({
    Nama: "",
    ID_Plat: "",
    Free: 0,
    Saldo: 0,
    Status: "",
    Keterangan: "",
    Plat_Nomor: "",
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    socket.on("event", (data) => {
      let t = JSON.parse(data.toString("utf8"));
      setRfid(t);
    });
  }, [socket, data]);

  const [form] = Form.useForm();

  const onClickHandler = (e) => {
    e.preventDefault();
    dispacth(
      CreatePlat({
        Plat: rfid,
        Nama: data.Nama,
        ID_Plat: data.ID_Plat,
        Free: data.Free,
        Saldo: data.Saldo,
        Status: data.Status,
        Keterangan: data.Keterangan,
        Plat_Nomor: data.Plat_Nomor,
      })
    );

    setData({
      Plat: "",
      Nama: "",
      ID_Plat: "",
      Free: 0,
      Saldo: 0,
      Status: "",
      Keterangan: "",
      Plat_Nomor: "",
    });
    props.handleOk();
  };

  const onCancel = () => {
    setData({
      Plat: "",
      Nama: "",
      ID_Plat: "",
      Free: 0,
      Saldo: 0,
      Status: "",
      Keterangan: "",
      Plat_Nomor: "",
    });
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
            value={rfid}
            disabled
          />
        </Form.Item>
        <Form.Item label="Nama" style={{ fontWeight: "600" }}>
          <Input
            onChange={onChangeHandler}
            placeholder="Nama Lengkap.."
            name="Nama"
            required
          />
        </Form.Item>
        <Form.Item label="ID Plat" style={{ fontWeight: "600" }}>
          <Input
            onChange={onChangeHandler}
            placeholder="ID Plat.."
            name="ID_Plat"
            required
          />
        </Form.Item>
        <Form.Item label="Plat Nomor" style={{ fontWeight: "600" }}>
          <Input
            onChange={onChangeHandler}
            placeholder="Plat Nomor..."
            name="Plat_Nomor"
            required
          />
        </Form.Item>
        <Form.Item label="Free" style={{ fontWeight: "600" }}>
          <input
            onChange={onChangeHandler}
            value={data.Free}
            type="number"
            name="Free"
          />
        </Form.Item>
        <Form.Item label="Saldo" style={{ fontWeight: "600" }}>
          <input
            onChange={onChangeHandler}
            value={data.Saldo}
            type="number"
            name="Saldo"
          />
        </Form.Item>
        <Form.Item label="Status" style={{ fontWeight: "600" }}>
          <select onChange={onChangeHandler} name="Status" id="Status">
            <option value="">Pilih Status</option>
            <option value="Mahasiswa">Mahasiswa</option>
            <option value="Karyawan">Karyawan</option>
          </select>
        </Form.Item>
        <Form.Item style={{ fontWeight: "600" }} label="Keterangan" hasFeedback>
          <TextArea
            rows={4}
            onChange={onChangeHandler}
            name="Keterangan"
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
