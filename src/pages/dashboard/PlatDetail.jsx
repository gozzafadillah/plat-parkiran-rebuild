import React, { useEffect } from "react";
import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetPlat } from "../../store/plats/PlatsSlicer";
import FormPlatDetail from "../../components/FormPlatDetail";

const PlatDetail = () => {
  const param = useParams();
  const dispacth = useDispatch();
  const response = useSelector((state) => state.plat);

  useEffect(() => {
    dispacth(GetPlat(param.id));
  }, [dispacth, param]);

  return (
    <div
      style={{
        padding: "0px 0px 100px 0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {response.fecthStatus === "success" ? (
        <FormPlatDetail id={param.id} response={response} />
      ) : (
        <Skeleton style={{ padding: "0px 100px" }} active />
      )}
    </div>
  );
};

export default PlatDetail;
