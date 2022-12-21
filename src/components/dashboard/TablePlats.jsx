import { Button, Popover, Table } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { DeletePlat, GetPlat, GetPlats } from "../../store/plats/PlatsSlicer";
import Swal from "sweetalert2";

const TablePlats = () => {
  const navigate = useNavigate();

  const platDelete = (uuid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispacth(DeletePlat(uuid));
      }
    });
  };

  const columns = [
    {
      title: "Plat",
      dataIndex: "plat",
      key: "plat",
      render: (text) => <Link>{text}</Link>,
    },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
      responsive: ["md"],
    },
    {
      title: "ID Plat",
      dataIndex: "id_plat",
      key: "id_plat",
      responsive: ["lg"],
    },
    {
      title: "Action",
      dataIndex: "operation",
      editable: true,
      render: (_, record) => {
        return (
          <>
            <Popover
              content={
                <div style={{ display: "grid" }}>
                  <Button
                    type="text"
                    style={{ marginBottom: "10px", background: "#D1E6E0" }}
                    onClick={() => {
                      navigate(`/plat/${record.uuid}`);
                      dispacth(GetPlat(record.uuid));
                    }}
                  >
                    <InfoCircleOutlined />
                    Edit
                  </Button>
                  <Button
                    type="text"
                    onClick={() => platDelete(record.uuid)}
                    style={{ background: "#f29bae" }}
                  >
                    <DeleteOutlined />
                    Delete
                  </Button>
                </div>
              }
              destroyTooltipOnHide
            >
              <Button type={"text"}>&#x2022; &#x2022; &#x2022;</Button>
            </Popover>
          </>
        );
      },
    },
  ];

  const dispacth = useDispatch();
  const response = useSelector((state) => state.plat.data.plats);
  useEffect(() => {
    dispacth(GetPlats());
  }, [dispacth]);

  return (
    <div style={{ padding: "50px" }}>
      <Table rowKey="id" columns={columns} dataSource={response} />
    </div>
  );
};

export default TablePlats;
