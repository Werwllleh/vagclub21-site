"use client"
import { useQuery } from '@tanstack/react-query';
import UserService from '@/services/user.service';
import {useEffect, useState} from "react";

export function useUser() {

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => UserService.fetchUser(),
    retry: false,
  });

  return {
    isLoading,
    user: data?.data?.user ?? null,
  };
}
