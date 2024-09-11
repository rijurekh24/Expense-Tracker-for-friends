import React from "react";
import { useParams } from "react-router-dom";
import Api from "../../Utils/api";

const GroupPage = () => {
  const { _id } = useParams();

  Api.get(`/group?_id=${_id}`)
    .then((res) => {})
    .catch(() => {});

  return <div>{_id}</div>;
};

export default GroupPage;
