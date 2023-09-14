import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import LikeService from "../services/LikeService";
import RatingService from "../services/RatingService";
import { IRating } from "../models/IRating";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = true;
  isSaving = false;
  reviewLike: number[] = [];
  reviewRating: IRating[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }
  setSaving(bool: boolean) {
    this.isSaving = bool;
  }

  setLikes(likes: number[]) {
    this.reviewLike = likes;
  }

  setRatings(ratings: IRating[]) {
    this.reviewRating = ratings;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      document.cookie = `refreshToken=${response.data.refreshToken}`;
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async registration(name: string, email: string, password: string) {
    try {
      const response = await AuthService.registration(name, email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
  async getUserLikes() {
    if (this.user.id) {
      try {
        const response = await LikeService.fetchLikes(this.user.id);
        const likes = response.data.map((e) => e.reviewId);
        this.setLikes(likes);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }
  async getUserRatings() {
    if (this.user.id) {
      try {
        const response = await RatingService.fetchRatings(this.user.id);
        console.log(response.data);
        // const ratings = response.data.map((e) => e.reviewId);
        this.setRatings(response.data);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }
}
