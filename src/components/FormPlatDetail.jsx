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
    plat: props.response.data.plat[0].plat,
    nama: props.response.data.plat[0].nama,
    id_plat: props.response.data.plat[0].id_plat,
    free: props.response.data.plat[0].free,
    saldo: props.response.data.plat[0].saldo,
    status: props.response.data.plat[0].status,
    keterangan: props.response.data.plat[0].keterangan,
    plat_nomor: props.response.data.plat[0].plat_nomor,
  });
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onClickHandler = (e) => {
    e.preventDefault();

    const newData = {
      id: props.id,
      data: {
        plat: data.plat,
        nama: data.nama,
        id_plat: data.id_plat,
        keterangan: data.keterangan,
        free: data.free,
        saldo: data.saldo,
        status: data.status,
        plat_nomor: data.plat_nomor,
      },
    };

    dispatch(UpdatePlat(newData));
    navigate("/");
  };

  const onCancel = () => {
    setData({
      plat: "",
      nama: "",
      id_plat: "",
      free: 0,
      saldo: 0,
      status: "",
      keterangan: "",
      plat_nomor: "",
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
      <Form.Item label="UUID" style={{ fontWeight: "600" }}>
        <Input name="uuid" value={props.response.data.plat[0].uuid} disabled />
      </Form.Item>
      <Form.Item label="Plat" style={{ fontWeight: "600" }}>
        <Input
          onChange={onChangeHandler}
          placeholder="Plat.."
          name="plat"
          value={data.plat}
          required
        />
      </Form.Item>
      <Form.Item label="Nama" style={{ fontWeight: "600" }}>
        <Input
          onChange={onChangeHandler}
          placeholder="Nama Lengkap.."
          name="nama"
          value={data.nama}
          required
        />
      </Form.Item>
      <Form.Item label="ID Plat" style={{ fontWeight: "600" }}>
        <Input
          onChange={onChangeHandler}
          placeholder="ID Plat.."
          name="id_plat"
          value={data.id_plat}
          required
        />
      </Form.Item>
      <Form.Item label="Plat Nomor" style={{ fontWeight: "600" }}>
        <Input
          onChange={onChangeHandler}
          placeholder="Plat Nomor..."
          name="plat_nomor"
          value={data.plat_nomor}
          required
        />
      </Form.Item>
      <Form.Item label="Free" style={{ fontWeight: "600", display: "flex" }}>
        <input
          onChange={onChangeHandler}
          type="number"
          name="free"
          value={data.free}
          id="free"
        />
      </Form.Item>
      <Form.Item label="Saldo" style={{ fontWeight: "600", display: "flex" }}>
        <input
          onChange={onChangeHandler}
          type="number"
          name="saldo"
          id="saldo"
          value={data.saldo}
        />
      </Form.Item>
      <Form.Item label="Status" style={{ fontWeight: "600", display: "flex" }}>
        <select
          onChange={onChangeHandler}
          value={data.status}
          name="status"
          id="status"
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
          value={data.keterangan}
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
  );
};

export default FormPlatDetail;
