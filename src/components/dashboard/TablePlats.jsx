import { Button, Popover, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { DeletePlat, GetPlat, GetPlats } from "../../store/plats/PlatsSlicer";
import Swal from "sweetalert2";
import Filter from "../Filter";

const TablePlats = () => {
  const navigate = useNavigate();

  const platDelete = (plat) => {
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
        dispacth(DeletePlat(plat));
      }
    });
  };

  const columns = [
    {
      title: "Plat",
      dataIndex: "Plat",
      key: "Plat",
    },
    {
      title: "Nama",
      dataIndex: "Nama",
      key: "Nama",
      responsive: ["md"],
    },
    {
      title: "ID Plat",
      dataIndex: "ID_Plat",
      key: "ID_Plat",
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
                      navigate(`/plat/${record.Plat}`);
                      dispacth(GetPlat(record.Plat));
                    }}
                  >
                    <InfoCircleOutlined />
                    Edit
                  </Button>
                  <Button
                    type="text"
                    onClick={() => platDelete(record.Plat)}
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
  const [data, setData] = useState(response);
  useEffect(() => {
    dispacth(GetPlats());
  }, [dispacth]);

  return (
    <div style={{ padding: "50px" }}>
      <div
        style={{
          paddingBottom: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Filter response={response} data={data} setData={setData} />
      </div>
      <Table rowKey="Plat" columns={columns} dataSource={data} />
    </div>
  );
};

export default TablePlats;
