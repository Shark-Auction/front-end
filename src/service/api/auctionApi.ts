import api from "../../config/axios/api";
import { BiddingData } from "../../model/bidding";
import { UpdateAuctionDate } from "../../model/profile";

export const auctionApi = {
  addAuction: async (data: any) => {
    try {
      const response = await api.post("auction", data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  updateAuction: async (id: number | undefined, data: UpdateAuctionDate) => {
    try {
      const response = await api.put(`auction/time/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  cancelAuction: async (id: number | undefined) => {
    try {
      const response = await api.delete(`auction/cancel/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getAuction: async () => {
    try {
      const response = await api.get("auction");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getAuctionById: async (id: any) => {
    try {
      const response = await api.get(`auction/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  reAuction: async (id: number | undefined, data: UpdateAuctionDate) => {
    try {
      const response = await api.put(`auction/reAuction/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  biddingAuction: async (data: BiddingData) => {
    try {
      const response = await api.post("bidding", data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getBidding: async (id: string | undefined) => {
    try {
      const response = await api.get(`bidding/auction/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  confirmAuction: async (id: number) => {
    try {
      const response = await api.put(`auction/confirm/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
