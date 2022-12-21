import axiosInstance from "../AxiosInstance";

const ApiPlat = {
  async getPlats() {
    try {
      const res = await axiosInstance.get("/plats");
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getPlat(id) {
    try {
      const res = await axiosInstance.get(`/plats/${id}`);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  async createPlat(data) {
    try {
      const res = await axiosInstance.post("/plats", data);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  async updatePlat(id, data) {
    try {
      const res = await axiosInstance.put(`/plats/${id}`, data);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  async deletePlat(id) {
    try {
      const res = await axiosInstance.delete(`/plats/${id}`);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default ApiPlat;
