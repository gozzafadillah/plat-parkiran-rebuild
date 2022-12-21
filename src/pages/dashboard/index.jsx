import { Button, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ModalPlats from "../../components/dashboard/Modal";

const MainDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Header>Header</Header>
      <Content style={{ background: "white" }}>
        <h1 style={{ padding: "10px" }}>List Plats</h1>

        <div
          style={{
            padding: "0px 50px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Add Plat
          </Button>
        </div>
        <ModalPlats
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainDashboard;
