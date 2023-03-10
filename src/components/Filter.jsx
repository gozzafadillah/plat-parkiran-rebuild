import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const useDounce = (data, ms) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(data);
    }, ms);
    return () => {
      clearTimeout(handler);
    };
  }, [data, ms]);
  return value;
};

const Filter = (props) => {
  const [_text, setTopic] = useState("");
  const text = useDounce(_text, 1000);

  useEffect(() => {
    if (text !== "") {
      props.setData(
        props.response.filter(
          (val) =>
            val.Nama.toLowerCase() === text.toLowerCase() ||
            val.Nama.toLowerCase().match(text.toLowerCase()) ||
            val.ID_Plat.toLowerCase() === text.toLowerCase() ||
            val.ID_Plat.toLowerCase().match(text.toLowerCase()) ||
            val.Plat.toLowerCase() === text.toLowerCase() ||
            val.Plat.toLowerCase().match(text.toLowerCase())
        )
      );
    } else {
      props.setData(props.response);
    }
  }, [text, props]);

  const onChangeHandler = (e) => {
    setTopic(e.target.value);
  };

  return (
    <div style={{ width: "20vw" }}>
      <Input
        placeholder="Search"
        onChange={onChangeHandler}
        prefix={<SearchOutlined />}
      />
    </div>
  );
};

export default Filter;
