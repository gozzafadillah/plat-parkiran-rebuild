import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SendOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UpdatePlat } from "../store/plats/PlatsSlicer";

const FormPlatDetail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [data, setData] = useState({
    Plat: props.response.data.plat[0].Plat,
    Nama: props.response.data.plat[0].Nama,
    ID_Plat: props.response.data.plat[0].ID_Plat,
    Free: props.response.data.plat[0].Free,
    Saldo: props.response.data.plat[0].Saldo,
    Status: props.response.data.plat[0].Status,
    Keterangan: props.response.data.plat[0].Keterangan,
    Plat_Nomor: props.response.data.plat[0].Plat_Nomor,
  });
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onClickHandler = (e) => {
    e.preventDefault();

    const newData = {
      id: props.id,
      data: {
        Plat: data.Plat,
        Nama: data.Nama,
        ID_Plat: data.ID_Plat,
        Keterangan: data.Keterangan,
        Free: data.Free,
        Saldo: data.Saldo,
        Status: data.Status,
        Plat_Nomor: data.Plat_Nomor,
      },
    };

    dispatch(UpdatePlat(newData));
    navigate("/");
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
    navigate("/");
  };

  return (
    <Form
      layout="vertical"
      style={{ width: "55vw" }}
      form={form}
      initialValues={{
        layout: "vertical",
      }}
    >
      <Form.Item label="Plat" style={{ fontWeight: "600" }}>
        <Input
          onChange={onChangeHandler}
          placeholder="Plat.."
          value={data.Plat}
          disabled
        />
      </Form.Item>
      <Form.Item label="Nama" style={{ fontWeight: "600" }}>
        <Input
          onChange={onChangeHandler}
          placeholder="Nama Lengkap.."
          name="Nama"
          id="Nama"
          value={data.Nama}
          required
        />
      </Form.Item>
      <Form.Item label="ID Plat" style={{ fontWeight: "600" }}>
        <Input
          onChange={onChangeHandler}
          placeholder="ID Plat.."
          name="ID_Plat"
          id="ID_Plat"
          value={data.ID_Plat}
          required
        />
      </Form.Item>
      <Form.Item label="Plat Nomor" style={{ fontWeight: "600" }}>
        <Input
          onChange={onChangeHandler}
          placeholder="Plat Nomor..."
          name="Plat_Nomor"
          id="Plat_Nomor"
          value={data.Plat_Nomor}
          required
        />
      </Form.Item>
      <Form.Item label="Free" style={{ fontWeight: "600", display: "flex" }}>
        <input
          onChange={onChangeHandler}
          type="number"
          name="Free"
          value={data.Free}
          id="Free"
        />
      </Form.Item>
      <Form.Item label="Saldo" style={{ fontWeight: "600", display: "flex" }}>
        <input
          onChange={onChangeHandler}
          type="number"
          name="Saldo"
          id="Saldo"
          value={data.Saldo}
        />
      </Form.Item>
      <Form.Item label="Status" style={{ fontWeight: "600", display: "flex" }}>
        <select
          onChange={onChangeHandler}
          value={data.Status}
          name="Status"
          id="Status"
        >
          <option value="">Pilih Status</option>
          <option value="Mahasiswa">Mahasiswa</option>
          <option value="Karyawan">Karyawan</option>
        </select>
      </Form.Item>
      <Form.Item style={{ fontWeight: "600" }} label="Keterangan" hasFeedback>
        <TextArea
          rows={4}
          onChange={onChangeHandler}
          value={data.Keterangan}
          name="Keterangan"
          placeholder="Keterangan..."
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
  );
};

export default FormPlatDetail;
